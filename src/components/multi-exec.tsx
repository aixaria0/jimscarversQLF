import { Button } from "@/components/ui/button";
import { InvList } from "@/components/inv-list";
import type { InvResult } from "@/lib/invariants";
import {
  MAX_SLOT,
  MP_ACCEPTORS,
  cloneMulti,
  crashMp,
  createMulti,
  decidedPrefix,
  phase1Range,
  phase2Slot,
  phase2bAllSlot,
  proposeNext,
  uniquenessHolds,
  type MpState,
} from "@/lib/multi-paxos";
import { cn } from "@/lib/utils";

function mpInvariants(s: MpState): InvResult[] {
  const unique = uniquenessHolds(s);
  const prefix = decidedPrefix(s);
  const hole = s.decided.findIndex((d, i) => i >= 1 && d === null && s.decided.slice(i + 1).some(Boolean));
  return [
    {
      name: "TypeOK",
      holds: s.maxBal.every((b, i) => s.maxVBal[i].every((v) => v <= b)),
      obligation: "maxBal[a] ≥ maxVBal[a][s] ≥ −1 for every slot.",
    },
    {
      name: "AtMostOneValue(s)",
      holds: unique,
      obligation: "Per-slot uniqueness. Reduce to BasicPaxos Inv.",
    },
    {
      name: "CommittedPrefix",
      holds: hole < 0,
      obligation: "The decided set is a contiguous prefix {1..c}. Raft commitIndex.",
      witness: hole >= 0 ? `hole at slot ${hole}` : undefined,
    },
    {
      name: "QuorumAssumption",
      holds: true,
      obligation: "∀ Q1, Q2 : Q1 ∩ Q2 ≠ {}.",
    },
    {
      name: "PrefixLen",
      holds: prefix.length <= MAX_SLOT,
      obligation: `committed log length = ${prefix.length}: [${prefix.join(", ") || "∅"}]`,
    },
  ];
}

export function MultiExec({
  state,
  setState,
}: {
  state: MpState;
  setState: (s: MpState) => void;
}) {
  const edit = (fn: (s: MpState) => void) => {
    const next = cloneMulti(state);
    fn(next);
    setState(next);
  };
  const prefix = decidedPrefix(state);
  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          MultiPaxos · MaxSlot={MAX_SLOT}
        </p>
        <h2 className="font-display text-xl font-medium tracking-tight">Amortized Phase 1, then a log</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Phase1Range collects promises once. Each subsequent client command is Phase2Slot
          at the next free index — Raft AppendEntries with a stable leader.
        </p>
        <div className="mt-4 flex min-w-0 flex-wrap gap-2">
          <Button size="sm" onClick={() => edit((s) => phase1Range(s))}>
            Phase1Range
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              edit((s) => {
                const slot = s.decided.findIndex((d, i) => i >= 1 && d === null);
                if (slot < 1) return;
                phase2Slot(s, slot, `c${slot}`);
                phase2bAllSlot(s, slot);
              })
            }
          >
            Phase2 next slot
          </Button>
          <Button size="sm" onClick={() => edit((s) => proposeNext(s, `c${prefix.length + 1}`))}>
            Propose next
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              edit((s) => {
                Object.assign(s, createMulti());
              })
            }
          >
            Init
          </Button>
        </div>
        <p className="mt-3 font-mono text-xs text-faint">
          ballot={Math.max(0, state.nextBal - 1)} · leader=
          {state.leader === null ? "None" : "p1"} · prefix=[{prefix.join(" ") || "∅"}]
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[480px] text-left font-mono text-xs">
            <thead className="bg-subtle text-faint">
              <tr>
                <th className="px-3 py-2 font-medium">slot</th>
                {Array.from({ length: MAX_SLOT }, (_, i) => (
                  <th key={i} className="px-3 py-2 font-medium tabular-nums">
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-3 py-2 text-faint">decided</td>
                {Array.from({ length: MAX_SLOT }, (_, i) => (
                  <td key={i} className="px-3 py-2 text-fg">
                    {state.decided[i + 1] ?? "—"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {MP_ACCEPTORS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => edit((s) => crashMp(s, a))}
              className={cn(
                "rounded-lg border p-3 text-left",
                state.crashed[a] ? "border-danger/40 bg-subtle" : "border-border bg-surface",
              )}
            >
              <p className="font-mono text-xs text-faint">acceptor</p>
              <p className="font-display text-lg">a{a + 1}</p>
              <p className="mt-2 font-mono text-xs text-muted">maxBal={state.maxBal[a]}</p>
              <p className="mt-1 font-mono text-xs text-faint">{state.crashed[a] ? "crashed" : "live"}</p>
            </button>
          ))}
        </div>
        <ol className="mt-4 max-h-40 overflow-auto font-mono text-xs text-muted">
          {state.log.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ol>
      </div>
      <div>
        <h3 className="font-display text-lg font-medium tracking-tight">Live invariants</h3>
        <p className="mb-3 text-xs text-muted">Same predicates as MultiPaxos.tla Inv.</p>
        <InvList items={mpInvariants(state)} />
      </div>
    </div>
  );
}
