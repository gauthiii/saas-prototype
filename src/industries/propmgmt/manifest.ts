// src/industries/propmgmt/manifest.ts — Doorstep (Property Management), sub-category of Real Estate.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "propmgmt", label: "Property Management", sub: "Rent · Maintenance · Owners · Inspections", icon: "Key", productName: "Doorstep", parent: "realestate",
  order: 3,
  styles: { default: "bento", recommended: ["modern", "clay", "minimal"] },
  screens: [
    { id: "ops", label: "Operations dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "dispatch", label: "Vendor dispatch map", icon: "MapPin", kind: "map" },
    { id: "workorders", label: "Work order board", icon: "Wrench", kind: "kanban" },
    { id: "moveout", label: "Move-out inspection", icon: "ClipboardList", kind: "checklist" },
    { id: "rentledger", label: "Rent & fees ledger", icon: "Receipt", kind: "ledger" },
    { id: "delinquency", label: "Delinquency tracker", icon: "Route", kind: "tracker" },
    { id: "owner", label: "Owner profile", icon: "Contact", kind: "detail" },
    { id: "screening", label: "Applicant screening", icon: "UserCheck", kind: "scorecard" },
    { id: "occupancy", label: "Occupancy heatmap", icon: "Building", kind: "heatmap" },
    { id: "sensors", label: "Smart home monitor", icon: "Thermometer", kind: "monitor" },
    { id: "residents", label: "Resident messages", icon: "MessagesSquare", kind: "chat" },
    { id: "renewals", label: "Renewal funnel", icon: "Funnel", kind: "funnel" },
  ],
});
