// src/industries/renewable/data.ts — Sunhive extension content (shared pages + archetype extension screens).
// The hand-coded module src/domains/energy-renewable.tsx owns meta / extra / story. Fictional people, places and figures.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "Your business", description: "Tell us how you work so Sunhive can set up territories, crews and tariffs.", fields: [
          { label: "Company name", type: "text", placeholder: "Sunhive San Diego", half: true },
          { label: "Contractor license #", type: "text", placeholder: "e.g. C-46 1048213", half: true },
          { label: "What you install", type: "radio", options: ["Solar only", "Solar + storage", "Solar + storage + EV"] },
          { label: "Service territory", type: "select", options: ["San Diego County", "Phoenix Metro", "Austin", "Sacramento Valley"] },
        ] },
        { title: "Utility & tariffs", description: "We load net-metering and time-of-use rates for every customer automatically.", fields: [
          { label: "Default net-metering program", type: "select", options: ["NEM 3.0 (net billing)", "NEM 2.0 legacy", "Buy-all / sell-all"], half: true },
          { label: "Interconnection portal login", type: "email", placeholder: "permits@yourcompany.example", half: true },
          { label: "Auto-submit interconnection applications", type: "toggle", value: "true" },
        ] },
        { title: "Crews & equipment", description: "Add install crews and the equipment you stock so jobs route correctly.", fields: [
          { label: "Number of install crews", type: "number", placeholder: "3", half: true },
          { label: "Default battery size", type: "select", options: ["13.5 kWh", "10 kWh", "20 kWh stackable"], half: true },
          { label: "Enroll new batteries in the VPP by default", type: "toggle", value: "true" },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Ops admin", description: "Runs the Sunhive workspace, territories and integrations.", permissions: ["Manage users and crews", "Edit tariffs and VPP programs", "Approve change orders"] },
        { name: "Solar designer", description: "Surveys sites and builds proposals.", permissions: ["Create designs and proposals", "Book site surveys", "Submit interconnection applications"] },
        { name: "Install lead", description: "Leads a crew on installs and commissioning.", permissions: ["View crew schedule", "Complete commissioning checklists", "Upload inspection photos"] },
        { name: "Grid markets analyst", description: "Bids the VPP into grid-services programs.", permissions: ["Schedule VPP events", "View settlement statements", "Read-only on customers"] },
      ],
      members: [
        { name: "Carla Reyes", email: "carla.reyes@sunhive.energy", role: "Ops admin", status: "Active", lastActive: "Just now" },
        { name: "Jasmine Tran", email: "jasmine.tran@sunhive.energy", role: "Solar designer", status: "Active", lastActive: "20 min ago" },
        { name: "Marcus Bell", email: "marcus.bell@sunhive.energy", role: "Install lead", status: "Active", lastActive: "On site" },
        { name: "Rosa Villalobos", email: "rosa.villalobos@sunhive.energy", role: "Install lead", status: "Active", lastActive: "1 h ago" },
        { name: "Daniel Park", email: "daniel.park@sunhive.energy", role: "Grid markets analyst", status: "Active", lastActive: "8 min ago" },
        { name: "Theo Adeyemi", email: "theo.adeyemi@sunhive.energy", role: "Solar designer", status: "Invited", lastActive: "—" },
      ],
    },
    billing: {
      plan: "Installer", price: "$390 / month", renews: "Nov 8, 2026", paymentMethod: "Business card ••3307",
      usage: [
        { label: "Monitored sites", used: 14200, limit: 20000, unit: "sites" },
        { label: "Active install crews", used: 3, limit: 5, unit: "crews" },
        { label: "Proposals generated", used: 118, limit: 200, unit: "this month" },
        { label: "Customer portal invites", used: 2410, limit: 5000, unit: "this year" },
      ],
      invoices: [
        { id: "SH-INS-2610", date: "Oct 8, 2026", amount: "$390.00", status: "Paid" },
        { id: "SH-INS-2609", date: "Sep 8, 2026", amount: "$390.00", status: "Paid" },
        { id: "SH-INS-2608", date: "Aug 8, 2026", amount: "$390.00", status: "Paid" },
        { id: "SH-INS-2607", date: "Jul 8, 2026", amount: "$390.00", status: "Paid" },
      ],
    },
    inbox: {
      threads: [
        { name: "Dana Whitfield", preview: "Can the survey team come Tuesday morning instead?", time: "10:24", avatar: "Dana Whitfield", unread: 1, tag: "Survey" },
        { name: "Marcus Bell", preview: "Okafor job wrapped — EV charger commissioned.", time: "9:10", avatar: "Marcus Bell", unread: 1, tag: "Install" },
        { name: "Utility interconnection desk", preview: "PTO granted for 4 systems in Chula Vista.", time: "Yesterday", avatar: "⚡", tag: "PTO" },
        { name: "Jasmine Tran", preview: "Feeder CV-1142 is now export-limited — redesign needed.", time: "Mon", avatar: "Jasmine Tran", tag: "Design" },
      ],
      messages: [
        { from: "them", text: "Hi! We got the three proposal options. The whole-home backup one looks great but we want to see the roof first.", time: "10:12" },
        { from: "them", text: "Can the survey team come Tuesday morning instead of Wednesday? I work from home that day.", time: "10:14" },
        { from: "me", text: "Absolutely, Dana — I've moved you to Tue Nov 17 at 9:00. Jasmine will check the main panel too since the backup option needs it.", time: "10:20" },
        { from: "them", text: "Perfect, thank you. Should we clear anything in the garage?", time: "10:24" },
      ],
    },
    search: {
      query: "whitfield",
      facets: ["Customer", "Project", "Ticket", "Document"],
      results: [
        { type: "Customer", title: "Dana Whitfield · Chula Vista", snippet: "Lead · 9.6 kW + 27 kWh proposed · feeder CV-1142", meta: "Survey Nov 17" },
        { type: "Project", title: "Whitfield — Chula Vista", snippet: "Stage: Survey · value $44,100 · designer Jasmine Tran", meta: "Day 1 in stage" },
        { type: "Ticket", title: "FS-9901 · Battery firmware v2.7 SoC drift", snippet: "Existing system at Whitfield parents' home · unassigned", meta: "High priority" },
        { type: "Document", title: "Whitfield proposal v2 (3 options)", snippet: "Solar Essentials · Solar + Storage · Whole-home backup", meta: "Sent Oct 19" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 3, title: "VPP enrollment push", tone: "green" },
        { date: 5, title: "Riverside Garden Ph.2 permit hearing", tone: "amber", time: "6:00 PM" },
        { date: 10, title: "Crew safety stand-down", tone: "red", time: "7:00 AM" },
        { date: 13, title: "Fall utility rate change", tone: "amber" },
        { date: 17, title: "Whitfield site survey", tone: "blue", time: "9:00 AM" },
        { date: 18, title: "VPP settlement statements", tone: "violet" },
        { date: 19, title: "Battery firmware v2.8 rollout", tone: "blue", time: "11:00 PM" },
        { date: 24, title: "Foothill cleaning campaign ends", tone: "green" },
        { date: 30, title: "Monthly install target", tone: "gray" },
      ],
    },
    reports: {
      reports: [
        { name: "Install pipeline by stage", description: "Every project by stage, days in stage and contract value.", category: "Sales & installs", updated: "Today", format: "XLSX", owner: "Carla Reyes", schedule: "Weekly" },
        { name: "PTO cycle time", description: "Days from install complete to permission to operate, by utility feeder.", category: "Interconnection", updated: "Oct 19", format: "CSV", owner: "Jasmine Tran", schedule: "Weekly" },
        { name: "Crew utilization", description: "Scheduled vs available crew hours and first-time-fix rate.", category: "Field ops", updated: "Oct 20", format: "XLSX", owner: "Carla Reyes", schedule: "Weekly" },
        { name: "VPP event performance", description: "Dispatched kW vs committed, by event and program.", category: "Grid markets", updated: "Oct 18", format: "PDF", owner: "Daniel Park", schedule: "Monthly" },
        { name: "Proposal win rate", description: "Proposals sent, signed and lost by option type and designer.", category: "Sales & installs", updated: "Oct 15", format: "PDF", owner: "Jasmine Tran", schedule: "Monthly" },
        { name: "Warranty claims", description: "Open and closed warranty claims by component and failure mode.", category: "Field ops", updated: "Oct 12", format: "CSV", owner: "Marcus Bell" },
      ],
    },
    states: { noun: "projects", emptyTitle: "No projects yet", emptyBody: "Book a site survey or import leads and your installation pipeline will fill up here.", emptyAction: "Book a survey" },
  },
  screens: {
    quote: {
      blurb: "Homeowners compare Sunhive system options side by side on cost, savings, backup and VPP earnings.",
      bullets: ["Three right-sized systems from one site survey", "Savings modeled on the home's actual tariff", "Backup coverage and VPP eligibility compared"],
      subtitle: "Dana Whitfield · Chula Vista · NEM 3.0 net billing · 11,400 kWh/yr usage",
      cta: "Choose this system",
      options: [
        { name: "Solar Essentials", tagline: "9.6 kW rooftop solar", price: "$24,900" },
        { name: "Solar + Storage", tagline: "9.6 kW + 13.5 kWh battery", price: "$36,400", badge: "Best payback", highlight: true },
        { name: "Whole-home backup", tagline: "9.6 kW + 27 kWh + EV charger", price: "$44,100" },
      ],
      rows: [
        { label: "Estimated year-1 bill savings", values: ["$1,610", "$2,740", "$3,180"] },
        { label: "Simple payback", values: ["15.5 years", "13.3 years", "13.9 years"] },
        { label: "Solar self-consumption", values: ["38%", "81%", "89%"] },
        { label: "Backup during outages", values: [false, "Essentials · ~14 h", "Whole home · ~30 h"] },
        { label: "VPP earnings eligible", values: [false, true, true] },
        { label: "Est. VPP earnings / yr", values: ["—", "$220", "$410"] },
        { label: "Main panel upgrade", values: [false, false, true] },
        { label: "EV charger included", values: [false, false, true] },
        { label: "Monthly payment (25-yr loan)", values: ["$148", "$216", "$262"] },
        { label: "Warranty", values: ["25 yr panels · 10 yr workmanship", "25 yr panels · 10 yr battery", "25 yr panels · 10 yr battery"] },
      ],
    },
    survey: {
      blurb: "Homeowners book a site survey with a Sunhive designer to confirm the roof, panel and battery location.",
      bullets: ["Pick the survey type that fits the project", "Choose a date and arrival window", "Prep list and designer details sent automatically"],
      subtitle: "San Diego County · arrival windows in Pacific Time",
      resources: [
        { name: "Rooftop solar survey", meta: "60 min · roof, shading & attic", price: "Free", emoji: "🏠", tags: ["Drone roof scan"] },
        { name: "Battery & backup assessment", meta: "45 min · panel and load review", price: "Free", emoji: "🔋", tags: ["Main panel check"] },
        { name: "Solar + storage combined", meta: "90 min · full home survey", price: "Free", emoji: "☀️", tags: ["Most popular"] },
        { name: "EV charger site check", meta: "30 min · garage & circuit", price: "Free", emoji: "🔌", tags: ["Load calc"] },
        { name: "Roof health inspection", meta: "45 min · licensed roofer", price: "$149", emoji: "🧰", tags: ["Credited at signing"] },
        { name: "Community solar consult", meta: "20 min · video call", price: "Free", emoji: "🌻", tags: ["Renters welcome"] },
      ],
      dates: ["Mon Nov 16", "Tue Nov 17", "Wed Nov 18", "Thu Nov 19", "Fri Nov 20", "Sat Nov 21"],
      slots: ["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00"],
      unavailable: ["10:00", "12:00", "3:00"],
      summary: [
        { label: "Customer", value: "Dana Whitfield" },
        { label: "Address", value: "2214 Seacrest Way, Chula Vista" },
        { label: "Designer", value: "Jasmine Tran" },
        { label: "Please have ready", value: "Last 12 months of utility bills, attic access" },
      ],
      confirmLabel: "Confirm survey",
      policy: "Reschedule or cancel up to 24 hours before your window at no cost. Someone 18 or older must be home. Surveys are free and do not commit you to a purchase.",
    },
    crews: {
      blurb: "The week's installs, inspections and service visits for every Sunhive crew on one grid.",
      bullets: ["Week grid of jobs by crew and day", "Installs, utility inspections and service calls colour-coded", "Reassign jobs from the event drawer"],
      subtitle: "South, East and Central crews · installs, inspections and service",
      weekLabel: "Nov 16 – 20, 2026",
      days: ["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20"],
      startHour: 7, endHour: 18,
      legend: [{ label: "Install", tone: "blue" }, { label: "Inspection / PTO", tone: "green" }, { label: "Service", tone: "amber" }, { label: "Survey", tone: "violet" }],
      events: [
        { day: 0, start: 7.5, end: 15.5, title: "Install — Salah, Round Rock", meta: "Central crew · 6.8 kW", tone: "blue" },
        { day: 0, start: 8, end: 12, title: "Service — FS-9914 inverter", meta: "South crew · 119 Maple St", tone: "amber" },
        { day: 0, start: 13, end: 16, title: "Battery swap — Whitfield parents", meta: "South crew · FS-9901", tone: "amber" },
        { day: 1, start: 9, end: 10.5, title: "Survey — Dana Whitfield", meta: "Jasmine Tran · Chula Vista", tone: "violet" },
        { day: 1, start: 7.5, end: 16, title: "Install — Delgado, Tempe", meta: "East crew · 7.2 kW + 13.5 kWh", tone: "blue" },
        { day: 2, start: 10, end: 11, title: "City inspection — Delgado", meta: "East crew · Tempe", tone: "green" },
        { day: 2, start: 7.5, end: 15, title: "Install day 1 — Moreno, Escondido", meta: "South crew · 10.4 kW + 27 kWh", tone: "blue" },
        { day: 3, start: 7.5, end: 13, title: "Install day 2 — Moreno, Escondido", meta: "South crew · battery & backup gateway", tone: "blue" },
        { day: 3, start: 9, end: 12, title: "Foothill cleaning — 40 sites", meta: "Contractor · soiling campaign", tone: "amber" },
        { day: 3, start: 14, end: 15, title: "Utility witness test — Salah", meta: "Central crew · PTO", tone: "green" },
        { day: 4, start: 8, end: 16, title: "Riverside Garden Ph.2 racking", meta: "East + Central crews · 420 kW", tone: "blue" },
        { day: 4, start: 13, end: 14.5, title: "Survey — Patel, Gilbert", meta: "Theo Adeyemi", tone: "violet" },
      ],
    },
    hosting: {
      blurb: "Remaining grid hosting capacity on every feeder in the territory, so designers size systems that get approved fast.",
      bullets: ["Feeders pinned by remaining DER hosting capacity", "Export limits and upgrade triggers flagged before design", "Sunhive sites and pending applications per feeder"],
      subtitle: "San Diego County · utility hosting-capacity data refreshed Oct 18",
      mapLabel: "San Diego County distribution feeders",
      legend: [{ label: "Open capacity", tone: "green" }, { label: "Limited", tone: "amber" }, { label: "Export-limited", tone: "red" }, { label: "Upgrade planned", tone: "blue" }],
      kpis: [
        { label: "Feeders tracked", value: "212", delta: "14,200 Sunhive sites", tone: "blue" },
        { label: "Export-limited feeders", value: "17", delta: "+3 since September", tone: "red" },
        { label: "Median PTO time", value: "11 days", delta: "−4 days on open feeders", tone: "green" },
      ],
      pins: [
        { name: "Chula Vista CV-1142", x: 46, y: 82, status: "Export-limited", tone: "red", metric: "0.2 MW left · 612 sites", detail: "New applications capped at 5 kW export. Whitfield design should favor battery self-consumption." },
        { name: "Otay Mesa OM-0871", x: 60, y: 90, status: "Limited", tone: "amber", metric: "0.9 MW left · 288 sites", detail: "Hosting drops below 0.5 MW after 14 pending applications are approved." },
        { name: "Escondido ES-2210", x: 52, y: 26, status: "Open capacity", tone: "green", metric: "3.4 MW left · 404 sites", detail: "Moreno install this week. No export limits; fast-track eligible under 30 kW." },
        { name: "Oceanside OC-3305", x: 22, y: 14, status: "Open capacity", tone: "green", metric: "2.8 MW left · 351 sites", detail: "Coastal feeder with low daytime load headroom risk. PTO averaging 8 days." },
        { name: "El Cajon EC-1907", x: 70, y: 56, status: "Upgrade planned", tone: "blue", metric: "Upgrade Q1 2027 · +4 MW", detail: "Substation transformer upgrade will lift the export cap. Hold large systems until January." },
        { name: "Santee SN-0448", x: 66, y: 44, status: "Limited", tone: "amber", metric: "1.1 MW left · 236 sites", detail: "Voltage rise flagged at feeder end; smart-inverter volt-var settings required." },
        { name: "La Mesa LM-1520", x: 58, y: 62, status: "Open capacity", tone: "green", metric: "2.1 MW left · 509 sites", detail: "Strong VPP participation — 71% of batteries enrolled." },
        { name: "Point Loma PL-0612", x: 26, y: 70, status: "Export-limited", tone: "red", metric: "0.1 MW left · 447 sites", detail: "Saturated by rooftop solar. Solar-only proposals unlikely to pass; lead with storage." },
        { name: "Ramona RM-0091", x: 82, y: 22, status: "Open capacity", tone: "green", metric: "5.6 MW left · 96 sites", detail: "Rural feeder with long PTO paperwork due to wildfire-zone review." },
      ],
    },
  },
});
