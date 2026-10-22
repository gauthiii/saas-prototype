// src/industries/dental/manifest.ts — BrightBite (Dental Clinics · charts, appointments, treatment plans, claims).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "dental", label: "Dental Clinics", sub: "Charts · Appointments · Treatment plans · Claims", icon: "Smile", productName: "BrightBite",
  parent: "health",
  order: 1,
  styles: { default: "clay", recommended: ["modern", "minimal", "bento"] },
  screens: [
    { id: "practice", label: "Practice dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "chairs", label: "Chair schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "chart", label: "Tooth chart & record", icon: "ClipboardList", kind: "detail" },
    { id: "txoptions", label: "Treatment plan options", icon: "Scale", kind: "comparison" },
    { id: "recall", label: "Recall funnel", icon: "Funnel", kind: "funnel" },
    { id: "claims", label: "Dental claims tracker", icon: "Route", kind: "tracker" },
    { id: "operatories", label: "Operatory utilization", icon: "Gauge", kind: "heatmap" },
    { id: "sterilization", label: "Sterilization & opening checks", icon: "ListChecks", kind: "checklist" },
    { id: "labcases", label: "Lab case board", icon: "Kanban", kind: "kanban" },
    { id: "roster", label: "Patient roster", icon: "Users", kind: "table" },
    { id: "production", label: "Production analytics", icon: "BarChart3", kind: "analytics" },
    { id: "supplies", label: "Supply catalog", icon: "Package", kind: "catalog" },
  ],
});
