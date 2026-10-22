// src/kit/primitives.tsx — building blocks shared by every archetype screen.
import { ReactNode, useMemo, useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Badge, Card, Drawer, Stat, Toggle, Tone } from "../components/ui";
import { icon } from "../lib/iconMap";
import type { Column, Field, Kpi, Row, TableBlock } from "../industries/types";

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div className="min-w-0">
        <h1 className="font-display text-2xl sm:text-[1.7rem] tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm ink-2 mt-1 max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function KpiRow({ kpis }: { kpis: Kpi[] }) {
  if (!kpis.length) return null;
  const cols = kpis.length >= 4 ? "lg:grid-cols-4" : kpis.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <div className={`grid grid-cols-2 ${cols} gap-4`}>
      {kpis.map(k => {
        const Icon = k.icon ? icon(k.icon) : null;
        return <Stat key={k.label} label={k.label} value={k.value} delta={k.delta} deltaTone={k.tone ?? "green"} icon={Icon ? <Icon size={16} /> : undefined} />;
      })}
    </div>
  );
}

export function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

/** Renders an emoji as-is, otherwise derives initials from a name. */
export function Avatar({ value, size = 32 }: { value: string; size?: number }) {
  const isText = /^[\p{L}\p{N}\s.'-]+$/u.test(value);
  return (
    <span className="grid place-items-center shrink-0 rounded-full bg-gradient-to-br from-accent/20 to-grad/20 text-accent font-semibold"
      style={{ width: size, height: size, fontSize: isText ? size * 0.36 : size * 0.5 }} aria-hidden="true">
      {isText ? initials(value) : value}
    </span>
  );
}

export function Progress({ value, tone = "accent" }: { value: number; tone?: "accent" | Tone }) {
  const color = tone === "accent" || tone === "blue" ? "bg-accent" : tone === "green" ? "bg-emerald-500" : tone === "red" ? "bg-rose-500" : tone === "amber" ? "bg-amber-500" : tone === "violet" ? "bg-violet-500" : "bg-zinc-400";
  return (
    <div className="h-1.5 w-full rounded-full bg-[var(--line)] overflow-hidden" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function toneFor(value: string | number, tones?: Record<string, Tone>): Tone {
  return tones?.[String(value)] ?? "gray";
}

export function Cell({ col, row, tones }: { col: Column; row: Row; tones?: Record<string, Tone> }) {
  const v = row[col.key];
  if (v === undefined || v === "") return <span className="ink-2">—</span>;
  switch (col.type) {
    case "badge": return <Badge tone={toneFor(v, tones)}>{v}</Badge>;
    case "money": return <span className="font-mono tabular">{typeof v === "number" ? v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : v}</span>;
    case "number": return <span className="font-mono tabular">{typeof v === "number" ? v.toLocaleString("en-US") : v}</span>;
    case "progress": return <div className="flex items-center gap-2 min-w-24"><Progress value={Number(v)} /><span className="text-xs ink-2 tabular w-9 text-right">{v}%</span></div>;
    case "avatar": return <span className="flex items-center gap-2"><Avatar value={String(v)} size={26} /><span className="font-medium">{v}</span></span>;
    case "mono": return <span className="font-mono text-xs">{v}</span>;
    case "date": return <span className="ink-2 whitespace-nowrap">{v}</span>;
    default: return <span>{v}</span>;
  }
}

/** Searchable table with an optional single-key filter and a row-detail drawer. */
export function DataTable({ columns, rows, tones, searchPlaceholder, filter, compact, title, onRowTitle }: {
  columns: Column[]; rows: Row[]; tones?: Record<string, Tone>; searchPlaceholder?: string;
  filter?: { key: string; options: string[] }; compact?: boolean; title?: string; onRowTitle?: (r: Row) => string;
}) {
  const [q, setQ] = useState("");
  const [f, setF] = useState("All");
  const [open, setOpen] = useState<Row | null>(null);
  const shown = useMemo(() => rows.filter(r =>
    (f === "All" || !filter || String(r[filter.key]) === f) &&
    (!q || Object.values(r).some(v => String(v).toLowerCase().includes(q.toLowerCase())))
  ), [rows, q, f, filter]);
  const rowTitle = (r: Row) => onRowTitle?.(r) ?? String(r[columns[0].key]);

  return (
    <Card className="!p-0 overflow-hidden">
      {(title || searchPlaceholder || filter) && (
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-[var(--line)]">
          {title && <h2 className="font-display text-base mr-auto">{title}</h2>}
          {searchPlaceholder && (
            <label className="flex items-center gap-2 field !py-1.5 max-w-xs">
              <Search size={14} className="ink-2 shrink-0" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} className="bg-transparent outline-none w-full text-sm" />
            </label>
          )}
          {filter && (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Filter by ${filter.key}`}>
              {["All", ...filter.options].map(o => (
                <button key={o} onClick={() => setF(o)} aria-pressed={f === o}
                  className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${f === o ? "bg-accent text-white border-accent" : "border-[var(--line)] ink-2 hover:border-accent/40"}`}>{o}</button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              {columns.map(c => <th key={c.key} className={`eyebrow font-semibold px-4 ${compact ? "py-2" : "py-2.5"} ${c.align === "right" ? "text-right" : ""}`}>{c.label}</th>)}
              <th className="w-8" aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {shown.map((r, i) => (
              <tr key={i} onClick={() => setOpen(r)} className="border-t border-[var(--line)] hover:bg-accent/5 cursor-pointer transition-colors">
                {columns.map(c => <td key={c.key} className={`px-4 ${compact ? "py-2" : "py-3"} ${c.align === "right" ? "text-right" : ""}`}><Cell col={c} row={r} tones={tones} /></td>)}
                <td className="pr-3 ink-2"><ChevronRight size={14} /></td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-sm ink-2">No records match your filters. Clear the search or pick another filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer open={!!open} onClose={() => setOpen(null)} title={open ? rowTitle(open) : ""}>
        {open && (
          <dl className="space-y-3">
            {columns.map(c => (
              <div key={c.key} className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-3">
                <dt className="text-xs ink-2 uppercase tracking-wider font-semibold pt-0.5">{c.label}</dt>
                <dd className="text-sm text-right"><Cell col={c} row={open} tones={tones} /></dd>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="btn-primary flex-1 justify-center">Open record</button>
              <button className="btn-ghost" onClick={() => setOpen(null)}>Close</button>
            </div>
          </dl>
        )}
      </Drawer>
    </Card>
  );
}

export function TableCard({ block, compact }: { block: TableBlock; compact?: boolean }) {
  return <DataTable title={block.title} columns={block.columns} rows={block.rows} tones={block.tones} compact={compact} />;
}

/** One form control for a Field definition. Uncontrolled except toggles/radios. */
export function FieldInput({ field }: { field: Field }) {
  const [on, setOn] = useState(field.value === "true");
  const [choice, setChoice] = useState(field.value ?? field.options?.[0] ?? "");
  const id = `f-${field.label.replace(/\W+/g, "-").toLowerCase()}`;
  const wrap = field.half ? "" : "sm:col-span-2";
  if (field.type === "toggle") {
    return (
      <div className={`flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] px-3 py-2.5 ${wrap}`}>
        <span className="text-sm font-medium">{field.label}</span>
        <Toggle on={on} onChange={setOn} label={field.label} />
      </div>
    );
  }
  if (field.type === "radio") {
    return (
      <fieldset className={wrap}>
        <legend className="label">{field.label}</legend>
        <div className="flex flex-wrap gap-2">
          {(field.options ?? []).map(o => (
            <button type="button" key={o} onClick={() => setChoice(o)} aria-pressed={choice === o}
              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${choice === o ? "border-accent bg-accent/10 text-accent font-semibold" : "border-[var(--line)] hover:border-accent/40"}`}>{o}</button>
          ))}
        </div>
      </fieldset>
    );
  }
  return (
    <div className={wrap}>
      <label htmlFor={id} className="label">{field.label}</label>
      {field.type === "select" ? (
        <select id={id} className="field" defaultValue={field.value}>
          {(field.options ?? []).map(o => <option key={o}>{o}</option>)}
        </select>
      ) : field.type === "textarea" ? (
        <textarea id={id} className="field min-h-24" placeholder={field.placeholder} defaultValue={field.value} />
      ) : field.type === "currency" ? (
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm ink-2">$</span>
          <input id={id} className="field !pl-7 font-mono tabular" inputMode="decimal" placeholder={field.placeholder ?? "0.00"} defaultValue={field.value} />
        </div>
      ) : (
        <input id={id} className="field" type={field.type} placeholder={field.placeholder} defaultValue={field.value} />
      )}
    </div>
  );
}

export function FieldGrid({ fields }: { fields: Field[] }) {
  return <div className="grid sm:grid-cols-2 gap-4">{fields.map(f => <FieldInput key={f.label} field={f} />)}</div>;
}

export function Legend({ items }: { items: { label: string; tone: Tone }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(l => <Badge key={l.label} tone={l.tone}>{l.label}</Badge>)}
    </div>
  );
}

/** Solid fill class for a tone (dots, bars, calendar blocks). */
export const TONE_FILL: Record<Tone, string> = {
  green: "bg-emerald-500", red: "bg-rose-500", amber: "bg-amber-500", blue: "bg-accent", gray: "bg-zinc-400", violet: "bg-violet-500",
};
/** Soft tinted surface for a tone (event blocks, chips). Text stays readable in both modes. */
export const TONE_SOFT: Record<Tone, string> = {
  green: "bg-emerald-500/12 border-emerald-500/30 text-emerald-800 dark:text-emerald-200",
  red: "bg-rose-500/12 border-rose-500/30 text-rose-800 dark:text-rose-200",
  amber: "bg-amber-500/15 border-amber-500/35 text-amber-900 dark:text-amber-200",
  blue: "bg-accent/12 border-accent/30 text-[var(--ink)]",
  gray: "bg-zinc-500/10 border-zinc-500/25 text-[var(--ink)]",
  violet: "bg-violet-500/12 border-violet-500/30 text-violet-800 dark:text-violet-200",
};
