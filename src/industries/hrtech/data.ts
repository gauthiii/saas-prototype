// src/industries/hrtech/data.ts — TalentOS extension content (shared pages + archetype extension screens).
// The hand-coded module src/domains/hrtech.tsx owns meta / extra / story. Fictional people, places and figures.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "Your company", description: "Tell us about your hiring so TalentOS can set up pipelines and scorecards.", fields: [
          { label: "Company name", type: "text", placeholder: "Northwind Labs", half: true },
          { label: "Careers page URL", type: "text", placeholder: "careers.northwindlabs.example", half: true },
          { label: "Hires planned this year", type: "radio", options: ["Under 25", "25–100", "100–500", "500+"] },
        ] },
        { title: "Hiring workflow", description: "Start from a proven pipeline and interview kit, then make it yours.", fields: [
          { label: "Default pipeline", type: "select", options: ["Engineering (6 stages)", "Design (5 stages)", "Go-to-market (5 stages)", "Hourly (3 stages)"] },
          { label: "Require structured scorecards", type: "toggle", value: "true" },
          { label: "Anonymize resumes in early stages", type: "toggle", value: "true" },
        ] },
        { title: "Connect your tools", description: "Sync calendars and your HRIS so interviews and new hires flow automatically.", fields: [
          { label: "Calendar", type: "select", options: ["Cloud calendar", "On-premises calendar", "Other CalDAV"], half: true },
          { label: "HRIS sync", type: "select", options: ["SCIM", "Nightly CSV", "Not now"], half: true },
          { label: "Syndicate jobs to 50+ boards", type: "toggle", value: "true" },
        ] },
        { title: "Invite your hiring team", description: "Recruiters, hiring managers and interviewers each get the right access.", fields: [
          { label: "Emails", type: "textarea", placeholder: "one email per line" },
          { label: "Default role", type: "radio", options: ["Recruiter", "Hiring manager", "Interviewer"] },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Talent admin", description: "Owns the hiring workspace, templates and compliance settings.", permissions: ["Manage pipelines and scorecards", "Approve offers and requisitions", "Billing, SSO and integrations"] },
        { name: "Recruiter", description: "Runs searches end to end.", permissions: ["Source and advance candidates", "Schedule interviews", "Draft offers"] },
        { name: "Hiring manager", description: "Owns open roles on their team.", permissions: ["Open requisitions", "Review scorecards", "Make hire decisions"] },
        { name: "Interviewer", description: "Joins interview loops.", permissions: ["View assigned candidates", "Submit scorecards", "See interview kits"] },
      ],
      members: [
        { name: "Priya Natarajan", email: "priya.natarajan@northwindlabs.example", role: "Talent admin", status: "Active", lastActive: "Just now" },
        { name: "Jordan Ellis", email: "jordan.ellis@northwindlabs.example", role: "Recruiter", status: "Active", lastActive: "8 min ago" },
        { name: "Aiko Tanaka", email: "aiko.tanaka@northwindlabs.example", role: "Recruiter", status: "Active", lastActive: "1 h ago" },
        { name: "Ben Okafor", email: "ben.okafor@northwindlabs.example", role: "Hiring manager", status: "Active", lastActive: "25 min ago" },
        { name: "Sofia Lindqvist", email: "sofia.lindqvist@northwindlabs.example", role: "Hiring manager", status: "Active", lastActive: "Yesterday" },
        { name: "Ravi Shah", email: "ravi.shah@northwindlabs.example", role: "Interviewer", status: "Active", lastActive: "3 h ago" },
        { name: "Kwame Osei", email: "kwame.osei@northwindlabs.example", role: "Interviewer", status: "Invited", lastActive: "—" },
      ],
    },
    billing: {
      plan: "Growth", price: "$129 / month", renews: "Nov 9, 2026", paymentMethod: "Card ending 5518",
      usage: [
        { label: "Open roles", used: 38, limit: 50, unit: "roles" },
        { label: "Job board postings", used: 214, limit: 300, unit: "postings" },
        { label: "Candidate SMS", used: 3120, limit: 5000, unit: "messages" },
        { label: "Interview kit templates", used: 22, limit: 40, unit: "kits" },
      ],
      invoices: [
        { id: "TOS-2026-1009", date: "Oct 9, 2026", amount: "$129.00", status: "Paid" },
        { id: "TOS-2026-0909", date: "Sep 9, 2026", amount: "$129.00", status: "Paid" },
        { id: "TOS-2026-0809", date: "Aug 9, 2026", amount: "$129.00", status: "Paid" },
        { id: "TOS-2026-0709", date: "Jul 9, 2026", amount: "$129.00", status: "Paid" },
      ],
    },
    inbox: {
      threads: [
        { name: "Ben Okafor", preview: "Let's move Priya Nair to onsite this week.", time: "9:44", avatar: "Ben Okafor", unread: 2, tag: "Platform" },
        { name: "Jordan Ellis", preview: "Carlos countered at $118K — band max is $121K.", time: "9:10", avatar: "Jordan Ellis", unread: 1, tag: "Offer" },
        { name: "Sofia Lindqvist", preview: "Two scorecards still missing from Yuki's panel.", time: "Yesterday", avatar: "Sofia Lindqvist", tag: "Design" },
        { name: "TalentOS Compliance", preview: "Annual bias audit report is ready to publish.", time: "Mon", avatar: "⚖️", tag: "Audit" },
      ],
      messages: [
        { from: "them", text: "Priya Nair's technical screen was the strongest we've had this quarter. Can we get her onsite this week?", time: "9:38" },
        { from: "me", text: "Yes — Ravi and Kwame are free Thursday afternoon. I'll send her a self-scheduling link for Thursday or Friday.", time: "9:41" },
        { from: "them", text: "Great. Please add the system design module to the loop.", time: "9:43" },
        { from: "me", text: "Done. Kit updated and interviewers notified.", time: "9:44" },
      ],
    },
    search: {
      query: "platform engineer",
      facets: ["Candidate", "Job", "Employee", "Document"],
      results: [
        { type: "Job", title: "Platform Engineer — REQ-1038", snippet: "Platform · Remote (US) · 64 applicants · 3 in onsite", meta: "Hiring manager Ben Okafor" },
        { type: "Candidate", title: "Priya Nair", snippet: "Technical screen 94/100 · 7 yrs · infrastructure and React", meta: "Onsite Thu Oct 29" },
        { type: "Employee", title: "Ravi Shah — Staff Platform Engineer", snippet: "Interviewer for system design · 41 interviews this year", meta: "Platform team" },
        { type: "Document", title: "Platform Engineer interview kit v4.pdf", snippet: "Coding, system design and values modules with rubrics", meta: "Updated Oct 12" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 2, title: "Nadia Hussain start date", tone: "green", time: "9:00 AM" },
        { date: 4, title: "Campus hiring fair", tone: "blue", time: "10:00 AM" },
        { date: 9, title: "Q1 headcount plan due", tone: "amber" },
        { date: 10, title: "Hiring manager training", tone: "violet", time: "2:00 PM" },
        { date: 16, title: "New hire orientation", tone: "green", time: "9:00 AM" },
        { date: 18, title: "Offer approval committee", tone: "amber", time: "11:00 AM" },
        { date: 20, title: "Bias audit published", tone: "gray" },
        { date: 24, title: "Recruiting pipeline review", tone: "blue", time: "3:00 PM" },
      ],
    },
    reports: {
      reports: [
        { name: "Pipeline velocity", description: "Days in each stage and conversion by role and source.", category: "Recruiting", updated: "Today", format: "XLSX", owner: "Jordan Ellis", schedule: "Weekly" },
        { name: "Offer acceptance", description: "Offers made, accepted and declined with decline reasons.", category: "Recruiting", updated: "Yesterday", format: "PDF", owner: "Priya Natarajan", schedule: "Monthly" },
        { name: "Interviewer load", description: "Interviews and scorecard timeliness by interviewer.", category: "Interviewing", updated: "Oct 19", format: "CSV", owner: "Aiko Tanaka" },
        { name: "Headcount plan vs. actual", description: "Approved, filled and open requisitions by department.", category: "Planning", updated: "Oct 15", format: "XLSX", owner: "Priya Natarajan", schedule: "Monthly" },
        { name: "EEO-1 applicant flow", description: "Voluntary self-identification by stage for adverse-impact review.", category: "Compliance", updated: "Oct 1", format: "PDF", owner: "Priya Natarajan", schedule: "Quarterly" },
        { name: "Source of hire", description: "Hires by referral, job board, sourcing and agency.", category: "Recruiting", updated: "Oct 1", format: "CSV", owner: "Jordan Ellis" },
      ],
    },
    states: { noun: "candidates", emptyTitle: "No candidates yet", emptyBody: "Publish a job posting or import candidates to start building your pipeline.", emptyAction: "Create job posting" },
  },
  screens: {
    interviews: {
      blurb: "Every interview loop for the week on one grid, with panels and rooms already balanced.",
      bullets: ["Phone screens, technical rounds and onsites by day", "Panel and candidate on each block", "Self-scheduling links fill gaps automatically"],
      subtitle: "Northwind Labs · all open roles · times in Pacific Time",
      weekLabel: "Oct 26 – 30, 2026",
      days: ["Mon 26", "Tue 27", "Wed 28", "Thu 29", "Fri 30"],
      startHour: 8, endHour: 18,
      legend: [{ label: "Recruiter screen", tone: "gray" }, { label: "Technical", tone: "blue" }, { label: "Onsite loop", tone: "violet" }, { label: "Debrief", tone: "amber" }, { label: "Offer call", tone: "green" }],
      events: [
        { day: 0, start: 9, end: 9.5, title: "Screen — Lena Kowalski", meta: "Product Designer · Aiko", tone: "gray" },
        { day: 0, start: 11, end: 12, title: "Technical — Omar Hamdan", meta: "Platform Engineer · Ravi", tone: "blue" },
        { day: 0, start: 15, end: 15.5, title: "Offer call — Carlos Vega", meta: "Data Analyst · Jordan", tone: "green" },
        { day: 1, start: 10, end: 14, title: "Onsite — Yuki Sato", meta: "Product Designer · 4 interviewers", tone: "violet" },
        { day: 1, start: 16, end: 16.5, title: "Debrief — Yuki Sato", meta: "Sofia + panel", tone: "amber" },
        { day: 2, start: 9, end: 10, title: "Technical — Diego Morales", meta: "Platform Engineer · Kwame", tone: "blue" },
        { day: 2, start: 13, end: 13.5, title: "Screen — Hannah Brandt", meta: "Staff Data Engineer · Jordan", tone: "gray" },
        { day: 3, start: 13, end: 17, title: "Onsite — Priya Nair", meta: "Platform Engineer · system design added", tone: "violet" },
        { day: 4, start: 10, end: 10.5, title: "Debrief — Priya Nair", meta: "Ben + panel", tone: "amber" },
        { day: 4, start: 14, end: 15, title: "Technical — Tobias Wren", meta: "Engineering Manager · Ben", tone: "blue" },
      ],
    },
    scorecards: {
      blurb: "Structured interview scores side by side, weighted by the competencies the role needs most.",
      bullets: ["One score per competency per candidate", "Weights from the role's interview kit", "Hire recommendation badge from the panel"],
      subtitle: "Platform Engineer · REQ-1038 · onsite and technical rounds",
      criteria: ["System design", "Coding", "Problem solving", "Communication", "Values alignment"],
      weights: [30, 25, 20, 15, 10],
      entities: [
        { name: "Priya Nair", subtitle: "Technical screen · onsite Oct 29", scores: [93, 95, 92, 88, 90], trend: "+4", badge: "Strong hire" },
        { name: "Omar Hamdan", subtitle: "Onsite complete · 4 of 4 scorecards", scores: [84, 88, 82, 79, 86], trend: "+1", badge: "Hire" },
        { name: "Diego Morales", subtitle: "Technical round · Oct 28", scores: [72, 80, 76, 74, 82], trend: "0", badge: "Leaning hire" },
        { name: "Grace Liu", subtitle: "Onsite complete · 3 of 4 scorecards", scores: [78, 70, 74, 85, 80], trend: "−2", badge: "Mixed" },
        { name: "Mateo Fernández", subtitle: "Onsite complete · 4 of 4 scorecards", scores: [61, 74, 66, 70, 72], trend: "−5", badge: "No hire" },
        { name: "Anika Bose", subtitle: "Internal transfer · Payments", scores: [86, 82, 85, 90, 94], trend: "+3", badge: "Hire" },
      ],
    },
    offers: {
      blurb: "Offers and exceptions waiting for approval before they go out to candidates.",
      bullets: ["Base, equity and band position on every offer", "Exceptions above band flagged for review", "Approve or send back with comments"],
      subtitle: "Offers awaiting Talent admin and finance approval",
      approveLabel: "Approve offer", rejectLabel: "Send back",
      stats: [
        { label: "Offers pending", value: "5", delta: "2 above band", tone: "amber" },
        { label: "Acceptance rate (90d)", value: "84%", delta: "+6 pts", tone: "green" },
        { label: "Avg time to approve", value: "1.4 days", delta: "−0.8 days" },
      ],
      items: [
        { title: "Carlos Vega — Data Analyst", subtitle: "Analytics · Phoenix · hiring manager Mei Tan", amount: "$118,000", priority: "High", age: "4 h", tags: ["Counter offer", "Band 92%"], detail: "Candidate countered from $110,000 to $118,000, citing a competing offer. Band for Analyst II in Phoenix is $96K – $121K. Recommend approving with a 21-day start." },
        { title: "Priya Nair — Platform Engineer", subtitle: "Platform · Remote (US) · hiring manager Ben Okafor", amount: "$172,000 + 4,000 RSUs", priority: "High", age: "6 h", tags: ["Pre-approval", "Band 88%"], detail: "Pre-approval requested ahead of Thursday's onsite to move within 24 hours of a strong debrief. Candidate is in final rounds elsewhere." },
        { title: "Yuki Sato — Product Designer", subtitle: "Design · Seattle · hiring manager Sofia Lindqvist", amount: "$148,000", priority: "Medium", age: "1 day", tags: ["Band 96%"], detail: "Offer at the top of the Designer III band. Two scorecards still missing from the onsite panel — approve conditional on complete feedback." },
        { title: "Tobias Wren — Engineering Manager", subtitle: "Payments · Austin · hiring manager VP Engineering", amount: "$205,000", priority: "Medium", age: "2 days", tags: ["Above band", "Sign-on $20K"], detail: "Base is 4% above the M2 band maximum to offset forfeited bonus. Finance approval required for the exception and sign-on bonus." },
        { title: "Hannah Brandt — Staff Data Engineer", subtitle: "Analytics · Remote (US) · referral from K. Osei", amount: "$196,000", priority: "Low", age: "3 days", tags: ["Referral bonus"], detail: "Referral bonus of $5,000 to be paid to the referrer after 90 days. Offer within band; awaiting final reference check." },
      ],
    },
    reqs: {
      blurb: "Every requisition tracked from approval through to a signed offer and start date.",
      bullets: ["Stage stepper per requisition", "Days open and target fill date", "Event log of approvals and pipeline milestones"],
      subtitle: "Q4 2026 requisitions · 38 open",
      items: [
        { id: "REQ-1038", title: "Platform Engineer", subtitle: "Platform · Ben Okafor · Remote (US)", steps: ["Approved", "Posted", "Interviewing", "Offer", "Filled"], current: 2, eta: "Target fill Nov 20", status: "Interviewing", tone: "blue", events: [
          { time: "Today 9:44", text: "Priya Nair advanced to onsite" },
          { time: "Oct 14", text: "64th applicant · 3 candidates in final rounds" },
          { time: "Sep 22", text: "Posted to careers page and 52 job boards" },
        ] },
        { id: "REQ-1041", title: "Data Analyst", subtitle: "Analytics · Mei Tan · Phoenix", steps: ["Approved", "Posted", "Interviewing", "Offer", "Filled"], current: 3, eta: "Target fill Nov 6", status: "Offer out", tone: "amber", events: [
          { time: "Today 9:10", text: "Carlos Vega countered at $118,000" },
          { time: "Oct 19", text: "Verbal offer extended" },
        ] },
        { id: "REQ-1029", title: "Senior Backend Engineer", subtitle: "Payments · Tobias Wren (incoming) · Austin", steps: ["Approved", "Posted", "Interviewing", "Offer", "Filled"], current: 4, eta: "Starts Nov 2", status: "Filled", tone: "green", events: [
          { time: "Oct 2", text: "Nadia Hussain signed offer" },
          { time: "Sep 28", text: "Background check cleared" },
        ] },
        { id: "REQ-1044", title: "Staff Data Engineer", subtitle: "Analytics · Mei Tan · Remote (US)", steps: ["Approved", "Posted", "Interviewing", "Offer", "Filled"], current: 1, eta: "Target fill Dec 15", status: "Posted", tone: "violet", events: [
          { time: "Oct 20", text: "Referral from K. Osei auto-advanced to recruiter screen" },
          { time: "Oct 16", text: "Posted internally first for 5 days" },
        ] },
        { id: "REQ-1047", title: "Customer Success Manager", subtitle: "Customer Success · Leah Grant · Chicago", steps: ["Approved", "Posted", "Interviewing", "Offer", "Filled"], current: 0, eta: "Awaiting posting", status: "Approved", tone: "gray", events: [
          { time: "Oct 21", text: "Approved by VP Customer Success and Finance" },
          { time: "Oct 18", text: "Requisition opened — backfill" },
        ] },
      ],
    },
    hiringplan: {
      blurb: "Hiring plan attainment by department and month, so recruiting capacity goes where the gaps are.",
      bullets: ["Percent of planned hires filled per month", "Departments falling behind plan stand out", "Totals for open and at-risk requisitions"],
      subtitle: "FY2026 headcount plan · 100 = month's planned hires filled",
      rowLabel: "Department",
      rows: ["Platform", "Payments", "Analytics", "Design", "Sales", "Customer Success", "G&A"],
      cols: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      values: [
        [100, 80, 75, 67, 60, 50],
        [100, 100, 83, 100, 75, 67],
        [67, 50, 100, 75, 50, 33],
        [100, 100, 100, 50, 100, 80],
        [88, 92, 75, 83, 70, 64],
        [100, 75, 67, 100, 80, 60],
        [100, 100, 100, 100, 50, 100],
      ],
      unit: "% of plan",
      legend: ["Behind plan", "On plan"],
      summary: [
        { label: "Plan attainment YTD", value: "81%", delta: "142 of 176 hires", tone: "amber" },
        { label: "Furthest behind", value: "Analytics", delta: "33% in October", tone: "red" },
        { label: "Open requisitions", value: "38", delta: "11 older than 60 days", tone: "blue" },
      ],
    },
    directory: {
      blurb: "Everyone at Northwind Labs — searchable by name, team, location and status.",
      bullets: ["Search people across every team", "Filter by employment status", "Manager, location and start date for each person"],
      subtitle: "1,184 employees · 9 offices and remote",
      searchPlaceholder: "Search people, titles or teams…",
      primaryAction: "Add employee",
      filter: { key: "status", options: ["Active", "Onboarding", "On leave"] },
      kpis: [
        { label: "Employees", value: "1,184", delta: "+46 this quarter" },
        { label: "Onboarding", value: "23", delta: "Start dates in 30 days", tone: "blue" },
        { label: "On leave", value: "17", delta: "Parental, medical, sabbatical", tone: "amber" },
        { label: "Remote", value: "38%", delta: "+3 pts YoY" },
      ],
      columns: [
        { key: "name", label: "Name", type: "avatar" }, { key: "title", label: "Title" }, { key: "team", label: "Team" },
        { key: "location", label: "Location" }, { key: "manager", label: "Manager" }, { key: "start", label: "Start date", type: "date" }, { key: "status", label: "Status", type: "badge" },
      ],
      rows: [
        { name: "Nadia Hussain", title: "Senior Backend Engineer", team: "Payments", location: "Austin", manager: "Tobias Wren", start: "Nov 2, 2026", status: "Onboarding" },
        { name: "Ravi Shah", title: "Staff Platform Engineer", team: "Platform", location: "Remote (US)", manager: "Ben Okafor", start: "Mar 14, 2022", status: "Active" },
        { name: "Mariana Silva", title: "Product Analyst", team: "Analytics", location: "Phoenix", manager: "Mei Tan", start: "Oct 26, 2026", status: "Onboarding" },
        { name: "Kwame Osei", title: "Senior Data Engineer", team: "Analytics", location: "Remote (US)", manager: "Mei Tan", start: "Jun 6, 2023", status: "Active" },
        { name: "Sofia Lindqvist", title: "Design Director", team: "Design", location: "Seattle", manager: "Chief Product Officer", start: "Jan 9, 2021", status: "Active" },
        { name: "Elif Demir", title: "Account Executive", team: "Sales", location: "Chicago", manager: "Marcus Hale", start: "Aug 1, 2024", status: "On leave" },
        { name: "Ben Okafor", title: "Engineering Manager", team: "Platform", location: "Seattle", manager: "VP Engineering", start: "Sep 19, 2022", status: "Active" },
        { name: "Anika Bose", title: "Software Engineer II", team: "Payments", location: "Austin", manager: "Tobias Wren", start: "Feb 27, 2024", status: "Active" },
      ],
      tones: { Active: "green", Onboarding: "blue", "On leave": "amber" },
    },
    messages: {
      blurb: "Two-way candidate messaging by email and SMS, with interview context beside every conversation.",
      bullets: ["Every candidate conversation in one inbox", "Templates and quick replies for common steps", "Candidate stage, role and next interview alongside"],
      subtitle: "Recruiter inbox · Jordan Ellis",
      threads: [
        { name: "Yuki Sato", preview: "Is the onsite portfolio review 45 or 60 minutes?", time: "9:52", avatar: "Yuki Sato", unread: 1, tag: "Onsite" },
        { name: "Carlos Vega", preview: "Thanks — I can confirm by Friday.", time: "9:15", avatar: "Carlos Vega", tag: "Offer" },
        { name: "Priya Nair", preview: "Booked Thursday at 1 PM. See you then!", time: "Yesterday", avatar: "Priya Nair", tag: "Scheduling" },
        { name: "Diego Morales", preview: "Could we move the technical round to Wednesday?", time: "Mon", avatar: "Diego Morales", unread: 1, tag: "Reschedule" },
        { name: "Hannah Brandt", preview: "References sent over this morning.", time: "Mon", avatar: "Hannah Brandt", tag: "References" },
      ],
      messages: [
        { from: "them", text: "Hi Jordan! Quick question before Tuesday — is the portfolio review 45 or 60 minutes?", time: "9:46" },
        { from: "me", text: "Hi Yuki — it's 60 minutes: about 35 to walk through two projects and 25 for questions from Sofia and the team.", time: "9:48" },
        { from: "them", text: "Perfect. Should I bring a case study on design systems, or is end-to-end product work better?", time: "9:50" },
        { from: "me", text: "One of each is ideal. The panel is especially curious about how you measured impact after launch.", time: "9:51" },
        { from: "them", text: "Great, that helps a lot. Is the onsite in person or on video?", time: "9:52" },
      ],
      quickReplies: ["Send interview prep guide", "Share self-scheduling link", "Confirm onsite logistics", "Send offer timeline"],
      context: {
        title: "Candidate",
        fields: [
          { label: "Role", value: "Product Designer · REQ-1035" },
          { label: "Stage", value: "Onsite — Tue Oct 27, 10:00 AM" },
          { label: "Panel", value: "Sofia Lindqvist + 3 designers" },
          { label: "Source", value: "Job board" },
          { label: "Match score", value: "88 / 100" },
        ],
      },
    },
  },
});
