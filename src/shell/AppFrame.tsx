// src/shell/AppFrame.tsx — the four switchable app shells (sidebar, top nav, icon rail,
// mobile app frame). Used by the live builder and by exported projects.
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Globe, LayoutDashboard, BriefcaseBusiness, User, BookOpen, Wrench, Signal, Wifi, BatteryFull, ChevronLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { icon } from "../lib/iconMap";
import type { ShellId } from "../design/styles";

export type FrameView = { id: string; label: string; icon: string; group: string };
export type Brand = { name: string; sub: string; onClick?: () => void };

type Props = {
  shell: ShellId;
  brand: Brand;
  views: FrameView[];
  currentId: string;
  onSelect: (id: string) => void;
  /** Builder controls (domain picker etc.) — left side of the header. */
  headerLeft?: ReactNode;
  /** Builder actions — right side of the header. */
  headerRight?: ReactNode;
  footerNote?: string;
  children: ReactNode;
};

export const GROUP_ICONS: Record<string, LucideIcon> = {
  Public: Globe, App: LayoutDashboard, Workspace: BriefcaseBusiness, Account: User, Resources: BookOpen, Utilities: Wrench,
};

function useGroups(views: FrameView[]) {
  return useMemo(() => {
    const map: Record<string, FrameView[]> = {};
    for (const v of views) (map[v.group] ??= []).push(v);
    return map;
  }, [views]);
}

function BrandMark({ brand, compact }: { brand: Brand; compact?: boolean }) {
  return (
    <button onClick={brand.onClick} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity min-w-0" aria-label={`${brand.name} home`}>
      <span className="grid place-items-center h-8 w-8 shrink-0 rounded-xl bg-gradient-to-br from-accent to-grad text-white font-display font-bold text-sm">{brand.name[0]}</span>
      {!compact && (
        <span className="leading-tight text-left min-w-0">
          <span className="block font-display font-bold tracking-tight truncate">{brand.name}</span>
          <span className="block text-[10px] ink-2 font-mono truncate">{brand.sub}</span>
        </span>
      )}
    </button>
  );
}

function NavItem({ v, active, onSelect, dense }: { v: FrameView; active: boolean; onSelect: (id: string) => void; dense?: boolean }) {
  const Icon = icon(v.icon);
  return (
    <button onClick={() => onSelect(v.id)} aria-current={active ? "page" : undefined}
      className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 ${dense ? "py-1.5" : "py-2"} text-sm font-medium transition-all duration-150 text-left
        ${active ? "bg-accent text-white shadow-card" : "ink-2 hover:bg-accent/8 hover:text-[var(--ink)]"}`}>
      <Icon size={15} className="shrink-0" /> <span className="truncate">{v.label}</span>
    </button>
  );
}

/** Two-row group + view chips used on small screens by every desktop shell. */
function MobileTabs({ groups, currentId, onSelect }: { groups: Record<string, FrameView[]>; currentId: string; onSelect: (id: string) => void }) {
  const curGroup = Object.keys(groups).find(g => groups[g].some(v => v.id === currentId)) ?? Object.keys(groups)[0];
  return (
    <div className="md:hidden">
      <div className="flex gap-1.5 overflow-x-auto px-4 pt-2 border-b border-[var(--line)]">
        {Object.keys(groups).map(g => (
          <button key={g} onClick={() => onSelect(groups[g][0].id)}
            className={`shrink-0 px-3 py-1.5 text-xs font-semibold border-b-2 transition-colors ${g === curGroup ? "border-accent text-accent" : "border-transparent ink-2"}`}>{g}</button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto px-4 py-2">
        {(groups[curGroup] ?? []).map(v => (
          <button key={v.id} onClick={() => onSelect(v.id)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${v.id === currentId ? "bg-accent text-white border-accent" : "surface ink-2"}`}>{v.label}</button>
        ))}
      </div>
    </div>
  );
}

function Header({ left, right, children }: { left?: ReactNode; right?: ReactNode; children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 surface !border-x-0 !border-t-0 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">{left}</div>
      {children}
      <div className="flex items-center gap-2 shrink-0">{right}</div>
    </header>
  );
}

export function AppFrame(p: Props) {
  const groups = useGroups(p.views);
  const main = useRef<HTMLElement>(null);
  useEffect(() => { main.current?.scrollTo?.({ top: 0 }); }, [p.currentId]);

  if (p.shell === "topnav") return <TopNav {...p} groups={groups} />;
  if (p.shell === "rail") return <Rail {...p} groups={groups} />;
  if (p.shell === "mobile") return <MobileFrame {...p} groups={groups} />;

  return (
    <div className="min-h-full flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col surface !border-y-0 !border-l-0 h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-[var(--line)]"><BrandMark brand={p.brand} /></div>
        <nav className="p-3 space-y-3 flex-1 overflow-y-auto" aria-label="Screens">
          {Object.entries(groups).map(([g, vs]) => (
            <div key={g}>
              <div className="eyebrow px-2.5 pt-1 pb-1.5">{g}</div>
              <div className="space-y-0.5">{vs.map(v => <NavItem key={v.id} v={v} active={v.id === p.currentId} onSelect={p.onSelect} />)}</div>
            </div>
          ))}
        </nav>
        {p.footerNote && <div className="p-4 border-t border-[var(--line)] text-[11px] ink-2 leading-relaxed">{p.footerNote}</div>}
      </aside>
      <div className="flex-1 min-w-0">
        <Header left={p.headerLeft} right={p.headerRight} />
        <MobileTabs groups={groups} currentId={p.currentId} onSelect={p.onSelect} />
        <main ref={main} key={p.currentId} className="p-4 sm:p-6 animate-fadeUp">{p.children}</main>
      </div>
    </div>
  );
}

function TopNav(p: Props & { groups: Record<string, FrameView[]> }) {
  const [open, setOpen] = useState<string | null>(null);
  const curGroup = Object.keys(p.groups).find(g => p.groups[g].some(v => v.id === p.currentId));
  return (
    <div className="min-h-full">
      <Header left={<>{<BrandMark brand={p.brand} />}<span className="hidden lg:block h-6 w-px bg-[var(--line)]" />{p.headerLeft}</>} right={p.headerRight} />
      <nav className="hidden md:flex sticky top-[61px] z-10 surface !border-x-0 !border-t-0 px-4 sm:px-6 gap-1" aria-label="Screens">
        {Object.entries(p.groups).map(([g, vs]) => {
          const GI = GROUP_ICONS[g] ?? LayoutDashboard;
          return (
            <div key={g} className="relative" onMouseLeave={() => setOpen(o => (o === g ? null : o))}>
              <button onClick={() => setOpen(o => (o === g ? null : g))} onMouseEnter={() => setOpen(g)} aria-expanded={open === g}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${g === curGroup ? "border-accent text-accent" : "border-transparent ink-2 hover:text-[var(--ink)]"}`}>
                <GI size={14} /> {g} <ChevronDown size={12} />
              </button>
              {open === g && (
                <div className="absolute left-0 top-full z-30 w-64 card !p-1.5 shadow-lift animate-fadeUp">
                  {vs.map(v => <NavItem key={v.id} v={v} dense active={v.id === p.currentId} onSelect={id => { p.onSelect(id); setOpen(null); }} />)}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <MobileTabs groups={p.groups} currentId={p.currentId} onSelect={p.onSelect} />
      <main key={p.currentId} className="p-4 sm:p-6 max-w-[1400px] mx-auto animate-fadeUp">{p.children}</main>
    </div>
  );
}

function Rail(p: Props & { groups: Record<string, FrameView[]> }) {
  const curGroup = Object.keys(p.groups).find(g => p.groups[g].some(v => v.id === p.currentId)) ?? Object.keys(p.groups)[0];
  const [panel, setPanel] = useState(curGroup);
  useEffect(() => setPanel(curGroup), [curGroup]);
  return (
    <div className="min-h-full flex">
      <aside className="hidden md:flex w-16 shrink-0 flex-col items-center gap-1 surface !border-y-0 !border-l-0 h-screen sticky top-0 py-4">
        <BrandMark brand={p.brand} compact />
        <div className="h-px w-8 bg-[var(--line)] my-3" />
        {Object.keys(p.groups).map(g => {
          const GI = GROUP_ICONS[g] ?? LayoutDashboard;
          return (
            <button key={g} onClick={() => setPanel(g)} title={g} aria-label={g} aria-pressed={panel === g}
              className={`relative grid place-items-center h-10 w-10 rounded-xl transition-colors ${panel === g ? "bg-accent text-white" : "ink-2 hover:bg-accent/10 hover:text-accent"}`}>
              <GI size={18} />
              {g === curGroup && panel !== g && <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-accent" />}
            </button>
          );
        })}
      </aside>
      <aside className="hidden md:flex w-56 shrink-0 flex-col surface-2 border-r border-[var(--line)] h-screen sticky top-0">
        <div className="px-4 pt-5 pb-3"><div className="eyebrow">{panel}</div><div className="font-display text-sm mt-1 truncate">{p.brand.name}</div></div>
        <nav className="px-2 space-y-0.5 overflow-y-auto" aria-label={`${panel} screens`}>
          {(p.groups[panel] ?? []).map(v => <NavItem key={v.id} v={v} active={v.id === p.currentId} onSelect={p.onSelect} />)}
        </nav>
      </aside>
      <div className="flex-1 min-w-0">
        <Header left={p.headerLeft} right={p.headerRight} />
        <MobileTabs groups={p.groups} currentId={p.currentId} onSelect={p.onSelect} />
        <main key={p.currentId} className="p-4 sm:p-6 animate-fadeUp">{p.children}</main>
      </div>
    </div>
  );
}

function MobileFrame(p: Props & { groups: Record<string, FrameView[]> }) {
  const groupNames = Object.keys(p.groups);
  const curGroup = groupNames.find(g => p.groups[g].some(v => v.id === p.currentId)) ?? groupNames[0];
  const cur = p.views.find(v => v.id === p.currentId);
  const tabs = groupNames;
  const idx = p.views.findIndex(v => v.id === p.currentId);
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); }, [p.currentId]);
  return (
    <div className="min-h-full flex flex-col">
      <Header left={<><BrandMark brand={p.brand} />{p.headerLeft}</>} right={p.headerRight} />
      <div className="flex-1 grid place-items-center p-4 sm:p-8">
        <div className="relative w-[390px] max-w-full h-[800px] max-h-[calc(100vh-110px)] rounded-[3rem] border-[10px] border-zinc-900 dark:border-zinc-700 bg-[var(--bg)] shadow-2xl overflow-hidden flex flex-col">
          <div className="absolute left-1/2 -translate-x-1/2 top-2 h-6 w-28 rounded-full bg-zinc-900 z-30" aria-hidden="true" />
          <div className="flex items-center justify-between px-7 pt-3 pb-1 text-[11px] font-semibold" aria-hidden="true">
            <span>9:41</span><span className="flex items-center gap-1"><Signal size={12} /><Wifi size={12} /><BatteryFull size={14} /></span>
          </div>
          <div className="surface !border-x-0 !border-t-0 px-4 py-2.5 flex items-center gap-2">
            <button onClick={() => idx > 0 && p.onSelect(p.views[idx - 1].id)} disabled={idx <= 0} className="ink-2 disabled:opacity-30" aria-label="Previous screen"><ChevronLeft size={18} /></button>
            <div className="flex-1 text-center text-sm font-semibold truncate">{cur?.label}</div>
            <span className="w-[18px]" />
          </div>
          <div className="flex gap-1.5 overflow-x-auto px-3 py-2 border-b border-[var(--line)]">
            {(p.groups[curGroup] ?? []).map(v => (
              <button key={v.id} onClick={() => p.onSelect(v.id)}
                ref={el => { if (el && v.id === p.currentId) el.scrollIntoView({ inline: "center", block: "nearest" }); }}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium border ${v.id === p.currentId ? "bg-accent text-white border-accent" : "border-[var(--line)] ink-2"}`}>{v.label}</button>
            ))}
          </div>
          <div ref={scroller} className="flex-1 overflow-y-auto overflow-x-hidden">
            {/* Responsive grids react to the window, so .phone-canvas collapses them to phone width. */}
            <main key={p.currentId} className="phone-canvas p-3 animate-fadeUp text-[13px]">{p.children}</main>
          </div>
          <nav className="surface !border-x-0 !border-b-0 grid pb-4 pt-1.5" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }} aria-label="Sections">
            {tabs.map(g => {
              const GI = GROUP_ICONS[g] ?? LayoutDashboard;
              return (
                <button key={g} onClick={() => p.onSelect(p.groups[g][0].id)} aria-current={g === curGroup ? "page" : undefined}
                  className={`flex flex-col items-center gap-0.5 py-1 text-[9px] font-medium ${g === curGroup ? "text-accent" : "ink-2"}`}>
                  <GI size={18} /> {g}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
