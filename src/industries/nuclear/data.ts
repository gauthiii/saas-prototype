// src/industries/nuclear/data.ts — Atria extension content (shared pages + archetype extension screens).
// The hand-coded module src/domains/energy-nuclear.tsx owns meta / extra / story. Fictional people, places and figures.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "Your fleet", description: "Tell us about your licensed units so Atria can load the right technical specifications.", fields: [
          { label: "Licensee name", type: "text", placeholder: "Cascade Power Authority", half: true },
          { label: "Number of sites", type: "number", placeholder: "4", half: true },
          { label: "Reactor types", type: "select", options: ["PWR", "BWR", "PWR + BWR", "PWR + BWR + SMR"] },
          { label: "Licensing basis", type: "radio", options: ["10 CFR 50 operating license", "10 CFR 52 combined license", "Both"] },
        ] },
        { title: "Connect plant data", description: "Atria reads from the plant computer and historian through a one-way data diode. It never writes to plant systems.", fields: [
          { label: "Historian interface", type: "select", options: ["One-way diode export", "Scheduled file transfer", "Manual upload"], half: true },
          { label: "Data refresh", type: "select", options: ["Every 1 minute", "Every 5 minutes", "Every 15 minutes"], half: true },
          { label: "Import technical specifications and SR frequencies", type: "toggle", value: "true" },
        ] },
        { title: "Programs", description: "Turn on the programs your site runs in Atria.", fields: [
          { label: "Corrective action program", type: "toggle", value: "true" },
          { label: "Radiation protection & dosimetry", type: "toggle", value: "true" },
          { label: "Outage management", type: "toggle", value: "true" },
        ] },
        { title: "Invite your team", description: "Access is role-based and every change is logged for the licensing record.", fields: [
          { label: "Teammate emails", type: "textarea", placeholder: "one email per line" },
          { label: "Require hardware security keys", type: "toggle", value: "true" },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Site administrator", description: "Owns the Atria tenant, sites and access reviews.", permissions: ["Manage users and access reviews", "Configure plant data links", "Approve records retention changes"] },
        { name: "Shift manager", description: "Licensed SRO responsible for unit operations on shift.", permissions: ["Enter and sign narrative logs", "Declare LCO entry and exit", "Approve surveillance schedule changes"] },
        { name: "Licensing engineer", description: "Maintains the licensing basis and NRC correspondence.", permissions: ["Edit condition reports and LERs", "Track ROP indicators", "Prepare NRC submittals"] },
        { name: "Radiation protection", description: "Health physics technicians and supervisors.", permissions: ["Issue radiation work permits", "Place RP holds", "Edit survey records"] },
        { name: "Outage planner", description: "Builds and tracks the refueling outage schedule.", permissions: ["Edit outage schedule", "Assign surveillance windows", "Read-only on narrative logs"] },
      ],
      members: [
        { name: "Dr. Lena Okafor", email: "lena.okafor@cascadepower.example", role: "Site administrator", status: "Active", lastActive: "1 h ago" },
        { name: "Raymond Achterberg", email: "raymond.achterberg@cascadepower.example", role: "Shift manager", status: "Active", lastActive: "Just now" },
        { name: "Keisha Lamont", email: "keisha.lamont@cascadepower.example", role: "Shift manager", status: "Active", lastActive: "Off shift" },
        { name: "Pradeep Iyer", email: "pradeep.iyer@cascadepower.example", role: "Licensing engineer", status: "Active", lastActive: "22 min ago" },
        { name: "Siobhan Gallagher", email: "siobhan.gallagher@cascadepower.example", role: "Radiation protection", status: "Active", lastActive: "40 min ago" },
        { name: "Mikael Johansson", email: "mikael.johansson@cascadepower.example", role: "Outage planner", status: "Active", lastActive: "Yesterday" },
        { name: "Aaliyah Brooks", email: "aaliyah.brooks@cascadepower.example", role: "Licensing engineer", status: "Invited", lastActive: "—" },
      ],
    },
    billing: {
      plan: "Fleet", price: "Custom · billed quarterly", renews: "Jan 1, 2027", paymentMethod: "Wire transfer · PO 44-81902",
      usage: [
        { label: "Licensed units", used: 8, limit: 10, unit: "units" },
        { label: "Named users", used: 412, limit: 600, unit: "users" },
        { label: "Records storage", used: 18.4, limit: 25, unit: "TB" },
        { label: "On-site SE days", used: 31, limit: 40, unit: "days / yr" },
      ],
      invoices: [
        { id: "ATR-CPA-26Q4", date: "Oct 1, 2026", amount: "$186,000.00", status: "Due" },
        { id: "ATR-CPA-26Q3", date: "Jul 1, 2026", amount: "$186,000.00", status: "Paid" },
        { id: "ATR-CPA-26Q2", date: "Apr 1, 2026", amount: "$186,000.00", status: "Paid" },
        { id: "ATR-CPA-26Q1", date: "Jan 1, 2026", amount: "$172,500.00", status: "Paid" },
      ],
    },
    inbox: {
      threads: [
        { name: "Pradeep Iyer", preview: "Unit 2 IE01 indicator is close to the white threshold.", time: "10:18", avatar: "Pradeep Iyer", unread: 2, tag: "ROP" },
        { name: "Raymond Achterberg", preview: "Unit 1 EDG-A monthly run complete — SR 3.8.1.2 met.", time: "9:32", avatar: "Raymond Achterberg", unread: 1, tag: "Surveillance" },
        { name: "Siobhan Gallagher", preview: "RP hold at penetration C-12 lifted after shielding.", time: "Yesterday", avatar: "Siobhan Gallagher", tag: "RP" },
        { name: "NRC resident inspector", preview: "Requesting the CR-2026-1188 effectiveness review plan.", time: "Mon", avatar: "📋", tag: "Inspection" },
      ],
      messages: [
        { from: "them", text: "Heads up — with the June trip, Unit 2 sits at 1 unplanned scram in the last 7,000 critical hours. The white threshold is more than 3.", time: "10:09" },
        { from: "them", text: "We still have margin, but a second trip before next summer would put us in a tight spot on IE01.", time: "10:11" },
        { from: "me", text: "Understood. Is the feedwater pump root-cause corrective action on track?", time: "10:15" },
        { from: "them", text: "Yes — CR-2026-1291 actions closed last week. I've added the effectiveness review to the corrective action tracker for December.", time: "10:18" },
      ],
    },
    search: {
      query: "EDG-B",
      facets: ["Condition report", "Surveillance", "Log entry", "Document"],
      results: [
        { type: "Condition report", title: "CR-2026-1188 · Unit 2 EDG-B start-time trend", snippet: "Start time rose from 8.1 s to 9.4 s against the 10 s limit · injectors replaced", meta: "Effectiveness review" },
        { type: "Surveillance", title: "SR 3.8.1.2 · Unit 2 EDG-B monthly start", snippet: "Last run Oct 14 · started in 8.3 s, loaded in 41 s", meta: "Next due Nov 13" },
        { type: "Log entry", title: "Unit 2 narrative log · Oct 14 14:22", snippet: "EDG-B declared operable following post-maintenance test; LCO 3.8.1 exited", meta: "K. Lamont, SM" },
        { type: "Document", title: "Maintenance Rule (a)(1) action plan · EDG system", snippet: "Performance criteria, monitoring goals and return-to-(a)(2) basis", meta: "Rev 2 · Oct 2, 2026" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 5, title: "EP drill · Ravenna", tone: "violet", time: "8:00 AM" },
        { date: 9, title: "Unit 4 coastdown begins", tone: "amber" },
        { date: 10, title: "NRC quarterly exit meeting", tone: "violet", time: "1:00 PM" },
        { date: 13, title: "Unit 2 EDG-B monthly SR", tone: "green" },
        { date: 17, title: "Q3 ROP PI data submittal", tone: "red" },
        { date: 19, title: "Dry-cask campaign · CASK-23", tone: "blue" },
        { date: 24, title: "Operator requalification exam", tone: "amber" },
        { date: 28, title: "Unit 4 refueling outage start", tone: "blue" },
        { date: 30, title: "Annual dose report review", tone: "gray" },
      ],
    },
    reports: {
      reports: [
        { name: "ROP performance indicator data", description: "Quarterly PI data for all units, prepared for NRC submittal.", category: "Regulatory", updated: "Oct 20", format: "XLSX", owner: "Pradeep Iyer", schedule: "Quarterly" },
        { name: "Corrective action backlog", description: "Open condition reports by significance level, age and owner.", category: "CAP", updated: "Today", format: "PDF", owner: "Pradeep Iyer", schedule: "Weekly" },
        { name: "Surveillance compliance", description: "Every SR performed, late or within grace period, by unit.", category: "Operations", updated: "Oct 19", format: "PDF", owner: "Raymond Achterberg", schedule: "Weekly" },
        { name: "Collective dose by work group", description: "Person-rem against ALARA goals, by department and RWP.", category: "Radiation protection", updated: "Oct 18", format: "XLSX", owner: "Siobhan Gallagher", schedule: "Monthly" },
        { name: "Unit 4 outage readiness", description: "Scope freeze, parts, contractors and critical-path milestones.", category: "Outage", updated: "Oct 21", format: "PDF", owner: "Mikael Johansson" },
        { name: "Effluent release summary", description: "Gaseous and liquid releases versus ODCM limits.", category: "Radiation protection", updated: "Oct 5", format: "PDF", owner: "Siobhan Gallagher", schedule: "Quarterly" },
      ],
    },
    states: { noun: "condition reports", emptyTitle: "No condition reports", emptyBody: "Anyone on site can raise a condition report for an issue, near-miss or improvement. Low thresholds keep the plant safe.", emptyAction: "Raise a condition report" },
  },
  screens: {
    rop: {
      blurb: "Reactor Oversight Process performance indicators for every unit, shown as margin to the NRC Green/White threshold.",
      bullets: ["Seven cornerstones scored by margin to the white threshold", "Units approaching a threshold flagged early", "Trend since last quarter's PI submittal"],
      subtitle: "Q3 2026 · 100 = full margin, 0 = at Green/White threshold · all indicators currently Green",
      criteria: ["Initiating events", "Mitigating systems", "Barrier integrity", "Emergency preparedness", "Occupational rad safety", "Public rad safety", "Security"],
      entities: [
        { name: "Unit 1 · Ravenna PWR", subtitle: "1,180 MWe · cycle 22", scores: [94, 82, 96, 92, 88, 99, 95], trend: "+1", badge: "All Green" },
        { name: "Unit 2 · Ravenna PWR", subtitle: "1,180 MWe · June reactor trip", scores: [58, 71, 95, 92, 90, 99, 95], trend: "−18", badge: "Watch: unplanned scrams" },
        { name: "Unit 3 · Cascade BWR", subtitle: "1,310 MWe · post-outage", scores: [88, 86, 91, 90, 74, 98, 94], trend: "−4", badge: "Watch: outage dose" },
        { name: "Unit 4 · Cascade PWR", subtitle: "1,180 MWe · refuel Nov 28", scores: [91, 84, 93, 90, 89, 98, 94], trend: "0", badge: "All Green" },
        { name: "Unit 5 · Belmont SMR", subtitle: "77 MWe · module A", scores: [97, 95, 98, 94, 97, 99, 96], trend: "+2", badge: "All Green" },
        { name: "Unit 6 · Belmont SMR", subtitle: "77 MWe · module B", scores: [96, 93, 98, 94, 97, 99, 96], trend: "+1", badge: "All Green" },
        { name: "Unit 7 · Granite Bay PWR", subtitle: "1,240 MWe · cycle 25", scores: [95, 90, 94, 96, 91, 99, 97], trend: "+1", badge: "All Green" },
        { name: "Unit 8 · Granite Bay PWR", subtitle: "1,240 MWe · returned Oct 3", scores: [84, 76, 92, 96, 90, 99, 97], trend: "−6", badge: "Watch: MSPI cooling water" },
      ],
    },
    cap: {
      blurb: "Condition reports tracked from initiation through cause evaluation, corrective action and effectiveness review.",
      bullets: ["Milestone stepper for every significant condition report", "Due dates driven by significance level", "Event log of screenings, evaluations and NRC interactions"],
      subtitle: "Significance level A and B condition reports · all sites",
      items: [
        { id: "CR-2026-1291", title: "Unit 2 reactor trip on main feedwater pump loss", subtitle: "Level A · root cause evaluation · owner Pradeep Iyer", steps: ["Initiated", "Screened", "Cause evaluation", "Corrective actions", "Effectiveness review", "Closed"], current: 4, eta: "Review Dec 15", status: "Effectiveness review", tone: "blue", events: [
          { time: "Oct 13", text: "All corrective actions closed: pump control card replaced fleet-wide, logic modified" },
          { time: "Aug 21", text: "LER 2026-002 submitted to the NRC" },
          { time: "Jul 30", text: "Root cause: degraded speed-control card with no preventive replacement interval" },
          { time: "Jun 11", text: "CR initiated by control room after automatic reactor trip" },
        ] },
        { id: "CR-2026-1188", title: "Unit 2 EDG-B start-time adverse trend", subtitle: "Level B · apparent cause · owner Keisha Lamont", steps: ["Initiated", "Screened", "Cause evaluation", "Corrective actions", "Effectiveness review", "Closed"], current: 4, eta: "Review Nov 30", status: "Effectiveness review", tone: "blue", events: [
          { time: "Oct 14", text: "Post-maintenance run: start time 8.3 s against 10 s limit" },
          { time: "Sep 9", text: "Fuel injectors replaced; EDG system placed in Maintenance Rule (a)(1)" },
          { time: "May 28", text: "Apparent cause: injector wear beyond vendor interval" },
        ] },
        { id: "CR-2026-1342", title: "Unit 3 condenser air in-leakage", subtitle: "Level B · apparent cause · owner Mikael Johansson", steps: ["Initiated", "Screened", "Cause evaluation", "Corrective actions", "Effectiveness review", "Closed"], current: 3, eta: "Due Nov 20", status: "Corrective actions", tone: "amber", events: [
          { time: "Oct 16", text: "Helium leak test found expansion joint tear on low-pressure turbine B" },
          { time: "Sep 24", text: "Screened as Level B — ~6 MWe loss, no safety impact" },
          { time: "Sep 19", text: "CR initiated on rising condenser backpressure trend" },
        ] },
        { id: "CR-2026-1407", title: "Dose-rate above RWP threshold at penetration C-12", subtitle: "Level B · RP near-miss · owner Siobhan Gallagher", steps: ["Initiated", "Screened", "Cause evaluation", "Corrective actions", "Effectiveness review", "Closed"], current: 2, eta: "Due Nov 6", status: "Cause evaluation", tone: "amber", events: [
          { time: "Oct 20", text: "Temporary shielding installed; RP hold lifted after resurvey at 0.9 mrem/h" },
          { time: "Oct 19", text: "Pre-job survey read 4.2 mrem/h; RP hold placed before entry — no dose received" },
        ] },
        { id: "CR-2026-1460", title: "Unit 7 fire barrier penetration seal degraded", subtitle: "Level B · screening · owner Raymond Achterberg", steps: ["Initiated", "Screened", "Cause evaluation", "Corrective actions", "Effectiveness review", "Closed"], current: 1, eta: "Screen by Oct 23", status: "Hourly fire watch", tone: "red", events: [
          { time: "Oct 21 07:40", text: "Compensatory hourly fire watch established per fire protection program" },
          { time: "Oct 21 06:55", text: "Degraded seal found on cable tray penetration during routine walkdown" },
        ] },
      ],
    },
    shiftlog: {
      blurb: "The licensed control room narrative log for the shift, with every evolution, surveillance and tech spec action time-stamped and signed.",
      bullets: ["Chronological log of every evolution on shift", "Filter by operations, surveillance, tech spec and RP", "Signed by the licensed operator who made each entry"],
      subtitle: "Unit 1 · Ravenna PWR · day shift Oct 21, 2026 · Mode 1, 100% power",
      filters: ["Operations", "Surveillance", "Tech spec", "Radiation protection", "Chemistry", "Maintenance"],
      items: [
        { time: "06:00", title: "Shift turnover complete", body: "Assumed the watch. Mode 1, 100% RTP, RCS boron 812 ppm. No LCOs in effect. Protected train: B.", tone: "gray", tag: "Operations", actor: "Raymond Achterberg, SM" },
        { time: "06:40", title: "Pre-job brief — EDG-A monthly run", body: "Brief held for SR 3.8.1.2. Reviewed abort criteria, operating experience from Unit 2 EDG-B, and protected-equipment postings.", tone: "blue", tag: "Surveillance", actor: "Elena Marsh, RO" },
        { time: "07:05", title: "Entered LCO 3.8.1 Condition B for EDG-A testing", body: "EDG-A inoperable for surveillance. 14-day completion time; offsite circuits and EDG-B verified operable.", tone: "amber", tag: "Tech spec", actor: "Raymond Achterberg, SM" },
        { time: "07:16", title: "EDG-A started and loaded", body: "Started in 8.6 s (limit 10 s). Loaded to 5,200 kW in 52 s. Frequency and voltage within acceptance band.", tone: "green", tag: "Surveillance", actor: "Elena Marsh, RO" },
        { time: "08:30", title: "EDG-A run complete — LCO 3.8.1 exited", body: "SR 3.8.1.2 satisfactory after 60-minute loaded run. EDG-A returned to standby and declared operable.", tone: "green", tag: "Tech spec", actor: "Raymond Achterberg, SM" },
        { time: "09:10", title: "RCS leakage calculation", body: "SR 3.4.13.1 performed. Unidentified leakage 0.04 gpm (limit 1 gpm). Identified leakage 0.31 gpm (limit 10 gpm).", tone: "green", tag: "Surveillance", actor: "Tomás Ferreira, RO" },
        { time: "10:20", title: "Chemistry sample results", body: "RCS dose-equivalent iodine well below the limit. Secondary sodium 0.4 ppb, within action level 1.", tone: "gray", tag: "Chemistry", actor: "Chemistry · Nadia Petrov" },
        { time: "11:45", title: "RP survey — auxiliary building RHR pump room", body: "General area 0.8 mrem/h, no change. Room remains posted as a radiation area; no high-radiation postings required.", tone: "gray", tag: "Radiation protection", actor: "RP · Siobhan Gallagher" },
        { time: "13:15", title: "Charging pump A work order released", body: "WO 26-30418 released for seal leak-off inspection on train A; protected train B unaffected; tagout 1-26-0912 hung and verified.", tone: "blue", tag: "Maintenance", actor: "Raymond Achterberg, SM" },
        { time: "14:30", title: "Load reduction request declined", body: "Grid operator requested 50 MWe economic reduction. Declined per site load-follow limits for this point in core life; grid dispatch notified.", tone: "amber", tag: "Operations", actor: "Raymond Achterberg, SM" },
      ],
      aside: {
        title: "Unit 1 now",
        kpis: [
          { label: "Reactor power", value: "100%", delta: "1,180 MWe gross", tone: "green" },
          { label: "RCS boron", value: "812 ppm", delta: "−2 ppm/day dilution", tone: "blue" },
          { label: "Open LCOs", value: "0", delta: "EDG-A exited 08:30", tone: "green" },
          { label: "Shift dose", value: "4 mrem", delta: "Goal 20 mrem", tone: "green" },
        ],
      },
    },
    surveillance: {
      blurb: "Technical specification surveillances and in-service tests scheduled for the week, so nothing approaches its grace period.",
      bullets: ["Week grid of SRs and IST runs across units", "Colour-coded by test type and pre-outage scope", "Protected-train and LCO impact shown on every test"],
      subtitle: "Ravenna and Cascade sites · Unit 4 pre-outage testing",
      weekLabel: "Nov 16 – 20, 2026",
      days: ["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20"],
      startHour: 6, endHour: 20,
      legend: [{ label: "Tech spec SR", tone: "blue" }, { label: "In-service test", tone: "green" }, { label: "Enters LCO", tone: "amber" }, { label: "EP / training", tone: "violet" }],
      events: [
        { day: 0, start: 7, end: 9, title: "U1 RPS channel functional test", meta: "SR 3.3.1.7 · channel III", tone: "blue" },
        { day: 0, start: 10, end: 12, title: "U2 AFW pump A quarterly IST", meta: "ASME OM · flow & vibration", tone: "green" },
        { day: 0, start: 13, end: 16, title: "U4 EDG-B 24-hour run start", meta: "SR 3.8.1.14 · enters LCO 3.8.1", tone: "amber" },
        { day: 1, start: 8, end: 9.5, title: "U1 control rod exercise", meta: "SR 3.1.4.2 · all banks", tone: "blue" },
        { day: 1, start: 9, end: 11, title: "U4 containment isolation valve stroke", meta: "SR 3.6.3.5 · 14 valves", tone: "green" },
        { day: 1, start: 14, end: 15, title: "U2 RCS leakage calculation", meta: "SR 3.4.13.1 · 72-hour frequency", tone: "blue" },
        { day: 2, start: 7, end: 10, title: "U2 ECCS pump B quarterly IST", meta: "Enters LCO 3.5.2 · 72 h", tone: "amber" },
        { day: 2, start: 13, end: 17, title: "EP tabletop — Cascade TSC", meta: "Emergency response organization", tone: "violet" },
        { day: 3, start: 8, end: 9, title: "U1 ECCS valve position check", meta: "SR 3.5.2.1 · 31-day frequency", tone: "blue" },
        { day: 3, start: 10, end: 12, title: "U4 RHR pump A pre-outage IST", meta: "Shutdown cooling readiness", tone: "green" },
        { day: 3, start: 13, end: 14, title: "U2 RCS leakage calculation", meta: "SR 3.4.13.1 · 72-hour frequency", tone: "blue" },
        { day: 4, start: 7, end: 9, title: "U4 RPS response time test", meta: "SR 3.3.1.16 · pre-outage", tone: "blue" },
        { day: 4, start: 9, end: 12, title: "Simulator requal scenario", meta: "Crew C · licensed operators", tone: "violet" },
        { day: 4, start: 14, end: 16, title: "U1 containment spray pump IST", meta: "ASME OM · train A", tone: "green" },
      ],
    },
  },
});
