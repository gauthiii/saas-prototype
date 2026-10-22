// src/industries/food/manifest.ts — Mise (Food & Restaurant), multi-location restaurant group platform.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "food", label: "Food & Restaurant", sub: "Orders · Menus · Kitchens · Delivery", icon: "UtensilsCrossed", productName: "Mise",
  order: 20,
  styles: { default: "colorful", recommended: ["modern", "clay", "bento"] },
  screens: [
    { id: "group", label: "Group performance", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "locations", label: "Location map", icon: "MapPin", kind: "map" },
    { id: "menu", label: "Menu engineering", icon: "BookOpen", kind: "catalog" },
    { id: "rollout", label: "Menu rollout", icon: "Wand2", kind: "wizard" },
    { id: "labor", label: "Labor cost heatmap", icon: "Clock", kind: "heatmap" },
    { id: "gm-scores", label: "Location scorecards", icon: "Trophy", kind: "scorecard" },
    { id: "audits", label: "Food safety audits", icon: "ClipboardList", kind: "checklist" },
    { id: "openings", label: "New opening tracker", icon: "Route", kind: "tracker" },
    { id: "purchasing", label: "Purchase approvals", icon: "ShoppingCart", kind: "queue" },
    { id: "deposits", label: "Deposits & settlements", icon: "Landmark", kind: "ledger" },
    { id: "guests", label: "Guest feedback stream", icon: "MessagesSquare", kind: "feed" },
    { id: "salesmix", label: "Sales mix analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
