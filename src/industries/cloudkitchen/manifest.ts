// src/industries/cloudkitchen/manifest.ts — Ghostline (Cloud Kitchens), sub-category of Food & Restaurant.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "cloudkitchen", label: "Cloud Kitchens", sub: "Brands · Stations · Throughput · Waste", icon: "Soup", productName: "Ghostline", parent: "food",
  order: 3,
  styles: { default: "pro-dark", recommended: ["cyber", "enterprise", "minimal"] },
  screens: [
    { id: "command", label: "Kitchen command", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "stations", label: "Station monitor", icon: "Thermometer", kind: "monitor" },
    { id: "station-load", label: "Station load heatmap", icon: "Flame", kind: "heatmap" },
    { id: "brands", label: "Virtual brand portfolio", icon: "Layers", kind: "catalog" },
    { id: "channels", label: "Brand × channel availability", icon: "Network", kind: "matrix" },
    { id: "prep", label: "Batch prep board", icon: "Kanban", kind: "kanban" },
    { id: "waste", label: "Waste log", icon: "Trash2", kind: "table" },
    { id: "haccp", label: "HACCP checks", icon: "ShieldCheck", kind: "checklist" },
    { id: "receiving", label: "Prep & receiving schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "concepts", label: "New brand comparison", icon: "Scale", kind: "comparison" },
    { id: "sops", label: "Recipe SOP videos", icon: "Clapperboard", kind: "media" },
    { id: "brand-pl", label: "Brand P&L analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
