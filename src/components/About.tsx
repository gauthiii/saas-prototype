import { Github, Linkedin, Mail, Paintbrush, Download, ArrowRight } from "lucide-react";

export function About({ onNavigateToDomain }: { onNavigateToDomain: () => void }) {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="space-y-4 text-center py-8">
        <div className="flex justify-center mb-6">
          <span className="grid place-items-center h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-grad text-white font-display font-bold text-2xl">
            F
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
          ForgeUI
        </h1>
        <p className="text-xl text-[var(--ink-2)] max-w-2xl mx-auto">
          A premium, high-fidelity SaaS UI prototype builder. Create beautiful, production-ready component templates across multiple domains with a single click.
        </p>
      </section>

      {/* About Developer */}
      <section className="card p-8 space-y-4 border border-[var(--line)]">
        <h2 className="text-2xl font-display font-semibold">Developed by</h2>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent to-grad opacity-20" />
          <div>
            <div className="text-lg font-semibold">Gautham Vijayaraj</div>
            <p className="text-sm text-[var(--ink-2)]">Frontend Designer & Engineer</p>
            <div className="flex gap-3 mt-3">
              <a href="#" className="text-accent hover:underline flex items-center gap-1 text-sm">
                <Github size={14} /> GitHub
              </a>
              <a href="#" className="text-accent hover:underline flex items-center gap-1 text-sm">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href="#" className="text-accent hover:underline flex items-center gap-1 text-sm">
                <Mail size={14} /> Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-semibold">Key Features</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "5+ Domain Templates",
              desc: "FinTech, HealthTech, DevOps, HRTech (ATS), and EdTech (LMS) — all fully designed.",
            },
            {
              title: "Light & Dark Mode",
              desc: "Every screen supports both modes with smooth CSS transitions and micro-interactions.",
            },
            {
              title: "Dynamic Theme Studio",
              desc: "Customize primary and gradient colors with live preview. Perfect for branding.",
            },
            {
              title: "One-Click Export",
              desc: "Download your selected template as a ready-to-use Vite project zip file.",
            },
            {
              title: "Production-Ready Code",
              desc: "TypeScript, Tailwind CSS, React hooks, and fully responsive design.",
            },
            {
              title: "AI Insights Panel",
              desc: "Every domain includes context-aware AI suggestions for your workflow.",
            },
          ].map((feature, i) => (
            <div key={i} className="card p-4 border border-[var(--line)] space-y-2">
              <h3 className="font-semibold text-sm">{feature.title}</h3>
              <p className="text-xs text-[var(--ink-2)]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Use Guide */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-semibold">How to Use ForgeUI</h2>

        {/* Step 1: Pick a Domain */}
        <div className="card p-6 border border-[var(--line)] space-y-4">
          <div className="flex items-start gap-3">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent font-semibold text-sm shrink-0 mt-0.5">
              1
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-3">Select a Domain Template</h3>
              <p className="text-sm text-[var(--ink-2)] mb-4">
                Click the domain dropdown in the top-left of the app to browse and select from available templates:
              </p>
              <div className="bg-[var(--surface)] rounded-lg border border-[var(--line)] p-4 space-y-2 overflow-x-auto">
                <div className="text-xs font-mono text-[var(--ink-2)]">🎯 Available Domains:</div>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>
                      <strong>FinTech</strong> — Treasury, invoices, analytics dashboards
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>
                      <strong>HealthTech</strong> — Vitals, EHR, appointments, ER triage
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>
                      <strong>DevOps</strong> — Logs, infra health, metrics, incidents
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>
                      <strong>HRTech (ATS)</strong> — Pipelines, resumes, interviews
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>
                      <strong>EdTech (LMS)</strong> — Curriculum, videos, quizzes, skills
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Customize Theme */}
        <div className="card p-6 border border-[var(--line)] space-y-4">
          <div className="flex items-start gap-3">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent font-semibold text-sm shrink-0 mt-0.5">
              2
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Paintbrush size={18} /> Customize Your Theme
              </h3>
              <p className="text-sm text-[var(--ink-2)] mb-4">
                Click the <strong>paint brush icon</strong> in the top-right to open the Theme Studio. You can:
              </p>
              <div className="space-y-3 mb-4">
                <div className="bg-[var(--surface)] rounded-lg border border-[var(--line)] p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="h-4 w-4 rounded-full bg-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Pick a Primary Accent Color</div>
                      <p className="text-xs text-[var(--ink-2)]">Used for buttons, links, active states, and charts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="h-4 w-4 rounded-full" style={{ background: "var(--grad-rgb)" }} />
                    <div>
                      <div className="text-sm font-medium">Choose a Gradient End Color</div>
                      <p className="text-xs text-[var(--ink-2)]">For logos, hero cards, and visual accents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="h-4 w-4 rounded-full bg-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Apply One of 8 Built-in Presets</div>
                      <p className="text-xs text-[var(--ink-2)]">Electric, Indigo, Midnight, Emerald, Rose, Amber, Sky, Slate</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[var(--ink-2)]">
                See live previews in light and dark modes before committing your choice. All changes apply instantly to the current view.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Export Project */}
        <div className="card p-6 border border-[var(--line)] space-y-4">
          <div className="flex items-start gap-3">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent font-semibold text-sm shrink-0 mt-0.5">
              3
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Download size={18} /> Export as a Vite Project
              </h3>
              <p className="text-sm text-[var(--ink-2)] mb-4">
                Click the <strong>Export project</strong> button in the top-right to download your selected domain template as a complete, production-ready Vite project:
              </p>
              <div className="bg-[var(--surface)] rounded-lg border border-[var(--line)] p-4 space-y-2">
                <div className="text-xs font-mono text-accent mb-3">📦 Your export includes:</div>
                <ul className="space-y-1.5 text-xs">
                  <li>✓ All React components (TypeScript)</li>
                  <li>✓ Tailwind CSS configuration</li>
                  <li>✓ Vite setup with HMR</li>
                  <li>✓ Your custom theme colors baked in</li>
                  <li>✓ Ready to install dependencies and run</li>
                </ul>
              </div>
              <p className="text-xs text-[var(--ink-2)] mt-4">
                <strong>Next steps:</strong> Extract the zip, run <code className="bg-[var(--surface)] px-1.5 py-0.5 rounded text-[10px]">npm install</code> and <code className="bg-[var(--surface)] px-1.5 py-0.5 rounded text-[10px]">npm run dev</code> to start building.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4: Toggle Dark Mode */}
        <div className="card p-6 border border-[var(--line)] space-y-4">
          <div className="flex items-start gap-3">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent font-semibold text-sm shrink-0 mt-0.5">
              4
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-3">Switch Between Light & Dark Modes</h3>
              <p className="text-sm text-[var(--ink-2)]">
                Click the <strong>Sun/Moon icon</strong> in the top-right to toggle between light and dark modes. All screens instantly adapt with smooth transitions. Both modes are fully designed and production-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4 py-8">
        <h2 className="text-2xl font-display font-semibold">Ready to get started?</h2>
        <p className="text-[var(--ink-2)] mb-6">
          Explore a domain template, customize the theme to match your brand, and export a production-ready Vite project.
        </p>
        <button
          onClick={onNavigateToDomain}
          className="btn-primary px-6 py-2.5 gap-2 inline-flex items-center"
        >
          Browse Templates <ArrowRight size={16} />
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-[var(--ink-2)] py-8 border-t border-[var(--line)]">
        <p>ForgeUI © 2024 — Developed by Gautham Vijayaraj</p>
      </footer>
    </div>
  );
}
