// src/industries/appsec/manifest.ts — Patchwork (AppSec & Vulnerability), sub-category of Cybersecurity.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "appsec", label: "AppSec & Vulnerability", sub: "Scans · Findings · SBOM · Remediation", icon: "Bug", productName: "Patchwork", parent: "cybersecurity",
  order: 3,
  styles: { default: "brutalism", recommended: ["cyber", "bento", "modern"] },
  screens: [
    { id: "overview", label: "AppSec overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "findings", label: "Findings backlog", icon: "Bug", kind: "table" },
    { id: "remediation", label: "Remediation board", icon: "Kanban", kind: "kanban" },
    { id: "scanners", label: "Scanner fleet", icon: "ScanSearch", kind: "monitor" },
    { id: "sbom", label: "SBOM components", icon: "Boxes", kind: "catalog" },
    { id: "cve", label: "Vulnerability record", icon: "FileText", kind: "detail" },
    { id: "hotspots", label: "Service risk heatmap", icon: "Target", kind: "heatmap" },
    { id: "gate", label: "Release security gate", icon: "GitMerge", kind: "checklist" },
    { id: "acceptance", label: "Risk acceptance queue", icon: "FileSignature", kind: "queue" },
    { id: "pentest", label: "Pentest scheduler", icon: "CalendarCheck", kind: "booking" },
    { id: "champions", label: "Team security scorecards", icon: "Trophy", kind: "scorecard" },
    { id: "trends", label: "Vulnerability trends", icon: "BarChart3", kind: "analytics" },
  ],
});
