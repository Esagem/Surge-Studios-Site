export type PortfolioPalette = {
  accent: string;
  accentSoft: string;
  glow: string;
  panel: string;
  ring: string;
};

export type PortfolioMediaItem = {
  id: string;
  kind: "image" | "mock";
  title: string;
  caption?: string;
  placeholderStyle?: "dashboard" | "marketing" | "mobile" | "analytics" | "editor";
};

export type PortfolioProject = {
  id: string;
  name: string;
  shortLabel: string;
  category: "Studio Build" | "Studio Starter Kit";
  internal: boolean;
  heroAngle: string;
  summary: string;
  workDone: string[];
  standoutDecisions: string[];
  outcomeHighlights: string[];
  palette: PortfolioPalette;
  media: PortfolioMediaItem[];
  logoMode: "monogram" | "wordmark";
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "takeoff",
    name: "TakeOff",
    shortLabel: "TakeOff",
    category: "Studio Build",
    internal: true,
    heroAngle: "Internal product build used to sharpen our launch workflow and product polish standards.",
    summary:
      "An internal Surge Studios product used as a proving ground for launch UX, onboarding flow decisions, and the kind of polish we expect before anything goes live.",
    workDone: [
      "Product UI and landing flow design for a clear first-run experience.",
      "Interaction polish pass across navigation, form states, and empty/loading states.",
      "Technical foundation for fast iteration, stable releases, and clean future additions.",
      "Launch-readiness review covering responsiveness, visual consistency, and edge cases.",
    ],
    standoutDecisions: [
      "Built as an internal studio project so we could test our own process under real constraints.",
      "Treated polish as a dedicated step instead of a last-minute cleanup sweep.",
      "Documented patterns and handoff notes so improvements transfer into client work.",
    ],
    outcomeHighlights: [
      "Created a reusable reference implementation for Surge build quality standards.",
      "Improved internal estimates by validating build phases against a real product.",
      "Now serves as a live showcase of how we structure and finish product work.",
    ],
    palette: {
      accent: "#75d8ff",
      accentSoft: "#2b89d8",
      glow: "rgba(117, 216, 255, 0.24)",
      panel: "rgba(16, 33, 49, 0.72)",
      ring: "rgba(117, 216, 255, 0.34)",
    },
    logoMode: "wordmark",
    media: [
      { id: "takeoff-dashboard", kind: "mock", title: "Product dashboard", placeholderStyle: "dashboard" },
      { id: "takeoff-marketing", kind: "mock", title: "Launch landing page", placeholderStyle: "marketing" },
      { id: "takeoff-mobile", kind: "mock", title: "Mobile onboarding", placeholderStyle: "mobile" },
      { id: "takeoff-editor", kind: "mock", title: "Content/editor workspace", placeholderStyle: "editor" },
    ],
  },
  {
    id: "saas-starter",
    name: "SaaS Starter",
    shortLabel: "SaaS Starter",
    category: "Studio Starter Kit",
    internal: true,
    heroAngle: "A reusable SaaS foundation with auth, billing, and dashboard patterns ready to adapt.",
    summary:
      "A flexible starter kit for teams who need a serious base quickly: authentication, billing flows, dashboard structure, and production-ready patterns instead of demo-only scaffolding.",
    workDone: [
      "Baseline auth, team/account structure, and protected app shell patterns.",
      "Billing and subscription UX states for upgrades, failures, and plan changes.",
      "Dashboard information architecture with reusable cards, tables, and status blocks.",
      "Setup conventions for deployment, environment config, and iteration handoff.",
    ],
    standoutDecisions: [
      "Focused on adaptation speed without locking the product into one visual system.",
      "Included error and fallback states so teams start from a realistic baseline.",
      "Built the kit to be easy to trim down, not just easy to add onto.",
    ],
    outcomeHighlights: [
      "Cuts time-to-first-feature for new SaaS builds.",
      "Gives teams a cleaner base than patching together unrelated templates.",
      "Helps scope MVPs around real flows instead of placeholder screens.",
    ],
    palette: {
      accent: "#8df47d",
      accentSoft: "#44b165",
      glow: "rgba(141, 244, 125, 0.2)",
      panel: "rgba(19, 39, 24, 0.72)",
      ring: "rgba(141, 244, 125, 0.3)",
    },
    logoMode: "monogram",
    media: [
      { id: "saas-dashboard", kind: "mock", title: "Core dashboard", placeholderStyle: "dashboard" },
      { id: "saas-analytics", kind: "mock", title: "Billing + analytics", placeholderStyle: "analytics" },
      { id: "saas-mobile", kind: "mock", title: "Mobile account views", placeholderStyle: "mobile" },
    ],
  },
  {
    id: "website-launch-kit",
    name: "Website Launch Kit",
    shortLabel: "Launch Kit",
    category: "Studio Starter Kit",
    internal: true,
    heroAngle: "A launch-ready website system focused on CMS editing, SEO structure, and performance.",
    summary:
      "A starter system for shipping high-quality sites with CMS editing, SEO fundamentals, performance-conscious components, and a clean handoff path for ongoing changes.",
    workDone: [
      "Built a reusable marketing site structure with modular content sections.",
      "Defined CMS-friendly component patterns for editors and non-technical teams.",
      "Performance-focused layout and media conventions for fast page delivery.",
      "SEO baseline structure including metadata, internal linking patterns, and content hierarchy.",
    ],
    standoutDecisions: [
      "Prioritized editing clarity so content updates do not break the design system.",
      "Tuned sections for composition flexibility without turning pages into visual soup.",
      "Optimized for launch readiness, not just homepage demos.",
    ],
    outcomeHighlights: [
      "Makes website launches faster without sacrificing design quality.",
      "Reduces cleanup work after launch by using consistent section patterns.",
      "Provides a reliable baseline for SEO and performance from day one.",
    ],
    palette: {
      accent: "#ffb45d",
      accentSoft: "#d06f35",
      glow: "rgba(255, 180, 93, 0.22)",
      panel: "rgba(49, 31, 17, 0.72)",
      ring: "rgba(255, 180, 93, 0.3)",
    },
    logoMode: "wordmark",
    media: [
      { id: "launch-hero", kind: "mock", title: "Marketing homepage", placeholderStyle: "marketing" },
      { id: "launch-editor", kind: "mock", title: "CMS editing layout", placeholderStyle: "editor" },
      { id: "launch-mobile", kind: "mock", title: "Responsive pages", placeholderStyle: "mobile" },
    ],
  },
  {
    id: "legacy-refresh",
    name: "Legacy Refresh",
    shortLabel: "Legacy Refresh",
    category: "Studio Starter Kit",
    internal: true,
    heroAngle: "A practical modernization path for products that need UI and speed improvements without a rewrite.",
    summary:
      "A framework for upgrading existing products with focused UI cleanup, performance work, and reliability fixes while preserving what already works and avoiding unnecessary rebuilds.",
    workDone: [
      "UI refresh patterns for incremental rollout in older interfaces.",
      "Performance and rendering cleanup targets for visible speed gains.",
      "Stability-focused fixes and regression checks around fragile screens.",
      "Modernized component patterns that can coexist with legacy code.",
    ],
    standoutDecisions: [
      "Designed for staged adoption so teams can improve the product while shipping.",
      "Balanced visible polish with technical cleanup work users never see directly.",
      "Built the kit around constraints common in real legacy codebases.",
    ],
    outcomeHighlights: [
      "Provides a clearer path to modern UX without a risky rebuild.",
      "Improves perceived and actual performance in high-traffic flows.",
      "Creates momentum for future upgrades through repeatable patterns.",
    ],
    palette: {
      accent: "#ff6ea8",
      accentSoft: "#c9528b",
      glow: "rgba(255, 110, 168, 0.2)",
      panel: "rgba(48, 20, 34, 0.72)",
      ring: "rgba(255, 110, 168, 0.3)",
    },
    logoMode: "monogram",
    media: [
      { id: "legacy-compare", kind: "mock", title: "UI refresh patterns", placeholderStyle: "editor" },
      { id: "legacy-analytics", kind: "mock", title: "Performance diagnostics", placeholderStyle: "analytics" },
      { id: "legacy-dashboard", kind: "mock", title: "Modernized interface modules", placeholderStyle: "dashboard" },
    ],
  },
];
