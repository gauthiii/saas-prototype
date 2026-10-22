// src/industries/hotels/manifest.ts — Staylight (Hotels & Resorts property management).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "hotels", label: "Hotels & Resorts", sub: "Reservations · Housekeeping · Revenue · Guests", icon: "Hotel", productName: "Staylight", parent: "travel",
  order: 1,
  styles: { default: "glass", recommended: ["editorial", "liquid-glass", "minimal"] },
  screens: [
    { id: "frontdesk", label: "Front office dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "arrivals", label: "Arrivals & departures", icon: "Luggage", kind: "table" },
    { id: "forecast", label: "Occupancy forecast", icon: "CalendarDays", kind: "heatmap" },
    { id: "housekeeping", label: "Housekeeping board", icon: "Kanban", kind: "kanban" },
    { id: "inspections", label: "Room inspection checklist", icon: "ListChecks", kind: "checklist" },
    { id: "guest", label: "Guest profile", icon: "ContactRound", kind: "detail" },
    { id: "folio", label: "Guest folio", icon: "Receipt", kind: "ledger" },
    { id: "amenities", label: "Spa & dining reservations", icon: "Bath", kind: "booking" },
    { id: "events", label: "Meetings & events calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "rateplans", label: "Rate plan comparison", icon: "Scale", kind: "comparison" },
    { id: "engineering", label: "Engineering requests", icon: "Wrench", kind: "queue" },
    { id: "revpar", label: "RevPAR analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
