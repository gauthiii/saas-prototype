// src/theme.ts — runtime theme (accent + gradient) helpers
export type Theme = { accent: string; grad: string };

const INDIGO_THEME: Theme = { accent: "#4f6df5", grad: "#7c3aed" };
const MIDNIGHT_THEME: Theme = { accent: "#1e3a8a", grad: "#111827" };
const LEGACY_DEFAULT_THEMES: Theme[] = [INDIGO_THEME, MIDNIGHT_THEME];

export const DEFAULT_THEME: Theme = { accent: "#1f80ff", grad: "#1f80ff" };

export const THEME_PRESETS: { name: string; theme: Theme }[] = [
  { name: "Electric", theme: DEFAULT_THEME },
  { name: "Indigo", theme: INDIGO_THEME },
  { name: "Midnight", theme: MIDNIGHT_THEME },
  { name: "Emerald", theme: { accent: "#10b981", grad: "#0d9488" } },
  { name: "Rose", theme: { accent: "#f43f5e", grad: "#d946ef" } },
  { name: "Amber", theme: { accent: "#f59e0b", grad: "#ea580c" } },
  { name: "Sky", theme: { accent: "#0ea5e9", grad: "#6366f1" } },
  { name: "Slate", theme: { accent: "#475569", grad: "#334155" } },
];

const STORAGE_KEY = "forgeui-theme";
const STORAGE_VERSION_KEY = "forgeui-theme-version";
const STORAGE_VERSION = "2";

export function hexToRgbTriple(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** Darken a hex color by a factor (0..1) — used to derive the hover/dark accent. */
export function darken(hex: string, f = 0.18): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  const d = (v: number) => Math.max(0, Math.round(v * (1 - f)));
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(d);
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

export function applyTheme(t: Theme) {
  const s = document.documentElement.style;
  s.setProperty("--accent-rgb", hexToRgbTriple(t.accent));
  s.setProperty("--accent-dark-rgb", hexToRgbTriple(darken(t.accent)));
  s.setProperty("--grad-rgb", hexToRgbTriple(t.grad));
}

export function saveTheme(t: Theme) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
  localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
}

export function loadTheme(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = { ...DEFAULT_THEME, ...JSON.parse(raw) };
      const version = localStorage.getItem(STORAGE_VERSION_KEY);
      const wasLegacyDefault = LEGACY_DEFAULT_THEMES.some(t =>
        parsed.accent.toLowerCase() === t.accent &&
        parsed.grad.toLowerCase() === t.grad
      );
      if (version !== STORAGE_VERSION && wasLegacyDefault) {
        saveTheme(DEFAULT_THEME);
        return DEFAULT_THEME;
      }
      return parsed;
    }
  } catch { /* corrupt storage — fall back to default */ }
  return DEFAULT_THEME;
}
