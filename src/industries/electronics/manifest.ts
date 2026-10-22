// src/industries/electronics/manifest.ts — Solderworks (Electronics Assembly / EMS).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "electronics", label: "Electronics Assembly", sub: "SMT lines · Test · BOM · Yield", icon: "CircuitBoard", productName: "Solderworks", parent: "manufacturing",
  order: 3,
  styles: { default: "bento", recommended: ["modern", "cyber", "minimal"] },
  screens: [
    { id: "dash", label: "Line yield dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "smt", label: "SMT line monitor", icon: "Cpu", kind: "monitor" },
    { id: "fpy", label: "First-pass yield funnel", icon: "Funnel", kind: "funnel" },
    { id: "bom", label: "BOM explorer", icon: "Layers", kind: "table" },
    { id: "defects", label: "Defect Pareto analytics", icon: "BarChart3", kind: "analytics" },
    { id: "aoi", label: "AOI defect heatmap", icon: "ScanSearch", kind: "heatmap" },
    { id: "npi", label: "NPI pipeline", icon: "Kanban", kind: "kanban" },
    { id: "rma", label: "RMA & failure analysis", icon: "Route", kind: "tracker" },
    { id: "eco", label: "Engineering change approvals", icon: "FileSignature", kind: "queue" },
    { id: "alternates", label: "Alternate part comparison", icon: "Scale", kind: "comparison" },
    { id: "falab", label: "FA lab booking", icon: "Microscope", kind: "booking" },
    { id: "fai", label: "First article inspection", icon: "ClipboardList", kind: "form" },
  ],
});
