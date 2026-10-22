// src/components/DesignStudio.tsx — one modal for every design decision: Style (16 visual
// languages with per-industry recommendations), Colour (accent + gradient), and Layout
// (shell + page variants). Changes apply live; the page behind is the preview.
import { useState } from "react";
import { X, Paintbrush, RotateCcw, Check, Sparkles, Wand2, LayoutTemplate, Palette, ArrowRight } from "lucide-react";
import { Theme, DEFAULT_THEME, THEME_PRESETS } from "../theme";
import { STYLES, SHELLS, HEROES, SIGNINS, PRICINGS, StyleDef, StyleId, StyleSet, styleById } from "../design/styles";
import { DEFAULT_DESIGN, Design } from "../design/design";

type Tab = "Style" | "Colour" | "Layout";

type Props = {
  onClose: () => void;
  design: Design;
  setDesign: (d: Design) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  industry: { label: string; default: StyleId; recommended: StyleId[] };
  /** Jump to a page that demonstrates a layout variant (home / login / pricing). */
  goTo: (viewId: string) => void;
};

function StyleCard({ s, active, badge, onPick }: { s: StyleDef; active: boolean; badge?: string; onPick: () => void }) {
  const [bg, surface, accent] = s.swatch;
  return (
    <button onClick={onPick} aria-pressed={active}
      className={`text-left rounded-xl border p-2 transition-all ${active ? "border-accent ring-2 ring-accent/40" : "border-[var(--line)] hover:border-accent/40"}`}>
      <div className="relative h-16 rounded-lg overflow-hidden" style={{ background: bg }} aria-hidden="true">
        <div className="absolute left-2 top-2 right-8 h-5 rounded-md" style={{ background: surface, border: s.id === "brutalism" ? "2px solid #000" : "1px solid rgba(0,0,0,.08)", boxShadow: s.id === "brutalism" ? "3px 3px 0 #000" : "0 2px 6px rgba(0,0,0,.08)" }} />
        <div className="absolute left-2 bottom-2 h-4 w-12 rounded" style={{ background: accent }} />
        <div className="absolute right-2 bottom-2 h-7 w-7 rounded-full" style={{ background: `linear-gradient(135deg, ${accent}, ${surface})` }} />
        {active && <span className="absolute right-1.5 top-1.5 grid place-items-center h-5 w-5 rounded-full bg-accent text-white"><Check size={11} /></span>}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className="text-xs font-semibold truncate">{s.name}</span>
        {s.mode && <span className="text-[9px] uppercase tracking-wider ink-2 border border-[var(--line)] rounded px-1">{s.mode} only</span>}
      </div>
      <div className="text-[10px] ink-2 leading-snug line-clamp-2 mt-0.5">{s.description}</div>
      {badge && <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-1.5 py-0.5 text-[9px] font-semibold"><Sparkles size={9} /> {badge}</div>}
    </button>
  );
}

function Segmented<T extends string>({ label, value, options, onChange, demo }: { label: string; value: T; options: { id: T; name: string }[]; onChange: (v: T) => void; demo?: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="eyebrow">{label}</span>
        {demo && <button onClick={demo} className="text-[11px] text-accent font-medium flex items-center gap-1 hover:underline">View page <ArrowRight size={11} /></button>}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {options.map(o => (
          <button key={o.id} onClick={() => onChange(o.id)} aria-pressed={value === o.id}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${value === o.id ? "border-accent bg-accent/10 text-accent" : "border-[var(--line)] hover:border-accent/40"}`}>{o.name}</button>
        ))}
      </div>
    </div>
  );
}

export function DesignStudio({ onClose, design, setDesign, theme, setTheme, industry, goTo }: Props) {
  const [tab, setTab] = useState<Tab>("Style");
  const set = <K extends keyof Design>(k: K, v: Design[K]) => setDesign({ ...design, [k]: v });
  const activeStyle = design.style === "auto" ? industry.default : design.style;
  const sets: StyleSet[] = ["Core", "Expressive", "Bold", "Industry"];
  const activePreset = THEME_PRESETS.find(p => p.theme.accent === theme.accent && p.theme.grad === theme.grad);
  const tabs: { id: Tab; icon: typeof Wand2 }[] = [{ id: "Style", icon: Wand2 }, { id: "Colour", icon: Palette }, { id: "Layout", icon: LayoutTemplate }];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside className="relative h-full w-full max-w-[34rem] surface !border-y-0 !border-r-0 shadow-lift animate-slideIn flex flex-col" role="dialog" aria-label="Design studio">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent"><Paintbrush size={16} /></span>
            <div className="leading-tight">
              <div className="font-display font-semibold">Design studio</div>
              <div className="text-[11px] ink-2">Live preview · saved locally, shareable via the URL, baked into exports</div>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost !p-1.5" aria-label="Close design studio"><X size={16} /></button>
        </div>
        <div className="flex gap-1 px-5 pt-3 border-b border-[var(--line)]" role="tablist">
          {tabs.map(t => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 pb-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t.id ? "border-accent text-accent" : "border-transparent ink-2"}`}>
              <t.icon size={14} /> {t.id}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {tab === "Style" && (
            <>
              <button onClick={() => set("style", "auto")} aria-pressed={design.style === "auto"}
                className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${design.style === "auto" ? "border-accent bg-accent/8" : "border-[var(--line)] hover:border-accent/40"}`}>
                <span className="grid place-items-center h-9 w-9 rounded-lg bg-gradient-to-br from-accent to-grad text-white"><Sparkles size={16} /></span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">Auto — follow the industry</span>
                  <span className="block text-[11px] ink-2">{industry.label} uses <b>{styleById(industry.default)?.name}</b> by default. Switching industries switches style.</span>
                </span>
                {design.style === "auto" && <Check size={16} className="text-accent" />}
              </button>
              <section>
                <div className="eyebrow mb-2">Recommended for {industry.label}</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[industry.default, ...industry.recommended.filter(r => r !== industry.default)].map(id => {
                    const s = styleById(id)!;
                    return <StyleCard key={id} s={s} active={activeStyle === id} badge={id === industry.default ? "Industry default" : "Good fit"} onPick={() => set("style", id)} />;
                  })}
                </div>
              </section>
              {sets.map(setName => (
                <section key={setName}>
                  <div className="eyebrow mb-2">{setName === "Industry" ? "Industry-specialist" : setName}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {STYLES.filter(s => s.set === setName).map(s => <StyleCard key={s.id} s={s} active={activeStyle === s.id} onPick={() => set("style", s.id)} />)}
                  </div>
                </section>
              ))}
            </>
          )}

          {tab === "Colour" && (
            <>
              <div className="grid sm:grid-cols-2 gap-3">
                {([["accent", "Primary accent", "Buttons, links, active nav, charts"], ["grad", "Gradient end", "Logo marks, hero cards, avatars"]] as const).map(([key, label, desc]) => (
                  <div key={key} className="flex items-center gap-3 rounded-xl border border-[var(--line)] p-3">
                    <label className="relative h-10 w-10 rounded-lg overflow-hidden cursor-pointer border border-[var(--line)] shrink-0">
                      <input type="color" value={theme[key]} onChange={e => setTheme({ ...theme, [key]: e.target.value })} className="absolute -inset-2 h-16 w-16 cursor-pointer" aria-label={label} />
                    </label>
                    <div className="min-w-0"><div className="text-sm font-medium">{label}</div><div className="text-[11px] ink-2 truncate">{desc}</div><div className="text-[11px] font-mono ink-2 uppercase">{theme[key]}</div></div>
                  </div>
                ))}
              </div>
              <div>
                <div className="eyebrow mb-2">Presets</div>
                <div className="flex flex-wrap gap-2">
                  {THEME_PRESETS.map(p => (
                    <button key={p.name} onClick={() => setTheme(p.theme)} aria-pressed={activePreset?.name === p.name}
                      className={`btn-ghost !px-3 !py-1.5 text-xs gap-2 ${activePreset?.name === p.name ? "ring-2 ring-accent ring-offset-1 ring-offset-[var(--surface)]" : ""}`}>
                      <span className="h-3.5 w-3.5 rounded-full" style={{ background: `linear-gradient(135deg, ${p.theme.accent}, ${p.theme.grad})` }} /> {p.name}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] ink-2">Colours layer on top of the active style — every style uses your accent for buttons, charts and highlights.</p>
            </>
          )}

          {tab === "Layout" && (
            <>
              <div>
                <div className="eyebrow mb-2">App shell</div>
                <div className="grid grid-cols-2 gap-2.5">
                  {SHELLS.map(s => (
                    <button key={s.id} onClick={() => set("shell", s.id)} aria-pressed={design.shell === s.id}
                      className={`text-left rounded-xl border p-3 transition-colors ${design.shell === s.id ? "border-accent bg-accent/8" : "border-[var(--line)] hover:border-accent/40"}`}>
                      <ShellGlyph id={s.id} />
                      <div className="text-xs font-semibold mt-2">{s.name}</div>
                      <div className="text-[10px] ink-2">{s.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              <Segmented label="Home hero" value={design.hero} options={HEROES} onChange={v => set("hero", v)} demo={() => goTo("home")} />
              <Segmented label="Sign-in page" value={design.signin} options={SIGNINS} onChange={v => set("signin", v)} demo={() => goTo("login")} />
              <Segmented label="Pricing page" value={design.pricing} options={PRICINGS} onChange={v => set("pricing", v)} demo={() => goTo("pricing")} />
            </>
          )}
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-t border-[var(--line)]">
          <button onClick={onClose} className="btn-primary px-5">Done</button>
          <button onClick={() => { setDesign(DEFAULT_DESIGN); setTheme(DEFAULT_THEME); }} className="btn-ghost ml-auto gap-1.5"><RotateCcw size={13} /> Reset all</button>
        </div>
      </aside>
    </div>
  );
}

function ShellGlyph({ id }: { id: string }) {
  const bar = "bg-[var(--line)]";
  return (
    <div className="h-14 rounded-lg border border-[var(--line)] overflow-hidden flex surface-2" aria-hidden="true">
      {id === "sidebar" && <><div className="w-1/4 border-r border-[var(--line)] p-1 space-y-1">{[0, 1, 2, 3].map(i => <div key={i} className={`h-1.5 rounded ${i === 1 ? "bg-accent" : bar}`} />)}</div><div className="flex-1" /></>}
      {id === "topnav" && <div className="flex-1"><div className="h-3 border-b border-[var(--line)] flex gap-1 items-center px-1">{[0, 1, 2].map(i => <div key={i} className={`h-1 w-5 rounded ${i === 0 ? "bg-accent" : bar}`} />)}</div></div>}
      {id === "rail" && <><div className="w-3 border-r border-[var(--line)] flex flex-col items-center gap-1 pt-1">{[0, 1, 2].map(i => <div key={i} className={`h-1.5 w-1.5 rounded ${i === 0 ? "bg-accent" : bar}`} />)}</div><div className="w-1/4 border-r border-[var(--line)] p-1 space-y-1">{[0, 1, 2].map(i => <div key={i} className={`h-1 rounded ${bar}`} />)}</div><div className="flex-1" /></>}
      {id === "mobile" && <div className="flex-1 grid place-items-center"><div className="h-12 w-7 rounded-md border-2 border-zinc-500 flex flex-col justify-end"><div className="h-1.5 bg-accent/60" /></div></div>}
    </div>
  );
}
