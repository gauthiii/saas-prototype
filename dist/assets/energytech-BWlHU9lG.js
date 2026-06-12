const e=`// src/domains/energytech.tsx — Helios · renewable energy IPP (independent power producer)
import { useState } from "react";
import {
  Zap, Sun, Wind, BatteryCharging, Leaf, Gauge, Wrench, Factory,
  LayoutDashboard, TrendingUp, BarChart3, Briefcase, CheckCircle2,
  Search, AlertTriangle, Activity, FileText, Download, ArrowUpRight,
  ArrowDownRight, Plug, CloudOff,
} from "lucide-react";
import { HomePage, LoginPage, RegisterPage, ProfilePage, SettingsPage, FAQPage, SupportPage, DomainMeta } from "./pages";
import { AboutPage, PrivacyPage, PricingPage, NotificationsPage, ChangelogPage, NotFoundPage, DomainExtra } from "./pages-extra";
import { Card, SectionTitle, Badge, Stat, Toggle, Tone } from "../components/ui";
import { Bars, AreaChart, Donut, Sparkline } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

// ─── Domain meta ─────────────────────────────────────────────────────────────

const energyMeta: DomainMeta = {
  id: "energy",
  name: "Helios",
  tagline: "The operating system for renewable energy producers — generation, trading, ESG, and investor reporting in one platform.",
  description: "Helios connects every solar field, wind farm, and battery in your portfolio to one real-time control plane — from megawatts on the grid to carbon avoided and returns delivered to investors.",
  accentLabel: "Energy · Renewables · Generation · ESG",
  features: [
    { icon: "☀️", title: "Live generation", body: "Real-time output across solar, wind, and storage assets with availability and performance-ratio tracking." },
    { icon: "📈", title: "Energy trading", body: "Manage PPAs, day-ahead bids, and dispatch against live market prices to maximize revenue per MWh." },
    { icon: "🌱", title: "ESG & carbon", body: "Auditable CO₂-avoided, REC registry, and ESG scorecards ready for investor and regulator reporting." },
  ],
  faqs: [
    { q: "What asset types does Helios support?", a: "Utility-scale solar PV, onshore and offshore wind, and grid-scale battery storage. Each asset type has tailored telemetry, performance-ratio, and availability metrics, while the portfolio view aggregates them into a single fleet." },
    { q: "How does Helios calculate carbon avoided?", a: "CO₂ avoided is derived from metered generation multiplied by the grid emissions factor for each asset's market region, updated hourly. Every figure is traceable to a meter reading and the published grid factor, so it survives third-party assurance." },
    { q: "Can Helios manage power purchase agreements (PPAs)?", a: "Yes. The trading module tracks contracted volume, strike price, and settlement against actual delivered energy for each PPA, and flags shortfall or curtailment risk before it becomes a penalty." },
    { q: "Does Helios integrate with SCADA and meter data?", a: "Helios ingests SCADA, inverter, and revenue-meter feeds via standard protocols (Modbus, OPC-UA, IEC 60870) and reconciles telemetry against settlement-grade meter data for billing and reporting." },
    { q: "What do investors see?", a: "A dedicated investor-relations workspace surfaces fund-level IRR, capital deployed, generation vs. budget, and downloadable quarterly reports — without exposing raw operational controls." },
    { q: "How are maintenance and faults handled?", a: "Inverter trips, turbine faults, and underperformance alarms open work orders automatically, route to field crews by region, and feed availability losses back into the performance-ratio calculation." },
  ],
  supportEmail: "support@helios.energy",
};

// ─── Domain extra ─────────────────────────────────────────────────────────────

const energyExtra: DomainExtra = {
  founded: "2018",
  mission: "Helios exists to make clean power bankable — giving renewable producers the operational and financial clarity that fossil incumbents took a century to build, so capital flows faster to zero-carbon generation.",
  story: [
    "Helios was founded in 2018 by a former wind-farm asset manager and a power-markets quant who were both tired of running multi-hundred-million-dollar portfolios out of spreadsheets and vendor SCADA screens that didn't talk to each other. Generation lived in one system, settlements in another, and the carbon numbers investors demanded were rebuilt by hand every quarter.",
    "They built a single platform that reconciles meter-grade telemetry, market settlements, and ESG accounting in real time. Today Helios monitors more than 9.4 GW of solar, wind, and storage across 14 markets — from single-site community solar to gigawatt-scale offshore wind — and produces the assurance-ready carbon and investor reports those assets are financed against.",
  ],
  team: [
    { name: "Lena Hoffmann", role: "Co-founder & CEO", emoji: "👩🏼‍💼", bio: "Former asset manager for a 3 GW European wind portfolio. Built Helios to kill the spreadsheet that ran a billion euros of generation." },
    { name: "Rajiv Menon", role: "Co-founder & CTO", emoji: "👨🏽‍💻", bio: "Power-markets quant. Designed the engine that reconciles SCADA telemetry with settlement meters in under a minute across 14 markets." },
    { name: "Sofia Reyes", role: "Head of Sustainability", emoji: "🌍", bio: "Ex-Big-Four ESG assurance lead. Owns the audit trail that makes every CO₂-avoided figure survive third-party verification." },
    { name: "Tom Becker", role: "Head of Asset Operations", emoji: "🔧", bio: "20 years in O&M for utility-scale solar. Turned reactive turbine call-outs into predictive work orders that cut downtime by a third." },
  ],
  compliance: [
    { name: "ISO 14064 (GHG)", desc: "Greenhouse-gas quantification and reporting for CO₂-avoided figures, structured for independent assurance.", status: "Certified" },
    { name: "IEC 61400-25 (Wind)", desc: "Standardized wind-power-plant telemetry and monitoring data models across the asset fleet.", status: "Compliant" },
    { name: "GHG Protocol (Scope 1/2/3)", desc: "Corporate carbon accounting across owned generation, purchased power, and supply chain.", status: "Compliant" },
    { name: "SOC 2 Type II", desc: "Annual independent audit of security, availability, and confidentiality across all production and SCADA-ingest systems.", status: "Certified" },
    { name: "NERC CIP", desc: "Critical-infrastructure protection controls for assets participating in North American bulk-power markets.", status: "In progress" },
  ],
  dataRetention: "Settlement-grade meter and generation data is retained for 10 years to meet market and tax-equity audit requirements. SCADA telemetry is held at full resolution for 24 months, then downsampled. Carbon and ESG records are retained for 7 years for assurance. Personal data is deleted within 30 days of an erasure request; anonymized generation aggregates are retained indefinitely.",
  plans: [
    { name: "Single-Asset", price: "Free", desc: "For one site — community solar or a single wind farm.", features: ["1 asset, up to 50 MW", "Live generation dashboard", "Basic carbon-avoided reporting", "Email support"], cta: "Start free" },
    { name: "Portfolio", price: "$1,900", period: "mo", desc: "For producers running a fleet across markets.", features: ["Unlimited assets up to 1 GW", "Energy trading & PPA tracking", "Grid & storage dispatch", "ESG scorecard + REC registry", "SCADA / meter integrations", "Priority support"], highlight: true, cta: "Book a demo" },
    { name: "Enterprise", price: "Custom", desc: "For IPPs and funds at gigawatt scale.", features: ["Unlimited GW & markets", "Investor-relations workspace", "Assurance-ready ESG exports", "NERC CIP & custom compliance", "Dedicated solutions engineer", "Uptime & data SLAs"], cta: "Talk to sales" },
  ],
  notifications: [
    { title: "Inverter trip — Solano PV", body: "Inverter INV-07 at Solano Valley tripped on overvoltage. 2.1 MW offline. Work order WO-4417 auto-created and routed to West crew.", time: "8 min ago", tone: "red", unread: true },
    { title: "Day-ahead bid cleared", body: "CAISO day-ahead bid for Mesa Wind cleared at $48.20/MWh for 18 of 24 hours. Estimated revenue $61,400.", time: "31 min ago", tone: "green", unread: true },
    { title: "Curtailment notice", body: "Grid operator issued a 40 MW curtailment for Coastal Wind 14:00–16:00 due to transmission congestion. PPA shortfall risk flagged.", time: "1 h ago", tone: "amber", unread: true },
    { title: "Battery cycle complete", body: "Harbor Storage discharged 38 MWh into the evening peak at $112/MWh. State of charge now 22%.", time: "3 h ago", tone: "blue" },
    { title: "Q2 carbon report verified", body: "Third-party assurance complete: 412,800 tCO₂ avoided in Q2 confirmed. Report ready for investor distribution.", time: "Yesterday", tone: "green" },
  ],
  changelog: [
    { version: "v4.2", date: "Jun 9, 2026", tag: "New", items: ["Grid-scale battery dispatch optimizer with price-aware charge/discharge", "PPA shortfall risk alerts ahead of settlement", "Scope 3 supply-chain emissions tracking"] },
    { version: "v4.1", date: "May 18, 2026", tag: "Improved", items: ["SCADA-to-meter reconciliation latency cut from 5 min to under 60s", "Performance-ratio now accounts for curtailment losses separately", "Investor report exports now include audit-trail appendix"] },
    { version: "v4.0", date: "Apr 26, 2026", tag: "Fixed", items: ["Double-counted RECs when an asset spanned two market regions", "Wind availability miscalculated during partial-curtailment hours", "Carbon factor not refreshing on hourly grid-mix update"] },
  ],
};

// ─── Shared page wrappers ─────────────────────────────────────────────────────

export function EnergyHome() { return <HomePage meta={energyMeta} />; }
export function EnergyLogin() { return <LoginPage meta={energyMeta} />; }
export function EnergyRegister() { return <RegisterPage meta={energyMeta} />; }
export function EnergyProfile() { return <ProfilePage meta={energyMeta} />; }
export function EnergySettings() { return <SettingsPage meta={energyMeta} />; }
export function EnergyFAQ() { return <FAQPage meta={energyMeta} />; }
export function EnergySupport() { return <SupportPage meta={energyMeta} />; }
export function EnergyAbout() { return <AboutPage meta={energyMeta} extra={energyExtra} />; }
export function EnergyPrivacy() { return <PrivacyPage meta={energyMeta} extra={energyExtra} />; }
export function EnergyPricing() { return <PricingPage meta={energyMeta} extra={energyExtra} />; }
export function EnergyNotifications() { return <NotificationsPage meta={energyMeta} extra={energyExtra} />; }
export function EnergyChangelog() { return <ChangelogPage meta={energyMeta} extra={energyExtra} />; }
export function EnergyNotFound() { return <NotFoundPage meta={energyMeta} />; }

// ─── 1. Generation Dashboard ──────────────────────────────────────────────────

const genTo48 = [3.2, 2.9, 2.4, 2.1, 2.0, 2.4, 3.6, 5.4, 7.1, 8.6, 9.8, 10.4, 10.9, 11.1, 10.7, 9.9, 8.7, 7.2, 6.4, 6.9, 7.5, 6.8, 5.1, 4.0];
const sourceMix = [
  { value: 54, color: "#f59e0b", name: "Solar" },
  { value: 33, color: "#38bdf8", name: "Wind" },
  { value: 13, color: "#34d399", name: "Storage" },
];
const dashInsights: Insight[] = [
  { title: "Solar overperforming forecast", body: "Clear skies pushed solar output 9% above the day-ahead forecast across the Southwest cluster. Consider re-bidding the unsold 22 MWh into the real-time market where prices are at $64/MWh.", tone: "green", tag: "Trading", confidence: 84 },
  { title: "Mesa Wind availability dip", body: "Mesa Wind availability fell to 91% after two turbines entered fault state overnight. At current wind speeds this is ~6 MWh/hr of lost generation. Work orders are open but unassigned.", tone: "amber", tag: "O&M", confidence: 88 },
  { title: "Evening peak storage play", body: "Day-ahead prices peak at $118/MWh from 18:00–20:00. Harbor Storage is at 96% state of charge — discharging into the peak could add an estimated $4,300 versus holding.", tone: "blue", tag: "Storage", confidence: 79 },
];

export function HeliosDashboard() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Live output" value="847 MW" delta="78% of capacity" deltaTone="green" icon={<Zap size={16} />} />
        <Stat label="Today's generation" value="14.2 GWh" delta="+6% vs forecast" deltaTone="green" icon={<Activity size={16} />} />
        <Stat label="Fleet availability" value="97.4%" delta="3 assets in fault" deltaTone="amber" />
        <Stat label="CO₂ avoided today" value="6,140 t" delta="≈ 1,330 cars/yr" deltaTone="green" icon={<Leaf size={16} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <SectionTitle eyebrow="Portfolio output" title="Generation — last 24h (GW)" right={<Badge tone="green" pulse>Live</Badge>} />
            <AreaChart data={genTo48} height={170} stroke="#f59e0b" />
            <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
              {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "now"].map(d => <span key={d}>{d}</span>)}
            </div>
          </Card>

          <Card>
            <SectionTitle eyebrow="By asset" title="Top producing assets · now" right={<Badge tone="gray">4 of 31</Badge>} />
            <div className="space-y-2">
              {[
                { name: "Solano Valley PV", type: "Solar · 320 MW", output: "248 MW", pr: "84%", trend: "up" },
                { name: "Mesa Wind", type: "Wind · 210 MW", output: "171 MW", pr: "91%", trend: "down" },
                { name: "Coastal Wind", type: "Wind · 180 MW", output: "142 MW", pr: "88%", trend: "up" },
                { name: "Harbor Storage", type: "Battery · 80 MW", output: "−38 MW", pr: "—", trend: "down" },
              ].map(a => (
                <div key={a.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{a.name}</div>
                    <div className="text-xs ink-2 font-mono">{a.type}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold">{a.output}</div>
                    <div className="text-xs ink-2">PR {a.pr}</div>
                  </div>
                  {a.trend === "up"
                    ? <ArrowUpRight size={16} className="text-emerald-500 shrink-0" />
                    : <ArrowDownRight size={16} className="text-rose-500 shrink-0" />}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <SectionTitle eyebrow="Source mix" title="Output by technology" />
            <div className="flex justify-center py-2">
              <Donut segments={sourceMix} label="847" sublabel="MW now" />
            </div>
            <div className="mt-3 space-y-1.5">
              {sourceMix.map(s => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="ink-2 flex-1">{s.name}</span>
                  <span className="font-mono font-semibold">{s.value}%</span>
                </div>
              ))}
            </div>
          </Card>
          <AIPanel context="9.4 GW renewable portfolio · Jun 2026" insights={dashInsights} />
        </div>
      </div>
    </div>
  );
}

// ─── 2. Asset Fleet ───────────────────────────────────────────────────────────

type AssetType = "Solar" | "Wind" | "Storage";
const assets: { name: string; region: string; type: AssetType; capacity: string; output: number; cap: number; avail: number; status: "Online" | "Degraded" | "Fault" | "Offline" }[] = [
  { name: "Solano Valley PV", region: "California, US", type: "Solar", capacity: "320 MW", output: 248, cap: 320, avail: 99.1, status: "Online" },
  { name: "Mesa Wind", region: "Texas, US", type: "Wind", capacity: "210 MW", output: 171, cap: 210, avail: 91.0, status: "Degraded" },
  { name: "Coastal Wind", region: "Galicia, ES", type: "Wind", capacity: "180 MW", output: 142, cap: 180, avail: 98.4, status: "Online" },
  { name: "Harbor Storage", region: "California, US", type: "Storage", capacity: "80 MW / 320 MWh", output: -38, cap: 80, avail: 100, status: "Online" },
  { name: "Altiplano Solar", region: "Atacama, CL", type: "Solar", capacity: "260 MW", output: 0, cap: 260, avail: 0, status: "Offline" },
  { name: "Nordsee Offshore", region: "North Sea, DE", type: "Wind", capacity: "450 MW", output: 388, cap: 450, avail: 96.7, status: "Online" },
  { name: "Sunbelt Rooftop", region: "Arizona, US", type: "Solar", capacity: "44 MW", output: 31, cap: 44, avail: 99.8, status: "Online" },
  { name: "Delta Storage", region: "Gujarat, IN", type: "Storage", capacity: "60 MW / 240 MWh", output: 22, cap: 60, avail: 94.2, status: "Fault" },
];

const typeIcon: Record<AssetType, JSX.Element> = {
  Solar: <Sun size={15} />,
  Wind: <Wind size={15} />,
  Storage: <BatteryCharging size={15} />,
};
const statusTone: Record<string, Tone> = { Online: "green", Degraded: "amber", Fault: "red", Offline: "gray" };

export function AssetFleetScreen() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"All" | AssetType>("All");
  const shown = assets.filter(a =>
    (filter === "All" || a.type === filter) &&
    (a.name + a.region).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total capacity" value="9.4 GW" delta="31 assets · 14 markets" deltaTone="blue" icon={<Factory size={16} />} />
        <Stat label="Online now" value="28 / 31" delta="2 fault · 1 offline" deltaTone="amber" />
        <Stat label="Weighted availability" value="96.8%" delta="+0.4% MoM" deltaTone="green" />
      </div>

      <Card>
        <SectionTitle eyebrow="Fleet" title="Asset register" right={
          <div className="flex items-center gap-2 field !py-1.5 !px-2.5">
            <Search size={14} className="ink-2 shrink-0" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search assets…"
              className="bg-transparent text-sm outline-none w-40 placeholder:text-[var(--ink-2)]" />
          </div>
        } />

        <div className="flex gap-2 mb-4">
          {(["All", "Solar", "Wind", "Storage"] as const).map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={\`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors \${filter === t ? "bg-accent text-white border-accent" : "surface ink-2"}\`}>
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {shown.map(a => {
            const pct = a.cap ? Math.round((Math.abs(a.output) / a.cap) * 100) : 0;
            return (
              <div key={a.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
                <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0">{typeIcon[a.type]}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{a.name}</div>
                  <div className="text-xs ink-2">{a.region} · {a.capacity}</div>
                </div>
                <div className="hidden sm:block w-28">
                  <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: \`\${Math.min(pct, 100)}%\` }} />
                  </div>
                  <div className="text-[11px] ink-2 mt-1 font-mono">{a.output} MW · {a.avail}%</div>
                </div>
                <Badge tone={statusTone[a.status]}>{a.status}</Badge>
              </div>
            );
          })}
          {shown.length === 0 && <div className="text-center py-8 text-sm ink-2">No assets match your filters.</div>}
        </div>
      </Card>
    </div>
  );
}

// ─── 3. Energy Trading & PPAs ─────────────────────────────────────────────────

const priceCurve = [42, 39, 37, 36, 38, 44, 52, 61, 58, 54, 51, 49, 47, 46, 48, 55, 72, 98, 118, 112, 84, 63, 51, 45];

export function EnergyTradingScreen() {
  const [bid, setBid] = useState(48);
  const [volume, setVolume] = useState(120);

  const ppas = [
    { name: "TechCorp Datacenter", volume: "150 MW", strike: "$41.50", term: "2024–2039", delivered: 98, tone: "green" as Tone },
    { name: "State Utility Co.", volume: "220 MW", strike: "$38.00", term: "2023–2033", delivered: 94, tone: "green" as Tone },
    { name: "Metro Grid PPA", volume: "90 MW", strike: "$44.20", term: "2025–2035", delivered: 81, tone: "amber" as Tone },
    { name: "GreenSteel Offtake", volume: "60 MW", strike: "$52.00", term: "2026–2041", delivered: 100, tone: "green" as Tone },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Spot price" value="$118/MWh" delta="Evening peak" deltaTone="green" icon={<TrendingUp size={16} />} />
        <Stat label="Contracted (PPA)" value="520 MW" delta="61% of fleet" deltaTone="blue" />
        <Stat label="Merchant exposure" value="327 MW" delta="Sold in spot/DA" deltaTone="amber" />
        <Stat label="Revenue MTD" value="$8.2M" delta="+11% vs budget" deltaTone="green" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle eyebrow="Day-ahead market" title="Clearing price — next 24h ($/MWh)" right={<Badge tone="amber">Peak $118</Badge>} />
          <AreaChart data={priceCurve} height={170} stroke="#34d399" />
          <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
            {["00", "04", "08", "12", "16", "20", "24"].map(d => <span key={d}>{d}h</span>)}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Place a bid" title="Day-ahead offer" />
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs ink-2 mb-1.5"><span>Offer price</span><span className="font-mono font-semibold text-[var(--ink)]">\${bid}/MWh</span></div>
              <input type="range" min={20} max={140} value={bid} onChange={e => setBid(+e.target.value)} className="w-full accent-[var(--accent)]" />
            </div>
            <div>
              <div className="flex justify-between text-xs ink-2 mb-1.5"><span>Volume</span><span className="font-mono font-semibold text-[var(--ink)]">{volume} MW</span></div>
              <input type="range" min={0} max={327} value={volume} onChange={e => setVolume(+e.target.value)} className="w-full accent-[var(--accent)]" />
            </div>
            <div className="rounded-lg border border-[var(--line)] p-3 text-xs space-y-1.5">
              <div className="flex justify-between"><span className="ink-2">Est. clearing</span><span className="font-mono">{bid <= 118 ? "Likely cleared" : "Unlikely"}</span></div>
              <div className="flex justify-between"><span className="ink-2">Est. revenue</span><span className="font-mono font-semibold">\${((bid * volume) / 1000).toFixed(1)}k/hr</span></div>
            </div>
            <button className="btn-primary w-full py-2.5 text-sm">Submit offer</button>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Offtake" title="Power purchase agreements" right={<Badge tone="gray">4 active</Badge>} />
        <div className="space-y-2">
          {ppas.map(p => (
            <div key={p.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><Plug size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{p.name}</div>
                <div className="text-xs ink-2 font-mono">{p.volume} · {p.strike}/MWh · {p.term}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-semibold">{p.delivered}%</div>
                <Badge tone={p.tone}>{p.delivered >= 95 ? "On track" : "Shortfall risk"}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 4. Grid & Storage ────────────────────────────────────────────────────────

const socCurve = [62, 58, 51, 44, 40, 38, 44, 55, 68, 79, 88, 94, 96, 95, 90, 82, 70, 52, 30, 22, 28, 41, 54, 60];

export function GridStorageScreen() {
  const [mode, setMode] = useState<"auto" | "charge" | "discharge" | "hold">("auto");

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Fleet state of charge" value="64%" delta="3 batteries online" deltaTone="blue" icon={<BatteryCharging size={16} />} />
        <Stat label="Grid frequency" value="49.98 Hz" delta="Within band" deltaTone="green" icon={<Activity size={16} />} />
        <Stat label="Throughput today" value="184 MWh" delta="2.3 cycles" deltaTone="blue" />
        <Stat label="Arbitrage P&L" value="+$12.4k" delta="Buy low / sell peak" deltaTone="green" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle eyebrow="Harbor Storage" title="State of charge — last 24h (%)" right={<Badge tone="blue">80 MW / 320 MWh</Badge>} />
          <AreaChart data={socCurve} height={170} stroke="#38bdf8" />
          <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
            {["00", "04", "08", "12", "16", "20", "now"].map(d => <span key={d}>{d}h</span>)}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Dispatch" title="Battery mode" />
          <div className="space-y-2">
            {([
              ["auto", "Price-aware auto", "Optimizer charges off-peak, discharges into peak"],
              ["charge", "Force charge", "Absorb surplus solar now"],
              ["discharge", "Force discharge", "Inject into the grid immediately"],
              ["hold", "Hold", "Preserve current state of charge"],
            ] as const).map(([id, label, desc]) => (
              <button key={id} onClick={() => setMode(id)}
                className={\`w-full text-left rounded-lg border p-3 transition-colors \${mode === id ? "border-accent bg-accent/5" : "border-[var(--line)]"}\`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{label}</span>
                  {mode === id && <CheckCircle2 size={15} className="text-accent" />}
                </div>
                <div className="text-xs ink-2 mt-0.5">{desc}</div>
              </button>
            ))}
          </div>
          <button className="btn-primary w-full py-2.5 text-sm mt-4">Apply dispatch</button>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Grid services" title="Ancillary market participation" />
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { svc: "Frequency regulation", mw: "24 MW", rev: "$3.1k/day", tone: "green" as Tone },
            { svc: "Spinning reserve", mw: "16 MW", rev: "$1.4k/day", tone: "blue" as Tone },
            { svc: "Capacity market", mw: "40 MW", rev: "$0.9k/day", tone: "gray" as Tone },
          ].map(s => (
            <div key={s.svc} className="rounded-lg border border-[var(--line)] p-4">
              <div className="text-sm font-medium">{s.svc}</div>
              <div className="font-display text-xl font-bold mt-1">{s.mw}</div>
              <div className="mt-1.5"><Badge tone={s.tone}>{s.rev}</Badge></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 5. Sustainability & ESG ──────────────────────────────────────────────────

const esgRadarAxes = ["Carbon", "Water", "Biodiversity", "Safety", "Governance", "Community"];
const esgRadarValues = [96, 72, 64, 88, 81, 70];

export function SustainabilityScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Renewable generation" value="100%" delta="Zero-carbon fleet" deltaTone="green" icon={<Leaf size={16} />} />
        <Stat label="CO₂ avoided YTD" value="1.84 Mt" delta="+12% vs last yr" deltaTone="green" icon={<CloudOff size={16} />} />
        <Stat label="ESG score" value="A−" delta="MSCI-aligned" deltaTone="blue" />
        <Stat label="Homes powered" value="2.1M" delta="Equivalent annual" deltaTone="blue" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <SectionTitle eyebrow="ESG scorecard" title="Performance by pillar" right={<Badge tone="green">A−</Badge>} />
          <div className="space-y-3">
            {[
              ["Environmental", 94, "green"],
              ["Social", 78, "blue"],
              ["Governance", 81, "blue"],
            ].map(([label, val, tone]) => (
              <div key={label as string}>
                <div className="flex justify-between text-xs mb-1.5"><span className="font-medium">{label}</span><span className="font-mono ink-2">{val}/100</span></div>
                <div className="h-2 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className={\`h-full rounded-full \${tone === "green" ? "bg-emerald-500" : "bg-accent"}\`} style={{ width: \`\${val}%\` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-[var(--line)] grid grid-cols-3 gap-3 text-center">
            {[["62k", "Acres restored"], ["0.0", "Lost-time incidents"], ["41%", "Women in workforce"]].map(([v, l]) => (
              <div key={l}><div className="font-display text-lg font-bold text-accent">{v}</div><div className="text-[11px] ink-2 mt-0.5">{l}</div></div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="UN SDG alignment" title="Sustainable Development Goals" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { goal: "SDG 7", title: "Affordable clean energy", pct: 96, emoji: "⚡" },
              { goal: "SDG 13", title: "Climate action", pct: 91, emoji: "🌍" },
              { goal: "SDG 9", title: "Industry & infrastructure", pct: 74, emoji: "🏗️" },
              { goal: "SDG 15", title: "Life on land", pct: 68, emoji: "🌳" },
            ].map(s => (
              <div key={s.goal} className="rounded-lg border border-[var(--line)] p-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.emoji}</span>
                  <span className="text-xs font-semibold">{s.goal}</span>
                </div>
                <div className="text-xs ink-2 mt-1 leading-tight">{s.title}</div>
                <div className="mt-2 h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: \`\${s.pct}%\` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Reporting" title="Disclosure frameworks" right={<button className="btn-ghost !px-3 !py-1.5 text-xs gap-1.5"><Download size={13} /> Export ESG pack</button>} />
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { fw: "TCFD", desc: "Climate-related financial disclosures", status: "Filed Q2 2026", tone: "green" as Tone },
            { fw: "GRI Standards", desc: "Global Reporting Initiative", status: "Filed Q1 2026", tone: "green" as Tone },
            { fw: "CDP Climate", desc: "Carbon Disclosure Project", status: "Score: A−", tone: "blue" as Tone },
            { fw: "EU Taxonomy", desc: "Sustainable activities alignment", status: "98% aligned", tone: "blue" as Tone },
          ].map(f => (
            <div key={f.fw} className="flex items-center justify-between rounded-lg border border-[var(--line)] p-3.5">
              <div><div className="text-sm font-medium">{f.fw}</div><div className="text-xs ink-2">{f.desc}</div></div>
              <Badge tone={f.tone}>{f.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 6. Carbon Accounting ─────────────────────────────────────────────────────

const carbonMonthly = [
  { label: "Jan", value: 142 }, { label: "Feb", value: 138 }, { label: "Mar", value: 161 },
  { label: "Apr", value: 174 }, { label: "May", value: 188 }, { label: "Jun", value: 196 },
];

export function CarbonAccountingScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="CO₂ avoided YTD" value="1.84 Mt" delta="Verified to ISO 14064" deltaTone="green" icon={<CloudOff size={16} />} />
        <Stat label="Grid emission factor" value="0.41 t/MWh" delta="Blended, 14 markets" deltaTone="blue" icon={<Gauge size={16} />} />
        <Stat label="RECs issued" value="4.2M" delta="1 REC = 1 MWh" deltaTone="blue" />
        <Stat label="RECs retired" value="3.1M" delta="On behalf of offtakers" deltaTone="gray" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Monthly" title="CO₂ avoided (kt) · 2026" right={<Badge tone="green">+38% YoY</Badge>} />
          <Bars data={carbonMonthly} height={150} color="#34d399" />
        </Card>

        <Card>
          <SectionTitle eyebrow="GHG Protocol" title="Operational emissions" />
          <div className="space-y-3">
            {[
              { scope: "Scope 1", val: "1,240 t", desc: "Direct (vehicles, SF₆ leaks)", tone: "amber" as Tone },
              { scope: "Scope 2", val: "0 t", desc: "Purchased electricity (self-supplied)", tone: "green" as Tone },
              { scope: "Scope 3", val: "84,100 t", desc: "Construction, supply chain, EoL", tone: "blue" as Tone },
            ].map(s => (
              <div key={s.scope} className="rounded-lg border border-[var(--line)] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{s.scope}</span>
                  <Badge tone={s.tone}>{s.val}</Badge>
                </div>
                <div className="text-xs ink-2 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] ink-2 mt-3 leading-relaxed">Net position remains strongly carbon-negative: avoided generation emissions exceed operational footprint by ~21×.</div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Registry" title="REC & offset ledger" right={<button className="btn-ghost !px-3 !py-1.5 text-xs gap-1.5"><FileText size={13} /> Audit trail</button>} />
        <div className="space-y-2">
          {[
            { id: "REC-2026-0614", asset: "Solano Valley PV", mwh: "248 MWh", status: "Issued", tone: "green" as Tone },
            { id: "REC-2026-0613", asset: "Nordsee Offshore", mwh: "388 MWh", status: "Issued", tone: "green" as Tone },
            { id: "REC-2026-0611", asset: "Mesa Wind", mwh: "171 MWh", status: "Retired → TechCorp", tone: "gray" as Tone },
            { id: "REC-2026-0609", asset: "Coastal Wind", mwh: "142 MWh", status: "Pending verification", tone: "amber" as Tone },
          ].map(r => (
            <div key={r.id} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium font-mono truncate">{r.id}</div>
                <div className="text-xs ink-2">{r.asset} · {r.mwh}</div>
              </div>
              <Badge tone={r.tone}>{r.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 7. Investor Relations ────────────────────────────────────────────────────

const navTrend = [820, 845, 858, 870, 889, 910, 928, 951, 970, 994, 1012, 1041];

export function InvestorRelationsScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Fund NAV" value="$1.04B" delta="+8.2% QoQ" deltaTone="green" icon={<Briefcase size={16} />} />
        <Stat label="Portfolio IRR" value="11.4%" delta="vs 9.5% target" deltaTone="green" icon={<TrendingUp size={16} />} />
        <Stat label="Capital deployed" value="$870M" delta="of $1.0B committed" deltaTone="blue" />
        <Stat label="Cash yield" value="6.1%" delta="Distributed TTM" deltaTone="green" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle eyebrow="Fund I" title="Net asset value ($M) · trailing 12m" right={<Badge tone="green" pulse>+27% TTM</Badge>} />
          <AreaChart data={navTrend} height={170} stroke="#6366f1" />
          <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
            {["Jul", "Sep", "Nov", "Jan", "Mar", "May"].map(d => <span key={d}>{d}</span>)}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Generation vs budget" title="Production yield" />
          <div className="space-y-3">
            {[
              ["Q1", 103, "green"], ["Q2", 98, "amber"], ["Budget", 100, "gray"],
            ].map(([q, v, tone]) => (
              <div key={q as string}>
                <div className="flex justify-between text-xs mb-1.5"><span className="font-medium">{q}</span><span className="font-mono ink-2">{v}%</span></div>
                <div className="h-2 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className={\`h-full rounded-full \${tone === "green" ? "bg-emerald-500" : tone === "amber" ? "bg-amber-500" : "bg-zinc-400"}\`} style={{ width: \`\${Math.min(v as number, 100)}%\` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--line)] flex items-center gap-3">
            <Sparkline data={navTrend} />
            <span className="text-xs ink-2">NAV momentum strong on higher merchant capture and stable PPA delivery.</span>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Data room" title="Investor reports & documents" right={<Badge tone="gray">LP access</Badge>} />
        <div className="space-y-2">
          {[
            { doc: "Q2 2026 Quarterly Report", type: "PDF · 4.2 MB", date: "Jun 30, 2026", tone: "blue" as Tone },
            { doc: "Annual ESG & Impact Report 2025", type: "PDF · 11.8 MB", date: "Mar 14, 2026", tone: "green" as Tone },
            { doc: "Audited Financial Statements FY25", type: "PDF · 2.1 MB", date: "Feb 28, 2026", tone: "gray" as Tone },
            { doc: "Capital Call Notice #7", type: "PDF · 0.4 MB", date: "Jun 2, 2026", tone: "amber" as Tone },
          ].map(d => (
            <div key={d.doc} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><FileText size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{d.doc}</div>
                <div className="text-xs ink-2 font-mono">{d.type} · {d.date}</div>
              </div>
              <button className="btn-ghost !p-2" aria-label={\`Download \${d.doc}\`}><Download size={15} /></button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 8. Maintenance & Work Orders ─────────────────────────────────────────────

export function MaintenanceScreen() {
  const [orders, setOrders] = useState([
    { id: "WO-4417", asset: "Solano Valley PV", fault: "Inverter INV-07 overvoltage trip", prio: "Critical", crew: "West crew", done: false, tone: "red" as Tone },
    { id: "WO-4416", asset: "Mesa Wind", fault: "Turbine T-12 gearbox temp high", prio: "High", crew: "Central crew", done: false, tone: "amber" as Tone },
    { id: "WO-4414", asset: "Delta Storage", fault: "BMS cell imbalance — rack 3", prio: "High", crew: "Unassigned", done: false, tone: "amber" as Tone },
    { id: "WO-4410", asset: "Sunbelt Rooftop", fault: "String 14 underperformance", prio: "Medium", crew: "South crew", done: false, tone: "blue" as Tone },
    { id: "WO-4402", asset: "Coastal Wind", fault: "Scheduled blade inspection", prio: "Low", crew: "EU crew", done: true, tone: "gray" as Tone },
  ]);
  const toggle = (id: string) => setOrders(os => os.map(o => o.id === id ? { ...o, done: !o.done } : o));
  const open = orders.filter(o => !o.done).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Open work orders" value={String(open)} delta="1 critical" deltaTone="red" icon={<Wrench size={16} />} />
        <Stat label="MTTR" value="4.2 h" delta="−18% vs last qtr" deltaTone="green" />
        <Stat label="Availability loss" value="2.6%" delta="From faults MTD" deltaTone="amber" />
        <Stat label="Planned this week" value="9" delta="Preventive tasks" deltaTone="blue" />
      </div>

      <Card>
        <SectionTitle eyebrow="Work orders" title="Maintenance queue" right={<Badge tone={open > 0 ? "amber" : "green"}>{open} open</Badge>} />
        <div className="space-y-2">
          {orders.map(o => (
            <div key={o.id} className={\`flex items-center gap-3 rounded-lg border p-3.5 transition-colors \${o.done ? "border-[var(--line)] opacity-60" : "border-[var(--line)]"}\`}>
              <button onClick={() => toggle(o.id)}
                className={\`grid place-items-center h-8 w-8 rounded-lg shrink-0 transition-colors \${o.done ? "bg-emerald-500/15 text-emerald-500" : "bg-accent/12 text-accent"}\`}
                aria-label={o.done ? "Reopen work order" : "Mark resolved"}>
                {o.done ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium font-mono">{o.id}</span>
                  <span className="text-sm truncate">· {o.asset}</span>
                </div>
                <div className="text-xs ink-2 truncate">{o.fault} · {o.crew}</div>
              </div>
              <Badge tone={o.done ? "green" : o.tone}>{o.done ? "Resolved" : o.prio}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle eyebrow="Crews" title="Field crew status" />
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { crew: "West crew", region: "California", jobs: 3, status: "On site", tone: "amber" as Tone },
            { crew: "Central crew", region: "Texas", jobs: 2, status: "En route", tone: "blue" as Tone },
            { crew: "EU crew", region: "Galicia / N. Sea", jobs: 1, status: "Available", tone: "green" as Tone },
          ].map(c => (
            <div key={c.crew} className="rounded-lg border border-[var(--line)] p-4">
              <div className="text-sm font-medium">{c.crew}</div>
              <div className="text-xs ink-2">{c.region}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs ink-2">{c.jobs} active</span>
                <Badge tone={c.tone}>{c.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 9. Portfolio Analytics ───────────────────────────────────────────────────

const genByMarket = [
  { label: "US-West", value: 38 }, { label: "US-Texas", value: 24 },
  { label: "EU-North", value: 21 }, { label: "LatAm", value: 11 }, { label: "India", value: 6 },
];
const techMix = [
  { value: 48, color: "#f59e0b", name: "Solar" },
  { value: 39, color: "#38bdf8", name: "Wind" },
  { value: 13, color: "#34d399", name: "Storage" },
];

export function EnergyAnalyticsScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Generation MTD" value="412 GWh" delta="+9% vs forecast" deltaTone="green" icon={<BarChart3 size={16} />} />
        <Stat label="Performance ratio" value="86.2%" delta="Fleet weighted" deltaTone="blue" />
        <Stat label="Capacity factor" value="34.8%" delta="Blended solar+wind" deltaTone="blue" />
        <Stat label="Revenue / MWh" value="$51.40" delta="Merchant + PPA" deltaTone="green" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Geography" title="Generation by market (%)" right={<Badge tone="gray">14 markets</Badge>} />
          <Bars data={genByMarket} height={150} color="#f59e0b" />
        </Card>

        <Card>
          <SectionTitle eyebrow="Technology" title="Generation mix" />
          <div className="flex justify-center py-2">
            <Donut segments={techMix} label="9.4" sublabel="GW total" />
          </div>
          <div className="mt-3 space-y-1.5">
            {techMix.map(s => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="ink-2 flex-1">{s.name}</span>
                <span className="font-mono font-semibold">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Benchmarks" title="Asset performance ranking" right={<Badge tone="green">Top quartile fleet</Badge>} />
        <div className="space-y-2">
          {[
            { name: "Nordsee Offshore", pr: 92, cf: "48%", rev: "$1.9M", tone: "green" as Tone },
            { name: "Solano Valley PV", pr: 88, cf: "29%", rev: "$1.2M", tone: "green" as Tone },
            { name: "Coastal Wind", pr: 87, cf: "41%", rev: "$0.9M", tone: "green" as Tone },
            { name: "Mesa Wind", pr: 79, cf: "37%", rev: "$0.8M", tone: "amber" as Tone },
            { name: "Altiplano Solar", pr: 0, cf: "0%", rev: "$0.0M", tone: "red" as Tone },
          ].map(a => (
            <div key={a.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{a.name}</div>
                <div className="text-xs ink-2">PR {a.pr}% · CF {a.cf} · {a.rev} MTD</div>
              </div>
              <div className="hidden sm:block w-24">
                <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className={\`h-full rounded-full \${a.tone === "green" ? "bg-emerald-500" : a.tone === "amber" ? "bg-amber-500" : "bg-rose-500"}\`} style={{ width: \`\${a.pr}%\` }} />
                </div>
              </div>
              <Badge tone={a.tone}>{a.pr === 0 ? "Offline" : \`\${a.pr}%\`}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
`;export{e as default};
