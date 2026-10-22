// src/industries/mentalhealth/manifest.ts — Haven (Mental Health · therapists, sessions, assessments, care plans).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "mentalhealth", label: "Mental Health", sub: "Therapists · Sessions · Assessments · Care plans", icon: "Brain", productName: "Haven",
  parent: "health",
  order: 2,
  styles: { default: "aurora", recommended: ["minimal", "glass", "editorial"] },
  screens: [
    { id: "caseload", label: "Practice caseload", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "sessions", label: "Session schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "client", label: "Client care record", icon: "Contact", kind: "detail" },
    { id: "outcomes", label: "Outcome measures", icon: "LineChart", kind: "analytics" },
    { id: "careplan", label: "Care plan goals", icon: "ListChecks", kind: "checklist" },
    { id: "intake", label: "Intake & therapist matching", icon: "UserPlus", kind: "wizard" },
    { id: "messages", label: "Secure messaging", icon: "MessagesSquare", kind: "chat" },
    { id: "referrals", label: "Referral queue", icon: "Inbox", kind: "queue" },
    { id: "booksession", label: "Book a session", icon: "CalendarCheck", kind: "booking" },
    { id: "authorizations", label: "Session authorizations", icon: "Route", kind: "tracker" },
    { id: "notes", label: "Progress notes", icon: "NotebookPen", kind: "table" },
    { id: "library", label: "Wellbeing library", icon: "Library", kind: "media" },
  ],
});
