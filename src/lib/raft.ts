export const NODE_COUNT = 5;
export const MAJORITY = 3;

export type Role = "follower" | "candidate" | "leader";

export type LogEntry = {
  term: number;
  command: string;
};

export type Rpc =
  | {
      kind: "RequestVote";
      term: number;
      candidateId: number;
      lastLogIndex: number;
      lastLogTerm: number;
    }
  | {
      kind: "RequestVoteReply";
      term: number;
      voteGranted: boolean;
    }
  | {
      kind: "AppendEntries";
      term: number;
      leaderId: number;
      prevLogIndex: number;
      prevLogTerm: number;
      entries: LogEntry[];
      leaderCommit: number;
    }
  | {
      kind: "AppendEntriesReply";
      term: number;
      success: boolean;
      matchIndex: number;
    };

export type Envelope = {
  id: number;
  from: number;
  to: number;
  sentAt: number;
  deliverAt: number;
  rpc: Rpc;
};

export type NodeState = {
  id: number;
  role: Role;
  currentTerm: number;
  votedFor: number | null;
  log: LogEntry[];
  commitIndex: number;
  nextIndex: number[];
  matchIndex: number[];
  electionDeadline: number;
  heartbeatDeadline: number;
  votes: number;
  alive: boolean;
  partition: number;
};

export type TlaAction = {
  t: number;
  name: string;
  server: number;
  detail: string;
};

export type SimState = {
  time: number;
  nodes: NodeState[];
  network: Envelope[];
  nextMsgId: number;
  events: string[];
  trace: TlaAction[];
  speed: number;
  running: boolean;
  commandSeq: number;
  /** Mesa-leader: heartbeats only, no catch-up entries. Protocol-legal, starves log-fidelity. */
  mesaStarveCatchup: boolean;
};

const ELECTION_MIN = 280;
const ELECTION_SPAN = 220;
const HEARTBEAT = 40;
const DELAY_MIN = 8;
const DELAY_SPAN = 14;

function rand(min: number, span: number) {
  return min + Math.floor(Math.random() * span);
}

function lastIndex(log: LogEntry[]) {
  return log.length - 1;
}

function lastTerm(log: LogEntry[]) {
  return log[log.length - 1]?.term ?? 0;
}

function canTalk(a: NodeState, b: NodeState) {
  return a.alive && b.alive && a.partition === b.partition;
}

function pushEvent(sim: SimState, line: string) {
  sim.events = [line, ...sim.events].slice(0, 24);
}

function pushAction(sim: SimState, name: string, server: number, detail: string) {
  sim.trace = [{ t: sim.time, name, server, detail }, ...sim.trace].slice(0, 80);
}

function resetElection(n: NodeState, time: number) {
  n.electionDeadline = time + rand(ELECTION_MIN, ELECTION_SPAN);
}

function send(sim: SimState, from: number, to: number, rpc: Rpc) {
  const a = sim.nodes[from];
  const b = sim.nodes[to];
  if (!canTalk(a, b)) return;
  sim.network.push({
    id: sim.nextMsgId++,
    from,
    to,
    sentAt: sim.time,
    deliverAt: sim.time + rand(DELAY_MIN, DELAY_SPAN),
    rpc,
  });
  if (sim.network.length > 80) sim.network = sim.network.slice(-80);
}

function becomeFollower(n: NodeState, term: number, time: number) {
  if (term > n.currentTerm) n.votedFor = null;
  n.currentTerm = Math.max(n.currentTerm, term);
  n.role = "follower";
  n.votes = 0;
  resetElection(n, time);
}

function becomeLeader(n: NodeState, sim: SimState) {
  n.role = "leader";
  n.votes = 0;
  const nxt = lastIndex(n.log) + 1;
  for (let i = 0; i < NODE_COUNT; i++) {
    n.nextIndex[i] = nxt;
    n.matchIndex[i] = i === n.id ? lastIndex(n.log) : 0;
  }
  n.heartbeatDeadline = sim.time;
  pushEvent(sim, `s${n.id + 1} BecomeLeader term ${n.currentTerm}`);
  pushAction(sim, "BecomeLeader", n.id, `term ${n.currentTerm}`);
}

function startElection(n: NodeState, sim: SimState) {
  n.role = "candidate";
  n.currentTerm += 1;
  n.votedFor = n.id;
  n.votes = 1;
  resetElection(n, sim.time);
  const li = lastIndex(n.log);
  const lt = lastTerm(n.log);
  pushEvent(sim, `s${n.id + 1} Timeout → RequestVote term ${n.currentTerm}`);
  pushAction(sim, "Timeout", n.id, `RequestVote term ${n.currentTerm}`);
  for (let i = 0; i < NODE_COUNT; i++) {
    if (i === n.id) continue;
    send(sim, n.id, i, {
      kind: "RequestVote",
      term: n.currentTerm,
      candidateId: n.id,
      lastLogIndex: li,
      lastLogTerm: lt,
    });
  }
}

function replicateTo(leader: NodeState, followerId: number, sim: SimState) {
  const next = leader.nextIndex[followerId];
  const prevLogIndex = next - 1;
  const prevLogTerm = leader.log[prevLogIndex]?.term ?? 0;
  send(sim, leader.id, followerId, {
    kind: "AppendEntries",
    term: leader.currentTerm,
    leaderId: leader.id,
    prevLogIndex,
    prevLogTerm,
    entries: sim.mesaStarveCatchup ? [] : leader.log.slice(next),
    leaderCommit: leader.commitIndex,
  });
}

function heartbeatAll(leader: NodeState, sim: SimState) {
  for (let i = 0; i < NODE_COUNT; i++) {
    if (i === leader.id) continue;
    replicateTo(leader, i, sim);
  }
  leader.heartbeatDeadline = sim.time + HEARTBEAT;
}

function maybeCommit(leader: NodeState, sim: SimState) {
  for (let n = lastIndex(leader.log); n > leader.commitIndex; n--) {
    if (leader.log[n].term !== leader.currentTerm) continue;
    let count = 1;
    for (let i = 0; i < NODE_COUNT; i++) {
      if (i !== leader.id && leader.matchIndex[i] >= n) count += 1;
    }
    if (count >= MAJORITY) {
      leader.commitIndex = n;
      pushEvent(sim, `AdvanceCommitIndex ${n} (${leader.log[n].command})`);
      pushAction(sim, "AdvanceCommitIndex", leader.id, `index ${n}`);
      break;
    }
  }
}

function handle(sim: SimState, env: Envelope) {
  const n = sim.nodes[env.to];
  const rpc = env.rpc;
  if (!n.alive) return;

  if (rpc.term > n.currentTerm) becomeFollower(n, rpc.term, sim.time);

  switch (rpc.kind) {
    case "RequestVote": {
      let grant = false;
      if (rpc.term >= n.currentTerm) {
        const upToDate =
          rpc.lastLogTerm > lastTerm(n.log) ||
          (rpc.lastLogTerm === lastTerm(n.log) && rpc.lastLogIndex >= lastIndex(n.log));
        if ((n.votedFor === null || n.votedFor === rpc.candidateId) && upToDate) {
          grant = true;
          n.votedFor = rpc.candidateId;
          resetElection(n, sim.time);
        }
      }
      pushAction(
        sim,
        "HandleRequestVoteRequest",
        n.id,
        `from s${env.from + 1} granted=${grant}`,
      );
      send(sim, n.id, env.from, {
        kind: "RequestVoteReply",
        term: n.currentTerm,
        voteGranted: grant,
      });
      break;
    }
    case "RequestVoteReply": {
      if (n.role !== "candidate" || rpc.term !== n.currentTerm) break;
      if (rpc.voteGranted) {
        n.votes += 1;
        if (n.votes >= MAJORITY) becomeLeader(n, sim);
      }
      break;
    }
    case "AppendEntries": {
      if (rpc.term < n.currentTerm) {
        send(sim, n.id, env.from, {
          kind: "AppendEntriesReply",
          term: n.currentTerm,
          success: false,
          matchIndex: lastIndex(n.log),
        });
        break;
      }
      becomeFollower(n, rpc.term, sim.time);
      n.votedFor = rpc.leaderId;
      const prev = n.log[rpc.prevLogIndex];
      if (rpc.prevLogIndex > lastIndex(n.log) || (prev && prev.term !== rpc.prevLogTerm)) {
        send(sim, n.id, env.from, {
          kind: "AppendEntriesReply",
          term: n.currentTerm,
          success: false,
          matchIndex: lastIndex(n.log),
        });
        break;
      }
      let idx = rpc.prevLogIndex + 1;
      for (const entry of rpc.entries) {
        if (n.log[idx] && n.log[idx].term !== entry.term) n.log = n.log.slice(0, idx);
        if (!n.log[idx]) n.log.push(entry);
        else n.log[idx] = entry;
        idx += 1;
      }
      if (rpc.leaderCommit > n.commitIndex) {
        n.commitIndex = Math.min(rpc.leaderCommit, lastIndex(n.log));
      }
      if (rpc.entries.length) {
        pushAction(sim, "HandleAppendEntriesRequest", n.id, `${rpc.entries.length} entries`);
      }
      send(sim, n.id, env.from, {
        kind: "AppendEntriesReply",
        term: n.currentTerm,
        success: true,
        matchIndex: lastIndex(n.log),
      });
      break;
    }
    case "AppendEntriesReply": {
      if (n.role !== "leader" || rpc.term !== n.currentTerm) break;
      const f = env.from;
      if (rpc.success) {
        n.matchIndex[f] = Math.max(n.matchIndex[f], rpc.matchIndex);
        n.nextIndex[f] = n.matchIndex[f] + 1;
        maybeCommit(n, sim);
      } else {
        n.nextIndex[f] = Math.max(1, n.nextIndex[f] - 1);
      }
      break;
    }
  }
}

export function createSim(): SimState {
  const nodes: NodeState[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      id: i,
      role: "follower",
      currentTerm: 0,
      votedFor: null,
      log: [{ term: 0, command: "genesis" }],
      commitIndex: 0,
      nextIndex: Array(NODE_COUNT).fill(1),
      matchIndex: Array(NODE_COUNT).fill(0),
      electionDeadline: 40 + i * 90 + rand(0, 25),
      heartbeatDeadline: 0,
      votes: 0,
      alive: true,
      partition: 0,
    });
  }
  return {
    time: 0,
    nodes,
    network: [],
    nextMsgId: 1,
    events: ["Init. Five followers, term 0."],
    trace: [{ t: 0, name: "Init", server: -1, detail: "currentTerm=0, log=[genesis]" }],
    speed: 2,
    running: true,
    commandSeq: 0,
    mesaStarveCatchup: false,
  };
}

export function cloneSim(sim: SimState): SimState {
  return {
    ...sim,
    nodes: sim.nodes.map((n) => ({
      ...n,
      log: [...n.log],
      nextIndex: [...n.nextIndex],
      matchIndex: [...n.matchIndex],
    })),
    network: [...sim.network],
    events: [...sim.events],
    trace: [...sim.trace],
  };
}

export function tick(sim: SimState, dt: number) {
  if (!sim.running) return;
  const steps = Math.max(1, Math.round(dt * sim.speed));
  for (let s = 0; s < steps; s++) {
    sim.time += 1;
    const due = sim.network.filter((m) => m.deliverAt <= sim.time);
    sim.network = sim.network.filter((m) => m.deliverAt > sim.time);
    for (const env of due) handle(sim, env);
    for (const n of sim.nodes) {
      if (!n.alive) continue;
      if (n.role === "leader") {
        if (sim.time >= n.heartbeatDeadline) heartbeatAll(n, sim);
      } else if (sim.time >= n.electionDeadline) {
        startElection(n, sim);
      }
    }
  }
}

export function propose(sim: SimState, command?: string) {
  const leader = sim.nodes.find((n) => n.role === "leader" && n.alive);
  if (!leader) {
    pushEvent(sim, "ClientRequest refused — no leader.");
    return false;
  }
  sim.commandSeq += 1;
  const cmd = command?.trim() || `v${sim.commandSeq}`;
  leader.log.push({ term: leader.currentTerm, command: cmd });
  leader.matchIndex[leader.id] = lastIndex(leader.log);
  heartbeatAll(leader, sim);
  pushEvent(sim, `ClientRequest ${cmd} @ s${leader.id + 1}`);
  pushAction(sim, "ClientRequest", leader.id, cmd);
  return true;
}

export function crashNode(sim: SimState, id: number) {
  const n = sim.nodes[id];
  if (!n.alive) return;
  n.alive = false;
  n.role = "follower";
  sim.network = sim.network.filter((m) => m.from !== id && m.to !== id);
  pushEvent(sim, `Restart(crash) s${id + 1}`);
  pushAction(sim, "Restart", id, "crash");
}

export function reviveNode(sim: SimState, id: number) {
  const n = sim.nodes[id];
  n.alive = true;
  n.role = "follower";
  n.votes = 0;
  resetElection(n, sim.time);
  pushEvent(sim, `Restart(revive) s${id + 1}`);
  pushAction(sim, "Restart", id, "revive");
}

export function setPartition(sim: SimState, ids: number[], group: number) {
  for (const id of ids) sim.nodes[id].partition = group;
  pushEvent(
    sim,
    group === 0
      ? "Network heal"
      : `Partition {${ids.map((i) => `s${i + 1}`).join(",")}}`,
  );
}

export function healAll(sim: SimState) {
  for (const n of sim.nodes) n.partition = 0;
  pushEvent(sim, "Network heal");
}

export function leaderOf(sim: SimState) {
  return sim.nodes.find((n) => n.role === "leader" && n.alive) ?? null;
}
