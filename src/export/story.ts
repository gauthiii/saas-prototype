// src/export/story.ts — resolves the walkthrough-deck narrative for any industry.
// Hand-coded domains keep their curated DECK_CONTENT story and gain the blurbs of their
// archetype extension screens; archetype industries supply everything in data.ts.
import { DECK_CONTENT, DomainStory } from "./deckContent";
import type { LoadedDomain } from "../industries/views";

export function resolveStory(d: LoadedDomain): DomainStory {
  const screens = Object.fromEntries(Object.entries(d.data.screens).map(([id, s]) => [id, { blurb: s.blurb, bullets: [...s.bullets] }]));
  const appCount = (d.manifest.bespoke?.appViews.length ?? 0) + d.manifest.screens.length;
  const base: Omit<DomainStory, "screens"> & { screens?: DomainStory["screens"] } | undefined =
    d.manifest.bespoke ? DECK_CONTENT[d.manifest.id] : d.data.story;
  if (!base) throw new Error(`Deck export: no story for industry "${d.manifest.id}"`);
  const stats = base.stats.map(([v, l]) => (l === "core app screens" ? [String(appCount), l] : [v, l])) as DomainStory["stats"];
  return { ...base, stats, screens: { ...(base.screens ?? {}), ...screens } };
}
