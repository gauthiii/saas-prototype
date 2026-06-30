// src/components/AIPanel.tsx
import { useState, useCallback } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { Badge, Skeleton, Tone } from "./ui";

export type Insight = { title: string; body: string; tone: Tone; tag: string; confidence: number };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function AIPanel({ insights, context }: { insights: Insight[]; context: string }) {
  const [loading, setLoading] = useState(false);
  const [displayed, setDisplayed] = useState<Insight[]>(insights);

  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setDisplayed(shuffle(insights));
      setLoading(false);
    }, 1100);
  }, [insights]);

  return (
    <div className="card overflow-hidden animate-fadeUp">
      <div className="px-5 py-4 border-b border-[var(--line)] bg-gradient-to-r from-accent/10 via-transparent to-violet-500/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center h-7 w-7 rounded-lg bg-accent text-white"><Sparkles size={14} /></span>
          <div>
            <div className="font-display font-semibold text-sm">AI Insights</div>
            <div className="text-[11px] ink-2">Context: {context}</div>
          </div>
        </div>
        <button onClick={refresh} className="btn-ghost !px-2.5 !py-1.5 text-xs" aria-label="Regenerate insights">
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Regenerate
        </button>
      </div>
      <div className="p-5 space-y-3">
        {loading
          ? [0, 1, 2].map(i => <Skeleton key={i} className="h-16 w-full" />)
          : displayed.map(ins => (
              <div key={ins.title} className="rounded-lg border border-[var(--line)] p-3.5 hover:border-accent/40 transition-colors cursor-default">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-sm">{ins.title}</div>
                  <Badge tone={ins.tone}>{ins.tag}</Badge>
                </div>
                <p className="text-sm ink-2 mt-1.5 leading-relaxed">{ins.body}</p>
                <div className="mt-2.5 flex items-center gap-2 text-[11px] ink-2">
                  <span>Confidence</span>
                  <div className="h-1.5 w-24 rounded-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${ins.confidence}%` }} />
                  </div>
                  <span className="font-mono">{ins.confidence}%</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
