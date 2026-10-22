// src/industries/chemicals/manifest.ts — Catalyst (Process & Chemicals).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "chemicals", label: "Process & Chemicals", sub: "Batches · Recipes · Safety · Compliance", icon: "FlaskConical", productName: "Catalyst", parent: "manufacturing",
  order: 2,
  styles: { default: "enterprise", recommended: ["clinical", "minimal", "pro-dark"] },
  screens: [
    { id: "dash", label: "Site batch dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "batches", label: "Batch record tracker", icon: "Route", kind: "tracker" },
    { id: "recipes", label: "Master recipe library", icon: "BookOpen", kind: "catalog" },
    { id: "scaleup", label: "Recipe scale-up wizard", icon: "Beaker", kind: "wizard" },
    { id: "vessels", label: "Reactor & vessel monitor", icon: "Thermometer", kind: "monitor" },
    { id: "moc", label: "Management of change", icon: "FileSignature", kind: "queue" },
    { id: "inventory", label: "Chemical inventory & SDS", icon: "TestTube", kind: "table" },
    { id: "campaigns", label: "Reactor campaign schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "psm", label: "PSM compliance checklist", icon: "ShieldCheck", kind: "checklist" },
    { id: "storage", label: "Storage compatibility matrix", icon: "Table2", kind: "matrix" },
    { id: "lot", label: "Lot release record", icon: "FileCheck", kind: "detail" },
    { id: "yield", label: "Yield & emissions analytics", icon: "AreaChart", kind: "analytics" },
  ],
});
