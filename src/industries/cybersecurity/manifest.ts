// src/industries/cybersecurity/manifest.ts — Bastion (Cybersecurity · unified security operations & posture).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "cybersecurity", label: "Cybersecurity", sub: "Threats · Identity · Vulnerabilities · Compliance", icon: "ShieldAlert", productName: "Bastion",
  order: 19,
  styles: { default: "cyber", recommended: ["pro-dark", "enterprise", "aurora"] },
  screens: [
    { id: "posture", label: "Security posture", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "threatmap", label: "Threat activity map", icon: "Globe", kind: "map" },
    { id: "incidents", label: "Incident board", icon: "Kanban", kind: "kanban" },
    { id: "detections", label: "Unified detections", icon: "Radar", kind: "feed" },
    { id: "assets", label: "Asset inventory", icon: "Server", kind: "table" },
    { id: "riskmap", label: "Business risk heatmap", icon: "Target", kind: "heatmap" },
    { id: "controls", label: "NIST CSF controls", icon: "ListChecks", kind: "checklist" },
    { id: "exceptions", label: "Risk exception requests", icon: "FileSignature", kind: "queue" },
    { id: "vendors", label: "Third-party risk", icon: "Handshake", kind: "scorecard" },
    { id: "response", label: "Incident response tracker", icon: "Siren", kind: "tracker" },
    { id: "exercises", label: "Security calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "metrics", label: "Program metrics", icon: "BarChart3", kind: "analytics" },
  ],
});
