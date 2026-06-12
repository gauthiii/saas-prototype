// src/export/generate.ts — pure text generators for the exported Vite project.
// Kept free of vite-only APIs (import.meta.glob) so they are testable in Node.
import { DomainDef } from "./registry";
import { Theme, hexToRgbTriple, darken } from "../theme";

/** Bake the currently applied theme into the exported stylesheet defaults. */
export function injectTheme(css: string, theme: Theme): string {
  return css
    .replace(/--accent-rgb:\s*[\d ]+;/, `--accent-rgb: ${hexToRgbTriple(theme.accent)};`)
    .replace(/--accent-dark-rgb:\s*[\d ]+;/, `--accent-dark-rgb: ${hexToRgbTriple(darken(theme.accent))};`)
    .replace(/--grad-rgb:\s*[\d ]+;/, `--grad-rgb: ${hexToRgbTriple(theme.grad)};`);
}

export function genAppTsx(domain: DomainDef): string {
  const icons = Array.from(new Set(["Sun", "Moon", ...domain.views.map(v => v.icon)])).sort();
  const comps = Array.from(new Set(domain.views.map(v => v.comp))).sort();
  const viewLines = domain.views.map(v => {
    const el = v.wrap ? `<div className="${v.wrap}"><${v.comp} /></div>` : `<${v.comp} />`;
    return `  { id: "${v.id}", label: ${JSON.stringify(v.label)}, icon: ${v.icon}, el: ${el}, group: "${v.group}" },`;
  }).join("\n");

  return `// src/App.tsx — ${domain.productName} (${domain.label}) screens, exported from ForgeUI
import { useEffect, useMemo, useState } from "react";
import {
  ${icons.join(", ")},
} from "lucide-react";
import {
  ${comps.join(", ")},
} from "./domains/${domain.file}";

type View = { id: string; label: string; icon: typeof Sun; el: JSX.Element; group: string };

const VIEWS: View[] = [
${viewLines}
];

export default function App() {
  const [dark, setDark] = useState(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);
  const [viewId, setViewId] = useState(VIEWS[0].id);
  const view = VIEWS.find(v => v.id === viewId) ?? VIEWS[0];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const groups = useMemo(() => {
    const map: Record<string, View[]> = {};
    for (const v of VIEWS) (map[v.group] ??= []).push(v);
    return map;
  }, []);

  return (
    <div className="min-h-full flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col surface border-r min-h-screen sticky top-0">
        <div className="px-5 py-5 flex items-center gap-2.5 border-b border-[var(--line)]">
          <span className="grid place-items-center h-8 w-8 rounded-xl bg-gradient-to-br from-accent to-grad text-white font-display font-bold text-sm">${domain.productName[0]}</span>
          <div className="leading-tight">
            <div className="font-display font-bold tracking-tight">${domain.productName}</div>
            <div className="text-[10px] ink-2 font-mono">${domain.sub.toLowerCase()}</div>
          </div>
        </div>
        <nav className="p-3 space-y-3 flex-1 overflow-y-auto" aria-label="Screens">
          {Object.entries(groups).map(([group, views]) => (
            <div key={group}>
              <div className="eyebrow px-2.5 pt-1 pb-1.5">{group}</div>
              <div className="space-y-0.5">
                {views.map(v => (
                  <button key={v.id} onClick={() => setViewId(v.id)}
                    className={\`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-150
                      \${v.id === view.id ? "bg-accent text-white shadow-card" : "ink-2 hover:bg-accent/8 hover:text-[var(--ink)]"}\`}>
                    <v.icon size={15} /> {v.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-[var(--line)] text-[11px] ink-2 leading-relaxed">
          UI prototype exported from ForgeUI. Wire your own APIs behind every action.
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 surface border-b backdrop-blur px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="font-display font-semibold text-sm">{view.label}</div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-xs ink-2 font-mono">${domain.id}/{view.id}</span>
            <button onClick={() => setDark(d => !d)} className="btn-ghost !p-2" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        <div className="md:hidden flex gap-2 overflow-x-auto px-4 pt-3 pb-1">
          {VIEWS.map(v => (
            <button key={v.id} onClick={() => setViewId(v.id)}
              className={\`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors \${v.id === view.id ? "bg-accent text-white border-accent" : "surface ink-2"}\`}>
              {v.label}
            </button>
          ))}
        </div>

        <main key={view.id} className="p-4 sm:p-6 animate-fadeUp">
          {view.el}
        </main>
      </div>
    </div>
  );
}
`;
}

export function genPackageJson(domain: DomainDef): string {
  return JSON.stringify({
    name: `${domain.productName.toLowerCase()}-prototype`,
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: { dev: "vite", build: "tsc && vite build", preview: "vite preview" },
    dependencies: { "lucide-react": "^0.383.0", react: "^18.3.1", "react-dom": "^18.3.1" },
    devDependencies: {
      "@types/react": "^18.3.3", "@types/react-dom": "^18.3.0",
      "@vitejs/plugin-react": "^4.3.1", autoprefixer: "^10.4.19", postcss: "^8.4.38",
      tailwindcss: "^3.4.4", typescript: "^5.4.5", vite: "^5.3.1",
    },
  }, null, 2) + "\n";
}

export const VITE_CONFIG = `// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`;

export function genIndexHtml(domain: DomainDef): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${domain.productName} — ${domain.label} Prototype</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

export function genReadme(domain: DomainDef, theme: Theme): string {
  const groups: Record<string, string[]> = {};
  for (const v of domain.views) (groups[v.group] ??= []).push(v.label);
  const flow = Object.entries(groups)
    .map(([g, vs]) => `- **${g}:** ${vs.join(" → ")}`)
    .join("\n");

  return `# ${domain.productName} — ${domain.label} UI Prototype

Exported from **ForgeUI** on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
A complete, runnable Vite + React + TypeScript + Tailwind prototype containing every ${domain.label} screen with the navigation flow pre-configured.

## Screen flow

${flow}

Navigation lives in the left sidebar (mobile: horizontal tabs). The flow runs top-to-bottom: public/marketing pages first, then the core app screens, then account and resource pages.

## Theme

This export was generated with your chosen theme baked in:

- Primary accent: \`${theme.accent}\`
- Gradient end: \`${theme.grad}\`

To change it later, edit the \`--accent-rgb\`, \`--accent-dark-rgb\`, and \`--grad-rgb\` CSS variables at the top of \`src/index.css\` (they are RGB triples, e.g. \`79 109 245\`). Light/dark mode is toggled via the sun/moon button and follows your OS preference on first load.

## How to run

Requirements: **Node.js 18+** (20+ recommended) and npm.

\`\`\`bash
npm install     # install dependencies
npm run dev     # start the dev server → http://localhost:5173
\`\`\`

Other scripts:

\`\`\`bash
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
\`\`\`

## What YOU need to add

This is a **UI prototype** — every screen is fully interactive but backed by in-memory mock data. To turn it into a real product you need to provide:

1. **A backend / APIs.** All forms simulate submission with timeouts (see \`useFakeSubmit\` in \`src/components/ui.tsx\`). Replace those with real \`fetch\`/axios calls to your API.
2. **Authentication.** The Sign in / Create account screens are visual only. Wire them to your auth provider (Auth0, Clerk, Supabase, Cognito, custom JWT…) and add route guards.
3. **Routing.** Navigation is state-based (\`useState\` in \`src/App.tsx\`). For real URLs, deep-linking, and a working 404 route, add \`react-router-dom\` and map each view's \`id\` to a route.
4. **Real data.** Mock records (transactions, patients, candidates, …) are declared at the top of \`src/domains/${domain.file}.tsx\`. Replace them with data fetched from your backend, and consider a data layer like TanStack Query.
5. **Persistence for settings/profile.** Profile, settings, and notification toggles only mutate local state.
6. **Legal review.** The Privacy Policy and compliance pages are realistic placeholders, NOT legal advice — have counsel review them before publishing.
7. **Analytics, error tracking, and tests** as your product requires.

## Project structure

\`\`\`
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js / postcss.config.js
├── tsconfig.json / tsconfig.node.json
└── src/
    ├── main.tsx            # entry point
    ├── App.tsx             # shell, sidebar, screen flow
    ├── index.css           # Tailwind layers + theme CSS variables
    ├── components/         # shared UI primitives (Card, Badge, charts, …)
    └── domains/
        ├── pages.tsx       # shared templates (home, auth, profile, …)
        ├── pages-extra.tsx # about, privacy, pricing, notifications, …
        └── ${domain.file}.tsx      # ${domain.productName} screens + mock data
\`\`\`

---
Generated with ForgeUI template builder.
`;
}

