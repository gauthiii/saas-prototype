// scripts/check-contrast.mjs — WCAG AA guard for every design style.
// Resolves the colour tokens from src/index.css + src/design/styles.css per style and mode
// (mirroring the cascade), then checks text tokens against their surfaces. Translucent
// surfaces are composited over the page background AND over the brightest/most saturated
// backdrop blob colours they can sit on, and the worst case is reported.
// Run: node scripts/check-contrast.mjs   (exits 1 on any failure)
import fs from "node:fs";

const read = p => fs.readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const block = (css, selector) => {
  const out = {};
  const re = new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*\\{([^}]*)\\}", "g");
  for (const m of css.matchAll(re)) for (const d of m[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[d[1]] = d[2].trim();
  return out;
};

function parseColor(v) {
  v = v.trim();
  let m;
  if ((m = v.match(/^#([0-9a-f]{3,8})$/i))) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map(c => c + c).join("");
    const n = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
    return [...n, h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
  }
  if ((m = v.match(/^rgba?\(([^)]+)\)$/))) {
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2], p[3] ?? 1];
  }
  return null;
}
const over = (top, bottom) => top.slice(0, 3).map((c, i) => c * top[3] + bottom[i] * (1 - top[3])).concat(1);
const lum = ([r, g, b]) => {
  const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const base = read("src/index.css");
const styles = read("src/design/styles.css");
const ids = [...new Set([...styles.matchAll(/\[data-style="([\w-]+)"\]/g)].map(m => m[1]))];
const darkOnly = new Set(["cyber", "pro-dark"]);
// Backdrop colours a translucent surface may sit on (blobs use the default theme accent/grad).
const BLOBS = ["#1f80ff", "#7c3aed", "#22d3ee", "#38bdf8", "#34d399", "#f43f5e", "#f59e0b"].map(parseColor);

let failures = 0;
const rows = [];
for (const id of ids) {
  for (const mode of darkOnly.has(id) ? ["dark"] : ["light", "dark"]) {
    const t = { ...block(base, ":root"), ...(mode === "dark" ? block(base, ".dark") : {}), ...block(styles, `[data-style="${id}"]`), ...(mode === "dark" ? block(styles, `[data-style="${id}"].dark`) : {}) };
    const bg = parseColor(t["--bg"]);
    const behind = [bg, ...(parseColor(t["--surface"])[3] < 1 ? BLOBS.map(b => over([...b.slice(0, 3), mode === "dark" ? 0.45 : 0.75], bg)) : [])];
    const worst = (fg, surfaceToken) => {
      const s = parseColor(t[surfaceToken]);
      return Math.min(...behind.map(b => ratio(parseColor(t[fg]), over(s, b))));
    };
    const checks = {
      "ink/surface": worst("--ink", "--surface"),
      "ink-2/surface": worst("--ink-2", "--surface"),
      "ink-2/surface-2": worst("--ink-2", "--surface-2"),
      "ink-2/bg": ratio(parseColor(t["--ink-2"]), bg),
    };
    for (const [k, v] of Object.entries(checks)) {
      const ok = v >= 4.5;
      if (!ok) failures++;
      rows.push(`${ok ? "PASS" : "FAIL"}  ${id.padEnd(13)} ${mode.padEnd(5)} ${k.padEnd(16)} ${v.toFixed(2)}:1`);
    }
  }
}
console.log(rows.filter(r => r.startsWith("FAIL")).join("\n") || "All text tokens meet WCAG AA (4.5:1).");
console.log(`${rows.length} checks across ${ids.length} styles, ${failures} failure(s). Lowest: ${rows.map(r => [r, parseFloat(r.split(/\s+/).at(-1))]).sort((a, b) => a[1] - b[1])[0][0]}`);
process.exit(failures ? 1 : 0);
