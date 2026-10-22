// src/industries/identity/manifest.ts — Keyring (Identity & Access), sub-category of Cybersecurity.
import { defineManifest } from "../types";

export const manifest = defineManifest({
  id: "identity", label: "Identity & Access", sub: "Users · SSO · MFA · Access reviews", icon: "Fingerprint", productName: "Keyring", parent: "cybersecurity",
  order: 2,
  styles: { default: "liquid-glass", recommended: ["minimal", "enterprise", "glass"] },
  screens: [
    { id: "overview", label: "Identity posture", icon: "LayoutDashboard", kind: "dashboard" },
    { id: "directory", label: "User directory", icon: "Users", kind: "table" },
    { id: "lifecycle", label: "Joiner-mover-leaver tracker", icon: "Route", kind: "tracker" },
    { id: "requests", label: "Access requests", icon: "KeyRound", kind: "queue" },
    { id: "certify", label: "Access review campaign", icon: "ListChecks", kind: "checklist" },
    { id: "entitlements", label: "Role entitlement matrix", icon: "Table2", kind: "matrix" },
    { id: "apps", label: "SSO app catalog", icon: "Blocks", kind: "catalog" },
    { id: "signins", label: "Sign-in risk map", icon: "MapPin", kind: "map" },
    { id: "mfa", label: "MFA method comparison", icon: "Scale", kind: "comparison" },
    { id: "connect", label: "App connection wizard", icon: "Link", kind: "wizard" },
    { id: "audit", label: "Identity audit trail", icon: "History", kind: "timeline" },
    { id: "passkeys", label: "Passkey rollout funnel", icon: "Funnel", kind: "funnel" },
  ],
});
