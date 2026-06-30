// src/App.tsx
import React, { ComponentType, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Routes, Route, Navigate } from "react-router-dom";
import {
  Sun, Moon, ChevronsUpDown, Check, Search,
  Paintbrush, Download, Loader2, Eye, CornerDownRight,
} from "lucide-react";
import { ICONS, IconType } from "./lib/iconMap";
import * as fintech from "./domains/fintech";
import * as banking from "./domains/banking";
import * as healthtech from "./domains/healthtech";
import * as devops from "./domains/devops";
import * as hrtech from "./domains/hrtech";
import * as edtech from "./domains/edtech";
import * as retailtech from "./domains/retailtech";
import * as energytech from "./domains/energytech";
import * as energyFossil from "./domains/energy-fossil";
import * as energyRenewable from "./domains/energy-renewable";
import * as energyNuclear from "./domains/energy-nuclear";
import { DOMAIN_DEFS, DomainDef } from "./export/registry";
import { exportProject } from "./export/exportProject";
import { ThemeStudio } from "./components/ThemeStudio";
import { About } from "./components/About";
import { VersionHistory } from "./components/VersionHistory";
import { AppPreview } from "./components/AppPreview";
import { Theme, loadTheme, applyTheme, saveTheme } from "./theme";


const MODULES: Record<string, Record<string, ComponentType>> = {
  fintech, banking, healthtech, devops, hrtech, edtech, retailtech, energytech,
  "energy-fossil": energyFossil, "energy-renewable": energyRenewable, "energy-nuclear": energyNuclear,
};

type View = { id: string; label: string; icon: IconType; el: React.ReactElement; group?: string };
type Domain = { id: string; label: string; sub: string; icon: IconType; def: DomainDef; views: View[] };

const DOMAINS: Domain[] = DOMAIN_DEFS.map(def => ({
  id: def.id,
  label: def.label,
  sub: def.sub,
  icon: ICONS[def.icon],
  def,
  views: def.views.map(v => {
    const C = MODULES[def.file][v.comp];
    if (!C) throw new Error(`Registry error: ${v.comp} not exported from domains/${def.file}`);
    const el = v.wrap ? <div className={v.wrap}><C /></div> : <C />;
    return { id: v.id, label: v.label, icon: ICONS[v.icon], el, group: v.group };
  }),
}));

function DomainPicker({ domain, onPick }: { domain: Domain; onPick: (d: Domain) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(
    () => DOMAINS.filter(d => (d.label + d.sub).toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  const close = () => { setOpen(false); setQ(""); setCursor(-1); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "Escape") { close(); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor(c => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor(c => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && cursor >= 0 && filtered[cursor]) {
      e.preventDefault();
      onPick(filtered[cursor]);
      close();
    }
  };

  useEffect(() => {
    if (cursor >= 0 && listRef.current) {
      const el = listRef.current.children[cursor] as HTMLElement | undefined;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [cursor]);

  return (
    <div className="relative" onKeyDown={onKeyDown}>
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
          <div className="fixed inset-0 z-30" onClick={close} />
          <div className="absolute z-40 mt-2 w-72 card !p-0 overflow-hidden shadow-lift animate-fadeUp">
            <div className="flex items-center gap-2 border-b border-[var(--line)] px-3 py-2.5">
              <Search size={14} className="ink-2" />
              <input autoFocus value={q}
                onChange={e => { setQ(e.target.value); setCursor(-1); }}
                placeholder="Search domain templates..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink-2)]" />
            </div>
            <ul ref={listRef} role="listbox" className="max-h-72 overflow-y-auto p-1.5">
              {filtered.map((d, i) => (
                <li key={d.id} role="option" aria-selected={d.id === domain.id}>
                  <button onClick={() => { onPick(d); close(); }}
                    className={`w-full flex items-center gap-3 rounded-lg py-2 pr-2.5 text-left transition-colors hover:bg-accent/8 ${d.def.parent ? "pl-5" : "pl-2.5"} ${d.id === domain.id ? "bg-accent/8" : ""} ${i === cursor ? "ring-2 ring-accent/50 ring-inset" : ""}`}>
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

function AppShell() {
  const navigate = useNavigate();
  const { domainId, viewId } = useParams<{ domainId: string; viewId: string }>();

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("forgeui-dark");
    if (saved !== null) return saved === "true";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [themeOpen, setThemeOpen] = useState(false);
  const [exportStage, setExportStage] = useState<string | null>(null);
  const exportCancelled = useRef(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const domain = DOMAINS.find(d => d.id === domainId) ?? DOMAINS[0];
  const view = domain.views.find(v => v.id === viewId) ?? domain.views[0];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("forgeui-dark", String(dark));
  }, [dark]);

  useEffect(() => { applyTheme(theme); }, [theme]);

  const pick = (d: Domain) => navigate(`/${d.id}/${d.views[0].id}`);
  const setViewNav = (id: string) => navigate(`/${domain.id}/${id}`);

  const applySelectedTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    saveTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const doExport = async () => {
    if (exportStage) return;
    exportCancelled.current = false;
    setExportStage("Generating slides…");
    try {
      if (exportCancelled.current) return;
      setExportStage("Compressing files…");
      await exportProject(domain.def, theme);
      if (!exportCancelled.current) setExportStage("Done ✓");
      setTimeout(() => setExportStage(null), 1200);
    } catch (err) {
      if (!exportCancelled.current) {
        console.error("Export failed:", err);
        setExportStage("Export failed — see console.");
        setTimeout(() => setExportStage(null), 3000);
      }
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
      <aside className="hidden md:flex w-60 shrink-0 flex-col surface border-r min-h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-[var(--line)] space-y-2">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 w-full hover:opacity-75 transition-opacity">
            <span className="grid place-items-center h-8 w-8 rounded-xl bg-gradient-to-br from-accent to-grad text-white font-display font-bold text-sm">F</span>
            <div className="leading-tight text-left">
              <div className="font-display font-bold tracking-tight">ForgeUI</div>
              <div className="text-[10px] ink-2 font-mono">template builder</div>
            </div>
          </button>
        </div>
        <nav className="p-3 space-y-3 flex-1 overflow-y-auto" aria-label="Screens">
          {Object.entries(groups).map(([group, views]) => (
            <div key={group}>
              <div className="flex items-center justify-between px-2.5 pt-1 pb-1.5">
                <span className="eyebrow">{group}</span>
              </div>
              <div className="space-y-0.5">
                {views.map(v => (
                  <button key={v.id} onClick={() => setViewNav(v.id)}
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

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 surface border-b backdrop-blur px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <DomainPicker domain={domain} onPick={pick} />
          <div className="flex items-center gap-2">
            <button onClick={() => setPreviewOpen(true)}
              className="btn-ghost !p-2"
              aria-label={`Preview ${domain.label} app flow`}
              title="Preview how the exported app looks and flows">
              <Eye size={16} />
            </button>
            <span className="hidden sm:block text-xs ink-2">Generated template · <span className="font-mono">{domain.id}/{view.id}</span></span>
            <button onClick={() => setThemeOpen(true)} className="btn-ghost !p-2" aria-label="Open theme studio" title="Change theme colours">
              <Paintbrush size={16} />
            </button>
            <button onClick={doExport} disabled={!!exportStage} className="btn-ghost !px-3 !py-2 gap-1.5 disabled:opacity-60"
              aria-label={`Export ${domain.label} as Vite project`} title="Export this domain as a Vite project zip">
              {exportStage ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
              <span className="hidden sm:inline text-xs font-semibold">{exportStage ?? "Export project"}</span>
            </button>
            <button onClick={() => setDark(d => !d)} className="btn-ghost !p-2" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* Mobile screen tabs — grouped (U3) */}
        <div className="md:hidden">
          <div className="flex gap-1.5 overflow-x-auto px-4 pt-2 pb-0 border-b border-[var(--line)]">
            {Object.keys(groups).map(group => (
              <button key={group}
                onClick={() => setViewNav(groups[group][0].id)}
                className={`shrink-0 rounded-t-lg px-3 py-1.5 text-xs font-semibold border-b-2 transition-colors ${
                  groups[group].some(v => v.id === view.id)
                    ? "border-accent text-accent"
                    : "border-transparent ink-2"
                }`}>
                {group}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 pt-2 pb-2">
            {(groups[view.group ?? "App"] ?? domain.views).map(v => (
              <button key={v.id} onClick={() => setViewNav(v.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${v.id === view.id ? "bg-accent text-white border-accent" : "surface ink-2"}`}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <main key={`${domain.id}-${view.id}`} className="p-4 sm:p-6 animate-fadeUp">
          {view.el}
        </main>
      </div>

      {exportStage && exportStage !== "Done ✓" && !exportStage.startsWith("Export failed") && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          <div className="relative card !p-6 w-full max-w-sm shadow-lift animate-fadeUp flex flex-col items-center gap-4">
            <Loader2 size={28} className="animate-spin text-accent" />
            <div className="text-sm font-semibold">{exportStage}</div>
            <button
              className="btn-ghost text-xs px-4 py-1.5"
              onClick={() => { exportCancelled.current = true; setExportStage(null); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

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

function DomainRedirect() {
  const { domainId } = useParams<{ domainId: string }>();
  const d = DOMAINS.find(x => x.id === domainId) ?? DOMAINS[0];
  return <Navigate to={`/${d.id}/${d.views[0].id}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AboutRoute />} />
      <Route path="/versions" element={<VersionsRoute />} />
      <Route path="/:domainId/:viewId" element={<AppShell />} />
      <Route path="/:domainId" element={<DomainRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AboutRoute() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("forgeui-dark");
    if (saved !== null) return saved === "true";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("forgeui-dark", String(dark));
  }, [dark]);
  const defaultDomain = DOMAINS[0];
  return (
    <main className="p-4 sm:p-6 animate-fadeUp">
      <About
        onNavigateToDomain={() => navigate(`/${defaultDomain.id}/${defaultDomain.views[0].id}`)}
        onViewVersions={() => navigate("/versions")}
        dark={dark}
        setDark={setDark}
      />
    </main>
  );
}

function VersionsRoute() {
  const navigate = useNavigate();
  return (
    <main className="p-4 sm:p-6 animate-fadeUp">
      <VersionHistory onBack={() => navigate(-1)} />
    </main>
  );
}