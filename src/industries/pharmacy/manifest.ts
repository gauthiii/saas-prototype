// src/industries/pharmacy/manifest.ts — RxFlow (Pharmacy · prescriptions, inventory, refills, counseling).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "pharmacy", label: "Pharmacy", sub: "Prescriptions · Inventory · Refills · Counseling", icon: "Pill", productName: "RxFlow",
  parent: "health",
  order: 3,
  styles: { default: "clinical", recommended: ["minimal", "enterprise", "modern"] },
  screens: [
    { id: "rxdash", label: "Pharmacy dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "verify", label: "Pharmacist verification queue", icon: "BadgeCheck", kind: "queue" },
    { id: "fillboard", label: "Fill workflow board", icon: "Kanban", kind: "kanban" },
    { id: "shelf", label: "Shelf stock & formulary", icon: "PackageSearch", kind: "catalog" },
    { id: "coldchain", label: "Cold chain & automation", icon: "Thermometer", kind: "monitor" },
    { id: "refills", label: "Refill tracker", icon: "RefreshCw", kind: "tracker" },
    { id: "clinic", label: "Vaccine & counseling clinic", icon: "Syringe", kind: "calendar" },
    { id: "medprofile", label: "Patient medication profile", icon: "Contact", kind: "detail" },
    { id: "claimsledger", label: "Third-party claims ledger", icon: "Receipt", kind: "ledger" },
    { id: "adherence", label: "Adherence analytics", icon: "LineChart", kind: "analytics" },
    { id: "cschecks", label: "Controlled substance checks", icon: "LockKeyhole", kind: "checklist" },
    { id: "erxfeed", label: "Live e-Rx & claims feed", icon: "Activity", kind: "feed" },
  ],
});
