// src/industries/fitness/manifest.ts — Kinetic (Multi-brand fitness & wellness operator platform).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "fitness", label: "Fitness & Wellness", sub: "Members · Classes · Coaching · Retail", icon: "Dumbbell", productName: "Kinetic",
  order: 21,
  styles: { default: "bento", recommended: ["modern", "colorful", "aurora"] },
  screens: [
    { id: "portfolio", label: "Operator dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "clubs", label: "Club network map", icon: "Map", kind: "map" },
    { id: "joins", label: "Join funnel", icon: "Funnel", kind: "funnel" },
    { id: "members", label: "Member directory", icon: "Users", kind: "table" },
    { id: "checkins", label: "Live check-in feed", icon: "Activity", kind: "feed" },
    { id: "dayparts", label: "Class utilization heatmap", icon: "CalendarClock", kind: "heatmap" },
    { id: "scorecard", label: "Club scorecard", icon: "Award", kind: "scorecard" },
    { id: "tiers", label: "Membership tier comparison", icon: "Scale", kind: "comparison" },
    { id: "launches", label: "New-club launch tracker", icon: "Rocket", kind: "tracker" },
    { id: "retail", label: "Retail & nutrition catalog", icon: "ShoppingBag", kind: "catalog" },
    { id: "revenue", label: "Revenue ledger", icon: "Receipt", kind: "ledger" },
    { id: "insights", label: "Brand analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
