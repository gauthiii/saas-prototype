// src/industries/energy/manifest.ts — Helios (Energy), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "energy", label: "Energy", sub: "Renewables \u00b7 Generation \u00b7 Trading \u00b7 ESG", icon: "Zap", productName: "Helios",
  order: 7,
  styles: { default: "aurora", recommended: ["modern", "enterprise", "pro-dark"] },
  bespoke: {
    module: "energytech", prefix: "Energy",
    appViews: [
      { id: "dash", label: "Generation dashboard", icon: "LayoutDashboard", comp: "HeliosDashboard" },
      { id: "assets", label: "Asset fleet", icon: "Factory", comp: "AssetFleetScreen" },
      { id: "trading", label: "Energy trading & PPAs", icon: "TrendingUp", comp: "EnergyTradingScreen" },
      { id: "storage", label: "Grid & storage", icon: "BatteryCharging", comp: "GridStorageScreen" },
      { id: "sustainability", label: "Sustainability & ESG", icon: "Leaf", comp: "SustainabilityScreen" },
      { id: "carbon", label: "Carbon accounting", icon: "Gauge", comp: "CarbonAccountingScreen" },
      { id: "investors", label: "Investor relations", icon: "Briefcase", comp: "InvestorRelationsScreen" },
      { id: "maintenance", label: "Maintenance & work orders", icon: "Wrench", comp: "MaintenanceScreen" },
      { id: "analytics", label: "Portfolio analytics", icon: "BarChart3", comp: "EnergyAnalyticsScreen" },
    ],
  },
  screens: [
    { id: "sites", label: "Fleet site map", icon: "MapPin", kind: "map" },
    { id: "interconnect", label: "Development & interconnection", icon: "Route", kind: "tracker" },
    { id: "curtailment", label: "Curtailment heatmap", icon: "Target", kind: "heatmap" },
  ],
});
