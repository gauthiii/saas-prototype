// src/industries/lastmile/manifest.ts — Dropline (Last-Mile Delivery), sub-category of Logistics.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "lastmile", label: "Last-Mile Delivery", sub: "Routes · Drivers · Proof of delivery", icon: "PackageCheck", productName: "Dropline", parent: "logistics",
  order: 3,
  styles: { default: "colorful", recommended: ["modern", "liquid-glass", "clay"] },
  screens: [
    { id: "today", label: "Delivery day", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "routes", label: "Live route map", icon: "MapPin", kind: "map" },
    { id: "orders", label: "Order tracker", icon: "PackageSearch", kind: "tracker" },
    { id: "podfeed", label: "Proof-of-delivery feed", icon: "Camera", kind: "feed" },
    { id: "planner", label: "Route planner", icon: "Route", kind: "wizard" },
    { id: "drivers", label: "Driver roster", icon: "Users", kind: "table" },
    { id: "demand", label: "Slot demand heatmap", icon: "Clock", kind: "heatmap" },
    { id: "failed", label: "Failed delivery queue", icon: "Undo2", kind: "queue" },
    { id: "recipients", label: "Recipient chat", icon: "MessageCircle", kind: "chat" },
    { id: "zones", label: "Service zone rules", icon: "Map", kind: "matrix" },
    { id: "fleetmix", label: "Fleet model comparison", icon: "Scale", kind: "comparison" },
    { id: "performance", label: "Delivery analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
