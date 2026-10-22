// src/kit/archetypes-flow.tsx — input & decision archetypes: form, wizard, booking,
// checklist, matrix, comparison.
import { useState } from "react";
import { Check, CheckCircle2, ChevronLeft, ChevronRight, Loader2, X, AlertTriangle } from "lucide-react";
import { Badge, Card, SectionTitle, Toggle, useFakeSubmit } from "../components/ui";
import type { ScreenData } from "../industries/types";
import { FieldGrid, PageHeader, Progress } from "./primitives";

type P<K extends keyof ScreenData> = { data: ScreenData[K]; title: string };

function SubmitButton({ state, label, onClick }: { state: "idle" | "loading" | "done"; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} disabled={state === "loading"} className="btn-primary justify-center min-w-40 disabled:opacity-70">
      {state === "loading" ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : state === "done" ? <><Check size={14} /> Saved</> : label}
    </button>
  );
}

export function FormScreen({ data, title }: P<"form">) {
  const { state, submit } = useFakeSubmit();
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      <div className={`grid gap-4 ${data.aside ? "lg:grid-cols-3" : ""}`}>
        <form className={`space-y-4 ${data.aside ? "lg:col-span-2" : ""}`} onSubmit={e => { e.preventDefault(); submit(); }}>
          {data.sections.map(s => (
            <Card key={s.title} className="space-y-4">
              <div><h2 className="font-display text-base">{s.title}</h2>{s.description && <p className="text-xs ink-2 mt-0.5">{s.description}</p>}</div>
              <FieldGrid fields={s.fields} />
            </Card>
          ))}
          <div className="flex gap-2 justify-end">
            <button type="button" className="btn-ghost">Save draft</button>
            <SubmitButton state={state} label={data.submitLabel} onClick={submit} />
          </div>
        </form>
        {data.aside && (
          <Card className="h-fit lg:sticky lg:top-20 space-y-3">
            <SectionTitle eyebrow="Summary" title={data.aside.title} />
            <dl className="space-y-2">
              {data.aside.items.map(it => (
                <div key={it.label} className="flex justify-between gap-3 text-sm border-b border-[var(--line)] pb-2 last:border-0">
                  <dt className="ink-2">{it.label}</dt><dd className="font-medium text-right tabular">{it.value}</dd>
                </div>
              ))}
            </dl>
            {data.aside.note && <p className="text-xs ink-2 leading-relaxed">{data.aside.note}</p>}
          </Card>
        )}
      </div>
    </div>
  );
}

export function WizardScreen({ data, title }: P<"wizard">) {
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const last = step === data.steps.length - 1;
  const cur = data.steps[step];
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader title={title} subtitle={data.subtitle} />
      <ol className="flex items-center gap-2" aria-label="Progress">
        {data.steps.map((s, i) => (
          <li key={s.title} className="flex-1">
            <div className={`h-1.5 rounded-full transition-colors ${i <= step || finished ? "bg-accent" : "bg-[var(--line)]"}`} />
            <div className={`mt-2 text-[11px] font-medium truncate ${i === step && !finished ? "text-accent" : "ink-2"}`}>{i + 1}. {s.title}</div>
          </li>
        ))}
      </ol>
      {finished ? (
        <Card className="text-center py-12 space-y-3 animate-fadeUp">
          <CheckCircle2 size={44} className="mx-auto text-emerald-500" />
          <h2 className="font-display text-xl">{data.successTitle}</h2>
          <p className="text-sm ink-2 max-w-md mx-auto">{data.successBody}</p>
          <button className="btn-ghost mt-2" onClick={() => { setFinished(false); setStep(0); }}>Start another</button>
        </Card>
      ) : (
        <Card className="space-y-5 animate-fadeUp" key={step}>
          <div><div className="eyebrow">Step {step + 1} of {data.steps.length}</div><h2 className="font-display text-lg mt-1">{cur.title}</h2><p className="text-sm ink-2">{cur.description}</p></div>
          <FieldGrid fields={cur.fields} />
          <div className="flex justify-between pt-2">
            <button className="btn-ghost" disabled={step === 0} onClick={() => setStep(s => s - 1)}><ChevronLeft size={14} /> Back</button>
            <button className="btn-primary" onClick={() => last ? setFinished(true) : setStep(s => s + 1)}>{last ? data.finishLabel : <>Continue <ChevronRight size={14} /></>}</button>
          </div>
        </Card>
      )}
    </div>
  );
}

export function BookingScreen({ data, title }: P<"booking">) {
  const [res, setRes] = useState(0);
  const [date, setDate] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const { state, submit } = useFakeSubmit();
  const r = data.resources[res];
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <SectionTitle eyebrow="1 · Choose" title="Select an option" />
            <div className="grid sm:grid-cols-2 gap-3">
              {data.resources.map((x, i) => (
                <button key={x.name} onClick={() => setRes(i)} aria-pressed={res === i}
                  className={`text-left rounded-xl border p-3.5 flex gap-3 transition-all ${res === i ? "border-accent bg-accent/8 ring-2 ring-accent/30" : "border-[var(--line)] hover:border-accent/40"}`}>
                  <span className="text-2xl" aria-hidden="true">{x.emoji}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold">{x.name}</span>
                    <span className="block text-xs ink-2">{x.meta}</span>
                    <span className="flex flex-wrap gap-1 mt-1.5">{x.tags?.map(t => <Badge key={t} tone="gray">{t}</Badge>)}</span>
                  </span>
                  <span className="text-sm font-mono font-semibold">{x.price}</span>
                </button>
              ))}
            </div>
          </Card>
          <Card>
            <SectionTitle eyebrow="2 · When" title="Pick a date and time" />
            <div className="flex gap-2 overflow-x-auto pb-1">
              {data.dates.map((d, i) => (
                <button key={d} onClick={() => { setDate(i); setSlot(null); }} aria-pressed={date === i}
                  className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${date === i ? "bg-accent text-white border-accent" : "border-[var(--line)] hover:border-accent/40"}`}>{d}</button>
              ))}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
              {data.slots.map(s => {
                const off = data.unavailable?.includes(s) && date % 2 === 0;
                return (
                  <button key={s} disabled={off} onClick={() => setSlot(s)} aria-pressed={slot === s}
                    className={`rounded-lg border py-2 text-sm tabular transition-colors disabled:opacity-35 disabled:line-through ${slot === s ? "border-accent bg-accent/10 text-accent font-semibold" : "border-[var(--line)] hover:border-accent/40"}`}>{s}</button>
                );
              })}
            </div>
          </Card>
        </div>
        <Card className="h-fit lg:sticky lg:top-20 space-y-4">
          <SectionTitle eyebrow="3 · Confirm" title="Your booking" />
          <div className="flex items-center gap-3"><span className="text-3xl">{r.emoji}</span><div><div className="font-semibold text-sm">{r.name}</div><div className="text-xs ink-2">{data.dates[date]}{slot ? ` · ${slot}` : " · pick a time"}</div></div></div>
          <dl className="space-y-2 text-sm">
            {data.summary.map(s => <div key={s.label} className="flex justify-between"><dt className="ink-2">{s.label}</dt><dd className="font-medium tabular">{s.value}</dd></div>)}
          </dl>
          <button disabled={!slot || state === "loading"} onClick={submit} className="btn-primary w-full justify-center disabled:opacity-50">
            {state === "loading" ? <Loader2 size={14} className="animate-spin" /> : state === "done" ? <><Check size={14} /> Confirmed</> : data.confirmLabel}
          </button>
          {data.policy && <p className="text-[11px] ink-2 leading-relaxed">{data.policy}</p>}
        </Card>
      </div>
    </div>
  );
}

export function ChecklistScreen({ data, title }: P<"checklist">) {
  const [groups, setGroups] = useState(data.groups);
  const all = groups.flatMap(g => g.items);
  const done = all.filter(i => i.done).length;
  const toggle = (gi: number, ii: number) => setGroups(gs => gs.map((g, a) => a !== gi ? g : { ...g, items: g.items.map((it, b) => b !== ii ? it : { ...it, done: !it.done }) }));
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      <Card className="flex flex-wrap items-center gap-6">
        <div className="font-display text-4xl tabular">{Math.round((done / Math.max(1, all.length)) * 100)}%</div>
        <div className="flex-1 min-w-48 space-y-2">
          <Progress value={(done / Math.max(1, all.length)) * 100} tone={done === all.length ? "green" : "accent"} />
          <div className="text-xs ink-2">{done} of {all.length} complete · {all.filter(i => i.critical && !i.done).length} critical open{data.summary ? ` · ${data.summary}` : ""}</div>
        </div>
      </Card>
      <div className="grid lg:grid-cols-2 gap-4">
        {groups.map((g, gi) => (
          <Card key={g.title}>
            <SectionTitle title={g.title} right={<span className="text-xs ink-2 tabular">{g.items.filter(i => i.done).length}/{g.items.length}</span>} />
            <ul className="space-y-1">
              {g.items.map((it, ii) => (
                <li key={it.label}>
                  <label className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-accent/5 cursor-pointer">
                    <input type="checkbox" checked={it.done} onChange={() => toggle(gi, ii)} className="mt-0.5 h-4 w-4 accent-[rgb(var(--accent-rgb))]" />
                    <span className="flex-1 min-w-0">
                      <span className={`text-sm ${it.done ? "line-through ink-2" : ""}`}>{it.label}</span>
                      {(it.owner || it.due) && <span className="block text-[11px] ink-2">{[it.owner, it.due].filter(Boolean).join(" · ")}</span>}
                    </span>
                    {it.critical && !it.done && <Badge tone="red"><AlertTriangle size={10} /> Critical</Badge>}
                  </label>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function MatrixScreen({ data, title }: P<"matrix">) {
  const [vals, setVals] = useState(data.values);
  const { state, submit } = useFakeSubmit();
  const flip = (r: number, c: number) => setVals(v => v.map((row, ri) => ri !== r ? row : row.map((x, ci) => ci !== c ? x : !x)));
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} actions={<SubmitButton state={state} label={data.saveLabel ?? "Save changes"} onClick={submit} />} />
      <Card className="!p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr><th className="eyebrow text-left px-4 py-3">Rule</th>{data.cols.map(c => <th key={c} className="eyebrow px-3 py-3 text-center">{c}</th>)}</tr>
          </thead>
          <tbody>
            {data.rows.map((r, ri) => (
              <tr key={r.label} className="border-t border-[var(--line)]">
                <td className="px-4 py-3"><div className="font-medium">{r.label}</div>{r.description && <div className="text-[11px] ink-2">{r.description}</div>}</td>
                {data.cols.map((c, ci) => (
                  <td key={c} className="px-3 py-3"><div className="flex justify-center"><Toggle on={!!vals[ri]?.[ci]} onChange={() => flip(ri, ci)} label={`${r.label} — ${c}`} /></div></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {data.note && <p className="text-xs ink-2">{data.note}</p>}
    </div>
  );
}

export function ComparisonScreen({ data, title }: P<"comparison">) {
  const [pick, setPick] = useState(Math.max(0, data.options.findIndex(o => o.highlight)));
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      <Card className="!p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="w-48" />
              {data.options.map((o, i) => (
                <th key={o.name} className={`px-4 pt-5 pb-4 text-left align-top transition-colors ${i === pick ? "bg-accent/8" : ""}`}>
                  {o.badge && <Badge tone="violet">{o.badge}</Badge>}
                  <div className="font-display text-lg mt-1">{o.name}</div>
                  <div className="text-xs ink-2 font-normal">{o.tagline}</div>
                  {o.price && <div className="font-mono font-semibold mt-2">{o.price}</div>}
                  <button onClick={() => setPick(i)} aria-pressed={i === pick} className={`mt-3 w-full justify-center ${i === pick ? "btn-primary" : "btn-ghost"}`}>{i === pick ? "Selected" : data.cta ?? "Choose"}</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map(r => (
              <tr key={r.label} className="border-t border-[var(--line)]">
                <td className="px-4 py-3 ink-2 font-medium">{r.label}</td>
                {r.values.map((v, i) => (
                  <td key={i} className={`px-4 py-3 ${i === pick ? "bg-accent/8" : ""}`}>
                    {typeof v === "boolean" ? (v ? <Check size={16} className="text-emerald-600 dark:text-emerald-400" aria-label="Included" /> : <X size={16} className="ink-2 opacity-50" aria-label="Not included" />) : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
