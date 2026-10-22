// src/components/CommandPalette.tsx — ⌘K palette: jump to any industry / sub-category,
// any screen of the current industry, or switch design style.
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, CornerDownRight, CornerDownLeft, Wand2, ChevronsUpDown } from "lucide-react";
import { icon } from "../lib/iconMap";
import { CATALOG, type CatalogEntry } from "../industries/catalog";
import { STYLES, type StyleId } from "../design/styles";

type Item =
  | { kind: "industry"; entry: CatalogEntry; text: string }
  | { kind: "screen"; id: string; label: string; iconName: string; group: string; text: string }
  | { kind: "style"; id: StyleId; name: string; text: string };

/** Subsequence fuzzy score: lower is better, -1 = no match. */
function score(text: string, q: string): number {
  if (!q) return 0;
  const t = text.toLowerCase(), s = q.toLowerCase();
  const direct = t.indexOf(s);
  if (direct >= 0) return direct;
  let ti = 0, gaps = 0;
  for (const ch of s) {
    const at = t.indexOf(ch, ti);
    if (at < 0) return -1;
    gaps += at - ti;
    ti = at + 1;
  }
  return 100 + gaps;
}

export function DomainButton({ entry, onOpen }: { entry: CatalogEntry; onOpen: () => void }) {
  const I = icon(entry.icon);
  return (
    <button onClick={onOpen} className="btn-ghost !pl-2.5 min-w-0 sm:min-w-60 justify-between" aria-haspopup="dialog" aria-label={`Switch industry (current: ${entry.label})`}>
      <span className="flex items-center gap-2.5 min-w-0">
        <span className="grid place-items-center h-7 w-7 shrink-0 rounded-lg bg-accent/12 text-accent"><I size={15} /></span>
        <span className="text-left leading-tight min-w-0">
          <span className="block text-sm font-semibold truncate">{entry.label}</span>
          <span className="hidden sm:block text-[10px] ink-2 truncate">{entry.sub}</span>
        </span>
      </span>
      <span className="hidden sm:flex items-center gap-1 text-[10px] ink-2 font-mono"><kbd className="border border-[var(--line)] rounded px-1">⌘K</kbd><ChevronsUpDown size={13} /></span>
    </button>
  );
}

export function CommandPalette({ current, onClose, onIndustry, onScreen, onStyle }: {
  current: CatalogEntry;
  onClose: () => void;
  onIndustry: (id: string) => void;
  onScreen: (id: string) => void;
  onStyle: (id: StyleId) => void;
}) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const list = useRef<HTMLUListElement>(null);

  const items = useMemo(() => {
    const all: Item[] = [
      ...CATALOG.map(e => ({ kind: "industry" as const, entry: e, text: `${e.label} ${e.sub} ${e.productName} ${e.parent ? CATALOG.find(p => p.id === e.parent)?.label ?? "" : ""}` })),
      ...current.views.map(v => ({ kind: "screen" as const, id: v.id, label: v.label, iconName: v.icon, group: v.group, text: `${v.label} ${v.group}` })),
      ...STYLES.map(s => ({ kind: "style" as const, id: s.id, name: s.name, text: `style ${s.name} ${s.set}` })),
    ];
    if (!q) return all.filter(i => i.kind === "industry");
    return all.map(i => ({ i, s: score(i.text, q) })).filter(x => x.s >= 0).sort((a, b) => a.s - b.s).slice(0, 40).map(x => x.i);
  }, [q, current]);

  useEffect(() => { setCursor(0); }, [q]);
  useEffect(() => { (list.current?.children[cursor] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest" }); }, [cursor]);

  const run = (it: Item) => {
    if (it.kind === "industry") onIndustry(it.entry.id);
    else if (it.kind === "screen") onScreen(it.id);
    else onStyle(it.id);
    onClose();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setCursor(c => Math.min(c + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
    else if (e.key === "Enter" && items[cursor]) { e.preventDefault(); run(items[cursor]); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]" onKeyDown={onKey}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-xl card !p-0 overflow-hidden shadow-lift animate-fadeUp" role="dialog" aria-label="Command palette">
        <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-3">
          <Search size={16} className="ink-2" />
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${CATALOG.length} industries, screens, or styles…`}
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink-2)]" aria-label="Search" role="combobox" aria-expanded="true" aria-controls="palette-list" />
          <kbd className="text-[10px] font-mono ink-2 border border-[var(--line)] rounded px-1.5">Esc</kbd>
        </div>
        <ul id="palette-list" ref={list} role="listbox" className="max-h-[60vh] overflow-y-auto p-1.5">
          {items.map((it, i) => {
            const active = i === cursor;
            const base = `w-full flex items-center gap-3 rounded-lg py-2 pr-2.5 text-left transition-colors ${active ? "bg-accent/10" : "hover:bg-accent/5"}`;
            if (it.kind === "industry") {
              const I = icon(it.entry.icon);
              const isCur = it.entry.id === current.id;
              return (
                <li key={`i-${it.entry.id}`} role="option" aria-selected={active}>
                  <button onClick={() => run(it)} onMouseMove={() => setCursor(i)} className={`${base} ${it.entry.parent && !q ? "pl-6" : "pl-2.5"}`}>
                    {it.entry.parent && !q && <CornerDownRight size={12} className="ink-2 -mr-1 shrink-0" />}
                    <span className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent shrink-0"><I size={15} /></span>
                    <span className="flex-1 min-w-0 leading-tight">
                      <span className="block text-sm font-medium truncate">{it.entry.label} <span className="ink-2 font-normal">· {it.entry.productName}</span></span>
                      <span className="block text-[11px] ink-2 truncate">{it.entry.sub}</span>
                    </span>
                    {isCur ? <span className="text-[10px] text-accent font-semibold">Current</span> : active && <CornerDownLeft size={13} className="ink-2" />}
                  </button>
                </li>
              );
            }
            if (it.kind === "screen") {
              const I = icon(it.iconName);
              return (
                <li key={`s-${it.id}`} role="option" aria-selected={active}>
                  <button onClick={() => run(it)} onMouseMove={() => setCursor(i)} className={`${base} pl-2.5`}>
                    <span className="grid place-items-center h-8 w-8 rounded-lg surface-2 ink-2 shrink-0"><I size={15} /></span>
                    <span className="flex-1 text-sm">{it.label}</span><span className="text-[10px] ink-2 uppercase tracking-wider">{current.productName} · {it.group}</span>
                  </button>
                </li>
              );
            }
            return (
              <li key={`st-${it.id}`} role="option" aria-selected={active}>
                <button onClick={() => run(it)} onMouseMove={() => setCursor(i)} className={`${base} pl-2.5`}>
                  <span className="grid place-items-center h-8 w-8 rounded-lg bg-grad/12 text-grad shrink-0"><Wand2 size={15} /></span>
                  <span className="flex-1 text-sm">Switch style to {it.name}</span><span className="text-[10px] ink-2 uppercase tracking-wider">Style</span>
                </button>
              </li>
            );
          })}
          {items.length === 0 && <li className="px-3 py-6 text-sm ink-2 text-center">Nothing matches “{q}”.</li>}
        </ul>
        <div className="flex items-center gap-4 border-t border-[var(--line)] px-4 py-2 text-[10px] ink-2">
          <span>↑↓ navigate</span><span>↵ open</span><span className="ml-auto">{CATALOG.filter(c => !c.parent).length} industries · {CATALOG.filter(c => c.parent).length} sub-categories</span>
        </div>
      </div>
    </div>
  );
}
