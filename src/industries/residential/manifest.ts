// src/industries/residential/manifest.ts — Homestead (Residential Brokerage), sub-category of Real Estate.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "residential", label: "Residential Brokerage", sub: "Buyers · Sellers · Showings · Offers", icon: "House", productName: "Homestead", parent: "realestate",
  order: 1,
  styles: { default: "minimal", recommended: ["editorial", "liquid-glass", "modern"] },
  screens: [
    { id: "pipeline", label: "Buyer pipeline", icon: "Users", kind: "kanban" },
    { id: "consult", label: "Buyer consultation", icon: "ClipboardList", kind: "wizard" },
    { id: "matches", label: "New-listing matches", icon: "BellRing", kind: "feed" },
    { id: "tours", label: "Tour scheduler", icon: "CalendarCheck", kind: "booking" },
    { id: "offer", label: "Offer writer", icon: "FileSignature", kind: "form" },
    { id: "cma", label: "CMA comp scoring", icon: "Scale", kind: "scorecard" },
    { id: "prep", label: "Listing prep checklist", icon: "ListChecks", kind: "checklist" },
    { id: "traffic", label: "Showing traffic", icon: "Activity", kind: "heatmap" },
    { id: "sellerrpt", label: "Seller activity report", icon: "BarChart3", kind: "analytics" },
    { id: "review", label: "Broker file review", icon: "FileCheck", kind: "queue" },
    { id: "trust", label: "Trust account ledger", icon: "Vault", kind: "ledger" },
    { id: "clients", label: "Client messages", icon: "MessagesSquare", kind: "chat" },
  ],
});
