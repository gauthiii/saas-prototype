// src/industries/defi/manifest.ts — Vaultkey (DeFi & Wallets · vaults, swaps, staking, governance).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "defi", label: "DeFi & Wallets", sub: "Vaults · Swaps · Staking · Governance", icon: "Wallet", productName: "Vaultkey",
  parent: "crypto",
  order: 2,
  styles: { default: "liquid-glass", recommended: ["aurora", "glass", "pro-dark"] },
  screens: [
    { id: "treasury", label: "Treasury portfolio", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "vaults", label: "Vault strategies", icon: "Vault", kind: "catalog" },
    { id: "swap", label: "Swap & bridge ticket", icon: "ArrowLeftRight", kind: "form" },
    { id: "signing", label: "Multisig signing queue", icon: "KeyRound", kind: "queue" },
    { id: "validators", label: "Validator scorecard", icon: "BadgeCheck", kind: "scorecard" },
    { id: "proposals", label: "Governance proposals", icon: "Vote", kind: "kanban" },
    { id: "history", label: "On-chain transaction history", icon: "Receipt", kind: "ledger" },
    { id: "risk", label: "Protocol risk monitor", icon: "Gauge", kind: "monitor" },
    { id: "allowances", label: "Token approvals", icon: "Unlock", kind: "table" },
    { id: "activity", label: "Wallet activity stream", icon: "Blocks", kind: "feed" },
    { id: "hardening", label: "Wallet security checklist", icon: "ShieldCheck", kind: "checklist" },
    { id: "smartaccount", label: "Smart account setup", icon: "Wand2", kind: "wizard" },
  ],
});
