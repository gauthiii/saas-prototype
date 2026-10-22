// src/industries/media/manifest.ts — Marquee (Media & Streaming): content, audiences, ad sales and rights for a media group.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "media", label: "Media & Streaming", sub: "Content · Audiences · Ads · Rights", icon: "Clapperboard", productName: "Marquee",
  order: 14,
  styles: { default: "aurora", recommended: ["pro-dark", "bento", "glass"] },
  screens: [
    { id: "network", label: "Network command center", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "slate", label: "Content slate", icon: "Clapperboard", kind: "kanban" },
    { id: "audience", label: "Cross-platform audience", icon: "BarChart3", kind: "analytics" },
    { id: "upfronts", label: "Upfront deal funnel", icon: "Funnel", kind: "funnel" },
    { id: "inventory", label: "Ad inventory sell-through", icon: "Activity", kind: "heatmap" },
    { id: "rights", label: "Rights & windows", icon: "Copyright", kind: "table" },
    { id: "clearances", label: "Clearance approvals", icon: "FileCheck", kind: "queue" },
    { id: "playout", label: "Playout monitor", icon: "RadioTower", kind: "monitor" },
    { id: "licensing", label: "Licensing territories", icon: "Globe", kind: "map" },
    { id: "title", label: "Title profile", icon: "Film", kind: "detail" },
    { id: "delivery", label: "Campaign delivery tracker", icon: "Route", kind: "tracker" },
    { id: "carriage", label: "Carriage partner scorecard", icon: "Handshake", kind: "scorecard" },
  ],
});
