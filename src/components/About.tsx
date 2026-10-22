// src/components/About.tsx
import { Dispatch, SetStateAction } from "react";
import {
  Mail, ArrowRight, Paintbrush, Download,
  Landmark, HeartPulse, TerminalSquare, Users, GraduationCap,
  Search, Check, ChevronsUpDown, Sun, Moon, RotateCcw,
  Zap, Layers, Palette, Package, Code2, Sparkles,
  GitBranch, ArrowUpRight, ShoppingCart, Banknote, Leaf, Atom, Factory,
} from "lucide-react";
import { APP_VERSION } from "../version";
import { THEME_PRESETS } from "../theme";
import { CATALOG, PARENTS } from "../industries/catalog";
import { STYLES } from "../design/styles";
import { SCREEN_KINDS } from "../industries/types";

const SUB_COUNT = CATALOG.length - PARENTS.length;
const SCREEN_COUNT = CATALOG.reduce((n, e) => n + e.views.length, 0);

// lucide-react 1.x dropped brand marks, so the LinkedIn glyph is inlined.
function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

interface AboutProps {
  onNavigateToDomain: () => void;
  onViewVersions: () => void;
  onBrowseIndustries: () => void;
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
}

/* ─────────────────────────────────────────────
   Inline UI replica: DomainPicker open state
───────────────────────────────────────────── */
const DOMAIN_ITEMS = [
  { icon: Landmark,        label: "FinTech",          sub: "Treasury · Invoices · Analytics",  active: false },
  { icon: Banknote,        label: "Banking",          sub: "Accounts · Loans · Transfers",     active: false },
  { icon: HeartPulse,      label: "HealthTech",       sub: "EHR · Vitals · Appointments",      active: false },
  { icon: TerminalSquare,  label: "DevOps",           sub: "Logs · Infra · Incidents",         active: false },
  { icon: Users,           label: "HRTech (ATS)",     sub: "Pipelines · Resumes · Interviews", active: false },
  { icon: GraduationCap,   label: "EdTech (LMS)",     sub: "Curriculum · Quizzes · Skills",    active: false },
  { icon: ShoppingCart,    label: "RetailTech",       sub: "POS · Inventory · Orders",         active: false },
  { icon: Zap,             label: "EnergyTech",       sub: "Grid · Usage · Billing",           active: false },
  { icon: Factory,         label: "Energy (Fossil)",  sub: "Wells · Pipelines · Compliance",   active: false },
  { icon: Leaf,            label: "Energy (Renew.)",  sub: "Solar · Wind · Storage",           active: false },
  { icon: Atom,            label: "Energy (Nuclear)", sub: "Reactors · Safety · Output",       active: true  },
];

function DomainPickerMock() {
  return (
    <div className="relative">
      {/* Trigger button */}
      <div className="inline-flex items-center gap-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 shadow-card mb-2">
        <span className="grid place-items-center h-7 w-7 rounded-lg bg-accent/12 text-accent">
          <GraduationCap size={15} />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-sm font-semibold">EdTech (LMS)</span>
          <span className="block text-[10px] text-[var(--ink-2)]">Curriculum · Quizzes · Skills</span>
        </span>
        <ChevronsUpDown size={14} className="text-[var(--ink-2)] ml-4" />
      </div>

      {/* Open dropdown */}
      <div className="w-72 rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-lift overflow-hidden">
        <div className="flex items-center gap-2 border-b border-[var(--line)] px-3 py-2.5">
          <Search size={14} className="text-[var(--ink-2)]" />
          <span className="text-sm text-[var(--ink-2)]">Search domain templates…</span>
        </div>
        <ul className="p-1.5 space-y-0.5">
          {DOMAIN_ITEMS.map(({ icon: Icon, label, sub, active }) => (
            <li key={label}>
              <div className={`flex items-center gap-3 rounded-xl px-2.5 py-2 ${active ? "bg-accent/8" : "hover:bg-accent/4"}`}>
                <span className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent shrink-0">
                  <Icon size={16} />
                </span>
                <span className="flex-1 leading-tight min-w-0">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="block text-[11px] text-[var(--ink-2)] truncate">{sub}</span>
                </span>
                {active && <Check size={15} className="text-accent shrink-0" />}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Inline UI replica: ThemeStudio panel
───────────────────────────────────────────── */
const PRESETS = THEME_PRESETS.map(p => ({ name: p.name, accent: p.theme.accent, grad: p.theme.grad }));

function MacWindowMock({ dark }: { dark: boolean }) {
  const c = dark
    ? { bg: "#0a0c10", surface: "#0f1218", line: "#232938", ink2: "#8b93a5" }
    : { bg: "#f7f8fa", surface: "#ffffff", line: "#e6e8ee", ink2: "#8b93a5" };
  const accent = THEME_PRESETS[0].theme.accent;
  const grad = THEME_PRESETS[0].theme.grad;
  return (
    <div className="flex-1 rounded-xl overflow-hidden border shadow-card" style={{ borderColor: c.line }}>
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: c.surface, borderBottom: `1px solid ${c.line}` }}>
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[8px] font-mono" style={{ color: c.ink2 }}>{dark ? "preview — dark" : "preview — light"}</span>
      </div>
      <div className="flex" style={{ background: c.bg, height: 100 }}>
        <div className="w-[28%] p-2 space-y-1.5" style={{ background: c.surface, borderRight: `1px solid ${c.line}` }}>
          <div className="h-3 w-3 rounded-md" style={{ background: `linear-gradient(135deg, ${accent}, ${grad})` }} />
          <div className="h-2 rounded" style={{ background: accent }} />
          <div className="h-2 rounded" style={{ background: c.line }} />
          <div className="h-2 rounded" style={{ background: c.line }} />
        </div>
        <div className="flex-1 p-2 space-y-1.5">
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex-1 rounded-lg p-1" style={{ background: c.surface, border: `1px solid ${c.line}` }}>
                <div className="h-1 w-3/5 rounded" style={{ background: c.ink2, opacity: 0.4 }} />
                <div className="h-2 w-2/5 rounded mt-1" style={{ background: accent, opacity: 0.2 }} />
              </div>
            ))}
          </div>
          <div className="rounded-lg p-1.5" style={{ background: c.surface, border: `1px solid ${c.line}` }}>
            <div className="flex items-end gap-0.5 h-7">
              {[35, 55, 40, 70, 50, 85, 60, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 3 === 2 ? grad : accent, opacity: 0.85 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeStudioMock() {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-lift overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent">
            <Paintbrush size={16} />
          </span>
          <div className="leading-tight">
            <div className="font-display font-semibold text-sm">Design studio · Colour</div>
            <div className="text-[10px] text-[var(--ink-2)]">Changes apply to live preview and exported projects</div>
          </div>
        </div>
        <div className="grid place-items-center h-7 w-7 rounded-lg border border-[var(--line)] text-[var(--ink-2)]">
          <span className="text-xs">✕</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Color pickers */}
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "Primary accent", desc: "Buttons, links, active nav, charts", hex: "#6366f1", color: "#6366f1" },
            { label: "Gradient end",   desc: "Logo marks, hero cards, avatars",   hex: "#a78bfa", color: "#a78bfa" },
          ].map(({ label, desc, hex, color }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-[var(--line)] p-3">
              <div className="h-10 w-10 rounded-lg border border-[var(--line)] shrink-0" style={{ background: color }} />
              <div className="min-w-0">
                <div className="text-sm font-medium">{label}</div>
                <div className="text-[10px] text-[var(--ink-2)] truncate">{desc}</div>
                <div className="text-[10px] font-mono text-[var(--ink-2)] mt-0.5 uppercase">{hex}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Presets */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-2)] mb-2">Presets</div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <div key={p.name} className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs ${p.name === "Electric" ? "border-accent bg-accent/8 text-accent font-semibold" : "border-[var(--line)] text-[var(--ink-2)]"}`}>
                <span className="h-3 w-3 rounded-full shrink-0" style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.grad})` }} />
                {p.name}
              </div>
            ))}
          </div>
        </div>

        {/* Mac windows */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-2)] mb-2">Live preview</div>
          <div className="flex gap-3">
            <MacWindowMock dark={false} />
            <MacWindowMock dark={true} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 px-5 py-3 border-t border-[var(--line)]">
        <div className="rounded-lg bg-accent px-4 py-1.5 text-xs font-semibold text-white">Apply theme</div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-[var(--ink-2)]">
          <RotateCcw size={12} /> Reset to default
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Topbar strip mock
───────────────────────────────────────────── */
function TopbarMock({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--line)]">
        <div className="flex items-center gap-2 text-xs text-[var(--ink-2)]">
          <span className="font-mono">Generated template ·</span>
          <span className="font-mono text-accent">fintech/overview</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-[var(--ink-2)]">
            <Paintbrush size={13} />
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-[var(--ink-2)]">
            <Download size={13} />
            <span className="text-xs font-semibold hidden sm:inline">Export project</span>
          </div>
          <button 
            onClick={onToggle}
            className="flex items-center gap-1 rounded-lg border border-accent/30 bg-accent/8 px-2.5 py-1.5 text-accent hover:bg-accent/16 transition-all"
          >
            {dark ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Feature cards data
───────────────────────────────────────────── */
const FEATURES = [
  { icon: Layers,    title: `${PARENTS.length} industries · ${SUB_COUNT} sub-categories`, desc: `From FinTech and Health to Logistics, Legal, Telecom and Crypto — ${SCREEN_COUNT.toLocaleString("en-US")} screens, each industry with 12+ app screens plus 21 shared pages.` },
  { icon: Palette,   title: `${STYLES.length} design styles`, desc: "Glassmorphism, Liquid Glass, Neumorphism, Aurora, Neo-Brutalism, Bento, Clinical, Pro Dark and more — each industry opens in the style that suits it." },
  { icon: GitBranch, title: "Shells & page variants", desc: "Sidebar, top-nav, icon-rail or mobile-app shell, plus 3 layouts each for the home hero, sign-in and pricing pages." },
  { icon: Code2,     title: `${SCREEN_KINDS.length} screen archetypes`, desc: "Dashboards, kanban, maps, calendars, trackers, heatmaps, scorecards, booking flows… typed, accessible and data-driven." },
  { icon: Zap,       title: "Light & Dark Mode",     desc: "Every screen adapts with smooth CSS transitions. Both modes are production-ready." },
  { icon: Package,   title: "One-Click Export",      desc: "Download your selected domain as a complete, ready-to-run Vite + TypeScript project zip." },
  { icon: Code2,     title: "Production-Ready Code", desc: "TypeScript, Tailwind CSS, React hooks, responsive layouts — no cleanup required." },
  { icon: Sparkles,  title: "AI Insights Panel",     desc: "Contextual AI suggestions tailored to each domain's workflow and business logic." },
];

/* ─────────────────────────────────────────────
   Main About component
───────────────────────────────────────────── */
export function About({ onNavigateToDomain, onViewVersions, onBrowseIndustries, dark, setDark }: AboutProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-24 pb-24">

      {/* ── Hero ─────────────────────────────── */}
      <section className="pt-16 pb-4 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-xs font-semibold text-accent mb-2">
          <Sparkles size={12} /> Premium UI Prototype Builder
        </div>
        
        {/* Added Title string here */}
        <div className="font-display text-base tracking-wider font-bold text-[var(--ink-2)] uppercase opacity-85">
          ForgeUI: Template Builder
        </div>

        <h1 className="text-5xl sm:text-6xl font-display font-bold tracking-tight leading-[1.08] mt-2">
          Build stunning{" "}
          <span className="bg-gradient-to-r from-accent to-grad bg-clip-text text-transparent">
            SaaS interfaces
          </span>
          <br />in seconds.
        </h1>
        <p className="text-lg text-[var(--ink-2)] max-w-xl mx-auto leading-relaxed">
          ForgeUI generates high-fidelity, production-ready UI prototypes for {PARENTS.length} industries and {SUB_COUNT} sub-categories, in {STYLES.length} design styles — with one-click Vite export.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onNavigateToDomain}
            className="btn-primary px-6 py-2.5 gap-2 inline-flex items-center text-sm font-semibold"
          >
            Open the builder <ArrowRight size={15} />
          </button>
          <button onClick={onBrowseIndustries} className="btn-ghost px-5 py-2.5 gap-2 inline-flex items-center text-sm">
            <Layers size={15} /> Industry library
          </button>
          <a href="https://github.com/gauthiii" target="_blank" rel="noreferrer"
            className="btn-ghost px-5 py-2.5 gap-2 inline-flex items-center text-sm">
            GitHub
          </a>
          <button
            onClick={() => setDark(d => !d)}
            className="btn-ghost px-4 py-2.5 rounded-xl border border-[var(--line)] text-[var(--ink)] hover:bg-accent/8 transition-all inline-flex items-center justify-center gap-2 text-sm font-medium"
            title="Toggle light/dark mode"
          >
            {dark ? <Sun size={15} className="text-amber-500" /> : <Moon size={15} />}
            <span>Theme</span>
          </button>
        </div>
      </section>

      {/* ── Features grid ────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="eyebrow">What's inside</div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Everything you need</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-5 border border-[var(--line)] space-y-3 card-hover group">
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-200">
                <Icon size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Design styles ────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="eyebrow">Design languages</div>
          <h2 className="text-3xl font-display font-bold tracking-tight">{STYLES.length} styles, one click apart</h2>
          <p className="text-sm text-[var(--ink-2)] max-w-xl mx-auto">Every style restyles every screen — surfaces, radii, type, depth and backdrop — and meets WCAG AA text contrast in light and dark.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STYLES.map(st => (
            <div key={st.id} className="rounded-xl border border-[var(--line)] p-2.5 bg-[var(--surface)]">
              <div className="relative h-14 rounded-lg overflow-hidden" style={{ background: st.swatch[0] }} aria-hidden="true">
                <div className="absolute left-2 top-2 right-6 h-4 rounded" style={{ background: st.swatch[1], boxShadow: "0 1px 4px rgba(0,0,0,.12)" }} />
                <div className="absolute left-2 bottom-2 h-3 w-10 rounded" style={{ background: st.swatch[2] }} />
              </div>
              <div className="mt-2 text-xs font-semibold">{st.name}</div>
              <div className="text-[10px] text-[var(--ink-2)]">{st.set === "Industry" ? "Industry-specialist" : st.set}{st.mode ? ` · ${st.mode} only` : ""}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How to Use ───────────────────────── */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <div className="eyebrow">Quick start</div>
          <h2 className="text-3xl font-display font-bold tracking-tight">How to use ForgeUI</h2>
        </div>

        {/* Step 1 */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 lg:pt-6">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-9 w-9 rounded-xl bg-accent text-white font-display font-bold text-sm shrink-0">
                1
              </div>
              <h3 className="text-xl font-display font-semibold">Pick an industry</h3>
            </div>
            <p className="text-[var(--ink-2)] text-sm leading-relaxed">
              Press <strong className="text-[var(--ink)]">⌘K</strong> (or click the industry picker) to open the command palette and fuzzy-search all {CATALOG.length} industries and sub-categories, any screen, or any style. The <strong className="text-[var(--ink)]">Industry library</strong> shows them all as cards. The original hand-crafted templates include:
            </p>
            <ul className="space-y-2 text-sm text-[var(--ink-2)]">
              {DOMAIN_ITEMS.map(({ icon: Icon, label, sub }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <span className="grid place-items-center h-6 w-6 rounded-md bg-accent/10 text-accent shrink-0"><Icon size={12} /></span>
                  <span><strong className="text-[var(--ink)]">{label}</strong> — {sub}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Visual replica */}
          <div className="space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-2)] mb-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-[var(--line)]" /> Live UI reference <span className="h-px flex-1 bg-[var(--line)]" />
            </div>
            <DomainPickerMock />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--line)]" />

        {/* Step 2 */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 lg:pt-4">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-9 w-9 rounded-xl bg-accent text-white font-display font-bold text-sm shrink-0">
                2
              </div>
              <h3 className="text-xl font-display font-semibold">Customize your theme</h3>
            </div>
            <p className="text-[var(--ink-2)] text-sm leading-relaxed">
              Click the <strong className="text-[var(--ink)]"><Paintbrush size={13} className="inline -mt-0.5" /> paintbrush icon</strong> in the top-right to open the Design Studio. The Style tab switches between {STYLES.length} design languages (with picks recommended for the current industry), the Colour tab sets accent and gradient from 8 presets or any hex, and the Layout tab swaps the app shell and page variants. Everything applies live and is saved in the URL.
            </p>
            <div className="space-y-2 text-sm">
              {[
                { label: "Primary accent", desc: "Buttons, active nav, charts, links" },
                { label: "Gradient end",   desc: "Logo marks, hero cards, avatars" },
                { label: "8 presets",      desc: "Electric, Indigo, Midnight, Emerald, Rose…" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  <span className="text-[var(--ink-2)]"><strong className="text-[var(--ink)]">{label}</strong> — {desc}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Visual replica */}
          <div className="space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-2)] mb-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-[var(--line)]" /> Live UI reference <span className="h-px flex-1 bg-[var(--line)]" />
            </div>
            <ThemeStudioMock />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--line)]" />

        {/* Step 3 */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 lg:pt-4">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-9 w-9 rounded-xl bg-accent text-white font-display font-bold text-sm shrink-0">
                3
              </div>
              <h3 className="text-xl font-display font-semibold">Toggle light & dark mode</h3>
            </div>
            <p className="text-[var(--ink-2)] text-sm leading-relaxed">
              Click the <strong className="text-[var(--ink)]"><Sun size={13} className="inline -mt-0.5" /> / <Moon size={13} className="inline -mt-0.5" /> icon</strong> in the top-right corner at any time. Every screen adapts with smooth transitions. Both modes are fully designed and production-ready.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setDark(d => !d)}
                className="btn-primary !bg-gradient-to-r from-accent to-grad text-xs px-4 py-2 rounded-xl flex items-center gap-2 font-semibold shadow-md active:scale-95 transition-transform"
              >
                {dark ? <Sun size={14} /> : <Moon size={14} />}
                Test Toggle Theme Live
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-2)] mb-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-[var(--line)]" /> Live UI reference (Click moon/sun) <span className="h-px flex-1 bg-[var(--line)]" />
            </div>
            <TopbarMock dark={dark} onToggle={() => setDark(d => !d)} />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--line)]" />

        {/* Step 4 */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 lg:pt-4">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-9 w-9 rounded-xl bg-accent text-white font-display font-bold text-sm shrink-0">
                4
              </div>
              <h3 className="text-xl font-display font-semibold">Export as a Vite project</h3>
            </div>
            <p className="text-[var(--ink-2)] text-sm leading-relaxed">
              Click <strong className="text-[var(--ink)]"><Download size={13} className="inline -mt-0.5" /> Export project</strong> in the top-right. Your entire selected domain — with your custom theme baked in — downloads as a complete, ready-to-run Vite + TypeScript zip.
            </p>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-3">Your export includes</div>
              {[
                "All React components (TypeScript)",
                "Tailwind CSS configuration",
                "Vite setup with HMR",
                "Your custom theme colors baked in",
                "Ready to install deps and run",
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-[var(--ink-2)]">
                  <Check size={12} className="text-emerald-500 shrink-0" /> {item}
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--ink-2)]">
              Run <code className="bg-[var(--surface)] border border-[var(--line)] px-1.5 py-0.5 rounded text-[10px] font-mono">npm install</code> then <code className="bg-[var(--surface)] border border-[var(--line)] px-1.5 py-0.5 rounded text-[10px] font-mono">npm run dev</code> to launch.
            </p>
          </div>
          {/* Visual: export button mockup */}
          <div className="space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-2)] mb-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-[var(--line)]" /> Live UI reference <span className="h-px flex-1 bg-[var(--line)]" />
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 space-y-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-10 w-10 rounded-xl bg-accent/10 text-accent">
                  <Package size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm">Export project</div>
                  <div className="text-[11px] text-[var(--ink-2)]">EdTech (LMS) · Electric theme</div>
                </div>
              </div>
              <div className="space-y-2">
                {["edtech-lms/", "src/components/", "src/domains/edtech.tsx", "tailwind.config.ts", "package.json"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs font-mono text-[var(--ink-2)]">
                    <span className="text-accent">▸</span> {f}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/6 px-3 py-2">
                <Download size={14} className="text-accent" />
                <span className="text-xs font-semibold text-accent">edtech-lms-export.zip</span>
                <span className="ml-auto text-[10px] text-[var(--ink-2)]">~2.4 MB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Developer ────────────────────────── */}
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 space-y-5">
        <div className="eyebrow">Built by</div>
        <div className="flex items-start gap-5">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-grad shrink-0 grid place-items-center text-white font-display font-bold text-xl">
            G
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="text-lg font-display font-semibold">Gautham Vijayaraj</div>
            <p className="text-sm text-[var(--ink-2)]">
              Frontend Designer & Engineer passionate about high-fidelity design systems, developer tooling, and elegant product UX.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://github.com/gauthiii" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--ink-2)] hover:text-accent transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/gauthiii" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--ink-2)] hover:text-accent transition-colors">
                <LinkedinIcon size={14} /> LinkedIn
              </a>
              <a href="mailto:gauvij.99@gmail.com"
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--ink-2)] hover:text-accent transition-colors">
                <Mail size={14} /> Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="text-center space-y-5 rounded-2xl border border-[var(--line)] p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/6 via-transparent to-grad/6 pointer-events-none" />
        <div className="relative space-y-3">
          <h2 className="text-3xl font-display font-bold tracking-tight">Ready to build?</h2>
          <p className="text-[var(--ink-2)] max-w-sm mx-auto text-sm leading-relaxed">
            Pick a domain, customize the theme, and export a production-ready Vite project in under a minute.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToDomain}
              className="btn-primary px-8 py-3 gap-2 inline-flex items-center text-sm font-semibold"
            >
              Browse Templates <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Version ──────────────────────────── */}
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-accent/12 text-accent grid place-items-center shrink-0">
            <GitBranch size={18} />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">ForgeUI</span>
              <span className="font-mono text-xs font-semibold text-accent">v{APP_VERSION}</span>
            </div>
            <p className="text-xs text-[var(--ink-2)]">See what changed in every release.</p>
          </div>
        </div>
        <button
          onClick={onViewVersions}
          className="btn-ghost !px-4 !py-2 gap-1.5 text-sm font-semibold"
        >
          View version history <ArrowUpRight size={15} />
        </button>
      </section>

      {/* ── Footer ───────────────────────────── */}
      <footer className="text-center text-xs text-[var(--ink-2)] py-4 border-t border-[var(--line)]">
        ForgeUI © {new Date().getFullYear()} · Developed by Gautham Vijayaraj
      </footer>
    </div>
  );
}