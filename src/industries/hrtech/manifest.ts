// src/industries/hrtech/manifest.ts — TalentOS (HRTech), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "hrtech", label: "HRTech", sub: "ATS \u00b7 Onboarding \u00b7 Talent \u00b7 DEI", icon: "Users", productName: "TalentOS",
  order: 4,
  styles: { default: "bento", recommended: ["clay", "colorful", "modern"] },
  bespoke: {
    module: "hrtech", prefix: "HR",
    appViews: [
      { id: "pipeline", label: "Candidate pipeline", icon: "LayoutDashboard", comp: "ATSPipeline" },
      { id: "jobpost", label: "Create job posting", icon: "FileText", comp: "JobPostForm" },
      { id: "onboarding", label: "Onboarding center", icon: "UserCheck", comp: "OnboardingScreen" },
      { id: "talent", label: "Talent marketplace", icon: "Briefcase", comp: "TalentMarketplaceScreen" },
      { id: "dei", label: "DEI analytics", icon: "BarChart3", comp: "DEIAnalyticsScreen" },
    ],
  },
  screens: [
    { id: "interviews", label: "Interview scheduler", icon: "CalendarClock", kind: "calendar" },
    { id: "scorecards", label: "Interview scorecards", icon: "ClipboardList", kind: "scorecard" },
    { id: "offers", label: "Offer approvals", icon: "FileSignature", kind: "queue" },
    { id: "reqs", label: "Requisition tracker", icon: "Route", kind: "tracker" },
    { id: "hiringplan", label: "Hiring plan heatmap", icon: "Thermometer", kind: "heatmap" },
    { id: "directory", label: "People directory", icon: "Contact", kind: "table" },
    { id: "messages", label: "Candidate messaging", icon: "MessagesSquare", kind: "chat" },
  ],
});
