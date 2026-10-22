// src/industries/email/manifest.ts — Mailwave (Email & Lifecycle), lifecycle email and deliverability platform.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "email", label: "Email & Lifecycle", sub: "Campaigns · Journeys · Segments · Deliverability", icon: "MailOpen", productName: "Mailwave",
  parent: "marketing",
  order: 2,
  styles: { default: "glass", recommended: ["minimal", "liquid-glass", "editorial"] },
  screens: [
    { id: "overview", label: "Send performance", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "journeys", label: "Lifecycle journeys", icon: "Workflow", kind: "tracker" },
    { id: "segments", label: "Segment library", icon: "UsersRound", kind: "table" },
    { id: "templates", label: "Template library", icon: "Palette", kind: "catalog" },
    { id: "composer", label: "Campaign composer", icon: "PenTool", kind: "wizard" },
    { id: "preflight", label: "Pre-send checklist", icon: "ListChecks", kind: "checklist" },
    { id: "abtest", label: "A/B test results", icon: "Scale", kind: "comparison" },
    { id: "sendcal", label: "Send schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "sendtime", label: "Send-time heatmap", icon: "Clock", kind: "heatmap" },
    { id: "deliverability", label: "Deliverability monitor", icon: "ShieldCheck", kind: "monitor" },
    { id: "events", label: "Message event stream", icon: "Activity", kind: "feed" },
    { id: "consent", label: "Consent rules matrix", icon: "LockKeyhole", kind: "matrix" },
  ],
});
