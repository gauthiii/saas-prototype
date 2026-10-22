// src/industries/corporatelearning/manifest.ts — Upskill (Corporate L&D), workforce programs, skills and compliance training under LearnLab.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "corporatelearning", label: "Corporate L&D", sub: "Programs · Skills · Compliance training · Cohorts", icon: "Presentation", productName: "Upskill", parent: "edtech",
  order: 3,
  styles: { default: "bento", recommended: ["modern", "glass", "enterprise"] },
  screens: [
    { id: "academy", label: "Academy overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "library", label: "Program library", icon: "Play", kind: "media" },
    { id: "skills", label: "Skills gap heatmap", icon: "Target", kind: "heatmap" },
    { id: "mandatory", label: "Mandatory training rules", icon: "ShieldCheck", kind: "matrix" },
    { id: "cohorts", label: "Cohort schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "learners", label: "Learner directory", icon: "Users", kind: "table" },
    { id: "requests", label: "Training requests", icon: "Inbox", kind: "queue" },
    { id: "pathways", label: "Career pathway builder", icon: "Workflow", kind: "wizard" },
    { id: "impact", label: "Program impact scorecard", icon: "Award", kind: "scorecard" },
    { id: "budget", label: "L&D budget ledger", icon: "Receipt", kind: "ledger" },
    { id: "activity", label: "Learning activity stream", icon: "Activity", kind: "feed" },
    { id: "certs", label: "Certification tracker", icon: "BadgeCheck", kind: "tracker" },
  ],
});
