// src/industries/tours/manifest.ts — Wanderly (Tours & Experiences operator platform).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "tours", label: "Tours & Experiences", sub: "Activities · Guides · Bookings · Reviews", icon: "Compass", productName: "Wanderly", parent: "travel",
  order: 3,
  styles: { default: "colorful", recommended: ["clay", "bento", "aurora"] },
  screens: [
    { id: "today", label: "Operator dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "experiences", label: "Experience catalogue", icon: "Compass", kind: "catalog" },
    { id: "book", label: "Book an experience", icon: "Ticket", kind: "booking" },
    { id: "manifests", label: "Departure manifests", icon: "ClipboardList", kind: "table" },
    { id: "guides", label: "Guide schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "meetpoints", label: "Meeting points map", icon: "MapPin", kind: "map" },
    { id: "safety", label: "Safety & waiver checklist", icon: "ShieldCheck", kind: "checklist" },
    { id: "newtour", label: "New experience wizard", icon: "Wand2", kind: "wizard" },
    { id: "channels", label: "OTA channel funnel", icon: "Funnel", kind: "funnel" },
    { id: "reviews", label: "Review stream", icon: "Star", kind: "timeline" },
    { id: "guidescores", label: "Guide scorecards", icon: "Trophy", kind: "scorecard" },
    { id: "gallery", label: "Photo & video library", icon: "Camera", kind: "media" },
  ],
});
