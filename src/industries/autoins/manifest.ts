// src/industries/autoins/manifest.ts — Roadsure (Auto Insurance · quotes, telematics, claims, repairs).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "autoins", label: "Auto Insurance", sub: "Quotes · Telematics · Claims · Repairs", icon: "CarFront", productName: "Roadsure",
  parent: "insurance",
  order: 1,
  styles: { default: "liquid-glass", recommended: ["modern", "bento", "pro-dark"] },
  screens: [
    { id: "overview", label: "Auto book overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "quotes", label: "Quote-to-bind funnel", icon: "Funnel", kind: "funnel" },
    { id: "telematics", label: "Telematics signals", icon: "Activity", kind: "monitor" },
    { id: "drivers", label: "Driver safety scores", icon: "Gauge", kind: "scorecard" },
    { id: "crashfeed", label: "Crash & FNOL stream", icon: "Siren", kind: "feed" },
    { id: "claimtrack", label: "Claim tracker", icon: "Route", kind: "tracker" },
    { id: "roadside", label: "Tow & roadside dispatch", icon: "Truck", kind: "map" },
    { id: "shops", label: "Repair network", icon: "Wrench", kind: "catalog" },
    { id: "supplements", label: "Estimate supplements", icon: "ClipboardList", kind: "queue" },
    { id: "rental", label: "Rental car booking", icon: "Car", kind: "booking" },
    { id: "coverage", label: "Coverage tiers", icon: "Scale", kind: "comparison" },
    { id: "totalloss", label: "Total loss checklist", icon: "ListChecks", kind: "checklist" },
  ],
});
