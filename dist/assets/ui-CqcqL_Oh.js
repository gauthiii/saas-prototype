const e=`// src/components/ui.tsx
import { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={\`card p-5 \${className}\`}>{children}</div>;
}

export function SectionTitle({ eyebrow, title, right }: { eyebrow?: string; title: string; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        {eyebrow && <div className="eyebrow mb-1">{eyebrow}</div>}
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      {right}
    </div>
  );
}

const tones = {
  green: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  red: "bg-rose-500/12 text-rose-600 dark:text-rose-400 border-rose-500/25",
  amber: "bg-amber-500/12 text-amber-600 dark:text-amber-400 border-amber-500/25",
  blue: "bg-accent/10 text-accent dark:text-indigo-300 border-accent/25",
  gray: "bg-zinc-500/10 ink-2 border-zinc-500/20",
  violet: "bg-violet-500/12 text-violet-600 dark:text-violet-400 border-violet-500/25",
} as const;
export type Tone = keyof typeof tones;

export function Badge({ tone = "gray", children, pulse = false }: { tone?: Tone; children: ReactNode; pulse?: boolean }) {
  return (
    <span className={\`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold \${tones[tone]}\`}>
      {pulse && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulseDot" />}
      {children}
    </span>
  );
}

export function Stat({ label, value, delta, deltaTone = "green", icon }: { label: string; value: string; delta?: string; deltaTone?: Tone; icon?: ReactNode }) {
  return (
    <Card className="card-hover animate-fadeUp">
      <div className="flex items-start justify-between">
        <div className="eyebrow">{label}</div>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
      <div className="mt-2 font-display text-2xl font-bold tracking-tight">{value}</div>
      {delta && <div className="mt-1"><Badge tone={deltaTone}>{delta}</Badge></div>}
    </Card>
  );
}

export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md surface border-l shadow-lift animate-slideIn overflow-y-auto">
        <div className="sticky top-0 surface border-b px-5 py-4 flex items-center justify-between z-10">
          <h3 className="font-display font-semibold">{title}</h3>
          <button onClick={onClose} className="btn-ghost !p-1.5" aria-label="Close panel"><X size={16} /></button>
        </div>
        <div className="p-5">{children}</div>
      </aside>
    </div>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}
      className={\`relative h-5 w-9 rounded-full transition-colors duration-200 shrink-0 \${on ? "bg-accent" : "bg-[var(--line)]"}\`}>
      <span className={\`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-200 \${on ? "left-[18px]" : "left-0.5"}\`} />
    </button>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={\`skeleton \${className}\`} />;
}

/** Simulates a submit roundtrip with a loading state, for form micro-interactions. */
export function useFakeSubmit(delay = 1200) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  useEffect(() => {
    if (state !== "loading") return;
    const t = setTimeout(() => setState("done"), delay);
    return () => clearTimeout(t);
  }, [state, delay]);
  return { state, submit: () => setState("loading"), reset: () => setState("idle") };
}
`;export{e as default};
