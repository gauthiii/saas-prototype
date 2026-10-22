// src/industries/renewable/manifest.ts — Sunhive (Renewable Energy), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "renewable", label: "Renewable Energy", sub: "Rooftop Solar \u00b7 Storage \u00b7 VPP", icon: "Sun", productName: "Sunhive", parent: "energy",
  order: 2,
  styles: { default: "glass", recommended: ["aurora", "colorful", "modern"] },
  bespoke: {
    module: "energy-renewable", prefix: "Renewable",
    appViews: [
      { id: "dash", label: "Fleet dashboard", icon: "LayoutDashboard", comp: "FleetDashboard" },
      { id: "pipeline", label: "Installation pipeline", icon: "Home", comp: "InstallPipelineScreen" },
      { id: "vpp", label: "Virtual power plant", icon: "Zap", comp: "VPPScreen" },
      { id: "homeenergy", label: "Home battery & EV", icon: "BatteryCharging", comp: "HomeEnergyScreen" },
      { id: "billing", label: "Net metering & billing", icon: "Receipt", comp: "BillingScreen" },
      { id: "subscribers", label: "Subscribers", icon: "Users", comp: "SubscribersScreen" },
      { id: "service", label: "Field service", icon: "Wrench", comp: "FieldServiceScreen" },
      { id: "impact", label: "Carbon & savings", icon: "Leaf", comp: "ImpactScreen" },
    ],
  },
  screens: [
    { id: "quote", label: "Proposal comparison", icon: "Scale", kind: "comparison" },
    { id: "survey", label: "Book a site survey", icon: "CalendarCheck", kind: "booking" },
    { id: "crews", label: "Install crew schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "hosting", label: "Hosting capacity map", icon: "Map", kind: "map" },
  ],
});
