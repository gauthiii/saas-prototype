// Shared icon registry used by the app shell, archetype screens, industry data files,
// and generateDeck.ts (pptx export). Data files reference icons by name (IconName), so
// any icon an industry needs must be listed here — tsc rejects unknown names.
import type { LucideIcon } from "lucide-react";
import {
  Accessibility, Activity, AlertCircle, AlertTriangle, Ambulance, Anchor, Antenna, Apple,
  AreaChart, ArrowLeftRight, ArrowUpDown, AtSign, Atom, Award, Baby, BadgeCheck,
  BadgePercent, Banknote, BarChart3, Barcode, Bath, BatteryCharging, Beaker, BedDouble,
  BedSingle, Beef, BellRing, Bike, Bird, Bitcoin, Blocks, BookMarked,
  BookOpen, Bot, Boxes, Brain, Briefcase, BriefcaseBusiness, Bug, Building,
  Building2, Bus, Calculator, Calendar, CalendarCheck, CalendarClock, CalendarDays, Camera,
  Car, CarFront, ChartBar, ChartLine, ChartPie, CheckCircle2, ChefHat, CircleDollarSign,
  CircuitBoard, Clapperboard, ClipboardList, Clock, Cloud, CloudOff, CloudRain, CloudSun,
  Code, Code2, Coffee, Cog, Coins, Compass, Construction, Contact,
  ContactRound, Container, Copyright, CornerDownRight, Cpu, CreditCard, Crosshair, Database,
  Dog, DollarSign, Download, Drill, Droplet, Drum, Dumbbell, Egg,
  Euro, EvCharger, Eye, EyeOff, Factory, FileBarChart, FileCheck, FileSignature,
  FileText, Files, Film, Filter, Fingerprint, FireExtinguisher, Fish, Flag,
  Flame, FlaskConical, Flower2, Folder, FolderOpen, Forklift, Fuel, Funnel,
  Gamepad2, Gauge, Gavel, Gem, Gift, GitBranch, GitMerge, GitPullRequest,
  Globe, GraduationCap, Guitar, Hammer, HandCoins, Handshake, HardDrive, HardHat,
  Hash, Headphones, Headset, Heart, HeartPulse, HelpCircle, Hexagon, History,
  Home, Hotel, House, IdCard, Image, Inbox, Info, Joystick,
  Kanban, Key, KeyRound, Lamp, Landmark, Laptop, Layers, LayoutDashboard,
  Leaf, Library, Lightbulb, LineChart, Link, ListChecks, Lock, LockKeyhole,
  LogIn, Luggage, Mail, MailOpen, Map, MapPin, Medal, Megaphone,
  MessageCircle, MessagesSquare, Mic, Microscope, Milk, Monitor, Mountain, Music,
  Navigation, Network, Newspaper, NotebookPen, Package, PackageCheck, PackageSearch, Paintbrush,
  Palette, PenTool, Percent, PersonStanding, Phone, PhoneCall, Pickaxe, PieChart,
  PiggyBank, Pill, Pizza, Plane, PlaneTakeoff, Play, Plug, PlugZap,
  Podcast, PoundSterling, Power, Presentation, Printer, Projector, Puzzle, QrCode,
  Radar, Radiation, Radio, RadioTower, Receipt, Recycle, RefreshCw, Repeat,
  Rocket, Route, Router, Ruler, Salad, Sandwich, Satellite, Scale,
  ScanFace, ScanLine, ScanSearch, School, Scroll, Search, Send, Server,
  Settings, Share2, Shield, ShieldAlert, ShieldCheck, Ship, Shirt, ShoppingBag,
  ShoppingCart, Signal, Siren, Smartphone, Smile, Sofa, Soup, Sparkle,
  Sparkles, Sprout, Stamp, Star, StarHalf, Stethoscope, Store, Sun,
  Syringe, Table, Table2, Tablet, Tag, Tags, Target, Terminal,
  TerminalSquare, TestTube, Thermometer, ThumbsUp, Ticket, Timer, Tractor, TrafficCone,
  Train, Trash2, TreePine, TrendingUp, Trophy, Truck, Tv, Undo2,
  Unlock, Upload, User, UserCheck, UserCog, UserPlus, Users, UsersRound,
  Utensils, UtensilsCrossed, Vault, Vote, Wallet, WalletCards, Wand2, Warehouse,
  Waves, Webhook, Wheat, Wifi, Wind, Workflow, Wrench, XCircle,
  Zap,
  Video,
} from "lucide-react";

export type IconType = LucideIcon;

export const ICONS = {
  // Navigation / shared
  Home, LogIn, UserPlus, User, Settings, HelpCircle, Headphones, Info,
  Tag, ShieldCheck, Sparkles, Sparkle, AlertTriangle, AlertCircle, Palette, Rocket,
  CornerDownRight, LayoutDashboard, Search, Eye, EyeOff, Wand2,

  // Workspace & utilities
  Inbox, Mail, MailOpen, AtSign, Calendar, CalendarDays, CalendarCheck, CalendarClock,
  Clock, History, FileText, Files, FileCheck, FileBarChart, FileSignature, Folder,
  FolderOpen, Download, Upload, Printer, UserCog, UsersRound, Contact, ContactRound,
  Kanban, Table, Table2, ListChecks, ClipboardList, CheckCircle2, XCircle, Filter,
  Funnel, Workflow, RefreshCw, Repeat, Undo2, ArrowUpDown, ArrowLeftRight, Link,
  Share2,

  // Charts
  BarChart3, PieChart, LineChart, AreaChart, ChartPie, ChartLine, ChartBar, TrendingUp,
  Activity, Gauge, Target, Crosshair, Radar,

  // Finance, banking & crypto
  Landmark, Banknote, CreditCard, Send, PiggyBank, Shield, DollarSign, CircleDollarSign,
  Euro, PoundSterling, Receipt, Calculator, Coins, HandCoins, Wallet, WalletCards,
  Vault, Bitcoin, Gem, Hexagon, Blocks, Layers, Scale,

  // Health, wellness & fitness
  HeartPulse, Heart, Stethoscope, Syringe, Pill, BedDouble, BedSingle, Ambulance,
  Brain, Smile, Microscope, TestTube, FlaskConical, Beaker, Accessibility, PersonStanding,
  Baby, Dumbbell, Timer, Trophy, Medal, Flower2, Bath, Apple,
  Salad,

  // Tech, DevOps & security
  TerminalSquare, Terminal, Code, Code2, GitBranch, GitPullRequest, GitMerge, Webhook,
  Server, Database, HardDrive, Cloud, CloudOff, Network, Cpu, CircuitBoard,
  Bot, Bug, ScanSearch, Lock, LockKeyhole, Unlock, Key, KeyRound,
  Fingerprint, ScanFace, IdCard, BadgeCheck, ShieldAlert, BellRing, Flag, Boxes,
  Puzzle, Monitor, Laptop, Tablet, Smartphone,

  // Telecom & media
  Video, Wifi, Signal, Antenna, Router, Satellite, RadioTower, Phone, PhoneCall,
  Headset, Film, Clapperboard, Tv, Music, Mic, Podcast, Radio,
  Newspaper, PenTool, Camera, Image, Play, Megaphone, MessageCircle, MessagesSquare,
  Hash, ThumbsUp, Drum, Guitar, Gamepad2, Joystick,

  // People, HR & education
  Users, UserCheck, Briefcase, BriefcaseBusiness, GraduationCap, School, BookOpen, BookMarked,
  Library, NotebookPen, Presentation, Projector, Award, Handshake, Star, StarHalf,

  // Retail, food & hospitality
  ShoppingCart, ShoppingBag, Store, Package, PackageCheck, PackageSearch, Truck, Percent,
  BadgePercent, Tags, Barcode, ScanLine, QrCode, Gift, Shirt, Utensils,
  UtensilsCrossed, ChefHat, Coffee, Pizza, Sandwich, Soup, Hotel, Luggage,
  Ticket, Sofa, Lamp,

  // Travel, mobility & logistics
  Plane, PlaneTakeoff, Train, Ship, Anchor, Car, CarFront, Bus,
  Bike, Fuel, PlugZap, EvCharger, Route, Navigation, Compass, Map,
  MapPin, Globe, Warehouse, Forklift, Container,

  // Property, legal & government
  Building, Building2, House, Gavel, Scroll, Stamp, Copyright, Vote,
  Siren, FireExtinguisher, Construction, TrafficCone, Hammer, Ruler, Drill, Paintbrush,

  // Energy, industry & agriculture
  Zap, Factory, BatteryCharging, Leaf, Wrench, Cog, Sun, Flame,
  Droplet, HardHat, Atom, Radiation, Plug, Power, Lightbulb, Recycle,
  Trash2, Pickaxe, Wheat, Sprout, Tractor, TreePine, Bird, Fish,
  Beef, Milk, Egg, CloudRain, CloudSun, Thermometer, Wind, Waves,
  Mountain, Dog,
} satisfies Record<string, IconType>;

export type IconName = keyof typeof ICONS;

export const icon = (name: string): IconType => (ICONS as Record<string, IconType>)[name] ?? ICONS.Sparkles;
