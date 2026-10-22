// src/industries/restaurant/manifest.ts — Tableside (Restaurant Ops & POS), sub-category of Food & Restaurant.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "restaurant", label: "Restaurant Ops & POS", sub: "Tables · Orders · Staff · Inventory", icon: "ChefHat", productName: "Tableside", parent: "food",
  order: 1,
  styles: { default: "bento", recommended: ["modern", "clay", "editorial"] },
  screens: [
    { id: "service", label: "Tonight's service", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "floor", label: "Floor plan", icon: "Table2", kind: "map" },
    { id: "tickets", label: "Kitchen ticket rail", icon: "Receipt", kind: "kanban" },
    { id: "book", label: "Reservation book", icon: "CalendarCheck", kind: "booking" },
    { id: "rota", label: "Staff rota", icon: "CalendarClock", kind: "calendar" },
    { id: "covers", label: "Covers heatmap", icon: "Clock", kind: "heatmap" },
    { id: "eighty-six", label: "86 board", icon: "XCircle", kind: "catalog" },
    { id: "stock", label: "Bar & pantry inventory", icon: "Boxes", kind: "table" },
    { id: "linecheck", label: "Pre-service line check", icon: "ListChecks", kind: "checklist" },
    { id: "voids", label: "Voids & comps approvals", icon: "Undo2", kind: "queue" },
    { id: "tips", label: "Tip pool ledger", icon: "HandCoins", kind: "ledger" },
    { id: "servers", label: "Server scorecards", icon: "Award", kind: "scorecard" },
  ],
});
