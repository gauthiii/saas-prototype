// src/App.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Landmark, HeartPulse, TerminalSquare, Users, GraduationCap,
  LayoutDashboard, FileText, CalendarDays, ListChecks, BarChart3,
  Sun, Moon, ChevronsUpDown, Check, Boxes, Search,
} from "lucide-react";
import { FintechDashboard, InvoiceForm, FintechAnalytics } from "./domains/fintech";
import { HealthDashboard, SchedulerScreen } from "./domains/healthtech";
import { DevOpsDashboard, KanbanMini, LiveLogs } from "./domains/devops";
import { ATSPipeline, JobPostForm } from "./domains/hrtech";
import { LMSDashboard, QuizScreen } from "./domains/edtech";

type View = { id: string; label: string; icon: typeof LayoutDashboard; el: JSX.Element };
type Domain = { id: string; label: string; sub: string; icon: typeof Landmark; views: View[] };

const DOMAINS: Domain[] = [
  {
    id: "fintech", label: "FinTech", sub: "Banking · Invoicing", icon: Landmark,
    views: [
      { id: "dash", label: "Treasury dashboard", icon: LayoutDashboard, el: <FintechDashboard /> },
      { id: "invoice", label: "New invoice", icon: FileText, el: <InvoiceForm /> },
      { id: "analytics", label: "Analytics", icon: BarChart3, el: <FintechAnalytics /> },
    ],
  },
  {
    id: "health", label: "HealthTech", sub: "EHR · ER · Scheduling", icon: HeartPulse,
    views: [
      { id: "dash", label: "Clinical dashboard", icon: LayoutDashboard, el: <HealthDashboard /> },
      { id: "scheduler", label: "Appointment grid", icon: CalendarDays, el: <SchedulerScreen /> },
    ],
  },
  {
    id: "devops", label: "IT / DevOps", sub: "Logs · Tickets · Metrics", icon: TerminalSquare,
    views: [
      { id: "dash", label: "Ops dashboard", icon: LayoutDashboard, el: <DevOpsDashboard /> },
      { id: "logs", label: "Log viewer", icon: ListChecks, el: <div className="max-w-3xl mx-auto"><LiveLogs /></div> },
      { id: "board", label: "Incident board", icon: Boxes, el: <div className="max-w-md mx-auto"><KanbanMini /></div> },
    ],
  },
  {
    id: "hrtech", label: "HRTech", sub: "Applicant tracking", icon: Users,
    views: [
      { id: "pipeline", label: "Candidate pipeline", icon: LayoutDashboard, el: <ATSPipeline /> },
      { id: "jobpost", label: "Create job posting", icon: FileText, el: <JobPostForm /> },
    ],
  },
  {
    id: "edtech", label: "EdTech", sub: "LMS · Assessments", icon: GraduationCap,
    views: [
      { id: "dash", label: "Learning dashboard", icon: LayoutDashboard, el: <LMSDashboard /> },
      { id: "quiz", label: "Checkpoint quiz", icon: ListChecks, el: <QuizScreen /> },
    ],
  },
];

function DomainPicker({ domain, onPick }: { domain: Domain; onPick: (d: Domain) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => DOMAINS.filter(d => (d.label + d.sub).toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="btn-ghost !pl-2.5 min-w-56 justify-between" aria-haspopup="listbox" aria-expanded={open}>
        <span className="flex items-center gap-2.5">
          <span className="grid place-items-center h-7 w-7 rounded-lg bg-accent/12 text-accent"><domain.icon size={15} /></span>
          <span className="text-left leading-tight">
            <span className="block text-sm font-semibold">{domain.label}</span>
            <span className="block text-[10px] ink-2">{domain.sub}</span>
          </span>
        </span>
        <ChevronsUpDown size={14} className="ink-2" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute z-40 mt-2 w-72 card !p-0 overflow-hidden shadow-lift animate-fadeUp">
            <div className="flex items-center gap-2 border-b border-[var(--line)] px-3 py-2.5">
              <Search size={14} className="ink-2" />
              <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search domain templates…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink-2)]" />
            </div>
            <ul role="listbox" className="max-h-72 overflow-y-auto p-1.5">
              {filtered.map(d => (
                <li key={d.id}>
                  <button onClick={() => { onPick(d); setOpen(false); setQ(""); }}
                    className={`w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-accent/8 ${d.id === domain.id ? "bg-accent/8" : ""}`}>
                    <span className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent"><d.icon size={16} /></span>
                    <span className="flex-1 leading-tight">
                      <span className="block text-sm font-medium">{d.label}</span>
                      <span className="block text-[11px] ink-2">{d.sub}</span>
                    </span>
                    {d.id === domain.id && <Check size={15} className="text-accent" />}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="px-3 py-4 text-sm ink-2">No template matches "{q}". Clear the search to see all domains.</li>}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);
  const [domain, setDomain] = useState(DOMAINS[0]);
  const [viewId, setViewId] = useState(DOMAINS[0].views[0].id);
  const view = domain.views.find(v => v.id === viewId) ?? domain.views[0];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const pick = (d: Domain) => { setDomain(d); setViewId(d.views[0].id); };

  return (
    <div className="min-h-full flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col surface border-r min-h-screen sticky top-0">
        <div className="px-5 py-5 flex items-center gap-2.5 border-b border-[var(--line)]">
          <span className="grid place-items-center h-8 w-8 rounded-xl bg-gradient-to-br from-accent to-violet-600 text-white font-display font-bold text-sm">F</span>
          <div className="leading-tight">
            <div className="font-display font-bold tracking-tight">ForgeUI</div>
            <div className="text-[10px] ink-2 font-mono">template builder</div>
          </div>
        </div>
        <nav className="p-3 space-y-1 flex-1" aria-label="Screens">
          <div className="eyebrow px-2.5 pt-2 pb-1.5">{domain.label} screens</div>
          {domain.views.map(v => (
            <button key={v.id} onClick={() => setViewId(v.id)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-150
                ${v.id === view.id ? "bg-accent text-white shadow-card" : "ink-2 hover:bg-accent/8 hover:text-[var(--ink)]"}`}>
              <v.icon size={15} /> {v.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[var(--line)] text-[11px] ink-2 leading-relaxed">
          Interactive UI prototype. Wire your own APIs behind every action.
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 surface border-b backdrop-blur px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <DomainPicker domain={domain} onPick={pick} />
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-xs ink-2">Generated template · <span className="font-mono">{domain.id}/{view.id}</span></span>
            <button onClick={() => setDark(d => !d)} className="btn-ghost !p-2" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* Mobile screen tabs */}
        <div className="md:hidden flex gap-2 overflow-x-auto px-4 pt-3">
          {domain.views.map(v => (
            <button key={v.id} onClick={() => setViewId(v.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${v.id === view.id ? "bg-accent text-white border-accent" : "surface ink-2"}`}>
              {v.label}
            </button>
          ))}
        </div>

        <main key={`${domain.id}-${view.id}`} className="p-4 sm:p-6 animate-fadeUp">
          {view.el}
        </main>
      </div>
    </div>
  );
}
