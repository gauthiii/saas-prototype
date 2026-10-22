// src/industries/agritech/manifest.ts — Furrow (AgriTech), farm management for mixed operations and agribusiness.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "agritech", label: "AgriTech", sub: "Farms · Crops · Livestock · Markets", icon: "Sprout", productName: "Furrow",
  order: 16,
  styles: { default: "bento", recommended: ["clay", "modern", "editorial"] },
  screens: [
    { id: "dash", label: "Operation dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "fields", label: "Farm map", icon: "Map", kind: "map" },
    { id: "workorders", label: "Work order board", icon: "Kanban", kind: "kanban" },
    { id: "season", label: "Fall work planner", icon: "CalendarClock", kind: "calendar" },
    { id: "inputs", label: "Input inventory", icon: "Package", kind: "catalog" },
    { id: "fleet", label: "Equipment telemetry", icon: "Tractor", kind: "monitor" },
    { id: "grain", label: "Grain positions", icon: "Wheat", kind: "table" },
    { id: "farmledger", label: "Farm ledger", icon: "Receipt", kind: "ledger" },
    { id: "purchases", label: "Purchase approvals", icon: "ClipboardList", kind: "queue" },
    { id: "crew", label: "Crew load", icon: "Users", kind: "heatmap" },
    { id: "recordkeeping", label: "Recordkeeping audit", icon: "ListChecks", kind: "checklist" },
    { id: "enterprise", label: "Enterprise profitability", icon: "BarChart3", kind: "analytics" },
  ],
});
