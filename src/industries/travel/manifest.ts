// src/industries/travel/manifest.ts — Waypoint (Travel & Hospitality group platform).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "travel", label: "Travel & Hospitality", sub: "Bookings · Guests · Revenue · Operations", icon: "PlaneTakeoff", productName: "Waypoint",
  order: 12,
  styles: { default: "liquid-glass", recommended: ["aurora", "editorial", "bento"] },
  screens: [
    { id: "dash", label: "Group performance", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "bookings", label: "Booking ledger", icon: "Table2", kind: "table" },
    { id: "demand", label: "Destination demand map", icon: "Map", kind: "map" },
    { id: "conversion", label: "Search-to-book funnel", icon: "Funnel", kind: "funnel" },
    { id: "inventory", label: "Supply catalogue", icon: "Hotel", kind: "catalog" },
    { id: "disruptions", label: "Trip disruption tracker", icon: "Route", kind: "tracker" },
    { id: "concierge", label: "Traveller concierge", icon: "MessagesSquare", kind: "chat" },
    { id: "parity", label: "Rate parity monitor", icon: "Gauge", kind: "monitor" },
    { id: "refunds", label: "Refund approvals", icon: "Receipt", kind: "queue" },
    { id: "suppliers", label: "Supplier scorecards", icon: "Award", kind: "scorecard" },
    { id: "payouts", label: "Supplier payouts", icon: "Wallet", kind: "ledger" },
    { id: "revenue", label: "Revenue analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
