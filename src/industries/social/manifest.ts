// src/industries/social/manifest.ts — Chatterbox (Social Media Management), publishing, engagement and listening.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "social", label: "Social Media Management", sub: "Publishing · Inbox · Listening · Creators", icon: "Hash", productName: "Chatterbox",
  parent: "marketing",
  order: 3,
  styles: { default: "retro", recommended: ["colorful", "clay", "brutalism"] },
  screens: [
    { id: "pulse", label: "Social pulse", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "publishing", label: "Publishing calendar", icon: "CalendarDays", kind: "calendar" },
    { id: "content", label: "Content pipeline", icon: "Kanban", kind: "kanban" },
    { id: "compose", label: "Post composer", icon: "PenTool", kind: "form" },
    { id: "approvals", label: "Post approvals", icon: "CheckCircle2", kind: "queue" },
    { id: "engage", label: "Unified engagement inbox", icon: "MessagesSquare", kind: "chat" },
    { id: "listening", label: "Listening stream", icon: "Radar", kind: "feed" },
    { id: "crisis", label: "Issue response timeline", icon: "Siren", kind: "timeline" },
    { id: "creators", label: "Creator roster", icon: "Star", kind: "scorecard" },
    { id: "assets", label: "Asset library", icon: "Image", kind: "media" },
    { id: "besttimes", label: "Best time to post", icon: "Clock", kind: "heatmap" },
    { id: "performance", label: "Network performance", icon: "BarChart3", kind: "analytics" },
  ],
});
