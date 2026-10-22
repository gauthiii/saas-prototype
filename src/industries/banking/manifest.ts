// src/industries/banking/manifest.ts — VaultBank (Banking), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "banking", label: "Banking", sub: "Accounts \u00b7 Transfers \u00b7 Cards \u00b7 Loans", icon: "Banknote", productName: "VaultBank", parent: "fintech",
  order: 1,
  styles: { default: "liquid-glass", recommended: ["modern", "minimal", "glass"] },
  bespoke: {
    module: "banking", prefix: "Banking",
    appViews: [
      { id: "dash", label: "Accounts overview", icon: "LayoutDashboard", comp: "BankingDashboard" },
      { id: "transfers", label: "Transfers", icon: "ArrowLeftRight", comp: "TransferScreen" },
      { id: "billpay", label: "Bill pay", icon: "Receipt", comp: "BillPayScreen" },
      { id: "cards", label: "Cards", icon: "CreditCard", comp: "BankCardsScreen" },
      { id: "deposits", label: "Savings & deposits", icon: "PiggyBank", comp: "DepositsScreen" },
      { id: "loans", label: "Loans & mortgage", icon: "Banknote", comp: "LoansScreen" },
      { id: "payees", label: "Payees", icon: "Users", comp: "BeneficiariesScreen" },
      { id: "statements", label: "Statements", icon: "FileText", comp: "StatementsScreen" },
      { id: "fx", label: "Currency exchange", icon: "Globe", comp: "CurrencyExchangeScreen" },
      { id: "insights", label: "Spending insights", icon: "BarChart3", comp: "SpendingInsightsScreen" },
    ],
  },
  screens: [
    { id: "locator", label: "ATM & branch finder", icon: "MapPin", kind: "map" },
    { id: "appointments", label: "Book a banker", icon: "CalendarCheck", kind: "booking" },
  ],
});
