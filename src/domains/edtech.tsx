// src/domains/edtech.tsx
import { useState } from "react";
import { HomePage, LoginPage, RegisterPage, ProfilePage, SettingsPage, FAQPage, SupportPage, DomainMeta } from "./pages";

const edtechMeta: DomainMeta = {
  id: "edtech",
  name: "LearnLab",
  tagline: "Adaptive learning management, live virtual classrooms, and real-time student analytics.",
  description: "Deliver engaging learning experiences at scale with LearnLab's AI-powered LMS.",
  accentLabel: "EdTech · LMS · Assessments",
  features: [
    { icon: "📚", title: "Adaptive LMS", body: "Personalized learning paths that adjust in real time based on student progress." },
    { icon: "🎓", title: "Live classrooms", body: "Breakout rooms, interactive whiteboards, and engagement tracking built in." },
    { icon: "📈", title: "Learning analytics", body: "Detailed dashboards for instructors, students, and parents with early-alert flags." },
  ],
  faqs: [
    { q: "What types of assessments can I create?", a: "Multiple choice, short answer, coding challenges, file upload assignments, and peer-reviewed submissions are all supported." },
    { q: "How does the virtual classroom work?", a: "Powered by WebRTC, it supports up to 500 attendees, breakout rooms, screen sharing, whiteboards, and auto-generated transcripts." },
    { q: "Can parents track their child's progress?", a: "Yes. The parent portal shows assignment status, grades, attendance, and teacher messages with optional email digest reports." },
    { q: "Is LearnLab FERPA compliant?", a: "Yes. Student data is protected under FERPA guidelines. We never sell or share PII and provide institutional data agreements." },
    { q: "Does LearnLab support SCORM content?", a: "Yes. Import SCORM 1.2 and 2004 packages. xAPI (Tin Can) is also supported for advanced learning analytics." },
    { q: "Can I white-label the platform?", a: "Enterprise plans include full white-labeling: custom domain, logo, colors, and email templates to match your brand." },
  ],
  supportEmail: "support@learnlab.io",
};

export function EdTechHome() { return <HomePage meta={edtechMeta} />; }
export function EdTechLogin() { return <LoginPage meta={edtechMeta} />; }
export function EdTechRegister() { return <RegisterPage meta={edtechMeta} />; }
export function EdTechProfile() { return <ProfilePage meta={edtechMeta} />; }
export function EdTechSettings() { return <SettingsPage meta={edtechMeta} />; }
export function EdTechFAQ() { return <FAQPage meta={edtechMeta} />; }
export function EdTechSupport() { return <SupportPage meta={edtechMeta} />; }
import { PlayCircle, CheckCircle2, XCircle, GraduationCap, Video, MicOff, Mic, Pencil } from "lucide-react";
import { Card, SectionTitle, Badge, Stat, Drawer, useFakeSubmit, Skeleton } from "../components/ui";
import { Radar, Sparkline, AreaChart } from "../components/charts";
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

// ─── Live Virtual Classroom & Co-learning Studio ──────────────────────────────

const classParticipants = [
  { name: "Priya N.", initials: "PN", muted: false, video: true, instructor: false },
  { name: "Omar H.", initials: "OH", muted: true, video: false, instructor: false },
  { name: "Yuki S.", initials: "YS", muted: false, video: true, instructor: false },
  { name: "Diego M.", initials: "DM", muted: true, video: true, instructor: false },
  { name: "Lena K.", initials: "LK", muted: false, video: false, instructor: false },
  { name: "Instructor", initials: "IN", muted: false, video: true, instructor: true },
];
const handQueue = ["Omar H.", "Diego M."];

export function VirtualClassroomScreen() {
  const [poll, setPoll] = useState<number | null>(null);
  const [handRaised, setHandRaised] = useState(false);
  const [muted, setMuted] = useState(true);

  return (
    <div className="grid gap-5 xl:grid-cols-4">
      <div className="xl:col-span-3 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {classParticipants.map(p => (
            <div key={p.name}
              className={`relative rounded-xl overflow-hidden flex items-center justify-center bg-obsidian-950 border border-[var(--line)] ${p.instructor ? "sm:col-span-2 ring-2 ring-accent" : ""}`}
              style={{ aspectRatio: "16/9" }}>
              {p.video && <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-violet-600/20" />}
              <div className={`rounded-full bg-accent/20 grid place-items-center font-display font-bold text-accent z-10 ${p.instructor ? "h-16 w-16 text-lg" : "h-10 w-10"}`}>{p.initials}</div>
              <div className="absolute bottom-0 inset-x-0 p-2 flex items-center justify-between">
                <span className="text-[11px] text-white font-medium truncate">{p.name}{p.instructor ? " (Instructor)" : ""}</span>
                <div className="flex items-center gap-1">
                  {p.muted && <MicOff size={11} className="text-rose-400" />}
                  {!p.video && <Video size={11} className="text-zinc-400 line-through" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Card>
          <SectionTitle eyebrow="Poll · live" title="How comfortable are you with React hooks so far?" right={<Badge tone="blue" pulse>Live</Badge>} />
          <div className="space-y-2 mt-1">
            {["Very comfortable — ready for advanced patterns", "Getting there — need a bit more practice", "Somewhat lost — would like a review", "Completely lost — need help"].map((opt, i) => (
              <button key={i} onClick={() => setPoll(i)}
                className={`w-full flex items-center gap-3 rounded-lg border p-3 text-sm text-left transition-colors ${poll === i ? "border-accent bg-accent/8 font-medium" : "border-[var(--line)] hover:border-accent/40"}`}>
                <span className={`h-4 w-4 rounded-full border-2 shrink-0 grid place-items-center transition-colors ${poll === i ? "border-accent bg-accent" : "border-[var(--line)]"}`}>
                  {poll === i && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                {opt}
              </button>
            ))}
          </div>
          {poll !== null && <p className="mt-3 text-xs ink-2 animate-fadeUp">Response recorded — results visible to instructor in real time.</p>}
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <SectionTitle eyebrow="Raise hand queue" title="Waiting" right={<Badge tone={handQueue.length > 0 ? "amber" : "gray"}>{handQueue.length}</Badge>} />
          <div className="space-y-2 mb-3">
            {handQueue.map(n => (
              <div key={n} className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-2.5 text-sm">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulseDot shrink-0" />
                {n}
              </div>
            ))}
          </div>
          <button onClick={() => setHandRaised(h => !h)}
            className={`w-full justify-center text-sm ${handRaised ? "btn-primary" : "btn-ghost"}`}>
            ✋ {handRaised ? "Lower hand" : "Raise hand"}
          </button>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="eyebrow mb-0.5">Whiteboard</div>
              <div className="font-display font-semibold text-base">Shared canvas</div>
            </div>
            <Badge tone="green" pulse>Live</Badge>
          </div>
          <div className="rounded-lg bg-white dark:bg-obsidian-950 border border-[var(--line)] flex items-center justify-center" style={{ aspectRatio: "1" }}>
            <div className="text-center ink-2">
              <Pencil size={28} className="mx-auto mb-2 opacity-30" />
              <p className="text-xs">Instructor is drawing…</p>
            </div>
          </div>
          <div className="mt-2 flex gap-1.5 flex-wrap">
            {["✏️ Draw", "▭ Shape", "↗ Line", "🗑️ Erase"].map(t => (
              <button key={t} className="btn-ghost !py-1 !px-2 text-xs">{t}</button>
            ))}
          </div>
        </Card>

        <div className="flex items-center gap-2">
          <button onClick={() => setMuted(m => !m)} className={`flex-1 justify-center ${muted ? "btn-ghost" : "btn-primary"}`}>
            {muted ? <MicOff size={14} /> : <Mic size={14} />}
            {muted ? "Unmute" : "Mute"}
          </button>
          <button className="btn-ghost !p-2"><Video size={15} /></button>
        </div>

        <AIPanel context="Live classroom, React Hooks module" insights={[
          { title: "62% struggling", body: "Poll shows the majority need a hooks review. Recommend pausing for a 5-minute worked example before continuing.", tone: "amber", tag: "Engagement", confidence: 95 },
        ]} />
      </div>
    </div>
  );
}

// ─── Instructor Grading Matrix & Rubric Editor ────────────────────────────────

type Submission = { id: string; student: string; title: string; wordCount: number; submitted: string };
const submissions: Submission[] = [
  { id: "SUB-881", student: "Priya N.", title: "State management essay", wordCount: 1240, submitted: "Jun 10" },
  { id: "SUB-879", student: "Omar H.", title: "Component lifecycle analysis", wordCount: 980, submitted: "Jun 10" },
  { id: "SUB-877", student: "Yuki S.", title: "React performance deep-dive", wordCount: 1540, submitted: "Jun 9" },
];
const rubric = [
  { criterion: "Technical accuracy", max: 30 },
  { criterion: "Clarity of explanation", max: 25 },
  { criterion: "Code examples quality", max: 20 },
  { criterion: "Structure & flow", max: 15 },
  { criterion: "Originality", max: 10 },
];

export function GradingMatrixScreen() {
  const [activeSub, setActiveSub] = useState(submissions[0]);
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(rubric.map(r => [r.criterion, Math.round(r.max * 0.82)]))
  );
  const [recording, setRecording] = useState(false);
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const { state, submit, reset } = useFakeSubmit(900);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-4">
        <Card>
          <SectionTitle eyebrow="Submissions" title="Assignment queue" right={<Badge tone="amber">{submissions.length} to grade</Badge>} />
          <div className="space-y-2">
            {submissions.map(s => (
              <button key={s.id} onClick={() => { setActiveSub(s); reset(); setScores(Object.fromEntries(rubric.map(r => [r.criterion, Math.round(r.max * (0.72 + Math.random() * 0.22))]))); }}
                className={`w-full flex items-center justify-between rounded-lg border p-3 text-left transition-colors ${activeSub.id === s.id ? "border-accent/60 bg-accent/5" : "border-[var(--line)] hover:border-accent/40"}`}>
                <div>
                  <div className="text-sm font-medium">{s.student}</div>
                  <div className="text-xs ink-2">{s.title} · {s.wordCount} words</div>
                </div>
                <span className="text-xs ink-2">{s.submitted}</span>
              </button>
            ))}
          </div>
        </Card>
        <Card className="!p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--line)]">
            <div className="eyebrow mb-0.5">Submission</div>
            <div className="font-display font-semibold">{activeSub.student} — {activeSub.title}</div>
          </div>
          <div className="p-5 max-h-64 overflow-y-auto text-sm ink-2 leading-relaxed space-y-3">
            <p>In React, state management is a fundamental concept that determines how components share and update data. The <code className="font-mono text-accent bg-accent/8 px-1 rounded text-xs">useState</code> hook provides a simple API for local component state, while <code className="font-mono text-accent bg-accent/8 px-1 rounded text-xs">useReducer</code> offers more predictable state transitions for complex logic.</p>
            <p>When considering global state, the Context API eliminates prop drilling by providing a way to pass data through the component tree. However, for performance-critical applications, external stores like Zustand or Redux Toolkit offer optimized subscription patterns that avoid unnecessary re-renders.</p>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <SectionTitle eyebrow="Rubric" title="Criterion scores" right={
            <div className="flex items-center gap-2">
              <span className={`font-display text-xl font-bold ${total >= 85 ? "text-emerald-600 dark:text-emerald-400" : total >= 70 ? "text-amber-600 dark:text-amber-400" : "text-rose-500"}`}>{total}/100</span>
              <Badge tone={total >= 85 ? "green" : total >= 70 ? "amber" : "red"}>{total >= 85 ? "A" : total >= 70 ? "B" : "C"}</Badge>
            </div>
          } />
          {state === "done" ? (
            <div className="text-center py-8 animate-fadeUp">
              <CheckCircle2 className="mx-auto text-emerald-500" size={36} />
              <div className="font-display font-semibold mt-2">Grade submitted</div>
              <p className="text-sm ink-2 mt-1">{activeSub.student} will be notified with score and feedback.</p>
              <button className="btn-ghost mt-4 text-xs" onClick={reset}>Grade next submission</button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {rubric.map(r => (
                  <div key={r.criterion}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-medium">{r.criterion}</span>
                      <span className="font-mono ink-2">{scores[r.criterion] ?? 0} / {r.max}</span>
                    </div>
                    <input type="range" min={0} max={r.max} value={scores[r.criterion] ?? 0}
                      onChange={e => setScores(s => ({ ...s, [r.criterion]: Number(e.target.value) }))}
                      className="w-full accent-accent cursor-pointer" />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <button onClick={() => setRecording(r => !r)}
                  className={`btn-ghost !py-1.5 text-xs flex-1 justify-center ${recording ? "border-rose-500/40 text-rose-600 dark:text-rose-400" : ""}`}>
                  {recording ? <><MicOff size={13} /> Stop recording</> : <><Mic size={13} /> Record feedback</>}
                </button>
                <button className="btn-primary !py-1.5 text-xs flex-1 justify-center" onClick={submit}>Submit grade</button>
              </div>
              {recording && (
                <div className="mt-2 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 animate-fadeUp">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulseDot" />Recording audio feedback…
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── Parent / Guardian Progress Portal ───────────────────────────────────────

const subjectGrades = [
  { subject: "Mathematics", grades: [72, 75, 78, 80, 83, 85], current: 85 },
  { subject: "Science", grades: [68, 70, 74, 77, 79, 82], current: 82 },
  { subject: "English", grades: [88, 85, 87, 90, 88, 92], current: 92 },
  { subject: "History", grades: [65, 68, 70, 72, 74, 76], current: 76 },
];
const attendanceMonths = [14, 14, 12, 14, 13, 14];
const behaviorTags = [
  { label: "Attentive in class", tone: "green" as const },
  { label: "Participates well", tone: "green" as const },
  { label: "Late submission ×2", tone: "amber" as const },
  { label: "Absent Jun 6", tone: "amber" as const },
  { label: "Excellent quiz score", tone: "green" as const },
];
const teacherMessages = [
  { from: "Dr. E. Park", role: "Math teacher", time: "Jun 10, 14:30", msg: "Priya has shown great improvement on algebra. Keep encouraging daily practice at home!", read: true },
  { from: "K. Chen", role: "Science teacher", time: "Jun 9, 09:15", msg: "Just a reminder that the science project submission is due this Friday.", read: false },
];

export function ParentPortalScreen() {
  const [replyOpen, setReplyOpen] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState<(typeof teacherMessages)[0] | null>(null);
  const { state, submit, reset } = useFakeSubmit(800);

  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Overall average" value="83.8%" delta="+4.2% this term" deltaTone="green" />
          <Stat label="Attendance" value="96.4%" delta="1 absence this term" deltaTone="green" />
          <Stat label="Pending work" value="2" delta="Due this week" deltaTone="amber" />
        </div>
        <Card>
          <SectionTitle eyebrow="Grades" title="Subject performance · 6 months" />
          <div className="space-y-4">
            {subjectGrades.map(g => (
              <div key={g.subject}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium">{g.subject}</span>
                  <div className="flex items-center gap-2">
                    <Sparkline data={g.grades} color={g.current >= 85 ? "#10b981" : g.current >= 75 ? "#4f6df5" : "#f59e0b"} />
                    <Badge tone={g.current >= 85 ? "green" : g.current >= 75 ? "blue" : "amber"}>{g.current}%</Badge>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${g.current}%`, background: g.current >= 85 ? "#10b981" : g.current >= 75 ? "#4f6df5" : "#f59e0b" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Attendance" title="Monthly present days" right={<Badge tone="green">96.4% rate</Badge>} />
          <div className="flex items-end gap-3 mt-2">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-xs ink-2 font-mono">{attendanceMonths[i]}</span>
                <div className="w-full rounded-t-md transition-all"
                  style={{ height: `${(attendanceMonths[i] / 14) * 72}px`, background: attendanceMonths[i] >= 14 ? "#10b981" : attendanceMonths[i] >= 12 ? "#4f6df5" : "#f59e0b" }} />
                <span className="text-[10px] ink-2">{m}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-5">
        <Card>
          <SectionTitle eyebrow="Behavior" title="Teacher notes" />
          <div className="flex flex-wrap gap-1.5">
            {behaviorTags.map(t => <Badge key={t.label} tone={t.tone}>{t.label}</Badge>)}
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Messages" title="Teacher inbox" right={<Badge tone="violet">1 unread</Badge>} />
          <div className="space-y-2">
            {teacherMessages.map(m => (
              <button key={m.from + m.time} onClick={() => { setSelectedMsg(m); setReplyOpen(true); reset(); }}
                className={`w-full text-left rounded-lg border p-3 transition-colors hover:border-accent/40 ${!m.read ? "border-accent/40 bg-accent/5" : "border-[var(--line)]"}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium">{m.from}</div>
                  <div className="text-[10px] ink-2">{m.time}</div>
                </div>
                <div className="text-xs ink-2 line-clamp-2">{m.msg}</div>
              </button>
            ))}
          </div>
        </Card>
        <AIPanel context="Student progress & attendance, Jun 2026" insights={[
          { title: "Math trending up", body: "Consistent improvement across 6 months in Mathematics. Algebra is a newfound strength — consider enrichment programs.", tone: "green", tag: "Progress", confidence: 91 },
          { title: "History needs attention", body: "History has been below 80% all term. A tutoring session before the year-end exam would materially improve the final grade.", tone: "amber", tag: "Intervention", confidence: 84 },
        ]} />
      </div>

      <Drawer open={replyOpen} onClose={() => setReplyOpen(false)} title="Reply to teacher">
        {selectedMsg && (
          <div className="space-y-4">
            <div>
              <div className="font-semibold text-sm">{selectedMsg.from}</div>
              <div className="text-xs ink-2">{selectedMsg.role} · {selectedMsg.time}</div>
            </div>
            <div className="rounded-lg border border-[var(--line)] p-3 text-sm ink-2">{selectedMsg.msg}</div>
            {state === "done" ? (
              <div className="text-center py-6 animate-fadeUp">
                <CheckCircle2 className="mx-auto text-emerald-500" size={32} />
                <div className="text-sm font-medium mt-2">Reply sent</div>
                <button className="btn-ghost mt-3 text-xs" onClick={reset}>Send another</button>
              </div>
            ) : (
              <>
                <textarea className="field min-h-28 w-full" placeholder="Write your reply…" />
                <button className="btn-primary w-full justify-center" onClick={submit} disabled={state === "loading"}>
                  {state === "loading" ? "Sending…" : "Send reply"}
                </button>
              </>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
