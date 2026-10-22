# ForgeUI — Industry Template Builder

A high-fidelity UI prototype builder built with **React 19 + Vite 8 + TypeScript + Tailwind CSS**.
Pick an industry (⌘K), pick a design style, and ForgeUI renders a complete, interactive product —
marketing pages, 12+ app screens, workspace and account pages — that you can export as a runnable Vite project.

| | |
|---|---|
| **Industries** | 23 industries · 69 sub-categories · 92 templates |
| **Screens** | 33+ per template — 13 marketing/account pages, 12+ industry app screens, 8 workspace & utility pages |
| **Design styles** | 16 — Minimal, Modern, Glassmorphism, Neumorphism, Liquid Glass, Aurora, Colorful, Claymorphism, Neo-Brutalism, Bento, Retro/Y2K, Cyber/Terminal, Enterprise, Clinical, Editorial/Swiss, Pro Dark |
| **Layouts** | 4 app shells (sidebar, top nav, icon rail, mobile app) · 3 home heroes · 3 sign-in layouts · 3 pricing layouts |
| **Export** | Vite + React + TS project zip with your style, shell, layouts and colours baked in, plus a PPTX walkthrough deck |

## Industries

| Industry | Sub-categories |
|---|---|
| FinTech | Banking · Payments & Wallets · Wealth & Investing |
| HealthTech | Dental Clinics · Mental Health · Pharmacy |
| IT / DevOps | Observability & APM · IT Service Desk · Data & ML Platform |
| HRTech | Payroll & Benefits · Workforce Scheduling · Performance & Engagement |
| EdTech | K-12 Schools · Higher Education · Corporate L&D |
| RetailTech | Fashion & Apparel · Grocery & Quick Commerce · Online Marketplace |
| Energy | Fossil Fuel · Renewable Energy · Nuclear Energy |
| Real Estate | Residential Brokerage · Commercial Leasing · Property Management |
| Logistics & Supply Chain | Freight & Trucking · Warehousing & WMS · Last-Mile Delivery |
| Insurance | Auto Insurance · Health Insurance · Life & Annuities |
| Legal | Law Firm Practice · Contract Lifecycle · IP & Patents |
| Travel & Hospitality | Hotels & Resorts · Airlines · Tours & Experiences |
| Manufacturing | Smart Factory (MES) · Process & Chemicals · Electronics Assembly |
| Media & Streaming | Video Streaming · Music & Podcasts · News & Publishing |
| Automotive & Mobility | Car Dealerships · EV Charging · Ride-hailing & Fleet |
| AgriTech | Crop Farming · Livestock & Dairy · Agri Marketplace |
| GovTech & Public Sector | Citizen Services · Smart City · Public Safety & 911 |
| Telecom | Mobile Carrier · Broadband & ISP · Network Operations |
| Cybersecurity | SOC & SIEM · Identity & Access · AppSec & Vulnerability |
| Food & Restaurant | Restaurant Ops & POS · Food Delivery · Cloud Kitchens |
| Fitness & Wellness | Gyms & Studios · Spa & Wellness · Nutrition & Coaching |
| Crypto & Web3 | Crypto Exchange · DeFi & Wallets · NFT & Digital Collectibles |
| Marketing & CRM | Sales CRM · Email & Lifecycle · Social Media Management |

All companies, products, people and figures in the templates are fictional.

## Run it

Requirements: **Node.js 20.19+ or 22.12+** and npm.

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build        # type-check + production build
npm run preview      # serve the build
npm run check        # tsc + contrast guard + industry validator + render smoke test
```

## Using the builder

- **⌘K / Ctrl+K** — jump to any industry, sub-category, screen or style. The grid button opens the **Industry library**.
- **Paintbrush** — the **Design Studio**: *Style* (Auto follows the industry's default; recommended styles are badged),
  *Colour* (accent + gradient), *Layout* (shell, hero, sign-in, pricing). Changes are live, saved locally and written to the URL —
  copy the address bar to share a design.
- **Eye** — preview the exported app flow. **Export** — download the Vite project + walkthrough deck.
- Light/dark toggle (Cyber and Pro Dark are dark-only).

## Project structure

```
src/
  App.tsx                    builder shell: routing, design state, palette, studio, export
  industries/
    types.ts                 contract: 25 archetypes, shared-page data, Manifest, defineData()
    views.tsx                manifest → 33-screen flow; renders any view (shared with exports)
    catalog.ts               discovers industries (eager manifests, lazy data)
    <id>/manifest.ts         label, icon, parent, styles, 12 screens
    <id>/data.ts             all content for that industry
  kit/                       archetype screens + Workspace & Utility pages
  design/                    styles.css (16 styles), styles.ts, design context, backdrop
  shell/AppFrame.tsx         sidebar / top-nav / icon-rail / mobile shells
  domains/                   the 11 original hand-coded domains + shared marketing/account pages
  export/                    Vite zip + PPTX deck generators
  components/                UI primitives, charts, AI panel, Design Studio, palette, gallery
scripts/                     check-contrast · validate-industries · smoke-render · verify-export
docs/DESIGN-STYLES.md        how styles work, accessibility, sources
```

See [CONTRIBUTING.md](CONTRIBUTING.md) to add an industry or a style.

## Package the source as a zip

```bash
node bundle.js
```

Creates `app-prototype.zip` next to the project (excludes `node_modules`, `dist`, `.git`).

---

> **Notice:** ForgeUI produces interactive UI prototypes backed by mock data. Backends, authentication and real APIs must be wired up separately.
