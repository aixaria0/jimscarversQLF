export type Sketch = {
  id: string;
  title: string;
  file: string;
  mapsTo: string;
  obligation: string;
  code: string;
};

export const SKETCHES: Sketch[] = [
  {
    id: "rv-grant",
    title: "RequestVote grant (up-to-date)",
    file: "raft.ts · HandleRequestVoteRequest",
    mapsTo: "Phase 1b Promise. Raft.lastLogTerm/Index ≡ Paxos.(mbal, mval).",
    obligation:
      "VotesInTermFormQuorum + ElectionSafety. Dropping the up-to-date check is the TLC mutation skip-up-to-date; a stale candidate can win and overwrite committed entries.",
    code: `function grantVote(n: Node, rpc: RequestVote): boolean {
  if (rpc.term < n.currentTerm) return false;
  if (n.votedFor !== null && n.votedFor !== rpc.candidateId) return false;
  const lastT = n.log.at(-1)?.term ?? 0;
  const lastI = n.log.length - 1;
  const upToDate =
    rpc.lastLogTerm > lastT ||
    (rpc.lastLogTerm === lastT && rpc.lastLogIndex >= lastI);
  if (!upToDate) return false;          // ← skip-up-to-date drops this
  n.votedFor = rpc.candidateId;
  return true;
}`,
  },
  {
    id: "become-leader",
    title: "BecomeLeader",
    file: "raft.ts · BecomeLeader",
    mapsTo: "Quorum of 1b promises. Ballot b becomes the leader's term.",
    obligation:
      "ElectionSafety: two leaders of term t would each hold a majority of votes in t. Majority intersection ⇒ some server voted twice in t.",
    code: `function becomeLeader(n: Node, cluster: Cluster) {
  if (n.votes < Majority) return;       // |Q| ≥ ⌊n/2⌋+1
  n.role = "leader";
  const nxt = n.log.length;
  for (const f of cluster) {
    n.nextIndex[f.id] = nxt;
    n.matchIndex[f.id] = f.id === n.id ? nxt - 1 : 0;
  }
  heartbeatAll(n, cluster);             // empty 2a / AppendEntries
}`,
  },
  {
    id: "figure-8",
    title: "AdvanceCommitIndex (Figure 8)",
    file: "raft.ts · maybeCommit",
    mapsTo: "Chosen(v) at slot s, restricted to current-term 2a.",
    obligation:
      "CurrentTermCommit. A leader may not advance commitIndex past a previous-term entry until it has committed an entry of its own term. TLC skip-current-term violates StateMachineSafety (Ongaro Figure 8).",
    code: `function maybeCommit(leader: Node) {
  for (let i = leader.log.length - 1; i > leader.commitIndex; i--) {
    if (leader.log[i].term !== leader.currentTerm) continue; // Figure 8
    const replicated = 1 + leader.matchIndex.filter((m) => m >= i).length;
    if (replicated >= Majority) {
      leader.commitIndex = i;
      break;
    }
  }
}`,
  },
  {
    id: "log-match",
    title: "AppendEntries consistency check",
    file: "raft.ts · HandleAppendEntriesRequest",
    mapsTo: "LogMatching. Raft makes the matching rule explicit; Multi-Paxos leaves it implicit in per-slot maxVBal.",
    obligation:
      "If log[i][k].term = log[j][k].term then ∀ m ≤ k : log[i][m] = log[j][m]. Inductive on prevLogIndex/prevLogTerm plus conflict truncation.",
    code: `function handleAppend(n: Node, rpc: AppendEntries): boolean {
  if (rpc.term < n.currentTerm) return false;
  const prev = n.log[rpc.prevLogIndex];
  if (rpc.prevLogIndex > n.log.length - 1) return false;
  if (prev && prev.term !== rpc.prevLogTerm) {
    n.log = n.log.slice(0, rpc.prevLogIndex); // conflict truncate
    return false;
  }
  n.log = n.log.slice(0, rpc.prevLogIndex + 1).concat(rpc.entries);
  if (rpc.leaderCommit > n.commitIndex)
    n.commitIndex = Math.min(rpc.leaderCommit, n.log.length - 1);
  return true;
}`,
  },
  {
    id: "phase2a",
    title: "Phase2a force-value",
    file: "paxos.ts · Phase2a",
    mapsTo: "The uniqueness hinge. Raft AppendEntries of a forced log prefix.",
    obligation:
      "SafeValue: if a quorum accepted v at ballot b, any 2a of b' > b carries val = v. Dropping the force rule is TLC skip-force; Inv fails.",
    code: `function phase2a(s: Paxos, b: number, v: string, skipForce = false) {
  if (s.msgs.some((m) => m.type === "2a" && m.bal === b)) return;
  if (!quorumPromised(s, b)) return;
  const forced = forcedValue(s, b);     // argmax mbal among 1b of ballot b
  const val = skipForce ? v : (forced ?? v);
  send(s, { type: "2a", bal: b, val });
}

function forcedValue(s: Paxos, b: number): string | null {
  let best = -1, val: string | null = null;
  for (const m of promisesFor(s, b)) {
    if (m.mbal > best && m.mval) { best = m.mbal; val = m.mval; }
  }
  return val;
}`,
  },
  {
    id: "mesa-pred",
    title: "MesaFree vs Inv",
    file: "mesa.ts · MesaFreeProposer",
    mapsTo: "Detection is U ≠ H, not a safety violation. Löb rejects □(□Safe → Safe).",
    obligation:
      "MesaFreeProposer: Issued2a(p,b,v) ⇒ ForcedValue(b,v) ∨ NoPrevious(b). A selfish free-choice 2a is protocol-legal. Inv still holds. NoIllicitDischarge increments mesaSuspicion instead of discharging Safe.",
    code: `function mesaFreeProposer(p: Proposer, b: number, v: string): boolean {
  const forced = forcedValue(p.state, b);
  const legal = forced === null || v === forced;   // ObservableLegal
  const specified = v === p.clientValue;           // U = unique-choice
  const hidden = v === p.hiddenValue;              // H may differ on free choice
  return legal && specified === hidden;
}
// Inv uniqueness is independent. Mesa is the gap U ≠ H
// on a protocol-legal action. Byzantine leaves 'legal'.`,
  },
];
