// src/kit/workspace.tsx — shared Workspace pages (Onboarding, Team & roles, Billing, Inbox)
// and Utility pages (Search, Calendar, Reports, Empty & error states). Every industry gets
// all eight, flavoured by its SharedData.
import { useMemo, useState } from "react";
import {
  CheckCircle2, ChevronLeft, ChevronRight, UserPlus, Shield, CreditCard, Download, Search, FileText,
  CalendarDays, Plus, Inbox as InboxIcon, WifiOff, ServerCrash, Lock, SearchX, RefreshCw, Clock,
} from "lucide-react";
import { Badge, Card, SectionTitle } from "../components/ui";
import type { DomainMeta } from "../domains/pages";
import type { SharedData } from "../industries/types";
import { ChatScreen } from "./archetypes-content";
import { Avatar, FieldGrid, PageHeader, Progress, TONE_FILL, TONE_SOFT } from "./primitives";

type P = { meta: DomainMeta; shared: SharedData };

// ─── Workspace ───────────────────────────────────────────────────────────────
export function OnboardingPage({ meta, shared }: P) {
  const steps = shared.onboarding.steps;
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const cur = steps[step];
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-[15rem_1fr] gap-6">
      <aside className="space-y-4">
        <div className="inline-grid place-items-center h-11 w-11 rounded-2xl bg-gradient-to-br from-accent to-grad text-white font-display text-lg">{meta.name[0]}</div>
        <div><h1 className="font-display text-xl">Set up {meta.name}</h1><p className="text-xs ink-2 mt-1">About 3 minutes. You can change everything later in Settings.</p></div>
        <ol className="space-y-1">
          {steps.map((s, i) => (
            <li key={s.title} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm ${i === step && !done ? "bg-accent/10 text-accent font-semibold" : "ink-2"}`}>
              <span className={`grid place-items-center h-5 w-5 rounded-full text-[10px] font-bold ${i < step || done ? "bg-emerald-500 text-white" : i === step ? "bg-accent text-white" : "border border-[var(--line)]"}`}>{i < step || done ? "✓" : i + 1}</span>
              {s.title}
            </li>
          ))}
        </ol>
      </aside>
      {done ? (
        <Card className="text-center py-14 space-y-3 animate-fadeUp">
          <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
          <h2 className="font-display text-2xl">You're all set</h2>
          <p className="text-sm ink-2 max-w-sm mx-auto">Your {meta.name} workspace is ready. We've added sample data so you can explore before connecting real systems.</p>
          <button className="btn-primary mt-2">Go to dashboard</button>
        </Card>
      ) : (
        <Card className="space-y-5 animate-fadeUp" key={step}>
          <div><div className="eyebrow">Step {step + 1} of {steps.length}</div><h2 className="font-display text-xl mt-1">{cur.title}</h2><p className="text-sm ink-2">{cur.description}</p></div>
          <FieldGrid fields={cur.fields} />
          <div className="flex justify-between pt-2">
            <button className="btn-ghost" disabled={step === 0} onClick={() => setStep(s => s - 1)}><ChevronLeft size={14} /> Back</button>
            <div className="flex gap-2">
              <button className="btn-ghost" onClick={() => step === steps.length - 1 ? setDone(true) : setStep(s => s + 1)}>Skip</button>
              <button className="btn-primary" onClick={() => step === steps.length - 1 ? setDone(true) : setStep(s => s + 1)}>{step === steps.length - 1 ? "Finish setup" : <>Continue <ChevronRight size={14} /></>}</button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

const STATUS_TONE = { Active: "green", Invited: "amber", Suspended: "red" } as const;

export function TeamPage({ meta, shared }: P) {
  const [tab, setTab] = useState<"Members" | "Roles">("Members");
  const [invite, setInvite] = useState("");
  const [members, setMembers] = useState(shared.team.members);
  return (
    <div className="space-y-6">
      <PageHeader title="Team & roles" subtitle={`Manage who can access ${meta.name} and what they can do.`} />
      <Card className="flex flex-wrap items-center gap-3">
        <UserPlus size={16} className="text-accent" />
        <input value={invite} onChange={e => setInvite(e.target.value)} className="field flex-1 min-w-52" placeholder="colleague@company.com" aria-label="Invite by email" />
        <select className="field !w-auto" aria-label="Role">{shared.team.roles.map(r => <option key={r.name}>{r.name}</option>)}</select>
        <button className="btn-primary" onClick={() => { if (invite.includes("@")) { setMembers(m => [{ name: invite.split("@")[0], email: invite, role: shared.team.roles[shared.team.roles.length - 1]?.name ?? "Member", status: "Invited", lastActive: "—" }, ...m]); setInvite(""); } }}>Send invite</button>
      </Card>
      <div className="flex gap-1 border-b border-[var(--line)]" role="tablist">
        {(["Members", "Roles"] as const).map(t => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`px-3 pb-2.5 text-sm font-medium border-b-2 -mb-px ${tab === t ? "border-accent text-accent" : "border-transparent ink-2"}`}>{t}{t === "Members" ? ` · ${members.length}` : ` · ${shared.team.roles.length}`}</button>
        ))}
      </div>
      {tab === "Members" ? (
        <Card className="!p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left">{["Member", "Role", "Status", "Last active"].map(h => <th key={h} className="eyebrow px-4 py-2.5">{h}</th>)}</tr></thead>
            <tbody>
              {members.map(m => (
                <tr key={m.email} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar value={m.name} size={30} /><div><div className="font-medium">{m.name}</div><div className="text-[11px] ink-2">{m.email}</div></div></div></td>
                  <td className="px-4 py-3">{m.role}</td>
                  <td className="px-4 py-3"><Badge tone={STATUS_TONE[m.status]}>{m.status}</Badge></td>
                  <td className="px-4 py-3 ink-2">{m.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {shared.team.roles.map(r => (
            <Card key={r.name} className="space-y-3">
              <div className="flex items-center gap-2"><Shield size={16} className="text-accent" /><h2 className="font-display text-base">{r.name}</h2></div>
              <p className="text-xs ink-2">{r.description}</p>
              <ul className="space-y-1.5">{r.permissions.map(p => <li key={p} className="flex items-center gap-2 text-sm"><CheckCircle2 size={13} className="text-emerald-500 shrink-0" /> {p}</li>)}</ul>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

const INVOICE_TONE = { Paid: "green", Due: "amber", Overdue: "red" } as const;

export function BillingPage({ meta, shared }: P) {
  const b = shared.billing;
  return (
    <div className="space-y-6">
      <PageHeader title="Billing & invoices" subtitle={`Your ${meta.name} subscription, usage and payment history.`} />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-accent to-grad text-white border-0 space-y-3">
          <div className="text-xs uppercase tracking-widest opacity-80">Current plan</div>
          <div className="font-display text-3xl">{b.plan}</div>
          <div className="text-sm opacity-90">{b.price} · renews {b.renews}</div>
          <div className="flex gap-2 pt-2"><button className="bg-white text-accent font-semibold text-sm px-4 py-2 rounded-lg">Change plan</button><button className="border border-white/50 text-sm px-4 py-2 rounded-lg">Cancel</button></div>
        </Card>
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="This cycle" title="Usage" />
          <div className="grid sm:grid-cols-2 gap-5">
            {b.usage.map(u => {
              const pct = (u.used / u.limit) * 100;
              return (
                <div key={u.label} className="space-y-1.5">
                  <div className="flex justify-between text-sm"><span className="font-medium">{u.label}</span><span className="ink-2 tabular">{u.used.toLocaleString("en-US")} / {u.limit.toLocaleString("en-US")} {u.unit}</span></div>
                  <Progress value={pct} tone={pct > 90 ? "red" : pct > 75 ? "amber" : "accent"} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 !p-0 overflow-x-auto">
          <div className="px-4 py-3 border-b border-[var(--line)] font-display text-base">Invoices</div>
          <table className="w-full text-sm">
            <tbody>
              {b.invoices.map(inv => (
                <tr key={inv.id} className="border-t border-[var(--line)] first:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{inv.id}</td>
                  <td className="px-4 py-3 ink-2">{inv.date}</td>
                  <td className="px-4 py-3 font-mono tabular">{inv.amount}</td>
                  <td className="px-4 py-3"><Badge tone={INVOICE_TONE[inv.status]}>{inv.status}</Badge></td>
                  <td className="px-4 py-3 text-right"><button className="btn-ghost !p-1.5" aria-label={`Download ${inv.id}`}><Download size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card className="space-y-3 h-fit">
          <SectionTitle eyebrow="Payment" title="Method on file" />
          <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] p-3"><CreditCard size={20} className="text-accent" /><span className="text-sm font-medium">{b.paymentMethod}</span></div>
          <button className="btn-ghost w-full justify-center">Update payment method</button>
        </Card>
      </div>
    </div>
  );
}

export function InboxPage({ meta, shared }: P) {
  return (
    <ChatScreen title="Inbox" data={{
      subtitle: `Messages across your ${meta.name} workspace.`,
      blurb: "", bullets: ["", "", ""],
      threads: shared.inbox.threads, messages: shared.inbox.messages,
      quickReplies: ["Thanks, on it", "Can we talk tomorrow?", "Approved ✅"],
    }} />
  );
}

// ─── Utilities ───────────────────────────────────────────────────────────────
export function SearchPage({ meta, shared }: P) {
  const [q, setQ] = useState(shared.search.query);
  const [facet, setFacet] = useState("All");
  const results = useMemo(() => shared.search.results.filter(r =>
    (facet === "All" || r.type === facet) && (r.title + r.snippet).toLowerCase().includes(q.toLowerCase().split(" ")[0] ?? "")
  ), [shared.search.results, q, facet]);
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <label className="flex items-center gap-3 card !py-3.5 px-4">
        <Search size={18} className="text-accent" />
        <input value={q} onChange={e => setQ(e.target.value)} className="bg-transparent outline-none flex-1 text-lg" placeholder={`Search ${meta.name}…`} aria-label="Search query" />
        <kbd className="hidden sm:inline text-[10px] font-mono ink-2 border border-[var(--line)] rounded px-1.5 py-0.5">⌘K</kbd>
      </label>
      <div className="flex flex-wrap gap-1.5">
        {["All", ...shared.search.facets].map(f => (
          <button key={f} onClick={() => setFacet(f)} aria-pressed={facet === f} className={`rounded-full px-3 py-1 text-xs font-medium border ${facet === f ? "bg-accent text-white border-accent" : "border-[var(--line)] ink-2"}`}>{f}</button>
        ))}
        <span className="ml-auto text-xs ink-2 self-center">{results.length} results</span>
      </div>
      <ul className="space-y-3">
        {results.map(r => (
          <li key={r.title}>
            <Card className="card-hover !p-4 space-y-1">
              <div className="flex items-center gap-2"><Badge tone="blue">{r.type}</Badge><span className="text-[11px] ink-2">{r.meta}</span></div>
              <div className="text-sm font-semibold text-accent">{r.title}</div>
              <p className="text-sm ink-2">{r.snippet}</p>
            </Card>
          </li>
        ))}
        {results.length === 0 && <Card className="text-center py-10 text-sm ink-2">No results for “{q}”. Try fewer words or another filter.</Card>}
      </ul>
    </div>
  );
}

export function CalendarMonthPage({ meta, shared }: P) {
  const c = shared.calendar;
  const [sel, setSel] = useState<number | null>(null);
  const cells = [...Array(c.firstWeekday).fill(null), ...Array.from({ length: c.days }, (_, i) => i + 1)];
  const dayEvents = (d: number) => c.events.filter(e => e.date === d);
  return (
    <div className="space-y-6">
      <PageHeader title="Calendar" subtitle={`${c.month} · team schedule for ${meta.name}`} actions={<button className="btn-primary"><Plus size={14} /> New event</button>} />
      <div className="grid lg:grid-cols-[1fr_18rem] gap-4">
        <Card className="!p-0 overflow-hidden">
          <div className="grid grid-cols-7 text-center eyebrow py-2.5 border-b border-[var(--line)]">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}</div>
          <div className="grid grid-cols-7">
            {cells.map((d, i) => (
              <button key={i} disabled={!d} onClick={() => d && setSel(d)}
                className={`min-h-24 border-b border-r border-[var(--line)] p-1.5 text-left align-top transition-colors disabled:cursor-default ${d && sel === d ? "bg-accent/8" : d ? "hover:bg-accent/5" : "surface-2"}`}>
                {d && <span className={`text-xs font-semibold ${sel === d ? "text-accent" : ""}`}>{d}</span>}
                <div className="mt-1 space-y-1">
                  {d && dayEvents(d).slice(0, 2).map(e => <div key={e.title} className={`truncate rounded border px-1 py-0.5 text-[10px] font-medium ${TONE_SOFT[e.tone]}`}>{e.title}</div>)}
                  {d && dayEvents(d).length > 2 && <div className="text-[10px] ink-2">+{dayEvents(d).length - 2} more</div>}
                </div>
              </button>
            ))}
          </div>
        </Card>
        <Card className="h-fit space-y-3">
          <SectionTitle eyebrow={sel ? `${c.month.split(" ")[0]} ${sel}` : "Upcoming"} title={sel ? "Day agenda" : "Next events"} />
          <ul className="space-y-2.5">
            {(sel ? dayEvents(sel) : c.events.slice(0, 6)).map(e => (
              <li key={e.title + e.date} className="flex gap-3 text-sm">
                <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${TONE_FILL[e.tone]}`} />
                <span className="flex-1"><span className="block font-medium">{e.title}</span><span className="text-[11px] ink-2 flex items-center gap-1"><CalendarDays size={10} /> {c.month.split(" ")[0]} {e.date}{e.time ? <> · <Clock size={10} /> {e.time}</> : null}</span></span>
              </li>
            ))}
            {sel && dayEvents(sel).length === 0 && <li className="text-sm ink-2">Nothing scheduled.</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
}

export function ReportsPage({ meta, shared }: P) {
  const cats = ["All", ...Array.from(new Set(shared.reports.reports.map(r => r.category)))];
  const [cat, setCat] = useState("All");
  const [busy, setBusy] = useState<string | null>(null);
  const run = (name: string) => { setBusy(name); setTimeout(() => setBusy(null), 1200); };
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle={`Scheduled and on-demand reports for ${meta.name}.`} actions={<button className="btn-primary"><Plus size={14} /> New report</button>} />
      <div className="flex flex-wrap gap-1.5">{cats.map(c => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full px-3 py-1 text-xs font-medium border ${cat === c ? "bg-accent text-white border-accent" : "border-[var(--line)] ink-2"}`}>{c}</button>)}</div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {shared.reports.reports.filter(r => cat === "All" || r.category === cat).map(r => (
          <Card key={r.name} className="card-hover flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-accent/10 text-accent shrink-0"><FileText size={18} /></span>
              <div className="min-w-0"><div className="text-sm font-semibold">{r.name}</div><div className="text-xs ink-2 mt-0.5">{r.description}</div></div>
            </div>
            <div className="flex flex-wrap gap-1.5"><Badge tone="gray">{r.category}</Badge><Badge tone="blue">{r.format}</Badge>{r.schedule && <Badge tone="violet">{r.schedule}</Badge>}</div>
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--line)] text-[11px] ink-2">
              <span>{r.owner} · {r.updated}</span>
              <button onClick={() => run(r.name)} className="btn-ghost !px-2.5 !py-1 text-xs">{busy === r.name ? <RefreshCw size={12} className="animate-spin" /> : <Download size={12} />} {busy === r.name ? "Generating" : "Run"}</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function StatesPage({ meta, shared }: P) {
  const s = shared.states;
  const states = [
    { icon: InboxIcon, title: s.emptyTitle, body: s.emptyBody, action: s.emptyAction, tone: "blue" as const, label: "Empty state" },
    { icon: SearchX, title: "No matching results", body: `We couldn't find any ${s.noun} matching those filters. Try removing a filter or widening the date range.`, action: "Clear filters", tone: "gray" as const, label: "No results" },
    { icon: WifiOff, title: "You're offline", body: `Changes to your ${s.noun} are saved on this device and will sync when you reconnect.`, action: "Retry now", tone: "amber" as const, label: "Offline" },
    { icon: ServerCrash, title: "Something went wrong", body: `${meta.name} couldn't load this page. Our team has been notified — error ref 7F3A-21.`, action: "Reload page", tone: "red" as const, label: "Server error" },
    { icon: Lock, title: "You don't have access", body: `Ask a workspace admin to grant you access to these ${s.noun}.`, action: "Request access", tone: "violet" as const, label: "Permission denied" },
    { icon: Clock, title: "Your session expired", body: "For your security you've been signed out after 30 minutes of inactivity.", action: "Sign in again", tone: "gray" as const, label: "Session timeout" },
  ];
  return (
    <div className="space-y-6">
      <PageHeader title="Empty & error states" subtitle="Every edge case designed up front, so no screen ever shows a blank page." />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {states.map(st => (
          <Card key={st.label} className="text-center py-8 space-y-3">
            <div className="eyebrow">{st.label}</div>
            <span className={`mx-auto grid place-items-center h-14 w-14 rounded-2xl border ${TONE_SOFT[st.tone]}`}><st.icon size={24} /></span>
            <h2 className="font-display text-base">{st.title}</h2>
            <p className="text-xs ink-2 max-w-xs mx-auto leading-relaxed">{st.body}</p>
            <button className={st.tone === "red" || st.tone === "blue" ? "btn-primary" : "btn-ghost"}>{st.action}</button>
          </Card>
        ))}
      </div>
    </div>
  );
}
