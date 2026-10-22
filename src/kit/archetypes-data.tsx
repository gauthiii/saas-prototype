// src/kit/archetypes-data.tsx — data-dense archetypes: dashboard, table, analytics, ledger,
// funnel, heatmap, scorecard.
import { useMemo, useState } from "react";
import { Download, Plus, ArrowUpRight, ArrowDownRight, Filter as FilterIcon } from "lucide-react";
import { Badge, Card, SectionTitle } from "../components/ui";
import { AreaChart, Bars, Donut, Radar, SERIES, ACCENT } from "../components/charts";
import { AIPanel } from "../components/AIPanel";
import type { ScreenData } from "../industries/types";
import { DataTable, KpiRow, PageHeader, Progress, TableCard, toneFor } from "./primitives";

type P<K extends keyof ScreenData> = { data: ScreenData[K]; title: string };

const Labels = ({ labels }: { labels?: string[] }) =>
  labels?.length ? (
    <div className="flex justify-between mt-2 text-[10px] ink-2 font-medium">{labels.map(l => <span key={l}>{l}</span>)}</div>
  ) : null;

export function DashboardScreen({ data, title }: P<"dashboard">) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle}
        actions={<><button className="btn-ghost"><Download size={14} /> Export</button><button className="btn-primary"><Plus size={14} /> New</button></>} />
      <KpiRow kpis={data.kpis} />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Trend" title={data.trend.title} right={data.trend.summary && <Badge tone="green">{data.trend.summary}</Badge>} />
          <AreaChart data={data.trend.series} height={180} />
          <Labels labels={data.trend.labels} />
        </Card>
        <Card>
          <SectionTitle eyebrow="Breakdown" title={data.bars.title} />
          <Bars data={data.bars.data} height={180} />
        </Card>
      </div>
      <div className={`grid gap-4 ${data.insights?.length ? "lg:grid-cols-3" : ""}`}>
        <div className={data.insights?.length ? "lg:col-span-2" : ""}><TableCard block={data.table} /></div>
        {data.insights?.length ? <AIPanel insights={data.insights} context={title} /> : null}
      </div>
    </div>
  );
}

export function TableScreen({ data, title }: P<"table">) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle}
        actions={<><button className="btn-ghost"><Download size={14} /> CSV</button>{data.primaryAction && <button className="btn-primary"><Plus size={14} /> {data.primaryAction}</button>}</>} />
      {data.kpis && <KpiRow kpis={data.kpis} />}
      <DataTable columns={data.columns} rows={data.rows} tones={data.tones} searchPlaceholder={data.searchPlaceholder} filter={data.filter} />
    </div>
  );
}

export function AnalyticsScreen({ data, title }: P<"analytics">) {
  const [range, setRange] = useState("90D");
  const segments = data.donut.segments.map((s, i) => ({ ...s, color: SERIES[i % SERIES.length] }));
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle}
        actions={
          <div className="flex rounded-lg border border-[var(--line)] p-0.5" role="group" aria-label="Date range">
            {["30D", "90D", "12M"].map(r => (
              <button key={r} onClick={() => setRange(r)} aria-pressed={range === r}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${range === r ? "bg-accent text-white" : "ink-2"}`}>{r}</button>
            ))}
          </div>
        } />
      <KpiRow kpis={data.kpis} />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow={`Last ${range}`} title={data.trend.title}
            right={data.trend.compare && <span className="text-[11px] ink-2 flex items-center gap-1.5"><span className="inline-block w-4 border-t border-dashed border-[var(--ink-2)]" /> previous period</span>} />
          <AreaChart data={data.trend.series} compare={data.trend.compare} height={200} />
          <Labels labels={data.trend.labels} />
        </Card>
        <Card>
          <SectionTitle eyebrow="Mix" title={data.donut.title} />
          <div className="flex justify-center"><Donut segments={segments} size={150} label={data.donut.centerLabel} sublabel={data.donut.centerSub} /></div>
          <ul className="mt-4 space-y-1.5">
            {segments.map(s => (
              <li key={s.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                <span className="flex-1">{s.name}</span><span className="font-mono tabular ink-2">{s.value}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className={`grid gap-4 ${data.radar ? "lg:grid-cols-3" : ""}`}>
        <Card className={data.radar ? "lg:col-span-2" : ""}>
          <SectionTitle eyebrow="Compare" title={data.bars.title} />
          <Bars data={data.bars.data} height={170} color={ACCENT} />
        </Card>
        {data.radar && (
          <Card>
            <SectionTitle eyebrow="Profile" title={data.radar.title} />
            <div className="flex justify-center"><Radar axes={data.radar.axes} values={data.radar.values} size={210} /></div>
          </Card>
        )}
      </div>
      {data.table && <TableCard block={data.table} />}
    </div>
  );
}

export function LedgerScreen({ data, title }: P<"ledger">) {
  const [cat, setCat] = useState("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set(data.rows.map(r => r.category)))], [data.rows]);
  const rows = data.rows.filter(r => cat === "All" || r.category === cat);
  const fmt = (n: number) => `${n < 0 ? "−" : "+"}${data.currency}${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const inflow = rows.filter(r => r.amount > 0).reduce((s, r) => s + r.amount, 0);
  const outflow = rows.filter(r => r.amount < 0).reduce((s, r) => s + r.amount, 0);
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} actions={<button className="btn-ghost"><Download size={14} /> Statement</button>} />
      {data.accounts && <KpiRow kpis={data.accounts} />}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card><div className="eyebrow">Inflow</div><div className="mt-1 font-display text-2xl text-emerald-600 dark:text-emerald-400 tabular">{fmt(inflow)}</div></Card>
        <Card><div className="eyebrow">Outflow</div><div className="mt-1 font-display text-2xl text-rose-600 dark:text-rose-400 tabular">{fmt(outflow)}</div></Card>
        <Card><div className="eyebrow">Net</div><div className="mt-1 font-display text-2xl tabular">{fmt(inflow + outflow)}</div></Card>
      </div>
      <Card className="!p-0 overflow-hidden">
        <div className="flex flex-wrap items-center gap-1.5 px-4 py-3 border-b border-[var(--line)]">
          <FilterIcon size={14} className="ink-2 mr-1" />
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${cat === c ? "bg-accent text-white border-accent" : "border-[var(--line)] ink-2"}`}>{c}</button>
          ))}
        </div>
        <ul>
          {rows.map((r, i) => (
            <li key={i} className="flex items-center gap-3 px-4 py-3 border-t border-[var(--line)] first:border-t-0 hover:bg-accent/5 transition-colors">
              <span className={`grid place-items-center h-8 w-8 rounded-lg ${r.amount >= 0 ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/12 text-rose-600 dark:text-rose-400"}`}>
                {r.amount >= 0 ? <ArrowDownRight size={15} /> : <ArrowUpRight size={15} />}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{r.description}</div>
                <div className="text-[11px] ink-2">{r.date} · {r.category}{r.ref ? <> · <span className="font-mono">{r.ref}</span></> : null}</div>
              </div>
              <Badge tone={toneFor(r.status, data.tones)}>{r.status}</Badge>
              <span className={`font-mono tabular text-sm w-32 text-right ${r.amount >= 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>{fmt(r.amount)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function FunnelScreen({ data, title }: P<"funnel">) {
  const top = data.stages[0]?.count || 1;
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      {data.kpis && <KpiRow kpis={data.kpis} />}
      <Card>
        <SectionTitle eyebrow="Conversion" title="Stage by stage" />
        <div className="space-y-2.5">
          {data.stages.map((s, i) => {
            const pct = (s.count / top) * 100;
            const prev = i > 0 ? data.stages[i - 1].count : s.count;
            return (
              <div key={s.name} className="grid grid-cols-[8rem_1fr_auto] sm:grid-cols-[11rem_1fr_9rem] items-center gap-3">
                <div className="text-sm font-medium truncate">{s.name}</div>
                <div className="h-9 rounded-lg surface-2 overflow-hidden">
                  <div className="h-full rounded-lg bg-gradient-to-r from-accent to-grad flex items-center px-3 text-white text-xs font-semibold transition-all duration-700"
                    style={{ width: `${Math.max(pct, 8)}%` }}>{s.count.toLocaleString("en-US")}</div>
                </div>
                <div className="text-right text-xs">
                  {s.value && <div className="font-mono tabular font-semibold">{s.value}</div>}
                  {i > 0 && <div className="ink-2">{((s.count / prev) * 100).toFixed(0)}% from prev.</div>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      {data.breakdown && (
        <Card>
          <SectionTitle eyebrow="Breakdown" title={data.breakdown.title} />
          <Bars data={data.breakdown.data} height={160} />
        </Card>
      )}
      {data.table && <TableCard block={data.table} />}
    </div>
  );
}

export function HeatmapScreen({ data, title }: P<"heatmap">) {
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      {data.summary && <KpiRow kpis={data.summary} />}
      <Card className="overflow-x-auto">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div className="text-sm ink-2" aria-live="polite">
            {hover ? <><span className="font-semibold text-[var(--ink)]">{data.rows[hover.r]} · {data.cols[hover.c]}</span>: {data.values[hover.r]?.[hover.c]}{data.unit ?? "%"}</> : "Hover a cell for details"}
          </div>
          <div className="flex items-center gap-2 text-[11px] ink-2">
            {data.legend[0]}
            <span className="h-2.5 w-28 rounded-full" style={{ background: "linear-gradient(90deg, rgb(var(--accent-rgb) / .08), rgb(var(--accent-rgb)))" }} />
            {data.legend[1]}
          </div>
        </div>
        <table className="border-separate" style={{ borderSpacing: 4 }}>
          <thead>
            <tr>
              <th className="eyebrow text-left pr-3">{data.rowLabel}</th>
              {data.cols.map(c => <th key={c} className="text-[10px] ink-2 font-semibold px-0.5">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, ri) => (
              <tr key={r}>
                <td className="text-xs font-medium pr-3 whitespace-nowrap">{r}</td>
                {data.cols.map((c, ci) => {
                  const v = data.values[ri]?.[ci] ?? 0;
                  return (
                    <td key={c} onMouseEnter={() => setHover({ r: ri, c: ci })} onMouseLeave={() => setHover(null)}
                      className="h-9 min-w-9 rounded-md text-center text-[10px] font-semibold tabular cursor-default transition-transform hover:scale-110"
                      style={{ background: `rgb(var(--accent-rgb) / ${0.08 + (v / 100) * 0.92})`, color: v > 55 ? "#fff" : "var(--ink)" }}
                      aria-label={`${r} ${c}: ${v}${data.unit ?? "%"}`}>{v}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export function ScorecardScreen({ data, title }: P<"scorecard">) {
  const weights = data.weights ?? data.criteria.map(() => 1);
  const wsum = weights.reduce((a, b) => a + b, 0) || 1;
  const ranked = data.entities
    .map(e => ({ ...e, total: Math.round(e.scores.reduce((s, v, i) => s + v * (weights[i] ?? 1), 0) / wsum) }))
    .sort((a, b) => b.total - a.total);
  const [sel, setSel] = useState(0);
  const cur = ranked[sel] ?? ranked[0];
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 !p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="eyebrow px-4 py-2.5">#</th>
                  <th className="eyebrow px-4 py-2.5">Name</th>
                  {data.criteria.map(c => <th key={c} className="eyebrow px-2 py-2.5 text-center">{c}</th>)}
                  <th className="eyebrow px-4 py-2.5 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((e, i) => (
                  <tr key={e.name} onClick={() => setSel(i)} className={`border-t border-[var(--line)] cursor-pointer transition-colors ${i === sel ? "bg-accent/8" : "hover:bg-accent/5"}`}>
                    <td className="px-4 py-3 font-mono ink-2">{i + 1}</td>
                    <td className="px-4 py-3"><div className="font-medium">{e.name}</div><div className="text-[11px] ink-2">{e.subtitle}</div></td>
                    {e.scores.map((s, si) => (
                      <td key={si} className="px-2 py-3 text-center">
                        <span className={`inline-block min-w-9 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular ${s >= 80 ? "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300" : s >= 60 ? "bg-amber-500/15 text-amber-800 dark:text-amber-200" : "bg-rose-500/12 text-rose-700 dark:text-rose-300"}`}>{s}</span>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right font-display text-lg tabular">{e.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        {cur && (
          <Card className="space-y-4">
            <div>
              <div className="eyebrow">Selected</div>
              <div className="font-display text-lg mt-1">{cur.name}</div>
              <div className="text-xs ink-2">{cur.subtitle}</div>
              <div className="flex gap-2 mt-2">{cur.badge && <Badge tone="violet">{cur.badge}</Badge>}{cur.trend && <Badge tone="green">{cur.trend}</Badge>}</div>
            </div>
            <div className="flex justify-center"><Radar axes={data.criteria} values={cur.scores} size={200} /></div>
            <div className="space-y-2">
              {data.criteria.map((c, i) => (
                <div key={c}>
                  <div className="flex justify-between text-xs mb-1"><span>{c}</span><span className="ink-2 tabular">{cur.scores[i]} · w{weights[i]}</span></div>
                  <Progress value={cur.scores[i]} />
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
