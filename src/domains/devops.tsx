// src/domains/devops.tsx
import { useEffect, useRef, useState } from "react";
import { Server, Activity, Pause, Play, GitBranch, CheckCircle2, XCircle, CircleDashed, RotateCcw, BellRing, Flag, DollarSign } from "lucide-react";
import { Card, SectionTitle, Badge, Stat, Toggle, Tone } from "../components/ui";
import { AreaChart, Bars, Donut } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

const insights: Insight[] = [
  { title: "Memory leak suspected", body: "checkout-svc heap grows ~4% per hour since the 14:02 deploy. Correlates with release v2.31.0 — recommend rollback or canary halt.", tone: "red", tag: "Root cause", confidence: 89 },
  { title: "Noisy alert cluster", body: "63% of pages this week trace to one flapping health check on edge-gw-3. Tuning the threshold would cut alert volume by half.", tone: "amber", tag: "Alert hygiene", confidence: 84 },
  { title: "Scale-down opportunity", body: "Batch workers idle 71% of off-peak hours. A scheduled scale policy saves an estimated $1,240/month.", tone: "green", tag: "Cost", confidence: 77 },
];

type Log = { t: string; lvl: "INFO" | "WARN" | "ERROR" | "DEBUG"; svc: string; msg: string };
const pool: Log[] = [
  { t: "", lvl: "INFO", svc: "checkout-svc", msg: "order 88412 captured, latency=212ms" },
  { t: "", lvl: "WARN", svc: "edge-gw-3", msg: "health probe timeout, retrying (2/3)" },
  { t: "", lvl: "ERROR", svc: "checkout-svc", msg: "OOMKilled: pod restarted, heap=1.9GiB" },
  { t: "", lvl: "DEBUG", svc: "auth-api", msg: "token refresh ok for tenant=acme" },
  { t: "", lvl: "INFO", svc: "billing-cron", msg: "invoice batch complete: 412 ok / 0 failed" },
  { t: "", lvl: "WARN", svc: "search-idx", msg: "replication lag 3.4s exceeds 2s SLO" },
];
const lvlColor: Record<Log["lvl"], string> = {
  INFO: "text-sky-500", WARN: "text-amber-500", ERROR: "text-rose-500", DEBUG: "text-zinc-500",
};

export function LiveLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [paused, setPaused] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const iv = setInterval(() => {
      if (paused) return;
      setLogs(prev => {
        const next = { ...pool[Math.floor(Math.random() * pool.length)], t: new Date().toLocaleTimeString() };
        return [...prev.slice(-60), next];
      });
    }, 900);
    return () => clearInterval(iv);
  }, [paused]);
  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight }); }, [logs]);
  return (
    <Card className="!p-0 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-[var(--line)] flex items-center justify-between">
        <SectionTitle eyebrow="Observability" title="Live log stream" />
        <button className="btn-ghost !py-1.5 text-xs" onClick={() => setPaused(p => !p)}>
          {paused ? <Play size={13} /> : <Pause size={13} />} {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <div ref={box} className="h-72 overflow-y-auto bg-obsidian-950 p-4 font-mono text-[12px] leading-relaxed text-zinc-300">
        {logs.length === 0 && <span className="text-zinc-500">Waiting for events…</span>}
        {logs.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap animate-fadeUp">
            <span className="text-zinc-500">{l.t}</span>{"  "}
            <span className={`${lvlColor[l.lvl]} font-semibold`}>{l.lvl.padEnd(5)}</span>{" "}
            <span className="text-violet-400">{l.svc}</span>{"  "}
            <span>{l.msg}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function DevOpsDashboard() {
  const nodes = [
    { name: "edge-gw-1", cpu: 41, status: "Healthy" }, { name: "edge-gw-3", cpu: 88, status: "Degraded" },
    { name: "checkout-svc", cpu: 93, status: "Critical" }, { name: "auth-api", cpu: 37, status: "Healthy" },
    { name: "search-idx", cpu: 64, status: "Healthy" }, { name: "billing-cron", cpu: 12, status: "Healthy" },
  ];
  const tone: Record<string, Tone> = { Healthy: "green", Degraded: "amber", Critical: "red" };
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <Card>
          <SectionTitle eyebrow="Infrastructure" title="Service health grid" right={<Badge tone="red" pulse>1 critical</Badge>} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {nodes.map(n => (
              <div key={n.name} className="rounded-lg border border-[var(--line)] p-3.5 card-hover">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium">{n.name}</span>
                  <Server size={14} className="ink-2" />
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${n.cpu > 85 ? "bg-rose-500" : n.cpu > 70 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${n.cpu}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="ink-2 font-mono">CPU {n.cpu}%</span>
                  <Badge tone={tone[n.status]}>{n.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Metrics" title="p95 latency — checkout-svc" right={<Activity size={15} className="text-accent" />} />
          <AreaChart data={[210, 218, 205, 230, 226, 280, 340, 390, 372, 410]} stroke="#f43f5e" />
          <p className="text-xs ink-2 mt-2 font-mono">Spike begins at 14:02 UTC — deploy marker v2.31.0</p>
        </Card>
        <LiveLogs />
      </div>
      <div className="space-y-5">
        <KanbanMini />
        <AIPanel context="prod-east cluster · last 6 hours" insights={insights} />
      </div>
    </div>
  );
}

export function KanbanMini() {
  const cols: { name: string; tone: Tone; items: { id: string; title: string; sev: string }[] }[] = [
    { name: "Triage", tone: "amber", items: [{ id: "INC-311", title: "checkout-svc OOM restarts", sev: "P1" }, { id: "INC-312", title: "Replication lag on search-idx", sev: "P3" }] },
    { name: "In progress", tone: "blue", items: [{ id: "INC-308", title: "edge-gw-3 flapping probe", sev: "P2" }] },
    { name: "Resolved", tone: "green", items: [{ id: "INC-301", title: "Cert rotation, billing-cron", sev: "P3" }] },
  ];
  return (
    <Card>
      <SectionTitle eyebrow="Incidents" title="Ticket board" />
      <div className="space-y-4">
        {cols.map(c => (
          <div key={c.name}>
            <div className="flex items-center gap-2 mb-2">
              <Badge tone={c.tone}>{c.name}</Badge>
              <span className="text-xs ink-2">{c.items.length}</span>
            </div>
            <div className="space-y-2">
              {c.items.map(it => (
                <div key={it.id} className="rounded-lg border border-[var(--line)] p-3 hover:border-accent/40 transition-colors cursor-grab active:cursor-grabbing">
                  <div className="text-sm font-medium">{it.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs ink-2 font-mono">
                    <span>{it.id}</span><Badge tone={it.sev === "P1" ? "red" : it.sev === "P2" ? "amber" : "gray"}>{it.sev}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

type StageState = "passed" | "running" | "failed" | "queued";
const stageIcon: Record<StageState, JSX.Element> = {
  passed: <CheckCircle2 size={16} className="text-emerald-500" />,
  running: <CircleDashed size={16} className="text-accent animate-spin" />,
  failed: <XCircle size={16} className="text-rose-500" />,
  queued: <CircleDashed size={16} className="ink-2" />,
};

export function DeploymentsScreen() {
  const stages: { name: string; state: StageState; dur: string }[] = [
    { name: "Build", state: "passed", dur: "2m 14s" },
    { name: "Unit tests", state: "passed", dur: "4m 51s" },
    { name: "Integration", state: "running", dur: "3m 02s…" },
    { name: "Canary 5%", state: "queued", dur: "—" },
    { name: "Full rollout", state: "queued", dur: "—" },
  ];
  const history = [
    { ver: "v2.31.1", svc: "checkout-svc", who: "t.walsh", when: "12 min ago", ok: false, note: "Rolled back — OOM regression" },
    { ver: "v1.18.0", svc: "auth-api", who: "r.mehta", when: "2 hrs ago", ok: true, note: "Token cache warmup added" },
    { ver: "v3.4.2", svc: "search-idx", who: "k.subra", when: "5 hrs ago", ok: true, note: "Shard rebalance tuning" },
    { ver: "v2.31.0", svc: "checkout-svc", who: "t.walsh", when: "Yesterday", ok: false, note: "Introduced heap growth (revert shipped)" },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Card>
        <SectionTitle eyebrow="CI/CD" title="Pipeline · checkout-svc v2.31.2" right={<Badge tone="blue" pulse>Running</Badge>} />
        <div className="flex items-center gap-2 text-xs ink-2 font-mono mb-4">
          <GitBranch size={13} /> release/2.31.2 · commit 8f31ac0 · triggered by t.walsh
        </div>
        <ol className="space-y-1">
          {stages.map((s, i) => (
            <li key={s.name} className="flex items-center gap-3">
              <div className="flex flex-col items-center self-stretch">
                {stageIcon[s.state]}
                {i < stages.length - 1 && <span className="w-px flex-1 bg-[var(--line)] my-1" />}
              </div>
              <div className={`flex-1 flex items-center justify-between rounded-lg border p-3 mb-2 ${s.state === "running" ? "border-accent/50 bg-accent/5" : "border-[var(--line)]"}`}>
                <span className={`text-sm font-medium ${s.state === "queued" ? "ink-2" : ""}`}>{s.name}</span>
                <span className="text-xs font-mono ink-2">{s.dur}</span>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex justify-end gap-2 mt-2">
          <button className="btn-ghost text-xs"><RotateCcw size={13} /> Rollback to v2.30.9</button>
          <button className="btn-primary text-xs">Promote when green</button>
        </div>
      </Card>
      <Card>
        <SectionTitle eyebrow="History" title="Recent deploys" right={<span className="text-xs ink-2">prod-east</span>} />
        <div className="divide-y divide-[var(--line)]">
          {history.map(h => (
            <div key={h.ver + h.svc} className="py-3 flex items-center gap-3">
              {h.ok ? <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> : <XCircle size={16} className="text-rose-500 shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium"><span className="font-mono">{h.ver}</span> · {h.svc}</div>
                <div className="text-xs ink-2 truncate">{h.note}</div>
              </div>
              <div className="text-right text-xs ink-2 shrink-0">
                <div className="font-mono">{h.who}</div>
                <div>{h.when}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function AlertsScreen() {
  const [acked, setAcked] = useState<Record<string, boolean>>({});
  const alerts = [
    { id: "AL-901", sev: "P1", rule: "Heap > 85% for 10m", svc: "checkout-svc", since: "14 min" },
    { id: "AL-898", sev: "P2", rule: "Probe failures > 3/min", svc: "edge-gw-3", since: "1.2 hrs" },
    { id: "AL-894", sev: "P3", rule: "Replication lag > 2s", svc: "search-idx", since: "3 hrs" },
  ];
  const rotation = [
    { who: "R. Mehta", role: "Primary", window: "Now → Thu 09:00", active: true },
    { who: "T. Walsh", role: "Secondary", window: "Now → Thu 09:00", active: true },
    { who: "L. Ortiz", role: "Primary", window: "Thu 09:00 → Mon 09:00", active: false },
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-3 max-w-5xl mx-auto">
      <Card className="lg:col-span-2">
        <SectionTitle eyebrow="Alerting" title="Firing alerts" right={<Badge tone="red" pulse>{alerts.filter(a => !acked[a.id]).length} unacked</Badge>} />
        <div className="space-y-3">
          {alerts.map(a => {
            const isAcked = !!acked[a.id];
            return (
              <div key={a.id} className={`rounded-lg border p-4 transition-all ${isAcked ? "border-[var(--line)] opacity-60" : a.sev === "P1" ? "border-rose-500/50 bg-rose-500/5" : "border-[var(--line)]"}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={a.sev === "P1" ? "red" : a.sev === "P2" ? "amber" : "gray"} pulse={a.sev === "P1" && !isAcked}>{a.sev}</Badge>
                  <div className="flex-1 min-w-40">
                    <div className="text-sm font-medium">{a.rule}</div>
                    <div className="text-xs ink-2 font-mono mt-0.5">{a.svc} · firing {a.since} · {a.id}</div>
                  </div>
                  {isAcked
                    ? <Badge tone="green">Acknowledged</Badge>
                    : <button className="btn-primary !py-1.5 text-xs" onClick={() => setAcked(x => ({ ...x, [a.id]: true }))}><BellRing size={13} /> Acknowledge</button>}
                </div>
              </div>
            );
          })}
        </div>
        <Card className="mt-4 !shadow-none border-dashed">
          <div className="text-sm font-medium mb-1">Alert volume · 7 days</div>
          <Bars data={[{label:"Thu",value:14},{label:"Fri",value:22},{label:"Sat",value:9},{label:"Sun",value:7},{label:"Mon",value:18},{label:"Tue",value:31},{label:"Wed",value:26}]} height={110} color="#f59e0b" />
        </Card>
      </Card>
      <Card>
        <SectionTitle eyebrow="On-call" title="Rotation" />
        <div className="space-y-3">
          {rotation.map(r => (
            <div key={r.who + r.role} className={`rounded-lg border p-3.5 ${r.active ? "border-accent/40 bg-accent/5" : "border-[var(--line)]"}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{r.who}</span>
                <Badge tone={r.active ? "blue" : "gray"}>{r.role}</Badge>
              </div>
              <div className="text-xs ink-2 mt-1">{r.window}</div>
              {r.active && r.role === "Primary" && <div className="text-[11px] text-accent font-medium mt-1.5">Paging now via push + SMS</div>}
            </div>
          ))}
        </div>
        <button className="btn-ghost w-full justify-center text-xs mt-4">Request override</button>
      </Card>
    </div>
  );
}

export function FeatureFlags() {
  const [flags, setFlags] = useState([
    { key: "checkout.new-payment-sheet", desc: "Redesigned payment bottom sheet", env: "Production", rollout: 25, on: true },
    { key: "search.semantic-rerank", desc: "LLM re-ranking on search results", env: "Production", rollout: 100, on: true },
    { key: "auth.passkey-login", desc: "WebAuthn passkey flow", env: "Staging", rollout: 100, on: true },
    { key: "billing.usage-alerts", desc: "Proactive overage notifications", env: "Production", rollout: 0, on: false },
  ]);
  const flip = (key: string) => setFlags(fs => fs.map(f => f.key === key ? { ...f, on: !f.on } : f));
  return (
    <Card className="max-w-3xl mx-auto">
      <SectionTitle eyebrow="Release control" title="Feature flags" right={<Flag size={15} className="text-accent" />} />
      <div className="space-y-3">
        {flags.map(f => (
          <div key={f.key} className={`rounded-lg border border-[var(--line)] p-4 transition-opacity ${f.on ? "" : "opacity-70"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-48">
                <div className="text-sm font-mono font-medium">{f.key}</div>
                <div className="text-xs ink-2 mt-0.5">{f.desc}</div>
              </div>
              <Badge tone={f.env === "Production" ? "violet" : "gray"}>{f.env}</Badge>
              <Toggle on={f.on} onChange={() => flip(f.key)} label={`Toggle ${f.key}`} />
            </div>
            {f.on && (
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${f.rollout}%` }} />
                </div>
                <span className="text-xs font-mono ink-2 w-20 text-right">{f.rollout}% rollout</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-[var(--line)] bg-[var(--bg)] p-3 text-xs ink-2 leading-relaxed">
        Flag changes are audit-logged and propagate to all pods in under 10 seconds. Kill-switching a flag never requires a deploy.
      </div>
    </Card>
  );
}

export function CostScreen() {
  const byService = [
    { name: "Compute (EKS)", value: 18400, color: "#4f6df5" },
    { name: "Databases", value: 9100, color: "#8b5cf6" },
    { name: "Storage & CDN", value: 4600, color: "#10b981" },
    { name: "Observability", value: 3200, color: "#f59e0b" },
  ];
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Spend · MTD" value="$35,300" delta="+4.8% vs May" deltaTone="amber" icon={<DollarSign size={16} />} />
        <Stat label="Forecast · June" value="$41,900" delta="2% under budget" />
        <Stat label="Savings identified" value="$3,140/mo" delta="4 recommendations" deltaTone="blue" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <SectionTitle eyebrow="FinOps" title="Cost by category" />
          <div className="flex items-center gap-6">
            <Donut segments={byService} label="$35.3k" sublabel="month to date" size={150} />
            <div className="space-y-2 flex-1">
              {byService.map(s => (
                <div key={s.name} className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="flex-1">{s.name}</span>
                  <span className="font-mono text-xs ink-2">${s.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Trend" title="Daily spend · 14 days" />
          <AreaChart data={[1080, 1120, 1095, 1240, 1180, 1150, 1390, 1310, 1265, 1180, 1210, 1330, 1280, 1245]} stroke="#10b981" height={150} />
          <p className="text-xs ink-2 mt-2 font-mono">Spike Jun 4 — load test against staging left autoscaler at peak overnight.</p>
        </Card>
      </div>
      <Card>
        <SectionTitle eyebrow="Recommendations" title="Top savings opportunities" />
        <div className="space-y-2.5">
          {[
            ["Scheduled scale-down for batch workers", "$1,240/mo", "green"],
            ["Right-size search-idx from r6g.2xl to r6g.xl", "$890/mo", "green"],
            ["Move cold logs to infrequent-access tier", "$610/mo", "blue"],
            ["Delete 14 unattached EBS volumes", "$400/mo", "blue"],
          ].map(([rec, save, tone]) => (
            <div key={rec as string} className="flex items-center justify-between rounded-lg border border-[var(--line)] p-3.5 hover:border-accent/40 transition-colors">
              <span className="text-sm font-medium">{rec}</span>
              <Badge tone={tone as Tone}>{save}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
