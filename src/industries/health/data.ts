// src/industries/health/data.ts — MedOS extension content (shared pages + archetype extension screens).
// Meta / extra / story live in the hand-coded module src/domains/healthtech.tsx. Fictional people, payers and figures.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "Your organization", description: "Tell us about your clinic or hospital so we can configure MedOS.", fields: [
          { label: "Organization name", type: "text", placeholder: "Riverbend Health Network", half: true },
          { label: "Primary site", type: "text", placeholder: "Austin, TX", half: true },
          { label: "Care setting", type: "radio", options: ["Clinic", "Multi-site practice", "Hospital", "Health system"] },
        ] },
        { title: "Departments & beds", description: "Set up departments, wards and bed counts for scheduling and census.", fields: [
          { label: "Departments", type: "textarea", placeholder: "Cardiology, Surgery, Orthopedics, Neurology, Oncology…" },
          { label: "Licensed beds", type: "number", placeholder: "120", half: true },
          { label: "ICU beds", type: "number", placeholder: "6", half: true },
        ] },
        { title: "Connect your systems", description: "Bring in existing records and connect labs, imaging and payers.", fields: [
          { label: "Import format", type: "select", options: ["HL7 FHIR R4", "HL7 v2 feed", "C-CDA documents", "CSV export"] },
          { label: "Enable real-time eligibility checks", type: "toggle", value: "true" },
          { label: "Connect lab interface", type: "toggle", value: "true" },
        ] },
        { title: "Invite your care team", description: "Providers, nurses and staff each get role-based access.", fields: [
          { label: "Team emails", type: "textarea", placeholder: "one email per line" },
          { label: "Default role", type: "select", options: ["Physician", "Nurse", "Front desk", "Billing"] },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Administrator", description: "Manages the organization, users and integrations.", permissions: ["Users and roles", "Integrations and billing", "Audit logs"] },
        { name: "Physician", description: "Diagnoses, orders and documents care.", permissions: ["Full chart access", "Orders and e-prescribing", "Sign notes"] },
        { name: "Nurse", description: "Delivers bedside care and documentation.", permissions: ["Vitals and MAR", "Care plans", "Ward census"] },
        { name: "Front desk & billing", description: "Registration, scheduling and revenue cycle.", permissions: ["Intake and scheduling", "Eligibility and prior auth", "Claims and payments"] },
      ],
      members: [
        { name: "Dr. Ravi Iyer", email: "r.iyer@riverbendhealth.org", role: "Physician", status: "Active", lastActive: "Just now" },
        { name: "Dr. Lin Chen", email: "l.chen@riverbendhealth.org", role: "Physician", status: "Active", lastActive: "18 min ago" },
        { name: "Dr. Klaus Bauer", email: "k.bauer@riverbendhealth.org", role: "Physician", status: "Active", lastActive: "1 h ago" },
        { name: "Joy Adeleke, RN", email: "j.adeleke@riverbendhealth.org", role: "Nurse", status: "Active", lastActive: "4 min ago" },
        { name: "Carmen Diaz", email: "c.diaz@riverbendhealth.org", role: "Front desk & billing", status: "Active", lastActive: "9 min ago" },
        { name: "Owen Fitzgerald", email: "o.fitzgerald@riverbendhealth.org", role: "Administrator", status: "Active", lastActive: "Yesterday" },
        { name: "Sana Qureshi, RN", email: "s.qureshi@riverbendhealth.org", role: "Nurse", status: "Invited", lastActive: "—" },
      ],
    },
    billing: {
      plan: "Health system", price: "Custom · annual contract", renews: "Jan 1, 2027", paymentMethod: "Invoice · net 30",
      usage: [
        { label: "Providers", used: 84, limit: 100, unit: "providers" },
        { label: "Encounters this month", used: 21840, limit: 30000, unit: "encounters" },
        { label: "Telehealth minutes", used: 46200, limit: 60000, unit: "minutes" },
        { label: "Record storage", used: 3.1, limit: 5, unit: "TB" },
      ],
      invoices: [
        { id: "MOS-2026-Q4", date: "Oct 1, 2026", amount: "$48,600.00", status: "Due" },
        { id: "MOS-2026-Q3", date: "Jul 1, 2026", amount: "$48,600.00", status: "Paid" },
        { id: "MOS-2026-Q2", date: "Apr 1, 2026", amount: "$46,200.00", status: "Paid" },
        { id: "MOS-2026-Q1", date: "Jan 1, 2026", amount: "$46,200.00", status: "Paid" },
      ],
    },
    inbox: {
      threads: [
        { name: "Joy Adeleke, RN", preview: "ICU-3 MAP trending down — can you review?", time: "10:21", avatar: "Joy Adeleke", unread: 2, tag: "ICU" },
        { name: "Lakeshore Health Plan", preview: "Peer-to-peer available for PA-60418 at 2:00 PM.", time: "9:40", avatar: "🏛️", tag: "Payer" },
        { name: "Dr. Lin Chen", preview: "OR 2 time-out done — starting the cholecystectomy.", time: "8:55", avatar: "Lin Chen" },
        { name: "Carmen Diaz", preview: "Eligibility verified for all of tomorrow's cardiology patients.", time: "Yesterday", avatar: "Carmen Diaz", tag: "Billing" },
      ],
      messages: [
        { from: "them", text: "Dr. Iyer — ICU-3 MAP has drifted from 72 to 63 over the last hour. Urine output 20 mL/h.", time: "10:14" },
        { from: "me", text: "Thanks Joy. Give a 500 mL crystalloid bolus and repeat lactate. I'll be at the bedside in 10.", time: "10:17" },
        { from: "them", text: "Bolus started. Lactate drawn and sent stat.", time: "10:21" },
      ],
    },
    search: {
      query: "okafor",
      facets: ["Patient", "Encounter", "Order", "Claim"],
      results: [
        { type: "Patient", title: "J. Okafor · 58 · MRN-48022", snippet: "Admitted · Cardiology · ICU-1 · attending Dr. Iyer", meta: "Allergies: none known" },
        { type: "Encounter", title: "ED visit → admission, Oct 18", snippet: "Chest pain radiating to left arm · NSTEMI confirmed · PCI to LAD Oct 19", meta: "Dr. Iyer" },
        { type: "Order", title: "Troponin I, high-sensitivity — serial", snippet: "Peak 4,820 ng/L on Oct 18 · trending down", meta: "Lab · resulted 06:10" },
        { type: "Claim", title: "CLM-9841 — I21.4 NSTEMI", snippet: "Lakeshore Health Plan · submitted · $4,820", meta: "Oct 20" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 3, title: "Cardiology M&M conference", tone: "blue", time: "7:00 AM" },
        { date: 5, title: "Joint Commission mock tracer", tone: "amber", time: "9:00 AM" },
        { date: 9, title: "EHR downtime drill", tone: "red", time: "2:00 AM" },
        { date: 12, title: "Flu vaccine staff clinic", tone: "green", time: "11:00 AM" },
        { date: 16, title: "Quality committee", tone: "violet", time: "12:00 PM" },
        { date: 18, title: "Sepsis bundle training", tone: "amber", time: "3:00 PM" },
        { date: 20, title: "Payer contract review", tone: "gray", time: "10:00 AM" },
        { date: 24, title: "OR block schedule release", tone: "blue", time: "4:00 PM" },
        { date: 30, title: "Month-end census report", tone: "gray", time: "5:00 PM" },
      ],
    },
    reports: {
      reports: [
        { name: "Daily census", description: "Admissions, discharges, transfers and occupancy by ward.", category: "Operations", updated: "Today", format: "PDF", owner: "Owen Fitzgerald", schedule: "Daily" },
        { name: "ED throughput", description: "Door-to-provider and door-to-disposition times by acuity.", category: "Operations", updated: "Today", format: "XLSX", owner: "Dr. Ravi Iyer", schedule: "Daily" },
        { name: "Quality measures", description: "Readmissions, sepsis bundle compliance and surgical site infections.", category: "Quality", updated: "Oct 19", format: "PDF", owner: "Dr. Lin Chen", schedule: "Monthly" },
        { name: "Prior authorization turnaround", description: "Requests, approvals, denials and days to decision by payer.", category: "Revenue cycle", updated: "Yesterday", format: "CSV", owner: "Carmen Diaz", schedule: "Weekly" },
        { name: "Denials by reason code", description: "CARC/RARC breakdown with appeal outcomes.", category: "Revenue cycle", updated: "Oct 18", format: "XLSX", owner: "Carmen Diaz", schedule: "Weekly" },
        { name: "Surgical safety compliance", description: "Checklist completion rates per OR and phase.", category: "Quality", updated: "Oct 20", format: "PDF", owner: "Dr. Lin Chen" },
      ],
    },
    states: { noun: "patients", emptyTitle: "No patients yet", emptyBody: "Register a patient at intake or import records from your previous EHR to get started.", emptyAction: "Register a patient" },
  },
  screens: {
    icumonitor: {
      blurb: "Live bedside telemetry for every ICU bed, with early-warning trends and alerts.",
      bullets: ["Key vital per bed with a rolling trend", "Early-warning score as a gauge", "Escalation alerts routed to the charge nurse"],
      subtitle: "ICU · 6 beds · refreshed every 5 s",
      kpis: [
        { label: "Beds occupied", value: "5 / 6", delta: "1 admission pending", tone: "blue" },
        { label: "Patients on pressors", value: "1", delta: "ICU-3", tone: "amber" },
        { label: "Rapid-response calls (24 h)", value: "2", delta: "−1 vs. yesterday" },
      ],
      units: [
        { name: "ICU-1 · J. Okafor", value: "78", unit: "bpm", status: "Stable", tone: "green", spark: [92, 88, 86, 84, 82, 80, 79, 78], meta: "Post-PCI day 2 · NSR · BP 118/72", gauge: 18 },
        { name: "ICU-2 · H. Yamada", value: "38.6", unit: "°C", status: "Watch", tone: "amber", spark: [37.4, 37.8, 38.1, 38.4, 38.9, 38.7, 38.6, 38.6], meta: "Neutropenic fever · cultures pending", gauge: 46 },
        { name: "ICU-3 · K. Brennan", value: "63", unit: "mmHg MAP", status: "Deteriorating", tone: "red", spark: [74, 72, 71, 69, 67, 66, 64, 63], meta: "Sepsis · norepinephrine 0.08 mcg/kg/min", gauge: 78 },
        { name: "ICU-4 · D. Ferreira", value: "94", unit: "% SpO₂", status: "Stable", tone: "green", spark: [90, 91, 92, 93, 93, 94, 94, 94], meta: "COPD exacerbation · BiPAP weaning", gauge: 28 },
        { name: "ICU-5 · T. Mwangi", value: "112", unit: "bpm", status: "Watch", tone: "amber", spark: [96, 98, 104, 108, 110, 114, 112, 112], meta: "Post-op day 1 · AF with RVR · on diltiazem", gauge: 52 },
        { name: "ICU-6", value: "—", unit: "", status: "Cleaning", tone: "gray", spark: [0, 0, 0, 0, 0, 0, 0, 0], meta: "Admission from ED in ~40 min", gauge: 0 },
        { name: "Central station", value: "99.98", unit: "% uptime", status: "Online", tone: "blue", spark: [100, 100, 100, 99.9, 100, 100, 100, 100], meta: "All telemetry packs reporting", gauge: 100 },
      ],
      alerts: [
        { title: "ICU-3 MAP below 65 mmHg", body: "MAP has fallen 11 mmHg in 70 minutes with urine output 20 mL/h. Bolus started; repeat lactate pending. Dr. Iyer en route.", tone: "red" },
        { title: "ICU-2 temperature persisting", body: "Fever ≥38.3 °C for 2 readings in a neutropenic patient. Confirm broad-spectrum antibiotics given within 60 minutes.", tone: "amber" },
      ],
    },
    priorauth: {
      blurb: "Prior authorization requests waiting on clinical review before they go to the payer.",
      bullets: ["Procedure, payer and urgency on every request", "Clinical documentation summary inline", "Submit to payer or return for more documentation"],
      subtitle: "Pending submission · all departments",
      approveLabel: "Submit to payer", rejectLabel: "Return for documentation",
      stats: [
        { label: "Awaiting review", value: "18", delta: "4 urgent", tone: "amber" },
        { label: "Avg days to decision", value: "3.2", delta: "−1.1 days" },
        { label: "First-pass approval", value: "87%", delta: "+5 pts", tone: "green" },
      ],
      items: [
        { title: "Cardiac MRI with contrast — CPT 75561", subtitle: "A. Novak · Dr. Ravi Iyer · Lakeshore Health Plan", amount: "$2,840", priority: "High", age: "2 h", tags: ["Urgent", "Imaging"], detail: "Evaluating suspected myocarditis after abnormal echo (EF 45%) and elevated troponin. Echo report, ECG and troponin trend attached. Payer guideline requires failed or inconclusive echo — criteria met." },
        { title: "Total knee arthroplasty — CPT 27447", subtitle: "P. Almeida · Dr. Klaus Bauer · Medicare Advantage", amount: "$18,600", priority: "Medium", age: "1 day", tags: ["Surgery", "Elective"], detail: "Severe tricompartmental osteoarthritis on X-ray, 9 months of documented physical therapy and two corticosteroid injections without relief. BMI 31. Pre-op clearance from cardiology attached." },
        { title: "PET-CT skull base to mid-thigh — CPT 78815", subtitle: "H. Yamada · Dr. Lin Chen · Pinecrest PPO", amount: "$4,150", priority: "High", age: "5 h", tags: ["Oncology", "Staging"], detail: "Restaging after 4 cycles of chemotherapy for diffuse large B-cell lymphoma. Prior PET-CT from June attached for comparison. Oncology pathway approval is usually same-day." },
        { title: "Lumbar MRI without contrast — CPT 72148", subtitle: "S. Tan · Dr. Frances Collins · Pinecrest PPO", amount: "$1,240", priority: "Low", age: "2 days", tags: ["Imaging"], detail: "Low back pain for 3 weeks without red-flag symptoms. Payer requires 6 weeks of conservative therapy first — documentation currently shows 3 weeks. Recommend returning for more documentation or a peer-to-peer." },
        { title: "Outpatient cardiac rehab — 36 sessions", subtitle: "J. Okafor · Dr. Ravi Iyer · Lakeshore Health Plan", amount: "$3,960", priority: "Medium", age: "4 h", tags: ["Post-MI", "Rehab"], detail: "NSTEMI with PCI to LAD on Oct 19. Cardiac rehab is guideline-recommended within 21 days of discharge. Discharge summary and referral attached." },
      ],
    },
    surgicalsafety: {
      blurb: "The surgical safety checklist for every case — sign in, time out and sign out, tracked live.",
      bullets: ["Three checklist phases with responsible role", "Critical items that block incision", "Live completion status per case"],
      subtitle: "OR 2 · Laparoscopic cholecystectomy · M. Rivera · Dr. Lin Chen",
      summary: "Sign in and time out complete · sign out in progress (4 of 7)",
      groups: [
        { title: "Sign in — before anesthesia", items: [
          { label: "Patient identity, site, procedure and consent confirmed", done: true, owner: "Circulating RN", critical: true },
          { label: "Site marked or not applicable", done: true, owner: "Dr. Lin Chen" },
          { label: "Anesthesia machine and medication check complete", done: true, owner: "Anesthesia", critical: true },
          { label: "Pulse oximeter on patient and functioning", done: true, owner: "Anesthesia" },
          { label: "Known allergy reviewed — penicillin", done: true, owner: "Circulating RN", critical: true },
          { label: "Difficult airway / aspiration risk assessed", done: true, owner: "Anesthesia" },
        ] },
        { title: "Time out — before incision", items: [
          { label: "All team members introduced by name and role", done: true, owner: "Whole team" },
          { label: "Patient, site and procedure confirmed aloud", done: true, owner: "Dr. Lin Chen", critical: true },
          { label: "Antibiotic prophylaxis given within 60 minutes", done: true, owner: "Anesthesia", due: "08:41", critical: true },
          { label: "Anticipated critical events reviewed", done: true, owner: "Whole team" },
          { label: "Sterility confirmed and equipment issues raised", done: true, owner: "Scrub tech" },
          { label: "Essential imaging displayed", done: true, owner: "Circulating RN" },
        ] },
        { title: "Sign out — before patient leaves OR", items: [
          { label: "Procedure name recorded", done: true, owner: "Circulating RN" },
          { label: "Instrument, sponge and needle counts correct", done: true, owner: "Scrub tech", critical: true },
          { label: "Specimen labelled (gallbladder) with patient name", done: true, owner: "Circulating RN", critical: true },
          { label: "Equipment problems logged", done: true, owner: "Circulating RN" },
          { label: "Key concerns for recovery reviewed", done: false, owner: "Dr. Lin Chen", due: "On close" },
          { label: "Post-op orders signed", done: false, owner: "Dr. Lin Chen", due: "On close" },
          { label: "Handoff to PACU nurse documented", done: false, owner: "Anesthesia", due: "On transfer" },
        ] },
      ],
    },
    quality: {
      blurb: "Weighted quality scorecards for providers across safety, outcomes, timeliness and patient experience.",
      bullets: ["Score per quality domain, 0–100", "Weights reflect the network's value-based contracts", "Quarter-over-quarter trend and badges"],
      subtitle: "Riverbend Health Network · Q3 2026 · risk-adjusted",
      criteria: ["Readmissions", "Safety events", "Guideline adherence", "Documentation timeliness", "Patient experience", "Cost of care"],
      weights: [25, 20, 20, 10, 15, 10],
      entities: [
        { name: "Dr. Ravi Iyer", subtitle: "Cardiology · 412 encounters", scores: [88, 92, 94, 81, 90, 76], trend: "+3", badge: "Top quartile" },
        { name: "Dr. Lin Chen", subtitle: "General surgery · 168 cases", scores: [91, 96, 89, 72, 86, 82], trend: "+2", badge: "Top quartile" },
        { name: "Dr. Klaus Bauer", subtitle: "Orthopedics · 204 cases", scores: [84, 90, 86, 88, 82, 68], trend: "+1" },
        { name: "Dr. Esther Park", subtitle: "Internal medicine · 1,036 encounters", scores: [79, 88, 91, 94, 93, 84], trend: "+5", badge: "Most improved" },
        { name: "Dr. Anil Gupta", subtitle: "Hospital medicine · 588 encounters", scores: [72, 85, 83, 66, 78, 80], trend: "−2", badge: "Review" },
        { name: "Dr. Frances Collins", subtitle: "Emergency medicine · 2,140 visits", scores: [81, 87, 88, 79, 74, 86], trend: "0" },
      ],
    },
  },
});
