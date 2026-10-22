// src/industries/edtech/manifest.ts — LearnLab (EdTech), hand-coded domain + archetype extension screens.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "edtech", label: "EdTech", sub: "LMS \u00b7 Assessments \u00b7 Classroom", icon: "GraduationCap", productName: "LearnLab",
  order: 5,
  styles: { default: "clay", recommended: ["colorful", "bento", "retro"] },
  bespoke: {
    module: "edtech", prefix: "EdTech",
    appViews: [
      { id: "dash", label: "Learning dashboard", icon: "LayoutDashboard", comp: "LMSDashboard" },
      { id: "classroom", label: "Virtual classroom", icon: "Video", comp: "VirtualClassroomScreen" },
      { id: "quiz", label: "Checkpoint quiz", icon: "ListChecks", comp: "QuizScreen" },
      { id: "grading", label: "Grading matrix", icon: "ClipboardList", comp: "GradingMatrixScreen" },
      { id: "parent", label: "Parent portal", icon: "MessageCircle", comp: "ParentPortalScreen" },
    ],
  },
  screens: [
    { id: "catalog", label: "Course catalog", icon: "Library", kind: "catalog" },
    { id: "timetable", label: "Class timetable", icon: "CalendarClock", kind: "calendar" },
    { id: "assignments", label: "Assignment board", icon: "Kanban", kind: "kanban" },
    { id: "mastery", label: "Concept mastery heatmap", icon: "Target", kind: "heatmap" },
    { id: "certificates", label: "Certificate tracker", icon: "Award", kind: "tracker" },
    { id: "discussions", label: "Course discussions", icon: "MessagesSquare", kind: "chat" },
    { id: "builder", label: "Course builder", icon: "Wand2", kind: "wizard" },
  ],
});
