// src/domains/hrtech.tsx
import { useState } from "react";
import { Users, Star, CheckCircle2, FileText } from "lucide-react";
import { Card, SectionTitle, Badge, Drawer, useFakeSubmit, Skeleton, Tone } from "../components/ui";
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
                  <span className={`text-xs font-mono font-bold ${c.score >= 90 ? "text-emerald-500" : c.score >= 80 ? "text-accent" : "ink-2"}`}>{c.score}</span>
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
