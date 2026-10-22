// src/industries/k12/manifest.ts — Schoolyard (K-12 Schools), school and district operations under LearnLab.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "k12", label: "K-12 Schools", sub: "Classes · Attendance · Gradebook · Families", icon: "School", productName: "Schoolyard", parent: "edtech",
  order: 1,
  styles: { default: "colorful", recommended: ["clay", "bento", "modern"] },
  screens: [
    { id: "office", label: "Principal's office", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "absences", label: "Attendance heatmap", icon: "CalendarDays", kind: "heatmap" },
    { id: "roster", label: "Student roster", icon: "Users", kind: "table" },
    { id: "standards", label: "Standards gradebook", icon: "BookMarked", kind: "scorecard" },
    { id: "bells", label: "Bell schedule", icon: "BellRing", kind: "calendar" },
    { id: "buses", label: "Bus routes", icon: "Bus", kind: "map" },
    { id: "iep", label: "IEP & 504 tracker", icon: "Route", kind: "tracker" },
    { id: "referrals", label: "Behavior referrals", icon: "ShieldAlert", kind: "queue" },
    { id: "families", label: "Family messages", icon: "MessagesSquare", kind: "chat" },
    { id: "enroll", label: "New student enrollment", icon: "UserPlus", kind: "wizard" },
    { id: "drills", label: "Safety drill checklist", icon: "ListChecks", kind: "checklist" },
    { id: "meals", label: "Meal program ledger", icon: "Utensils", kind: "ledger" },
  ],
});
