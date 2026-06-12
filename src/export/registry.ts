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
  parent?: string;    // id of the parent domain — renders indented in the picker
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
    id: "banking", label: "Banking", sub: "Accounts · Transfers · Cards · Loans", icon: "Banknote", file: "banking", productName: "VaultBank", parent: "fintech",
    views: [
      ...SHARED_PUBLIC("Banking"),
      { id: "dash", label: "Accounts overview", icon: "LayoutDashboard", comp: "BankingDashboard", group: "App" },
      { id: "transfers", label: "Transfers", icon: "ArrowLeftRight", comp: "TransferScreen", group: "App" },
      { id: "billpay", label: "Bill pay", icon: "Receipt", comp: "BillPayScreen", group: "App" },
      { id: "cards", label: "Cards", icon: "CreditCard", comp: "BankCardsScreen", group: "App" },
      { id: "deposits", label: "Savings & deposits", icon: "PiggyBank", comp: "DepositsScreen", group: "App" },
      { id: "loans", label: "Loans & mortgage", icon: "Banknote", comp: "LoansScreen", group: "App" },
      { id: "payees", label: "Payees", icon: "Users", comp: "BeneficiariesScreen", group: "App" },
      { id: "statements", label: "Statements", icon: "FileText", comp: "StatementsScreen", group: "App" },
      { id: "fx", label: "Currency exchange", icon: "Globe", comp: "CurrencyExchangeScreen", group: "App" },
      { id: "insights", label: "Spending insights", icon: "BarChart3", comp: "SpendingInsightsScreen", group: "App" },
      ...SHARED_ACCOUNT("Banking"),
      ...SHARED_RESOURCES("Banking"),
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
  {
    id: "energy", label: "Energy", sub: "Renewables · Generation · Trading · ESG", icon: "Zap", file: "energytech", productName: "Helios",
    views: [
      ...SHARED_PUBLIC("Energy"),
      { id: "dash", label: "Generation dashboard", icon: "LayoutDashboard", comp: "HeliosDashboard", group: "App" },
      { id: "assets", label: "Asset fleet", icon: "Factory", comp: "AssetFleetScreen", group: "App" },
      { id: "trading", label: "Energy trading & PPAs", icon: "TrendingUp", comp: "EnergyTradingScreen", group: "App" },
      { id: "storage", label: "Grid & storage", icon: "BatteryCharging", comp: "GridStorageScreen", group: "App" },
      { id: "sustainability", label: "Sustainability & ESG", icon: "Leaf", comp: "SustainabilityScreen", group: "App" },
      { id: "carbon", label: "Carbon accounting", icon: "Gauge", comp: "CarbonAccountingScreen", group: "App" },
      { id: "investors", label: "Investor relations", icon: "Briefcase", comp: "InvestorRelationsScreen", group: "App" },
      { id: "maintenance", label: "Maintenance & work orders", icon: "Wrench", comp: "MaintenanceScreen", group: "App" },
      { id: "analytics", label: "Portfolio analytics", icon: "BarChart3", comp: "EnergyAnalyticsScreen", group: "App" },
      ...SHARED_ACCOUNT("Energy"),
      ...SHARED_RESOURCES("Energy"),
    ],
  },
  {
    id: "fossil", label: "Fossil Fuel", sub: "Oil · Gas · Refining · Midstream", icon: "Flame", file: "energy-fossil", productName: "Vulcan", parent: "energy",
    views: [
      ...SHARED_PUBLIC("Fossil"),
      { id: "dash", label: "Production dashboard", icon: "LayoutDashboard", comp: "ProductionDashboard", group: "App" },
      { id: "wells", label: "Wells & rigs", icon: "Droplet", comp: "WellsRigsScreen", group: "App" },
      { id: "refinery", label: "Refinery & processing", icon: "Factory", comp: "RefineryScreen", group: "App" },
      { id: "trading", label: "Commodity trading", icon: "TrendingUp", comp: "CommodityTradingScreen", group: "App" },
      { id: "pipelines", label: "Pipelines & logistics", icon: "Truck", comp: "PipelineLogisticsScreen", group: "App" },
      { id: "emissions", label: "Emissions & flaring", icon: "CloudOff", comp: "EmissionsScreen", group: "App" },
      { id: "hse", label: "HSE & process safety", icon: "HardHat", comp: "HSEScreen", group: "App" },
      { id: "reserves", label: "Reserves & economics", icon: "Briefcase", comp: "ReservesScreen", group: "App" },
      ...SHARED_ACCOUNT("Fossil"),
      ...SHARED_RESOURCES("Fossil"),
    ],
  },
  {
    id: "renewable", label: "Renewable Energy", sub: "Rooftop Solar · Storage · VPP", icon: "Sun", file: "energy-renewable", productName: "Sunhive", parent: "energy",
    views: [
      ...SHARED_PUBLIC("Renewable"),
      { id: "dash", label: "Fleet dashboard", icon: "LayoutDashboard", comp: "FleetDashboard", group: "App" },
      { id: "pipeline", label: "Installation pipeline", icon: "Home", comp: "InstallPipelineScreen", group: "App" },
      { id: "vpp", label: "Virtual power plant", icon: "Zap", comp: "VPPScreen", group: "App" },
      { id: "home", label: "Home battery & EV", icon: "BatteryCharging", comp: "HomeEnergyScreen", group: "App" },
      { id: "billing", label: "Net metering & billing", icon: "Receipt", comp: "BillingScreen", group: "App" },
      { id: "subscribers", label: "Subscribers", icon: "Users", comp: "SubscribersScreen", group: "App" },
      { id: "service", label: "Field service", icon: "Wrench", comp: "FieldServiceScreen", group: "App" },
      { id: "impact", label: "Carbon & savings", icon: "Leaf", comp: "ImpactScreen", group: "App" },
      ...SHARED_ACCOUNT("Renewable"),
      ...SHARED_RESOURCES("Renewable"),
    ],
  },
  {
    id: "nuclear", label: "Nuclear Energy", sub: "Reactors · Fuel · Safety · NRC", icon: "Atom", file: "energy-nuclear", productName: "Atria", parent: "energy",
    views: [
      ...SHARED_PUBLIC("Nuclear"),
      { id: "dash", label: "Reactor control room", icon: "LayoutDashboard", comp: "ReactorDashboard", group: "App" },
      { id: "units", label: "Reactor units", icon: "Atom", comp: "ReactorUnitsScreen", group: "App" },
      { id: "fuel", label: "Fuel cycle", icon: "Container", comp: "FuelCycleScreen", group: "App" },
      { id: "safety", label: "Safety systems", icon: "ShieldCheck", comp: "SafetySystemsScreen", group: "App" },
      { id: "radiation", label: "Radiation & dose", icon: "Radiation", comp: "RadiationScreen", group: "App" },
      { id: "outage", label: "Outage & refueling", icon: "Wrench", comp: "OutageScreen", group: "App" },
      { id: "regulatory", label: "Regulatory & licensing", icon: "FileText", comp: "RegulatoryScreen", group: "App" },
      { id: "grid", label: "Grid dispatch & output", icon: "Zap", comp: "GridOutputScreen", group: "App" },
      ...SHARED_ACCOUNT("Nuclear"),
      ...SHARED_RESOURCES("Nuclear"),
    ],
  },
];
