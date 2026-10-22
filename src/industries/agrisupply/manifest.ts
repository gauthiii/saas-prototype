// src/industries/agrisupply/manifest.ts — Granary (Agri Marketplace), grain and oilseed trading, logistics and settlement.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "agrisupply", label: "Agri Marketplace", sub: "Buyers · Lots · Logistics · Pricing", icon: "Tractor", productName: "Granary", parent: "agritech",
  order: 3,
  styles: { default: "enterprise", recommended: ["pro-dark", "modern", "minimal"] },
  screens: [
    { id: "desk", label: "Trading desk", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "lots", label: "Lot marketplace", icon: "Store", kind: "catalog" },
    { id: "listlot", label: "List a lot", icon: "Wand2", kind: "wizard" },
    { id: "bids", label: "Bid comparison", icon: "Scale", kind: "comparison" },
    { id: "rfqfunnel", label: "RFQ conversion", icon: "Funnel", kind: "funnel" },
    { id: "pricefeed", label: "Live price feed", icon: "Activity", kind: "feed" },
    { id: "demand", label: "Demand heatmap", icon: "Target", kind: "heatmap" },
    { id: "counterparties", label: "Counterparty approvals", icon: "ShieldCheck", kind: "queue" },
    { id: "freight", label: "Freight map", icon: "Truck", kind: "map" },
    { id: "deliveries", label: "Delivery tracker", icon: "Route", kind: "tracker" },
    { id: "settlements", label: "Escrow settlements", icon: "Landmark", kind: "ledger" },
    { id: "buyerscores", label: "Buyer scorecards", icon: "Award", kind: "scorecard" },
  ],
});
