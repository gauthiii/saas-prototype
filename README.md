# ForgeUI — Domain Template Builder (Frontend Prototype)

A premium, high-fidelity SaaS UI prototype built with **React + Vite + TypeScript + Tailwind CSS**.
Pick a domain from the dropdown in the header and ForgeUI renders the full specialized template for it:

| Domain | Generated screens |
|---|---|
| **FinTech** | Treasury dashboard (cash flow chart, balance cards, transaction ledger + detail drawer), multi-step invoice form, analytics |
| **HealthTech** | Vitals dashboard, EHR timeline, prescription queue, ER triage board, appointment scheduler grid |
| **IT / DevOps** | Live-streaming log viewer with severity coloring, infra health grid, latency graphs, incident Kanban board |
| **HRTech (ATS)** | Multi-column candidate pipeline, resume preview drawer, interviewer scorecards, job posting form |
| **EdTech (LMS)** | Curriculum progress map, video player interface, interactive quiz with instant feedback, skills radar chart |

Every screen supports **Light Mode** and an obsidian **Dark Mode** (toggle in the header), with CSS-transition micro-interactions, skeleton loading states, and animated slide-out detail panels. An **AI Insights** panel is embedded per domain with confidence meters and a regenerate action.

## Prerequisites
- Node.js 18+ and npm

## Run it
```bash
npm install
npm run dev
```
Open the printed local URL (default `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Package the project as a zip
```bash
node bundle.js
```
Creates `app-prototype.zip` next to the project (excludes `node_modules`, `dist`, and the zip itself), using only native Node `fs` + `zlib`.

## Project structure
```
src/
  App.tsx                 App shell: sidebar, domain dropdown, theme + view routing
  index.css               Theme tokens (light/dark) + component utility classes
  components/ui.tsx       Card, Badge, Stat, Drawer, Skeleton, fake-submit hook
  components/charts.tsx   Dependency-free SVG charts (area, bars, sparkline, radar)
  components/AIPanel.tsx  Reusable AI Insights panel
  domains/                One file per domain template
```

---

> **Notice:** This is a premium, high-fidelity interactive UI prototype. Backend integration and live API keys must be wired up manually.
