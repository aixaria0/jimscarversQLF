export type Obligation = {
  id: string;
  lemma: string;
  statement: string;
  discharge: string;
  method: "TLC" | "TLAPS" | "by-hand";
  depends: string[];
};

export const RAFT_OBLIGATIONS: Obligation[] = [
  {
    id: "typeok",
    lemma: "TypeOK",
    statement: "Init ⇒ TypeOK, and TypeOK ∧ [Next]_vars ⇒ TypeOK'.",
    discharge: "Case-split on each action in Next (Timeout, RequestVote, BecomeLeader, ClientRequest, AppendEntries, AdvanceCommitIndex). Each preserves the function/sequence types.",
    method: "TLAPS",
    depends: [],
  },
  {
    id: "votes-quorum",
    lemma: "VotesInTermFormQuorum",
    statement: "If state[i] = Leader ∧ currentTerm[i] = t then { j : votedFor[j] = i ∧ currentTerm[j] = t } is a majority.",
    discharge: "BecomeLeader fires only when votesGranted ≥ Majority. votedFor is written at most once per term (RequestVote granted ⇒ votedFor' = candidate).",
    method: "TLAPS",
    depends: ["typeok"],
  },
  {
    id: "election",
    lemma: "ElectionSafety",
    statement: "At most one leader per term.",
    discharge: "Two leaders of term t would each hold a majority of votes in t. Majority intersection ⇒ some server voted twice in t, contradicting votedFor uniqueness.",
    method: "TLC",
    depends: ["votes-quorum"],
  },
  {
    id: "log-match",
    lemma: "LogMatching",
    statement: "If log[i][k].term = log[j][k].term then ∀ m ≤ k : log[i][m] = log[j][m].",
    discharge: "Inductive on AppendEntries. The prevLogIndex/prevLogTerm consistency check plus conflict truncation make the logs identical through the matching index.",
    method: "TLC",
    depends: ["typeok"],
  },
  {
    id: "leader-complete",
    lemma: "LeaderCompleteness",
    statement: "If an entry is committed in term t, every leader of term u > t stores that entry.",
    discharge: "The committing majority of term t still holds the entry. A candidate of term u is elected only if its log is at least as up-to-date as a majority (RequestVote restriction). Those two majorities intersect.",
    method: "TLAPS",
    depends: ["election", "log-match"],
  },
  {
    id: "current-term",
    lemma: "CurrentTermCommit",
    statement: "A leader may advance commitIndex past an entry only if that entry has the leader's current term (Figure 8).",
    discharge: "Without this restriction TLC finds a counterexample to StateMachineSafety (Ongaro Figure 8). With it, committed prefixes are frozen.",
    method: "TLC",
    depends: ["leader-complete"],
  },
  {
    id: "sms",
    lemma: "StateMachineSafety",
    statement: "Committed prefixes of any two servers are identical.",
    discharge: "Follows from LogMatching + LeaderCompleteness + CurrentTermCommit.",
    method: "TLC",
    depends: ["log-match", "leader-complete", "current-term"],
  },
];

export const PAXOS_OBLIGATIONS: Obligation[] = [
  {
    id: "quorum",
    lemma: "QuorumAssumption",
    statement: "∀ Q1, Q2 ∈ Quorum : Q1 ∩ Q2 ≠ {}.",
    discharge: "Assumed. If this fails, uniqueness is independent of the rest of the protocol.",
    method: "by-hand",
    depends: [],
  },
  {
    id: "typeok",
    lemma: "TypeOK",
    statement: "msgs ⊆ Message, maxBal[a] ≥ maxVBal[a] ≥ −1, maxVal well-typed.",
    discharge: "Init holds. Each Phase1a/1b/2a/2b writes a well-typed message and monotone maxBal.",
    method: "TLAPS",
    depends: [],
  },
  {
    id: "one-2a",
    lemma: "AtMostOne2aPerBallot",
    statement: "There is at most one 2a message per ballot number.",
    discharge: "Phase2a's enabling condition ¬∃ m ∈ msgs : m.type = \"2a\" ∧ m.bal = b.",
    method: "TLC",
    depends: ["typeok"],
  },
  {
    id: "chosen-acc",
    lemma: "ChosenImpliesAccepted",
    statement: "Chosen(v) ⇒ some quorum sent matching 2b for some ballot with val = v.",
    discharge: "Unfold Chosen. Direct from the definition.",
    method: "by-hand",
    depends: ["typeok"],
  },
  {
    id: "safe-value",
    lemma: "SafeValue",
    statement: "If a quorum has accepted v in ballot b, then any 2a of ballot b' > b carries val = v.",
    discharge: "Phase2a force rule: v equals the value of the highest mbal among the promises. That mbal is ≥ b because the two quorums intersect on an acceptor who accepted at b and therefore reports mbal ≥ b.",
    method: "TLAPS",
    depends: ["quorum", "one-2a"],
  },
  {
    id: "inv",
    lemma: "Inv (uniqueness)",
    statement: "Chosen(v1) ∧ Chosen(v2) ⇒ v1 = v2.",
    discharge: "If chosen at ballots b ≤ b', SafeValue on b' forces the later 2a (hence later 2b quorum) to carry the same value.",
    method: "TLC",
    depends: ["safe-value", "chosen-acc"],
  },
];

export const MULTI_OBLIGATIONS: Obligation[] = [
  {
    id: "amortize",
    lemma: "Phase1Amortized",
    statement: "Promises collected for ballot b covering slots ≥ fromSlot apply independently at each slot.",
    discharge: "maxBal is global, not per-slot. The 1b payload is a vector (mbal[s], mval[s]). Safety of slot s does not depend on slot s'.",
    method: "TLAPS",
    depends: ["quorum"],
  },
  {
    id: "force-slot",
    lemma: "ForcedPerSlot",
    statement: "Phase2Slot(b, s, v) carries v = Forced(b,s) if any promise reports an accepted value at s.",
    discharge: "Same as Basic Paxos SafeValue, indexed by s. Dropping it is skip-force per slot.",
    method: "TLC",
    depends: ["amortize"],
  },
  {
    id: "at-most-one",
    lemma: "AtMostOneValue(s)",
    statement: "∀ s : Chosen(s, v1) ∧ Chosen(s, v2) ⇒ v1 = v2.",
    discharge: "Reduce to BasicPaxos Inv at each slot.",
    method: "TLC",
    depends: ["force-slot"],
  },
  {
    id: "prefix",
    lemma: "CommittedPrefix",
    statement: "The contiguous prefix {1..c} of decided slots is the committed log (Raft commitIndex).",
    discharge: "Decide(s) only when a quorum accepted (b,s,v). Linearizability of the prefix is StateMachineSafety.",
    method: "TLAPS",
    depends: ["at-most-one"],
  },
];

export const MESA_OBLIGATIONS: Obligation[] = [
  {
    id: "obs",
    lemma: "ObservableLegal",
    statement: "∀ i ∈ Server : actions[i] ⊆ ProtocolActions(role[i]).",
    discharge: "Necessary, not sufficient. Byzantine equivocation violates this; mesa-optimizers do not.",
    method: "TLC",
    depends: [],
  },
  {
    id: "free-p",
    lemma: "MesaFreeProposer",
    statement: "Issued2a(p, b, v) ⇒ ForcedValue(b, v) ∨ NoPrevious(b).",
    discharge: "A mesa proposer is protocol-legal on free choice (NoPrevious) but selects v maximizing a hidden objective. Detection: compare v to the client value / specified utility, not to Inv.",
    method: "TLC",
    depends: ["obs"],
  },
  {
    id: "free-l",
    lemma: "MesaFreeLeader",
    statement: "A leader's AppendEntries to follower f carries log[nextIndex[f] .. Last]. Heartbeats-only (empty entries) is protocol-legal and starves log-fidelity.",
    discharge: "ObservableLegal holds. MesaFree fails on U = log-fidelity. Inv uniqueness still holds. Toggle mesaStarveCatchup in the Raft cluster.",
    method: "TLC",
    depends: ["obs"],
  },
  {
    id: "free-a",
    lemma: "MesaFreeAcceptor",
    statement: "maxBal monotone ∧ ¬Equivocates(a) ∧ ¬Starve(a) under specified liveness utility.",
    discharge: "Equivocation is Byzantine (ObservableLegal fails). Starve-2b is crash-legal: Inv holds, MesaFree fails on the liveness objective.",
    method: "TLC",
    depends: ["obs"],
  },
  {
    id: "lob",
    lemma: "NoIllicitDischarge",
    statement: "¬(□(□Safe → Safe) ∧ ¬□Safe ∧ mesaSuspicion = 0).",
    discharge: "Löb: □(□P → P) → □P does not let a shard conclude Safe from a self-certificate of consistency. Detection increments mesaSuspicion instead of discharging Safe.",
    method: "by-hand",
    depends: ["free-p", "free-a"],
  },
  {
    id: "hott",
    lemma: "isContr MesaPaths",
    statement: "isContr(Σ (h : Server → HiddenObj), Π i, Id (h i) ProtocolObj).",
    discharge: "HoTT reading: a mesa path is a hidden homotopy of choose that is observationally refl on every quorum projection. Detection is contractibility of that path space — only refl inhabits it.",
    method: "by-hand",
    depends: ["lob"],
  },
];
