// src/industries/logistics/manifest.ts — Cargonaut (Logistics & Supply Chain).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "logistics", label: "Logistics & Supply Chain", sub: "Shipments · Fleet · Warehouses · Visibility", icon: "Truck", productName: "Cargonaut",
  order: 9,
  styles: { default: "enterprise", recommended: ["pro-dark", "modern", "bento"] },
  screens: [
    { id: "tower", label: "Control tower", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "shipments", label: "Shipment tracker", icon: "Container", kind: "tracker" },
    { id: "network", label: "Network map", icon: "Globe", kind: "map" },
    { id: "exceptions", label: "Exception queue", icon: "AlertTriangle", kind: "queue" },
    { id: "events", label: "Milestone stream", icon: "Activity", kind: "feed" },
    { id: "pos", label: "Purchase orders", icon: "ClipboardList", kind: "table" },
    { id: "inventory", label: "Days-of-supply heatmap", icon: "Warehouse", kind: "heatmap" },
    { id: "carriers", label: "Carrier scorecards", icon: "Award", kind: "scorecard" },
    { id: "quotes", label: "Mode & rate comparison", icon: "Scale", kind: "comparison" },
    { id: "book", label: "Book a shipment", icon: "Ship", kind: "wizard" },
    { id: "customs", label: "Customs readiness", icon: "Stamp", kind: "checklist" },
    { id: "carbon", label: "Cost & carbon analytics", icon: "Leaf", kind: "analytics" },
  ],
});
