// src/industries/crypto/manifest.ts — Ledgerline (Crypto & Web3 · institutional custody, trading, compliance).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "crypto", label: "Crypto & Web3", sub: "Wallets · Trading · Custody · Compliance", icon: "Bitcoin", productName: "Ledgerline",
  order: 22,
  styles: { default: "pro-dark", recommended: ["enterprise", "cyber", "minimal"] },
  screens: [
    { id: "desk", label: "Custody overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "wallets", label: "Vault wallet inventory", icon: "Wallet", kind: "table" },
    { id: "withdrawals", label: "Withdrawal approvals", icon: "ShieldCheck", kind: "queue" },
    { id: "policies", label: "Signing policy matrix", icon: "KeyRound", kind: "matrix" },
    { id: "subledger", label: "Client asset ledger", icon: "Receipt", kind: "ledger" },
    { id: "travelrule", label: "Travel Rule transfers", icon: "Route", kind: "tracker" },
    { id: "screening", label: "Wallet screening alerts", icon: "ShieldAlert", kind: "feed" },
    { id: "nodes", label: "MPC node & HSM health", icon: "Server", kind: "monitor" },
    { id: "counterparties", label: "Counterparty risk scores", icon: "Scale", kind: "scorecard" },
    { id: "clientsetup", label: "Institutional onboarding", icon: "UserCheck", kind: "wizard" },
    { id: "ceremony", label: "Key ceremony checklist", icon: "ListChecks", kind: "checklist" },
    { id: "auc", label: "Custody analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
