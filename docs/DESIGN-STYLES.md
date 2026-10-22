# Design styles

ForgeUI ships 16 design styles. Each one is a pure-CSS layer in [`src/design/styles.css`](../src/design/styles.css),
switched on by `<html data-style="…">`, so it restyles every screen without touching any component.
The registry (names, sets, swatches, fonts, dark-only flags) lives in [`src/design/styles.ts`](../src/design/styles.ts).

## How a style works

Components never use literal colours, radii or shadows. They read tokens defined in `src/index.css`:

| Token | Purpose |
|---|---|
| `--bg`, `--surface`, `--surface-2`, `--line` | page, card, inset and border colours |
| `--ink`, `--ink-2` | primary and secondary text |
| `--font-display`, `--font-body`, `--font-mono`, `--display-weight`, `--display-tracking` | typography |
| `--r-sm` … `--r-3xl` | the whole radius scale (Tailwind's `rounded-*` classes map to these) |
| `--shadow-card`, `--shadow-lift`, `--btn-shadow`, `--btn-hover-shift`, `--border-w` | depth and edges |
| `--surface-filter`, `--field-bg` | backdrop blur for glass styles, input fill |

A style overrides these tokens (light and `.dark` variants) and may add a few treatments (e.g. a gradient border,
hard offset shadows, bevels) plus an optional page backdrop painted by `<StyleBackdrop/>` (blobs, aurora mesh,
perspective grid, dot grid, scanlines). Accent colours come from the Design Studio and layer on top of every style.

## Accessibility

- `node scripts/check-contrast.mjs` resolves the tokens for every style × mode and checks `--ink`/`--ink-2` against
  `--surface`, `--surface-2` and `--bg` for WCAG AA (4.5:1). Translucent surfaces are composited over the page
  background **and** over the saturated backdrop blobs they can sit on; the worst case is reported. All 120 checks pass.
- Neumorphism keeps a real 3:1 border on inputs and ghost buttons (shadows alone fail WCAG 1.4.11).
- Glass styles fall back to near-opaque surfaces without `backdrop-filter` support and under `prefers-reduced-transparency`.
- Animated backdrops (Aurora, Liquid Glass) stop under `prefers-reduced-motion`; Cyber uses static scanlines (no flicker).
- Chrome text (Retro) is limited to the H1 display heading; body copy stays solid.
- Cyber and Pro Dark are dark-only; the light/dark toggle is disabled while they are active.

## The 16 styles and their sources

Recipes were researched on 2026-10-21. Only sources that were actually fetched are listed.

| Style | Set | Key recipe | Sources |
|---|---|---|---|
| Minimal | Core | neutral greys, hairline borders, no shadows, Geist | [shadcn/ui theming](https://ui.shadcn.com/docs/theming) |
| Modern | Core | soft layered shadows, rounded cards (the refreshed default) | [Vercel Geist materials](https://vercel.com/geist/materials), [Magic UI bento-grid source](https://github.com/magicuidesign/magicui) |
| Glassmorphism | Core | `rgba(255,255,255,.66)` + `backdrop-filter: blur(16px)` over colour blobs, solid fallback | [NN/g — Glassmorphism](https://www.nngroup.com/articles/glassmorphism/), [OpenReplay — glassmorphic UI](https://blog.openreplay.com/create-glassmorphic-ui-css/) |
| Neumorphism | Core | one base colour, paired light/dark shadows, inset pressed state, real input borders | [The Plus Addons — neumorphism](https://theplusaddons.com/blog/neumorphism/) |
| Liquid Glass | Expressive | frost + specular inset rims, pill buttons, SVG `feDisplacementMap` refracting the backdrop | [Apple WWDC25 “Meet Liquid Glass”](https://developer.apple.com/videos/play/wwdc2025/219/), [LogRocket — liquid glass with CSS & SVG](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/) |
| Aurora | Expressive | layered radial gradients, `blur(70px)`, slow drift, text on calm panels | [Superdesign — Aurora](https://www.superdesign.dev/styles/aurora), [Aceternity aurora background](https://ui.aceternity.com/registry/aurora-background.json) |
| Colorful | Expressive | gradient borders (padding-box/border-box), gradient primary buttons | [Magic UI rainbow button source](https://github.com/magicuidesign/magicui) |
| Claymorphism | Expressive | outer shadow + two inner shadows, large radii, Nunito | [Smashing Magazine — claymorphism](https://www.smashingmagazine.com/2022/03/claymorphism-css-ui-design-trend/) |
| Neo-Brutalism | Bold | 2px black borders, `4px 4px 0 #000`, buttons slide into their shadow on hover | [neobrutalism components](https://github.com/ekmas/neobrutalism-components), [neobrutalism.dev button](https://www.neobrutalism.dev/r/button.json) |
| Bento | Bold | big radii, ring + layered soft shadows, dark inset glow | [Aceternity bento grid](https://ui.aceternity.com/registry/bento-grid.json), [Magic UI bento-grid source](https://github.com/magicuidesign/magicui) |
| Retro / Y2K | Bold | bevelled borders, chrome-gradient H1, magenta perspective grid, Silkscreen | [The Plus Addons — Y2K](https://theplusaddons.com/blog/y2k-web-design/), [Magic UI retro-grid source](https://github.com/magicuidesign/magicui) |
| Cyber / Terminal | Bold | neon on near-black, VT323 + JetBrains Mono, static scanlines, chromatic text-shadow | [DEV — retro CRT terminal in CSS](https://dev.to/ekeijl/retro-crt-terminal-screen-in-css-js-4afh) |
| Enterprise | Industry | IBM Plex, square corners, Gray 10/100 palette, no shadows | [IBM Carbon colour](https://carbondesignsystem.com/elements/color/overview/), [Carbon typography](https://carbondesignsystem.com/elements/typography/overview/) |
| Clinical | Industry | NHS-like palette (#212b32 text, #f0f4f5 tint), yellow focus, Atkinson Hyperlegible | [NHS service manual — colour](https://service-manual.nhs.uk/design-system/styles/colour) |
| Editorial / Swiss | Industry | serif display headlines, square, ruled cards, underlined links | [Swiss grid design kit](https://cdn.jsdelivr.net/npm/@wrongstack/core@0.295.1/design-kits/swiss-grid/KIT.md) |
| Pro Dark | Industry | dense spacing, tabular numbers, Carbon Gray-100 base | [Matt Ström — UI density](https://mattstromawn.com/writing/ui-density), [Carbon data table](https://carbondesignsystem.com/components/data-table/style/) |

## Page-layout variants

The sign-in and pricing variants follow patterns that recur across component galleries, for example
[21st.dev sign-in](https://21st.dev/community/components/s/sign-in) (split screen, centred social login),
[21st.dev pricing](https://21st.dev/community/components/s/pricing-section) (comparison table, usage slider),
[shadcn login blocks](https://ui.shadcn.com/blocks/login) and
[Aceternity hero sections](https://ui.aceternity.com/blocks/hero-sections) (two-column with framed image).
These were taken from component titles and descriptions only; no third-party code was copied.

## Adding a style

1. Add an entry to `STYLES` in `src/design/styles.ts` (id, set, swatch, fonts, optional `mode`).
2. Add the font families to `index.html` if they are new (the link loads every style's fonts).
3. Add a `[data-style="your-id"]` block (and `.dark` variant) to `src/design/styles.css`, overriding tokens first.
4. Run `node scripts/check-contrast.mjs` and fix any failures.
