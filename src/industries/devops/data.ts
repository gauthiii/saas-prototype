// src/industries/devops/data.ts — StackOps extension content (shared pages + archetype extension screens).
// The hand-coded module src/domains/devops.tsx owns meta / extra / story. Fictional people, services and figures.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "Your organisation", description: "Tell us about your engineering team so StackOps can set sensible defaults.", fields: [
          { label: "Organisation name", type: "text", placeholder: "Ridgeway Labs", half: true },
          { label: "Engineers", type: "select", options: ["1–20", "21–100", "101–500", "500+"], half: true },
          { label: "Primary environment", type: "radio", options: ["Container cluster", "Virtual machines", "Serverless", "Hybrid"] },
        ] },
        { title: "Connect your code and cloud", description: "We'll import repositories, pipelines and billing data.", fields: [
          { label: "Source control host", type: "select", options: ["Hosted git service", "Self-managed git server"], half: true },
          { label: "Cloud billing export", type: "toggle", value: "true" },
          { label: "Import last 90 days of deploys", type: "toggle", value: "true" },
        ] },
        { title: "Set up on-call", description: "Create your first rotation and escalation policy.", fields: [
          { label: "Rotation name", type: "text", placeholder: "platform-primary", half: true },
          { label: "Handover", type: "select", options: ["Mon 09:00", "Thu 09:00", "Daily 09:00"], half: true },
          { label: "Escalate after", type: "radio", options: ["5 minutes", "10 minutes", "15 minutes"] },
        ] },
        { title: "Invite your team", description: "Everyone gets a role from the permission matrix.", fields: [
          { label: "Emails", type: "textarea", placeholder: "one email per line" },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Admin", description: "Full control of the workspace, secrets and IAM.", permissions: ["Deploy to production", "Manage secrets", "IAM and billing"] },
        { name: "SRE", description: "Owns reliability, alerting and incident response.", permissions: ["Configure alerts and rotations", "Approve production readiness", "Run postmortems"] },
        { name: "Developer", description: "Ships services through the pipeline.", permissions: ["Deploy to staging", "Read logs", "Book shared environments"] },
        { name: "Viewer", description: "Read-only access for stakeholders and finance.", permissions: ["Read logs and dashboards", "View billing"] },
      ],
      members: [
        { name: "Yuki Tanaka", email: "yuki@ridgewaylabs.example", role: "Admin", status: "Active", lastActive: "Just now" },
        { name: "Rohan Mehta", email: "rohan@ridgewaylabs.example", role: "SRE", status: "Active", lastActive: "3 min ago" },
        { name: "Tessa Walsh", email: "tessa@ridgewaylabs.example", role: "SRE", status: "Active", lastActive: "20 min ago" },
        { name: "Sun-hee Kim", email: "sunhee@ridgewaylabs.example", role: "Developer", status: "Active", lastActive: "1 h ago" },
        { name: "Luis Ortiz", email: "luis@ridgewaylabs.example", role: "Developer", status: "Active", lastActive: "Yesterday" },
        { name: "Amara Diallo", email: "amara@ridgewaylabs.example", role: "Admin", status: "Active", lastActive: "2 h ago" },
        { name: "Nadia Petrov", email: "nadia@ridgewaylabs.example", role: "Viewer", status: "Invited", lastActive: "—" },
      ],
    },
    billing: {
      plan: "Team", price: "$99 / month + usage", renews: "Nov 9, 2026", paymentMethod: "Corporate card ending 2290",
      usage: [
        { label: "Services", used: 41, limit: 50, unit: "services" },
        { label: "Pipeline minutes", used: 38200, limit: 50000, unit: "min" },
        { label: "Log ingest", used: 1.6, limit: 2, unit: "TB" },
        { label: "On-call seats", used: 14, limit: 20, unit: "seats" },
      ],
      invoices: [
        { id: "SO-2026-1009", date: "Oct 9, 2026", amount: "$1,284.00", status: "Due" },
        { id: "SO-2026-0909", date: "Sep 9, 2026", amount: "$1,196.50", status: "Paid" },
        { id: "SO-2026-0809", date: "Aug 9, 2026", amount: "$1,142.00", status: "Paid" },
        { id: "SO-2026-0709", date: "Jul 9, 2026", amount: "$1,090.00", status: "Paid" },
      ],
    },
    inbox: {
      threads: [
        { name: "Rohan Mehta", preview: "INC-311 postmortem draft is ready for review.", time: "10:20", avatar: "Rohan Mehta", unread: 2, tag: "Postmortem" },
        { name: "Sun-hee Kim", preview: "Can I take perf-lab Thursday for the checkout load test?", time: "9:12", avatar: "Sun-hee Kim", unread: 1, tag: "Env" },
        { name: "Amara Diallo", preview: "Access review for the platform team is due in 5 days.", time: "Yesterday", avatar: "Amara Diallo", tag: "IAM" },
        { name: "StackOps release bot", preview: "api-gateway v2.41.0 rolled out to production.", time: "Mon", avatar: "🤖" },
      ],
      messages: [
        { from: "them", text: "INC-311 postmortem draft is up. Root cause is the unbounded cache in checkout-svc v2.31.0.", time: "10:12" },
        { from: "me", text: "Thanks Rohan. Did we capture why the heap alert took 14 minutes to page?", time: "10:15" },
        { from: "them", text: "Yes — the threshold was 85% for 10m. Action item to add a growth-rate alert is assigned to Tessa.", time: "10:18" },
        { from: "me", text: "Perfect. Let's review it in Thursday's reliability sync.", time: "10:20" },
      ],
    },
    search: {
      query: "checkout",
      facets: ["Service", "Incident", "Deploy", "Runbook"],
      results: [
        { type: "Service", title: "checkout-svc", snippet: "Tier 1 · owner Payments team · 12 pods · readiness 92%", meta: "Last deploy v2.31.2 · 2 h ago" },
        { type: "Incident", title: "INC-311 — checkout-svc OOM restarts", snippet: "P1 · resolved by rollback · postmortem in review", meta: "Rohan Mehta · Oct 20" },
        { type: "Deploy", title: "checkout-svc v2.31.2", snippet: "Canary 5% → full rollout · integration tests running", meta: "prod-east · today" },
        { type: "Runbook", title: "checkout-svc memory pressure", snippet: "Check heap dashboards, cap cache size, roll back if growth > 4%/h", meta: "Updated Oct 20" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 2, title: "On-call handover — L. Ortiz", tone: "blue", time: "9:00 AM" },
        { date: 5, title: "INC-311 postmortem review", tone: "amber", time: "11:00 AM" },
        { date: 9, title: "Cluster upgrade — staging", tone: "violet", time: "7:00 AM" },
        { date: 12, title: "Quarterly IAM access review", tone: "gray", time: "All day" },
        { date: 16, title: "Cluster upgrade — production", tone: "violet", time: "6:00 AM" },
        { date: 18, title: "Game day — region failover", tone: "amber", time: "2:00 PM" },
        { date: 23, title: "Peak-season deploy freeze", tone: "red", time: "All day" },
        { date: 30, title: "Cloud budget review", tone: "green", time: "3:00 PM" },
      ],
    },
    reports: {
      reports: [
        { name: "DORA metrics", description: "Deploy frequency, lead time, change failure rate and MTTR by team.", category: "Delivery", updated: "Today", format: "PDF", owner: "Yuki Tanaka", schedule: "Weekly" },
        { name: "Incident summary", description: "Incidents by severity, service and time to resolve.", category: "Reliability", updated: "Yesterday", format: "XLSX", owner: "Rohan Mehta", schedule: "Weekly" },
        { name: "Postmortem action items", description: "Open and overdue follow-ups from every postmortem.", category: "Reliability", updated: "Today", format: "CSV", owner: "Tessa Walsh", schedule: "Daily" },
        { name: "Cloud cost by team", description: "Spend by tag, team and environment with forecast.", category: "FinOps", updated: "Oct 20", format: "XLSX", owner: "Luis Ortiz", schedule: "Monthly" },
        { name: "Access review evidence", description: "Grants reviewed, revoked and approved per quarter.", category: "Security", updated: "Oct 15", format: "PDF", owner: "Amara Diallo" },
        { name: "Environment utilisation", description: "Booked vs. idle hours for shared test environments.", category: "Delivery", updated: "Oct 19", format: "CSV", owner: "Sun-hee Kim", schedule: "Weekly" },
      ],
    },
    states: { noun: "services", emptyTitle: "No services registered", emptyBody: "Register a service to track its owners, pipelines, alerts and production readiness in one place.", emptyAction: "Register a service" },
  },
  screens: {
    services: {
      blurb: "Every service the organisation runs, with owner, tier and production-readiness score.",
      bullets: ["Filter by Tier 1, Tier 2, Internal or Deprecated", "Owner, runtime and on-call per service", "Readiness score bar on every card"],
      subtitle: "41 services · bar shows production-readiness score",
      filters: ["Tier 1", "Tier 2", "Internal", "Deprecated"],
      primaryAction: "Register service",
      items: [
        { name: "checkout-svc", subtitle: "Payments team · JVM · 12 pods", emoji: "🛒", badge: "Incident", tone: "red", meta: "On-call: Rohan Mehta", stock: 92, category: "Tier 1" },
        { name: "api-gateway", subtitle: "Platform team · Go · 18 pods", emoji: "🚪", badge: "Healthy", tone: "green", meta: "On-call: Tessa Walsh", stock: 97, category: "Tier 1" },
        { name: "auth-api", subtitle: "Identity team · Go · 8 pods", emoji: "🔐", badge: "Healthy", tone: "green", meta: "On-call: Amara Diallo", stock: 95, category: "Tier 1" },
        { name: "edge-gw-3", subtitle: "Platform team · edge proxy · 3 nodes", emoji: "🌐", badge: "Degraded", tone: "amber", meta: "On-call: Tessa Walsh", stock: 81, category: "Tier 1" },
        { name: "search-idx", subtitle: "Discovery team · JVM · 6 pods", emoji: "🔎", meta: "On-call: Sun-hee Kim", stock: 78, category: "Tier 2" },
        { name: "billing-cron", subtitle: "Finance eng · Python · scheduled jobs", emoji: "🧾", meta: "On-call: Luis Ortiz", stock: 74, category: "Tier 2" },
        { name: "notify-worker", subtitle: "Growth team · JavaScript · 4 pods", emoji: "📨", badge: "Needs review", tone: "violet", meta: "On-call: Luis Ortiz", stock: 58, category: "Tier 2" },
        { name: "deploy-bot", subtitle: "Platform team · internal tooling", emoji: "🤖", meta: "On-call: Rohan Mehta", stock: 66, category: "Internal" },
        { name: "legacy-reports", subtitle: "Finance eng · VM-based · retiring Dec 2026", emoji: "🗄️", badge: "Deprecated", tone: "gray", meta: "No on-call", stock: 31, category: "Deprecated" },
      ],
    },
    readiness: {
      blurb: "The production-readiness review a service must pass before it takes Tier 1 traffic.",
      bullets: ["Observability, resilience, security and operations groups", "Critical items block launch", "Owner and due date for each check"],
      subtitle: "notify-worker · promotion from Tier 2 to Tier 1 · review Nov 5",
      summary: "11 of 18 checks complete · 3 critical items outstanding",
      groups: [
        { title: "Observability", items: [
          { label: "Golden-signal dashboard (latency, traffic, errors, saturation)", done: true, owner: "Luis Ortiz", due: "Oct 22" },
          { label: "Structured logs shipped to the log viewer", done: true, owner: "Luis Ortiz", due: "Oct 22" },
          { label: "SLO defined with burn-rate alerts", done: false, owner: "Tessa Walsh", due: "Oct 28", critical: true },
          { label: "Deploy markers on all dashboards", done: true, owner: "deploy-bot", due: "Oct 20" },
        ] },
        { title: "Resilience", items: [
          { label: "Runs in at least 3 zones with pod disruption budget", done: true, owner: "Rohan Mehta", due: "Oct 24" },
          { label: "Load test at 3× peak traffic in perf-lab", done: false, owner: "Sun-hee Kim", due: "Oct 29", critical: true },
          { label: "Timeouts and retries with backoff on every dependency", done: true, owner: "Luis Ortiz", due: "Oct 23" },
          { label: "Graceful shutdown drains in-flight messages", done: false, owner: "Luis Ortiz", due: "Oct 30" },
          { label: "Rollback tested through the pipeline", done: true, owner: "Rohan Mehta", due: "Oct 21" },
        ] },
        { title: "Security", items: [
          { label: "Secrets loaded from the vault, none in env files", done: true, owner: "Amara Diallo", due: "Oct 20" },
          { label: "Least-privilege service account reviewed", done: false, owner: "Amara Diallo", due: "Oct 27", critical: true },
          { label: "Dependency scan with no critical findings", done: true, owner: "Luis Ortiz", due: "Oct 21" },
          { label: "Feature flags default to safe values", done: true, owner: "Sun-hee Kim", due: "Oct 22" },
        ] },
        { title: "Operations", items: [
          { label: "Added to primary on-call rotation", done: false, owner: "Tessa Walsh", due: "Nov 2" },
          { label: "Runbook for top 5 alerts", done: false, owner: "Luis Ortiz", due: "Nov 2" },
          { label: "Cost tags applied (team, env, service)", done: true, owner: "Luis Ortiz", due: "Oct 21" },
          { label: "Monthly budget alert configured", done: false, owner: "Luis Ortiz", due: "Nov 3" },
          { label: "Escalation contacts listed in the catalog", done: true, owner: "Tessa Walsh", due: "Oct 22" },
        ] },
      ],
    },
    postmortems: {
      blurb: "Every incident's blameless postmortem, from draft to closed action items.",
      bullets: ["Stage stepper from draft to closed", "Due date for the next milestone", "Event log of reviews and action items"],
      subtitle: "Postmortems for P1 and P2 incidents · last 30 days",
      items: [
        { id: "INC-311", title: "checkout-svc OOM restarts", subtitle: "P1 · 38 min customer impact · author Rohan Mehta", steps: ["Draft", "In review", "Actions assigned", "Actions done", "Closed"], current: 1, eta: "Review Nov 5", status: "In review", tone: "amber", events: [
          { time: "Today 10:12", text: "Draft shared: unbounded cache in v2.31.0 grew heap ~4% per hour" },
          { time: "Oct 20 15:02", text: "Mitigated by rollback to v2.30.4" },
          { time: "Oct 20 14:16", text: "Paged primary on-call after heap > 85% for 10m" },
        ] },
        { id: "INC-308", title: "edge-gw-3 flapping health probe", subtitle: "P2 · 63% of last week's pages · author Tessa Walsh", steps: ["Draft", "In review", "Actions assigned", "Actions done", "Closed"], current: 2, eta: "Actions due Oct 30", status: "Actions open", tone: "blue", events: [
          { time: "Oct 19", text: "3 action items assigned: probe timeout, threshold tuning, node replacement" },
          { time: "Oct 17", text: "Review held with Platform team" },
          { time: "Oct 15", text: "Draft published" },
        ] },
        { id: "INC-305", title: "Expired certificate on internal registry", subtitle: "P2 · pipelines blocked for 52 min · author Luis Ortiz", steps: ["Draft", "In review", "Actions assigned", "Actions done", "Closed"], current: 3, eta: "Close Oct 23", status: "Verifying", tone: "violet", events: [
          { time: "Oct 18", text: "Automated renewal deployed; 30-day expiry alert added" },
          { time: "Oct 12", text: "Actions assigned to Platform team" },
        ] },
        { id: "INC-301", title: "Cert rotation failure on billing-cron", subtitle: "P2 · invoice batch delayed 2 h · author Sun-hee Kim", steps: ["Draft", "In review", "Actions assigned", "Actions done", "Closed"], current: 4, eta: "Closed Oct 14", status: "Closed", tone: "green", events: [
          { time: "Oct 14", text: "All 4 action items verified and postmortem closed" },
          { time: "Oct 6", text: "Review held; runbook updated" },
        ] },
      ],
    },
    envs: {
      blurb: "Reserve shared pre-production environments so load tests and demos never collide.",
      bullets: ["Pick an environment with its capacity and data", "Choose a date and time slot", "Auto-teardown and cost shown before confirming"],
      subtitle: "Shared environments · auto-reset after each booking",
      confirmLabel: "Book environment",
      resources: [
        { name: "perf-lab", meta: "48 nodes · production-sized · synthetic traffic generator", price: "$38 / h", emoji: "🏎️", tags: ["Load testing", "Approval needed"] },
        { name: "staging-2", meta: "Full stack · anonymised production snapshot", price: "$12 / h", emoji: "🧪", tags: ["Integration", "Demos"] },
        { name: "chaos-sandbox", meta: "Isolated cluster with fault injection enabled", price: "$9 / h", emoji: "🌪️", tags: ["Game days"] },
        { name: "preview-pool", meta: "Ephemeral per-branch environments · 10 slots", price: "$3 / h", emoji: "🌿", tags: ["Pull requests"] },
      ],
      dates: ["Mon Oct 26", "Tue Oct 27", "Wed Oct 28", "Thu Oct 29", "Fri Oct 30"],
      slots: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
      unavailable: ["10:00", "14:00"],
      summary: [
        { label: "Environment", value: "perf-lab" },
        { label: "Window", value: "Thu Oct 29 · 16:00–20:00" },
        { label: "Estimated cost", value: "$152" },
        { label: "Purpose", value: "notify-worker 3× peak load test" },
      ],
      policy: "Bookings over 4 hours or in perf-lab need SRE approval. Environments are reset to the latest snapshot when the booking ends, and idle bookings are released after 30 minutes.",
    },
  },
});
