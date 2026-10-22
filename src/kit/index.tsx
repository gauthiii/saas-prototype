// src/kit/index.tsx — renders any archetype screen from its kind + data.
import type { ComponentType } from "react";
import type { ScreenData, ScreenKind } from "../industries/types";
import { DashboardScreen, TableScreen, AnalyticsScreen, LedgerScreen, FunnelScreen, HeatmapScreen, ScorecardScreen } from "./archetypes-data";
import { KanbanScreen, CalendarScreen, TimelineScreen, MapScreen, MonitorScreen, FeedScreen, TrackerScreen, QueueScreen } from "./archetypes-ops";
import { FormScreen, WizardScreen, BookingScreen, ChecklistScreen, MatrixScreen, ComparisonScreen } from "./archetypes-flow";
import { CatalogScreen, DetailScreen, MediaScreen, ChatScreen } from "./archetypes-content";

const ARCHETYPES: { [K in ScreenKind]: ComponentType<{ data: ScreenData[K]; title: string }> } = {
  dashboard: DashboardScreen, table: TableScreen, kanban: KanbanScreen, form: FormScreen, wizard: WizardScreen,
  calendar: CalendarScreen, timeline: TimelineScreen, map: MapScreen, analytics: AnalyticsScreen, catalog: CatalogScreen,
  feed: FeedScreen, detail: DetailScreen, comparison: ComparisonScreen, monitor: MonitorScreen, queue: QueueScreen,
  chat: ChatScreen, checklist: ChecklistScreen, funnel: FunnelScreen, media: MediaScreen, booking: BookingScreen,
  ledger: LedgerScreen, heatmap: HeatmapScreen, tracker: TrackerScreen, matrix: MatrixScreen, scorecard: ScorecardScreen,
};

/** Human-readable archetype names, used by the About page and docs. */
export const ARCHETYPE_LABELS: Record<ScreenKind, string> = {
  dashboard: "KPI dashboard", table: "Data table + drawer", kanban: "Kanban board", form: "Sectioned form", wizard: "Step wizard",
  calendar: "Week calendar", timeline: "Event timeline", map: "Geo board", analytics: "Analytics grid", catalog: "Card catalog",
  feed: "Live feed", detail: "Record profile", comparison: "Comparison table", monitor: "Live monitor", queue: "Approval queue",
  chat: "Conversations", checklist: "Checklist", funnel: "Conversion funnel", media: "Media library", booking: "Booking flow",
  ledger: "Ledger", heatmap: "Heatmap", tracker: "Step tracker", matrix: "Rules matrix", scorecard: "Scorecard",
};

export function ArchetypeScreen({ kind, data, title }: { kind: ScreenKind; data: ScreenData[ScreenKind]; title: string }) {
  const C = ARCHETYPES[kind] as ComponentType<{ data: ScreenData[ScreenKind]; title: string }>;
  return <C data={data} title={title} />;
}
