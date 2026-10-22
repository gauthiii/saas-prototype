// src/industries/carrier/manifest.ts — Nimbus Mobile (Mobile Carrier · plans, devices, porting, retail).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "carrier", label: "Mobile Carrier", sub: "Plans · Devices · Porting · Retail stores", icon: "Smartphone", productName: "Nimbus Mobile",
  parent: "telecom",
  order: 1,
  styles: { default: "colorful", recommended: ["modern", "bento", "liquid-glass"] },
  screens: [
    { id: "pulse", label: "Wireless pulse", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "lineup", label: "Plan lineup", icon: "Scale", kind: "comparison" },
    { id: "devices", label: "Device shelf", icon: "Smartphone", kind: "catalog" },
    { id: "switchers", label: "Switcher funnel", icon: "Funnel", kind: "funnel" },
    { id: "ports", label: "Port-in tracker", icon: "ArrowLeftRight", kind: "tracker" },
    { id: "activate", label: "New line activation", icon: "Wand2", kind: "wizard" },
    { id: "stores", label: "Retail store map", icon: "MapPin", kind: "map" },
    { id: "appointments", label: "Store appointments", icon: "CalendarCheck", kind: "booking" },
    { id: "storeranks", label: "Store scorecard", icon: "Award", kind: "scorecard" },
    { id: "tradeins", label: "Trade-in approvals", icon: "Repeat", kind: "queue" },
    { id: "care", label: "Care chat", icon: "MessagesSquare", kind: "chat" },
    { id: "roaming", label: "Roaming heatmap", icon: "Globe", kind: "heatmap" },
  ],
});
