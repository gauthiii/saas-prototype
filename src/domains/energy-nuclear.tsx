// src/domains/energy-nuclear.tsx — Atria · nuclear fleet operations & safety
import { useState } from "react";
import {
  Atom, Radiation, Thermometer, ShieldCheck, ShieldAlert, Gauge, Wrench,
  TrendingUp, Briefcase, Search, AlertTriangle, Activity, FileText,
  Download, ArrowUpRight, ArrowDownRight, Zap, CheckCircle2, Container, Droplet,
} from "lucide-react";
import { HomePage, LoginPage, RegisterPage, ProfilePage, SettingsPage, FAQPage, SupportPage, DomainMeta } from "./pages";
import { AboutPage, PrivacyPage, PricingPage, NotificationsPage, ChangelogPage, NotFoundPage, DomainExtra } from "./pages-extra";
import { Card, SectionTitle, Badge, Stat, Tone } from "../components/ui";
import { Bars, AreaChart, Donut } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

// ─── Domain meta ─────────────────────────────────────────────────────────────

const nukeMeta: DomainMeta = {
  id: "nuclear",
  name: "Atria",
  tagline: "The operations and safety platform for nuclear fleets — reactors, fuel, radiation, and refueling outages in one control plane.",
  description: "Atria runs the highest-stakes power generation on earth: real-time reactor monitoring, fuel-cycle management, radiation and dose control, refueling-outage planning, and the regulatory record every megawatt of carbon-free baseload depends on.",
  accentLabel: "Reactors · Fuel Cycle · Radiation · Outages · NRC",
  features: [
    { icon: "⚛️", title: "Reactor monitoring", body: "Live core thermal power, coolant temperature, and reactivity across every unit with safety-margin tracking." },
    { icon: "🛡️", title: "Safety & radiation", body: "Engineered safety systems, dosimetry, and effluent monitoring with defense-in-depth barrier health." },
    { icon: "🔧", title: "Outage planning", body: "Plan and execute refueling outages — critical path, fuel shuffles, and surveillance tests — to the hour." },
  ],
  faqs: [
    { q: "What reactor types does Atria support?", a: "Pressurized water reactors (PWR), boiling water reactors (BWR), and emerging small modular reactors (SMR). Each unit has its own core model, safety-system configuration, and technical-specification limits, while the fleet view aggregates capacity and availability." },
    { q: "How does Atria handle reactor safety limits?", a: "Atria continuously tracks key safety parameters — departure-from-nucleate-boiling ratio, peak clad temperature, reactor coolant pressure — against technical-specification limits, and flags any approach to a Limiting Condition for Operation (LCO) with the required action and completion time." },
    { q: "How is the fuel cycle managed?", a: "Atria tracks every fuel assembly from fabrication through core loading, burnup accumulation, and discharge to the spent-fuel pool and dry-cask storage — supporting core-design shuffles and IAEA material accountancy." },
    { q: "What radiation monitoring does it provide?", a: "Area radiation monitors, personnel dosimetry, contamination surveys, and gaseous/liquid effluent release tracking, all rolled into ALARA dose budgets and regulatory effluent reports." },
    { q: "How does outage management work?", a: "Refueling outages are planned as a critical-path schedule covering defueling, fuel shuffle, in-service inspections, and surveillance testing, with online tracking of completion against the planned restart date." },
    { q: "Is Atria built for regulatory compliance?", a: "Yes. Atria maintains the licensing basis, tracks license-condition and technical-specification compliance, manages corrective actions, and produces the records and reports required by the NRC and IAEA." },
  ],
  supportEmail: "support@atria-nuclear.com",
};

const nukeExtra: DomainExtra = {
  founded: "2014",
  mission: "Atria exists to keep carbon-free baseload running safely — giving nuclear operators a single, defensible source of truth for reactor state, fuel, dose, and the regulatory record, so the cleanest firm power on the grid stays online and stays safe.",
  story: [
    "Atria was founded in 2014 by a former senior reactor operator and a nuclear fuels engineer who had spent careers cross-referencing reactor parameters, fuel records, and technical specifications across systems that were never designed to talk to each other. During outages, the critical path lived on a whiteboard and the dose budget lived in a binder.",
    "They built a platform that brings reactor monitoring, fuel-cycle accountancy, radiation protection, and the licensing basis into one place — with the auditability the industry demands. Today Atria supports 18 operating units across 9 sites, including the first SMRs entering commercial operation, and produces the records those licenses are maintained against.",
  ],
  team: [
    { name: "Dr. Helen Cho", role: "Co-founder & CEO", emoji: "👩🏻‍🔬", bio: "Former senior reactor operator. Built Atria after running an outage where the critical path lived on a whiteboard." },
    { name: "Viktor Anand", role: "Co-founder & CTO", emoji: "👨🏽‍💻", bio: "Nuclear fuels engineer. Designed the fuel-accountancy engine that tracks every assembly from fab to cask." },
    { name: "Grace Mbeki", role: "VP Radiation Protection", emoji: "🛡️", bio: "Certified health physicist. Owns the ALARA dose model behind every radiation work permit." },
    { name: "Tom Halvorsen", role: "Head of Licensing", emoji: "📋", bio: "Ex-NRC resident inspector. Keeps the licensing basis and technical-specification compliance defensible." },
  ],
  compliance: [
    { name: "10 CFR 50 / 52", desc: "NRC operating and combined-license requirements for the fleet.", status: "Compliant" },
    { name: "INPO / WANO", desc: "Industry operational-excellence and peer-review standards.", status: "Certified" },
    { name: "IAEA Safeguards", desc: "Nuclear material accountancy and inspection (INFCIRC/153).", status: "Compliant" },
    { name: "10 CFR 20 (ALARA)", desc: "Radiation protection and dose-limit standards for workers and public.", status: "Compliant" },
    { name: "NEI 08-09 (Cyber)", desc: "Cyber security plan for critical digital safety systems.", status: "In progress" },
  ],
  dataRetention: "Reactor operating records, fuel-accountancy data, and radiation-dose records are retained for the life of the plant plus decommissioning, per NRC requirements — dose records are retained until the NRC authorizes disposal. Safety-system surveillance and corrective-action records are kept for the license term. Effluent monitoring is retained for the operating life. Personal data unrelated to dose records is deleted within 30 days of an erasure request.",
  plans: [
    { name: "Single-Unit", price: "Custom", desc: "For a single operating reactor unit.", features: ["Reactor monitoring", "Fuel-cycle tracking", "Radiation & dosimetry", "Surveillance scheduling", "Standard support"], cta: "Contact us" },
    { name: "Fleet", price: "Custom", period: "", desc: "For multi-unit, multi-site nuclear fleets.", features: ["Fleet-wide reactor monitoring", "Core design & fuel shuffles", "Outage critical-path planning", "Effluent & ALARA reporting", "Licensing-basis management", "Priority support & on-site SE"], highlight: true, cta: "Book a briefing" },
    { name: "Enterprise / SMR", price: "Custom", desc: "For utilities and SMR developers at scale.", features: ["PWR / BWR / SMR support", "IAEA safeguards accountancy", "Digital-twin core modeling", "Cyber-security (NEI 08-09)", "Decommissioning records", "Dedicated nuclear solutions team"], cta: "Talk to sales" },
  ],
  notifications: [
    { title: "Reactor trip — Unit 2", body: "Unit 2 automatic reactor trip on main-feedwater pump loss. All control rods inserted; decay heat removal nominal. Event report initiated; LER review under way.", time: "6 min ago", tone: "red", unread: true },
    { title: "Refueling outage on plan", body: "Unit 3 outage day 14 of 28: core reload 100% complete, RPV head tensioning under way. Critical path holding to restart date.", time: "38 min ago", tone: "green", unread: true },
    { title: "Area dose-rate alert", body: "Containment penetration C-12 reading 4.2 mrem/h, above the work-permit threshold for the planned task. RP hold placed; survey requested.", time: "1 h ago", tone: "amber", unread: true },
    { title: "Surveillance test passed", body: "Unit 1 emergency diesel generator B monthly surveillance complete — started and loaded within tech-spec time. LCO exited.", time: "3 h ago", tone: "blue" },
    { title: "Effluent report filed", body: "Q2 gaseous and liquid effluent release report submitted to the NRC. All releases below regulatory limits; public dose 0.4% of 10 CFR 50 Appendix I.", time: "Yesterday", tone: "green" },
  ],
  changelog: [
    { version: "v5.3", date: "Jun 6, 2026", tag: "New", items: ["SMR multi-module core monitoring for first commercial units", "ALARA dose-budget planner with task-level rollups", "Digital-twin reactivity prediction for fuel shuffles"] },
    { version: "v5.2", date: "May 12, 2026", tag: "Improved", items: ["Outage critical-path now models surveillance-test float", "Effluent reconciliation against continuous monitors", "Technical-specification LCO action-tracking timers"] },
    { version: "v5.1", date: "Apr 17, 2026", tag: "Fixed", items: ["Burnup accumulation drift on partial-cycle assemblies", "Dose-rate trend smoothing during detector calibration", "Spent-fuel pool inventory mismatch after a fuel move"] },
  ],
  stats: [
    { value: "24 reactors", label: "Managed across the fleet" },
    { value: "94% capacity factor", label: "Fleet-wide availability" },
    { value: "210 TWh clean", label: "Carbon-free energy delivered" },
    { value: "100% NRC compliance", label: "Regulatory inspections passed" },
  ],
  testimonial: {
    quote: "Atria gives our control room and outage teams a single source of truth for reactor state, dose budgets, and refueling critical paths. We've shortened outages and walked into every NRC inspection with the data already in hand.",
    author: "Dr. Lena Okafor",
    role: "Reactor Operations Director, Cascade Power Authority",
  },
};

// ─── Shared page wrappers ─────────────────────────────────────────────────────

export function NuclearHome() { return <HomePage meta={nukeMeta} stats={nukeExtra.stats} testimonial={nukeExtra.testimonial} />; }
export function NuclearLogin() { return <LoginPage meta={nukeMeta} />; }
export function NuclearRegister() { return <RegisterPage meta={nukeMeta} />; }
export function NuclearProfile() { return <ProfilePage meta={nukeMeta} />; }
export function NuclearSettings() { return <SettingsPage meta={nukeMeta} />; }
export function NuclearFAQ() { return <FAQPage meta={nukeMeta} />; }
export function NuclearSupport() { return <SupportPage meta={nukeMeta} />; }
export function NuclearAbout() { return <AboutPage meta={nukeMeta} extra={nukeExtra} />; }
export function NuclearPrivacy() { return <PrivacyPage meta={nukeMeta} extra={nukeExtra} />; }
export function NuclearPricing() { return <PricingPage meta={nukeMeta} extra={nukeExtra} />; }
export function NuclearNotifications() { return <NotificationsPage meta={nukeMeta} extra={nukeExtra} />; }
export function NuclearChangelog() { return <ChangelogPage meta={nukeMeta} extra={nukeExtra} />; }
export function NuclearNotFound() { return <NotFoundPage meta={nukeMeta} />; }

// ─── 1. Reactor Control Dashboard ─────────────────────────────────────────────

const power24 = [100, 100, 100, 100, 100, 100, 98, 95, 92, 95, 100, 100, 100, 100, 100, 100, 100, 100, 98, 100, 100, 100, 100, 100];
const fleetState = [
  { value: 72, color: "#10b981", name: "At power" },
  { value: 17, color: "#f59e0b", name: "Refueling" },
  { value: 11, color: "#94a3b8", name: "Reduced / hot standby" },
];
const reactorInsights: Insight[] = [
  { title: "Xenon transient after Unit 1 downpower", body: "Unit 1's load-follow to 92% will drive a xenon peak in ~7 hours. Pre-positioning control rods and adjusting boron now keeps the return to 100% within tech-spec ramp limits and avoids a reactivity hold.", tone: "blue", tag: "Reactivity", confidence: 85 },
  { title: "EDG-B start-time margin narrowing", body: "Unit 2 emergency diesel generator B start time has crept from 8.1s to 9.4s over three surveillances against a 10s limit. Schedule injector maintenance before the trend reaches the LCO action threshold.", tone: "amber", tag: "Safety systems", confidence: 81 },
  { title: "Condenser vacuum drift", body: "Unit 3 condenser backpressure is rising ~0.2 inHg/day — likely air in-leakage. Left unaddressed it costs ~6 MWe of output; a helium leak test during the next window recovers it.", tone: "green", tag: "Thermal performance", confidence: 78 },
];

export function ReactorDashboard() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Fleet output" value="14,820 MWe" delta="13 of 18 at power" deltaTone="green" icon={<Zap size={16} />} />
        <Stat label="Fleet capacity factor" value="93.1%" delta="12-month rolling" deltaTone="green" icon={<Activity size={16} />} />
        <Stat label="Units in outage" value="3" delta="2 refuel · 1 maint." deltaTone="amber" icon={<Wrench size={16} />} />
        <Stat label="Open LCOs" value="2" delta="within action time" deltaTone="amber" icon={<ShieldAlert size={16} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <SectionTitle eyebrow="Unit 1 · PWR" title="Reactor thermal power — 24h (%)" right={<Badge tone="green" pulse>Critical · at power</Badge>} />
            <AreaChart data={power24} height={170} stroke="#10b981" />
            <div className="flex justify-between mt-3 text-[11px] ink-2 font-mono">
              {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "now"].map(d => <span key={d}>{d}</span>)}
            </div>
          </Card>

          <Card>
            <SectionTitle eyebrow="Fleet" title="Unit status · now" right={<Badge tone="gray">6 of 18</Badge>} />
            <div className="space-y-2">
              {[
                { name: "Unit 1 — PWR", type: "1,180 MWe · cycle 22", state: "100% power", margin: "DNBR 1.84", trend: "up" },
                { name: "Unit 2 — PWR", type: "1,180 MWe · cycle 19", state: "0% — tripped", margin: "Decay heat", trend: "down" },
                { name: "Unit 3 — BWR", type: "1,310 MWe · refuel", state: "Outage day 14", margin: "Defueled", trend: "down" },
                { name: "Unit 4 — PWR", type: "1,180 MWe · cycle 17", state: "92% load-follow", margin: "DNBR 1.79", trend: "down" },
                { name: "Unit 5 — SMR", type: "77 MWe · module A", state: "100% power", margin: "Nominal", trend: "up" },
                { name: "Unit 6 — SMR", type: "77 MWe · module B", state: "100% power", margin: "Nominal", trend: "up" },
              ].map(u => (
                <div key={u.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
                  <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><Atom size={15} /></span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{u.name}</div>
                    <div className="text-xs ink-2 font-mono">{u.type}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold">{u.state}</div>
                    <div className="text-xs ink-2 font-mono">{u.margin}</div>
                  </div>
                  {u.trend === "up"
                    ? <ArrowUpRight size={16} className="text-emerald-500 shrink-0" />
                    : <ArrowDownRight size={16} className="text-rose-500 shrink-0" />}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <SectionTitle eyebrow="Fleet state" title="Units by mode" />
            <div className="flex justify-center py-2">
              <Donut segments={fleetState} label="18" sublabel="units" />
            </div>
            <div className="mt-3 space-y-1.5">
              {fleetState.map(s => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="ink-2 flex-1">{s.name}</span>
                  <span className="font-mono font-semibold">{s.value}%</span>
                </div>
              ))}
            </div>
          </Card>
          <AIPanel context="18-unit fleet · 9 sites · Jun 2026" insights={reactorInsights} />
        </div>
      </div>
    </div>
  );
}

// ─── 2. Reactor Units ─────────────────────────────────────────────────────────

type UnitState = "At power" | "Tripped" | "Refueling" | "Load-follow" | "Hot standby";
const units: { name: string; site: string; rx: "PWR" | "BWR" | "SMR"; mwe: number; power: number; coolant: string; state: UnitState }[] = [
  { name: "Unit 1", site: "Ravenna", rx: "PWR", mwe: 1180, power: 100, coolant: "591 °F", state: "At power" },
  { name: "Unit 2", site: "Ravenna", rx: "PWR", mwe: 1180, power: 0, coolant: "412 °F", state: "Tripped" },
  { name: "Unit 3", site: "Cascade", rx: "BWR", mwe: 1310, power: 0, coolant: "Defueled", state: "Refueling" },
  { name: "Unit 4", site: "Cascade", rx: "PWR", mwe: 1180, power: 92, coolant: "588 °F", state: "Load-follow" },
  { name: "Unit 5", site: "Belmont", rx: "SMR", mwe: 77, power: 100, coolant: "585 °F", state: "At power" },
  { name: "Unit 6", site: "Belmont", rx: "SMR", mwe: 77, power: 100, coolant: "585 °F", state: "At power" },
  { name: "Unit 7", site: "Granite Bay", rx: "PWR", mwe: 1240, power: 100, coolant: "593 °F", state: "At power" },
  { name: "Unit 8", site: "Granite Bay", rx: "PWR", mwe: 1240, power: 0, coolant: "350 °F", state: "Hot standby" },
];
const unitStateTone: Record<UnitState, Tone> = { "At power": "green", Tripped: "red", Refueling: "blue", "Load-follow": "amber", "Hot standby": "gray" };

export function ReactorUnitsScreen() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"All" | "PWR" | "BWR" | "SMR">("All");
  const shown = units.filter(u =>
    (filter === "All" || u.rx === filter) &&
    (u.name + u.site).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total fleet capacity" value="15,742 MWe" delta="18 units · 9 sites" deltaTone="blue" icon={<Zap size={16} />} />
        <Stat label="Units at power" value="13 / 18" delta="2 SMR · 11 large" deltaTone="green" />
        <Stat label="Avg coolant temp" value="588 °F" delta="Operating units" deltaTone="green" icon={<Thermometer size={16} />} />
      </div>

      <Card>
        <SectionTitle eyebrow="Fleet register" title="Reactor units" right={
          <div className="flex items-center gap-2 field !py-1.5 !px-2.5">
            <Search size={14} className="ink-2 shrink-0" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search units…"
              className="bg-transparent text-sm outline-none w-40 placeholder:text-[var(--ink-2)]" />
          </div>
        } />

        <div className="flex gap-2 mb-4">
          {(["All", "PWR", "BWR", "SMR"] as const).map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${filter === t ? "bg-accent text-white border-accent" : "surface ink-2"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {shown.map(u => (
            <div key={u.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><Atom size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{u.name} · {u.site}</div>
                <div className="text-xs ink-2">{u.rx} · {u.mwe} MWe · coolant {u.coolant}</div>
              </div>
              <div className="hidden sm:block w-28">
                <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${u.power}%` }} />
                </div>
                <div className="text-[11px] ink-2 mt-1 font-mono">{u.power}% power</div>
              </div>
              <Badge tone={unitStateTone[u.state]}>{u.state}</Badge>
            </div>
          ))}
          {shown.length === 0 && <div className="text-center py-8 text-sm ink-2">No units match your filters.</div>}
        </div>
      </Card>
    </div>
  );
}

// ─── 3. Fuel Cycle Management ─────────────────────────────────────────────────

const burnupBars = [
  { label: "Batch A", value: 18 }, { label: "Batch B", value: 34 },
  { label: "Batch C", value: 46 }, { label: "Batch D", value: 52 }, { label: "Batch E", value: 58 },
];
const fuelLocation = [
  { value: 58, color: "#10b981", name: "In-core" },
  { value: 27, color: "#38bdf8", name: "Spent-fuel pool" },
  { value: 15, color: "#94a3b8", name: "Dry-cask storage" },
];

export function FuelCycleScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Assemblies in core" value="193" delta="Unit 1 · cycle 22" deltaTone="blue" icon={<Container size={16} />} />
        <Stat label="Cycle burnup" value="18.4 GWd/tU" delta="62% of cycle" deltaTone="green" icon={<Gauge size={16} />} />
        <Stat label="Days to refuel" value="142" delta="EOC projection" deltaTone="amber" />
        <Stat label="Cask storage" value="612" delta="assemblies dry-stored" deltaTone="gray" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Core map" title="Assembly burnup by batch (GWd/tU)" right={<Badge tone="green">Within design</Badge>} />
          <Bars data={burnupBars} height={150} color="#10b981" />
          <div className="text-[11px] ink-2 mt-3 leading-relaxed">Higher-burnup batches are scheduled for discharge at end of cycle; fresh fuel loads to the periphery in the next shuffle.</div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Material location" title="Fuel inventory" />
          <div className="flex justify-center py-2">
            <Donut segments={fuelLocation} label="1,940" sublabel="assemblies" />
          </div>
          <div className="mt-3 space-y-1.5">
            {fuelLocation.map(s => (
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
        <SectionTitle eyebrow="Accountancy" title="Fuel movements & safeguards" right={<button className="btn-ghost !px-3 !py-1.5 text-xs gap-1.5"><FileText size={13} /> IAEA ledger</button>} />
        <div className="space-y-2">
          {[
            { id: "FA-U1-N047", desc: "Fresh assembly · received from fabricator", loc: "New-fuel vault", status: "Verified", tone: "green" as Tone },
            { id: "FA-U3-C112", desc: "Discharged · core → spent-fuel pool", loc: "SFP rack B-14", status: "Cooling", tone: "blue" as Tone },
            { id: "FA-U1-B088", desc: "Shuffle · periphery → interior (next cycle)", loc: "Core position H-8", status: "Planned", tone: "amber" as Tone },
            { id: "CASK-22", desc: "Loaded · 32 assemblies → dry storage", loc: "ISFSI pad", status: "Sealed", tone: "gray" as Tone },
          ].map(f => (
            <div key={f.id} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><Container size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium font-mono truncate">{f.id}</div>
                <div className="text-xs ink-2 truncate">{f.desc} · {f.loc}</div>
              </div>
              <Badge tone={f.tone}>{f.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 4. Safety Systems ────────────────────────────────────────────────────────

export function SafetySystemsScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Safety systems" value="100%" delta="Operable / standby" deltaTone="green" icon={<ShieldCheck size={16} />} />
        <Stat label="Barrier health" value="98%" delta="Defense-in-depth" deltaTone="green" icon={<Activity size={16} />} />
        <Stat label="Open LCOs" value="2" delta="within action time" deltaTone="amber" icon={<ShieldAlert size={16} />} />
        <Stat label="Surveillances due" value="7" delta="next 72h" deltaTone="blue" icon={<CheckCircle2 size={16} />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <SectionTitle eyebrow="Engineered safety" title="Safety system status" right={<Badge tone="green">Unit 1</Badge>} />
          <div className="space-y-2">
            {[
              { sys: "Emergency core cooling (ECCS)", train: "A + B operable", status: "Standby", tone: "green" as Tone },
              { sys: "Emergency diesel generators", train: "EDG-A op · EDG-B watch", status: "1 trending", tone: "amber" as Tone },
              { sys: "Containment isolation", train: "All valves closed", status: "Operable", tone: "green" as Tone },
              { sys: "Reactor protection system", train: "4 channels", status: "Operable", tone: "green" as Tone },
              { sys: "Auxiliary feedwater", train: "2 motor · 1 turbine", status: "Operable", tone: "green" as Tone },
              { sys: "Containment spray", train: "A + B operable", status: "Standby", tone: "green" as Tone },
            ].map(s => (
              <div key={s.sys} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
                <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><ShieldCheck size={15} /></span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.sys}</div>
                  <div className="text-xs ink-2 font-mono">{s.train}</div>
                </div>
                <Badge tone={s.tone}>{s.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Tech-spec" title="Active Limiting Conditions" right={<Badge tone="amber">2 LCO</Badge>} />
          <div className="space-y-3">
            {[
              { lco: "LCO 3.8.1 — EDG-B", action: "Restore to operable within 14 days", remaining: "Day 3 of 14", tone: "amber" as Tone },
              { lco: "LCO 3.4.5 — RCS leakage", action: "Verify within limits every 4h", remaining: "Last check 1.2h ago", tone: "blue" as Tone },
            ].map(l => (
              <div key={l.lco} className="rounded-lg border border-[var(--line)] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium font-mono">{l.lco}</span>
                  <Badge tone={l.tone}>{l.remaining}</Badge>
                </div>
                <div className="text-xs ink-2 mt-1">{l.action}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-[var(--line)] grid grid-cols-3 gap-3 text-center">
            {[["18 mo", "Since last scram"], ["99.98%", "Safety availability"], ["0", "Open NRC findings"]].map(([v, l]) => (
              <div key={l}><div className="font-display text-lg font-bold text-accent">{v}</div><div className="text-[11px] ink-2 mt-0.5">{l}</div></div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── 5. Radiation & Dose ──────────────────────────────────────────────────────

const doseTrend = [
  { label: "Jan", value: 142 }, { label: "Feb", value: 118 }, { label: "Mar", value: 96 },
  { label: "Apr", value: 88 }, { label: "May", value: 214 }, { label: "Jun", value: 176 },
];

export function RadiationScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Collective dose YTD" value="184 person-rem" delta="68% of ALARA budget" deltaTone="amber" icon={<Radiation size={16} />} />
        <Stat label="Max individual dose" value="1.21 rem" delta="vs 2 rem admin limit" deltaTone="green" />
        <Stat label="Active RWPs" value="34" delta="radiation work permits" deltaTone="blue" icon={<FileText size={16} />} />
        <Stat label="Effluent vs limit" value="0.4%" delta="of 10 CFR 50 App. I" deltaTone="green" icon={<Droplet size={16} />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="ALARA" title="Collective dose (person-mrem) · 2026" right={<Badge tone="amber">Outage in May</Badge>} />
          <Bars data={doseTrend} height={150} color="#f59e0b" />
          <div className="text-[11px] ink-2 mt-3 leading-relaxed">The May spike reflects the Unit 3 refueling outage — the highest-dose evolution of the operating cycle.</div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Area monitors" title="Radiation zones" />
          <div className="space-y-2">
            {[
              { zone: "Containment penetration C-12", rate: "4.2 mrem/h", status: "RP hold", tone: "amber" as Tone },
              { zone: "Aux building — RHR pump", rate: "0.8 mrem/h", status: "Normal", tone: "green" as Tone },
              { zone: "Spent-fuel pool deck", rate: "1.1 mrem/h", status: "Normal", tone: "green" as Tone },
              { zone: "Turbine building", rate: "0.2 mrem/h", status: "Clean", tone: "blue" as Tone },
            ].map(z => (
              <div key={z.zone} className="flex items-center justify-between rounded-lg border border-[var(--line)] p-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{z.zone}</div>
                  <div className="text-xs ink-2 font-mono">{z.rate}</div>
                </div>
                <Badge tone={z.tone}>{z.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Effluent" title="Release monitoring" right={<button className="btn-ghost !px-3 !py-1.5 text-xs gap-1.5"><Download size={13} /> Effluent report</button>} />
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { kind: "Gaseous (noble gas)", val: "0.3%", note: "of limit", tone: "green" as Tone },
            { kind: "Liquid (tritium)", val: "0.6%", note: "of limit", tone: "green" as Tone },
            { kind: "Public dose (annual)", val: "0.04 mrem", note: "≪ 100 mrem limit", tone: "green" as Tone },
          ].map(e => (
            <div key={e.kind} className="rounded-lg border border-[var(--line)] p-4">
              <div className="text-sm font-medium">{e.kind}</div>
              <div className="font-display text-xl font-bold mt-1">{e.val}</div>
              <div className="mt-1.5"><Badge tone={e.tone}>{e.note}</Badge></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 6. Outage & Refueling ────────────────────────────────────────────────────

export function OutageScreen() {
  const [tasks, setTasks] = useState([
    { id: "OUT-301", phase: "Reactor shutdown & cooldown", crit: true, done: true, tone: "gray" as Tone },
    { id: "OUT-302", phase: "RPV head removal & defuel", crit: true, done: true, tone: "gray" as Tone },
    { id: "OUT-303", phase: "Core reload & fuel shuffle", crit: true, done: true, tone: "green" as Tone },
    { id: "OUT-304", phase: "In-service inspection (RPV welds)", crit: true, done: false, tone: "amber" as Tone },
    { id: "OUT-305", phase: "RPV head re-tensioning", crit: true, done: false, tone: "amber" as Tone },
    { id: "OUT-306", phase: "Surveillance tests & heatup", crit: false, done: false, tone: "blue" as Tone },
    { id: "OUT-307", phase: "Reactor startup & sync to grid", crit: true, done: false, tone: "blue" as Tone },
  ]);
  const toggle = (id: string) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const complete = tasks.filter(t => t.done).length;
  const pct = Math.round((complete / tasks.length) * 100);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Outage day" value="14 / 28" delta="Unit 3 refueling" deltaTone="blue" icon={<Wrench size={16} />} />
        <Stat label="Critical path" value="On plan" delta="0 days slip" deltaTone="green" icon={<Activity size={16} />} />
        <Stat label="Work orders" value="1,240" delta="312 remaining" deltaTone="amber" />
        <Stat label="Restart target" value="Jun 26" delta="14 days out" deltaTone="blue" />
      </div>

      <Card>
        <SectionTitle eyebrow="Refueling outage" title="Critical path progress" right={<Badge tone="blue">{pct}% complete</Badge>} />
        <div className="h-2 rounded-full bg-[var(--line)] overflow-hidden mb-4">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="space-y-2">
          {tasks.map(t => (
            <div key={t.id} className={`flex items-center gap-3 rounded-lg border p-3.5 transition-colors ${t.done ? "border-[var(--line)] opacity-60" : "border-[var(--line)]"}`}>
              <button onClick={() => toggle(t.id)}
                className={`grid place-items-center h-8 w-8 rounded-lg shrink-0 transition-colors ${t.done ? "bg-emerald-500/15 text-emerald-500" : "bg-accent/12 text-accent"}`}
                aria-label={t.done ? "Reopen task" : "Mark complete"}>
                {t.done ? <CheckCircle2 size={16} /> : <Activity size={16} />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium font-mono">{t.id}</span>
                  <span className="text-sm truncate">· {t.phase}</span>
                </div>
                <div className="text-xs ink-2">{t.crit ? "Critical path" : "Parallel work"}</div>
              </div>
              <Badge tone={t.done ? "green" : t.tone}>{t.done ? "Done" : t.crit ? "Critical" : "Parallel"}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── 7. Regulatory & Licensing ────────────────────────────────────────────────

export function RegulatoryScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="License status" value="Active" delta="renewed to 2046" deltaTone="green" icon={<ShieldCheck size={16} />} />
        <Stat label="Open NRC items" value="3" delta="0 violations" deltaTone="amber" icon={<FileText size={16} />} />
        <Stat label="Corrective actions" value="48" delta="6 past due" deltaTone="amber" />
        <Stat label="INPO rating" value="1" delta="Highest band" deltaTone="green" icon={<CheckCircle2 size={16} />} />
      </div>

      <Card>
        <SectionTitle eyebrow="Licensing basis" title="Compliance & commitments" right={<button className="btn-ghost !px-3 !py-1.5 text-xs gap-1.5"><Download size={13} /> Docket export</button>} />
        <div className="space-y-2">
          {[
            { id: "LER-2026-002", desc: "Unit 2 reactor trip — main feedwater pump loss", due: "60-day report due Jun 30", status: "Drafting", tone: "amber" as Tone },
            { id: "LCR-2026-014", desc: "License amendment — SMR module B power uprate", due: "NRC review", status: "Submitted", tone: "blue" as Tone },
            { id: "CR-2026-1188", desc: "Corrective action — EDG-B start-time trend", due: "Due Jun 20", status: "In progress", tone: "amber" as Tone },
            { id: "IR-2026-07", desc: "NRC integrated inspection report", due: "Closed", status: "No findings", tone: "green" as Tone },
          ].map(r => (
            <div key={r.id} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-accent/12 text-accent shrink-0"><FileText size={15} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium font-mono truncate">{r.id}</div>
                <div className="text-xs ink-2 truncate">{r.desc} · {r.due}</div>
              </div>
              <Badge tone={r.tone}>{r.status}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle eyebrow="Frameworks" title="Regulatory programs" />
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { fw: "10 CFR 50 / 52", desc: "Operating & combined licenses", status: "Compliant", tone: "green" as Tone },
            { fw: "Maintenance Rule (50.65)", desc: "Equipment reliability program", status: "(a)(1) on 1 system", tone: "amber" as Tone },
            { fw: "IAEA Safeguards", desc: "Material accountancy & inspection", status: "Verified", tone: "green" as Tone },
            { fw: "NEI 08-09 Cyber", desc: "Critical digital asset protection", status: "In progress", tone: "blue" as Tone },
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

// ─── 8. Grid Dispatch & Output ────────────────────────────────────────────────

const outputMonthly = [
  { label: "Jan", value: 10.8 }, { label: "Feb", value: 9.9 }, { label: "Mar", value: 10.6 },
  { label: "Apr", value: 9.2 }, { label: "May", value: 8.1 }, { label: "Jun", value: 10.4 },
];

export function GridOutputScreen() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Fleet generation MTD" value="10.4 TWh" delta="+3% vs plan" deltaTone="green" icon={<Zap size={16} />} />
        <Stat label="Capacity factor" value="93.1%" delta="12-mo rolling" deltaTone="green" icon={<Gauge size={16} />} />
        <Stat label="Carbon-free output" value="100%" delta="zero-emission baseload" deltaTone="green" icon={<ShieldCheck size={16} />} />
        <Stat label="Avg captured price" value="$58.20/MWh" delta="firm baseload premium" deltaTone="blue" icon={<TrendingUp size={16} />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Output" title="Fleet generation (TWh) · 2026" right={<Badge tone="green">93% CF</Badge>} />
          <Bars data={outputMonthly} height={150} color="#10b981" />
          <div className="text-[11px] ink-2 mt-3 leading-relaxed">The May dip reflects the Unit 3 refueling outage; baseload output otherwise runs near 100% capacity factor.</div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Clean firm power" title="Why nuclear baseload" />
          <div className="space-y-3">
            {[
              ["Carbon avoided YTD", "48 Mt", "green"],
              ["Equivalent homes", "13.4M", "blue"],
              ["Land per TWh", "1/30th of solar", "gray"],
            ].map(([label, val, tone]) => (
              <div key={label as string} className="flex items-center justify-between rounded-lg border border-[var(--line)] p-3">
                <span className="text-sm ink-2">{label}</span>
                <Badge tone={tone as Tone}>{val}</Badge>
              </div>
            ))}
          </div>
          <div className="text-[11px] ink-2 mt-3 leading-relaxed">As a firm, dispatchable, zero-carbon source, the fleet underpins grid reliability alongside variable renewables.</div>
        </Card>
      </div>

      <Card>
        <SectionTitle eyebrow="Dispatch" title="Grid contribution by unit" right={<Badge tone="gray">13 at power</Badge>} />
        <div className="space-y-2">
          {[
            { name: "Unit 7 — Granite Bay", out: "1,240 MWe", cf: "98%", tone: "green" as Tone },
            { name: "Unit 1 — Ravenna", out: "1,180 MWe", cf: "97%", tone: "green" as Tone },
            { name: "Unit 4 — Cascade", out: "1,086 MWe", cf: "92%", tone: "amber" as Tone },
            { name: "Unit 5+6 — Belmont SMR", out: "154 MWe", cf: "99%", tone: "green" as Tone },
            { name: "Unit 2 — Ravenna", out: "0 MWe", cf: "tripped", tone: "red" as Tone },
          ].map(u => (
            <div key={u.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{u.name}</div>
                <div className="text-xs ink-2 font-mono">{u.out} · CF {u.cf}</div>
              </div>
              <Badge tone={u.tone}>{u.tone === "red" ? "Offline" : "Dispatching"}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
