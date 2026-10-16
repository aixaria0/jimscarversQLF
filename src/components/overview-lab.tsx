import { Button } from "@/components/ui/button";
import { PaxosFlow } from "@/components/paxos-flow";
import { PERF } from "@/lib/perf";
import { RAFT_TLC_CMD } from "@/lib/tlc";

export type JumpMod =
  | "raft"
  | "paxos"
  | "multi"
  | "mapping"
  | "impl"
  | "byzantine"
  | "quantum"
  | "mesa";

const CLAIMS: {
  n: string;
  title: string;
  body: string;
  jump: JumpMod;
  sub?: "spec" | "exec" | "tlc" | "proofs";
  action: string;
}[] = [
  {
    n: "01",
    title: "Quorum intersection ⇒ uniqueness",
    body: "∀ Q1, Q2 ∈ Quorum : Q1 ∩ Q2 ≠ {}. Phase2a may emit at most one value per ballot, forced by the highest accepted ballot among the promises. TLC finds a counterexample the moment that force rule is dropped.",
    jump: "paxos",
    sub: "tlc",
    action: "Check BasicPaxos",
  },
  {
    n: "02",
    title: "Restricted Multi-Paxos ⇒ Raft",
    body: "Ballot = term. Phase 1a/1b = RequestVote. Phase 2a/2b = AppendEntries. Chosen = AdvanceCommitIndex. Raft adds an explicit log-matching rule and forbids committing previous-term entries until a current-term entry is committed (Figure 8).",
    jump: "mapping",
    action: "Open the mapping",
  },
  {
    n: "03",
    title: "2f+1 ∩ 2f+1 ≥ f+1 ⇒ PBFT agreement",
    body: "n = 3f+1. Any two prepare/commit quorums share ≥ f+1 replicas, hence ≥ 1 honest replica that never equivocates. That is the Byzantine safety engine. View-change is a new ballot.",
    jump: "byzantine",
    sub: "exec",
    action: "Run PBFT",
  },
  {
    n: "04",
    title: "Decode-then-Paxos while f_Q < n/2",
    body: "GHZ voting plus a distance-d surface code. Logical error is a (possibly correlated) Byzantine 2b. Uniqueness is inherited from BasicPaxos Inv provided n · p_L(p, d) < n/2.",
    jump: "quantum",
    action: "Noise model",
  },
  {
    n: "05",
    title: "MesaFree ≠ Inv. Löb rejects □(□Safe → Safe)",
    body: "A mesa proposer stays inside Phase2a and picks a selfish free-choice value. Inv still holds. Detection is U ≠ H, not a safety violation. Gödel/Löb: a self-certificate of consistency does not discharge safety.",
    jump: "mesa",
    action: "Inject a policy",
  },
  {
    n: "06",
    title: "The enabling condition is the code",
    body: "RequestVote up-to-date, Figure-8 current-term commit, Phase2a force-value. Each sketch is the predicate TLC mutates. The running cluster is that code.",
    jump: "impl",
    action: "Open the kernel",
  },
];

export function OverviewLab({
  onOpen,
}: {
  onOpen: (mod: JumpMod, sub?: "spec" | "exec" | "tlc" | "proofs") => void;
}) {
  return (
    <div className="flex flex-col gap-12">
      <header className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          Quorum · Formal · Löb
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
          The only non-divergent fixed point of a self-referential replica is unrestricted agreement.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
          QFL is a working instrument, not a tutorial. Annotated TLA+ with proof obligations,
          an in-browser TLC fragment that exhibits counterexamples when a single enabling
          condition is dropped, live Raft and Paxos execution against the same predicates,
          a quantum noise model, and mesa-optimizer detection specialized to proposer and
          acceptor.
        </p>
      </header>

      <section className="grid gap-3">
        {CLAIMS.map((c) => (
          <article
            key={c.n}
            className="grid gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-start"
          >
            <p className="font-mono text-xs text-faint tabular-nums">{c.n}</p>
            <div>
              <h3 className="font-display text-lg font-medium tracking-tight">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{c.body}</p>
            </div>
            <Button size="sm" variant="secondary" onClick={() => onOpen(c.jump, c.sub)}>
              {c.action}
            </Button>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-faint">Lemma chain</p>
          <h3 className="mt-1 font-display text-xl font-medium tracking-tight">Raft safety</h3>
          <ol className="mt-3 space-y-2 font-mono text-xs text-muted">
            <li>TypeOK</li>
            <li>→ VotesInTermFormQuorum</li>
            <li>→ ElectionSafety</li>
            <li>→ LogMatching</li>
            <li>→ LeaderCompleteness</li>
            <li>→ CurrentTermCommit (Figure 8)</li>
            <li>→ StateMachineSafety</li>
          </ol>
          <Button className="mt-4" size="sm" onClick={() => onOpen("raft", "proofs")}>
            Discharge obligations
          </Button>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-faint">Official TLC</p>
          <h3 className="mt-1 font-display text-xl font-medium tracking-tight">raft_invariants.tla</h3>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-subtle p-3 font-mono text-xs leading-relaxed text-muted">
            {RAFT_TLC_CMD}
          </pre>
          <p className="mt-3 text-xs leading-relaxed text-faint">
            The in-browser checker explores a 3-server, MaxLog=2 fragment of the same
            specification. Intact models report no error. skip-up-to-date and
            skip-current-term produce witnesses.
          </p>
          <Button className="mt-3" size="sm" variant="secondary" onClick={() => onOpen("raft", "tlc")}>
            Run the fragment
          </Button>
        </div>
      </section>

      <section>
        <p className="font-mono text-xs uppercase tracking-widest text-faint">Message schedule</p>
        <h3 className="mt-1 font-display text-xl font-medium tracking-tight">Basic Paxos happy path</h3>
        <div className="mt-3 rounded-xl border border-border bg-surface p-3">
          <PaxosFlow />
        </div>
      </section>

      <section>
        <p className="font-mono text-xs uppercase tracking-widest text-faint">Literature, not this simulator</p>
        <h3 className="mt-1 font-display text-xl font-medium tracking-tight">Quantitative comparison</h3>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-subtle font-mono text-xs uppercase tracking-widest text-faint">
              <tr>
                <th className="px-3 py-2 font-medium">Protocol</th>
                <th className="px-3 py-2 font-medium">Fault</th>
                <th className="px-3 py-2 font-medium">n (f=1)</th>
                <th className="px-3 py-2 font-medium">Commit</th>
                <th className="px-3 py-2 font-medium">Msgs</th>
                <th className="px-3 py-2 font-medium">Throughput</th>
              </tr>
            </thead>
            <tbody>
              {PERF.map((r) => (
                <tr key={r.protocol} className="border-t border-border">
                  <td className="px-3 py-2 font-mono text-xs">{r.protocol}</td>
                  <td className="px-3 py-2 text-xs text-muted">{r.fault}</td>
                  <td className="px-3 py-2 font-mono text-xs tabular-nums">{r.serversF1}</td>
                  <td className="px-3 py-2 text-xs text-muted">{r.commitRtt}</td>
                  <td className="px-3 py-2 text-xs text-muted">{r.msgPerCmd}</td>
                  <td className="px-3 py-2 text-xs text-muted">{r.throughput}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
