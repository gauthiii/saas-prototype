// src/industries/gym/manifest.ts — Repcount (Gyms & studios club operations).
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "gym", label: "Gyms & Studios", sub: "Memberships · Classes · Check-ins · Trainers", icon: "Trophy", productName: "Repcount", parent: "fitness",
  order: 1,
  styles: { default: "brutalism", recommended: ["bento", "pro-dark", "colorful"] },
  screens: [
    { id: "floor", label: "Club floor dashboard", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "timetable", label: "Class timetable", icon: "CalendarClock", kind: "calendar" },
    { id: "classbook", label: "Class booking", icon: "Ticket", kind: "booking" },
    { id: "roster", label: "Membership roster", icon: "IdCard", kind: "table" },
    { id: "freezes", label: "Freeze & cancel requests", icon: "Timer", kind: "queue" },
    { id: "ptpipeline", label: "PT sales pipeline", icon: "Kanban", kind: "kanban" },
    { id: "trials", label: "Trial-to-member funnel", icon: "Funnel", kind: "funnel" },
    { id: "equipment", label: "Equipment health", icon: "Gauge", kind: "monitor" },
    { id: "coaches", label: "Trainer scorecard", icon: "Medal", kind: "scorecard" },
    { id: "openclose", label: "Open & close checklist", icon: "ListChecks", kind: "checklist" },
    { id: "member", label: "Member profile", icon: "User", kind: "detail" },
    { id: "frontdesk", label: "Front desk messages", icon: "MessagesSquare", kind: "chat" },
  ],
});
