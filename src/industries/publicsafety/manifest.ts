// src/industries/publicsafety/manifest.ts — Dispatchly (Public Safety & 911), sub-category of GovTech & Public Sector.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "publicsafety", label: "Public Safety & 911", sub: "Dispatch · Units · Incidents · Records", icon: "Siren", productName: "Dispatchly", parent: "govtech",
  order: 3,
  styles: { default: "pro-dark", recommended: ["enterprise", "cyber", "clinical"] },
  screens: [
    { id: "cadmap", label: "CAD dispatch map", icon: "Map", kind: "map" },
    { id: "unitboard", label: "Unit status board", icon: "Kanban", kind: "kanban" },
    { id: "calltake", label: "911 call-taker intake", icon: "PhoneCall", kind: "form" },
    { id: "cadfeed", label: "Live CAD activity", icon: "Radio", kind: "feed" },
    { id: "incident", label: "Incident record", icon: "FileText", kind: "detail" },
    { id: "chronology", label: "Incident chronology", icon: "History", kind: "timeline" },
    { id: "rms", label: "RMS incident reports", icon: "Table2", kind: "table" },
    { id: "callvolume", label: "Call volume heatmap", icon: "Activity", kind: "heatmap" },
    { id: "response", label: "Response time analytics", icon: "LineChart", kind: "analytics" },
    { id: "qa", label: "Telecommunicator QA", icon: "Award", kind: "scorecard" },
    { id: "training", label: "Training & coverage calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "shiftchange", label: "Shift-change checklist", icon: "ListChecks", kind: "checklist" },
  ],
});
