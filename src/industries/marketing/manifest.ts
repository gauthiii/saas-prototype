// src/industries/marketing/manifest.ts — Growthdesk (Marketing & CRM), all-in-one marketing + revenue platform.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "marketing", label: "Marketing & CRM", sub: "Campaigns · Pipeline · Audiences · Attribution", icon: "Megaphone", productName: "Growthdesk",
  order: 23,
  styles: { default: "colorful", recommended: ["modern", "bento", "aurora"] },
  screens: [
    { id: "dash", label: "Revenue command center", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "campaigns", label: "Campaign board", icon: "Kanban", kind: "kanban" },
    { id: "audiences", label: "Audience segments", icon: "UsersRound", kind: "table" },
    { id: "pipeline", label: "Marketing-sourced pipeline", icon: "Funnel", kind: "funnel" },
    { id: "attribution", label: "Multi-touch attribution", icon: "ChartPie", kind: "analytics" },
    { id: "channels", label: "Channel ROAS heatmap", icon: "Activity", kind: "heatmap" },
    { id: "scenarios", label: "Media plan scenarios", icon: "Scale", kind: "comparison" },
    { id: "budget", label: "Budget & spend ledger", icon: "Wallet", kind: "ledger" },
    { id: "handoff", label: "MQL handoff queue", icon: "Handshake", kind: "queue" },
    { id: "launch", label: "Campaign launch wizard", icon: "Rocket", kind: "wizard" },
    { id: "live", label: "Live engagement stream", icon: "Radio", kind: "feed" },
    { id: "account", label: "Target account profile", icon: "Building2", kind: "detail" },
  ],
});
