// src/export/generateDeck.ts — builds the themed walkthrough .pptx for an exported
// domain, fully client-side. Slide story comes from deckContent.ts; structure and
// labels come from registry.ts; colors come from the user's chosen theme.
import pptxgen from "pptxgenjs";
import { createElement } from "react";
import type { LucideIcon } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Landmark, HeartPulse, TerminalSquare, Users, GraduationCap,
  LayoutDashboard, FileText, CalendarDays, ListChecks, BarChart3,
  Boxes, CreditCard, Send, PiggyBank, Shield, TrendingUp, Building2,
  Video, Pill, BedDouble, ClipboardList, Receipt,
  GitBranch, BellRing, Flag, DollarSign, Lock,
  UserCheck, Briefcase, MessageCircle,
  Home, LogIn, UserPlus, User, Settings, HelpCircle, Headphones,
  Info, Tag, ShieldCheck, Sparkles, AlertTriangle, Palette, Rocket,
} from "lucide-react";
import { DomainDef, ViewDef } from "./registry";
import { DECK_CONTENT } from "./deckContent";
import { Theme, darken } from "../theme";

type IconType = LucideIcon;

const ICONS: Record<string, IconType> = {
  Landmark, HeartPulse, TerminalSquare, Users, GraduationCap,
  LayoutDashboard, FileText, CalendarDays, ListChecks, BarChart3,
  Boxes, CreditCard, Send, PiggyBank, Shield, TrendingUp, Building2,
  Video, Pill, BedDouble, ClipboardList, Receipt,
  GitBranch, BellRing, Flag, DollarSign, Lock,
  UserCheck, Briefcase, MessageCircle,
  Home, LogIn, UserPlus, User, Settings, HelpCircle, Headphones,
  Info, Tag, ShieldCheck, Sparkles, AlertTriangle, Palette, Rocket,
};

// ---- color helpers (deck is dark; ensure accent stays readable on it) ----
const hexNo = (h: string) => h.replace("#", "").toUpperCase();
function lighten(hex: string, f: number): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  const mix = (v: number) => Math.min(255, Math.round(v + (255 - v) * f));
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(mix);
  return [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
}

// Rasterize a lucide icon to a PNG data URI via an offscreen canvas.
function iconPng(Icon: IconType, colorHex: string, px = 128): Promise<string> {
  const svg = renderToStaticMarkup(createElement(Icon, { color: `#${hexNo(colorHex)}`, size: px, strokeWidth: 1.75 }));
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = px; c.height = px;
      c.getContext("2d")!.drawImage(img, 0, 0, px, px);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Deck export: icon rasterization failed"));
    img.src = "data:image/svg+xml;base64," + btoa(svg);
  });
}

const GENERIC_GROUPS: Record<string, { title: string; blurb: string; notes: Record<string, string> }> = {
  Public: {
    title: "Public & Marketing Pages",
    blurb: "Every visitor-facing page ships pre-built, so the prototype demos like a real product from the first click.",
    notes: {
      home: "Hero, feature grid, and call-to-action landing page",
      about: "Company story, values, and team page",
      pricing: "Tiered plans with feature comparison",
      login: "Sign-in screen (visual only — wire your auth provider)",
      register: "Account creation flow with form validation states",
    },
  },
  Account: {
    title: "Account & Self-Service Pages",
    blurb: "The signed-in housekeeping every product needs — already designed and navigable.",
    notes: {
      notifications: "Notification center with read/unread states",
      profile: "User profile with editable details",
      settings: "Preferences, toggles, and account options",
      faq: "Expandable frequently-asked-questions page",
      support: "Contact / support request screen",
    },
  },
  Resources: {
    title: "Resources & Utility Pages",
    blurb: "The pages teams usually leave for last — included from day one.",
    notes: {
      privacy: "Privacy & compliance placeholder (have legal review it)",
      changelog: "“What's new” release notes page",
      notfound: "Designed 404 error page",
    },
  },
};

export async function generateDeck(domain: DomainDef, theme: Theme): Promise<Blob> {
  const story = DECK_CONTENT[domain.id];
  if (!story) throw new Error(`Deck export: no deck content for domain "${domain.id}"`);

  // Palette — fixed dark chrome + the user's theme baked in.
  const BG = "0F172A", CARD = "1E293B", CARD2 = "273449", LINE = "334155";
  const WHITE = "FFFFFF", INK = "CBD5E1", INK2 = "94A3B8";
  const ACCENT = hexNo(theme.accent);
  const GRAD = hexNo(theme.grad);
  // For text/icons on dark slides, lift dark accents until they read clearly.
  const ACCENT_TXT = luminance(theme.accent) < 0.35 ? lighten(theme.accent, 0.45) : ACCENT;
  const GRAD_TXT = luminance(theme.grad) < 0.35 ? lighten(theme.grad, 0.45) : GRAD;
  const ACCENT_DK = hexNo(darken(theme.accent, 0.55)); // deep fill for highlighted cards

  const sh = () => ({ type: "outer" as const, color: "000000", blur: 8, offset: 3, angle: 45, opacity: 0.35 });
  const F = "Arial";

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "ForgeUI";
  pres.title = `${domain.productName} — ${domain.label} Prototype Walkthrough`;

  const appViews = domain.views.filter(v => v.group === "App");
  const byGroup = (g: ViewDef["group"]) => domain.views.filter(v => v.group === g);

  // Pre-render every icon we need.
  const icons = new Map<string, string>();
  const need = async (name: string, color: string) => {
    const key = `${name}/${color}`;
    if (!icons.has(key)) icons.set(key, await iconPng(ICONS[name] ?? Sparkles, color));
    return icons.get(key)!;
  };

  const TITLE = (s: pptxgen.Slide, txt: string, fontSize = 28) => s.addText(txt, {
    x: 0.5, y: 0.32, w: 9, h: 0.7, fontSize, bold: true, color: WHITE, fontFace: F, margin: 0,
  });
  const SUB = (s: pptxgen.Slide, txt: string) => s.addText(txt, {
    x: 0.5, y: 0.98, w: 9, h: 0.35, fontSize: 13, italic: true, color: INK2, fontFace: F, margin: 0,
  });
  const FOOT = (s: pptxgen.Slide, n: number, total: number) => s.addText(
    `${domain.productName} · ${domain.label} prototype · ${n} / ${total}`,
    { x: 0.5, y: 5.22, w: 9, h: 0.3, fontSize: 9, color: LINE, fontFace: F, margin: 0, align: "right" });

  const totalSlides = 6 + appViews.length;
  let slideNo = 0;
  const newSlide = () => {
    const s = pres.addSlide();
    s.background = { color: BG };
    slideNo += 1;
    if (slideNo > 1) FOOT(s, slideNo, totalSlides);
    return s;
  };

  // ---------- 1. Title ----------
  let s = newSlide();
  // gradient-ish corner motif from the two theme colors
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.12, fill: { color: ACCENT } });
  s.addShape(pres.ShapeType.ellipse, { x: 7.6, y: 2.3, w: 4.4, h: 4.4, fill: { color: ACCENT_DK } });
  s.addShape(pres.ShapeType.ellipse, { x: 8.7, y: -1.4, w: 3.4, h: 3.4, fill: { color: CARD2 } });
  s.addImage({ data: await need(domain.icon, ACCENT_TXT), x: 0.7, y: 1.0, w: 0.85, h: 0.85 });
  s.addText(domain.productName, { x: 0.66, y: 2.0, w: 8.4, h: 1.1, fontSize: 48, bold: true, color: WHITE, fontFace: F, margin: 0 });
  s.addText(story.tagline, { x: 0.7, y: 3.15, w: 6.9, h: 0.85, fontSize: 17, color: ACCENT_TXT, fontFace: F, margin: 0 });
  s.addText(`${domain.label} UI prototype · ${domain.sub}`, { x: 0.7, y: 4.25, w: 6.9, h: 0.4, fontSize: 12, color: INK2, fontFace: F, margin: 0 });
  s.addText(`Exported from ForgeUI · ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
    { x: 0.7, y: 4.85, w: 6.9, h: 0.35, fontSize: 10, color: LINE, fontFace: F, margin: 0 });

  // ---------- 2. Story ----------
  s = newSlide();
  TITLE(s, "What This Prototype Is");
  SUB(s, `Built for: ${story.audience}`);
  s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.5, w: 9, h: 2.15, rectRadius: 0.08, fill: { color: CARD }, shadow: sh() });
  s.addText(story.narrative, { x: 0.85, y: 1.75, w: 8.3, h: 1.65, fontSize: 14.5, color: INK, fontFace: F, margin: 0, valign: "top" });
  story.stats.forEach(([v, l], i) => {
    const x = 0.5 + i * 3.15;
    s.addShape(pres.ShapeType.roundRect, { x, y: 3.95, w: 2.85, h: 1.1, rectRadius: 0.08, fill: { color: ACCENT_DK }, line: { color: ACCENT, width: 1 }, shadow: sh() });
    s.addText(v, { x: x + 0.25, y: 4.07, w: 1.0, h: 0.85, fontSize: 30, bold: true, color: ACCENT_TXT, fontFace: F, margin: 0, valign: "middle" });
    s.addText(l, { x: x + 1.15, y: 4.07, w: 1.6, h: 0.85, fontSize: 11.5, color: WHITE, fontFace: F, margin: 0, valign: "middle" });
  });

  // ---------- 3. Flow overview ----------
  s = newSlide();
  TITLE(s, "How the App Flows");
  SUB(s, "Top-to-bottom in the sidebar: public pages first, then the core app, then account & resources");
  const groupsMeta: { g: ViewDef["group"]; hot?: boolean }[] = [
    { g: "Public" }, { g: "App", hot: true }, { g: "Account" }, { g: "Resources" },
  ];
  groupsMeta.forEach(({ g, hot }, i) => {
    const x = 0.5 + i * 2.42;
    s.addShape(pres.ShapeType.chevron, { x, y: 1.55, w: 2.42, h: 0.85, fill: { color: hot ? ACCENT_DK : CARD2 }, line: { color: hot ? ACCENT : LINE, width: 1 } });
    s.addText(`${g}  ·  ${byGroup(g).length}`, { x: x + 0.25, y: 1.55, w: 1.95, h: 0.85, fontSize: 13, bold: true, color: hot ? ACCENT_TXT : WHITE, align: "center", valign: "middle", fontFace: F, margin: 0 });
  });
  // core app screens as pills
  s.addText("CORE APP SCREENS", { x: 0.5, y: 2.7, w: 4, h: 0.3, fontSize: 10, bold: true, color: INK2, charSpacing: 2, fontFace: F, margin: 0 });
  const perRow = 4, pillW = 2.2, pillH = 0.62;
  appViews.forEach((v, i) => {
    const x = 0.5 + (i % perRow) * (pillW + 0.13);
    const y = 3.05 + Math.floor(i / perRow) * (pillH + 0.12);
    s.addShape(pres.ShapeType.roundRect, { x, y, w: pillW, h: pillH, rectRadius: 0.06, fill: { color: CARD }, line: { color: LINE, width: 0.75 } });
    s.addText(`${i + 1}. ${v.label}`, { x: x + 0.12, y, w: pillW - 0.24, h: pillH, fontSize: 10.5, bold: true, color: INK, valign: "middle", fontFace: F, margin: 0 });
  });

  // ---------- 4..N. One slide per core App screen ----------
  for (let i = 0; i < appViews.length; i++) {
    const v = appViews[i];
    const sc = story.screens[v.id];
    s = newSlide();
    TITLE(s, v.label);
    SUB(s, `Core app · screen ${i + 1} of ${appViews.length}`);
    // left: purpose + bullets
    s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.5, w: 5.9, h: 3.55, rectRadius: 0.08, fill: { color: CARD }, shadow: sh() });
    s.addShape(pres.ShapeType.ellipse, { x: 0.85, y: 1.8, w: 0.7, h: 0.7, fill: { color: ACCENT_DK }, line: { color: ACCENT, width: 1 } });
    s.addImage({ data: await need(v.icon, ACCENT_TXT), x: 1.02, y: 1.97, w: 0.36, h: 0.36 });
    s.addText(sc?.blurb ?? `The ${v.label} screen of ${domain.productName}.`,
      { x: 1.75, y: 1.72, w: 4.45, h: 0.9, fontSize: 13, bold: true, color: WHITE, fontFace: F, margin: 0, valign: "middle" });
    s.addText((sc?.bullets ?? []).map((b, bi, arr) => ({
      text: b, options: { bullet: { code: "2022" }, breakLine: bi < arr.length - 1 },
    })), { x: 0.95, y: 2.85, w: 5.2, h: 2.0, fontSize: 12.5, color: INK, fontFace: F, paraSpaceAfter: 8 });
    // right: position in the flow
    s.addShape(pres.ShapeType.roundRect, { x: 6.7, y: 1.5, w: 2.8, h: 3.55, rectRadius: 0.08, fill: { color: CARD }, shadow: sh() });
    s.addText("IN THE FLOW", { x: 6.95, y: 1.68, w: 2.3, h: 0.3, fontSize: 9.5, bold: true, color: INK2, charSpacing: 2, fontFace: F, margin: 0 });
    const win = appViews.slice(Math.max(0, Math.min(i - 1, appViews.length - 4)), Math.max(0, Math.min(i - 1, appViews.length - 4)) + 4);
    win.forEach((wv, wi) => {
      const y = 2.05 + wi * 0.72;
      const active = wv.id === v.id;
      s.addShape(pres.ShapeType.roundRect, { x: 6.95, y, w: 2.3, h: 0.58, rectRadius: 0.06, fill: { color: active ? ACCENT_DK : CARD2 }, line: active ? { color: ACCENT, width: 1 } : undefined });
      s.addText(wv.label, { x: 7.1, y, w: 2.0, h: 0.58, fontSize: 10, bold: active, color: active ? ACCENT_TXT : INK2, valign: "middle", fontFace: F, margin: 0 });
    });
  }

  // ---------- Grouped slides: Public / Account+Resources ----------
  s = newSlide();
  const pub = GENERIC_GROUPS.Public;
  TITLE(s, pub.title);
  SUB(s, pub.blurb);
  for (let i = 0; i < byGroup("Public").length; i++) {
    const v = byGroup("Public")[i];
    const x = 0.5 + (i % 3) * 3.15, y = 1.55 + Math.floor(i / 3) * 1.85;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 2.85, h: 1.65, rectRadius: 0.08, fill: { color: CARD }, shadow: sh() });
    s.addImage({ data: await need(v.icon, ACCENT_TXT), x: x + 0.22, y: y + 0.2, w: 0.34, h: 0.34 });
    s.addText(v.label, { x: x + 0.68, y: y + 0.16, w: 2.0, h: 0.42, fontSize: 13, bold: true, color: WHITE, fontFace: F, margin: 0, valign: "middle" });
    s.addText(pub.notes[v.id] ?? "", { x: x + 0.22, y: y + 0.68, w: 2.4, h: 0.85, fontSize: 10.5, color: INK, fontFace: F, margin: 0 });
  }

  s = newSlide();
  TITLE(s, "Account & Resource Pages");
  SUB(s, GENERIC_GROUPS.Account.blurb);
  const acctRes = [...byGroup("Account"), ...byGroup("Resources")];
  for (let i = 0; i < acctRes.length; i++) {
    const v = acctRes[i];
    const notes = { ...GENERIC_GROUPS.Account.notes, ...GENERIC_GROUPS.Resources.notes };
    const x = 0.5 + (i % 4) * 2.37, y = 1.55 + Math.floor(i / 4) * 1.85;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 2.2, h: 1.65, rectRadius: 0.08, fill: { color: CARD }, shadow: sh() });
    s.addImage({ data: await need(v.icon, v.group === "Resources" ? GRAD_TXT : ACCENT_TXT), x: x + 0.2, y: y + 0.18, w: 0.32, h: 0.32 });
    s.addText(v.label, { x: x + 0.2, y: y + 0.55, w: 1.85, h: 0.4, fontSize: 11.5, bold: true, color: WHITE, fontFace: F, margin: 0 });
    s.addText(notes[v.id] ?? "", { x: x + 0.2, y: y + 0.92, w: 1.85, h: 0.65, fontSize: 9, color: INK2, fontFace: F, margin: 0 });
  }

  // ---------- Closing: theme + run instructions ----------
  s = newSlide();
  TITLE(s, "Your Theme, Ready to Run");
  s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.35, w: 4.35, h: 3.7, rectRadius: 0.08, fill: { color: CARD }, shadow: sh() });
  s.addImage({ data: await need("Palette", ACCENT_TXT), x: 0.85, y: 1.62, w: 0.45, h: 0.45 });
  s.addText("BAKED-IN THEME", { x: 1.45, y: 1.7, w: 3, h: 0.35, fontSize: 12, bold: true, color: ACCENT_TXT, charSpacing: 1, fontFace: F, margin: 0 });
  ([[theme.accent, "Primary accent"], [theme.grad, "Gradient end"]] as const).forEach(([hex, label], i) => {
    const y = 2.35 + i * 0.95;
    s.addShape(pres.ShapeType.roundRect, { x: 0.85, y, w: 0.78, h: 0.78, rectRadius: 0.08, fill: { color: hexNo(hex) }, line: { color: LINE, width: 1 } });
    s.addText(label, { x: 1.8, y: y + 0.05, w: 2.8, h: 0.35, fontSize: 12.5, bold: true, color: WHITE, fontFace: F, margin: 0 });
    s.addText(hex.toUpperCase(), { x: 1.8, y: y + 0.4, w: 2.8, h: 0.32, fontSize: 11, color: INK2, fontFace: F, margin: 0 });
  });
  s.addText("Change it later in src/index.css (--accent-rgb, --grad-rgb). Light & dark mode included.",
    { x: 0.85, y: 4.3, w: 3.7, h: 0.65, fontSize: 10.5, color: INK, fontFace: F, margin: 0 });
  s.addShape(pres.ShapeType.roundRect, { x: 5.15, y: 1.35, w: 4.35, h: 3.7, rectRadius: 0.08, fill: { color: ACCENT_DK }, line: { color: ACCENT, width: 1 }, shadow: sh() });
  s.addImage({ data: await need("Rocket", WHITE), x: 5.5, y: 1.62, w: 0.45, h: 0.45 });
  s.addText("RUN IT", { x: 6.1, y: 1.7, w: 3, h: 0.35, fontSize: 12, bold: true, color: WHITE, charSpacing: 1, fontFace: F, margin: 0 });
  s.addText([
    { text: "npm install", options: { breakLine: true } },
    { text: "npm run dev", options: {} },
  ], { x: 5.5, y: 2.3, w: 3.65, h: 0.9, fontSize: 15, bold: true, color: WHITE, fontFace: "Courier New", margin: 0, fill: { color: BG }, paraSpaceAfter: 4 });
  s.addText("Vite + React + TypeScript + Tailwind. Every screen is interactive with mock data — see README.md for what to wire up next (APIs, auth, routing, real data).",
    { x: 5.5, y: 3.45, w: 3.65, h: 1.4, fontSize: 11.5, color: WHITE, fontFace: F, margin: 0 });

  return (await pres.write({ outputType: "blob" })) as Blob;
}
