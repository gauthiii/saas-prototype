// src/industries/banking/data.ts — VaultBank extension content (shared pages + archetype extension screens).
// The hand-coded module src/domains/banking.tsx owns meta / extra / story. Fictional people, places and figures.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "About you", description: "We need a few details to open your account. It takes about 4 minutes.", fields: [
          { label: "Legal first name", type: "text", placeholder: "Alex", half: true },
          { label: "Legal last name", type: "text", placeholder: "Rivera", half: true },
          { label: "Date of birth", type: "date", half: true },
          { label: "Mobile number", type: "text", placeholder: "(503) 555-0148", half: true },
        ] },
        { title: "Verify your identity", description: "Scan a government ID and take a quick selfie — we match them in seconds.", fields: [
          { label: "ID type", type: "radio", options: ["Driver's license", "State ID", "Passport"] },
          { label: "Last 4 of SSN", type: "text", placeholder: "••••", half: true },
          { label: "Enable Face ID / fingerprint login", type: "toggle", value: "true" },
        ] },
        { title: "Choose your accounts", description: "Everyday Checking is free. Add savings or a CD any time.", fields: [
          { label: "Open High-Yield Savings too", type: "toggle", value: "true" },
          { label: "Plan", type: "radio", options: ["Everyday (free)", "Premium ($9/mo)", "Family ($19/mo)"] },
          { label: "Set up direct deposit", type: "toggle" },
        ] },
        { title: "Fund your account", description: "Move money in from another bank or deposit a check.", fields: [
          { label: "Opening deposit", type: "currency", placeholder: "$500", half: true },
          { label: "Funding method", type: "select", options: ["Transfer from another bank", "Mobile check deposit", "Debit card"], half: true },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Primary owner", description: "Holds the Family plan and controls access.", permissions: ["Add or remove members", "Open and close accounts", "Set card and spending controls"] },
        { name: "Joint owner", description: "Shares ownership of joint accounts.", permissions: ["Move money between joint accounts", "Pay bills", "View all shared goals"] },
        { name: "Teen member", description: "Ages 13–17 with a supervised debit card.", permissions: ["Spend within set limits", "Save toward goals", "Request money from owners"] },
        { name: "Trusted contact", description: "View-only access for a parent, accountant or caregiver.", permissions: ["View balances and statements", "Receive fraud alerts", "No money movement"] },
      ],
      members: [
        { name: "Alex Rivera", email: "alex.rivera@mailbox.example", role: "Primary owner", status: "Active", lastActive: "Just now" },
        { name: "Jordan Rivera", email: "jordan.rivera@mailbox.example", role: "Joint owner", status: "Active", lastActive: "2 h ago" },
        { name: "Maya Rivera", email: "maya.r@mailbox.example", role: "Teen member", status: "Active", lastActive: "Yesterday" },
        { name: "Leo Rivera", email: "leo.r@mailbox.example", role: "Teen member", status: "Invited", lastActive: "—" },
        { name: "Margaret Park", email: "margaret.park@mailbox.example", role: "Trusted contact", status: "Active", lastActive: "Oct 12" },
      ],
    },
    billing: {
      plan: "Family", price: "$19 / month", renews: "Nov 12, 2026", paymentMethod: "Everyday Checking ••2210",
      usage: [
        { label: "Fee-free ATM withdrawals", used: 6, limit: 10, unit: "this month" },
        { label: "Family members", used: 5, limit: 6, unit: "members" },
        { label: "Shared savings goals", used: 3, limit: 10, unit: "goals" },
        { label: "Fee-free FX conversions", used: 1240, limit: 5000, unit: "USD" },
      ],
      invoices: [
        { id: "VB-FAM-2610", date: "Oct 12, 2026", amount: "$19.00", status: "Paid" },
        { id: "VB-FAM-2609", date: "Sep 12, 2026", amount: "$19.00", status: "Paid" },
        { id: "VB-FAM-2608", date: "Aug 12, 2026", amount: "$19.00", status: "Paid" },
        { id: "VB-PRM-2607", date: "Jul 12, 2026", amount: "$9.00", status: "Paid" },
      ],
    },
    inbox: {
      threads: [
        { name: "VaultBank Support", preview: "Your replacement debit card shipped today.", time: "10:14", avatar: "🏦", unread: 1, tag: "Cards" },
        { name: "Dana Whitfield · Mortgage banker", preview: "Confirming our refinance consultation on Nov 18.", time: "9:02", avatar: "Dana Whitfield", unread: 1, tag: "Appointment" },
        { name: "Fraud Prevention", preview: "Did you just try to spend $412.00 online?", time: "Yesterday", avatar: "🛡️", tag: "Security" },
        { name: "Maya Rivera", preview: "Can I have $40 for the school trip?", time: "Mon", avatar: "Maya Rivera", tag: "Family" },
      ],
      messages: [
        { from: "them", text: "Hi Alex — your old card ending 4410 was cancelled and the replacement ending 6083 shipped today by tracked mail.", time: "10:08" },
        { from: "them", text: "Your virtual card is already active in the app if you need to pay for anything before it arrives.", time: "10:09" },
        { from: "me", text: "Thanks! Will my autopay for City Power & Light move over automatically?", time: "10:12" },
        { from: "them", text: "Yes — card updater moves recurring payments to the new number. We'll notify you if any merchant declines it.", time: "10:14" },
      ],
    },
    search: {
      query: "cedar",
      facets: ["Transaction", "Payee", "Statement", "Help article"],
      results: [
        { type: "Transaction", title: "Mortgage payment · 14 Cedar Lane", snippet: "−$2,140.00 · autopay from Checking ••2210", meta: "Oct 1, 2026" },
        { type: "Statement", title: "Mortgage annual escrow statement 2026", snippet: "Escrow shortage of $186.20 · new payment from Jan 2027", meta: "Oct 9, 2026" },
        { type: "Payee", title: "Cedar Grove Pediatrics", snippet: "Bill pay · account 55-1049 · last paid $45.00", meta: "Sep 22" },
        { type: "Help article", title: "How to request a mortgage payoff quote", snippet: "Get an official payoff letter in the app or with a mortgage banker.", meta: "Loans & mortgage" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 1, title: "Mortgage autopay", tone: "violet", time: "4:00 AM" },
        { date: 1, title: "Auto loan autopay", tone: "violet", time: "4:00 AM" },
        { date: 6, title: "Payday · Brightline Studio", tone: "green" },
        { date: 12, title: "Family plan renews", tone: "gray" },
        { date: 13, title: "City Power & Light due", tone: "amber" },
        { date: 18, title: "Refinance consultation", tone: "blue", time: "10:00 AM" },
        { date: 20, title: "Payday · Brightline Studio", tone: "green" },
        { date: 24, title: "3-month CD matures", tone: "violet" },
        { date: 28, title: "Credit card statement closes", tone: "amber" },
      ],
    },
    reports: {
      reports: [
        { name: "Checking statement · October", description: "All activity, fees and interest for Everyday Checking ••2210.", category: "Statements", updated: "Nov 1", format: "PDF", owner: "Alex Rivera", schedule: "Monthly" },
        { name: "Savings statement · October", description: "Deposits, goal transfers and interest for High-Yield Savings ••8841.", category: "Statements", updated: "Nov 1", format: "PDF", owner: "Alex Rivera", schedule: "Monthly" },
        { name: "Transaction export", description: "Every transaction across accounts for budgeting tools.", category: "Exports", updated: "Today", format: "CSV", owner: "Alex Rivera" },
        { name: "Spending summary · Q3", description: "Category totals and month-over-month changes.", category: "Insights", updated: "Oct 2", format: "PDF", owner: "Jordan Rivera", schedule: "Quarterly" },
        { name: "Mortgage interest (1098) preview", description: "Year-to-date mortgage interest and escrow for tax planning.", category: "Tax", updated: "Oct 15", format: "PDF", owner: "Alex Rivera" },
        { name: "Interest earned (1099-INT) preview", description: "Year-to-date interest from savings and certificates.", category: "Tax", updated: "Oct 15", format: "XLSX", owner: "Alex Rivera" },
      ],
    },
    states: { noun: "transactions", emptyTitle: "No transactions yet", emptyBody: "Fund your account or set up direct deposit and your activity will show up here.", emptyAction: "Add money" },
  },
  screens: {
    locator: {
      blurb: "Find the nearest VaultBank branch or fee-free ATM, with live status and wait times.",
      bullets: ["Branches and ATMs pinned by live status", "Cash availability and lobby wait times", "Services and hours for each location"],
      subtitle: "Portland metro · 6 fee-free ATM withdrawals left this month",
      mapLabel: "Portland metro",
      legend: [{ label: "Open", tone: "green" }, { label: "Busy / limited", tone: "amber" }, { label: "Unavailable", tone: "red" }, { label: "ATM only", tone: "blue" }],
      kpis: [
        { label: "Branches nearby", value: "4", delta: "Within 5 miles" },
        { label: "Fee-free ATMs", value: "38", delta: "Partner network included", tone: "green" },
        { label: "Shortest wait", value: "3 min", delta: "Pearl District branch", tone: "blue" },
      ],
      pins: [
        { name: "Pearl District branch", x: 42, y: 34, status: "Open", tone: "green", metric: "3 min wait · open till 6 PM", detail: "Full service: mortgage bankers, notary, safe deposit boxes, coin counting." },
        { name: "Hawthorne branch", x: 66, y: 52, status: "Busy", tone: "amber", metric: "22 min wait · open till 5 PM", detail: "Lunch-hour rush. Book an appointment to skip the line." },
        { name: "Lloyd Center branch", x: 58, y: 30, status: "Open", tone: "green", metric: "8 min wait · open till 6 PM", detail: "Small-business banking desk and drive-up ATM." },
        { name: "Sellwood branch", x: 52, y: 78, status: "Closed today", tone: "red", metric: "Reopens Thu 9 AM", detail: "Closed for lobby renovation. Drive-up ATM remains open 24/7." },
        { name: "Union Station ATM", x: 47, y: 24, status: "ATM only", tone: "blue", metric: "24/7 · deposits accepted", detail: "Cash and check deposits, cardless withdrawal with phone tap." },
        { name: "Goose Hollow ATM", x: 30, y: 46, status: "Low cash", tone: "amber", metric: "$20 bills only", detail: "Refill scheduled for 4:00 PM today." },
        { name: "Airport ATM · Concourse C", x: 88, y: 14, status: "ATM only", tone: "blue", metric: "24/7 · fee-free", detail: "Multi-currency dispensing: USD, CAD, EUR." },
        { name: "Beaverton Town Square", x: 10, y: 58, status: "Out of service", tone: "red", metric: "Technician en route", detail: "Card reader fault reported at 9:40 AM. Nearest alternative: Goose Hollow ATM." },
      ],
    },
    appointments: {
      blurb: "Book time with a VaultBank banker in a branch or on video — no waiting in line.",
      bullets: ["Choose the kind of help you need", "Pick a branch or video slot that suits you", "Bring-list and reminders sent automatically"],
      subtitle: "Pearl District branch or video · times in Pacific Time",
      resources: [
        { name: "Mortgage & refinance", meta: "45 min · mortgage banker", price: "Free", emoji: "🏡", tags: ["Video or branch", "Payoff quotes"] },
        { name: "Notary & document signing", meta: "20 min · branch only", price: "Free for members", emoji: "🖋️", tags: ["Bring photo ID"] },
        { name: "Open a small-business account", meta: "40 min · business banker", price: "Free", emoji: "💼", tags: ["EIN required"] },
        { name: "Safe deposit box access", meta: "15 min · branch only", price: "$60 / yr box", emoji: "🔐", tags: ["Key holders only"] },
        { name: "Financial check-in", meta: "30 min · savings & goals review", price: "Free", emoji: "🧭", tags: ["Video"] },
        { name: "Card, PIN & ID help", meta: "15 min · branch only", price: "Free", emoji: "💳", tags: ["Instant card print"] },
      ],
      dates: ["Mon Nov 16", "Tue Nov 17", "Wed Nov 18", "Thu Nov 19", "Fri Nov 20", "Sat Nov 21"],
      slots: ["9:00", "9:30", "10:00", "10:30", "11:00", "1:00", "1:30", "2:00", "3:00", "4:00"],
      unavailable: ["9:30", "11:00", "2:00"],
      summary: [
        { label: "Location", value: "Pearl District branch" },
        { label: "Banker", value: "Dana Whitfield" },
        { label: "Account", value: "Alex Rivera · Family plan" },
        { label: "Bring", value: "Photo ID, latest pay stub" },
      ],
      confirmLabel: "Confirm appointment",
      policy: "Reschedule or cancel up to 2 hours before in the app. Appointments are informational; any loan or account decision is subject to application and approval.",
    },
  },
});
