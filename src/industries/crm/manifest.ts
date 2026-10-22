// src/industries/crm/manifest.ts — Closebook (Sales CRM), pipeline and forecasting workspace for B2B sales teams.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "crm", label: "Sales CRM", sub: "Leads · Deals · Forecasts · Sequences", icon: "Handshake", productName: "Closebook",
  parent: "marketing",
  order: 1,
  styles: { default: "modern", recommended: ["enterprise", "minimal", "pro-dark"] },
  screens: [
    { id: "cockpit", label: "Sales cockpit", icon: "Gauge", kind: "dashboard" },
    { id: "leads", label: "Lead list", icon: "UserPlus", kind: "table" },
    { id: "deals", label: "Deal board", icon: "Kanban", kind: "kanban" },
    { id: "sequences", label: "Sequence tracker", icon: "Workflow", kind: "tracker" },
    { id: "territories", label: "Territory map", icon: "Map", kind: "map" },
    { id: "meetings", label: "Rep meeting schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "account", label: "Account 360", icon: "Building2", kind: "detail" },
    { id: "dealhealth", label: "Deal health scorecard", icon: "Target", kind: "scorecard" },
    { id: "mutual-plan", label: "Mutual action plan", icon: "ListChecks", kind: "checklist" },
    { id: "quote", label: "Quote builder", icon: "FileSignature", kind: "form" },
    { id: "discounts", label: "Discount approvals", icon: "BadgePercent", kind: "queue" },
    { id: "forecast", label: "Forecast analytics", icon: "LineChart", kind: "analytics" },
  ],
});
