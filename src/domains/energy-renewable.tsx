// src/domains/energy-renewable.tsx — Sunhive · distributed solar, home storage & virtual power plant
import { useState } from "react";
import {
  Sun, BatteryCharging, Plug, Home, Leaf, Gauge, Wrench, Users,
  TrendingUp, Briefcase, Search, AlertTriangle, Activity, FileText,
  Download, ArrowUpRight, ArrowDownRight, Zap, CheckCircle2, CloudOff,
} from "lucide-react";
import { HomePage, LoginPage, RegisterPage, ProfilePage, SettingsPage, FAQPage, SupportPage, DomainMeta } from "./pages";
import { AboutPage, PrivacyPage, PricingPage, NotificationsPage, ChangelogPage, NotFoundPage, DomainExtra } from "./pages-extra";
import { Card, SectionTitle, Badge, Stat, Tone } from "../components/ui";
import { Bars, AreaChart, Donut } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

// ─── Domain meta ─────────────────────────────────────────────────────────────

const renMeta: DomainMeta = {
  id: "renewable",
  name: "Sunhive",
  tagline: "Distributed solar, home batteries, and EV charging — orchestrated into one virtual power plant.",
  description: "Sunhive runs the rooftop revolution: design and install residential and community solar, manage every home battery and EV charger, and aggregate thousands of sites into a virtual power plant that bids real power into the grid.",
  accentLabel: "Rooftop Solar · Home Storage · VPP · EV",
  features: [
    { icon: "🏠", title: "Distributed fleet", body: "Live production and battery state across tens of thousands of rooftops, all in one fleet view." },
    { icon: "🔋", title: "Virtual power plant", body: "Aggregate home batteries and EVs into a dispatchable VPP that earns grid-services revenue for owners." },
    { icon: "🌱", title: "Customer savings", body: "Net-metering, time-of-use optimization, and bill savings tracked transparently for every household." },
  ],
  faqs: [
    { q: "What kind of energy assets does Sunhive manage?", a: "Residential and small-commercial rooftop solar, behind-the-meter home batteries, community-solar gardens, and bidirectional EV chargers. Each site is monitored individually and rolled up into a fleet and VPP view." },
    { q: "How does the virtual power plant work?", a: "Sunhive aggregates thousands of home batteries into a single dispatchable resource. During grid-stress events or price peaks it discharges batteries in concert, bids the combined capacity into wholesale and grid-services markets, and shares the revenue back to participating households." },
    { q: "How are customer savings calculated?", a: "Sunhive models each home's tariff — including time-of-use rates and net-metering credits — and optimizes solar self-consumption and battery cycling to minimize the bill. Savings are reconciled against actual utility statements so the number is real, not estimated." },
    { q: "Does Sunhive handle installation and field service?", a: "Yes. From site survey and system design through permitting, install scheduling, and ongoing O&M, the project pipeline and field-service modules track every job, truck roll, and warranty claim." },
    { q: "Can homeowners see their own data?", a: "Every household gets a live view of production, consumption, battery state, EV charging, savings, and VPP earnings — while installers and the fleet operator see the aggregate." },
    { q: "What about the grid and utility side?", a: "Sunhive integrates with utility net-metering programs and ISO grid-services markets, handling interconnection status, export limits, and settlement for VPP dispatch." },
  ],
  supportEmail: "support@sunhive.energy",
};

const renExtra: DomainExtra = {
  founded: "2016",
  mission: "Sunhive exists to turn every rooftop into a power plant and every household into a participant in the grid — so the clean-energy transition is built from the bottom up, not just the top down.",
  story: [
    "Sunhive started in 2016 as a solar installer that kept hitting the same wall: once a system was on the roof, the homeowner's relationship with their own energy went dark. Production data lived in one inverter app, the battery in another, the EV charger in a third, and nobody could see — let alone optimize — the whole home.",
    "So the founders built the software layer first and the install business around it. Today Sunhive monitors 84,000 rooftops and 31,000 home batteries across six states, and aggregates them into a 140 MW virtual power plant that bids into grid-services markets — paying households for power they didn't know they could sell.",
  ],
  team: [
    { name: "Maya Okonkwo", role: "Co-founder & CEO", emoji: "👩🏿‍💼", bio: "Former solar installer. Built Sunhive after watching homeowners lose sight of their own energy the day the panels went up." },
    { name: "Erik Lindqvist", role: "Co-founder & CTO", emoji: "👨🏼‍💻", bio: "Grid-edge engineer. Designed the VPP dispatch engine that coordinates 31,000 batteries in under a second." },
    { name: "Carla Reyes", role: "VP Field Operations", emoji: "🔧", bio: "Ran 400 install crews at a national solar co. Turned truck rolls into a scheduled, first-time-fix operation." },
    { name: "Daniel Park", role: "Head of Grid Markets", emoji: "⚡", bio: "Ex-ISO market operator. Bids the aggregated fleet into wholesale and ancillary markets every day." },
  ],
  compliance: [
    { name: "IEEE 1547", desc: "Interconnection standard for distributed energy resources to the grid.", status: "Compliant" },
    { name: "UL 9540 (ESS)", desc: "Safety certification for residential energy-storage systems.", status: "Certified" },
    { name: "SOC 2 Type II", desc: "Security and availability audit across the customer and VPP platform.", status: "Certified" },
    { name: "NEM 3.0", desc: "Net-energy-metering tariff compliance for customer billing.", status: "Compliant" },
    { name: "FERC Order 2222", desc: "Distributed-resource participation in wholesale markets.", status: "In progress" },
  ],
  dataRetention: "Interval (15-minute) production and consumption data is retained for 7 years to support billing, savings reconciliation, and tax-credit substantiation. Battery and VPP dispatch logs are kept for 5 years for market settlement. Home energy data is encrypted and never sold; it is deleted within 30 days of an erasure request, with anonymized fleet aggregates retained for grid forecasting.",
  plans: [
    { name: "Homeowner", price: "Free", desc: "For a single household with Sunhive hardware.", features: ["Live solar + battery monitoring", "Bill-savings tracker", "EV charge scheduling", "VPP enrollment"], cta: "Get the app" },
    { name: "Installer", price: "$390", period: "mo", desc: "For solar installers and small EPCs.", features: ["Project pipeline & design", "Fleet monitoring dashboard", "Field-service scheduling", "Warranty & O&M tracking", "Customer portals", "Priority support"], highlight: true, cta: "Book a demo" },
    { name: "Aggregator", price: "Custom", desc: "For VPP operators and community-solar providers.", features: ["VPP dispatch & market bidding", "Grid-services settlement", "Community-solar subscriptions", "Utility program integration", "Revenue-share accounting", "Dedicated solutions engineer"], cta: "Talk to sales" },
  ],
  notifications: [
    { title: "VPP event called", body: "Grid operator issued a 4–7pm flexibility event. 28,400 batteries enrolled; estimated 96 MW dispatchable. Households will earn ~$0.42/kWh exported.", time: "9 min ago", tone: "green", unread: true },
    { title: "Install completed — Castro Valley", body: "8.4 kW rooftop + 13.5 kWh battery commissioned at the Nguyen residence. PTO received from utility; system now producing.", time: "44 min ago", tone: "blue", unread: true },
    { title: "Inverter offline — Site #41882", body: "Rooftop at 119 Maple St. stopped reporting 2h ago. Likely Wi-Fi or inverter fault. Truck roll suggested under warranty.", time: "1 h ago", tone: "amber", unread: true },
    { title: "Battery cycle complete", body: "Powerwall fleet discharged 412 MWh into the evening peak. Average household earned $3.10 tonight.", time: "3 h ago", tone: "green" },
    { title: "Community solar full", body: "Riverside Solar Garden reached 100% subscription — 612 members. Waitlist opened for the next phase.", time: "Yesterday", tone: "blue" },
  ],
  changelog: [
    { version: "v3.4", date: "Jun 8, 2026", tag: "New", items: ["Bidirectional EV (V2G) enrollment in the VPP", "Tariff-aware battery optimizer for NEM 3.0", "Household VPP earnings statement export"] },
    { version: "v3.3", date: "May 16, 2026", tag: "Improved", items: ["VPP dispatch latency cut to under 1s across 31k sites", "Savings now reconciled against scanned utility bills", "Install scheduler auto-routes crews by drive time"] },
    { version: "v3.2", date: "Apr 19, 2026", tag: "Fixed", items: ["Net-metering credit miscount during daylight-saving shift", "Battery state-of-charge drift on firmware v2.7 units", "Community-solar allocation rounding on partial months"] },
  ],
};

// ─── Shared page wrappers ─────────────────────────────────────────────────────

export function RenewableHome() { return <HomePage meta={renMeta} />; }
export function RenewableLogin() { return <LoginPage meta={renMeta} />; }
export function RenewableRegister() { return <RegisterPage meta={renMeta} />; }
export function RenewableProfile() { return <ProfilePage meta={renMeta} />; }
export function RenewableSettings() { return <SettingsPage meta={renMeta} />; }
export function RenewableFAQ() { return <FAQPage meta={renMeta} />; }
export function RenewableSupport() { return <SupportPage meta={renMeta} />; }
export function RenewableAbout() { return <AboutPage meta={renMeta} extra={renExtra} />; }
export function RenewablePrivacy() { return <PrivacyPage meta={renMeta} extra={renExtra} />; }
export function RenewablePricing() { return <PricingPage meta={renMeta} extra={renExtra} />; }
export function RenewableNotifications() { return <NotificationsPage meta={renMeta} extra={renExtra} />; }
export function RenewableChangelog() { return <ChangelogPage meta={renMeta} extra={renExtra} />; }
export function RenewableNotFound() { return <NotFoundPage meta={renMeta} />; }

// ─── 1. Fleet Dashboard ───────────────────────────────────────────────────────

const solarDay = [0, 0, 0, 0.2, 1.1, 3.4, 6.8, 11.2, 16.1, 20.4, 23.8, 25.9, 26.4, 25.1, 22.3, 17.8, 12.1, 6.9, 2.8, 0.6, 0, 0, 0, 0];
const homeMix = [
  { value: 47, color: "#f59e0b", name: "Self-consumed" },
  { value: 34, color: "#34d399", name: "Battery stored" },
  { value: 19, color: "#38bdf8", name: "Exported to grid" },
];
const fleetInsights: Insight[] = [
  { title: "Pre-position batteries for peak", body: "A heat event tomorrow pushes evening prices to $0.58/kWh. Charging the fleet to 95% by 3pm and discharging 5–8pm could earn households an extra ~$118k collectively versus default behavior.", tone: "green", tag: "VPP", confidence: 86 },
  { title: "Underperforming cluster — Foothill", body: "147 rooftops in the Foothill ZIP are producing 12% below modeled output for clear-sky conditions. Likely soiling after the dust event — a coordinated cleaning campaign pays back in ~6 weeks.", tone: "amber", tag: "O&M", confidence: 80 },
  { title: "EV charging shift", body: "63% of enrolled EVs charge at 6pm during peak. Nudging them to off-peak via the app would cut household bills ~$14/mo each and free 4 MW of evening grid capacity.", tone: "blue", tag: "Load shift", confidence: 77 },
];

export function FleetDashboard() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Fleet production" value="142 MW" delta="84,000 rooftops" deltaTone="green" icon={<Sun size={16} />} />
        <Stat label="Battery capacity" value="418 MWh" delta="31,000 homes · 64% SoC" deltaTone="blue" icon={<BatteryCharging size={16} />} />
        <Stat label="VPP dispatchable" value="96 MW" delta="28.4k enrolled" deltaTone="green" icon={<Zap size={16} />} />
        <Stat label="Sites online" value="99.2%" delta="671 offline" deltaTone="amber" icon={<Activity size={16} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <SectionTitle eyebrow="Aggregate" title="Fleet solar production — today (MW)" right={<Badge tone="green" pulse>Live</Badge>} />
            <AreaChart data={solarDay} height={170} stroke="#f59e0b" />
            <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
              {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "now"].map(d => <span key={d}>{d}</span>)}
            </div>
          </Card>

          <Card>
            <SectionTitle eyebrow="By region" title="Top producing clusters · now" right={<Badge tone="gray">4 of 38</Badge>} />
            <div className="space-y-2">
              {[
                { name: "San Diego County", type: "14,200 sites · solar+storage", output: "31 MW", health: "99%", trend: "up" },
                { name: "Phoenix Metro", type: "11,800 sites · solar", output: "28 MW", health: "98%", trend: "up" },
                { name: "Austin", type: "8,400 sites · solar+storage", output: "19 MW", health: "97%", trend: "down" },
                { name: "Sacramento Valley", type: "9,100 sites · solar", output: "17 MW", health: "96%", trend: "up" },
              ].map(c => (
                <div key={c.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{c.name}</div>
                    <div className="text-xs ink-2 font-mono">{c.type}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold">{c.output}</div>
                    <div className="text-xs ink-2">Health {c.health}</div>
                  </div>
                  {c.trend === "up"
                    ? <ArrowUpRight size={16} className="text-emerald-500 shrink-0" />
                    : <ArrowDownRight size={16} className="text-rose-500 shrink-0" />}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <SectionTitle eyebrow="Energy flow" title="Where the solar goes" />
            <div className="flex justify-center py-2">
              <Donut segments={homeMix} label="142" sublabel="MW now" />
            </div>
            <div className="mt-3 space-y-1.5">
              {homeMix.map(s => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="ink-2 flex-1">{s.name}</span>
                  <span className="font-mono font-semibold">{s.value}%</span>
                </div>
              ))}
            </div>
          </Card>
          <AIPanel context="84k rooftops · 140 MW VPP · Jun 2026" insights={fleetInsights} />
        </div>
      </div>
    </div>
  );
}

// ─── 2. Installation Pipeline ─────────────────────────────────────────────────

type Stage = "Survey" | "Design" | "Permitting" | "Install" | "PTO";
const projects: { name: string; system: string; stage: Stage; value: string; days: number }[] = [
  { name: "Nguyen — Castro Valley", system: "8.4 kW + 13.5 kWh", stage: "PTO", value: "$31,200", days: 2 },
  { name: "Okafor — Mesa", system: "11.2 kW + EV charger", stage: "Install", value: "$38,900", days: 5 },
  { name: "Riverside Garden Ph.2", system: "420 kW community", stage: "Permitting", value: "$610,000", days: 18 },
  { name: "Salah — Round Rock", system: "6.8 kW", stage: "Design", value: "$21,400", days: 9 },
  { name: "Whitfield — Chula Vista", system: "9.6 kW + 27 kWh", stage: "Survey", value: "$44,100", days: 1 },
  { name: "Delgado — Tempe", system: "7.2 kW + 13.5 kWh", stage: "Install", value: "$29,800", days: 4 },
];
const stageTone: Record<Stage, Tone> = { Survey: "gray", Design: "blue", Permitting: "amber", Install: "blue", PTO: "green" };
const stageOrder: Stage[] = ["Survey", "Design", "Permitting", "Install", "PTO"];

export function InstallPipelineScreen() {
  const [stage, setStage] = useState<"All" | Stage>("All");
  const shown = projects.filter(p => stage === "All" || p.stage === stage);
  const counts = stageOrder.map(s => ({ s, n: projects.filter(p => p.stage === s).length }));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Projects in pipeline" value="312" delta="$9.4M booked" deltaTone="blue" icon={<Briefcase size={16} />} />
        <Stat label="Installs this month" value="148" delta="+22% MoM" deltaTone="green" icon={<Home size={16} />} />
        <Stat label="Avg cycle time" value="38 days" delta="survey → PTO" deltaTone="amber" />
        <Stat label="First-time-fix rate" value="94%" delta="+3% QoQ" deltaTone="green" icon={<CheckCircle2 size={16} />} />
      </div>

      <Card>
        <SectionTitle eyebrow="Funnel" title="Pipeline by stage" />
        <div className="grid grid-cols-5 gap-2">
          {counts.map(({ s, n }) => (
            <button key={s} onClick={() => setStage(stage === s ? "All" : s)}
              className={`rounded-lg border p-3 text-center transition-colors ${stage === s ? "border-accent bg-accent/5" : "border-[var(--line)]"}`}>
              <div className="font-display text-xl font-bold">{n}</div>
              <div className="text-[11px] ink-2 mt-0.5">{s}</div>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle eyebrow="Jobs" title={stage === "All" ? "All projects" : `${stage} stage`} right={<Badge tone="gray">{shown.length} shown</Badge>} />
        <div className="space-y-2">
          {shown.map(p => (
            <div key={p.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><Home size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{p.name}</div>
                <div className="text-xs ink-2">{p.system} · {p.value}</div>
              </div>
              <div className="hidden sm:block text-right">
                <div className="text-xs ink-2 font-mono">{p.days}d in stage</div>
              </div>
              <Badge tone={stageTone[p.stage]}>{p.stage}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 3. Virtual Power Plant ───────────────────────────────────────────────────

const dispatchCurve = [12, 10, 9, 8, 9, 14, 22, 31, 28, 24, 20, 18, 16, 18, 24, 38, 62, 88, 96, 84, 58, 36, 22, 15];

export function VPPScreen() {
  const [target, setTarget] = useState(80);
  const enrolled = 28400;
  const avgKwh = 9.2;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Dispatchable now" value="96 MW" delta="28,400 batteries" deltaTone="green" icon={<Zap size={16} />} />
        <Stat label="Event status" value="Active" delta="4–7pm flex event" deltaTone="green" icon={<Activity size={16} />} />
        <Stat label="Energy exported" value="412 MWh" delta="Today's event" deltaTone="blue" icon={<Plug size={16} />} />
        <Stat label="Household earnings" value="$3.10 avg" delta="Tonight per home" deltaTone="green" icon={<TrendingUp size={16} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle eyebrow="Aggregate dispatch" title="VPP power delivered — 24h (MW)" right={<Badge tone="green" pulse>Dispatching</Badge>} />
          <AreaChart data={dispatchCurve} height={170} stroke="#34d399" />
          <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
            {["00", "04", "08", "12", "16", "20", "now"].map(d => <span key={d}>{d}h</span>)}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Dispatch plan" title="Target discharge" />
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs ink-2 mb-1.5"><span>Fleet discharge depth</span><span className="font-mono font-semibold text-[var(--ink)]">{target}%</span></div>
              <input type="range" min={0} max={100} value={target} onChange={e => setTarget(+e.target.value)} className="w-full accent-[var(--accent)]" />
            </div>
            <div className="rounded-lg border border-[var(--line)] p-3 text-xs space-y-1.5">
              <div className="flex justify-between"><span className="ink-2">Energy available</span><span className="font-mono">{((enrolled * avgKwh * target) / 100 / 1000).toFixed(0)} MWh</span></div>
              <div className="flex justify-between"><span className="ink-2">Est. market revenue</span><span className="font-mono font-semibold">${(((enrolled * avgKwh * target) / 100) * 0.42 / 1000).toFixed(0)}k</span></div>
              <div className="flex justify-between"><span className="ink-2">Reserve floor kept</span><span className="font-mono">{100 - target}%</span></div>
            </div>
            <button className="btn-primary w-full py-2.5 text-sm">Dispatch fleet</button>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Markets" title="Grid-services participation" />
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { svc: "Demand response", mw: "96 MW", rev: "$0.42/kWh", tone: "green" as Tone },
            { svc: "Frequency regulation", mw: "32 MW", rev: "$2.8k/day", tone: "blue" as Tone },
            { svc: "Wholesale arbitrage", mw: "44 MW", rev: "$1.9k/day", tone: "gray" as Tone },
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

// ─── 4. Home Battery & EV ─────────────────────────────────────────────────────

const homeSoc = [88, 84, 79, 72, 66, 60, 55, 58, 70, 82, 92, 98, 100, 99, 95, 88, 78, 62, 44, 30, 38, 56, 72, 84];

export function HomeEnergyScreen() {
  const [mode, setMode] = useState<"self" | "backup" | "vpp" | "tou">("vpp");

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Battery state of charge" value="84%" delta="13.5 kWh · 11.3 stored" deltaTone="green" icon={<BatteryCharging size={16} />} />
        <Stat label="Home consumption" value="2.1 kW" delta="Below solar output" deltaTone="green" icon={<Home size={16} />} />
        <Stat label="EV charge" value="62%" delta="Off-peak scheduled" deltaTone="blue" icon={<Plug size={16} />} />
        <Stat label="Grid independence" value="91%" delta="Self-powered today" deltaTone="green" icon={<Activity size={16} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle eyebrow="My home" title="Battery state of charge — 24h (%)" right={<Badge tone="blue">Powerwall · 13.5 kWh</Badge>} />
          <AreaChart data={homeSoc} height={170} stroke="#34d399" />
          <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
            {["00", "04", "08", "12", "16", "20", "now"].map(d => <span key={d}>{d}h</span>)}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Battery mode" title="Operating preference" />
          <div className="space-y-2">
            {([
              ["self", "Self-powered", "Maximize using your own solar first"],
              ["vpp", "VPP earnings", "Let Sunhive dispatch for grid revenue"],
              ["tou", "Time-of-use", "Charge off-peak, discharge at peak rates"],
              ["backup", "Storm backup", "Keep battery full for outages"],
            ] as const).map(([id, label, desc]) => (
              <button key={id} onClick={() => setMode(id)}
                className={`w-full text-left rounded-lg border p-3 transition-colors ${mode === id ? "border-accent bg-accent/5" : "border-[var(--line)]"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{label}</span>
                  {mode === id && <CheckCircle2 size={15} className="text-accent" />}
                </div>
                <div className="text-xs ink-2 mt-0.5">{desc}</div>
              </button>
            ))}
          </div>
          <button className="btn-primary w-full py-2.5 text-sm mt-4">Save preference</button>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="EV charging" title="Charge schedule" />
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "Off-peak window", val: "12am–6am", note: "$0.11/kWh", tone: "green" as Tone },
            { label: "Added range tonight", val: "184 mi", note: "from solar + grid", tone: "blue" as Tone },
            { label: "V2G enrolled", val: "Yes", note: "exports during events", tone: "green" as Tone },
          ].map(c => (
            <div key={c.label} className="rounded-lg border border-[var(--line)] p-4">
              <div className="text-sm font-medium">{c.label}</div>
              <div className="font-display text-xl font-bold mt-1">{c.val}</div>
              <div className="mt-1.5"><Badge tone={c.tone}>{c.note}</Badge></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 5. Net Metering & Billing ────────────────────────────────────────────────

const billTrend = [
  { label: "Jan", value: 142 }, { label: "Feb", value: 118 }, { label: "Mar", value: 86 },
  { label: "Apr", value: 41 }, { label: "May", value: 12 }, { label: "Jun", value: -18 },
];

export function BillingScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="This month's bill" value="−$18" delta="Net credit" deltaTone="green" icon={<TrendingUp size={16} />} />
        <Stat label="Energy exported" value="312 kWh" delta="NEM credit earned" deltaTone="blue" icon={<Plug size={16} />} />
        <Stat label="VPP earnings YTD" value="$214" delta="From grid events" deltaTone="green" icon={<Zap size={16} />} />
        <Stat label="Lifetime savings" value="$4,820" delta="vs utility-only" deltaTone="green" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Net bill" title="Monthly utility bill ($) · 2026" right={<Badge tone="green">Now in credit</Badge>} />
          <Bars data={billTrend} height={150} color="#34d399" />
          <div className="text-[11px] ink-2 mt-3 leading-relaxed">Negative bars are net credits — your home exported more energy than it drew from the grid.</div>
        </Card>

        <Card>
          <SectionTitle eyebrow="This cycle" title="Bill breakdown" />
          <div className="space-y-3">
            {[
              ["Grid import", "$64", "amber"],
              ["Solar offset", "−$58", "green"],
              ["NEM export credit", "−$31", "green"],
              ["VPP earnings", "−$12", "green"],
              ["Fixed charges", "$19", "gray"],
            ].map(([label, val, tone]) => (
              <div key={label as string} className="flex items-center justify-between">
                <span className="text-sm ink-2">{label}</span>
                <Badge tone={tone as Tone}>{val}</Badge>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]">
              <span className="text-sm font-semibold">Net this month</span>
              <span className="font-display text-lg font-bold text-emerald-500">−$18</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Statements" title="Energy statements" right={<button className="btn-ghost !px-3 !py-1.5 text-xs gap-1.5"><Download size={13} /> Download all</button>} />
        <div className="space-y-2">
          {[
            { doc: "June 2026 energy statement", type: "PDF · net −$18", date: "Jul 1, 2026", tone: "green" as Tone },
            { doc: "Q2 VPP earnings summary", type: "PDF · +$118", date: "Jul 1, 2026", tone: "green" as Tone },
            { doc: "May 2026 energy statement", type: "PDF · $12", date: "Jun 1, 2026", tone: "gray" as Tone },
            { doc: "Federal tax credit (Form 5695)", type: "PDF · ITC", date: "Feb 14, 2026", tone: "blue" as Tone },
          ].map(d => (
            <div key={d.doc} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><FileText size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{d.doc}</div>
                <div className="text-xs ink-2 font-mono">{d.type} · {d.date}</div>
              </div>
              <button className="btn-ghost !p-2" aria-label={`Download ${d.doc}`}><Download size={15} /></button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 6. Subscribers & Community Solar ─────────────────────────────────────────

export function SubscribersScreen() {
  const [q, setQ] = useState("");
  const members = [
    { name: "Riverside Solar Garden", kind: "Community · 612 members", capacity: "1.0 MW", fill: 100, tone: "green" as Tone },
    { name: "Eastside Solar Co-op", kind: "Community · 388 members", capacity: "640 kW", fill: 92, tone: "green" as Tone },
    { name: "Harbor Community Solar", kind: "Community · 210 members", capacity: "420 kW", fill: 74, tone: "amber" as Tone },
    { name: "Mesa Rooftop Subscribers", kind: "Distributed · 11,800 homes", capacity: "28 MW", fill: 88, tone: "blue" as Tone },
    { name: "North Valley Garden Ph.2", kind: "Community · pre-launch", capacity: "420 kW", fill: 18, tone: "gray" as Tone },
  ];
  const shown = members.filter(m => (m.name + m.kind).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total subscribers" value="84,612" delta="+1,940 MoM" deltaTone="green" icon={<Users size={16} />} />
        <Stat label="Community gardens" value="38" delta="6 states" deltaTone="blue" />
        <Stat label="Avg member savings" value="14%" delta="off utility bill" deltaTone="green" />
        <Stat label="Churn" value="1.2%" delta="annualized" deltaTone="green" />
      </div>

      <Card>
        <SectionTitle eyebrow="Programs" title="Subscriber programs" right={
          <div className="flex items-center gap-2 field !py-1.5 !px-2.5">
            <Search size={14} className="ink-2 shrink-0" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search programs…"
              className="bg-transparent text-sm outline-none w-40 placeholder:text-[var(--ink-2)]" />
          </div>
        } />
        <div className="space-y-2">
          {shown.map(m => (
            <div key={m.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><Sun size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{m.name}</div>
                <div className="text-xs ink-2">{m.kind} · {m.capacity}</div>
              </div>
              <div className="hidden sm:block w-28">
                <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${m.fill}%` }} />
                </div>
                <div className="text-[11px] ink-2 mt-1 font-mono">{m.fill}% subscribed</div>
              </div>
              <Badge tone={m.tone}>{m.fill === 100 ? "Full" : m.fill < 20 ? "Pre-launch" : "Open"}</Badge>
            </div>
          ))}
          {shown.length === 0 && <div className="text-center py-8 text-sm ink-2">No programs match your search.</div>}
        </div>
      </Card>
    </div>
  );
}

// ─── 7. Field Service ─────────────────────────────────────────────────────────

export function FieldServiceScreen() {
  const [orders, setOrders] = useState([
    { id: "FS-9914", site: "Site #41882 · 119 Maple St", issue: "Inverter offline — no comms 2h", prio: "High", crew: "South crew", done: false, tone: "amber" as Tone },
    { id: "FS-9910", site: "Okafor — Mesa", issue: "EV charger commissioning", prio: "Medium", crew: "East crew", done: false, tone: "blue" as Tone },
    { id: "FS-9908", site: "Foothill cluster (147 sites)", issue: "Soiling cleaning campaign", prio: "Medium", crew: "Contractor", done: false, tone: "blue" as Tone },
    { id: "FS-9901", site: "Whitfield — Chula Vista", issue: "Battery firmware v2.7 SoC drift", prio: "High", crew: "Unassigned", done: false, tone: "amber" as Tone },
    { id: "FS-9890", site: "Delgado — Tempe", issue: "Annual panel inspection", prio: "Low", crew: "East crew", done: true, tone: "gray" as Tone },
  ]);
  const toggle = (id: string) => setOrders(os => os.map(o => o.id === id ? { ...o, done: !o.done } : o));
  const open = orders.filter(o => !o.done).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Open tickets" value={String(open)} delta="2 high priority" deltaTone="amber" icon={<Wrench size={16} />} />
        <Stat label="Trucks dispatched" value="14" delta="today" deltaTone="blue" icon={<Activity size={16} />} />
        <Stat label="First-time-fix" value="94%" delta="+3% QoQ" deltaTone="green" icon={<CheckCircle2 size={16} />} />
        <Stat label="Avg response" value="6.4 h" delta="−12% vs last qtr" deltaTone="green" />
      </div>

      <Card>
        <SectionTitle eyebrow="Service queue" title="Work orders" right={<Badge tone={open > 0 ? "amber" : "green"}>{open} open</Badge>} />
        <div className="space-y-2">
          {orders.map(o => (
            <div key={o.id} className={`flex items-center gap-3 rounded-lg border p-3.5 transition-colors ${o.done ? "border-[var(--line)] opacity-60" : "border-[var(--line)]"}`}>
              <button onClick={() => toggle(o.id)}
                className={`grid place-items-center h-8 w-8 rounded-lg shrink-0 transition-colors ${o.done ? "bg-emerald-500/15 text-emerald-500" : "bg-accent/12 text-accent"}`}
                aria-label={o.done ? "Reopen ticket" : "Mark resolved"}>
                {o.done ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium font-mono">{o.id}</span>
                  <span className="text-sm truncate">· {o.site}</span>
                </div>
                <div className="text-xs ink-2 truncate">{o.issue} · {o.crew}</div>
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
            { crew: "South crew", region: "San Diego", jobs: 4, status: "On site", tone: "amber" as Tone },
            { crew: "East crew", region: "Phoenix / Mesa", jobs: 3, status: "En route", tone: "blue" as Tone },
            { crew: "Central crew", region: "Austin", jobs: 1, status: "Available", tone: "green" as Tone },
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

// ─── 8. Carbon & Savings Impact ───────────────────────────────────────────────

const carbonMonthly = [
  { label: "Jan", value: 18 }, { label: "Feb", value: 24 }, { label: "Mar", value: 33 },
  { label: "Apr", value: 41 }, { label: "May", value: 48 }, { label: "Jun", value: 52 },
];
const impactMix = [
  { value: 64, color: "#34d399", name: "Solar generation" },
  { value: 24, color: "#38bdf8", name: "Battery shifting" },
  { value: 12, color: "#a855f7", name: "VPP peak avoidance" },
];

export function ImpactScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="CO₂ avoided YTD" value="216 kt" delta="across the fleet" deltaTone="green" icon={<CloudOff size={16} />} />
        <Stat label="Clean energy served" value="412 GWh" delta="Self + exported" deltaTone="blue" icon={<Leaf size={16} />} />
        <Stat label="Member savings" value="$31.2M" delta="collective YTD" deltaTone="green" icon={<TrendingUp size={16} />} />
        <Stat label="Peak demand cut" value="96 MW" delta="from VPP events" deltaTone="green" icon={<Gauge size={16} />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Climate impact" title="CO₂ avoided (kt) · 2026" right={<Badge tone="green">+41% YoY</Badge>} />
          <Bars data={carbonMonthly} height={150} color="#34d399" />
        </Card>

        <Card>
          <SectionTitle eyebrow="Impact source" title="Where savings come from" />
          <div className="flex justify-center py-2">
            <Donut segments={impactMix} label="216" sublabel="kt CO₂" />
          </div>
          <div className="mt-3 space-y-1.5">
            {impactMix.map(s => (
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
        <SectionTitle eyebrow="Equivalents" title="What the fleet offset" />
        <div className="grid sm:grid-cols-4 gap-3 text-center">
          {[
            ["46,800", "Cars off the road"], ["3.6M", "Trees planted equiv."],
            ["84k", "Homes powered"], ["512", "Acres land use avoided"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-lg border border-[var(--line)] p-4">
              <div className="font-display text-xl font-bold text-accent">{v}</div>
              <div className="text-[11px] ink-2 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
