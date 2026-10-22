// src/industries/retail/data.ts — RetailIQ extension content (shared pages + archetype extension screens).
// The hand-coded module src/domains/retailtech.tsx owns meta / extra / story. Fictional people, stores and figures.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "Your business", description: "Tell us about your stores so RetailIQ can set up inventory zones and terminals.", fields: [
          { label: "Business name", type: "text", placeholder: "Northbend Markets", half: true },
          { label: "Number of stores", type: "number", placeholder: "3", half: true },
          { label: "What do you sell?", type: "select", options: ["Apparel & footwear", "Home & lifestyle", "Sports & outdoor", "General merchandise"] },
        ] },
        { title: "Connect your channels", description: "Pool stock across stores, your web shop and the app.", fields: [
          { label: "Sell online", type: "toggle", value: "true" },
          { label: "Web shop address", type: "text", placeholder: "shop.northbend.com", half: true },
          { label: "Import products from", type: "radio", options: ["CSV file", "Existing web shop", "Start from scratch"] },
        ] },
        { title: "Set up your POS", description: "Pair terminals and choose how each store takes payments.", fields: [
          { label: "Terminals per store", type: "number", placeholder: "2", half: true },
          { label: "Accept tap-to-pay", type: "toggle", value: "true" },
          { label: "Manager approval for refunds over", type: "currency", placeholder: "$100", half: true },
        ] },
        { title: "Invite your team", description: "Cashiers sign in with a PIN; managers get the full back office.", fields: [
          { label: "Team emails", type: "textarea", placeholder: "one email per line" },
          { label: "Default role", type: "select", options: ["Cashier", "Store manager", "Inventory lead"] },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Owner / Admin", description: "Full control of every store, channel and setting.", permissions: ["Manage stores and terminals", "Approve POs and promotions", "Billing and integrations"] },
        { name: "Store manager", description: "Runs one store's floor, staff and cash.", permissions: ["Approve refunds and overrides", "Edit rota and opening checklists", "Close out cash drawers"] },
        { name: "Cashier", description: "Rings up sales and handles returns at the POS.", permissions: ["Sell and take payments", "Process receipted returns", "Look up loyalty members"] },
        { name: "Inventory lead", description: "Keeps stock accurate across stores and the web shop.", permissions: ["Receive deliveries", "Run cycle counts", "Draft purchase orders"] },
      ],
      members: [
        { name: "Marcus Halloran", email: "marcus@northbend.com", role: "Owner / Admin", status: "Active", lastActive: "Just now" },
        { name: "Tanya Brooks", email: "tanya@northbend.com", role: "Store manager", status: "Active", lastActive: "8 min ago" },
        { name: "Diego Ferreira", email: "diego@northbend.com", role: "Store manager", status: "Active", lastActive: "1 h ago" },
        { name: "Hana Yoshida", email: "hana@northbend.com", role: "Inventory lead", status: "Active", lastActive: "2 h ago" },
        { name: "Kofi Asante", email: "kofi@northbend.com", role: "Cashier", status: "Active", lastActive: "Today" },
        { name: "Lily Novak", email: "lily@northbend.com", role: "Cashier", status: "Active", lastActive: "3 h ago" },
        { name: "Ryan Pearce", email: "ryan@northbend.com", role: "Cashier", status: "Active", lastActive: "40 min ago" },
        { name: "Omar Haddad", email: "omar@northbend.com", role: "Cashier", status: "Invited", lastActive: "—" },
      ],
    },
    billing: {
      plan: "Growth", price: "$149 / month", renews: "Nov 12, 2026", paymentMethod: "Card ending 5530",
      usage: [
        { label: "Stores", used: 3, limit: 3, unit: "stores" },
        { label: "POS terminals", used: 7, limit: 12, unit: "terminals" },
        { label: "Active SKUs", used: 1840, limit: 5000, unit: "SKUs" },
        { label: "Loyalty members", used: 8721, limit: 15000, unit: "members" },
      ],
      invoices: [
        { id: "INV-2026-1012", date: "Oct 12, 2026", amount: "$149.00", status: "Due" },
        { id: "INV-2026-0912", date: "Sep 12, 2026", amount: "$149.00", status: "Paid" },
        { id: "INV-2026-0812", date: "Aug 12, 2026", amount: "$149.00", status: "Paid" },
        { id: "INV-2026-0712", date: "Jul 12, 2026", amount: "$149.00", status: "Paid" },
      ],
    },
    inbox: {
      threads: [
        { name: "Tanya Brooks", preview: "Need one more cashier for Saturday afternoon at Midtown.", time: "9:36", avatar: "Tanya Brooks", unread: 2, tag: "Store 2" },
        { name: "SportSupply Co.", preview: "PO-0347 confirmed — 240 pairs ship Monday.", time: "8:58", avatar: "📦", tag: "Supplier" },
        { name: "Hana Yoshida", preview: "Cycle count variance on Denim Jacket L at Riverside.", time: "Yesterday", avatar: "Hana Yoshida", unread: 1 },
        { name: "Diego Ferreira", preview: "Drawer 2 was $18 short at close — note attached.", time: "Mon", avatar: "Diego Ferreira", tag: "Store 3" },
      ],
      messages: [
        { from: "them", text: "Saturday 2–5 PM is going to be tight again. Footfall forecast is 510 an hour and I only have two on the tills.", time: "9:31" },
        { from: "me", text: "Agreed — the coverage heatmap shows us at 54% at 3 PM. Can Kofi pick up a split shift?", time: "9:34" },
        { from: "them", text: "He's free from 1. I'll add him to the rota and move Lily to fitting rooms once she's onboarded.", time: "9:36" },
      ],
    },
    search: {
      query: "denim jacket",
      facets: ["Product", "Order", "Customer", "Supplier"],
      results: [
        { type: "Product", title: "Denim Jacket — Indigo L · SKU-4519", snippet: "11 in stock across 3 stores · below reorder point of 15 · $89.00", meta: "Apparel" },
        { type: "Order", title: "ORD-9174 — Denim Jacket, returned", snippet: "Online order · refunded $89.00 · restocked at Store 1 · Riverside", meta: "Oct 9" },
        { type: "Customer", title: "James Okafor", snippet: "Gold member · 18,740 points · bought 2 denim jackets this year", meta: "Loyalty" },
        { type: "Supplier", title: "FabricHouse Ltd.", snippet: "Apparel supplier · 10-day lead time · PO-0340 sent", meta: "Rating 4.5" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 2, title: "Delivery — SportSupply PO-0347", tone: "blue", time: "8:00 AM" },
        { date: 5, title: "Quarterly cycle count — all stores", tone: "amber", time: "7:00 AM" },
        { date: 9, title: "Holiday window install", tone: "violet", time: "6:30 AM" },
        { date: 12, title: "Loyalty double-points weekend", tone: "green", time: "All day" },
        { date: 16, title: "Seasonal staff training", tone: "gray", time: "9:00 AM" },
        { date: 20, title: "Promotion launch — HOLIDAY15", tone: "green", time: "12:00 AM" },
        { date: 27, title: "Black Friday — extended hours", tone: "red", time: "7:00 AM" },
        { date: 30, title: "Month-end stock valuation", tone: "amber", time: "6:00 PM" },
      ],
    },
    reports: {
      reports: [
        { name: "Daily sales by store", description: "Revenue, transactions and basket size per store and channel.", category: "Sales", updated: "Today", format: "XLSX", owner: "Marcus Halloran", schedule: "Daily" },
        { name: "Stock on hand", description: "Units and cost value per SKU with reorder flags.", category: "Inventory", updated: "Today", format: "CSV", owner: "Hana Yoshida", schedule: "Daily" },
        { name: "Labour vs. footfall", description: "Scheduled hours against forecast traffic by hour and store.", category: "Operations", updated: "Yesterday", format: "PDF", owner: "Tanya Brooks", schedule: "Weekly" },
        { name: "POS exceptions log", description: "Voids, overrides, no-receipt refunds and drawer variances.", category: "Loss prevention", updated: "Yesterday", format: "PDF", owner: "Diego Ferreira", schedule: "Weekly" },
        { name: "Promotion performance", description: "Redemptions, margin impact and uplift per promo code.", category: "Marketing", updated: "Oct 19", format: "XLSX", owner: "Marcus Halloran" },
        { name: "Loyalty member activity", description: "Earn, burn and tier movement across the program.", category: "Marketing", updated: "Oct 1", format: "CSV", owner: "Marcus Halloran", schedule: "Monthly" },
      ],
    },
    states: { noun: "products", emptyTitle: "No products yet", emptyBody: "Import your catalog or add your first product to start selling in-store and online.", emptyAction: "Add a product" },
  },
  screens: {
    rota: {
      blurb: "Scheduled staff against forecast footfall for every hour of the week, so gaps show before customers feel them.",
      bullets: ["Coverage as % of required staff by day and hour", "Spot understaffed peaks before the rota is published", "Labour and lost-sale KPIs for the week"],
      subtitle: "Store 2 · Midtown · rota for Nov 16 – 22, 2026 vs. forecast footfall",
      rowLabel: "Day",
      rows: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      cols: ["9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p"],
      unit: "%",
      legend: ["Understaffed", "Fully covered"],
      values: [
        [100, 100, 95, 90, 85, 90, 95, 100, 100, 95, 90, 100],
        [100, 100, 100, 95, 90, 90, 95, 100, 100, 100, 95, 100],
        [100, 95, 95, 90, 80, 85, 90, 95, 100, 95, 95, 100],
        [100, 100, 95, 90, 85, 85, 90, 90, 85, 80, 85, 95],
        [95, 95, 90, 85, 75, 80, 85, 80, 75, 70, 80, 90],
        [90, 85, 80, 70, 62, 58, 54, 56, 60, 68, 75, 85],
        [100, 95, 90, 80, 75, 72, 75, 80, 85, 90, 95, 100],
      ],
      summary: [
        { label: "Scheduled hours", value: "412 h", delta: "of 448 h required", tone: "amber" },
        { label: "Lowest coverage", value: "54%", delta: "Sat 3 PM", tone: "red" },
        { label: "Labour cost / sales", value: "11.8%", delta: "Target 12%", tone: "green" },
        { label: "Lost sales at risk", value: "$1,200", delta: "Sat 2–5 PM", tone: "amber" },
      ],
    },
    storeops: {
      blurb: "The daily opening routine for each store — cash, POS, floor and safety checks signed off before doors open.",
      bullets: ["Grouped opening tasks with owners and times", "Critical checks that block the store from opening", "Progress shared live with the area manager"],
      subtitle: "Store 2 · Midtown · Thursday Oct 22 · doors open 9:00 AM",
      summary: "13 of 19 checks complete · 2 critical checks outstanding before 9:00 AM.",
      groups: [
        { title: "Cash & POS", items: [
          { label: "Count opening float in all 3 drawers ($200 each)", done: true, owner: "Tanya Brooks", due: "8:15 AM", critical: true },
          { label: "Power on terminals and confirm card reader pairing", done: true, owner: "Kofi Asante", due: "8:20 AM", critical: true },
          { label: "Sync overnight price and promo updates (HOLIDAY15 preview)", done: true, owner: "Kofi Asante", due: "8:25 AM" },
          { label: "Print and file yesterday's Z-report", done: false, owner: "Tanya Brooks", due: "8:30 AM" },
          { label: "Gift card stock counted and logged", done: true, owner: "Kofi Asante", due: "8:35 AM" },
        ] },
        { title: "Stock & receiving", items: [
          { label: "Check in overnight transfer from Store 1 · Riverside (42 units)", done: true, owner: "Hana Yoshida", due: "8:00 AM" },
          { label: "Replenish Running Shoes size wall from stockroom", done: false, owner: "Hana Yoshida", due: "8:40 AM" },
          { label: "Pull click & collect orders due today (6 orders)", done: true, owner: "Hana Yoshida", due: "8:45 AM", critical: true },
          { label: "Cycle count — Accessories counter", done: false, owner: "Hana Yoshida", due: "8:50 AM" },
        ] },
        { title: "Floor & visual merchandising", items: [
          { label: "Apparel main floor folded and sized", done: true, owner: "Kofi Asante", due: "8:40 AM" },
          { label: "Window display matches the October planogram", done: true, owner: "Tanya Brooks", due: "8:45 AM" },
          { label: "Shelf-edge labels match POS prices on promo table", done: false, owner: "Kofi Asante", due: "8:50 AM", critical: true },
          { label: "Fitting rooms cleared and numbered tags stocked", done: true, owner: "Kofi Asante", due: "8:50 AM" },
        ] },
        { title: "Safety & security", items: [
          { label: "Fire exits unobstructed and signage lit", done: true, owner: "Tanya Brooks", due: "8:10 AM", critical: true },
          { label: "Alarm disarmed and CCTV recording checked", done: true, owner: "Tanya Brooks", due: "8:05 AM" },
          { label: "Wet-floor signs ready at entrance", done: true, owner: "Kofi Asante", due: "8:55 AM" },
          { label: "Security tags on new Denim Jacket delivery", done: false, owner: "Hana Yoshida", due: "8:55 AM", critical: true },
          { label: "First-aid kit stocked and in date", done: true, owner: "Tanya Brooks", due: "8:15 AM" },
        ] },
      ],
    },
    exceptions: {
      blurb: "Every POS action that broke a rule — no-receipt refunds, price overrides, post-tender voids and drawer variances — waiting on a manager.",
      bullets: ["Exceptions ranked by risk and age", "Cashier, terminal and transaction context in one view", "Approve or reject and log the reason"],
      subtitle: "All 3 stores · actions above policy thresholds · last 48 hours",
      approveLabel: "Approve", rejectLabel: "Reject",
      stats: [
        { label: "Open exceptions", value: "11", delta: "3 high risk", tone: "amber" },
        { label: "Value under review", value: "$1,284", delta: "Across 3 stores", tone: "blue" },
        { label: "Shrink this month", value: "1.4%", delta: "−0.3 pts", tone: "green" },
      ],
      items: [
        { title: "No-receipt refund — Running Shoes ×2", subtitle: "Store 3 · Eastgate · Terminal 2 · cashier Ryan Pearce", amount: "$198.00", priority: "High", age: "40 min", tags: ["No receipt", "Over $100"], detail: "Refund to card for two pairs of Running Shoes (size 42 and 43) with no receipt and no matching loyalty purchase. Both SKUs were short in the last cycle count. Policy allows store credit only without a receipt." },
        { title: "Price override — Denim Jacket", subtitle: "Store 1 · Riverside · Terminal 1 · cashier Kofi Asante", amount: "−$35.60", priority: "Medium", age: "2 h", tags: ["Override 40%"], detail: "Price reduced from $89.00 to $53.40 with reason 'damaged — missing button'. Photo attached at the till. Overrides above 20% need manager approval." },
        { title: "Void after tender", subtitle: "Store 2 · Midtown · Terminal 3 · cashier Lily Novak", amount: "$64.00", priority: "High", age: "3 h", tags: ["Post-tender void", "Cash"], detail: "Cash sale of Canvas Tote ×1 and Sunglasses ×1 voided 4 minutes after the drawer closed. No customer present on CCTV at time of void. Lily is still in onboarding." },
        { title: "Drawer variance at close", subtitle: "Store 3 · Eastgate · Drawer 2", amount: "−$18.00", priority: "Low", age: "1 day", tags: ["Cash short"], detail: "Closing count was $18.00 under expected. Diego Ferreira's note: likely a mis-given change on a $50 note during the 5 PM rush. Within the $25 tolerance but logged for pattern tracking." },
        { title: "Promo stacking — WELCOME10 + LOYALTY25", subtitle: "Online · web shop · order ORD-9196", amount: "−$34.90", priority: "Medium", age: "5 h", tags: ["Promo rule"], detail: "Customer applied WELCOME10 on a new account then LOYALTY25 from a Gold member's shared code. Stacking is blocked by default; the agent overrode the rule at the customer's request." },
        { title: "Manual loyalty adjustment +2,500 points", subtitle: "Store 2 · Midtown · requested by Tanya Brooks", amount: "$25.00 value", priority: "Low", age: "1 day", tags: ["Loyalty"], detail: "Goodwill points for Laura Becker after a click & collect order was not ready at the promised time. Adjustments above 1,000 points need owner approval." },
      ],
    },
  },
});
