// src/industries/broadband/manifest.ts — Fiberline (Broadband & ISP · coverage, installs, outages, billing).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "broadband", label: "Broadband & ISP", sub: "Coverage · Installs · Outages · Billing", icon: "Wifi", productName: "Fiberline",
  parent: "telecom",
  order: 2,
  styles: { default: "minimal", recommended: ["modern", "enterprise", "bento"] },
  screens: [
    { id: "footprint", label: "Footprint overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "coverage", label: "Serviceability map", icon: "Map", kind: "map" },
    { id: "presales", label: "Pre-sign to live funnel", icon: "Funnel", kind: "funnel" },
    { id: "neworder", label: "Service order intake", icon: "FileSignature", kind: "form" },
    { id: "installs", label: "Install calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "installcheck", label: "Install completion checklist", icon: "ListChecks", kind: "checklist" },
    { id: "buildout", label: "Build-out board", icon: "Construction", kind: "kanban" },
    { id: "takerate", label: "Take-rate heatmap", icon: "Target", kind: "heatmap" },
    { id: "outages", label: "Outage timeline", icon: "History", kind: "timeline" },
    { id: "telemetry", label: "OLT & ONT telemetry", icon: "Router", kind: "monitor" },
    { id: "tiers", label: "Speed tier comparison", icon: "Gauge", kind: "comparison" },
    { id: "statements", label: "Subscriber billing ledger", icon: "Receipt", kind: "ledger" },
  ],
});
