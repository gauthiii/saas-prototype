const e=`// src/domains/pages-extra.tsx — shared page templates (About, Privacy & Compliance, Pricing, Notifications, Changelog, 404)
import { useState } from "react";
import { ShieldCheck, FileText, CheckCircle2, Bell, Sparkles, AlertTriangle, Check, Clock, Home, Search, ArrowRight, Mail as MailIcon } from "lucide-react";
import { Card, SectionTitle, Badge, Tone } from "../components/ui";
import { DomainMeta, DomainStat, DomainTestimonial } from "./pages";

export type TeamMember = { name: string; role: string; bio: string; emoji: string };
export type ComplianceItem = { name: string; desc: string; status: "Certified" | "Compliant" | "In progress" };
export type PricingPlan = { name: string; price: string; period?: string; desc: string; features: string[]; highlight?: boolean; cta: string };
export type Notification = { title: string; body: string; time: string; tone: Tone; unread?: boolean };
export type ChangelogEntry = { version: string; date: string; tag: "New" | "Improved" | "Fixed"; items: string[] };

export type DomainExtra = {
  founded: string;
  story: string[];
  mission: string;
  team: TeamMember[];
  compliance: ComplianceItem[];
  dataRetention: string;
  plans: PricingPlan[];
  notifications: Notification[];
  changelog: ChangelogEntry[];
  // Domain-specific marketing data (optional — templates fall back gracefully).
  stats?: DomainStat[];
  testimonial?: DomainTestimonial;
};

// ─── About ───────────────────────────────────────────────────────────────────
export function AboutPage({ meta, extra }: { meta: DomainMeta; extra: DomainExtra }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-3 pt-4">
        <Badge tone="blue">Founded {extra.founded}</Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">About {meta.name}</h1>
        <p className="ink-2 max-w-xl mx-auto leading-relaxed">{extra.mission}</p>
      </div>

      {extra.stats && extra.stats.length > 0 && (
        <Card className="bg-gradient-to-br from-accent/5 to-grad/5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {extra.stats.map(s => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-accent">{s.value}</div>
                <div className="text-xs ink-2 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <SectionTitle eyebrow="Our story" title="How it started" />
        <div className="space-y-3 text-sm ink-2 leading-relaxed">
          {extra.story.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Card>

      {extra.testimonial && (
        <figure className="text-center space-y-3 py-2">
          <blockquote className="font-display text-lg sm:text-xl font-medium leading-snug max-w-xl mx-auto">
            “{extra.testimonial.quote}”
          </blockquote>
          <figcaption className="text-xs ink-2">
            <span className="font-semibold text-[var(--ink)]">{extra.testimonial.author}</span> · {extra.testimonial.role}
          </figcaption>
        </figure>
      )}

      <div>
        <SectionTitle eyebrow="The team" title="People behind the product" />
        <div className="grid sm:grid-cols-2 gap-4">
          {extra.team.map(m => (
            <Card key={m.name} className="card-hover">
              <div className="flex items-start gap-3.5">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-grad grid place-items-center text-2xl shrink-0">
                  {m.emoji}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm">{m.name}</div>
                  <div className="text-xs text-accent font-medium">{m.role}</div>
                  <p className="text-xs ink-2 mt-1.5 leading-relaxed">{m.bio}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-gradient-to-br from-accent to-grad text-white border-0 text-center space-y-2 py-7">
        <div className="font-display text-xl font-bold">Want to join the team?</div>
        <p className="text-sm opacity-80">We're hiring across engineering, design, and customer success.</p>
        <button className="mt-1 bg-white text-accent font-semibold text-sm px-5 py-2 rounded-xl hover:opacity-90 transition-opacity">View open roles</button>
      </Card>
    </div>
  );
}

// ─── Privacy Policy & Compliance ─────────────────────────────────────────────
export function PrivacyPage({ meta, extra }: { meta: DomainMeta; extra: DomainExtra }) {
  const sections = [
    { h: "1. Data we collect", b: \`\${meta.name} collects account information (name, email, company), usage analytics, and the operational data you create inside the product. We never sell personal data to third parties.\` },
    { h: "2. How we use your data", b: "Data is used to provide and improve the service, secure your account, send transactional communications, and — only with your consent — product updates. Aggregated, anonymized data may inform product decisions." },
    { h: "3. Data retention & deletion", b: extra.dataRetention },
    { h: "4. Security measures", b: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Access is governed by role-based controls, hardware-key 2FA for staff, and continuous audit logging. We run an annual third-party penetration test." },
    { h: "5. Your rights", b: "You may request access, correction, export, or deletion of your personal data at any time. Requests are honored within 30 days. EU/UK users may also lodge complaints with their supervisory authority." },
    { h: "6. Sub-processors & transfers", b: "We use vetted sub-processors (cloud hosting, email delivery, analytics) bound by data-processing agreements. Cross-border transfers rely on Standard Contractual Clauses." },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SectionTitle eyebrow={meta.name} title="Privacy policy & compliance" right={<Badge tone="gray">Last updated Jun 2026</Badge>} />

      <div>
        <SectionTitle eyebrow="Regulations" title="Compliance & certifications" right={<ShieldCheck size={16} className="ink-2" />} />
        <div className="grid sm:grid-cols-2 gap-3">
          {extra.compliance.map(c => (
            <Card key={c.name} className="card-hover">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-sm">{c.name}</div>
                <Badge tone={c.status === "In progress" ? "amber" : "green"}>{c.status}</Badge>
              </div>
              <p className="text-xs ink-2 mt-1.5 leading-relaxed">{c.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--line)] flex items-center gap-2">
          <FileText size={15} className="ink-2" />
          <span className="font-display font-semibold text-sm">Privacy policy</span>
        </div>
        <div className="divide-y divide-[var(--line)]">
          {sections.map(s => (
            <div key={s.h} className="px-5 py-4">
              <div className="text-sm font-semibold mb-1">{s.h}</div>
              <p className="text-sm ink-2 leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <SectionTitle eyebrow="Your data, your rights" title="Self-service controls" />
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { t: "Export my data", d: "Download a machine-readable copy of everything we hold." },
            { t: "Request correction", d: "Update inaccurate personal information on file." },
            { t: "Delete my account", d: "Erase your data within 30 days, subject to legal holds." },
          ].map(a => (
            <Card key={a.t} className="card-hover cursor-pointer">
              <div className="text-sm font-medium flex items-center justify-between">{a.t} <ArrowRight size={14} className="ink-2" /></div>
              <p className="text-xs ink-2 mt-1 leading-relaxed">{a.d}</p>
            </Card>
          ))}
        </div>
      </div>

      <Card className="text-center space-y-2 py-6">
        <div className="font-semibold text-sm">Questions about privacy or compliance?</div>
        <div className="text-xs ink-2">Contact our Data Protection Officer at <span className="text-accent">privacy@{meta.id}.io</span></div>
      </Card>
    </div>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
export function PricingPage({ meta, extra }: { meta: DomainMeta; extra: DomainExtra }) {
  const [yearly, setYearly] = useState(false);
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3 pt-4">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
        <p className="ink-2">Start free. Scale {meta.name} as your team grows.</p>
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] p-1 text-xs font-medium">
          {(["Monthly", "Yearly · save 20%"] as const).map((l, i) => (
            <button key={l} onClick={() => setYearly(i === 1)}
              className={\`rounded-full px-3.5 py-1.5 transition-colors \${(i === 1) === yearly ? "bg-accent text-white" : "ink-2"}\`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 items-stretch">
        {extra.plans.map(p => (
          <Card key={p.name} className={\`flex flex-col card-hover relative \${p.highlight ? "border-accent shadow-glow" : ""}\`}>
            {p.highlight && <Badge tone="blue">Most popular</Badge>}
            <div className={\`font-display font-bold text-lg \${p.highlight ? "mt-2" : ""}\`}>{p.name}</div>
            <div className="mt-1">
              <span className="font-display text-3xl font-bold">{p.price}</span>
              {p.period && <span className="text-sm ink-2"> /{yearly ? "yr" : p.period}</span>}
            </div>
            <p className="text-xs ink-2 mt-1.5">{p.desc}</p>
            <ul className="mt-4 space-y-2 flex-1">
              {p.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check size={13} className="text-accent shrink-0 mt-0.5" /> <span className="ink-2">{f}</span>
                </li>
              ))}
            </ul>
            <button className={\`mt-5 w-full py-2.5 text-sm rounded-xl font-semibold transition-all \${p.highlight ? "btn-primary justify-center" : "btn-ghost justify-center"}\`}>{p.cta}</button>
          </Card>
        ))}
      </div>

      <Card className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-br from-accent/5 to-grad/5">
        <div>
          <div className="font-semibold text-sm">Need a custom plan?</div>
          <p className="text-xs ink-2 mt-0.5">Volume discounts, custom contracts, and dedicated onboarding for larger teams.</p>
        </div>
        <button className="btn-ghost px-5 py-2 text-sm shrink-0 gap-1.5">Contact sales <ArrowRight size={14} /></button>
      </Card>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-center text-xs ink-2">
        <span className="flex items-center gap-1.5"><Check size={13} className="text-accent" /> 14-day free trial</span>
        <span className="flex items-center gap-1.5"><Check size={13} className="text-accent" /> Cancel anytime</span>
        <span className="flex items-center gap-1.5"><Check size={13} className="text-accent" /> TLS encryption & SSO</span>
        <span className="flex items-center gap-1.5"><Check size={13} className="text-accent" /> Prices in USD</span>
      </div>
    </div>
  );
}

// ─── Notifications / Activity ────────────────────────────────────────────────
export function NotificationsPage({ meta, extra }: { meta: DomainMeta; extra: DomainExtra }) {
  const [items, setItems] = useState(extra.notifications);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const unread = items.filter(n => n.unread).length;
  const shown = tab === "unread" ? items.filter(n => n.unread) : items;
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <SectionTitle eyebrow={meta.name} title="Notifications"
        right={unread > 0
          ? <button onClick={() => setItems(ns => ns.map(n => ({ ...n, unread: false })))} className="btn-ghost !px-3 !py-1.5 text-xs">Mark all read</button>
          : <Badge tone="gray">All caught up</Badge>} />

      <div className="inline-flex items-center gap-1 rounded-xl border border-[var(--line)] p-1 text-xs font-medium">
        {([["all", \`All (\${items.length})\`], ["unread", \`Unread (\${unread})\`]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={\`rounded-lg px-3 py-1.5 transition-colors \${tab === id ? "bg-accent text-white" : "ink-2 hover:text-[var(--ink)]"}\`}>{label}</button>
        ))}
      </div>

      <Card className="!p-0 overflow-hidden divide-y divide-[var(--line)]">
        {shown.length === 0 && (
          <div className="px-5 py-8 text-center text-sm ink-2">No unread notifications. You're all caught up.</div>
        )}
        {shown.map((n, i) => (
          <div key={i} className={\`flex items-start gap-3 px-5 py-4 transition-colors \${n.unread ? "bg-accent/5" : ""}\`}>
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-accent/12 text-accent shrink-0 mt-0.5"><Bell size={14} /></span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{n.title}</span>
                {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />}
              </div>
              <p className="text-xs ink-2 mt-0.5 leading-relaxed">{n.body}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge tone={n.tone}>{n.tone === "green" ? "Success" : n.tone === "amber" ? "Attention" : n.tone === "red" ? "Critical" : "Info"}</Badge>
                <span className="text-[11px] ink-2 flex items-center gap-1"><Clock size={10} /> {n.time}</span>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── Changelog ───────────────────────────────────────────────────────────────
export function ChangelogPage({ meta, extra }: { meta: DomainMeta; extra: DomainExtra }) {
  const tagTone: Record<ChangelogEntry["tag"], Tone> = { New: "green", Improved: "blue", Fixed: "amber" };
  const [filter, setFilter] = useState<"All" | ChangelogEntry["tag"]>("All");
  const [subscribed, setSubscribed] = useState(false);
  const entries = filter === "All" ? extra.changelog : extra.changelog.filter(e => e.tag === filter);
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <SectionTitle eyebrow={\`\${meta.name} · product updates\`} title="What's new" right={<Sparkles size={16} className="ink-2" />} />

      {/* Subscribe band — product-news framing (distinct from the build-log Version History) */}
      <Card className="flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-br from-accent/5 to-grad/5">
        <div className="flex-1 text-center sm:text-left">
          <div className="text-sm font-medium">Get product updates in your inbox</div>
          <div className="text-xs ink-2 mt-0.5">New features, improvements, and fixes — about once a month.</div>
        </div>
        {subscribed ? (
          <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"><CheckCircle2 size={14} /> Subscribed</span>
        ) : (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-52">
              <MailIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 ink-2" />
              <input placeholder="you@company.com"
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-9 pr-3 py-2 text-sm outline-none focus:border-accent transition-all" />
            </div>
            <button onClick={() => setSubscribed(true)} className="btn-primary px-4 py-2 text-sm shrink-0">Subscribe</button>
          </div>
        )}
      </Card>

      <div className="inline-flex items-center gap-1 rounded-xl border border-[var(--line)] p-1 text-xs font-medium">
        {(["All", "New", "Improved", "Fixed"] as const).map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={\`rounded-lg px-3 py-1.5 transition-colors \${filter === t ? "bg-accent text-white" : "ink-2 hover:text-[var(--ink)]"}\`}>{t}</button>
        ))}
      </div>

      <div className="space-y-4">
        {entries.map(e => (
          <Card key={e.version}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-accent">{e.version}</span>
              <Badge tone={tagTone[e.tag]}>{e.tag}</Badge>
              <span className="text-xs ink-2 ml-auto">{e.date}</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {e.items.map(it => (
                <li key={it} className="flex items-start gap-2 text-sm ink-2">
                  <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" /> {it}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── 404 / Not found ─────────────────────────────────────────────────────────
export function NotFoundPage({ meta }: { meta: DomainMeta }) {
  return (
    <div className="max-w-md mx-auto text-center space-y-5 pt-16">
      <div className="inline-grid place-items-center h-16 w-16 rounded-2xl bg-amber-500/12 text-amber-500 mx-auto">
        <AlertTriangle size={28} />
      </div>
      <div>
        <div className="font-display text-5xl font-bold tracking-tight">404</div>
        <p className="ink-2 mt-2 text-sm">This page doesn't exist or was moved. Check the URL, or head back to your {meta.name} dashboard.</p>
      </div>

      <div className="relative max-w-xs mx-auto">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 ink-2" />
        <input placeholder={\`Search \${meta.name}…\`}
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-10 pr-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
      </div>

      <div className="flex gap-3 justify-center">
        <button className="btn-primary px-5 py-2 text-sm gap-1.5"><Home size={14} /> Go to dashboard</button>
        <button className="btn-ghost px-5 py-2 text-sm">Contact support</button>
      </div>

      <div className="pt-2">
        <div className="text-[11px] ink-2 mb-2">Popular pages</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {["Dashboard", "Pricing", "Settings", "Support", "What's new"].map(l => (
            <span key={l} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs ink-2 hover:border-accent hover:text-accent transition-colors cursor-pointer">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
`;export{e as default};
