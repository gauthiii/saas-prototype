// src/industries/health/manifest.ts — MedOS (HealthTech), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "health", label: "HealthTech", sub: "EHR \u00b7 ER \u00b7 Scheduling \u00b7 Billing", icon: "HeartPulse", productName: "MedOS",
  order: 2,
  styles: { default: "clinical", recommended: ["minimal", "modern", "neumorphism"] },
  bespoke: {
    module: "healthtech", prefix: "Health",
    appViews: [
      { id: "dash", label: "Clinical dashboard", icon: "LayoutDashboard", comp: "HealthDashboard" },
      { id: "intake", label: "Patient intake form", icon: "ClipboardList", comp: "IntakeForm" },
      { id: "scheduler", label: "Appointment grid", icon: "CalendarDays", comp: "SchedulerScreen" },
      { id: "patients", label: "Patient directory", icon: "Users", comp: "PatientDirectory" },
      { id: "telehealth", label: "Telehealth suite", icon: "Video", comp: "TelehealthScreen" },
      { id: "pharmacy", label: "Pharmacy inventory", icon: "Pill", comp: "PharmacyInventory" },
      { id: "wards", label: "Ward occupancy", icon: "BedDouble", comp: "WardOccupancy" },
      { id: "billing", label: "Medical billing", icon: "Receipt", comp: "MedicalBillingScreen" },
    ],
  },
  screens: [
    { id: "icumonitor", label: "ICU bedside monitors", icon: "Activity", kind: "monitor" },
    { id: "priorauth", label: "Prior authorization queue", icon: "Stamp", kind: "queue" },
    { id: "surgicalsafety", label: "Surgical safety checklist", icon: "ListChecks", kind: "checklist" },
    { id: "quality", label: "Provider quality scorecard", icon: "Award", kind: "scorecard" },
  ],
});
