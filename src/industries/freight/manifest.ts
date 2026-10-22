// src/industries/freight/manifest.ts — Haulway (Freight & Trucking), sub-category of Logistics.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "freight", label: "Freight & Trucking", sub: "Loads · Dispatch · ELD · Settlements", icon: "Route", productName: "Haulway", parent: "logistics",
  order: 1,
  styles: { default: "pro-dark", recommended: ["enterprise", "modern", "cyber"] },
  screens: [
    { id: "ops", label: "Fleet operations", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "loads", label: "Load board", icon: "Package", kind: "table" },
    { id: "dispatch", label: "Dispatch board", icon: "Kanban", kind: "kanban" },
    { id: "fleet", label: "Fleet map", icon: "Navigation", kind: "map" },
    { id: "hos", label: "HOS clocks", icon: "Timer", kind: "monitor" },
    { id: "ratecon", label: "Rate confirmation", icon: "FileSignature", kind: "form" },
    { id: "dvir", label: "Pre-trip DVIR", icon: "ListChecks", kind: "checklist" },
    { id: "messages", label: "Driver messaging", icon: "MessagesSquare", kind: "chat" },
    { id: "driver", label: "Driver profile", icon: "IdCard", kind: "detail" },
    { id: "accessorials", label: "Detention & accessorials", icon: "Clock", kind: "queue" },
    { id: "settlements", label: "Driver settlements", icon: "Wallet", kind: "ledger" },
    { id: "lanes", label: "Lane profitability", icon: "LineChart", kind: "analytics" },
  ],
});
