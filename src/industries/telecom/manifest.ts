// src/industries/telecom/manifest.ts — Signalwave (Telecom · converged operator BSS/OSS platform).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "telecom", label: "Telecom", sub: "Subscribers · Network · Plans · Field ops", icon: "RadioTower", productName: "Signalwave",
  order: 18,
  styles: { default: "modern", recommended: ["enterprise", "pro-dark", "bento"] },
  screens: [
    { id: "ops", label: "Operator command center", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "subscribers", label: "Subscriber base", icon: "Users", kind: "table" },
    { id: "orders", label: "Order-to-activate board", icon: "Kanban", kind: "kanban" },
    { id: "network", label: "Network health map", icon: "Map", kind: "map" },
    { id: "acquisition", label: "Acquisition funnel", icon: "Funnel", kind: "funnel" },
    { id: "fieldops", label: "Field ops schedule", icon: "CalendarClock", kind: "calendar" },
    { id: "plans", label: "Product & plan catalog", icon: "Tags", kind: "catalog" },
    { id: "assurance", label: "Revenue assurance ledger", icon: "Receipt", kind: "ledger" },
    { id: "account", label: "Enterprise account", icon: "Building2", kind: "detail" },
    { id: "troubles", label: "Trouble ticket tracker", icon: "Route", kind: "tracker" },
    { id: "adjustments", label: "Billing adjustment queue", icon: "Inbox", kind: "queue" },
    { id: "arpu", label: "ARPU & churn analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
