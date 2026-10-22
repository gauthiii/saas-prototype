// src/industries/edtech/data.ts — LearnLab extension content (shared pages + archetype extension screens).
// The hand-coded module src/domains/edtech.tsx owns meta / extra / story. Fictional school, people and figures;
// learners appear by first name and last initial, matching the FERPA framing of the bespoke screens.
import { defineData } from "../types";
import { manifest } from "./manifest";

export default defineData(manifest, {
  shared: {
    onboarding: {
      steps: [
        { title: "Your institution", description: "Tell us who you teach so LearnLab can set up terms and course templates.", fields: [
          { label: "Institution name", type: "text", placeholder: "Brookfield Academy", half: true },
          { label: "Learners", type: "select", options: ["Under 500", "500–2,000", "2,000–10,000", "10,000+"], half: true },
          { label: "Institution type", type: "radio", options: ["K-12 school", "University", "Corporate academy", "Bootcamp"] },
        ] },
        { title: "Connect your systems", description: "Rosters and grades sync with your SIS; content plugs in over LTI.", fields: [
          { label: "Roster sync", type: "select", options: ["OneRoster 1.2 API", "OneRoster CSV", "Manual CSV upload"] },
          { label: "Grade passback", type: "toggle", value: "true" },
          { label: "Import SCORM / xAPI packages", type: "toggle" },
        ] },
        { title: "Student privacy", description: "Configure consent and data settings before students join.", fields: [
          { label: "Learners under 13", type: "radio", options: ["Yes — use school consent flow", "No"] },
          { label: "Parent portal and weekly digests", type: "toggle", value: "true" },
        ] },
        { title: "Invite instructors", description: "Instructors can build courses and start live classes right away.", fields: [
          { label: "Instructor emails", type: "textarea", placeholder: "one email per line" },
        ] },
      ],
    },
    team: {
      roles: [
        { name: "Institution admin", description: "Manages the workspace, integrations and privacy settings.", permissions: ["SIS and LTI integrations", "Consent and data settings", "Billing"] },
        { name: "Instructor", description: "Builds courses, teaches live and grades.", permissions: ["Create and publish courses", "Run live classrooms", "Grade and message families"] },
        { name: "Teaching assistant", description: "Supports an instructor's sections.", permissions: ["Moderate discussions", "Grade with rubrics", "Take attendance"] },
        { name: "Counselor", description: "Monitors progress and early alerts.", permissions: ["View learner analytics", "Act on early alerts", "Message guardians"] },
      ],
      members: [
        { name: "Amara Okafor", email: "a.okafor@brookfield.example.org", role: "Institution admin", status: "Active", lastActive: "Just now" },
        { name: "Elaine Park", email: "e.park@brookfield.example.org", role: "Instructor", status: "Active", lastActive: "10 min ago" },
        { name: "Kevin Chen", email: "k.chen@brookfield.example.org", role: "Instructor", status: "Active", lastActive: "1 h ago" },
        { name: "Marisa Valdez", email: "m.valdez@brookfield.example.org", role: "Instructor", status: "Active", lastActive: "25 min ago" },
        { name: "Samir Haddad", email: "s.haddad@brookfield.example.org", role: "Teaching assistant", status: "Active", lastActive: "Yesterday" },
        { name: "Joanna Whitley", email: "j.whitley@brookfield.example.org", role: "Counselor", status: "Invited", lastActive: "—" },
      ],
    },
    billing: {
      plan: "School", price: "$3 per student / month", renews: "Aug 1, 2027", paymentMethod: "School purchase order PO-1187",
      usage: [
        { label: "Active students", used: 1240, limit: 1500, unit: "students" },
        { label: "Live classroom hours", used: 2860, limit: 5000, unit: "hours" },
        { label: "Recording storage", used: 418, limit: 1000, unit: "GB" },
        { label: "AI question generations", used: 7420, limit: 10000, unit: "questions" },
      ],
      invoices: [
        { id: "LL-2610-0457", date: "Oct 1, 2026", amount: "$3,720.00", status: "Due" },
        { id: "LL-2609-0457", date: "Sep 1, 2026", amount: "$3,684.00", status: "Paid" },
        { id: "LL-2608-0457", date: "Aug 1, 2026", amount: "$3,540.00", status: "Paid" },
        { id: "LL-2606-0457", date: "Jun 1, 2026", amount: "$3,510.00", status: "Paid" },
      ],
    },
    inbox: {
      threads: [
        { name: "Elaine Park", preview: "Algebra II §B early alerts — can we meet Thursday?", time: "9:48", avatar: "Elaine Park", unread: 2, tag: "Early alert" },
        { name: "Guardian of T. Nguyen", preview: "Question about next week's quiz make-up policy.", time: "8:30", avatar: "👪", tag: "Family" },
        { name: "Kevin Chen", preview: "Science project rubric is uploaded.", time: "Yesterday", avatar: "Kevin Chen" },
        { name: "Samir Haddad", preview: "Moderated 3 flagged posts in Module 3 forum.", time: "Mon", avatar: "Samir Haddad", tag: "Moderation" },
      ],
      messages: [
        { from: "them", text: "Three students in Algebra II §B missed two checkpoints in a row. Could we meet Thursday about interventions?", time: "9:40" },
        { from: "me", text: "Yes — 2:30 works. I'll pull their quiz telemetry and attendance before then.", time: "9:44" },
        { from: "them", text: "Thanks. I'd like to try the adaptive remediation path for two of them.", time: "9:48" },
      ],
    },
    search: {
      query: "closures",
      facets: ["Course", "Lesson", "Learner", "Discussion"],
      results: [
        { type: "Lesson", title: "Module 3 · Lesson 4 — Closures and stale state", snippet: "12 min video + 6 practice items · 62% first-try miss rate", meta: "Web Development (React)" },
        { type: "Discussion", title: "Why does my counter log the old value?", snippet: "Answered by Samir Haddad · 14 replies · marked resolved", meta: "Module 3 forum" },
        { type: "Course", title: "Web Development with React", snippet: "5 modules · 38 lessons · 248 active learners", meta: "Computer science" },
        { type: "Learner", title: "Omar H.", snippet: "Closures mastery 48% · remedial module assigned", meta: "Web Development (React)" },
      ],
    },
    calendar: {
      month: "November 2026", firstWeekday: 0, days: 30,
      events: [
        { date: 2, title: "Module 4 opens", tone: "blue" },
        { date: 5, title: "Checkpoint quiz 8", tone: "amber", time: "9:00 AM" },
        { date: 10, title: "Live class — Intro to Statistics", tone: "violet", time: "1:00 PM" },
        { date: 12, title: "Parent conferences", tone: "green", time: "4:00 PM" },
        { date: 13, title: "Science project due", tone: "red" },
        { date: 18, title: "Capstone proposals due", tone: "red", time: "11:59 PM" },
        { date: 20, title: "Term 1 grades close", tone: "gray" },
        { date: 25, title: "Thanksgiving break", tone: "gray" },
      ],
    },
    reports: {
      reports: [
        { name: "Course completion", description: "Completion and pacing per course, module and section.", category: "Learning", updated: "Today", format: "XLSX", owner: "Amara Okafor", schedule: "Weekly" },
        { name: "Early alerts", description: "Learners flagged for missed checkpoints or falling mastery.", category: "Student success", updated: "Today", format: "PDF", owner: "Joanna Whitley", schedule: "Daily" },
        { name: "Assessment item analysis", description: "Difficulty and discrimination for every quiz item.", category: "Assessment", updated: "Yesterday", format: "CSV", owner: "Elaine Park" },
        { name: "Live class engagement", description: "Attendance, polls, hand raises and talk time per session.", category: "Engagement", updated: "Oct 20", format: "PDF", owner: "Marisa Valdez", schedule: "Weekly" },
        { name: "Gradebook export", description: "Final and in-progress grades for SIS passback.", category: "Grades", updated: "Oct 19", format: "CSV", owner: "Amara Okafor", schedule: "Each term" },
        { name: "xAPI statement log", description: "Raw learning activity for analytics and research.", category: "Data", updated: "Today", format: "CSV", owner: "Samir Haddad" },
      ],
    },
    states: { noun: "courses", emptyTitle: "No courses yet", emptyBody: "Build a course from scratch, import a SCORM package or start from a LearnLab template.", emptyAction: "Build a course" },
  },
  screens: {
    catalog: {
      blurb: "Every course on offer as a card, with enrollment, format and seat availability.",
      bullets: ["Filter by subject area", "Seats-left bar and format on every course", "Save courses to a learner's plan"],
      subtitle: "Brookfield Academy · Spring 2027 enrollment",
      filters: ["Math", "Science", "Computer science", "Humanities"],
      primaryAction: "New course",
      items: [
        { name: "Algebra II", subtitle: "Dr. Elaine Park · 3 sections", emoji: "📐", price: "1 credit", badge: "Adaptive", tone: "blue", meta: "In person · 18 seats left", stock: 30, category: "Math" },
        { name: "Intro to Statistics", subtitle: "Marisa Valdez · live online", emoji: "📊", price: "1 credit", badge: "Live", tone: "violet", meta: "Virtual classroom · 42 registered", stock: 58, category: "Math" },
        { name: "Web Development with React", subtitle: "Marisa Valdez · dual-enrollment", emoji: "⚛️", price: "3 college credits", badge: "Few seats", tone: "amber", meta: "Hybrid · 6 seats left", stock: 12, category: "Computer science" },
        { name: "Biology with Lab", subtitle: "Kevin Chen · 2 sections", emoji: "🧬", price: "1 credit", meta: "In person · 22 seats left", stock: 44, category: "Science" },
        { name: "Environmental Science", subtitle: "Kevin Chen · project-based", emoji: "🌱", price: "1 credit", badge: "New", tone: "green", meta: "In person · 25 seats left", stock: 83, category: "Science" },
        { name: "Python for Data", subtitle: "Samir Haddad · self-paced", emoji: "🐍", price: "0.5 credit", badge: "Self-paced", tone: "blue", meta: "Online · open enrollment", stock: 90, category: "Computer science" },
        { name: "World History: 1900–Present", subtitle: "Dr. Leon Fairbanks · seminar", emoji: "🌍", price: "1 credit", meta: "In person · 9 seats left", stock: 30, category: "Humanities" },
        { name: "Creative Writing Workshop", subtitle: "Naomi Castellano · peer review", emoji: "✍️", price: "0.5 credit", badge: "Full", tone: "red", meta: "In person · waitlist 7", stock: 0, category: "Humanities" },
      ],
    },
    timetable: {
      blurb: "The week's class timetable — in-person periods, live online classes, office hours and assessments.",
      bullets: ["Week grid across every course", "Live sessions link straight into the virtual classroom", "Assessments and office hours colour-coded"],
      subtitle: "Brookfield Academy · instructor and section view",
      weekLabel: "Nov 16 – 20, 2026",
      days: ["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20"],
      startHour: 8, endHour: 17,
      legend: [{ label: "In person", tone: "green" }, { label: "Live online", tone: "blue" }, { label: "Office hours", tone: "violet" }, { label: "Assessment", tone: "amber" }],
      events: [
        { day: 0, start: 8.5, end: 9.5, title: "Algebra II §B", meta: "Rm 204 · Dr. Park", tone: "green" },
        { day: 0, start: 13, end: 14.5, title: "Intro to Statistics", meta: "Virtual classroom · 42 registered", tone: "blue" },
        { day: 1, start: 9, end: 10.5, title: "React lab · Module 4", meta: "Lab 2 + online · Ms. Valdez", tone: "green" },
        { day: 1, start: 11, end: 12, title: "Biology with Lab", meta: "Science wing · Mr. Chen", tone: "green" },
        { day: 1, start: 15, end: 16, title: "Algebra office hours", meta: "Online drop-in", tone: "violet" },
        { day: 2, start: 8.5, end: 9.5, title: "Algebra II §B", meta: "Rm 204", tone: "green" },
        { day: 2, start: 10, end: 11, title: "Checkpoint quiz 9", meta: "Algebra II · adaptive", tone: "amber" },
        { day: 2, start: 14, end: 15.5, title: "Intro to Statistics", meta: "Virtual · breakout projects", tone: "blue" },
        { day: 3, start: 9, end: 10.5, title: "React lab · capstone pitches", meta: "Lab 2 · guest reviewers", tone: "green" },
        { day: 3, start: 14.5, end: 15.5, title: "Intervention meeting", meta: "Dr. Park · counselor", tone: "violet" },
        { day: 4, start: 11, end: 12, title: "Biology lab practical", meta: "Science wing", tone: "amber" },
        { day: 4, start: 13, end: 14, title: "React office hours", meta: "Online · Samir (TA)", tone: "violet" },
      ],
    },
    assignments: {
      blurb: "Every assignment across courses, from drafted to graded, so nothing slips.",
      bullets: ["Columns from draft to graded", "Submission counts and due dates on each card", "Jump into the grading matrix from submitted work"],
      subtitle: "All sections · Term 1, week 11",
      columns: [
        { title: "Drafted", tone: "gray", cards: [
          { title: "Capstone proposal", meta: "Web Development (React) · opens Nov 2", tag: "Project", tone: "violet", avatar: "Marisa Valdez", value: "0/248" },
          { title: "Hypothesis testing lab", meta: "Intro to Statistics · due Nov 24", tag: "Lab", tone: "blue", avatar: "Marisa Valdez", value: "0/42" },
        ] },
        { title: "Open", tone: "blue", cards: [
          { title: "Chapter 8 problem set", meta: "Algebra II §B · due tonight 11:59 PM", tag: "Homework", tone: "blue", avatar: "Elaine Park", value: "27/30" },
          { title: "Science project", meta: "Biology with Lab · due Fri", tag: "Project", tone: "amber", avatar: "Kevin Chen", value: "18/52" },
          { title: "Closures practice set", meta: "React · Module 3 remedial · auto-assigned", tag: "Adaptive", tone: "violet", avatar: "Samir Haddad", value: "41/64" },
        ] },
        { title: "Submitted", tone: "amber", cards: [
          { title: "State management essay", meta: "React · 3 awaiting rubric grading", tag: "Essay", tone: "amber", avatar: "Marisa Valdez", value: "236/248" },
          { title: "Lab report: enzyme rates", meta: "Biology · 2 late submissions", tag: "Late", tone: "red", avatar: "Kevin Chen", value: "50/52" },
        ] },
        { title: "Graded", tone: "green", cards: [
          { title: "Checkpoint quiz 7", meta: "React · median 84% · 4 essays reviewed", tag: "Auto-graded", tone: "green", avatar: "Marisa Valdez", value: "84%" },
          { title: "Quadratics unit test", meta: "Algebra II · returned with feedback", tag: "Test", tone: "green", avatar: "Elaine Park", value: "79%" },
        ] },
      ],
    },
    mastery: {
      blurb: "Concept-level mastery for every learner, so remediation targets the exact gap.",
      bullets: ["Mastery percent per learner per concept", "Low cells trigger adaptive remedial modules", "Hover a cell for attempts and last practice"],
      subtitle: "Web Development (React) · Section 2 · Modules 2–4 · learners by first name and initial",
      rowLabel: "Learner",
      rows: ["Priya N.", "Omar H.", "Yuki S.", "Diego M.", "Lena K.", "Tomás R.", "Amira S.", "Ben W."],
      cols: ["Props", "useState", "useEffect", "Closures", "Context", "Reducers", "Memoization", "Testing"],
      values: [
        [96, 94, 88, 72, 84, 78, 70, 61],
        [90, 82, 64, 48, 70, 58, 52, 44],
        [98, 96, 92, 86, 90, 88, 85, 74],
        [88, 85, 71, 55, 66, 60, 58, 49],
        [92, 90, 80, 62, 76, 70, 64, 57],
        [84, 78, 60, 41, 58, 50, 46, 38],
        [94, 92, 86, 74, 82, 80, 77, 66],
        [86, 80, 68, 52, 64, 56, 50, 47],
      ],
      unit: "% mastery",
      legend: ["Not yet", "Mastered"],
      summary: [
        { label: "Section mastery", value: "72%", delta: "+6 pts in 3 weeks", tone: "green" },
        { label: "Weakest concept", value: "Closures", delta: "61% avg mastery", tone: "amber" },
        { label: "Remedial paths active", value: "5", delta: "Auto-assigned below 60%", tone: "blue" },
        { label: "Ready for capstone", value: "1 of 8", delta: "All concepts 70%+ · Yuki S.", tone: "violet" },
      ],
    },
    certificates: {
      blurb: "Track certificates, credit and micro-credentials from enrollment to issued.",
      bullets: ["Milestone stepper per credential", "Expected issue date", "Event log of modules, assessments and reviews"],
      subtitle: "Learner and educator credentials · Brookfield Academy",
      items: [
        { id: "CRT-REACT-0881", title: "Web Development (React) certificate — Priya N.", subtitle: "Dual-enrollment · 3 college credits", steps: ["Modules 1–2", "Module 3", "Module 4", "Capstone", "Issued"], current: 1, eta: "Est. Jan 22, 2027", status: "Module 3", tone: "blue", events: [
          { time: "Today", text: "Completed Lesson 6 of 9 in State & data flow" },
          { time: "Oct 14", text: "Checkpoint quiz 7 passed with 91%" },
          { time: "Sep 12", text: "Modules 1–2 completed" },
        ] },
        { id: "CRT-REACT-0879", title: "Web Development (React) certificate — Omar H.", subtitle: "Dual-enrollment · remedial path active", steps: ["Modules 1–2", "Module 3", "Module 4", "Capstone", "Issued"], current: 1, eta: "At risk — Feb 2027", status: "Needs support", tone: "amber", events: [
          { time: "Oct 20", text: "Closures remedial module assigned (mastery 48%)" },
          { time: "Oct 9", text: "Missed two checkpoint retakes" },
        ] },
        { id: "CRT-STAT-0112", title: "Statistics micro-credential — Fall cohort", subtitle: "Intro to Statistics · 42 learners", steps: ["Enrolled", "Units 1–3", "Project", "Assessment", "Issued"], current: 2, eta: "Dec 18", status: "Project", tone: "violet", events: [
          { time: "Oct 19", text: "38 of 42 submitted project proposals" },
          { time: "Oct 2", text: "Units 1–3 completed by 40 learners" },
        ] },
        { id: "CRT-PD-0034", title: "Adaptive Teaching educator badge — Kevin Chen", subtitle: "Professional development · 12 hours", steps: ["Enrolled", "Coursework", "Classroom evidence", "Review", "Issued"], current: 4, eta: "Issued Oct 16", status: "Issued", tone: "green", events: [
          { time: "Oct 16", text: "Badge issued and added to staff profile" },
          { time: "Oct 8", text: "Classroom evidence approved by instructional coach" },
        ] },
      ],
    },
    discussions: {
      blurb: "Course discussion threads with TA moderation, quick replies and course context.",
      bullets: ["Threads per course and module", "Instructor and TA answers pinned for everyone", "Moderation and participation context alongside"],
      subtitle: "Web Development (React) · Module 3 forum",
      threads: [
        { name: "Why does my counter log the old value?", preview: "Samir: the callback closed over the first render's count…", time: "10:21", avatar: "🧵", unread: 3, tag: "Module 3" },
        { name: "Capstone team finder", preview: "Yuki S.: looking for one more for a study-planner app", time: "9:02", avatar: "🤝", tag: "Capstone" },
        { name: "Algebra II §B — homework help", preview: "Dr. Park: hint for #14 posted", time: "Yesterday", avatar: "📐", tag: "Algebra II" },
        { name: "Intro to Statistics — live Q&A", preview: "Recording and transcript are up", time: "Mon", avatar: "📊", tag: "Statistics" },
      ],
      messages: [
        { from: "them", text: "My setInterval logs 0 every second even though the counter shows 5. What am I missing? — Omar H.", time: "10:02" },
        { from: "me", text: "Your effect ran once, so its callback closed over the first render's count. Try the updater form: setCount(c => c + 1).", time: "10:09" },
        { from: "them", text: "That fixed it! So any value read inside the interval is frozen from that render? — Omar H.", time: "10:15" },
        { from: "me", text: "Exactly. Lesson 4 has a 6-minute walkthrough of stale closures — I've pinned it to this thread.", time: "10:21" },
      ],
      quickReplies: ["Pinned the relevant lesson", "Great question — see the worked example", "Moving this to office hours"],
      context: { title: "Thread context", fields: [
        { label: "Course", value: "Web Development (React)" },
        { label: "Module", value: "3 · State & data flow" },
        { label: "Participants", value: "14 learners · 1 TA" },
        { label: "Moderation", value: "AI pre-screen on · 0 flags" },
        { label: "Status", value: "Resolved by TA" },
      ] },
    },
    builder: {
      blurb: "A guided builder to go from blank course to published, adaptive course in minutes.",
      bullets: ["Course basics, structure and pacing", "Assessments and adaptive remediation rules", "Accessibility and privacy checks before publishing"],
      subtitle: "New course · Brookfield Academy",
      steps: [
        { title: "Course basics", description: "Name, audience and credit.", fields: [
          { label: "Course title", type: "text", placeholder: "Environmental Science", half: true },
          { label: "Subject area", type: "select", options: ["Math", "Science", "Computer science", "Humanities"], half: true },
          { label: "Grade levels", type: "select", options: ["9–10", "11–12", "Dual-enrollment"], half: true },
          { label: "Credit", type: "select", options: ["0.5", "1", "3 college credits"], half: true },
          { label: "Description", type: "textarea", placeholder: "What will learners be able to do by the end?" },
        ] },
        { title: "Structure", description: "Modules, pacing and delivery.", fields: [
          { label: "Number of modules", type: "number", placeholder: "6", half: true },
          { label: "Delivery", type: "radio", options: ["In person", "Live online", "Hybrid", "Self-paced"] },
          { label: "Import SCORM or xAPI package", type: "toggle" },
        ] },
        { title: "Assessments", description: "How mastery is checked.", fields: [
          { label: "Checkpoint quizzes", type: "radio", options: ["After every lesson", "End of module", "None"] },
          { label: "Generate questions from readings with AI", type: "toggle", value: "true" },
          { label: "Default rubric", type: "select", options: ["Essay (5 criteria)", "Lab report", "Project", "None"] },
        ] },
        { title: "Adaptive rules", description: "When LearnLab should step in.", fields: [
          { label: "Assign remediation below mastery of", type: "select", options: ["50%", "60%", "70%"], half: true },
          { label: "Early alert after missed checkpoints", type: "select", options: ["1", "2", "3"], half: true },
          { label: "Notify guardians in weekly digest", type: "toggle", value: "true" },
        ] },
        { title: "Publish", description: "Final checks before learners can enroll.", fields: [
          { label: "Captions on all videos (WCAG 2.1 AA)", type: "toggle", value: "true" },
          { label: "Enrollment opens", type: "date", half: true },
          { label: "Visibility", type: "radio", options: ["Catalog", "Invite only"] },
        ] },
      ],
      finishLabel: "Publish course",
      successTitle: "Course published",
      successBody: "Your course is live in the catalog, adaptive rules are active and enrolled learners have been notified.",
    },
  },
});
