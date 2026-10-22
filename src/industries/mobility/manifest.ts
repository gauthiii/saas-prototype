// src/industries/mobility/manifest.ts — Torque (Automotive & Mobility / connected-vehicle operations).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "mobility", label: "Automotive & Mobility", sub: "Vehicles · Service · Fleets · Charging", icon: "Car", productName: "Torque",
  order: 15,
  styles: { default: "modern", recommended: ["pro-dark", "enterprise", "bento"] },
  screens: [
    { id: "ops", label: "Connected fleet overview", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "livemap", label: "Live vehicle map", icon: "Map", kind: "map" },
    { id: "telemetry", label: "Vehicle telemetry", icon: "Gauge", kind: "monitor" },
    { id: "dtc", label: "Diagnostic code stream", icon: "Activity", kind: "feed" },
    { id: "campaigns", label: "Recall & OTA campaigns", icon: "Route", kind: "tracker" },
    { id: "ota", label: "OTA release builder", icon: "RefreshCw", kind: "wizard" },
    { id: "warranty", label: "Warranty claim review", icon: "FileCheck", kind: "queue" },
    { id: "vehicle", label: "Vehicle profile", icon: "CarFront", kind: "detail" },
    { id: "utilization", label: "Depot utilization", icon: "CalendarDays", kind: "heatmap" },
    { id: "registry", label: "VIN registry", icon: "Table2", kind: "table" },
    { id: "consent", label: "Data-sharing consents", icon: "ShieldCheck", kind: "matrix" },
    { id: "battery", label: "Battery & range analytics", icon: "BatteryCharging", kind: "analytics" },
  ],
});
