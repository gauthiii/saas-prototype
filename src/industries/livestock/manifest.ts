// src/industries/livestock/manifest.ts — Herdbook (Livestock & Dairy), herd health, milking and feed management.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "livestock", label: "Livestock & Dairy", sub: "Herds · Health · Milking · Feed", icon: "Milk", productName: "Herdbook", parent: "agritech",
  order: 2,
  styles: { default: "clay", recommended: ["modern", "colorful", "bento"] },
  screens: [
    { id: "herd", label: "Herd overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "cows", label: "Cow register", icon: "Table2", kind: "table" },
    { id: "parlor", label: "Rotary parlor live", icon: "Gauge", kind: "monitor" },
    { id: "collars", label: "Collar alert stream", icon: "Radio", kind: "feed" },
    { id: "treatments", label: "Treatment sign-off", icon: "Syringe", kind: "queue" },
    { id: "repro", label: "Repro pipeline", icon: "Kanban", kind: "kanban" },
    { id: "herdweek", label: "Herd-check week", icon: "CalendarDays", kind: "calendar" },
    { id: "cowcard", label: "Cow card", icon: "IdCard", kind: "detail" },
    { id: "ration", label: "Ration builder", icon: "Wheat", kind: "form" },
    { id: "rumination", label: "Pen rumination map", icon: "Activity", kind: "heatmap" },
    { id: "farmprep", label: "FARM evaluation prep", icon: "ListChecks", kind: "checklist" },
    { id: "milkquality", label: "Milk quality analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
