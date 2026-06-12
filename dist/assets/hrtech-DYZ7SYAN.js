const e=`// src/domains/hrtech.tsx
import { useState } from "react";
import { HomePage, LoginPage, RegisterPage, ProfilePage, SettingsPage, FAQPage, SupportPage, DomainMeta } from "./pages";
import { AboutPage, PrivacyPage, PricingPage, NotificationsPage, ChangelogPage, NotFoundPage, DomainExtra } from "./pages-extra";

const hrtechMeta: DomainMeta = {
  id: "hrtech",
  name: "TalentOS",
  tagline: "End-to-end talent acquisition, onboarding, and workforce analytics for people-first companies.",
  description: "Hire better, onboard faster, and build a diverse workforce with TalentOS.",
  accentLabel: "HRTech · ATS · Onboarding · DEI",
  features: [
    { icon: "🎯", title: "Applicant tracking", body: "AI-ranked pipelines, structured interviews, and collaborative scorecards." },
    { icon: "🤝", title: "Seamless onboarding", body: "Digital paperwork, equipment provisioning, and 90-day check-ins automated." },
    { icon: "📊", title: "DEI analytics", body: "Representation dashboards and pay equity analysis to build inclusive teams." },
  ],
  faqs: [
    { q: "Does TalentOS integrate with job boards?", a: "Yes. We post to LinkedIn, Indeed, Glassdoor, and 50+ niche boards with one click. Applications sync back automatically." },
    { q: "How does the AI ranking work?", a: "Our model scores candidates against your job requirements using resume parsing, skills extraction, and structured interview signals." },
    { q: "Is the platform GDPR compliant?", a: "Yes. Candidate data is stored in your chosen region. Automated consent flows and data-retention policies are built in." },
    { q: "Can we customize the onboarding workflow?", a: "Absolutely. Build task checklists, assign equipment requests, schedule introductions, and trigger Slack/email at each milestone." },
    { q: "Does the DEI module track pay equity?", a: "Yes. The pay equity analyzer highlights gaps by role, level, gender, and ethnicity with regression-adjusted comparisons." },
    { q: "What HRIS systems does TalentOS sync with?", a: "We have native integrations with Workday, BambooHR, Rippling, and ADP, plus a universal SFTP import for others." },
  ],
  supportEmail: "support@talentos.io",
};

export function HRHome() { return <HomePage meta={hrtechMeta} />; }
export function HRLogin() { return <LoginPage meta={hrtechMeta} />; }
export function HRRegister() { return <RegisterPage meta={hrtechMeta} />; }
export function HRProfile() { return <ProfilePage meta={hrtechMeta} />; }
export function HRSettings() { return <SettingsPage meta={hrtechMeta} />; }
export function HRFAQ() { return <FAQPage meta={hrtechMeta} />; }
export function HRSupport() { return <SupportPage meta={hrtechMeta} />; }

const hrtechExtra: DomainExtra = {
  founded: "2021",
  mission: "TalentOS helps companies hire fairly, onboard warmly, and grow people deliberately.",
  story: [
    "TalentOS started in 2021 after its founders — a recruiter and a data scientist — audited hiring data at their previous company and found great candidates being lost to inbox chaos rather than to better offers. Resumes sat unread, interview feedback lived in DMs, and no one could explain why pipelines leaked.",
    "They built a system where every candidate gets a structured, trackable, bias-checked journey. What began as an ATS grew into onboarding, an internal talent marketplace, and DEI analytics. TalentOS now powers hiring at 3,000+ companies across 40 countries.",
  ],
  team: [
    { name: "Grace Adeyemi", role: "Co-founder & CEO", emoji: "👩🏿‍💼", bio: "Recruiter for a decade before switching sides to fix the tooling. Reads every churned-customer note." },
    { name: "Felix Braun", role: "Co-founder & Chief Data Scientist", emoji: "📊", bio: "Built the candidate-ranking models and the bias audits that keep them honest." },
    { name: "Rosa Jiménez", role: "Head of People Science", emoji: "🌱", bio: "Organizational psychologist. Designs the structured interview kits and onboarding journeys." },
    { name: "Sam Whitfield", role: "Head of Engineering", emoji: "👨‍💻", bio: "Scaled the platform from 10 to 3,000 customers without a single hiring-day outage." },
  ],
  compliance: [
    { name: "GDPR", desc: "Candidate consent flows, regional data residency, and automated retention policies built in.", status: "Compliant" },
    { name: "EEOC / OFCCP", desc: "US equal-employment record-keeping and adverse-impact reporting for federal contractors.", status: "Compliant" },
    { name: "SOC 2 Type II", desc: "Annual independent audit of security, availability, and confidentiality controls.", status: "Certified" },
    { name: "CCPA/CPRA", desc: "California candidate and employee privacy rights, including access and deletion requests.", status: "Compliant" },
    { name: "ISO 27001", desc: "Certified information security management system covering all production infrastructure.", status: "Certified" },
    { name: "NYC Local Law 144", desc: "Annual independent bias audits for automated employment decision tools.", status: "Compliant" },
  ],
  dataRetention: "Candidate data is retained per your configured policy (default 24 months from last activity, with automated consent renewal in the EU). Rejected-candidate data can auto-purge. Employee records follow statutory retention; all data is deleted within 30 days of contract termination.",
  plans: [
    { name: "Startup", price: "Free", desc: "For teams making their first hires.", features: ["3 open roles", "Career page & job posting", "Kanban pipeline", "Email support"], cta: "Start free" },
    { name: "Growth", price: "$129", period: "mo", desc: "For scaling people teams.", features: ["Unlimited roles", "Structured interview kits", "Onboarding workflows", "50+ job board syndication", "HRIS integrations"], highlight: true, cta: "Start 14-day trial" },
    { name: "Enterprise", price: "Custom", desc: "For global workforces.", features: ["DEI & pay-equity analytics", "Internal talent marketplace", "Bias audit reporting", "SAML SSO & SCIM", "Dedicated CSM"], cta: "Talk to sales" },
  ],
  notifications: [
    { title: "Offer accepted", body: "Nadia Hussain accepted the Senior Backend Engineer offer. Onboarding kicks off Jul 1.", time: "10 min ago", tone: "green", unread: true },
    { title: "Interview feedback overdue", body: "2 scorecards pending for yesterday's Product Designer panel (loop closes today).", time: "42 min ago", tone: "amber", unread: true },
    { title: "New referral", body: "K. Osei referred a candidate for Staff Data Engineer — auto-advanced to recruiter screen.", time: "2 h ago", tone: "blue", unread: true },
    { title: "Onboarding task blocked", body: "Laptop provisioning for M. Silva is overdue (start date in 3 days). IT notified.", time: "6 h ago", tone: "red" },
    { title: "DEI quarterly report ready", body: "Q2 representation and pay-equity report is ready for People leadership review.", time: "Yesterday", tone: "green" },
  ],
  changelog: [
    { version: "v4.6", date: "Jun 8, 2026", tag: "New", items: ["Internal talent marketplace with skills matching", "Self-scheduling interview links for candidates", "WhatsApp candidate messaging"] },
    { version: "v4.5", date: "May 19, 2026", tag: "Improved", items: ["Resume parsing accuracy for non-English CVs", "Bulk pipeline actions with undo", "Faster DEI dashboard loads on large orgs"] },
    { version: "v4.4", date: "Apr 28, 2026", tag: "Fixed", items: ["Duplicate candidates from simultaneous job-board applies", "Calendar sync conflicts for panel interviews", "Time-zone display on offer expiry dates"] },
  ],
};

export function HRAbout() { return <AboutPage meta={hrtechMeta} extra={hrtechExtra} />; }
export function HRPrivacy() { return <PrivacyPage meta={hrtechMeta} extra={hrtechExtra} />; }
export function HRPricing() { return <PricingPage meta={hrtechMeta} extra={hrtechExtra} />; }
export function HRNotifications() { return <NotificationsPage meta={hrtechMeta} extra={hrtechExtra} />; }
export function HRChangelog() { return <ChangelogPage meta={hrtechMeta} extra={hrtechExtra} />; }
export function HRNotFound() { return <NotFoundPage meta={hrtechMeta} />; }
import { Users, Star, CheckCircle2, FileText, Briefcase } from "lucide-react";
import { Card, SectionTitle, Badge, Drawer, useFakeSubmit, Skeleton, Stat, Tone } from "../components/ui";
import { Donut, Bars, Radar } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

const insights: Insight[] = [
  { title: "Pipeline bottleneck", body: "Candidates spend a median of 9 days in 'Technical screen' — 3× other stages. Adding one more interviewer clears the queue in 2 weeks.", tone: "amber", tag: "Throughput", confidence: 85 },
  { title: "Strong-fit candidate", body: "Priya N. matches 94% of the Platform Engineer rubric, including rare ServiceNow + React overlap. Recommend fast-tracking to onsite.", tone: "green", tag: "Matching", confidence: 91 },
  { title: "Offer-decline pattern", body: "3 of last 5 declines cite compensation band vs. market median for Phoenix. Band refresh suggested before next offers.", tone: "blue", tag: "Comp intel", confidence: 70 },
];

type Cand = { name: string; role: string; score: number; tags: string[] };
const pipeline: { stage: string; tone: Tone; cands: Cand[] }[] = [
  { stage: "Applied", tone: "gray", cands: [{ name: "Diego M.", role: "Platform Engineer", score: 71, tags: ["AWS", "Go"] }, { name: "Lena K.", role: "Product Designer", score: 78, tags: ["Figma", "Design systems"] }] },
  { stage: "Technical screen", tone: "blue", cands: [{ name: "Priya N.", role: "Platform Engineer", score: 94, tags: ["ServiceNow", "React"] }, { name: "Omar H.", role: "Platform Engineer", score: 82, tags: ["K8s", "Python"] }] },
  { stage: "Onsite", tone: "violet", cands: [{ name: "Yuki S.", role: "Product Designer", score: 88, tags: ["Prototyping"] }] },
  { stage: "Offer", tone: "green", cands: [{ name: "Carlos V.", role: "Data Analyst", score: 90, tags: ["SQL", "dbt"] }] },
];

export function ATSPipeline() {
  const [cand, setCand] = useState<Cand | null>(null);
  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
        {pipeline.map(col => (
          <div key={col.stage} className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge tone={col.tone}>{col.stage}</Badge>
              <span className="text-xs ink-2">{col.cands.length}</span>
            </div>
            {col.cands.map(c => (
              <button key={c.name} onClick={() => setCand(c)} className="card p-4 w-full text-left card-hover">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{c.name}</span>
                  <span className={\`text-xs font-mono font-bold \${c.score >= 90 ? "text-emerald-500" : c.score >= 80 ? "text-accent" : "ink-2"}\`}>{c.score}</span>
                </div>
                <div className="text-xs ink-2 mt-0.5">{c.role}</div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {c.tags.map(t => <span key={t} className="rounded-md bg-accent/8 border border-accent/20 px-1.5 py-0.5 text-[10px] font-medium text-accent dark:text-indigo-300">{t}</span>)}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle eyebrow="Interview loop" title="Scorecards — Priya N." right={<Users size={15} className="text-accent" />} />
          <div className="space-y-3">
            {[["System design", 5, "Clear tradeoff reasoning; strong governance instincts."], ["Coding", 4, "Idiomatic React; minor gaps in test coverage habits."], ["Values", 5, "Collaborative, mentors juniors, ownership mindset."]].map(([dim, stars, note]) => (
              <div key={dim as string} className="rounded-lg border border-[var(--line)] p-3.5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">{dim}</div>
                  <p className="text-xs ink-2 mt-0.5">{note}</p>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  {Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} className={i < (stars as number) ? "fill-amber-400 text-amber-400" : "text-zinc-300 dark:text-zinc-600"} />)}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <AIPanel context="Q2 hiring · 4 open roles" insights={insights} />
      </div>

      <Drawer open={!!cand} onClose={() => setCand(null)} title="Candidate profile">
        {cand && (
          <div className="space-y-4">
            <div className="font-display text-2xl font-bold">{cand.name}</div>
            <div className="text-sm ink-2">{cand.role} · Match score <span className="font-mono font-bold text-accent">{cand.score}</span></div>
            <div className="rounded-lg border border-[var(--line)] p-4 bg-[var(--bg)]">
              <div className="eyebrow mb-2">Resume preview</div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-5/6" /><Skeleton className="h-3 w-2/3" />
              </div>
              <button className="btn-ghost text-xs mt-3"><FileText size={13} /> Open full resume</button>
            </div>
            <button className="btn-primary w-full justify-center">Advance to next stage</button>
          </div>
        )}
      </Drawer>
    </div>
  );
}

export function JobPostForm() {
  const { state, submit, reset } = useFakeSubmit();
  return (
    <Card className="max-w-2xl mx-auto">
      <SectionTitle eyebrow="Recruiting" title="Create job posting" />
      {state === "done" ? (
        <div className="text-center py-10 animate-fadeUp">
          <CheckCircle2 className="mx-auto text-emerald-500" size={40} />
          <div className="font-display font-semibold mt-3">Posting published</div>
          <p className="text-sm ink-2 mt-1">Platform Engineer is now live on 4 job boards.</p>
          <button className="btn-ghost mt-5" onClick={reset}>Create another</button>
        </div>
      ) : state === "loading" ? (
        <div className="space-y-3 py-2"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-28" /></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 animate-fadeUp">
          <div className="sm:col-span-2"><label className="label">Job title</label><input className="field" defaultValue="Platform Engineer" /></div>
          <div><label className="label">Department</label><select className="field"><option>Engineering</option><option>Design</option><option>Data</option></select></div>
          <div><label className="label">Location</label><input className="field" defaultValue="Phoenix, AZ · Hybrid" /></div>
          <div><label className="label">Salary band</label><input className="field font-mono" defaultValue="$140k – $175k" /></div>
          <div><label className="label">Hiring manager</label><input className="field" defaultValue="K. Subramanian" /></div>
          <div className="sm:col-span-2"><label className="label">Description</label><textarea className="field min-h-28" defaultValue="Own the architecture of our governed AI platform. You'll pair React frontends with enterprise workflow backends and ship demos that win deals." /></div>
          <div className="sm:col-span-2 flex justify-end"><button className="btn-primary" onClick={submit}>Publish posting</button></div>
        </div>
      )}
    </Card>
  );
}

// ─── Employee Onboarding & Provisioning Center ────────────────────────────────

type DocTask = { id: string; title: string; status: "Signed" | "Pending" | "Sent" };
type HWTrack = { item: string; status: "Ordered" | "Shipped" | "Delivered"; detail: string };
const docTasks: DocTask[] = [
  { id: "d1", title: "Offer letter & employment agreement", status: "Signed" },
  { id: "d2", title: "Benefits enrollment form", status: "Signed" },
  { id: "d3", title: "Direct deposit authorization", status: "Pending" },
  { id: "d4", title: "IP & NDA agreement", status: "Sent" },
  { id: "d5", title: "Remote work policy acknowledgment", status: "Pending" },
];
const hwTracks: HWTrack[] = [
  { item: "MacBook Pro 14\\" (M3)", status: "Shipped", detail: "FedEx · Est. Jun 16" },
  { item: "External monitor (LG 27\\")", status: "Ordered", detail: "Procurement · 5–7 days" },
  { item: "Ergonomic keyboard + mouse", status: "Delivered", detail: "Delivered Jun 9" },
];
const welcomeSeq = [
  { day: "Day 1", tasks: ["Meet your onboarding buddy", "Complete HR orientation", "Set up Slack + email"], done: true },
  { day: "Day 3", tasks: ["Join team standup", "1:1 with manager", "Access all dev tools"], done: true },
  { day: "Week 2", tasks: ["Shadow product review", "First task assigned", "30-day goals set"], done: false },
  { day: "Month 1", tasks: ["Submit 30-day review", "Attend all-hands", "First PR shipped"], done: false },
];
const docTone: Record<DocTask["status"], Tone> = { Signed: "green", Pending: "amber", Sent: "blue" };
const hwTone: Record<HWTrack["status"], Tone> = { Delivered: "green", Shipped: "blue", Ordered: "amber" };

export function OnboardingScreen() {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Start date" value="Jun 16" delta="5 days out" deltaTone="blue" />
          <Stat label="Docs signed" value={\`\${docTasks.filter(d => d.status === "Signed").length}/\${docTasks.length}\`} delta="2 pending" deltaTone="amber" />
          <Stat label="Hardware ready" value={\`\${hwTracks.filter(h => h.status === "Delivered").length}/\${hwTracks.length}\`} delta="1 shipped" deltaTone="blue" />
        </div>
        <Card>
          <SectionTitle eyebrow="Documents" title="E-signature checklist" />
          <div className="space-y-2">
            {docTasks.map(d => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg border border-[var(--line)] p-3">
                <div className={\`h-5 w-5 rounded-full border-2 grid place-items-center shrink-0 \${d.status === "Signed" ? "border-emerald-500 bg-emerald-500/10" : "border-[var(--line)]"}\`}>
                  {d.status === "Signed" && <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />}
                </div>
                <span className="flex-1 text-sm">{d.title}</span>
                <Badge tone={docTone[d.status]}>{d.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="IT provisioning" title="Hardware & access tracks" />
          <div className="space-y-3">
            {hwTracks.map(h => (
              <div key={h.item} className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] p-3.5">
                <div>
                  <div className="text-sm font-medium">{h.item}</div>
                  <div className="text-xs ink-2">{h.detail}</div>
                </div>
                <Badge tone={hwTone[h.status]}>{h.status}</Badge>
              </div>
            ))}
            <div className="rounded-lg border border-[var(--line)] p-3.5">
              <div className="text-sm font-medium mb-2">Software access</div>
              <div className="flex flex-wrap gap-1.5">
                {[["Slack", true], ["GitHub", true], ["Linear", true], ["Figma", true], ["AWS", false], ["Datadog", false]].map(([t, done]) => (
                  <Badge key={t as string} tone={(done as boolean) ? "green" : "amber"}>{t as string} {(done as boolean) ? "✓" : "⏳"}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Journey" title="Welcome sequence" />
          <div className="space-y-4 mt-2">
            {welcomeSeq.map((w, i) => (
              <div key={w.day} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={\`h-7 w-7 rounded-full grid place-items-center text-xs font-bold shrink-0 \${w.done ? "bg-accent text-white" : "surface border border-[var(--line)] ink-2"}\`}>{i + 1}</div>
                  {i < welcomeSeq.length - 1 && <div className={\`w-0.5 flex-1 mt-1 min-h-4 \${w.done ? "bg-accent/40" : "bg-[var(--line)]"}\`} />}
                </div>
                <div className="pb-4">
                  <div className="text-sm font-semibold mb-1">{w.day}</div>
                  <ul className="space-y-1">
                    {w.tasks.map(t => (
                      <li key={t} className="flex items-center gap-1.5 text-xs ink-2">
                        <span className={\`h-1.5 w-1.5 rounded-full shrink-0 \${w.done ? "bg-accent" : "bg-zinc-400"}\`} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <AIPanel context="New hire onboarding, June 2026" insights={[
          { title: "2 docs stalled", body: "Direct deposit and remote work policy have been pending 4 days. Auto-nudge scheduled in 24h unless completed.", tone: "amber", tag: "Compliance", confidence: 95 },
          { title: "Access provisioning on track", body: "5 of 6 systems provisioned 2 days before start date — above average for this role type.", tone: "green", tag: "IT ops", confidence: 90 },
        ]} />
      </div>
    </div>
  );
}

// ─── Workforce DEI & Sourcing Analytics ──────────────────────────────────────

const sourcingData = [
  { label: "LinkedIn", value: 42 },
  { label: "Indeed", value: 28 },
  { label: "Referral", value: 18 },
  { label: "Direct", value: 8 },
  { label: "Events", value: 4 },
];
const genderData = [
  { name: "Men", value: 58, color: "#4f6df5" },
  { name: "Women", value: 34, color: "#8b5cf6" },
  { name: "Non-binary", value: 8, color: "#10b981" },
];
const levelGenderParity = [
  { level: "Individual contributor", men: 62, women: 38 },
  { level: "Manager", men: 68, women: 32 },
  { level: "Director", men: 74, women: 26 },
  { level: "VP+", men: 80, women: 20 },
];

export function DEIAnalyticsScreen() {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Diversity score" value="68/100" delta="+4 pts this half" deltaTone="green" />
          <Stat label="Women in tech roles" value="34%" delta="Target 40% by EOY" deltaTone="amber" />
          <Stat label="Referral diversity" value="44%" delta="+6% vs last half" deltaTone="green" />
        </div>
        <Card>
          <SectionTitle eyebrow="Sourcing" title="Candidate channels · last 90 days" right={<Badge tone="blue">5 channels</Badge>} />
          <Bars data={sourcingData} height={160} />
        </Card>
        <Card>
          <SectionTitle eyebrow="Equity" title="Gender representation by level" />
          <div className="space-y-4 mt-2">
            {levelGenderParity.map(l => (
              <div key={l.level}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="ink-2 font-medium">{l.level}</span>
                  <span className="font-mono"><span className="text-accent">{l.men}%</span> / <span className="text-violet-500">{l.women}%</span></span>
                </div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="h-full transition-all" style={{ width: \`\${l.men}%\`, background: "#4f6df5" }} />
                  <div className="h-full transition-all" style={{ width: \`\${l.women}%\`, background: "#8b5cf6" }} />
                </div>
                <div className="flex justify-between text-[10px] ink-2 mt-0.5">
                  <span>Men</span><span>Women</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Demographics" title="Overall gender mix" />
          <div className="flex flex-col items-center py-3">
            <Donut segments={genderData} size={150} label="68" sublabel="diversity score" />
          </div>
          <div className="mt-2 space-y-1.5">
            {genderData.map(g => (
              <div key={g.name} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: g.color }} />
                <span className="flex-1">{g.name}</span>
                <span className="font-mono ink-2">{g.value}%</span>
              </div>
            ))}
          </div>
        </Card>
        <AIPanel context="DEI & sourcing analytics, H1 2026" insights={[
          { title: "Leadership gap widening", body: "Women represent 20% of VP+ roles, down from 24% last year. Two internal promotions could close this faster than external hires.", tone: "amber", tag: "Equity", confidence: 85 },
          { title: "Referral channel skewed", body: "Only 18% of referrals identify as underrepresented groups vs. 31% from LinkedIn. Structured incentives could rebalance.", tone: "blue", tag: "Sourcing", confidence: 77 },
        ]} />
      </div>
    </div>
  );
}

// ─── Internal Talent Marketplace & Skill Matrix ───────────────────────────────

type InternalRole = { title: string; dept: string; matchScore: number; skills: string[]; level: string };
const internalRoles: InternalRole[] = [
  { title: "Staff Platform Engineer", dept: "Platform", matchScore: 92, skills: ["AWS", "Terraform", "React"], level: "L4" },
  { title: "Engineering Manager", dept: "Payments", matchScore: 78, skills: ["Leadership", "Go", "Agile"], level: "M1" },
  { title: "Senior Data Engineer", dept: "Analytics", matchScore: 65, skills: ["Spark", "dbt", "Python"], level: "L3" },
  { title: "Product Designer", dept: "Design", matchScore: 41, skills: ["Figma", "User research"], level: "L2" },
];
const skillAxes = ["Leadership", "Technical", "Collab", "Delivery", "Domain", "Growth"];
const profileScores = [72, 94, 85, 90, 88, 78];

export function TalentMarketplaceScreen() {
  const [selected, setSelected] = useState<InternalRole | null>(null);
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Internal openings" value="12" delta="4 new this week" deltaTone="blue" icon={<Briefcase size={16} />} />
          <Stat label="High-match employees" value="8" delta="Score ≥ 80%" deltaTone="green" />
          <Stat label="Internal fills · YTD" value="34%" delta="+9% vs target" deltaTone="green" />
        </div>
        <Card>
          <SectionTitle eyebrow="Marketplace" title="Matched roles for Priya N." right={<Badge tone="blue">92% top match</Badge>} />
          <div className="space-y-3">
            {internalRoles.map(r => (
              <button key={r.title} onClick={() => setSelected(r)}
                className="w-full flex items-center gap-3 rounded-lg border border-[var(--line)] p-3.5 text-left hover:border-accent/40 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{r.title}</span>
                    <Badge tone="gray">{r.level}</Badge>
                  </div>
                  <div className="text-xs ink-2">{r.dept} · Requires: {r.skills.join(", ")}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className={\`font-display text-lg font-bold \${r.matchScore >= 80 ? "text-emerald-600 dark:text-emerald-400" : r.matchScore >= 60 ? "text-amber-600 dark:text-amber-400" : "ink-2"}\`}>{r.matchScore}%</div>
                  <div className="text-[10px] ink-2">match</div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Skill profile" title="Gap radar — Priya N." />
          <div className="flex justify-center">
            <Radar axes={skillAxes} values={profileScores} size={200} color="#4f6df5" />
          </div>
          <div className="mt-1 space-y-1.5">
            {skillAxes.map((axis, i) => (
              <div key={axis} className="flex items-center gap-2 text-xs">
                <span className="w-16 ink-2 shrink-0">{axis}</span>
                <div className="flex-1 h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className="h-full rounded-full bg-accent/70 transition-all" style={{ width: \`\${profileScores[i]}%\` }} />
                </div>
                <span className="font-mono ink-2 w-6 text-right">{profileScores[i]}</span>
              </div>
            ))}
          </div>
        </Card>
        <AIPanel context="Internal talent marketplace, Q2 2026" insights={[
          { title: "Strong internal candidate", body: "Priya N. matches Staff Platform Engineer at 92% — a lateral move saves 6–8 weeks of external recruiting time.", tone: "green", tag: "Matching", confidence: 92 },
          { title: "Leadership skills gap", body: "8 senior ICs score above 90 technically but below 70 on leadership. A targeted cohort would improve promotion readiness.", tone: "amber", tag: "Development", confidence: 83 },
        ]} />
      </div>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Role detail">
        {selected && (
          <div className="space-y-4">
            <div className="font-display text-xl font-bold">{selected.title}</div>
            <div className="flex gap-2"><Badge tone="gray">{selected.level}</Badge><Badge tone="blue">{selected.dept}</Badge></div>
            <div className={\`text-center py-4 rounded-lg border \${selected.matchScore >= 80 ? "border-emerald-500/30 bg-emerald-500/5" : "border-[var(--line)]"}\`}>
              <div className={\`font-display text-4xl font-bold \${selected.matchScore >= 80 ? "text-emerald-600 dark:text-emerald-400" : "ink-2"}\`}>{selected.matchScore}%</div>
              <div className="text-xs ink-2 mt-1">skill match score</div>
            </div>
            <div>
              <div className="label">Required skills</div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selected.skills.map(s => <Badge key={s} tone="gray">{s}</Badge>)}
              </div>
            </div>
            <button className="btn-primary w-full justify-center">Express interest</button>
            <button className="btn-ghost w-full justify-center">View full JD</button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
`;export{e as default};
