// src/industries/fossil/data.ts — Vulcan extension content (shared pages + archetype extension screens).
// The hand-coded module src/domains/energy-fossil.tsx owns meta / extra / story. Fictional people, places and figures.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "Your operation", description: "Tell us what you run so Vulcan can set up fields, facilities and units of measure.", fields: [
          { label: "Operator name", type: "text", placeholder: "Mesquite Ridge Energy", half: true },
          { label: "Operator number", type: "text", placeholder: "e.g. P-5 #561208", half: true },
          { label: "Value chain", type: "radio", options: ["Upstream only", "Upstream + midstream", "Integrated (incl. refining)"] },
          { label: "Volume units", type: "select", options: ["bbl / Mcf", "m³ / Sm³", "boe only"], half: true },
        ] },
        { title: "Connect field data", description: "Point Vulcan at your SCADA host and process historian. Read-only by default.", fields: [
          { label: "SCADA protocol", type: "select", options: ["OPC-UA", "Modbus TCP", "DNP3"], half: true },
          { label: "Historian endpoint", type: "text", placeholder: "historian.midland.internal", half: true },
          { label: "Import 18 months of allocation history", type: "toggle", value: "true" },
        ] },
        { title: "Set approval limits", description: "AFE and permit-to-work approvals route by amount and risk.", fields: [
          { label: "Asset-team AFE limit", type: "currency", placeholder: "$1,000,000", half: true },
          { label: "Executive AFE limit", type: "currency", placeholder: "$10,000,000", half: true },
          { label: "Require HSE sign-off on hot work", type: "toggle", value: "true" },
        ] },
        { title: "Invite your team", description: "Engineers, HSE and the trading desk each get their own workspace.", fields: [
          { label: "Teammate emails", type: "textarea", placeholder: "one email per line" },
          { label: "Default field", type: "select", options: ["Midland Basin", "Eagle Ford", "Williston", "Delaware Basin"] },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Operations admin", description: "Owns the Vulcan tenant, fields and approval limits.", permissions: ["Manage users and approval limits", "Configure SCADA and historian links", "Final AFE approval"] },
        { name: "Asset engineer", description: "Plans wells, workovers and production optimization.", permissions: ["Create and edit AFEs", "Update well delivery board", "Edit decline-curve forecasts"] },
        { name: "HSE lead", description: "Owns process safety, permits and contractor performance.", permissions: ["Sign off PSSR and permits", "Log incidents and near-misses", "Edit contractor scorecards"] },
        { name: "Trader", description: "Runs the hedge book and physical nominations.", permissions: ["Enter swaps and spreads", "View production forecasts", "Read-only on operations"] },
      ],
      members: [
        { name: "Wade Callahan", email: "wade.callahan@mesquiteridge.example", role: "Operations admin", status: "Active", lastActive: "Just now" },
        { name: "Lucía Benavides", email: "lucia.benavides@mesquiteridge.example", role: "Asset engineer", status: "Active", lastActive: "12 min ago" },
        { name: "Hank Duplechain", email: "hank.duplechain@mesquiteridge.example", role: "Asset engineer", status: "Active", lastActive: "1 h ago" },
        { name: "Tamika Rhodes", email: "tamika.rhodes@mesquiteridge.example", role: "HSE lead", status: "Active", lastActive: "34 min ago" },
        { name: "Omar Haddad", email: "omar.haddad@mesquiteridge.example", role: "Trader", status: "Active", lastActive: "5 min ago" },
        { name: "Brynn Kowalczyk", email: "brynn.kowalczyk@mesquiteridge.example", role: "HSE lead", status: "Invited", lastActive: "—" },
      ],
    },
    billing: {
      plan: "Operator", price: "$3,400 / month", renews: "Nov 15, 2026", paymentMethod: "ACH · Operating account ••4418",
      usage: [
        { label: "Connected wells", used: 2140, limit: 2500, unit: "wells" },
        { label: "Pipeline segments", used: 186, limit: 250, unit: "segments" },
        { label: "Seats", used: 6, limit: 15, unit: "users" },
        { label: "Regulatory exports", used: 9, limit: 24, unit: "this year" },
      ],
      invoices: [
        { id: "VUL-26-1015", date: "Oct 15, 2026", amount: "$3,400.00", status: "Paid" },
        { id: "VUL-26-0915", date: "Sep 15, 2026", amount: "$3,400.00", status: "Paid" },
        { id: "VUL-26-0815", date: "Aug 15, 2026", amount: "$3,400.00", status: "Paid" },
        { id: "VUL-26-0715", date: "Jul 15, 2026", amount: "$3,400.00", status: "Paid" },
      ],
    },
    inbox: {
      threads: [
        { name: "Tamika Rhodes", preview: "PSSR walkdown on the coker found two open items.", time: "11:05", avatar: "Tamika Rhodes", unread: 2, tag: "PSSR" },
        { name: "Lucía Benavides", preview: "Wolfcamp 31X hit TD at 21,480 ft MD — casing tomorrow.", time: "9:48", avatar: "Lucía Benavides", unread: 1, tag: "Drilling" },
        { name: "Omar Haddad", preview: "Can you confirm November nominations for the Cushing batch?", time: "Yesterday", avatar: "Omar Haddad", tag: "Trading" },
        { name: "Vulcan Support", preview: "Historian connector for Williston is back online.", time: "Mon", avatar: "🛢️", tag: "Integration" },
      ],
      messages: [
        { from: "them", text: "Walkdown done on the coker. Drum B relief valve paperwork is still missing the bench-test certificate.", time: "10:52" },
        { from: "them", text: "Also the updated P&ID for the new blowdown line hasn't been issued — MOC-1184 is still at engineering review.", time: "10:54" },
        { from: "me", text: "Thanks. Both are restart-critical, so we hold feed-in until they close. Who owns the P&ID?", time: "11:01" },
        { from: "them", text: "Process engineering — Ji-ho Park. He's targeting Thursday. I've marked both items critical on the PSSR.", time: "11:05" },
      ],
    },
    search: {
      query: "wolfcamp",
      facets: ["Well", "AFE", "Permit", "Report"],
      results: [
        { type: "Well", title: "Wolfcamp 31X", snippet: "Delaware Basin · horizontal · TD 21,480 ft MD · rig Ranger 7", meta: "Drilling" },
        { type: "AFE", title: "AFE-26-0418 · Wolfcamp 31X completion", snippet: "62-stage plug-and-perf · $7.9M gross · 87.5% WI", meta: "Pending approval" },
        { type: "Permit", title: "Drilling permit · Wolfcamp 33X", snippet: "State approval received · spud window opens Nov 12", meta: "Approved Oct 18" },
        { type: "Report", title: "Delaware Basin type-curve update", snippet: "Wolfcamp A EUR revised to 1.08 MMboe per 10,000 ft lateral", meta: "Oct 9, 2026" },
        { type: "Well", title: "Wolfcamp 29H", snippet: "Delaware Basin · flowback day 6 · 1,420 bbl/d oil", meta: "Flowback" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 2, title: "Coker feed-in target", tone: "violet" },
        { date: 4, title: "Monthly AFE review", tone: "blue", time: "9:00 AM" },
        { date: 9, title: "Frac crew mobilizes · 31X", tone: "amber" },
        { date: 12, title: "Spud · Wolfcamp 33X", tone: "violet" },
        { date: 13, title: "LDAR quarterly survey", tone: "green" },
        { date: 16, title: "Contractor safety review", tone: "blue", time: "1:00 PM" },
        { date: 19, title: "Pipeline nominations due", tone: "amber", time: "11:00 AM" },
        { date: 24, title: "Board reserves update", tone: "blue" },
        { date: 30, title: "Subpart W data lock", tone: "red" },
      ],
    },
    reports: {
      reports: [
        { name: "Daily production & deferment", description: "Allocated oil, gas and NGL by field with deferment reasons.", category: "Production", updated: "Today", format: "XLSX", owner: "Hank Duplechain", schedule: "Daily" },
        { name: "AFE vs actuals", description: "Approved AFE amounts against field-ticket spend for every active well.", category: "Finance", updated: "Oct 20", format: "XLSX", owner: "Lucía Benavides", schedule: "Weekly" },
        { name: "Contractor safety performance", description: "TRIR, permit compliance and audit closure by contractor.", category: "HSE", updated: "Oct 16", format: "PDF", owner: "Tamika Rhodes", schedule: "Monthly" },
        { name: "Flaring & venting summary", description: "Flared and vented volumes by facility against permit limits.", category: "Emissions", updated: "Oct 19", format: "PDF", owner: "Tamika Rhodes", schedule: "Weekly" },
        { name: "Hedge position report", description: "Swaps, spreads and collars marked to forward curves with VaR.", category: "Trading", updated: "Today", format: "PDF", owner: "Omar Haddad", schedule: "Daily" },
        { name: "Turnaround cost tracker", description: "Coker turnaround spend, scope growth and schedule float.", category: "Refining", updated: "Oct 21", format: "XLSX", owner: "Wade Callahan" },
      ],
    },
    states: { noun: "wells", emptyTitle: "No wells connected yet", emptyBody: "Connect a SCADA host or upload a well header file and live production will appear here.", emptyAction: "Connect a field" },
  },
  screens: {
    wellplan: {
      blurb: "Every new well as a card moving from permit to first production, so drilling, completions and facilities stay in step.",
      bullets: ["Columns for each well-delivery phase", "AFE value, rig or crew and engineer on every card", "Spot wells waiting on permits, crews or tie-ins"],
      subtitle: "2026–27 development program · Delaware, Midland and Williston",
      columns: [
        { title: "Permitted", tone: "gray", cards: [
          { title: "Wolfcamp 33X", meta: "Delaware Basin · spud Nov 12 · Ranger 7", tag: "Permit approved", tone: "green", avatar: "Lucía Benavides", value: "$8.4M" },
          { title: "Spraberry 18-4H", meta: "Midland Basin · pad build 60%", tag: "Pad build", tone: "blue", avatar: "Hank Duplechain", value: "$6.9M" },
        ] },
        { title: "Drilling", tone: "blue", cards: [
          { title: "Wolfcamp 31X", meta: "TD 21,480 ft MD · running production casing", tag: "Day 17 of 19", tone: "blue", avatar: "Lucía Benavides", value: "$8.1M" },
          { title: "Bakken T1-22", meta: "Lateral at 14,200 ft · Prairie Rig 3", tag: "Ahead of curve", tone: "green", avatar: "Gunnar Lindahl", value: "$7.2M" },
        ] },
        { title: "Completion", tone: "amber", cards: [
          { title: "Spraberry 17-2H", meta: "Stage 41 of 58 · zipper frac", tag: "Sand delay", tone: "amber", avatar: "Hank Duplechain", value: "$5.8M" },
          { title: "Wolfcamp 30X", meta: "Waiting on frac crew · Nov 9", tag: "Crew gap", tone: "amber", avatar: "Lucía Benavides", value: "$7.9M" },
        ] },
        { title: "Flowback", tone: "violet", cards: [
          { title: "Wolfcamp 29H", meta: "Day 6 · 1,420 bbl/d oil · 31% water cut", tag: "Above type curve", tone: "green", avatar: "Lucía Benavides", value: "$7.6M" },
          { title: "Bakken T1-19", meta: "Day 11 · gas line tie-in pending", tag: "Flaring", tone: "red", avatar: "Gunnar Lindahl", value: "$6.8M" },
        ] },
        { title: "Online", tone: "green", cards: [
          { title: "Spraberry 16-1H", meta: "IP30 1,180 boe/d · TIL Oct 2", tag: "On budget", tone: "green", avatar: "Hank Duplechain", value: "$6.4M" },
          { title: "Wolfcamp 28H", meta: "IP30 1,610 boe/d · TIL Sep 18", tag: "Under budget", tone: "green", avatar: "Lucía Benavides", value: "$7.3M" },
        ] },
      ],
    },
    afe: {
      blurb: "Authorizations for expenditure waiting on sign-off, with the economics and risk behind every dollar.",
      bullets: ["Gross AFE, working interest and payback on each request", "Priority and age so rigs and crews never stand idle", "Approve or return to the asset team in one click"],
      subtitle: "AFEs above the $1M asset-team limit · Mesquite Ridge Energy",
      approveLabel: "Approve AFE", rejectLabel: "Return to asset team",
      stats: [
        { label: "Pending AFEs", value: "6", delta: "$27.3M gross", tone: "amber" },
        { label: "Approved YTD", value: "$214M", delta: "82% of capex budget", tone: "blue" },
        { label: "Avg turnaround", value: "2.6 days", delta: "−1.1 days vs Q2", tone: "green" },
      ],
      items: [
        { title: "AFE-26-0418 · Wolfcamp 31X completion", subtitle: "Delaware Basin · Lucía Benavides", amount: "$7.9M", priority: "High", age: "1 day", tags: ["Completion", "87.5% WI"], detail: "62-stage plug-and-perf completion with 2,400 lb/ft proppant. Frac crew is booked for Nov 9; a missed slot pushes the next window to January. Type-curve payback 14 months at $70 WTI." },
        { title: "AFE-26-0421 · Bakken T1-19 gas tie-in", subtitle: "Williston · Gunnar Lindahl", amount: "$1.4M", priority: "High", age: "3 days", tags: ["Facilities", "Flaring"], detail: "2.1-mile 6-inch gathering line to the Spur-2 compressor station. T1-19 is flaring ~1.2 MMscf/d during flowback; tie-in ends routine flaring and recovers gas worth ~$3.6k/day." },
        { title: "AFE-26-0409 · Permian 14H ESP replacement", subtitle: "Midland Basin · Hank Duplechain", amount: "$1.1M", priority: "Medium", age: "4 days", tags: ["Workover"], detail: "Pulling unit, new 400-series ESP and variable-speed drive after motor failure. Restores ~620 bbl/d deferred production; payback under 60 days." },
        { title: "AFE-26-0425 · Spraberry 19 pad drilling", subtitle: "Midland Basin · Hank Duplechain", amount: "$13.6M", priority: "Medium", age: "2 days", tags: ["Drilling", "2 wells"], detail: "Two 10,000 ft laterals from a shared pad, sharing facilities with the 18-4H. Pad drilling saves ~$1.2M versus single-well locations. Requires executive approval above $10M." },
        { title: "AFE-26-0412 · Eagle Ford CTB-3 vapor recovery", subtitle: "Eagle Ford · Tamika Rhodes", amount: "$2.2M", priority: "Medium", age: "6 days", tags: ["Emissions"], detail: "Vapor recovery unit and tank-top combustor upgrades to cut storage-tank methane. Supports the OGMP 2.0 reduction target and removes CTB-3 from the flaring exceedance list." },
        { title: "AFE-26-0402 · Eagle Ford 12-1 plug & abandon", subtitle: "Eagle Ford · Hank Duplechain", amount: "$1.1M", priority: "Low", age: "9 days", tags: ["P&A", "Regulatory"], detail: "Shut-in since 2024 with 62% water cut and no economic recompletion. P&A releases the bonding obligation and must be complete before the state inactive-well deadline in March." },
      ],
    },
    pssr: {
      blurb: "The pre-startup safety review that must be complete before the Baytown coker returns from turnaround.",
      bullets: ["Grouped PSM checklist with owners and due dates", "Restart-critical items flagged", "Progress toward feed-in readiness"],
      subtitle: "Baytown delayed coker · turnaround day 31 of 35 · feed-in target Nov 2",
      summary: "15 of 22 items complete · 5 restart-critical items open",
      groups: [
        { title: "Mechanical integrity", items: [
          { label: "Coke drum A and B shell thickness readings within limits", done: true, owner: "Inspection · Ruth Ambrose", critical: true },
          { label: "Heater tube metallurgy replication results accepted", done: true, owner: "Inspection · Ruth Ambrose" },
          { label: "Drum B relief valve bench-test certificate on file", done: false, owner: "Maintenance · Curtis Fontenot", due: "Oct 29", critical: true },
          { label: "Flange torque records closed for all broken joints", done: true, owner: "Maintenance · Curtis Fontenot" },
          { label: "Pressure test of new blowdown line documented", done: false, owner: "Maintenance · Curtis Fontenot", due: "Oct 30" },
        ] },
        { title: "Process safety information & MOC", items: [
          { label: "MOC-1184 blowdown line rerouting approved", done: false, owner: "Process eng. · Ji-ho Park", due: "Oct 29", critical: true },
          { label: "P&IDs updated and issued for the new blowdown line", done: false, owner: "Process eng. · Ji-ho Park", due: "Oct 29", critical: true },
          { label: "Relief system design basis updated for new valves", done: true, owner: "Process eng. · Ji-ho Park" },
          { label: "PHA revalidation actions from turnaround scope closed", done: true, owner: "Process safety · Tamika Rhodes" },
        ] },
        { title: "Safeguards & instrumentation", items: [
          { label: "Safety instrumented functions proof-tested (SIL 2 loops)", done: true, owner: "I&C · Neha Kulkarni", critical: true },
          { label: "Fixed gas detectors calibrated in coker structure", done: true, owner: "I&C · Neha Kulkarni" },
          { label: "Bypasses and jumpers log cleared", done: false, owner: "Operations · Leon Batiste", due: "Nov 1", critical: true },
          { label: "Fire monitors and deluge flow-tested", done: true, owner: "Fire & safety · Marco Esposito" },
        ] },
        { title: "Procedures & training", items: [
          { label: "Startup procedure revised for new blowdown routing", done: true, owner: "Operations · Leon Batiste" },
          { label: "Operators trained on revised startup procedure", done: false, owner: "Operations · Leon Batiste", due: "Oct 31" },
          { label: "Emergency response plan updated and drilled", done: true, owner: "Fire & safety · Marco Esposito" },
        ] },
        { title: "Permits & handover", items: [
          { label: "All turnaround work permits closed out", done: true, owner: "Maintenance · Curtis Fontenot" },
          { label: "Blinds removed and blind list reconciled", done: true, owner: "Operations · Leon Batiste", critical: true },
          { label: "Housekeeping walkdown of coker structure", done: true, owner: "Process safety · Tamika Rhodes" },
          { label: "Mechanical completion certificates signed", done: true, owner: "Turnaround mgr. · Wade Callahan" },
          { label: "Operations acceptance of unit", done: true, owner: "Operations · Leon Batiste" },
          { label: "Final PSSR sign-off by refinery manager", done: false, owner: "Refinery mgr. · Denise Arceneaux", due: "Nov 2", critical: true },
        ] },
      ],
    },
    contractors: {
      blurb: "Weighted safety and delivery scorecards for every oilfield contractor on Mesquite Ridge sites.",
      bullets: ["Six safety and delivery criteria scored 0–100", "Weighted overall score drives bid-list eligibility", "Trend versus the prior quarter"],
      subtitle: "Q3 2026 · contractors with more than 10,000 exposure hours",
      criteria: ["Recordable rate", "Permit compliance", "Stop-work culture", "Audit closure", "Training currency", "Schedule delivery"],
      weights: [25, 20, 15, 15, 10, 15],
      entities: [
        { name: "Lone Mesa Drilling", subtitle: "Drilling · 2 rigs · 184k hours", scores: [92, 95, 88, 90, 96, 84], trend: "+3", badge: "Preferred" },
        { name: "Redline Pressure Pumping", subtitle: "Frac & cementing · 96k hours", scores: [78, 88, 74, 69, 90, 62], trend: "−5", badge: "Watch list" },
        { name: "Basin Crane & Rigging", subtitle: "Heavy lift · 41k hours", scores: [64, 81, 70, 58, 77, 88], trend: "−9", badge: "Improvement plan" },
        { name: "Coastline Turnaround Services", subtitle: "Refinery turnaround · 212k hours", scores: [88, 91, 93, 86, 89, 79], trend: "+1", badge: "Preferred" },
        { name: "Prairie Wireline", subtitle: "Wireline & perforating · 18k hours", scores: [96, 97, 90, 94, 98, 91], trend: "+2", badge: "Preferred" },
        { name: "Gulf Bend Inspection Group", subtitle: "NDT & integrity · 27k hours", scores: [90, 86, 82, 77, 93, 85], trend: "0", badge: "Approved" },
        { name: "Caprock Water Haulers", subtitle: "Produced water trucking · 58k hours", scores: [71, 74, 66, 72, 80, 90], trend: "+4", badge: "Approved" },
      ],
    },
  },
});
