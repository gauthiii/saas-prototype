// src/industries/payroll/manifest.ts — Paycrest (Payroll & Benefits), sub-category of HRTech.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "payroll", label: "Payroll & Benefits", sub: "Pay runs · Taxes · Benefits · Compliance", icon: "HandCoins", productName: "Paycrest", parent: "hrtech",
  order: 1,
  styles: { default: "enterprise", recommended: ["minimal", "modern", "clinical"] },
  screens: [
    { id: "command", label: "Payroll command center", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "close", label: "Pay run close checklist", icon: "ListChecks", kind: "checklist" },
    { id: "payregister", label: "Payroll register", icon: "Table2", kind: "table" },
    { id: "funding", label: "Funding & tax ledger", icon: "Landmark", kind: "ledger" },
    { id: "filings", label: "Tax filing tracker", icon: "FileCheck", kind: "tracker" },
    { id: "adjustments", label: "Off-cycle approvals", icon: "Undo2", kind: "queue" },
    { id: "paydates", label: "Payroll deadlines", icon: "CalendarClock", kind: "calendar" },
    { id: "jurisdictions", label: "Tax jurisdiction map", icon: "Map", kind: "map" },
    { id: "codes", label: "Earning & deduction codes", icon: "Calculator", kind: "matrix" },
    { id: "plans", label: "Medical plan comparison", icon: "Scale", kind: "comparison" },
    { id: "enroll", label: "Benefits enrollment", icon: "HeartPulse", kind: "wizard" },
    { id: "laborcost", label: "Labor cost analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
