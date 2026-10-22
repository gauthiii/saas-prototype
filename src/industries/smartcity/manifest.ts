// src/industries/smartcity/manifest.ts — Metropolis (Smart City), sub-category of GovTech & Public Sector.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "smartcity", label: "Smart City", sub: "Sensors · Traffic · Utilities · Air quality", icon: "Building", productName: "Metropolis", parent: "govtech",
  order: 2,
  styles: { default: "glass", recommended: ["cyber", "pro-dark", "aurora"] },
  screens: [
    { id: "urbanops", label: "Urban operations center", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "sensormap", label: "Sensor network map", icon: "Radar", kind: "map" },
    { id: "corridors", label: "Signal corridor monitor", icon: "TrafficCone", kind: "monitor" },
    { id: "airquality", label: "Air quality heatmap", icon: "Wind", kind: "heatmap" },
    { id: "telemetry", label: "IoT telemetry stream", icon: "Radio", kind: "feed" },
    { id: "water", label: "Water network analytics", icon: "Droplet", kind: "analytics" },
    { id: "devices", label: "Device registry", icon: "Cpu", kind: "table" },
    { id: "fieldwork", label: "Field maintenance board", icon: "Wrench", kind: "kanban" },
    { id: "automations", label: "Automation rules", icon: "Workflow", kind: "matrix" },
    { id: "streetlights", label: "Streetlight retrofit tracker", icon: "Lightbulb", kind: "tracker" },
    { id: "vendors", label: "Sensor vendor comparison", icon: "Scale", kind: "comparison" },
    { id: "anomalies", label: "Anomaly triage", icon: "AlertTriangle", kind: "queue" },
  ],
});
