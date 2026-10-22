// src/domains/pages.tsx — shared page templates (Home, Auth, Profile, Settings, FAQ, Support)
import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Bell, Palette, Shield, ChevronDown, ChevronRight, Send, CheckCircle2, Eye, EyeOff, Star, Activity, Search } from "lucide-react";
import { Card, SectionTitle, Badge, Toggle } from "../components/ui";
import { useDesign } from "../design/design";

export type DomainStat = { value: string; label: string };
export type DomainTestimonial = { quote: string; author: string; role: string };

export type DomainMeta = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accentLabel: string;
  features: { icon: string; title: string; body: string }[];
  faqs: { q: string; a: string }[];
  supportEmail: string;
};

// ─── Home / Landing ──────────────────────────────────────────────────────────
// `stats` / `testimonial` are domain-specific (passed from each domain's `extra`).
// Falls back to honest, non-fabricated copy when a domain hasn't supplied them.
/** Mini product mockup for the split hero — built from the domain's own features and stats. */
function HeroMockup({ meta, stats }: { meta: DomainMeta; stats?: DomainStat[] }) {
  const bars = [42, 58, 49, 71, 63, 84, 76, 92];
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/25 to-grad/25 blur-2xl" aria-hidden="true" />
      <Card className="relative !p-0 overflow-hidden shadow-lift">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--line)]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[10px] font-mono ink-2">app.{meta.name.toLowerCase().replace(/\s+/g, "")}.com</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {(stats ?? []).slice(0, 3).map(st => (
              <div key={st.label} className="rounded-lg border border-[var(--line)] p-2">
                <div className="text-[9px] ink-2 truncate">{st.label}</div>
                <div className="font-display text-sm font-bold">{st.value}</div>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-1.5 h-24 rounded-lg border border-[var(--line)] p-2" aria-hidden="true">
            {bars.map((h, i) => <div key={i} className={`flex-1 rounded-sm ${i === bars.length - 1 ? "bg-accent" : "bg-accent/30"}`} style={{ height: `${h}%` }} />)}
          </div>
          {meta.features.slice(0, 2).map(f => (
            <div key={f.title} className="flex items-center gap-2.5 rounded-lg border border-[var(--line)] p-2">
              <span className="text-lg" role="img" aria-label={f.title}>{f.icon}</span>
              <span className="text-xs font-medium truncate">{f.title}</span>
              <span className="ml-auto h-1.5 w-10 rounded-full bg-emerald-500/60" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function HeroCtas({ center }: { center?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 pt-2 ${center ? "justify-center" : ""}`}>
      <button className="btn-primary px-6 py-2.5 text-sm">Get started free</button>
      <button className="btn-ghost px-6 py-2.5 text-sm">Watch demo →</button>
    </div>
  );
}

export function HomePage({ meta, stats, testimonial }: { meta: DomainMeta; stats?: DomainStat[]; testimonial?: DomainTestimonial }) {
  const { hero } = useDesign();
  if (hero === "split") {
    return (
      <div className="max-w-6xl mx-auto space-y-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center py-6">
          <div className="space-y-5">
            <Badge tone="blue">{meta.accentLabel}</Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">{meta.tagline}</h1>
            <p className="text-base ink-2 max-w-lg leading-relaxed">{meta.description}</p>
            <HeroCtas />
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 pt-1 text-xs ink-2">
              {meta.features.map(f => <li key={f.title} className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-accent" /> {f.title}</li>)}
            </ul>
          </div>
          <HeroMockup meta={meta} stats={stats} />
        </div>
        {testimonial && <HomeTestimonial testimonial={testimonial} />}
      </div>
    );
  }
  if (hero === "bento") {
    return (
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid md:grid-cols-4 md:auto-rows-[11rem] gap-4">
          <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-end gap-4 bg-gradient-to-br from-accent to-grad text-white border-0">
            <span className="text-xs uppercase tracking-widest opacity-80">{meta.accentLabel}</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">{meta.name}</h1>
            <p className="text-sm opacity-90 max-w-md">{meta.tagline}</p>
            <div className="flex gap-2"><button className="bg-white text-accent font-semibold text-sm px-5 py-2.5 rounded-xl">Get started free</button><button className="border border-white/50 text-sm px-5 py-2.5 rounded-xl">Watch demo →</button></div>
          </Card>
          {meta.features.map((f, i) => (
            <Card key={f.title} className={`flex flex-col justify-between card-hover ${i === 0 ? "md:col-span-2" : ""}`}>
              <span className="text-3xl" role="img" aria-label={f.title}>{f.icon}</span>
              <div><div className="font-semibold text-sm">{f.title}</div><div className="text-xs ink-2 leading-relaxed mt-1">{f.body}</div></div>
            </Card>
          ))}
          {(stats ?? []).slice(0, 3).map(st => (
            <Card key={st.label} className="flex flex-col justify-end">
              <div className="font-display text-3xl font-bold text-accent">{st.value}</div>
              <div className="text-xs ink-2 mt-1">{st.label}</div>
            </Card>
          ))}
        </div>
        {testimonial && <HomeTestimonial testimonial={testimonial} />}
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <Badge tone="blue">{meta.accentLabel}</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">{meta.name}</h1>
        <p className="text-lg ink-2 max-w-xl mx-auto leading-relaxed">{meta.tagline}</p>
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button className="btn-primary px-6 py-2.5 text-sm">Get started free</button>
          <button className="btn-ghost px-6 py-2.5 text-sm">Watch demo →</button>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs ink-2 pt-1">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="ml-1">Loved by teams · no credit card required</span>
        </div>
      </div>

      {/* Features grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        {meta.features.map((f, i) => (
          <Card key={i} className="space-y-2 card-hover">
            <div className="grid place-items-center h-11 w-11 rounded-xl bg-accent/10 text-2xl" role="img" aria-label={f.title}>{f.icon}</div>
            <div className="font-semibold text-sm pt-1">{f.title}</div>
            <div className="text-xs ink-2 leading-relaxed">{f.body}</div>
          </Card>
        ))}
      </div>

      {/* Social proof — domain-specific metrics */}
      {stats && stats.length > 0 && (
        <Card className="bg-gradient-to-br from-accent/5 to-grad/5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-display text-2xl sm:text-3xl font-bold text-accent">{s.value}</div>
                <div className="text-xs ink-2 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Testimonial — domain-specific */}
      {testimonial && <HomeTestimonial testimonial={testimonial} />}

      {/* CTA */}
      <Card className="bg-gradient-to-br from-accent to-grad text-white border-0 text-center space-y-3 py-8">
        <div className="font-display text-2xl font-bold">Ready to get started?</div>
        <p className="text-sm opacity-80 max-w-sm mx-auto">{meta.description}</p>
        <button className="mt-2 bg-white text-accent font-semibold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity">Create free account</button>
      </Card>
    </div>
  );
}

function HomeTestimonial({ testimonial }: { testimonial: DomainTestimonial }) {
  return (
    <figure className="max-w-2xl mx-auto text-center space-y-4">
      <blockquote className="font-display text-xl sm:text-2xl font-medium leading-snug tracking-tight">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="text-sm ink-2">
        <span className="font-semibold text-[var(--ink)]">{testimonial.author}</span> · {testimonial.role}
      </figcaption>
    </figure>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
export function LoginPage({ meta }: { meta: DomainMeta }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };

  const { signin } = useDesign();
  const body = (
    <div className="max-w-sm w-full mx-auto space-y-6">
      <div className="text-center space-y-1">
        <div className="inline-grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br from-accent to-grad text-white font-display font-bold text-xl mb-2">
          {meta.name[0]}
        </div>
        <h1 className="font-display text-2xl font-bold">Welcome back</h1>
        <p className="text-sm ink-2">Sign in to {meta.name}</p>
      </div>

      {done ? (
        <Card className="text-center space-y-2 py-6">
          <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
          <div className="font-semibold">Signed in successfully</div>
          <div className="text-xs ink-2">Redirecting to your dashboard…</div>
        </Card>
      ) : (
        <Card>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium ink-2">Email address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 ink-2" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium ink-2">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 ink-2" />
                <input type={showPw ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-10 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
                <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 ink-2 hover:text-[var(--ink)]">
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" /> <span className="ink-2">Remember me</span>
              </label>
              <button type="button" className="text-accent hover:underline">Forgot password?</button>
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full py-2.5 text-sm disabled:opacity-60">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-[var(--line)]" />
            <span className="text-[11px] ink-2">or continue with</span>
            <div className="h-px flex-1 bg-[var(--line)]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Google", "SSO"].map(p => (
              <button key={p} type="button"
                className="btn-ghost justify-center py-2.5 text-sm font-medium">{p}</button>
            ))}
          </div>

          <div className="mt-4 text-center text-xs ink-2">
            Don't have an account? <button className="text-accent hover:underline">Create one</button>
          </div>
        </Card>
      )}

      <div className="text-center text-xs ink-2">
        Protected by 256-bit TLS encryption · <span className="text-accent">Privacy policy</span>
      </div>
    </div>
  );

  if (signin === "split") {
    return (
      <div className="grid lg:grid-cols-2 min-h-[38rem] rounded-3xl overflow-hidden border border-[var(--line)] max-w-6xl mx-auto">
        <aside className="relative hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-accent to-grad text-white">
          <div className="flex items-center gap-2.5 font-display font-bold text-lg"><span className="grid place-items-center h-9 w-9 rounded-xl bg-white/20">{meta.name[0]}</span>{meta.name}</div>
          <div className="space-y-5">
            <h2 className="font-display text-3xl font-bold leading-tight">{meta.tagline}</h2>
            <ul className="space-y-3">
              {meta.features.map(f => <li key={f.title} className="flex gap-3 text-sm"><span className="text-xl" role="img" aria-label={f.title}>{f.icon}</span><span><b>{f.title}.</b> <span className="opacity-85">{f.body}</span></span></li>)}
            </ul>
          </div>
          <div className="text-xs opacity-75">{meta.accentLabel}</div>
        </aside>
        <div className="grid place-items-center p-6 sm:p-10 bg-[var(--surface)]">{body}</div>
      </div>
    );
  }
  if (signin === "fullbleed") {
    return (
      <div className="relative min-h-[40rem] rounded-3xl overflow-hidden grid place-items-center p-6 max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-grad to-accent-dark" aria-hidden="true" />
        <div className="absolute inset-0 opacity-30" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #fff 0, transparent 35%), radial-gradient(circle at 80% 70%, #fff 0, transparent 30%)" }} />
        <div className="absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative w-full max-w-md rounded-3xl bg-[var(--surface)] p-8 shadow-2xl">{body}</div>
      </div>
    );
  }
  return <div className="pt-8">{body}</div>;
}

// ─── Register ────────────────────────────────────────────────────────────────
export function RegisterPage({ meta }: { meta: DomainMeta }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "", plan: "growth" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { setStep(2); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  };

  const plans = [
    { id: "starter", label: "Starter", price: "Free", desc: "Up to 3 users" },
    { id: "growth", label: "Growth", price: "$49/mo", desc: "Up to 25 users" },
    { id: "enterprise", label: "Enterprise", price: "Custom", desc: "Unlimited" },
  ];

  return (
    <div className="max-w-sm mx-auto pt-8 space-y-6">
      <div className="text-center space-y-1">
        <div className="inline-grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br from-accent to-grad text-white font-display font-bold text-xl mb-2">
          {meta.name[0]}
        </div>
        <h1 className="font-display text-2xl font-bold">Create your account</h1>
        <p className="text-sm ink-2">Join thousands of teams using {meta.name}</p>
      </div>

      <div className="flex gap-2">
        {[1, 2].map(n => (
          <div key={n} className={`flex-1 h-1.5 rounded-full transition-colors ${n <= step ? "bg-accent" : "bg-[var(--line)]"}`} />
        ))}
      </div>

      {done ? (
        <Card className="text-center space-y-2 py-6">
          <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
          <div className="font-semibold">Account created!</div>
          <div className="text-xs ink-2">Check your email to verify your address.</div>
        </Card>
      ) : (
        <Card>
          <form onSubmit={next} className="space-y-4">
            {step === 1 && <>
              <div className="space-y-1.5">
                <label className="text-xs font-medium ink-2">Full name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 ink-2" />
                  <input required value={form.name} onChange={upd("name")} placeholder="Jane Smith"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium ink-2">Work email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 ink-2" />
                  <input type="email" required value={form.email} onChange={upd("email")} placeholder="jane@company.com"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium ink-2">Company name</label>
                <input required value={form.company} onChange={upd("company")} placeholder="Acme Inc."
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium ink-2">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 ink-2" />
                  <input type="password" required value={form.password} onChange={upd("password")} placeholder="Min. 8 characters"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
                </div>
              </div>
            </>}

            {step === 2 && <>
              <div className="text-sm font-semibold mb-1">Choose your plan</div>
              <div className="space-y-2">
                {plans.map(p => (
                  <label key={p.id} className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${form.plan === p.id ? "border-accent bg-accent/5" : "border-[var(--line)]"}`}>
                    <input type="radio" name="plan" value={p.id} checked={form.plan === p.id} onChange={upd("plan")} className="accent-[var(--accent)]" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{p.label}</div>
                      <div className="text-xs ink-2">{p.desc}</div>
                    </div>
                    <div className="text-sm font-semibold text-accent">{p.price}</div>
                  </label>
                ))}
              </div>
              <div className="text-xs ink-2 text-center">No credit card required for free plan</div>
            </>}

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm disabled:opacity-60">
              {loading ? "Creating account…" : step === 1 ? "Continue →" : "Create account"}
            </button>
          </form>
          {step === 2 && (
            <button onClick={() => setStep(1)} className="mt-3 w-full text-center text-xs ink-2 hover:text-[var(--ink)]">← Back</button>
          )}
          <div className="mt-4 text-center text-xs ink-2">
            Already have an account? <button className="text-accent hover:underline">Sign in</button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Profile ─────────────────────────────────────────────────────────────────
export function ProfilePage({ meta }: { meta: DomainMeta }) {
  const [form, setForm] = useState({ name: "Jane Smith", email: "jane@acme.com", phone: "+1 (555) 012-3456", location: "San Francisco, CA", role: "Product Manager", bio: "Passionate about building great products." });
  const [saved, setSaved] = useState(false);
  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <SectionTitle eyebrow={meta.name} title="My profile" />

      <div className="grid grid-cols-3 gap-3">
        {[["Member since", "Mar 2024"], ["Last active", "Today"], ["2FA", "Enabled"]].map(([l, v]) => (
          <Card key={l} className="text-center py-3">
            <div className="text-[11px] ink-2">{l}</div>
            <div className="text-sm font-semibold mt-0.5">{v}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center gap-4 pb-4 border-b border-[var(--line)]">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-grad grid place-items-center text-white font-display font-bold text-2xl">
            {form.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold">{form.name}</div>
            <div className="text-sm ink-2">{form.role}</div>
            <button className="mt-1.5 text-xs text-accent hover:underline">Change avatar</button>
          </div>
        </div>

        <form onSubmit={save} className="mt-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Full name", key: "name" as const, icon: <User size={14} /> },
              { label: "Email address", key: "email" as const, icon: <Mail size={14} /> },
              { label: "Phone", key: "phone" as const, icon: <Phone size={14} /> },
              { label: "Location", key: "location" as const, icon: <MapPin size={14} /> },
              { label: "Job title", key: "role" as const, icon: <User size={14} /> },
            ].map(({ label, key, icon }) => (
              <div key={key} className="space-y-1.5">
                <label className="text-xs font-medium ink-2">{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 ink-2">{icon}</span>
                  <input value={form[key]} onChange={upd(key)}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
                </div>
              </div>
            ))}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium ink-2">Bio</label>
              <textarea value={form.bio} onChange={upd("bio")} rows={3}
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="btn-primary px-5 py-2 text-sm">Save changes</button>
            {saved && <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><CheckCircle2 size={13} /> Saved</span>}
          </div>
        </form>
      </Card>

      <Card>
        <SectionTitle eyebrow="Account" title="Linked accounts & sessions" />
        <div className="divide-y divide-[var(--line)]">
          {[["Google Workspace", "Connected · jane@acme.com", "green"],
            ["Slack", "Connected · #general", "green"],
            ["GitHub", "Not connected", "gray"]].map(([name, status, tone]) => (
            <div key={name} className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium">{name}</div>
                <div className="text-xs ink-2">{status}</div>
              </div>
              <Badge tone={tone as "green" | "gray"}>{tone === "green" ? "Connected" : "Connect"}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Settings ────────────────────────────────────────────────────────────────
export function SettingsPage({ meta }: { meta: DomainMeta }) {
  const [notifs, setNotifs] = useState({ email: true, push: true, weekly: false, security: true });
  const [dark2fa, setDark2fa] = useState(false);
  const [dataRegion, setDataRegion] = useState("us-east-1");
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <SectionTitle eyebrow={meta.name} title="Settings" />

      <Card>
        <SectionTitle eyebrow="Preferences" title="Notifications" right={<Bell size={16} className="ink-2" />} />
        <div className="divide-y divide-[var(--line)]">
          {([
            ["email", "Email alerts", "Receive digest and transactional emails"],
            ["push", "Push notifications", "Browser and mobile push"],
            ["weekly", "Weekly summary", "Performance report every Monday"],
            ["security", "Security alerts", "Login anomalies and 2FA prompts"],
          ] as [keyof typeof notifs, string, string][]).map(([k, label, desc]) => (
            <div key={k} className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs ink-2">{desc}</div>
              </div>
              <Toggle on={notifs[k]} onChange={v => setNotifs(n => ({ ...n, [k]: v }))} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle eyebrow="Account security" title="Security & authentication" right={<Shield size={16} className="ink-2" />} />
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div>
              <div className="text-sm font-medium">Two-factor authentication</div>
              <div className="text-xs ink-2">TOTP app or hardware key</div>
            </div>
            <Toggle on={dark2fa} onChange={setDark2fa} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium ink-2">Current password</label>
            <input type="password" placeholder="••••••••"
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium ink-2">New password</label>
              <input type="password" placeholder="Min. 8 characters"
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium ink-2">Confirm password</label>
              <input type="password" placeholder="Repeat password"
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle eyebrow="Infrastructure" title="Data & region" right={<Palette size={16} className="ink-2" />} />
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium ink-2">Data residency region</label>
            <select value={dataRegion} onChange={e => setDataRegion(e.target.value)}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all">
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="eu-west-1">EU West (Ireland)</option>
              <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
            </select>
          </div>
          <div className="flex items-center justify-between py-1">
            <div>
              <div className="text-sm font-medium">Analytics & telemetry</div>
              <div className="text-xs ink-2">Help improve the product with usage data</div>
            </div>
            <Toggle on={true} onChange={() => {}} />
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <button onClick={save} className="btn-primary px-5 py-2 text-sm">Save settings</button>
        {saved && <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><CheckCircle2 size={13} /> Saved</span>}
        <button className="btn-ghost px-4 py-2 text-sm text-red-500 hover:text-red-600 ml-auto">Delete account</button>
      </div>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export function FAQPage({ meta }: { meta: DomainMeta }) {
  const [open, setOpen] = useState<number | null>(null);
  const [q, setQ] = useState("");
  const [voted, setVoted] = useState<Record<number, "up" | "down">>({});
  const filtered = meta.faqs
    .map((f, i) => ({ ...f, i }))
    .filter(f => (f.q + f.a).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <SectionTitle eyebrow={meta.name} title="Frequently asked questions"
        right={<Badge tone="gray">{meta.faqs.length} articles</Badge>} />

      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 ink-2" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search questions…"
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-10 pr-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
      </div>
      {q && <div className="text-xs ink-2 -mt-1 px-1">{filtered.length} result{filtered.length === 1 ? "" : "s"} for "{q}"</div>}

      <Card className="!p-0 overflow-hidden divide-y divide-[var(--line)]">
        {filtered.length === 0 && (
          <div className="px-5 py-8 text-center text-sm ink-2">No results for "{q}"</div>
        )}
        {filtered.map(faq => (
          <div key={faq.i}>
            <button onClick={() => setOpen(open === faq.i ? null : faq.i)}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-accent/5 transition-colors">
              <span className="text-sm font-medium">{faq.q}</span>
              {open === faq.i ? <ChevronDown size={15} className="ink-2 shrink-0" /> : <ChevronRight size={15} className="ink-2 shrink-0" />}
            </button>
            {open === faq.i && (
              <div className="px-5 pb-4 border-t border-[var(--line)] pt-3 space-y-3">
                <p className="text-sm ink-2 leading-relaxed">{faq.a}</p>
                <div className="flex items-center gap-2 text-xs ink-2">
                  {voted[faq.i] ? <span className="text-accent">Thanks for your feedback!</span> : <>
                    <span>Was this helpful?</span>
                    <button onClick={() => setVoted(v => ({ ...v, [faq.i]: "up" }))} className="rounded-md border border-[var(--line)] px-2 py-0.5 hover:border-accent hover:text-accent transition-colors">Yes</button>
                    <button onClick={() => setVoted(v => ({ ...v, [faq.i]: "down" }))} className="rounded-md border border-[var(--line)] px-2 py-0.5 hover:border-accent hover:text-accent transition-colors">No</button>
                  </>}
                </div>
              </div>
            )}
          </div>
        ))}
      </Card>

      <Card className="text-center space-y-2 py-6">
        <div className="font-semibold text-sm">Still have questions?</div>
        <div className="text-xs ink-2">Our support team typically responds within 2 hours.</div>
        <button className="btn-primary px-5 py-2 text-sm mt-1">Contact support</button>
      </Card>
    </div>
  );
}

// ─── Customer Support & Contact ───────────────────────────────────────────────
export function SupportPage({ meta }: { meta: DomainMeta }) {
  const [form, setForm] = useState({ subject: "", category: "general", message: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  };

  const channels = [
    { icon: "💬", label: "Live chat", status: "Online now", tone: "green" as const },
    { icon: "📧", label: "Email", status: meta.supportEmail, tone: "blue" as const },
    { icon: "📞", label: "Phone", status: "+1 (800) 555-0100 · Mon–Fri 9–6 ET", tone: "gray" as const },
    { icon: "📚", label: "Docs", status: "docs." + meta.id + ".io", tone: "gray" as const },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <SectionTitle eyebrow={meta.name} title="Support & contact" />

      <Card className="flex items-center justify-between gap-3 !py-3">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulseDot" />
          <span className="font-medium">All systems operational</span>
        </div>
        <span className="text-xs ink-2 flex items-center gap-1.5"><Activity size={13} /> Avg. first response · ~2h</span>
      </Card>

      <div className="grid sm:grid-cols-2 gap-3">
        {channels.map(c => (
          <Card key={c.label} className="flex items-center gap-3 card-hover cursor-pointer">
            <span className="text-2xl">{c.icon}</span>
            <div>
              <div className="text-sm font-medium">{c.label}</div>
              <div className="mt-0.5"><Badge tone={c.tone}>{c.status}</Badge></div>
            </div>
          </Card>
        ))}
      </div>

      {done ? (
        <Card className="text-center space-y-2 py-8">
          <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
          <div className="font-semibold">Ticket submitted!</div>
          <div className="text-xs ink-2">We'll reply to {form.email || "your email"} within 2 business hours.</div>
          <button onClick={() => { setDone(false); setForm({ subject: "", category: "general", message: "", email: "" }); }}
            className="btn-ghost px-4 py-2 text-sm mt-1">Submit another</button>
        </Card>
      ) : (
        <Card>
          <SectionTitle eyebrow="Help desk" title="Submit a support ticket" />
          <form onSubmit={submit} className="space-y-4 mt-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium ink-2">Your email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 ink-2" />
                  <input type="email" required value={form.email} onChange={upd("email")} placeholder="you@company.com"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium ink-2">Category</label>
                <select value={form.category} onChange={upd("category")}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all">
                  <option value="general">General question</option>
                  <option value="billing">Billing & plans</option>
                  <option value="bug">Bug report</option>
                  <option value="feature">Feature request</option>
                  <option value="security">Security concern</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium ink-2">Subject</label>
              <input required value={form.subject} onChange={upd("subject")} placeholder="Brief summary of your issue"
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium ink-2">Message</label>
              <textarea required value={form.message} onChange={upd("message")} rows={5}
                placeholder="Describe your issue in detail. Include steps to reproduce if reporting a bug."
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              <Send size={14} /> {loading ? "Submitting…" : "Submit ticket"}
            </button>
          </form>
        </Card>
      )}
    </div>
  );
}
