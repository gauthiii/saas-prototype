// src/kit/archetypes-content.tsx — content archetypes: catalog, detail, media, chat.
import { useMemo, useState } from "react";
import { Search, Play, Send, Paperclip, Phone, MoreHorizontal, FileText, Download, Heart } from "lucide-react";
import { Badge, Card, SectionTitle } from "../components/ui";
import type { ScreenData } from "../industries/types";
import { Avatar, PageHeader, Progress } from "./primitives";

type P<K extends keyof ScreenData> = { data: ScreenData[K]; title: string };

export function CatalogScreen({ data, title }: P<"catalog">) {
  const [q, setQ] = useState("");
  const [f, setF] = useState("All");
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const items = useMemo(() => data.items.filter(i =>
    (f === "All" || i.category === f || i.badge === f) && (i.name + i.subtitle).toLowerCase().includes(q.toLowerCase())
  ), [data.items, q, f]);
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} actions={data.primaryAction && <button className="btn-primary">{data.primaryAction}</button>} />
      <div className="flex flex-wrap items-center gap-3">
        <label className="field !py-2 flex items-center gap-2 max-w-sm">
          <Search size={14} className="ink-2" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${title.toLowerCase()}…`} aria-label="Search" className="bg-transparent outline-none w-full text-sm" />
        </label>
        {data.filters && (
          <div className="flex flex-wrap gap-1.5">
            {["All", ...data.filters].map(o => (
              <button key={o} onClick={() => setF(o)} aria-pressed={f === o}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${f === o ? "bg-accent text-white border-accent" : "border-[var(--line)] ink-2"}`}>{o}</button>
            ))}
          </div>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map(it => (
          <Card key={it.name} className="!p-0 overflow-hidden card-hover group">
            <div className="relative aspect-[4/3] grid place-items-center bg-gradient-to-br from-accent/12 via-grad/8 to-transparent">
              <span className="text-5xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{it.emoji}</span>
              {it.badge && <span className="absolute left-3 top-3"><Badge tone={it.tone ?? "blue"}>{it.badge}</Badge></span>}
              <button onClick={() => setSaved(s => ({ ...s, [it.name]: !s[it.name] }))} aria-pressed={!!saved[it.name]} aria-label={`Save ${it.name}`}
                className="absolute right-3 top-3 grid place-items-center h-8 w-8 rounded-full surface">
                <Heart size={14} className={saved[it.name] ? "fill-rose-500 text-rose-500" : "ink-2"} />
              </button>
            </div>
            <div className="p-4 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-semibold leading-snug">{it.name}</div>
                {it.price && <div className="text-sm font-mono font-semibold whitespace-nowrap">{it.price}</div>}
              </div>
              <div className="text-xs ink-2">{it.subtitle}</div>
              {it.meta && <div className="text-[11px] ink-2">{it.meta}</div>}
              {it.stock !== undefined && <div className="pt-1.5"><Progress value={it.stock} tone={it.stock < 20 ? "red" : it.stock < 50 ? "amber" : "green"} /></div>}
            </div>
          </Card>
        ))}
      </div>
      {items.length === 0 && <Card className="text-center py-10 text-sm ink-2">Nothing matches “{q}”. Try a different search or filter.</Card>}
    </div>
  );
}

export function DetailScreen({ data, title }: P<"detail">) {
  const [tab, setTab] = useState<"Overview" | "Activity" | "Documents">("Overview");
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      <Card className="flex flex-wrap items-center gap-5">
        <Avatar value={data.avatar} size={64} />
        <div className="flex-1 min-w-48">
          <div className="flex flex-wrap items-center gap-2"><h2 className="font-display text-xl">{data.name}</h2><Badge tone={data.tone}>{data.status}</Badge></div>
          <div className="text-sm ink-2">{data.headline}</div>
        </div>
        <div className="flex gap-2">{(data.actions ?? ["Edit", "Share"]).map((a, i) => <button key={a} className={i === 0 ? "btn-primary" : "btn-ghost"}>{a}</button>)}</div>
      </Card>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="h-fit">
          <SectionTitle eyebrow="Record" title="Key details" />
          <dl className="space-y-2.5">
            {data.fields.map(f => (
              <div key={f.label} className="flex justify-between gap-3 text-sm border-b border-[var(--line)] pb-2.5 last:border-0">
                <dt className="ink-2">{f.label}</dt><dd className="font-medium text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card className="lg:col-span-2">
          <div className="flex gap-1 border-b border-[var(--line)] -mx-5 px-5 mb-5" role="tablist">
            {(["Overview", "Activity", "Documents"] as const).map(t => (
              <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                className={`px-3 pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t ? "border-accent text-accent" : "border-transparent ink-2"}`}>{t}</button>
            ))}
          </div>
          <div className="animate-fadeUp" key={tab}>
            {tab === "Overview" && (
              <div className="space-y-5">
                {data.overview.map(o => <section key={o.title}><h3 className="text-sm font-semibold mb-1">{o.title}</h3><p className="text-sm ink-2 leading-relaxed">{o.body}</p></section>)}
              </div>
            )}
            {tab === "Activity" && (
              <ol className="space-y-3">
                {data.activity.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm"><span className="h-2 w-2 rounded-full bg-accent mt-1.5 shrink-0" /><span className="flex-1">{a.text}</span><span className="text-[11px] ink-2 whitespace-nowrap">{a.time}</span></li>
                ))}
              </ol>
            )}
            {tab === "Documents" && (
              <ul className="space-y-2">
                {data.documents.map(d => (
                  <li key={d.name} className="flex items-center gap-3 rounded-lg border border-[var(--line)] px-3 py-2.5">
                    <FileText size={16} className="text-accent" />
                    <span className="flex-1 min-w-0"><span className="block text-sm font-medium truncate">{d.name}</span><span className="block text-[11px] ink-2">{d.meta}</span></span>
                    <button className="btn-ghost !p-1.5" aria-label={`Download ${d.name}`}><Download size={14} /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function MediaScreen({ data, title }: P<"media">) {
  const [playing, setPlaying] = useState(false);
  const f = data.featured;
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      <Card className="!p-0 overflow-hidden">
        <div className="relative grid md:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-video bg-gradient-to-br from-accent via-grad to-accent-dark grid place-items-center text-white">
            <span className="text-7xl drop-shadow-lg" aria-hidden="true">{f.emoji}</span>
            <button onClick={() => setPlaying(p => !p)} className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 text-black px-4 py-2 text-sm font-semibold hover:bg-white transition-colors">
              <Play size={14} className={playing ? "fill-black" : ""} /> {playing ? "Playing" : "Play"}
            </button>
            <span className="absolute bottom-4 right-4 text-xs font-mono bg-black/50 rounded px-2 py-1">{f.duration}</span>
          </div>
          <div className="p-6 flex flex-col justify-center gap-3">
            <Badge tone="violet">Featured</Badge>
            <h2 className="font-display text-2xl">{f.title}</h2>
            <p className="text-sm ink-2">{f.subtitle}</p>
            {f.progress !== undefined && <div className="space-y-1"><Progress value={f.progress} /><div className="text-[11px] ink-2">{f.progress}% complete</div></div>}
          </div>
        </div>
      </Card>
      {data.rails.map(r => (
        <section key={r.title}>
          <h2 className="font-display text-base mb-3">{r.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
            {r.items.map(it => (
              <Card key={it.title} className="!p-0 w-56 shrink-0 overflow-hidden card-hover snap-start group">
                <div className="relative aspect-video grid place-items-center bg-gradient-to-br from-accent/15 to-grad/15">
                  <span className="text-4xl transition-transform group-hover:scale-110" aria-hidden="true">{it.emoji}</span>
                  {it.duration && <span className="absolute bottom-2 right-2 text-[10px] font-mono surface rounded px-1.5 py-0.5">{it.duration}</span>}
                  {it.badge && <span className="absolute top-2 left-2"><Badge tone="blue">{it.badge}</Badge></span>}
                </div>
                <div className="p-3"><div className="text-sm font-semibold truncate">{it.title}</div><div className="text-[11px] ink-2 truncate">{it.meta}</div></div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ChatScreen({ data, title }: P<"chat">) {
  const [active, setActive] = useState(0);
  const [msgs, setMsgs] = useState(data.messages);
  const [draft, setDraft] = useState("");
  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { from: "me", text, time: "now" }]);
    setDraft("");
  };
  const t = data.threads[active];
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={data.subtitle} />
      <Card className="!p-0 overflow-hidden grid md:grid-cols-[17rem_1fr] lg:grid-cols-[17rem_1fr_15rem] h-[34rem]">
        <ul className="border-r border-[var(--line)] overflow-y-auto hidden md:block">
          {data.threads.map((th, i) => (
            <li key={th.name}>
              <button onClick={() => setActive(i)} className={`w-full flex gap-3 px-4 py-3 text-left border-b border-[var(--line)] transition-colors ${i === active ? "bg-accent/8" : "hover:bg-accent/5"}`}>
                <Avatar value={th.avatar} size={36} />
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2"><span className="text-sm font-semibold truncate">{th.name}</span><span className="ml-auto text-[10px] ink-2 shrink-0">{th.time}</span></span>
                  <span className="block text-xs ink-2 truncate">{th.preview}</span>
                  {th.tag && <span className="mt-1 inline-block"><Badge tone="gray">{th.tag}</Badge></span>}
                </span>
                {th.unread ? <span className="h-5 min-w-5 px-1 rounded-full bg-accent text-white text-[10px] font-bold grid place-items-center">{th.unread}</span> : null}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--line)]">
            <Avatar value={t?.avatar ?? "?"} size={32} />
            <div className="flex-1 min-w-0"><div className="text-sm font-semibold truncate">{t?.name}</div><div className="text-[11px] text-emerald-600 dark:text-emerald-400">Online</div></div>
            <button className="btn-ghost !p-2" aria-label="Call"><Phone size={14} /></button>
            <button className="btn-ghost !p-2" aria-label="More"><MoreHorizontal size={14} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
                <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm animate-fadeUp ${m.from === "me" ? "bg-accent text-white rounded-br-md" : "surface-2 rounded-bl-md"}`}>
                  {m.text}<div className={`text-[10px] mt-0.5 ${m.from === "me" ? "text-white/75" : "ink-2"}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          {data.quickReplies && (
            <div className="flex gap-2 px-4 pb-2 overflow-x-auto">
              {data.quickReplies.map(q => <button key={q} onClick={() => send(q)} className="shrink-0 rounded-full border border-[var(--line)] px-3 py-1 text-xs hover:border-accent/40">{q}</button>)}
            </div>
          )}
          <form className="flex items-center gap-2 p-3 border-t border-[var(--line)]" onSubmit={e => { e.preventDefault(); send(draft); }}>
            <button type="button" className="btn-ghost !p-2" aria-label="Attach file"><Paperclip size={14} /></button>
            <input value={draft} onChange={e => setDraft(e.target.value)} className="field" placeholder="Write a message…" aria-label="Message" />
            <button className="btn-primary !p-2.5" aria-label="Send"><Send size={14} /></button>
          </form>
        </div>
        {data.context && (
          <aside className="border-l border-[var(--line)] p-4 hidden lg:block overflow-y-auto">
            <div className="eyebrow mb-3">{data.context.title}</div>
            <dl className="space-y-3">
              {data.context.fields.map(f => <div key={f.label}><dt className="text-[11px] ink-2">{f.label}</dt><dd className="text-sm font-medium">{f.value}</dd></div>)}
            </dl>
          </aside>
        )}
      </Card>
    </div>
  );
}
