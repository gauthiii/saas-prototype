// src/export/exportProject.ts — assembles a runnable single-industry Vite project zip,
// entirely client-side. Source files are embedded as raw strings at build time and only
// fetched (as separate chunks) when an export starts.
import JSZip from "jszip";
import type { Theme } from "../theme";
import type { Manifest } from "../industries/types";
import { loadDomain } from "../industries/catalog";
import { buildViews } from "../industries/views";
import { injectTheme, genAppTsx, genPackageJson, genReadme, genIndexHtml, VITE_CONFIG, MAIN_TSX, type ResolvedDesign } from "./generate";
import { resolveStory } from "./story";

// Raw source embeds. Keys are root-relative paths.
const RAW_FILES = import.meta.glob(
  [
    "/src/components/{ui,charts,AIPanel}.tsx",
    "/src/kit/*.tsx",
    "/src/design/{design.tsx,styles.ts,styles.css,StyleBackdrop.tsx}",
    "/src/shell/AppFrame.tsx",
    "/src/lib/iconMap.ts",
    "/src/industries/{types.ts,views.tsx}",
    "/src/industries/*/{manifest,data}.ts",
    "/src/domains/*.tsx",
    "/src/index.css",
    "/src/vite-env.d.ts",
    "/tailwind.config.js",
    "/postcss.config.js",
    "/tsconfig.json",
    "/tsconfig.node.json",
  ],
  { query: "?raw", import: "default" }
) as Record<string, () => Promise<string>>;

async function raw(path: string): Promise<string> {
  const loader = RAW_FILES[path];
  if (!loader) throw new Error(`Export: missing embedded source for ${path}`);
  return loader();
}

/** Files shared by every export, copied verbatim (path in project = path in this repo). */
const COMMON = [
  "src/components/ui.tsx", "src/components/charts.tsx", "src/components/AIPanel.tsx",
  "src/kit/index.tsx", "src/kit/primitives.tsx", "src/kit/workspace.tsx",
  "src/kit/archetypes-data.tsx", "src/kit/archetypes-ops.tsx", "src/kit/archetypes-flow.tsx", "src/kit/archetypes-content.tsx",
  "src/design/design.tsx", "src/design/styles.ts", "src/design/styles.css", "src/design/StyleBackdrop.tsx",
  "src/shell/AppFrame.tsx", "src/lib/iconMap.ts",
  "src/industries/types.ts", "src/industries/views.tsx",
  "src/domains/pages.tsx", "src/domains/pages-extra.tsx",
  "src/vite-env.d.ts", "tailwind.config.js", "postcss.config.js", "tsconfig.json", "tsconfig.node.json",
];

export type ExportOptions = { includeDeck?: boolean; onStage?: (stage: string) => void };

/** Builds the project zip. Separated from the download so it can be verified headlessly. */
export async function buildProjectZip(manifest: Manifest, theme: Theme, design: ResolvedDesign, opts: ExportOptions = {}): Promise<{ zip: JSZip; rootName: string }> {
  const domain = await loadDomain(manifest.id);
  const zip = new JSZip();
  const rootName = `${manifest.productName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-prototype`;
  const root = zip.folder(rootName)!;

  root.file("package.json", genPackageJson(manifest));
  root.file("vite.config.ts", VITE_CONFIG);
  root.file("index.html", genIndexHtml(manifest, design));
  root.file("README.md", genReadme(manifest, theme, design));
  root.file(".gitignore", "node_modules\ndist\n*.local\n.DS_Store\n");
  for (const f of COMMON) root.file(f, await raw(`/${f}`));
  root.file("src/main.tsx", MAIN_TSX);
  root.file("src/index.css", injectTheme(await raw("/src/index.css"), theme));
  root.file("src/App.tsx", genAppTsx(manifest, design));
  root.file(`src/industries/${manifest.id}/manifest.ts`, await raw(`/src/industries/${manifest.id}/manifest.ts`));
  root.file(`src/industries/${manifest.id}/data.ts`, await raw(`/src/industries/${manifest.id}/data.ts`));
  if (manifest.bespoke) root.file(`src/domains/${manifest.bespoke.module}.tsx`, await raw(`/src/domains/${manifest.bespoke.module}.tsx`));

  if (opts.includeDeck !== false) {
    opts.onStage?.("Generating slides…");
    const { generateDeck } = await import("./generateDeck");
    const deckDomain = { id: manifest.id, label: manifest.label, sub: manifest.sub, icon: manifest.icon, productName: manifest.productName, views: buildViews(manifest) };
    root.file(`${manifest.productName}-walkthrough.pptx`, await generateDeck(deckDomain, theme, resolveStory(domain)));
  }
  return { zip, rootName };
}

export async function exportProject(manifest: Manifest, theme: Theme, design: ResolvedDesign, onStage?: (stage: string) => void): Promise<void> {
  const { zip, rootName } = await buildProjectZip(manifest, theme, design, { onStage });
  onStage?.("Compressing files…");
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${rootName}.zip`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
