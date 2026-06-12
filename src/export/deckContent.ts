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
};
