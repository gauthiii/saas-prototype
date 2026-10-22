// src/industries/noc/manifest.ts — Backbone (Network Operations · alarms, capacity, tickets, maintenance windows).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "noc", label: "Network Operations", sub: "Alarms · Capacity · Tickets · Maintenance windows", icon: "Network", productName: "Backbone",
  parent: "telecom",
  order: 3,
  styles: { default: "cyber", recommended: ["pro-dark", "enterprise", "glass"] },
  screens: [
    { id: "overview", label: "NOC overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "alarms", label: "Live alarm stream", icon: "Siren", kind: "feed" },
    { id: "links", label: "Backbone link monitor", icon: "Activity", kind: "monitor" },
    { id: "pops", label: "POP & site map", icon: "MapPin", kind: "map" },
    { id: "capacity", label: "Capacity heatmap", icon: "Gauge", kind: "heatmap" },
    { id: "incidents", label: "Major incident timeline", icon: "History", kind: "timeline" },
    { id: "tickets", label: "Ticket board", icon: "Kanban", kind: "kanban" },
    { id: "windows", label: "Maintenance windows", icon: "CalendarClock", kind: "calendar" },
    { id: "cab", label: "Change approvals (CAB)", icon: "Inbox", kind: "queue" },
    { id: "runbook", label: "Fiber cut runbook", icon: "ListChecks", kind: "checklist" },
    { id: "escalation", label: "Escalation matrix", icon: "BellRing", kind: "matrix" },
    { id: "vendorsla", label: "Circuit & vendor SLA scorecard", icon: "Award", kind: "scorecard" },
  ],
});
