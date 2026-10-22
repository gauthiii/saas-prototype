// src/industries/highered/manifest.ts — Quadrangle (Higher Education), admissions, academics, advising and research under LearnLab.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "highered", label: "Higher Education", sub: "Admissions · Courses · Advising · Research", icon: "Library", productName: "Quadrangle", parent: "edtech",
  order: 2,
  styles: { default: "editorial", recommended: ["minimal", "enterprise", "modern"] },
  screens: [
    { id: "provost", label: "Provost dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "admissions", label: "Admissions funnel", icon: "Funnel", kind: "funnel" },
    { id: "review", label: "Application review", icon: "ClipboardList", kind: "queue" },
    { id: "courses", label: "Course sections", icon: "BookOpen", kind: "catalog" },
    { id: "audit", label: "Degree audit", icon: "CheckCircle2", kind: "checklist" },
    { id: "advising", label: "Advising appointments", icon: "CalendarCheck", kind: "booking" },
    { id: "grants", label: "Grant proposals", icon: "Kanban", kind: "kanban" },
    { id: "bursar", label: "Student account", icon: "Wallet", kind: "ledger" },
    { id: "campus", label: "Campus space map", icon: "Map", kind: "map" },
    { id: "faculty", label: "Faculty profile", icon: "IdCard", kind: "detail" },
    { id: "retention", label: "Retention analytics", icon: "ChartLine", kind: "analytics" },
    { id: "programs", label: "Graduate program comparison", icon: "Scale", kind: "comparison" },
  ],
});
