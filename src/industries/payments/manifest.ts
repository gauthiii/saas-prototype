// src/industries/payments/manifest.ts — PayLoop (Payments & Wallets), sub-category of FinTech.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "payments", label: "Payments & Wallets", sub: "Checkout · Wallets · Payouts · Disputes", icon: "WalletCards", productName: "PayLoop", parent: "fintech",
  order: 2,
  styles: { default: "colorful", recommended: ["modern", "bento", "aurora"] },
  screens: [
    { id: "overview", label: "Payments overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "checkout", label: "Checkout conversion", icon: "Funnel", kind: "funnel" },
    { id: "transactions", label: "Transaction search", icon: "Receipt", kind: "table" },
    { id: "methods", label: "Payment methods", icon: "WalletCards", kind: "catalog" },
    { id: "auth", label: "Authorization monitor", icon: "Activity", kind: "monitor" },
    { id: "fraud", label: "Fraud review queue", icon: "ShieldAlert", kind: "queue" },
    { id: "disputes", label: "Dispute tracker", icon: "Scale", kind: "tracker" },
    { id: "payouts", label: "Seller payouts", icon: "HandCoins", kind: "ledger" },
    { id: "routing", label: "Routing & risk rules", icon: "Workflow", kind: "matrix" },
    { id: "events", label: "Webhook event stream", icon: "Webhook", kind: "feed" },
    { id: "sellers", label: "Seller onboarding", icon: "UserPlus", kind: "wizard" },
    { id: "insights", label: "Payments analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
