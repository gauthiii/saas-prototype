// src/domains/edtech.tsx
import { useState } from "react";
import { PlayCircle, CheckCircle2, XCircle, GraduationCap } from "lucide-react";
import { Card, SectionTitle, Badge } from "../components/ui";
import { Radar } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

const insights: Insight[] = [
  { title: "Concept gap detected", body: "Quiz telemetry shows 62% of learners miss questions on closures specifically. Recommend inserting a 6-minute remedial module after Lesson 4.", tone: "amber", tag: "Curriculum", confidence: 88 },
  { title: "Top performer cohort", body: "12 students completed the React track 40% faster than median with >90% scores. Eligible for the advanced governance elective.", tone: "green", tag: "Cohort", confidence: 93 },
  { title: "Engagement dip on Fridays", body: "Session length drops 31% on Fridays. Shorter micro-lessons scheduled then could recover ~2 hours of weekly learning time.", tone: "blue", tag: "Engagement", confidence: 69 },
];

const curriculum = [
  { module: "1 · TypeScript foundations", lessons: 8, done: 8 },
  { module: "2 · React component model", lessons: 10, done: 10 },
  { module: "3 · State & data flow", lessons: 9, done: 6 },
  { module: "4 · Advanced patterns", lessons: 7, done: 1 },
  { module: "5 · Capstone project", lessons: 4, done: 0 },
];

export function LMSDashboard() {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <Card className="!p-0 overflow-hidden">
          <div className="aspect-video bg-obsidian-950 grid place-items-center relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 via-transparent to-violet-500/25" />
            <PlayCircle size={56} className="text-white/90 relative transition-transform duration-200 group-hover:scale-110" />
            <div className="absolute bottom-0 inset-x-0 p-4 text-white">
              <div className="text-xs opacity-80 font-mono">Module 3 · Lesson 7 · 12:40</div>
              <div className="font-display font-semibold">Lifting state without prop-drilling pain</div>
              <div className="mt-2 h-1 rounded-full bg-white/25"><div className="h-full w-2/3 rounded-full bg-accent" /></div>
            </div>
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Course" title="Curriculum progress map" right={<GraduationCap size={16} className="text-accent" />} />
          <div className="space-y-3">
            {curriculum.map(m => {
              const pct = Math.round((m.done / m.lessons) * 100);
              return (
                <div key={m.module} className="rounded-lg border border-[var(--line)] p-3.5 hover:border-accent/40 transition-colors">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{m.module}</span>
                    <span className="text-xs ink-2 font-mono">{m.done}/{m.lessons} lessons</span>
                  </div>
                  <div className="mt-2.5 h-2 rounded-full bg-[var(--line)] overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${pct === 100 ? "bg-emerald-500" : "bg-accent"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Skills" title="Performance radar" />
          <div className="grid place-items-center"><Radar axes={["TS", "React", "State", "Testing", "A11y", "Perf"]} values={[92, 88, 71, 58, 64, 76]} /></div>
          <p className="text-xs ink-2 text-center mt-1">Testing and accessibility are the next growth edges.</p>
        </Card>
        <AIPanel context="React track · 248 active learners" insights={insights} />
      </div>
    </div>
  );
}

const quiz = {
  q: "A component re-renders unexpectedly when its parent updates. Which change most directly prevents wasted renders?",
  options: [
    "Move the component's JSX into a useEffect",
    "Memoize the component and stabilize its props",
    "Replace useState with a global variable",
    "Force a key change on every render",
  ],
  answer: 1,
  why: "React.memo skips re-rendering when props are referentially equal — paired with useCallback/useMemo for stable props, it directly removes the wasted work.",
};

export function QuizScreen() {
  const [picked, setPicked] = useState<number | null>(null);
  const revealed = picked !== null;
  return (
    <Card className="max-w-2xl mx-auto">
      <SectionTitle eyebrow="Assessment · Module 3" title="Checkpoint quiz" right={<Badge tone="blue">Question 4 of 10</Badge>} />
      <p className="text-sm font-medium leading-relaxed">{quiz.q}</p>
      <div className="mt-4 space-y-2.5">
        {quiz.options.map((opt, i) => {
          const correct = revealed && i === quiz.answer;
          const wrong = revealed && picked === i && i !== quiz.answer;
          return (
            <button key={opt} disabled={revealed} onClick={() => setPicked(i)}
              className={`w-full flex items-center justify-between gap-3 rounded-lg border p-3.5 text-left text-sm transition-all duration-200
                ${correct ? "border-emerald-500/60 bg-emerald-500/10" : wrong ? "border-rose-500/60 bg-rose-500/10" : "border-[var(--line)] hover:border-accent/50 hover:bg-accent/5"}`}>
              <span>{opt}</span>
              {correct && <CheckCircle2 size={17} className="text-emerald-500 shrink-0" />}
              {wrong && <XCircle size={17} className="text-rose-500 shrink-0" />}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="mt-4 rounded-lg border border-accent/30 bg-accent/8 p-4 text-sm animate-fadeUp">
          <div className="font-semibold mb-1">{picked === quiz.answer ? "Correct — nicely reasoned." : "Not quite — here's the idea:"}</div>
          <p className="ink-2 leading-relaxed">{quiz.why}</p>
          <div className="mt-3 flex justify-end"><button className="btn-primary !py-1.5 text-xs" onClick={() => setPicked(null)}>Next question</button></div>
        </div>
      )}
    </Card>
  );
}
