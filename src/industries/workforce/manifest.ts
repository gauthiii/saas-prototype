// src/industries/workforce/manifest.ts — Rosterly (Workforce Scheduling), sub-category of HRTech.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "workforce", label: "Workforce Scheduling", sub: "Shifts · Time clock · Leave · Labor cost", icon: "CalendarClock", productName: "Rosterly", parent: "hrtech",
  order: 2,
  styles: { default: "colorful", recommended: ["bento", "modern", "clay"] },
  screens: [
    { id: "labor", label: "District labor board", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "rota", label: "Weekly shift schedule", icon: "CalendarDays", kind: "calendar" },
    { id: "coverage", label: "Coverage vs. demand", icon: "Thermometer", kind: "heatmap" },
    { id: "punches", label: "Live time clock", icon: "Clock", kind: "feed" },
    { id: "openshifts", label: "Open shift marketplace", icon: "Ticket", kind: "catalog" },
    { id: "leave", label: "Leave & swap requests", icon: "Inbox", kind: "queue" },
    { id: "timesheets", label: "Timesheet review", icon: "Table2", kind: "table" },
    { id: "stores", label: "Store staffing map", icon: "MapPin", kind: "map" },
    { id: "fairwork", label: "Fair workweek audit", icon: "ShieldCheck", kind: "checklist" },
    { id: "rules", label: "Scheduling rules", icon: "Workflow", kind: "matrix" },
    { id: "storecard", label: "Store labor scorecard", icon: "Trophy", kind: "scorecard" },
    { id: "costs", label: "Labor cost analytics", icon: "AreaChart", kind: "analytics" },
  ],
});
