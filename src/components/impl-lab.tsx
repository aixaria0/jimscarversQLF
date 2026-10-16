import { useState } from "react";
import { SKETCHES } from "@/lib/impl";
import { cn } from "@/lib/utils";

export function ImplLab() {
  const [sel, setSel] = useState(0);
  const s = SKETCHES[sel];

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside>
        <p className="font-mono text-xs uppercase tracking-widest text-faint">Kernel</p>
        <h2 className="mt-1 font-display text-xl font-medium tracking-tight">Running code</h2>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          The same predicates the specs discharge. Each sketch is the enabling condition TLC
          mutates.
        </p>
        <ul className="mt-4 space-y-1">
          {SKETCHES.map((k, i) => (
            <li key={k.id}>
              <button
                type="button"
                onClick={() => setSel(i)}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left text-sm",
                  i === sel ? "bg-subtle text-fg" : "text-muted hover:text-fg",
                )}
              >
                {k.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-faint">{s.file}</p>
            <h3 className="font-display text-2xl font-medium tracking-tight">{s.title}</h3>
          </div>
          <button
            type="button"
            className="rounded-md px-2 py-1 font-mono text-xs text-muted hover:bg-subtle hover:text-fg"
            onClick={() => {
              void navigator.clipboard.writeText(s.code);
            }}
          >
            Copy
          </button>
        </div>
        <p className="mt-2 text-sm text-muted">{s.mapsTo}</p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-subtle p-4 font-mono text-xs leading-relaxed text-fg">
          {s.code}
        </pre>
        <div className="mt-4 rounded-xl border border-border bg-surface p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-faint">Obligation</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.obligation}</p>
        </div>
      </div>
    </div>
  );
}
