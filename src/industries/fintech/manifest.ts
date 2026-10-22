// src/industries/fintech/manifest.ts — FinFlow (FinTech), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "fintech", label: "FinTech", sub: "Banking \u00b7 Treasury \u00b7 Compliance", icon: "Landmark", productName: "FinFlow",
  order: 1,
  styles: { default: "modern", recommended: ["enterprise", "pro-dark", "liquid-glass", "minimal"] },
  bespoke: {
    module: "fintech", prefix: "Fintech",
    appViews: [
      { id: "dash", label: "Treasury dashboard", icon: "LayoutDashboard", comp: "FintechDashboard" },
      { id: "payments", label: "Send a payment", icon: "Send", comp: "PaymentsScreen" },
      { id: "cards", label: "Corporate cards", icon: "CreditCard", comp: "CardsScreen" },
      { id: "invoice", label: "New invoice", icon: "FileText", comp: "InvoiceForm" },
      { id: "expenses", label: "Expense approvals", icon: "Receipt", comp: "ExpenseApprovals" },
      { id: "budgets", label: "Budgets", icon: "PiggyBank", comp: "BudgetsScreen" },
      { id: "payroll", label: "Payroll disbursement", icon: "Building2", comp: "PayrollDisbursementScreen" },
      { id: "compliance", label: "Risk & compliance", icon: "Shield", comp: "RiskComplianceScreen" },
      { id: "wealth", label: "Liquidity optimizer", icon: "TrendingUp", comp: "WealthOptimizerScreen" },
      { id: "analytics", label: "Analytics", icon: "BarChart3", comp: "FintechAnalytics" },
    ],
  },
  screens: [
    { id: "recon", label: "Bank reconciliation", icon: "Scale", kind: "ledger" },
    { id: "close", label: "Month-end close", icon: "ListChecks", kind: "checklist" },
  ],
});
