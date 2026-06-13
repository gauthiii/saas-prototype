// src/components/VersionHistory.tsx
import { ArrowLeft, GitBranch, GitCommit, Sparkles, Wrench, Bug, Rocket } from "lucide-react";
import { VERSIONS, APP_VERSION, ChangeTag } from "../version";

interface VersionHistoryProps {
  onBack: () => void;
}

const TAG_META: Record<ChangeTag, { tone: string; icon: typeof Sparkles }> = {
  Feature:     { tone: "text-emerald-600 bg-emerald-500/12 border-emerald-500/25", icon: Sparkles },
  Improvement: { tone: "text-accent bg-accent/12 border-accent/25",                icon: Wrench },
  Fix:         { tone: "text-amber-600 bg-amber-500/12 border-amber-500/25",       icon: Bug },
  Release:     { tone: "text-violet-600 bg-violet-500/12 border-violet-500/25",    icon: Rocket },
};

export function VersionHistory({ onBack }: VersionHistoryProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── Header ────────────────────────────── */}
      <div className="space-y-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-2)] hover:text-accent transition-colors"
        >
          <ArrowLeft size={15} /> Back to About
        </button>

        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-accent to-grad shrink-0 grid place-items-center text-white">
            <GitBranch size={20} />
          </div>
          <div className="space-y-1">
            <div className="eyebrow">Version control</div>
            <h1 className="text-3xl font-display font-bold tracking-tight">Release history</h1>
            <p className="text-sm text-[var(--ink-2)] max-w-md leading-relaxed">
              Every release of ForgeUI and what changed compared to the version before it.
              Currently on <span className="font-mono font-semibold text-[var(--ink)]">v{APP_VERSION}</span>.
            </p>
          </div>
        </div>
      </div>

      {/* ── Timeline of update cards ──────────── */}
      <div className="relative space-y-4">
        {/* vertical rail */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--line)] hidden sm:block" />

        {VERSIONS.map((v, i) => {
          const meta = TAG_META[v.tag];
          const Icon = meta.icon;
          const isLatest = i === 0;
          return (
            <div key={v.version} className="relative sm:pl-12">
              {/* node */}
              <div className="absolute left-0 top-5 hidden sm:grid place-items-center h-8 w-8 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-2)]">
                <GitCommit size={15} />
              </div>

              <div className="card card-hover p-5 space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-lg font-bold tracking-tight">v{v.version}</span>
                    {isLatest && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent/12 px-2 py-0.5 text-[10px] font-semibold text-accent">
                        Latest
                      </span>
                    )}
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${meta.tone}`}>
                      <Icon size={11} /> {v.tag}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--ink-2)] font-mono">{v.date} · {v.commit}</span>
                </div>

                <div className="text-sm font-semibold">{v.title}</div>

                <ul className="space-y-1.5">
                  {v.changes.map((c, ci) => (
                    <li key={ci} className="flex gap-2 text-sm text-[var(--ink-2)] leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="text-center text-xs text-[var(--ink-2)] py-4 border-t border-[var(--line)]">
        ForgeUI © 2025 · Developed by Gautham Vijayaraj
      </footer>
    </div>
  );
}
