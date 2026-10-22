// src/industries/manufacturing/manifest.ts — Forgeline (Manufacturing), multi-plant operations platform.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "manufacturing", label: "Manufacturing", sub: "Production · Quality · Maintenance · Supply", icon: "Factory", productName: "Forgeline",
  order: 13,
  styles: { default: "pro-dark", recommended: ["enterprise", "cyber", "minimal"] },
  screens: [
    { id: "dash", label: "Network operations dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "plants", label: "Plant network map", icon: "Map", kind: "map" },
    { id: "schedule", label: "Master production schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "oee", label: "OEE heatmap by plant", icon: "Gauge", kind: "heatmap" },
    { id: "workorders", label: "Maintenance work orders", icon: "Wrench", kind: "kanban" },
    { id: "ncr", label: "Nonconformance review", icon: "ShieldAlert", kind: "queue" },
    { id: "suppliers", label: "Supplier scorecards", icon: "Handshake", kind: "scorecard" },
    { id: "materials", label: "Materials & inventory", icon: "Boxes", kind: "table" },
    { id: "inbound", label: "Inbound supply tracker", icon: "Truck", kind: "tracker" },
    { id: "assets", label: "Critical asset health", icon: "Activity", kind: "monitor" },
    { id: "lpa", label: "Layered process audits", icon: "ListChecks", kind: "checklist" },
    { id: "analytics", label: "Cost & throughput analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
