const e=`// src/domains/banking.tsx — VaultBank · retail digital banking (sub-domain of FinTech)
import { useState } from "react";
import { HomePage, LoginPage, RegisterPage, ProfilePage, SettingsPage, FAQPage, SupportPage, DomainMeta } from "./pages";
import { AboutPage, PrivacyPage, PricingPage, NotificationsPage, ChangelogPage, NotFoundPage, DomainExtra } from "./pages-extra";

const bankingMeta: DomainMeta = {
  id: "banking",
  name: "VaultBank",
  tagline: "Everyday banking that feels effortless — accounts, cards, transfers, and savings in one secure app.",
  description: "Check balances, move money, pay bills, and grow savings with VaultBank's digital-first retail banking platform.",
  accentLabel: "Banking · Accounts · Payments",
  features: [
    { icon: "💳", title: "Smart cards", body: "Instant virtual cards, real-time controls, and tap-to-freeze from anywhere." },
    { icon: "🔁", title: "Instant transfers", body: "Move money between accounts or to anyone — internal transfers settle instantly." },
    { icon: "🔐", title: "Bank-grade security", body: "Biometric login, device binding, and 24/7 fraud monitoring on every account." },
  ],
  faqs: [
    { q: "Is my money insured?", a: "Yes. Deposits at VaultBank are FDIC insured up to $250,000 per depositor, per ownership category." },
    { q: "How fast are transfers?", a: "Transfers between VaultBank accounts are instant. External ACH transfers take 1 business day; wires settle same day before the 4pm cutoff." },
    { q: "Are there monthly fees?", a: "The Everyday account is free with no minimum balance. Premium tiers add benefits like fee-free FX and higher savings APY." },
    { q: "Can I deposit checks from the app?", a: "Yes — snap a photo of the front and back of the check. Funds up to $500 are available immediately, the rest next business day." },
    { q: "What if my card is lost or stolen?", a: "Freeze it instantly from the Cards screen, then order a replacement. A virtual card is issued immediately so you can keep paying." },
    { q: "How do I dispute a transaction?", a: "Open the transaction, tap 'Dispute', and answer three questions. Provisional credit is typically issued within 2 business days." },
  ],
  supportEmail: "help@vaultbank.com",
};

export function BankingHome() { return <HomePage meta={bankingMeta} />; }
export function BankingLogin() { return <LoginPage meta={bankingMeta} />; }
export function BankingRegister() { return <RegisterPage meta={bankingMeta} />; }
export function BankingProfile() { return <ProfilePage meta={bankingMeta} />; }
export function BankingSettings() { return <SettingsPage meta={bankingMeta} />; }
export function BankingFAQ() { return <FAQPage meta={bankingMeta} />; }
export function BankingSupport() { return <SupportPage meta={bankingMeta} />; }

const bankingExtra: DomainExtra = {
  founded: "2021",
  mission: "VaultBank exists to make personal banking transparent, instant, and genuinely on the customer's side.",
  story: [
    "VaultBank launched in 2021 after its founders spent a decade inside traditional banks watching customers pay fees for slow, opaque service. They started with one promise: every balance, hold, and fee visible in real time, explained in plain language.",
    "What began as a single free checking account is now a full retail platform — savings goals, certificates of deposit, lending, and multi-currency wallets — serving over 2 million customers with a 4.8-star app rating.",
  ],
  team: [
    { name: "Elena Park", role: "Co-founder & CEO", emoji: "👩‍💼", bio: "Former head of retail digital at a top-10 bank. Believes checking accounts should be free, forever." },
    { name: "Marcus Adeyemi", role: "Co-founder & CTO", emoji: "👨‍💻", bio: "Built core-banking ledgers for two challenger banks. Obsessive about double-entry correctness." },
    { name: "Priya Raghavan", role: "Head of Risk & Fraud", emoji: "🛡️", bio: "Ex-card-network fraud lead. Runs the models that stop a fraudulent swipe in under 80ms." },
    { name: "Tomás Silva", role: "Head of Product Design", emoji: "🎨", bio: "Designs banking flows your grandmother can finish. Previously led design at a savings app." },
  ],
  compliance: [
    { name: "FDIC Insurance", desc: "Deposits insured up to $250,000 per depositor through our partner bank network.", status: "Compliant" },
    { name: "PCI DSS Level 1", desc: "Highest payment card security standard; PANs are tokenized end to end.", status: "Certified" },
    { name: "SOC 2 Type II", desc: "Annual independent audit of security, availability, and confidentiality controls.", status: "Certified" },
    { name: "Reg E / EFTA", desc: "Full electronic funds transfer error-resolution and dispute workflows.", status: "Compliant" },
    { name: "BSA / AML", desc: "Transaction monitoring, sanctions screening, and SAR filing program.", status: "Compliant" },
    { name: "GDPR & CCPA", desc: "Data subject rights, deletion workflows, and consent management for EU/CA customers.", status: "Compliant" },
  ],
  dataRetention: "Account and transaction records are retained for 7 years after account closure as required by banking regulations (BSA). App analytics are anonymized after 13 months. You can request a full export of your data at any time from Settings.",
  plans: [
    { name: "Everyday", price: "Free", desc: "Full-featured checking for everyone.", features: ["No monthly fees", "Free debit card", "Instant internal transfers", "Mobile check deposit"], cta: "Open an account" },
    { name: "Premium", price: "$9", period: "mo", desc: "For people who bank a lot — and travel.", features: ["4.5% APY savings", "Fee-free FX & ATM worldwide", "Metal debit card", "Priority support", "2 sub-accounts"], highlight: true, cta: "Go Premium" },
    { name: "Family", price: "$19", period: "mo", desc: "Shared finances without shared logins.", features: ["Up to 6 members", "Joint & teen accounts", "Shared savings goals", "Parental card controls", "Family spending insights"], cta: "Start Family plan" },
  ],
  notifications: [
    { title: "Direct deposit received", body: "Your salary of $4,820.00 from Brightline Studio LLC just arrived in Checking ••2210.", time: "8 min ago", tone: "green", unread: true },
    { title: "Unusual sign-in blocked", body: "A sign-in attempt from a new device in Lisbon, PT was blocked. Confirm it was you to allow the device.", time: "1 h ago", tone: "red", unread: true },
    { title: "Bill due tomorrow", body: "City Power & Light ($128.40) is due Jun 13. Autopay is off for this payee.", time: "3 h ago", tone: "amber", unread: true },
    { title: "Savings goal milestone", body: "Emergency Fund just crossed 75% — $7,520 of $10,000 saved. Keep it up!", time: "Yesterday", tone: "blue" },
    { title: "CD maturing soon", body: "Your 6-month CD ($15,000 @ 5.1%) matures Jun 24. Choose renew, ladder, or withdraw.", time: "2 days ago", tone: "violet" },
  ],
  changelog: [
    { version: "v3.8", date: "Jun 5, 2026", tag: "New", items: ["Multi-currency wallets with 28 currencies", "Round-up savings on debit purchases", "Shared savings goals for Family plans"] },
    { version: "v3.7", date: "May 14, 2026", tag: "Improved", items: ["Check deposits now clear up to $1,000 instantly", "Redesigned card controls with merchant-level locks", "Faster biometric login on Android"] },
    { version: "v3.6", date: "Apr 18, 2026", tag: "Fixed", items: ["Duplicate push notifications on bill reminders", "Statement PDFs missing pending interest line", "FX rate refresh stalling on slow connections"] },
  ],
};

export function BankingAbout() { return <AboutPage meta={bankingMeta} extra={bankingExtra} />; }
export function BankingPrivacy() { return <PrivacyPage meta={bankingMeta} extra={bankingExtra} />; }
export function BankingPricing() { return <PricingPage meta={bankingMeta} extra={bankingExtra} />; }
export function BankingNotifications() { return <NotificationsPage meta={bankingMeta} extra={bankingExtra} />; }
export function BankingChangelog() { return <ChangelogPage meta={bankingMeta} extra={bankingExtra} />; }
export function BankingNotFound() { return <NotFoundPage meta={bankingMeta} />; }

import {
  Wallet, ArrowDownLeft, ArrowUpRight, ArrowLeftRight, CreditCard, Snowflake,
  CheckCircle2, PiggyBank, Banknote, Globe, FileText, Download, Receipt,
  ShieldCheck, Plus, Landmark, TrendingUp, CalendarDays, Users,
} from "lucide-react";
import { Card, SectionTitle, Badge, Stat, Drawer, Skeleton, useFakeSubmit, Toggle, Tone } from "../components/ui";
import { AreaChart, Bars, Donut, Sparkline } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

function money(n: number) {
  return (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// ─── Accounts overview ────────────────────────────────────────────────────────

type Account = { id: string; name: string; number: string; type: string; balance: number; apy?: string };
const accounts: Account[] = [
  { id: "ACC-2210", name: "Everyday Checking", number: "••2210", type: "Checking", balance: 6482.19 },
  { id: "ACC-8841", name: "High-Yield Savings", number: "••8841", type: "Savings", balance: 18250.0, apy: "4.5% APY" },
  { id: "ACC-5520", name: "6-month CD", number: "••5520", type: "Certificate", balance: 15000.0, apy: "5.1% APY" },
  { id: "ACC-7733", name: "Vault Credit Card", number: "••7733", type: "Credit", balance: -1240.55 },
];

type Activity = { id: string; desc: string; date: string; amount: number; account: string; status: "Posted" | "Pending" };
const activity: Activity[] = [
  { id: "TXN-88412", desc: "Brightline Studio LLC · Payroll", date: "Jun 12, 06:02", amount: 4820, account: "Checking ••2210", status: "Posted" },
  { id: "TXN-88409", desc: "Whole Harvest Market", date: "Jun 11, 18:44", amount: -86.3, account: "Debit ••4410", status: "Posted" },
  { id: "TXN-88404", desc: "Transfer to High-Yield Savings", date: "Jun 11, 09:00", amount: -500, account: "Checking ••2210", status: "Posted" },
  { id: "TXN-88399", desc: "Cobalt Coffee Roasters", date: "Jun 10, 08:12", amount: -6.75, account: "Debit ••4410", status: "Pending" },
  { id: "TXN-88395", desc: "City Power & Light · Autopay", date: "Jun 9, 04:00", amount: -128.4, account: "Checking ••2210", status: "Posted" },
];

const dashInsights: Insight[] = [
  { title: "Idle cash earning 0%", body: "Checking has averaged $5,900 over 60 days. Moving $3,000 to High-Yield Savings earns ~$135/year at 4.5% APY.", tone: "green", tag: "Savings", confidence: 93 },
  { title: "Subscription creep", body: "Recurring charges grew from $84 to $131/month since March. Two streaming services overlap in content.", tone: "amber", tag: "Spending", confidence: 85 },
  { title: "CD decision due", body: "Your 6-month CD matures Jun 24. Current 6-month renewal rate is 4.8% — laddering into 3/6/9-month terms keeps liquidity.", tone: "blue", tag: "Maturity", confidence: 78 },
];

export function BankingDashboard() {
  const [selected, setSelected] = useState<Account | null>(null);
  const total = accounts.reduce((s, a) => s + a.balance, 0);
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Total balance" value={money(total)} delta="+$4,210 this month" icon={<Wallet size={16} />} />
          <Stat label="Money in · 30d" value="$9,640" delta="+8.2%" icon={<ArrowDownLeft size={16} />} />
          <Stat label="Money out · 30d" value="$5,430" delta="−3.1% vs May" deltaTone="green" icon={<ArrowUpRight size={16} />} />
        </div>
        <Card>
          <SectionTitle eyebrow="Accounts" title="Your accounts" right={<Badge tone="blue">{accounts.length} open</Badge>} />
          <div className="divide-y divide-[var(--line)]">
            {accounts.map(a => (
              <button key={a.id} onClick={() => setSelected(a)}
                className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_110px_130px] items-center gap-3 py-3 text-left hover:bg-accent/5 rounded-lg px-2 -mx-2 transition-colors">
                <div>
                  <div className="text-sm font-medium">{a.name}</div>
                  <div className="text-xs ink-2 font-mono">{a.type} · {a.number}</div>
                </div>
                <div className="text-xs ink-2 hidden sm:block">{a.apy ?? "—"}</div>
                <div className={\`text-sm font-semibold font-mono text-right \${a.balance < 0 ? "text-rose-600 dark:text-rose-400" : ""}\`}>{money(a.balance)}</div>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Activity" title="Recent transactions" right={<span className="text-xs ink-2">{activity.length} of 842</span>} />
          <div className="divide-y divide-[var(--line)]">
            {activity.map(t => (
              <div key={t.id} className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_120px_100px_80px] items-center gap-3 py-3">
                <div>
                  <div className="text-sm font-medium">{t.desc}</div>
                  <div className="text-xs ink-2 font-mono">{t.account}</div>
                </div>
                <div className="text-xs ink-2 hidden sm:block">{t.date}</div>
                <div className={\`text-sm font-semibold font-mono text-right \${t.amount > 0 ? "text-emerald-600 dark:text-emerald-400" : ""}\`}>{money(t.amount)}</div>
                <div className="text-right"><Badge tone={t.status === "Posted" ? "green" : "amber"}>{t.status}</Badge></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Trend" title="Net worth · 12 weeks" right={<TrendingUp size={15} className="text-accent" />} />
          <AreaChart data={[31, 32, 31.4, 33, 34.2, 33.8, 35, 36.4, 36, 37.2, 38, 38.5]} height={140} />
          <p className="text-sm ink-2 mt-3">Up <span className="font-semibold text-[var(--ink)]">$7,500</span> since March, driven by payroll deposits and CD interest.</p>
        </Card>
        <AIPanel context="Personal accounts & cash flow, last 30 days" insights={dashInsights} />
      </div>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Account detail">
        {selected && (
          <div className="space-y-4">
            <div className={\`font-display text-3xl font-bold \${selected.balance < 0 ? "text-rose-600 dark:text-rose-400" : ""}\`}>{money(selected.balance)}</div>
            <Badge tone={selected.balance < 0 ? "amber" : "green"}>{selected.type}</Badge>
            <dl className="space-y-3 text-sm">
              {[["Account", selected.name], ["Number", selected.number], ["Routing", "021000089"], ["Rate", selected.apy ?? "Not interest-bearing"], ["Opened", "Mar 2021"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[var(--line)] pb-2">
                  <dt className="ink-2">{k}</dt><dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <button className="btn-primary w-full justify-center">View statements</button>
            <button className="btn-ghost w-full justify-center">Account settings</button>
          </div>
        )}
      </Drawer>
    </div>
  );
}

// ─── Transfers ────────────────────────────────────────────────────────────────

const scheduled = [
  { to: "High-Yield Savings ••8841", amount: "$500.00", when: "Monthly · 11th", note: "Auto-save" },
  { to: "Rent · A. Okonkwo", amount: "$1,850.00", when: "Monthly · 1st", note: "Zelle" },
  { to: "Mom · M. Park", amount: "$200.00", when: "Bi-weekly · Fri", note: "Internal" },
];

export function TransferScreen() {
  const { state, submit, reset } = useFakeSubmit();
  return (
    <div className="grid gap-5 lg:grid-cols-5 max-w-5xl mx-auto">
      <Card className="lg:col-span-3">
        <SectionTitle eyebrow="Move money" title="Make a transfer" right={<ArrowLeftRight size={15} className="text-accent" />} />
        {state === "done" ? (
          <div className="text-center py-10 animate-fadeUp">
            <CheckCircle2 className="mx-auto text-emerald-500" size={40} />
            <div className="font-display font-semibold mt-3">Transfer complete</div>
            <p className="text-sm ink-2 mt-1">$750.00 moved to High-Yield Savings instantly. Reference TRF-5512.</p>
            <button className="btn-ghost mt-5" onClick={reset}>Make another transfer</button>
          </div>
        ) : state === "loading" ? (
          <div className="space-y-3 py-2"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 animate-fadeUp">
            <div><label className="label">From</label>
              <select className="field"><option>Everyday Checking · ••2210</option><option>High-Yield Savings · ••8841</option></select>
            </div>
            <div><label className="label">To</label>
              <select className="field"><option>High-Yield Savings · ••8841</option><option>Everyday Checking · ••2210</option><option>External · Chase ••9044</option><option>Saved payee…</option></select>
            </div>
            <div><label className="label">Amount</label><input className="field font-mono" defaultValue="$750.00" /></div>
            <div><label className="label">When</label><select className="field"><option>Now (instant)</option><option>Tomorrow</option><option>Pick a date…</option><option>Make it recurring</option></select></div>
            <div className="sm:col-span-2"><label className="label">Memo (optional)</label><input className="field" placeholder="What's it for?" defaultValue="June savings top-up" /></div>
            <div className="sm:col-span-2 rounded-lg border border-[var(--line)] p-3 text-xs ink-2 leading-relaxed">
              Internal transfers are <span className="font-semibold text-[var(--ink)]">instant and free</span>. External ACH arrives in 1 business day; same-day wire available for $15.
            </div>
            <div className="sm:col-span-2 flex justify-end"><button className="btn-primary" onClick={submit}><ArrowLeftRight size={15} /> Review & transfer</button></div>
          </div>
        )}
      </Card>
      <div className="lg:col-span-2 space-y-5">
        <Card>
          <SectionTitle eyebrow="Recurring" title="Scheduled transfers" />
          <div className="space-y-2">
            {scheduled.map(s => (
              <div key={s.to} className="rounded-lg border border-[var(--line)] p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium">{s.to}</div>
                  <span className="text-sm font-mono font-semibold">{s.amount}</span>
                </div>
                <div className="text-xs ink-2 mt-0.5">{s.when} · {s.note}</div>
              </div>
            ))}
          </div>
          <button className="btn-ghost text-xs mt-3"><Plus size={13} /> New recurring transfer</button>
        </Card>
        <Card>
          <SectionTitle eyebrow="Limits" title="Daily limits" />
          {([["Internal transfers", 100, "Unlimited"], ["External ACH", 32, "$8,000 of $25,000"], ["Wires", 10, "$5,000 of $50,000"]] as [string, number, string][]).map(([k, pct, v]) => (
            <div key={k} className="mb-3 last:mb-0">
              <div className="flex justify-between text-xs mb-1"><span className="ink-2">{k}</span><span className="font-mono">{v}</span></div>
              <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: \`\${pct}%\` }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── Bill pay ─────────────────────────────────────────────────────────────────

type Bill = { id: string; payee: string; amount: number; due: string; category: string; autopay: boolean };
const billsSeed: Bill[] = [
  { id: "BILL-301", payee: "City Power & Light", amount: 128.4, due: "Jun 13", category: "Utilities", autopay: false },
  { id: "BILL-298", payee: "Northgate Apartments", amount: 1850, due: "Jul 1", category: "Rent", autopay: true },
  { id: "BILL-296", payee: "Streamline Internet", amount: 64.99, due: "Jun 18", category: "Internet", autopay: true },
  { id: "BILL-294", payee: "Apex Auto Insurance", amount: 142.5, due: "Jun 22", category: "Insurance", autopay: false },
  { id: "BILL-290", payee: "Vault Credit Card", amount: 1240.55, due: "Jun 28", category: "Credit card", autopay: true },
];

export function BillPayScreen() {
  const [paid, setPaid] = useState<Record<string, boolean>>({});
  const [autopay, setAutopay] = useState<Record<string, boolean>>(Object.fromEntries(billsSeed.map(b => [b.id, b.autopay])));
  const dueSoon = billsSeed.filter(b => !paid[b.id]).length;
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Bills this month" value={String(billsSeed.length)} delta={\`\${dueSoon} unpaid\`} deltaTone={dueSoon > 0 ? "amber" : "green"} icon={<Receipt size={16} />} />
        <Stat label="Total due · June" value="$3,426" delta="−$112 vs May" deltaTone="green" />
        <Stat label="On autopay" value={\`\${Object.values(autopay).filter(Boolean).length} of \${billsSeed.length}\`} delta="Never miss a due date" deltaTone="blue" />
      </div>
      <Card>
        <SectionTitle eyebrow="Bill pay" title="Upcoming bills" right={<button className="btn-ghost !py-1 !px-2 text-xs"><Plus size={13} /> Add payee</button>} />
        <div className="space-y-3">
          {billsSeed.map(b => {
            const isPaid = !!paid[b.id];
            return (
              <div key={b.id} className={\`rounded-lg border p-4 transition-all duration-300 \${isPaid ? "border-emerald-500/40 bg-emerald-500/5" : "border-[var(--line)]"}\`}>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-44">
                    <div className="text-sm font-medium">{b.payee}</div>
                    <div className="text-xs ink-2 mt-0.5">Due {b.due} · {b.category} · <span className="font-mono">{b.id}</span></div>
                  </div>
                  <div className="font-mono font-semibold">{money(b.amount)}</div>
                  <div className="flex items-center gap-2 text-xs ink-2">
                    Autopay
                    <Toggle on={!!autopay[b.id]} onChange={v => setAutopay(a => ({ ...a, [b.id]: v }))} label={\`Autopay for \${b.payee}\`} />
                  </div>
                  {isPaid ? (
                    <Badge tone="green">Paid</Badge>
                  ) : (
                    <button className="btn-primary !py-1.5 text-xs" onClick={() => setPaid(p => ({ ...p, [b.id]: true }))}>Pay now</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card>
        <SectionTitle eyebrow="History" title="Payments · last 6 months" />
        <Bars data={[{label:"Jan",value:3210},{label:"Feb",value:3380},{label:"Mar",value:3290},{label:"Apr",value:3550},{label:"May",value:3538},{label:"Jun",value:3426}]} height={160} />
      </Card>
    </div>
  );
}

// ─── Cards ────────────────────────────────────────────────────────────────────

const bankCards = [
  { id: "4410", label: "Everyday Debit", kind: "Debit · Physical", spent: 1184, limit: 3000, trend: [9, 8, 11, 10, 12, 11.8] },
  { id: "9982", label: "Online Shopping", kind: "Debit · Virtual", spent: 286, limit: 500, trend: [2, 3, 2.5, 4, 3, 2.9] },
  { id: "7733", label: "Vault Credit Card", kind: "Credit · Physical", spent: 1240, limit: 8000, trend: [10, 11, 9, 12, 13, 12.4] },
];

export function BankCardsScreen() {
  const [frozen, setFrozen] = useState<Record<string, boolean>>({});
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <SectionTitle eyebrow="Cards" title="Your cards" right={<Badge tone="blue">3 active</Badge>} />
      <div className="grid gap-4">
        {bankCards.map(c => {
          const pct = Math.round((c.spent / c.limit) * 100);
          const isFrozen = !!frozen[c.id];
          return (
            <Card key={c.id} className={\`card-hover transition-opacity \${isFrozen ? "opacity-60" : ""}\`}>
              <div className="flex flex-wrap items-center gap-4">
                <div className={\`h-12 w-[76px] rounded-lg grid place-items-center text-white shrink-0 \${isFrozen ? "bg-zinc-500" : "bg-gradient-to-br from-accent to-grad"}\`}>
                  <CreditCard size={18} />
                </div>
                <div className="flex-1 min-w-40">
                  <div className="text-sm font-semibold">{c.label}</div>
                  <div className="text-xs ink-2 font-mono">{c.kind} · •••• {c.id}</div>
                </div>
                <Sparkline data={c.trend} color={pct > 90 ? "#f43f5e" : "#4f6df5"} />
                <div className="text-right">
                  <div className="text-sm font-mono font-semibold">{money(c.spent)} <span className="ink-2 font-normal">/ {money(c.limit)}</span></div>
                  <div className="text-[11px] ink-2">{pct}% of {c.kind.startsWith("Credit") ? "credit limit" : "monthly cap"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Snowflake size={14} className={isFrozen ? "text-sky-500" : "ink-2"} />
                  <Toggle on={isFrozen} onChange={v => setFrozen(f => ({ ...f, [c.id]: v }))} label={\`Freeze card \${c.id}\`} />
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                <div className={\`h-full rounded-full transition-all duration-500 \${pct > 90 ? "bg-rose-500" : pct > 70 ? "bg-amber-500" : "bg-accent"}\`} style={{ width: \`\${pct}%\` }} />
              </div>
              {isFrozen && <div className="mt-2 text-xs text-sky-600 dark:text-sky-400 font-medium animate-fadeUp">Card frozen — every new authorization will be declined until you unfreeze.</div>}
            </Card>
          );
        })}
      </div>
      <Card>
        <SectionTitle eyebrow="Controls" title="Card security" />
        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          {[["Online payments", "Allowed · 3DS required"], ["International use", "Blocked outside US & EU"], ["ATM withdrawals", "$500 daily limit"]].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-[var(--line)] p-3.5">
              <div className="font-medium">{k}</div>
              <div className="text-xs ink-2 mt-0.5">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/8 p-3 text-xs leading-relaxed flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span><span className="font-semibold">Fraud monitoring on.</span> Suspicious swipes are declined in real time and you're notified instantly.</span>
        </div>
      </Card>
    </div>
  );
}

// ─── Deposits & savings ───────────────────────────────────────────────────────

const goals = [
  { name: "Emergency fund", saved: 7520, target: 10000, color: "#10b981" },
  { name: "Japan trip · Oct", saved: 2140, target: 4500, color: "#4f6df5" },
  { name: "New laptop", saved: 980, target: 1600, color: "#8b5cf6" },
];
const cdLadder = [
  { term: "3-month", rate: "4.6%", amount: "$5,000", matures: "Aug 12, 2026", status: "Active" },
  { term: "6-month", rate: "5.1%", amount: "$15,000", matures: "Jun 24, 2026", status: "Maturing" },
  { term: "12-month", rate: "4.9%", amount: "$10,000", matures: "Feb 3, 2027", status: "Active" },
];

export function DepositsScreen() {
  const { state, submit, reset } = useFakeSubmit();
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Total saved" value="$48,890" delta="+$1,920 this month" icon={<PiggyBank size={16} />} />
          <Stat label="Blended APY" value="4.7%" delta="vs 0.4% national avg" deltaTone="green" />
          <Stat label="Interest · YTD" value="$1,084" delta="On track for $2,300" deltaTone="blue" />
        </div>
        <Card>
          <SectionTitle eyebrow="Goals" title="Savings goals" right={<button className="btn-ghost !py-1 !px-2 text-xs"><Plus size={13} /> New goal</button>} />
          <div className="space-y-4">
            {goals.map(g => {
              const pct = Math.round((g.saved / g.target) * 100);
              return (
                <div key={g.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{g.name}</span>
                    <span className="font-mono text-xs ink-2">{money(g.saved)} / {money(g.target)} · {pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: \`\${pct}%\`, background: g.color }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-lg border border-[var(--line)] p-3 text-xs ink-2 leading-relaxed">
            <span className="font-semibold text-[var(--ink)]">Round-ups on.</span> Debit purchases round up to the nearest dollar — $38.20 added to Emergency fund this month.
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Certificates" title="CD ladder" right={<Badge tone="amber">1 maturing</Badge>} />
          <div className="divide-y divide-[var(--line)]">
            {cdLadder.map(cd => (
              <div key={cd.term} className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_90px_110px_90px] items-center gap-3 py-3">
                <div>
                  <div className="text-sm font-medium">{cd.term} CD</div>
                  <div className="text-xs ink-2">Matures {cd.matures}</div>
                </div>
                <div className="text-xs font-mono ink-2 hidden sm:block">{cd.rate}</div>
                <div className="text-sm font-semibold font-mono text-right">{cd.amount}</div>
                <div className="text-right"><Badge tone={cd.status === "Maturing" ? "amber" : "green"}>{cd.status}</Badge></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Open" title="New certificate of deposit" />
          {state === "done" ? (
            <div className="text-center py-8 animate-fadeUp">
              <CheckCircle2 className="mx-auto text-emerald-500" size={36} />
              <div className="font-display font-semibold mt-3">CD opened</div>
              <p className="text-sm ink-2 mt-1">$5,000 locked at 4.8% for 6 months. Matures Dec 12, 2026.</p>
              <button className="btn-ghost mt-4" onClick={reset}>Open another</button>
            </div>
          ) : state === "loading" ? (
            <div className="space-y-3 py-2"><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
          ) : (
            <div className="space-y-4 animate-fadeUp">
              <div><label className="label">Amount</label><input className="field font-mono" defaultValue="$5,000.00" /></div>
              <div><label className="label">Term</label>
                <select className="field"><option>3 months · 4.6% APY</option><option>6 months · 4.8% APY</option><option>12 months · 4.9% APY</option><option>24 months · 4.5% APY</option></select>
              </div>
              <div><label className="label">Fund from</label><select className="field"><option>High-Yield Savings · ••8841</option><option>Everyday Checking · ••2210</option></select></div>
              <button className="btn-primary w-full justify-center" onClick={submit}><Landmark size={15} /> Open CD</button>
            </div>
          )}
        </Card>
        <AIPanel context="Savings & deposit products" insights={[
          { title: "Ladder the maturing CD", body: "Splitting the $15,000 maturity across 3/6/12-month terms keeps ~$5,000 accessible each quarter with only 0.2% blended yield give-up.", tone: "blue", tag: "Strategy", confidence: 84 },
          { title: "Goal pacing ahead", body: "Emergency fund completes 5 weeks early at the current $500/month auto-save. Consider redirecting the surplus to the Japan trip goal.", tone: "green", tag: "Goals", confidence: 90 },
        ]} />
      </div>
    </div>
  );
}

// ─── Loans & mortgage ─────────────────────────────────────────────────────────

const loans = [
  { id: "LN-2201", name: "Auto loan · 2024 Subaru", rate: "6.2%", paid: 8400, total: 24000, payment: "$435/mo", next: "Jul 1" },
  { id: "LN-1187", name: "Mortgage · 14 Cedar Lane", rate: "5.4%", paid: 61200, total: 380000, payment: "$2,140/mo", next: "Jul 1" },
];

export function LoansScreen() {
  const [amount, setAmount] = useState(20000);
  const [months, setMonths] = useState(48);
  const rate = 0.072 / 12;
  const emi = Math.round((amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1));
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Active loans" value="2" delta="All current" deltaTone="green" icon={<Banknote size={16} />} />
          <Stat label="Total owed" value="$334,400" delta="−$2,575 last month" deltaTone="green" />
          <Stat label="Next payment" value="$2,575" delta="Due Jul 1 · autopay on" deltaTone="blue" />
        </div>
        <Card>
          <SectionTitle eyebrow="Loans" title="Your loans" />
          <div className="space-y-4">
            {loans.map(l => {
              const pct = Math.round((l.paid / l.total) * 100);
              return (
                <div key={l.id} className="rounded-lg border border-[var(--line)] p-4">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div className="flex-1 min-w-44">
                      <div className="text-sm font-medium">{l.name}</div>
                      <div className="text-xs ink-2 font-mono">{l.id} · {l.rate} APR · {l.payment}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-semibold">{money(l.paid)} <span className="ink-2 font-normal">of {money(l.total)}</span></div>
                      <div className="text-[11px] ink-2">{pct}% repaid · next due {l.next}</div>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: \`\${pct}%\` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Payoff" title="Mortgage balance projection" />
          <AreaChart data={[380, 372, 363, 355, 346, 337, 327, 318, 308, 298]} stroke="#8b5cf6" height={140} />
          <p className="text-sm ink-2 mt-3">One extra $200/month principal payment shortens the term by <span className="font-semibold text-[var(--ink)]">3.1 years</span> and saves ~$41,000 in interest.</p>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Calculator" title="Personal loan estimate" />
          <div className="space-y-4 mt-2">
            <div>
              <div className="flex justify-between text-xs mb-1"><span className="label !mb-0">Amount</span><span className="font-mono">{money(amount)}</span></div>
              <input type="range" min={2000} max={50000} step={1000} value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full accent-accent cursor-pointer" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span className="label !mb-0">Term</span><span className="font-mono">{months} mo</span></div>
              <input type="range" min={12} max={72} step={6} value={months} onChange={e => setMonths(Number(e.target.value))} className="w-full accent-accent cursor-pointer" />
            </div>
            <div className="rounded-lg border border-[var(--line)] p-4 text-center">
              <div className="text-xs ink-2">Estimated monthly payment · 7.2% APR</div>
              <div className="font-display text-3xl font-bold mt-1">{money(emi)}</div>
              <div className="text-[11px] ink-2 mt-1">Total repayment {money(emi * months)} · no origination fee</div>
            </div>
            <button className="btn-primary w-full justify-center">Check my rate</button>
            <p className="text-[11px] ink-2 text-center">Checking your rate won't affect your credit score.</p>
          </div>
        </Card>
        <AIPanel context="Lending & repayment" insights={[
          { title: "Refi window open", body: "30-year rates dropped to 5.1%. Refinancing your 5.4% mortgage breaks even on closing costs in 22 months.", tone: "green", tag: "Refinance", confidence: 81 },
          { title: "Auto loan ahead of schedule", body: "You've paid 35% of principal in 30% of the term. Keeping the pace clears the loan 4 months early.", tone: "blue", tag: "Payoff", confidence: 88 },
        ]} />
      </div>
    </div>
  );
}

// ─── Beneficiaries & payees ───────────────────────────────────────────────────

type Payee = { id: string; name: string; detail: string; kind: string; verified: boolean; last: string };
const payeesSeed: Payee[] = [
  { id: "PYE-101", name: "Aisha Okonkwo", detail: "Zelle · aisha@northgate.example", kind: "Person", verified: true, last: "$1,850 · Jun 1" },
  { id: "PYE-098", name: "Margaret Park", detail: "Internal · VaultBank ••6620", kind: "Person", verified: true, last: "$200 · Jun 6" },
  { id: "PYE-094", name: "City Power & Light", detail: "Bill pay · account 84-22019", kind: "Biller", verified: true, last: "$128.40 · Jun 9" },
  { id: "PYE-090", name: "Chase ••9044 (mine)", detail: "External ACH · linked via Plaid", kind: "Own account", verified: true, last: "$2,000 · May 28" },
  { id: "PYE-087", name: "Daniel Reyes", detail: "ACH · routing 0260…/acct ••1182", kind: "Person", verified: false, last: "Never paid" },
];

export function BeneficiariesScreen() {
  const { state, submit, reset } = useFakeSubmit();
  return (
    <div className="grid gap-5 lg:grid-cols-5 max-w-5xl mx-auto">
      <Card className="lg:col-span-3">
        <SectionTitle eyebrow="Payees" title="Saved payees & beneficiaries" right={<Badge tone="blue">{payeesSeed.length} saved</Badge>} />
        <div className="space-y-2">
          {payeesSeed.map(p => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-[var(--line)] p-3 hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-9 w-9 rounded-full bg-accent/12 text-accent text-xs font-bold">
                  {p.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <div className="text-sm font-medium flex items-center gap-1.5">
                    {p.name}
                    {p.verified ? <ShieldCheck size={13} className="text-emerald-500" /> : <Badge tone="amber">Unverified</Badge>}
                  </div>
                  <div className="text-xs ink-2">{p.detail}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] ink-2">{p.kind}</div>
                <div className="text-xs font-mono ink-2">{p.last}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/8 p-3 text-xs leading-relaxed">
          <span className="font-semibold">New-payee hold.</span> First payments to a newly added payee over $1,000 are held for 24 hours as a fraud safeguard.
        </div>
      </Card>
      <Card className="lg:col-span-2">
        <SectionTitle eyebrow="Add" title="New payee" right={<Users size={15} className="text-accent" />} />
        {state === "done" ? (
          <div className="text-center py-8 animate-fadeUp">
            <CheckCircle2 className="mx-auto text-emerald-500" size={36} />
            <div className="font-display font-semibold mt-3">Payee added</div>
            <p className="text-sm ink-2 mt-1">A micro-deposit verification was sent — usually confirms within 1 business day.</p>
            <button className="btn-ghost mt-4" onClick={reset}>Add another</button>
          </div>
        ) : state === "loading" ? (
          <div className="space-y-3 py-2"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
        ) : (
          <div className="space-y-4 animate-fadeUp">
            <div><label className="label">Full name</label><input className="field" placeholder="Payee name" /></div>
            <div><label className="label">Method</label>
              <select className="field"><option>Zelle (email or phone)</option><option>ACH (routing + account)</option><option>VaultBank internal</option><option>Bill-pay merchant</option></select>
            </div>
            <div><label className="label">Account / handle</label><input className="field font-mono" placeholder="e.g. name@email.com" /></div>
            <div><label className="label">Nickname (optional)</label><input className="field" placeholder="e.g. Landlord" /></div>
            <button className="btn-primary w-full justify-center" onClick={submit}><Plus size={15} /> Save payee</button>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── Statements & documents ───────────────────────────────────────────────────

type Doc = { id: string; title: string; account: string; date: string; kind: "Statement" | "Tax form" | "Notice"; size: string };
const docs: Doc[] = [
  { id: "DOC-664", title: "May 2026 statement", account: "Checking ••2210", date: "Jun 1, 2026", kind: "Statement", size: "182 KB" },
  { id: "DOC-663", title: "May 2026 statement", account: "Savings ••8841", date: "Jun 1, 2026", kind: "Statement", size: "96 KB" },
  { id: "DOC-660", title: "April 2026 statement", account: "Checking ••2210", date: "May 1, 2026", kind: "Statement", size: "175 KB" },
  { id: "DOC-655", title: "1099-INT · Tax year 2025", account: "All accounts", date: "Jan 28, 2026", kind: "Tax form", size: "64 KB" },
  { id: "DOC-651", title: "APY change notice", account: "Savings ••8841", date: "Jan 12, 2026", kind: "Notice", size: "41 KB" },
  { id: "DOC-648", title: "December 2025 statement", account: "Checking ••2210", date: "Jan 1, 2026", kind: "Statement", size: "168 KB" },
];
const docTone: Record<Doc["kind"], Tone> = { Statement: "blue", "Tax form": "violet", Notice: "amber" };

export function StatementsScreen() {
  const [filter, setFilter] = useState<"All" | Doc["kind"]>("All");
  const shown = docs.filter(d => filter === "All" || d.kind === filter);
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Card>
        <SectionTitle eyebrow="Documents" title="Statements & documents" right={<FileText size={15} className="text-accent" />} />
        <div className="flex gap-2 mb-4">
          {(["All", "Statement", "Tax form", "Notice"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={\`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors \${filter === f ? "bg-accent text-white border-accent" : "surface ink-2 border-[var(--line)]"}\`}>
              {f}
            </button>
          ))}
        </div>
        <div className="divide-y divide-[var(--line)]">
          {shown.map(d => (
            <div key={d.id} className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_110px_90px_44px] items-center gap-3 py-3">
              <div>
                <div className="text-sm font-medium">{d.title}</div>
                <div className="text-xs ink-2">{d.account} · {d.date} · {d.size}</div>
              </div>
              <div className="hidden sm:block"><Badge tone={docTone[d.kind]}>{d.kind}</Badge></div>
              <span className="text-xs font-mono ink-2 text-right">PDF</span>
              <button className="btn-ghost !p-2 justify-self-end" aria-label={\`Download \${d.title}\`} title="Download PDF">
                <Download size={14} />
              </button>
            </div>
          ))}
          {shown.length === 0 && <div className="py-6 text-sm ink-2 text-center">No documents of this type.</div>}
        </div>
      </Card>
      <Card>
        <SectionTitle eyebrow="Delivery" title="Statement preferences" />
        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          {[["Delivery", "Paperless · email alert"], ["Frequency", "Monthly, on the 1st"], ["Archive", "7 years retained"]].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-[var(--line)] p-3.5">
              <div className="font-medium">{k}</div>
              <div className="text-xs ink-2 mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Currency exchange ────────────────────────────────────────────────────────

const fxRates: Record<string, { rate: number; flag: string }> = {
  EUR: { rate: 0.91, flag: "🇪🇺" },
  GBP: { rate: 0.78, flag: "🇬🇧" },
  JPY: { rate: 152.4, flag: "🇯🇵" },
  INR: { rate: 83.6, flag: "🇮🇳" },
};
const fxHistory = [
  { to: "EUR", desc: "Sent €640.00 to N. Laurent", date: "Jun 4", usd: "$704.18" },
  { to: "JPY", desc: "Loaded ¥45,000 travel wallet", date: "May 22", usd: "$296.30" },
  { to: "GBP", desc: "Sent £210.00 to flat deposit", date: "May 9", usd: "$270.05" },
];

export function CurrencyExchangeScreen() {
  const [currency, setCurrency] = useState("EUR");
  const [usd, setUsd] = useState(500);
  const { state, submit, reset } = useFakeSubmit();
  const fx = fxRates[currency];
  const converted = (usd * fx.rate).toLocaleString(undefined, { maximumFractionDigits: 2 });
  return (
    <div className="grid gap-5 lg:grid-cols-5 max-w-5xl mx-auto">
      <Card className="lg:col-span-3">
        <SectionTitle eyebrow="Foreign exchange" title="Convert & send" right={<Globe size={15} className="text-accent" />} />
        {state === "done" ? (
          <div className="text-center py-10 animate-fadeUp">
            <CheckCircle2 className="mx-auto text-emerald-500" size={40} />
            <div className="font-display font-semibold mt-3">Exchange complete</div>
            <p className="text-sm ink-2 mt-1">{fx.flag} {converted} {currency} added to your multi-currency wallet. Rate locked at {fx.rate}.</p>
            <button className="btn-ghost mt-5" onClick={reset}>New exchange</button>
          </div>
        ) : state === "loading" ? (
          <div className="space-y-3 py-2"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
        ) : (
          <div className="space-y-4 animate-fadeUp">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">You convert (USD)</label>
                <input className="field font-mono" type="number" value={usd} onChange={e => setUsd(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label className="label">To currency</label>
                <select className="field" value={currency} onChange={e => setCurrency(e.target.value)}>
                  {Object.entries(fxRates).map(([code, { flag }]) => <option key={code} value={code}>{flag} {code}</option>)}
                </select>
              </div>
            </div>
            <div className="rounded-lg border border-[var(--line)] p-4 text-center">
              <div className="text-xs ink-2">You receive · mid-market rate, zero markup on Premium</div>
              <div className="font-display text-3xl font-bold mt-1">{fx.flag} {converted} {currency}</div>
              <div className="text-[11px] ink-2 mt-1 font-mono">1 USD = {fx.rate} {currency} · rate locked for 30s</div>
            </div>
            <div><label className="label">Destination</label>
              <select className="field"><option>My multi-currency wallet</option><option>Saved international payee…</option><option>New IBAN / SWIFT recipient</option></select>
            </div>
            <button className="btn-primary w-full justify-center" onClick={submit}><Globe size={15} /> Lock rate & convert</button>
          </div>
        )}
      </Card>
      <div className="lg:col-span-2 space-y-5">
        <Card>
          <SectionTitle eyebrow="Rate" title={\`USD → \${currency} · 30 days\`} />
          <AreaChart data={[0.93, 0.925, 0.92, 0.915, 0.918, 0.912, 0.91, 0.908, 0.912, 0.91].map(v => v * (fx.rate / 0.91) * 100)} height={120} />
          <p className="text-xs ink-2 mt-2">The dollar is near a 30-day high against {currency} — a good window to convert.</p>
        </Card>
        <Card>
          <SectionTitle eyebrow="History" title="Recent exchanges" />
          <div className="space-y-2">
            {fxHistory.map(h => (
              <div key={h.desc} className="flex items-center justify-between rounded-lg border border-[var(--line)] p-3">
                <div>
                  <div className="text-sm font-medium">{fxRates[h.to]?.flag} {h.desc}</div>
                  <div className="text-xs ink-2">{h.date}, 2026</div>
                </div>
                <span className="text-xs font-mono ink-2">{h.usd}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Spending insights ────────────────────────────────────────────────────────

const spendCategories = [
  { name: "Housing", value: 1850, color: "#4f6df5" },
  { name: "Groceries", value: 620, color: "#10b981" },
  { name: "Dining out", value: 380, color: "#f59e0b" },
  { name: "Transport", value: 240, color: "#8b5cf6" },
  { name: "Subscriptions", value: 131, color: "#f43f5e" },
];
const topMerchants = [
  { name: "Whole Harvest Market", count: 9, total: 412.6 },
  { name: "Cobalt Coffee Roasters", count: 14, total: 96.4 },
  { name: "Metro Transit", count: 22, total: 88.0 },
  { name: "Streamline Internet", count: 1, total: 64.99 },
];

export function SpendingInsightsScreen() {
  const totalSpend = spendCategories.reduce((s, c) => s + c.value, 0);
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Spent · June" value={money(totalSpend)} delta="−4.8% vs May" deltaTone="green" icon={<CalendarDays size={16} />} />
          <Stat label="Daily average" value="$107" delta="Budget: $120/day" deltaTone="green" />
          <Stat label="Safe to spend" value="$1,240" delta="Until Jul 1 payday" deltaTone="blue" />
        </div>
        <Card>
          <SectionTitle eyebrow="Trend" title="Monthly spending" />
          <Bars data={[{label:"Jan",value:3120},{label:"Feb",value:3480},{label:"Mar",value:3260},{label:"Apr",value:3590},{label:"May",value:3370},{label:"Jun",value:3221}]} height={180} />
        </Card>
        <Card>
          <SectionTitle eyebrow="Merchants" title="Where it went" right={<span className="text-xs ink-2">June, by merchant</span>} />
          <div className="divide-y divide-[var(--line)]">
            {topMerchants.map(m => (
              <div key={m.name} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-xs ink-2">{m.count} transaction{m.count > 1 ? "s" : ""}</div>
                </div>
                <span className="text-sm font-mono font-semibold">{money(m.total)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Categories" title="June breakdown" />
          <div className="flex justify-center py-3">
            <Donut segments={spendCategories} label={money(totalSpend)} sublabel="this month" size={160} />
          </div>
          <div className="mt-2 space-y-2">
            {spendCategories.map(c => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full shrink-0" style={{ background: c.color }} />{c.name}</div>
                <span className="font-mono ink-2">{money(c.value)}</span>
              </div>
            ))}
          </div>
        </Card>
        <AIPanel context="Personal spending, June 2026" insights={[
          { title: "Dining pace is hot", body: "Dining out is at $380 with 18 days left in the cycle — tracking 22% over your $420 monthly budget.", tone: "amber", tag: "Budget", confidence: 89 },
          { title: "Duplicate subscription", body: "Two music streaming services charged this month ($10.99 + $11.99). Cancelling one saves $132/year.", tone: "blue", tag: "Subscriptions", confidence: 92 },
          { title: "Cash-back missed", body: "Groceries went on your debit card. Routing them through Vault Credit (2% back) earns ~$148/year.", tone: "green", tag: "Rewards", confidence: 86 },
        ]} />
      </div>
    </div>
  );
}
`;export{e as default};
