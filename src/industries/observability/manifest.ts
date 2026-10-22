// src/industries/observability/manifest.ts — Tracelight (Observability & APM), sub-category of IT / DevOps.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "observability", label: "Observability & APM", sub: "Traces · Metrics · Logs · SLOs", icon: "Activity", productName: "Tracelight", parent: "devops",
  order: 1,
  styles: { default: "cyber", recommended: ["pro-dark", "minimal", "enterprise"] },
  screens: [
    { id: "apm", label: "APM overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "traces", label: "Trace explorer", icon: "Search", kind: "table" },
    { id: "trace", label: "Service profile", icon: "Network", kind: "detail" },
    { id: "slos", label: "SLO scorecards", icon: "Target", kind: "scorecard" },
    { id: "latency", label: "Endpoint latency heatmap", icon: "Gauge", kind: "heatmap" },
    { id: "metrics", label: "Metrics explorer", icon: "LineChart", kind: "analytics" },
    { id: "hosts", label: "Host & container monitor", icon: "Server", kind: "monitor" },
    { id: "synthetics", label: "Synthetic checks map", icon: "Globe", kind: "map" },
    { id: "rum", label: "Real-user journey funnel", icon: "Funnel", kind: "funnel" },
    { id: "changes", label: "Change correlation timeline", icon: "History", kind: "timeline" },
    { id: "canary", label: "Canary vs. baseline", icon: "Scale", kind: "comparison" },
    { id: "instrument", label: "Instrument a service", icon: "Wand2", kind: "wizard" },
  ],
});
