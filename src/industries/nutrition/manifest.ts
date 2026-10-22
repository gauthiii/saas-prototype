// src/industries/nutrition/manifest.ts — Plateful (Non-clinical nutrition coaching).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "nutrition", label: "Nutrition & Coaching", sub: "Clients · Meal plans · Check-ins · Programs", icon: "Salad", productName: "Plateful", parent: "fitness",
  order: 3,
  styles: { default: "clay", recommended: ["minimal", "modern", "colorful"] },
  screens: [
    { id: "coachdash", label: "Coaching dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "clients", label: "Client roster", icon: "Users", kind: "table" },
    { id: "weekly", label: "Weekly check-in queue", icon: "Inbox", kind: "queue" },
    { id: "client", label: "Client profile", icon: "User", kind: "detail" },
    { id: "plans", label: "Meal plan library", icon: "Utensils", kind: "catalog" },
    { id: "messages", label: "Client messages", icon: "MessagesSquare", kind: "chat" },
    { id: "programs", label: "Program comparison", icon: "Scale", kind: "comparison" },
    { id: "intake", label: "Client intake wizard", icon: "Wand2", kind: "wizard" },
    { id: "habits", label: "Habit adherence heatmap", icon: "Leaf", kind: "heatmap" },
    { id: "progress", label: "Program progress tracker", icon: "Route", kind: "tracker" },
    { id: "lessons", label: "Lesson & recipe library", icon: "Play", kind: "media" },
    { id: "outcomes", label: "Coaching outcomes", icon: "BarChart3", kind: "analytics" },
  ],
});
