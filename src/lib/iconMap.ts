// Shared icon registry used by App.tsx (sidebar) and generateDeck.ts (pptx export).
// Add new icons here only — never maintain separate maps in consumer files.
import type { LucideIcon } from "lucide-react";
import {
  Landmark, HeartPulse, TerminalSquare, Users, GraduationCap,
  LayoutDashboard, FileText, CalendarDays, ListChecks, BarChart3,
  Boxes, CreditCard, Send, PiggyBank, Shield, TrendingUp, Building2,
  Video, Pill, BedDouble, ClipboardList, Receipt,
  GitBranch, BellRing, Flag, DollarSign, Lock,
  UserCheck, Briefcase, MessageCircle,
  Home, LogIn, UserPlus, User, Settings, HelpCircle, Headphones,
  Info, Tag, ShieldCheck, Sparkles, AlertTriangle, Palette, Rocket,
  ShoppingCart, Package, Truck, Percent, Star,
  Banknote, ArrowLeftRight, Globe,
  Zap, Factory, BatteryCharging, Leaf, Gauge, Wrench,
  Sun, Flame, Droplet, CloudOff, HardHat, Atom, Container, Radiation,
  CornerDownRight,
} from "lucide-react";

export type IconType = LucideIcon;

export const ICONS: Record<string, IconType> = {
  // Navigation / shared
  Home, LogIn, UserPlus, User, Settings, HelpCircle, Headphones,
  Info, Tag, ShieldCheck, Sparkles, AlertTriangle, Palette, Rocket,

  // Fintech / banking
  Landmark, CreditCard, Send, PiggyBank, Shield, TrendingUp, Building2,
  DollarSign, Receipt, BarChart3, Banknote, ArrowLeftRight, Globe, Flag,
  Lock, CornerDownRight,

  // HealthTech
  HeartPulse, Video, Pill, BedDouble, ClipboardList, CalendarDays,

  // DevOps
  TerminalSquare, GitBranch, BellRing, Boxes,

  // HRTech
  Users, UserCheck, Briefcase, MessageCircle,

  // EdTech
  GraduationCap, ListChecks, FileText,

  // RetailTech
  ShoppingCart, Package, Truck, Percent, Star,

  // EnergyTech / Fossil / Renewable / Nuclear
  Zap, Factory, BatteryCharging, Leaf, Gauge, Wrench,
  Sun, Flame, Droplet, CloudOff, HardHat, Atom, Container, Radiation,

  // Generic layout
  LayoutDashboard,
};
