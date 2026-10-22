// src/industries/airlines/manifest.ts — Jetstream (Airline operations control).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "airlines", label: "Airlines", sub: "Flights · Crew · Ops control · Loyalty", icon: "Plane", productName: "Jetstream", parent: "travel",
  order: 2,
  styles: { default: "enterprise", recommended: ["pro-dark", "cyber", "modern"] },
  screens: [
    { id: "occ", label: "Ops control dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "network", label: "Live network map", icon: "Globe", kind: "map" },
    { id: "flightwatch", label: "Flight watch feed", icon: "RadioTower", kind: "feed" },
    { id: "fleet", label: "Fleet health monitor", icon: "Gauge", kind: "monitor" },
    { id: "turns", label: "Turnaround board", icon: "Kanban", kind: "kanban" },
    { id: "predeparture", label: "Pre-departure checklist", icon: "ClipboardList", kind: "checklist" },
    { id: "crewload", label: "Crew duty heatmap", icon: "Users", kind: "heatmap" },
    { id: "training", label: "Simulator schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "irops", label: "IROPS recovery tracker", icon: "Route", kind: "tracker" },
    { id: "delays", label: "Delay code log", icon: "Clock", kind: "table" },
    { id: "loyalty", label: "Loyalty tier comparison", icon: "Award", kind: "comparison" },
    { id: "otp", label: "On-time performance", icon: "BarChart3", kind: "analytics" },
  ],
});
