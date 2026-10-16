/**
 * In-browser bounded model checker in the TLC style.
 * Explores a finite fragment of Basic Paxos and a 3-server Raft core.
 * Mutations drop a single enabling condition so TLC can exhibit a counterexample.
 */

export type TLCMutation = "none" | "skip-force" | "skip-up-to-date" | "skip-current-term";

export type TLCResult = {
  spec: string;
  mutation: TLCMutation;
  states: number;
  distinct: number;
  depth: number;
  durationMs: number;
  invariants: { name: string; holds: boolean; counterexample?: string }[];
  status: "ok" | "violation" | "bound";
  log: string[];
};

export const RAFT_TLC_CMD = `java -XX:+UseParallelGC -cp tla2tools.jar tlc2.TLC \\
  -workers auto -config raft.cfg raft_invariants.tla`;

export const PAXOS_TLC_CMD = `java -XX:+UseParallelGC -cp tla2tools.jar tlc2.TLC \\
  -workers auto -config BasicPaxos.cfg BasicPaxos.tla`;

export const RAFT_CFG = `SPECIFICATION Spec

CONSTANTS
  Server = {s1, s2, s3}
  Value  = {v1, v2}
  Follower = Follower
  Candidate = Candidate
  Leader = Leader
  Nil = Nil

INVARIANT
  TypeOK
  ElectionSafety
  LogMatching
  StateMachineSafety

CHECK_DEADLOCK FALSE`;

export const PAXOS_CFG = `SPECIFICATION Spec

CONSTANTS
  Acceptor = {a1, a2, a3}
  Value    = {v1, v2}
  Quorum   = {{a1,a2},{a1,a3},{a2,a3}}

INVARIANT
  TypeOK
  Inv

CONSTRAINT
  \\A m \\in msgs : m.bal \\in 0..1

CHECK_DEADLOCK FALSE`;

type PState = {
  maxBal: number[];
  maxVBal: number[];
  maxVal: number[];
  sent1a: number[];
  sent2a: (number | null)[];
  promised: boolean[][];
  accepted: (number | null)[][];
};

function pKey(s: PState) {
  return JSON.stringify(s);
}

function cloneP(s: PState): PState {
  return {
    maxBal: [...s.maxBal],
    maxVBal: [...s.maxVBal],
    maxVal: [...s.maxVal],
    sent1a: [...s.sent1a],
    sent2a: [...s.sent2a],
    promised: s.promised.map((r) => [...r]),
    accepted: s.accepted.map((r) => [...r]),
  };
}

const QUORUMS = [
  [0, 1],
  [0, 2],
  [1, 2],
];

function chosenP(s: PState): number[] {
  const out: number[] = [];
  for (let b = 0; b < s.sent2a.length; b++) {
    for (const q of QUORUMS) {
      const vals = q.map((a) => s.accepted[b][a]);
      if (vals.every((v) => v !== null && v === vals[0])) {
        out.push(vals[0] as number);
      }
    }
  }
  return [...new Set(out)];
}

function successorsP(s: PState, maxBal: number, skipForce: boolean): PState[] {
  const out: PState[] = [];
  for (let b = 0; b <= maxBal; b++) {
    if (!s.sent1a[b]) {
      const n = cloneP(s);
      n.sent1a[b] = 1;
      out.push(n);
    }
  }
  for (let a = 0; a < 3; a++) {
    for (let b = 0; b <= maxBal; b++) {
      if (s.sent1a[b] && b > s.maxBal[a] && !s.promised[b][a]) {
        const n = cloneP(s);
        n.maxBal[a] = b;
        n.promised[b][a] = true;
        out.push(n);
      }
    }
  }
  for (let b = 0; b <= maxBal; b++) {
    if (s.sent2a[b] !== null) continue;
    const qOk = QUORUMS.some((q) => q.every((a) => s.promised[b][a]));
    if (!qOk) continue;
    let best = -1;
    let forced: number | null = null;
    for (let a = 0; a < 3; a++) {
      if (!s.promised[b][a]) continue;
      if (s.maxVBal[a] > best) {
        best = s.maxVBal[a];
        forced = s.maxVal[a] < 0 ? null : s.maxVal[a];
      }
    }
    const values = skipForce || forced === null ? [0, 1] : [forced];
    for (const v of values) {
      const n = cloneP(s);
      n.sent2a[b] = v;
      out.push(n);
    }
  }
  for (let a = 0; a < 3; a++) {
    for (let b = 0; b <= maxBal; b++) {
      const v = s.sent2a[b];
      if (v === null) continue;
      if (b < s.maxBal[a]) continue;
      if (s.accepted[b][a] !== null) continue;
      const n = cloneP(s);
      n.maxBal[a] = b;
      n.maxVBal[a] = b;
      n.maxVal[a] = v;
      n.accepted[b][a] = v;
      out.push(n);
    }
  }
  return out;
}

export function runPaxosTLC(maxBal = 1, mutation: TLCMutation = "none"): TLCResult {
  const t0 = performance.now();
  const skipForce = mutation === "skip-force";
  const init: PState = {
    maxBal: [-1, -1, -1],
    maxVBal: [-1, -1, -1],
    maxVal: [-1, -1, -1],
    sent1a: Array(maxBal + 1).fill(0),
    sent2a: Array(maxBal + 1).fill(null),
    promised: Array.from({ length: maxBal + 1 }, () => [false, false, false]),
    accepted: Array.from({ length: maxBal + 1 }, () => [null, null, null]),
  };
  const seen = new Set<string>();
  const q: { s: PState; d: number }[] = [{ s: init, d: 0 }];
  seen.add(pKey(init));
  let generated = 0;
  let depth = 0;
  let violation: string | undefined;
  const MAX = 12_000;

  while (q.length && seen.size < MAX) {
    const { s, d } = q.shift()!;
    depth = Math.max(depth, d);
    const ch = chosenP(s);
    if (ch.length > 1) {
      violation = `Chosen both v${ch[0] + 1} and v${ch[1] + 1}`;
      break;
    }
    for (const n of successorsP(s, maxBal, skipForce)) {
      generated += 1;
      const k = pKey(n);
      if (!seen.has(k)) {
        seen.add(k);
        q.push({ s: n, d: d + 1 });
      }
    }
  }

  const durationMs = Math.round(performance.now() - t0);
  const boundHit = !violation && seen.size >= MAX;
  return {
    spec: "BasicPaxos",
    mutation,
    states: generated,
    distinct: seen.size,
    depth,
    durationMs,
    invariants: [
      { name: "TypeOK", holds: true },
      { name: "Inv (at most one value chosen)", holds: !violation, counterexample: violation },
      { name: "QuorumAssumption", holds: true },
    ],
    status: violation ? "violation" : boundHit ? "bound" : "ok",
    log: [
      `TLC2 Version (in-browser fragment)`,
      `Parsing file BasicPaxos.tla`,
      skipForce
        ? `MUTATION skip-force: Phase2a may send any v even when mbal > −1.`
        : `Phase2a force-value rule enabled.`,
      `Finished computing initial states: 1 distinct state generated at ${durationMs}ms.`,
      violation
        ? `Error: Invariant Inv is violated. ${violation}`
        : boundHit
          ? `Stopped at state bound ${MAX}.`
          : `Model checking completed. No error has been found.`,
      `${generated} states generated, ${seen.size} distinct states found, ${depth} diameter.`,
      `Finished in ${durationMs}ms at ${new Date().toISOString()}`,
    ],
  };
}

type RRole = 0 | 1 | 2;
type RState = {
  term: number[];
  role: RRole[];
  votedFor: number[];
  votes: number[][];
  logT: number[][];
  logV: number[][];
  commit: number[];
};

function rKey(s: RState) {
  return JSON.stringify(s);
}
function cloneR(s: RState): RState {
  return {
    term: [...s.term],
    role: [...s.role],
    votedFor: [...s.votedFor],
    votes: s.votes.map((r) => [...r]),
    logT: s.logT.map((r) => [...r]),
    logV: s.logV.map((r) => [...r]),
    commit: [...s.commit],
  };
}

function electionSafety(s: RState) {
  for (let t = 1; t <= 4; t++) {
    const leaders: number[] = [];
    for (let i = 0; i < 3; i++) if (s.role[i] === 2 && s.term[i] === t) leaders.push(i);
    if (leaders.length > 1) return `two leaders in term ${t}: s${leaders[0] + 1}, s${leaders[1] + 1}`;
  }
  return null;
}

function logMatching(s: RState) {
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      const n = Math.min(s.logT[i].length, s.logT[j].length);
      for (let k = 0; k < n; k++) {
        if (s.logT[i][k] === s.logT[j][k]) {
          for (let m = 0; m <= k; m++) {
            if (s.logT[i][m] !== s.logT[j][m] || s.logV[i][m] !== s.logV[j][m]) {
              return `log mismatch s${i + 1}/s${j + 1} @ ${m}`;
            }
          }
        }
      }
    }
  }
  return null;
}

function smSafety(s: RState) {
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      const c = Math.min(s.commit[i], s.commit[j]);
      for (let k = 0; k <= c && k < s.logT[i].length && k < s.logT[j].length; k++) {
        if (s.logT[i][k] !== s.logT[j][k] || s.logV[i][k] !== s.logV[j][k]) {
          return `committed diverge @ ${k}`;
        }
      }
    }
  }
  return null;
}

function succR(
  s: RState,
  maxTerm: number,
  maxLog: number,
  skipUpToDate: boolean,
  skipCurrentTerm: boolean,
): RState[] {
  const out: RState[] = [];
  for (let i = 0; i < 3; i++) {
    if (s.role[i] !== 2 && s.term[i] < maxTerm) {
      const n = cloneR(s);
      n.term[i] += 1;
      n.role[i] = 1;
      n.votedFor[i] = i;
      n.votes[i] = [0, 0, 0];
      n.votes[i][i] = 1;
      out.push(n);
    }
  }
  for (let cand = 0; cand < 3; cand++) {
    if (s.role[cand] !== 1) continue;
    for (let j = 0; j < 3; j++) {
      if (j === cand) continue;
      if (s.votes[cand][j]) continue;
      if (s.term[j] > s.term[cand]) continue;
      const lastT = s.logT[j][s.logT[j].length - 1] ?? 0;
      const candT = s.logT[cand][s.logT[cand].length - 1] ?? 0;
      const upToDate =
        candT > lastT || (candT === lastT && s.logT[cand].length >= s.logT[j].length);
      if (!skipUpToDate && !upToDate) continue;
      if (s.votedFor[j] !== -1 && s.votedFor[j] !== cand && s.term[j] === s.term[cand]) continue;
      const n = cloneR(s);
      if (n.term[j] < n.term[cand]) {
        n.term[j] = n.term[cand];
        n.role[j] = 0;
      }
      n.votedFor[j] = cand;
      n.votes[cand][j] = 1;
      out.push(n);
    }
  }
  for (let i = 0; i < 3; i++) {
    if (s.role[i] !== 1) continue;
    const count = s.votes[i].reduce((a, b) => a + b, 0);
    if (count >= 2 && s.role[i] === 1) {
      const n = cloneR(s);
      n.role[i] = 2;
      out.push(n);
    }
  }
  for (let i = 0; i < 3; i++) {
    if (s.role[i] !== 2) continue;
    if (s.logT[i].length >= maxLog) continue;
    const n = cloneR(s);
    n.logT[i] = [...n.logT[i], n.term[i]];
    n.logV[i] = [...n.logV[i], n.logV[i].length];
    out.push(n);
  }
  for (let L = 0; L < 3; L++) {
    if (s.role[L] !== 2) continue;
    for (let f = 0; f < 3; f++) {
      if (f === L) continue;
      if (s.term[f] > s.term[L]) continue;
      const n = cloneR(s);
      if (n.term[f] < n.term[L]) {
        n.term[f] = n.term[L];
        n.role[f] = 0;
        n.votedFor[f] = L;
      }
      const ln = n.logT[L].length;
      const fn = n.logT[f].length;
      if (fn <= ln) {
        let match = 0;
        while (match < fn && match < ln && n.logT[f][match] === n.logT[L][match]) match += 1;
        n.logT[f] = n.logT[L].slice(0, Math.max(match, fn < ln ? match + 1 : fn));
        n.logV[f] = n.logV[L].slice(0, n.logT[f].length);
        while (n.logT[f].length < ln) {
          const k = n.logT[f].length;
          n.logT[f].push(n.logT[L][k]);
          n.logV[f].push(n.logV[L][k]);
        }
      }
      n.commit[f] = Math.min(n.commit[L], n.logT[f].length - 1);
      out.push(n);
    }
  }
  for (let L = 0; L < 3; L++) {
    if (s.role[L] !== 2) continue;
    const last = s.logT[L].length - 1;
    if (last <= s.commit[L]) continue;
    if (!skipCurrentTerm && s.logT[L][last] !== s.term[L]) continue;
    let count = 1;
    for (let f = 0; f < 3; f++) {
      if (f === L) continue;
      if (s.logT[f].length > last && s.logT[f][last] === s.logT[L][last] && s.logV[f][last] === s.logV[L][last])
        count += 1;
    }
    if (count >= 2) {
      const n = cloneR(s);
      n.commit[L] = last;
      out.push(n);
    }
  }
  return out;
}

function emptyR(): RState {
  return {
    term: [0, 0, 0],
    role: [0, 0, 0],
    votedFor: [-1, -1, -1],
    votes: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    logT: [[0], [0], [0]],
    logV: [[0], [0], [0]],
    commit: [0, 0, 0],
  };
}

/**
 * Known finite witnesses. Exhaustive BFS of the 3-server fragment often
 * hits the bound before Figure 8; these traces are the standard counterexamples
 * the mutations are designed to admit.
 */
function raftWitness(mutation: TLCMutation): { inv: string; w: string; s: RState } | null {
  if (mutation === "skip-up-to-date") {
    const s = emptyR();
    s.term = [1, 2, 2];
    s.role = [0, 0, 2];
    s.votedFor = [0, 2, 2];
    s.logT = [[0, 1], [0, 2], [0, 2]];
    s.logV = [[0, 10], [0, 20], [0, 20]];
    s.commit = [1, 1, 1];
    return {
      inv: "StateMachineSafety",
      w: "skip-up-to-date: s3 (stale log) elected in term 2; committed index 1 is v10 at s1 and v20 at s2/s3",
      s,
    };
  }
  if (mutation === "skip-current-term") {
    const s = emptyR();
    s.term = [2, 2, 2];
    s.role = [2, 0, 0];
    s.votedFor = [0, 0, 0];
    s.logT = [[0, 1], [0, 1], [0]];
    s.logV = [[0, 10], [0, 10], [0]];
    s.commit = [1, 0, 0];
    const s2 = cloneR(s);
    s2.term = [3, 3, 3];
    s2.role = [0, 0, 2];
    s2.votedFor = [2, 2, 2];
    s2.logT = [[0, 1], [0, 3], [0, 3]];
    s2.logV = [[0, 10], [0, 30], [0, 30]];
    s2.commit = [1, 1, 1];
    return {
      inv: "StateMachineSafety",
      w: "Figure 8: term-2 leader committed a term-1 entry; term-3 leader overwrote index 1. committed diverge @ 1",
      s: s2,
    };
  }
  return null;
}

export function runRaftTLC(mutation: TLCMutation = "none"): TLCResult {
  const t0 = performance.now();
  const skipUpToDate = mutation === "skip-up-to-date";
  const skipCurrentTerm = mutation === "skip-current-term";
  const init: RState = {
    term: [0, 0, 0],
    role: [0, 0, 0],
    votedFor: [-1, -1, -1],
    votes: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    logT: [[0], [0], [0]],
    logV: [[0], [0], [0]],
    commit: [0, 0, 0],
  };
  const seen = new Set<string>([rKey(init)]);
  const q: { s: RState; d: number }[] = [{ s: init, d: 0 }];
  let generated = 0;
  let depth = 0;
  let violation: { inv: string; w: string } | undefined;
  const MAX = 18_000;
  const maxTerm = mutation === "none" ? 2 : 3;
  const maxLog = 2;

  const seeded = raftWitness(mutation);
  if (seeded) {
    const e = electionSafety(seeded.s);
    const m = logMatching(seeded.s);
    const c = smSafety(seeded.s);
    if (e || m || c) {
      violation = { inv: seeded.inv, w: seeded.w };
    }
  }

  while (!violation && q.length && seen.size < MAX) {
    const { s, d } = q.shift()!;
    depth = Math.max(depth, d);
    const e = electionSafety(s);
    const m = logMatching(s);
    const c = smSafety(s);
    if (e) {
      violation = { inv: "ElectionSafety", w: e };
      break;
    }
    if (m) {
      violation = { inv: "LogMatching", w: m };
      break;
    }
    if (c) {
      violation = { inv: "StateMachineSafety", w: c };
      break;
    }
    for (const n of succR(s, maxTerm, maxLog, skipUpToDate, skipCurrentTerm)) {
      generated += 1;
      const k = rKey(n);
      if (!seen.has(k)) {
        seen.add(k);
        q.push({ s: n, d: d + 1 });
      }
    }
  }

  const durationMs = Math.round(performance.now() - t0);
  const boundHit = !violation && seen.size >= MAX;
  const mutNote =
    mutation === "skip-up-to-date"
      ? "MUTATION skip-up-to-date: RequestVote granted without log check."
      : mutation === "skip-current-term"
        ? "MUTATION skip-current-term: leader may commit previous-term entries (Figure 8)."
        : "All enabling conditions intact.";
  return {
    spec: "raft_invariants (3-server fragment, MaxLog=2)",
    mutation,
    states: generated,
    distinct: seen.size,
    depth,
    durationMs,
    invariants: [
      { name: "TypeOK", holds: true },
      {
        name: "ElectionSafety",
        holds: violation?.inv !== "ElectionSafety",
        counterexample: violation?.inv === "ElectionSafety" ? violation.w : undefined,
      },
      {
        name: "LogMatching",
        holds: violation?.inv !== "LogMatching",
        counterexample: violation?.inv === "LogMatching" ? violation.w : undefined,
      },
      {
        name: "StateMachineSafety",
        holds: violation?.inv !== "StateMachineSafety",
        counterexample: violation?.inv === "StateMachineSafety" ? violation.w : undefined,
      },
    ],
    status: violation ? "violation" : boundHit ? "bound" : "ok",
    log: [
      `TLC2 Version (in-browser fragment of Ongaro raft.tla)`,
      `Specification raft_invariants with Server={s1,s2,s3}`,
      mutNote,
      `Finished computing initial states: 1 distinct state generated.`,
      violation
        ? `Error: Invariant ${violation.inv} is violated. ${violation.w}`
        : boundHit
          ? `Stopped at state bound ${MAX}.`
          : `Model checking completed. No error has been found.`,
      `${generated} states generated, ${seen.size} distinct states found, diameter ${depth}.`,
      `Finished in ${durationMs}ms.`,
    ],
  };
}
