// src/industries/dataplatform/manifest.ts — Datastack (Data & ML Platform), sub-category of IT / DevOps.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "dataplatform", label: "Data & ML Platform", sub: "Pipelines · Warehouse · Models · Quality", icon: "Database", productName: "Datastack", parent: "devops",
  order: 3,
  styles: { default: "bento", recommended: ["modern", "pro-dark", "editorial"] },
  screens: [
    { id: "platform", label: "Platform overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "runs", label: "Pipeline run tracker", icon: "Workflow", kind: "tracker" },
    { id: "ingest", label: "Ingestion monitor", icon: "Activity", kind: "monitor" },
    { id: "freshness", label: "Freshness heatmap", icon: "Timer", kind: "heatmap" },
    { id: "datasets", label: "Data catalog", icon: "Layers", kind: "catalog" },
    { id: "quality", label: "Dataset quality scorecards", icon: "BadgeCheck", kind: "scorecard" },
    { id: "warehouse", label: "Warehouse usage", icon: "BarChart3", kind: "analytics" },
    { id: "models", label: "Model registry", icon: "Brain", kind: "table" },
    { id: "champion", label: "Champion vs. challengers", icon: "Scale", kind: "comparison" },
    { id: "access", label: "Data access requests", icon: "KeyRound", kind: "queue" },
    { id: "policies", label: "Masking & access policies", icon: "LockKeyhole", kind: "matrix" },
    { id: "newpipeline", label: "New pipeline wizard", icon: "Wand2", kind: "wizard" },
  ],
});
