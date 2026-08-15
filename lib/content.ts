// Static content data + route registry for the Feluda marketing site.
// Keeping all copy and URLs centralized for easy iteration.

import type { ReactNode } from "react";

// ============================================================
// ROUTES
// ============================================================
export const routes = {
  home: "/",
  product: {
    index: "/product",
    codebaseIntelligence: "/product/codebase-intelligence",
    investigations: "/product/investigations",
    changeIntelligence: "/product/change-intelligence",
    codeReview: "/product/code-review",
    contextEngine: "/product/context-engine",
  },
  solutions: {
    index: "/solutions",
    understandCodebase: "/solutions/understand-codebase",
    investigateBugs: "/solutions/investigate-bugs",
    analyzeChanges: "/solutions/analyze-changes",
    reviewPullRequests: "/solutions/review-pull-requests",
    onboardEngineers: "/solutions/onboard-engineers",
    aiGeneratedCode: "/solutions/ai-generated-code",
    largeCodebases: "/solutions/large-codebases",
  },
  howItWorks: "/how-it-works",
  integrations: "/integrations",
  enterprise: {
    index: "/enterprise",
    security: "/enterprise/security",
  },
  pricing: "/pricing",
  resources: {
    blog: "/blog",
    guides: "/engineering-guides",
    caseStudies: "/case-studies",
    docs: "/docs",
    changelog: "/changelog",
    trust: "/trust-center",
  },
  company: {
    about: "/about",
    careers: "/careers",
    contact: "/contact",
  },
  auth: {
    signin: "/signin",
    signup: "/signup",
  },
} as const;

// ============================================================
// TYPES
// ============================================================
export interface MenuItem {
  title: string;
  description: string;
  href: string;
  icon?: string;
  status?: "available" | "coming-soon" | "planned";
  badge?: string;
}

export interface NavColumn {
  title?: string;
  description?: string;
  items: MenuItem[];
}

// ============================================================
// NAVIGATION — Product & Solutions mega menus
// ============================================================
export const productNav: NavColumn[] = [
  {
    items: [
      {
        title: "Codebase Intelligence",
        description: "Understand how your system actually works",
        href: routes.product.codebaseIntelligence,
        icon: "Brain",
      },
      {
        title: "Investigations",
        description: "Trace problems and follow the evidence",
        href: routes.product.investigations,
        icon: "Search",
      },
      {
        title: "Change Intelligence",
        description: "Understand what a change can affect",
        href: routes.product.changeIntelligence,
        icon: "GitMerge",
      },
      {
        title: "AI Code Review",
        description: "Review changes with full context",
        href: routes.product.codeReview,
        icon: "ClipboardCheck",
      },
      {
        title: "Context Engine",
        description: "The intelligence layer behind Feluda",
        href: routes.product.contextEngine,
        icon: "Cpu",
      },
    ],
  },
];

export const solutionsNav: NavColumn[] = [
  {
    items: [
      {
        title: "Understand a Codebase",
        description: "Explore unfamiliar systems and architecture",
        href: routes.solutions.understandCodebase,
        icon: "Compass",
      },
      {
        title: "Investigate Bugs & Incidents",
        description: "Trace failures back to their possible causes",
        href: routes.solutions.investigateBugs,
        icon: "Search",
      },
      {
        title: "Analyze Change Impact",
        description: "See what a change can affect before it ships",
        href: routes.solutions.analyzeChanges,
        icon: "GitPullRequest",
      },
      {
        title: "Review Pull Requests",
        description: "Improve confidence in every review",
        href: routes.solutions.reviewPullRequests,
        icon: "ClipboardCheck",
      },
      {
        title: "Onboard Engineers",
        description: "Help new engineers understand existing systems",
        href: routes.solutions.onboardEngineers,
        icon: "Users",
      },
      {
        title: "AI-Generated Code",
        description: "Govern and understand AI-authored changes",
        href: routes.solutions.aiGeneratedCode,
        icon: "Sparkles",
      },
      {
        title: "Large & Complex Codebases",
        description: "Monorepos, microservices, and legacy systems",
        href: routes.solutions.largeCodebases,
        icon: "Network",
      },
    ],
  },
];

export const topNav = [
  { label: "Product", href: routes.product.index, hasMenu: true, menuKey: "product" as const },
  { label: "Solutions", href: routes.solutions.index, hasMenu: true, menuKey: "solutions" as const },
  { label: "How it Works", href: routes.howItWorks },
  { label: "Integrations", href: routes.integrations },
  { label: "Enterprise", href: routes.enterprise.index },
  { label: "Pricing", href: routes.pricing },
];

// ============================================================
// HOMEPAGE
// ============================================================
export const heroContent = {
  eyebrow: "AI CODEBASE INTELLIGENCE",
  headline: ["Your codebase has answers.", "Feluda finds them."],
  supporting:
    "Feluda builds a deep, evolving understanding of your codebase—helping engineering teams investigate problems, trace system behavior, analyze changes, and review code with full context.",
  primaryCta: "Start with Feluda",
  secondaryCta: "Custom deployment",
  supportingLine: "Connect your repository. Start building context.",
  products: [
    { label: "MOVA", value: "Autonomous financial analysis" },
    { label: "FORGE", value: "AI-native orchestration layer" },
  ],
};

export const trustStrip = {
  label: "BUILT FOR THE MODERN ENGINEERING WORKFLOW",
  items: ["GitHub", "GitLab", "Bitbucket", "Pull Requests", "Codebases", "Engineering Teams"],
};

export const contextProblemContent = {
  label: "THE PROBLEM",
  headline: "Software is easier to write than it is to understand.",
  supporting:
    "Production software accumulates years of architecture decisions, dependencies, services, abstractions, and changes. A small modification can affect systems far beyond the file being edited.",
  chain: [
    "Code Change",
    "Authentication",
    "User Service",
    "Payment Service",
    "Notification Service",
    "Analytics",
  ],
};

export const thesisContent = {
  label: "HOW FELUDA THINKS",
  headline: "Context before conclusions.",
  supporting:
    "Feluda evaluates changes with relevant system context—not in isolation. Every finding is grounded in how your software actually works.",
  stages: [
    { label: "UNDERSTAND", description: "Map relevant code, relationships, dependencies, and architecture." },
    { label: "INVESTIGATE", description: "Follow changes and evidence across the system." },
    { label: "ANALYZE", description: "Identify relationships, potential impact, and risk." },
    { label: "REVIEW", description: "Evaluate changes using relevant context." },
  ],
};

export const understandContent = {
  label: "01 / UNDERSTAND",
  headline: "See beyond the file in front of you.",
  supporting:
    "Ask questions about your software and get answers grounded in how the system actually works.",
  question: "How does a checkout request move through the system?",
  flow: [
    "API Gateway",
    "Checkout Controller",
    "Payment Service",
    "Fraud Detection",
    "Payment Provider",
    "Webhook Processor",
  ],
  relatedContext: {
    files: 27,
    services: 8,
    dependencies: 14,
    commits: 6,
  },
  files: [
    "payment.service.ts",
    "payment.controller.ts",
    "auth.middleware.ts",
    "fraud-check.ts",
  ],
};

export const investigateContent = {
  label: "02 / INVESTIGATE",
  headline: ["Don't just find the bug.", "Follow the evidence."],
  supporting:
    "When something breaks or behaves unexpectedly, Feluda helps connect changes, dependencies, and system behavior to investigate what may be happening.",
  incident: {
    id: "INC-284",
    title: "Checkout failures increased by 18%",
    timeline: [
      "Deployment history analyzed",
      "Authentication changes detected",
      "Payment dependencies traced",
      "API contract mismatch identified",
      "Reviewing historical changes",
    ],
    rootCause:
      "A request schema update removed customer_id from the authenticated request context.",
    confidence: 94,
    evidenceCount: 12,
    affectedServices: ["Auth Service", "Payment Service", "Checkout API"],
    risk: "HIGH" as const,
  },
};

export const analyzeContent = {
  label: "03 / ANALYZE",
  headline: "Know what a change touches before it ships.",
  supporting:
    "Feluda connects proposed changes with relevant dependencies, services, architecture, and codebase context.",
  pr: {
    title: "Update authentication middleware",
    number: "PR-1842",
    branch: "feature/auth-update",
    stats: [
      { label: "CHANGED", value: "4", sublabel: "files" },
      { label: "RELATED", value: "12", sublabel: "components" },
      { label: "DOWNSTREAM", value: "3", sublabel: "services" },
      { label: "POTENTIAL ISSUES", value: "2", sublabel: "identified" },
    ],
    risk: "HIGH" as const,
    impactedSystems: ["Payment Service", "Admin API", "Checkout API"],
  },
};

export const reviewContent = {
  label: "04 / REVIEW",
  headline: ["Review the change.", "Understand the consequences."],
  supporting:
    "Feluda reviews code changes using relevant system context—not just the lines in a pull request.",
  finding: {
    id: "FELUDA FINDING #01",
    confidence: "HIGH CONFIDENCE",
    text: "The updated validation bypasses the authorization flow expected by PaymentService.",
    why:
      "PaymentService requires verified user context before processing transactions.",
    evidence: ["auth.middleware.ts", "payment.service.ts", "checkout.service.ts", "commit a84c91f"],
  },
};

export const systemContextContent = {
  badge: "COMING SOON",
  label: "SYSTEM CONTEXT",
  headline: "One repository is rarely the whole story.",
  supporting:
    "Feluda connects knowledge across repositories so engineering teams can understand how systems depend on each other across services and platforms.",
  repos: [
    { name: "Authentication", letter: "A" },
    { name: "Payments", letter: "P" },
    { name: "Frontend", letter: "F" },
    { name: "Shared Libraries", letter: "L" },
  ],
};

export const workflowsContent = {
  headline: "Built for the moments when context matters most.",
  tabs: [
    {
      id: "understand",
      label: "Understand",
      scenario: "A developer joins an unfamiliar project.",
      questions: [
        "How does authentication work?",
        "Where is this feature implemented?",
        "What depends on this API?",
      ],
    },
    {
      id: "investigate",
      label: "Investigate",
      scenario: "A production issue occurs.",
      questions: [
        "What changed?",
        "Where did this originate?",
        "What else could be affected?",
      ],
    },
    {
      id: "analyze",
      label: "Analyze",
      scenario: "A large refactor is planned.",
      questions: [
        "Dependencies",
        "Affected services",
        "Risk areas",
        "Relevant architecture",
      ],
    },
    {
      id: "review",
      label: "Review",
      scenario: "A pull request is opened.",
      questions: [
        "Codebase context",
        "Related patterns",
        "Dependencies",
        "Potential regressions",
      ],
    },
    {
      id: "onboard",
      label: "Onboard",
      scenario: "A new engineer joins.",
      questions: [
        "Existing architecture",
        "Key services and flows",
        "Recent decisions and context",
        "Where to make changes",
      ],
    },
  ],
};

export const integrationsContent = {
  label: "WORKS WITH YOUR STACK",
  headline: "Bring intelligence into the workflow you already use.",
  items: [
    { name: "GitHub", description: "Repository intelligence and pull request analysis", icon: "github", status: "available" as const },
    { name: "GitLab", description: "Context-aware engineering workflows", icon: "gitlab", status: "available" as const },
    { name: "Bitbucket", description: "Repository and change analysis", icon: "bitbucket", status: "available" as const },
    { name: "Slack", description: "Surface findings where teams collaborate", icon: "slack", status: "coming-soon" as const },
    { name: "API", description: "Build custom engineering workflows", icon: "api", status: "available" as const },
    { name: "MCP", description: "Connect Feluda with AI agents and tools", icon: "mcp", status: "available" as const },
  ],
};

export const enterpriseContent = {
  label: "ENTERPRISE TRUST",
  headline: ["Your codebase is sensitive.", "Control matters."],
  supporting:
    "Give enterprise teams the visibility and controls required for critical software environments.",
  features: [
    { title: "Secure Repository Access", description: "Read-only by default. Scoped credentials. Full audit trail." },
    { title: "Granular Access Control", description: "Role-based permissions with per-team and per-repository scopes." },
    { title: "Deployment Options", description: "Self-hosted and single-tenant deployment for sensitive environments." },
    { title: "Data Isolation", description: "Code, embeddings, and context never leave your secure boundary." },
    { title: "Auditability", description: "Every analysis, finding, and decision is logged and traceable." },
    { title: "Enterprise Support", description: "Dedicated engineers, SLAs, and onboarding for your platform team." },
  ],
  note: "Designed for enterprise security requirements.",
  cta: "Explore Enterprise",
};

export const howItWorksContent = {
  label: "THE INTELLIGENCE PIPELINE",
  headline: "Built around your evolving codebase.",
  steps: [
    { n: "01", title: "CONNECT", description: "Connect your source repository with scoped, read-only credentials." },
    { n: "02", title: "INDEX", description: "Analyze code structure and relevant relationships." },
    { n: "03", title: "MAP", description: "Connect symbols, files, dependencies, and architecture." },
    { n: "04", title: "BUILD CONTEXT", description: "Create a persistent understanding of the system." },
    { n: "05", title: "REASON", description: "Use context for questions, investigations, changes, and reviews." },
    { n: "06", title: "STAY CURRENT", description: "Update understanding as the codebase evolves." },
  ],
};

export const outcomesContent = {
  label: "WHAT FELUDA HELPS TEAMS DO",
  items: [
    "Understand unfamiliar systems faster",
    "Investigate issues with connected evidence",
    "Review changes with deeper context",
    "Identify potential downstream impact",
    "Maintain engineering knowledge beyond individual contributors",
  ],
};

export const finalCtaContent = {
  headline: "Your codebase already has the answers.",
  subheadline: "Feluda helps you find the context that matters.",
  primary: "Start with Feluda",
  secondary: "Talk to our team",
  supporting: "Connect your repository and start building context.",
};

// Hero product demo (investigation timeline content)
export const heroInvestigation = {
  title: "OPEN INVESTIGATION",
  query:
    "Why did checkout failures increase after the authentication update?",
  steps: [
    "Recent deployments analyzed",
    "Authentication service traced",
    "Downstream dependencies identified",
    "API contracts compared",
    "Reviewing historical changes",
  ],
  rootCause:
    "A validation change in AuthMiddleware removed the user context required by PaymentService.",
  impact: "3 services affected",
  risk: "HIGH" as const,
  affectedSystems: ["Auth Service", "Payment Service", "Checkout API"],
};

// ============================================================
// PAGE CONTENT
// ============================================================

// ----- /product (Platform Overview) -----
export const productOverviewContent = {
  hero: {
    eyebrow: "THE FELUDA PLATFORM",
    headline: "The intelligence layer for your codebase.",
    supporting:
      "Feluda combines codebase intelligence, investigations, change analysis, and code review into one system that understands how your software actually works.",
    primaryCta: "Explore the platform",
    secondaryCta: "See it in action",
  },
  pillars: [
    {
      id: "codebase-intelligence",
      title: "Codebase Intelligence",
      description: "Understand how your system works by asking it questions.",
      href: routes.product.codebaseIntelligence,
    },
    {
      id: "investigations",
      title: "Investigations",
      description: "Trace problems and follow the evidence across services.",
      href: routes.product.investigations,
    },
    {
      id: "change-intelligence",
      title: "Change Intelligence",
      description: "See what a change can affect before it ships.",
      href: routes.product.changeIntelligence,
    },
    {
      id: "code-review",
      title: "AI Code Review",
      description: "Review changes with full system context—not just the diff.",
      href: routes.product.codeReview,
    },
  ],
  contextEngineNote: "All four capabilities are powered by the Feluda Context Engine.",
};

// ----- /product/codebase-intelligence -----
export const codebaseIntelligenceContent = {
  hero: {
    eyebrow: "PRODUCT / CODEBASE INTELLIGENCE",
    headline: "Understand how your software actually works.",
    supporting:
      "Feluda helps teams navigate and understand complex repositories by connecting relevant files, symbols, dependencies, services, and architecture.",
    primaryCta: "Explore your codebase",
    secondaryCta: "See a demo",
  },
  capabilities: [
    {
      title: "Ask your codebase questions",
      description: "Query how requests flow, how data is shaped, or where a feature lives.",
    },
    {
      title: "Explore dependencies",
      description: "Trace which files and services a module touches across your system.",
    },
    {
      title: "Trace system flows",
      description: "Follow a user request from entry point to storage and back.",
    },
    {
      title: "Find implementation patterns",
      description: "See how similar features were built elsewhere in the codebase.",
    },
    {
      title: "Understand unfamiliar architecture",
      description: "Get up to speed on a service without reading every file.",
    },
  ],
};

// ----- /product/investigations -----
export const investigationsContent = {
  hero: {
    eyebrow: "PRODUCT / INVESTIGATIONS",
    headline: "Every problem leaves evidence.",
    supporting:
      "Feluda helps investigate software behavior by connecting relevant changes, dependencies, historical context, and codebase relationships.",
    primaryCta: "Open an investigation",
    secondaryCta: "See an example",
  },
  journey: [
    { step: "01", title: "Symptom", description: "An outage, a regression, an unexpected behavior—start with what's wrong." },
    { step: "02", title: "Evidence", description: "Feluda gathers relevant changes, logs, and signals around the symptom." },
    { step: "03", title: "Dependencies", description: "Trace downstream systems and adjacent code paths that could be involved." },
    { step: "04", title: "Change", description: "Surface recent deployments, commits, and configuration changes in scope." },
    { step: "05", title: "Finding", description: "Feluda proposes a possible root cause with confidence and linked evidence." },
    { step: "06", title: "Impact", description: "Estimate scope: which services, users, and workflows are affected." },
  ],
};

// ----- /product/change-intelligence -----
export const changeIntelligenceContent = {
  hero: {
    eyebrow: "PRODUCT / CHANGE INTELLIGENCE",
    headline: "See the impact behind every change.",
    supporting:
      "Feluda analyzes proposed changes in the context of the wider system—so teams understand risk before merge.",
    primaryCta: "Analyze a change",
    secondaryCta: "See a pull request example",
  },
  capabilities: [
    { title: "Analyze changed files", description: "Understand the surface area of every pull request." },
    { title: "Find related systems", description: "Identify services and modules that depend on the changed code." },
    { title: "Trace dependencies", description: "Map transitive reach of a change across packages and services." },
    { title: "Identify potential regressions", description: "Flag code paths where the change could break existing behavior." },
    { title: "Understand downstream impact", description: "Estimate user-facing and system-facing consequences." },
  ],
};

// ----- /product/code-review -----
export const codeReviewContent = {
  hero: {
    eyebrow: "PRODUCT / AI CODE REVIEW",
    headline: "Code review with system context.",
    supporting:
      "A diff alone does not represent the whole engineering system. Feluda reviews changes grounded in how your software actually works.",
    primaryCta: "Review with context",
    secondaryCta: "See an example review",
  },
  capabilities: [
    { title: "PR context", description: "Understand what code the change touches and why." },
    { title: "Architecture awareness", description: "Flag violations of established patterns and structures." },
    { title: "Dependency analysis", description: "Surface downstream systems affected by the change." },
    { title: "Pattern consistency", description: "Compare against conventions used elsewhere in the codebase." },
    { title: "Potential regressions", description: "Identify code paths that may break under the new logic." },
    { title: "Evidence-based findings", description: "Every finding links to specific files, commits, and history." },
    { title: "Team feedback loop", description: "Findings support dismissal, resolution, and discussion." },
  ],
};

// ----- /product/context-engine -----
export const contextEngineContent = {
  hero: {
    eyebrow: "PRODUCT / CONTEXT ENGINE",
    headline: "The intelligence behind every Feluda finding.",
    supporting:
      "The Context Engine continuously builds and updates a deep understanding of your software so Feluda can reason over it.",
    primaryCta: "See the architecture",
    secondaryCta: "Read the documentation",
  },
  sections: [
    {
      title: "Code understanding",
      description: "Semantic parsing of files, symbols, dependencies, and architectural boundaries.",
    },
    {
      title: "Relationship mapping",
      description: "Connectors between services, modules, code paths, and historical decisions.",
    },
    {
      title: "Context retrieval",
      description: "Surface only the relevant subset of context for a given question or change.",
    },
    {
      title: "Change awareness",
      description: "Track commits, deployments, and configuration changes over time.",
    },
    {
      title: "Continuous updates",
      description: "Refresh the model as your codebase evolves—no manual index calls.",
    },
    {
      title: "Context relevance",
      description: "Rank and filter context based on the task at hand (review, investigation, etc.).",
    },
  ],
  diagramInputs: ["Code", "Relationships", "Dependencies", "Architecture", "History", "Documentation"],
};

// ----- /solutions (Index) -----
export const solutionsIndexContent = {
  hero: {
    eyebrow: "SOLUTIONS",
    headline: "Built for real engineering problems.",
    supporting:
      "Feluda is shaped around the jobs engineering teams actually do—understanding, investigating, analyzing, and reviewing code in context.",
  },
  cards: [
    {
      icon: "Compass",
      title: "Understand a Codebase",
      description: "Get answers about how unfamiliar systems work.",
      href: routes.solutions.understandCodebase,
    },
    {
      icon: "Search",
      title: "Investigate Bugs & Incidents",
      description: "Trace failures back to their possible causes.",
      href: routes.solutions.investigateBugs,
    },
    {
      icon: "GitPullRequest",
      title: "Analyze Change Impact",
      description: "See what a change can affect before it ships.",
      href: routes.solutions.analyzeChanges,
    },
    {
      icon: "ClipboardCheck",
      title: "Review Pull Requests",
      description: "Improve confidence in every review.",
      href: routes.solutions.reviewPullRequests,
    },
    {
      icon: "Users",
      title: "Onboard Engineers",
      description: "Help new engineers understand existing systems.",
      href: routes.solutions.onboardEngineers,
    },
    {
      icon: "Sparkles",
      title: "AI-Generated Code",
      description: "Govern and understand AI-authored changes.",
      href: routes.solutions.aiGeneratedCode,
    },
    {
      icon: "Network",
      title: "Large & Complex Codebases",
      description: "Monorepos, microservices, and legacy systems.",
      href: routes.solutions.largeCodebases,
    },
  ],
};

// Solution-page template content (shared by all 7 solutions)
export interface SolutionPageContent {
  slug: string;
  hero: { eyebrow: string; headline: string[]; supporting: string; primaryCta: string; secondaryCta?: string };
  cost: { title: string; body: string };
  currentVsFeluda: { title: string; current: string[]; feluda: string[] };
  productDemoTitle: string;
  productDemoBody: string;
  outcome: { title: string; items: string[] };
  related: { label: string; href: string }[];
  cta: { headline: string; subheadline: string; primary: string; secondary?: string };
}

export const solutionPages: Record<string, SolutionPageContent> = {
  [routes.solutions.understandCodebase]: {
    slug: "understand-codebase",
    hero: {
      eyebrow: "SOLUTIONS / UNDERSTAND A CODEBASE",
      headline: ["Get answers without searching through the entire system."],
      supporting:
        "New to a service? Working in unfamiliar code? Feluda gives you a conversational interface to the codebase—one that knows what your software actually does.",
      primaryCta: "Try Feluda",
      secondaryCta: "See a demo",
    },
    cost: {
      title: "The cost of not understanding.",
      body:
        "Engineers spend large parts of their week searching, asking, and tracing just to find out how a system works. Knowledge lives in heads, in long threads, and in scattered docs.",
    },
    currentVsFeluda: {
      title: "From discovery friction to direct answers.",
      current: ["Search", "Ask a teammate", "Read docs", "Search again", "Trace dependencies by hand"],
      feluda: ["Ask", "Retrieve relevant context", "Understand"],
    },
    productDemoTitle: "Ask your codebase.",
    productDemoBody:
      "Query any aspect of your software and get a grounded answer—not a list of file paths or a guess.",
    outcome: {
      title: "What changes for your team.",
      items: [
        "Less time searching, more time building",
        "Faster onboarding for new engineers",
        "Reduced dependence on tribal knowledge",
        "Higher confidence in unfamiliar work",
      ],
    },
    related: [
      { label: "Codebase Intelligence", href: routes.product.codebaseIntelligence },
      { label: "Onboard Engineers", href: routes.solutions.onboardEngineers },
    ],
    cta: {
      headline: "Make your codebase answerable.",
      subheadline: "Feluda gives every engineer a conversational interface to your software.",
      primary: "Start with Feluda",
      secondary: "Talk to sales",
    },
  },
  [routes.solutions.investigateBugs]: {
    slug: "investigate-bugs",
    hero: {
      eyebrow: "SOLUTIONS / INVESTIGATE BUGS & INCIDENTS",
      headline: ["Start with the symptom.", "Follow the evidence."],
      supporting:
        "When production breaks, Feluda connects relevant changes, dependencies, and system behavior to help you find what may have caused the issue.",
      primaryCta: "Open an investigation",
    },
    cost: {
      title: "Incidents are expensive.",
      body:
        "Engineering hours, customer trust, and on-call burnout compound when root-cause analysis depends on memory and manual investigation.",
    },
    currentVsFeluda: {
      title: "From manual investigation to guided evidence.",
      current: [
        "Pager fires",
        "Search recent deploys",
        "Ask Slack",
        "Read stack traces",
        "Open tickets, await answers",
      ],
      feluda: [
        "Symptom captured",
        "Relevant changes surfaced",
        "Dependencies traced",
        "Possible cause proposed with evidence",
      ],
    },
    productDemoTitle: "An investigation in motion.",
    productDemoBody:
      "Open an investigation from a symptom, watch Feluda follow the evidence, and review the proposed root cause with linked findings.",
    outcome: {
      title: "What changes for your team.",
      items: [
        "Faster time to root cause",
        "Less context-switching during incidents",
        "Documented evidence trail for post-mortems",
        "Reduced on-call cognitive load",
      ],
    },
    related: [
      { label: "Investigations", href: routes.product.investigations },
      { label: "Change Intelligence", href: routes.product.changeIntelligence },
    ],
    cta: {
      headline: "Investigate with evidence.",
      subheadline: "Every incident gets a structured investigation record—automatically.",
      primary: "Start with Feluda",
      secondary: "Talk to sales",
    },
  },
  [routes.solutions.analyzeChanges]: {
    slug: "analyze-changes",
    hero: {
      eyebrow: "SOLUTIONS / ANALYZE CHANGE IMPACT",
      headline: ["Know what a change touches before it ships."],
      supporting:
        "Feluda surfaces the systems, services, and patterns affected by a proposed change—so teams understand risk before merge.",
      primaryCta: "Analyze a change",
    },
    cost: {
      title: "The hidden cost of change.",
      body:
        "A small change in one service can ripple through authentication, payments, and downstream APIs. Without system-wide visibility, impact arrives in production.",
    },
    currentVsFeluda: {
      title: "From isolated diffs to systemic insight.",
      current: [
        "Read the diff",
        "Find related files manually",
        "Ask reviewers to trace dependencies",
        "Ship and discover regressions in prod",
      ],
      feluda: [
        "See related components",
        "Trace downstream services",
        "Identify potential breaking changes",
        "Classify risk before merge",
      ],
    },
    productDemoTitle: "A pull request with full context.",
    productDemoBody:
      "Every PR shows the surface area, downstream services, and risk level—before review even starts.",
    outcome: {
      title: "What changes for your team.",
      items: [
        "Fewer regressions reaching production",
        "Faster, more confident reviews",
        "Documented impact per change",
        "Better planning for refactors",
      ],
    },
    related: [
      { label: "Change Intelligence", href: routes.product.changeIntelligence },
      { label: "AI Code Review", href: routes.product.codeReview },
    ],
    cta: {
      headline: "Ship changes with full awareness.",
      subheadline: "See the blast radius of every change before it ships.",
      primary: "Start with Feluda",
      secondary: "Talk to sales",
    },
  },
  [routes.solutions.reviewPullRequests]: {
    slug: "review-pull-requests",
    hero: {
      eyebrow: "SOLUTIONS / REVIEW PULL REQUESTS",
      headline: ["Review with the full system in view."],
      supporting:
        "Feluda reviews pull requests grounded in the actual codebase—helping reviewers spend their attention on what matters.",
      primaryCta: "Review with context",
    },
    cost: {
      title: "Review fatigue is real.",
      body:
        "Reviewers today read diffs in isolation, often without the context needed to spot real issues. Important signals get missed; surface-level feedback dominates.",
    },
    currentVsFeluda: {
      title: "From line-by-line to system-aware.",
      current: [
        "Read the diff",
        "Stare at unfamiliar files",
        "Comment on style",
        "Approve without confidence",
      ],
      feluda: [
        "See dependencies and related context",
        "Find architectural inconsistencies",
        "Identify potential regressions",
        "Approve or request changes with evidence",
      ],
    },
    productDemoTitle: "An intelligent review.",
    productDemoBody:
      "Every finding links to specific files, commits, and architectural context—so reviewers can decide faster.",
    outcome: {
      title: "What changes for your team.",
      items: [
        "Higher-quality review feedback",
        "Faster review cycles",
        "Reduced reviewer fatigue",
        "Better knowledge sharing across the team",
      ],
    },
    related: [
      { label: "AI Code Review", href: routes.product.codeReview },
      { label: "Investigations", href: routes.product.investigations },
    ],
    cta: {
      headline: "Make every review count.",
      subheadline: "Your reviewers get the context they need automatically.",
      primary: "Start with Feluda",
      secondary: "Talk to sales",
    },
  },
  [routes.solutions.onboardEngineers]: {
    slug: "onboard-engineers",
    hero: {
      eyebrow: "SOLUTIONS / ONBOARD ENGINEERS",
      headline: ["Help engineers understand before they change."],
      supporting:
        "Engineering knowledge often lives in people's heads, in old PRs, and in scattered docs. Feluda makes the codebase itself answerable.",
      primaryCta: "Accelerate onboarding",
    },
    cost: {
      title: "Slow onboarding is expensive.",
      body:
        "Engineers take weeks to become productive. Knowledge bottlenecks prevent parallel work and create single points of failure on critical services.",
    },
    currentVsFeluda: {
      title: "From scattered knowledge to a conversational codebase.",
      current: [
        "Read the wiki (out of date)",
        "Sit with senior engineers",
        "Read every file in the service",
        "Ask repeatedly in Slack",
      ],
      feluda: [
        "Ask the codebase",
        "Explore architecture interactively",
        "Understand dependencies visually",
        "Get productive in days, not months",
      ],
    },
    productDemoTitle: "Codebase-as-interface.",
    productDemoBody:
      "Feluda becomes an interface to existing engineering knowledge—reducing discovery friction without replacing humans or documentation.",
    outcome: {
      title: "What changes for your team.",
      items: [
        "Faster ramp-up for new engineers",
        "Reduced load on senior staff",
        "Better preservation of architectural decisions",
        "Higher confidence in early contributions",
      ],
    },
    related: [
      { label: "Codebase Intelligence", href: routes.product.codebaseIntelligence },
      { label: "Understand a Codebase", href: routes.solutions.understandCodebase },
    ],
    cta: {
      headline: "Reduce discovery friction.",
      subheadline: "Help new engineers become productive without waiting on senior staff.",
      primary: "Start with Feluda",
      secondary: "Talk to sales",
    },
  },
  [routes.solutions.aiGeneratedCode]: {
    slug: "ai-generated-code",
    hero: {
      eyebrow: "SOLUTIONS / AI-GENERATED CODE",
      headline: ["AI can generate changes faster than teams can understand them."],
      supporting:
        "As AI coding increases, review volume rises and context becomes more important. Feluda helps teams investigate and review AI-authored changes within the context of the system.",
      primaryCta: "Govern AI-authored changes",
    },
    cost: {
      title: "Velocity without verification is risk.",
      body:
        "Generated code may look correct in isolation but introduce subtle regressions, violate patterns, or rely on outdated assumptions about the system.",
    },
    currentVsFeluda: {
      title: "From trusting the diff to verifying the change.",
      current: [
        "Agent opens PR",
        "Reviewer reads diff",
        "Ship it (or not)",
        "Discover issues in production",
      ],
      feluda: [
        "Agent opens PR",
        "Feluda provides system-aware review",
        "Reviewer sees evidence-backed findings",
        "Ship with confidence",
      ],
    },
    productDemoTitle: "Review for AI-authored code.",
    productDemoBody:
      "Feluda treats AI-authored PRs like any other change—grounded in the codebase, judged by the system, not the author.",
    outcome: {
      title: "What changes for your team.",
      items: [
        "Higher confidence in AI-authored changes",
        "Reduced review bottlenecks",
        "Better consistency with existing patterns",
        "Documented evidence for every AI PR",
      ],
    },
    related: [
      { label: "AI Code Review", href: routes.product.codeReview },
      { label: "Change Intelligence", href: routes.product.changeIntelligence },
    ],
    cta: {
      headline: "Verify every AI-authored change.",
      subheadline: "Feluda gives your team the context AI assistants don't have.",
      primary: "Start with Feluda",
      secondary: "Talk to sales",
    },
  },
  [routes.solutions.largeCodebases]: {
    slug: "large-codebases",
    hero: {
      eyebrow: "SOLUTIONS / LARGE & COMPLEX CODEBASES",
      headline: ["Complexity should not hide the context you need."],
      supporting:
        "Feluda is built to handle large repositories, monorepos, microservices, and legacy codebases—without simplifying the truth about how they work.",
      primaryCta: "Explore large codebases",
    },
    cost: {
      title: "Complexity creates blind spots.",
      body:
        "Big repositories hide dependencies between distant files. Microservices obscure the propagation of a single change. Legacy code lacks documentation.",
    },
    currentVsFeluda: {
      title: "From information overload to relevant context.",
      current: [
        "Search the whole repo",
        "Guess which service owns what",
        "Open tickets for downstream teams",
        "Wait for context",
      ],
      feluda: [
        "Ask across the whole codebase",
        "Trace dependencies visually",
        "See downstream services instantly",
        "Get the relevant context only",
      ],
    },
    productDemoTitle: "Architecture-aware context.",
    productDemoBody:
      "Feluda handles the relationships that make large systems hard—files, services, contracts, and history.",
    outcome: {
      title: "What changes for your team.",
      items: [
        "Faster navigation across large systems",
        "Better visibility into cross-team dependencies",
        "Reduced risk when touching critical code",
        "Architecture preservation through informed changes",
      ],
    },
    related: [
      { label: "Codebase Intelligence", href: routes.product.codebaseIntelligence },
      { label: "Context Engine", href: routes.product.contextEngine },
    ],
    cta: {
      headline: "Make complexity navigable.",
      subheadline: "Feluda works at the scale your codebase actually has.",
      primary: "Start with Feluda",
      secondary: "Talk to sales",
    },
  },
};

// ----- /how-it-works -----
export const howItWorksPageContent = {
  hero: {
    eyebrow: "HOW IT WORKS",
    headline: "From repository to engineering intelligence.",
    supporting:
      "Feluda connects to your repository, builds a continuous understanding of your codebase, and exposes that understanding as reasoning over your software.",
    primaryCta: "Try Feluda",
    secondaryCta: "Read the documentation",
  },
  pipeline: [
    { n: "01", title: "CONNECT", description: "Connect your source repository." },
    { n: "02", title: "INDEX", description: "Understand code structure." },
    { n: "03", title: "MAP", description: "Connect symbols, files, dependencies, and relationships." },
    { n: "04", title: "BUILD CONTEXT", description: "Create relevant system understanding." },
    { n: "05", title: "REASON", description: "Use context for questions, investigations, changes, and reviews." },
    { n: "06", title: "STAY CURRENT", description: "Update understanding as software evolves." },
  ],
  architectureTitle: "How the pieces fit.",
  architectureDescription:
    "The Context Engine continuously maps your repository into a structured understanding. Every Feluda experience—Understand, Investigate, Analyze, Review—draws on the same context.",
};

// ----- /integrations -----
export const integrationsPageContent = {
  hero: {
    eyebrow: "INTEGRATIONS",
    headline: "Intelligence should fit your workflow.",
    supporting:
      "Feluda connects to where your code lives and where your team collaborates—without forcing you to leave your existing tools.",
    primaryCta: "Browse integrations",
  },
  featured: [
    {
      group: "Source control",
      items: [
        { name: "GitHub", description: "Repository intelligence and pull request analysis", href: "/integrations/github", status: "available" as const },
        { name: "GitLab", description: "Context-aware engineering workflows", href: "/integrations/gitlab", status: "available" as const },
        { name: "Bitbucket", description: "Repository and change analysis", href: "/integrations/bitbucket", status: "available" as const },
      ],
    },
    {
      group: "Collaboration",
      items: [
        { name: "Slack", description: "Surface findings where teams collaborate", href: "/integrations/slack", status: "coming-soon" as const },
      ],
    },
    {
      group: "Developer intelligence",
      items: [
        { name: "API", description: "Build custom engineering workflows on top of Feluda", href: routes.resources.docs, status: "available" as const },
        { name: "MCP", description: "Connect Feluda context with AI agents and tools", href: routes.resources.docs, status: "available" as const },
      ],
    },
  ],
};

// ----- /enterprise -----
export const enterprisePageContent = {
  hero: {
    eyebrow: "ENTERPRISE",
    headline: ["Codebase intelligence for critical software."],
    supporting:
      "Engineering teams in regulated and high-stakes environments need controls, visibility, and deployment flexibility. Feluda is built accordingly.",
    primaryCta: "Talk to enterprise",
    secondaryCta: "Read security overview",
  },
  capabilities: [
    {
      title: "Security",
      description: "Read-only repository access by default. Scoped credentials. Full audit log of every analysis.",
    },
    {
      title: "Privacy",
      description: "Code, embeddings, and context never leave your secure boundary. No model training on your code.",
    },
    {
      title: "Access",
      description: "Role-based access control with per-team and per-repository scopes.",
    },
    {
      title: "Governance",
      description: "Every action, decision, and finding is logged and reviewable by your platform team.",
    },
    {
      title: "Deployment",
      description: "Self-hosted and single-tenant options for organizations with strict deployment requirements.",
    },
    {
      title: "Support",
      description: "Dedicated engineers, defined SLAs, and onboarding for your platform team.",
    },
  ],
  controls: [
    { control: "Repository access", access: "Role-based", visibility: "Auditable", policy: "Org-controlled" },
    { control: "Code retention", access: "Configurable", visibility: "Transparent", policy: "Org-defined" },
    { control: "Embedding strategy", access: "Per-tenant", visibility: "Reviewable", policy: "Org-approved" },
    { control: "User permissions", access: "Granular", visibility: "Reportable", policy: "Org-set" },
    { control: "Deployment model", access: "Cloud or self-hosted", visibility: "Documented", policy: "Org-chosen" },
    { control: "Audit logs", access: "Streamable", visibility: "Full history", policy: "Org-retained" },
  ],
  note: "Designed for enterprise security requirements. Specific certifications should be confirmed before public claim.",
};

// ----- /enterprise/security -----
export const securityPageContent = {
  hero: {
    eyebrow: "ENTERPRISE / SECURITY",
    headline: "Security architecture, plainly stated.",
    supporting:
      "This page describes how Feluda handles code, data, access, and deployment. Wording is intentional; reach out for a detailed technical review.",
    primaryCta: "Contact security team",
    secondaryCta: "View trust center",
  },
  sections: [
    {
      title: "Security architecture",
      description: "Defense in depth at the application, network, and data layers. Read-only by default. No write access to repositories unless explicitly authorized.",
    },
    {
      title: "Code and data handling",
      description: "Code is processed to build context; embeddings are stored per-tenant. No model training on customer code.",
    },
    {
      title: "Access controls",
      description: "Role-based access control. Audit logs for every analysis. SSO/SAML available on enterprise plans.",
    },
    {
      title: "Encryption",
      description: "TLS in transit. Encrypted at rest. Customer-managed keys available for enterprise deployments.",
    },
    {
      title: "Retention",
      description: "Configurable retention windows for code-derived artifacts. Documented and reviewable.",
    },
    {
      title: "Deployment",
      description: "Multi-tenant cloud, single-tenant cloud, or fully self-hosted options depending on regulatory environment.",
    },
    {
      title: "Incident response",
      description: "Documented runbooks, named on-call engineers, and customer notification procedures.",
    },
    {
      title: "Compliance",
      description: "Specific certifications and attestations are confirmed during enterprise procurement. We do not claim certifications we do not hold.",
    },
  ],
  faqs: [
    { q: "Do you train models on customer code?", a: "No. Customer code is processed to build context but never used to train shared models." },
    { q: "Can we deploy Feluda self-hosted?", a: "Yes, on enterprise plans. Reach out for deployment-specific guidance." },
    { q: "How is repository access scoped?", a: "Read-only by default. Feluda requests the minimum scopes required for each capability." },
    { q: "Where is data stored?", a: "By default, in the customer's chosen cloud region. Single-tenant and self-hosted deployments are available." },
  ],
};

// ----- /pricing -----
export const pricingContent = {
  hero: {
    eyebrow: "PRICING",
    headline: "Plans for individuals, teams, and enterprises.",
    supporting:
      "Feluda scales from a single repository to enterprise-wide deployment. Choose the plan that fits your team.",
  },
  plans: [
    {
      tier: "INDIVIDUAL",
      name: "Solo",
      price: "Free",
      cadence: "for evaluation",
      description: "For engineers exploring Feluda on personal or side projects.",
      who: "Solo developers",
      do: "Connect a single repository, ask questions, run investigations on your own code.",
      limit: "Limited repository size and monthly usage.",
      cta: "Start with Feluda",
      ctaHref: routes.auth.signup,
    },
    {
      tier: "TEAM",
      name: "Team",
      price: "$20",
      cadence: "per developer / month",
      description: "For engineering teams using Feluda across repositories and reviews.",
      who: "Engineering teams",
      do: "Full investigations, change analysis, code review integration, shared knowledge.",
      limit: "Up to a defined number of repositories per organization.",
      cta: "Start with Feluda",
      ctaHref: routes.auth.signup,
    },
    {
      tier: "ENTERPRISE",
      name: "Enterprise",
      price: "Custom",
      cadence: "based on deployment",
      description: "For organizations with security, scale, or compliance requirements.",
      who: "Enterprises",
      do: "Self-hosted deployment, SSO, audit logs, dedicated support, and procurement-ready terms.",
      limit: "Negotiated per organization.",
      cta: "Talk to sales",
      ctaHref: "/contact",
    },
  ],
  compareRows: [
    { feature: "Repository connections", individual: "1", team: "Up to 25", enterprise: "Unlimited" },
    { feature: "Monthly investigations", individual: "Limited", team: "Generous", enterprise: "Custom" },
    { feature: "Investigations", individual: "✓", team: "✓", enterprise: "✓" },
    { feature: "Change analysis", individual: "✓", team: "✓", enterprise: "✓" },
    { feature: "Code review integration", individual: "—", team: "✓", enterprise: "✓" },
    { feature: "SSO / SAML", individual: "—", team: "—", enterprise: "✓" },
    { feature: "Self-hosted deployment", individual: "—", team: "—", enterprise: "✓" },
    { feature: "Audit logs", individual: "—", team: "Basic", enterprise: "Full" },
    { feature: "Support", individual: "Community", team: "Email", enterprise: "Dedicated" },
  ],
  faqs: [
    { q: "Is the Individual plan really free?", a: "Yes. It's intended for evaluation on personal or side projects." },
    { q: "How do repository limits work?", a: "Each plan includes a defined limit; we'll help you right-size when you upgrade." },
    { q: "Do you offer annual billing?", a: "Yes, with a discount on Team plans." },
    { q: "Can we trial Team before paying?", a: "Yes — reach out to sales for a Team trial." },
  ],
};

// ----- Company page stubs -----
export const companyPageContent = {
  about: {
    eyebrow: "COMPANY",
    headline: "We build the intelligence layer for engineering teams.",
    supporting:
      "Feluda is built by engineers who got tired of searching, asking, and tracing just to understand the systems they worked on.",
    body:
      "We're a small team focused on a specific problem: making codebases answerable. We believe engineering knowledge should live in the system itself, not in scattered docs and tribal memory.",
  },
  careers: {
    eyebrow: "COMPANY / CAREERS",
    headline: "Help us make every codebase answerable.",
    supporting:
      "We're hiring engineers, designers, and researchers who want to work on the intersection of AI, software systems, and developer tools.",
    body:
      "We're remote-first, async by default, and build for engineers. Open roles are listed below.",
    roles: ["Senior Engineer — Context Engine", "Senior Designer — Marketing & Product", "Founding Account Executive"],
  },
  contact: {
    eyebrow: "COMPANY / CONTACT",
    headline: "Talk to us.",
    supporting:
      "Reach out for product questions, partnership inquiries, or enterprise requests. We respond within one business day.",
    channels: [
      { label: "Sales", value: "sales@feluda.io" },
      { label: "Security", value: "security@feluda.io" },
      { label: "Support", value: "support@feluda.io" },
      { label: "Press", value: "press@feluda.io" },
    ],
  },
};

// ----- Auth stub content -----
export const authPageContent = {
  signin: {
    eyebrow: "ACCOUNT",
    headline: "Sign in to Feluda.",
    supporting: "Continue with your existing repository account.",
  },
  signup: {
    eyebrow: "GET STARTED",
    headline: "Start with Feluda.",
    supporting: "Connect a repository and start building context in minutes.",
  },
};

// ============================================================
// FOOTER
// ============================================================
export const footerContent = {
  tagline: "Codebase intelligence for engineering teams.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Platform Overview", href: routes.product.index },
        { label: "Codebase Intelligence", href: routes.product.codebaseIntelligence },
        { label: "Investigations", href: routes.product.investigations },
        { label: "Change Intelligence", href: routes.product.changeIntelligence },
        { label: "AI Code Review", href: routes.product.codeReview },
        { label: "Context Engine", href: routes.product.contextEngine },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Understand a Codebase", href: routes.solutions.understandCodebase },
        { label: "Investigate Bugs", href: routes.solutions.investigateBugs },
        { label: "Analyze Change Impact", href: routes.solutions.analyzeChanges },
        { label: "Review Pull Requests", href: routes.solutions.reviewPullRequests },
        { label: "Onboard Engineers", href: routes.solutions.onboardEngineers },
        { label: "AI-Generated Code", href: routes.solutions.aiGeneratedCode },
        { label: "Large Codebases", href: routes.solutions.largeCodebases },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: routes.resources.docs },
        { label: "Blog", href: routes.resources.blog },
        { label: "Engineering Guides", href: routes.resources.guides },
        { label: "Case Studies", href: routes.resources.caseStudies },
        { label: "Changelog", href: routes.resources.changelog },
        { label: "Trust Center", href: routes.resources.trust },
        { label: "How it Works", href: routes.howItWorks },
        { label: "Integrations", href: routes.integrations },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: routes.company.about },
        { label: "Careers", href: routes.company.careers },
        { label: "Contact", href: routes.company.contact },
        { label: "Enterprise", href: routes.enterprise.index },
        { label: "Pricing", href: routes.pricing },
      ],
    },
  ],
  bottom: {
    copyright: "© 2026 Feluda. All rights reserved.",
    legal: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Security", href: routes.enterprise.security },
    ],
  },
};
