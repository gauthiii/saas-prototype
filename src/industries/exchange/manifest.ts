// src/industries/exchange/manifest.ts — Orderflow (Crypto Exchange · markets, orders, KYC, liquidity).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "exchange", label: "Crypto Exchange", sub: "Markets · Orders · KYC · Liquidity", icon: "Coins", productName: "Orderflow",
  parent: "crypto",
  order: 1,
  styles: { default: "cyber", recommended: ["pro-dark", "enterprise", "bento"] },
  screens: [
    { id: "markets", label: "Exchange operations", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "pairs", label: "Trading pairs", icon: "ArrowLeftRight", kind: "table" },
    { id: "volume", label: "Pair volume heatmap", icon: "Activity", kind: "heatmap" },
    { id: "engine", label: "Matching engine health", icon: "Cpu", kind: "monitor" },
    { id: "surveillance", label: "Trade surveillance stream", icon: "Radar", kind: "feed" },
    { id: "kycqueue", label: "KYC review queue", icon: "IdCard", kind: "queue" },
    { id: "verification", label: "Verification funnel", icon: "Funnel", kind: "funnel" },
    { id: "makers", label: "Market-maker scorecard", icon: "Target", kind: "scorecard" },
    { id: "listings", label: "Token listing pipeline", icon: "Kanban", kind: "kanban" },
    { id: "feetiers", label: "Fee tier comparison", icon: "Percent", kind: "comparison" },
    { id: "tradersupport", label: "Trader support desk", icon: "MessagesSquare", kind: "chat" },
    { id: "incidents", label: "Market incident log", icon: "History", kind: "timeline" },
  ],
});
