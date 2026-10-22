// src/industries/insurance/manifest.ts — Assurely (Insurance · multi-line carrier & agency platform).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "insurance", label: "Insurance", sub: "Policies · Claims · Underwriting · Agents", icon: "ShieldCheck", productName: "Assurely",
  order: 10,
  styles: { default: "minimal", recommended: ["enterprise", "modern", "editorial"] },
  screens: [
    { id: "book", label: "Book of business", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "policies", label: "Policy register", icon: "FileText", kind: "table" },
    { id: "submissions", label: "Underwriting queue", icon: "Inbox", kind: "queue" },
    { id: "quote", label: "New business quote", icon: "FileSignature", kind: "wizard" },
    { id: "claims", label: "Claims board", icon: "Kanban", kind: "kanban" },
    { id: "agencies", label: "Agency scorecard", icon: "Award", kind: "scorecard" },
    { id: "renewals", label: "Renewal retention", icon: "Funnel", kind: "funnel" },
    { id: "catrisk", label: "Cat exposure heatmap", icon: "CloudRain", kind: "heatmap" },
    { id: "premium", label: "Premium ledger", icon: "Receipt", kind: "ledger" },
    { id: "account", label: "Commercial account", icon: "Building2", kind: "detail" },
    { id: "authority", label: "Binding authority", icon: "Gavel", kind: "matrix" },
    { id: "lossratio", label: "Loss ratio analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
