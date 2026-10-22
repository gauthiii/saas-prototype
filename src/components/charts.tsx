// src/components/charts.tsx
// Hand-rolled SVG charts: zero chart dependencies, fully themeable.
// Colours accept any CSS colour, including theme variables like "rgb(var(--accent-rgb))".
import { useId } from "react";

export const ACCENT = "rgb(var(--accent-rgb))";
export const GRAD = "rgb(var(--grad-rgb))";
/** Categorical series palette: theme accent + gradient first, then fixed hues. */
export const SERIES = [ACCENT, GRAD, "#10b981", "#f59e0b", "#f43f5e", "#06b6d4", "#8b5cf6", "#64748b"];

export function AreaChart({ data, height = 140, stroke = ACCENT, compare }: { data: number[]; height?: number; stroke?: string; compare?: number[] }) {
  const w = 100, h = 40;
  const all = compare ? [...data, ...compare] : data;
  const max = Math.max(...all), min = Math.min(...all);
  const toLine = (series: number[]) => series
    .map((v, i) => [(i / (series.length - 1)) * w, h - ((v - min) / (max - min || 1)) * (h - 6) - 2])
    .map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
  const line = toLine(data);
  const area = `${line} L${w},${h} L0,${h} Z`;
  const id = `g${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height }} role="img" aria-label="Trend chart">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity=".35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      {compare && <path d={toLine(compare)} fill="none" stroke="var(--ink-2)" strokeWidth=".7" strokeDasharray="2 1.5" vectorEffect="non-scaling-stroke" opacity=".6" />}
      <path d={line} fill="none" stroke={stroke} strokeWidth=".9" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
    </svg>
  );
}

export function Bars({ data, height = 120, color = ACCENT }: { data: { label: string; value: number }[]; height?: number; color?: string }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map(d => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
          <div
            className="w-full rounded-t-md transition-all duration-300 group-hover:opacity-80"
            style={{ height: `${(d.value / max) * 85}%`, background: color, minHeight: 4 }}
            title={`${d.label}: ${d.value}`}
          />
          <div className="text-[10px] ink-2 font-medium">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

export function Sparkline({ data, color = "#10b981" }: { data: number[]; color?: string }) {
  const w = 60, h = 18;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Donut({ segments, size = 140, label, sublabel }: { segments: { value: number; color: string; name: string }[]; size?: number; label?: string; sublabel?: string }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = 15.9155, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 42 42" width={size} height={size} role="img" aria-label="Donut chart">
      <circle cx="21" cy="21" r={r} fill="none" stroke="var(--line)" strokeWidth="4" />
      {segments.map(s => {
        const frac = s.value / total;
        const el = (
          <circle key={s.name} cx="21" cy="21" r={r} fill="none" stroke={s.color} strokeWidth="4"
            strokeDasharray={`${(frac * c).toFixed(2)} ${c.toFixed(2)}`}
            strokeDashoffset={(-offset * c).toFixed(2)}
            transform="rotate(-90 21 21)" strokeLinecap="butt" />
        );
        offset += frac;
        return el;
      })}
      {label && <text x="21" y="21" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="var(--ink)" fontFamily="var(--font-body)">{label}</text>}
      {sublabel && <text x="21" y="27" textAnchor="middle" fontSize="3.2" fill="var(--ink-2)" fontFamily="var(--font-body)">{sublabel}</text>}
    </svg>
  );
}

export function Radar({ axes, values, size = 220, color = ACCENT }: { axes: string[]; values: number[]; size?: number; color?: string }) {
  const c = 50, r = 38, n = axes.length;
  const pt = (i: number, scale: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [c + Math.cos(a) * r * scale, c + Math.sin(a) * r * scale];
  };
  const poly = (scale: number) => Array.from({ length: n }, (_, i) => pt(i, scale).map(v => v.toFixed(1)).join(",")).join(" ");
  const valPoly = values.map((v, i) => pt(i, v / 100).map(x => x.toFixed(1)).join(",")).join(" ");
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Radar chart">
      {[1, .75, .5, .25].map(s => (
        <polygon key={s} points={poly(s)} fill="none" stroke="var(--line)" strokeWidth=".4" />
      ))}
      {axes.map((a, i) => {
        const [x, y] = pt(i, 1.18);
        return <text key={a} x={x} y={y} fontSize="4.2" textAnchor="middle" fill="var(--ink-2)" fontFamily="var(--font-body)">{a}</text>;
      })}
      <polygon points={valPoly} fill={color} fillOpacity=".25" stroke={color} strokeWidth=".8" strokeLinejoin="round" />
      {values.map((v, i) => {
        const [x, y] = pt(i, v / 100);
        return <circle key={i} cx={x} cy={y} r="1.3" fill={color} />;
      })}
    </svg>
  );
}
