// src/industries/rideshare/manifest.ts — Hailway (Ride-hailing & Fleet), sub-category of Automotive & Mobility.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "rideshare", label: "Ride-hailing & Fleet", sub: "Trips · Drivers · Dispatch · Safety", icon: "Navigation", productName: "Hailway", parent: "mobility",
  order: 3,
  styles: { default: "pro-dark", recommended: ["cyber", "modern", "bento"] },
  screens: [
    { id: "pulse", label: "Marketplace pulse", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "dispatch", label: "Live dispatch map", icon: "Navigation", kind: "map" },
    { id: "trips", label: "Trip log", icon: "Route", kind: "table" },
    { id: "demand", label: "Demand & surge heatmap", icon: "Flame", kind: "heatmap" },
    { id: "driverapply", label: "Driver onboarding", icon: "UserPlus", kind: "wizard" },
    { id: "docreview", label: "Driver document review", icon: "IdCard", kind: "queue" },
    { id: "incidents", label: "Safety incident tracker", icon: "ShieldAlert", kind: "tracker" },
    { id: "ridersupport", label: "Rider support", icon: "Headset", kind: "chat" },
    { id: "driverquality", label: "Driver quality scores", icon: "Star", kind: "scorecard" },
    { id: "payouts", label: "Driver payouts", icon: "Wallet", kind: "ledger" },
    { id: "tripevents", label: "Trip event stream", icon: "Activity", kind: "feed" },
    { id: "fleetshifts", label: "Fleet vehicle shifts", icon: "CalendarClock", kind: "calendar" },
  ],
});
