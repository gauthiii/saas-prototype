// src/domains/pages.tsx — shared page templates (Home, Auth, Profile, Settings, FAQ, Support)
import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Bell, Palette, Shield, ChevronDown, ChevronRight, Send, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Card, SectionTitle, Badge, Toggle } from "../components/ui";

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
export function HomePage({ meta }: { meta: DomainMeta }) {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <Badge tone="blue">{meta.accentLabel}</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">{meta.name}</h1>
        <p className="text-lg ink-2 max-w-xl mx-auto leading-relaxed">{meta.tagline}</p>
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button className="btn-primary px-6 py-2.5 text-sm">Get started free</button>
          <button className="btn-ghost px-6 py-2.5 text-sm">Watch demo →</button>
        </div>
      </div>

      {/* Features grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        {meta.features.map((f, i) => (
          <Card key={i} className="text-center space-y-2 card-hover">
            <div className="text-3xl">{f.icon}</div>
            <div className="font-semibold text-sm">{f.title}</div>
            <div className="text-xs ink-2 leading-relaxed">{f.body}</div>
          </Card>
        ))}
      </div>

      {/* Social proof */}
      <Card>
        <div className="flex flex-wrap gap-8 justify-around text-center">
          {[["10,000+", "Companies"], ["99.9%", "Uptime SLA"], ["<200ms", "Avg response"], ["SOC 2", "Certified"]].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-2xl font-bold text-accent">{v}</div>
              <div className="text-xs ink-2 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-br from-accent to-violet-600 text-white border-0 text-center space-y-3 py-8">
        <div className="font-display text-2xl font-bold">Ready to get started?</div>
        <p className="text-sm opacity-80 max-w-sm mx-auto">{meta.description}</p>
        <button className="mt-2 bg-white text-accent font-semibold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity">Create free account</button>
      </Card>
    </div>
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

  return (
    <div className="max-w-sm mx-auto pt-8 space-y-6">
      <div className="text-center space-y-1">
        <div className="inline-grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br from-accent to-violet-600 text-white font-display font-bold text-xl mb-2">
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
        <div className="inline-grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br from-accent to-violet-600 text-white font-display font-bold text-xl mb-2">
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

      <Card>
        <div className="flex items-center gap-4 pb-4 border-b border-[var(--line)]">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-violet-600 grid place-items-center text-white font-display font-bold text-2xl">
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
  const filtered = meta.faqs.filter(f => (f.q + f.a).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <SectionTitle eyebrow={meta.name} title="Frequently asked questions" />

      <div className="relative">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search questions…"
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-4 pr-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
      </div>

      <Card className="!p-0 overflow-hidden divide-y divide-[var(--line)]">
        {filtered.length === 0 && (
          <div className="px-5 py-8 text-center text-sm ink-2">No results for "{q}"</div>
        )}
        {filtered.map((faq, i) => (
          <div key={i}>
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-accent/5 transition-colors">
              <span className="text-sm font-medium">{faq.q}</span>
              {open === i ? <ChevronDown size={15} className="ink-2 shrink-0" /> : <ChevronRight size={15} className="ink-2 shrink-0" />}
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm ink-2 leading-relaxed border-t border-[var(--line)] pt-3">
                {faq.a}
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
