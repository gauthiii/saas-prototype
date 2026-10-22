// src/industries/dealership/manifest.ts — Showroom (Car Dealerships), sub-category of Automotive & Mobility.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "dealership", label: "Car Dealerships", sub: "Inventory · Leads · F&I · Service", icon: "CarFront", productName: "Showroom", parent: "mobility",
  order: 1,
  styles: { default: "liquid-glass", recommended: ["modern", "editorial", "bento"] },
  screens: [
    { id: "floor", label: "Store performance", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "inventory", label: "Vehicle inventory", icon: "Car", kind: "catalog" },
    { id: "leads", label: "Internet lead funnel", icon: "Funnel", kind: "funnel" },
    { id: "desk", label: "Deal desk board", icon: "Kanban", kind: "kanban" },
    { id: "testdrive", label: "Test-drive booking", icon: "CalendarCheck", kind: "booking" },
    { id: "fimenu", label: "F&I protection menu", icon: "ShieldCheck", kind: "comparison" },
    { id: "appraisal", label: "Trade-in appraisal", icon: "ClipboardList", kind: "form" },
    { id: "servicelane", label: "Service lane schedule", icon: "Wrench", kind: "calendar" },
    { id: "recon", label: "Used-car recon checklist", icon: "ListChecks", kind: "checklist" },
    { id: "floorplan", label: "Floorplan & funding ledger", icon: "Landmark", kind: "ledger" },
    { id: "customers", label: "Customer messages", icon: "MessagesSquare", kind: "chat" },
    { id: "leaderboard", label: "Sales leaderboard", icon: "Trophy", kind: "scorecard" },
  ],
});
