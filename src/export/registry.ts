// src/export/registry.ts — single source of truth for every domain's screen flow.
// Drives both the live App shell and the standalone App.tsx generated on export,
// so component/icon names are stored as strings and resolved at render time.

export type ViewDef = {
  id: string;
  label: string;
  icon: string;       // lucide-react icon export name
  comp: string;       // component export name in the domain module
  group: "Public" | "App" | "Account" | "Resources";
  wrap?: string;      // optional wrapper div className
};

export type DomainDef = {
  id: string;
  label: string;
  sub: string;
  icon: string;
  file: string;       // module under src/domains (without extension)
  productName: string;
  views: ViewDef[];
};

const SHARED_PUBLIC = (p: string): ViewDef[] => [
  { id: "home", label: "Home", icon: "Home", comp: `${p}Home`, group: "Public" },
  { id: "about", label: "About us", icon: "Info", comp: `${p}About`, group: "Public" },
  { id: "pricing", label: "Pricing", icon: "Tag", comp: `${p}Pricing`, group: "Public" },
  { id: "login", label: "Sign in", icon: "LogIn", comp: `${p}Login`, group: "Public" },
  { id: "register", label: "Create account", icon: "UserPlus", comp: `${p}Register`, group: "Public" },
];

const SHARED_ACCOUNT = (p: string): ViewDef[] => [
  { id: "notifications", label: "Notifications", icon: "BellRing", comp: `${p}Notifications`, group: "Account" },
  { id: "profile", label: "Profile", icon: "User", comp: `${p}Profile`, group: "Account" },
  { id: "settings", label: "Settings", icon: "Settings", comp: `${p}Settings`, group: "Account" },
  { id: "faq", label: "FAQ", icon: "HelpCircle", comp: `${p}FAQ`, group: "Account" },
  { id: "support", label: "Support", icon: "Headphones", comp: `${p}Support`, group: "Account" },
];

const SHARED_RESOURCES = (p: string): ViewDef[] => [
  { id: "privacy", label: "Privacy & compliance", icon: "ShieldCheck", comp: `${p}Privacy`, group: "Resources" },
  { id: "changelog", label: "What's new", icon: "Sparkles", comp: `${p}Changelog`, group: "Resources" },
  { id: "notfound", label: "404 page", icon: "AlertTriangle", comp: `${p}NotFound`, group: "Resources" },
];

export const DOMAIN_DEFS: DomainDef[] = [
  {
    id: "fintech", label: "FinTech", sub: "Banking · Treasury · Compliance", icon: "Landmark", file: "fintech", productName: "FinFlow",
    views: [
      ...SHARED_PUBLIC("Fintech"),
      { id: "dash", label: "Treasury dashboard", icon: "LayoutDashboard", comp: "FintechDashboard", group: "App" },
      { id: "payments", label: "Send a payment", icon: "Send", comp: "PaymentsScreen", group: "App" },
      { id: "cards", label: "Corporate cards", icon: "CreditCard", comp: "CardsScreen", group: "App" },
      { id: "invoice", label: "New invoice", icon: "FileText", comp: "InvoiceForm", group: "App" },
      { id: "expenses", label: "Expense approvals", icon: "Receipt", comp: "ExpenseApprovals", group: "App" },
      { id: "budgets", label: "Budgets", icon: "PiggyBank", comp: "BudgetsScreen", group: "App" },
      { id: "payroll", label: "Payroll disbursement", icon: "Building2", comp: "PayrollDisbursementScreen", group: "App" },
      { id: "compliance", label: "Risk & compliance", icon: "Shield", comp: "RiskComplianceScreen", group: "App" },
      { id: "wealth", label: "Liquidity optimizer", icon: "TrendingUp", comp: "WealthOptimizerScreen", group: "App" },
      { id: "analytics", label: "Analytics", icon: "BarChart3", comp: "FintechAnalytics", group: "App" },
      ...SHARED_ACCOUNT("Fintech"),
      ...SHARED_RESOURCES("Fintech"),
    ],
  },
  {
    id: "health", label: "HealthTech", sub: "EHR · ER · Scheduling · Billing", icon: "HeartPulse", file: "healthtech", productName: "MedOS",
    views: [
      ...SHARED_PUBLIC("Health"),
      { id: "dash", label: "Clinical dashboard", icon: "LayoutDashboard", comp: "HealthDashboard", group: "App" },
      { id: "intake", label: "Patient intake form", icon: "ClipboardList", comp: "IntakeForm", group: "App" },
      { id: "scheduler", label: "Appointment grid", icon: "CalendarDays", comp: "SchedulerScreen", group: "App" },
      { id: "patients", label: "Patient directory", icon: "Users", comp: "PatientDirectory", group: "App" },
      { id: "telehealth", label: "Telehealth suite", icon: "Video", comp: "TelehealthScreen", group: "App" },
      { id: "pharmacy", label: "Pharmacy inventory", icon: "Pill", comp: "PharmacyInventory", group: "App" },
      { id: "wards", label: "Ward occupancy", icon: "BedDouble", comp: "WardOccupancy", group: "App" },
      { id: "billing", label: "Medical billing", icon: "Receipt", comp: "MedicalBillingScreen", group: "App" },
      ...SHARED_ACCOUNT("Health"),
      ...SHARED_RESOURCES("Health"),
    ],
  },
  {
    id: "devops", label: "IT / DevOps", sub: "Logs · Incidents · Security · FinOps", icon: "TerminalSquare", file: "devops", productName: "StackOps",
    views: [
      ...SHARED_PUBLIC("DevOps"),
      { id: "dash", label: "Ops dashboard", icon: "LayoutDashboard", comp: "DevOpsDashboard", group: "App" },
      { id: "deploys", label: "CI/CD pipelines", icon: "GitBranch", comp: "DeploymentsScreen", group: "App" },
      { id: "alerts", label: "Alerts & on-call", icon: "BellRing", comp: "AlertsScreen", group: "App" },
      { id: "board", label: "Incident board", icon: "Boxes", comp: "KanbanMini", group: "App", wrap: "max-w-md mx-auto" },
      { id: "logs", label: "Log viewer", icon: "ListChecks", comp: "LiveLogs", group: "App", wrap: "max-w-3xl mx-auto" },
      { id: "flags", label: "Feature flags", icon: "Flag", comp: "FeatureFlags", group: "App" },
      { id: "costs", label: "Cloud costs", icon: "DollarSign", comp: "CostScreen", group: "App" },
      { id: "iam", label: "IAM & security", icon: "Lock", comp: "IAMSecurityScreen", group: "App" },
      ...SHARED_ACCOUNT("DevOps"),
      ...SHARED_RESOURCES("DevOps"),
    ],
  },
  {
    id: "hrtech", label: "HRTech", sub: "ATS · Onboarding · Talent · DEI", icon: "Users", file: "hrtech", productName: "TalentOS",
    views: [
      ...SHARED_PUBLIC("HR"),
      { id: "pipeline", label: "Candidate pipeline", icon: "LayoutDashboard", comp: "ATSPipeline", group: "App" },
      { id: "jobpost", label: "Create job posting", icon: "FileText", comp: "JobPostForm", group: "App" },
      { id: "onboarding", label: "Onboarding center", icon: "UserCheck", comp: "OnboardingScreen", group: "App" },
      { id: "talent", label: "Talent marketplace", icon: "Briefcase", comp: "TalentMarketplaceScreen", group: "App" },
      { id: "dei", label: "DEI analytics", icon: "BarChart3", comp: "DEIAnalyticsScreen", group: "App" },
      ...SHARED_ACCOUNT("HR"),
      ...SHARED_RESOURCES("HR"),
    ],
  },
  {
    id: "edtech", label: "EdTech", sub: "LMS · Assessments · Classroom", icon: "GraduationCap", file: "edtech", productName: "LearnLab",
    views: [
      ...SHARED_PUBLIC("EdTech"),
      { id: "dash", label: "Learning dashboard", icon: "LayoutDashboard", comp: "LMSDashboard", group: "App" },
      { id: "classroom", label: "Virtual classroom", icon: "Video", comp: "VirtualClassroomScreen", group: "App" },
      { id: "quiz", label: "Checkpoint quiz", icon: "ListChecks", comp: "QuizScreen", group: "App" },
      { id: "grading", label: "Grading matrix", icon: "ClipboardList", comp: "GradingMatrixScreen", group: "App" },
      { id: "parent", label: "Parent portal", icon: "MessageCircle", comp: "ParentPortalScreen", group: "App" },
      ...SHARED_ACCOUNT("EdTech"),
      ...SHARED_RESOURCES("EdTech"),
    ],
  },
  {
    id: "retail", label: "RetailTech", sub: "POS · Inventory · Orders · Loyalty", icon: "ShoppingCart", file: "retailtech", productName: "RetailIQ",
    views: [
      ...SHARED_PUBLIC("Retail"),
      { id: "dash", label: "Retail dashboard", icon: "LayoutDashboard", comp: "RetailDashboard", group: "App" },
      { id: "pos", label: "POS terminal", icon: "CreditCard", comp: "POSTerminal", group: "App" },
      { id: "inventory", label: "Inventory manager", icon: "Package", comp: "InventoryScreen", group: "App" },
      { id: "orders", label: "Order center", icon: "Truck", comp: "OrderCenterScreen", group: "App" },
      { id: "promotions", label: "Promotions", icon: "Percent", comp: "PromotionsScreen", group: "App" },
      { id: "loyalty", label: "Customer loyalty", icon: "Star", comp: "LoyaltyScreen", group: "App" },
      { id: "suppliers", label: "Supplier portal", icon: "Building2", comp: "SupplierPortalScreen", group: "App" },
      { id: "analytics", label: "Store analytics", icon: "BarChart3", comp: "StoreAnalyticsScreen", group: "App" },
      { id: "catalog", label: "Product catalog", icon: "Tag", comp: "ProductCatalogScreen", group: "App" },
      ...SHARED_ACCOUNT("Retail"),
      ...SHARED_RESOURCES("Retail"),
    ],
  },
];
