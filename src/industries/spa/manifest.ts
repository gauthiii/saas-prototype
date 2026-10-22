// src/industries/spa/manifest.ts — Serene (Spa & wellness treatment operations).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "spa", label: "Spa & Wellness", sub: "Treatments · Therapists · Rooms · Packages", icon: "Flower2", productName: "Serene", parent: "fitness",
  order: 2,
  styles: { default: "neumorphism", recommended: ["minimal", "liquid-glass", "editorial"] },
  screens: [
    { id: "spaday", label: "Spa day dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "menu", label: "Treatment menu", icon: "Sparkles", kind: "catalog" },
    { id: "reserve", label: "Treatment booking", icon: "CalendarCheck", kind: "booking" },
    { id: "rota", label: "Therapist rota", icon: "CalendarClock", kind: "calendar" },
    { id: "rooms", label: "Room occupancy heatmap", icon: "BedDouble", kind: "heatmap" },
    { id: "consult", label: "Guest consultation form", icon: "NotebookPen", kind: "form" },
    { id: "guest", label: "Guest profile", icon: "User", kind: "detail" },
    { id: "packages", label: "Package comparison", icon: "Gift", kind: "comparison" },
    { id: "turnover", label: "Room turnover checklist", icon: "ClipboardList", kind: "checklist" },
    { id: "giftcards", label: "Gift card & package ledger", icon: "WalletCards", kind: "ledger" },
    { id: "desklog", label: "Front desk log", icon: "History", kind: "timeline" },
    { id: "enrol", label: "Spa membership signup", icon: "Wand2", kind: "wizard" },
  ],
});
