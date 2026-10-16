/** Multi-Paxos: one Phase 1 for a range of slots, then Phase 2 per slot. */

export const MP_ACCEPTORS = [0, 1, 2] as const;
export const MP_QUORUMS: number[][] = [
  [0, 1],
  [0, 2],
  [1, 2],
];
export const MAX_SLOT = 5;

export type MpMsg =
  | { type: "1a"; bal: number; fromSlot: number }
  | {
      type: "1b";
      acc: number;
      bal: number;
      accepted: { mbal: number; mval: string | null }[];
    }
  | { type: "2a"; bal: number; slot: number; val: string }
  | { type: "2b"; acc: number; bal: number; slot: number; val: string };

export type MpState = {
  msgs: MpMsg[];
  maxBal: number[];
  maxVBal: number[][];
  maxVal: (string | null)[][];
  decided: (string | null)[];
  nextBal: number;
  leader: number | null;
  promisedFrom: number;
  log: string[];
  crashed: boolean[];
};

function emptyAccepted() {
  return Array.from({ length: MAX_SLOT + 1 }, () => ({ mbal: -1, mval: null as string | null }));
}

export function createMulti(): MpState {
  return {
    msgs: [],
    maxBal: [-1, -1, -1],
    maxVBal: [0, 1, 2].map(() => Array(MAX_SLOT + 1).fill(-1)),
    maxVal: [0, 1, 2].map(() => Array(MAX_SLOT + 1).fill(null)),
    decided: Array(MAX_SLOT + 1).fill(null),
    nextBal: 0,
    leader: null,
    promisedFrom: 1,
    log: ["Init. maxBal = −1. No slots decided."],
    crashed: [false, false, false],
  };
}

export function cloneMulti(s: MpState): MpState {
  return {
    msgs: [...s.msgs],
    maxBal: [...s.maxBal],
    maxVBal: s.maxVBal.map((r) => [...r]),
    maxVal: s.maxVal.map((r) => [...r]),
    decided: [...s.decided],
    nextBal: s.nextBal,
    leader: s.leader,
    promisedFrom: s.promisedFrom,
    log: [...s.log],
    crashed: [...s.crashed],
  };
}

function note(s: MpState, line: string) {
  s.log = [line, ...s.log].slice(0, 32);
}

export function phase1Range(s: MpState, fromSlot = 1) {
  const b = s.nextBal;
  s.nextBal = b + 1;
  s.leader = 0;
  s.promisedFrom = fromSlot;
  s.msgs = [...s.msgs, { type: "1a", bal: b, fromSlot }];
  for (const a of MP_ACCEPTORS) {
    if (s.crashed[a]) continue;
    if (s.maxBal[a] < b) {
      s.maxBal[a] = b;
      s.msgs = [
        ...s.msgs,
        {
          type: "1b",
          acc: a,
          bal: b,
          accepted: Array.from({ length: MAX_SLOT + 1 }, (_, slot) => ({
            mbal: s.maxVBal[a][slot],
            mval: s.maxVal[a][slot],
          })),
        },
      ];
    }
  }
  note(s, `Phase1Range(b=${b}, fromSlot=${fromSlot}) — leader amortized`);
}

function promises(s: MpState, b: number) {
  return s.msgs.filter((m): m is Extract<MpMsg, { type: "1b" }> => m.type === "1b" && m.bal === b);
}

export function quorumPromised(s: MpState, b: number) {
  const accs = new Set(promises(s, b).map((m) => m.acc));
  return MP_QUORUMS.some((q) => q.every((a) => accs.has(a)));
}

export function forcedAt(s: MpState, b: number, slot: number): string | null {
  let best = -1;
  let val: string | null = null;
  for (const m of promises(s, b)) {
    const rec = m.accepted[slot];
    if (rec && rec.mbal > best && rec.mval) {
      best = rec.mbal;
      val = rec.mval;
    }
  }
  return val;
}

export function phase2Slot(s: MpState, slot: number, v: string, skipForce = false) {
  const b = s.nextBal - 1;
  if (b < 0) {
    note(s, `Phase2Slot(${slot}) refused — no ballot`);
    return false;
  }
  if (s.msgs.some((m) => m.type === "2a" && m.bal === b && m.slot === slot)) {
    note(s, `Phase2Slot(${slot}) refused — already 2a`);
    return false;
  }
  if (!quorumPromised(s, b)) {
    note(s, `Phase2Slot(${slot}) refused — no quorum of 1b`);
    return false;
  }
  const forced = forcedAt(s, b, slot);
  const val = skipForce ? v : (forced ?? v);
  s.msgs = [...s.msgs, { type: "2a", bal: b, slot, val }];
  const tag = forced ? ` forced=${forced}` : " free";
  note(s, `Phase2Slot(b=${b}, s=${slot}, ${val})${tag}`);
  return true;
}

export function phase2bSlot(s: MpState, a: number, slot: number) {
  if (s.crashed[a]) return false;
  const m = [...s.msgs]
    .reverse()
    .find((x) => x.type === "2a" && x.slot === slot && x.bal >= s.maxBal[a]);
  if (!m || m.type !== "2a") return false;
  s.maxBal[a] = m.bal;
  s.maxVBal[a][slot] = m.bal;
  s.maxVal[a][slot] = m.val;
  s.msgs = [...s.msgs, { type: "2b", acc: a, bal: m.bal, slot, val: m.val }];
  note(s, `Phase2b(a${a + 1}, slot ${slot}) accepted ${m.val}`);
  maybeDecide(s, slot);
  return true;
}

export function phase2bAllSlot(s: MpState, slot: number) {
  for (const a of MP_ACCEPTORS) phase2bSlot(s, a, slot);
}

function maybeDecide(s: MpState, slot: number) {
  if (s.decided[slot]) return;
  const twob = s.msgs.filter(
    (m): m is Extract<MpMsg, { type: "2b" }> => m.type === "2b" && m.slot === slot,
  );
  const ballots = new Set(twob.map((m) => m.bal));
  for (const b of ballots) {
    const atB = twob.filter((m) => m.bal === b);
    for (const q of MP_QUORUMS) {
      const vals = q.map((a) => atB.find((m) => m.acc === a)?.val);
      if (vals.every((v) => v && v === vals[0])) {
        s.decided[slot] = vals[0]!;
        note(s, `Decide(slot ${slot}) = ${vals[0]}`);
        return;
      }
    }
  }
}

export function proposeNext(s: MpState, v: string) {
  const slot = s.decided.findIndex((d, i) => i >= 1 && d === null);
  if (slot < 1) {
    note(s, "Log full (MaxSlot=5).");
    return false;
  }
  if (s.leader === null) phase1Range(s, slot);
  phase2Slot(s, slot, v);
  phase2bAllSlot(s, slot);
  return true;
}

export function decidedPrefix(s: MpState) {
  const out: string[] = [];
  for (let i = 1; i <= MAX_SLOT; i++) {
    if (!s.decided[i]) break;
    out.push(s.decided[i]!);
  }
  return out;
}

export function uniquenessHolds(s: MpState) {
  for (let slot = 1; slot <= MAX_SLOT; slot++) {
    const twob = s.msgs.filter(
      (m): m is Extract<MpMsg, { type: "2b" }> => m.type === "2b" && m.slot === slot,
    );
    const values = new Set<string>();
    const ballots = new Set(twob.map((m) => m.bal));
    for (const b of ballots) {
      const atB = twob.filter((m) => m.bal === b);
      for (const q of MP_QUORUMS) {
        const vals = q.map((a) => atB.find((m) => m.acc === a)?.val);
        if (vals.every((v) => v && v === vals[0])) values.add(vals[0]!);
      }
    }
    if (values.size > 1) return false;
  }
  return true;
}

export function crashMp(s: MpState, a: number) {
  s.crashed[a] = !s.crashed[a];
  note(s, s.crashed[a] ? `a${a + 1} crashed` : `a${a + 1} revived`);
}
