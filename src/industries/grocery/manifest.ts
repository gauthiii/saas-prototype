// src/industries/grocery/manifest.ts — Basketful (Grocery & Quick Commerce), sub-category of RetailTech.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "grocery", label: "Grocery & Quick Commerce", sub: "Aisles · Freshness · Dark stores · Delivery slots", icon: "ShoppingBag", productName: "Basketful", parent: "retail",
  order: 2,
  styles: { default: "clay", recommended: ["bento", "colorful", "modern"] },
  screens: [
    { id: "dash", label: "Trading dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "darkstores", label: "Dark store network", icon: "Map", kind: "map" },
    { id: "coldchain", label: "Cold chain monitor", icon: "Thermometer", kind: "monitor" },
    { id: "slots", label: "Delivery slot planner", icon: "CalendarClock", kind: "booking" },
    { id: "orderstream", label: "Live order stream", icon: "Activity", kind: "feed" },
    { id: "waste", label: "Freshness & shrink", icon: "Recycle", kind: "analytics" },
    { id: "markdowns", label: "Markdown approvals", icon: "BadgePercent", kind: "queue" },
    { id: "shelf", label: "Shelf availability", icon: "Layers", kind: "heatmap" },
    { id: "foodsafety", label: "Food safety walk", icon: "ShieldCheck", kind: "checklist" },
    { id: "substitutions", label: "Substitution log", icon: "Repeat", kind: "table" },
    { id: "deliveries", label: "Delivery tracker", icon: "Truck", kind: "tracker" },
    { id: "checkout", label: "Basket conversion", icon: "Funnel", kind: "funnel" },
  ],
});
