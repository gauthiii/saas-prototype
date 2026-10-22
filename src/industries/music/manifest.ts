// src/industries/music/manifest.ts — Tempo (Music & Podcasts), sub-category of Media & Streaming.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "music", label: "Music & Podcasts", sub: "Catalog · Artists · Royalties · Episodes", icon: "Music", productName: "Tempo", parent: "media",
  order: 2,
  styles: { default: "colorful", recommended: ["retro", "clay", "aurora"] },
  screens: [
    { id: "overview", label: "Label overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "releases", label: "Release planner", icon: "Kanban", kind: "kanban" },
    { id: "roster", label: "Artist roster", icon: "Mic", kind: "catalog" },
    { id: "royalties", label: "Royalty ledger", icon: "Coins", kind: "ledger" },
    { id: "statements", label: "Statement approvals", icon: "FileCheck", kind: "queue" },
    { id: "pitches", label: "Playlist & sync pitches", icon: "Send", kind: "timeline" },
    { id: "splits", label: "Split sheet", icon: "FileSignature", kind: "form" },
    { id: "episodes", label: "Podcast episode schedule", icon: "Podcast", kind: "calendar" },
    { id: "studio", label: "Studio booking", icon: "Headphones", kind: "booking" },
    { id: "listening", label: "Listening heatmap", icon: "Activity", kind: "heatmap" },
    { id: "demos", label: "A&R demo scorecard", icon: "Star", kind: "scorecard" },
    { id: "delivery", label: "DSP delivery", icon: "Upload", kind: "wizard" },
  ],
});
