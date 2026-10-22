// src/industries/nuclear/manifest.ts — Atria (Nuclear Energy), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "nuclear", label: "Nuclear Energy", sub: "Reactors \u00b7 Fuel \u00b7 Safety \u00b7 NRC", icon: "Atom", productName: "Atria", parent: "energy",
  order: 3,
  styles: { default: "enterprise", recommended: ["clinical", "pro-dark", "minimal"] },
  bespoke: {
    module: "energy-nuclear", prefix: "Nuclear",
    appViews: [
      { id: "dash", label: "Reactor control room", icon: "LayoutDashboard", comp: "ReactorDashboard" },
      { id: "units", label: "Reactor units", icon: "Atom", comp: "ReactorUnitsScreen" },
      { id: "fuel", label: "Fuel cycle", icon: "Container", comp: "FuelCycleScreen" },
      { id: "safety", label: "Safety systems", icon: "ShieldCheck", comp: "SafetySystemsScreen" },
      { id: "radiation", label: "Radiation & dose", icon: "Radiation", comp: "RadiationScreen" },
      { id: "outage", label: "Outage & refueling", icon: "Wrench", comp: "OutageScreen" },
      { id: "regulatory", label: "Regulatory & licensing", icon: "FileText", comp: "RegulatoryScreen" },
      { id: "grid", label: "Grid dispatch & output", icon: "Zap", comp: "GridOutputScreen" },
    ],
  },
  screens: [
    { id: "rop", label: "ROP performance indicators", icon: "Award", kind: "scorecard" },
    { id: "cap", label: "Corrective action tracker", icon: "Route", kind: "tracker" },
    { id: "shiftlog", label: "Control room narrative log", icon: "NotebookPen", kind: "timeline" },
    { id: "surveillance", label: "Surveillance test schedule", icon: "CalendarClock", kind: "calendar" },
  ],
});
