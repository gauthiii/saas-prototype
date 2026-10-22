// src/industries/devops/manifest.ts — StackOps (IT / DevOps), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "devops", label: "IT / DevOps", sub: "Logs \u00b7 Incidents \u00b7 Security \u00b7 FinOps", icon: "TerminalSquare", productName: "StackOps",
  order: 3,
  styles: { default: "pro-dark", recommended: ["cyber", "minimal", "enterprise"] },
  bespoke: {
    module: "devops", prefix: "DevOps",
    appViews: [
      { id: "dash", label: "Ops dashboard", icon: "LayoutDashboard", comp: "DevOpsDashboard" },
      { id: "deploys", label: "CI/CD pipelines", icon: "GitBranch", comp: "DeploymentsScreen" },
      { id: "alerts", label: "Alerts & on-call", icon: "BellRing", comp: "AlertsScreen" },
      { id: "board", label: "Incident board", icon: "Boxes", comp: "KanbanMini", wrap: "max-w-md mx-auto" },
      { id: "logs", label: "Log viewer", icon: "ListChecks", comp: "LiveLogs", wrap: "max-w-3xl mx-auto" },
      { id: "flags", label: "Feature flags", icon: "Flag", comp: "FeatureFlags" },
      { id: "costs", label: "Cloud costs", icon: "DollarSign", comp: "CostScreen" },
      { id: "iam", label: "IAM & security", icon: "Lock", comp: "IAMSecurityScreen" },
    ],
  },
  screens: [
    { id: "services", label: "Service catalog", icon: "Boxes", kind: "catalog" },
    { id: "readiness", label: "Production readiness", icon: "ListChecks", kind: "checklist" },
    { id: "postmortems", label: "Postmortem tracker", icon: "Route", kind: "tracker" },
    { id: "envs", label: "Environment booking", icon: "CalendarCheck", kind: "booking" },
  ],
});
