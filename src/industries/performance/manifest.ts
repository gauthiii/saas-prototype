// src/industries/performance/manifest.ts — Uplift (Performance & Engagement), sub-category of HRTech.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "performance", label: "Performance & Engagement", sub: "Reviews · Goals · Feedback · Surveys", icon: "Target", productName: "Uplift", parent: "hrtech",
  order: 3,
  styles: { default: "clay", recommended: ["colorful", "modern", "aurora"] },
  screens: [
    { id: "pulse", label: "Engagement overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "cycle", label: "Review cycle tracker", icon: "Route", kind: "tracker" },
    { id: "selfreview", label: "Self-review form", icon: "NotebookPen", kind: "form" },
    { id: "calibration", label: "Calibration scorecard", icon: "Scale", kind: "scorecard" },
    { id: "promotions", label: "Promotion nominations", icon: "Award", kind: "queue" },
    { id: "okrs", label: "OKR board", icon: "Target", kind: "kanban" },
    { id: "oneonones", label: "1:1 planner", icon: "CalendarCheck", kind: "calendar" },
    { id: "survey", label: "Survey results heatmap", icon: "Thermometer", kind: "heatmap" },
    { id: "launch", label: "Launch a pulse survey", icon: "Megaphone", kind: "wizard" },
    { id: "growth", label: "Growth profile", icon: "User", kind: "detail" },
    { id: "academy", label: "Manager academy", icon: "GraduationCap", kind: "media" },
    { id: "insights", label: "Engagement analytics", icon: "PieChart", kind: "analytics" },
  ],
});
