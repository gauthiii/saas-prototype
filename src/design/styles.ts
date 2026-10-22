// src/design/styles.ts — the 16 design styles (visual languages) and layout variants.
// Each style is a pure-CSS layer in styles.css keyed by <html data-style="…">, so it
// restyles every screen (bespoke and archetype) without touching component code.

export type StyleId =
  | "minimal" | "modern" | "glass" | "neumorphism"
  | "liquid-glass" | "aurora" | "colorful" | "clay"
  | "brutalism" | "bento" | "retro" | "cyber"
  | "enterprise" | "clinical" | "editorial" | "pro-dark";

export type StyleSet = "Core" | "Expressive" | "Bold" | "Industry";

export type StyleDef = {
  id: StyleId;
  name: string;
  set: StyleSet;
  description: string;
  /** Swatch for picker cards: [background, surface, accent-ish highlight]. */
  swatch: [string, string, string];
  /** Styles that only make sense in one colour mode lock it while active. */
  mode?: "dark" | "light";
  /** Google Fonts css2 `family=` values this style needs (exports load only these). */
  fonts: string[];
};

const F = {
  inter: "Inter:wght@100..900", geist: "Geist:wght@100..900", geistMono: "Geist+Mono:wght@400;500",
  jbm: "JetBrains+Mono:wght@400;500;600;700", grotesk: "Space+Grotesk:wght@400;500;600;700", jakarta: "Plus+Jakarta+Sans:wght@400;500;600;700;800",
  nunito: "Nunito:wght@400;600;700;800;900", outfit: "Outfit:wght@400;500;600;700;800", dmSans: "DM+Sans:wght@400;500;700;800",
  silkscreen: "Silkscreen:wght@400;700", vt323: "VT323", plex: "IBM+Plex+Sans:wght@400;500;600;700", plexMono: "IBM+Plex+Mono:wght@400;500",
  lexend: "Lexend:wght@400;500;600;700", atkinson: "Atkinson+Hyperlegible:wght@400;700", serif: "Instrument+Serif:ital@0;1",
};

export const STYLES: StyleDef[] = [
  { id: "minimal", name: "Minimal", set: "Core", description: "Hairline borders, no shadows, generous whitespace.", swatch: ["#ffffff", "#fafafa", "#111111"], fonts: [F.geist, F.geistMono] },
  { id: "modern", name: "Modern", set: "Core", description: "The refreshed ForgeUI default — soft depth, rounded cards.", swatch: ["#f5f7fb", "#ffffff", "#1f80ff"], fonts: [F.grotesk, F.inter, F.jbm] },
  { id: "glass", name: "Glassmorphism", set: "Core", description: "Frosted translucent panels over soft colour blobs.", swatch: ["#c7d2fe", "#ffffffaa", "#6366f1"], fonts: [F.jakarta, F.jbm] },
  { id: "neumorphism", name: "Neumorphism", set: "Core", description: "Soft extruded surfaces carved from one base colour.", swatch: ["#e6e9ef", "#e6e9ef", "#5b6b8c"], fonts: [F.nunito, F.jbm] },
  { id: "liquid-glass", name: "Liquid Glass", set: "Expressive", description: "Refractive glass with specular rims and lensing edges.", swatch: ["#7dd3fc", "#ffffff66", "#0ea5e9"], fonts: [F.geist, F.inter, F.jbm] },
  { id: "aurora", name: "Aurora", set: "Expressive", description: "Slow animated gradient mesh behind calm surfaces.", swatch: ["#1e1b4b", "#312e81", "#22d3ee"], fonts: [F.outfit, F.inter, F.jbm] },
  { id: "colorful", name: "Colorful", set: "Expressive", description: "Vibrant gradients, bold accents, playful energy.", swatch: ["#fff7ed", "#ffffff", "#f43f5e"], fonts: [F.outfit, F.jakarta, F.jbm] },
  { id: "clay", name: "Claymorphism", set: "Expressive", description: "Puffy pastel surfaces with inner highlights.", swatch: ["#fdf2f8", "#ffffff", "#a855f7"], fonts: [F.nunito, F.jbm] },
  { id: "brutalism", name: "Neo-Brutalism", set: "Bold", description: "Thick outlines, hard offset shadows, loud colour.", swatch: ["#fef08a", "#ffffff", "#000000"], fonts: [F.dmSans, F.jbm] },
  { id: "bento", name: "Bento", set: "Bold", description: "Tight modular tiles with big radii and clear hierarchy.", swatch: ["#f4f4f5", "#ffffff", "#18181b"], fonts: [F.geist, F.jbm] },
  { id: "retro", name: "Retro / Y2K", set: "Bold", description: "Chrome gradients, pixel accents, desktop-OS nostalgia.", swatch: ["#c0c0c0", "#efefef", "#ff00aa"], fonts: [F.silkscreen, F.grotesk, F.jbm] },
  { id: "cyber", name: "Cyber / Terminal", set: "Bold", description: "Neon on black, mono type, scanlines.", swatch: ["#030712", "#0b1220", "#22ff88"], mode: "dark", fonts: [F.vt323, F.jbm] },
  { id: "enterprise", name: "Enterprise", set: "Industry", description: "Dense, square, trustworthy — built for long sessions.", swatch: ["#f3f4f6", "#ffffff", "#1d4ed8"], fonts: [F.plex, F.plexMono] },
  { id: "clinical", name: "Clinical", set: "Industry", description: "Calm, high-legibility, large targets, soft teal.", swatch: ["#f0fdfa", "#ffffff", "#0d9488"], fonts: [F.lexend, F.atkinson, F.jbm] },
  { id: "editorial", name: "Editorial / Swiss", set: "Industry", description: "Type-led grid, serif headlines, ruled sections.", swatch: ["#faf7f2", "#ffffff", "#b91c1c"], fonts: [F.serif, F.inter, F.jbm] },
  { id: "pro-dark", name: "Pro Dark", set: "Industry", description: "Data-terminal density for trading and operations.", swatch: ["#0b0e14", "#11151d", "#f59e0b"], mode: "dark", fonts: [F.inter, F.jbm] },
];

export const STYLE_IDS = STYLES.map(s => s.id);

export function googleFontsHref(families: string[]): string {
  return `https://fonts.googleapis.com/css2?${Array.from(new Set(families)).map(f => `family=${f}`).join("&")}&display=swap`;
}
/** Every font any style uses — the live builder loads all of them. */
export const ALL_FONTS = Array.from(new Set(STYLES.flatMap(s => s.fonts)));
export const styleById = (id: string): StyleDef | undefined => STYLES.find(s => s.id === id);

// ─── Layout variants ──────────────────────────────────────────────────────────
export type ShellId = "sidebar" | "topnav" | "rail" | "mobile";
export type HeroId = "centered" | "split" | "bento";
export type SigninId = "card" | "split" | "fullbleed";
export type PricingId = "cards" | "table" | "slider";

export const SHELLS: { id: ShellId; name: string; description: string }[] = [
  { id: "sidebar", name: "Sidebar", description: "Grouped navigation in a left sidebar." },
  { id: "topnav", name: "Top nav", description: "Horizontal navigation bar with group menus." },
  { id: "rail", name: "Icon rail", description: "Compact icon rail with a flyout list." },
  { id: "mobile", name: "Mobile app", description: "The app framed as a phone with a bottom tab bar." },
];
export const HEROES: { id: HeroId; name: string }[] = [
  { id: "centered", name: "Centered" }, { id: "split", name: "Split with mockup" }, { id: "bento", name: "Bento grid" },
];
export const SIGNINS: { id: SigninId; name: string }[] = [
  { id: "card", name: "Centered card" }, { id: "split", name: "Split screen" }, { id: "fullbleed", name: "Full-bleed" },
];
export const PRICINGS: { id: PricingId; name: string }[] = [
  { id: "cards", name: "Plan cards" }, { id: "table", name: "Comparison table" }, { id: "slider", name: "Usage slider" },
];
