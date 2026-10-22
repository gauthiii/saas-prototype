# Contributing to ForgeUI

Thank you for your interest in contributing! We welcome contributions from everyone.

## Getting started

```bash
git clone https://github.com/gauthiii/saas-prototype.git
cd saas-prototype
npm install          # Node 20.19+ or 22.12+
npm run dev
git checkout -b feature/your-feature-name
```

## Checks (run before every PR)

```bash
npm run check        # tsc + WCAG contrast guard + industry validator + render smoke test
npm run build        # production build
```

| Script | What it verifies |
|---|---|
| `npm run check:contrast` | every design style meets WCAG AA text contrast in light and dark |
| `npm run validate [id …]` | every industry's manifest + data obey the structural rules (counts, ranges, matrix shapes, cross-references) |
| `npm run smoke [id …]` | server-renders every view of every industry (and each page variant) and reports any that throw |
| `npm run verify:export <id> <outDir> [style] [shell]` | writes that industry's export to `outDir` so you can `npm install && npm run build` it |

## Architecture in one minute

```
src/
  industries/<id>/manifest.ts   light metadata — label, icon, parent, styles, 12 screens (id/label/icon/archetype)
  industries/<id>/data.ts       content — meta, extra, deck story, shared-page data, data for each screen
  industries/types.ts           the contract; defineData() makes tsc reject missing or wrongly-shaped screens
  industries/views.tsx          builds the 33-screen flow from a manifest and renders any view
  industries/catalog.ts         discovers every folder (eager manifests, lazy data → one chunk per industry)
  kit/                          25 archetype screens + Workspace & Utility pages
  design/                       16 styles (styles.css), registry (styles.ts), design context, backdrop
  shell/AppFrame.tsx            sidebar / top-nav / icon-rail / mobile shells
  domains/                      the 11 original hand-coded domains + shared marketing/account pages
  export/                       Vite zip + PPTX deck generators
```

## Adding an industry or sub-category

1. Create `src/industries/<id>/manifest.ts` with `defineManifest({...})`:
   - `parent` set for a sub-category (one level only); `order` sorts it among its siblings.
   - `styles.default` + 3 `styles.recommended` from the 16 style ids.
   - exactly 12 `screens`, at least 9 distinct archetypes, ids not in `RESERVED_IDS` (see `views.tsx`).
2. Create `src/industries/<id>/data.ts` with `export default defineData(manifest, {...})`.
   Use `src/industries/realestate/` as the reference for depth and tone. Icons must exist in `src/lib/iconMap.ts`.
3. Run `npm run validate <id>` and `npx tsc --noEmit` until both are clean.

That's it — navigation, the ⌘K palette, the Industry library, the deck and the export all pick it up automatically.

### Extending a hand-coded domain

Hand-coded domains (`bespoke` in their manifest) keep their components in `src/domains/<module>.tsx`.
Add archetype screens to their manifest's `screens` and the matching data to their `data.ts` (no meta/extra/story).

## Adding a design style

See [docs/DESIGN-STYLES.md](docs/DESIGN-STYLES.md#adding-a-style).

## Code style

- TypeScript strict; follow existing conventions; keep comments sparse and useful.
- Components use design tokens (`var(--surface)`, `rounded-xl` → `--r-xl`, `ink-2`…) — never literal colours for surfaces or text.
- Target ES2020 APIs (exported projects compile without extra lib typings — e.g. no `Array.prototype.at`).
- All content is fictional — no real company names or real people.

## Submitting a pull request

Keep commits atomic with clear messages, describe what changed and why, and reference related issues.

## Code of conduct

Please be respectful and constructive in all interactions. We value diversity and inclusion.
