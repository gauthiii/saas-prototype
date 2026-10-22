// src/industries/evcharging/manifest.ts — Voltway (EV Charging), sub-category of Automotive & Mobility.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "evcharging", label: "EV Charging", sub: "Stations · Sessions · Energy · Billing", icon: "EvCharger", productName: "Voltway", parent: "mobility",
  order: 2,
  styles: { default: "glass", recommended: ["modern", "cyber", "minimal"] },
  screens: [
    { id: "network", label: "Network overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "stations", label: "Station map", icon: "MapPin", kind: "map" },
    { id: "chargers", label: "Charger health", icon: "PlugZap", kind: "monitor" },
    { id: "ocpp", label: "OCPP event stream", icon: "Activity", kind: "feed" },
    { id: "repairs", label: "Field repair tracker", icon: "Wrench", kind: "tracker" },
    { id: "siteload", label: "Site load profile", icon: "Zap", kind: "heatmap" },
    { id: "roaming", label: "Roaming access rules", icon: "Network", kind: "matrix" },
    { id: "settlements", label: "Revenue settlements", icon: "Receipt", kind: "ledger" },
    { id: "commission", label: "Site commissioning", icon: "ListChecks", kind: "checklist" },
    { id: "utilization", label: "Utilization analytics", icon: "BarChart3", kind: "analytics" },
    { id: "hosts", label: "Site host directory", icon: "Building2", kind: "table" },
    { id: "tariffs", label: "Tariff plans", icon: "BadgePercent", kind: "comparison" },
  ],
});
