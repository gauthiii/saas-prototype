// src/kit/archetypes-ops.tsx — operational archetypes: kanban, calendar, timeline, map,
// monitor, feed, tracker, queue.
import { useEffect, useRef, useState } from "react";
import { Plus, Pause, Play, Check, X, MapPin, Clock, AlertTriangle, Circle } from "lucide-react";
import { Badge, Card, Drawer, SectionTitle, Tone } from "../components/ui";
import { Sparkline } from "../components/charts";
import type { ScreenData } from "../industries/types";
import { Avatar, KpiRow, Legend, PageHeader, Progress, TONE_FILL, TONE_SOFT } from "./primitives";

type P<K extends keyof ScreenData> = { data: ScreenData[K]; title: string };

const TONE_HEX: Record<Tone, string> = { green: "#10b981", red: "#f43f5e", amber: "#f59e0b", blue: "rgb(var(--accent-rgb))", gray: "#94a3b8", violet: "#8b5cf6" };

export function KanbanScreen({ data, title }: P<"kanban">) {
  const [cols, setCols] = useState(data.columns);
  const move = (ci: number, ki: number, dir: 1 | -1) => {
    const to = ci + dir;
    if (to < 0 || to >= cols.length) return;
    setCols(prev => {
      const next = prev.map(c => ({ ...c, cards: [...c.cards] }));
      const [card] = next[ci].cards.splice(ki, 1);
      next[to].cards.unshift(card);
      return next;
    });
  };
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} actions={<button className="btn-primary"><Plus size={14} /> Add card</button>} />
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
        {cols.map((col, ci) => (
          <section key={col.title} className="flex-1 min-w-64 snap-start" aria-label={col.title}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className={`h-2 w-2 rounded-full ${TONE_FILL[col.tone ?? "gray"]}`} />
              <h2 className="text-sm font-semibold">{col.title}</h2>
              <span className="ml-auto text-xs ink-2 tabular">{col.cards.length}</span>
            </div>
            <div className="space-y-2.5 rounded-xl surface-2 p-2 min-h-24">
              {col.cards.map((k, ki) => (
                <Card key={k.title + ki} className="!p-3.5 card-hover space-y-2 animate-fadeUp">
                  <div className="text-sm font-medium leading-snug">{k.title}</div>
                  <div className="text-xs ink-2">{k.meta}</div>
                  <div className="flex items-center gap-2 pt-1">
                    {k.tag && <Badge tone={k.tone ?? "gray"}>{k.tag}</Badge>}
                    {k.value && <span className="text-xs font-mono tabular ink-2">{k.value}</span>}
                    <span className="ml-auto flex items-center gap-1">
                      <button onClick={() => move(ci, ki, -1)} disabled={ci === 0} className="ink-2 hover:text-accent disabled:opacity-30 text-xs px-1" aria-label={`Move ${k.title} left`}>←</button>
                      <button onClick={() => move(ci, ki, 1)} disabled={ci === cols.length - 1} className="ink-2 hover:text-accent disabled:opacity-30 text-xs px-1" aria-label={`Move ${k.title} right`}>→</button>
                      {k.avatar && <Avatar value={k.avatar} size={22} />}
                    </span>
                  </div>
                </Card>
              ))}
              {col.cards.length === 0 && <div className="text-xs ink-2 text-center py-6">Nothing here yet</div>}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export function CalendarScreen({ data, title }: P<"calendar">) {
  const hours = Array.from({ length: Math.max(1, data.endHour - data.startHour) }, (_, i) => data.startHour + i);
  const ROW = 52;
  const [open, setOpen] = useState<ScreenData["calendar"]["events"][number] | null>(null);
  const fmt = (h: number) => `${Math.floor(h) % 12 || 12}${h % 1 ? ":" + String(Math.round((h % 1) * 60)).padStart(2, "0") : ""}${h < 12 ? "a" : "p"}`;
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle}
        actions={<><span className="text-sm font-semibold">{data.weekLabel}</span><button className="btn-primary"><Plus size={14} /> New booking</button></>} />
      {data.legend && <Legend items={data.legend} />}
      <Card className="!p-0 overflow-x-auto">
        <div className="min-w-[640px]" style={{ display: "grid", gridTemplateColumns: `3.5rem repeat(${data.days.length}, 1fr)` }}>
          <div className="border-b border-[var(--line)]" />
          {data.days.map(d => <div key={d} className="border-b border-l border-[var(--line)] px-3 py-2.5 text-xs font-semibold">{d}</div>)}
          <div className="relative">
            {hours.map(h => <div key={h} style={{ height: ROW }} className="text-[10px] ink-2 text-right pr-2 pt-1 tabular">{fmt(h)}</div>)}
          </div>
          {data.days.map((d, di) => (
            <div key={d} className="relative border-l border-[var(--line)]" style={{ height: hours.length * ROW }}>
              {hours.map((h, hi) => <div key={h} className="absolute inset-x-0 border-t border-[var(--line)] opacity-60" style={{ top: hi * ROW }} />)}
              {data.events.filter(e => e.day === di).map((e, ei) => (
                <button key={ei} onClick={() => setOpen(e)}
                  className={`absolute left-1 right-1 rounded-lg border px-2 py-1 text-left overflow-hidden transition-transform hover:scale-[1.02] ${TONE_SOFT[e.tone ?? "blue"]}`}
                  style={{ top: (e.start - data.startHour) * ROW + 2, height: Math.max((e.end - e.start) * ROW - 4, 22) }}>
                  <div className="text-[11px] font-semibold leading-tight truncate">{e.title}</div>
                  <div className="text-[10px] opacity-80 truncate">{fmt(e.start)}–{fmt(e.end)}{e.meta ? ` · ${e.meta}` : ""}</div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </Card>
      <Drawer open={!!open} onClose={() => setOpen(null)} title={open?.title ?? ""}>
        {open && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><Clock size={14} className="ink-2" /> {data.days[open.day]} · {fmt(open.start)}–{fmt(open.end)}</div>
            {open.meta && <p className="ink-2">{open.meta}</p>}
            <div className="flex gap-2 pt-2"><button className="btn-primary">Reschedule</button><button className="btn-ghost">Cancel booking</button></div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

export function TimelineScreen({ data, title }: P<"timeline">) {
  const [f, setF] = useState("All");
  const items = data.items.filter(i => f === "All" || i.tag === f);
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      <div className={`grid gap-4 ${data.aside ? "lg:grid-cols-3" : ""}`}>
        <Card className={data.aside ? "lg:col-span-2" : ""}>
          {data.filters && (
            <div className="flex flex-wrap gap-1.5 mb-5" role="group" aria-label="Filter events">
              {["All", ...data.filters].map(o => (
                <button key={o} onClick={() => setF(o)} aria-pressed={f === o}
                  className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${f === o ? "bg-accent text-white border-accent" : "border-[var(--line)] ink-2"}`}>{o}</button>
              ))}
            </div>
          )}
          <ol className="relative border-l border-[var(--line)] ml-2 space-y-6">
            {items.map((it, i) => (
              <li key={i} className="pl-6 relative animate-fadeUp">
                <span className={`absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-[var(--surface)] ${TONE_FILL[it.tone ?? "blue"]}`} />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">{it.title}</span>
                  {it.tag && <Badge tone={it.tone ?? "gray"}>{it.tag}</Badge>}
                  <span className="text-[11px] ink-2 ml-auto">{it.time}</span>
                </div>
                <p className="text-sm ink-2 mt-1 leading-relaxed">{it.body}</p>
                {it.actor && <div className="text-[11px] ink-2 mt-1.5 flex items-center gap-1.5"><Avatar value={it.actor} size={18} /> {it.actor}</div>}
              </li>
            ))}
            {items.length === 0 && <li className="pl-6 text-sm ink-2">No events for this filter.</li>}
          </ol>
        </Card>
        {data.aside && (
          <div className="space-y-4">
            <div className="eyebrow">{data.aside.title}</div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {data.aside.kpis.map(k => (
                <Card key={k.label}><div className="eyebrow">{k.label}</div><div className="font-display text-2xl mt-1">{k.value}</div>{k.delta && <div className="mt-1"><Badge tone={k.tone ?? "green"}>{k.delta}</Badge></div>}</Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function MapScreen({ data, title }: P<"map">) {
  const [sel, setSel] = useState<number | null>(null);
  const pin = sel !== null ? data.pins[sel] : null;
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      {data.kpis && <KpiRow kpis={data.kpis} />}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 !p-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--line)]">
            <span className="text-sm font-semibold">{data.mapLabel}</span>
            <Legend items={data.legend} />
          </div>
          <div className="relative aspect-[16/10] surface-2">
            <svg viewBox="0 0 160 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <pattern id="map-grid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0H0V8" fill="none" stroke="var(--line)" strokeWidth=".3" /></pattern>
              </defs>
              <rect width="160" height="100" fill="url(#map-grid)" />
              <path d="M10 70 C 30 40, 50 80, 70 50 S 110 20, 150 40" fill="none" stroke="rgb(var(--accent-rgb) / .25)" strokeWidth="6" strokeLinecap="round" />
              <path d="M20 20 C 40 30, 60 10, 90 30 S 130 80, 150 85" fill="none" stroke="rgb(var(--grad-rgb) / .18)" strokeWidth="4" strokeLinecap="round" />
              <path d="M0 90 Q 40 75 80 88 T 160 80" fill="none" stroke="var(--line)" strokeWidth="1.2" />
            </svg>
            {data.pins.map((p, i) => (
              <button key={p.name} onClick={() => setSel(i)} aria-label={`${p.name}: ${p.status}`}
                className="absolute -translate-x-1/2 -translate-y-full group" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                <span className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-3 w-3 rounded-full animate-ping opacity-40 ${TONE_FILL[p.tone]}`} />
                <MapPin size={sel === i ? 30 : 24} className="relative drop-shadow transition-all" style={{ color: TONE_HEX[p.tone] }} fill="currentColor" stroke="white" strokeWidth={1.5} />
                <span className="absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap rounded-md surface px-1.5 py-0.5 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{p.name}</span>
              </button>
            ))}
          </div>
        </Card>
        <Card className="!p-0 overflow-hidden">
          {pin ? (
            <div className="p-5 space-y-3 animate-fadeUp">
              <div className="eyebrow">Selected site</div>
              <div className="font-display text-lg">{pin.name}</div>
              <Badge tone={pin.tone}>{pin.status}</Badge>
              <div className="font-mono text-sm">{pin.metric}</div>
              {pin.detail && <p className="text-sm ink-2">{pin.detail}</p>}
              <div className="flex gap-2 pt-1"><button className="btn-primary">Open site</button><button className="btn-ghost" onClick={() => setSel(null)}>Back to list</button></div>
            </div>
          ) : (
            <ul className="max-h-[26rem] overflow-y-auto">
              {data.pins.map((p, i) => (
                <li key={p.name}>
                  <button onClick={() => setSel(i)} className="w-full flex items-center gap-3 px-4 py-3 border-b border-[var(--line)] text-left hover:bg-accent/5 transition-colors">
                    <span className={`h-2.5 w-2.5 rounded-full ${TONE_FILL[p.tone]}`} />
                    <span className="flex-1 min-w-0"><span className="block text-sm font-medium truncate">{p.name}</span><span className="block text-[11px] ink-2">{p.status}</span></span>
                    <span className="font-mono text-xs ink-2">{p.metric}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

export function MonitorScreen({ data, title }: P<"monitor">) {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 2500); return () => clearInterval(t); }, []);
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} actions={<Badge tone="green" pulse>Live</Badge>} />
      {data.kpis && <KpiRow kpis={data.kpis} />}
      {data.alerts && data.alerts.length > 0 && (
        <div className="space-y-2">
          {data.alerts.map(a => (
            <div key={a.title} className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${TONE_SOFT[a.tone]}`} role="status">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <div><div className="text-sm font-semibold">{a.title}</div><div className="text-xs opacity-90">{a.body}</div></div>
            </div>
          ))}
        </div>
      )}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.units.map((u, i) => {
          const spark = u.spark.map((v, j) => v + Math.sin((tick + j + i) * 1.3) * (Math.max(...u.spark) - Math.min(...u.spark) || 1) * 0.08);
          return (
            <Card key={u.name} className="card-hover space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0"><div className="text-sm font-semibold truncate">{u.name}</div>{u.meta && <div className="text-[11px] ink-2 truncate">{u.meta}</div>}</div>
                <Badge tone={u.tone} pulse={u.tone === "red"}>{u.status}</Badge>
              </div>
              <div className="flex items-end justify-between gap-3">
                <div className="font-display text-3xl tabular">{u.value}<span className="text-sm ink-2 ml-1 font-body">{u.unit}</span></div>
                <Sparkline data={spark} color={TONE_HEX[u.tone]} />
              </div>
              {u.gauge !== undefined && <Progress value={u.gauge} tone={u.tone} />}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const LEVEL_TONE = { info: "blue", warn: "amber", error: "red", success: "green" } as const;

export function FeedScreen({ data, title }: P<"feed">) {
  const [paused, setPaused] = useState(false);
  const [lines, setLines] = useState(() => data.templates.slice(0, 6).map((t, i) => ({ ...t, id: i, at: new Date(Date.now() - (6 - i) * 4000) })));
  const idRef = useRef(lines.length);
  useEffect(() => {
    if (paused || !data.templates.length) return;
    const t = setInterval(() => {
      const tpl = data.templates[Math.floor(Math.random() * data.templates.length)];
      setLines(prev => [...prev.slice(-60), { ...tpl, id: idRef.current++, at: new Date() }]);
    }, 1600);
    return () => clearInterval(t);
  }, [paused, data.templates]);
  const counts = lines.reduce<Record<string, number>>((m, l) => ({ ...m, [l.level]: (m[l.level] ?? 0) + 1 }), {});
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle}
        actions={<button className="btn-ghost" onClick={() => setPaused(p => !p)} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />} {paused ? "Resume" : "Pause"}</button>} />
      {data.stats && <KpiRow kpis={data.stats} />}
      <Card className="!p-0 overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-[var(--line)]">
          <Badge tone={paused ? "gray" : "green"} pulse={!paused}>{paused ? "Paused" : "Streaming"}</Badge>
          <span className="text-sm font-semibold">{data.streamLabel}</span>
          <span className="ml-auto flex gap-1.5">
            {(Object.keys(LEVEL_TONE) as (keyof typeof LEVEL_TONE)[]).map(l => <Badge key={l} tone={LEVEL_TONE[l]}>{l} · {counts[l] ?? 0}</Badge>)}
          </span>
        </div>
        <div className="font-mono text-xs max-h-[28rem] overflow-y-auto flex flex-col-reverse" aria-live="polite">
          <div>
            {lines.map(l => (
              <div key={l.id} className="flex gap-3 px-4 py-1.5 border-b border-[var(--line)] hover:bg-accent/5 animate-fadeUp">
                <span className="ink-2 tabular shrink-0">{l.at.toLocaleTimeString("en-US", { hour12: false })}</span>
                <span className={`shrink-0 w-14 uppercase font-semibold ${l.level === "error" ? "text-rose-600 dark:text-rose-400" : l.level === "warn" ? "text-amber-700 dark:text-amber-300" : l.level === "success" ? "text-emerald-700 dark:text-emerald-400" : "text-accent"}`}>{l.level}</span>
                <span className="shrink-0 ink-2 w-28 truncate">{l.source}</span>
                <span className="min-w-0 break-words">{l.message}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export function TrackerScreen({ data, title }: P<"tracker">) {
  const [sel, setSel] = useState(0);
  const cur = data.items[sel] ?? data.items[0];
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="!p-0 overflow-hidden">
          <ul>
            {data.items.map((it, i) => (
              <li key={it.id}>
                <button onClick={() => setSel(i)} className={`w-full text-left px-4 py-3 border-b border-[var(--line)] transition-colors ${i === sel ? "bg-accent/8" : "hover:bg-accent/5"}`}>
                  <div className="flex items-center gap-2"><span className="font-mono text-[11px] ink-2">{it.id}</span><Badge tone={it.tone}>{it.status}</Badge></div>
                  <div className="text-sm font-medium mt-1 truncate">{it.title}</div>
                  <div className="mt-2"><Progress value={(it.current / Math.max(1, it.steps.length - 1)) * 100} tone={it.tone} /></div>
                </button>
              </li>
            ))}
          </ul>
        </Card>
        {cur && (
          <Card className="lg:col-span-2 space-y-6 animate-fadeUp" key={cur.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="font-mono text-xs ink-2">{cur.id}</div><div className="font-display text-xl mt-0.5">{cur.title}</div><div className="text-sm ink-2">{cur.subtitle}</div></div>
              <div className="text-right"><div className="eyebrow">ETA</div><div className="font-display text-lg">{cur.eta}</div></div>
            </div>
            <ol className="flex items-start">
              {cur.steps.map((s, i) => {
                const done = i < cur.current, active = i === cur.current;
                return (
                  <li key={s} className="flex-1 flex flex-col items-center text-center relative">
                    {i > 0 && <span className={`absolute right-1/2 top-3.5 h-0.5 w-full -z-0 ${i <= cur.current ? "bg-accent" : "bg-[var(--line)]"}`} />}
                    <span className={`relative z-10 grid place-items-center h-7 w-7 rounded-full border-2 ${done ? "bg-accent border-accent text-white" : active ? "border-accent bg-[var(--surface)] text-accent" : "border-[var(--line)] bg-[var(--surface)] ink-2"}`}>
                      {done ? <Check size={13} /> : active ? <span className="h-2 w-2 rounded-full bg-accent animate-pulseDot" /> : <Circle size={8} />}
                    </span>
                    <span className={`mt-2 text-[11px] leading-tight px-1 ${active ? "font-semibold" : "ink-2"}`}>{s}</span>
                  </li>
                );
              })}
            </ol>
            <div>
              <SectionTitle eyebrow="History" title="Event log" />
              <ul className="space-y-2.5">
                {cur.events.map((e, i) => (
                  <li key={i} className="flex gap-3 text-sm"><span className="text-[11px] ink-2 w-24 shrink-0 tabular pt-0.5">{e.time}</span><span>{e.text}</span></li>
                ))}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

const PRIORITY_TONE = { High: "red", Medium: "amber", Low: "gray" } as const;

export function QueueScreen({ data, title }: P<"queue">) {
  const [decided, setDecided] = useState<Record<number, "approved" | "rejected">>({});
  const [open, setOpen] = useState<number | null>(null);
  const pending = data.items.filter((_, i) => !decided[i]).length;
  const decide = (i: number, v: "approved" | "rejected") => { setDecided(d => ({ ...d, [i]: v })); setOpen(null); };
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} actions={<Badge tone={pending ? "amber" : "green"}>{pending} pending</Badge>} />
      {data.stats && <KpiRow kpis={data.stats} />}
      <div className="space-y-3">
        {data.items.map((it, i) => {
          const d = decided[i];
          return (
            <Card key={i} className={`!p-4 flex flex-wrap items-center gap-4 transition-opacity ${d ? "opacity-55" : ""}`}>
              <button onClick={() => setOpen(i)} className="flex-1 min-w-52 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">{it.title}</span>
                  <Badge tone={PRIORITY_TONE[it.priority]}>{it.priority}</Badge>
                  {it.tags?.map(t => <Badge key={t} tone="gray">{t}</Badge>)}
                </div>
                <div className="text-xs ink-2 mt-1">{it.subtitle} · waiting {it.age}</div>
              </button>
              {it.amount && <div className="font-mono tabular text-sm font-semibold">{it.amount}</div>}
              {d ? (
                <Badge tone={d === "approved" ? "green" : "red"}>{d === "approved" ? data.approveLabel : data.rejectLabel}d</Badge>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => decide(i, "rejected")} className="btn-ghost !px-2.5" aria-label={`${data.rejectLabel} ${it.title}`}><X size={14} /></button>
                  <button onClick={() => decide(i, "approved")} className="btn-primary !px-3"><Check size={14} /> {data.approveLabel}</button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <Drawer open={open !== null} onClose={() => setOpen(null)} title={open !== null ? data.items[open].title : ""}>
        {open !== null && (
          <div className="space-y-4">
            <div className="flex gap-2"><Badge tone={PRIORITY_TONE[data.items[open].priority]}>{data.items[open].priority} priority</Badge><Badge tone="gray">Waiting {data.items[open].age}</Badge></div>
            <p className="text-sm leading-relaxed">{data.items[open].detail}</p>
            {data.items[open].amount && <div className="font-display text-2xl tabular">{data.items[open].amount}</div>}
            <div className="flex gap-2 pt-2">
              <button className="btn-primary flex-1 justify-center" onClick={() => decide(open, "approved")}><Check size={14} /> {data.approveLabel}</button>
              <button className="btn-ghost" onClick={() => decide(open, "rejected")}>{data.rejectLabel}</button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
