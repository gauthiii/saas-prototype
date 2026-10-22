// src/industries/catalog.ts — discovers every industry in src/industries/*/ (live app only).
// Manifests load eagerly for navigation; data files and bespoke domain modules load lazily,
// so each industry becomes its own chunk.
import type { AnyIndustryData, Manifest } from "./types";
import { buildViews, type LoadedDomain, type ViewDef } from "./views";

const MANIFESTS = import.meta.glob<{ manifest: Manifest }>("./*/manifest.ts", { eager: true });
const DATA = import.meta.glob<{ default: AnyIndustryData }>("./*/data.ts");
const BESPOKE = import.meta.glob<Record<string, unknown>>("../domains/*.tsx");

export type CatalogEntry = Manifest & { views: ViewDef[] };

const all: CatalogEntry[] = Object.values(MANIFESTS).map(m => ({ ...m.manifest, views: buildViews(m.manifest) }));

const byOrder = (a: Manifest, b: Manifest) => a.order - b.order || a.label.localeCompare(b.label);
const parents = all.filter(m => !m.parent).sort(byOrder);

/** Parents in order, each immediately followed by its sub-categories. */
export const CATALOG: CatalogEntry[] = parents.flatMap(p => [p, ...all.filter(m => m.parent === p.id).sort(byOrder)]);
export const PARENTS = parents;
export const childrenOf = (id: string) => CATALOG.filter(m => m.parent === id);
export const findDomain = (id: string | undefined) => CATALOG.find(m => m.id === id);

const orphans = all.filter(m => m.parent && !parents.some(p => p.id === m.parent));
if (orphans.length) throw new Error(`Industries with unknown parent: ${orphans.map(o => `${o.id}→${o.parent}`).join(", ")}`);
const seen = new Set<string>();
for (const m of all) {
  if (seen.has(m.id)) throw new Error(`Duplicate industry id "${m.id}"`);
  seen.add(m.id);
}

const cache = new Map<string, Promise<LoadedDomain>>();

/** Cached promise for an industry's data (+ bespoke module) — safe to pass to React's use(). */
export function loadDomain(id: string): Promise<LoadedDomain> {
  let p = cache.get(id);
  if (!p) {
    const manifest = findDomain(id);
    if (!manifest) return Promise.reject(new Error(`Unknown industry "${id}"`));
    const dataLoader = DATA[`./${id}/data.ts`];
    if (!dataLoader) return Promise.reject(new Error(`Industry "${id}" has no data.ts`));
    const modLoader = manifest.bespoke ? BESPOKE[`../domains/${manifest.bespoke.module}.tsx`] : undefined;
    p = Promise.all([dataLoader(), modLoader?.()]).then(([data, module]) => ({ manifest, data: data.default, module }));
    cache.set(id, p);
  }
  return p;
}
