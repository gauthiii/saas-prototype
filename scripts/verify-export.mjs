// scripts/verify-export.mjs — builds an industry's export zip headlessly (no browser, no deck)
// and extracts it, so the generated project can be installed and built for real.
// Run: node scripts/verify-export.mjs <industryId> <outDir> [style] [shell]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const [id, outDir, style = "modern", shell = "sidebar"] = process.argv.slice(2);
if (!id || !outDir) { console.error("usage: node scripts/verify-export.mjs <industryId> <outDir> [style] [shell]"); process.exit(1); }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const server = await createServer({ root, logLevel: "error", server: { middlewareMode: true }, appType: "custom", optimizeDeps: { noDiscovery: true } });
try {
  const { findDomain } = await server.ssrLoadModule("/src/industries/catalog.ts");
  const { buildProjectZip } = await server.ssrLoadModule("/src/export/exportProject.ts");
  const { DEFAULT_THEME } = await server.ssrLoadModule("/src/theme.ts");
  const manifest = findDomain(id);
  if (!manifest) throw new Error(`Unknown industry "${id}"`);
  const design = { style, shell, hero: "split", signin: "split", pricing: "table" };
  const { zip, rootName } = await buildProjectZip(manifest, DEFAULT_THEME, design, { includeDeck: false });
  const files = Object.values(zip.files).filter(f => !f.dir);
  for (const f of files) {
    const dest = path.join(outDir, f.name);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, await f.async("nodebuffer"));
  }
  console.log(`Wrote ${files.length} files to ${path.join(outDir, rootName)}`);
} finally {
  await server.close();
}
