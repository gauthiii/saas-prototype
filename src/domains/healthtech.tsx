// src/domains/healthtech.tsx
import { Fragment, useState } from "react";
import { HomePage, LoginPage, RegisterPage, ProfilePage, SettingsPage, FAQPage, SupportPage, DomainMeta } from "./pages";
import { AboutPage, PrivacyPage, PricingPage, NotificationsPage, ChangelogPage, NotFoundPage, DomainExtra } from "./pages-extra";

const healthMeta: DomainMeta = {
  id: "healthtech",
  name: "MedOS",
  tagline: "The unified EHR, scheduling, and billing platform designed for modern healthcare providers.",
  description: "Streamline patient care from intake to billing with MedOS — HIPAA-compliant and purpose-built for clinics.",
  accentLabel: "HealthTech · EHR · Scheduling",
  features: [
    { icon: "🩺", title: "Electronic health records", body: "Complete patient histories, lab results, and clinical notes in one place." },
    { icon: "📅", title: "Smart scheduling", body: "Automated appointment booking, reminders, and telehealth integration." },
    { icon: "💊", title: "Pharmacy & billing", body: "Integrated pharmacy management with insurance claim automation." },
  ],
  faqs: [
    { q: "Is MedOS HIPAA compliant?", a: "Yes. MedOS is fully HIPAA compliant with BAA agreements, encrypted storage, and role-based access controls." },
    { q: "Can patients book appointments online?", a: "Yes. The patient portal lets patients view availability, book slots, and receive automated reminders via SMS and email." },
    { q: "Does MedOS support telehealth?", a: "Yes, our telehealth suite supports video consultations, secure messaging, and e-prescriptions directly within the platform." },
    { q: "Which EHR formats are supported?", a: "MedOS supports HL7 FHIR R4, CCD, and can import from Epic, Cerner, and Athenahealth via our migration tool." },
    { q: "How does medical billing work?", a: "Claims are automatically generated from encounter notes, scrubbed for errors, and submitted to payers via our clearinghouse partners." },
    { q: "Can multiple providers share the same account?", a: "Yes. Accounts support unlimited providers with per-user role assignments, shared patient pools, and separate billing profiles." },
  ],
  supportEmail: "support@medos.io",
};

export function HealthHome() { return <HomePage meta={healthMeta} stats={healthExtra.stats} testimonial={healthExtra.testimonial} />; }
export function HealthLogin() { return <LoginPage meta={healthMeta} />; }
export function HealthRegister() { return <RegisterPage meta={healthMeta} />; }
export function HealthProfile() { return <ProfilePage meta={healthMeta} />; }
export function HealthSettings() { return <SettingsPage meta={healthMeta} />; }
export function HealthFAQ() { return <FAQPage meta={healthMeta} />; }
export function HealthSupport() { return <SupportPage meta={healthMeta} />; }

const healthExtra: DomainExtra = {
  founded: "2018",
  mission: "MedOS was built so clinicians spend their time with patients, not with software.",
  story: [
    "MedOS began in 2018 inside a community clinic in Austin, where a physician and a software engineer watched nurses re-enter the same patient data into four different systems. The first version was a weekend project: a single intake form that wrote to the EHR, the scheduler, and billing at once.",
    "Clinics nearby started asking for it. The team rebuilt it as a HIPAA-compliant platform with scheduling, telehealth, pharmacy, and claims under one login. MedOS now supports 2,400+ clinics and processes 11 million encounters a year.",
  ],
  team: [
    { name: "Dr. Elena Vasquez", role: "Co-founder & CEO", emoji: "👩‍⚕️", bio: "Family physician for 12 years. Still sees patients on Fridays to keep the product honest." },
    { name: "Tom Okabe", role: "Co-founder & CTO", emoji: "👨‍💻", bio: "Health-data engineer; previously built HL7/FHIR pipelines for a major hospital network." },
    { name: "Priya Natarajan", role: "Chief Privacy Officer", emoji: "🛡️", bio: "Health-law attorney. Owns HIPAA, BAAs, and every audit that comes through the door." },
    { name: "Marcus Lee", role: "Head of Clinical Product", emoji: "🩺", bio: "Former ER charge nurse. Translates clinical workflows into screens that work at 3am." },
  ],
  compliance: [
    { name: "HIPAA", desc: "Full Privacy & Security Rule compliance with signed BAAs, audit logging, and breach-notification procedures.", status: "Compliant" },
    { name: "HITRUST CSF", desc: "Certified against the healthcare industry's most rigorous combined security framework.", status: "Certified" },
    { name: "SOC 2 Type II", desc: "Annual independent audit of security, availability, and confidentiality controls.", status: "Certified" },
    { name: "GDPR", desc: "EU patient-data protections for international deployments, including right-to-erasure workflows.", status: "Compliant" },
    { name: "FDA 21 CFR Part 11", desc: "Electronic records and signatures controls for clinical documentation integrity.", status: "Compliant" },
    { name: "ONC Health IT Certification", desc: "Certified EHR technology under the ONC Health IT Certification Program.", status: "In progress" },
  ],
  dataRetention: "Patient health records are retained per state medical-records statutes (typically 7–10 years; 25 years for minors where required). On contract termination, clinics receive a full FHIR export; PHI is purged from our systems within 60 days.",
  plans: [
    { name: "Clinic", price: "Free", desc: "For solo practitioners getting started.", features: ["1 provider", "Scheduling & intake", "Patient portal", "Email support"], cta: "Start free" },
    { name: "Practice", price: "$299", period: "mo", desc: "For multi-provider practices.", features: ["Up to 15 providers", "Telehealth suite", "Pharmacy & e-prescribing", "Claims & billing automation", "Priority support with BAA"], highlight: true, cta: "Start 30-day trial" },
    { name: "Health system", price: "Custom", desc: "For hospitals and clinic networks.", features: ["Unlimited providers & sites", "HL7/FHIR integrations", "Ward & bed management", "Dedicated CSM & 24/7 SLA", "On-prem or VPC deployment"], cta: "Talk to sales" },
  ],
  notifications: [
    { title: "Critical lab result", body: "Potassium 6.2 mmol/L flagged for patient J. Alvarez (MRN 48213). Provider notified.", time: "8 min ago", tone: "red", unread: true },
    { title: "Appointment confirmed", body: "R. Chen confirmed tomorrow's 9:30 AM telehealth follow-up via SMS.", time: "25 min ago", tone: "green", unread: true },
    { title: "Pharmacy stock low", body: "Amoxicillin 500mg below reorder threshold (12 units left). Reorder suggested.", time: "1 h ago", tone: "amber", unread: true },
    { title: "Claim denied", body: "Claim #CLM-90412 denied by payer (code CO-97). Auto-appeal drafted for review.", time: "4 h ago", tone: "amber" },
    { title: "Ward census updated", body: "ICU occupancy at 86% — 2 beds available. Overflow protocol not yet triggered.", time: "Yesterday", tone: "blue" },
  ],
  changelog: [
    { version: "v5.2", date: "Jun 1, 2026", tag: "New", items: ["E-prescribing for controlled substances (EPCS)", "Spanish-language patient portal", "Automated eligibility checks before visits"] },
    { version: "v5.1", date: "May 8, 2026", tag: "Improved", items: ["Telehealth video quality on low bandwidth", "Faster chart loading for long patient histories", "Smarter appointment-reminder timing"] },
    { version: "v5.0", date: "Apr 14, 2026", tag: "New", items: ["Redesigned clinical dashboard", "FHIR R4 bulk export", "Ward occupancy heatmaps"] },
  ],
  stats: [
    { value: "12M", label: "Patients served" },
    { value: "3,400", label: "Clinics & providers" },
    { value: "−38%", label: "Appointment no-shows" },
    { value: "99.99%", label: "Platform uptime" },
  ],
  testimonial: {
    quote: "MedOS cut our charting time nearly in half and gave our providers their evenings back. Eligibility checks and telehealth just work — our care teams finally trust the system instead of fighting it.",
    author: "Dr. Priya Nair",
    role: "Chief Medical Officer, Riverbend Health Network",
  },
};

export function HealthAbout() { return <AboutPage meta={healthMeta} extra={healthExtra} />; }
export function HealthPrivacy() { return <PrivacyPage meta={healthMeta} extra={healthExtra} />; }
export function HealthPricing() { return <PricingPage meta={healthMeta} extra={healthExtra} />; }
export function HealthNotifications() { return <NotificationsPage meta={healthMeta} extra={healthExtra} />; }
export function HealthChangelog() { return <ChangelogPage meta={healthMeta} extra={healthExtra} />; }
export function HealthNotFound() { return <NotFoundPage meta={healthMeta} />; }
import { HeartPulse, Thermometer, Wind, Droplets, CalendarDays, Pill, CheckCircle2, Search, Video, Mic, MicOff, PhoneOff, Send, BedDouble, PackageOpen, FileText } from "lucide-react";
import { Card, SectionTitle, Badge, Drawer, Stat, useFakeSubmit, Skeleton, Tone } from "../components/ui";
import { AreaChart } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

const insights: Insight[] = [
  { title: "Readmission risk flagged", body: "Patient M. Rivera shows a vitals pattern matching 30-day readmission cohorts. Suggest follow-up within 72 hours of discharge.", tone: "amber", tag: "Risk model", confidence: 81 },
  { title: "Prescription interaction check", body: "No contraindications found across today's 14 prescription orders. Two orders auto-adjusted for renal dosing.", tone: "green", tag: "Safety", confidence: 96 },
  { title: "Scheduling optimization", body: "Shifting two cardiology slots to morning blocks would cut average wait time by 18 minutes on Thursdays.", tone: "blue", tag: "Operations", confidence: 72 },
];

const vitals = [
  { label: "Heart rate", value: "78 bpm", icon: HeartPulse, trend: [72, 75, 74, 78, 76, 78], tone: "text-rose-500" },
  { label: "Temperature", value: "98.4 °F", icon: Thermometer, trend: [98.2, 98.3, 98.6, 98.4, 98.4, 98.4], tone: "text-amber-500" },
  { label: "SpO₂", value: "97%", icon: Wind, trend: [96, 97, 97, 98, 97, 97], tone: "text-sky-500" },
  { label: "Blood pressure", value: "122/81", icon: Droplets, trend: [124, 121, 123, 120, 122, 122], tone: "text-violet-500" },
];

const triage: { name: string; complaint: string; priority: "Critical" | "Urgent" | "Stable"; room: string }[] = [
  { name: "J. Okafor", complaint: "Chest pain, radiating", priority: "Critical", room: "ER-2" },
  { name: "M. Rivera", complaint: "Post-op fever", priority: "Urgent", room: "ER-5" },
  { name: "S. Tan", complaint: "Wrist fracture", priority: "Urgent", room: "ER-7" },
  { name: "A. Novak", complaint: "Migraine, recurring", priority: "Stable", room: "Waiting" },
];
const prioTone: Record<string, Tone> = { Critical: "red", Urgent: "amber", Stable: "green" };

const ehr = [
  { date: "Jun 11, 2026", title: "Vitals recorded — stable", detail: "All readings within expected post-operative ranges.", type: "Observation" },
  { date: "Jun 10, 2026", title: "Prescription updated", detail: "Amoxicillin 500mg, 3×/day for 7 days. Renal dosing verified.", type: "Medication" },
  { date: "Jun 9, 2026", title: "Laparoscopic appendectomy", detail: "Procedure completed without complication. Est. recovery 2–3 weeks.", type: "Procedure" },
  { date: "Jun 8, 2026", title: "Admitted via ER", detail: "Acute abdominal pain; CT confirmed appendicitis.", type: "Encounter" },
];

export function HealthDashboard() {
  const [patient, setPatient] = useState<typeof triage[number] | null>(null);
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {vitals.map(v => (
            <Card key={v.label} className="card-hover animate-fadeUp">
              <div className="flex items-center justify-between">
                <span className="eyebrow">{v.label}</span>
                <v.icon size={16} className={v.tone} />
              </div>
              <div className="mt-2 font-display text-xl font-bold">{v.value}</div>
              <div className="mt-1 h-8"><AreaChart data={v.trend} height={32} stroke="currentColor" /></div>
            </Card>
          ))}
        </div>
        <Card>
          <SectionTitle eyebrow="Emergency department" title="Triage board" right={<Badge tone="red" pulse>1 critical</Badge>} />
          <div className="space-y-2">
            {triage.map(t => (
              <button key={t.name} onClick={() => setPatient(t)}
                className="w-full flex items-center gap-3 rounded-lg border border-[var(--line)] p-3 hover:border-accent/40 transition-colors text-left">
                <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${t.priority === "Critical" ? "bg-rose-500 animate-pulseDot" : t.priority === "Urgent" ? "bg-amber-500" : "bg-emerald-500"}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs ink-2">{t.complaint}</div>
                </div>
                <Badge tone={prioTone[t.priority]}>{t.priority}</Badge>
                <span className="text-xs font-mono ink-2 w-14 text-right">{t.room}</span>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Patient record" title="EHR timeline — M. Rivera" />
          <ol className="relative ml-3 border-l border-[var(--line)] space-y-5">
            {ehr.map(e => (
              <li key={e.title} className="pl-5 relative">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/15" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">{e.title}</span>
                  <Badge tone="blue">{e.type}</Badge>
                </div>
                <p className="text-sm ink-2 mt-0.5">{e.detail}</p>
                <div className="text-[11px] ink-2 font-mono mt-1">{e.date}</div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Pharmacy" title="Prescription queue" right={<Pill size={16} className="text-accent" />} />
          <div className="space-y-2.5">
            {[["Amoxicillin 500mg", "M. Rivera", "Ready"], ["Atorvastatin 20mg", "J. Okafor", "Verifying"], ["Sumatriptan 50mg", "A. Novak", "Queued"]].map(([rx, who, st]) => (
              <div key={rx} className="flex items-center justify-between rounded-lg border border-[var(--line)] p-3">
                <div><div className="text-sm font-medium">{rx}</div><div className="text-xs ink-2">{who}</div></div>
                <Badge tone={st === "Ready" ? "green" : st === "Verifying" ? "amber" : "gray"}>{st}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <AIPanel context="Ward 4 · ER · last 24 hours" insights={insights} />
      </div>

      <Drawer open={!!patient} onClose={() => setPatient(null)} title="Triage detail">
        {patient && (
          <div className="space-y-4 text-sm">
            <div className="font-display text-2xl font-bold">{patient.name}</div>
            <Badge tone={prioTone[patient.priority]} pulse={patient.priority === "Critical"}>{patient.priority}</Badge>
            <p className="ink-2">{patient.complaint}. Assigned to {patient.room}. Vitals capture in progress; attending physician notified.</p>
            <button className="btn-primary w-full justify-center">Open full chart</button>
          </div>
        )}
      </Drawer>
    </div>
  );
}

export function SchedulerScreen() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["9:00", "10:00", "11:00", "1:00", "2:00", "3:00"];
  const booked: Record<string, string> = { "Mon-9:00": "Dr. Iyer", "Mon-11:00": "Dr. Chen", "Tue-10:00": "Dr. Iyer", "Wed-2:00": "Dr. Bauer", "Thu-9:00": "Dr. Chen", "Fri-1:00": "Dr. Iyer" };
  const [picked, setPicked] = useState<string | null>(null);
  const { state, submit, reset } = useFakeSubmit();
  return (
    <Card className="max-w-3xl mx-auto">
      <SectionTitle eyebrow="Scheduling" title="Book an appointment" right={<CalendarDays size={16} className="text-accent" />} />
      {state === "done" ? (
        <div className="text-center py-10 animate-fadeUp">
          <CheckCircle2 className="mx-auto text-emerald-500" size={40} />
          <div className="font-display font-semibold mt-3">Appointment confirmed</div>
          <p className="text-sm ink-2 mt-1">{picked?.replace("-", " · ")} — confirmation sent to the patient portal.</p>
          <button className="btn-ghost mt-5" onClick={() => { reset(); setPicked(null); }}>Book another</button>
        </div>
      ) : state === "loading" ? (
        <div className="space-y-3 py-4"><Skeleton className="h-12" /><Skeleton className="h-12" /><Skeleton className="h-12" /></div>
      ) : (
        <>
          <div className="grid grid-cols-6 gap-2 text-center text-xs">
            <div />
            {days.map(d => <div key={d} className="eyebrow py-1">{d}</div>)}
            {slots.map(s => (
              <Fragment key={s}>
                <div className="eyebrow py-2.5 text-right pr-1">{s}</div>
                {days.map(d => {
                  const k = `${d}-${s}`;
                  const taken = booked[k];
                  return (
                    <button key={k} disabled={!!taken} onClick={() => setPicked(k)}
                      className={`rounded-md border py-2.5 transition-all duration-150 ${taken ? "border-[var(--line)] ink-2 cursor-not-allowed opacity-60" : picked === k ? "border-accent bg-accent text-white shadow-glow" : "border-[var(--line)] hover:border-accent/50"}`}>
                      {taken ?? "Open"}
                    </button>
                  );
                })}
              </Fragment>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button className="btn-primary" disabled={!picked} onClick={submit}>Confirm {picked ? picked.replace("-", " · ") : "slot"}</button>
          </div>
        </>
      )}
    </Card>
  );
}

type Patient = { mrn: string; name: string; age: number; dept: string; physician: string; status: "Admitted" | "Outpatient" | "Discharged" };
const patients: Patient[] = [
  { mrn: "MRN-48210", name: "M. Rivera", age: 34, dept: "Surgery", physician: "Dr. Chen", status: "Admitted" },
  { mrn: "MRN-48022", name: "J. Okafor", age: 58, dept: "Cardiology", physician: "Dr. Iyer", status: "Admitted" },
  { mrn: "MRN-47990", name: "S. Tan", age: 26, dept: "Orthopedics", physician: "Dr. Bauer", status: "Outpatient" },
  { mrn: "MRN-47764", name: "A. Novak", age: 41, dept: "Neurology", physician: "Dr. Iyer", status: "Outpatient" },
  { mrn: "MRN-47518", name: "P. Almeida", age: 67, dept: "Cardiology", physician: "Dr. Iyer", status: "Discharged" },
  { mrn: "MRN-47301", name: "H. Yamada", age: 52, dept: "Oncology", physician: "Dr. Chen", status: "Admitted" },
];
const patientTone: Record<Patient["status"], Tone> = { Admitted: "blue", Outpatient: "violet", Discharged: "gray" };

export function PatientDirectory() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Patient | null>(null);
  const filtered = patients.filter(p => (p.name + p.mrn + p.dept + p.physician).toLowerCase().includes(q.toLowerCase()));
  return (
    <Card className="max-w-4xl mx-auto">
      <SectionTitle eyebrow="Records" title="Patient directory" right={<span className="text-xs ink-2">{filtered.length} of 12,408 records</span>} />
      <div className="flex items-center gap-2 rounded-lg border border-[var(--line)] px-3 py-2 mb-4 focus-within:border-accent/60 focus-within:ring-2 focus-within:ring-accent/20 transition">
        <Search size={14} className="ink-2" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, MRN, department, physician…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink-2)]" />
      </div>
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              {["Patient", "MRN", "Age", "Department", "Physician", "Status"].map(h => <th key={h} className="eyebrow pb-2.5 pr-4 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {filtered.map(p => (
              <tr key={p.mrn} onClick={() => setSel(p)} className="hover:bg-accent/5 cursor-pointer transition-colors">
                <td className="py-3 pr-4 font-medium">{p.name}</td>
                <td className="py-3 pr-4 font-mono text-xs ink-2">{p.mrn}</td>
                <td className="py-3 pr-4 ink-2">{p.age}</td>
                <td className="py-3 pr-4">{p.dept}</td>
                <td className="py-3 pr-4 ink-2">{p.physician}</td>
                <td className="py-3"><Badge tone={patientTone[p.status]}>{p.status}</Badge></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="py-8 text-center ink-2">No patients match "{q}".</td></tr>}
          </tbody>
        </table>
      </div>
      <Drawer open={!!sel} onClose={() => setSel(null)} title="Patient summary">
        {sel && (
          <div className="space-y-4 text-sm">
            <div className="font-display text-2xl font-bold">{sel.name}</div>
            <Badge tone={patientTone[sel.status]}>{sel.status}</Badge>
            <dl className="space-y-3">
              {[["MRN", sel.mrn], ["Age", String(sel.age)], ["Department", sel.dept], ["Attending", sel.physician], ["Insurance", "BlueShield PPO · verified"], ["Allergies", "Penicillin"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[var(--line)] pb-2">
                  <dt className="ink-2">{k}</dt><dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <button className="btn-primary w-full justify-center">Open full chart</button>
          </div>
        )}
      </Drawer>
    </Card>
  );
}

export function TelehealthScreen() {
  const [muted, setMuted] = useState(false);
  const [msgs, setMsgs] = useState([
    { who: "Dr. Iyer", text: "Good morning! How has the incision site looked since Tuesday?" },
    { who: "You", text: "Much better — redness is gone and no fever since Sunday." },
  ]);
  const [draft, setDraft] = useState("");
  const sendMsg = () => { if (!draft.trim()) return; setMsgs(m => [...m, { who: "You", text: draft.trim() }]); setDraft(""); };
  return (
    <div className="grid gap-5 lg:grid-cols-3 max-w-5xl mx-auto">
      <Card className="lg:col-span-2 !p-0 overflow-hidden">
        <div className="aspect-video bg-obsidian-950 relative grid place-items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-violet-500/20" />
          <div className="text-center relative">
            <span className="grid place-items-center h-20 w-20 rounded-full bg-accent/30 text-white font-display text-2xl font-bold mx-auto">DI</span>
            <div className="text-white mt-3 font-medium">Dr. Iyer · Cardiology</div>
            <div className="text-xs text-white/70 font-mono mt-1">Post-op follow-up · 12:04 elapsed</div>
          </div>
          <div className="absolute top-3 right-3 h-24 w-36 rounded-lg bg-zinc-800 border border-white/15 grid place-items-center text-white/60 text-xs">You</div>
          <div className="absolute top-3 left-3"><Badge tone="green" pulse>Encrypted</Badge></div>
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-3">
            <button onClick={() => setMuted(m => !m)} aria-label={muted ? "Unmute" : "Mute"}
              className={`grid place-items-center h-11 w-11 rounded-full transition-colors ${muted ? "bg-amber-500 text-white" : "bg-white/15 text-white hover:bg-white/25"}`}>
              {muted ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <button className="grid place-items-center h-11 w-11 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors" aria-label="Camera settings"><Video size={18} /></button>
            <button className="grid place-items-center h-11 w-11 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors" aria-label="End call"><PhoneOff size={18} /></button>
          </div>
        </div>
        <div className="px-5 py-3.5 flex items-center justify-between text-xs ink-2">
          <span>Connection: excellent · 48 ms</span>
          <span className="font-mono">Visit ID TH-3318 · recorded with consent</span>
        </div>
      </Card>
      <Card className="flex flex-col !p-0 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[var(--line)]"><SectionTitle eyebrow="Visit chat" title="Messages" /></div>
        <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-64">
          {msgs.map((m, i) => (
            <div key={i} className={`max-w-[85%] rounded-xl px-3.5 py-2 text-sm animate-fadeUp ${m.who === "You" ? "ml-auto bg-accent text-white rounded-br-sm" : "surface rounded-bl-sm"}`}>
              <div className={`text-[10px] font-semibold mb-0.5 ${m.who === "You" ? "text-white/75" : "ink-2"}`}>{m.who}</div>
              {m.text}
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-[var(--line)] flex gap-2">
          <input className="field !py-1.5" placeholder="Type a message…" value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} />
          <button className="btn-primary !px-3" onClick={sendMsg} aria-label="Send message"><Send size={15} /></button>
        </div>
      </Card>
    </div>
  );
}

const stock = [
  { drug: "Amoxicillin 500mg", onHand: 412, par: 300, expiry: "Feb 2027" },
  { drug: "Atorvastatin 20mg", onHand: 96, par: 250, expiry: "Nov 2026" },
  { drug: "Sumatriptan 50mg", onHand: 28, par: 120, expiry: "Sep 2026" },
  { drug: "Insulin glargine", onHand: 64, par: 80, expiry: "Aug 2026" },
  { drug: "Ondansetron 4mg", onHand: 310, par: 200, expiry: "Jan 2028" },
];

export function PharmacyInventory() {
  const [ordered, setOrdered] = useState<Record<string, boolean>>({});
  const low = stock.filter(s => s.onHand < s.par * 0.5).length;
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="SKUs tracked" value="1,284" icon={<PackageOpen size={16} />} />
        <Stat label="Below reorder point" value={String(low)} delta="Reorder suggested" deltaTone="amber" />
        <Stat label="Expiring < 90 days" value="7" delta="2 high-volume" deltaTone="red" />
      </div>
      <Card>
        <SectionTitle eyebrow="Pharmacy" title="Inventory levels" right={<Badge tone="amber">{low} low stock</Badge>} />
        <div className="space-y-3">
          {stock.map(s => {
            const pct = Math.min(100, Math.round((s.onHand / s.par) * 100));
            const isLow = s.onHand < s.par * 0.5;
            const isOrdered = !!ordered[s.drug];
            return (
              <div key={s.drug} className="rounded-lg border border-[var(--line)] p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-44">
                    <div className="text-sm font-medium">{s.drug}</div>
                    <div className="text-xs ink-2 mt-0.5">Par level {s.par} · expires {s.expiry}</div>
                  </div>
                  <span className={`text-sm font-mono font-semibold ${isLow ? "text-rose-600 dark:text-rose-400" : ""}`}>{s.onHand} units</span>
                  {isLow && (isOrdered
                    ? <Badge tone="green">PO created</Badge>
                    : <button className="btn-primary !py-1.5 text-xs" onClick={() => setOrdered(o => ({ ...o, [s.drug]: true }))}>Reorder</button>)}
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${isLow ? "bg-rose-500" : pct < 80 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export function IntakeForm() {
  const { state, submit, reset } = useFakeSubmit();
  return (
    <Card className="max-w-2xl mx-auto">
      <SectionTitle eyebrow="Front desk" title="New patient intake" />
      {state === "done" ? (
        <div className="text-center py-10 animate-fadeUp">
          <CheckCircle2 className="mx-auto text-emerald-500" size={40} />
          <div className="font-display font-semibold mt-3">Patient registered</div>
          <p className="text-sm ink-2 mt-1">MRN-48211 created. Insurance eligibility check is running in the background.</p>
          <button className="btn-ghost mt-5" onClick={reset}>Register another</button>
        </div>
      ) : state === "loading" ? (
        <div className="space-y-3 py-2"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-20" /></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 animate-fadeUp">
          <div><label className="label">First name</label><input className="field" placeholder="Jordan" /></div>
          <div><label className="label">Last name</label><input className="field" placeholder="Ellis" /></div>
          <div><label className="label">Date of birth</label><input className="field" type="date" /></div>
          <div><label className="label">Phone</label><input className="field" type="tel" placeholder="(602) 555-0144" /></div>
          <div><label className="label">Insurance carrier</label><select className="field"><option>BlueShield PPO</option><option>UnitedHealth HMO</option><option>Medicare</option><option>Self-pay</option></select></div>
          <div><label className="label">Member ID</label><input className="field font-mono" placeholder="XEH-4410-22" /></div>
          <div className="sm:col-span-2"><label className="label">Reason for visit</label><textarea className="field min-h-20" placeholder="Brief description of symptoms or referral reason" /></div>
          <div className="sm:col-span-2 flex items-center gap-2 text-sm">
            <input id="consent" type="checkbox" className="accent-[#4f6df5] h-4 w-4" defaultChecked />
            <label htmlFor="consent" className="ink-2">Patient consents to electronic records and messaging (HIPAA notice provided).</label>
          </div>
          <div className="sm:col-span-2 flex justify-end"><button className="btn-primary" onClick={submit}>Register patient</button></div>
        </div>
      )}
    </Card>
  );
}

export function WardOccupancy() {
  const wards: { name: string; beds: Array<"free" | "occupied" | "cleaning"> }[] = [
    { name: "Ward 2 · Cardiology", beds: ["occupied", "occupied", "free", "occupied", "cleaning", "occupied", "occupied", "free"] },
    { name: "Ward 4 · Surgery", beds: ["occupied", "occupied", "occupied", "occupied", "occupied", "cleaning", "occupied", "occupied"] },
    { name: "Ward 5 · Pediatrics", beds: ["free", "occupied", "free", "free", "occupied", "free", "occupied", "free"] },
    { name: "ICU", beds: ["occupied", "occupied", "occupied", "free", "occupied", "occupied"] },
  ];
  const all = wards.flatMap(w => w.beds);
  const occ = all.filter(b => b === "occupied").length;
  const bedClass = { occupied: "bg-accent/80 border-accent text-white", free: "border-[var(--line)] hover:border-emerald-500/60", cleaning: "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400" };
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Occupancy" value={`${Math.round((occ / all.length) * 100)}%`} delta={`${occ} of ${all.length} beds`} deltaTone="blue" icon={<BedDouble size={16} />} />
        <Stat label="Avg. length of stay" value="3.6 days" delta="−0.4 vs target" />
        <Stat label="Discharges today" value="5" delta="3 before noon" />
      </div>
      <Card>
        <SectionTitle eyebrow="Capacity" title="Bed board" right={
          <div className="flex items-center gap-3 text-[11px] ink-2">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-accent/80" /> Occupied</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded border border-[var(--line)]" /> Free</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-amber-500/40" /> Turnover</span>
          </div>
        } />
        <div className="space-y-5">
          {wards.map(w => (
            <div key={w.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{w.name}</span>
                <span className="text-xs ink-2 font-mono">{w.beds.filter(b => b === "free").length} free</span>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {w.beds.map((b, i) => (
                  <div key={i} title={`Bed ${i + 1}: ${b}`}
                    className={`aspect-[4/3] rounded-md border grid place-items-center text-[10px] font-mono transition-colors cursor-default ${bedClass[b]}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Medical Billing & Insurance Claims ───────────────────────────────────────

type Claim = { id: string; patient: string; provider: string; icd: string; amount: number; status: "Submitted" | "Adjudicated" | "Paid" | "Denied"; date: string; payer: string };
const claims: Claim[] = [
  { id: "CLM-9841", patient: "J. Okafor", provider: "Dr. E. Park", icd: "I21.3 – NSTEMI", amount: 4820, status: "Submitted", date: "Jun 11", payer: "BlueCross PPO" },
  { id: "CLM-9838", patient: "M. Rivera", provider: "Dr. A. Gupta", icd: "T81.4 – Post-op infection", amount: 2160, status: "Adjudicated", date: "Jun 10", payer: "Aetna HMO" },
  { id: "CLM-9831", patient: "S. Tan", provider: "Dr. F. Collins", icd: "S62.0 – Wrist fracture", amount: 1380, status: "Paid", date: "Jun 9", payer: "UHC Choice" },
  { id: "CLM-9824", patient: "A. Novak", provider: "Dr. E. Park", icd: "G43.9 – Migraine", amount: 680, status: "Denied", date: "Jun 7", payer: "Cigna PPO" },
  { id: "CLM-9819", patient: "P. Osei", provider: "Dr. A. Gupta", icd: "K80.2 – Gallstone", amount: 3240, status: "Paid", date: "Jun 5", payer: "Aetna HMO" },
];
const claimTone: Record<Claim["status"], Tone> = { Submitted: "blue", Adjudicated: "violet", Paid: "green", Denied: "red" };
const claimStages: Claim["status"][] = ["Submitted", "Adjudicated", "Paid", "Denied"];

export function MedicalBillingScreen() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Claim | null>(null);
  const filtered = claims.filter(c => (c.patient + c.icd + c.payer).toLowerCase().includes(search.toLowerCase()));
  const byStage = (s: Claim["status"]) => claims.filter(c => c.status === s);
  const totalPaid = claims.filter(c => c.status === "Paid").reduce((a, c) => a + c.amount, 0);

  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Claims · 30d" value="142" delta="+8 vs prior month" />
          <Stat label="Paid · MTD" value={`$${(totalPaid / 1000).toFixed(1)}k`} delta="Collected" deltaTone="green" />
          <Stat label="Denial rate" value="12.4%" delta="Industry avg 14%" deltaTone="green" />
        </div>
        <Card>
          <SectionTitle eyebrow="Pipeline" title="Claims by stage" />
          <div className="grid grid-cols-4 gap-3 mt-2">
            {claimStages.map(s => (
              <div key={s} className={`rounded-lg border p-3 text-center ${s === "Denied" ? "border-rose-500/30 bg-rose-500/5" : s === "Paid" ? "border-emerald-500/30 bg-emerald-500/5" : "border-[var(--line)]"}`}>
                <Badge tone={claimTone[s]}>{s}</Badge>
                <div className="font-display text-2xl font-bold mt-2">{byStage(s).length}</div>
                <div className="text-xs ink-2">{s === "Paid" ? `$${(byStage(s).reduce((a, c) => a + c.amount, 0) / 1000).toFixed(1)}k` : "claims"}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Claims" title="Claim register" right={
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 ink-2" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ICD, patient…"
                className="field !pl-8 !py-1.5 text-xs w-48" />
            </div>
          } />
          <div className="divide-y divide-[var(--line)]">
            {filtered.map(c => (
              <button key={c.id} onClick={() => setSelected(c)}
                className="w-full grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_110px_100px_80px] items-center gap-3 py-3 text-left hover:bg-accent/5 rounded-lg px-2 -mx-2 transition-colors">
                <div>
                  <div className="text-sm font-medium">{c.patient}</div>
                  <div className="text-xs ink-2">{c.icd} · {c.payer}</div>
                </div>
                <div className="text-xs ink-2 hidden sm:block">{c.date}</div>
                <div className="text-sm font-mono font-semibold text-right">${c.amount.toLocaleString()}</div>
                <div className="text-right"><Badge tone={claimTone[c.status]}>{c.status}</Badge></div>
              </button>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="ICD-10" title="Code lookup" />
          <div className="relative mb-3">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 ink-2" />
            <input placeholder="Search diagnosis code…" className="field !pl-8 text-sm" defaultValue="I21" />
          </div>
          <div className="space-y-2">
            {([["I21.3", "NSTEMI"], ["I21.0", "Anterior STEMI"], ["I21.1", "Inferior STEMI"], ["I25.1", "Atherosclerotic CAD"]] as [string, string][]).map(([code, desc]) => (
              <button key={code} className="w-full flex items-center gap-3 rounded-lg border border-[var(--line)] p-2.5 text-left hover:border-accent/40 transition-colors">
                <Badge tone="blue">{code}</Badge>
                <span className="text-xs">{desc}</span>
              </button>
            ))}
          </div>
        </Card>
        <AIPanel context="Medical billing & claims, June 2026" insights={[
          { title: "Denial pattern found", body: "4 of 5 Cigna denials share code CO-4 (non-covered service). Updating prior auth for those CPT codes cuts future denials.", tone: "amber", tag: "Denials", confidence: 86 },
          { title: "Undercoding detected", body: "3 ER visits coded Level 3 show Level 4 documentation. Recoding adds an estimated $1,840 in recoverable revenue.", tone: "green", tag: "Revenue", confidence: 78 },
        ]} />
      </div>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Claim detail">
        {selected && (
          <div className="space-y-4">
            <div className="font-display text-2xl font-bold">${selected.amount.toLocaleString()}</div>
            <Badge tone={claimTone[selected.status]} pulse={selected.status === "Submitted"}>{selected.status}</Badge>
            <dl className="space-y-3 text-sm">
              {[["Claim ID", selected.id], ["Patient", selected.patient], ["Provider", selected.provider], ["Diagnosis", selected.icd], ["Payer", selected.payer], ["Submitted", selected.date]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[var(--line)] pb-2">
                  <dt className="ink-2">{k}</dt><dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            {selected.status === "Denied" && (
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-sm">
                <div className="font-semibold text-rose-600 dark:text-rose-400 mb-1">Denial reason</div>
                <div className="text-xs ink-2">CO-4: Service not covered under current plan year. File appeal within 90 days.</div>
              </div>
            )}
            <button className="btn-primary w-full justify-center">
              <FileText size={14} /> {selected.status === "Denied" ? "File appeal" : "Download EOB"}
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
