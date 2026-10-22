// src/industries/citizen/manifest.ts — OneCounter (Citizen Services), sub-category of GovTech & Public Sector.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "citizen", label: "Citizen Services", sub: "Applications · Permits · Payments · 311", icon: "Vote", productName: "OneCounter", parent: "govtech",
  order: 1,
  styles: { default: "minimal", recommended: ["modern", "clinical", "bento"] },
  screens: [
    { id: "services", label: "Online service catalog", icon: "Store", kind: "catalog" },
    { id: "apply", label: "Residential permit application", icon: "ClipboardList", kind: "wizard" },
    { id: "status", label: "Application status tracker", icon: "Route", kind: "tracker" },
    { id: "intake", label: "311 request intake", icon: "Megaphone", kind: "form" },
    { id: "live311", label: "Live 311 activity", icon: "Activity", kind: "feed" },
    { id: "appointments", label: "City Hall appointments", icon: "CalendarCheck", kind: "booking" },
    { id: "payments", label: "Resident payments ledger", icon: "WalletCards", kind: "ledger" },
    { id: "clerkreview", label: "Clerk review queue", icon: "FileCheck", kind: "queue" },
    { id: "accounts", label: "Resident accounts", icon: "UsersRound", kind: "table" },
    { id: "helpdesk", label: "Resident live chat", icon: "MessagesSquare", kind: "chat" },
    { id: "adoption", label: "Digital adoption funnel", icon: "Funnel", kind: "funnel" },
    { id: "waits", label: "Counter wait times", icon: "Clock", kind: "heatmap" },
  ],
});
