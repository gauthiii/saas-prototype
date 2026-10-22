// src/industries/healthins/manifest.ts — Carewell (Health Insurance · members, providers, claims, prior auth).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "healthins", label: "Health Insurance", sub: "Members · Providers · Claims · Prior auth", icon: "HeartPulse", productName: "Carewell",
  parent: "insurance",
  order: 2,
  styles: { default: "clinical", recommended: ["minimal", "enterprise", "glass"] },
  screens: [
    { id: "plan", label: "Plan performance", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "members", label: "Member roster", icon: "Users", kind: "table" },
    { id: "priorauth", label: "Prior auth queue", icon: "Stamp", kind: "queue" },
    { id: "claimspay", label: "Claims payment ledger", icon: "Receipt", kind: "ledger" },
    { id: "network", label: "Provider network map", icon: "MapPin", kind: "map" },
    { id: "quality", label: "Provider quality scores", icon: "Award", kind: "scorecard" },
    { id: "caremgmt", label: "Care management board", icon: "Kanban", kind: "kanban" },
    { id: "utilization", label: "Utilization heatmap", icon: "ChartBar", kind: "heatmap" },
    { id: "member360", label: "Member 360", icon: "IdCard", kind: "detail" },
    { id: "enroll", label: "Open enrollment", icon: "UserPlus", kind: "wizard" },
    { id: "plans", label: "Plan comparison", icon: "Scale", kind: "comparison" },
    { id: "memberchat", label: "Member services chat", icon: "MessagesSquare", kind: "chat" },
  ],
});
