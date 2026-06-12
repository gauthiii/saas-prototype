// src/components/AppPreview.tsx — Mac-browser-styled modal that previews how the
// exported app will look and behave: a live replica of the generated App shell
// (sidebar, header, screens) plus prev/next flow stepper in the browser chrome.
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Lock, Moon, RotateCw, Sun, X } from "lucide-react";

type PreviewView = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  el: JSX.Element;
  group?: string;
};

type Props = {
  productName: string;
  sub: string;
  domainId: string;
  views: PreviewView[];
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
  onClose: () => void;
};

export function AppPreview({ productName, sub, domainId, views, dark, setDark, onClose }: Props) {
  const [idx, setIdx] = useState(0);
  const view = views[idx];

  const groups = useMemo(() => {
    const map: Record<string, PreviewView[]> = {};
    for (const v of views) (map[v.group ?? "App"] ??= []).push(v);
    return map;
  }, [views]);

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(views.length - 1, i + 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, views.length]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Mac browser window */}
      <div className="relative w-full h-full max-w-[95vw] max-h-[92vh] rounded-xl overflow-hidden shadow-lift flex flex-col animate-fadeUp border border-[var(--line)]"
        style={{ background: "var(--bg)" }} role="dialog" aria-modal="true" aria-label={`Preview of ${productName}`}>

        {/* Browser chrome */}
        <div className="shrink-0 flex items-center gap-3 px-4 py-2.5 border-b border-[var(--line)]" style={{ background: "var(--surface)" }}>
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <button onClick={onClose} aria-label="Close preview"
              className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          {/* Flow stepper */}
          <div className="flex items-center gap-1">
            <button onClick={prev} disabled={idx === 0} aria-label="Previous screen in flow"
              className="grid place-items-center h-7 w-7 rounded-lg ink-2 hover:bg-accent/8 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
              <ArrowLeft size={15} />
            </button>
            <button onClick={next} disabled={idx === views.length - 1} aria-label="Next screen in flow"
              className="grid place-items-center h-7 w-7 rounded-lg ink-2 hover:bg-accent/8 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
              <ArrowRight size={15} />
            </button>
            <button onClick={() => setIdx(0)} aria-label="Restart flow from first screen"
              className="grid place-items-center h-7 w-7 rounded-lg ink-2 hover:bg-accent/8 transition-colors">
              <RotateCw size={13} />
            </button>
          </div>

          {/* Address bar */}
          <div className="flex-1 flex items-center justify-center min-w-0">
            <div className="flex items-center gap-1.5 max-w-md w-full rounded-lg px-3 py-1.5 text-xs font-mono truncate"
              style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
              <Lock size={11} className="ink-2 shrink-0" />
              <span className="ink-2 truncate">{productName.toLowerCase()}.app/<span className="text-[var(--ink)]">{view.id}</span></span>
            </div>
          </div>

          <span className="hidden sm:block text-[11px] ink-2 font-mono whitespace-nowrap">{idx + 1} / {views.length}</span>
          <button onClick={onClose} className="grid place-items-center h-7 w-7 rounded-lg ink-2 hover:bg-accent/8 transition-colors" aria-label="Close preview">
            <X size={15} />
          </button>
        </div>

        {/* Replica of the exported app shell */}
        <div className="flex-1 min-h-0 flex">
          <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-[var(--line)]" style={{ background: "var(--surface)" }}>
            <div className="px-4 py-4 flex items-center gap-2.5 border-b border-[var(--line)]">
              <span className="grid place-items-center h-8 w-8 rounded-xl bg-gradient-to-br from-accent to-grad text-white font-display font-bold text-sm">{productName[0]}</span>
              <div className="leading-tight">
                <div className="font-display font-bold tracking-tight">{productName}</div>
                <div className="text-[10px] ink-2 font-mono">{sub.toLowerCase()}</div>
              </div>
            </div>
            <nav className="p-3 space-y-3 flex-1 overflow-y-auto" aria-label="Preview screens">
              {Object.entries(groups).map(([group, vs]) => (
                <div key={group}>
                  <div className="eyebrow px-2.5 pt-1 pb-1.5">{group}</div>
                  <div className="space-y-0.5">
                    {vs.map(v => (
                      <button key={v.id} onClick={() => setIdx(views.indexOf(v))}
                        className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-150
                          ${v.id === view.id ? "bg-accent text-white shadow-card" : "ink-2 hover:bg-accent/8 hover:text-[var(--ink)]"}`}>
                        <v.icon size={15} /> {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div className="p-4 border-t border-[var(--line)] text-[11px] ink-2 leading-relaxed">
              UI prototype exported from ForgeUI. Wire your own APIs behind every action.
            </div>
          </aside>

          <div className="flex-1 min-w-0 flex flex-col">
            <header className="shrink-0 border-b border-[var(--line)] px-4 sm:px-6 py-3 flex items-center justify-between gap-3" style={{ background: "var(--surface)" }}>
              <div className="font-display font-semibold text-sm">{view.label}</div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:block text-xs ink-2 font-mono">{domainId}/{view.id}</span>
                <button onClick={() => setDark(d => !d)} className="btn-ghost !p-2" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </header>

            {/* Mobile screen tabs (replica of the exported app's small-screen nav) */}
            <div className="md:hidden shrink-0 flex gap-2 overflow-x-auto px-4 pt-3 pb-1">
              {views.map((v, i) => (
                <button key={v.id} onClick={() => setIdx(i)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${v.id === view.id ? "bg-accent text-white border-accent" : "surface ink-2"}`}>
                  {v.label}
                </button>
              ))}
            </div>

            <main key={view.id} className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fadeUp">
              {view.el}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
