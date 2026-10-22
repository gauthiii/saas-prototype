// src/industries/streaming/manifest.ts — Reelhouse (Video Streaming), sub-category of Media & Streaming.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "streaming", label: "Video Streaming", sub: "Catalog · Subscribers · Playback · Releases", icon: "Tv", productName: "Reelhouse", parent: "media",
  order: 1,
  styles: { default: "glass", recommended: ["pro-dark", "cyber", "aurora"] },
  screens: [
    { id: "catalog", label: "Catalog browser", icon: "Film", kind: "media" },
    { id: "subscribers", label: "Subscriber analytics", icon: "BarChart3", kind: "analytics" },
    { id: "conversion", label: "Trial-to-paid funnel", icon: "Funnel", kind: "funnel" },
    { id: "qoe", label: "Playback QoE monitor", icon: "Gauge", kind: "monitor" },
    { id: "events", label: "Playback event stream", icon: "Activity", kind: "feed" },
    { id: "releases", label: "Release calendar", icon: "CalendarClock", kind: "calendar" },
    { id: "encoding", label: "Encoding pipeline", icon: "Workflow", kind: "tracker" },
    { id: "tiers", label: "Plan tiers", icon: "Scale", kind: "comparison" },
    { id: "cdn", label: "CDN edge map", icon: "Globe", kind: "map" },
    { id: "members", label: "Member accounts", icon: "Users", kind: "table" },
    { id: "care", label: "Member care", icon: "MessagesSquare", kind: "chat" },
    { id: "launch", label: "Title launch checklist", icon: "ListChecks", kind: "checklist" },
  ],
});
