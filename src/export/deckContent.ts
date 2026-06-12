// src/export/deckContent.ts — per-domain narrative used by the exported walkthrough deck.
// Keyed to registry.ts: every App-group view id for a domain must have a ScreenStory.
// Shared Public/Account/Resources pages get generic copy in generateDeck.ts.

export type ScreenStory = {
  blurb: string;      // one-sentence purpose of the screen
  bullets: string[];  // 3 short capability bullets
};

export type DomainStory = {
  tagline: string;            // title-slide subtitle
  audience: string;           // who this prototype is for
  narrative: string;          // story slide paragraph
  stats: [string, string][];  // 3 [value, label] highlight chips
  screens: Record<string, ScreenStory>; // keyed by App-group view id
};

export const DECK_CONTENT: Record<string, DomainStory> = {
  fintech: {
    tagline: "A unified treasury, payments, and compliance cockpit for finance teams",
    audience: "Finance & treasury operations teams",
    narrative:
      "FinFlow walks a finance team through one operating loop: monitor cash position on the treasury dashboard, move money through payments, cards, and payroll, control spend with invoices, approvals, and budgets, then close the loop with risk, liquidity, and analytics views.",
    stats: [["10", "core app screens"], ["4", "money-movement flows"], ["2", "risk & insight views"]],
    screens: {
      dash: { blurb: "The landing view after sign-in — a live snapshot of cash position and activity.", bullets: ["Balance and cash-flow trend charts", "Recent transactions feed", "Quick links into payments and approvals"] },
      payments: { blurb: "Initiate and review outbound payments in a guided form.", bullets: ["Beneficiary and amount entry with validation", "Currency and rail selection", "Simulated submission and confirmation state"] },
      cards: { blurb: "Issue and manage corporate cards with per-card controls.", bullets: ["Card list with status and limits", "Freeze / unfreeze interactions", "Spend-by-card breakdown"] },
      invoice: { blurb: "Create a customer invoice with line items and totals.", bullets: ["Line-item editor with computed totals", "Client and due-date fields", "Draft and send actions"] },
      expenses: { blurb: "Review and approve employee expense submissions.", bullets: ["Approval queue with receipt context", "Approve / reject per item", "Policy-flag highlights"] },
      budgets: { blurb: "Track departmental budgets against actual spend.", bullets: ["Budget vs. actual progress bars", "Per-department drill-down", "Overspend warnings"] },
      payroll: { blurb: "Run a payroll disbursement cycle across the team.", bullets: ["Payee roster with amounts", "Batch disbursement flow", "Run history and status"] },
      compliance: { blurb: "Monitor risk and compliance posture in one place.", bullets: ["KYC / AML status indicators", "Flagged-activity review list", "Audit-trail style records"] },
      wealth: { blurb: "Optimize idle liquidity across accounts and instruments.", bullets: ["Allocation recommendations", "Yield comparison views", "Scenario toggles"] },
      analytics: { blurb: "Aggregate financial analytics across the whole product.", bullets: ["Multi-metric chart grid", "Period comparisons", "Exportable summary widgets"] },
    },
  },
  banking: {
    tagline: "A retail digital bank in your pocket — accounts, money movement, and savings",
    audience: "Retail banking customers and digital-bank product teams",
    narrative:
      "VaultBank follows a customer's everyday money loop: the accounts overview shows balances and activity at a glance, transfers and bill pay move money out, cards control day-to-day spending, savings goals, CDs, and loans grow and finance bigger plans, while statements, FX, and spending insights keep everything documented and understood.",
    stats: [["10", "core app screens"], ["4", "money-movement flows"], ["3", "save, borrow & insight views"]],
    screens: {
      dash: { blurb: "The customer's home screen — every account and recent transaction in one view.", bullets: ["Account list with live balances", "Recent activity feed with status", "Net-worth trend chart"] },
      transfers: { blurb: "Move money between own accounts or to external banks.", bullets: ["From/to account picker with instant internal transfers", "Recurring transfer schedule", "Daily limit usage meters"] },
      billpay: { blurb: "Pay and schedule household bills from one queue.", bullets: ["Upcoming bills with due dates", "Per-payee autopay toggles", "Payment history chart"] },
      cards: { blurb: "Manage debit and credit cards with instant controls.", bullets: ["Card list with spend vs. limit", "Tap-to-freeze interactions", "Security controls and fraud monitoring cues"] },
      deposits: { blurb: "Grow savings with goals, round-ups, and CDs.", bullets: ["Savings goal progress bars", "CD ladder with maturities", "Open-a-CD flow with rates"] },
      loans: { blurb: "Track loans and explore new borrowing.", bullets: ["Loan repayment progress", "Payoff projection chart", "Interactive payment calculator"] },
      payees: { blurb: "Manage saved payees and beneficiaries safely.", bullets: ["Payee list with verification badges", "Add-payee flow with method selection", "New-payee fraud holds"] },
      statements: { blurb: "Access statements, tax forms, and notices.", bullets: ["Filterable document list", "PDF download actions", "Delivery preference cards"] },
      fx: { blurb: "Convert currency and fund a multi-currency wallet.", bullets: ["Live converter with locked rates", "30-day rate trend chart", "Recent exchange history"] },
      insights: { blurb: "Understand spending with categories and AI nudges.", bullets: ["Category donut breakdown", "Monthly spend trend", "Top-merchant list with insights"] },
    },
  },
  health: {
    tagline: "An end-to-end clinical operations suite — from intake to billing",
    audience: "Clinics, hospital ops, and care teams",
    narrative:
      "MedOS follows the patient journey: a patient is registered through intake, scheduled on the appointment grid, found in the directory, seen in person or via telehealth, supported by pharmacy and ward capacity views, and finally billed — with the clinical dashboard tying daily operations together.",
    stats: [["8", "core app screens"], ["1", "patient journey end-to-end"], ["2", "capacity & supply views"]],
    screens: {
      dash: { blurb: "The clinician's daily home base — today's load at a glance.", bullets: ["Appointments and admissions summary", "Patient vitals / alerts highlights", "Operational trend charts"] },
      intake: { blurb: "Register a new patient with demographics and visit reason.", bullets: ["Multi-section intake form", "Insurance and contact capture", "Simulated submit with confirmation"] },
      scheduler: { blurb: "Book and visualize appointments on a provider/time grid.", bullets: ["Week grid by provider", "Slot status color coding", "Quick booking interactions"] },
      patients: { blurb: "Search and browse the full patient directory.", bullets: ["Searchable, filterable roster", "Status and condition badges", "Per-patient detail affordances"] },
      telehealth: { blurb: "Run remote consultations from a virtual visit suite.", bullets: ["Call-style consultation layout", "Visit notes panel", "Upcoming virtual visit queue"] },
      pharmacy: { blurb: "Track medication stock and dispensing.", bullets: ["Inventory levels with reorder flags", "Expiry and lot tracking cues", "Dispense activity list"] },
      wards: { blurb: "Monitor bed occupancy across wards in real time.", bullets: ["Occupancy by ward visualization", "Bed status indicators", "Capacity pressure warnings"] },
      billing: { blurb: "Manage claims and patient billing.", bullets: ["Claims list with payer status", "Outstanding balance views", "Invoice-level drill-down"] },
    },
  },
  devops: {
    tagline: "One pane of glass for deploys, incidents, security, and cloud spend",
    audience: "Platform, SRE, and DevOps teams",
    narrative:
      "StackOps mirrors the operate-and-respond loop: the ops dashboard surfaces system health, CI/CD pipelines ship changes, alerts and the incident board drive response, live logs support diagnosis, while feature flags, cloud costs, and IAM keep change, spend, and access under control.",
    stats: [["8", "core app screens"], ["3", "incident-response views"], ["3", "governance & cost views"]],
    screens: {
      dash: { blurb: "Fleet-wide health and activity in a single operational view.", bullets: ["Service health summary tiles", "Deploy and alert activity", "Resource utilization charts"] },
      deploys: { blurb: "Track CI/CD pipelines from commit to production.", bullets: ["Pipeline stages with status", "Per-environment deploy history", "Failure highlighting"] },
      alerts: { blurb: "Triage alerts and manage the on-call rotation.", bullets: ["Severity-sorted alert queue", "Acknowledge / resolve actions", "On-call schedule view"] },
      board: { blurb: "Run incidents on a lightweight kanban board.", bullets: ["Drag-style status columns", "Incident cards with severity", "Compact mobile-friendly layout"] },
      logs: { blurb: "Tail live logs with filtering for fast diagnosis.", bullets: ["Streaming log feed", "Level and service filters", "Monospace, scannable layout"] },
      flags: { blurb: "Control feature rollout with toggles and targeting.", bullets: ["Flag list with environments", "Toggle interactions", "Rollout percentage cues"] },
      costs: { blurb: "Watch cloud spend by service and trend.", bullets: ["Cost breakdown charts", "Month-over-month trend", "Anomaly callouts"] },
      iam: { blurb: "Audit identity, access, and security posture.", bullets: ["Role and permission matrix", "Access review list", "Security posture indicators"] },
    },
  },
  hrtech: {
    tagline: "Hire, onboard, and grow talent from a single workspace",
    audience: "Recruiting and people-operations teams",
    narrative:
      "TalentOS tells the talent lifecycle story: a role is published from the job posting form, candidates move across the pipeline, hires land in the onboarding center, internal mobility runs through the talent marketplace, and DEI analytics keeps the whole funnel honest.",
    stats: [["5", "core app screens"], ["1", "full hiring funnel"], ["1", "DEI analytics view"]],
    screens: {
      pipeline: { blurb: "The recruiter's command center — candidates by hiring stage.", bullets: ["Stage-by-stage candidate columns", "Candidate cards with role and score", "Stage conversion at a glance"] },
      jobpost: { blurb: "Compose and publish a new job posting.", bullets: ["Role, comp, and location fields", "Description editor", "Publish flow with confirmation"] },
      onboarding: { blurb: "Guide new hires through structured onboarding.", bullets: ["Task checklists per hire", "Progress tracking", "Document and equipment steps"] },
      talent: { blurb: "Match internal talent to open roles and gigs.", bullets: ["Skills-based opportunity cards", "Employee-to-role matching cues", "Apply / express-interest actions"] },
      dei: { blurb: "Measure diversity, equity, and inclusion across the funnel.", bullets: ["Representation breakdowns", "Funnel-stage equity charts", "Trend-over-time views"] },
    },
  },
  edtech: {
    tagline: "A complete teaching and learning loop for modern classrooms",
    audience: "Teachers, students, and school administrators",
    narrative:
      "LearnLab runs the teaching loop end to end: the learning dashboard tracks course progress, the virtual classroom hosts live sessions, checkpoint quizzes assess understanding, the grading matrix turns work into feedback, and the parent portal keeps families in the loop.",
    stats: [["5", "core app screens"], ["1", "live classroom experience"], ["2", "assessment views"]],
    screens: {
      dash: { blurb: "The student/teacher home — courses, progress, and what's next.", bullets: ["Course progress cards", "Upcoming sessions and deadlines", "Performance trend charts"] },
      classroom: { blurb: "Host live virtual classes with participants and materials.", bullets: ["Session layout with participant roster", "Shared materials panel", "In-class interaction cues"] },
      quiz: { blurb: "Take a checkpoint quiz with instant feedback.", bullets: ["Question-by-question flow", "Answer selection states", "Score summary on completion"] },
      grading: { blurb: "Grade student work across assignments in a matrix view.", bullets: ["Students × assignments grid", "Inline grade entry", "Class average highlights"] },
      parent: { blurb: "Keep parents informed of progress and school updates.", bullets: ["Child progress summaries", "Teacher message threads", "Announcements feed"] },
    },
  },
  retail: {
    tagline: "Run the whole store — POS, inventory, orders, and loyalty in one platform",
    audience: "Retail operators, store managers, and e-commerce teams",
    narrative:
      "RetailIQ follows goods from supplier to customer: the catalog and suppliers keep products stocked, inventory tracks every unit, the POS terminal and order center sell across counter and online channels, promotions and loyalty bring shoppers back, and the dashboard with store analytics keeps the operation honest.",
    stats: [["9", "core app screens"], ["2", "sales channels (POS + orders)"], ["3", "growth & insight views"]],
    screens: {
      dash: { blurb: "The operator's daily view — sales, stock, and store health at a glance.", bullets: ["Revenue and order summary tiles", "Sales trend charts", "Low-stock and activity highlights"] },
      pos: { blurb: "Ring up in-store sales on a touch-friendly terminal.", bullets: ["Product grid with cart building", "Totals with tax computation", "Checkout and payment flow"] },
      inventory: { blurb: "Track stock levels across products and locations.", bullets: ["Stock list with reorder flags", "Quantity and SKU detail", "Low-stock warnings"] },
      orders: { blurb: "Manage online and in-store orders through fulfillment.", bullets: ["Order queue with statuses", "Fulfillment stage tracking", "Per-order drill-down"] },
      promotions: { blurb: "Plan and run discounts and campaigns.", bullets: ["Active promotion list", "Discount rule configuration", "Campaign performance cues"] },
      loyalty: { blurb: "Reward repeat customers with points and tiers.", bullets: ["Member list with tiers", "Points balance tracking", "Reward redemption views"] },
      suppliers: { blurb: "Coordinate purchase orders with suppliers.", bullets: ["Supplier directory", "Purchase order statuses", "Lead-time and reliability cues"] },
      analytics: { blurb: "Understand store performance across metrics.", bullets: ["Sales by category charts", "Period comparisons", "Top-product breakdowns"] },
      catalog: { blurb: "Maintain the product catalog and pricing.", bullets: ["Product cards with imagery slots", "Price and variant fields", "Category organization"] },
    },
  },
  energy: {
    tagline: "An operating system for renewable energy producers — generation, trading, ESG, and investor reporting in one place",
    audience: "Renewable IPPs, asset managers, and energy funds",
    narrative:
      "Helios follows clean electrons from turbine to balance sheet: the generation dashboard and asset fleet show live output across solar, wind, and storage, energy trading and grid/storage turn megawatts into revenue, sustainability and carbon accounting prove the climate impact, and investor relations with portfolio analytics closes the loop back to the capital that financed it — while maintenance keeps the fleet producing.",
    stats: [["9", "core app screens"], ["2", "money-making flows (trading + storage)"], ["3", "ESG, carbon & investor views"]],
    screens: {
      dash: { blurb: "The control-room home — live generation across the whole portfolio.", bullets: ["Live output, generation, and availability tiles", "24h generation curve and source mix donut", "AI dispatch and O&M insights"] },
      assets: { blurb: "Browse and filter every solar, wind, and storage asset.", bullets: ["Searchable asset register with type filters", "Per-asset output vs. capacity and availability", "Online / degraded / fault / offline status"] },
      trading: { blurb: "Sell energy into day-ahead and spot markets and track PPAs.", bullets: ["Live price curve with peak callouts", "Interactive day-ahead bid builder", "PPA contracts with delivery and shortfall risk"] },
      storage: { blurb: "Dispatch grid-scale batteries against price and grid services.", bullets: ["State-of-charge trend and grid frequency", "Auto / charge / discharge / hold dispatch modes", "Ancillary-service market participation"] },
      sustainability: { blurb: "Prove the climate story with ESG scores and SDG alignment.", bullets: ["ESG scorecard by E/S/G pillar", "UN SDG alignment cards", "TCFD / GRI / CDP disclosure status"] },
      carbon: { blurb: "Account for carbon avoided and operational emissions.", bullets: ["CO₂-avoided trend and grid emission factor", "GHG Protocol Scope 1/2/3 breakdown", "REC and offset registry with audit trail"] },
      investors: { blurb: "Give LPs fund performance without operational controls.", bullets: ["NAV trend, IRR, and capital-deployed metrics", "Generation vs. budget yield", "Downloadable quarterly and ESG reports"] },
      maintenance: { blurb: "Turn faults into routed, trackable work orders.", bullets: ["Work-order queue with priority and crew", "Resolve / reopen interactions", "Field-crew status by region"] },
      analytics: { blurb: "Benchmark the portfolio across markets and technology.", bullets: ["Generation by market and technology mix", "Performance ratio and capacity factor", "Asset performance ranking"] },
    },
  },
  fossil: {
    tagline: "One control plane for integrated oil & gas — wellhead to refinery to trading floor",
    audience: "Upstream, midstream, and downstream oil & gas operators",
    narrative:
      "Vulcan follows the barrel across the value chain: the production dashboard and wells view show live field output, the refinery turns crude into product, commodity trading hedges the price, pipelines and logistics move it to market, and emissions, HSE, and reserves keep the operation compliant, safe, and economic.",
    stats: [["8", "core app screens"], ["3", "value-chain stages"], ["3", "safety & compliance views"]],
    screens: {
      dash: { blurb: "The operations home — live production across every field and stream.", bullets: ["Oil, gas, and uptime tiles", "24h production curve and stream-mix donut", "AI lift, emissions, and reservoir insights"] },
      wells: { blurb: "Browse and filter every well and active rig.", bullets: ["Searchable well register with type filters", "Per-well oil/gas rate, lift, and water cut", "Flowing / down / drilling / shut-in status"] },
      refinery: { blurb: "Run the refining complex and optimize the crude slate.", bullets: ["Crude-run trend and refining margin", "Interactive slate optimizer with yield impact", "Process-unit availability and turnarounds"] },
      trading: { blurb: "Hedge crude and gas exposure on the trading book.", bullets: ["Live WTI price curve and book mark-to-market", "Interactive forward hedge-ratio builder", "Open positions with VaR and margin"] },
      pipelines: { blurb: "Move barrels through pipelines, tanks, and tankers.", bullets: ["Throughput trend and line-pressure alarms", "Tank-farm inventory by product", "Cargo and batch movement schedule"] },
      emissions: { blurb: "Track flaring, methane, and CO₂e against the permits.", bullets: ["Methane intensity and flared-gas trend", "Emissions by source breakdown", "EPA Subpart W / OGMP 2.0 reporting status"] },
      hse: { blurb: "Manage process-safety events, permits, and incidents.", bullets: ["TRIR and Tier-1 PSE leading indicators", "Events and permit-to-work queue", "Barrier health and safety-culture metrics"] },
      reserves: { blurb: "See reserves, reserve life, and per-field economics.", bullets: ["1P/2P/3P reserves by basin and category", "Lifting and finding-&-dev cost metrics", "Netback economics and breakeven by field"] },
    },
  },
  renewable: {
    tagline: "Distributed solar, home batteries, and EVs — orchestrated into one virtual power plant",
    audience: "Solar installers, VPP aggregators, and community-solar providers",
    narrative:
      "Sunhive runs the rooftop revolution end to end: the fleet dashboard shows production across tens of thousands of homes, the install pipeline brings new sites online, the VPP and home-energy views turn batteries into dispatchable grid power, billing and subscribers keep customers saving, and field service plus carbon impact prove it all works.",
    stats: [["8", "core app screens"], ["1", "virtual power plant"], ["3", "customer & impact views"]],
    screens: {
      dash: { blurb: "The aggregate home — live production across the whole fleet.", bullets: ["Fleet production, battery, and VPP tiles", "Today's solar curve and energy-flow donut", "AI peak-positioning and O&M insights"] },
      pipeline: { blurb: "Move installs from survey to permission-to-operate.", bullets: ["Pipeline funnel by stage", "Per-project system, value, and cycle time", "Filterable job list"] },
      vpp: { blurb: "Dispatch thousands of home batteries as one plant.", bullets: ["Aggregate dispatch curve and event status", "Interactive fleet-discharge planner", "Grid-services market participation"] },
      home: { blurb: "Give each household control of its own energy.", bullets: ["Battery state-of-charge and consumption", "Self / VPP / time-of-use / backup modes", "EV charge scheduling and V2G"] },
      billing: { blurb: "Show net-metering credits and real bill savings.", bullets: ["Monthly net-bill trend with credits", "Bill breakdown including VPP earnings", "Downloadable energy statements"] },
      subscribers: { blurb: "Manage community-solar and rooftop subscribers.", bullets: ["Subscriber and garden program metrics", "Per-program subscription fill", "Open / full / pre-launch status"] },
      service: { blurb: "Route truck rolls and keep sites producing.", bullets: ["Service ticket queue with priority", "Resolve / reopen interactions", "Field-crew status by region"] },
      impact: { blurb: "Prove the climate and savings story for the fleet.", bullets: ["CO₂-avoided trend and impact sources", "Collective member savings and peak cut", "Real-world equivalents"] },
    },
  },
  nuclear: {
    tagline: "Operations and safety for nuclear fleets — reactors, fuel, radiation, and outages in one place",
    audience: "Nuclear fleet operators, utilities, and SMR developers",
    narrative:
      "Atria runs the highest-stakes generation on the grid: the control-room dashboard and units view show live reactor state, fuel-cycle and safety-systems track material and barriers, radiation and outage planning manage dose and refueling, and regulatory plus grid views keep the license defensible and the carbon-free baseload flowing.",
    stats: [["8", "core app screens"], ["18", "units across 9 sites"], ["3", "safety & compliance views"]],
    screens: {
      dash: { blurb: "The control-room home — live reactor power across the fleet.", bullets: ["Fleet output, capacity factor, and LCO tiles", "Reactor thermal-power curve and unit-mode donut", "AI reactivity and safety-system insights"] },
      units: { blurb: "Browse every reactor unit and its live state.", bullets: ["Searchable register with PWR/BWR/SMR filters", "Per-unit power, coolant temp, and capacity", "At-power / tripped / refueling / standby status"] },
      fuel: { blurb: "Account for every fuel assembly across the cycle.", bullets: ["Assembly burnup by batch", "Fuel inventory by location (core / pool / cask)", "Fuel movements and IAEA safeguards ledger"] },
      safety: { blurb: "Confirm engineered safety systems and tech-spec limits.", bullets: ["Safety-system operability by train", "Active Limiting Conditions with action timers", "Barrier health and safety availability"] },
      radiation: { blurb: "Manage dose, area monitors, and effluent releases.", bullets: ["Collective dose vs. ALARA budget", "Area radiation zones and work-permit holds", "Gaseous and liquid effluent vs. limits"] },
      outage: { blurb: "Plan and execute the refueling outage critical path.", bullets: ["Outage-day and critical-path progress", "Phase checklist from defuel to restart", "Work-order burn-down to restart date"] },
      regulatory: { blurb: "Keep the license and commitments defensible.", bullets: ["License status and open NRC items", "LERs, amendments, and corrective actions", "Regulatory-program compliance status"] },
      grid: { blurb: "Show carbon-free baseload delivered to the grid.", bullets: ["Fleet generation trend and capacity factor", "Clean-firm-power impact metrics", "Grid contribution by unit"] },
    },
  },
};
