// src/industries/types.ts — the contract every industry is built against.
//
// Each industry lives in src/industries/<id>/ as two files:
//   manifest.ts  light metadata, loaded eagerly for navigation (labels, icons, archetype per screen)
//   data.ts      heavy content, lazy-loaded per industry (copy, metrics, rows, shared-page data)
// defineData() ties the two together so tsc rejects a missing screen or data of the wrong archetype.
import type { Tone } from "../components/ui";
import type { Insight } from "../components/AIPanel";
import type { DomainMeta } from "../domains/pages";
import type { DomainExtra } from "../domains/pages-extra";
import type { IconName } from "../lib/iconMap";
import type { StyleId } from "../design/styles";

export type { Tone, Insight, IconName };

// ─── Building blocks ─────────────────────────────────────────────────────────
export type Kpi = { label: string; value: string; delta?: string; tone?: Tone; icon?: IconName };
export type BarDatum = { label: string; value: number };
export type Segment = { name: string; value: number };

export type ColumnType = "text" | "badge" | "money" | "number" | "progress" | "date" | "avatar" | "mono";
export type Column = { key: string; label: string; type?: ColumnType; align?: "left" | "right" };
export type Row = Record<string, string | number>;
/** A table block: badge columns colour their values through `tones` (value → Tone). */
export type TableBlock = { title: string; columns: Column[]; rows: Row[]; tones?: Record<string, Tone> };

export type FieldType = "text" | "email" | "number" | "date" | "select" | "textarea" | "toggle" | "radio" | "currency";
export type Field = { label: string; type: FieldType; placeholder?: string; options?: string[]; half?: boolean; value?: string };

export type Thread = { name: string; preview: string; time: string; avatar: string; unread?: number; tag?: string };
export type Message = { from: "me" | "them"; text: string; time: string };
export type TimeEvent = { time: string; text: string };

/** Every screen carries deck copy: a one-sentence purpose and exactly three capability bullets. */
type Base = { blurb: string; bullets: [string, string, string]; subtitle?: string };

// ─── Archetypes (25) ─────────────────────────────────────────────────────────
export type ScreenData = {
  /** KPI row, trend chart, bar breakdown, recent-activity table, optional AI insights. */
  dashboard: Base & { kpis: Kpi[]; trend: { title: string; series: number[]; labels?: string[]; summary?: string }; bars: { title: string; data: BarDatum[] }; table: TableBlock; insights?: Insight[] };
  /** Searchable, filterable data table; clicking a row opens a detail drawer. */
  table: Base & { columns: Column[]; rows: Row[]; tones?: Record<string, Tone>; filter?: { key: string; options: string[] }; searchPlaceholder: string; primaryAction?: string; kpis?: Kpi[] };
  /** Drag-free kanban board with tone-coded columns. */
  kanban: Base & { columns: { title: string; tone?: Tone; cards: { title: string; meta: string; tag?: string; tone?: Tone; avatar?: string; value?: string }[] }[] };
  /** Multi-section form with an optional summary aside. */
  form: Base & { sections: { title: string; description?: string; fields: Field[] }[]; submitLabel: string; aside?: { title: string; items: { label: string; value: string }[]; note?: string } };
  /** Step-by-step wizard ending in a success state. */
  wizard: Base & { steps: { title: string; description: string; fields: Field[] }[]; finishLabel: string; successTitle: string; successBody: string };
  /** Week grid of timed events. Hours are 0–24 (decimals allowed); day is an index into `days`. */
  calendar: Base & { weekLabel: string; days: string[]; startHour: number; endHour: number; events: { day: number; start: number; end: number; title: string; meta?: string; tone?: Tone }[]; legend?: { label: string; tone: Tone }[] };
  /** Filterable vertical event timeline with an optional KPI aside. */
  timeline: Base & { filters?: string[]; items: { time: string; title: string; body: string; tone?: Tone; tag?: string; actor?: string }[]; aside?: { title: string; kpis: Kpi[] } };
  /** Stylised geo board: pins positioned by x/y percent (0–100) plus a status list. */
  map: Base & { mapLabel: string; pins: { name: string; x: number; y: number; status: string; tone: Tone; metric: string; detail?: string }[]; legend: { label: string; tone: Tone }[]; kpis?: Kpi[] };
  /** Chart grid: trend (optionally vs. comparison), bars, donut, optional radar and table. */
  analytics: Base & { kpis: Kpi[]; trend: { title: string; series: number[]; compare?: number[]; labels?: string[] }; bars: { title: string; data: BarDatum[] }; donut: { title: string; segments: Segment[]; centerLabel?: string; centerSub?: string }; radar?: { title: string; axes: string[]; values: number[] }; table?: TableBlock };
  /** Card grid of items (products, listings, courses, rooms…). `stock` is 0–100. */
  catalog: Base & { filters?: string[]; items: { name: string; subtitle: string; emoji: string; price?: string; badge?: string; tone?: Tone; meta?: string; stock?: number; category?: string }[]; primaryAction?: string };
  /** Auto-ticking live event stream built from message templates. */
  feed: Base & { streamLabel: string; templates: { level: "info" | "warn" | "error" | "success"; source: string; message: string }[]; stats?: Kpi[] };
  /** Single record profile with Overview / Activity / Documents tabs. */
  detail: Base & { name: string; headline: string; avatar: string; status: string; tone: Tone; fields: { label: string; value: string }[]; overview: { title: string; body: string }[]; activity: TimeEvent[]; documents: { name: string; meta: string }[]; actions?: string[] };
  /** Side-by-side option comparison; boolean values render as check / cross. */
  comparison: Base & { options: { name: string; tagline: string; price?: string; highlight?: boolean; badge?: string }[]; rows: { label: string; values: (string | boolean)[] }[]; cta?: string };
  /** Live equipment / sensor tiles with sparklines and optional 0–100 gauge. */
  monitor: Base & { units: { name: string; value: string; unit?: string; status: string; tone: Tone; spark: number[]; meta?: string; gauge?: number }[]; kpis?: Kpi[]; alerts?: { title: string; body: string; tone: Tone }[] };
  /** Approval / triage queue with approve and reject actions. */
  queue: Base & { items: { title: string; subtitle: string; amount?: string; priority: "High" | "Medium" | "Low"; age: string; tags?: string[]; detail: string }[]; approveLabel: string; rejectLabel: string; stats?: Kpi[] };
  /** Conversation list + thread with quick replies and a context panel. */
  chat: Base & { threads: Thread[]; messages: Message[]; quickReplies?: string[]; context?: { title: string; fields: { label: string; value: string }[] } };
  /** Grouped checklist with progress; items can be critical. */
  checklist: Base & { groups: { title: string; items: { label: string; done: boolean; owner?: string; due?: string; critical?: boolean }[] }[]; summary?: string };
  /** Conversion funnel stages with an optional breakdown and table. */
  funnel: Base & { stages: { name: string; count: number; value?: string }[]; kpis?: Kpi[]; breakdown?: { title: string; data: BarDatum[] }; table?: TableBlock };
  /** Media library: a featured item plus titled rails. `progress` is 0–100. */
  media: Base & { featured: { title: string; subtitle: string; duration: string; emoji: string; progress?: number }; rails: { title: string; items: { title: string; meta: string; emoji: string; duration?: string; badge?: string }[] }[] };
  /** Reservation flow: pick a resource, a date and a slot, then confirm. */
  booking: Base & { resources: { name: string; meta: string; price: string; emoji: string; tags?: string[] }[]; dates: string[]; slots: string[]; unavailable?: string[]; summary: { label: string; value: string }[]; confirmLabel: string; policy?: string };
  /** Transactions ledger. Positive amounts are credits, negative are debits. */
  ledger: Base & { currency: string; accounts?: Kpi[]; rows: { date: string; description: string; category: string; amount: number; status: string; ref?: string }[]; tones?: Record<string, Tone> };
  /** Matrix of 0–100 intensities (occupancy, rota load, risk…). values[row][col]. */
  heatmap: Base & { rowLabel: string; rows: string[]; cols: string[]; values: number[][]; unit?: string; legend: [string, string]; summary?: Kpi[] };
  /** Multi-step tracking (shipments, claims, cases). `current` is the active step index. */
  tracker: Base & { items: { id: string; title: string; subtitle: string; steps: string[]; current: number; eta: string; status: string; tone: Tone; events: TimeEvent[] }[] };
  /** Rules / permissions matrix of toggles. values[row][col]. */
  matrix: Base & { rows: { label: string; description?: string }[]; cols: string[]; values: boolean[][]; note?: string; saveLabel?: string };
  /** Weighted scorecards: one 0–100 score per criterion per entity. */
  scorecard: Base & { criteria: string[]; weights?: number[]; entities: { name: string; subtitle: string; scores: number[]; trend?: string; badge?: string }[] };
};

export type ScreenKind = keyof ScreenData;
export const SCREEN_KINDS = [
  "dashboard", "table", "kanban", "form", "wizard", "calendar", "timeline", "map", "analytics", "catalog",
  "feed", "detail", "comparison", "monitor", "queue", "chat", "checklist", "funnel", "media", "booking",
  "ledger", "heatmap", "tracker", "matrix", "scorecard",
] as const satisfies readonly ScreenKind[];

// ─── Shared workspace + utility page data ────────────────────────────────────
export type SharedData = {
  onboarding: { steps: { title: string; description: string; fields: Field[] }[] };
  team: { roles: { name: string; description: string; permissions: string[] }[]; members: { name: string; email: string; role: string; status: "Active" | "Invited" | "Suspended"; lastActive: string }[] };
  billing: { plan: string; price: string; renews: string; paymentMethod: string; usage: { label: string; used: number; limit: number; unit: string }[]; invoices: { id: string; date: string; amount: string; status: "Paid" | "Due" | "Overdue" }[] };
  inbox: { threads: Thread[]; messages: Message[] };
  search: { query: string; facets: string[]; results: { type: string; title: string; snippet: string; meta: string }[] };
  calendar: { month: string; firstWeekday: number; days: number; events: { date: number; title: string; tone: Tone; time?: string }[] };
  reports: { reports: { name: string; description: string; category: string; updated: string; format: "PDF" | "CSV" | "XLSX"; owner: string; schedule?: string }[] };
  states: { noun: string; emptyTitle: string; emptyBody: string; emptyAction: string };
};

export type StoryData = { tagline: string; audience: string; narrative: string; stats: [[string, string], [string, string], [string, string]] };

// ─── Manifest + data ─────────────────────────────────────────────────────────
export type ManifestScreen = { id: string; label: string; icon: IconName; kind: ScreenKind };
export type BespokeView = { id: string; label: string; icon: IconName; comp: string; wrap?: string };

export type Manifest = {
  id: string;
  label: string;
  sub: string;
  icon: IconName;
  productName: string;
  /** Parent industry id — sub-categories render nested under it. */
  parent?: string;
  /** Sort key within its level (parents among parents, subs within a parent). */
  order: number;
  styles: { default: StyleId; recommended: StyleId[] };
  /** Archetype-driven app screens (12 for new industries; extension screens for bespoke ones). */
  screens: readonly ManifestScreen[];
  /** Hand-coded domains: module under src/domains plus its existing App views. */
  bespoke?: { module: string; prefix: string; appViews: readonly BespokeView[] };
};

export const defineManifest = <const M extends Manifest>(m: M): M => m;

type ScreensFor<M extends Manifest> = {
  [S in M["screens"][number] as S["id"]]: ScreenData[S["kind"]];
};

/** Bespoke domains keep their own meta/extra/deck story; new industries supply them here. */
export type IndustryData<M extends Manifest = Manifest> = {
  shared: SharedData;
  screens: ScreensFor<M>;
} & (M["bespoke"] extends object ? {} : { meta: DomainMeta; extra: DomainExtra; story: StoryData });

export const defineData = <M extends Manifest>(_manifest: M, data: IndustryData<M>): IndustryData<M> => data;

/** Loose runtime view of any data file (what the renderer works with). */
export type AnyIndustryData = {
  shared: SharedData;
  screens: Record<string, ScreenData[ScreenKind]>;
  meta?: DomainMeta;
  extra?: DomainExtra;
  story?: StoryData;
};
