// src/design/design.tsx — design selection (style + layout variants) shared via context.
// Components read it with useDesign(); outside a provider they get DEFAULT_DESIGN, so
// shared pages keep working in exported projects and isolated renders.
import { createContext, useContext } from "react";
import type { HeroId, PricingId, ShellId, SigninId, StyleId } from "./styles";
import { STYLE_IDS } from "./styles";

export type Design = {
  /** "auto" resolves to the active industry's default style. */
  style: StyleId | "auto";
  shell: ShellId;
  hero: HeroId;
  signin: SigninId;
  pricing: PricingId;
};

export const DEFAULT_DESIGN: Design = { style: "auto", shell: "sidebar", hero: "centered", signin: "card", pricing: "cards" };

const OPTIONS: { [K in keyof Design]: readonly string[] } = {
  style: ["auto", ...STYLE_IDS],
  shell: ["sidebar", "topnav", "rail", "mobile"],
  hero: ["centered", "split", "bento"],
  signin: ["card", "split", "fullbleed"],
  pricing: ["cards", "table", "slider"],
};

/** Keep only known values; anything else falls back to the default. */
export function sanitizeDesign(input: Partial<Record<keyof Design, unknown>>): Design {
  const out = { ...DEFAULT_DESIGN } as Record<keyof Design, string>;
  for (const key of Object.keys(OPTIONS) as (keyof Design)[]) {
    const v = input[key];
    if (typeof v === "string" && OPTIONS[key].includes(v)) out[key] = v;
  }
  return out as Design;
}

const STORAGE_KEY = "forgeui-design";

export function loadDesign(search: URLSearchParams): Design {
  let saved: Partial<Design> = {};
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}"); } catch { /* corrupt storage */ }
  const fromUrl: Partial<Record<keyof Design, string>> = {};
  for (const key of Object.keys(OPTIONS) as (keyof Design)[]) {
    const v = search.get(key);
    if (v) fromUrl[key] = v;
  }
  return sanitizeDesign({ ...saved, ...fromUrl });
}

export function saveDesign(d: Design) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch { /* storage unavailable */ }
}

/** Only non-default values go in the URL so shared links stay short. */
export function designToSearch(d: Design): string {
  const p = new URLSearchParams();
  for (const key of Object.keys(OPTIONS) as (keyof Design)[]) {
    if (d[key] !== DEFAULT_DESIGN[key]) p.set(key, d[key]);
  }
  const s = p.toString();
  return s ? `?${s}` : "";
}

export function resolveStyle(d: Design, industryDefault: StyleId): StyleId {
  return d.style === "auto" ? industryDefault : d.style;
}

/** Writes the resolved style onto <html> so styles.css can take over. */
export function applyStyle(style: StyleId) {
  document.documentElement.dataset.style = style;
}

export const DesignContext = createContext<Design>(DEFAULT_DESIGN);
export const useDesign = () => useContext(DesignContext);
