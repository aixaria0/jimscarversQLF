import { useMemo, useState } from "react";
import { ArrowUpRight, Check, CircleDot, Search, ShieldCheck } from "lucide-react";
import { PaxosFlow } from "@/components/paxos-flow";
import { Button } from "@/components/ui/button";
import { raftInvariants } from "@/lib/invariants";
import { MAJORITY, type SimState, leaderOf } from "@/lib/raft";

export type JumpMod =
  | "raft"
  | "paxos"
  | "multi"
  | "mapping"
  | "impl"
  | "byzantine"
  | "quantum"
  | "mesa";

type Sub = "spec" | "exec" | "tlc" | "proofs";

const MODULES: {
  id: JumpMod;
  title: string;
  group: string;
  description: string;
  sub?: Sub;
}[] = [
  { id: "raft", title: "Raft", group: "Consensus", description: "Live five-node cluster, execution trace, and safety checks.", sub: "exec" },
  { id: "paxos", title: "Paxos", group: "Consensus", description: "Ballots, promises, acceptors, and chosen values.", sub: "exec" },
  { id: "multi", title: "Multi-Paxos", group: "Consensus", description: "Replicated slots and leader-oriented execution.", sub: "exec" },
  { id: "mapping", title: "Protocol mapping", group: "Analysis", description: "Compare the transition rules behind Raft and Paxos." },
  { id: "impl", title: "Implementation kernel", group: "Analysis", description: "Inspect the code predicates that enable safe progress." },
  { id: "byzantine", title: "Byzantine faults", group: "Fault models", description: "Run PBFT and explore quorum behavior.", sub: "exec" },
  { id: "quantum", title: "Quantum noise", group: "Fault models", description: "Explore decoding assumptions and logical error bounds." },
  { id: "mesa", title: "Mesa / Löb", group: "Fault models", description: "Probe proposer behavior and policy drift." },
];

export function OverviewLab({
  onOpen,
  sim,
}: {
  onOpen: (mod: JumpMod, sub?: Sub) => void;
  sim: SimState | null;
}) {
  const [query, setQuery] = useState("");
  const checks = sim ? raftInvariants(sim) : [];
  const passing = checks.filter((item) => item.holds).length;
  const liveNodes = sim?.nodes.filter((node) => node.alive).length ?? 0;
  const leader = sim ? leaderOf(sim) : null;
  const reachableNodes = leader ? sim!.nodes.filter((node) => node.alive && node.partition === leader.partition).length : 0;
  const filteredModules = useMemo(
    () => MODULES.filter((item) => `${item.title} ${item.group} ${item.description}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 border-b border-border pb-7 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">QFL / Control room</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Consensus, made inspectable.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            A focused workspace for protocol behavior, safety properties, and failure scenarios.
          </p>
        </div>
        <Button onClick={() => onOpen("raft", "exec")} className="self-start md:self-auto">
          Open live cluster <ArrowUpRight />
        </Button>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Live cluster summary">
        <Metric label="Cluster" value={sim ? (sim.running ? "Running" : "Paused") : "Starting"} detail="Raft · 5 servers" active={Boolean(sim?.running)} />
        <Metric label="Elected leader" value={leader ? `Server ${leader.id + 1}` : "No leader"} detail={leader ? `Term ${leader.currentTerm}` : "Election in progress"} active={Boolean(leader)} />
        <Metric label="Reachable quorum" value={leader ? `${reachableNodes} / ${MAJORITY}` : `— / ${MAJORITY}`} detail={!leader ? "Waiting for a leader" : reachableNodes >= MAJORITY ? `${liveNodes} servers online` : "Below majority in leader partition"} active={Boolean(leader) && reachableNodes >= MAJORITY} />
        <Metric label="Safety checks" value={sim ? `${passing} / ${checks.length}` : "—"} detail={checks.some((item) => !item.holds) ? "Review current witness" : "Evaluated on live state"} active={Boolean(sim) && checks.every((item) => item.holds)} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <article className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Live topology</p>
              <h3 className="mt-1 font-display text-xl font-medium">Raft cluster</h3>
            </div>
            <span className="rounded-full border border-border bg-subtle px-2.5 py-1 font-mono text-[10px] text-muted">
              {sim ? `TERM ${leader?.currentTerm ?? Math.max(0, ...sim.nodes.map((node) => node.currentTerm))}` : "INITIALIZING"}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2 p-4 sm:gap-3 sm:p-5">
            {sim?.nodes.map((node) => (
              <button key={node.id} type="button" onClick={() => onOpen("raft", "exec")} className="group rounded-lg border border-border bg-bg/60 p-2 text-left transition-colors hover:border-muted sm:p-3">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-[10px] text-faint">S{node.id + 1}</span>
                  <span className={node.alive ? (node.role === "leader" ? "size-2 rounded-full bg-ok" : "size-2 rounded-full bg-muted") : "size-2 rounded-full bg-danger"} />
                </div>
                <p className="mt-3 truncate text-xs font-medium capitalize text-fg">{node.alive ? node.role : "offline"}</p>
                <p className="mt-1 font-mono text-[10px] text-faint">log {node.log.length - 1} · commit {node.commitIndex}</p>
              </button>
            )) ?? Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="h-[76px] animate-pulse rounded-lg border border-border bg-subtle" />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-3 text-xs text-faint">
            <span>{sim ? `${sim.network.length} messages in flight · t=${sim.time}` : "Initializing simulation state"}</span>
            <button type="button" onClick={() => onOpen("raft", "exec")} className="font-medium text-muted hover:text-fg">Inspect execution →</button>
          </div>
        </article>

        <article className="rounded-xl border border-border bg-surface">
          <div className="border-b border-border px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Recent actions</p>
            <h3 className="mt-1 font-display text-xl font-medium">Execution trace</h3>
          </div>
          <ol className="divide-y divide-border px-5">
            {(sim?.trace.slice(-5).reverse() ?? []).map((event, index) => (
              <li key={`${event.t}-${index}`} className="flex gap-3 py-3">
                <span className="min-w-8 font-mono text-[10px] tabular-nums text-faint">{event.t}</span>
                <span className="min-w-0 text-xs text-muted">
                  <span className="font-medium text-fg">{event.name}</span>
                  {event.server >= 0 ? ` · S${event.server + 1}` : ""}
                  <span className="mt-0.5 block truncate text-faint">{event.detail}</span>
                </span>
              </li>
            ))}
            {!sim ? <li className="py-8 text-center text-xs text-faint">Waiting for the first events…</li> : null}
          </ol>
          <div className="border-t border-border px-5 py-3">
            <button type="button" onClick={() => onOpen("raft", "exec")} className="text-xs font-medium text-muted hover:text-fg">View full trace →</button>
          </div>
        </article>
      </section>

      <section>
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Workspace</p>
            <h3 className="mt-1 font-display text-2xl font-medium tracking-tight">Explore modules</h3>
          </div>
          <label className="flex h-10 w-full items-center gap-2 rounded-md border border-border bg-surface px-3 text-muted sm:max-w-xs">
            <Search className="size-4 shrink-0" aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a protocol or topic…" className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-faint" aria-label="Search modules" />
          </label>
        </div>
        {filteredModules.length ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {filteredModules.map((item) => (
              <button key={item.id} type="button" onClick={() => onOpen(item.id, item.sub)} className="group min-h-36 rounded-xl border border-border bg-surface p-4 text-left transition-colors hover:border-muted hover:bg-subtle">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{item.group}</span>
                  <ArrowUpRight className="size-4 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h4 className="mt-4 font-display text-lg font-medium">{item.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-border bg-surface p-6 text-sm text-muted">No modules match “{query}”.</p>
        )}
      </section>

      <section className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-ok">
            <ShieldCheck className="size-4" />
            <p className="font-mono text-[10px] uppercase tracking-[0.18em]">Safety at a glance</p>
          </div>
          <h3 className="mt-3 font-display text-xl font-medium">Properties follow the state</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted">Live checks run against the current Raft simulation. Open the checker to inspect each obligation and any counterexample witness.</p>
          <Button className="mt-4" size="sm" variant="secondary" onClick={() => onOpen("raft", "exec")}>Inspect checks</Button>
        </article>
        <article className="rounded-xl border border-border bg-surface p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Protocol sketch</p>
          <h3 className="mt-1 font-display text-xl font-medium">Basic Paxos · happy path</h3>
          <div className="mt-3 overflow-x-auto rounded-lg border border-border bg-bg/60 p-3">
            <PaxosFlow />
          </div>
          <button type="button" onClick={() => onOpen("paxos", "exec")} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-fg">Run Paxos <ArrowUpRight className="size-3" /></button>
        </article>
      </section>
    </div>
  );
}

function Metric({ label, value, detail, active }: { label: string; value: string; detail: string; active: boolean }) {
  return (
    <article className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{label}</p>
        {active ? <Check className="size-3.5 text-ok" aria-label="Healthy" /> : <CircleDot className="size-3.5 text-faint" aria-label="Inactive" />}
      </div>
      <p className="mt-3 font-display text-2xl font-medium tracking-tight tabular-nums">{value}</p>
      <p className="mt-1 text-[11px] text-muted">{detail}</p>
    </article>
  );
}
