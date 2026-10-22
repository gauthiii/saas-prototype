// src/industries/govtech/manifest.ts — Civitas (GovTech & Public Sector).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "govtech", label: "GovTech & Public Sector", sub: "Services · Permits · Cases · Transparency", icon: "Landmark", productName: "Civitas",
  order: 17,
  styles: { default: "clinical", recommended: ["enterprise", "minimal", "editorial"] },
  screens: [
    { id: "ops", label: "City operations dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "wards", label: "311 ward map", icon: "MapPin", kind: "map" },
    { id: "permits", label: "Permit review pipeline", icon: "Kanban", kind: "kanban" },
    { id: "codecases", label: "Code enforcement cases", icon: "Gavel", kind: "table" },
    { id: "council", label: "Council & board meetings", icon: "CalendarDays", kind: "calendar" },
    { id: "ordinances", label: "Ordinance tracker", icon: "Scroll", kind: "tracker" },
    { id: "records", label: "Public records queue", icon: "Inbox", kind: "queue" },
    { id: "fund", label: "General fund ledger", icon: "Receipt", kind: "ledger" },
    { id: "bids", label: "Bid evaluation", icon: "Scale", kind: "comparison" },
    { id: "deptkpi", label: "Department scorecard", icon: "Target", kind: "scorecard" },
    { id: "grants", label: "Grant compliance checklist", icon: "ListChecks", kind: "checklist" },
    { id: "opendata", label: "Open data analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
