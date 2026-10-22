# Changelog

All notable changes to ForgeUI are documented here.  
Format: `[version] YYYY-MM-DD — description`

---

## [2.0.0] — 2026-10-21

### Added
- **16 design styles** in four sets — Core (Minimal, Modern, Glassmorphism, Neumorphism), Expressive (Liquid Glass, Aurora, Colorful, Claymorphism), Bold (Neo-Brutalism, Bento, Retro/Y2K, Cyber/Terminal) and Industry-specialist (Enterprise, Clinical, Editorial/Swiss, Pro Dark). Pure CSS + SVG token layers (`src/design/styles.css`) that restyle every screen; recipes and sources in `docs/DESIGN-STYLES.md`.
- **Per-industry styles** — every industry has a default style plus three recommended alternatives; "Auto" follows the industry as you navigate.
- **Design Studio** (replaces Theme Studio) — Style / Colour / Layout tabs with live preview; choices persist to localStorage and sync to the URL (`?style=glass&shell=rail…`) so a design can be shared.
- **App shells** — sidebar, top nav, icon rail and a mobile-app phone frame.
- **Page variants** — home hero (centered / split with mockup / bento), sign-in (card / split screen / full-bleed) and pricing (plan cards / comparison table / usage slider).
- **16 new industries** — Real Estate, Logistics, Insurance, Legal, Travel & Hospitality, Manufacturing, Media & Streaming, Automotive & Mobility, AgriTech, GovTech, Telecom, Cybersecurity, Food & Restaurant, Fitness & Wellness, Crypto & Web3, Marketing & CRM — each with 3 sub-categories.
- **17 new sub-categories for existing industries** (FinTech, HealthTech, DevOps, HRTech, EdTech, RetailTech), for exactly 3 per industry: 23 industries and 69 sub-categories.
- **Archetype kit** (`src/kit/`) — 25 data-driven screen archetypes; every new industry has 12 app screens using 9+ archetypes, defined by a typed `manifest.ts` + `data.ts` pair (`src/industries/<id>/`).
- **Extension screens for the 11 original domains** so each reaches 12+ app screens, keeping their hand-coded screens untouched.
- **8 shared pages for every industry** — Onboarding, Team & roles, Billing & invoices, Inbox (Workspace) and Search results, Calendar, Reports, Empty & error states (Utilities).
- **⌘K command palette** (industries, screens, styles) and an **Industry library** page (`/industries`).
- **Checks** — `npm run check:contrast` (WCAG AA for every style × mode), `npm run validate` (industry structure), `npm run smoke` (server-renders all 3,000+ screens), `npm run verify:export` (headless export for build testing), `npm run check` (all of the above + tsc).

### Changed
- Upgraded React 18 → 19, Vite 5 → 8, @vitejs/plugin-react 4 → 6, lucide-react 0.383 → 1.61, plus patch/minor bumps (react-router-dom, jszip, autoprefixer, postcss). Tailwind 4 and TypeScript 7 are deferred to a separate pass.
- Industries are discovered from `src/industries/*/` and lazy-loaded (one chunk each) instead of being bundled eagerly; the old `src/export/registry.ts` is replaced by manifests.
- Radius, typography and shadow scales are CSS tokens (`--r-*`, `--font-*`, `--shadow-*`), so styles reach hand-coded screens too.
- Exported projects carry the chosen style, shell and page variants, load only that style's fonts, pin the builder's dependency versions, and include a Workspace & Utility slide in the walkthrough deck.
- Charts accept theme CSS variables (`rgb(var(--accent-rgb))`) and gained a comparison series.
- `dist/` is no longer tracked (CI builds it); `.DS_Store` is ignored.

### Fixed
- GitHub Pages deep links: router `basename` from `BASE_URL` and a `404.html` SPA fallback in the Pages workflow.
- Renewable Energy's "Home battery & EV" screen was unreachable because its id collided with the Home page (`home` → `homeenergy`).
- Style is applied before first paint (no flash of the previous style).
- `version.ts` 1.9.0 now references the commit that shipped it (`e67c5e3`).
- About page brand icon: lucide 1.x removed brand marks, so the LinkedIn glyph is inlined.

### Known
- `npm audit` still reports advisories in `tailwindcss@3` (braces, postcss-selector-parser — resolved by the deferred Tailwind 4 upgrade) and `pptxgenjs@4.0.1` (image-size; the only offered fix downgrades pptxgenjs).

---

## [Unreleased] — 2026-06-29

### Fixed
- **B3** Added top-level `ErrorBoundary` in `main.tsx` — prevents blank white screen on component lookup failures; shows a friendly error message with a "Try again" button instead.
- **B1** ZIP download now reliably completes on Safari — deferred blob URL revoke via `setTimeout` so the browser can fetch the blob before it's released.
- **C1** About page feature card now correctly advertises 11 domain templates and lists all current domains.
- **C2** About page domain picker mock updated to show all 11 domains (was showing only original 5).
- **B7 + Q1** Extracted shared icon registry to `src/lib/iconMap.ts` — deck exports for Energy, Banking, and Retail domains now use correct icons instead of a Sparkles fallback; eliminated icon map duplication between `App.tsx` and `generateDeck.ts`.
- **U1 + U2** Added `react-router-dom` — domain and view are now encoded in the URL (e.g. `/fintech/dashboard`); deep links, browser back/forward, and page refresh all preserve your position.
- **U3** Mobile navigation now uses a two-row layout: group chips on row 1, view pills for the active group on row 2 — replaces the previous flat 23-tab horizontal scroll.
- **M5** Dark mode preference is now persisted to `localStorage` — toggling dark/light mode survives page reloads.
- **U4** Preview (Eye) button moved to the top toolbar — accessible from any view group, not just "Public".
- **U5** ThemeStudio draft now syncs when the active theme changes externally — reopening the modal no longer shows stale values.
- **U6** ThemeStudio Apply now closes the modal automatically after a 900 ms confirmation window.
- **C3** ThemeStudio preset buttons now show a ring + checkmark indicator on the currently active preset.
- **U7** Removed non-functional "Apply" button from AI insight cards — no longer creates false expectation of actionable insights.
- **M4** AI Panel Regenerate now shuffles and cycles through insights on each click instead of repeating identical content.
- **U10** App Preview now scrolls to top when navigating between screens.
- **B4** Fixed stale closure in App Preview keyboard handler — `prev`/`next` added to `useEffect` dependency array.
- **B5** `hexToRgbTriple` now validates hex input and falls back to the default accent color for malformed values; `loadTheme` rejects invalid hex from `localStorage`.
- **B6** `injectTheme` now logs a console warning if any CSS variable pattern fails to match — prevents silent default-theme shipping in exported projects.
- **B2** Deck export flow-overview slide no longer overflows for large domains — `perRow` scales to 5 and pill width narrows when there are >12 App screens; excess pills are summarised as "+ N more screens".
- **C5** Energy sub-domains Renewable and Nuclear now display `Sparkline` trend charts in their cluster/unit list rows, matching the pattern in Fossil and EnergyTech.
- **C6** Added optional `slideNotes` field to `DomainStory` — Nuclear domain now ships domain-specific copy for all generic group slides instead of the default app-agnostic text.

### Refactored
- **Q2** Replaced deprecated `JSX.Element` type with `ReactElement` (from `react`) in `energytech.tsx`, `devops.tsx`, and the generated `App.tsx` template in `generate.ts`.
- **Q3** `MODULES` map in `App.tsx` is now typed `Record<string, Record<string, ComponentType>>` — removed unsafe `as ComponentType` cast.
- **Q4** About page preset swatches now derive colors from `THEME_PRESETS` in `theme.ts` instead of hardcoded hex values — swatches now always match the real theme definitions.
- **Q5** Emoji feature icons in `pages.tsx` now have `role="img"` and `aria-label` — screen readers no longer read raw emoji strings unpredictably.
- **Q6** `useFakeSubmit` now auto-resets to `"idle"` after 1500 ms in the `"done"` state — buttons can no longer get stuck in the done state if callers forget to call `reset()`.
- **Q7** `DomainStory.stats` is now typed as a 3-tuple (`[[string, string], [string, string], [string, string]]`) — TypeScript enforces exactly 3 stats and prevents slide overflow in the deck export.

### Improved
- **U7** Removed non-functional "Apply" button from AI insight cards — no false affordance.
- **U8** `VersionHistory` back button label is now a `backLabel` prop (default `"Back"`) — context-aware if the component is reused elsewhere.
- **U9** Footer copyright year is now `new Date().getFullYear()` in both `About.tsx` and `VersionHistory.tsx` — always current, never stale.
- **C4** `version.ts` newest entry commit hash replaced with real SHA — Version History no longer shows `"local"` to end users.
- **M2** Export progress modal shows labeled stages ("Generating slides…", "Compressing files…") with a spinner overlay — no more silent wait during export.
- **M3** Domain picker now supports full keyboard navigation: `ArrowDown`/`ArrowUp` cycles results, `Enter` selects, `Escape` closes.
- **B4** `AppPreview` keyboard handler `useEffect` now includes `prev` and `next` in its dependency array — stale closure on arrow-key navigation is eliminated.
- **B5** `hexToRgbTriple` validates hex input and falls back to default accent RGB for malformed values; `loadTheme` rejects invalid hex strings from `localStorage`.
- **B6** `injectTheme` now tracks whether each CSS variable replacement matched and logs a `console.warn` if any pattern misses — exported project no longer silently ships the default theme.

