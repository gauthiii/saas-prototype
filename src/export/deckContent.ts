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
};
