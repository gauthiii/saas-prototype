import {
  Linkedin, Mail, ArrowRight, Paintbrush, Download,
  Landmark, HeartPulse, TerminalSquare, Users, GraduationCap,
  Search, Check, ChevronsUpDown, Sun, Moon, RotateCcw,
  Zap, Layers, Palette, Package, Code2, Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Inline UI replica: DomainPicker open state
───────────────────────────────────────────── */
const DOMAIN_ITEMS = [
  { icon: Landmark,        label: "FinTech",      sub: "Treasury · Invoices · Analytics",  active: false },
  { icon: HeartPulse,      label: "HealthTech",   sub: "EHR · Vitals · Appointments",      active: false },
  { icon: TerminalSquare,  label: "DevOps",       sub: "Logs · Infra · Incidents",         active: false },
  { icon: Users,           label: "HRTech (ATS)", sub: "Pipelines · Resumes · Interviews", active: false },
  { icon: GraduationCap,   label: "EdTech (LMS)", sub: "Curriculum · Quizzes · Skills",   active: true  },
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
const PRESETS = [
  { name: "Electric", accent: "#6366f1", grad: "#a78bfa" },
  { name: "Indigo",   accent: "#4f46e5", grad: "#7c3aed" },
  { name: "Midnight", accent: "#0ea5e9", grad: "#6366f1" },
  { name: "Emerald",  accent: "#10b981", grad: "#06b6d4" },
  { name: "Rose",     accent: "#f43f5e", grad: "#fb923c" },
  { name: "Amber",    accent: "#f59e0b", grad: "#ef4444" },
  { name: "Sky",      accent: "#38bdf8", grad: "#818cf8" },
  { name: "Slate",    accent: "#64748b", grad: "#94a3b8" },
];

function MacWindowMock({ dark }: { dark: boolean }) {
  const c = dark
    ? { bg: "#0a0c10", surface: "#0f1218", line: "#232938", ink2: "#8b93a5" }
    : { bg: "#f7f8fa", surface: "#ffffff", line: "#e6e8ee", ink2: "#8b93a5" };
  const accent = "#6366f1";
  const grad = "#a78bfa";
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
            <div className="font-display font-semibold text-sm">Theme studio</div>
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
   Topbar strip mock (for dark/light toggle)
───────────────────────────────────────────── */
function TopbarMock() {
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
          <div className="flex items-center gap-1 rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-[var(--ink-2)]">
            <Moon size={13} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Feature cards data
───────────────────────────────────────────── */
const FEATURES = [
  { icon: Layers,    title: "5+ Domain Templates",   desc: "FinTech, HealthTech, DevOps, HRTech, and EdTech — each fully designed with 10+ screens." },
  { icon: Palette,   title: "Dynamic Theme Studio",  desc: "Pick any accent and gradient color with live Mac-window previews in both light and dark." },
  { icon: Zap,       title: "Light & Dark Mode",     desc: "Every screen adapts with smooth CSS transitions. Both modes are production-ready." },
  { icon: Package,   title: "One-Click Export",      desc: "Download your selected domain as a complete, ready-to-run Vite + TypeScript project zip." },
  { icon: Code2,     title: "Production-Ready Code", desc: "TypeScript, Tailwind CSS, React hooks, responsive layouts — no cleanup required." },
  { icon: Sparkles,  title: "AI Insights Panel",     desc: "Contextual AI suggestions tailored to each domain's workflow and business logic." },
];

/* ─────────────────────────────────────────────
   Main About component
───────────────────────────────────────────── */
export function About({ onNavigateToDomain }: { onNavigateToDomain: () => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-24 pb-24">

      {/* ── Hero ─────────────────────────────── */}
      <section className="pt-16 pb-4 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-xs font-semibold text-accent mb-2">
          <Sparkles size={12} /> Premium UI Prototype Builder
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-bold tracking-tight leading-[1.08]">
          Build stunning{" "}
          <span className="bg-gradient-to-r from-accent to-grad bg-clip-text text-transparent">
            SaaS interfaces
          </span>
          <br />in seconds.
        </h1>
        <p className="text-lg text-[var(--ink-2)] max-w-xl mx-auto leading-relaxed">
          ForgeUI generates high-fidelity, production-ready UI templates across five enterprise domains — with theme customization and one-click export.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onNavigateToDomain}
            className="btn-primary px-6 py-2.5 gap-2 inline-flex items-center text-sm font-semibold"
          >
            Browse Templates <ArrowRight size={15} />
          </button>
          <a href="https://github.com/gauthiii" target="_blank" rel="noreferrer"
            className="btn-ghost px-5 py-2.5 gap-2 inline-flex items-center text-sm">
            GitHub
          </a>
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
              <h3 className="text-xl font-display font-semibold">Select a domain template</h3>
            </div>
            <p className="text-[var(--ink-2)] text-sm leading-relaxed">
              Click the <strong className="text-[var(--ink)]">domain picker</strong> in the top-left corner of the app. A searchable dropdown opens showing all five enterprise templates. Click any domain to instantly load its full screen set.
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
              Click the <strong className="text-[var(--ink)]"><Paintbrush size={13} className="inline -mt-0.5" /> paintbrush icon</strong> in the top-right to open the Theme Studio. Choose custom accent and gradient colors, or pick from 8 curated presets. All changes apply live.
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
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-2)] mb-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-[var(--line)]" /> Live UI reference <span className="h-px flex-1 bg-[var(--line)]" />
            </div>
            <TopbarMock />
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
                <Linkedin size={14} /> LinkedIn
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

      {/* ── Footer ───────────────────────────── */}
      <footer className="text-center text-xs text-[var(--ink-2)] py-4 border-t border-[var(--line)]">
        ForgeUI © 2025 · Developed by Gautham Vijayaraj
      </footer>
    </div>
  );
}
