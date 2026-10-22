// src/industries/ip/manifest.ts — Patently (Legal › IP & patents).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "ip", label: "IP & Patents", sub: "Filings · Prosecution · Portfolio · Deadlines", icon: "Copyright", productName: "Patently",
  parent: "legal",
  order: 3,
  styles: { default: "bento", recommended: ["modern", "pro-dark", "minimal"] },
  screens: [
    { id: "dash", label: "IP portfolio dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "disclosures", label: "Invention pipeline", icon: "Lightbulb", kind: "funnel" },
    { id: "review", label: "Invention review board", icon: "Award", kind: "scorecard" },
    { id: "newapp", label: "New application", icon: "FileText", kind: "wizard" },
    { id: "docket", label: "Prosecution docket", icon: "Table", kind: "table" },
    { id: "deadlines", label: "Deadline calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "applications", label: "Application tracker", icon: "Route", kind: "tracker" },
    { id: "family", label: "Patent family", icon: "GitBranch", kind: "detail" },
    { id: "coverage", label: "Global coverage map", icon: "Globe", kind: "map" },
    { id: "annuities", label: "Annuities & maintenance fees", icon: "Coins", kind: "ledger" },
    { id: "priorart", label: "Prior-art alerts", icon: "ScanSearch", kind: "feed" },
    { id: "landscape", label: "Competitor filing watch", icon: "Radar", kind: "monitor" },
  ],
});
