// src/industries/commercial/manifest.ts — Towerline (Commercial Leasing), sub-category of Real Estate.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "commercial", label: "Commercial Leasing", sub: "Office · Retail · Industrial · Leases", icon: "Building2", productName: "Towerline", parent: "realestate",
  order: 2,
  styles: { default: "enterprise", recommended: ["pro-dark", "minimal", "editorial"] },
  screens: [
    { id: "dash", label: "Leasing dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "space", label: "Available space", icon: "Building", kind: "catalog" },
    { id: "tours", label: "Space tours", icon: "CalendarClock", kind: "calendar" },
    { id: "lois", label: "LOI pipeline", icon: "Kanban", kind: "kanban" },
    { id: "proposals", label: "Proposal comparison", icon: "Scale", kind: "comparison" },
    { id: "abstract", label: "Lease abstract", icon: "FileText", kind: "detail" },
    { id: "rentroll", label: "Rent roll", icon: "Table2", kind: "table" },
    { id: "rollover", label: "Lease rollover", icon: "CalendarDays", kind: "heatmap" },
    { id: "dates", label: "Critical dates", icon: "BellRing", kind: "timeline" },
    { id: "cam", label: "CAM reconciliation", icon: "Calculator", kind: "ledger" },
    { id: "buildout", label: "TI build-out tracker", icon: "HardHat", kind: "tracker" },
    { id: "credit", label: "Tenant credit scorecard", icon: "ShieldCheck", kind: "scorecard" },
  ],
});
