# ForgeUI — Update Tracker

> **Status key:** `[ ]` Not started · `[~]` In progress · `[x]` Done  
> **Severity:** 🔴 High · 🟡 Medium · 🟢 Low  
> Every completed item must include a corresponding entry in `CHANGELOG.md` before the task is marked `[x]`.

---

## BUGS

### B1 — URL Revoke Kills Downloads on Safari 🔴
**File:** `src/export/exportProject.ts` ~line 80  
**Problem:** `URL.revokeObjectURL(url)` is called synchronously immediately after `a.click()`. The browser's download is asynchronous, so the blob URL is revoked before the browser can fetch it. This silently kills downloads on Safari.  
**Fix:** Wrap the revoke in `setTimeout(() => URL.revokeObjectURL(url), 100)`.  
**Changelog entry required:** Yes — "Fixed: ZIP download now reliably completes on Safari (deferred blob URL revoke)."  
**Status:** `[x]` — Done 2026-06-29

---

### B2 — Deck Slide Layout Breaks for Domains With >12 App Screens 🟡
**File:** `src/export/generateDeck.ts` ~line 143  
**Problem:** The flow-overview slide hard-codes `perRow = 4` with no guard on the Y coordinate. Any domain with more than ~12 App screens will overflow content off the slide canvas.  
**Fix:** Add a Y-overflow guard or increase perRow dynamically based on `appViews.length`.  
**Changelog entry required:** Yes — "Fixed: Deck export flow-overview slide no longer overflows for large domains."  
**Status:** `[x]` — Done 2026-06-29

---

### B3 — Missing Error Boundary Causes Blank White Screen 🔴
**File:** `src/main.tsx`, `src/App.tsx` ~line 71  
**Problem:** `App.tsx` throws synchronously if any registry component is missing (`if (!C) throw new Error(...)`). There is no `<ErrorBoundary>` anywhere in the tree, so the entire app becomes a blank white page with no user-facing message.  
**Fix:** Add a top-level `<ErrorBoundary>` in `main.tsx` with a friendly fallback UI.  
**Changelog entry required:** Yes — "Added: Top-level error boundary prevents blank white screen on component lookup failures."  
**Status:** `[x]` — Done 2026-06-29

---

### B4 — Stale Closure in AppPreview Keyboard Handler 🟡
**File:** `src/components/AppPreview.tsx` ~lines 43–44  
**Problem:** `prev` and `next` are not listed in the `useEffect` dependency array. If React recreates these functions after a prop change, the keyboard handler captures stale closures and navigation breaks.  
**Fix:** Add `prev` and `next` to the `useEffect` dependency array: `[onClose, views.length, prev, next]`.  
**Changelog entry required:** Yes — "Fixed: Keyboard arrow navigation in App Preview no longer stales after prop changes."  
**Status:** `[x]` — Done 2026-06-29

---

### B5 — `hexToRgbTriple` Does Not Validate Input; Malformed Colors Break All UI Color 🟡
**File:** `src/theme.ts` ~line 27  
**Problem:** If `localStorage` contains a structurally valid JSON theme object with a malformed hex value (e.g. `"#zz0000"`), `parseInt` returns `NaN`, CSS variables are set to `"NaN NaN NaN"`, and all color in the app breaks silently.  
**Fix:** Add a hex validation regex before parsing. Fall back to default theme values if validation fails.  
**Changelog entry required:** Yes — "Fixed: Malformed theme colors in localStorage no longer break app color — invalid values fall back to defaults."  
**Status:** `[x]` — Done 2026-06-29

---

### B6 — `injectTheme` Regex Fails Silently; Exported Project Ships Default Theme 🟡
**File:** `src/export/generate.ts` ~lines 8–11  
**Problem:** Three `.replace()` calls match CSS variable lines by exact string. If the CSS format ever changes (trailing space, minification), no replacement matches and the exported project silently ships the default theme regardless of user selection.  
**Fix:** Either assert a match occurred and throw/warn, or use a more robust CSS variable replacement strategy.  
**Changelog entry required:** Yes — "Fixed: Exported project now correctly reflects the user's active theme instead of silently falling back to default."  
**Status:** `[x]` — Done 2026-06-29

---

### B7 — Missing Icons in Deck Export for 6+ Domains 🔴
**File:** `src/export/generateDeck.ts` ~lines 9–33  
**Problem:** The `ICONS` map in `generateDeck.ts` is missing 20+ icons added for energy, fossil, renewable, nuclear, banking, and retail domains (e.g. `Zap`, `Factory`, `Flame`, `Atom`, `Radiation`, `ShoppingCart`, `Truck`). All of these domains silently fall back to a `Sparkles` icon in the exported deck.  
**Fix:** Sync the `ICONS` map in `generateDeck.ts` with the full icon set in `App.tsx`. Ideally, extract both into a single shared `iconMap.ts` module (see Q1).  
**Changelog entry required:** Yes — "Fixed: Deck exports for Energy, Banking, and Retail domains now use correct icons instead of a Sparkles fallback."  
**Status:** `[x]` — Done 2026-06-29

---

## UX FLAWS

### U1 — About Page Shown on Every Reload; No State Persistence 🔴
**File:** `src/App.tsx` ~line 132  
**Problem:** `useState(true)` for `showAbout` means every page reload takes the user back to the marketing/About page. The active domain and view are not persisted to `localStorage` or URL params. Returning users must click "Browse Templates" on every visit.  
**Fix:** Persist `showAbout`, `activeDomain`, and `activeView` to `localStorage`. Read them on mount.  
**Changelog entry required:** Yes — "Improved: App now remembers your last active domain and view across reloads."  
**Status:** `[x]` — Done 2026-06-29 (via react-router URL params)

---

### U2 — No URL-Based Navigation; Deep Links and Back Button Are Broken 🔴
**File:** `src/App.tsx` (all state is `useState`, no router)  
**Problem:** All state is in-memory. Refreshing always resets to Fintech home. The browser Back button does nothing. Users cannot share a link to a specific domain or screen.  
**Fix:** Integrate `react-router-dom` or use `history.pushState` to encode `domain` and `view` in the URL (e.g. `/fintech/pos`).  
**Changelog entry required:** Yes — "Added: URL-based navigation — domain and view are now reflected in the URL and shareable."  
**Status:** `[x]` — Done 2026-06-29

---

### U3 — Mobile Navigation Shows All Views Flat; No Grouping 🔴
**File:** `src/App.tsx` ~line 265  
**Problem:** The mobile tab strip renders all views flat (e.g. 23 tabs for Fintech), ignoring the group structure ("Public", "App", "Account", "Resources"). The result is an unusably long horizontal scroll list on mobile.  
**Fix:** Group mobile tabs by view group, either as collapsible sections or a two-level tab/dropdown.  
**Changelog entry required:** Yes — "Fixed: Mobile navigation now groups views by section instead of showing all tabs in a flat horizontal scroll."  
**Status:** `[x]` — Done 2026-06-29

---

### U4 — Preview Eye Button Only Appears in the "Public" Group Sidebar Label 🟡
**File:** `src/App.tsx` ~line 199  
**Problem:** The Preview button is conditionally rendered only next to the "Public" group label. Users browsing "App" or "Account" screens will not see the Preview button at all.  
**Fix:** Move the Preview button to the top toolbar so it is always accessible regardless of active group.  
**Changelog entry required:** Yes — "Improved: Preview button moved to top toolbar — always accessible from any view group."  
**Status:** `[x]` — Done 2026-06-29

---

### U5 — ThemeStudio Draft Not Reset When Theme Prop Changes 🟡
**File:** `src/components/ThemeStudio.tsx` ~line 62  
**Problem:** `draft` is initialized once from `theme` prop via `useState`. If the user opens ThemeStudio, closes it without applying, then applies a preset externally and reopens ThemeStudio, the draft still shows the previously edited (stale) values.  
**Fix:** Add `useEffect(() => setDraft(theme), [theme])` to sync draft when the prop changes.  
**Changelog entry required:** Yes — "Fixed: ThemeStudio draft now resets correctly when the active theme changes externally."  
**Status:** `[x]` — Done 2026-06-29

---

### U6 — "Apply" in ThemeStudio Doesn't Close the Modal 🟢
**File:** `src/components/ThemeStudio.tsx` ~line 69  
**Problem:** After pressing Apply, the "Applied ✓" checkmark shows for 1.6 s but the modal stays open, forcing the user to click X as a second step. Standard UX convention is for Apply to close the panel.  
**Fix:** Call `onClose()` after the theme is applied (optionally with a short 300 ms delay so the "Applied" confirmation is visible).  
**Changelog entry required:** Yes — "Improved: ThemeStudio now closes automatically after Apply."  
**Status:** `[x]` — Done 2026-06-29

---

### U7 — "Apply" Button in AIPanel Is Non-Functional (Decorative) 🟡
**File:** `src/components/AIPanel.tsx` ~line 43  
**Problem:** Each insight card has an "Apply" button that has no `onClick` handler. It appears on hover but clicking it does nothing. This creates a false expectation that insights can be actioned.  
**Fix:** Either wire up the Apply button to a meaningful action (e.g. copy insight text, or dismiss the card), or remove it entirely.  
**Changelog entry required:** Yes — "Fixed: Removed non-functional Apply button from AI insight cards to prevent user confusion."  
**Status:** `[x]` — Done 2026-06-29

---

### U8 — "Back to About" Label Is Hard-Coded and Context-Unaware 🟢
**File:** `src/components/VersionHistory.tsx` ~line 22  
**Problem:** The back button always says "Back to About". If this component is ever reused in another context, the label becomes incorrect.  
**Fix:** Accept an optional `backLabel` prop defaulting to `"Back"`.  
**Changelog entry required:** Yes — "Improved: Version History back button label is now dynamic."  
**Status:** `[x]` — Done 2026-06-29

---

### U9 — Footer Copyright Says "© 2025" in a 2026-Dated Project 🟢
**File:** `src/components/About.tsx` ~line 559, `src/components/VersionHistory.tsx` ~line 92  
**Problem:** Footer copyright is hardcoded as "ForgeUI © 2025". All recent version entries in `version.ts` are dated 2026.  
**Fix:** Change to `© 2026` or use `new Date().getFullYear()` dynamically.  
**Changelog entry required:** Yes — "Fixed: Footer copyright year updated to 2026."  
**Status:** `[x]` — Done 2026-06-29

---

### U10 — App Preview Does Not Reset Scroll Position Between Screens 🟡
**File:** `src/components/AppPreview.tsx` ~line 151  
**Problem:** The scrollable content area does not reset to the top when the user navigates to a new screen. A user who scrolled to the bottom of a long screen stays at the bottom on the next screen.  
**Fix:** Use a `ref` on the scroll container and call `.scrollTo({ top: 0 })` on view change inside a `useEffect`.  
**Changelog entry required:** Yes — "Fixed: App Preview now scrolls to top when navigating between screens."  
**Status:** `[x]` — Done 2026-06-29

---

## CODE QUALITY

### Q1 — Icon Map Duplicated Between `App.tsx` and `generateDeck.ts` 🟡
**Files:** `src/App.tsx` ~lines 4–18, `src/export/generateDeck.ts` ~lines 9–17  
**Problem:** Both files maintain their own `ICONS: Record<string, IconType>` map. The deck's map is missing 20+ icons (the root cause of B7). Any new icon added to `App.tsx` must be manually mirrored in `generateDeck.ts`.  
**Fix:** Extract both into a single shared `src/lib/iconMap.ts` and import from it in both files.  
**Changelog entry required:** Yes — "Refactor: Extracted shared icon map to `src/lib/iconMap.ts` — eliminates icon drift between app and deck export."  
**Status:** `[x]` — Done 2026-06-29

---

### Q2 — `JSX.Element` Used Instead of `React.ReactElement` 🟢
**Files:** `src/App.tsx` ~lines 60, 72; `src/export/generate.ts` ~line 31  
**Problem:** `JSX.Element` is deprecated as a standalone type in TypeScript 5.x. Using `React.ReactElement` or `React.ReactNode` is the current best practice.  
**Fix:** Replace all uses of `JSX.Element` with `React.ReactElement` or `React.ReactNode` as appropriate.  
**Changelog entry required:** Yes — "Refactor: Replaced deprecated `JSX.Element` type with `React.ReactElement`."  
**Status:** `[x]` — Done 2026-06-29

---

### Q3 — `MODULES` Map Is Typed as `unknown`; Unsafe Cast 🟡
**File:** `src/App.tsx` ~line 55  
**Problem:** `MODULES` is typed `Record<string, Record<string, unknown>>`. The component lookup is cast with `as ComponentType` after only a null check. This bypasses TypeScript's type safety entirely.  
**Fix:** Type each module entry as `Record<string, ComponentType>` or use a discriminated union.  
**Changelog entry required:** Yes — "Refactor: `MODULES` map is now properly typed — removed unsafe `as ComponentType` cast."  
**Status:** `[x]` — Done 2026-06-29

---

### Q4 — `About.tsx` Preset Colors Don't Match `theme.ts` Definitions 🟢
**File:** `src/components/About.tsx` ~lines 76–84  
**Problem:** The `PRESETS` array in `About.tsx` has hardcoded hex colors that differ from the real `THEME_PRESETS` in `theme.ts` (e.g., About shows "Electric" as `#6366f1` but the real Electric theme is `#1f80ff`). This shows users the wrong preview.  
**Fix:** Import `THEME_PRESETS` from `theme.ts` directly and derive the About page display from it.  
**Changelog entry required:** Yes — "Fixed: About page preset color swatches now match the actual theme definitions."  
**Status:** `[x]` — Done 2026-06-29

---

### Q5 — Emoji Icons in Domain Features Are Not Accessible 🟡
**Files:** All domain files (`fintech.tsx`, `banking.tsx`, etc.), `src/domains/pages.tsx` ~line 49  
**Problem:** Feature icons are emoji strings rendered as `<div className="text-2xl">{f.icon}</div>` with no `aria-label` or `role="img"`. Screen readers read emoji in unpredictable ways across OS/browser combinations.  
**Fix:** Add `role="img"` and `aria-label={f.label}` to each emoji icon container.  
**Changelog entry required:** Yes — "Improved: Emoji feature icons now have proper ARIA labels for screen reader accessibility."  
**Status:** `[x]` — Done 2026-06-29

---

### Q6 — `useFakeSubmit` in `ui.tsx` Does Not Reset State After Success 🟢
**File:** `src/components/ui.tsx` ~lines 84–91  
**Problem:** After the fake submit resolves to `"done"`, the state is never automatically reset. Callers must call `reset()` manually; forgetting to do so leaves buttons stuck in the done state.  
**Fix:** Auto-reset to `"idle"` after a configurable delay post-"done", or document the manual reset requirement clearly.  
**Changelog entry required:** Yes — "Improved: `useFakeSubmit` now auto-resets to idle after success."  
**Status:** `[x]` — Done 2026-06-29

---

### Q7 — `deckContent.ts` `stats` Arrays Have No Length Guard; 4th Stat Overflows Slide 🟡
**File:** `src/export/deckContent.ts`  
**Problem:** Stats are rendered at hardcoded X positions for exactly 3 items. Adding a 4th stat to any domain's `stats` array overflows the slide canvas. There is no type constraint or runtime guard.  
**Fix:** Add a TypeScript tuple type `stats: [[string, string], [string, string], [string, string]]` to enforce exactly 3 items.  
**Changelog entry required:** Yes — "Fixed: Domain stats arrays are now typed to exactly 3 items — prevents slide overflow in deck export."  
**Status:** `[x]` — Done 2026-06-29

---

## MISSING FEATURES

### M1 — No Error Boundary in Component Tree 🔴
*(See also B3 above — these are the same fix.)*  
**Status:** `[x]` — tracked under B3.

---

### M2 — No Progress Indicator During Export 🟡
**File:** `src/App.tsx` ~lines 155–166  
**Problem:** Deck generation (icon rasterization + zip compression) can take 5–15 seconds on slow machines. The only feedback is a spinner on the export button. There are no progress stages, no percentage, and no way to cancel.  
**Fix:** Add a progress modal with labeled stages ("Generating slides…", "Compressing…", "Done") and a cancel option.  
**Changelog entry required:** Yes — "Added: Export progress modal with stage labels and cancel button."  
**Status:** `[x]` — Done 2026-06-29

---

### M3 — Domain Picker Dropdown Has No Keyboard Navigation 🟡
**File:** `src/App.tsx` (domain picker implementation)  
**Problem:** The custom listbox has no ArrowUp/ArrowDown navigation. Pressing Tab while the search input is focused takes focus out of the dropdown instead of cycling through results.  
**Fix:** Implement keyboard navigation: `ArrowDown`/`ArrowUp` to move focus between results, `Enter` to select, `Escape` to close.  
**Changelog entry required:** Yes — "Added: Domain picker supports full keyboard navigation (ArrowUp/Down, Enter, Escape)."  
**Status:** `[x]` — Done 2026-06-29

---

### M4 — "Regenerate" Button in AIPanel Is Purely Decorative 🟡
**File:** `src/components/AIPanel.tsx` ~line 10  
**Problem:** After the fake 1.1 s delay, the exact same insights reappear. There is no shuffling or variation. The button gives users false confidence in AI-driven content.  
**Fix:** Either rotate through a pool of alternative insight texts per domain on regenerate, or remove the button if real regeneration is not planned.  
**Changelog entry required:** Yes — "Improved: AI Panel Regenerate now cycles through varied insights instead of repeating the same content."  
**Status:** `[x]` — Done 2026-06-29

---

### M5 — Dark Mode Preference Not Persisted to `localStorage` 🟡
**File:** `src/App.tsx` ~line 131  
**Problem:** Dark mode reads the OS preference on first load but ignores it on subsequent visits if the user manually toggled it. The theme color IS saved to `localStorage` but the dark/light toggle is not.  
**Fix:** Save the dark mode boolean to `localStorage` on toggle and read it on mount (falling back to OS preference if no saved value exists).  
**Changelog entry required:** Yes — "Fixed: Dark mode preference is now persisted across reloads."  
**Status:** `[x]` — Done 2026-06-29

---

## CONSISTENCY ISSUES

### C1 — About Page Says "5+ Domain Templates"; Product Now Has 11 🔴
**File:** `src/components/About.tsx` ~line 235  
**Problem:** The features list copy says "5+ Domain Templates" and only names the original 5 (FinTech, HealthTech, DevOps, HRTech, EdTech). Banking, Retail, and all three Energy sub-domains are not mentioned.  
**Fix:** Update copy to "11 Domain Templates" and list all current domains (or say "FinTech, Banking, HealthTech, DevOps, HRTech, EdTech, Retail, and more").  
**Changelog entry required:** Yes — "Fixed: About page now correctly advertises 11 domain templates."  
**Status:** `[x]` — Done 2026-06-29

---

### C2 — About Page Domain Picker Mock Only Shows 5 of 11 Domains 🟡
**File:** `src/components/About.tsx` ~lines 22–28 (`DOMAIN_ITEMS`)  
**Problem:** The visual mock of the domain picker on the About page only shows the original 5 domains. The actual picker has 11. The About page looks outdated.  
**Fix:** Update `DOMAIN_ITEMS` to include all 11 domains (or at least a representative 8–9 with a "..." indicator).  
**Changelog entry required:** Yes — "Fixed: About page domain picker mock updated to reflect all current domains."  
**Status:** `[x]` — Done 2026-06-29

---

### C3 — ThemeStudio Active Preset Has No Visual Indicator 🟡
**File:** `src/components/ThemeStudio.tsx` ~lines 111–118  
**Problem:** Clicking a preset updates the draft but none of the preset buttons shows a "selected" state (no checkmark, no highlighted border). The user cannot tell which preset is currently applied to the draft.  
**Fix:** Compare each preset's theme values to `draft` and render an active indicator (border or checkmark icon) on the matching preset button.  
**Changelog entry required:** Yes — "Improved: ThemeStudio now highlights the currently active theme preset."  
**Status:** `[x]` — Done 2026-06-29

---

### C4 — `version.ts` Shows `"local"` as Commit Hash to End Users 🟢
**File:** `src/version.ts` ~line 19  
**Problem:** The most recent version entry has `commit: "local"`, which is displayed raw in the Version History page as `"2026-06-xx · local"`. This looks like a developer artifact, not a finished product detail.  
**Fix:** Replace `"local"` with either the real short SHA or an empty string (and conditionally hide the commit field when empty).  
**Changelog entry required:** Yes — "Fixed: Version History no longer shows 'local' as a commit reference for recent versions."  
**Status:** `[x]` — Done 2026-06-29

---

### C5 — Energy Sub-Domains Use `Sparkline` Inconsistently 🟢
**Files:** `src/domains/energy-fossil.tsx`, `src/domains/energy-renewable.tsx`, `src/domains/energy-nuclear.tsx`  
**Problem:** `energytech.tsx` and `energy-fossil.tsx` use `Sparkline` in stat cards. `energy-renewable.tsx` and `energy-nuclear.tsx` do not. This creates a visual inconsistency between related sub-domains.  
**Fix:** Add `Sparkline` usage to renewable and nuclear domain stat cards to match the pattern in fossil and energytech.  
**Changelog entry required:** Yes — "Improved: Energy sub-domains (Renewable, Nuclear) now use Sparkline stat cards, consistent with Fossil and EnergyTech."  
**Status:** `[x]` — Done 2026-06-29

---

### C6 — Deck Export Generic Slide Copy Is Domain-Agnostic for All 11 Domains 🟢
**File:** `src/export/generateDeck.ts` ~lines 66–98  
**Problem:** The generic group slide notes (e.g. "Sign-in screen (visual only — wire your auth provider)") are identical for every domain, including nuclear energy. The core App slides get per-domain copy from `deckContent.ts` but the structural slides do not.  
**Fix:** Add optional per-domain overrides for generic slide notes in `deckContent.ts`.  
**Changelog entry required:** Yes — "Improved: Deck export generic slide notes now support per-domain copy overrides."  
**Status:** `[x]` — Done 2026-06-29

---

## Summary — Priority Order for Implementation

| # | Item | Severity | Category |
|---|------|----------|----------|
| B3 | Add error boundary (blank white screen risk) | 🔴 High | Bug |
| B7 + Q1 | Fix missing deck icons + extract shared icon map | 🔴 High | Bug + Quality |
| B1 | Fix URL revoke breaking downloads on Safari | 🔴 High | Bug |
| C1 | Update About page "5+ domains" → "11 domains" | 🔴 High | Consistency |
| U1 | Persist active domain/view across reloads | 🔴 High | UX |
| U3 | Mobile nav grouping (flat 23-tab scroll) | 🔴 High | UX |
| U2 | URL-based navigation / deep links | 🔴 High | UX |
| M5 | Persist dark mode preference | 🟡 Medium | Missing |
| U5 | ThemeStudio draft sync on theme prop change | 🟡 Medium | UX |
| U7 | Remove or wire up non-functional AIPanel Apply button | 🟡 Medium | UX |
| U4 | Move Preview button to top toolbar | 🟡 Medium | UX |
| U10 | Reset scroll on view change in AppPreview | 🟡 Medium | UX |
| B4 | Fix stale closure in AppPreview keyboard handler | 🟡 Medium | Bug |
| B5 | Validate hex colors before parsing in theme.ts | 🟡 Medium | Bug |
| B6 | Fix silent theme injection failure in generate.ts | 🟡 Medium | Bug |
| M2 | Export progress modal with stages + cancel | 🟡 Medium | Missing |
| M3 | Keyboard navigation in domain picker | 🟡 Medium | Missing |
| M4 | AIPanel Regenerate — vary insights or remove | 🟡 Medium | Missing |
| Q3 | Type the MODULES map properly | 🟡 Medium | Quality |
| Q5 | ARIA labels on emoji feature icons | 🟡 Medium | Quality |
| Q7 | Type-constrain stats arrays to exactly 3 items | 🟡 Medium | Quality |
| C2 | Update About page domain picker mock | 🟡 Medium | Consistency |
| C3 | ThemeStudio active preset visual indicator | 🟡 Medium | Consistency |
| B2 | Deck overflow guard for large domains | 🟡 Medium | Bug |
| Q2 | Replace deprecated `JSX.Element` type | 🟢 Low | Quality |
| Q4 | About.tsx preset colors — import from theme.ts | 🟢 Low | Quality |
| Q6 | useFakeSubmit auto-reset after success | 🟢 Low | Quality |
| U6 | ThemeStudio Apply closes modal | 🟢 Low | UX |
| U8 | VersionHistory back button dynamic label | 🟢 Low | UX |
| U9 | Fix footer copyright year (2025 → 2026) | 🟢 Low | UX |
| C4 | version.ts "local" commit hash display | 🟢 Low | Consistency |
| C5 | Add Sparkline to renewable/nuclear domains | 🟢 Low | Consistency |
| C6 | Per-domain deck generic slide copy overrides | 🟢 Low | Consistency |

---

*Audit conducted: 2026-06-29 — ForgeUI codebase at commit `fc626af`.*  
*All items approved here should be implemented sequentially by priority tier. Each completed item requires a CHANGELOG.md entry before being marked `[x]`.*
