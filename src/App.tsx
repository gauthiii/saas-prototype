// src/App.tsx — builder shell: routing, design state (style + layout, URL-synced), lazy
// industry loading, command palette, Design Studio, preview and export.
import React, { Component, ReactNode, Suspense, use, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useLocation, Routes, Route, Navigate } from "react-router-dom";
import { Sun, Moon, Paintbrush, Download, Loader2, Eye, LayoutGrid, AlertTriangle } from "lucide-react";
import { icon } from "./lib/iconMap";
import { CATALOG, findDomain, loadDomain, type CatalogEntry } from "./industries/catalog";
import { ViewContent } from "./industries/views";
import { exportProject } from "./export/exportProject";
import { DesignStudio } from "./components/DesignStudio";
import { CommandPalette, DomainButton } from "./components/CommandPalette";
import { IndustriesGallery } from "./components/IndustriesGallery";
import { About } from "./components/About";
import { VersionHistory } from "./components/VersionHistory";
import { AppPreview } from "./components/AppPreview";
import { Skeleton } from "./components/ui";
import { AppFrame } from "./shell/AppFrame";
import { StyleBackdrop } from "./design/StyleBackdrop";
import { DesignContext, Design, applyStyle, designToSearch, loadDesign, resolveStyle, saveDesign } from "./design/design";
import { styleById, type StyleId } from "./design/styles";
import { Theme, loadTheme, applyTheme, saveTheme } from "./theme";

function useDarkPreference() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("forgeui-dark");
      if (saved !== null) return saved === "true";
    } catch { /* storage unavailable */ }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  useEffect(() => { try { localStorage.setItem("forgeui-dark", String(dark)); } catch { /* ignore */ } }, [dark]);
  return [dark, setDark] as const;
}

/** Applies colour mode + style to <html> before paint (no flash of the previous style).
 *  Dark-only styles force dark mode while active. */
function useAppliedLook(style: StyleId, darkPref: boolean) {
  const mode = styleById(style)?.mode;
  const dark = mode === "dark" ? true : mode === "light" ? false : darkPref;
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    applyStyle(style);
  }, [dark, style]);
  return { dark, locked: !!mode };
}

/** Keeps one broken screen from taking down the whole builder. */
class ViewBoundary extends Component<{ children: ReactNode; resetKey: string }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidUpdate(prev: { resetKey: string }) { if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null }); }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="card p-8 text-center space-y-3 max-w-lg mx-auto">
        <AlertTriangle className="mx-auto text-amber-500" />
        <div className="font-display text-lg">This screen failed to render</div>
        <p className="text-sm ink-2 font-mono break-words">{this.state.error.message}</p>
        <button className="btn-ghost" onClick={() => this.setState({ error: null })}>Try again</button>
      </div>
    );
  }
}

function ScreenSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading screen">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[0, 1, 2, 3].map(i => <Skeleton key={i} className="h-24" />)}</div>
      <Skeleton className="h-64" />
    </div>
  );
}

function DomainView({ entry, viewId }: { entry: CatalogEntry; viewId: string }) {
  const domain = use(loadDomain(entry.id));
  const view = entry.views.find(v => v.id === viewId) ?? entry.views[0];
  return <ViewContent domain={domain} view={view} />;
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { domainId, viewId } = useParams<{ domainId: string; viewId: string }>();
  const entry = findDomain(domainId) ?? CATALOG[0];
  const view = entry.views.find(v => v.id === viewId) ?? entry.views[0];

  const [darkPref, setDarkPref] = useDarkPreference();
  const [design, setDesignState] = useState<Design>(() => loadDesign(new URLSearchParams(location.search)));
  const [theme, setThemeState] = useState<Theme>(loadTheme);
  const [studioOpen, setStudioOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [exportStage, setExportStage] = useState<string | null>(null);
  const exportCancelled = useRef(false);

  const style = resolveStyle(design, entry.styles.default);
  const { dark, locked } = useAppliedLook(style, darkPref);
  const search = designToSearch(design);

  useLayoutEffect(() => { applyTheme(theme); }, [theme]);
  useEffect(() => { saveDesign(design); }, [design]);
  // Keep the URL in sync with the design so links are shareable.
  useEffect(() => {
    if (location.search !== search) navigate({ pathname: location.pathname, search }, { replace: true });
  }, [search, location.pathname, location.search, navigate]);
  // Warm the next industry's chunk as soon as it's known.
  useEffect(() => { loadDomain(entry.id).catch(() => { /* surfaced by the view boundary */ }); }, [entry.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen(o => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = useCallback((domain: string, v?: string) => {
    const target = findDomain(domain) ?? CATALOG[0];
    navigate(`/${target.id}/${v && target.views.some(x => x.id === v) ? v : target.views[0].id}${search}`);
  }, [navigate, search]);

  const setTheme = (t: Theme) => { setThemeState(t); saveTheme(t); };

  const doExport = async () => {
    if (exportStage) return;
    exportCancelled.current = false;
    setExportStage("Generating slides…");
    try {
      await exportProject(entry, theme, { ...design, style }, stage => { if (!exportCancelled.current) setExportStage(stage); });
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

  const previewViews = useMemo(() => entry.views.map(v => ({
    id: v.id, label: v.label, icon: icon(v.icon), group: v.group,
    el: <ViewBoundary resetKey={v.id}><Suspense fallback={<ScreenSkeleton />}><DomainView entry={entry} viewId={v.id} /></Suspense></ViewBoundary>,
  })), [entry]);

  const actions = (
    <>
      <button onClick={() => navigate(`/industries${search}`)} className="btn-ghost !p-2" aria-label="Browse all industries" title="Industry library"><LayoutGrid size={16} /></button>
      <button onClick={() => setPreviewOpen(true)} className="btn-ghost !p-2" aria-label={`Preview ${entry.label} app flow`} title="Preview the exported app flow"><Eye size={16} /></button>
      <button onClick={() => setStudioOpen(true)} className="btn-ghost !px-3 !py-2 gap-1.5" aria-label="Open design studio" title="Style, colour and layout">
        <Paintbrush size={15} /><span className="hidden lg:inline text-xs font-semibold">{styleById(style)?.name}</span>
      </button>
      <button onClick={doExport} disabled={!!exportStage} className="btn-ghost !px-3 !py-2 gap-1.5 disabled:opacity-60" aria-label={`Export ${entry.label} as Vite project`} title="Export this industry as a Vite project zip">
        {exportStage ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
        <span className="hidden xl:inline text-xs font-semibold">{exportStage ?? "Export"}</span>
      </button>
      <button onClick={() => setDarkPref(d => !d)} disabled={locked} className="btn-ghost !p-2 disabled:opacity-50"
        aria-label={locked ? `${styleById(style)?.name} is dark-only` : dark ? "Switch to light mode" : "Switch to dark mode"} title={locked ? "This style is dark-only" : undefined}>
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </>
  );

  return (
    <DesignContext.Provider value={design}>
      <StyleBackdrop />
      <AppFrame
        shell={design.shell}
        brand={{ name: entry.productName, sub: `forgeui · ${entry.label.toLowerCase()}`, onClick: () => navigate(`/${search}`) }}
        views={entry.views}
        currentId={view.id}
        onSelect={id => go(entry.id, id)}
        headerLeft={<DomainButton entry={entry} onOpen={() => setPaletteOpen(true)} />}
        headerRight={actions}
        footerNote="Interactive UI prototype. Wire your own APIs behind every action."
      >
        <ViewBoundary resetKey={`${entry.id}/${view.id}`}>
          <Suspense fallback={<ScreenSkeleton />}>
            <DomainView entry={entry} viewId={view.id} />
          </Suspense>
        </ViewBoundary>
      </AppFrame>

      {paletteOpen && (
        <CommandPalette current={entry} onClose={() => setPaletteOpen(false)}
          onIndustry={id => go(id)} onScreen={id => go(entry.id, id)} onStyle={id => setDesignState({ ...design, style: id })} />
      )}

      {studioOpen && (
        <DesignStudio onClose={() => setStudioOpen(false)} design={design} setDesign={setDesignState} theme={theme} setTheme={setTheme}
          industry={{ label: entry.label, default: entry.styles.default, recommended: entry.styles.recommended }} goTo={id => go(entry.id, id)} />
      )}

      {exportStage && exportStage !== "Done ✓" && !exportStage.startsWith("Export failed") && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          <div className="relative card !p-6 w-full max-w-sm shadow-lift animate-fadeUp flex flex-col items-center gap-4">
            <Loader2 size={28} className="animate-spin text-accent" />
            <div className="text-sm font-semibold">{exportStage}</div>
            <button className="btn-ghost text-xs px-4 py-1.5" onClick={() => { exportCancelled.current = true; setExportStage(null); }}>Cancel</button>
          </div>
        </div>
      )}

      {previewOpen && (
        <AppPreview productName={entry.productName} sub={entry.sub} domainId={entry.id} views={previewViews}
          dark={dark} setDark={setDarkPref} onClose={() => setPreviewOpen(false)} />
      )}
    </DesignContext.Provider>
  );
}

function DomainRedirect() {
  const { domainId } = useParams<{ domainId: string }>();
  const { search } = useLocation();
  const d = findDomain(domainId) ?? CATALOG[0];
  return <Navigate to={`/${d.id}/${d.views[0].id}${search}`} replace />;
}

/** Marketing-style routes (About, Versions, Industries) use the Modern style + saved colours. */
function PlainRoute({ children }: { children: (dark: boolean, setDark: React.Dispatch<React.SetStateAction<boolean>>) => ReactNode }) {
  const [darkPref, setDarkPref] = useDarkPreference();
  const { dark } = useAppliedLook("modern", darkPref);
  useEffect(() => { applyTheme(loadTheme()); }, []);
  return <><StyleBackdrop /><main className="p-4 sm:p-6 animate-fadeUp">{children(dark, setDarkPref)}</main></>;
}

export default function App() {
  const navigate = useNavigate();
  const first = CATALOG[0];
  return (
    <Routes>
      <Route path="/" element={
        <PlainRoute>{(dark, setDark) => (
          <About onNavigateToDomain={() => navigate(`/${first.id}/${first.views[0].id}`)} onViewVersions={() => navigate("/versions")}
            onBrowseIndustries={() => navigate("/industries")} dark={dark} setDark={setDark} />
        )}</PlainRoute>
      } />
      <Route path="/versions" element={<PlainRoute>{() => <VersionHistory onBack={() => navigate(-1)} />}</PlainRoute>} />
      <Route path="/industries" element={<PlainRoute>{() => <IndustriesGallery onOpen={id => navigate(`/${id}`)} onBack={() => navigate(-1)} />}</PlainRoute>} />
      <Route path="/:domainId/:viewId" element={<AppShell />} />
      <Route path="/:domainId" element={<DomainRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
