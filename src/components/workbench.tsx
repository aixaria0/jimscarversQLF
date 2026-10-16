import { useEffect, useRef, useState } from "react";
import { ByzantineLab } from "@/components/byzantine-lab";
import { ClusterView, NodeInspector } from "@/components/cluster-view";
import { ImplLab } from "@/components/impl-lab";
import { InvList } from "@/components/inv-list";
import { MappingLab } from "@/components/mapping-lab";
import { MesaLab } from "@/components/mesa-lab";
import { MultiExec } from "@/components/multi-exec";
import { OverviewLab, type JumpMod } from "@/components/overview-lab";
import { FailureFlow, PaxosFlow } from "@/components/paxos-flow";
import { ProofsPanel } from "@/components/proofs-panel";
import { QuantumLab } from "@/components/quantum-lab";
import { SpecPanel } from "@/components/spec-panel";
import { TlcPanel } from "@/components/tlc-panel";
import { Button } from "@/components/ui/button";
import { clonePbft, createPbft, type PbftState } from "@/lib/byzantine";
import { paxosInvariants, raftInvariants } from "@/lib/invariants";
import { createMulti, type MpState } from "@/lib/multi-paxos";
import {
  ACCEPTORS,
  chosenValues,
  clonePaxos,
  crashAcceptor,
  createPaxos,
  equivocate,
  phase1a,
  phase1bAll,
  phase2a,
  phase2bAll,
  runHappyPath,
  type PaxosState,
} from "@/lib/paxos";
import { MULTI_OBLIGATIONS, PAXOS_OBLIGATIONS, RAFT_OBLIGATIONS } from "@/lib/proofs";
import {
  cloneSim,
  crashNode,
  createSim,
  healAll,
  leaderOf,
  propose,
  reviveNode,
  setPartition,
  tick,
  type SimState,
} from "@/lib/raft";
import { MULTI_SPEC, PAXOS_SPEC, RAFT_SPEC } from "@/lib/specs";
import { cn } from "@/lib/utils";

type Module = "argument" | JumpMod;
type Sub = "spec" | "exec" | "tlc" | "proofs";

const NAV: { id: Module; label: string }[] = [
  { id: "argument", label: "Argument" },
  { id: "raft", label: "Raft" },
  { id: "paxos", label: "Paxos" },
  { id: "multi", label: "Multi-Paxos" },
  { id: "mapping", label: "Mapping" },
  { id: "impl", label: "Kernel" },
  { id: "byzantine", label: "Byzantine" },
  { id: "quantum", label: "Quantum" },
  { id: "mesa", label: "Mesa / Löb" },
];

function subsFor(mod: Module): Sub[] {
  if (mod === "raft" || mod === "paxos") return ["spec", "exec", "tlc", "proofs"];
  if (mod === "multi") return ["spec", "exec", "proofs"];
  if (mod === "byzantine") return ["spec", "exec"];
  return [];
}

export function Workbench() {
  const [mod, setMod] = useState<Module>("argument");
  const [sub, setSub] = useState<Sub>("spec");
  const [sim, setSim] = useState<SimState | null>(null);
  const [paxos, setPaxos] = useState<PaxosState>(() => createPaxos());
  const [multi, setMulti] = useState<MpState>(() => createMulti());
  const [pbft, setPbft] = useState<PbftState>(() => createPbft());
  const [selected, setSelected] = useState(0);
  const [draft, setDraft] = useState("v1");
  const simRef = useRef<SimState | null>(null);
  const last = useRef(0);

  useEffect(() => {
    const initial = createSim();
    simRef.current = initial;
    setSim(initial);
  }, []);

  useEffect(() => {
    let raf = 0;
    let acc = 0;
    const loop = (t: number) => {
      if (!last.current) last.current = t;
      const dt = Math.min(32, t - last.current);
      last.current = t;
      if (simRef.current?.running) {
        tick(simRef.current, dt / 16);
        acc += dt;
        if (acc >= 80) {
          acc = 0;
          setSim(cloneSim(simRef.current));
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const mutate = (fn: (s: SimState) => void) => {
    if (!simRef.current) return;
    fn(simRef.current);
    setSim(cloneSim(simRef.current));
  };

  const editPaxos = (fn: (s: PaxosState) => void) => {
    setPaxos((prev) => {
      const next = clonePaxos(prev);
      fn(next);
      return next;
    });
  };

  const editPbft = (fn: (s: PbftState) => void) => {
    setPbft((prev) => {
      const next = clonePbft(prev);
      fn(next);
      return next;
    });
  };

  const open = (next: JumpMod, nextSub?: Sub) => {
    setMod(next);
    const available = subsFor(next);
    setSub(nextSub && available.includes(nextSub) ? nextSub : (available[0] ?? "spec"));
  };

  const available = subsFor(mod);

  return (
    <div className="min-h-dvh bg-bg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-baseline justify-between gap-3">
            <button type="button" className="text-left" onClick={() => setMod("argument")}>
              <p className="font-mono text-xs uppercase tracking-widest text-faint">
                Formal consensus workbench
              </p>
              <h1 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">QFL</h1>
            </button>
            <p className="hidden max-w-sm text-right text-xs leading-relaxed text-faint sm:block">
              Annotated TLA+, proof obligations, TLC with mutations, GHZ + surface code, mesa / Löb / HoTT.
            </p>
          </div>
          <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1" aria-label="Modules">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMod(item.id);
                  const next = subsFor(item.id);
                  setSub(next[0] ?? "spec");
                }}
                className={cn(
                  "shrink-0 rounded-md px-3 py-2 text-sm transition-opacity duration-150",
                  mod === item.id ? "bg-accent text-accent-fg" : "text-muted hover:bg-subtle hover:text-fg",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto min-w-0 max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {available.length ? (
          <div className="mb-5 flex gap-1">
            {available.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSub(s)}
                className={cn(
                  "rounded-md px-3 py-2 text-xs uppercase tracking-widest",
                  sub === s ? "bg-subtle text-fg" : "text-faint hover:text-fg",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        ) : null}

        {mod === "argument" ? <OverviewLab onOpen={open} /> : null}

        {mod === "raft" && sub === "spec" ? <SpecPanel doc={RAFT_SPEC} /> : null}
        {mod === "raft" && sub === "tlc" ? <TlcPanel kind="raft" /> : null}
        {mod === "raft" && sub === "proofs" ? (
          <ProofsPanel title="raft_invariants" items={RAFT_OBLIGATIONS} />
        ) : null}
        {mod === "raft" && sub === "exec" ? (
          <RaftExec
            sim={sim}
            selected={selected}
            draft={draft}
            setDraft={setDraft}
            setSelected={setSelected}
            mutate={mutate}
          />
        ) : null}

        {mod === "paxos" && sub === "spec" ? <SpecPanel doc={PAXOS_SPEC} /> : null}
        {mod === "paxos" && sub === "tlc" ? <TlcPanel kind="paxos" /> : null}
        {mod === "paxos" && sub === "proofs" ? (
          <ProofsPanel title="BasicPaxos" items={PAXOS_OBLIGATIONS} />
        ) : null}
        {mod === "paxos" && sub === "exec" ? <PaxosExec state={paxos} edit={editPaxos} /> : null}

        {mod === "multi" && sub === "spec" ? <SpecPanel doc={MULTI_SPEC} /> : null}
        {mod === "multi" && sub === "exec" ? <MultiExec state={multi} setState={setMulti} /> : null}
        {mod === "multi" && sub === "proofs" ? (
          <ProofsPanel title="MultiPaxos" items={MULTI_OBLIGATIONS} />
        ) : null}

        {mod === "mapping" ? <MappingLab /> : null}
        {mod === "impl" ? <ImplLab /> : null}
        {mod === "byzantine" ? (
          <ByzantineLab state={pbft} edit={editPbft} sub={sub === "exec" ? "exec" : "spec"} />
        ) : null}
        {mod === "quantum" ? <QuantumLab /> : null}
        {mod === "mesa" ? (
          <MesaLab
            raft={sim}
            paxos={paxos}
            onStarve={(on) =>
              mutate((s) => {
                s.mesaStarveCatchup = on;
              })
            }
          />
        ) : null}
      </main>
    </div>
  );
}

function RaftExec({
  sim,
  selected,
  draft,
  setDraft,
  setSelected,
  mutate,
}: {
  sim: SimState | null;
  selected: number;
  draft: string;
  setDraft: (v: string) => void;
  setSelected: (id: number) => void;
  mutate: (fn: (s: SimState) => void) => void;
}) {
  if (!sim) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">Raft execution</p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">QFL</h2>
        <p className="mt-2 text-sm text-muted">Opening the five-server cluster.</p>
      </div>
    );
  }
  const leader = leaderOf(sim);
  const inv = raftInvariants(sim);
  const n = sim.nodes[selected];
  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <div className="min-w-0">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => mutate((s) => (s.running = !s.running))}>
            {sim.running ? "Pause" : "Resume"}
          </Button>
          <Button size="sm" onClick={() => mutate((s) => propose(s, draft))}>
            Propose
          </Button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="h-9 w-24 rounded-sm border border-border bg-subtle px-2 font-mono text-xs text-fg"
            aria-label="Client value"
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              mutate((s) => {
                if (n.alive) crashNode(s, selected);
                else reviveNode(s, selected);
              })
            }
          >
            {n.alive ? `Crash s${selected + 1}` : `Revive s${selected + 1}`}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              mutate((s) => {
                const partitioned = s.nodes.some((x) => x.partition !== 0);
                if (partitioned) healAll(s);
                else setPartition(s, [3, 4], 1);
              })
            }
          >
            {sim.nodes.some((x) => x.partition !== 0) ? "Heal" : "Partition s4–s5"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              mutate((s) => {
                s.mesaStarveCatchup = !s.mesaStarveCatchup;
              })
            }
          >
            {sim.mesaStarveCatchup ? "Catch-up on" : "Mesa starve"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              mutate((s) => {
                const fresh = createSim();
                Object.assign(s, fresh);
              })
            }
          >
            Init
          </Button>
        </div>
        <p className="mt-3 font-mono text-xs text-faint">
          time={sim.time} · leader={leader ? `s${leader.id + 1}` : "Nil"} · term={leader?.currentTerm ?? "—"} · msgs=
          {sim.network.length}
          {sim.mesaStarveCatchup ? " · MESA starve-catch-up" : ""}
        </p>
        <ClusterView sim={sim} selected={selected} onSelect={setSelected} />
        <NodeInspector sim={sim} id={selected} />
        <ol className="mt-3 max-h-40 overflow-auto font-mono text-xs text-muted">
          {sim.trace.map((a, i) => (
            <li key={`${a.t}-${i}`}>
              <span className="text-faint tabular-nums">{a.t}</span> {a.name}
              {a.server >= 0 ? ` s${a.server + 1}` : ""} — {a.detail}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-lg font-medium tracking-tight">Live invariants</h3>
        <p className="text-xs text-muted">
          Evaluated on the current five-server state after every tick. Same predicates as raft_invariants.tla.
        </p>
        <InvList items={inv} />
      </div>
    </div>
  );
}

function PaxosExec({
  state,
  edit,
}: {
  state: PaxosState;
  edit: (fn: (s: PaxosState) => void) => void;
}) {
  const chosen = chosenValues(state);
  const b = Math.max(0, state.nextBal - 1);
  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <div className="min-w-0">
        <div className="flex min-w-0 flex-wrap gap-2">
          <Button size="sm" onClick={() => edit((s) => phase1a(s))}>
            Phase1a
          </Button>
          <Button size="sm" variant="secondary" onClick={() => edit((s) => phase1bAll(s))}>
            Phase1b (all)
          </Button>
          <Button size="sm" variant="secondary" onClick={() => edit((s) => phase2a(s, b, s.value))}>
            Phase2a
          </Button>
          <Button size="sm" variant="secondary" onClick={() => edit((s) => phase2bAll(s))}>
            Phase2b (all)
          </Button>
          <Button size="sm" onClick={() => edit((s) => runHappyPath(s, s.value === "v1" ? "v2" : "v1"))}>
            Run to Chosen
          </Button>
          <Button size="sm" variant="ghost" onClick={() => edit((s) => phase2a(s, b, s.value === "v1" ? "v2" : "v1", true))}>
            Phase2a skip-force
          </Button>
          <Button size="sm" variant="ghost" onClick={() => edit((s) => equivocate(s, 1))}>
            Equivocate a2
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              edit((s) => {
                const n = createPaxos();
                Object.assign(s, n);
              })
            }
          >
            Init
          </Button>
        </div>
        <p className="mt-3 font-mono text-xs text-faint">
          nextBal={state.nextBal} · Chosen={chosen.length ? chosen.join(",") : "∅"}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {ACCEPTORS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => edit((s) => crashAcceptor(s, a))}
              className={cn(
                "rounded-lg border p-3 text-left",
                state.crashed[a] ? "border-danger/40 bg-subtle" : "border-border bg-surface",
              )}
            >
              <p className="font-mono text-xs text-faint">acceptor</p>
              <p className="font-display text-lg">a{a + 1}</p>
              <p className="mt-2 font-mono text-xs text-muted">
                maxBal={state.maxBal[a]}
                <br />
                maxVBal={state.maxVBal[a]}
                <br />
                maxVal={state.maxVal[a] ?? "None"}
              </p>
              <p className="mt-2 font-mono text-xs text-faint">{state.crashed[a] ? "crashed" : "live"}</p>
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-border bg-surface p-3">
          <PaxosFlow />
        </div>
        <div className="mt-3 rounded-xl border border-border bg-surface p-3">
          <FailureFlow />
        </div>
        <ol className="mt-4 max-h-48 overflow-auto font-mono text-xs text-muted">
          {state.log.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ol>
        <ol className="mt-3 max-h-32 overflow-auto font-mono text-xs text-faint">
          {state.msgs.map((m, i) => (
            <li key={i}>{JSON.stringify(m)}</li>
          ))}
        </ol>
      </div>
      <div>
        <h3 className="font-display text-lg font-medium tracking-tight">Live invariants</h3>
        <p className="mb-3 text-xs text-muted">Same predicates as BasicPaxos.tla Inv.</p>
        <InvList items={paxosInvariants(state)} />
      </div>
    </div>
  );
}
