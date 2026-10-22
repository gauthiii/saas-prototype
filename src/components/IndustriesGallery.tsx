// src/components/IndustriesGallery.tsx — every industry as a card, expandable to its
// sub-categories, with the style each one ships in by default.
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search, Layers } from "lucide-react";
import { icon } from "../lib/iconMap";
import { PARENTS, childrenOf, CATALOG } from "../industries/catalog";
import { styleById } from "../design/styles";

export function IndustriesGallery({ onOpen, onBack }: { onOpen: (id: string) => void; onBack: () => void }) {
  const [q, setQ] = useState("");
  const parents = useMemo(() => PARENTS.filter(p =>
    !q || [p, ...childrenOf(p.id)].some(e => `${e.label} ${e.sub} ${e.productName}`.toLowerCase().includes(q.toLowerCase()))
  ), [q]);
  const screens = CATALOG.reduce((s, e) => s + e.views.length, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      <button onClick={onBack} className="btn-ghost text-xs"><ArrowLeft size={13} /> Back</button>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow mb-2 flex items-center gap-1.5"><Layers size={12} /> Industry library</div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-tight">Every industry, every sub-category</h1>
          <p className="ink-2 mt-2 max-w-2xl">{PARENTS.length} industries · {CATALOG.length - PARENTS.length} sub-categories · {screens.toLocaleString("en-US")} screens. Each opens in the design style that suits it best — switch styles any time in the Design Studio.</p>
        </div>
        <label className="field !py-2 flex items-center gap-2 max-w-xs">
          <Search size={14} className="ink-2" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter industries…" className="bg-transparent outline-none w-full text-sm" aria-label="Filter industries" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {parents.map(p => {
          const I = icon(p.icon);
          const subs = childrenOf(p.id);
          return (
            <div key={p.id} className="card p-5 flex flex-col gap-4 card-hover">
              <button onClick={() => onOpen(p.id)} className="flex items-start gap-3 text-left group">
                <span className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-accent to-grad text-white shrink-0"><I size={20} /></span>
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-1.5 font-display text-lg">{p.label}<ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></span>
                  <span className="block text-xs ink-2">{p.productName} · {p.sub}</span>
                </span>
              </button>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] rounded-full bg-accent/10 text-accent px-2 py-0.5 font-semibold">{styleById(p.styles.default)?.name}</span>
                <span className="text-[10px] rounded-full border border-[var(--line)] ink-2 px-2 py-0.5">{p.views.length} screens</span>
              </div>
              {subs.length > 0 && (
                <ul className="space-y-1 border-t border-[var(--line)] pt-3 mt-auto">
                  {subs.map(s => {
                    const SI = icon(s.icon);
                    return (
                      <li key={s.id}>
                        <button onClick={() => onOpen(s.id)} className="w-full flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left hover:bg-accent/8 transition-colors">
                          <SI size={14} className="text-accent shrink-0" />
                          <span className="flex-1 min-w-0 text-sm truncate">{s.label}</span>
                          <span className="text-[10px] ink-2">{styleById(s.styles.default)?.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
