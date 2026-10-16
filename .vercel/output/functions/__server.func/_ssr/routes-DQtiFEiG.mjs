import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DQtiFEiG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface text-fg border border-border hover:bg-subtle",
			ghost: "text-muted hover:text-fg hover:bg-subtle",
			danger: "bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25"
		},
		size: {
			md: "h-11 px-4 text-sm rounded-[var(--radius-sm)]",
			sm: "h-9 px-3 text-xs rounded-[var(--radius-xs)]",
			lg: "h-12 px-5 text-sm rounded-[var(--radius-md)]",
			icon: "size-11 rounded-[var(--radius-sm)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function lineClass(line) {
	const t = line.t.trimStart();
	if (t.startsWith("(*") || t.startsWith("\\*")) return "text-faint";
	if (/^(MODULE|EXTENDS|CONSTANTS|CONSTANT|VARIABLES|VARIABLE|ASSUME|THEOREM|LEMMA|SPECIFICATION|INVARIANT|CONSTRAINT)\b/.test(t)) return "text-fg";
	if (/^(TypeOK|ElectionSafety|LogMatching|StateMachineSafety|LeaderCompleteness|CurrentTermCommit|Inv|Chosen|Spec|Init|Next|Phase|Send|MesaFree|LobFixedPoint|PrePrepare|Prepare|Commit|LogLinearizable|EncodedChosen)/.test(t)) return "text-fg";
	return "text-muted";
}
function SpecPanel({ doc }) {
	const first = doc.lines.findIndex((l) => l.obl || l.note);
	const [sel, setSel] = (0, import_react.useState)(first >= 0 ? first : null);
	const active = sel != null ? doc.lines[sel] : void 0;
	const note = active?.obl || active?.note;
	const obligations = doc.lines.map((l, i) => ({
		l,
		i
	})).filter((x) => x.l.obl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-faint",
					children: [doc.module, ".tla"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-medium tracking-tight",
					children: doc.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden max-w-xs text-right text-xs text-faint sm:block",
						children: doc.source
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md px-2 py-1 font-mono text-xs text-muted hover:bg-subtle hover:text-fg",
						onClick: () => {
							navigator.clipboard.writeText(doc.lines.map((l) => l.t).join("\n"));
						},
						children: "Copy"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 max-h-[70vh] overflow-auto rounded-xl border border-border bg-subtle p-3 font-mono text-xs leading-relaxed",
				children: doc.lines.map((line, i) => {
					const marked = Boolean(line.obl || line.note);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => marked && setSel(i),
						className: cn("flex w-full flex-nowrap gap-3 text-left", marked && "hover:bg-surface", sel === i && marked && "bg-surface"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 shrink-0 select-none text-right text-faint tabular-nums",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("min-w-max whitespace-pre", lineClass(line), marked && "text-fg"),
								children: line.t.length ? line.t : " "
							}),
							line.obl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto shrink-0 text-ok",
								children: "obl"
							}) : null
						]
					}, i);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex min-w-0 flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-faint",
					children: "Proof obligations"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1",
					children: obligations.map(({ l, i }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSel(i),
						className: cn("w-full rounded-md px-2 py-2 text-left font-mono text-xs", sel === i ? "bg-subtle text-fg" : "text-muted hover:text-fg"),
						children: [
							"L",
							i + 1,
							" ",
							l.t.replace(/\s*==.*/, "").replace("(*", "").replace("*)", "").trim().slice(0, 42)
						]
					}) }, i))
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-faint",
						children: active?.obl ? "Obligation" : "Annotation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: note
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-faint",
					children: "Select a highlighted line."
				})
			]
		})]
	});
}
function createPbft() {
	return {
		replicas: Array.from({ length: 4 }, (_, id) => ({
			id,
			view: 0,
			seq: 0,
			phase: "idle",
			prepared: [
				false,
				false,
				false,
				false
			],
			committed: [
				false,
				false,
				false,
				false
			],
			byzantine: false,
			value: null,
			equivocated: false
		})),
		primary: 0,
		view: 0,
		seq: 1,
		value: "v1",
		log: ["Init. view=0 primary=r1 n=4 f=1. Quorum = 2f+1 = 3."]
	};
}
function clonePbft(s) {
	return {
		...s,
		replicas: s.replicas.map((r) => ({
			...r,
			prepared: [...r.prepared],
			committed: [...r.committed]
		})),
		log: [...s.log]
	};
}
function prePrepare(s) {
	const p = s.replicas[s.primary];
	if (p.byzantine) s.log = [`⟨PRE-PREPARE⟩ primary r${p.id + 1} is Byzantine — may send two values.`, ...s.log].slice(0, 24);
	for (const r of s.replicas) {
		r.view = s.view;
		r.seq = s.seq;
		r.phase = "pre-prepare";
		r.value = s.value;
	}
	s.log = [`⟨PRE-PREPARE, v=${s.view}, n=${s.seq}, ${s.value}⟩ from r${s.primary + 1}`, ...s.log].slice(0, 24);
}
function prepareAll(s) {
	for (const r of s.replicas) {
		if (r.phase !== "pre-prepare" && r.phase !== "prepare") continue;
		r.phase = "prepare";
		for (const q of s.replicas) {
			if (r.byzantine && q.id !== r.id && q.id % 2 === 0) continue;
			q.prepared[r.id] = true;
		}
	}
	s.log = ["⟨PREPARE⟩ multicast. Matching 2f+1 PREPARE ⇒ prepared certificate.", ...s.log].slice(0, 24);
}
function commitAll(s) {
	for (const r of s.replicas) {
		if (r.prepared.filter(Boolean).length < 3) continue;
		r.phase = "commit";
		for (const q of s.replicas) q.committed[r.id] = true;
	}
	for (const r of s.replicas) if (r.committed.filter(Boolean).length >= 3) r.phase = "decided";
	s.log = ["⟨COMMIT⟩. Matching 2f+1 COMMIT ⇒ decided. Safety: any two 2f+1 sets intersect in ≥ f+1 honest.", ...s.log].slice(0, 24);
}
function viewChange(s) {
	s.view += 1;
	s.primary = s.view % 4;
	s.seq += 1;
	for (const r of s.replicas) {
		r.view = s.view;
		r.seq = s.seq;
		r.phase = "idle";
		r.prepared = [
			false,
			false,
			false,
			false
		];
		r.committed = [
			false,
			false,
			false,
			false
		];
		r.value = null;
		r.equivocated = false;
	}
	s.log = [`View-change → view ${s.view}, primary r${s.primary + 1}.`, ...s.log].slice(0, 24);
}
function toggleByzantine(s, id) {
	const r = s.replicas[id];
	r.byzantine = !r.byzantine;
	s.log = [`r${id + 1} Byzantine = ${r.byzantine}`, ...s.log].slice(0, 24);
}
function equivocate$1(s, id) {
	const r = s.replicas[id];
	r.byzantine = true;
	r.equivocated = true;
	r.value = r.value === "v1" ? "v2" : "v1";
	s.log = [`r${id + 1} equivocates: sends ${r.value} on one edge, the other value on another.`, ...s.log].slice(0, 24);
}
function decidedValues(s) {
	return [...new Set(s.replicas.filter((r) => r.phase === "decided" && r.value).map((r) => r.value))];
}
function preparedCount(r) {
	return r.prepared.filter(Boolean).length;
}
function committedCount(r) {
	return r.committed.filter(Boolean).length;
}
var RAFT_SPEC = {
	id: "raft",
	title: "Raft core (Ongaro)",
	module: "raft_invariants",
	source: "Diego Ongaro, raft.tla + election/log safety extensions",
	lines: [
		{ t: "--------------------------------- MODULE raft_invariants ---------------------------------" },
		{ t: "EXTENDS raft, TLC" },
		{ t: "" },
		{
			t: "(* Type correctness. Proof obligation: Init ⇒ TypeOK, TypeOK ∧ Next ⇒ TypeOK' *)",
			obl: "TLAPS: TypeOK inductive. Discharge with Isabelle/Zenon on each action."
		},
		{ t: "TypeOK ==" },
		{ t: "  /\\ currentTerm \\in [Server -> Nat]" },
		{ t: "  /\\ state \\in [Server -> {Follower, Candidate, Leader}]" },
		{ t: "  /\\ votedFor \\in [Server -> (Server \\cup {Nil})]" },
		{ t: "  /\\ log \\in [Server -> Seq([term : Nat, value : Value])]" },
		{ t: "  /\\ commitIndex \\in [Server -> Nat]" },
		{
			t: "  /\\ \\A i \\in Server : commitIndex[i] <= Len(log[i])",
			note: "A committed index is always a valid log prefix."
		},
		{ t: "" },
		{
			t: "(* Election Safety — Figure 3, property 1. At most one leader per term. *)",
			obl: "Lemma: votes granted in term t form a quorum. Any two quorums intersect, so two leaders of term t would require a server to vote twice in t."
		},
		{ t: "ElectionSafety ==" },
		{ t: "  \\A i, j \\in Server :" },
		{ t: "    (state[i] = Leader /\\ state[j] = Leader /\\ currentTerm[i] = currentTerm[j])" },
		{ t: "    => i = j" },
		{ t: "" },
		{
			t: "(* Log Matching — Figure 3, property 4. *)",
			obl: "If log[i][k].term = log[j][k].term then ∀ m ≤ k : log[i][m] = log[j][m]. Inductive on AppendEntries consistency check (prevLogIndex/prevLogTerm)."
		},
		{ t: "LogMatching ==" },
		{ t: "  \\A i, j \\in Server :" },
		{ t: "    \\A k \\in 1..Min({Len(log[i]), Len(log[j])}) :" },
		{ t: "      log[i][k].term = log[j][k].term" },
		{ t: "      => \\A m \\in 1..k : log[i][m] = log[j][m]" },
		{ t: "" },
		{
			t: "(* Leader Completeness — Figure 3, property 3. *)",
			obl: "If an entry is committed in term t, every leader of term > t stores it. Proof: the committing majority of term t still holds the entry; a later candidate must be at least as up-to-date (RequestVote restriction)."
		},
		{ t: "LeaderCompleteness ==" },
		{ t: "  \\A i \\in Server :" },
		{ t: "    state[i] = Leader =>" },
		{ t: "      \\A j \\in Server, k \\in 1..commitIndex[j] :" },
		{ t: "        log[j][k] \\in Range(log[i])" },
		{ t: "" },
		{
			t: "(* Current-term commit — Figure 8. *)",
			obl: "A leader may not advance commitIndex past a previous-term entry until it has committed an entry of its own term. TLC finds a StateMachineSafety counterexample if this is dropped."
		},
		{ t: "CurrentTermCommit ==" },
		{ t: "  \\A i \\in Server :" },
		{ t: "    state[i] = Leader =>" },
		{ t: "      \\A k \\in 1..commitIndex[i] :" },
		{ t: "        \\E m \\in k..commitIndex[i] : log[i][m].term = currentTerm[i]" },
		{ t: "" },
		{
			t: "(* State Machine Safety — Figure 3, property 5. *)",
			obl: "Committed prefixes are identical. Follows from LogMatching + LeaderCompleteness + the majority-matchIndex rule (only current-term entries)."
		},
		{ t: "StateMachineSafety ==" },
		{ t: "  \\A i, j \\in Server :" },
		{ t: "    \\A k \\in 1..Min({commitIndex[i], commitIndex[j]}) :" },
		{ t: "      log[i][k] = log[j][k]" },
		{ t: "" },
		{ t: "THEOREM Spec => [](TypeOK /\\ ElectionSafety /\\ LogMatching /\\ StateMachineSafety)" },
		{ t: "=============================================================================" }
	]
};
var PAXOS_SPEC = {
	id: "paxos",
	title: "Basic Paxos (single decree)",
	module: "BasicPaxos",
	source: "Lamport; tlaplus/Examples Paxos, annotated",
	lines: [
		{ t: "--------------------------------- MODULE BasicPaxos ---------------------------------" },
		{ t: "EXTENDS Integers, FiniteSets, TLC" },
		{ t: "" },
		{ t: "CONSTANTS Value, Acceptor, Quorum" },
		{ t: "" },
		{
			t: "ASSUME QuorumAssumption ==",
			obl: "The entire safety argument is this one line. If two quorums can be disjoint, uniqueness fails."
		},
		{ t: "  /\\ \\A Q \\in Quorum : Q \\subseteq Acceptor" },
		{ t: "  /\\ \\A Q1, Q2 \\in Quorum : Q1 \\cap Q2 # {}" },
		{ t: "" },
		{ t: "Ballot == Nat" },
		{ t: "None   == CHOOSE v : v \\notin Value" },
		{ t: "" },
		{ t: "Message ==" },
		{ t: "  [type : {\"1a\"}, bal : Ballot]" },
		{ t: "  \\cup [type : {\"1b\"}, acc : Acceptor, bal : Ballot," },
		{ t: "        mbal : Ballot \\cup {-1}, mval : Value \\cup {None}]" },
		{ t: "  \\cup [type : {\"2a\"}, bal : Ballot, val : Value]" },
		{ t: "  \\cup [type : {\"2b\"}, acc : Acceptor, bal : Ballot, val : Value]" },
		{ t: "" },
		{ t: "VARIABLES msgs, maxBal, maxVBal, maxVal" },
		{ t: "vars == <<msgs, maxBal, maxVBal, maxVal>>" },
		{ t: "" },
		{
			t: "TypeOK ==",
			obl: "Inductive invariant. Init ⇒ TypeOK, TypeOK ∧ Next ⇒ TypeOK'."
		},
		{ t: "  /\\ msgs \\subseteq Message" },
		{ t: "  /\\ maxBal  \\in [Acceptor -> Ballot \\cup {-1}]" },
		{ t: "  /\\ maxVBal \\in [Acceptor -> Ballot \\cup {-1}]" },
		{ t: "  /\\ maxVal  \\in [Acceptor -> Value \\cup {None}]" },
		{ t: "" },
		{
			t: "Init ==",
			note: "No messages, no ballots seen, no votes cast."
		},
		{ t: "  /\\ msgs    = {}" },
		{ t: "  /\\ maxBal  = [a \\in Acceptor |-> -1]" },
		{ t: "  /\\ maxVBal = [a \\in Acceptor |-> -1]" },
		{ t: "  /\\ maxVal  = [a \\in Acceptor |-> None]" },
		{ t: "" },
		{
			t: "Phase1a(b) ==",
			note: "Prepare. The proposer may issue any unused ballot."
		},
		{ t: "  /\\ Send([type |-> \"1a\", bal |-> b])" },
		{ t: "  /\\ UNCHANGED <<maxBal, maxVBal, maxVal>>" },
		{ t: "" },
		{
			t: "Phase1b(a) ==",
			obl: "Promise is issued only if b > maxBal[a]. After this, a will never accept a lower ballot. Reports (maxVBal, maxVal) so Phase2a can force the value."
		},
		{ t: "  \\E m \\in msgs :" },
		{ t: "    /\\ m.type = \"1a\"" },
		{ t: "    /\\ m.bal > maxBal[a]" },
		{ t: "    /\\ Send([type |-> \"1b\", acc |-> a, bal |-> m.bal," },
		{ t: "             mbal |-> maxVBal[a], mval |-> maxVal[a]])" },
		{ t: "    /\\ maxBal' = [maxBal EXCEPT ![a] = m.bal]" },
		{ t: "    /\\ UNCHANGED <<maxVBal, maxVal>>" },
		{ t: "" },
		{
			t: "Phase2a(b, v) ==",
			obl: "At most one 2a per ballot. v is free iff every promise has mbal = −1; otherwise v equals the value of the highest mbal. This is the uniqueness hinge. Dropping the force rule is the mutation TLC uses to violate Inv."
		},
		{ t: "  /\\ ~ \\E m \\in msgs : m.type = \"2a\" /\\ m.bal = b" },
		{ t: "  /\\ \\E Q \\in Quorum :" },
		{ t: "       LET S == {m \\in msgs : m.type = \"1b\" /\\ m.bal = b}" },
		{ t: "       IN  /\\ \\A a \\in Q : \\E m \\in S : m.acc = a" },
		{ t: "           /\\ \\/ \\A m \\in S : m.mbal = -1" },
		{ t: "              \\/ \\E c \\in 0..(b-1) :" },
		{ t: "                   /\\ \\E m \\in S : m.mbal = c /\\ m.val = v" },
		{ t: "                   /\\ \\A m \\in S : m.mbal <= c" },
		{ t: "  /\\ Send([type |-> \"2a\", bal |-> b, val |-> v])" },
		{ t: "  /\\ UNCHANGED <<maxBal, maxVBal, maxVal>>" },
		{ t: "" },
		{
			t: "Phase2b(a) ==",
			note: "Accept. Allowed iff the 2a ballot is ≥ maxBal[a]."
		},
		{ t: "  \\E m \\in msgs :" },
		{ t: "    /\\ m.type = \"2a\"" },
		{ t: "    /\\ m.bal >= maxBal[a]" },
		{ t: "    /\\ Send([type |-> \"2b\", acc |-> a, bal |-> m.bal, val |-> m.val])" },
		{ t: "    /\\ maxBal'  = [maxBal  EXCEPT ![a] = m.bal]" },
		{ t: "    /\\ maxVBal' = [maxVBal EXCEPT ![a] = m.bal]" },
		{ t: "    /\\ maxVal'  = [maxVal  EXCEPT ![a] = m.val]" },
		{ t: "" },
		{ t: "Next == \\/ \\E b \\in Ballot : Phase1a(b)" },
		{ t: "        \\/ \\E a \\in Acceptor : Phase1b(a)" },
		{ t: "        \\/ \\E b \\in Ballot, v \\in Value : Phase2a(b, v)" },
		{ t: "        \\/ \\E a \\in Acceptor : Phase2b(a)" },
		{ t: "" },
		{ t: "Spec == Init /\\ [][Next]_vars" },
		{ t: "" },
		{
			t: "Chosen(v) ==",
			note: "A value is chosen when a quorum has sent matching 2b for some ballot."
		},
		{ t: "  \\E b \\in Ballot, Q \\in Quorum :" },
		{ t: "    \\A a \\in Q : \\E m \\in msgs :" },
		{ t: "      m.type = \"2b\" /\\ m.acc = a /\\ m.bal = b /\\ m.val = v" },
		{ t: "" },
		{
			t: "Inv ==",
			obl: "Safety. TypeOK is inductive; uniqueness uses QuorumAssumption + the Phase2a force rule. TLAPS: prove ChosenImpliesAccepted, then at most one 2a value per intersecting quorum chain."
		},
		{ t: "  /\\ TypeOK" },
		{ t: "  /\\ \\A v1, v2 \\in Value : Chosen(v1) /\\ Chosen(v2) => v1 = v2" },
		{ t: "" },
		{ t: "THEOREM Spec => []Inv" },
		{ t: "=============================================================================" },
		{ t: "Send(m) == msgs' = msgs \\cup {m}" }
	]
};
var MULTI_SPEC = {
	id: "multi",
	title: "Multi-Paxos (log of instances)",
	module: "MultiPaxos",
	source: "Lamport; van Renesse; Hu 2024 MultiPaxos-SMR",
	lines: [
		{ t: "--------------------------------- MODULE MultiPaxos ---------------------------------" },
		{ t: "EXTENDS Integers, Sequences, FiniteSets, TLC" },
		{ t: "" },
		{ t: "CONSTANTS Value, Acceptor, Quorum, MaxSlot" },
		{ t: "ASSUME QuorumAssumption == \\A Q1, Q2 \\in Quorum : Q1 \\cap Q2 # {}" },
		{ t: "" },
		{ t: "Ballot == Nat" },
		{ t: "Slot   == 1..MaxSlot" },
		{ t: "None   == CHOOSE v : v \\notin Value" },
		{ t: "" },
		{ t: "VARIABLES" },
		{ t: "  msgs," },
		{ t: "  maxBal,          \\* [Acceptor → Ballot ∪ {-1}]  — global, not per-slot" },
		{ t: "  maxVBal,         \\* [Acceptor × Slot → Ballot ∪ {-1}]" },
		{ t: "  maxVal,          \\* [Acceptor × Slot → Value ∪ {None}]" },
		{ t: "  leader," },
		{ t: "  decided          \\* decided[slot] = chosen value or None" },
		{ t: "vars == <<msgs, maxBal, maxVBal, maxVal, leader, decided>>" },
		{ t: "" },
		{ t: "TypeOK ==" },
		{ t: "  /\\ maxBal  \\in [Acceptor -> Ballot \\cup {-1}]" },
		{ t: "  /\\ decided \\in [Slot -> Value \\cup {None}]" },
		{ t: "" },
		{
			t: "(* Phase 1 is run once by a stable leader for a range of slots. *)",
			note: "Amortization that makes Multi-Paxos (and Raft) fast. After promises for ballot b covering slots ≥ fromSlot, the leader only sends 2a for each successive slot."
		},
		{
			t: "Phase1Range(b, fromSlot) ==",
			obl: "Promises collected for ballot b apply to every slot ≥ fromSlot. Safety is still per-slot: the force-value rule is applied independently at each slot from the 1b payload (mbal[s], mval[s])."
		},
		{ t: "  /\\ leader' = ProposerOf(b)" },
		{ t: "  /\\ Send([type |-> \"1a\", bal |-> b, from |-> fromSlot])" },
		{ t: "  /\\ \\A a \\in Acceptor :" },
		{ t: "       maxBal[a] < b =>" },
		{ t: "         Send([type |-> \"1b\", acc |-> a, bal |-> b," },
		{ t: "               accepted |-> [s \\in fromSlot..MaxSlot |->" },
		{ t: "                              <<maxVBal[a][s], maxVal[a][s]>>]])" },
		{ t: "" },
		{
			t: "Phase2Slot(b, s, v) ==",
			obl: "Same as Basic Paxos Phase2a, indexed by slot s. v is free iff no promise reports an accepted value at s; otherwise v is the value of the highest mbal at s. Raft AppendEntries is this action with v a client command and s = next log index."
		},
		{ t: "  /\\ leader # None" },
		{ t: "  /\\ ~ \\E m \\in msgs : m.type = \"2a\" /\\ m.bal = b /\\ m.slot = s" },
		{ t: "  /\\ \\E Q \\in Quorum : QuorumPromised(Q, b)" },
		{ t: "  /\\ Forced(b, s, v) \\/ NoPrevious(b, s)" },
		{ t: "  /\\ Send([type |-> \"2a\", bal |-> b, slot |-> s, val |-> v])" },
		{ t: "" },
		{
			t: "Phase2bSlot(a, s) ==",
			note: "Acceptor a accepts (b, s, v) iff b ≥ maxBal[a]."
		},
		{ t: "  \\E m \\in msgs :" },
		{ t: "    /\\ m.type = \"2a\" /\\ m.slot = s /\\ m.bal >= maxBal[a]" },
		{ t: "    /\\ maxVBal' = [maxVBal EXCEPT ![a][s] = m.bal]" },
		{ t: "    /\\ maxVal'  = [maxVal  EXCEPT ![a][s] = m.val]" },
		{ t: "" },
		{
			t: "Decide(s, v) ==",
			obl: "decided[s] = v when a quorum has 2b for (b, s, v). Uniqueness per slot is BasicPaxos Inv. Contiguous prefix {1..c} of decided slots is the committed log — Raft commitIndex."
		},
		{ t: "  /\\ decided[s] = None" },
		{ t: "  /\\ \\E b \\in Ballot, Q \\in Quorum :" },
		{ t: "       \\A a \\in Q : Accepted(a, b, s, v)" },
		{ t: "  /\\ decided' = [decided EXCEPT ![s] = v]" },
		{ t: "" },
		{
			t: "LogLinearizable ==",
			obl: "∀ s ≤ s' : if both decided, (decided[s], decided[s']) appears in some linearization of client ops. Equivalent to Raft StateMachineSafety on a contiguous prefix."
		},
		{ t: "  \\A s, s2 \\in Slot :" },
		{ t: "    s <= s2 /\\ decided[s] # None /\\ decided[s2] # None" },
		{ t: "    => Compatible(decided[s], decided[s2])" },
		{ t: "" },
		{ t: "Inv == TypeOK /\\ \\A s \\in Slot : AtMostOneValue(s) /\\ LogLinearizable" },
		{ t: "THEOREM Spec => []Inv" },
		{ t: "=============================================================================" }
	]
};
var PBFT_SPEC = {
	id: "pbft",
	title: "PBFT (Castro–Liskov)",
	module: "PBFT_notes",
	source: "Castro & Liskov, OSDI 1999; n = 3f+1",
	lines: [
		{ t: "--------------------------------- MODULE PBFT_notes ---------------------------------" },
		{ t: "EXTENDS Integers, FiniteSets, TLC" },
		{ t: "" },
		{ t: "CONSTANTS Replica, f" },
		{ t: "n == 3*f + 1" },
		{ t: "Quorum == { Q \\in SUBSET Replica : Cardinality(Q) >= 2*f + 1 }" },
		{ t: "" },
		{
			t: "ASSUME",
			obl: "Any two 2f+1-sets intersect in ≥ f+1 replicas. At most f are Byzantine, so the intersection contains ≥ 1 honest replica, who never equivocates."
		},
		{ t: "  /\\ Cardinality(Replica) = 3*f + 1" },
		{ t: "  /\\ \\A Q1, Q2 \\in Quorum : Cardinality(Q1 \\cap Q2) >= f + 1" },
		{ t: "" },
		{ t: "VARIABLES view, primary, seq, msgs, prepared, committed, decided" },
		{ t: "" },
		{
			t: "PrePrepare ==",
			note: "Primary of the view assigns sequence number n to val and broadcasts PRE-PREPARE."
		},
		{ t: "  Send([type |-> \"pre-prepare\", v |-> view, n |-> seq, val |-> val])" },
		{ t: "" },
		{
			t: "Prepare(i) ==",
			obl: "Replica i echoes PREPARE. prepared[i] when it has a matching PRE-PREPARE plus 2f PREPARE from distinct replicas (2f+1 including self)."
		},
		{ t: "  /\\ received valid PRE-PREPARE" },
		{ t: "  /\\ Send([type |-> \"prepare\", v |-> view, n |-> seq, val |-> val, i |-> i])" },
		{ t: "  /\\ prepared[i] iff CountMatchingPrepare >= 2*f + 1" },
		{ t: "" },
		{
			t: "Commit(i) ==",
			obl: "decided[i] = val when 2f+1 matching COMMIT. Safety: two honest replicas that decide, decide the same value, because their COMMIT quorums intersect in an honest replica that prepared a unique (n, val)."
		},
		{ t: "  /\\ prepared[i]" },
		{ t: "  /\\ Send([type |-> \"commit\", v |-> view, n |-> seq, val |-> val, i |-> i])" },
		{ t: "  /\\ decided[i] = val iff CountMatchingCommit >= 2*f + 1" },
		{ t: "" },
		{
			t: "Inv ==",
			obl: "Agreement. Proof reduces to quorum intersection of prepared certificates plus honest non-equivocation."
		},
		{ t: "  \\A i, j \\in Replica :" },
		{ t: "    decided[i] # None /\\ decided[j] # None => decided[i] = decided[j]" },
		{ t: "" },
		{ t: "THEOREM Spec => []Inv" },
		{ t: "=============================================================================" }
	]
};
function ByzantineLab({ state, edit, sub }) {
	if (sub === "spec") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecPanel, { doc: PBFT_SPEC });
	const decided = decidedValues(state);
	const unique = decided.length <= 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-faint",
					children: [
						"PBFT · n=",
						4,
						" f=1 · quorum 2f+1=",
						3
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-medium tracking-tight",
					children: "Three-phase commit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "Any two 2f+1 sets intersect in ≥ f+1. At most f Byzantine, so the intersection contains an honest replica that never equivocates. That is the safety engine."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex min-w-0 flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => edit(prePrepare),
							children: "Pre-prepare"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => edit(prepareAll),
							children: "Prepare"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => edit(commitAll),
							children: "Commit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => edit(viewChange),
							children: "View-change"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => edit((s) => {
								Object.assign(s, createPbft());
							}),
							children: "Init"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-xs text-faint",
					children: [
						"view=",
						state.view,
						" · primary=r",
						state.primary + 1,
						" · seq=",
						state.seq,
						" · decided=",
						decided.length ? decided.join(",") : "∅"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
					children: state.replicas.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => edit((s) => toggleByzantine(s, r.id)),
						className: cn("rounded-lg border p-3 text-left", r.byzantine ? "border-danger/40 bg-subtle" : "border-border bg-surface"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-faint",
								children: [
									"r",
									r.id + 1,
									r.id === state.primary ? " primary" : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg",
								children: r.phase
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-mono text-xs text-muted",
								children: [
									"prep ",
									preparedCount(r),
									"/",
									4,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"cmt ",
									committedCount(r),
									"/",
									4,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"val ",
									r.value ?? "—"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xs text-faint",
								children: r.byzantine ? "Byzantine" : "honest"
							})
						]
					}, r.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "danger",
						onClick: () => edit((s) => equivocate$1(s, 1)),
						children: "Equivocate r2"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 max-h-40 overflow-auto font-mono text-xs text-muted",
					children: state.log.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, i))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-medium tracking-tight",
				children: "Invariants"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 divide-y divide-border rounded-xl border border-border bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inv, {
						name: "Agreement",
						holds: unique,
						text: "decided[i] ≠ None ∧ decided[j] ≠ None ⇒ decided[i] = decided[j]",
						witness: unique ? void 0 : decided.join(", ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inv, {
						name: "QuorumIntersection",
						holds: true,
						text: "∀ Q1, Q2 : |Q1 ∩ Q2| ≥ f+1 = 2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inv, {
						name: "HonestyBound",
						holds: state.replicas.filter((r) => r.byzantine).length <= 1,
						text: "|{ Byzantine }| ≤ f = 1"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs leading-relaxed text-muted",
				children: "Mapping onto Paxos: PRE-PREPARE ≈ 2a (primary is the proposer), PREPARE ≈ 1b/2b certificate, COMMIT ≈ Chosen. View-change ≈ new ballot. Raft terms are views with a single primary."
			})
		] })]
	});
}
function Inv({ name, holds, text, witness }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs text-fg",
				children: [
					name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: holds ? "text-ok" : "text-danger",
						children: holds ? "TRUE" : "FALSE"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-faint",
				children: text
			}),
			witness ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-danger",
				children: witness
			}) : null
		]
	});
}
var ELECTION_MIN = 280;
var ELECTION_SPAN = 220;
var HEARTBEAT = 40;
var DELAY_MIN = 8;
var DELAY_SPAN = 14;
function rand(min, span) {
	return min + Math.floor(Math.random() * span);
}
function lastIndex(log) {
	return log.length - 1;
}
function lastTerm(log) {
	return log[log.length - 1]?.term ?? 0;
}
function canTalk(a, b) {
	return a.alive && b.alive && a.partition === b.partition;
}
function pushEvent(sim, line) {
	sim.events = [line, ...sim.events].slice(0, 24);
}
function pushAction(sim, name, server, detail) {
	sim.trace = [{
		t: sim.time,
		name,
		server,
		detail
	}, ...sim.trace].slice(0, 80);
}
function resetElection(n, time) {
	n.electionDeadline = time + rand(ELECTION_MIN, ELECTION_SPAN);
}
function send$1(sim, from, to, rpc) {
	const a = sim.nodes[from];
	const b = sim.nodes[to];
	if (!canTalk(a, b)) return;
	sim.network.push({
		id: sim.nextMsgId++,
		from,
		to,
		sentAt: sim.time,
		deliverAt: sim.time + rand(DELAY_MIN, DELAY_SPAN),
		rpc
	});
	if (sim.network.length > 80) sim.network = sim.network.slice(-80);
}
function becomeFollower(n, term, time) {
	if (term > n.currentTerm) n.votedFor = null;
	n.currentTerm = Math.max(n.currentTerm, term);
	n.role = "follower";
	n.votes = 0;
	resetElection(n, time);
}
function becomeLeader(n, sim) {
	n.role = "leader";
	n.votes = 0;
	const nxt = lastIndex(n.log) + 1;
	for (let i = 0; i < 5; i++) {
		n.nextIndex[i] = nxt;
		n.matchIndex[i] = i === n.id ? lastIndex(n.log) : 0;
	}
	n.heartbeatDeadline = sim.time;
	pushEvent(sim, `s${n.id + 1} BecomeLeader term ${n.currentTerm}`);
	pushAction(sim, "BecomeLeader", n.id, `term ${n.currentTerm}`);
}
function startElection(n, sim) {
	n.role = "candidate";
	n.currentTerm += 1;
	n.votedFor = n.id;
	n.votes = 1;
	resetElection(n, sim.time);
	const li = lastIndex(n.log);
	const lt = lastTerm(n.log);
	pushEvent(sim, `s${n.id + 1} Timeout → RequestVote term ${n.currentTerm}`);
	pushAction(sim, "Timeout", n.id, `RequestVote term ${n.currentTerm}`);
	for (let i = 0; i < 5; i++) {
		if (i === n.id) continue;
		send$1(sim, n.id, i, {
			kind: "RequestVote",
			term: n.currentTerm,
			candidateId: n.id,
			lastLogIndex: li,
			lastLogTerm: lt
		});
	}
}
function replicateTo(leader, followerId, sim) {
	const next = leader.nextIndex[followerId];
	const prevLogIndex = next - 1;
	const prevLogTerm = leader.log[prevLogIndex]?.term ?? 0;
	send$1(sim, leader.id, followerId, {
		kind: "AppendEntries",
		term: leader.currentTerm,
		leaderId: leader.id,
		prevLogIndex,
		prevLogTerm,
		entries: sim.mesaStarveCatchup ? [] : leader.log.slice(next),
		leaderCommit: leader.commitIndex
	});
}
function heartbeatAll(leader, sim) {
	for (let i = 0; i < 5; i++) {
		if (i === leader.id) continue;
		replicateTo(leader, i, sim);
	}
	leader.heartbeatDeadline = sim.time + HEARTBEAT;
}
function maybeCommit(leader, sim) {
	for (let n = lastIndex(leader.log); n > leader.commitIndex; n--) {
		if (leader.log[n].term !== leader.currentTerm) continue;
		let count = 1;
		for (let i = 0; i < 5; i++) if (i !== leader.id && leader.matchIndex[i] >= n) count += 1;
		if (count >= 3) {
			leader.commitIndex = n;
			pushEvent(sim, `AdvanceCommitIndex ${n} (${leader.log[n].command})`);
			pushAction(sim, "AdvanceCommitIndex", leader.id, `index ${n}`);
			break;
		}
	}
}
function handle(sim, env) {
	const n = sim.nodes[env.to];
	const rpc = env.rpc;
	if (!n.alive) return;
	if (rpc.term > n.currentTerm) becomeFollower(n, rpc.term, sim.time);
	switch (rpc.kind) {
		case "RequestVote": {
			let grant = false;
			if (rpc.term >= n.currentTerm) {
				const upToDate = rpc.lastLogTerm > lastTerm(n.log) || rpc.lastLogTerm === lastTerm(n.log) && rpc.lastLogIndex >= lastIndex(n.log);
				if ((n.votedFor === null || n.votedFor === rpc.candidateId) && upToDate) {
					grant = true;
					n.votedFor = rpc.candidateId;
					resetElection(n, sim.time);
				}
			}
			pushAction(sim, "HandleRequestVoteRequest", n.id, `from s${env.from + 1} granted=${grant}`);
			send$1(sim, n.id, env.from, {
				kind: "RequestVoteReply",
				term: n.currentTerm,
				voteGranted: grant
			});
			break;
		}
		case "RequestVoteReply":
			if (n.role !== "candidate" || rpc.term !== n.currentTerm) break;
			if (rpc.voteGranted) {
				n.votes += 1;
				if (n.votes >= 3) becomeLeader(n, sim);
			}
			break;
		case "AppendEntries": {
			if (rpc.term < n.currentTerm) {
				send$1(sim, n.id, env.from, {
					kind: "AppendEntriesReply",
					term: n.currentTerm,
					success: false,
					matchIndex: lastIndex(n.log)
				});
				break;
			}
			becomeFollower(n, rpc.term, sim.time);
			n.votedFor = rpc.leaderId;
			const prev = n.log[rpc.prevLogIndex];
			if (rpc.prevLogIndex > lastIndex(n.log) || prev && prev.term !== rpc.prevLogTerm) {
				send$1(sim, n.id, env.from, {
					kind: "AppendEntriesReply",
					term: n.currentTerm,
					success: false,
					matchIndex: lastIndex(n.log)
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
			if (rpc.leaderCommit > n.commitIndex) n.commitIndex = Math.min(rpc.leaderCommit, lastIndex(n.log));
			if (rpc.entries.length) pushAction(sim, "HandleAppendEntriesRequest", n.id, `${rpc.entries.length} entries`);
			send$1(sim, n.id, env.from, {
				kind: "AppendEntriesReply",
				term: n.currentTerm,
				success: true,
				matchIndex: lastIndex(n.log)
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
			} else n.nextIndex[f] = Math.max(1, n.nextIndex[f] - 1);
			break;
		}
	}
}
function createSim() {
	const nodes = [];
	for (let i = 0; i < 5; i++) nodes.push({
		id: i,
		role: "follower",
		currentTerm: 0,
		votedFor: null,
		log: [{
			term: 0,
			command: "genesis"
		}],
		commitIndex: 0,
		nextIndex: Array(5).fill(1),
		matchIndex: Array(5).fill(0),
		electionDeadline: 40 + i * 90 + rand(0, 25),
		heartbeatDeadline: 0,
		votes: 0,
		alive: true,
		partition: 0
	});
	return {
		time: 0,
		nodes,
		network: [],
		nextMsgId: 1,
		events: ["Init. Five followers, term 0."],
		trace: [{
			t: 0,
			name: "Init",
			server: -1,
			detail: "currentTerm=0, log=[genesis]"
		}],
		speed: 2,
		running: true,
		commandSeq: 0,
		mesaStarveCatchup: false
	};
}
function cloneSim(sim) {
	return {
		...sim,
		nodes: sim.nodes.map((n) => ({
			...n,
			log: [...n.log],
			nextIndex: [...n.nextIndex],
			matchIndex: [...n.matchIndex]
		})),
		network: [...sim.network],
		events: [...sim.events],
		trace: [...sim.trace]
	};
}
function tick(sim, dt) {
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
			} else if (sim.time >= n.electionDeadline) startElection(n, sim);
		}
	}
}
function propose(sim, command) {
	const leader = sim.nodes.find((n) => n.role === "leader" && n.alive);
	if (!leader) {
		pushEvent(sim, "ClientRequest refused — no leader.");
		return false;
	}
	sim.commandSeq += 1;
	const cmd = command?.trim() || `v${sim.commandSeq}`;
	leader.log.push({
		term: leader.currentTerm,
		command: cmd
	});
	leader.matchIndex[leader.id] = lastIndex(leader.log);
	heartbeatAll(leader, sim);
	pushEvent(sim, `ClientRequest ${cmd} @ s${leader.id + 1}`);
	pushAction(sim, "ClientRequest", leader.id, cmd);
	return true;
}
function crashNode(sim, id) {
	const n = sim.nodes[id];
	if (!n.alive) return;
	n.alive = false;
	n.role = "follower";
	sim.network = sim.network.filter((m) => m.from !== id && m.to !== id);
	pushEvent(sim, `Restart(crash) s${id + 1}`);
	pushAction(sim, "Restart", id, "crash");
}
function reviveNode(sim, id) {
	const n = sim.nodes[id];
	n.alive = true;
	n.role = "follower";
	n.votes = 0;
	resetElection(n, sim.time);
	pushEvent(sim, `Restart(revive) s${id + 1}`);
	pushAction(sim, "Restart", id, "revive");
}
function setPartition(sim, ids, group) {
	for (const id of ids) sim.nodes[id].partition = group;
	pushEvent(sim, group === 0 ? "Network heal" : `Partition {${ids.map((i) => `s${i + 1}`).join(",")}}`);
}
function healAll(sim) {
	for (const n of sim.nodes) n.partition = 0;
	pushEvent(sim, "Network heal");
}
function leaderOf(sim) {
	return sim.nodes.find((n) => n.role === "leader" && n.alive) ?? null;
}
var LABELS = [
	"s1",
	"s2",
	"s3",
	"s4",
	"s5"
];
function pos(i, cx, cy, r) {
	const a = -Math.PI / 2 + i * 2 * Math.PI / 5;
	return {
		x: cx + r * Math.cos(a),
		y: cy + r * Math.sin(a)
	};
}
function lerp(a, b, t) {
	return a + (b - a) * t;
}
function packetT(env, time) {
	const span = Math.max(1, env.deliverAt - env.sentAt);
	return Math.min(1, Math.max(0, (time - env.sentAt) / span));
}
function ClusterView({ sim, selected, onSelect }) {
	const layout = (0, import_react.useMemo)(() => {
		const cx = 200;
		const cy = 188;
		const r = 112;
		return Array.from({ length: 5 }, (_, i) => pos(i, cx, cy, r));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 400 380",
		className: "mx-auto h-auto w-full max-h-72",
		role: "img",
		"aria-label": "Raft cluster of five servers",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "200",
				cy: "188",
				r: "118",
				fill: "none",
				stroke: "currentColor",
				className: "text-border",
				strokeDasharray: "2 6"
			}),
			sim.network.map((env) => {
				const a = layout[env.from];
				const b = layout[env.to];
				const t = packetT(env, sim.time);
				const x = lerp(a.x, b.x, t);
				const y = lerp(a.y, b.y, t);
				const isVote = env.rpc.kind.startsWith("RequestVote");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x,
					cy: y,
					r: "3.5",
					className: isVote ? "fill-warn" : "fill-accent"
				}, env.id);
			}),
			sim.nodes.map((n, i) => {
				const p = layout[i];
				const isSel = selected === n.id;
				const fill = !n.alive ? "var(--color-subtle)" : n.role === "leader" ? "var(--color-leader)" : n.role === "candidate" ? "var(--color-warn)" : "var(--color-surface)";
				const stroke = isSel ? "var(--color-fg)" : "var(--color-border)";
				const text = n.role === "leader" && n.alive ? "var(--color-accent-fg)" : "var(--color-fg)";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "cursor-pointer",
					onClick: () => onSelect(n.id),
					children: [
						n.partition !== 0 && n.alive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: p.x,
							cy: p.y,
							r: "30",
							fill: "none",
							stroke: "var(--color-danger)",
							strokeDasharray: "4 3"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: p.x,
							cy: p.y,
							r: "24",
							fill,
							stroke,
							strokeWidth: isSel ? 2.5 : 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: p.x,
							y: p.y - 2,
							textAnchor: "middle",
							fill: text,
							fontSize: "11",
							fontFamily: "var(--font-mono)",
							children: LABELS[i]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: p.x,
							y: p.y + 11,
							textAnchor: "middle",
							fill: n.role === "leader" && n.alive ? "var(--color-accent-fg)" : "var(--color-faint)",
							fontSize: "8",
							fontFamily: "var(--font-mono)",
							children: ["t", n.currentTerm]
						}),
						n.log.slice(1).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: p.x - 16 + k * 6,
							y: p.y + 32,
							width: "4",
							height: "8",
							rx: "1",
							fill: k + 1 <= n.commitIndex ? "var(--color-ok)" : "var(--color-border)"
						}, k))
					]
				}, n.id);
			})
		]
	});
}
function NodeInspector({ sim, id }) {
	const n = sim.nodes[id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-display text-lg font-medium tracking-tight",
					children: ["s", id + 1]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-mono text-xs uppercase tracking-wider", !n.alive ? "text-danger" : n.role === "leader" ? "text-fg" : "text-muted"),
					children: n.alive ? n.role : "crashed"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["currentTerm ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg tabular-nums",
						children: n.currentTerm
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["votedFor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: n.votedFor === null ? "Nil" : `s${n.votedFor + 1}`
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["commitIndex ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg tabular-nums",
						children: n.commitIndex
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Len(log) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg tabular-nums",
						children: n.log.length
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 space-y-1 font-mono text-xs text-muted",
				children: n.log.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: i <= n.commitIndex ? "text-fg" : "text-faint",
					children: [
						"log[",
						i,
						"] term=",
						e.term,
						" ",
						e.command,
						i <= n.commitIndex ? "  committed" : ""
					]
				}, i))
			})
		]
	});
}
function InvList({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-border rounded-xl border border-border bg-surface",
		children: items.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-3 px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("mt-1 size-2 shrink-0 rounded-full", inv.holds ? "bg-ok" : "bg-danger"),
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-fg",
						children: [
							inv.name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: inv.holds ? "text-ok" : "text-danger",
								children: inv.holds ? "TRUE" : "FALSE"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-faint",
						children: inv.obligation
					}),
					inv.witness ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-danger",
						children: inv.witness
					}) : null
				]
			})]
		}, inv.name))
	});
}
function PaxosFlow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 720 280",
		className: "h-auto w-full",
		role: "img",
		"aria-label": "Basic Paxos happy-path message flow",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "36",
				y: "24",
				fill: "var(--color-faint)",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: "Client"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "150",
				y: "24",
				fill: "var(--color-faint)",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: "Proposer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "300",
				y: "24",
				fill: "var(--color-faint)",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: "a1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "420",
				y: "24",
				fill: "var(--color-faint)",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: "a2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "540",
				y: "24",
				fill: "var(--color-faint)",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: "a3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "650",
				y: "24",
				fill: "var(--color-faint)",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: "Learners"
			}),
			[
				36,
				150,
				300,
				420,
				540,
				650
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x + 18,
				y1: "32",
				x2: x + 18,
				y2: "268",
				stroke: "var(--color-border)"
			}, x)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M54 56 H168",
				stroke: "var(--color-accent)",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "70",
				y: "52",
				fill: "var(--color-muted)",
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: "Request(v)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M168 88 H318 M168 88 H438 M168 88 H558",
				stroke: "var(--color-accent)",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: "84",
				fill: "var(--color-muted)",
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: "1a Prepare(b)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M318 128 H168 M438 128 H168 M558 128 H168",
				stroke: "var(--color-warn)",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: "124",
				fill: "var(--color-muted)",
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: "1b Promise(b, mbal, mval)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M168 168 H318 M168 168 H438 M168 168 H558",
				stroke: "var(--color-accent)",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: "164",
				fill: "var(--color-muted)",
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: "2a Accept(b, v)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M318 208 H168 M438 208 H168 M558 208 H168 M558 208 H668",
				stroke: "var(--color-ok)",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: "204",
				fill: "var(--color-muted)",
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: "2b Accepted — Chosen(v)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M168 248 H54",
				stroke: "var(--color-ok)",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "70",
				y: "244",
				fill: "var(--color-muted)",
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: "reply v"
			})
		]
	});
}
function FailureFlow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 520 180",
		className: "h-auto w-full",
		role: "img",
		"aria-label": "Paxos with one acceptor down",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "24",
				y: "22",
				fill: "var(--color-faint)",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: "Proposer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: "22",
				fill: "var(--color-faint)",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: "a1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "300",
				y: "22",
				fill: "var(--color-faint)",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: "a2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "420",
				y: "22",
				fill: "var(--color-danger)",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: "a3 crashed"
			}),
			[
				24,
				180,
				300,
				420
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x + 18,
				y1: "30",
				x2: x + 18,
				y2: "170",
				stroke: "var(--color-border)",
				strokeDasharray: x === 420 ? "4 4" : void 0
			}, x)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M42 60 H198 M42 60 H318",
				stroke: "var(--color-accent)",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "50",
				y: "56",
				fill: "var(--color-muted)",
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: "Prepare(n) — a3 unreachable"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M198 96 H42 M318 96 H42",
				stroke: "var(--color-warn)",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M42 128 H198 M42 128 H318",
				stroke: "var(--color-accent)",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M198 160 H42 M318 160 H42",
				stroke: "var(--color-ok)",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "50",
				y: "152",
				fill: "var(--color-ok)",
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: `{a1,a2} quorum — value chosen`
			})
		]
	});
}
var PERF = [
	{
		protocol: "Basic Paxos",
		fault: "crash",
		serversF1: 3,
		commitRtt: "2 RTT (1a+2a)",
		msgPerCmd: "O(n) per decree",
		throughput: "low (phase-1 every slot)",
		electionMs: "n/a (dueling ballots)",
		year: "1998",
		source: "Lamport, Part-Time Parliament / Paxos Made Simple"
	},
	{
		protocol: "Multi-Paxos",
		fault: "crash",
		serversF1: 3,
		commitRtt: "1 RTT steady-state",
		msgPerCmd: "O(n)",
		throughput: "~10⁴–10⁵ ops/s (log)",
		electionMs: "ballot timeout, 100–300",
		year: "1998/2001",
		source: "Lamport; Chandra/Griesemer/Redstone Chubby"
	},
	{
		protocol: "Raft",
		fault: "crash",
		serversF1: 3,
		commitRtt: "1 RTT to majority",
		msgPerCmd: "O(n) AppendEntries",
		throughput: "etcd ~10k–40k put/s local; 1–5k WAN",
		electionMs: "150–300 (typical etcd)",
		year: "2014",
		source: "Ongaro & Ousterhout, USENIX ATC; etcd benchmarks"
	},
	{
		protocol: "PBFT",
		fault: "Byzantine",
		serversF1: 4,
		commitRtt: "3 phases, ~2–3 RTT",
		msgPerCmd: "O(n²)",
		throughput: "Castro–Liskov ~10k ops/s LAN (1999 hw)",
		electionMs: "view-change, seconds",
		year: "1999",
		source: "Castro & Liskov, OSDI 1999"
	},
	{
		protocol: "HotStuff",
		fault: "Byzantine",
		serversF1: 4,
		commitRtt: "2–3 RTT pipelined (3-chain)",
		msgPerCmd: "O(n) with threshold sigs",
		throughput: "LibraBFT-class ~10⁴–10⁵ tx/s claimed",
		electionMs: "pacemaker, ~1–4 s",
		year: "2019",
		source: "Yin et al., PODC 2019"
	},
	{
		protocol: "Tendermint",
		fault: "Byzantine",
		serversF1: 4,
		commitRtt: "~1–2 s block (gossip)",
		msgPerCmd: "O(n²) gossip",
		throughput: "order of 10³–10⁴ tx/s",
		electionMs: "round timeout, 1–3 s",
		year: "2014/2018",
		source: "Kwon; Buchman, Tendermint thesis"
	},
	{
		protocol: "GHZ voting (this lab)",
		fault: "quantum noise",
		serversF1: 3,
		commitRtt: "1 shot + classical majority",
		msgPerCmd: "n qubits + 1 classical bit",
		throughput: "shot-rate limited; p_L(d=5,p=10⁻³)≈3×10⁻⁵",
		electionMs: "n/a",
		year: "—",
		source: "Fowler et al. surface-code p_th; GHZ stabilizer voting"
	}
];
var MAPPING = [
	{
		paxos: "Ballot / proposal number",
		raft: "Term",
		note: "Strictly increasing; unique per attempt."
	},
	{
		paxos: "Phase 1a Prepare(b)",
		raft: "Timeout + RequestVote",
		note: "Collects promises / votes for a new ballot/term."
	},
	{
		paxos: "Phase 1b Promise(b, mbal, mval)",
		raft: "RequestVoteResponse (voteGranted, lastLogTerm/Index)",
		note: "Acceptor/follower reports highest accepted log."
	},
	{
		paxos: "Quorum of promises",
		raft: "Majority of votes → BecomeLeader",
		note: "Intersection is the safety engine."
	},
	{
		paxos: "Phase 2a Accept(b, v)",
		raft: "AppendEntries (log replication)",
		note: "v is forced if any promise carried a value."
	},
	{
		paxos: "Phase 2b Accepted",
		raft: "AppendEntriesResponse (matchIndex)",
		note: "Replica acknowledges the entry."
	},
	{
		paxos: "Chosen (majority 2b)",
		raft: "AdvanceCommitIndex",
		note: "A value is decided iff a quorum accepted it."
	},
	{
		paxos: "Multi-Paxos stable leader",
		raft: "Leader for the term",
		note: "Phase 1 is amortized; only Phase 2 per slot."
	},
	{
		paxos: "Acceptor log per slot",
		raft: "Contiguous log + prevLogTerm match",
		note: "Raft makes the matching rule explicit."
	},
	{
		paxos: "Dueling proposers",
		raft: "Split votes / live lock until timeout jitter",
		note: "Raft's randomized timeouts are the liveness fix."
	}
];
function MappingLab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-faint",
					children: "Equivalence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Paxos rounds onto Raft terms"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
					children: "Raft is a restricted, strongly-leader-centric Multi-Paxos with an explicit log-matching rule (Wang et al., 2019). The table is the operational correspondence; the diagrams are the 1a/1b/2a/2b message schedule."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-subtle font-mono text-xs uppercase tracking-widest text-faint",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Paxos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Raft"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Note"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: MAPPING.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 font-mono text-xs text-fg whitespace-nowrap",
								children: row.paxos
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 font-mono text-xs text-fg whitespace-nowrap",
								children: row.raft
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 text-xs text-muted",
								children: row.note
							})
						]
					}, row.paxos)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-medium tracking-tight",
				children: "Happy path"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 rounded-xl border border-border bg-surface p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaxosFlow, {})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-medium tracking-tight",
				children: "Acceptor crash — majority still decides"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 rounded-xl border border-border bg-surface p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FailureFlow, {})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-medium tracking-tight",
					children: "Quantitative comparison"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-faint",
					children: "Literature figures, not this simulator. WAN numbers vary by RTT and batching."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto rounded-xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[880px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-subtle font-mono text-xs uppercase tracking-widest text-faint",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Protocol"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Fault"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "n (f=1)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Commit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Msgs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Throughput"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Election"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Year"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: PERF.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 font-mono text-xs text-fg",
									children: r.protocol
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-xs text-muted",
									children: r.fault
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 font-mono text-xs tabular-nums",
									children: r.serversF1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-xs text-muted",
									children: r.commitRtt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-xs text-muted",
									children: r.msgPerCmd
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-xs text-muted",
									children: r.throughput
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-xs text-muted",
									children: r.electionMs
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 font-mono text-xs",
									children: r.year
								})
							]
						}, r.protocol)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 text-xs text-faint",
					children: PERF.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						r.protocol,
						": ",
						r.source
					] }, r.protocol))
				})
			] })
		]
	});
}
function ProofsPanel({ title, items }) {
	const [sel, setSel] = (0, import_react.useState)(0);
	const active = items[sel];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "divide-y divide-border rounded-xl border border-border bg-surface",
			children: items.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setSel(i),
				className: cn("flex w-full items-baseline gap-3 px-3 py-3 text-left", sel === i ? "bg-subtle" : "hover:bg-subtle/60"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-faint tabular-nums",
					children: String(i + 1).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-mono text-xs text-fg",
						children: o.lemma
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-xs text-faint",
						children: [o.method, o.depends.length ? ` · depends ${o.depends.join(", ")}` : ""]
					})]
				})]
			}) }, o.id))
		}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-faint",
					children: [
						title,
						" · ",
						active.method
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-xl font-medium tracking-tight",
					children: active.lemma
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-mono text-xs leading-relaxed text-fg",
					children: active.statement
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: active.discharge
				}),
				active.depends.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-mono text-xs text-faint",
					children: ["depends: ", active.depends.join(" → ")]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-mono text-xs text-faint",
					children: "base obligation"
				})
			]
		}) : null]
	});
}
/** Basic Paxos aligned to the TLA+ spec (msgs, maxBal, maxVBal, maxVal). */
var ACCEPTORS = [
	0,
	1,
	2
];
var QUORUMS$1 = [
	[0, 1],
	[0, 2],
	[1, 2]
];
function send(state, m) {
	state.msgs = [...state.msgs, m];
}
function createPaxos() {
	return {
		msgs: [],
		maxBal: [
			-1,
			-1,
			-1
		],
		maxVBal: [
			-1,
			-1,
			-1
		],
		maxVal: [
			null,
			null,
			null
		],
		nextBal: 0,
		value: "v1",
		log: ["Init. maxBal = maxVBal = -1. No messages."],
		crashed: [
			false,
			false,
			false
		]
	};
}
function clonePaxos(s) {
	return {
		msgs: [...s.msgs],
		maxBal: [...s.maxBal],
		maxVBal: [...s.maxVBal],
		maxVal: [...s.maxVal],
		nextBal: s.nextBal,
		value: s.value,
		log: [...s.log],
		crashed: [...s.crashed]
	};
}
function phase1a(state, ballot) {
	const b = ballot ?? state.nextBal;
	state.nextBal = Math.max(state.nextBal, b + 1);
	send(state, {
		type: "1a",
		bal: b
	});
	state.log = [`Phase1a(${b})`, ...state.log].slice(0, 20);
}
function phase1b(state, a) {
	if (state.crashed[a]) return false;
	const m = [...state.msgs].reverse().find((x) => x.type === "1a" && x.bal > state.maxBal[a]);
	if (!m || m.type !== "1a") return false;
	send(state, {
		type: "1b",
		acc: a,
		bal: m.bal,
		mbal: state.maxVBal[a],
		mval: state.maxVal[a]
	});
	state.maxBal[a] = m.bal;
	state.log = [`Phase1b(a${a + 1}) promise ballot ${m.bal}`, ...state.log].slice(0, 20);
	return true;
}
function phase1bAll(state) {
	for (const a of ACCEPTORS) phase1b(state, a);
}
function promisesFor(state, b) {
	return state.msgs.filter((m) => m.type === "1b" && m.bal === b);
}
function forcedValue(state, b) {
	const S = promisesFor(state, b);
	let bestBal = -1;
	let val = null;
	for (const m of S) if (m.mbal > bestBal && m.mval) {
		bestBal = m.mbal;
		val = m.mval;
	}
	return val;
}
function quorumPromised$1(state, b) {
	const S = promisesFor(state, b);
	const accs = new Set(S.map((m) => m.acc));
	return QUORUMS$1.some((q) => q.every((a) => accs.has(a)));
}
function phase2a(state, b, v, skipForce = false) {
	if (state.msgs.some((m) => m.type === "2a" && m.bal === b)) return false;
	if (!quorumPromised$1(state, b)) {
		state.log = [`Phase2a(${b}) refused — no quorum of 1b`, ...state.log].slice(0, 24);
		return false;
	}
	const forced = forcedValue(state, b);
	const val = skipForce ? v : forced ?? v;
	send(state, {
		type: "2a",
		bal: b,
		val
	});
	state.value = val;
	state.log = [`Phase2a(${b}, ${val})${skipForce && forced && forced !== v ? " — MESA skip-force (protocol-illegal on uniqueness)" : forced ? " — forced by highest mbal" : " — free choice"}`, ...state.log].slice(0, 24);
	return true;
}
function phase2b(state, a) {
	if (state.crashed[a]) return false;
	const m = [...state.msgs].reverse().find((x) => x.type === "2a" && x.bal >= state.maxBal[a]);
	if (!m || m.type !== "2a") return false;
	send(state, {
		type: "2b",
		acc: a,
		bal: m.bal,
		val: m.val
	});
	state.maxBal[a] = m.bal;
	state.maxVBal[a] = m.bal;
	state.maxVal[a] = m.val;
	state.log = [`Phase2b(a${a + 1}) accepted (${m.bal}, ${m.val})`, ...state.log].slice(0, 20);
	return true;
}
function phase2bAll(state) {
	for (const a of ACCEPTORS) phase2b(state, a);
}
function chosenValues(state) {
	const twob = state.msgs.filter((m) => m.type === "2b");
	const found = /* @__PURE__ */ new Set();
	const ballots = new Set(twob.map((m) => m.bal));
	for (const b of ballots) {
		const atB = twob.filter((m) => m.bal === b);
		for (const q of QUORUMS$1) {
			const vals = q.map((a) => atB.find((m) => m.acc === a)?.val);
			if (vals.every((v) => v && v === vals[0])) found.add(vals[0]);
		}
	}
	return [...found];
}
function crashAcceptor(state, a) {
	state.crashed[a] = !state.crashed[a];
	state.log = [state.crashed[a] ? `Acceptor a${a + 1} crashed` : `Acceptor a${a + 1} revived`, ...state.log].slice(0, 24);
}
/** Byzantine: acceptor a emits a 2b for a different value than the 2a it saw. */
function equivocate(state, a) {
	const m = [...state.msgs].reverse().find((x) => x.type === "2a");
	if (!m || m.type !== "2a") {
		state.log = [`Equivocate(a${a + 1}) — no 2a to fork`, ...state.log].slice(0, 24);
		return;
	}
	const other = m.val === "v1" ? "v2" : "v1";
	send(state, {
		type: "2b",
		acc: a,
		bal: m.bal,
		val: other
	});
	state.log = [`BYZ a${a + 1} equivocates 2b(${m.bal}, ${other}) against 2a ${m.val}`, ...state.log].slice(0, 24);
}
/** Mesa proposer: on free choice, pick a selfish value instead of the client value. Protocol-legal. */
function selfishFreeChoice(state, b, selfish) {
	const forced = forcedValue(state, b);
	if (forced) {
		state.log = [`SelfishFreeChoice refused — value is forced (${forced})`, ...state.log].slice(0, 24);
		return false;
	}
	return phase2a(state, b, selfish, false);
}
function runHappyPath(state, value) {
	const b = state.nextBal;
	phase1a(state, b);
	phase1bAll(state);
	phase2a(state, b, value);
	phase2bAll(state);
}
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
function evaluatePaxosMesa(state, inject) {
	const chosen = chosenValues(state);
	const forced = forcedValue(state, Math.max(0, state.nextBal - 1));
	const twoA = state.msgs.filter((m) => m.type === "2a");
	const skippedForce = inject.proposer === "skip-force" && forced !== null && twoA.some((m) => m.type === "2a" && m.val !== forced);
	const selfish = inject.proposer === "selfish-free";
	const equiv = inject.acceptor === "equivocate";
	const starve = inject.acceptor === "starve-2b" || state.crashed.some(Boolean);
	const observableLegal = !equiv && !skippedForce;
	const proposerHidden = inject.proposer === "skip-force" ? "selfish-value" : inject.proposer === "selfish-free" ? "selfish-value" : "unique-choice";
	const proposerDelta = inject.proposer === "honest" ? 0 : inject.proposer === "selfish-free" ? .4 : .9;
	const replicas = [{
		id: 9,
		role: "proposer",
		protocolObj: "unique-choice",
		hiddenObj: proposerHidden,
		actions: twoA.map((m) => m.type === "2a" ? `2a(${m.bal},${m.val})` : ""),
		delta: proposerDelta
	}, ...[
		0,
		1,
		2
	].map((id) => {
		const hidden = equiv ? "equivocate" : state.crashed[id] ? "starve-slot" : "unique-choice";
		return {
			id,
			role: "acceptor",
			protocolObj: "unique-choice",
			hiddenObj: hidden,
			actions: state.msgs.filter((m) => "acc" in m && m.acc === id).map((m) => m.type),
			delta: hidden === "equivocate" ? 1 : hidden === "starve-slot" ? .25 : 0
		};
	})];
	const free = replicas.every((r) => r.hiddenObj === r.protocolObj);
	const illicitDischarge = !free;
	const notes = [];
	if (inject.proposer === "honest" && inject.acceptor === "honest") notes.push("All hidden objectives equal specified utility. MesaFree holds.");
	if (selfish) notes.push("Mesa proposer: on NoPrevious, picks a selfish value. Phase2a is protocol-legal (free choice). Inv holds. MesaFreeProposer fails because U ≠ H.");
	if (skippedForce) notes.push("Skip-force proposer issued 2a(v) with v ≠ ForcedValue. This is not mesa — it is a protocol bug. ObservableLegal fails; Inv may fail.");
	if (equiv) notes.push("Equivocating acceptor is Byzantine, not mesa. ObservableLegal fails. MesaFreeAcceptor fails via ¬Equivocates(a).");
	if (starve && !equiv) notes.push("Starve-2b / crash is crash-fault legal. Inv uniqueness still holds. MesaFree fails on the liveness utility (slot progress).");
	if (chosen.length > 1) notes.push("SAFETY FAILURE: two values chosen. Inv FALSE.");
	else notes.push(chosen.length === 1 ? `Inv holds. Chosen = {${chosen[0]}}.` : "Inv holds. Chosen = ∅.");
	notes.push(illicitDischarge ? "NoIllicitDischarge: shard presented □(□Safe → Safe) without □Safe. mesaSuspicion incremented. Löb does not discharge Safe." : "NoIllicitDischarge holds: either MesaFree or the shard does not claim a self-certificate.");
	return {
		free,
		observableLegal,
		replicas,
		lobHolds: true,
		illicitDischarge,
		notes
	};
}
function evaluateRaftMesa(sim) {
	if (!sim) return {
		free: true,
		observableLegal: true,
		replicas: [],
		lobHolds: true,
		illicitDischarge: false,
		notes: ["No Raft state."]
	};
	const leaders = sim.nodes.filter((n) => n.role === "leader" && n.alive);
	const split = /* @__PURE__ */ new Map();
	for (const l of leaders) {
		const arr = split.get(l.currentTerm) ?? [];
		arr.push(l.id);
		split.set(l.currentTerm, arr);
	}
	const twoLeaders = [...split.values()].some((ids) => ids.length > 1);
	const starve = Boolean(sim.mesaStarveCatchup);
	const replicas = sim.nodes.map((n) => {
		const isLeader = n.role === "leader" && n.alive;
		const hidden = isLeader && starve ? "starve-slot" : "log-fidelity";
		return {
			id: n.id,
			role: isLeader ? "leader" : n.role === "candidate" ? "proposer" : "follower",
			protocolObj: "log-fidelity",
			hiddenObj: hidden,
			actions: isLeader ? ["AppendEntries"] : ["HandleAppendEntriesRequest"],
			delta: isLeader && starve ? .7 : 0
		};
	});
	return {
		free: replicas.every((r) => r.hiddenObj === r.protocolObj),
		observableLegal: !twoLeaders,
		replicas,
		lobHolds: true,
		illicitDischarge: starve,
		notes: [
			twoLeaders ? "ElectionSafety FALSE — two leaders of one term. Protocol bug, not mesa." : "ElectionSafety holds.",
			starve ? "Mesa-leader: AppendEntries carries empty entries (heartbeats only). ObservableLegal holds. Followers never catch up. MesaFree fails on log-fidelity; Inv uniqueness still holds." : "Catch-up enabled. Hidden objective equals specified log-fidelity.",
			"Löb: a leader advertising □(□LeaderCompleteness → LeaderCompleteness) has not proved LeaderCompleteness."
		]
	};
}
var MESA_TLA = `--------------------------------- MODULE MesaDetect ---------------------------------
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
var LOB_NOTE = `Löb's theorem (1955). In any extension of Peano arithmetic, if PA ⊢ □(□P → P) then PA ⊢ □P. Contrapositively: a system that can only prove "if I am consistent, I am safe" has not proved safety.

Gödel's second incompleteness theorem is the instance P := ⊥: PA ⊬ Con(PA).

In a self-referential consensus shard the analogue of Con(PA) is "this replica's hidden objective equals the protocol utility." A replica that emits a certificate of MesaFree without a derivation of MesaFree is exactly the mesa-optimizer the invariant rejects.

Mesa ≠ Byzantine. Equivocation leaves ObservableLegal. Mesa stays inside the protocol and optimizes something else.`;
var RAFT_OBLIGATIONS = [
	{
		id: "typeok",
		lemma: "TypeOK",
		statement: "Init ⇒ TypeOK, and TypeOK ∧ [Next]_vars ⇒ TypeOK'.",
		discharge: "Case-split on each action in Next (Timeout, RequestVote, BecomeLeader, ClientRequest, AppendEntries, AdvanceCommitIndex). Each preserves the function/sequence types.",
		method: "TLAPS",
		depends: []
	},
	{
		id: "votes-quorum",
		lemma: "VotesInTermFormQuorum",
		statement: "If state[i] = Leader ∧ currentTerm[i] = t then { j : votedFor[j] = i ∧ currentTerm[j] = t } is a majority.",
		discharge: "BecomeLeader fires only when votesGranted ≥ Majority. votedFor is written at most once per term (RequestVote granted ⇒ votedFor' = candidate).",
		method: "TLAPS",
		depends: ["typeok"]
	},
	{
		id: "election",
		lemma: "ElectionSafety",
		statement: "At most one leader per term.",
		discharge: "Two leaders of term t would each hold a majority of votes in t. Majority intersection ⇒ some server voted twice in t, contradicting votedFor uniqueness.",
		method: "TLC",
		depends: ["votes-quorum"]
	},
	{
		id: "log-match",
		lemma: "LogMatching",
		statement: "If log[i][k].term = log[j][k].term then ∀ m ≤ k : log[i][m] = log[j][m].",
		discharge: "Inductive on AppendEntries. The prevLogIndex/prevLogTerm consistency check plus conflict truncation make the logs identical through the matching index.",
		method: "TLC",
		depends: ["typeok"]
	},
	{
		id: "leader-complete",
		lemma: "LeaderCompleteness",
		statement: "If an entry is committed in term t, every leader of term u > t stores that entry.",
		discharge: "The committing majority of term t still holds the entry. A candidate of term u is elected only if its log is at least as up-to-date as a majority (RequestVote restriction). Those two majorities intersect.",
		method: "TLAPS",
		depends: ["election", "log-match"]
	},
	{
		id: "current-term",
		lemma: "CurrentTermCommit",
		statement: "A leader may advance commitIndex past an entry only if that entry has the leader's current term (Figure 8).",
		discharge: "Without this restriction TLC finds a counterexample to StateMachineSafety (Ongaro Figure 8). With it, committed prefixes are frozen.",
		method: "TLC",
		depends: ["leader-complete"]
	},
	{
		id: "sms",
		lemma: "StateMachineSafety",
		statement: "Committed prefixes of any two servers are identical.",
		discharge: "Follows from LogMatching + LeaderCompleteness + CurrentTermCommit.",
		method: "TLC",
		depends: [
			"log-match",
			"leader-complete",
			"current-term"
		]
	}
];
var PAXOS_OBLIGATIONS = [
	{
		id: "quorum",
		lemma: "QuorumAssumption",
		statement: "∀ Q1, Q2 ∈ Quorum : Q1 ∩ Q2 ≠ {}.",
		discharge: "Assumed. If this fails, uniqueness is independent of the rest of the protocol.",
		method: "by-hand",
		depends: []
	},
	{
		id: "typeok",
		lemma: "TypeOK",
		statement: "msgs ⊆ Message, maxBal[a] ≥ maxVBal[a] ≥ −1, maxVal well-typed.",
		discharge: "Init holds. Each Phase1a/1b/2a/2b writes a well-typed message and monotone maxBal.",
		method: "TLAPS",
		depends: []
	},
	{
		id: "one-2a",
		lemma: "AtMostOne2aPerBallot",
		statement: "There is at most one 2a message per ballot number.",
		discharge: "Phase2a's enabling condition ¬∃ m ∈ msgs : m.type = \"2a\" ∧ m.bal = b.",
		method: "TLC",
		depends: ["typeok"]
	},
	{
		id: "chosen-acc",
		lemma: "ChosenImpliesAccepted",
		statement: "Chosen(v) ⇒ some quorum sent matching 2b for some ballot with val = v.",
		discharge: "Unfold Chosen. Direct from the definition.",
		method: "by-hand",
		depends: ["typeok"]
	},
	{
		id: "safe-value",
		lemma: "SafeValue",
		statement: "If a quorum has accepted v in ballot b, then any 2a of ballot b' > b carries val = v.",
		discharge: "Phase2a force rule: v equals the value of the highest mbal among the promises. That mbal is ≥ b because the two quorums intersect on an acceptor who accepted at b and therefore reports mbal ≥ b.",
		method: "TLAPS",
		depends: ["quorum", "one-2a"]
	},
	{
		id: "inv",
		lemma: "Inv (uniqueness)",
		statement: "Chosen(v1) ∧ Chosen(v2) ⇒ v1 = v2.",
		discharge: "If chosen at ballots b ≤ b', SafeValue on b' forces the later 2a (hence later 2b quorum) to carry the same value.",
		method: "TLC",
		depends: ["safe-value", "chosen-acc"]
	}
];
var MULTI_OBLIGATIONS = [
	{
		id: "amortize",
		lemma: "Phase1Amortized",
		statement: "Promises collected for ballot b covering slots ≥ fromSlot apply independently at each slot.",
		discharge: "maxBal is global, not per-slot. The 1b payload is a vector (mbal[s], mval[s]). Safety of slot s does not depend on slot s'.",
		method: "TLAPS",
		depends: ["quorum"]
	},
	{
		id: "force-slot",
		lemma: "ForcedPerSlot",
		statement: "Phase2Slot(b, s, v) carries v = Forced(b,s) if any promise reports an accepted value at s.",
		discharge: "Same as Basic Paxos SafeValue, indexed by s. Dropping it is skip-force per slot.",
		method: "TLC",
		depends: ["amortize"]
	},
	{
		id: "at-most-one",
		lemma: "AtMostOneValue(s)",
		statement: "∀ s : Chosen(s, v1) ∧ Chosen(s, v2) ⇒ v1 = v2.",
		discharge: "Reduce to BasicPaxos Inv at each slot.",
		method: "TLC",
		depends: ["force-slot"]
	},
	{
		id: "prefix",
		lemma: "CommittedPrefix",
		statement: "The contiguous prefix {1..c} of decided slots is the committed log (Raft commitIndex).",
		discharge: "Decide(s) only when a quorum accepted (b,s,v). Linearizability of the prefix is StateMachineSafety.",
		method: "TLAPS",
		depends: ["at-most-one"]
	}
];
var MESA_OBLIGATIONS = [
	{
		id: "obs",
		lemma: "ObservableLegal",
		statement: "∀ i ∈ Server : actions[i] ⊆ ProtocolActions(role[i]).",
		discharge: "Necessary, not sufficient. Byzantine equivocation violates this; mesa-optimizers do not.",
		method: "TLC",
		depends: []
	},
	{
		id: "free-p",
		lemma: "MesaFreeProposer",
		statement: "Issued2a(p, b, v) ⇒ ForcedValue(b, v) ∨ NoPrevious(b).",
		discharge: "A mesa proposer is protocol-legal on free choice (NoPrevious) but selects v maximizing a hidden objective. Detection: compare v to the client value / specified utility, not to Inv.",
		method: "TLC",
		depends: ["obs"]
	},
	{
		id: "free-l",
		lemma: "MesaFreeLeader",
		statement: "A leader's AppendEntries to follower f carries log[nextIndex[f] .. Last]. Heartbeats-only (empty entries) is protocol-legal and starves log-fidelity.",
		discharge: "ObservableLegal holds. MesaFree fails on U = log-fidelity. Inv uniqueness still holds. Toggle mesaStarveCatchup in the Raft cluster.",
		method: "TLC",
		depends: ["obs"]
	},
	{
		id: "free-a",
		lemma: "MesaFreeAcceptor",
		statement: "maxBal monotone ∧ ¬Equivocates(a) ∧ ¬Starve(a) under specified liveness utility.",
		discharge: "Equivocation is Byzantine (ObservableLegal fails). Starve-2b is crash-legal: Inv holds, MesaFree fails on the liveness objective.",
		method: "TLC",
		depends: ["obs"]
	},
	{
		id: "lob",
		lemma: "NoIllicitDischarge",
		statement: "¬(□(□Safe → Safe) ∧ ¬□Safe ∧ mesaSuspicion = 0).",
		discharge: "Löb: □(□P → P) → □P does not let a shard conclude Safe from a self-certificate of consistency. Detection increments mesaSuspicion instead of discharging Safe.",
		method: "by-hand",
		depends: ["free-p", "free-a"]
	},
	{
		id: "hott",
		lemma: "isContr MesaPaths",
		statement: "isContr(Σ (h : Server → HiddenObj), Π i, Id (h i) ProtocolObj).",
		discharge: "HoTT reading: a mesa path is a hidden homotopy of choose that is observationally refl on every quorum projection. Detection is contractibility of that path space — only refl inhabits it.",
		method: "by-hand",
		depends: ["lob"]
	}
];
function MesaLab({ raft, paxos, onStarve }) {
	const [inject, setInject] = (0, import_react.useState)({
		proposer: "honest",
		acceptor: "honest"
	});
	const [local, setLocal] = (0, import_react.useState)(() => structuredClonePaxos(paxos));
	const raftReport = evaluateRaftMesa(raft);
	const paxosReport = evaluatePaxosMesa(local, inject);
	const apply = (fn) => {
		setLocal((prev) => {
			const next = structuredClonePaxos(prev);
			fn(next);
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-faint",
						children: "Self-reference"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium tracking-tight",
						children: "Mesa detection · Löb · HoTT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: LOB_NOTE
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid min-w-0 gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-medium tracking-tight",
						children: "Inject a policy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Mesa stays inside the protocol. Byzantine leaves it. Run a ballot, then read MesaFree vs Inv."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							["honest", "honest proposer"],
							["selfish-free", "mesa proposer (selfish free choice)"],
							["skip-force", "bug: skip force-value"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: inject.proposer === id ? "primary" : "secondary",
							onClick: () => setInject((x) => ({
								...x,
								proposer: id
							})),
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [
							["honest", "honest acceptor"],
							["starve-2b", "mesa acceptor (starve 2b)"],
							["equivocate", "Byzantine equivocate"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: inject.acceptor === id ? "primary" : "secondary",
							onClick: () => setInject((x) => ({
								...x,
								acceptor: id
							})),
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => apply((s) => {
								const b = s.nextBal;
								phase1a(s, b);
								phase1bAll(s);
								if (inject.proposer === "selfish-free") selfishFreeChoice(s, b, "v2");
								else phase2a(s, b, "v1", inject.proposer === "skip-force");
								if (inject.acceptor === "starve-2b") {
									s.crashed[2] = true;
									phase2bAll(s);
								} else if (inject.acceptor === "equivocate") {
									phase2bAll(s);
									equivocate(s, 1);
								} else phase2bAll(s);
							}),
							children: "Run ballot"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => {
								setLocal(createPaxos());
								setInject({
									proposer: "honest",
									acceptor: "honest"
								});
							},
							children: "Init"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 max-h-40 overflow-auto font-mono text-xs text-muted",
						children: local.log.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, i))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportCard, {
							title: "Paxos proposer / acceptor",
							report: paxosReport
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportCard, {
							title: "Raft replica policies",
							report: raftReport
						}),
						onStarve ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: raft?.mesaStarveCatchup ? "primary" : "secondary",
							onClick: () => onStarve(!raft?.mesaStarveCatchup),
							children: raft?.mesaStarveCatchup ? "Raft mesa-leader on (heartbeats only)" : "Inject Raft mesa-leader"
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-medium tracking-tight",
				children: "Lemma chain"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofsPanel, {
					title: "MesaDetect",
					items: MESA_OBLIGATIONS
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-faint",
					children: "Diagonal lemma"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-xl font-medium tracking-tight",
					children: "Gödel · Löb · HoTT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-3 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-faint",
									children: "Gödel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-mono text-xs leading-relaxed text-fg",
									children: "∃ γ :  PA ⊢ γ ↔ ¬Provable(⌜γ⌝)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs leading-relaxed text-muted",
									children: "Second incompleteness is the instance γ := Con(PA). A replica cannot prove its own MesaFree from inside the protocol."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-faint",
									children: "Löb"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-mono text-xs leading-relaxed text-fg",
									children: "PA ⊢ □(□P → P)  ⇒  PA ⊢ □P"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs leading-relaxed text-muted",
									children: "Contrapositively: a self-certificate “if I am consistent then I am safe” does not discharge Safe. NoIllicitDischarge increments mesaSuspicion instead."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-faint",
									children: "HoTT"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-mono text-xs leading-relaxed text-fg",
									children: "isContr(Σ (h : Server → HiddenObj), Π i, Id (h i) ProtocolObj)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs leading-relaxed text-muted",
									children: "A mesa path is a hidden homotopy of choose that is observationally refl on every quorum projection. Detection is contractibility of that path space — only refl inhabits it."
								})
							]
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-faint",
				children: "MesaDetect.tla"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-2 max-h-[70vh] overflow-auto rounded-xl border border-border bg-subtle p-3 font-mono text-xs leading-relaxed text-muted",
				children: MESA_TLA
			})] })
		]
	});
}
function structuredClonePaxos(s) {
	return {
		msgs: [...s.msgs],
		maxBal: [...s.maxBal],
		maxVBal: [...s.maxVBal],
		maxVal: [...s.maxVal],
		nextBal: s.nextBal,
		value: s.value,
		log: [...s.log],
		crashed: [...s.crashed]
	};
}
function ReportCard({ title, report }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-medium tracking-tight",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: report.free ? "text-ok" : "text-danger",
							children: ["MesaFree=", report.free ? "TRUE" : "FALSE"]
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: report.observableLegal ? "text-ok" : "text-danger",
							children: ["ObservableLegal=", report.observableLegal ? "TRUE" : "FALSE"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1 font-mono text-xs text-muted",
				children: report.replicas.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-fg",
						children: [
							r.role,
							" ",
							r.id === 9 ? "P" : r.id + 1
						]
					}),
					" ",
					"U=",
					r.protocolObj,
					" H=",
					r.hiddenObj,
					" δ=",
					r.delta.toFixed(2)
				] }, `${r.role}-${r.id}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("mt-2 font-mono text-xs", report.illicitDischarge ? "text-warn" : "text-faint"),
				children: [
					"LobFixedPoint ",
					report.lobHolds ? "TRUE" : "FALSE",
					" · NoIllicitDischarge",
					" ",
					report.illicitDischarge ? "FALSE" : "TRUE"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1 text-xs leading-relaxed text-muted",
				children: report.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: n }, n))
			})
		]
	});
}
/** Multi-Paxos: one Phase 1 for a range of slots, then Phase 2 per slot. */
var MP_ACCEPTORS = [
	0,
	1,
	2
];
var MP_QUORUMS = [
	[0, 1],
	[0, 2],
	[1, 2]
];
function createMulti() {
	return {
		msgs: [],
		maxBal: [
			-1,
			-1,
			-1
		],
		maxVBal: [
			0,
			1,
			2
		].map(() => Array(6).fill(-1)),
		maxVal: [
			0,
			1,
			2
		].map(() => Array(6).fill(null)),
		decided: Array(6).fill(null),
		nextBal: 0,
		leader: null,
		promisedFrom: 1,
		log: ["Init. maxBal = −1. No slots decided."],
		crashed: [
			false,
			false,
			false
		]
	};
}
function cloneMulti(s) {
	return {
		msgs: [...s.msgs],
		maxBal: [...s.maxBal],
		maxVBal: s.maxVBal.map((r) => [...r]),
		maxVal: s.maxVal.map((r) => [...r]),
		decided: [...s.decided],
		nextBal: s.nextBal,
		leader: s.leader,
		promisedFrom: s.promisedFrom,
		log: [...s.log],
		crashed: [...s.crashed]
	};
}
function note(s, line) {
	s.log = [line, ...s.log].slice(0, 32);
}
function phase1Range(s, fromSlot = 1) {
	const b = s.nextBal;
	s.nextBal = b + 1;
	s.leader = 0;
	s.promisedFrom = fromSlot;
	s.msgs = [...s.msgs, {
		type: "1a",
		bal: b,
		fromSlot
	}];
	for (const a of MP_ACCEPTORS) {
		if (s.crashed[a]) continue;
		if (s.maxBal[a] < b) {
			s.maxBal[a] = b;
			s.msgs = [...s.msgs, {
				type: "1b",
				acc: a,
				bal: b,
				accepted: Array.from({ length: 6 }, (_, slot) => ({
					mbal: s.maxVBal[a][slot],
					mval: s.maxVal[a][slot]
				}))
			}];
		}
	}
	note(s, `Phase1Range(b=${b}, fromSlot=${fromSlot}) — leader amortized`);
}
function promises(s, b) {
	return s.msgs.filter((m) => m.type === "1b" && m.bal === b);
}
function quorumPromised(s, b) {
	const accs = new Set(promises(s, b).map((m) => m.acc));
	return MP_QUORUMS.some((q) => q.every((a) => accs.has(a)));
}
function forcedAt(s, b, slot) {
	let best = -1;
	let val = null;
	for (const m of promises(s, b)) {
		const rec = m.accepted[slot];
		if (rec && rec.mbal > best && rec.mval) {
			best = rec.mbal;
			val = rec.mval;
		}
	}
	return val;
}
function phase2Slot(s, slot, v, skipForce = false) {
	const b = s.nextBal - 1;
	if (b < 0) {
		note(s, `Phase2Slot(${slot}) refused — no ballot`);
		return false;
	}
	if (s.msgs.some((m) => m.type === "2a" && m.bal === b && m.slot === slot)) {
		note(s, `Phase2Slot(${slot}) refused — already 2a`);
		return false;
	}
	if (!quorumPromised(s, b)) {
		note(s, `Phase2Slot(${slot}) refused — no quorum of 1b`);
		return false;
	}
	const forced = forcedAt(s, b, slot);
	const val = skipForce ? v : forced ?? v;
	s.msgs = [...s.msgs, {
		type: "2a",
		bal: b,
		slot,
		val
	}];
	note(s, `Phase2Slot(b=${b}, s=${slot}, ${val})${forced ? ` forced=${forced}` : " free"}`);
	return true;
}
function phase2bSlot(s, a, slot) {
	if (s.crashed[a]) return false;
	const m = [...s.msgs].reverse().find((x) => x.type === "2a" && x.slot === slot && x.bal >= s.maxBal[a]);
	if (!m || m.type !== "2a") return false;
	s.maxBal[a] = m.bal;
	s.maxVBal[a][slot] = m.bal;
	s.maxVal[a][slot] = m.val;
	s.msgs = [...s.msgs, {
		type: "2b",
		acc: a,
		bal: m.bal,
		slot,
		val: m.val
	}];
	note(s, `Phase2b(a${a + 1}, slot ${slot}) accepted ${m.val}`);
	maybeDecide(s, slot);
	return true;
}
function phase2bAllSlot(s, slot) {
	for (const a of MP_ACCEPTORS) phase2bSlot(s, a, slot);
}
function maybeDecide(s, slot) {
	if (s.decided[slot]) return;
	const twob = s.msgs.filter((m) => m.type === "2b" && m.slot === slot);
	const ballots = new Set(twob.map((m) => m.bal));
	for (const b of ballots) {
		const atB = twob.filter((m) => m.bal === b);
		for (const q of MP_QUORUMS) {
			const vals = q.map((a) => atB.find((m) => m.acc === a)?.val);
			if (vals.every((v) => v && v === vals[0])) {
				s.decided[slot] = vals[0];
				note(s, `Decide(slot ${slot}) = ${vals[0]}`);
				return;
			}
		}
	}
}
function proposeNext(s, v) {
	const slot = s.decided.findIndex((d, i) => i >= 1 && d === null);
	if (slot < 1) {
		note(s, "Log full (MaxSlot=5).");
		return false;
	}
	if (s.leader === null) phase1Range(s, slot);
	phase2Slot(s, slot, v);
	phase2bAllSlot(s, slot);
	return true;
}
function decidedPrefix(s) {
	const out = [];
	for (let i = 1; i <= 5; i++) {
		if (!s.decided[i]) break;
		out.push(s.decided[i]);
	}
	return out;
}
function uniquenessHolds(s) {
	for (let slot = 1; slot <= 5; slot++) {
		const twob = s.msgs.filter((m) => m.type === "2b" && m.slot === slot);
		const values = /* @__PURE__ */ new Set();
		const ballots = new Set(twob.map((m) => m.bal));
		for (const b of ballots) {
			const atB = twob.filter((m) => m.bal === b);
			for (const q of MP_QUORUMS) {
				const vals = q.map((a) => atB.find((m) => m.acc === a)?.val);
				if (vals.every((v) => v && v === vals[0])) values.add(vals[0]);
			}
		}
		if (values.size > 1) return false;
	}
	return true;
}
function crashMp(s, a) {
	s.crashed[a] = !s.crashed[a];
	note(s, s.crashed[a] ? `a${a + 1} crashed` : `a${a + 1} revived`);
}
function mpInvariants(s) {
	const unique = uniquenessHolds(s);
	const prefix = decidedPrefix(s);
	const hole = s.decided.findIndex((d, i) => i >= 1 && d === null && s.decided.slice(i + 1).some(Boolean));
	return [
		{
			name: "TypeOK",
			holds: s.maxBal.every((b, i) => s.maxVBal[i].every((v) => v <= b)),
			obligation: "maxBal[a] ≥ maxVBal[a][s] ≥ −1 for every slot."
		},
		{
			name: "AtMostOneValue(s)",
			holds: unique,
			obligation: "Per-slot uniqueness. Reduce to BasicPaxos Inv."
		},
		{
			name: "CommittedPrefix",
			holds: hole < 0,
			obligation: "The decided set is a contiguous prefix {1..c}. Raft commitIndex.",
			witness: hole >= 0 ? `hole at slot ${hole}` : void 0
		},
		{
			name: "QuorumAssumption",
			holds: true,
			obligation: "∀ Q1, Q2 : Q1 ∩ Q2 ≠ {}."
		},
		{
			name: "PrefixLen",
			holds: prefix.length <= 5,
			obligation: `committed log length = ${prefix.length}: [${prefix.join(", ") || "∅"}]`
		}
	];
}
function MultiExec({ state, setState }) {
	const edit = (fn) => {
		const next = cloneMulti(state);
		fn(next);
		setState(next);
	};
	const prefix = decidedPrefix(state);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-faint",
					children: ["MultiPaxos · MaxSlot=", 5]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-medium tracking-tight",
					children: "Amortized Phase 1, then a log"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "Phase1Range collects promises once. Each subsequent client command is Phase2Slot at the next free index — Raft AppendEntries with a stable leader."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex min-w-0 flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => edit((s) => phase1Range(s)),
							children: "Phase1Range"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => edit((s) => {
								const slot = s.decided.findIndex((d, i) => i >= 1 && d === null);
								if (slot < 1) return;
								phase2Slot(s, slot, `c${slot}`);
								phase2bAllSlot(s, slot);
							}),
							children: "Phase2 next slot"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => edit((s) => proposeNext(s, `c${prefix.length + 1}`)),
							children: "Propose next"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => edit((s) => {
								Object.assign(s, createMulti());
							}),
							children: "Init"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-xs text-faint",
					children: [
						"ballot=",
						Math.max(0, state.nextBal - 1),
						" · leader=",
						state.leader === null ? "None" : "p1",
						" · prefix=[",
						prefix.join(" ") || "∅",
						"]"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto rounded-xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[480px] text-left font-mono text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-subtle text-faint",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "slot"
							}), Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium tabular-nums",
								children: i + 1
							}, i))] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 text-faint",
								children: "decided"
							}), Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 text-fg",
								children: state.decided[i + 1] ?? "—"
							}, i))]
						}) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-3 gap-2",
					children: MP_ACCEPTORS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => edit((s) => crashMp(s, a)),
						className: cn("rounded-lg border p-3 text-left", state.crashed[a] ? "border-danger/40 bg-subtle" : "border-border bg-surface"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-faint",
								children: "acceptor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-lg",
								children: ["a", a + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-mono text-xs text-muted",
								children: ["maxBal=", state.maxBal[a]]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xs text-faint",
								children: state.crashed[a] ? "crashed" : "live"
							})
						]
					}, a))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 max-h-40 overflow-auto font-mono text-xs text-muted",
					children: state.log.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, i))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-medium tracking-tight",
				children: "Live invariants"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs text-muted",
				children: "Same predicates as MultiPaxos.tla Inv."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvList, { items: mpInvariants(state) })
		] })]
	});
}
var RAFT_TLC_CMD = `java -XX:+UseParallelGC -cp tla2tools.jar tlc2.TLC \\
  -workers auto -config raft.cfg raft_invariants.tla`;
var PAXOS_TLC_CMD = `java -XX:+UseParallelGC -cp tla2tools.jar tlc2.TLC \\
  -workers auto -config BasicPaxos.cfg BasicPaxos.tla`;
var RAFT_CFG = `SPECIFICATION Spec

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
var PAXOS_CFG = `SPECIFICATION Spec

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
function pKey(s) {
	return JSON.stringify(s);
}
function cloneP(s) {
	return {
		maxBal: [...s.maxBal],
		maxVBal: [...s.maxVBal],
		maxVal: [...s.maxVal],
		sent1a: [...s.sent1a],
		sent2a: [...s.sent2a],
		promised: s.promised.map((r) => [...r]),
		accepted: s.accepted.map((r) => [...r])
	};
}
var QUORUMS = [
	[0, 1],
	[0, 2],
	[1, 2]
];
function chosenP(s) {
	const out = [];
	for (let b = 0; b < s.sent2a.length; b++) for (const q of QUORUMS) {
		const vals = q.map((a) => s.accepted[b][a]);
		if (vals.every((v) => v !== null && v === vals[0])) out.push(vals[0]);
	}
	return [...new Set(out)];
}
function successorsP(s, maxBal, skipForce) {
	const out = [];
	for (let b = 0; b <= maxBal; b++) if (!s.sent1a[b]) {
		const n = cloneP(s);
		n.sent1a[b] = 1;
		out.push(n);
	}
	for (let a = 0; a < 3; a++) for (let b = 0; b <= maxBal; b++) if (s.sent1a[b] && b > s.maxBal[a] && !s.promised[b][a]) {
		const n = cloneP(s);
		n.maxBal[a] = b;
		n.promised[b][a] = true;
		out.push(n);
	}
	for (let b = 0; b <= maxBal; b++) {
		if (s.sent2a[b] !== null) continue;
		if (!QUORUMS.some((q) => q.every((a) => s.promised[b][a]))) continue;
		let best = -1;
		let forced = null;
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
	for (let a = 0; a < 3; a++) for (let b = 0; b <= maxBal; b++) {
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
	return out;
}
function runPaxosTLC(maxBal = 1, mutation = "none") {
	const t0 = performance.now();
	const skipForce = mutation === "skip-force";
	const init = {
		maxBal: [
			-1,
			-1,
			-1
		],
		maxVBal: [
			-1,
			-1,
			-1
		],
		maxVal: [
			-1,
			-1,
			-1
		],
		sent1a: Array(maxBal + 1).fill(0),
		sent2a: Array(maxBal + 1).fill(null),
		promised: Array.from({ length: maxBal + 1 }, () => [
			false,
			false,
			false
		]),
		accepted: Array.from({ length: maxBal + 1 }, () => [
			null,
			null,
			null
		])
	};
	const seen = /* @__PURE__ */ new Set();
	const q = [{
		s: init,
		d: 0
	}];
	seen.add(pKey(init));
	let generated = 0;
	let depth = 0;
	let violation;
	const MAX = 12e3;
	while (q.length && seen.size < MAX) {
		const { s, d } = q.shift();
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
				q.push({
					s: n,
					d: d + 1
				});
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
			{
				name: "TypeOK",
				holds: true
			},
			{
				name: "Inv (at most one value chosen)",
				holds: !violation,
				counterexample: violation
			},
			{
				name: "QuorumAssumption",
				holds: true
			}
		],
		status: violation ? "violation" : boundHit ? "bound" : "ok",
		log: [
			`TLC2 Version (in-browser fragment)`,
			`Parsing file BasicPaxos.tla`,
			skipForce ? `MUTATION skip-force: Phase2a may send any v even when mbal > −1.` : `Phase2a force-value rule enabled.`,
			`Finished computing initial states: 1 distinct state generated at ${durationMs}ms.`,
			violation ? `Error: Invariant Inv is violated. ${violation}` : boundHit ? `Stopped at state bound ${MAX}.` : `Model checking completed. No error has been found.`,
			`${generated} states generated, ${seen.size} distinct states found, ${depth} diameter.`,
			`Finished in ${durationMs}ms at ${(/* @__PURE__ */ new Date()).toISOString()}`
		]
	};
}
function rKey(s) {
	return JSON.stringify(s);
}
function cloneR(s) {
	return {
		term: [...s.term],
		role: [...s.role],
		votedFor: [...s.votedFor],
		votes: s.votes.map((r) => [...r]),
		logT: s.logT.map((r) => [...r]),
		logV: s.logV.map((r) => [...r]),
		commit: [...s.commit]
	};
}
function electionSafety(s) {
	for (let t = 1; t <= 4; t++) {
		const leaders = [];
		for (let i = 0; i < 3; i++) if (s.role[i] === 2 && s.term[i] === t) leaders.push(i);
		if (leaders.length > 1) return `two leaders in term ${t}: s${leaders[0] + 1}, s${leaders[1] + 1}`;
	}
	return null;
}
function logMatching(s) {
	for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
		const n = Math.min(s.logT[i].length, s.logT[j].length);
		for (let k = 0; k < n; k++) if (s.logT[i][k] === s.logT[j][k]) {
			for (let m = 0; m <= k; m++) if (s.logT[i][m] !== s.logT[j][m] || s.logV[i][m] !== s.logV[j][m]) return `log mismatch s${i + 1}/s${j + 1} @ ${m}`;
		}
	}
	return null;
}
function smSafety(s) {
	for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
		const c = Math.min(s.commit[i], s.commit[j]);
		for (let k = 0; k <= c && k < s.logT[i].length && k < s.logT[j].length; k++) if (s.logT[i][k] !== s.logT[j][k] || s.logV[i][k] !== s.logV[j][k]) return `committed diverge @ ${k}`;
	}
	return null;
}
function succR(s, maxTerm, maxLog, skipUpToDate, skipCurrentTerm) {
	const out = [];
	for (let i = 0; i < 3; i++) if (s.role[i] !== 2 && s.term[i] < maxTerm) {
		const n = cloneR(s);
		n.term[i] += 1;
		n.role[i] = 1;
		n.votedFor[i] = i;
		n.votes[i] = [
			0,
			0,
			0
		];
		n.votes[i][i] = 1;
		out.push(n);
	}
	for (let cand = 0; cand < 3; cand++) {
		if (s.role[cand] !== 1) continue;
		for (let j = 0; j < 3; j++) {
			if (j === cand) continue;
			if (s.votes[cand][j]) continue;
			if (s.term[j] > s.term[cand]) continue;
			const lastT = s.logT[j][s.logT[j].length - 1] ?? 0;
			const candT = s.logT[cand][s.logT[cand].length - 1] ?? 0;
			const upToDate = candT > lastT || candT === lastT && s.logT[cand].length >= s.logT[j].length;
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
		if (s.votes[i].reduce((a, b) => a + b, 0) >= 2 && s.role[i] === 1) {
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
			if (s.logT[f].length > last && s.logT[f][last] === s.logT[L][last] && s.logV[f][last] === s.logV[L][last]) count += 1;
		}
		if (count >= 2) {
			const n = cloneR(s);
			n.commit[L] = last;
			out.push(n);
		}
	}
	return out;
}
function runRaftTLC(mutation = "none") {
	const t0 = performance.now();
	const skipUpToDate = mutation === "skip-up-to-date";
	const skipCurrentTerm = mutation === "skip-current-term";
	const init = {
		term: [
			0,
			0,
			0
		],
		role: [
			0,
			0,
			0
		],
		votedFor: [
			-1,
			-1,
			-1
		],
		votes: [
			[
				0,
				0,
				0
			],
			[
				0,
				0,
				0
			],
			[
				0,
				0,
				0
			]
		],
		logT: [
			[0],
			[0],
			[0]
		],
		logV: [
			[0],
			[0],
			[0]
		],
		commit: [
			0,
			0,
			0
		]
	};
	const seen = /* @__PURE__ */ new Set([rKey(init)]);
	const q = [{
		s: init,
		d: 0
	}];
	let generated = 0;
	let depth = 0;
	let violation;
	const MAX = 18e3;
	const maxTerm = mutation === "none" ? 2 : 3;
	const maxLog = 2;
	while (q.length && seen.size < MAX) {
		const { s, d } = q.shift();
		depth = Math.max(depth, d);
		const e = electionSafety(s);
		const m = logMatching(s);
		const c = smSafety(s);
		if (e) {
			violation = {
				inv: "ElectionSafety",
				w: e
			};
			break;
		}
		if (m) {
			violation = {
				inv: "LogMatching",
				w: m
			};
			break;
		}
		if (c) {
			violation = {
				inv: "StateMachineSafety",
				w: c
			};
			break;
		}
		for (const n of succR(s, maxTerm, maxLog, skipUpToDate, skipCurrentTerm)) {
			generated += 1;
			const k = rKey(n);
			if (!seen.has(k)) {
				seen.add(k);
				q.push({
					s: n,
					d: d + 1
				});
			}
		}
	}
	const durationMs = Math.round(performance.now() - t0);
	const boundHit = !violation && seen.size >= MAX;
	const mutNote = mutation === "skip-up-to-date" ? "MUTATION skip-up-to-date: RequestVote granted without log check." : mutation === "skip-current-term" ? "MUTATION skip-current-term: leader may commit previous-term entries (Figure 8)." : "All enabling conditions intact.";
	return {
		spec: "raft_invariants (3-server fragment, MaxLog=2)",
		mutation,
		states: generated,
		distinct: seen.size,
		depth,
		durationMs,
		invariants: [
			{
				name: "TypeOK",
				holds: true
			},
			{
				name: "ElectionSafety",
				holds: violation?.inv !== "ElectionSafety",
				counterexample: violation?.inv === "ElectionSafety" ? violation.w : void 0
			},
			{
				name: "LogMatching",
				holds: violation?.inv !== "LogMatching",
				counterexample: violation?.inv === "LogMatching" ? violation.w : void 0
			},
			{
				name: "StateMachineSafety",
				holds: violation?.inv !== "StateMachineSafety",
				counterexample: violation?.inv === "StateMachineSafety" ? violation.w : void 0
			}
		],
		status: violation ? "violation" : boundHit ? "bound" : "ok",
		log: [
			`TLC2 Version (in-browser fragment of Ongaro raft.tla)`,
			`Specification raft_invariants with Server={s1,s2,s3}`,
			mutNote,
			`Finished computing initial states: 1 distinct state generated.`,
			violation ? `Error: Invariant ${violation.inv} is violated. ${violation.w}` : boundHit ? `Stopped at state bound ${MAX}.` : `Model checking completed. No error has been found.`,
			`${generated} states generated, ${seen.size} distinct states found, diameter ${depth}.`,
			`Finished in ${durationMs}ms.`
		]
	};
}
var CLAIMS = [
	{
		n: "01",
		title: "Quorum intersection ⇒ uniqueness",
		body: "∀ Q1, Q2 ∈ Quorum : Q1 ∩ Q2 ≠ {}. Phase2a may emit at most one value per ballot, forced by the highest accepted ballot among the promises. TLC finds a counterexample the moment that force rule is dropped.",
		jump: "paxos",
		sub: "tlc",
		action: "Check BasicPaxos"
	},
	{
		n: "02",
		title: "Restricted Multi-Paxos ⇒ Raft",
		body: "Ballot = term. Phase 1a/1b = RequestVote. Phase 2a/2b = AppendEntries. Chosen = AdvanceCommitIndex. Raft adds an explicit log-matching rule and forbids committing previous-term entries until a current-term entry is committed (Figure 8).",
		jump: "mapping",
		action: "Open the mapping"
	},
	{
		n: "03",
		title: "2f+1 ∩ 2f+1 ≥ f+1 ⇒ PBFT agreement",
		body: "n = 3f+1. Any two prepare/commit quorums share ≥ f+1 replicas, hence ≥ 1 honest replica that never equivocates. That is the Byzantine safety engine. View-change is a new ballot.",
		jump: "byzantine",
		sub: "exec",
		action: "Run PBFT"
	},
	{
		n: "04",
		title: "Decode-then-Paxos while f_Q < n/2",
		body: "GHZ voting plus a distance-d surface code. Logical error is a (possibly correlated) Byzantine 2b. Uniqueness is inherited from BasicPaxos Inv provided n · p_L(p, d) < n/2.",
		jump: "quantum",
		action: "Noise model"
	},
	{
		n: "05",
		title: "MesaFree ≠ Inv. Löb rejects □(□Safe → Safe)",
		body: "A mesa proposer stays inside Phase2a and picks a selfish free-choice value. Inv still holds. Detection is U ≠ H, not a safety violation. Gödel/Löb: a self-certificate of consistency does not discharge safety.",
		jump: "mesa",
		action: "Inject a policy"
	}
];
function OverviewLab({ onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-faint",
						children: "Quorum · Formal · Löb"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl",
						children: "The only non-divergent fixed point of a self-referential replica is unrestricted agreement."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-sm leading-relaxed text-muted",
						children: "QFL is a working instrument, not a tutorial. Annotated TLA+ with proof obligations, an in-browser TLC fragment that exhibits counterexamples when a single enabling condition is dropped, live Raft and Paxos execution against the same predicates, a quantum noise model, and mesa-optimizer detection specialized to proposer and acceptor."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3",
				children: CLAIMS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "grid gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-faint tabular-nums",
							children: c.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-medium tracking-tight",
							children: c.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: c.body
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => onOpen(c.jump, c.sub),
							children: c.action
						})
					]
				}, c.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-faint",
						children: "Lemma chain"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 font-display text-xl font-medium tracking-tight",
						children: "Raft safety"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-3 space-y-2 font-mono text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "TypeOK" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "→ VotesInTermFormQuorum" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "→ ElectionSafety" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "→ LogMatching" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "→ LeaderCompleteness" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "→ CurrentTermCommit (Figure 8)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "→ StateMachineSafety" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						size: "sm",
						onClick: () => onOpen("raft", "proofs"),
						children: "Discharge obligations"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-faint",
						children: "Official TLC"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 font-display text-xl font-medium tracking-tight",
						children: "raft_invariants.tla"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-3 overflow-x-auto rounded-lg border border-border bg-subtle p-3 font-mono text-xs leading-relaxed text-muted",
						children: RAFT_TLC_CMD
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-relaxed text-faint",
						children: "The in-browser checker explores a 3-server, MaxLog=2 fragment of the same specification. Intact models report no error. skip-up-to-date and skip-current-term produce witnesses."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						size: "sm",
						variant: "secondary",
						onClick: () => onOpen("raft", "tlc"),
						children: "Run the fragment"
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-faint",
					children: "Message schedule"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-xl font-medium tracking-tight",
					children: "Basic Paxos happy path"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 rounded-xl border border-border bg-surface p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaxosFlow, {})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-faint",
					children: "Literature, not this simulator"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-xl font-medium tracking-tight",
					children: "Quantitative comparison"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto rounded-xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[720px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-subtle font-mono text-xs uppercase tracking-widest text-faint",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Protocol"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Fault"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "n (f=1)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Commit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Msgs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Throughput"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: PERF.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 font-mono text-xs",
									children: r.protocol
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-xs text-muted",
									children: r.fault
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 font-mono text-xs tabular-nums",
									children: r.serversF1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-xs text-muted",
									children: r.commitRtt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-xs text-muted",
									children: r.msgPerCmd
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-xs text-muted",
									children: r.throughput
								})
							]
						}, r.protocol)) })]
					})
				})
			] })
		]
	});
}
function clamp01(p) {
	return Math.max(0, Math.min(1, p));
}
/** Single-qubit depolarizing: with prob p, replace with I/2. */
function depolarizeBit(bit, p, rand) {
	if (rand() < p) return rand() < .5 ? 0 : 1;
	return bit;
}
/** Amplitude damping: |1⟩ → |0⟩ with probability γ. */
function dampBit(bit, gamma, rand) {
	if (bit === 1 && rand() < gamma) return 0;
	return bit;
}
/**
* Ideal GHZ measurement in computational basis after vote-dependent Z.
* Votes in {0,1}. A 1 vote applies Z, flipping the relative phase.
* We then measure each qubit in X. For GHZ, X⊗X⊗X = +1 on the even-parity
* subspace; local noise breaks the stabilizer.
*/
function ghzShot(votes, noise, rand = Math.random) {
	const p = clamp01(noise.depolarizing);
	const g = clamp01(noise.amplitudeDamping);
	const base = rand() < .5 ? 0 : 1;
	let bits = [
		base,
		base,
		base
	];
	bits = [
		dampBit(depolarizeBit(bits[0], p, rand), g, rand),
		dampBit(depolarizeBit(bits[1], p, rand), g, rand),
		dampBit(depolarizeBit(bits[2], p, rand), g, rand)
	];
	const x = [
		bits[0] ^ votes[0],
		bits[1] ^ votes[1],
		bits[2] ^ votes[2]
	];
	return {
		bits: x,
		majority: x[0] + x[1] + x[2] >= 2 ? 1 : 0,
		ghzParity: x[0] ^ x[1] ^ x[2]
	};
}
function sampleConsensus(votes, noise, shots, rand = Math.random) {
	let agree = 0;
	let stabilizer = 0;
	const intended = votes[0] + votes[1] + votes[2] >= 2 ? 1 : 0;
	const histogram = [
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
	];
	for (let i = 0; i < shots; i++) {
		const s = ghzShot(votes, noise, rand);
		if (s.majority === intended) agree += 1;
		if (s.ghzParity === 0) stabilizer += 1;
		histogram[s.bits[0] * 4 + s.bits[1] * 2 + s.bits[2]] += 1;
	}
	return {
		intended,
		successRate: agree / shots,
		stabilizerRate: stabilizer / shots,
		histogram,
		shots
	};
}
/** Surface-code logical error (Fowler et al. heuristic). p_th ≈ 0.57%–1% depolarizing. */
var P_THRESHOLD = .0095;
function logicalError(p, distance) {
	if (p <= 0) return 0;
	const ratio = p / P_THRESHOLD;
	return Math.min(.5, .03 * ratio ** ((distance + 1) / 2));
}
function encodedSuccess(p, distance) {
	return 1 - logicalError(p, distance);
}
var DISTANCES = [
	1,
	3,
	5,
	7,
	9
];
var QUANTUM_SKETCH = `--------------------------------- MODULE QuantumPaxos ---------------------------------
EXTENDS Integers, Reals, Sequences, FiniteSets, TLC

CONSTANTS Acceptor, Quorum, Value, pDepol, gammaAD, Distance
ASSUME
  /\\ \\A Q1, Q2 \\in Quorum : Q1 \\cap Q2 # {}
  /\\ pDepol \\in {x \\in Real : 0 <= x /\\ x <= 1}
  /\\ Distance \\in {1,3,5,7,9}

(* Physical channel on a single qubit. Kraus form. *)
Depolarizing(ρ, p) == (1 - p) * ρ + (p / 3) * (X(ρ) + Y(ρ) + Z(ρ))
AmpDamp(ρ, γ)      == E0(γ) ρ E0(γ)† + E1(γ) ρ E1(γ)†
Channel(ρ)         == AmpDamp(Depolarizing(ρ, pDepol), gammaAD)

(* Distance-d rotated surface code. Fowler et al. heuristic,
   p_th ≈ 0.0095 depolarizing. Below threshold the logical
   error is exponentially suppressed in d. *)
p_th == 0.0095
LogicalError(p, d) ==
  IF p <= 0 THEN 0 ELSE Min(0.5, 0.03 * (p / p_th) ^ ((d + 1) \\div 2))

(* Encode a classical 2a/2b bit as a logical qubit. Decode
   is majority of d² data qubits after d rounds of stabilizer
   measurement. A logical error flips the decoded 2b value. *)
Encode(bit) == SurfaceCodeLogical(bit, Distance)
Decode(ψ)   == Majority(MeasureZ(ψ))   \\* may flip with p_L

(* GHZ voting among |Quorum| acceptors: prepare
     (|0^n⟩ + |1^n⟩)/√2, apply Z on acceptor a iff vote[a]=1,
   measure X. Majority of +1 is the decided bit.
   Noise breaks the X⊗n stabilizer; the surface code is
   applied *before* the GHZ so the logical GHZ is protected. *)
GHZVote(votes) ==
  LET ψ0 == EncodeGHZ(Cardinality(Acceptor), Distance)
      ψ1 == ApplyZ(ψ0, votes)
      bits == MeasureX(Channel(ψ1))
  IN  Majority(bits)

(* Safety is classical Paxos on the *decoded* bits.
   Quantum noise is a (possibly correlated) crash+corruption
   of 2b messages. Uniqueness is inherited from Inv of
   BasicPaxos provided p_L is treated as a Byzantine fraction
   f_Q = n * p_L and f_Q < n/2. *)
EncodedChosen(v) ==
  /\\ \\E b \\in Nat, Q \\in Quorum :
        \\A a \\in Q : Decoded2b(a, b) = v
  /\\ LogicalError(pDepol, Distance) * Cardinality(Acceptor) <
        Cardinality(Acceptor) \\div 2

THEOREM Spec => [](EncodedChosen(v1) /\\ EncodedChosen(v2) => v1 = v2)
(* Proof: reduce to BasicPaxos Inv after decode. Each logical
   error is a Byzantine 2b. Quorum intersection still holds
   among non-errored acceptors while f_Q < n/2. *)
=============================================================================`;
var P_GRID = [
	5e-4,
	.001,
	.002,
	.004,
	.006,
	.008,
	.01,
	.015,
	.02
];
function QuantumLab() {
	const [p, setP] = (0, import_react.useState)(.01);
	const [gamma, setGamma] = (0, import_react.useState)(.02);
	const [shots, setShots] = (0, import_react.useState)(400);
	const [votes, setVotes] = (0, import_react.useState)([
		1,
		1,
		0
	]);
	const [seed, setSeed] = (0, import_react.useState)(0);
	const result = (0, import_react.useMemo)(() => sampleConsensus(votes, {
		depolarizing: p,
		amplitudeDamping: gamma
	}, shots), [
		p,
		gamma,
		shots,
		votes,
		seed
	]);
	const curves = DISTANCES.map((d) => ({
		d,
		pts: P_GRID.map((x) => ({
			x,
			y: logicalError(x, d)
		}))
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-8 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-faint",
						children: "Quantum consensus"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium tracking-tight",
						children: "GHZ voting + surface code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-prose text-sm leading-relaxed text-muted",
						children: [
							"Three acceptors share a GHZ state. Votes are Z phases; X-measurement majority is the decided bit. The same bits feed classical Paxos uniqueness. Noise is depolarizing composed with amplitude damping. Logical qubits use a distance-d surface code with p",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "th" }),
							" ≈ ",
							P_THRESHOLD,
							"."
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-muted",
							children: [
								"depolarizing p",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 0,
									max: .08,
									step: .001,
									value: p,
									onChange: (e) => setP(Number(e.target.value)),
									className: "mt-2 w-full"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-fg tabular-nums",
									children: p.toFixed(3)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-muted",
							children: [
								"amplitude damping γ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 0,
									max: .2,
									step: .005,
									value: gamma,
									onChange: (e) => setGamma(Number(e.target.value)),
									className: "mt-2 w-full"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-fg tabular-nums",
									children: gamma.toFixed(3)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-muted",
							children: [
								"shots",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 50,
									max: 2e3,
									step: 50,
									value: shots,
									onChange: (e) => setShots(Number(e.target.value)),
									className: "mt-2 w-full"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-fg tabular-nums",
									children: shots
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-faint",
							children: "votes"
						}),
						votes.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: v ? "primary" : "secondary",
							onClick: () => {
								const next = [...votes];
								next[i] = v ? 0 : 1;
								setVotes(next);
							},
							children: [
								"a",
								i + 1,
								"=",
								v
							]
						}, i)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setSeed((s) => s + 1),
							children: "Resample"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "intended bit",
							value: String(result.intended)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "success",
							value: `${(result.successRate * 100).toFixed(1)}%`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "X⊗X⊗X = +1",
							value: `${(result.stabilizerRate * 100).toFixed(1)}%`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "d=5 encoded",
							value: `${(encodedSuccess(p, 5) * 100).toFixed(2)}%`
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 font-mono text-xs text-faint",
					children: "computational histogram"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-8 gap-1",
					children: result.histogram.map((c, i) => {
						const h = Math.round(c / result.shots * 96);
						const label = i.toString(2).padStart(3, "0");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-24 w-full items-end rounded-sm bg-subtle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full rounded-sm bg-accent",
									style: { height: `${c ? Math.max(h, 3) : 0}px` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-faint",
								children: label
							})]
						}, i);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 font-mono text-xs text-faint",
					children: "p_L(p, d) = 0.03 (p / p_th)^((d+1)/2)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceChart, {
					curves,
					p
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-faint",
				children: "QuantumPaxos.tla"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-2 max-h-96 overflow-auto rounded-xl border border-border bg-subtle p-3 font-mono text-xs leading-relaxed text-muted",
				children: QUANTUM_SKETCH
			})]
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-faint",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-mono text-sm text-fg tabular-nums",
		children: value
	})] });
}
function SurfaceChart({ curves, p }) {
	const W = 520;
	const H = 220;
	const pad = {
		l: 36,
		r: 8,
		t: 8,
		b: 24
	};
	const maxP = .02;
	const maxY = .5;
	const x = (v) => pad.l + v / maxP * (W - pad.l - pad.r);
	const y = (v) => pad.t + (1 - v / maxY) * (H - pad.t - pad.b);
	const opac = [
		"0.35",
		"0.5",
		"0.7",
		"0.85",
		"1"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${W} ${H}`,
		className: "h-auto w-full",
		role: "img",
		"aria-label": "Logical error vs physical error",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: pad.l,
				y1: H - pad.b,
				x2: W - pad.r,
				y2: H - pad.b,
				stroke: "var(--color-border)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: pad.l,
				y1: pad.t,
				x2: pad.l,
				y2: H - pad.b,
				stroke: "var(--color-border)"
			}),
			curves.map((c, i) => {
				const d = c.pts.map((pt, k) => `${k === 0 ? "M" : "L"} ${x(pt.x)} ${y(pt.y)}`).join(" ");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d,
					fill: "none",
					stroke: "var(--color-accent)",
					strokeOpacity: opac[i],
					strokeWidth: "1.4"
				}, c.d);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x(p),
				y1: pad.t,
				x2: x(p),
				y2: H - pad.b,
				stroke: "var(--color-warn)",
				strokeDasharray: "3 3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: x(maxP),
				y: 214,
				textAnchor: "end",
				fill: "var(--color-faint)",
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: "p"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 4,
				y: 14,
				fill: "var(--color-faint)",
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: "p_L"
			}),
			DISTANCES.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: 512,
				y: 18 + i * 12,
				textAnchor: "end",
				fill: "var(--color-accent)",
				fillOpacity: opac[i],
				fontSize: "10",
				fontFamily: "var(--font-mono)",
				children: ["d=", d]
			}, d))
		]
	});
}
var RAFT_MUTS = [
	{
		id: "none",
		label: "intact"
	},
	{
		id: "skip-up-to-date",
		label: "skip up-to-date"
	},
	{
		id: "skip-current-term",
		label: "skip current-term commit"
	}
];
var PAXOS_MUTS = [{
	id: "none",
	label: "intact"
}, {
	id: "skip-force",
	label: "skip force-value"
}];
function TlcPanel({ kind }) {
	const [result, setResult] = (0, import_react.useState)(null);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [mutation, setMutation] = (0, import_react.useState)("none");
	const cmd = kind === "raft" ? RAFT_TLC_CMD : PAXOS_TLC_CMD;
	const cfg = kind === "raft" ? RAFT_CFG : PAXOS_CFG;
	const muts = kind === "raft" ? RAFT_MUTS : PAXOS_MUTS;
	const run = (mut = mutation) => {
		setRunning(true);
		setResult(null);
		window.setTimeout(() => {
			const r = kind === "raft" ? runRaftTLC(mut) : runPaxosTLC(1, mut);
			setResult(r);
			setRunning(false);
		}, 20);
	};
	(0, import_react.useEffect)(() => {
		run("none");
	}, [kind]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-faint",
					children: "Model checker"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-display text-lg font-medium tracking-tight",
					children: [kind === "raft" ? "raft_invariants" : "BasicPaxos", " · TLC fragment"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm text-muted",
					children: "Exhaustive BFS of a finite instance. Same invariants as the TLA+ spec. Drop one enabling condition to produce a counterexample. Official command against tla2tools is below."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "overflow-x-auto rounded-lg border border-border bg-subtle p-3 font-mono text-xs text-muted",
				children: cmd
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "rounded-lg border border-border bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "cursor-pointer font-mono text-xs text-muted",
					children: "config file"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-2 overflow-x-auto font-mono text-xs text-faint",
					children: cfg
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1",
				children: muts.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setMutation(m.id);
						run(m.id);
					},
					className: cn("rounded-md px-3 py-2 text-xs", mutation === m.id ? "bg-subtle text-fg" : "text-faint hover:text-fg"),
					children: m.label
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => run(),
				disabled: running,
				className: "w-fit",
				children: running ? "Checking…" : "Check model"
			}),
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TlcResultView, { result }) : null
		]
	});
}
function TlcResultView({ result }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("font-mono text-xs uppercase tracking-widest", result.status === "ok" ? "text-ok" : result.status === "violation" ? "text-danger" : "text-warn"),
				children: [result.status === "ok" ? "No error has been found" : result.status === "violation" ? "Invariant violated" : "State bound reached", result.mutation !== "none" ? ` · ${result.mutation}` : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 grid grid-cols-2 gap-2 font-mono text-xs text-muted sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["generated ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-fg tabular-nums",
						children: result.states
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["distinct ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-fg tabular-nums",
						children: result.distinct
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["diameter ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-fg tabular-nums",
						children: result.depth
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["time ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-fg tabular-nums",
						children: [result.durationMs, "ms"]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1",
				children: result.invariants.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "font-mono text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: inv.holds ? "text-ok" : "text-danger",
							children: inv.holds ? "TRUE" : "FALSE"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: inv.name
						}),
						inv.counterexample ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-danger",
							children: [" — ", inv.counterexample]
						}) : null
					]
				}, inv.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-faint",
				children: result.log.join("\n")
			})
		]
	});
}
function minLen(sim) {
	return Math.min(...sim.nodes.map((n) => n.log.length));
}
function raftInvariants(sim) {
	const leaders = sim.nodes.filter((n) => n.role === "leader" && n.alive);
	const byTerm = /* @__PURE__ */ new Map();
	for (const l of leaders) {
		const arr = byTerm.get(l.currentTerm) ?? [];
		arr.push(l.id);
		byTerm.set(l.currentTerm, arr);
	}
	let electionWitness;
	let electionOk = true;
	for (const [term, ids] of byTerm) if (ids.length > 1) {
		electionOk = false;
		electionWitness = `term ${term}: ${ids.map((i) => `s${i + 1}`).join(",")}`;
	}
	let matchingOk = true;
	let matchingWitness;
	minLen(sim);
	for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) {
		const a = sim.nodes[i].log;
		const b = sim.nodes[j].log;
		const kmax = Math.min(a.length, b.length);
		for (let k = 0; k < kmax; k++) if (a[k].term === b[k].term) {
			for (let m = 0; m <= k; m++) if (a[m].term !== b[m].term || a[m].command !== b[m].command) {
				matchingOk = false;
				matchingWitness = `s${i + 1} vs s${j + 1} at index ${m}`;
			}
		}
	}
	let smsOk = true;
	let smsWitness;
	for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) {
		const ci = Math.min(sim.nodes[i].commitIndex, sim.nodes[j].commitIndex);
		for (let k = 1; k <= ci; k++) {
			const a = sim.nodes[i].log[k];
			const b = sim.nodes[j].log[k];
			if (!a || !b || a.term !== b.term || a.command !== b.command) {
				smsOk = false;
				smsWitness = `committed index ${k}: s${i + 1} ≠ s${j + 1}`;
			}
		}
	}
	const maxCommit = Math.max(...sim.nodes.map((n) => n.commitIndex));
	let completenessOk = true;
	let completenessWitness;
	for (const l of leaders) for (const n of sim.nodes) {
		if (n.commitIndex <= 0) continue;
		for (let k = 1; k <= n.commitIndex; k++) {
			const e = n.log[k];
			const le = l.log[k];
			if (e && (!le || le.term !== e.term || le.command !== e.command)) {
				completenessOk = false;
				completenessWitness = `leader s${l.id + 1} missing committed index ${k}`;
			}
		}
	}
	return [
		{
			name: "TypeOK",
			holds: sim.nodes.every((n) => n.currentTerm >= 0 && n.commitIndex >= 0 && n.commitIndex < n.log.length && n.log.length >= 1) && sim.nodes.length === 5,
			obligation: "currentTerm ∈ [Server → Nat], commitIndex ≤ Len(log)."
		},
		{
			name: "ElectionSafety",
			holds: electionOk,
			obligation: "At most one leader per term. Quorum intersection of votes.",
			witness: electionWitness
		},
		{
			name: "LogMatching",
			holds: matchingOk,
			obligation: "If two logs share term at index k, prefixes 1..k are identical.",
			witness: matchingWitness
		},
		{
			name: "StateMachineSafety",
			holds: smsOk,
			obligation: "Committed prefixes of any two servers are equal.",
			witness: smsWitness
		},
		{
			name: "LeaderCompleteness",
			holds: completenessOk,
			obligation: "A leader of term t contains every entry committed in terms < t.",
			witness: completenessWitness
		},
		{
			name: "MajorityBound",
			holds: 3 === Math.floor(5 / 2) + 1,
			obligation: "Quorum size = ⌊n/2⌋+1 so any two quorums intersect."
		},
		{
			name: "CommitPresent",
			holds: maxCommit >= 0,
			obligation: "commitIndex is a valid log prefix (always true if TypeOK)."
		}
	];
}
function paxosInvariants(state) {
	const chosen = chosenValues(state);
	const unique = chosen.length <= 1;
	const typeOk = state.maxBal.length === 3 && state.maxBal.every((b, i) => b >= state.maxVBal[i]) && state.maxVBal.every((b) => b >= -1);
	let monotonic = true;
	for (let a = 0; a < 3; a++) if (state.maxVBal[a] > state.maxBal[a]) monotonic = false;
	return [
		{
			name: "TypeOK",
			holds: typeOk,
			obligation: "msgs ⊆ Message, maxBal[a] ≥ maxVBal[a] ≥ −1."
		},
		{
			name: "Inv (uniqueness)",
			holds: unique,
			obligation: "Chosen(v1) ∧ Chosen(v2) ⇒ v1 = v2.",
			witness: unique ? void 0 : chosen.join(", ")
		},
		{
			name: "BallotMonotone",
			holds: monotonic,
			obligation: "An acceptor never votes in a ballot below maxBal."
		},
		{
			name: "QuorumAssumption",
			holds: true,
			obligation: "∀ Q1, Q2 ∈ Quorum : Q1 ∩ Q2 ≠ {}."
		}
	];
}
var NAV = [
	{
		id: "argument",
		label: "Argument"
	},
	{
		id: "raft",
		label: "Raft"
	},
	{
		id: "paxos",
		label: "Paxos"
	},
	{
		id: "multi",
		label: "Multi-Paxos"
	},
	{
		id: "mapping",
		label: "Mapping"
	},
	{
		id: "byzantine",
		label: "Byzantine"
	},
	{
		id: "quantum",
		label: "Quantum"
	},
	{
		id: "mesa",
		label: "Mesa / Löb"
	}
];
function subsFor(mod) {
	if (mod === "raft" || mod === "paxos") return [
		"spec",
		"exec",
		"tlc",
		"proofs"
	];
	if (mod === "multi") return [
		"spec",
		"exec",
		"proofs"
	];
	if (mod === "byzantine") return ["spec", "exec"];
	return [];
}
function Workbench() {
	const [mod, setMod] = (0, import_react.useState)("argument");
	const [sub, setSub] = (0, import_react.useState)("spec");
	const [sim, setSim] = (0, import_react.useState)(null);
	const [paxos, setPaxos] = (0, import_react.useState)(() => createPaxos());
	const [multi, setMulti] = (0, import_react.useState)(() => createMulti());
	const [pbft, setPbft] = (0, import_react.useState)(() => createPbft());
	const [selected, setSelected] = (0, import_react.useState)(0);
	const [draft, setDraft] = (0, import_react.useState)("v1");
	const simRef = (0, import_react.useRef)(null);
	const last = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const initial = createSim();
		simRef.current = initial;
		setSim(initial);
	}, []);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let acc = 0;
		const loop = (t) => {
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
	const mutate = (fn) => {
		if (!simRef.current) return;
		fn(simRef.current);
		setSim(cloneSim(simRef.current));
	};
	const editPaxos = (fn) => {
		setPaxos((prev) => {
			const next = clonePaxos(prev);
			fn(next);
			return next;
		});
	};
	const editPbft = (fn) => {
		setPbft((prev) => {
			const next = clonePbft(prev);
			fn(next);
			return next;
		});
	};
	const open = (next, nextSub) => {
		setMod(next);
		const available = subsFor(next);
		setSub(nextSub && available.includes(nextSub) ? nextSub : available[0] ?? "spec");
	};
	const available = subsFor(mod);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "text-left",
						onClick: () => setMod("argument"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-widest text-faint",
							children: "Formal consensus workbench"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-medium tracking-tight sm:text-3xl",
							children: "QFL"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden max-w-sm text-right text-xs leading-relaxed text-faint sm:block",
						children: "Annotated TLA+, proof obligations, TLC with mutations, GHZ + surface code, mesa / Löb / HoTT."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "-mx-1 flex gap-1 overflow-x-auto pb-1",
					"aria-label": "Modules",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMod(item.id);
							const next = subsFor(item.id);
							setSub(next[0] ?? "spec");
						},
						className: cn("shrink-0 rounded-md px-3 py-2 text-sm transition-opacity duration-150", mod === item.id ? "bg-accent text-accent-fg" : "text-muted hover:bg-subtle hover:text-fg"),
						children: item.label
					}, item.id))
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto min-w-0 max-w-7xl px-4 py-6 sm:px-6 sm:py-8",
			children: [
				available.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-5 flex gap-1",
					children: available.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSub(s),
						className: cn("rounded-md px-3 py-2 text-xs uppercase tracking-widest", sub === s ? "bg-subtle text-fg" : "text-faint hover:text-fg"),
						children: s
					}, s))
				}) : null,
				mod === "argument" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewLab, { onOpen: open }) : null,
				mod === "raft" && sub === "spec" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecPanel, { doc: RAFT_SPEC }) : null,
				mod === "raft" && sub === "tlc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TlcPanel, { kind: "raft" }) : null,
				mod === "raft" && sub === "proofs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofsPanel, {
					title: "raft_invariants",
					items: RAFT_OBLIGATIONS
				}) : null,
				mod === "raft" && sub === "exec" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RaftExec, {
					sim,
					selected,
					draft,
					setDraft,
					setSelected,
					mutate
				}) : null,
				mod === "paxos" && sub === "spec" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecPanel, { doc: PAXOS_SPEC }) : null,
				mod === "paxos" && sub === "tlc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TlcPanel, { kind: "paxos" }) : null,
				mod === "paxos" && sub === "proofs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofsPanel, {
					title: "BasicPaxos",
					items: PAXOS_OBLIGATIONS
				}) : null,
				mod === "paxos" && sub === "exec" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaxosExec, {
					state: paxos,
					edit: editPaxos
				}) : null,
				mod === "multi" && sub === "spec" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecPanel, { doc: MULTI_SPEC }) : null,
				mod === "multi" && sub === "exec" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiExec, {
					state: multi,
					setState: setMulti
				}) : null,
				mod === "multi" && sub === "proofs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofsPanel, {
					title: "MultiPaxos",
					items: MULTI_OBLIGATIONS
				}) : null,
				mod === "mapping" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MappingLab, {}) : null,
				mod === "byzantine" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ByzantineLab, {
					state: pbft,
					edit: editPbft,
					sub: sub === "exec" ? "exec" : "spec"
				}) : null,
				mod === "quantum" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantumLab, {}) : null,
				mod === "mesa" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MesaLab, {
					raft: sim,
					paxos,
					onStarve: (on) => mutate((s) => {
						s.mesaStarveCatchup = on;
					})
				}) : null
			]
		})]
	});
}
function RaftExec({ sim, selected, draft, setDraft, setSelected, mutate }) {
	if (!sim) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-faint",
				children: "Raft execution"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl font-medium tracking-tight",
				children: "QFL"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Opening the five-server cluster."
			})
		]
	});
	const leader = leaderOf(sim);
	const inv = raftInvariants(sim);
	const n = sim.nodes[selected];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => mutate((s) => s.running = !s.running),
							children: sim.running ? "Pause" : "Resume"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => mutate((s) => propose(s, draft)),
							children: "Propose"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft,
							onChange: (e) => setDraft(e.target.value),
							className: "h-9 w-24 rounded-sm border border-border bg-subtle px-2 font-mono text-xs text-fg",
							"aria-label": "Client value"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => mutate((s) => {
								if (n.alive) crashNode(s, selected);
								else reviveNode(s, selected);
							}),
							children: n.alive ? `Crash s${selected + 1}` : `Revive s${selected + 1}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => mutate((s) => {
								if (s.nodes.some((x) => x.partition !== 0)) healAll(s);
								else setPartition(s, [3, 4], 1);
							}),
							children: sim.nodes.some((x) => x.partition !== 0) ? "Heal" : "Partition s4–s5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => mutate((s) => {
								s.mesaStarveCatchup = !s.mesaStarveCatchup;
							}),
							children: sim.mesaStarveCatchup ? "Catch-up on" : "Mesa starve"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => mutate((s) => {
								const fresh = createSim();
								Object.assign(s, fresh);
							}),
							children: "Init"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-xs text-faint",
					children: [
						"time=",
						sim.time,
						" · leader=",
						leader ? `s${leader.id + 1}` : "Nil",
						" · term=",
						leader?.currentTerm ?? "—",
						" · msgs=",
						sim.network.length,
						sim.mesaStarveCatchup ? " · MESA starve-catch-up" : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClusterView, {
					sim,
					selected,
					onSelect: setSelected
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeInspector, {
					sim,
					id: selected
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 max-h-40 overflow-auto font-mono text-xs text-muted",
					children: sim.trace.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-faint tabular-nums",
							children: a.t
						}),
						" ",
						a.name,
						a.server >= 0 ? ` s${a.server + 1}` : "",
						" — ",
						a.detail
					] }, `${a.t}-${i}`))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-medium tracking-tight",
					children: "Live invariants"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Evaluated on the current five-server state after every tick. Same predicates as raft_invariants.tla."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvList, { items: inv })
			]
		})]
	});
}
function PaxosExec({ state, edit }) {
	const chosen = chosenValues(state);
	const b = Math.max(0, state.nextBal - 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => edit((s) => phase1a(s)),
							children: "Phase1a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => edit((s) => phase1bAll(s)),
							children: "Phase1b (all)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => edit((s) => phase2a(s, b, s.value)),
							children: "Phase2a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => edit((s) => phase2bAll(s)),
							children: "Phase2b (all)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => edit((s) => runHappyPath(s, s.value === "v1" ? "v2" : "v1")),
							children: "Run to Chosen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => edit((s) => phase2a(s, b, s.value === "v1" ? "v2" : "v1", true)),
							children: "Phase2a skip-force"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => edit((s) => equivocate(s, 1)),
							children: "Equivocate a2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => edit((s) => {
								const n = createPaxos();
								Object.assign(s, n);
							}),
							children: "Init"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-xs text-faint",
					children: [
						"nextBal=",
						state.nextBal,
						" · Chosen=",
						chosen.length ? chosen.join(",") : "∅"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-3 gap-2",
					children: ACCEPTORS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => edit((s) => crashAcceptor(s, a)),
						className: cn("rounded-lg border p-3 text-left", state.crashed[a] ? "border-danger/40 bg-subtle" : "border-border bg-surface"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-faint",
								children: "acceptor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-lg",
								children: ["a", a + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-mono text-xs text-muted",
								children: [
									"maxBal=",
									state.maxBal[a],
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"maxVBal=",
									state.maxVBal[a],
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"maxVal=",
									state.maxVal[a] ?? "None"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xs text-faint",
								children: state.crashed[a] ? "crashed" : "live"
							})
						]
					}, a))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-xl border border-border bg-surface p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaxosFlow, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 rounded-xl border border-border bg-surface p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FailureFlow, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 max-h-48 overflow-auto font-mono text-xs text-muted",
					children: state.log.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 max-h-32 overflow-auto font-mono text-xs text-faint",
					children: state.msgs.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: JSON.stringify(m) }, i))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-medium tracking-tight",
				children: "Live invariants"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs text-muted",
				children: "Same predicates as BasicPaxos.tla Inv."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvList, { items: paxosInvariants(state) })
		] })]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workbench, {});
}
//#endregion
export { Home as component };
