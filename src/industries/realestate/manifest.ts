// src/industries/realestate/manifest.ts — Keystone (Real Estate / PropTech).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "realestate", label: "Real Estate", sub: "Listings · Deals · Leasing · Property ops", icon: "Building", productName: "Keystone",
  order: 8,
  styles: { default: "editorial", recommended: ["liquid-glass", "bento", "minimal"] },
  screens: [
    { id: "dash", label: "Portfolio dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "listings", label: "Listings", icon: "House", kind: "catalog" },
    { id: "market", label: "Market map", icon: "Map", kind: "map" },
    { id: "leads", label: "Lead funnel", icon: "Funnel", kind: "funnel" },
    { id: "deals", label: "Deal pipeline", icon: "Kanban", kind: "kanban" },
    { id: "showings", label: "Showings calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "property", label: "Property profile", icon: "Building2", kind: "detail" },
    { id: "offers", label: "Offer comparison", icon: "Scale", kind: "comparison" },
    { id: "closings", label: "Closing tracker", icon: "Route", kind: "tracker" },
    { id: "tenants", label: "Tenant directory", icon: "Users", kind: "table" },
    { id: "maintenance", label: "Maintenance approvals", icon: "Wrench", kind: "queue" },
    { id: "analytics", label: "Market analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
