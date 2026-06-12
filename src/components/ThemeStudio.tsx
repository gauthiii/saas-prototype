// src/components/ThemeStudio.tsx — colour changer modal with live mac-window teaser
import { useState } from "react";
import { X, Paintbrush, RotateCcw, Check } from "lucide-react";
import { Theme, DEFAULT_THEME, THEME_PRESETS } from "../theme";

/** Tiny mac-window mockup rendering a mini dashboard with the candidate colours. */
function MacPreview({ theme, dark, label }: { theme: Theme; dark: boolean; label: string }) {
  const c = dark
    ? { bg: "#0a0c10", surface: "#0f1218", line: "#232938", ink: "#eef0f4", ink2: "#8b93a5" }
    : { bg: "#f7f8fa", surface: "#ffffff", line: "#e6e8ee", ink: "#0f1218", ink2: "#5b6372" };
  return (
    <div className="flex-1 min-w-0">
      <div className="rounded-xl overflow-hidden border shadow-card" style={{ borderColor: c.line }}>
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: c.surface, borderBottom: `1px solid ${c.line}` }}>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[9px] font-mono" style={{ color: c.ink2 }}>{label}</span>
        </div>
        {/* Body: mini sidebar + content */}
        <div className="flex" style={{ background: c.bg, height: 150 }}>
          <div className="w-[26%] p-2 space-y-1.5" style={{ background: c.surface, borderRight: `1px solid ${c.line}` }}>
            <div className="h-4 w-4 rounded-md mb-2" style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.grad})` }} />
            <div className="h-3 rounded-md" style={{ background: theme.accent }} />
            <div className="h-3 rounded-md" style={{ background: c.line }} />
            <div className="h-3 rounded-md" style={{ background: c.line }} />
            <div className="h-3 rounded-md" style={{ background: c.line }} />
          </div>
          <div className="flex-1 p-2.5 space-y-2">
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="flex-1 rounded-lg p-1.5" style={{ background: c.surface, border: `1px solid ${c.line}` }}>
                  <div className="h-1.5 w-3/5 rounded" style={{ background: c.ink2, opacity: 0.4 }} />
                  <div className="h-2.5 w-2/5 rounded mt-1.5" style={{ background: c.ink, opacity: 0.85 }} />
                  <div className="h-1.5 w-1/3 rounded-full mt-1.5" style={{ background: theme.accent, opacity: 0.35 }} />
                </div>
              ))}
            </div>
            <div className="rounded-lg p-2" style={{ background: c.surface, border: `1px solid ${c.line}` }}>
              <div className="flex items-end gap-1 h-9">
                {[35, 55, 40, 70, 50, 85, 60, 95, 75].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 3 === 2 ? theme.grad : theme.accent, opacity: 0.85 }} />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-4 w-16 rounded-md" style={{ background: theme.accent }} />
              <div className="h-4 w-16 rounded-md" style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.grad})` }} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-[10px] ink-2 mt-1.5">{dark ? "Dark theme" : "Light theme"}</div>
    </div>
  );
}

export function ThemeStudio({ open, onClose, theme, onApply }: {
  open: boolean; onClose: () => void; theme: Theme; onApply: (t: Theme) => void;
}) {
  const [draft, setDraft] = useState<Theme>(theme);
  const [applied, setApplied] = useState(false);
  if (!open) return null;

  const apply = () => {
    onApply(draft);
    setApplied(true);
    setTimeout(() => setApplied(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative card !p-0 w-full max-w-2xl shadow-lift animate-fadeUp overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent"><Paintbrush size={16} /></span>
            <div className="leading-tight">
              <div className="font-display font-semibold">Theme studio</div>
              <div className="text-[11px] ink-2">Changes apply to the live preview and to exported projects</div>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost !p-1.5" aria-label="Close theme studio"><X size={16} /></button>
        </div>

        <div className="p-5 space-y-5">
          {/* Pickers */}
          <div className="grid sm:grid-cols-2 gap-4">
            {([["accent", "Primary accent", "Buttons, links, active nav, charts"],
               ["grad", "Gradient end", "Logo marks, hero cards, avatars"]] as const).map(([key, label, desc]) => (
              <div key={key} className="flex items-center gap-3 rounded-xl border border-[var(--line)] p-3">
                <label className="relative h-10 w-10 rounded-lg overflow-hidden cursor-pointer border border-[var(--line)] shrink-0">
                  <input type="color" value={draft[key]}
                    onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))}
                    className="absolute -inset-2 h-16 w-16 cursor-pointer" aria-label={label} />
                </label>
                <div className="min-w-0">
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-[11px] ink-2 truncate">{desc}</div>
                  <div className="text-[11px] font-mono ink-2 mt-0.5 uppercase">{draft[key]}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Presets */}
          <div>
            <div className="eyebrow mb-2">Presets</div>
            <div className="flex flex-wrap gap-2">
              {THEME_PRESETS.map(p => (
                <button key={p.name} onClick={() => setDraft(p.theme)}
                  className="btn-ghost !px-3 !py-1.5 text-xs gap-2">
                  <span className="h-3.5 w-3.5 rounded-full" style={{ background: `linear-gradient(135deg, ${p.theme.accent}, ${p.theme.grad})` }} />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mac window teasers */}
          <div>
            <div className="eyebrow mb-2">Teaser</div>
            <div className="flex flex-col sm:flex-row gap-4">
              <MacPreview theme={draft} dark={false} label="preview — light" />
              <MacPreview theme={draft} dark={true} label="preview — dark" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-t border-[var(--line)]">
          <button onClick={apply} className="btn-primary px-5 py-2 text-sm">Apply theme</button>
          {applied && <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><Check size={13} /> Applied</span>}
          <button onClick={() => setDraft(DEFAULT_THEME)} className="btn-ghost px-4 py-2 text-sm ml-auto gap-1.5">
            <RotateCcw size={13} /> Reset to default
          </button>
        </div>
      </div>
    </div>
  );
}
