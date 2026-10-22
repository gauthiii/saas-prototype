// src/export/generate.ts — pure text generators for the exported Vite project.
// Kept free of vite-only APIs (import.meta.glob) so they are testable in Node.
import type { Manifest } from "../industries/types";
import { buildViews } from "../industries/views";
import { Theme, hexToRgbTriple, darken } from "../theme";
import type { Design } from "../design/design";
import { googleFontsHref, styleById, type StyleId } from "../design/styles";
import pkg from "../../package.json";

export type ResolvedDesign = Omit<Design, "style"> & { style: StyleId };

/** Bake the currently applied theme into the exported stylesheet defaults. */
export function injectTheme(css: string, theme: Theme): string {
  const replaced = { accent: false, accentDark: false, grad: false };
  const result = css
    .replace(/--accent-rgb:\s*[\d ]+;/, () => { replaced.accent = true; return `--accent-rgb: ${hexToRgbTriple(theme.accent)};`; })
    .replace(/--accent-dark-rgb:\s*[\d ]+;/, () => { replaced.accentDark = true; return `--accent-dark-rgb: ${hexToRgbTriple(darken(theme.accent))};`; })
    .replace(/--grad-rgb:\s*[\d ]+;/, () => { replaced.grad = true; return `--grad-rgb: ${hexToRgbTriple(theme.grad)};`; });
  if (!replaced.accent || !replaced.accentDark || !replaced.grad) {
    console.warn("[ForgeUI export] injectTheme: one or more CSS variable patterns did not match — exported stylesheet may use default theme colors.", replaced);
  }
  return result;
}

export function genAppTsx(m: Manifest, design: ResolvedDesign): string {
  const darkOnly = styleById(design.style)?.mode === "dark";
  return `// src/App.tsx — ${m.productName} (${m.label}) prototype, exported from ForgeUI.
// Design baked in at export: style "${design.style}", ${design.shell} shell. Change DESIGN to switch.
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { AppFrame } from "./shell/AppFrame";
import { StyleBackdrop } from "./design/StyleBackdrop";
import { DesignContext, type Design } from "./design/design";
import { buildViews, ViewContent, type LoadedDomain } from "./industries/views";
import type { AnyIndustryData } from "./industries/types";
import { manifest } from "./industries/${m.id}/manifest";
import data from "./industries/${m.id}/data";
${m.bespoke ? `import * as bespoke from "./domains/${m.bespoke.module}";\n` : ""}
const DESIGN: Design = ${JSON.stringify(design)};
/** ${darkOnly ? "This style is dark-only, so light mode is disabled." : "Light/dark follows the OS on first load."} */
const DARK_ONLY = ${darkOnly};

const VIEWS = buildViews(manifest);
const DOMAIN: LoadedDomain = { manifest, data: data as AnyIndustryData${m.bespoke ? ", module: bespoke" : ""} };

export default function App() {
  const [dark, setDark] = useState(() => DARK_ONLY || (window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false));
  const [viewId, setViewId] = useState(VIEWS[0].id);
  const view = VIEWS.find(v => v.id === viewId) ?? VIEWS[0];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.dataset.style = DESIGN.style as string;
  }, [dark]);

  return (
    <DesignContext.Provider value={DESIGN}>
      <StyleBackdrop />
      <AppFrame
        shell={DESIGN.shell}
        brand={{ name: manifest.productName, sub: ${JSON.stringify(m.sub.toLowerCase())} }}
        views={VIEWS}
        currentId={view.id}
        onSelect={setViewId}
        headerLeft={<div className="font-display font-semibold text-sm truncate">{view.label}</div>}
        headerRight={
          <button onClick={() => setDark(d => !d)} disabled={DARK_ONLY} className="btn-ghost !p-2 disabled:opacity-50" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        }
        footerNote="UI prototype exported from ForgeUI. Wire your own APIs behind every action."
      >
        <ViewContent domain={DOMAIN} view={view} />
      </AppFrame>
    </DesignContext.Provider>
  );
}
`;
}

export const MAIN_TSX = `// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./design/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

/** Exported projects pin the same dependency ranges the builder itself runs on. */
export function genPackageJson(m: Manifest): string {
  const d = pkg.dependencies as Record<string, string>;
  const dev = pkg.devDependencies as Record<string, string>;
  return JSON.stringify({
    name: `${m.productName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-prototype`,
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: { dev: "vite", build: "tsc && vite build", preview: "vite preview" },
    dependencies: { "lucide-react": d["lucide-react"], react: d.react, "react-dom": d["react-dom"] },
    devDependencies: {
      "@types/react": dev["@types/react"], "@types/react-dom": dev["@types/react-dom"], "@vitejs/plugin-react": dev["@vitejs/plugin-react"],
      autoprefixer: dev.autoprefixer, postcss: dev.postcss, tailwindcss: dev.tailwindcss, typescript: dev.typescript, vite: dev.vite,
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

export function genIndexHtml(m: Manifest, design: ResolvedDesign): string {
  const fonts = styleById(design.style)?.fonts ?? [];
  return `<!doctype html>
<html lang="en" data-style="${design.style}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${m.productName} — ${m.label} Prototype</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="${googleFontsHref(fonts)}" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

export function genReadme(m: Manifest, theme: Theme, design: ResolvedDesign): string {
  const groups: Record<string, string[]> = {};
  for (const v of buildViews(m)) (groups[v.group] ??= []).push(v.label);
  const flow = Object.entries(groups).map(([g, vs]) => `- **${g}:** ${vs.join(" → ")}`).join("\n");
  const style = styleById(design.style);

  return `# ${m.productName} — ${m.label} UI Prototype

Exported from **ForgeUI** on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
A complete, runnable Vite + React + TypeScript + Tailwind prototype containing every ${m.label} screen with the navigation flow pre-configured.

## Screen flow

${flow}

## Design

- **Style:** ${style?.name} — ${style?.description}${style?.mode ? ` (${style.mode}-only)` : ""}
- **Shell:** ${design.shell} · **Home hero:** ${design.hero} · **Sign-in:** ${design.signin} · **Pricing:** ${design.pricing}
- **Primary accent:** \`${theme.accent}\` · **Gradient end:** \`${theme.grad}\`

All 16 ForgeUI styles ship in \`src/design/styles.css\`. To switch, change \`DESIGN.style\` in \`src/App.tsx\`
(and the \`data-style\` attribute plus the font link in \`index.html\`). Colours live in the \`--accent-rgb\`,
\`--accent-dark-rgb\` and \`--grad-rgb\` variables at the top of \`src/index.css\` (RGB triples, e.g. \`79 109 245\`).

## Walkthrough deck

\`${m.productName}-walkthrough.pptx\` (next to this README) introduces the prototype, walks through every core app screen, and summarises the shared pages — styled with your theme colours.

## How to run

Requirements: **Node.js 20.19+ or 22.12+** and npm.

\`\`\`bash
npm install     # install dependencies
npm run dev     # start the dev server → http://localhost:5173
npm run build   # type-check + production build into dist/
\`\`\`

## What YOU need to add

This is a **UI prototype** — every screen is interactive but backed by in-memory mock data.

1. **A backend / APIs.** Forms simulate submission (see \`useFakeSubmit\` in \`src/components/ui.tsx\`). Replace with real requests.
2. **Authentication.** Sign in / Create account are visual only. Wire them to your auth provider and add route guards.
3. **Routing.** Navigation is state-based in \`src/App.tsx\`. Add \`react-router-dom\` for real URLs and deep links.
4. **Real data.** Mock content lives in \`src/industries/${m.id}/data.ts\`${m.bespoke ? ` and \`src/domains/${m.bespoke.module}.tsx\`` : ""}. Replace it with data from your backend.
5. **Legal review.** Privacy and compliance pages are realistic placeholders, NOT legal advice.
6. **Analytics, error tracking and tests** as your product requires.

## Project structure

\`\`\`
src/
├── App.tsx                  # baked design + screen flow
├── main.tsx / index.css     # entry + theme tokens
├── design/                  # 16 styles (styles.css), design context, backdrop
├── shell/AppFrame.tsx       # sidebar / top-nav / icon-rail / mobile shells
├── kit/                     # 25 archetype screens + workspace & utility pages
├── components/              # Card, Badge, charts, AI panel
├── domains/                 # shared marketing/account pages${m.bespoke ? ` + ${m.bespoke.module}.tsx` : ""}
└── industries/              # types, view builder, ${m.id}/manifest.ts + data.ts
\`\`\`

---
Generated with ForgeUI template builder.
`;
}
