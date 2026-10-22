// src/industries/fossil/manifest.ts — Vulcan (Fossil Fuel), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "fossil", label: "Fossil Fuel", sub: "Oil \u00b7 Gas \u00b7 Refining \u00b7 Midstream", icon: "Flame", productName: "Vulcan", parent: "energy",
  order: 1,
  styles: { default: "enterprise", recommended: ["pro-dark", "minimal", "modern"] },
  bespoke: {
    module: "energy-fossil", prefix: "Fossil",
    appViews: [
      { id: "dash", label: "Production dashboard", icon: "LayoutDashboard", comp: "ProductionDashboard" },
      { id: "wells", label: "Wells & rigs", icon: "Droplet", comp: "WellsRigsScreen" },
      { id: "refinery", label: "Refinery & processing", icon: "Factory", comp: "RefineryScreen" },
      { id: "trading", label: "Commodity trading", icon: "TrendingUp", comp: "CommodityTradingScreen" },
      { id: "pipelines", label: "Pipelines & logistics", icon: "Truck", comp: "PipelineLogisticsScreen" },
      { id: "emissions", label: "Emissions & flaring", icon: "CloudOff", comp: "EmissionsScreen" },
      { id: "hse", label: "HSE & process safety", icon: "HardHat", comp: "HSEScreen" },
      { id: "reserves", label: "Reserves & economics", icon: "Briefcase", comp: "ReservesScreen" },
    ],
  },
  screens: [
    { id: "wellplan", label: "Well delivery board", icon: "Kanban", kind: "kanban" },
    { id: "afe", label: "AFE approvals", icon: "FileSignature", kind: "queue" },
    { id: "pssr", label: "Coker restart PSSR", icon: "ListChecks", kind: "checklist" },
    { id: "contractors", label: "Contractor safety scorecards", icon: "Award", kind: "scorecard" },
  ],
});
