// src/export/exportProject.ts — assembles a runnable single-domain Vite project zip,
// entirely client-side. Source files are embedded as raw strings at build time.
import JSZip from "jszip";
import { DomainDef } from "./registry";
import { Theme } from "../theme";
import { injectTheme, genAppTsx, genPackageJson, genReadme, genIndexHtml, VITE_CONFIG } from "./generate";

// Raw source embeds. Keys are root-relative paths.
const RAW_FILES = import.meta.glob(
  [
    "/src/components/ui.tsx",
    "/src/components/charts.tsx",
    "/src/components/AIPanel.tsx",
    "/src/domains/pages.tsx",
    "/src/domains/pages-extra.tsx",
    "/src/domains/fintech.tsx",
    "/src/domains/healthtech.tsx",
    "/src/domains/devops.tsx",
    "/src/domains/hrtech.tsx",
    "/src/domains/edtech.tsx",
    "/src/main.tsx",
    "/src/index.css",
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

export async function exportProject(domain: DomainDef, theme: Theme): Promise<void> {
  const zip = new JSZip();
  const rootName = `${domain.productName.toLowerCase()}-prototype`;
  const root = zip.folder(rootName)!;

  root.file("package.json", genPackageJson(domain));
  root.file("vite.config.ts", VITE_CONFIG);
  root.file("index.html", genIndexHtml(domain));
  root.file("README.md", genReadme(domain, theme));
  root.file("tailwind.config.js", await raw("/tailwind.config.js"));
  root.file("postcss.config.js", await raw("/postcss.config.js"));
  root.file("tsconfig.json", await raw("/tsconfig.json"));
  root.file("tsconfig.node.json", await raw("/tsconfig.node.json"));
  root.file(".gitignore", "node_modules\ndist\n*.local\n.DS_Store\n");

  const src = root.folder("src")!;
  src.file("main.tsx", await raw("/src/main.tsx"));
  src.file("index.css", injectTheme(await raw("/src/index.css"), theme));
  src.file("App.tsx", genAppTsx(domain));

  const components = src.folder("components")!;
  for (const f of ["ui.tsx", "charts.tsx", "AIPanel.tsx"]) {
    components.file(f, await raw(`/src/components/${f}`));
  }

  const domains = src.folder("domains")!;
  domains.file("pages.tsx", await raw("/src/domains/pages.tsx"));
  domains.file("pages-extra.tsx", await raw("/src/domains/pages-extra.tsx"));
  domains.file(`${domain.file}.tsx`, await raw(`/src/domains/${domain.file}.tsx`));

  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${rootName}.zip`;
  a.click();
  URL.revokeObjectURL(url);
}
