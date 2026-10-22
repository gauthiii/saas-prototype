// src/industries/legal/manifest.ts — Lexicon (Legal operations · in-house + firms).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "legal", label: "Legal", sub: "Matters · Documents · Billing · Compliance", icon: "Scale", productName: "Lexicon",
  order: 11,
  styles: { default: "editorial", recommended: ["minimal", "enterprise", "pro-dark"] },
  screens: [
    { id: "dash", label: "Legal ops dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "intake", label: "Request triage", icon: "Inbox", kind: "queue" },
    { id: "matters", label: "Matter portfolio", icon: "Briefcase", kind: "table" },
    { id: "workspace", label: "Matter workspace", icon: "FolderOpen", kind: "detail" },
    { id: "spend", label: "Outside counsel spend", icon: "Receipt", kind: "ledger" },
    { id: "budget", label: "Budget vs. actuals", icon: "BarChart3", kind: "analytics" },
    { id: "panel", label: "Panel firm scorecards", icon: "Award", kind: "scorecard" },
    { id: "risk", label: "Litigation risk heatmap", icon: "ShieldAlert", kind: "heatmap" },
    { id: "holds", label: "Legal hold tracker", icon: "Lock", kind: "tracker" },
    { id: "regwatch", label: "Regulatory watch", icon: "Newspaper", kind: "timeline" },
    { id: "walls", label: "Ethical walls & access", icon: "LockKeyhole", kind: "matrix" },
    { id: "library", label: "Policy & training library", icon: "Library", kind: "media" },
  ],
});
