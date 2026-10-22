// src/industries/factory/manifest.ts — Cellwise (Smart Factory / MES).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "factory", label: "Smart Factory (MES)", sub: "Work orders · OEE · Machines · Traceability", icon: "Cog", productName: "Cellwise", parent: "manufacturing",
  order: 1,
  styles: { default: "cyber", recommended: ["pro-dark", "enterprise", "modern"] },
  screens: [
    { id: "floor", label: "Shop floor overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "dispatch", label: "Work order dispatch", icon: "ClipboardList", kind: "table" },
    { id: "machines", label: "Machine status wall", icon: "Monitor", kind: "monitor" },
    { id: "andon", label: "Andon stream", icon: "BellRing", kind: "feed" },
    { id: "layout", label: "Cell layout map", icon: "MapPin", kind: "map" },
    { id: "losses", label: "OEE loss analysis", icon: "PieChart", kind: "analytics" },
    { id: "utilization", label: "Machine utilization by hour", icon: "Gauge", kind: "heatmap" },
    { id: "genealogy", label: "Serial genealogy trace", icon: "GitBranch", kind: "tracker" },
    { id: "downtime", label: "Downtime event log", icon: "History", kind: "timeline" },
    { id: "changeover", label: "SMED changeover checklist", icon: "ListChecks", kind: "checklist" },
    { id: "skills", label: "Operator skills matrix", icon: "UserCheck", kind: "matrix" },
    { id: "instructions", label: "Digital work instructions", icon: "Play", kind: "media" },
  ],
});
