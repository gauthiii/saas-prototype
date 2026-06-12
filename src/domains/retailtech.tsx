// src/domains/retailtech.tsx
import { useState } from "react";
import {
  ShoppingCart, Package, Store, Truck, Gift, Percent, Star,
  LayoutDashboard, CheckCircle2, Search, Plus, Minus, X,
  BarChart3, Tag, Users, Building2, AlertTriangle, TrendingUp,
  FileText, RefreshCw,
} from "lucide-react";
import { HomePage, LoginPage, RegisterPage, ProfilePage, SettingsPage, FAQPage, SupportPage, DomainMeta } from "./pages";
import { AboutPage, PrivacyPage, PricingPage, NotificationsPage, ChangelogPage, NotFoundPage, DomainExtra } from "./pages-extra";
import { Card, SectionTitle, Badge, Drawer, useFakeSubmit, Skeleton, Stat, Tone } from "../components/ui";
import { Bars, AreaChart, Donut } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

// ─── Domain meta ─────────────────────────────────────────────────────────────

const retailMeta: DomainMeta = {
  id: "retail",
  name: "RetailIQ",
  tagline: "Unified retail operations — inventory, POS, orders, and analytics for modern retailers.",
  description: "Run every channel from one platform. RetailIQ connects your stores, warehouse, and online shop into a single real-time view.",
  accentLabel: "RetailTech · POS · Inventory · Omnichannel",
  features: [
    { icon: "🏪", title: "Omnichannel POS", body: "Sell in-store, online, and via app with a unified cart and inventory pool." },
    { icon: "📦", title: "Smart inventory", body: "Real-time stock levels, auto-reorder triggers, and supplier purchase orders." },
    { icon: "📊", title: "Retail analytics", body: "Foot traffic, conversion funnels, basket analysis, and margin reporting." },
  ],
  faqs: [
    { q: "Does RetailIQ work for multi-location retailers?", a: "Yes. Each store has its own inventory zone and POS terminal while sharing a central product catalog and analytics dashboard." },
    { q: "What payment methods does the POS support?", a: "Credit/debit cards (tap, chip, swipe), Apple Pay, Google Pay, gift cards, split payments, and store credit." },
    { q: "How does the auto-reorder feature work?", a: "Set a reorder point and preferred quantity per SKU. When stock falls below the threshold a purchase order is automatically drafted and sent to the selected supplier." },
    { q: "Can I run promotions across all channels simultaneously?", a: "Yes. Promotions sync to in-store POS, the web storefront, and the mobile app in real time. Redemption caps are enforced globally." },
    { q: "Does RetailIQ integrate with Shopify or WooCommerce?", a: "Yes. Our sync adapters for Shopify, WooCommerce, and BigCommerce import your existing catalog, orders, and customer data in minutes." },
    { q: "Is there a loyalty program built in?", a: "Yes. Our built-in points engine supports tiered rewards, spend-based earn rates, and custom redemption rules. No third-party app needed." },
  ],
  supportEmail: "support@retailiq.io",
};

// ─── Domain extra ─────────────────────────────────────────────────────────────

const retailExtra: DomainExtra = {
  founded: "2020",
  mission: "RetailIQ exists to give independent and mid-market retailers the same operational intelligence that big-box chains spend millions to build.",
  story: [
    "RetailIQ was founded in 2020 by a former regional manager and a supply-chain engineer who spent years watching small retailers lose to larger chains — not because of product quality, but because of data blindspots. Stock-outs happened because reorder points lived in spreadsheets. Promotions underperformed because no one could see redemption rates in real time.",
    "They built a single platform that connects the POS, the warehouse shelf, the supplier order, and the customer loyalty card. Today RetailIQ powers over 6,000 stores across 28 countries, from single-location boutiques to 300-store regional chains.",
  ],
  team: [
    { name: "Amara Osei", role: "Co-founder & CEO", emoji: "👩🏾‍💼", bio: "Former regional retail director. Built RetailIQ to solve every operations problem she personally hit across 40 store openings." },
    { name: "Victor Larsson", role: "Co-founder & CTO", emoji: "👨‍💻", bio: "Supply-chain engineer. Designed the inventory engine that reconciles POS, warehouse, and e-commerce in under 200ms." },
    { name: "Priya Nair", role: "Head of Product", emoji: "🛒", bio: "Former Shopify PM. Obsessed with reducing the time from 'stock-out' to 'reorder placed' to under 60 seconds." },
    { name: "Carlos Mendez", role: "Head of Partnerships", emoji: "🤝", bio: "Grew the supplier and payment partner ecosystem from 3 to 140+ integrations in two years." },
  ],
  compliance: [
    { name: "PCI DSS Level 1", desc: "All card transactions are tokenized end to end. RetailIQ never stores raw PAN data.", status: "Certified" },
    { name: "GDPR", desc: "Customer loyalty data held per region. Consent flows, right-to-erasure, and data-portability APIs built in.", status: "Compliant" },
    { name: "SOC 2 Type II", desc: "Annual independent audit of security, availability, and confidentiality controls covering all production systems.", status: "Certified" },
    { name: "CCPA/CPRA", desc: "California consumer data rights enforced across loyalty program and email marketing modules.", status: "Compliant" },
    { name: "ADA / WCAG 2.1 AA", desc: "POS hardware and web storefront meet accessibility standards for inclusive customer experiences.", status: "Compliant" },
  ],
  dataRetention: "Transaction records are retained for 7 years per financial regulations. Customer loyalty data is retained while the account is active plus 24 months. Personal data is deleted within 30 days of an erasure request. Analytics aggregates are retained indefinitely in anonymized form.",
  plans: [
    { name: "Starter", price: "Free", desc: "For single-location shops just getting started.", features: ["1 store, 1 POS terminal", "Up to 500 SKUs", "Basic sales reports", "Email support"], cta: "Start free" },
    { name: "Growth", price: "$149", period: "mo", desc: "For growing retailers managing multiple channels.", features: ["3 stores, unlimited terminals", "Unlimited SKUs", "Loyalty program", "Supplier portal & auto-reorder", "Shopify / WooCommerce sync", "Priority support"], highlight: true, cta: "Start 14-day trial" },
    { name: "Enterprise", price: "Custom", desc: "For regional chains and franchise networks.", features: ["Unlimited stores & terminals", "300+ location analytics", "Custom loyalty tiers", "ERP & WMS integrations", "Dedicated onboarding & CSM", "SLA guarantees"], cta: "Talk to sales" },
  ],
  notifications: [
    { title: "Low stock alert", body: "Running Shoes (SKU-4421) has 3 units left — below reorder point of 15. Draft PO sent to SportSupply Co.", time: "5 min ago", tone: "amber", unread: true },
    { title: "Flash sale live", body: "Summer Clearance 20% promo is now active across all 3 stores and the web shop. 47 redemptions so far.", time: "22 min ago", tone: "green", unread: true },
    { title: "New order #ORD-9182", body: "Online order for 2x Linen Shirt (L, Blue) placed by Sarah K. Ready to pick from Store 2.", time: "1 h ago", tone: "blue", unread: true },
    { title: "Supplier delivery confirmed", body: "SportSupply Co. confirmed PO-0341 delivery for Monday. 480 units inbound.", time: "3 h ago", tone: "green" },
    { title: "Return processed", body: "Order #ORD-8874 — Denim Jacket returned and restocked at Store 1. Refund issued.", time: "Yesterday", tone: "gray" },
  ],
  changelog: [
    { version: "v3.8", date: "Jun 10, 2026", tag: "New", items: ["Split-tender payments at POS (cash + card)", "Supplier portal with 2-way PO confirmations", "Product bundle builder for promotions"] },
    { version: "v3.7", date: "May 22, 2026", tag: "Improved", items: ["Inventory sync latency reduced from 5s to <200ms", "Loyalty tier recalculation now runs in real time", "Barcode scanner reliability on Android POS devices"] },
    { version: "v3.6", date: "Apr 30, 2026", tag: "Fixed", items: ["Duplicate orders when customer refreshed checkout page", "Incorrect tax calculation for mixed-category carts", "Loyalty points not awarded on exchange transactions"] },
  ],
};

// ─── Shared page wrappers ─────────────────────────────────────────────────────

export function RetailHome() { return <HomePage meta={retailMeta} />; }
export function RetailLogin() { return <LoginPage meta={retailMeta} />; }
export function RetailRegister() { return <RegisterPage meta={retailMeta} />; }
export function RetailProfile() { return <ProfilePage meta={retailMeta} />; }
export function RetailSettings() { return <SettingsPage meta={retailMeta} />; }
export function RetailFAQ() { return <FAQPage meta={retailMeta} />; }
export function RetailSupport() { return <SupportPage meta={retailMeta} />; }
export function RetailAbout() { return <AboutPage meta={retailMeta} extra={retailExtra} />; }
export function RetailPrivacy() { return <PrivacyPage meta={retailMeta} extra={retailExtra} />; }
export function RetailPricing() { return <PricingPage meta={retailMeta} extra={retailExtra} />; }
export function RetailNotifications() { return <NotificationsPage meta={retailMeta} extra={retailExtra} />; }
export function RetailChangelog() { return <ChangelogPage meta={retailMeta} extra={retailExtra} />; }
export function RetailNotFound() { return <NotFoundPage meta={retailMeta} />; }

// ─── 1. Retail Dashboard ──────────────────────────────────────────────────────

const dailySales = [18200, 22500, 19800, 27300, 31000, 28700, 35400];
const categorySales = [
  { label: "Apparel", value: 42 },
  { label: "Footwear", value: 28 },
  { label: "Accessories", value: 15 },
  { label: "Home", value: 9 },
  { label: "Sports", value: 6 },
];
const topSkus = [
  { sku: "SKU-1102", name: "Linen Shirt — White M", sold: 124, revenue: "$3,596", trend: "+18%" },
  { sku: "SKU-2231", name: "Running Shoes — Size 42", sold: 98, revenue: "$9,702", trend: "+31%" },
  { sku: "SKU-3340", name: "Canvas Tote — Natural", sold: 87, revenue: "$2,523", trend: "+7%" },
  { sku: "SKU-4519", name: "Denim Jacket — Indigo L", sold: 62, revenue: "$5,518", trend: "-3%" },
];
const dashInsights: Insight[] = [
  { title: "Weekend peak opportunity", body: "Saturday revenue is 38% higher than the weekly average. Scheduling 2 extra floor staff this Saturday could recover an estimated $1,200 in lost-sale incidents.", tone: "green", tag: "Staffing", confidence: 82 },
  { title: "Footwear stock thinning", body: "Running Shoes (Size 42) will hit zero stock in ~4 days at current velocity. A draft PO has been prepared but not submitted.", tone: "amber", tag: "Inventory", confidence: 91 },
  { title: "Cart abandonment spike", body: "Online cart abandonment rose to 68% this week vs. 51% last week. Common drop-off at shipping cost reveal — consider free-shipping threshold test.", tone: "blue", tag: "E-commerce", confidence: 75 },
];

export function RetailDashboard() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Today's revenue" value="$12,847" delta="+14% vs yesterday" deltaTone="green" icon={<TrendingUp size={16} />} />
        <Stat label="Transactions" value="341" delta="Across 3 stores" deltaTone="blue" />
        <Stat label="Avg basket size" value="$37.67" delta="+$4.20 vs last week" deltaTone="green" />
        <Stat label="Online orders" value="88" delta="26% of total" deltaTone="blue" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <SectionTitle eyebrow="Revenue" title="Last 7 days — all channels" right={<Badge tone="green">+22% WoW</Badge>} />
            <AreaChart data={dailySales} height={160} />
            <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <span key={d}>{d}</span>)}
            </div>
          </Card>

          <Card>
            <SectionTitle eyebrow="Top SKUs" title="Best sellers · today" right={<Badge tone="gray">4 products</Badge>} />
            <div className="space-y-2">
              {topSkus.map(s => (
                <div key={s.sku} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{s.name}</div>
                    <div className="text-xs ink-2 font-mono">{s.sku}</div>
                  </div>
                  <div className="text-right shrink-0 space-y-0.5">
                    <div className="text-sm font-semibold">{s.revenue}</div>
                    <div className="text-xs ink-2">{s.sold} units</div>
                  </div>
                  <Badge tone={s.trend.startsWith("+") ? "green" : "red"}>{s.trend}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <SectionTitle eyebrow="Category mix" title="Sales breakdown" />
            <Bars data={categorySales} height={140} />
          </Card>
          <AIPanel context="Multi-store retail · Jun 2026" insights={dashInsights} />
        </div>
      </div>
    </div>
  );
}

// ─── 2. POS Terminal ──────────────────────────────────────────────────────────

type CartItem = { id: string; name: string; price: number; qty: number; emoji: string };
const quickProducts = [
  { id: "p1", name: "Linen Shirt", price: 29, emoji: "👕" },
  { id: "p2", name: "Running Shoes", price: 99, emoji: "👟" },
  { id: "p3", name: "Canvas Tote", price: 29, emoji: "👜" },
  { id: "p4", name: "Denim Jacket", price: 89, emoji: "🧥" },
  { id: "p5", name: "Baseball Cap", price: 19, emoji: "🧢" },
  { id: "p6", name: "Sunglasses", price: 49, emoji: "🕶️" },
  { id: "p7", name: "Leather Belt", price: 35, emoji: "🪢" },
  { id: "p8", name: "Sports Socks (3pk)", price: 12, emoji: "🧦" },
];

export function POSTerminal() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);

  const addItem = (p: typeof quickProducts[0]) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === p.id);
      return ex ? prev.map(c => c.id === p.id ? { ...c, qty: c.qty + 1 } : c)
        : [...prev, { ...p, qty: 1 }];
    });
  };
  const removeItem = (id: string) => setCart(prev => prev.flatMap(c => c.id === id ? (c.qty > 1 ? [{ ...c, qty: c.qty - 1 }] : []) : [c]));
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax - discount;

  const checkout = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setPaid(true); }, 1300);
  };
  const reset = () => { setCart([]); setDiscount(0); setPaid(false); };

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      {/* Product grid */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 field !py-2">
            <Search size={14} className="ink-2 shrink-0" />
            <input className="bg-transparent text-sm outline-none flex-1 placeholder:text-[var(--ink-2)]" placeholder="Search product or scan barcode…" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickProducts.map(p => (
            <button key={p.id} onClick={() => addItem(p)}
              className="card p-4 flex flex-col items-center gap-2 text-center card-hover transition-all active:scale-95">
              <span className="text-3xl">{p.emoji}</span>
              <span className="text-xs font-medium leading-tight">{p.name}</span>
              <span className="font-mono text-xs text-accent font-semibold">${p.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="lg:col-span-2">
        <Card className="sticky top-24">
          <SectionTitle eyebrow="Current sale" title="Cart" right={
            cart.length > 0 ? <button onClick={reset} className="text-xs ink-2 hover:text-rose-500 transition-colors flex items-center gap-1"><X size={12} /> Clear</button> : undefined
          } />

          {paid ? (
            <div className="text-center py-10 animate-fadeUp space-y-3">
              <CheckCircle2 className="mx-auto text-emerald-500" size={40} />
              <div className="font-display font-semibold">Payment complete</div>
              <p className="text-sm ink-2">Receipt sent · Change: $0.00</p>
              <button className="btn-ghost mt-2" onClick={reset}>New sale</button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.length === 0 && (
                <div className="text-center py-10 ink-2 text-sm">
                  <ShoppingCart size={28} className="mx-auto mb-2 opacity-40" />
                  Tap a product to add it
                </div>
              )}
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {cart.map(c => (
                  <div key={c.id} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-2.5">
                    <span className="text-xl">{c.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{c.name}</div>
                      <div className="text-xs ink-2 font-mono">${c.price} each</div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => removeItem(c.id)} className="h-6 w-6 rounded-md border border-[var(--line)] grid place-items-center hover:bg-accent/8 transition-colors"><Minus size={11} /></button>
                      <span className="w-5 text-center text-sm font-semibold">{c.qty}</span>
                      <button onClick={() => addItem(c)} className="h-6 w-6 rounded-md border border-[var(--line)] grid place-items-center hover:bg-accent/8 transition-colors"><Plus size={11} /></button>
                    </div>
                    <div className="text-sm font-semibold font-mono w-14 text-right">${c.price * c.qty}</div>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-[var(--line)]">
                  <div className="flex items-center gap-2">
                    <Percent size={13} className="ink-2" />
                    <input type="number" min={0} value={discount} onChange={e => setDiscount(Number(e.target.value))}
                      className="field !py-1.5 !px-2.5 text-sm font-mono flex-1" placeholder="Discount ($)" />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between ink-2"><span>Subtotal</span><span className="font-mono">${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between ink-2"><span>Tax (8%)</span><span className="font-mono">${tax.toFixed(2)}</span></div>
                    {discount > 0 && <div className="flex justify-between text-emerald-600 dark:text-emerald-400"><span>Discount</span><span className="font-mono">-${discount.toFixed(2)}</span></div>}
                    <div className="flex justify-between font-semibold text-base pt-1 border-t border-[var(--line)]"><span>Total</span><span className="font-mono">${Math.max(0, total).toFixed(2)}</span></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {["Card", "Cash", "Split"].map(method => (
                      <button key={method} className="btn-ghost !py-2 !text-xs">{method}</button>
                    ))}
                  </div>
                  <button className="btn-primary w-full justify-center" onClick={checkout} disabled={paying}>
                    {paying ? <RefreshCw size={14} className="animate-spin" /> : "Charge $" + Math.max(0, total).toFixed(2)}
                  </button>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── 3. Inventory Manager ─────────────────────────────────────────────────────

type StockItem = { sku: string; name: string; category: string; stock: number; reorder: number; cost: number };
const stockItems: StockItem[] = [
  { sku: "SKU-1102", name: "Linen Shirt — White M", category: "Apparel", stock: 34, reorder: 20, cost: 14.50 },
  { sku: "SKU-2231", name: "Running Shoes — Size 42", category: "Footwear", stock: 3, reorder: 15, cost: 44.00 },
  { sku: "SKU-3340", name: "Canvas Tote — Natural", category: "Accessories", stock: 67, reorder: 25, cost: 8.20 },
  { sku: "SKU-4519", name: "Denim Jacket — Indigo L", category: "Apparel", stock: 11, reorder: 15, cost: 38.00 },
  { sku: "SKU-5021", name: "Baseball Cap — Black", category: "Accessories", stock: 0, reorder: 30, cost: 7.50 },
  { sku: "SKU-6102", name: "Sunglasses — Tortoise", category: "Accessories", stock: 22, reorder: 10, cost: 18.00 },
  { sku: "SKU-7780", name: "Sports Socks 3pk", category: "Apparel", stock: 88, reorder: 40, cost: 4.80 },
];
const stockTone = (item: StockItem): Tone => item.stock === 0 ? "red" : item.stock <= item.reorder ? "amber" : "green";
const stockLabel = (item: StockItem) => item.stock === 0 ? "Out of stock" : item.stock <= item.reorder ? "Low stock" : "In stock";

export function InventoryScreen() {
  const [selected, setSelected] = useState<StockItem | null>(null);
  const lowCount = stockItems.filter(i => i.stock > 0 && i.stock <= i.reorder).length;
  const outCount = stockItems.filter(i => i.stock === 0).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Total SKUs" value={stockItems.length.toString()} delta="Across all categories" deltaTone="blue" icon={<Package size={16} />} />
        <Stat label="In stock" value={(stockItems.length - lowCount - outCount).toString()} delta="Healthy levels" deltaTone="green" />
        <Stat label="Low stock" value={lowCount.toString()} delta="Below reorder point" deltaTone="amber" />
        <Stat label="Out of stock" value={outCount.toString()} delta="Immediate action needed" deltaTone="red" />
      </div>

      <Card>
        <SectionTitle eyebrow="Inventory" title="Stock levels" right={
          <button className="btn-ghost text-xs"><Plus size={13} /> Add SKU</button>
        } />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--line)]">
                {["SKU", "Product", "Category", "Stock", "Reorder at", "Unit cost", "Status"].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-xs eyebrow font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {stockItems.map(item => (
                <tr key={item.sku} className="hover:bg-accent/4 transition-colors cursor-pointer" onClick={() => setSelected(item)}>
                  <td className="py-3 pr-4 font-mono text-xs ink-2">{item.sku}</td>
                  <td className="py-3 pr-4 font-medium">{item.name}</td>
                  <td className="py-3 pr-4 ink-2">{item.category}</td>
                  <td className={`py-3 pr-4 font-mono font-semibold ${item.stock === 0 ? "text-rose-500" : item.stock <= item.reorder ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400"}`}>{item.stock}</td>
                  <td className="py-3 pr-4 ink-2 font-mono">{item.reorder}</td>
                  <td className="py-3 pr-4 ink-2 font-mono">${item.cost.toFixed(2)}</td>
                  <td className="py-3"><Badge tone={stockTone(item)}>{stockLabel(item)}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title="SKU detail">
        {selected && (
          <div className="space-y-5">
            <div>
              <div className="font-display text-xl font-bold">{selected.name}</div>
              <div className="text-xs ink-2 font-mono mt-0.5">{selected.sku} · {selected.category}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-[var(--line)] p-3 text-center">
                <div className={`font-display text-3xl font-bold ${selected.stock === 0 ? "text-rose-500" : selected.stock <= selected.reorder ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400"}`}>{selected.stock}</div>
                <div className="text-xs ink-2 mt-1">Current stock</div>
              </div>
              <div className="rounded-lg border border-[var(--line)] p-3 text-center">
                <div className="font-display text-3xl font-bold">{selected.reorder}</div>
                <div className="text-xs ink-2 mt-1">Reorder point</div>
              </div>
            </div>
            <div>
              <div className="label mb-2">Status</div>
              <Badge tone={stockTone(selected)}>{stockLabel(selected)}</Badge>
            </div>
            <div className="space-y-3">
              <div className="label">Adjust stock</div>
              <div className="flex gap-2">
                <input className="field flex-1 font-mono text-sm" placeholder="Qty to add / remove" />
                <button className="btn-ghost">Adjust</button>
              </div>
            </div>
            <button className="btn-primary w-full justify-center"><FileText size={14} /> Draft purchase order</button>
          </div>
        )}
      </Drawer>
    </div>
  );
}

// ─── 4. Order Center ──────────────────────────────────────────────────────────

type Order = { id: string; customer: string; items: number; total: string; channel: string; status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Returned"; date: string };
const orders: Order[] = [
  { id: "ORD-9182", customer: "Sarah K.", items: 2, total: "$58.00", channel: "Online", status: "Pending", date: "Today, 11:22 AM" },
  { id: "ORD-9181", customer: "Mark T.", items: 1, total: "$99.00", channel: "Store 2", status: "Delivered", date: "Today, 10:05 AM" },
  { id: "ORD-9180", customer: "Julia M.", items: 4, total: "$174.00", channel: "App", status: "Shipped", date: "Yesterday" },
  { id: "ORD-9179", customer: "David L.", items: 1, total: "$29.00", channel: "Online", status: "Processing", date: "Yesterday" },
  { id: "ORD-9178", customer: "Priya S.", items: 3, total: "$137.00", channel: "Store 1", status: "Delivered", date: "Jun 10" },
  { id: "ORD-9174", customer: "Alex W.", items: 1, total: "$89.00", channel: "Online", status: "Returned", date: "Jun 9" },
];
const orderTone: Record<Order["status"], Tone> = { Pending: "amber", Processing: "blue", Shipped: "violet", Delivered: "green", Returned: "red" };

export function OrderCenterScreen() {
  const [selected, setSelected] = useState<Order | null>(null);
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Pending" value={orders.filter(o => o.status === "Pending").length.toString()} delta="Awaiting pick" deltaTone="amber" icon={<Truck size={16} />} />
        <Stat label="Processing" value={orders.filter(o => o.status === "Processing").length.toString()} delta="Being packed" deltaTone="blue" />
        <Stat label="Shipped" value={orders.filter(o => o.status === "Shipped").length.toString()} delta="In transit" deltaTone="violet" />
        <Stat label="Returns today" value={orders.filter(o => o.status === "Returned").length.toString()} delta="3.8% return rate" deltaTone="red" />
      </div>

      <Card>
        <SectionTitle eyebrow="Orders" title="Recent orders" right={
          <div className="flex gap-2">
            <Badge tone="blue">Online</Badge>
            <Badge tone="gray">In-store</Badge>
          </div>
        } />
        <div className="space-y-2">
          {orders.map(o => (
            <button key={o.id} onClick={() => setSelected(o)}
              className="w-full flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5 text-left hover:border-accent/40 transition-colors">
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
                <div>
                  <div className="text-sm font-semibold font-mono">{o.id}</div>
                  <div className="text-xs ink-2">{o.customer}</div>
                </div>
                <div className="text-xs ink-2">{o.items} item{o.items > 1 ? "s" : ""} · {o.channel}</div>
                <div className="text-sm font-semibold">{o.total}</div>
                <div className="text-xs ink-2">{o.date}</div>
              </div>
              <Badge tone={orderTone[o.status]}>{o.status}</Badge>
            </button>
          ))}
        </div>
      </Card>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Order detail">
        {selected && (
          <div className="space-y-5">
            <div>
              <div className="font-display text-xl font-bold font-mono">{selected.id}</div>
              <div className="text-sm ink-2 mt-0.5">{selected.customer} · {selected.date}</div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge tone={orderTone[selected.status]}>{selected.status}</Badge>
              <Badge tone="gray">{selected.channel}</Badge>
            </div>
            <div className="rounded-lg border border-[var(--line)] p-4 space-y-3">
              <div className="eyebrow">Items</div>
              {Array.from({ length: selected.items }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-3/4 mb-1.5" />
                    <Skeleton className="h-2.5 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm font-semibold">Order total: {selected.total}</div>
            {selected.status === "Pending" && (
              <button className="btn-primary w-full justify-center"><Package size={14} /> Mark as processing</button>
            )}
            {selected.status === "Processing" && (
              <button className="btn-primary w-full justify-center"><Truck size={14} /> Mark as shipped</button>
            )}
            {selected.status !== "Returned" && selected.status !== "Pending" && (
              <button className="btn-ghost w-full justify-center text-rose-500">Process return</button>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}

// ─── 5. Promotions ────────────────────────────────────────────────────────────

type Promo = { code: string; name: string; type: string; value: string; used: number; cap: number; status: "Active" | "Scheduled" | "Ended"; expires: string };
const promos: Promo[] = [
  { code: "SUMMER20", name: "Summer Clearance", type: "Percentage", value: "20%", used: 347, cap: 1000, status: "Active", expires: "Jun 30, 2026" },
  { code: "WELCOME10", name: "New customer welcome", type: "Percentage", value: "10%", used: 892, cap: 9999, status: "Active", expires: "Dec 31, 2026" },
  { code: "FREESHIP", name: "Free shipping weekend", type: "Free shipping", value: "—", used: 0, cap: 500, status: "Scheduled", expires: "Jun 14–15, 2026" },
  { code: "LOYALTY25", name: "Loyalty tier bonus", type: "Fixed", value: "$25 off", used: 64, cap: 200, status: "Active", expires: "Jun 20, 2026" },
  { code: "SPRING15", name: "Spring sale", type: "Percentage", value: "15%", used: 2104, cap: 2000, status: "Ended", expires: "May 31, 2026" },
];
const promoTone: Record<Promo["status"], Tone> = { Active: "green", Scheduled: "blue", Ended: "gray" };

export function PromotionsScreen() {
  const { state, submit, reset } = useFakeSubmit();
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Active promos" value={promos.filter(p => p.status === "Active").length.toString()} delta="Running now" deltaTone="green" icon={<Percent size={16} />} />
          <Stat label="Redemptions today" value="124" delta="+31% vs yesterday" deltaTone="green" />
          <Stat label="Avg discount given" value="$14.20" delta="Per transaction" deltaTone="blue" />
        </div>

        <Card>
          <SectionTitle eyebrow="Campaigns" title="All promotions" right={<Badge tone="blue">{promos.length} total</Badge>} />
          <div className="space-y-2">
            {promos.map(p => (
              <div key={p.code} className="rounded-lg border border-[var(--line)] p-3.5 flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold">{p.name}</span>
                    <Badge tone="gray" >{p.code}</Badge>
                  </div>
                  <div className="text-xs ink-2">{p.type} · {p.value} · Expires {p.expires}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                      <div className="h-full rounded-full bg-accent/70" style={{ width: `${Math.min(100, (p.used / p.cap) * 100)}%` }} />
                    </div>
                    <span className="text-[10px] ink-2 font-mono shrink-0">{p.used}/{p.cap}</span>
                  </div>
                </div>
                <Badge tone={promoTone[p.status]}>{p.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <Card>
          <SectionTitle eyebrow="New promotion" title="Create campaign" />
          {state === "done" ? (
            <div className="text-center py-8 animate-fadeUp space-y-3">
              <CheckCircle2 className="mx-auto text-emerald-500" size={36} />
              <div className="font-display font-semibold">Promotion created</div>
              <p className="text-sm ink-2">Active across all channels.</p>
              <button className="btn-ghost" onClick={reset}>Create another</button>
            </div>
          ) : state === "loading" ? (
            <div className="space-y-3"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
          ) : (
            <div className="space-y-3 animate-fadeUp">
              <div><label className="label">Campaign name</label><input className="field" defaultValue="Back to School" /></div>
              <div><label className="label">Discount code</label><input className="field font-mono" defaultValue="SCHOOL25" /></div>
              <div><label className="label">Type</label>
                <select className="field">
                  <option>Percentage off</option>
                  <option>Fixed amount off</option>
                  <option>Free shipping</option>
                  <option>Buy X get Y</option>
                </select>
              </div>
              <div><label className="label">Value</label><input className="field font-mono" defaultValue="25%" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="label">Start date</label><input className="field" type="date" /></div>
                <div><label className="label">End date</label><input className="field" type="date" /></div>
              </div>
              <div><label className="label">Usage cap</label><input className="field font-mono" defaultValue="500" /></div>
              <button className="btn-primary w-full justify-center" onClick={submit}>Launch promotion</button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── 6. Customer Loyalty ──────────────────────────────────────────────────────

const tierData = [
  { name: "Platinum", color: "#6366f1", count: 142 },
  { name: "Gold", color: "#f59e0b", count: 618 },
  { name: "Silver", color: "#94a3b8", count: 2140 },
  { name: "Bronze", color: "#b45309", count: 5821 },
];
const loyaltyCustomers = [
  { name: "Olivia Chen", tier: "Platinum", points: 48320, spent: "$9,412", redeemed: 8 },
  { name: "James Okafor", tier: "Gold", points: 18740, spent: "$3,748", redeemed: 3 },
  { name: "Laura Becker", tier: "Gold", points: 15290, spent: "$3,058", redeemed: 5 },
  { name: "Ravi Suresh", tier: "Silver", points: 6820, spent: "$1,364", redeemed: 2 },
];
const tierTone: Record<string, Tone> = { Platinum: "violet", Gold: "amber", Silver: "gray", Bronze: "amber" };
const loyaltyInsights: Insight[] = [
  { title: "Gold tier at risk", body: "82 Gold members haven't purchased in 60+ days. A targeted 2× points event could reactivate ~40% based on past campaigns.", tone: "amber", tag: "Retention", confidence: 79 },
  { title: "Platinum spend velocity", body: "Platinum members average $780/month — 6× Bronze. Exclusive early-access events have kept churn under 4%.", tone: "green", tag: "Retention", confidence: 88 },
];

export function LoyaltyScreen() {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-4">
          <Stat label="Total members" value="8,721" delta="+312 this month" deltaTone="green" icon={<Star size={16} />} />
          <Stat label="Points issued · MTD" value="1.2M" delta="$24k equiv. value" deltaTone="blue" />
          <Stat label="Points redeemed" value="384K" delta="32% redemption rate" deltaTone="green" />
          <Stat label="Avg lifetime value" value="$840" delta="+$60 vs last year" deltaTone="green" />
        </div>

        <Card>
          <SectionTitle eyebrow="Members" title="Top loyalty customers" right={<Badge tone="violet">Platinum tier</Badge>} />
          <div className="space-y-2">
            {loyaltyCustomers.map(c => (
              <div key={c.name} className="flex items-center gap-4 rounded-lg border border-[var(--line)] p-3.5">
                <div className="h-9 w-9 rounded-full bg-accent/10 text-accent grid place-items-center text-sm font-bold shrink-0">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{c.name}</span>
                    <Badge tone={tierTone[c.tier]}>{c.tier}</Badge>
                  </div>
                  <div className="text-xs ink-2 mt-0.5">{c.redeemed} rewards redeemed · Total spent {c.spent}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-sm font-semibold text-accent">{c.points.toLocaleString()}</div>
                  <div className="text-[10px] ink-2">points</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Rewards" title="Points earning rules" />
          <div className="space-y-2">
            {[
              ["Every $1 spent", "1 point", "All tiers"],
              ["Birthday month", "3× points", "Silver+"],
              ["Refer a friend", "+500 points", "All tiers"],
              ["Product review", "+100 points", "All tiers"],
              ["Platinum bonus", "5× points", "Platinum only"],
            ].map(([rule, value, tier]) => (
              <div key={rule} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3">
                <Gift size={14} className="text-accent shrink-0" />
                <span className="flex-1 text-sm">{rule}</span>
                <span className="font-mono text-xs text-accent font-semibold">{value}</span>
                <Badge tone="gray">{tier}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Tiers" title="Member distribution" />
          <Donut segments={tierData.map(t => ({ name: t.name, value: t.count, color: t.color }))} size={160} label="8,721" sublabel="members" />
          <div className="mt-4 space-y-2">
            {tierData.map(t => (
              <div key={t.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: t.color }} />
                <span className="flex-1">{t.name}</span>
                <span className="font-mono ink-2">{t.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
        <AIPanel context="Loyalty program · Jun 2026" insights={loyaltyInsights} />
      </div>
    </div>
  );
}

// ─── 7. Supplier Portal ───────────────────────────────────────────────────────

type PO = { id: string; supplier: string; items: number; value: string; status: "Draft" | "Sent" | "Confirmed" | "Delivered"; expected: string };
const purchaseOrders: PO[] = [
  { id: "PO-0341", supplier: "SportSupply Co.", items: 3, value: "$21,120", status: "Confirmed", expected: "Jun 16, 2026" },
  { id: "PO-0340", supplier: "FabricHouse Ltd.", items: 7, value: "$8,340", status: "Sent", expected: "Jun 20, 2026" },
  { id: "PO-0339", supplier: "AccessoriesWorld", items: 2, value: "$2,890", status: "Delivered", expected: "Delivered Jun 9" },
  { id: "PO-0338", supplier: "FabricHouse Ltd.", items: 5, value: "$6,100", status: "Draft", expected: "TBD" },
];
const suppliers = [
  { name: "SportSupply Co.", category: "Footwear & Sports", lead: "7 days", rating: 4.8 },
  { name: "FabricHouse Ltd.", category: "Apparel", lead: "10 days", rating: 4.5 },
  { name: "AccessoriesWorld", category: "Accessories", lead: "5 days", rating: 4.7 },
  { name: "HomeGoods Direct", category: "Home & Lifestyle", lead: "14 days", rating: 4.2 },
];
const poTone: Record<PO["status"], Tone> = { Draft: "gray", Sent: "blue", Confirmed: "violet", Delivered: "green" };

export function SupplierPortalScreen() {
  const [selected, setSelected] = useState<PO | null>(null);
  const { state, submit, reset } = useFakeSubmit();
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Open POs" value={purchaseOrders.filter(p => p.status !== "Delivered").length.toString()} delta="$32.5k in transit" deltaTone="blue" icon={<Building2 size={16} />} />
          <Stat label="On-time delivery" value="94%" delta="+2% vs last quarter" deltaTone="green" />
          <Stat label="Active suppliers" value={suppliers.length.toString()} delta="4 approved vendors" deltaTone="gray" />
        </div>

        <Card>
          <SectionTitle eyebrow="Purchase orders" title="Recent POs" right={
            <button className="btn-ghost text-xs"><Plus size={13} /> New PO</button>
          } />
          <div className="space-y-2">
            {purchaseOrders.map(po => (
              <button key={po.id} onClick={() => setSelected(po)}
                className="w-full flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5 text-left hover:border-accent/40 transition-colors">
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
                  <div>
                    <div className="font-mono text-sm font-semibold">{po.id}</div>
                    <div className="text-xs ink-2">{po.supplier}</div>
                  </div>
                  <div className="text-xs ink-2">{po.items} line items</div>
                  <div className="text-sm font-semibold">{po.value}</div>
                  <div className="text-xs ink-2">{po.expected}</div>
                </div>
                <Badge tone={poTone[po.status]}>{po.status}</Badge>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Vendors" title="Supplier directory" right={<Badge tone="blue">{suppliers.length} suppliers</Badge>} />
          <div className="space-y-2">
            {suppliers.map(s => (
              <div key={s.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
                <div className="h-9 w-9 rounded-lg bg-accent/10 text-accent grid place-items-center shrink-0">
                  <Building2 size={16} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs ink-2">{s.category} · Lead time {s.lead}</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={12} className="fill-current" />
                  <span className="text-xs font-semibold">{s.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <Card>
          <SectionTitle eyebrow="Quick reorder" title="Draft purchase order" />
          {state === "done" ? (
            <div className="text-center py-8 animate-fadeUp space-y-3">
              <CheckCircle2 className="mx-auto text-emerald-500" size={36} />
              <div className="font-display font-semibold">PO sent to supplier</div>
              <p className="text-sm ink-2">Confirmation expected within 24 hours.</p>
              <button className="btn-ghost" onClick={reset}>New PO</button>
            </div>
          ) : state === "loading" ? (
            <div className="space-y-3"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
          ) : (
            <div className="space-y-3 animate-fadeUp">
              <div><label className="label">Supplier</label>
                <select className="field">
                  {suppliers.map(s => <option key={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div><label className="label">SKU</label><input className="field font-mono" defaultValue="SKU-2231" /></div>
              <div><label className="label">Quantity</label><input className="field font-mono" defaultValue="100" /></div>
              <div><label className="label">Expected delivery</label><input className="field" type="date" /></div>
              <div><label className="label">Notes</label><textarea className="field min-h-16 text-sm" defaultValue="Urgent — stock at reorder threshold." /></div>
              <button className="btn-primary w-full justify-center" onClick={submit}>Send PO</button>
            </div>
          )}
        </Card>
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title="PO detail">
        {selected && (
          <div className="space-y-5">
            <div>
              <div className="font-mono font-display text-xl font-bold">{selected.id}</div>
              <div className="text-sm ink-2 mt-0.5">{selected.supplier}</div>
            </div>
            <div className="flex gap-2"><Badge tone={poTone[selected.status]}>{selected.status}</Badge></div>
            <div className="rounded-lg border border-[var(--line)] p-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="ink-2">Line items</span><span className="font-semibold">{selected.items}</span></div>
              <div className="flex justify-between text-sm"><span className="ink-2">Total value</span><span className="font-semibold">{selected.value}</span></div>
              <div className="flex justify-between text-sm"><span className="ink-2">Expected</span><span className="font-semibold">{selected.expected}</span></div>
            </div>
            {selected.status === "Draft" && (
              <button className="btn-primary w-full justify-center">Send to supplier</button>
            )}
            <button className="btn-ghost w-full justify-center"><FileText size={14} /> Download PDF</button>
          </div>
        )}
      </Drawer>
    </div>
  );
}

// ─── 8. Store Analytics ───────────────────────────────────────────────────────

const hourlyTraffic = [120, 180, 240, 310, 280, 390, 420, 380, 460, 510, 470, 390];
const channelData = [
  { label: "In-store", value: 58 },
  { label: "Online", value: 28 },
  { label: "App", value: 14 },
];
const storeZones = [
  { zone: "Entrance / Window", conversion: "72%", dwell: "1m 20s", tone: "green" as Tone },
  { zone: "Apparel — Main floor", conversion: "54%", dwell: "4m 10s", tone: "green" as Tone },
  { zone: "Footwear — Back left", conversion: "38%", dwell: "2m 50s", tone: "amber" as Tone },
  { zone: "Accessories — Counter", conversion: "61%", dwell: "1m 45s", tone: "green" as Tone },
  { zone: "Fitting rooms", conversion: "84%", dwell: "8m 30s", tone: "green" as Tone },
  { zone: "Checkout queue", conversion: "97%", dwell: "2m 05s", tone: "green" as Tone },
];
const analyticsInsights: Insight[] = [
  { title: "Footwear zone underperforming", body: "38% conversion in footwear vs. 61% store average. Repositioning the seating area closer to display shelves typically adds +8–12% conversion.", tone: "amber", tag: "Merchandising", confidence: 78 },
  { title: "Saturday peak staffing", body: "Between 2–5 PM on Saturdays, foot traffic peaks at 510 visitors/hour but checkout conversion drops to 89% (vs. 97% weekday). Adding 1 checkout staff recovers ~$1,200 in missed sales.", tone: "green", tag: "Staffing", confidence: 84 },
];

export function StoreAnalyticsScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Foot traffic · today" value="3,241" delta="+8% vs last Sat" deltaTone="green" icon={<BarChart3 size={16} />} />
        <Stat label="Store conversion" value="61%" delta="+3 pts this week" deltaTone="green" />
        <Stat label="Avg basket size" value="$37.67" delta="4.2 items per tx" deltaTone="blue" />
        <Stat label="Returns rate" value="3.8%" delta="-0.4 pts vs last week" deltaTone="green" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <SectionTitle eyebrow="Foot traffic" title="Visitors per hour · today" right={<Badge tone="blue">Peak: 2–5 PM</Badge>} />
            <AreaChart data={hourlyTraffic} height={160} />
            <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
              {["9A", "10A", "11A", "12P", "1P", "2P", "3P", "4P", "5P", "6P", "7P", "8P"].map(h => <span key={h}>{h}</span>)}
            </div>
          </Card>

          <Card>
            <SectionTitle eyebrow="Zone analysis" title="Conversion & dwell by store section" />
            <div className="space-y-2">
              {storeZones.map(z => (
                <div key={z.zone} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
                  <Store size={14} className="text-accent shrink-0" />
                  <span className="flex-1 text-sm">{z.zone}</span>
                  <div className="text-right text-xs space-y-0.5">
                    <div className="ink-2">Dwell: <span className="font-mono">{z.dwell}</span></div>
                  </div>
                  <Badge tone={z.tone}>Conv. {z.conversion}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <SectionTitle eyebrow="Channels" title="Sales by channel" />
            <Donut
              segments={[
                { name: "In-store", value: 58, color: "#4f6df5" },
                { name: "Online", value: 28, color: "#8b5cf6" },
                { name: "App", value: 14, color: "#10b981" },
              ]}
              size={160} label="$12.8k" sublabel="today's revenue"
            />
            <div className="mt-4 space-y-1.5">
              {[{ l: "In-store", v: "58%", c: "#4f6df5" }, { l: "Online", v: "28%", c: "#8b5cf6" }, { l: "App", v: "14%", c: "#10b981" }].map(r => (
                <div key={r.l} className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.c }} />
                  <span className="flex-1">{r.l}</span>
                  <span className="font-mono ink-2">{r.v}</span>
                </div>
              ))}
            </div>
          </Card>
          <AIPanel context="Store analytics · Jun 2026" insights={analyticsInsights} />
        </div>
      </div>
    </div>
  );
}

// ─── 9. Product Catalog ───────────────────────────────────────────────────────

type Product = { id: string; name: string; category: string; price: number; cost: number; variants: number; stock: number; emoji: string; status: "Active" | "Draft" | "Archived" };
const products: Product[] = [
  { id: "P-101", name: "Linen Shirt", category: "Apparel", price: 29, cost: 14.50, variants: 6, stock: 124, emoji: "👕", status: "Active" },
  { id: "P-102", name: "Running Shoes", category: "Footwear", price: 99, cost: 44.00, variants: 8, stock: 34, emoji: "👟", status: "Active" },
  { id: "P-103", name: "Canvas Tote", category: "Accessories", price: 29, cost: 8.20, variants: 3, stock: 211, emoji: "👜", status: "Active" },
  { id: "P-104", name: "Denim Jacket", category: "Apparel", price: 89, cost: 38.00, variants: 5, stock: 58, emoji: "🧥", status: "Active" },
  { id: "P-105", name: "Baseball Cap", category: "Accessories", price: 19, cost: 7.50, variants: 4, stock: 0, emoji: "🧢", status: "Active" },
  { id: "P-106", name: "Sunglasses", category: "Accessories", price: 49, cost: 18.00, variants: 3, stock: 76, emoji: "🕶️", status: "Active" },
  { id: "P-107", name: "Sports Socks 3pk", category: "Apparel", price: 12, cost: 4.80, variants: 2, stock: 312, emoji: "🧦", status: "Active" },
  { id: "P-108", name: "Leather Wallet", category: "Accessories", price: 59, cost: 22.00, variants: 2, stock: 41, emoji: "👛", status: "Draft" },
];
const prodStatusTone: Record<Product["status"], Tone> = { Active: "green", Draft: "amber", Archived: "gray" };

export function ProductCatalogScreen() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [q, setQ] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Total products" value={products.length.toString()} delta="8 SKU families" deltaTone="blue" icon={<Tag size={16} />} />
        <Stat label="Active listings" value={products.filter(p => p.status === "Active").length.toString()} delta="Published to all channels" deltaTone="green" />
        <Stat label="Avg margin" value="54%" delta="+2pts vs last quarter" deltaTone="green" />
        <Stat label="Out of stock" value={products.filter(p => p.stock === 0).length.toString()} delta="Needs restock" deltaTone="red" />
      </div>

      <Card>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 field !py-2 !px-3 flex-1 max-w-xs">
            <Search size={14} className="ink-2 shrink-0" />
            <input value={q} onChange={e => setQ(e.target.value)}
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-[var(--ink-2)]" placeholder="Search products…" />
          </div>
          <button className="btn-ghost text-xs"><Plus size={13} /> Add product</button>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {filtered.map(p => (
            <button key={p.id} onClick={() => setSelected(p)}
              className="card p-4 flex flex-col gap-3 text-left card-hover">
              <div className="flex items-start justify-between">
                <span className="text-3xl">{p.emoji}</span>
                <Badge tone={prodStatusTone[p.status]}>{p.status}</Badge>
              </div>
              <div>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-xs ink-2">{p.category} · {p.variants} variants</div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-mono text-base font-bold">${p.price}</div>
                  <div className="text-[10px] ink-2">Cost ${p.cost.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-semibold ${p.stock === 0 ? "text-rose-500" : "text-emerald-600 dark:text-emerald-400"}`}>{p.stock} in stock</div>
                  <div className="text-[10px] ink-2">Margin {Math.round(((p.price - p.cost) / p.price) * 100)}%</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 ink-2 text-sm">
            <AlertTriangle size={24} className="mx-auto mb-2 opacity-40" />
            No products match "{q}"
          </div>
        )}
      </Card>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Product detail">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{selected.emoji}</span>
              <div>
                <div className="font-display text-xl font-bold">{selected.name}</div>
                <div className="text-xs ink-2 font-mono mt-0.5">{selected.id} · {selected.category}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge tone={prodStatusTone[selected.status]}>{selected.status}</Badge>
              <Badge tone="gray">{selected.variants} variants</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-[var(--line)] p-3 text-center">
                <div className="font-display text-2xl font-bold">${selected.price}</div>
                <div className="text-xs ink-2 mt-0.5">Retail price</div>
              </div>
              <div className="rounded-lg border border-[var(--line)] p-3 text-center">
                <div className="font-display text-2xl font-bold">{Math.round(((selected.price - selected.cost) / selected.price) * 100)}%</div>
                <div className="text-xs ink-2 mt-0.5">Gross margin</div>
              </div>
            </div>
            <div>
              <div className="label mb-2">Stock levels</div>
              <div className={`text-2xl font-bold font-mono ${selected.stock === 0 ? "text-rose-500" : "text-emerald-600 dark:text-emerald-400"}`}>{selected.stock} units</div>
            </div>
            <button className="btn-primary w-full justify-center">Edit product</button>
            <button className="btn-ghost w-full justify-center">Manage variants</button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
