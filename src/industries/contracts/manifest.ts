// src/industries/contracts/manifest.ts — Clausewise (Legal › Contract lifecycle management).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "contracts", label: "Contract Lifecycle", sub: "Drafting · Redlines · Approvals · Renewals", icon: "FileSignature", productName: "Clausewise",
  parent: "legal",
  order: 2,
  styles: { default: "minimal", recommended: ["modern", "bento", "editorial"] },
  screens: [
    { id: "dash", label: "Contract command center", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "pipeline", label: "Contract pipeline", icon: "Kanban", kind: "kanban" },
    { id: "repository", label: "Contract repository", icon: "Files", kind: "table" },
    { id: "negotiation", label: "Negotiation room", icon: "MessageCircle", kind: "chat" },
    { id: "playbook", label: "Clause playbook", icon: "BookOpen", kind: "comparison" },
    { id: "clauses", label: "Clause library", icon: "Library", kind: "catalog" },
    { id: "approvals", label: "Approval queue", icon: "CheckCircle2", kind: "queue" },
    { id: "rules", label: "Approval matrix", icon: "Table2", kind: "matrix" },
    { id: "signatures", label: "Signature tracker", icon: "FileSignature", kind: "tracker" },
    { id: "obligations", label: "Obligation tracker", icon: "ListChecks", kind: "checklist" },
    { id: "renewals", label: "Renewal exposure", icon: "Repeat", kind: "heatmap" },
    { id: "cycletime", label: "Cycle-time analytics", icon: "Timer", kind: "analytics" },
  ],
});
