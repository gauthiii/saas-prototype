// src/industries/delivery/manifest.ts — Dashbowl (Food Delivery), sub-category of Food & Restaurant.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "delivery", label: "Food Delivery", sub: "Orders · Couriers · Restaurants · ETAs", icon: "Pizza", productName: "Dashbowl", parent: "food",
  order: 2,
  styles: { default: "brutalism", recommended: ["colorful", "cyber", "modern"] },
  screens: [
    { id: "live", label: "Live marketplace", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "dispatch", label: "Courier dispatch map", icon: "Navigation", kind: "map" },
    { id: "orders", label: "Order tracker", icon: "PackageSearch", kind: "tracker" },
    { id: "events", label: "Order event stream", icon: "Activity", kind: "feed" },
    { id: "surge", label: "Zone demand heatmap", icon: "Flame", kind: "heatmap" },
    { id: "couriers", label: "Courier roster", icon: "Bike", kind: "table" },
    { id: "partners", label: "Restaurant partner scores", icon: "Store", kind: "scorecard" },
    { id: "onboard", label: "Restaurant onboarding", icon: "UserPlus", kind: "wizard" },
    { id: "checkout", label: "Checkout funnel", icon: "Funnel", kind: "funnel" },
    { id: "care", label: "Customer care chat", icon: "Headset", kind: "chat" },
    { id: "refunds", label: "Refund & credit queue", icon: "Undo2", kind: "queue" },
    { id: "payouts", label: "Payout ledger", icon: "Wallet", kind: "ledger" },
  ],
});
