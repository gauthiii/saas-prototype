// src/industries/views.tsx — turns a manifest into its ordered screen flow and renders any view.
// Pure (no import.meta.glob) so exported projects reuse it verbatim with static imports.
import type { ComponentType, ReactElement } from "react";
import { HomePage, LoginPage, RegisterPage, ProfilePage, SettingsPage, FAQPage, SupportPage, DomainMeta } from "../domains/pages";
import { AboutPage, PrivacyPage, PricingPage, NotificationsPage, ChangelogPage, NotFoundPage, DomainExtra } from "../domains/pages-extra";
import { ArchetypeScreen } from "../kit";
import { OnboardingPage, TeamPage, BillingPage, InboxPage, SearchPage, CalendarMonthPage, ReportsPage, StatesPage } from "../kit/workspace";
import type { AnyIndustryData, IconName, Manifest, ScreenKind } from "./types";

export type Group = "Public" | "App" | "Workspace" | "Account" | "Resources" | "Utilities";
export const GROUP_ORDER: Group[] = ["Public", "App", "Workspace", "Account", "Resources", "Utilities"];

type SharedDef = { id: string; label: string; icon: IconName; group: Group; suffix?: string };

/** Pages every industry gets. `suffix` marks the 13 original pages bespoke modules export as `${prefix}${suffix}`. */
export const SHARED_PAGES: SharedDef[] = [
  { id: "home", label: "Home", icon: "Home", group: "Public", suffix: "Home" },
  { id: "about", label: "About us", icon: "Info", group: "Public", suffix: "About" },
  { id: "pricing", label: "Pricing", icon: "Tag", group: "Public", suffix: "Pricing" },
  { id: "login", label: "Sign in", icon: "LogIn", group: "Public", suffix: "Login" },
  { id: "register", label: "Create account", icon: "UserPlus", group: "Public", suffix: "Register" },
  { id: "setup", label: "Onboarding", icon: "Rocket", group: "Workspace" },
  { id: "team", label: "Team & roles", icon: "UsersRound", group: "Workspace" },
  { id: "subscription", label: "Billing & invoices", icon: "CreditCard", group: "Workspace" },
  { id: "inbox", label: "Inbox", icon: "Inbox", group: "Workspace" },
  { id: "notifications", label: "Notifications", icon: "BellRing", group: "Account", suffix: "Notifications" },
  { id: "profile", label: "Profile", icon: "User", group: "Account", suffix: "Profile" },
  { id: "settings", label: "Settings", icon: "Settings", group: "Account", suffix: "Settings" },
  { id: "faq", label: "FAQ", icon: "HelpCircle", group: "Account", suffix: "FAQ" },
  { id: "support", label: "Support", icon: "Headphones", group: "Account", suffix: "Support" },
  { id: "privacy", label: "Privacy & compliance", icon: "ShieldCheck", group: "Resources", suffix: "Privacy" },
  { id: "changelog", label: "What's new", icon: "Sparkles", group: "Resources", suffix: "Changelog" },
  { id: "notfound", label: "404 page", icon: "AlertTriangle", group: "Resources", suffix: "NotFound" },
  { id: "search", label: "Search results", icon: "Search", group: "Utilities" },
  { id: "calendar", label: "Calendar", icon: "CalendarDays", group: "Utilities" },
  { id: "reports", label: "Reports", icon: "FileBarChart", group: "Utilities" },
  { id: "states", label: "Empty & error states", icon: "AlertCircle", group: "Utilities" },
];

/** App-screen ids may not reuse these. */
export const RESERVED_IDS = new Set(SHARED_PAGES.map(p => p.id));

export type ViewRender =
  | { type: "bespoke"; comp: string }
  | { type: "shared"; page: string }
  | { type: "screen"; id: string; kind: ScreenKind };

export type ViewDef = { id: string; label: string; icon: IconName; group: Group; render: ViewRender; wrap?: string };

export function buildViews(m: Manifest): ViewDef[] {
  const app: ViewDef[] = [
    ...(m.bespoke?.appViews ?? []).map(v => ({ id: v.id, label: v.label, icon: v.icon, group: "App" as const, render: { type: "bespoke" as const, comp: v.comp }, wrap: v.wrap })),
    ...m.screens.map(s => ({ id: s.id, label: s.label, icon: s.icon, group: "App" as const, render: { type: "screen" as const, id: s.id, kind: s.kind } })),
  ];
  for (const v of app) {
    if (RESERVED_IDS.has(v.id)) throw new Error(`Industry "${m.id}": app screen id "${v.id}" collides with a shared page id`);
  }
  const shared: ViewDef[] = SHARED_PAGES.map(p => ({
    id: p.id, label: p.label, icon: p.icon, group: p.group,
    render: m.bespoke && p.suffix ? { type: "bespoke", comp: `${m.bespoke.prefix}${p.suffix}` } : { type: "shared", page: p.id },
  }));
  const all = [...shared.filter(v => v.group === "Public"), ...app, ...shared.filter(v => v.group !== "Public")];
  return GROUP_ORDER.flatMap(g => all.filter(v => v.group === g));
}

/** Everything a view needs at render time. `module` is the bespoke domain module, if any. */
export type LoadedDomain = { manifest: Manifest; data: AnyIndustryData; module?: Record<string, unknown> };

export function domainMeta(d: LoadedDomain): { meta: DomainMeta; extra: DomainExtra } {
  const meta = (d.data.meta ?? d.module?.meta) as DomainMeta | undefined;
  const extra = (d.data.extra ?? d.module?.extra) as DomainExtra | undefined;
  if (!meta || !extra) throw new Error(`Industry "${d.manifest.id}" is missing meta/extra`);
  return { meta, extra };
}

function sharedPage(page: string, d: LoadedDomain): ReactElement {
  const { meta, extra } = domainMeta(d);
  const shared = d.data.shared;
  switch (page) {
    case "home": return <HomePage meta={meta} stats={extra.stats} testimonial={extra.testimonial} />;
    case "about": return <AboutPage meta={meta} extra={extra} />;
    case "pricing": return <PricingPage meta={meta} extra={extra} />;
    case "login": return <LoginPage meta={meta} />;
    case "register": return <RegisterPage meta={meta} />;
    case "notifications": return <NotificationsPage meta={meta} extra={extra} />;
    case "profile": return <ProfilePage meta={meta} />;
    case "settings": return <SettingsPage meta={meta} />;
    case "faq": return <FAQPage meta={meta} />;
    case "support": return <SupportPage meta={meta} />;
    case "privacy": return <PrivacyPage meta={meta} extra={extra} />;
    case "changelog": return <ChangelogPage meta={meta} extra={extra} />;
    case "notfound": return <NotFoundPage meta={meta} />;
    case "setup": return <OnboardingPage meta={meta} shared={shared} />;
    case "team": return <TeamPage meta={meta} shared={shared} />;
    case "subscription": return <BillingPage meta={meta} shared={shared} />;
    case "inbox": return <InboxPage meta={meta} shared={shared} />;
    case "search": return <SearchPage meta={meta} shared={shared} />;
    case "calendar": return <CalendarMonthPage meta={meta} shared={shared} />;
    case "reports": return <ReportsPage meta={meta} shared={shared} />;
    case "states": return <StatesPage meta={meta} shared={shared} />;
    default: throw new Error(`Unknown shared page "${page}"`);
  }
}

export function ViewContent({ domain, view }: { domain: LoadedDomain; view: ViewDef }) {
  const r = view.render;
  let el: ReactElement;
  if (r.type === "bespoke") {
    const C = domain.module?.[r.comp] as ComponentType | undefined;
    if (!C) throw new Error(`Registry error: ${r.comp} not exported from domains/${domain.manifest.bespoke?.module}`);
    el = <C />;
  } else if (r.type === "screen") {
    const data = domain.data.screens[r.id];
    if (!data) throw new Error(`Industry "${domain.manifest.id}" has no data for screen "${r.id}"`);
    el = <ArchetypeScreen kind={r.kind} data={data} title={view.label} />;
  } else {
    el = sharedPage(r.page, domain);
  }
  return view.wrap ? <div className={view.wrap}>{el}</div> : el;
}
