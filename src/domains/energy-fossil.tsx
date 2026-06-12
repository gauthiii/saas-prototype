// src/domains/energy-fossil.tsx — Vulcan · integrated oil & gas operator (upstream → downstream)
import { useState } from "react";
import {
  Flame, Droplet, Factory, Gauge, Truck, HardHat,
  TrendingUp, Briefcase, Search, AlertTriangle, Activity, FileText,
  Download, ArrowUpRight, ArrowDownRight, ShieldAlert, CloudOff, Container,
} from "lucide-react";
import { HomePage, LoginPage, RegisterPage, ProfilePage, SettingsPage, FAQPage, SupportPage, DomainMeta } from "./pages";
import { AboutPage, PrivacyPage, PricingPage, NotificationsPage, ChangelogPage, NotFoundPage, DomainExtra } from "./pages-extra";
import { Card, SectionTitle, Badge, Stat, Tone } from "../components/ui";
import { Bars, AreaChart, Donut, Sparkline } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

// ─── Domain meta ─────────────────────────────────────────────────────────────

const fossilMeta: DomainMeta = {
  id: "fossil",
  name: "Vulcan",
  tagline: "The control plane for integrated oil & gas — from wellhead production to refined barrels, pipelines, and the trading floor.",
  description: "Vulcan unifies every barrel and every molecule of an oil & gas operation — upstream production, downstream refining, midstream logistics, commodity hedging, and emissions compliance — into one operational and financial view.",
  accentLabel: "Oil · Gas · Refining · Midstream · Trading",
  features: [
    { icon: "🛢️", title: "Production telemetry", body: "Live wellhead, lift, and separator data across every field with decline-curve and downtime tracking." },
    { icon: "🏭", title: "Refinery yields", body: "Crude slate, unit throughput, and product yield optimization across the refining complex in real time." },
    { icon: "📉", title: "Commodity hedging", body: "Hedge crude and gas exposure against WTI, Brent, and Henry Hub with mark-to-market P&L on the book." },
  ],
  faqs: [
    { q: "What does Vulcan cover across the value chain?", a: "Upstream production (wells, lift, separators), midstream logistics (pipelines, terminals, tankers), and downstream refining (crude units, FCC, product blending), plus the commodity trading and hedging book that sits across all three." },
    { q: "How is production data ingested?", a: "Vulcan pulls from SCADA, RTUs, and lease automation via Modbus and OPC-UA, reconciling field telemetry against allocation and custody-transfer meters so production volumes are audit-grade." },
    { q: "Can Vulcan manage crude and gas hedging?", a: "Yes. The trading module tracks physical and financial positions against WTI, Brent, and Henry Hub, marks the book to live forward curves, and surfaces VaR and margin exposure before settlement." },
    { q: "How does Vulcan handle flaring and methane?", a: "Flare and vent volumes are metered per site, converted to CO₂e using published factors, and rolled into OGMP 2.0 and EPA Subpart W reporting — with leak-detection survey results tracked against each facility." },
    { q: "Does Vulcan track HSE and process safety?", a: "Process-safety events, near-misses, and lost-time incidents are logged against each asset, drive the recordable-incident rate, and feed permit-to-work and barrier-health dashboards." },
    { q: "What about reserves and economics?", a: "Vulcan tracks 1P/2P/3P reserves, decline curves, and per-barrel lifting costs so asset teams can see netback economics and remaining reserve life by field." },
  ],
  supportEmail: "support@vulcan-og.com",
};

const fossilExtra: DomainExtra = {
  founded: "2009",
  mission: "Vulcan exists to make hydrocarbon production safer, leaner, and lower-emitting — giving operators a single source of truth from the wellhead to the refinery gate to the trading desk, so every barrel is accounted for and every flare is one too many.",
  story: [
    "Vulcan was founded in 2009 by a reservoir engineer and a refinery process control lead who watched a single basin run on a dozen disconnected systems — one for SCADA, one for allocation, one for hedging, and a wall of spreadsheets to tie them together. A production deferment in the field took days to show up against the hedge book.",
    "They built a platform that reconciles field telemetry, custody-transfer meters, refinery yields, and the commodity book in one place. Today Vulcan runs across 2,400 producing wells, three refineries, and 1,800 km of pipeline — and turns flaring, methane, and process-safety data into the compliance record those assets are permitted against.",
  ],
  team: [
    { name: "Marcus Hale", role: "Co-founder & CEO", emoji: "👨🏻‍💼", bio: "Reservoir engineer turned operator. Built Vulcan after one deferment took three days to reach the hedge desk." },
    { name: "Priya Nair", role: "Co-founder & CTO", emoji: "👩🏽‍💻", bio: "Refinery APC lead. Designed the engine that reconciles wellhead SCADA with custody meters in real time." },
    { name: "Dale Okoro", role: "VP HSE & Process Safety", emoji: "🦺", bio: "25 years in offshore process safety. Owns the barrier-health model behind every permit-to-work." },
    { name: "Ana Vidal", role: "Head of Trading", emoji: "📊", bio: "Ex-crude trader. Runs the book that marks physical and financial positions to live forward curves." },
  ],
  compliance: [
    { name: "API RP 1173 (PSMS)", desc: "Pipeline safety management system controls across midstream assets.", status: "Certified" },
    { name: "OGMP 2.0 (Methane)", desc: "Gold-standard methane measurement and reporting at site level.", status: "Compliant" },
    { name: "EPA Subpart W", desc: "Greenhouse-gas reporting for petroleum and natural gas systems.", status: "Compliant" },
    { name: "ISO 14001", desc: "Environmental management system across operating facilities.", status: "Certified" },
    { name: "OSHA PSM (1910.119)", desc: "Process safety management of highly hazardous chemicals.", status: "In progress" },
  ],
  dataRetention: "Custody-transfer and allocation volumes are retained for 7 years to meet royalty, severance-tax, and audit requirements. SCADA and process-historian telemetry is held at full resolution for 18 months, then downsampled. HSE and process-safety records are retained for the life of the asset. Trading and settlement records follow Dodd-Frank/EMIR retention. Personal data is deleted within 30 days of an erasure request.",
  plans: [
    { name: "Single-Field", price: "Free", desc: "For one operated field or terminal.", features: ["Up to 50 wells", "Production dashboard", "Basic flaring report", "Email support"], cta: "Start free" },
    { name: "Operator", price: "$3,400", period: "mo", desc: "For multi-field upstream and midstream operators.", features: ["Unlimited wells & pipelines", "Refinery yield optimization", "Crude & gas hedging book", "Flaring & methane compliance", "SCADA / historian integration", "Priority support"], highlight: true, cta: "Book a demo" },
    { name: "Integrated", price: "Custom", desc: "For integrated majors across the value chain.", features: ["Upstream + midstream + downstream", "Trading & risk (VaR, margin)", "Reserves & netback economics", "OGMP 2.0 & regulatory exports", "Dedicated solutions engineer", "Uptime & data SLAs"], cta: "Talk to sales" },
  ],
  notifications: [
    { title: "Well downtime — Permian 14H", body: "Permian 14H went offline on ESP failure. ~620 bbl/d deferred. Pulling-unit work order WO-8821 created and dispatched.", time: "12 min ago", tone: "red", unread: true },
    { title: "Crude cargo lifted", body: "VLCC Aegean Star lifted 1.9M bbl WTI Midland at Corpus Christi. Bill of lading issued; hedge desk notified.", time: "40 min ago", tone: "green", unread: true },
    { title: "Flaring exceedance — Eagle Ford", body: "Eagle Ford CTB-3 flared 4.1 MMscf over the 24h permit limit on a compressor trip. Regulatory flag raised.", time: "1 h ago", tone: "amber", unread: true },
    { title: "FCC throughput at target", body: "Baytown FCC unit hit 142 kbd at 38% conversion. Gasoline yield 47.2%, within optimizer band.", time: "3 h ago", tone: "blue" },
    { title: "Hedge mark-to-market", body: "Q3 WTI swaps marked +$4.2M as front-month forward fell to $71.40. Margin requirement unchanged.", time: "Yesterday", tone: "green" },
  ],
  changelog: [
    { version: "v6.1", date: "Jun 7, 2026", tag: "New", items: ["OGMP 2.0 Level 5 site-level methane reconciliation", "Crude slate optimizer with assay-driven yield prediction", "Tank-farm custody balancing with auto-reconciliation"] },
    { version: "v6.0", date: "May 14, 2026", tag: "Improved", items: ["Decline-curve forecasts now blend ML with Arps fits", "Pipeline leak-detection latency cut to under 90s", "Hedge book marks to intraday forward curves"] },
    { version: "v5.8", date: "Apr 22, 2026", tag: "Fixed", items: ["Allocation mismatch when a well swung between batteries", "Flare CO₂e double-counted during compressor restarts", "VaR understated for cross-commodity gas/power spreads"] },
  ],
};

// ─── Shared page wrappers ─────────────────────────────────────────────────────

export function FossilHome() { return <HomePage meta={fossilMeta} />; }
export function FossilLogin() { return <LoginPage meta={fossilMeta} />; }
export function FossilRegister() { return <RegisterPage meta={fossilMeta} />; }
export function FossilProfile() { return <ProfilePage meta={fossilMeta} />; }
export function FossilSettings() { return <SettingsPage meta={fossilMeta} />; }
export function FossilFAQ() { return <FAQPage meta={fossilMeta} />; }
export function FossilSupport() { return <SupportPage meta={fossilMeta} />; }
export function FossilAbout() { return <AboutPage meta={fossilMeta} extra={fossilExtra} />; }
export function FossilPrivacy() { return <PrivacyPage meta={fossilMeta} extra={fossilExtra} />; }
export function FossilPricing() { return <PricingPage meta={fossilMeta} extra={fossilExtra} />; }
export function FossilNotifications() { return <NotificationsPage meta={fossilMeta} extra={fossilExtra} />; }
export function FossilChangelog() { return <ChangelogPage meta={fossilMeta} extra={fossilExtra} />; }
export function FossilNotFound() { return <NotFoundPage meta={fossilMeta} />; }

// ─── 1. Production Dashboard ──────────────────────────────────────────────────

const prod24 = [188, 191, 186, 182, 179, 184, 190, 196, 201, 204, 207, 209, 211, 208, 205, 203, 206, 210, 213, 209, 202, 197, 193, 190];
const streamMix = [
  { value: 58, color: "#0f172a", name: "Crude oil" },
  { value: 30, color: "#f59e0b", name: "Natural gas" },
  { value: 12, color: "#a855f7", name: "NGLs" },
];
const prodInsights: Insight[] = [
  { title: "ESP failure risk — Permian 22H", body: "Motor current on Permian 22H is trending up with rising intake temperature — a signature seen before two prior ESP failures. A proactive pull during the next planned window avoids ~600 bbl/d of unplanned deferment.", tone: "amber", tag: "Artificial lift", confidence: 82 },
  { title: "Gas capture opportunity", body: "Eagle Ford CTB-3 is routing 3.8 MMscf/d to flare on compressor constraints. Rerouting to the idle Spur-2 compressor recovers gas worth ~$9.1k/day and cuts flaring CO₂e by 210 t/day.", tone: "green", tag: "Emissions", confidence: 88 },
  { title: "Decline ahead of forecast", body: "Bakken Tier-1 pad is declining 4% faster than the type curve. Re-rate the EUR or evaluate a refrac — current trajectory misses the quarter's volume budget by ~38 kbbl.", tone: "blue", tag: "Reservoir", confidence: 74 },
];

export function ProductionDashboard() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Oil production" value="211 kbbl/d" delta="+3% vs plan" deltaTone="green" icon={<Droplet size={16} />} />
        <Stat label="Gas production" value="184 MMscf/d" delta="On forecast" deltaTone="blue" icon={<Flame size={16} />} />
        <Stat label="Wells online" value="2,317 / 2,401" delta="84 down · 21 deferred" deltaTone="amber" />
        <Stat label="Flaring intensity" value="0.41%" delta="−0.06% MoM" deltaTone="green" icon={<CloudOff size={16} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <SectionTitle eyebrow="Field output" title="Oil-equivalent production — 24h (kboe/d)" right={<Badge tone="green" pulse>Live</Badge>} />
            <AreaChart data={prod24} height={170} stroke="#f59e0b" />
            <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
              {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "now"].map(d => <span key={d}>{d}</span>)}
            </div>
          </Card>

          <Card>
            <SectionTitle eyebrow="By field" title="Top producing fields · now" right={<Badge tone="gray">4 of 11</Badge>} />
            <div className="space-y-2">
              {[
                { name: "Permian — Midland Basin", type: "Tight oil · 1,140 wells", output: "96 kbbl/d", uptime: "97%", trend: "up" },
                { name: "Eagle Ford", type: "Shale · 612 wells", output: "54 kbbl/d", uptime: "94%", trend: "down" },
                { name: "Bakken — Williston", type: "Tight oil · 388 wells", output: "41 kbbl/d", uptime: "96%", trend: "up" },
                { name: "Gulf — Thunder Horse", type: "Offshore · 14 wells", output: "20 kbbl/d", uptime: "99%", trend: "up" },
              ].map(a => (
                <div key={a.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{a.name}</div>
                    <div className="text-xs ink-2 font-mono">{a.type}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold">{a.output}</div>
                    <div className="text-xs ink-2">Uptime {a.uptime}</div>
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
            <SectionTitle eyebrow="Stream mix" title="Production by stream" />
            <div className="flex justify-center py-2">
              <Donut segments={streamMix} label="395" sublabel="kboe/d" />
            </div>
            <div className="mt-3 space-y-1.5">
              {streamMix.map(s => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="ink-2 flex-1">{s.name}</span>
                  <span className="font-mono font-semibold">{s.value}%</span>
                </div>
              ))}
            </div>
          </Card>
          <AIPanel context="2,401-well portfolio · 3 refineries · Jun 2026" insights={prodInsights} />
        </div>
      </div>
    </div>
  );
}

// ─── 2. Wells & Rigs ──────────────────────────────────────────────────────────

type WellType = "Producing" | "Drilling" | "Workover" | "Shut-in";
const wells: { name: string; field: string; type: WellType; lift: string; oil: number; gas: number; wc: number; status: "Flowing" | "Down" | "Drilling" | "Shut-in" }[] = [
  { name: "Permian 14H", field: "Midland Basin", type: "Producing", lift: "ESP", oil: 0, gas: 0, wc: 31, status: "Down" },
  { name: "Permian 22H", field: "Midland Basin", type: "Producing", lift: "ESP", oil: 840, gas: 1.2, wc: 28, status: "Flowing" },
  { name: "Eagle Ford 7-3", field: "Eagle Ford", type: "Producing", lift: "Gas lift", oil: 410, gas: 2.4, wc: 19, status: "Flowing" },
  { name: "Bakken T1-09", field: "Williston", type: "Workover", lift: "Rod pump", oil: 0, gas: 0, wc: 44, status: "Down" },
  { name: "Thunder Horse A-6", field: "Gulf of Mexico", type: "Producing", lift: "Natural flow", oil: 5200, gas: 8.1, wc: 9, status: "Flowing" },
  { name: "Wolfcamp 31X", field: "Delaware Basin", type: "Drilling", lift: "—", oil: 0, gas: 0, wc: 0, status: "Drilling" },
  { name: "Eagle Ford 12-1", field: "Eagle Ford", type: "Shut-in", lift: "Gas lift", oil: 0, gas: 0, wc: 62, status: "Shut-in" },
  { name: "Bakken T1-18", field: "Williston", type: "Producing", lift: "Rod pump", oil: 290, gas: 0.6, wc: 38, status: "Flowing" },
];
const wellStatusTone: Record<string, Tone> = { Flowing: "green", Down: "red", Drilling: "blue", "Shut-in": "gray" };

export function WellsRigsScreen() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"All" | WellType>("All");
  const shown = wells.filter(w =>
    (filter === "All" || w.type === filter) &&
    (w.name + w.field).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Producing wells" value="2,317" delta="across 11 fields" deltaTone="blue" icon={<Droplet size={16} />} />
        <Stat label="Active rigs" value="9" delta="3 spud this week" deltaTone="green" icon={<Factory size={16} />} />
        <Stat label="Avg water cut" value="34%" delta="+1.2% QoQ" deltaTone="amber" />
      </div>

      <Card>
        <SectionTitle eyebrow="Well register" title="Wells & rigs" right={
          <div className="flex items-center gap-2 field !py-1.5 !px-2.5">
            <Search size={14} className="ink-2 shrink-0" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search wells…"
              className="bg-transparent text-sm outline-none w-40 placeholder:text-[var(--ink-2)]" />
          </div>
        } />

        <div className="flex flex-wrap gap-2 mb-4">
          {(["All", "Producing", "Drilling", "Workover", "Shut-in"] as const).map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${filter === t ? "bg-accent text-white border-accent" : "surface ink-2"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {shown.map(w => (
            <div key={w.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><Droplet size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{w.name}</div>
                <div className="text-xs ink-2">{w.field} · {w.lift} · WC {w.wc}%</div>
              </div>
              <div className="hidden sm:block text-right w-28">
                <div className="text-sm font-semibold font-mono">{w.oil ? `${w.oil} bbl/d` : "—"}</div>
                <div className="text-[11px] ink-2 font-mono">{w.gas ? `${w.gas} MMscf/d` : "no flow"}</div>
              </div>
              <Badge tone={wellStatusTone[w.status]}>{w.status}</Badge>
            </div>
          ))}
          {shown.length === 0 && <div className="text-center py-8 text-sm ink-2">No wells match your filters.</div>}
        </div>
      </Card>
    </div>
  );
}

// ─── 3. Refinery & Processing ─────────────────────────────────────────────────

const refRuns = [136, 138, 141, 140, 142, 143, 142, 144, 143, 142, 141, 142];

export function RefineryScreen() {
  const [crude, setCrude] = useState(60);

  const lightYield = Math.round(44 + crude * 0.06);
  const heavyYield = 100 - lightYield;

  const units = [
    { unit: "Crude unit (CDU)", rate: "142 kbd", util: 95, status: "Online", tone: "green" as Tone },
    { unit: "FCC", rate: "58 kbd", util: 92, status: "Online", tone: "green" as Tone },
    { unit: "Hydrocracker", rate: "44 kbd", util: 88, status: "Online", tone: "green" as Tone },
    { unit: "Reformer", rate: "31 kbd", util: 74, status: "Rate cut", tone: "amber" as Tone },
    { unit: "Coker", rate: "26 kbd", util: 0, status: "Turnaround", tone: "gray" as Tone },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Crude throughput" value="142 kbd" delta="95% utilization" deltaTone="green" icon={<Factory size={16} />} />
        <Stat label="Refining margin" value="$18.40/bbl" delta="3-2-1 crack" deltaTone="green" icon={<TrendingUp size={16} />} />
        <Stat label="Gasoline yield" value="47.2%" delta="Within band" deltaTone="blue" />
        <Stat label="Energy intensity" value="98.4" delta="EII · −1.1 MoM" deltaTone="green" icon={<Gauge size={16} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle eyebrow="Baytown complex" title="Crude runs — trailing 12 weeks (kbd)" right={<Badge tone="green">Target 144</Badge>} />
          <Bars data={refRuns.map((v, i) => ({ label: `W${i + 1}`, value: v }))} height={150} color="#f59e0b" />
        </Card>

        <Card>
          <SectionTitle eyebrow="Crude slate" title="Slate optimizer" />
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs ink-2 mb-1.5"><span>Light / sweet share</span><span className="font-mono font-semibold text-[var(--ink)]">{crude}%</span></div>
              <input type="range" min={20} max={90} value={crude} onChange={e => setCrude(+e.target.value)} className="w-full accent-[var(--accent)]" />
            </div>
            <div className="rounded-lg border border-[var(--line)] p-3 text-xs space-y-2">
              <div className="flex justify-between"><span className="ink-2">Light products yield</span><span className="font-mono font-semibold">{lightYield}%</span></div>
              <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${lightYield}%` }} />
              </div>
              <div className="flex justify-between pt-1"><span className="ink-2">Residual / heavy</span><span className="font-mono">{heavyYield}%</span></div>
              <div className="flex justify-between"><span className="ink-2">Est. feed cost</span><span className="font-mono">${(74 + crude * 0.12).toFixed(2)}/bbl</span></div>
            </div>
            <button className="btn-primary w-full py-2.5 text-sm">Apply slate</button>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Process units" title="Unit availability" right={<Badge tone="amber">1 in turnaround</Badge>} />
        <div className="space-y-2">
          {units.map(u => (
            <div key={u.unit} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><Container size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{u.unit}</div>
                <div className="text-xs ink-2 font-mono">{u.rate}</div>
              </div>
              <div className="hidden sm:block w-28">
                <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${u.util}%` }} />
                </div>
                <div className="text-[11px] ink-2 mt-1 font-mono">{u.util}% util</div>
              </div>
              <Badge tone={u.tone}>{u.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 4. Commodity Trading & Hedging ───────────────────────────────────────────

const wtiCurve = [70.2, 70.8, 71.4, 71.1, 70.6, 71.9, 72.4, 72.1, 71.6, 71.0, 70.4, 70.9, 71.5, 72.2, 72.8, 73.1, 72.6, 71.9, 71.3, 70.8, 71.2, 71.7, 72.0, 71.4];

export function CommodityTradingScreen() {
  const [hedge, setHedge] = useState(60);
  const monthlyProd = 6.3; // MMbbl/mo

  const positions = [
    { instr: "WTI swaps Q3", side: "Short", vol: "2.4 MMbbl", strike: "$72.10", mtm: "+$4.2M", tone: "green" as Tone },
    { instr: "Brent-WTI spread", side: "Long", vol: "1.0 MMbbl", strike: "$4.30", mtm: "−$0.6M", tone: "red" as Tone },
    { instr: "Henry Hub Q3", side: "Short", vol: "9.0 Bcf", strike: "$3.42", mtm: "+$1.1M", tone: "green" as Tone },
    { instr: "RBOB crack 3-2-1", side: "Long", vol: "1.4 MMbbl", strike: "$21.80", mtm: "+$2.9M", tone: "green" as Tone },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="WTI front-month" value="$71.40" delta="−0.8% today" deltaTone="amber" icon={<TrendingUp size={16} />} />
        <Stat label="Book mark-to-market" value="+$7.6M" delta="Net positive" deltaTone="green" />
        <Stat label="Hedged volume" value="62%" delta="Next 12 months" deltaTone="blue" />
        <Stat label="1-day VaR (95%)" value="$3.1M" delta="Within $5M limit" deltaTone="green" icon={<ShieldAlert size={16} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle eyebrow="WTI Cushing" title="Front-month price — 24h ($/bbl)" right={<Badge tone="amber">$71.40</Badge>} />
          <AreaChart data={wtiCurve} height={170} stroke="#0ea5e9" />
          <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
            {["00", "04", "08", "12", "16", "20", "now"].map(d => <span key={d}>{d}h</span>)}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Hedge program" title="Forward hedge ratio" />
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs ink-2 mb-1.5"><span>Next-12m hedged</span><span className="font-mono font-semibold text-[var(--ink)]">{hedge}%</span></div>
              <input type="range" min={0} max={100} value={hedge} onChange={e => setHedge(+e.target.value)} className="w-full accent-[var(--accent)]" />
            </div>
            <div className="rounded-lg border border-[var(--line)] p-3 text-xs space-y-1.5">
              <div className="flex justify-between"><span className="ink-2">Volume to hedge</span><span className="font-mono">{((monthlyProd * 12 * hedge) / 100).toFixed(1)} MMbbl</span></div>
              <div className="flex justify-between"><span className="ink-2">Floor protected</span><span className="font-mono font-semibold">${((monthlyProd * 12 * hedge / 100) * 71.4).toFixed(0)}M</span></div>
              <div className="flex justify-between"><span className="ink-2">Upside retained</span><span className="font-mono">{100 - hedge}%</span></div>
            </div>
            <button className="btn-primary w-full py-2.5 text-sm">Execute hedge</button>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Trading book" title="Open positions" right={<Badge tone="gray">4 instruments</Badge>} />
        <div className="space-y-2">
          {positions.map(p => (
            <div key={p.instr} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className={`grid place-items-center h-9 w-9 rounded-lg shrink-0 ${p.side === "Short" ? "bg-rose-500/12 text-rose-500" : "bg-emerald-500/12 text-emerald-500"}`}>
                {p.side === "Short" ? <ArrowDownRight size={15} /> : <ArrowUpRight size={15} />}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{p.instr}</div>
                <div className="text-xs ink-2 font-mono">{p.side} · {p.vol} · {p.strike}</div>
              </div>
              <div className="text-right shrink-0">
                <Badge tone={p.tone}>{p.mtm}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 5. Pipelines & Logistics ─────────────────────────────────────────────────

const throughput = [62, 64, 61, 63, 66, 68, 67, 65, 64, 66, 69, 70, 68, 67, 66, 65, 67, 69, 71, 70, 68, 66, 64, 63];

export function PipelineLogisticsScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Pipeline throughput" value="68 kbbl/h" delta="92% of capacity" deltaTone="green" icon={<Truck size={16} />} />
        <Stat label="Tank-farm inventory" value="4.1 MMbbl" delta="71% of shell" deltaTone="blue" icon={<Container size={16} />} />
        <Stat label="Line pressure" value="1,180 psi" delta="Within band" deltaTone="green" icon={<Gauge size={16} />} />
        <Stat label="Leak alarms (24h)" value="0" delta="All segments nominal" deltaTone="green" icon={<ShieldAlert size={16} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle eyebrow="Gulf Coast trunk line" title="Throughput — 24h (kbbl/h)" right={<Badge tone="green" pulse>Flowing</Badge>} />
          <AreaChart data={throughput} height={170} stroke="#a855f7" />
          <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
            {["00", "04", "08", "12", "16", "20", "now"].map(d => <span key={d}>{d}h</span>)}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Tank farm" title="Storage by product" />
          <div className="space-y-3">
            {[
              ["Crude oil", 78, "amber"],
              ["Gasoline", 64, "green"],
              ["Diesel", 71, "blue"],
              ["Jet / kero", 52, "blue"],
            ].map(([label, val, tone]) => (
              <div key={label as string}>
                <div className="flex justify-between text-xs mb-1.5"><span className="font-medium">{label}</span><span className="font-mono ink-2">{val}% full</span></div>
                <div className="h-2 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className={`h-full rounded-full ${tone === "green" ? "bg-emerald-500" : tone === "amber" ? "bg-amber-500" : "bg-accent"}`} style={{ width: `${val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Movements" title="Cargo & batch schedule" right={<Badge tone="gray">Next 24h</Badge>} />
        <div className="space-y-2">
          {[
            { id: "BL-22841", mode: "VLCC · Aegean Star", route: "Corpus Christi → Rotterdam", vol: "1.9 MMbbl", status: "Lifting", tone: "blue" as Tone },
            { id: "BATCH-7733", mode: "Pipeline batch", route: "Cushing → Baytown", vol: "320 kbbl", status: "In transit", tone: "green" as Tone },
            { id: "RAIL-1190", mode: "Unit train · 88 cars", route: "Williston → St. James", vol: "62 kbbl", status: "Loading", tone: "amber" as Tone },
            { id: "BL-22838", mode: "Aframax · Nordic Star", route: "Houston → Long Beach", vol: "640 kbbl", status: "Scheduled", tone: "gray" as Tone },
          ].map(m => (
            <div key={m.id} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><Truck size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium font-mono truncate">{m.id} · {m.mode}</div>
                <div className="text-xs ink-2 truncate">{m.route} · {m.vol}</div>
              </div>
              <Badge tone={m.tone}>{m.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 6. Emissions & Flaring ───────────────────────────────────────────────────

const flareMonthly = [
  { label: "Jan", value: 38 }, { label: "Feb", value: 34 }, { label: "Mar", value: 31 },
  { label: "Apr", value: 29 }, { label: "May", value: 26 }, { label: "Jun", value: 24 },
];

export function EmissionsScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Methane intensity" value="0.18%" delta="OGMP Level 5" deltaTone="green" icon={<CloudOff size={16} />} />
        <Stat label="Flared gas MTD" value="24 MMscf" delta="−8% vs last mo" deltaTone="green" icon={<Flame size={16} />} />
        <Stat label="CO₂e (Scope 1+2)" value="1.42 Mt" delta="YTD operated" deltaTone="amber" />
        <Stat label="LDAR coverage" value="98%" delta="Sites surveyed" deltaTone="blue" icon={<Gauge size={16} />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Flaring" title="Routine flaring (MMscf) · 2026" right={<Badge tone="green">−37% YoY</Badge>} />
          <Bars data={flareMonthly} height={150} color="#f97316" />
        </Card>

        <Card>
          <SectionTitle eyebrow="GHG Protocol" title="Emissions by source" />
          <div className="space-y-3">
            {[
              { src: "Flaring & venting", val: "41%", tone: "amber" as Tone },
              { src: "Combustion (heaters)", val: "33%", tone: "blue" as Tone },
              { src: "Fugitive methane", val: "18%", tone: "red" as Tone },
              { src: "Purchased power", val: "8%", tone: "gray" as Tone },
            ].map(s => (
              <div key={s.src} className="flex items-center justify-between rounded-lg border border-[var(--line)] p-3">
                <span className="text-sm font-medium">{s.src}</span>
                <Badge tone={s.tone}>{s.val}</Badge>
              </div>
            ))}
          </div>
          <div className="text-[11px] ink-2 mt-3 leading-relaxed">Methane abatement program targets net-zero routine flaring by 2030 across operated assets.</div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Compliance" title="Regulatory reporting" right={<button className="btn-ghost !px-3 !py-1.5 text-xs gap-1.5"><Download size={13} /> Export GHG pack</button>} />
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { fw: "EPA Subpart W", desc: "Petroleum & gas GHG reporting", status: "Filed Q1 2026", tone: "green" as Tone },
            { fw: "OGMP 2.0", desc: "Methane measurement reporting", status: "Level 5 (Gold)", tone: "green" as Tone },
            { fw: "Flaring permits", desc: "State routine-flare authorizations", status: "1 exceedance MTD", tone: "amber" as Tone },
            { fw: "EU Methane Reg.", desc: "Import methane intensity", status: "On track", tone: "blue" as Tone },
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

// ─── 7. HSE & Process Safety ──────────────────────────────────────────────────

export function HSEScreen() {
  const [orders, setOrders] = useState([
    { id: "PSE-2207", asset: "Baytown FCC", event: "Pressure-relief lift on overpressure transient", tier: "Tier 1", crew: "Process safety", done: false, tone: "red" as Tone },
    { id: "NM-5512", asset: "Permian CTB-2", event: "Near-miss — dropped object during crane lift", tier: "Near-miss", crew: "Site HSE", done: false, tone: "amber" as Tone },
    { id: "PTW-8841", asset: "Eagle Ford Spur-2", event: "Hot-work permit — compressor weld repair", tier: "Permit", crew: "Maintenance", done: false, tone: "blue" as Tone },
    { id: "LTI-0091", asset: "Williston pad", event: "Lost-time injury — hand laceration, rod pull", tier: "Tier 2", crew: "Site HSE", done: false, tone: "amber" as Tone },
    { id: "PSE-2201", asset: "Thunder Horse", event: "Gas detector A-zone calibration verified", tier: "Closed", crew: "I&C", done: true, tone: "gray" as Tone },
  ]);
  const toggle = (id: string) => setOrders(os => os.map(o => o.id === id ? { ...o, done: !o.done } : o));
  const open = orders.filter(o => !o.done).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="TRIR" value="0.62" delta="−0.11 vs last yr" deltaTone="green" icon={<HardHat size={16} />} />
        <Stat label="Tier-1 PSE (YTD)" value="2" delta="vs 5 prior year" deltaTone="green" icon={<ShieldAlert size={16} />} />
        <Stat label="Open actions" value={String(open)} delta="1 Tier-1" deltaTone="red" icon={<AlertTriangle size={16} />} />
        <Stat label="Barrier health" value="96%" delta="Safety-critical" deltaTone="green" icon={<Activity size={16} />} />
      </div>

      <Card>
        <SectionTitle eyebrow="Process safety" title="Events & permits queue" right={<Badge tone={open > 0 ? "amber" : "green"}>{open} open</Badge>} />
        <div className="space-y-2">
          {orders.map(o => (
            <div key={o.id} className={`flex items-center gap-3 rounded-lg border p-3.5 transition-colors ${o.done ? "border-[var(--line)] opacity-60" : "border-[var(--line)]"}`}>
              <button onClick={() => toggle(o.id)}
                className={`grid place-items-center h-8 w-8 rounded-lg shrink-0 transition-colors ${o.done ? "bg-emerald-500/15 text-emerald-500" : "bg-accent/12 text-accent"}`}
                aria-label={o.done ? "Reopen action" : "Mark closed"}>
                {o.done ? <Activity size={16} /> : <AlertTriangle size={16} />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium font-mono">{o.id}</span>
                  <span className="text-sm truncate">· {o.asset}</span>
                </div>
                <div className="text-xs ink-2 truncate">{o.event} · {o.crew}</div>
              </div>
              <Badge tone={o.done ? "green" : o.tone}>{o.done ? "Closed" : o.tier}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle eyebrow="Leading indicators" title="Safety culture metrics" />
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { kpi: "Safety observations", val: "1,842", note: "this month", tone: "green" as Tone },
            { kpi: "Permit compliance", val: "99.1%", note: "audited", tone: "green" as Tone },
            { kpi: "Overdue actions", val: "3", note: "past due date", tone: "amber" as Tone },
          ].map(c => (
            <div key={c.kpi} className="rounded-lg border border-[var(--line)] p-4">
              <div className="text-sm font-medium">{c.kpi}</div>
              <div className="font-display text-xl font-bold mt-1">{c.val}</div>
              <div className="mt-1.5"><Badge tone={c.tone}>{c.note}</Badge></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 8. Reserves & Economics ──────────────────────────────────────────────────

const reservesByBasin = [
  { label: "Permian", value: 41 }, { label: "Eagle Ford", value: 22 },
  { label: "Bakken", value: 18 }, { label: "Gulf", value: 13 }, { label: "Other", value: 6 },
];
const reserveCategories = [
  { value: 52, color: "#10b981", name: "Proved (1P)" },
  { value: 31, color: "#f59e0b", name: "Probable" },
  { value: 17, color: "#94a3b8", name: "Possible" },
];

export function ReservesScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Proved reserves (1P)" value="1.24 Bboe" delta="+4% YoY" deltaTone="green" icon={<Briefcase size={16} />} />
        <Stat label="Reserve life (R/P)" value="11.2 yr" delta="At current rate" deltaTone="blue" />
        <Stat label="Lifting cost" value="$11.40/boe" delta="−6% YoY" deltaTone="green" icon={<TrendingUp size={16} />} />
        <Stat label="Finding & dev cost" value="$8.90/boe" delta="3-yr average" deltaTone="blue" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="By basin" title="Proved reserves distribution (%)" right={<Badge tone="gray">1.24 Bboe</Badge>} />
          <Bars data={reservesByBasin} height={150} color="#f59e0b" />
        </Card>

        <Card>
          <SectionTitle eyebrow="SEC categories" title="Reserve confidence" />
          <div className="flex justify-center py-2">
            <Donut segments={reserveCategories} label="2.4" sublabel="Bboe 3P" />
          </div>
          <div className="mt-3 space-y-1.5">
            {reserveCategories.map(s => (
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
        <SectionTitle eyebrow="Asset economics" title="Netback by field" right={<button className="btn-ghost !px-3 !py-1.5 text-xs gap-1.5"><FileText size={13} /> Reserve report</button>} />
        <div className="space-y-2">
          {[
            { name: "Thunder Horse (offshore)", netback: "$42.10/boe", breakeven: "$38", margin: 88, tone: "green" as Tone },
            { name: "Permian — Midland", netback: "$31.40/boe", breakeven: "$41", margin: 76, tone: "green" as Tone },
            { name: "Bakken — Williston", netback: "$26.80/boe", breakeven: "$48", margin: 64, tone: "amber" as Tone },
            { name: "Eagle Ford", netback: "$24.10/boe", breakeven: "$46", margin: 58, tone: "amber" as Tone },
          ].map(a => (
            <div key={a.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{a.name}</div>
                <div className="text-xs ink-2 font-mono">Netback {a.netback} · BE {a.breakeven}/bbl</div>
              </div>
              <div className="hidden sm:flex items-center gap-2.5">
                <Sparkline data={[a.margin - 20, a.margin - 8, a.margin]} />
                <span className="font-mono text-xs ink-2 w-9 text-right">{a.margin}%</span>
              </div>
              <Badge tone={a.tone}>{a.margin >= 70 ? "Core" : "Marginal"}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
