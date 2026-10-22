// src/industries/wealth/manifest.ts — Meridian Wealth (Wealth & Investing), sub-category of FinTech.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "wealth", label: "Wealth & Investing", sub: "Portfolios · Advisors · Trading · Planning", icon: "LineChart", productName: "Meridian Wealth", parent: "fintech",
  order: 3,
  styles: { default: "pro-dark", recommended: ["editorial", "enterprise", "minimal"] },
  screens: [
    { id: "book", label: "Book of business", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "households", label: "Household directory", icon: "UsersRound", kind: "table" },
    { id: "household", label: "Household profile", icon: "Contact", kind: "detail" },
    { id: "models", label: "Model portfolios", icon: "Layers", kind: "comparison" },
    { id: "drift", label: "Drift & rebalancing", icon: "Gauge", kind: "heatmap" },
    { id: "trades", label: "Trade approvals", icon: "ArrowLeftRight", kind: "queue" },
    { id: "transfers", label: "Account opening & transfers", icon: "Route", kind: "tracker" },
    { id: "plan", label: "Plan builder", icon: "Compass", kind: "wizard" },
    { id: "meetings", label: "Client review calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "review", label: "Annual review checklist", icon: "ListChecks", kind: "checklist" },
    { id: "advisors", label: "Advisor scorecards", icon: "Award", kind: "scorecard" },
    { id: "practice", label: "Practice analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
