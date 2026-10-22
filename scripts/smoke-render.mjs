// scripts/smoke-render.mjs — renders every view of every industry (all 3,000+ screens) to a
// string with react-dom/server, under a few design variants, and reports any that throw.
// Catches runtime render errors that tsc and the validator can't (effects are not run).
// Run: node scripts/smoke-render.mjs [id ...]
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const server = await createServer({ root, logLevel: "error", server: { middlewareMode: true }, appType: "custom", optimizeDeps: { noDiscovery: true } });
const only = process.argv.slice(2);
const failures = [];
let rendered = 0;
try {
  // React is external to Vite's SSR graph, so the native import is the same instance the app uses.
  const React = await import("react");
  const { renderToString } = await import("react-dom/server");
  const { CATALOG, loadDomain } = await server.ssrLoadModule("/src/industries/catalog.ts");
  const { ViewContent } = await server.ssrLoadModule("/src/industries/views.tsx");
  const { DesignContext } = await server.ssrLoadModule("/src/design/design.tsx");
  // Each page variant is exercised once per industry; screens render under the default design.
  const variants = [
    { hero: "centered", signin: "card", pricing: "cards" },
    { hero: "split", signin: "split", pricing: "table" },
    { hero: "bento", signin: "fullbleed", pricing: "slider" },
  ];
  for (const entry of CATALOG.filter(e => !only.length || only.includes(e.id))) {
    const domain = await loadDomain(entry.id);
    for (const view of entry.views) {
      const vs = ["home", "login", "pricing"].includes(view.id) ? variants : [variants[0]];
      for (const v of vs) {
        const design = { style: "modern", shell: "sidebar", ...v };
        try {
          renderToString(React.createElement(DesignContext.Provider, { value: design }, React.createElement(ViewContent, { domain, view })));
          rendered++;
        } catch (e) {
          failures.push(`${entry.id}/${view.id} [${v.hero}/${v.signin}/${v.pricing}]: ${e.message}`);
        }
      }
    }
  }
} finally {
  await server.close();
}
console.log(failures.join("\n"));
console.log(`\nRendered ${rendered} view(s); ${failures.length} failure(s).`);
process.exit(failures.length ? 1 : 0);
