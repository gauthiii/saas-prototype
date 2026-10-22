// src/industries/publishing/manifest.ts — Inkwell (News & Publishing), sub-category of Media & Streaming.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "publishing", label: "News & Publishing", sub: "Newsroom · Editions · Subscriptions · Ads", icon: "Newspaper", productName: "Inkwell", parent: "media",
  order: 3,
  styles: { default: "editorial", recommended: ["minimal", "modern", "enterprise"] },
  screens: [
    { id: "desk", label: "Newsroom desk", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "budget", label: "Story budget", icon: "Kanban", kind: "kanban" },
    { id: "wire", label: "Wire & breaking alerts", icon: "RadioTower", kind: "feed" },
    { id: "editions", label: "Edition planner", icon: "CalendarClock", kind: "calendar" },
    { id: "copydesk", label: "Copy desk queue", icon: "PenTool", kind: "queue" },
    { id: "corrections", label: "Corrections log", icon: "History", kind: "timeline" },
    { id: "paywall", label: "Subscription funnel", icon: "Funnel", kind: "funnel" },
    { id: "subscribers", label: "Subscriber directory", icon: "Users", kind: "table" },
    { id: "adbook", label: "Ad booking", icon: "Megaphone", kind: "booking" },
    { id: "performance", label: "Story performance", icon: "BarChart3", kind: "analytics" },
    { id: "permissions", label: "Desk permissions", icon: "LockKeyhole", kind: "matrix" },
    { id: "prepub", label: "Pre-publication legal check", icon: "Gavel", kind: "checklist" },
  ],
});
