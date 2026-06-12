// src/App.tsx
import { ComponentType, useEffect, useMemo, useState } from "react";
import {
  Landmark, HeartPulse, TerminalSquare, Users, GraduationCap,
  LayoutDashboard, FileText, CalendarDays, ListChecks, BarChart3,
  Sun, Moon, ChevronsUpDown, Check, Boxes, Search,
  CreditCard, Send, PiggyBank, Shield, TrendingUp, Building2,
  Video, Pill, BedDouble, ClipboardList, Receipt,
  GitBranch, BellRing, Flag, DollarSign, Lock,
  UserCheck, Briefcase, MessageCircle,
  Home, LogIn, UserPlus, User, Settings, HelpCircle, Headphones,
  Info, Tag, ShieldCheck, Sparkles, AlertTriangle,
  Paintbrush, Download, Loader2, Eye,
  ShoppingCart, Package, Truck, Percent, Star,
  Banknote, ArrowLeftRight, Globe, CornerDownRight,
} from "lucide-react";
import * as fintech from "./domains/fintech";
import * as banking from "./domains/banking";
import * as healthtech from "./domains/healthtech";
import * as devops from "./domains/devops";
import * as hrtech from "./domains/hrtech";
import * as edtech from "./domains/edtech";
import * as retailtech from "./domains/retailtech";
import { DOMAIN_DEFS, DomainDef } from "./export/registry";
import { exportProject } from "./export/exportProject";
import { ThemeStudio } from "./components/ThemeStudio";
import { About } from "./components/About";
import { AppPreview } from "./components/AppPreview";
import { Theme, loadTheme, applyTheme, saveTheme } from "./theme";

type IconType = typeof LayoutDashboard;

const ICONS: Record<string, IconType> = {
  Landmark, HeartPulse, TerminalSquare, Users, GraduationCap,
  LayoutDashboard, FileText, CalendarDays, ListChecks, BarChart3,
  Boxes, CreditCard, Send, PiggyBank, Shield, TrendingUp, Building2,
  Video, Pill, BedDouble, ClipboardList, Receipt,
  GitBranch, BellRing, Flag, DollarSign, Lock,
  UserCheck, Briefcase, MessageCircle,
  Home, LogIn, UserPlus, User, Settings, HelpCircle, Headphones,
  Info, Tag, ShieldCheck, Sparkles, AlertTriangle,
  ShoppingCart, Package, Truck, Percent, Star,
  Banknote, ArrowLeftRight, Globe,
};

const MODULES: Record<string, Record<string, unknown>> = { fintech, banking, healthtech, devops, hrtech, edtech, retailtech };

type View = { id: string; label: string; icon: IconType; el: JSX.Element; group?: string };
type Domain = { id: string; label: string; sub: string; icon: IconType; def: DomainDef; views: View[] };

const DOMAINS: Domain[] = DOMAIN_DEFS.map(def => ({
  id: def.id,
  label: def.label,
  sub: def.sub,
  icon: ICONS[def.icon],
  def,
  views: def.views.map(v => {
    const C = MODULES[def.file][v.comp] as ComponentType;
    if (!C) throw new Error(`Registry error: ${v.comp} not exported from domains/${def.file}`);
    const el = v.wrap ? <div className={v.wrap}><C /></div> : <C />;
    return { id: v.id, label: v.label, icon: ICONS[v.icon], el, group: v.group };
  }),
}));

function DomainPicker({ domain, onPick }: { domain: Domain; onPick: (d: Domain) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => DOMAINS.filter(d => (d.label + d.sub).toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="btn-ghost !pl-2.5 min-w-56 justify-between" aria-haspopup="listbox" aria-expanded={open}>
        <span className="flex items-center gap-2.5">
          <span className="grid place-items-center h-7 w-7 rounded-lg bg-accent/12 text-accent"><domain.icon size={15} /></span>
          <span className="text-left leading-tight">
            <span className="block text-sm font-semibold">{domain.label}</span>
            <span className="block text-[10px] ink-2">{domain.sub}</span>
          </span>
        </span>
        <ChevronsUpDown size={14} className="ink-2" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute z-40 mt-2 w-72 card !p-0 overflow-hidden shadow-lift animate-fadeUp">
            <div className="flex items-center gap-2 border-b border-[var(--line)] px-3 py-2.5">
              <Search size={14} className="ink-2" />
              <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search domain templates..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink-2)]" />
            </div>
            <ul role="listbox" className="max-h-72 overflow-y-auto p-1.5">
              {filtered.map(d => (
                <li key={d.id}>
                  <button onClick={() => { onPick(d); setOpen(false); setQ(""); }}
                    className={`w-full flex items-center gap-3 rounded-lg py-2 pr-2.5 text-left transition-colors hover:bg-accent/8 ${d.def.parent ? "pl-5" : "pl-2.5"} ${d.id === domain.id ? "bg-accent/8" : ""}`}>
                    {d.def.parent && <CornerDownRight size={13} className="ink-2 shrink-0 -mr-1" />}
                    <span className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent"><d.icon size={16} /></span>
                    <span className="flex-1 leading-tight">
                      <span className="block text-sm font-medium">{d.label}</span>
                      <span className="block text-[11px] ink-2">{d.sub}</span>
                    </span>
                    {d.id === domain.id && <Check size={15} className="text-accent" />}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="px-3 py-4 text-sm ink-2">No template matches "{q}". Clear the search to see all domains.</li>}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);
  const [showAbout, setShowAbout] = useState(true);
  const [domain, setDomain] = useState(DOMAINS[0]);
  const [viewId, setViewId] = useState(DOMAINS[0].views[0].id);
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [themeOpen, setThemeOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const view = domain.views.find(v => v.id === viewId) ?? domain.views[0];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => { applyTheme(theme); }, [theme]);

  const pick = (d: Domain) => { setDomain(d); setViewId(d.views[0].id); setShowAbout(false); };
  const applySelectedTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    saveTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const doExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await exportProject(domain.def, theme);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed — see console for details.");
    } finally {
      setExporting(false);
    }
  };

  const groups = useMemo(() => {
    const map: Record<string, View[]> = {};
    for (const v of domain.views) {
      const g = v.group ?? "App";
      (map[g] ??= []).push(v);
    }
    return map;
  }, [domain]);

  return (
    <div className="min-h-full flex">
      {/* Sidebar - completely hidden if showAbout state is active */}
      {!showAbout && (
        <aside className="hidden md:flex w-60 shrink-0 flex-col surface border-r min-h-screen sticky top-0">
          <div className="px-5 py-5 border-b border-[var(--line)] space-y-2">
            <button onClick={() => setShowAbout(true)} className="flex items-center gap-2.5 w-full hover:opacity-75 transition-opacity">
              <span className="grid place-items-center h-8 w-8 rounded-xl bg-gradient-to-br from-accent to-grad text-white font-display font-bold text-sm">F</span>
              <div className="leading-tight text-left">
                <div className="font-display font-bold tracking-tight">ForgeUI</div>
                <div className="text-[10px] ink-2 font-mono">template builder</div>
              </div>
            </button>
            {/* <button onClick={() => setShowAbout(true)} className="text-left px-2 py-1.5 rounded-lg text-xs font-medium ink-2 hover:bg-accent/8 hover:text-[var(--ink)] transition-all w-full">
              About Us
            </button> */}
          </div>
          <nav className="p-3 space-y-3 flex-1 overflow-y-auto" aria-label="Screens">
            {Object.entries(groups).map(([group, views]) => (
              <div key={group}>
                <div className="flex items-center justify-between px-2.5 pt-1 pb-1.5">
                  <span className="eyebrow">{group}</span>
                  {group === "Public" && (
                    <button onClick={() => setPreviewOpen(true)}
                      className="grid place-items-center h-6 w-6 rounded-md ink-2 hover:bg-accent/8 hover:text-accent transition-colors"
                      aria-label={`Preview ${domain.label} app flow`} title="Preview how the exported app looks and flows">
                      <Eye size={14} />
                    </button>
                  )}
                </div>
                <div className="space-y-0.5">
                  {views.map(v => (
                    <button key={v.id} onClick={() => setViewId(v.id)}
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
            Interactive UI prototype. Wire your own APIs behind every action.
          </div>
        </aside>
      )}

      {/* Main Container */}
      <div className="flex-1 min-w-0">
        {showAbout ? (
          /* Render ONLY the About component. No top navigation bars or mobile sub headers are shown. */
        <main className="p-4 sm:p-6 animate-fadeUp">
          <About 
            onNavigateToDomain={() => setShowAbout(false)} 
            dark={dark} 
            setDark={setDark} 
          />
        </main>
        ) : (
          /* Render normal Layout with Top Navigation Bar + screen specific components */
          <>
            <header className="sticky top-0 z-20 surface border-b backdrop-blur px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
              <DomainPicker domain={domain} onPick={pick} />
              <div className="flex items-center gap-2">
                <span className="hidden sm:block text-xs ink-2">Generated template · <span className="font-mono">{domain.id}/{view.id}</span></span>
                <button onClick={() => setThemeOpen(true)} className="btn-ghost !p-2" aria-label="Open theme studio" title="Change theme colours">
                  <Paintbrush size={16} />
                </button>
                <button onClick={doExport} disabled={exporting} className="btn-ghost !px-3 !py-2 gap-1.5 disabled:opacity-60"
                  aria-label={`Export ${domain.label} as Vite project`} title="Export this domain as a Vite project zip">
                  {exporting ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
                  <span className="hidden sm:inline text-xs font-semibold">{exporting ? "Exporting…" : "Export project"}</span>
                </button>
                <button onClick={() => setDark(d => !d)} className="btn-ghost !p-2" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </header>

            {/* Mobile screen tabs */}
            <div className="md:hidden flex gap-2 overflow-x-auto px-4 pt-3 pb-1">
              {domain.views.map(v => (
                <button key={v.id} onClick={() => setViewId(v.id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${v.id === view.id ? "bg-accent text-white border-accent" : "surface ink-2"}`}>
                  {v.label}
                </button>
              ))}
            </div>

            <main key={`${domain.id}-${view.id}`} className="p-4 sm:p-6 animate-fadeUp">
              {view.el}
            </main>
          </>
        )}
      </div>

      {themeOpen && (
        <ThemeStudio open={themeOpen} onClose={() => setThemeOpen(false)} theme={theme} onApply={applySelectedTheme} />
      )}

      {previewOpen && (
        <AppPreview
          productName={domain.def.productName}
          sub={domain.sub}
          domainId={domain.id}
          views={domain.views}
          dark={dark}
          setDark={setDark}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}