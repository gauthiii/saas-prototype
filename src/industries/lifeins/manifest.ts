// src/industries/lifeins/manifest.ts — Evergreen Life (Life & Annuities · policies, underwriting, beneficiaries).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "lifeins", label: "Life & Annuities", sub: "Policies · Underwriting · Beneficiaries", icon: "Shield", productName: "Evergreen Life",
  parent: "insurance",
  order: 3,
  styles: { default: "editorial", recommended: ["minimal", "clay", "enterprise"] },
  screens: [
    { id: "inforce", label: "In-force overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "newbiz", label: "New business tracker", icon: "Route", kind: "tracker" },
    { id: "uwdecisions", label: "Underwriting decisions", icon: "FileCheck", kind: "queue" },
    { id: "requirements", label: "Requirements checklist", icon: "ListChecks", kind: "checklist" },
    { id: "exams", label: "Paramed exam schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "shelf", label: "Product shelf", icon: "Layers", kind: "catalog" },
    { id: "illustration", label: "Policy illustration", icon: "Calculator", kind: "form" },
    { id: "beneficiaries", label: "Beneficiary register", icon: "Users", kind: "table" },
    { id: "annuity", label: "Annuity account ledger", icon: "PiggyBank", kind: "ledger" },
    { id: "policyrec", label: "Policy record", icon: "FileText", kind: "detail" },
    { id: "persistency", label: "Persistency analytics", icon: "LineChart", kind: "analytics" },
    { id: "deathclaim", label: "Death claim timeline", icon: "History", kind: "timeline" },
  ],
});
