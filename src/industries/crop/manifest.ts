// src/industries/crop/manifest.ts — Fieldsense (Crop Farming), precision row-crop and irrigation management.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "crop", label: "Crop Farming", sub: "Fields · Planting · Irrigation · Yield", icon: "Wheat", productName: "Fieldsense", parent: "agritech",
  order: 1,
  styles: { default: "minimal", recommended: ["modern", "bento", "editorial"] },
  screens: [
    { id: "fieldops", label: "Field operations", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "scouting", label: "Scouting map", icon: "MapPin", kind: "map" },
    { id: "pivots", label: "Pivot control", icon: "Droplet", kind: "monitor" },
    { id: "moisture", label: "Soil moisture grid", icon: "Waves", kind: "heatmap" },
    { id: "rxbuilder", label: "Seeding Rx builder", icon: "Wand2", kind: "wizard" },
    { id: "trials", label: "Hybrid strip trials", icon: "Trophy", kind: "scorecard" },
    { id: "fieldlog", label: "Field activity log", icon: "History", kind: "timeline" },
    { id: "sprayrecord", label: "Spray record", icon: "NotebookPen", kind: "form" },
    { id: "modules", label: "Cotton module tracker", icon: "Route", kind: "tracker" },
    { id: "yields", label: "Yield analytics", icon: "BarChart3", kind: "analytics" },
    { id: "fieldfile", label: "Field profile", icon: "Sprout", kind: "detail" },
    { id: "seedpick", label: "2027 seed comparison", icon: "Scale", kind: "comparison" },
  ],
});
