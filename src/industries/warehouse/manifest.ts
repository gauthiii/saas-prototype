// src/industries/warehouse/manifest.ts — Stackyard (Warehousing & WMS), sub-category of Logistics.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "warehouse", label: "Warehousing & WMS", sub: "Receiving · Slotting · Picking · Shipping", icon: "Warehouse", productName: "Stackyard", parent: "logistics",
  order: 2,
  styles: { default: "bento", recommended: ["enterprise", "modern", "clay"] },
  screens: [
    { id: "floor", label: "Building overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "docks", label: "Dock scheduler", icon: "CalendarClock", kind: "booking" },
    { id: "asns", label: "Inbound ASNs", icon: "PackageSearch", kind: "table" },
    { id: "slotting", label: "Slotting heatmap", icon: "Layers", kind: "heatmap" },
    { id: "waves", label: "Wave board", icon: "Kanban", kind: "kanban" },
    { id: "skus", label: "SKU locator", icon: "Barcode", kind: "catalog" },
    { id: "variances", label: "Cycle-count variances", icon: "ScanLine", kind: "queue" },
    { id: "mhe", label: "MHE & automation", icon: "Forklift", kind: "monitor" },
    { id: "pickers", label: "Picker scorecards", icon: "Trophy", kind: "scorecard" },
    { id: "labor", label: "Labor schedule", icon: "CalendarDays", kind: "calendar" },
    { id: "orderflow", label: "Order flow", icon: "Funnel", kind: "funnel" },
    { id: "safety", label: "Shift safety walk", icon: "HardHat", kind: "checklist" },
  ],
});
