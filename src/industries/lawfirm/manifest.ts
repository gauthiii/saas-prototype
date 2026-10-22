// src/industries/lawfirm/manifest.ts — Docket (Legal › Law firm practice management).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "lawfirm", label: "Law Firm Practice", sub: "Matters · Time · Billing · Court dates", icon: "Gavel", productName: "Docket",
  parent: "legal",
  order: 1,
  styles: { default: "enterprise", recommended: ["editorial", "minimal", "pro-dark"] },
  screens: [
    { id: "dash", label: "Firm performance", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "intake", label: "New matter intake", icon: "UserPlus", kind: "wizard" },
    { id: "pipeline", label: "New business pipeline", icon: "Kanban", kind: "kanban" },
    { id: "timesheet", label: "Time entry", icon: "Timer", kind: "form" },
    { id: "utilization", label: "Attorney utilization", icon: "Gauge", kind: "heatmap" },
    { id: "court", label: "Court dates", icon: "Gavel", kind: "calendar" },
    { id: "deadlines", label: "Filing deadlines", icon: "ListChecks", kind: "checklist" },
    { id: "matter", label: "Matter file", icon: "FolderOpen", kind: "detail" },
    { id: "prebills", label: "Pre-bill review", icon: "Receipt", kind: "queue" },
    { id: "trust", label: "IOLTA trust ledger", icon: "Vault", kind: "ledger" },
    { id: "realization", label: "WIP & realization", icon: "TrendingUp", kind: "analytics" },
    { id: "portal", label: "Client portal", icon: "MessagesSquare", kind: "chat" },
  ],
});
