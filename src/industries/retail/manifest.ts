// src/industries/retail/manifest.ts — RetailIQ (RetailTech), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "retail", label: "RetailTech", sub: "POS \u00b7 Inventory \u00b7 Orders \u00b7 Loyalty", icon: "ShoppingCart", productName: "RetailIQ",
  order: 6,
  styles: { default: "colorful", recommended: ["bento", "brutalism", "modern"] },
  bespoke: {
    module: "retailtech", prefix: "Retail",
    appViews: [
      { id: "dash", label: "Retail dashboard", icon: "LayoutDashboard", comp: "RetailDashboard" },
      { id: "pos", label: "POS terminal", icon: "CreditCard", comp: "POSTerminal" },
      { id: "inventory", label: "Inventory manager", icon: "Package", comp: "InventoryScreen" },
      { id: "orders", label: "Order center", icon: "Truck", comp: "OrderCenterScreen" },
      { id: "promotions", label: "Promotions", icon: "Percent", comp: "PromotionsScreen" },
      { id: "loyalty", label: "Customer loyalty", icon: "Star", comp: "LoyaltyScreen" },
      { id: "suppliers", label: "Supplier portal", icon: "Building2", comp: "SupplierPortalScreen" },
      { id: "analytics", label: "Store analytics", icon: "BarChart3", comp: "StoreAnalyticsScreen" },
      { id: "catalog", label: "Product catalog", icon: "Tag", comp: "ProductCatalogScreen" },
    ],
  },
  screens: [
    { id: "rota", label: "Staff coverage heatmap", icon: "Users", kind: "heatmap" },
    { id: "storeops", label: "Store opening checklist", icon: "ListChecks", kind: "checklist" },
    { id: "exceptions", label: "POS exceptions queue", icon: "ShieldAlert", kind: "queue" },
  ],
});
