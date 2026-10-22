// src/industries/nft/manifest.ts — Mintworks (NFT & Digital Collectibles · drops, collections, royalties, community).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "nft", label: "NFT & Digital Collectibles", sub: "Drops · Collections · Royalties · Community", icon: "Gem", productName: "Mintworks",
  parent: "crypto",
  order: 3,
  styles: { default: "retro", recommended: ["colorful", "bento", "aurora"] },
  screens: [
    { id: "studio", label: "Creator studio overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "collections", label: "Collections gallery", icon: "Image", kind: "catalog" },
    { id: "dropcal", label: "Drop calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "mintfunnel", label: "Mint conversion funnel", icon: "Funnel", kind: "funnel" },
    { id: "launchslots", label: "Launch placement booking", icon: "Ticket", kind: "booking" },
    { id: "royalties", label: "Royalty ledger", icon: "HandCoins", kind: "ledger" },
    { id: "rarity", label: "Trait rarity heatmap", icon: "Sparkles", kind: "heatmap" },
    { id: "holders", label: "Holder directory", icon: "Users", kind: "table" },
    { id: "community", label: "Holder community chat", icon: "MessagesSquare", kind: "chat" },
    { id: "assets", label: "Reveal & media library", icon: "Film", kind: "media" },
    { id: "production", label: "Drop production board", icon: "Kanban", kind: "kanban" },
    { id: "market", label: "Secondary market analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
