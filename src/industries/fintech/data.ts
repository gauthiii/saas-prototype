// src/industries/fintech/data.ts — FinFlow extension content (shared pages + archetype extension screens).
// The hand-coded module src/domains/fintech.tsx owns meta / extra / story. Fictional company, people and figures.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "Your company", description: "Tell us about your entity so FinFlow can set up your chart of accounts.", fields: [
          { label: "Legal entity name", type: "text", placeholder: "Brightwave Analytics Inc.", half: true },
          { label: "Fiscal year start", type: "select", options: ["January", "April", "July", "October"], half: true },
          { label: "Entities to consolidate", type: "radio", options: ["1", "2–5", "6+"] },
        ] },
        { title: "Connect bank accounts", description: "Read-only connections pull balances and transactions every 15 minutes.", fields: [
          { label: "Primary operating bank", type: "select", options: ["Granite Federal Bank", "Harborview Commercial", "Summit Trust Bank", "Other (file upload)"] },
          { label: "Include card accounts", type: "toggle", value: "true" },
          { label: "Import 24 months of history", type: "toggle", value: "true" },
        ] },
        { title: "Approval policy", description: "Set who signs off on payments, payroll and expenses.", fields: [
          { label: "Dual approval above", type: "currency", placeholder: "$25,000", half: true },
          { label: "Expense auto-approve under", type: "currency", placeholder: "$50", half: true },
          { label: "Final payroll approver", type: "select", options: ["CFO", "Controller", "CEO"] },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Admin", description: "Owns the FinFlow workspace and policies.", permissions: ["Manage users and bank connections", "Edit approval policies", "Close accounting periods"] },
        { name: "Approver", description: "Signs off on payments, payroll and budgets.", permissions: ["Approve payments and payroll", "Set budget caps", "View all entities"] },
        { name: "Accountant", description: "Runs reconciliation, AP and the monthly close.", permissions: ["Match and categorize transactions", "Draft payments and invoices", "Post journal entries"] },
        { name: "Cardholder", description: "Spends on a corporate card within policy.", permissions: ["View own card", "Upload receipts", "Submit expenses"] },
      ],
      members: [
        { name: "Lucia Ortiz", email: "lucia@brightwave.example", role: "Admin", status: "Active", lastActive: "Just now" },
        { name: "Tara Walsh", email: "tara@brightwave.example", role: "Approver", status: "Active", lastActive: "18 min ago" },
        { name: "Rahul Mehta", email: "rahul@brightwave.example", role: "Accountant", status: "Active", lastActive: "4 min ago" },
        { name: "Karthik Subramanian", email: "karthik@brightwave.example", role: "Accountant", status: "Active", lastActive: "1 h ago" },
        { name: "Megan Chen", email: "megan@brightwave.example", role: "Cardholder", status: "Suspended", lastActive: "Card frozen Oct 20" },
        { name: "Noor Haddad", email: "noor@brightwave.example", role: "Accountant", status: "Invited", lastActive: "—" },
      ],
    },
    billing: {
      plan: "Growth", price: "$149 / month", renews: "Nov 3, 2026", paymentMethod: "ACH from Operating ••4410",
      usage: [
        { label: "Bank connections", used: 9, limit: 25, unit: "connections" },
        { label: "Payments sent", used: 412, limit: 1000, unit: "payments / mo" },
        { label: "Corporate cards", used: 38, limit: 50, unit: "cards" },
        { label: "Approval workflows", used: 7, limit: 10, unit: "workflows" },
      ],
      invoices: [
        { id: "FF-2026-10", date: "Oct 3, 2026", amount: "$149.00", status: "Paid" },
        { id: "FF-2026-09", date: "Sep 3, 2026", amount: "$149.00", status: "Paid" },
        { id: "FF-2026-08", date: "Aug 3, 2026", amount: "$149.00", status: "Paid" },
        { id: "FF-2026-W14", date: "Oct 14, 2026", amount: "$62.50", status: "Due" },
      ],
    },
    inbox: {
      threads: [
        { name: "Tara Walsh", preview: "Approve the Nov 1 payroll batch before Friday's cutoff?", time: "9:30", avatar: "Tara Walsh", unread: 2, tag: "Payroll" },
        { name: "Rahul Mehta", preview: "3 unmatched deposits from Lumen Logistics — partial payments?", time: "8:52", avatar: "Rahul Mehta", unread: 1, tag: "Recon" },
        { name: "Northwind Traders AP", preview: "Remittance advice for INV-0142 attached.", time: "Yesterday", avatar: "🏢", tag: "Customer" },
        { name: "Sofia Reyes (FinFlow)", preview: "Your SOX ITGC evidence pack for Q3 is ready.", time: "Mon", avatar: "Sofia Reyes", tag: "Compliance" },
      ],
      messages: [
        { from: "them", text: "Lumen Logistics paid $6,200, $4,150 and $1,850 this week but we invoiced them $12,200 in one go.", time: "8:44" },
        { from: "them", text: "Should I split-match them to INV-0138 or wait for their remittance?", time: "8:46" },
        { from: "me", text: "Split-match to INV-0138 — the total ties out exactly. Add a note referencing their AP email from Oct 15.", time: "8:50" },
        { from: "them", text: "Done. That clears three of our five open receivable exceptions.", time: "8:52" },
      ],
    },
    search: {
      query: "lumen",
      facets: ["Transaction", "Invoice", "Counterparty", "Payment"],
      results: [
        { type: "Counterparty", title: "Lumen Logistics", snippet: "Customer and vendor · KYC pending · medium risk · net-30 terms", meta: "Last checked Oct 8" },
        { type: "Invoice", title: "INV-0138 — Lumen Logistics", snippet: "Paid in 3 parts · $12,200.00 · fully reconciled Oct 21", meta: "Issued Sep 30" },
        { type: "Transaction", title: "TX-91208 — Lumen Logistics", snippet: "Incoming wire · $6,200.00 · matched to INV-0138", meta: "Oct 19" },
        { type: "Payment", title: "PMT-5521 — Lumen Logistics freight", snippet: "Outgoing ACH · $3,480.00 · scheduled", meta: "Oct 24" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 2, title: "Payroll run — Nov 1 cycle", tone: "violet", time: "9:00 AM" },
        { date: 4, title: "October close: books locked", tone: "green", time: "5:00 PM" },
        { date: 6, title: "Q3 board pack due", tone: "red" },
        { date: 10, title: "Treasury sweep review", tone: "blue", time: "10:00 AM" },
        { date: 13, title: "Sales tax filing", tone: "amber" },
        { date: 16, title: "Payroll run — Nov 15 cycle", tone: "violet", time: "9:00 AM" },
        { date: 20, title: "KYC refresh: 4 counterparties", tone: "amber" },
        { date: 25, title: "Card statement cutoff", tone: "gray" },
        { date: 30, title: "November close begins", tone: "blue" },
      ],
    },
    reports: {
      reports: [
        { name: "Cash position", description: "Balances by bank, entity and currency with 13-week forecast.", category: "Treasury", updated: "Today", format: "XLSX", owner: "Karthik Subramanian", schedule: "Daily" },
        { name: "Reconciliation summary", description: "Matched, unmatched and exception counts by account.", category: "Close", updated: "Today", format: "PDF", owner: "Rahul Mehta", schedule: "Daily" },
        { name: "AP aging", description: "Open payables by vendor and days outstanding.", category: "Payables", updated: "Yesterday", format: "CSV", owner: "Rahul Mehta", schedule: "Weekly" },
        { name: "AR aging", description: "Open receivables by customer with collection status.", category: "Receivables", updated: "Yesterday", format: "CSV", owner: "Lucia Ortiz", schedule: "Weekly" },
        { name: "Budget vs. actuals", description: "Spend against quarterly caps by team.", category: "FP&A", updated: "Oct 20", format: "XLSX", owner: "Tara Walsh", schedule: "Monthly" },
        { name: "Close checklist sign-off", description: "Every close task with preparer, reviewer and timestamps.", category: "Close", updated: "Oct 4", format: "PDF", owner: "Lucia Ortiz", schedule: "Monthly" },
      ],
    },
    states: { noun: "transactions", emptyTitle: "No transactions yet", emptyBody: "Connect a bank account and FinFlow will pull the last 24 months of activity.", emptyAction: "Connect a bank" },
  },
  screens: {
    recon: {
      blurb: "Match every bank line to an invoice, bill, payroll run or card statement before the books close.",
      bullets: ["Bank activity with match status on every line", "Filter by category to clear exceptions", "Book balance vs. bank balance at a glance"],
      subtitle: "Operating ••4410 · Granite Federal Bank · Oct 15 – 21, 2026",
      currency: "$",
      accounts: [
        { label: "Bank balance", value: "$842,310.00", delta: "As of 9:00 AM", icon: "Landmark" },
        { label: "Book balance", value: "$845,855.80", delta: "General ledger", icon: "FileText" },
        { label: "Difference", value: "−$3,545.80", delta: "3 open items", tone: "amber" },
        { label: "Auto-matched", value: "94%", delta: "1,284 of 1,366 lines", tone: "green" },
      ],
      rows: [
        { date: "Oct 21", description: "Northwind Traders · INV-0142", category: "Receivables", amount: 12450.0, status: "Matched", ref: "TX-91240" },
        { date: "Oct 21", description: "Acme Cloud Services · card settlement", category: "Card", amount: -1890.0, status: "Exception", ref: "TX-91236" },
        { date: "Oct 20", description: "Payroll · Oct 15 cycle (bulk ACH)", category: "Payroll", amount: -182400.5, status: "Matched", ref: "PR-441" },
        { date: "Oct 20", description: "Helio Energy Co. · direct debit returned", category: "Receivables", amount: -3300.0, status: "Exception", ref: "TX-91219" },
        { date: "Oct 19", description: "Lumen Logistics · wire (1 of 3)", category: "Receivables", amount: 6200.0, status: "Matched", ref: "TX-91208" },
        { date: "Oct 19", description: "Atlas Freight Corp · vendor payment", category: "Payables", amount: -8740.0, status: "Matched", ref: "PMT-5508" },
        { date: "Oct 18", description: "Interest · yield account sweep", category: "Interest", amount: 1644.2, status: "Unmatched", ref: "TX-91197" },
        { date: "Oct 17", description: "Wire fee · outgoing international", category: "Fees", amount: -45.0, status: "Matched", ref: "TX-91190" },
        { date: "Oct 16", description: "Lumen Logistics · ACH (2 of 3)", category: "Receivables", amount: 4150.0, status: "Matched", ref: "TX-91176" },
        { date: "Oct 15", description: "Lumen Logistics · ACH (3 of 3)", category: "Receivables", amount: 1850.0, status: "Matched", ref: "TX-91161" },
      ],
      tones: { Matched: "green", Unmatched: "blue", Exception: "red" },
    },
    close: {
      blurb: "The month-end close as a shared checklist, from cut-off to locked books.",
      bullets: ["Grouped close tasks with preparers and due dates", "Critical SOX-control tasks flagged", "Progress toward a locked period"],
      subtitle: "October 2026 close · target lock Nov 4 (business day 3)",
      summary: "9 of 17 tasks complete · 3 critical tasks open · on track for business day 3",
      groups: [
        { title: "Cash & reconciliation", items: [
          { label: "Reconcile operating account ••4410", done: false, owner: "Rahul Mehta", due: "Nov 2", critical: true },
          { label: "Reconcile payroll account ••7720", done: true, owner: "Rahul Mehta", due: "Nov 2" },
          { label: "Reconcile corporate card statement", done: true, owner: "Karthik Subramanian", due: "Nov 2" },
          { label: "Record yield account interest", done: false, owner: "Karthik Subramanian", due: "Nov 2" },
          { label: "Clear returned direct debit (Helio Energy Co.)", done: false, owner: "Lucia Ortiz", due: "Nov 3" },
        ] },
        { title: "Payables & receivables", items: [
          { label: "AP cut-off: accrue unbilled vendor costs", done: true, owner: "Rahul Mehta", due: "Nov 2" },
          { label: "Match remaining expense receipts", done: true, owner: "Karthik Subramanian", due: "Nov 2" },
          { label: "Review AR aging and bad-debt reserve", done: true, owner: "Lucia Ortiz", due: "Nov 3" },
          { label: "Dispute duplicate Acme Cloud Services charge", done: true, owner: "Rahul Mehta", due: "Oct 31" },
        ] },
        { title: "Payroll & accruals", items: [
          { label: "Post payroll journal entries (2 cycles)", done: true, owner: "Rahul Mehta", due: "Nov 2" },
          { label: "Accrue PTO and bonus liabilities", done: true, owner: "Lucia Ortiz", due: "Nov 3" },
          { label: "Prepaid and deferred revenue schedules", done: true, owner: "Karthik Subramanian", due: "Nov 3" },
        ] },
        { title: "Review & lock", items: [
          { label: "Flux analysis vs. September (>10% variances)", done: false, owner: "Lucia Ortiz", due: "Nov 4" },
          { label: "Controller review of all reconciliations", done: false, owner: "Lucia Ortiz", due: "Nov 4", critical: true },
          { label: "CFO sign-off", done: false, owner: "Tara Walsh", due: "Nov 4", critical: true },
          { label: "Budget vs. actuals pack to team leads", done: false, owner: "Tara Walsh", due: "Nov 5" },
          { label: "Lock October period", done: false, owner: "Lucia Ortiz", due: "Scheduled · Nov 4, 5 PM" },
        ] },
      ],
    },
  },
});
