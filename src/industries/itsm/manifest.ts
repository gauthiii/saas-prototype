// src/industries/itsm/manifest.ts — Deskflow (IT Service Desk), sub-category of IT / DevOps.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "itsm", label: "IT Service Desk", sub: "Tickets · Assets · Changes · Knowledge", icon: "Headset", productName: "Deskflow", parent: "devops",
  order: 2,
  styles: { default: "enterprise", recommended: ["modern", "minimal", "clinical"] },
  screens: [
    { id: "desk", label: "Service desk overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "tickets", label: "Ticket queue", icon: "Ticket", kind: "table" },
    { id: "cab", label: "CAB change approvals", icon: "GitMerge", kind: "queue" },
    { id: "changecal", label: "Change calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "assets", label: "Asset inventory", icon: "Laptop", kind: "catalog" },
    { id: "fulfilment", label: "Request fulfilment tracker", icon: "PackageCheck", kind: "tracker" },
    { id: "request", label: "New hardware request", icon: "ClipboardList", kind: "form" },
    { id: "offboarding", label: "Offboarding checklist", icon: "ListChecks", kind: "checklist" },
    { id: "kb", label: "Knowledge base", icon: "BookOpen", kind: "media" },
    { id: "livechat", label: "Employee live chat", icon: "MessagesSquare", kind: "chat" },
    { id: "load", label: "Desk load heatmap", icon: "Table2", kind: "heatmap" },
    { id: "groups", label: "Support group scorecards", icon: "Award", kind: "scorecard" },
  ],
});
