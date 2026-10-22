// src/industries/fashion/manifest.ts — Atelier (Fashion & Apparel), sub-category of RetailTech.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "fashion", label: "Fashion & Apparel", sub: "Collections · Sizing · Lookbooks · Returns", icon: "Shirt", productName: "Atelier", parent: "retail",
  order: 1,
  styles: { default: "editorial", recommended: ["minimal", "liquid-glass", "aurora"] },
  screens: [
    { id: "dash", label: "Season dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "collections", label: "Collection line sheet", icon: "Shirt", kind: "catalog" },
    { id: "lineplan", label: "Product development board", icon: "Kanban", kind: "kanban" },
    { id: "fittings", label: "Fit session calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "sizecurve", label: "Size curve heatmap", icon: "Ruler", kind: "heatmap" },
    { id: "lookbook", label: "Lookbook library", icon: "Camera", kind: "media" },
    { id: "samples", label: "Sample & PO tracker", icon: "Route", kind: "tracker" },
    { id: "factories", label: "Factory scorecard", icon: "Factory", kind: "scorecard" },
    { id: "launch", label: "Drop launch checklist", icon: "ListChecks", kind: "checklist" },
    { id: "allocation", label: "Store allocation", icon: "Store", kind: "table" },
    { id: "returns", label: "Returns review", icon: "Undo2", kind: "queue" },
    { id: "sellthrough", label: "Sell-through analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
