// src/industries/energy/data.ts — Helios extension content (shared pages + archetype extension screens).
// The hand-coded module src/domains/energytech.tsx owns meta / extra / story. Fictional people, places and figures.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "Your portfolio", description: "Tell us what you operate so Helios can set up markets, units and grid factors.", fields: [
          { label: "Company name", type: "text", placeholder: "Northgate Renewables", half: true },
          { label: "Headquarters market", type: "text", placeholder: "California, US", half: true },
          { label: "Operating capacity", type: "radio", options: ["Under 50 MW", "50–500 MW", "500 MW–2 GW", "Over 2 GW"] },
          { label: "Asset types", type: "select", options: ["Solar + wind + storage", "Solar only", "Wind only", "Storage only"] },
        ] },
        { title: "Connect telemetry", description: "Point Helios at your SCADA gateway and revenue meters. Read-only by default.", fields: [
          { label: "SCADA protocol", type: "select", options: ["OPC-UA", "Modbus TCP", "IEC 60870-5-104", "DNP3"], half: true },
          { label: "Gateway host", type: "text", placeholder: "scada-gw.solano.internal", half: true },
          { label: "Import 24 months of meter history", type: "toggle", value: "true" },
        ] },
        { title: "Markets & offtake", description: "Add the markets you bid into and the PPAs you deliver against.", fields: [
          { label: "Primary market", type: "select", options: ["Western US ISO", "Texas grid", "Iberian day-ahead", "German day-ahead"], half: true },
          { label: "Settlement currency", type: "select", options: ["USD", "EUR", "CLP", "INR"], half: true },
          { label: "Upload PPA schedule (CSV)", type: "text", placeholder: "ppa-volumes-2026.csv" },
        ] },
        { title: "Invite your team", description: "Asset managers, traders and ESG analysts each get a tailored workspace.", fields: [
          { label: "Teammate emails", type: "textarea", placeholder: "one email per line" },
          { label: "Require SSO", type: "toggle", value: "true" },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Portfolio admin", description: "Owns the Helios tenant, markets and integrations.", permissions: ["Manage users and SSO", "Add assets and meters", "Approve market registrations"] },
        { name: "Asset manager", description: "Runs availability and performance for a group of sites.", permissions: ["Edit asset records", "Create and assign work orders", "Approve curtailment claims"] },
        { name: "Trader", description: "Bids the merchant position and manages PPA delivery.", permissions: ["Submit day-ahead offers", "Edit battery dispatch", "View settlement statements"] },
        { name: "ESG analyst", description: "Prepares carbon and investor disclosures.", permissions: ["Issue and retire RECs", "Export ESG packs", "Read-only on operations"] },
      ],
      members: [
        { name: "Amara Osei", email: "amara.osei@northgate-renewables.example", role: "Portfolio admin", status: "Active", lastActive: "Just now" },
        { name: "Diego Valdés", email: "diego.valdes@northgate-renewables.example", role: "Asset manager", status: "Active", lastActive: "18 min ago" },
        { name: "Ingrid Solberg", email: "ingrid.solberg@northgate-renewables.example", role: "Asset manager", status: "Active", lastActive: "2 h ago" },
        { name: "Kenji Watanabe", email: "kenji.watanabe@northgate-renewables.example", role: "Trader", status: "Active", lastActive: "6 min ago" },
        { name: "Farah Siddiqui", email: "farah.siddiqui@northgate-renewables.example", role: "ESG analyst", status: "Active", lastActive: "Yesterday" },
        { name: "Mateo Ruiz", email: "mateo.ruiz@northgate-renewables.example", role: "Asset manager", status: "Invited", lastActive: "—" },
      ],
    },
    billing: {
      plan: "Portfolio", price: "$1,900 / month", renews: "Nov 30, 2026", paymentMethod: "ACH · Operating account ••7731",
      usage: [
        { label: "Managed capacity", used: 940, limit: 1000, unit: "MW" },
        { label: "Connected meters", used: 212, limit: 300, unit: "meters" },
        { label: "Seats", used: 6, limit: 10, unit: "users" },
        { label: "ESG pack exports", used: 4, limit: 12, unit: "this year" },
      ],
      invoices: [
        { id: "HEL-26-1031", date: "Oct 31, 2026", amount: "$1,900.00", status: "Due" },
        { id: "HEL-26-0930", date: "Sep 30, 2026", amount: "$1,900.00", status: "Paid" },
        { id: "HEL-26-0831", date: "Aug 31, 2026", amount: "$1,900.00", status: "Paid" },
        { id: "HEL-26-0731", date: "Jul 31, 2026", amount: "$1,900.00", status: "Paid" },
      ],
    },
    inbox: {
      threads: [
        { name: "Diego Valdés", preview: "Mesa Wind T-12 gearbox is back — availability up to 96%.", time: "10:42", avatar: "Diego Valdés", unread: 2, tag: "O&M" },
        { name: "Grid operator notices", preview: "Curtailment instruction: Solano Valley PV, 11:00–14:00 tomorrow.", time: "9:15", avatar: "⚡", unread: 1, tag: "Curtailment" },
        { name: "Kenji Watanabe", preview: "Day-ahead cleared for 19 of 24 hours on Coastal Wind.", time: "Yesterday", avatar: "Kenji Watanabe", tag: "Trading" },
        { name: "Helios Support", preview: "Your Delta Storage BMS integration is now streaming.", time: "Mon", avatar: "☀️", tag: "Integration" },
      ],
      messages: [
        { from: "them", text: "Crew swapped the oil cooler on T-12 this morning. Gearbox temps are holding at 68 °C under full load.", time: "10:31" },
        { from: "them", text: "That takes Mesa back to 96% availability. WO-4416 is ready to close once you sign off.", time: "10:33" },
        { from: "me", text: "Great work. Any read on T-07? It tripped twice overnight on pitch fault.", time: "10:38" },
        { from: "them", text: "Pitch battery on blade B is weak. Part ships Thursday — I've logged it as WO-4431 so the loss is tagged correctly.", time: "10:42" },
      ],
    },
    search: {
      query: "solano",
      facets: ["Asset", "Work order", "Market notice", "Report"],
      results: [
        { type: "Asset", title: "Solano Valley PV", snippet: "Solar · 320 MW · California, US · availability 99.1%", meta: "Online" },
        { type: "Work order", title: "WO-4417 · Inverter INV-07 overvoltage trip", snippet: "West crew · replaced DC contactor · 2.1 MW restored", meta: "Closed Oct 19" },
        { type: "Market notice", title: "Curtailment instruction · Solano Valley PV", snippet: "Reduce to 180 MW, 11:00–14:00 · congestion on south path", meta: "Oct 22" },
        { type: "Report", title: "Solano Valley PV · September performance", snippet: "PR 84.6% · 61.2 GWh · 3.1% curtailment loss", meta: "Oct 6, 2026" },
        { type: "Asset", title: "Solano Valley Storage (expansion)", snippet: "150 MW / 600 MWh · interconnection facilities study", meta: "In development" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 2, title: "October settlement statements", tone: "blue" },
        { date: 4, title: "Kestrel Ridge turbine delivery", tone: "violet", time: "7:00 AM" },
        { date: 9, title: "Nordsee blade inspections", tone: "amber" },
        { date: 12, title: "Q3 investor call", tone: "green", time: "4:00 PM" },
        { date: 16, title: "Facilities study results due", tone: "violet" },
        { date: 18, title: "REC retirement · TechCorp", tone: "green" },
        { date: 20, title: "Delta Storage BMS firmware", tone: "amber", time: "10:00 PM" },
        { date: 24, title: "Galicia Hybrid COD test", tone: "violet" },
        { date: 30, title: "Helios renewal", tone: "gray" },
      ],
    },
    reports: {
      reports: [
        { name: "Monthly generation vs budget", description: "Metered GWh, availability and PR for every asset against the annual budget.", category: "Operations", updated: "Nov 2", format: "XLSX", owner: "Diego Valdés", schedule: "Monthly" },
        { name: "Curtailment loss register", description: "Hourly curtailed MWh by asset with instruction IDs for compensation claims.", category: "Operations", updated: "Today", format: "CSV", owner: "Ingrid Solberg", schedule: "Weekly" },
        { name: "PPA delivery statement", description: "Contracted vs delivered volume and shortfall exposure for each offtaker.", category: "Trading", updated: "Nov 1", format: "PDF", owner: "Kenji Watanabe", schedule: "Monthly" },
        { name: "Development pipeline review", description: "Interconnection position, permits and capex for every pre-COD project.", category: "Development", updated: "Oct 28", format: "PDF", owner: "Amara Osei", schedule: "Monthly" },
        { name: "Q3 carbon & REC summary", description: "tCO₂ avoided, RECs issued and retired, assurance status.", category: "ESG", updated: "Oct 15", format: "PDF", owner: "Farah Siddiqui", schedule: "Quarterly" },
        { name: "Investor quarterly pack", description: "NAV, IRR, distributions and generation yield for limited partners.", category: "Investors", updated: "Oct 12", format: "PDF", owner: "Amara Osei", schedule: "Quarterly" },
      ],
    },
    states: { noun: "assets", emptyTitle: "No assets connected yet", emptyBody: "Connect a SCADA gateway or upload an asset register and live generation will appear here.", emptyAction: "Connect an asset" },
  },
  screens: {
    sites: {
      blurb: "Every Helios site on one map, coloured by live status, with output and availability at a glance.",
      bullets: ["Sites pinned by technology and live status", "Output, availability and open faults per site", "Construction projects shown alongside operating assets"],
      subtitle: "31 operating assets · 14 markets · live as of 10:45 PT",
      mapLabel: "Global portfolio",
      legend: [{ label: "Online", tone: "green" }, { label: "Degraded", tone: "amber" }, { label: "Fault", tone: "red" }, { label: "Offline", tone: "gray" }, { label: "Construction", tone: "blue" }],
      kpis: [
        { label: "Live output", value: "847 MW", delta: "78% of available", tone: "green" },
        { label: "Sites with faults", value: "3", delta: "Mesa, Delta, Altiplano", tone: "amber" },
        { label: "Under construction", value: "300 MW", delta: "Kestrel Ridge Wind", tone: "blue" },
      ],
      pins: [
        { name: "Solano Valley PV", x: 10, y: 36, status: "Online", tone: "green", metric: "248 MW · 99.1% avail.", detail: "320 MW single-axis tracker plant. Curtailment instruction tomorrow 11:00–14:00." },
        { name: "Harbor Storage", x: 8, y: 44, status: "Online", tone: "green", metric: "−38 MW charging · SoC 64%", detail: "80 MW / 320 MWh. Charging on midday surplus, scheduled to discharge 17:00–20:00." },
        { name: "Sunbelt Rooftop", x: 16, y: 46, status: "Online", tone: "green", metric: "31 MW · 99.8% avail.", detail: "44 MW aggregated commercial rooftops across 63 warehouses." },
        { name: "Kestrel Ridge Wind", x: 19, y: 30, status: "Construction", tone: "blue", metric: "300 MW · 38 of 72 foundations", detail: "First turbine deliveries Nov 4. Target COD June 2027." },
        { name: "Mesa Wind", x: 22, y: 48, status: "Degraded", tone: "amber", metric: "171 MW · 91.0% avail.", detail: "T-07 pitch battery fault (WO-4431). T-12 returned to service this morning." },
        { name: "Altiplano Solar", x: 28, y: 80, status: "Offline", tone: "gray", metric: "0 MW · substation outage", detail: "Main transformer failed Oct 9. Spare unit en route; return to service est. Nov 13." },
        { name: "Coastal Wind", x: 45, y: 34, status: "Online", tone: "green", metric: "142 MW · 98.4% avail.", detail: "180 MW onshore. Blade inspections complete, no defects above category 2." },
        { name: "Galicia Hybrid", x: 47, y: 38, status: "Construction", tone: "blue", metric: "90 MW · energized", detail: "Hybrid wind + solar. Commissioning tests under way, COD test Nov 24." },
        { name: "Nordsee Offshore", x: 51, y: 20, status: "Online", tone: "green", metric: "388 MW · 96.7% avail.", detail: "450 MW offshore. Weather window for blade inspections opens Nov 9." },
        { name: "Delta Storage", x: 68, y: 50, status: "Fault", tone: "red", metric: "22 MW · BMS cell imbalance", detail: "Rack 3 isolated. Firmware fix scheduled Nov 20; available capacity capped at 60%." },
      ],
    },
    interconnect: {
      blurb: "Pre-COD projects tracked from site control through interconnection, permitting and construction to commercial operation.",
      bullets: ["Milestone stepper for every development project", "Expected COD with slip warnings", "Event log of studies, permits and grid-operator decisions"],
      subtitle: "1.38 GW in development · 5 active projects",
      items: [
        { id: "DEV-031", title: "Kestrel Ridge Wind · 300 MW", subtitle: "Wyoming, US · 72 turbines · capex $412M", steps: ["Site control", "Interconnection", "Permitting", "Construction", "COD"], current: 3, eta: "COD Jun 2027", status: "Construction", tone: "blue", events: [
          { time: "Oct 20", text: "38 of 72 turbine foundations poured; collector substation steel set" },
          { time: "Sep 30", text: "Generator interconnection agreement executed with transmission owner" },
          { time: "Aug 14", text: "Notice to proceed issued to balance-of-plant contractor" },
        ] },
        { id: "DEV-034", title: "Solano Valley Storage · 150 MW / 600 MWh", subtitle: "California, US · co-located with Solano Valley PV", steps: ["Site control", "Interconnection", "Permitting", "Construction", "COD"], current: 1, eta: "COD Q3 2028", status: "Facilities study", tone: "amber", events: [
          { time: "Oct 14", text: "Grid operator flagged $18.6M network upgrade in draft facilities study" },
          { time: "Jul 2", text: "Cluster 15 system impact study passed — no thermal overloads" },
          { time: "Mar 11", text: "Queue position confirmed; study deposit $1.5M posted" },
        ] },
        { id: "DEV-036", title: "Pecos Flats Solar + Storage · 240 MW", subtitle: "Texas, US · 240 MWac solar + 100 MW / 200 MWh BESS", steps: ["Site control", "Interconnection", "Permitting", "Construction", "COD"], current: 2, eta: "COD Q4 2027", status: "Permitting", tone: "blue", events: [
          { time: "Oct 8", text: "County road-use agreement approved; environmental survey clean" },
          { time: "Aug 22", text: "Full interconnection study complete; standard generation agreement signed" },
          { time: "May 5", text: "Option exercised on 1,940 acres of ranch land" },
        ] },
        { id: "DEV-038", title: "Nordsee Offshore II · 600 MW", subtitle: "North Sea, DE · 40 × 15 MW turbines", steps: ["Site control", "Interconnection", "Permitting", "Construction", "COD"], current: 2, eta: "COD 2030", status: "Permit at risk", tone: "red", events: [
          { time: "Oct 17", text: "Maritime authority requested additional bird-migration survey season" },
          { time: "Jun 3", text: "Offshore grid connection capacity awarded for 2029 delivery" },
          { time: "Jan 20", text: "Seabed lease secured in federal tender round" },
        ] },
        { id: "DEV-029", title: "Galicia Hybrid · 90 MW", subtitle: "Galicia, ES · 60 MW wind + 30 MWp solar, shared connection", steps: ["Site control", "Interconnection", "Permitting", "Construction", "COD"], current: 4, eta: "COD Nov 24", status: "Commissioning", tone: "green", events: [
          { time: "Oct 19", text: "Grid code compliance tests passed; reactive power capability verified" },
          { time: "Oct 2", text: "Energization of 132 kV substation" },
          { time: "Jul 28", text: "Mechanical completion of all 12 turbines" },
        ] },
      ],
    },
    curtailment: {
      blurb: "Where and when the fleet is being curtailed, so traders and asset managers can target storage, bids and compensation claims.",
      bullets: ["Curtailed share of available energy by asset and hour", "Spot the midday solar and overnight wind hotspots", "Feeds the curtailment loss register for compensation claims"],
      subtitle: "Curtailed energy as % of available · Oct 1 – 20, 2026 · hour ending (local)",
      rowLabel: "Asset",
      rows: ["Solano Valley PV", "Sunbelt Rooftop", "Mesa Wind", "Coastal Wind", "Nordsee Offshore", "Galicia Hybrid"],
      cols: ["02", "05", "08", "10", "12", "14", "16", "19", "22"],
      values: [
        [0, 0, 4, 22, 38, 31, 9, 0, 0],
        [0, 0, 1, 6, 11, 8, 2, 0, 0],
        [18, 24, 9, 4, 6, 5, 2, 1, 12],
        [6, 8, 3, 2, 4, 3, 1, 0, 4],
        [11, 14, 5, 2, 3, 2, 1, 0, 7],
        [3, 4, 6, 14, 21, 17, 5, 1, 2],
      ],
      unit: "%",
      legend: ["None", "Heavy"],
      summary: [
        { label: "Curtailed energy MTD", value: "18.4 GWh", delta: "4.2% of available", tone: "amber" },
        { label: "Lost revenue MTD", value: "$612K", delta: "$231K claimable", tone: "red" },
        { label: "Worst hotspot", value: "Solano · 12:00", delta: "38% curtailed", tone: "red" },
      ],
    },
  },
});
