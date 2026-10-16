import { useState } from "react";
import type { SpecDoc, SpecLine } from "@/lib/specs";
import { cn } from "@/lib/utils";

function lineClass(line: SpecLine) {
  const t = line.t.trimStart();
  if (t.startsWith("(*") || t.startsWith("\\*")) return "text-faint";
  if (
    /^(MODULE|EXTENDS|CONSTANTS|CONSTANT|VARIABLES|VARIABLE|ASSUME|THEOREM|LEMMA|SPECIFICATION|INVARIANT|CONSTRAINT)\b/.test(
      t,
    )
  )
    return "text-fg";
  if (
    /^(TypeOK|ElectionSafety|LogMatching|StateMachineSafety|LeaderCompleteness|CurrentTermCommit|Inv|Chosen|Spec|Init|Next|Phase|Send|MesaFree|LobFixedPoint|PrePrepare|Prepare|Commit|LogLinearizable|EncodedChosen)/.test(
      t,
    )
  )
    return "text-fg";
  return "text-muted";
}

export function SpecPanel({ doc }: { doc: SpecDoc }) {
  const first = doc.lines.findIndex((l) => l.obl || l.note);
  const [sel, setSel] = useState<number | null>(first >= 0 ? first : null);
  const active = sel != null ? doc.lines[sel] : undefined;
  const note = active?.obl || active?.note;
  const obligations = doc.lines
    .map((l, i) => ({ l, i }))
    .filter((x) => x.l.obl);

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-faint">{doc.module}.tla</p>
            <h2 className="font-display text-xl font-medium tracking-tight">{doc.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <p className="hidden max-w-xs text-right text-xs text-faint sm:block">{doc.source}</p>
            <button
              type="button"
              className="rounded-md px-2 py-1 font-mono text-xs text-muted hover:bg-subtle hover:text-fg"
              onClick={() => {
                void navigator.clipboard.writeText(doc.lines.map((l) => l.t).join("\n"));
              }}
            >
              Copy
            </button>
          </div>
        </div>
        <div className="mt-3 max-h-[70vh] overflow-auto rounded-xl border border-border bg-subtle p-3 font-mono text-xs leading-relaxed">
          {doc.lines.map((line, i) => {
            const marked = Boolean(line.obl || line.note);
            return (
              <button
                key={i}
                type="button"
                onClick={() => marked && setSel(i)}
                className={cn(
                  "flex w-full flex-nowrap gap-3 text-left",
                  marked && "hover:bg-surface",
                  sel === i && marked && "bg-surface",
                )}
              >
                <span className="w-8 shrink-0 select-none text-right text-faint tabular-nums">{i + 1}</span>
                <span className={cn("min-w-max whitespace-pre", lineClass(line), marked && "text-fg")}>
                  {line.t.length ? line.t : " "}
                </span>
                {line.obl ? <span className="ml-auto shrink-0 text-ok">obl</span> : null}
              </button>
            );
          })}
        </div>
      </div>
      <aside className="flex min-w-0 flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">Proof obligations</p>
        <ul className="space-y-1">
          {obligations.map(({ l, i }) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setSel(i)}
                className={cn(
                  "w-full rounded-md px-2 py-2 text-left font-mono text-xs",
                  sel === i ? "bg-subtle text-fg" : "text-muted hover:text-fg",
                )}
              >
                L{i + 1} {l.t.replace(/\s*==.*/, "").replace("(*", "").replace("*)", "").trim().slice(0, 42)}
              </button>
            </li>
          ))}
        </ul>
        {note ? (
          <div className="rounded-lg border border-border bg-surface p-3">
            <p className="font-mono text-xs uppercase tracking-widest text-faint">
              {active?.obl ? "Obligation" : "Annotation"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{note}</p>
          </div>
        ) : (
          <p className="text-xs text-faint">Select a highlighted line.</p>
        )}
      </aside>
    </div>
  );
}
