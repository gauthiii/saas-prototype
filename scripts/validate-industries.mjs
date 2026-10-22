// scripts/validate-industries.mjs — structural checks for every src/industries/<id>/ entry
// that TypeScript alone can't express (counts, matrix shapes, ranges, cross-references).
// Run: node scripts/validate-industries.mjs [id ...]   (exits 1 on any error)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "src/industries");
const only = process.argv.slice(2);
const ids = fs.readdirSync(dir).filter(d => fs.statSync(path.join(dir, d)).isDirectory()).filter(d => !only.length || only.includes(d));

const server = await createServer({ root, logLevel: "error", server: { middlewareMode: true }, appType: "custom", optimizeDeps: { noDiscovery: true } });
const errors = [], warnings = [];
const err = (id, msg) => errors.push(`${id}: ${msg}`);
const warn = (id, msg) => warnings.push(`${id}: ${msg}`);

const { RESERVED_IDS } = await server.ssrLoadModule("/src/industries/views.tsx");
const { STYLE_IDS } = await server.ssrLoadModule("/src/design/styles.ts");
const manifests = {};

for (const id of fs.readdirSync(dir).filter(d => fs.statSync(path.join(dir, d)).isDirectory())) {
  try { manifests[id] = (await server.ssrLoadModule(`/src/industries/${id}/manifest.ts`)).manifest; }
  catch (e) { if (ids.includes(id)) err(id, `manifest failed to load: ${e.message}`); }
}

const len = (a, min, max, id, label) => {
  if (!Array.isArray(a)) return err(id, `${label} is not an array`);
  if (a.length < min) err(id, `${label} has ${a.length} items (min ${min})`);
  if (max !== undefined && a.length > max) err(id, `${label} has ${a.length} items (max ${max})`);
};
const nonEmpty = (v, id, label) => { if (typeof v !== "string" || !v.trim()) err(id, `${label} is empty`); };

function checkScreen(id, sid, kind, s) {
  const L = `screen "${sid}" (${kind})`;
  nonEmpty(s.blurb, id, `${L}.blurb`);
  len(s.bullets, 3, 3, id, `${L}.bullets`);
  const rowsHaveKeys = (cols, rows, label) => rows.forEach((r, i) => cols.forEach(c => { if (!(c.key in r)) err(id, `${label} row ${i} missing column "${c.key}"`); }));
  const badgeTones = (cols, rows, tones, label) => cols.filter(c => c.type === "badge").forEach(c => rows.forEach(r => { if (!tones?.[r[c.key]]) warn(id, `${label} badge value "${r[c.key]}" has no tone`); }));
  switch (kind) {
    case "dashboard": len(s.kpis, 3, 4, id, `${L}.kpis`); len(s.trend.series, 6, 24, id, `${L}.trend.series`); len(s.bars.data, 3, 12, id, `${L}.bars`); len(s.table.rows, 4, 12, id, `${L}.table.rows`); rowsHaveKeys(s.table.columns, s.table.rows, L); badgeTones(s.table.columns, s.table.rows, s.table.tones, L); break;
    case "table": len(s.rows, 5, 20, id, `${L}.rows`); len(s.columns, 3, 8, id, `${L}.columns`); rowsHaveKeys(s.columns, s.rows, L); badgeTones(s.columns, s.rows, s.tones, L);
      if (s.filter) { if (!s.columns.some(c => c.key === s.filter.key)) err(id, `${L}.filter.key "${s.filter.key}" is not a column`); s.filter.options.forEach(o => { if (!s.rows.some(r => String(r[s.filter.key]) === o)) warn(id, `${L} filter option "${o}" matches no row`); }); } break;
    case "kanban": len(s.columns, 3, 6, id, `${L}.columns`); if (s.columns.reduce((n, c) => n + c.cards.length, 0) < 6) err(id, `${L} needs at least 6 cards`); break;
    case "form": len(s.sections, 2, 5, id, `${L}.sections`); s.sections.forEach((x, i) => len(x.fields, 2, 10, id, `${L}.sections[${i}].fields`)); break;
    case "wizard": len(s.steps, 3, 5, id, `${L}.steps`); s.steps.forEach((x, i) => len(x.fields, 1, 8, id, `${L}.steps[${i}].fields`)); break;
    case "calendar": len(s.events, 6, 30, id, `${L}.events`); len(s.days, 5, 7, id, `${L}.days`);
      s.events.forEach((e, i) => { if (e.day < 0 || e.day >= s.days.length) err(id, `${L} event ${i} day out of range`); if (e.start < s.startHour || e.end > s.endHour || e.end <= e.start) err(id, `${L} event ${i} time out of range`); }); break;
    case "timeline": len(s.items, 5, 20, id, `${L}.items`); if (s.filters) s.filters.forEach(f => { if (!s.items.some(it => it.tag === f)) warn(id, `${L} filter "${f}" matches no item tag`); }); break;
    case "map": len(s.pins, 5, 15, id, `${L}.pins`); s.pins.forEach((p, i) => { if (p.x < 3 || p.x > 97 || p.y < 8 || p.y > 97) err(id, `${L} pin ${i} outside 3–97 / 8–97`); }); break;
    case "analytics": len(s.kpis, 3, 4, id, `${L}.kpis`); len(s.trend.series, 6, 24, id, `${L}.trend.series`); if (s.trend.compare && s.trend.compare.length !== s.trend.series.length) err(id, `${L} compare length mismatch`); len(s.donut.segments, 3, 6, id, `${L}.donut`);
      if (s.radar && s.radar.axes.length !== s.radar.values.length) err(id, `${L} radar axes/values mismatch`); if (s.table) rowsHaveKeys(s.table.columns, s.table.rows, L); break;
    case "catalog": len(s.items, 6, 16, id, `${L}.items`); s.items.forEach((it, i) => { if (it.stock !== undefined && (it.stock < 0 || it.stock > 100)) err(id, `${L} item ${i} stock out of 0–100`); }); break;
    case "feed": len(s.templates, 8, 30, id, `${L}.templates`); break;
    case "detail": len(s.fields, 4, 10, id, `${L}.fields`); len(s.overview, 2, 4, id, `${L}.overview`); len(s.activity, 3, 10, id, `${L}.activity`); len(s.documents, 2, 8, id, `${L}.documents`); break;
    case "comparison": len(s.options, 2, 4, id, `${L}.options`); len(s.rows, 5, 14, id, `${L}.rows`); s.rows.forEach((r, i) => { if (r.values.length !== s.options.length) err(id, `${L} row ${i} has ${r.values.length} values for ${s.options.length} options`); }); break;
    case "monitor": len(s.units, 6, 12, id, `${L}.units`); s.units.forEach((u, i) => { len(u.spark, 6, 24, id, `${L} unit ${i} spark`); if (u.gauge !== undefined && (u.gauge < 0 || u.gauge > 100)) err(id, `${L} unit ${i} gauge out of 0–100`); }); break;
    case "queue": len(s.items, 4, 10, id, `${L}.items`); break;
    case "chat": len(s.threads, 3, 8, id, `${L}.threads`); len(s.messages, 3, 12, id, `${L}.messages`); break;
    case "checklist": len(s.groups, 2, 6, id, `${L}.groups`); s.groups.forEach((g, i) => len(g.items, 3, 10, id, `${L}.groups[${i}].items`)); break;
    case "funnel": len(s.stages, 4, 7, id, `${L}.stages`); s.stages.forEach((st, i) => { if (i && st.count > s.stages[i - 1].count) err(id, `${L} stage "${st.name}" count increases`); }); break;
    case "media": len(s.rails, 2, 4, id, `${L}.rails`); s.rails.forEach((r, i) => len(r.items, 4, 10, id, `${L}.rails[${i}].items`)); break;
    case "booking": len(s.resources, 3, 8, id, `${L}.resources`); len(s.dates, 4, 10, id, `${L}.dates`); len(s.slots, 5, 15, id, `${L}.slots`); (s.unavailable ?? []).forEach(u => { if (!s.slots.includes(u)) err(id, `${L} unavailable slot "${u}" not in slots`); }); break;
    case "ledger": len(s.rows, 6, 20, id, `${L}.rows`); if (!s.rows.some(r => r.amount > 0) || !s.rows.some(r => r.amount < 0)) warn(id, `${L} should mix credits and debits`); break;
    case "heatmap": len(s.rows, 4, 12, id, `${L}.rows`); len(s.cols, 4, 14, id, `${L}.cols`); if (s.values.length !== s.rows.length) err(id, `${L} values has ${s.values.length} rows, expected ${s.rows.length}`);
      s.values.forEach((r, i) => { if (r.length !== s.cols.length) err(id, `${L} values row ${i} has ${r.length} cols, expected ${s.cols.length}`); if (r.some(v => v < 0 || v > 100)) err(id, `${L} values row ${i} outside 0–100`); }); break;
    case "tracker": len(s.items, 3, 8, id, `${L}.items`); s.items.forEach((t, i) => { if (t.current < 0 || t.current >= t.steps.length) err(id, `${L} item ${i} current out of range`); len(t.events, 2, 8, id, `${L} item ${i} events`); }); break;
    case "matrix": len(s.rows, 4, 14, id, `${L}.rows`); len(s.cols, 2, 7, id, `${L}.cols`); if (s.values.length !== s.rows.length) err(id, `${L} values rows mismatch`); s.values.forEach((r, i) => { if (r.length !== s.cols.length) err(id, `${L} values row ${i} cols mismatch`); }); break;
    case "scorecard": len(s.criteria, 3, 7, id, `${L}.criteria`); len(s.entities, 4, 12, id, `${L}.entities`); if (s.weights && s.weights.length !== s.criteria.length) err(id, `${L} weights length mismatch`);
      s.entities.forEach((e, i) => { if (e.scores.length !== s.criteria.length) err(id, `${L} entity ${i} has ${e.scores.length} scores for ${s.criteria.length} criteria`); }); break;
    default: err(id, `${L}: unknown archetype`);
  }
}

function checkShared(id, sh) {
  if (!sh) return err(id, "shared is missing");
  len(sh.onboarding?.steps, 3, 4, id, "shared.onboarding.steps");
  len(sh.team?.roles, 3, 5, id, "shared.team.roles"); len(sh.team?.members, 5, 10, id, "shared.team.members");
  if (sh.team && !sh.team.members.every(m => sh.team.roles.some(r => r.name === m.role))) err(id, "shared.team member role not in roles");
  len(sh.billing?.usage, 3, 5, id, "shared.billing.usage"); len(sh.billing?.invoices, 3, 6, id, "shared.billing.invoices");
  len(sh.inbox?.threads, 3, 6, id, "shared.inbox.threads"); len(sh.inbox?.messages, 3, 8, id, "shared.inbox.messages");
  len(sh.search?.results, 4, 8, id, "shared.search.results"); len(sh.search?.facets, 3, 5, id, "shared.search.facets");
  if (sh.search) sh.search.results.forEach(r => { if (!sh.search.facets.includes(r.type)) err(id, `shared.search result type "${r.type}" not in facets`); });
  if (sh.calendar) { len(sh.calendar.events, 6, 14, id, "shared.calendar.events"); if (sh.calendar.firstWeekday < 0 || sh.calendar.firstWeekday > 6) err(id, "shared.calendar.firstWeekday out of 0–6"); sh.calendar.events.forEach(e => { if (e.date < 1 || e.date > sh.calendar.days) err(id, `shared.calendar event date ${e.date} out of month`); }); }
  len(sh.reports?.reports, 5, 8, id, "shared.reports.reports");
  ["noun", "emptyTitle", "emptyBody", "emptyAction"].forEach(k => nonEmpty(sh.states?.[k], id, `shared.states.${k}`));
}

for (const id of ids) {
  const m = manifests[id];
  if (!m) continue;
  if (m.id !== id) err(id, `manifest id "${m.id}" must equal folder name`);
  if (!STYLE_IDS.includes(m.styles.default)) err(id, `unknown default style "${m.styles.default}"`);
  m.styles.recommended.forEach(s => { if (!STYLE_IDS.includes(s)) err(id, `unknown recommended style "${s}"`); });
  len(m.styles.recommended, 3, 4, id, "styles.recommended");
  if (m.parent && !manifests[m.parent]) err(id, `parent "${m.parent}" does not exist`);
  if (m.parent && manifests[m.parent]?.parent) err(id, "sub-categories cannot nest more than one level");
  const appIds = [...(m.bespoke?.appViews ?? []).map(v => v.id), ...m.screens.map(s => s.id)];
  appIds.forEach(a => { if (RESERVED_IDS.has(a)) err(id, `app screen id "${a}" is reserved`); });
  if (new Set(appIds).size !== appIds.length) err(id, "duplicate app screen ids");
  if (m.bespoke) { if (appIds.length < 12) err(id, `bespoke domain has ${appIds.length} app screens (min 12)`); }
  else {
    if (m.screens.length !== 12) err(id, `has ${m.screens.length} app screens (expected exactly 12)`);
    const kinds = new Set(m.screens.map(s => s.kind));
    if (kinds.size < 9) err(id, `uses only ${kinds.size} distinct archetypes (min 9)`);
  }
  let data;
  try { data = (await server.ssrLoadModule(`/src/industries/${id}/data.ts`)).default; }
  catch (e) { err(id, `data failed to load: ${e.message}`); continue; }
  for (const s of m.screens) {
    if (!data.screens?.[s.id]) err(id, `missing data for screen "${s.id}"`);
    else checkScreen(id, s.id, s.kind, data.screens[s.id]);
  }
  Object.keys(data.screens ?? {}).forEach(k => { if (!m.screens.some(s => s.id === k)) err(id, `data has unknown screen "${k}"`); });
  checkShared(id, data.shared);
  if (!m.bespoke) {
    if (!data.meta || !data.extra || !data.story) { err(id, "meta / extra / story missing"); continue; }
    if (data.meta.id !== id) err(id, `meta.id "${data.meta.id}" must equal "${id}"`);
    if (data.meta.name !== m.productName) err(id, `meta.name "${data.meta.name}" must equal productName "${m.productName}"`);
    len(data.meta.features, 3, 3, id, "meta.features"); len(data.meta.faqs, 5, 8, id, "meta.faqs");
    len(data.extra.team, 4, 4, id, "extra.team"); len(data.extra.compliance, 4, 6, id, "extra.compliance"); len(data.extra.plans, 3, 3, id, "extra.plans");
    if (data.extra.plans.filter(p => p.highlight).length !== 1) err(id, "extra.plans needs exactly one highlight");
    len(data.extra.notifications, 4, 6, id, "extra.notifications"); len(data.extra.changelog, 3, 3, id, "extra.changelog"); len(data.extra.stats, 4, 4, id, "extra.stats");
    if (!data.extra.testimonial) err(id, "extra.testimonial missing");
    len(data.story.stats, 3, 3, id, "story.stats");
  }
}

// Catalogue-level rule: exactly 3 sub-categories per parent.
if (!only.length) {
  for (const [id, m] of Object.entries(manifests)) {
    if (m.parent) continue;
    const n = Object.values(manifests).filter(c => c.parent === id).length;
    if (n !== 3) warn(id, `has ${n} sub-categories (target 3)`);
  }
}

await server.close();
console.log(warnings.map(w => `WARN  ${w}`).join("\n"));
console.log(errors.map(e => `ERROR ${e}`).join("\n"));
console.log(`\nChecked ${ids.length} industr${ids.length === 1 ? "y" : "ies"}: ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
