// src/version.ts
// Version history derived from the project commit history.
// Newest first. `tag` controls the badge tone on each update card.

export type ChangeTag = "Feature" | "Improvement" | "Fix" | "Release";

export interface VersionEntry {
  version: string;
  date: string;
  title: string;
  commit: string;
  tag: ChangeTag;
  /** What changed compared to the previous version. */
  changes: string[];
}

export const VERSIONS: VersionEntry[] = [
  {
    version: "1.7.0",
    date: "2026-06-12",
    title: "Energy domains expansion",
    commit: "79ff5a6",
    tag: "Feature",
    changes: [
      "Added the Energy domain template alongside three new sub-domains: fossil, renewable, and nuclear.",
      "Expanded the domain picker so energy verticals are grouped under their parent.",
      "Introduced new domain-specific icons (Flame, Droplet, Atom, Radiation) for the energy templates.",
    ],
  },
  {
    version: "1.6.0",
    date: "2026-06-12",
    title: "Banking domain",
    commit: "2c7eaf0",
    tag: "Feature",
    changes: [
      "Added a dedicated Banking domain template with accounts, transfers, and statement screens.",
      "Wired the new banking views into the registry and sidebar navigation.",
    ],
  },
  {
    version: "1.5.0",
    date: "2026-06-12",
    title: "Retail domain",
    commit: "9ee35ec",
    tag: "Feature",
    changes: [
      "Added the Retail domain template with catalog, cart, and order-tracking views.",
      "Added retail icons (ShoppingCart, Package, Truck, Percent, Star).",
    ],
  },
  {
    version: "1.4.0",
    date: "2026-06-12",
    title: "Live app preview",
    commit: "48fdd14",
    tag: "Feature",
    changes: [
      "Added the in-app Preview modal so you can see how an exported app looks and flows before exporting.",
      "Added a Preview action next to the Public screen group in the sidebar.",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-06-12",
    title: "Slide deck export",
    commit: "0b6cf40",
    tag: "Feature",
    changes: [
      "Added PowerPoint (PPT) deck export so a domain can be exported as a presentation.",
      "Introduced deck content + generation helpers in the export pipeline.",
    ],
  },
  {
    version: "1.2.2",
    date: "2026-06-11",
    title: "About page polish",
    commit: "3771c32",
    tag: "Improvement",
    changes: [
      "Refined the About page hero, feature grid, and how-to-use walkthrough.",
      "Tightened spacing and copy across the landing sections.",
    ],
  },
  {
    version: "1.2.1",
    date: "2026-06-11",
    title: "About page revamp",
    commit: "3286f97",
    tag: "Improvement",
    changes: [
      "Reworked the About page layout with inline UI replicas of the builder.",
      "Added the developer profile and call-to-action sections.",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-06-11",
    title: "General updates",
    commit: "19aef7d",
    tag: "Improvement",
    changes: [
      "Various refinements across domains and shared components.",
      "Stability and consistency improvements ahead of the export work.",
    ],
  },
  {
    version: "1.1.3",
    date: "2026-06-11",
    title: "Default theme refresh",
    commit: "cc358dc",
    tag: "Improvement",
    changes: [
      "Updated the default accent and gradient colours for a cleaner default aesthetic.",
      "Tuned the dark-mode palette to match.",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-06-11",
    title: "Project export",
    commit: "506e4ed",
    tag: "Feature",
    changes: [
      "Added project export: generate a production-ready Vite project as a downloadable zip.",
      "Integrated the active theme into exported projects.",
    ],
  },
  {
    version: "1.0.2",
    date: "2026-06-11",
    title: "GitHub Pages workflow",
    commit: "5c4aa19",
    tag: "Improvement",
    changes: [
      "Updated the GitHub Pages deployment workflow with improved configuration and dependencies.",
    ],
  },
  {
    version: "1.0.1",
    date: "2026-06-11",
    title: "Shared page templates",
    commit: "8998541",
    tag: "Feature",
    changes: [
      "Added shared page templates: Home, Login, Register, Profile, Settings, FAQ, and Support.",
      "These templates are reused across every domain.",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-06-11",
    title: "Initial release",
    commit: "9431f5e",
    tag: "Release",
    changes: [
      "First tracked release of ForgeUI.",
      "Shipped the HealthTech and HRTech domains with their components and AI insights.",
    ],
  },
];

export const APP_VERSION = VERSIONS[0].version;
