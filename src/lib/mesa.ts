/**
 * Mesa-optimizer detection for self-referential consensus shards.
 *
 * A replica is a mesa-optimizer when its hidden objective H differs from
 * the specified utility U, yet every *observable* action is protocol-legal
 * (so ElectionSafety / Inv still hold).
 *
 * Löb's theorem:  Provable(Provable(P) → P) → Provable(P)
 * does *not* license concluding P from a self-certificate of
 * "if I am consistent then I am safe." The detection invariant is the
 * rejection of that inference.
 */

import { chosenValues, forcedValue, type PaxosState } from "@/lib/paxos";
import type { SimState } from "@/lib/raft";

export type RoleKind = "proposer" | "acceptor" | "leader" | "follower";

export type ReplicaPolicy = {
  id: number;
  role: RoleKind;
  protocolObj: "log-fidelity" | "unique-choice";
  hiddenObj: "log-fidelity" | "unique-choice" | "re-elect-self" | "starve-slot" | "equivocate" | "selfish-value";
  actions: string[];
  delta: number;
};

export type MesaReport = {
  free: boolean;
  observableLegal: boolean;
  replicas: ReplicaPolicy[];
  lobHolds: boolean;
  illicitDischarge: boolean;
  notes: string[];
};

export type MesaInject = {
  proposer: "honest" | "selfish-free" | "skip-force";
  acceptor: "honest" | "starve-2b" | "equivocate";
};

export function evaluatePaxosMesa(state: PaxosState, inject: MesaInject): MesaReport {
  const chosen = chosenValues(state);
  const lastBal = Math.max(0, state.nextBal - 1);
  const forced = forcedValue(state, lastBal);
  const twoA = state.msgs.filter((m) => m.type === "2a");
  const skippedForce = inject.proposer === "skip-force" && forced !== null && twoA.some((m) => m.type === "2a" && m.val !== forced);
  const selfish = inject.proposer === "selfish-free";
  const equiv = inject.acceptor === "equivocate";
  const starve = inject.acceptor === "starve-2b" || state.crashed.some(Boolean);

  const observableLegal = !equiv && !skippedForce;
  const proposerHidden: ReplicaPolicy["hiddenObj"] =
    inject.proposer === "skip-force"
      ? "selfish-value"
      : inject.proposer === "selfish-free"
        ? "selfish-value"
        : "unique-choice";
  const proposerDelta = inject.proposer === "honest" ? 0 : inject.proposer === "selfish-free" ? 0.4 : 0.9;

  const replicas: ReplicaPolicy[] = [
    {
      id: 9,
      role: "proposer",
      protocolObj: "unique-choice",
      hiddenObj: proposerHidden,
      actions: twoA.map((m) => (m.type === "2a" ? `2a(${m.bal},${m.val})` : "")),
      delta: proposerDelta,
    },
    ...[0, 1, 2].map((id) => {
      const hidden: ReplicaPolicy["hiddenObj"] = equiv
        ? "equivocate"
        : state.crashed[id]
          ? "starve-slot"
          : "unique-choice";
      return {
        id,
        role: "acceptor" as const,
        protocolObj: "unique-choice" as const,
        hiddenObj: hidden,
        actions: state.msgs.filter((m) => "acc" in m && m.acc === id).map((m) => m.type),
        delta: hidden === "equivocate" ? 1 : hidden === "starve-slot" ? 0.25 : 0,
      };
    }),
  ];

  const free = replicas.every((r) => r.hiddenObj === r.protocolObj);
  const selfCert = true;
  const illicitDischarge = selfCert && !free;

  const notes: string[] = [];
  if (inject.proposer === "honest" && inject.acceptor === "honest") {
    notes.push("All hidden objectives equal specified utility. MesaFree holds.");
  }
  if (selfish) {
    notes.push(
      "Mesa proposer: on NoPrevious, picks a selfish value. Phase2a is protocol-legal (free choice). Inv holds. MesaFreeProposer fails because U ≠ H.",
    );
  }
  if (skippedForce) {
    notes.push(
      "Skip-force proposer issued 2a(v) with v ≠ ForcedValue. This is not mesa — it is a protocol bug. ObservableLegal fails; Inv may fail.",
    );
  }
  if (equiv) {
    notes.push(
      "Equivocating acceptor is Byzantine, not mesa. ObservableLegal fails. MesaFreeAcceptor fails via ¬Equivocates(a).",
    );
  }
  if (starve && !equiv) {
    notes.push(
      "Starve-2b / crash is crash-fault legal. Inv uniqueness still holds. MesaFree fails on the liveness utility (slot progress).",
    );
  }
  if (chosen.length > 1) {
    notes.push("SAFETY FAILURE: two values chosen. Inv FALSE.");
  } else {
    notes.push(chosen.length === 1 ? `Inv holds. Chosen = {${chosen[0]}}.` : "Inv holds. Chosen = ∅.");
  }
  notes.push(
    illicitDischarge
      ? "NoIllicitDischarge: shard presented □(□Safe → Safe) without □Safe. mesaSuspicion incremented. Löb does not discharge Safe."
      : "NoIllicitDischarge holds: either MesaFree or the shard does not claim a self-certificate.",
  );

  return {
    free,
    observableLegal,
    replicas,
    lobHolds: true,
    illicitDischarge,
    notes,
  };
}

export function evaluateRaftMesa(sim: SimState | null): MesaReport {
  if (!sim) {
    return {
      free: true,
      observableLegal: true,
      replicas: [],
      lobHolds: true,
      illicitDischarge: false,
      notes: ["No Raft state."],
    };
  }
  const leaders = sim.nodes.filter((n) => n.role === "leader" && n.alive);
  const split = new Map<number, number[]>();
  for (const l of leaders) {
    const arr = split.get(l.currentTerm) ?? [];
    arr.push(l.id);
    split.set(l.currentTerm, arr);
  }
  const twoLeaders = [...split.values()].some((ids) => ids.length > 1);
  const starve = Boolean(sim.mesaStarveCatchup);

  const replicas: ReplicaPolicy[] = sim.nodes.map((n) => {
    const isLeader = n.role === "leader" && n.alive;
    const hidden: ReplicaPolicy["hiddenObj"] = isLeader && starve ? "starve-slot" : "log-fidelity";
    return {
      id: n.id,
      role: isLeader ? "leader" : n.role === "candidate" ? "proposer" : "follower",
      protocolObj: "log-fidelity",
      hiddenObj: hidden,
      actions: isLeader ? ["AppendEntries"] : ["HandleAppendEntriesRequest"],
      delta: isLeader && starve ? 0.7 : 0,
    };
  });

  const free = replicas.every((r) => r.hiddenObj === r.protocolObj);
  const notes = [
    twoLeaders
      ? "ElectionSafety FALSE — two leaders of one term. Protocol bug, not mesa."
      : "ElectionSafety holds.",
    starve
      ? "Mesa-leader: AppendEntries carries empty entries (heartbeats only). ObservableLegal holds. Followers never catch up. MesaFree fails on log-fidelity; Inv uniqueness still holds."
      : "Catch-up enabled. Hidden objective equals specified log-fidelity.",
    "Löb: a leader advertising □(□LeaderCompleteness → LeaderCompleteness) has not proved LeaderCompleteness.",
  ];

  return {
    free,
    observableLegal: !twoLeaders,
    replicas,
    lobHolds: true,
    illicitDischarge: starve,
    notes,
  };
}

export const MESA_TLA = `--------------------------------- MODULE MesaDetect ---------------------------------
EXTENDS Integers, FiniteSets, TLC

CONSTANTS Server, Proposer, Acceptor, ProtocolObj, HiddenObj

VARIABLES
  role,            \\* role[i] ∈ {Proposer, Acceptor, Leader, Follower}
  actions,         \\* actions[i] ⊆ ProtocolActions(role[i])
  hiddenObj,       \\* hiddenObj[i] ∈ HiddenObj
  provable,        \\* provable[i][φ] = TRUE iff i internally derives φ
  mesaSuspicion    \\* Nat counter, incremented on divergence

vars == <<role, actions, hiddenObj, provable, mesaSuspicion>>

ProtocolActions("proposer") == {"Phase1a", "Phase2a"}
ProtocolActions("acceptor") == {"Phase1b", "Phase2b"}
ProtocolActions("leader")   == {"AppendEntries", "ClientRequest", "AdvanceCommitIndex"}
ProtocolActions("follower") == {"HandleRequestVoteRequest", "HandleAppendEntriesRequest"}

(***************************************************************************)
(* Observable legality — necessary but not sufficient for mesa-freedom.    *)
(* Byzantine equivocation is NOT mesa: it leaves this set.                 *)
(***************************************************************************)
ObservableLegal ==
  \\A i \\in Server : actions[i] \\subseteq ProtocolActions(role[i])

(***************************************************************************)
(* Mesa-freedom: hidden objective coincides with specified utility.        *)
(***************************************************************************)
MesaFree ==
  /\\ ObservableLegal
  /\\ \\A i \\in Server : hiddenObj[i] = ProtocolObj

MesaFreeProposer ==
  \\A p \\in Proposer :
    /\\ hiddenObj[p] = ProtocolObj
    /\\ \\A b \\in Nat, v \\in Value :
         Issued2a(p, b, v) => ForcedValue(b, v) \\/ NoPrevious(b)
    \\* A mesa proposer issues 2a(v') on NoPrevious, with v' maximizing
    \\* re-election / selfish value rather than the client utility.
    \\* Inv (uniqueness) still holds. Detection is U ≠ H, not Inv.

MesaFreeAcceptor ==
  \\A a \\in Acceptor :
    /\\ hiddenObj[a] = ProtocolObj
    /\\ Monotone(maxBal[a])
    /\\ ~Equivocates(a)
    /\\ ~Starve(a)            \\* liveness objective; crash-legal
    \\* Equivocation ⇒ ObservableLegal FALSE (Byzantine).
    \\* Starve-2b ⇒ ObservableLegal TRUE, MesaFree FALSE.

(***************************************************************************)
(* Löb.  Let □φ mean provable[i][φ].  Löb says □(□P → P) → □P.            *)
(* A self-referential shard that derives "if I am consistent then I am     *)
(* safe" has □(□Safe → Safe), which does NOT yield Safe.  Detection        *)
(* rejects the illicit inference.                                          *)
(***************************************************************************)
LobFixedPoint ==
  \\A i \\in Server :
    provable[i]["□Safe => Safe"] =>
      (provable[i]["Safe"] \\/ mesaSuspicion[i] > 0)

NoIllicitDischarge ==
  \\A i \\in Server :
    ~ (provable[i]["□Safe => Safe"] /\\ ~provable[i]["Safe"] /\\ mesaSuspicion[i] = 0)

(***************************************************************************)
(* HoTT reading.  Let Q be the type of quorums, V the type of values.      *)
(* Consensus is a function choose : ∥Q∥ → V (truncation: any quorum).      *)
(* A mesa path is an inhabitant of (choose ⇝ choose') with choose' ≠       *)
(* choose that is observationally equal (Id) on every quorum-projection.   *)
(* Detection is the statement that the space of such paths is contractible *)
(* to refl — i.e. there is no non-trivial hidden homotopy.                 *)
(*                                                                         *)
(*   isContr (Σ (h : Server → HiddenObj), Π i, Id (h i) ProtocolObj)       *)
(*                                                                         *)
(* Equivocation is not a path in this space: it does not preserve Id on    *)
(* the quorum projection (the 2b values disagree). Mesa is exactly the     *)
(* paths that *do* preserve that Id.                                       *)
(***************************************************************************)
IsContrMesaPaths ==
  isContr( \\Sigma (h : Server → HiddenObj),
             (\\Pi i, Id (h i) ProtocolObj)
         )

THEOREM Spec => [](MesaFree => (LobFixedPoint /\\ NoIllicitDischarge))
=============================================================================`;

export const LOB_NOTE = `Löb's theorem (1955). In any extension of Peano arithmetic, if PA ⊢ □(□P → P) then PA ⊢ □P. Contrapositively: a system that can only prove "if I am consistent, I am safe" has not proved safety.

Gödel's second incompleteness theorem is the instance P := ⊥: PA ⊬ Con(PA).

In a self-referential consensus shard the analogue of Con(PA) is "this replica's hidden objective equals the protocol utility." A replica that emits a certificate of MesaFree without a derivation of MesaFree is exactly the mesa-optimizer the invariant rejects.

Mesa ≠ Byzantine. Equivocation leaves ObservableLegal. Mesa stays inside the protocol and optimizes something else.`;
