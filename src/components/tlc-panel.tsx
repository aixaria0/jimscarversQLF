import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PAXOS_CFG,
  PAXOS_TLC_CMD,
  RAFT_CFG,
  RAFT_TLC_CMD,
  runPaxosTLC,
  runRaftTLC,
  type TLCMutation,
  type TLCResult,
} from "@/lib/tlc";
import { cn } from "@/lib/utils";

const RAFT_MUTS: { id: TLCMutation; label: string }[] = [
  { id: "none", label: "intact" },
  { id: "skip-up-to-date", label: "skip up-to-date" },
  { id: "skip-current-term", label: "skip current-term commit" },
];

const PAXOS_MUTS: { id: TLCMutation; label: string }[] = [
  { id: "none", label: "intact" },
  { id: "skip-force", label: "skip force-value" },
];

export function TlcPanel({ kind }: { kind: "raft" | "paxos" }) {
  const [result, setResult] = useState<TLCResult | null>(null);
  const [running, setRunning] = useState(false);
  const [mutation, setMutation] = useState<TLCMutation>("none");
  const gen = useRef(0);
  const cmd = kind === "raft" ? RAFT_TLC_CMD : PAXOS_TLC_CMD;
  const cfg = kind === "raft" ? RAFT_CFG : PAXOS_CFG;
  const muts = kind === "raft" ? RAFT_MUTS : PAXOS_MUTS;

  const run = (mut: TLCMutation) => {
    const id = ++gen.current;
    setMutation(mut);
    setRunning(true);
    setResult(null);
    window.setTimeout(() => {
      if (id !== gen.current) return;
      const r = kind === "raft" ? runRaftTLC(mut) : runPaxosTLC(1, mut);
      if (id !== gen.current) return;
      setResult(r);
      setRunning(false);
    }, 30);
  };

  useEffect(() => {
    run("none");
    return () => {
      gen.current += 1;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-faint">Model checker</p>
        <h3 className="font-display text-lg font-medium tracking-tight">
          {kind === "raft" ? "raft_invariants" : "BasicPaxos"} · TLC fragment
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Exhaustive BFS of a finite instance. Same invariants as the TLA+ spec. Drop one enabling
          condition to produce a counterexample. Official command against tla2tools is below.
        </p>
      </div>
      <pre className="overflow-x-auto rounded-lg border border-border bg-subtle p-3 font-mono text-xs text-muted">
        {cmd}
      </pre>
      <details className="rounded-lg border border-border bg-surface p-3">
        <summary className="cursor-pointer font-mono text-xs text-muted">config file</summary>
        <pre className="mt-2 overflow-x-auto font-mono text-xs text-faint">{cfg}</pre>
      </details>
      <div className="flex flex-wrap gap-1">
        {muts.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => run(m.id)}
            className={cn(
              "rounded-md px-3 py-2 text-xs",
              mutation === m.id ? "bg-subtle text-fg" : "text-faint hover:text-fg",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <Button onClick={() => run(mutation)} disabled={running} className="w-fit">
        {running ? "Checking…" : "Check model"}
      </Button>
      {result ? <TlcResultView result={result} /> : running ? (
        <p className="font-mono text-xs text-faint">Checking {mutation === "none" ? "intact" : mutation}…</p>
      ) : null}
    </div>
  );
}

function TlcResultView({ result }: { result: TLCResult }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p
        className={cn(
          "font-mono text-xs uppercase tracking-widest",
          result.status === "ok" ? "text-ok" : result.status === "violation" ? "text-danger" : "text-warn",
        )}
      >
        {result.status === "ok"
          ? "No error has been found"
          : result.status === "violation"
            ? "Invariant violated"
            : "State bound reached"}
        {result.mutation !== "none" ? ` · ${result.mutation}` : ""}
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs text-muted sm:grid-cols-4">
        <div>
          generated <span className="block text-fg tabular-nums">{result.states}</span>
        </div>
        <div>
          distinct <span className="block text-fg tabular-nums">{result.distinct}</span>
        </div>
        <div>
          diameter <span className="block text-fg tabular-nums">{result.depth}</span>
        </div>
        <div>
          time <span className="block text-fg tabular-nums">{result.durationMs}ms</span>
        </div>
      </dl>
      <ul className="mt-3 space-y-1">
        {result.invariants.map((inv) => (
          <li key={inv.name} className="font-mono text-xs">
            <span className={inv.holds ? "text-ok" : "text-danger"}>{inv.holds ? "TRUE" : "FALSE"}</span>{" "}
            <span className="text-fg">{inv.name}</span>
            {inv.counterexample ? <span className="text-danger"> — {inv.counterexample}</span> : null}
          </li>
        ))}
      </ul>
      <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-faint">
        {result.log.join("\n")}
      </pre>
    </div>
  );
}
