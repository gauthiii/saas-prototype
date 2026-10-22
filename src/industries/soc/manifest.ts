// src/industries/soc/manifest.ts — Nightwatch (SOC & SIEM), sub-category of Cybersecurity.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "soc", label: "SOC & SIEM", sub: "Alerts · Investigations · Detections · Playbooks", icon: "Radar", productName: "Nightwatch", parent: "cybersecurity",
  order: 1,
  styles: { default: "pro-dark", recommended: ["cyber", "enterprise", "bento"] },
  screens: [
    { id: "overview", label: "SOC overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "stream", label: "Live alert stream", icon: "Activity", kind: "feed" },
    { id: "triage", label: "Alert triage queue", icon: "Inbox", kind: "queue" },
    { id: "investigations", label: "Investigation board", icon: "Kanban", kind: "kanban" },
    { id: "casefile", label: "Case file", icon: "FolderOpen", kind: "detail" },
    { id: "attackchain", label: "Attack chain timeline", icon: "History", kind: "timeline" },
    { id: "rules", label: "Detection rules", icon: "Code2", kind: "table" },
    { id: "coverage", label: "ATT&CK coverage", icon: "Crosshair", kind: "heatmap" },
    { id: "playbook", label: "Playbook builder", icon: "Workflow", kind: "wizard" },
    { id: "rota", label: "Analyst shift rota", icon: "CalendarClock", kind: "calendar" },
    { id: "logsources", label: "Log source health", icon: "Database", kind: "monitor" },
    { id: "performance", label: "MTTD & MTTR analytics", icon: "BarChart3", kind: "analytics" },
  ],
});
