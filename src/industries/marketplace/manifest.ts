// src/industries/marketplace/manifest.ts — Bazaar (Online Marketplace), sub-category of RetailTech.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "marketplace", label: "Online Marketplace", sub: "Sellers · Listings · Payouts · Trust & safety", icon: "Store", productName: "Bazaar", parent: "retail",
  order: 3,
  styles: { default: "bento", recommended: ["modern", "colorful", "enterprise"] },
  screens: [
    { id: "dash", label: "Marketplace overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "sellers", label: "Seller directory", icon: "Store", kind: "table" },
    { id: "kyb", label: "Seller onboarding (KYB)", icon: "UserCheck", kind: "wizard" },
    { id: "listings", label: "Listing review", icon: "Tags", kind: "catalog" },
    { id: "moderation", label: "Moderation queue", icon: "ShieldAlert", kind: "queue" },
    { id: "payouts", label: "Seller payouts", icon: "Wallet", kind: "ledger" },
    { id: "claims", label: "Buyer-protection claims", icon: "ShieldCheck", kind: "tracker" },
    { id: "trust", label: "Trust & safety signals", icon: "Activity", kind: "feed" },
    { id: "sellerhealth", label: "Seller health scores", icon: "Gauge", kind: "scorecard" },
    { id: "gating", label: "Category gating rules", icon: "Lock", kind: "matrix" },
    { id: "resolution", label: "Resolution center", icon: "MessagesSquare", kind: "chat" },
    { id: "categories", label: "Category analytics", icon: "ChartPie", kind: "analytics" },
  ],
});
