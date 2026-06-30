/* ============================================================
   CONTENT — single source of truth, derived from résumé.
   Edit here to update the entire site.
   ============================================================ */

export const personal = {
  name: "Keshav Bohra",
  firstName: "Keshav",
  role: "Senior Full Stack AI Engineer",
  location: "Pune, India",
  email: "keshav2016@gmail.com",
  linkedin: "https://www.linkedin.com/in/keshav-bohra-17032753/",
  github: "https://github.com/keshav-bohr", 
  availability: "Open to senior & staff engineering roles",
  yearsExperience: 8,
} as const;

/** Hero statement, broken into emphasis fragments for the kinetic headline. */
export const hero = {
  eyebrow: "Senior Full Stack · AI Engineer",
  // Each fragment renders as a line; `accent` words italicise in the serif.
  statement: [
    { text: "I build the ", accent: false },
    { text: "invisible infrastructure", accent: true },
    { text: " that thousands of engineers ship on every day.", accent: false },
  ],
  subline:
    "Eight years turning ambiguous, high-stakes problems — auth SDKs, fintech rails, agentic AI tooling — into systems that quietly hold the line in production.",
} as const;

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  index: string; // "01" … displayed as an editorial folio number
  title: string;
  company: string; // employer
  client: string; // end client / product (equals company for in-house work)
  discipline: string; // short category tag
  tags: string[];
  blurb: string; // one-liner shown on the card
  role: string;
  stack: string[];
  /** Narrative case-study body. */
  context: string;
  approach: string[];
  metrics: Metric[];
  /** Optional before/after transformation. */
  comparison?: { before: string; after: string };
};

export const projects: Project[] = [
  {
    id: "autodesk-auth-sdk",
    index: "01",
    title: "The Auth SDK that became independent",
    company: "Carnera",
    client: "Autodesk",
    discipline: "Identity, Tooling & Observability",
    tags: ["OAuth", "SDK", "TypeScript", "MCP", "Splunk"],
    blurb:
      "A zero-dependency OAuth SDK adopted across every Autodesk product line, with AI-driven Splunk observability layered on top.",
    role: "Senior Engineer — architecture, implementation, rollout",
    stack: ["TypeScript", "OAuth 2.0", "Cross-tab Locking", "MCP", "Splunk"],
    context:
      "Autodesk's product lines each reinvented token management — inconsistent refresh logic, drifting security posture, and a tangle of third-party dependencies that widened the supply-chain attack surface. I engineered the internal auth SDK that became the standard for OAuth across commercial products and MCP servers, serving thousands of internal developers — then layered AI-driven Splunk analysis on top so the platform could flag anomalies before they became incidents.",
    approach: [
      "Designed a unified token lifecycle (acquire, refresh, revoke) with a clean, typed surface that hides the protocol complexity from product teams.",
      "Replaced every third-party dependency with a hand-built cross-tab locking mechanism, so concurrent tabs coordinate a single refresh instead of stampeding the identity provider.",
      "Shipped first-class support for MCP servers, extending the same authorization guarantees to agentic AI tooling.",
      "Layered AI-driven log analysis over Splunk (via MCP) to surface anomalous traffic proactively, cutting mean-time-to-resolution by 25%.",
    ],
    metrics: [
      { value: "0", label: "external dependencies" },
      { value: "1000s", label: "internal devs served" },
      { value: "-25%", label: "mean-time-to-resolution" },
    ],
    comparison: {
      before:
        "Per-product token logic, multiple third-party libraries, and reactive incident response after anomalies had already escalated.",
      after:
        "One typed, zero-dependency SDK with uniform security across commercial + MCP servers, and AI analysis that flags anomalies before they escalate.",
    },
  },
  {
    id: "ai-chatbot-migration",
    index: "02",
    title: "From decision-tree to dialogue",
    company: "Carnera",
    client: "Autodesk",
    discipline: "Conversational AI",
    tags: ["LLM", "Analytics", "Testing"],
    blurb:
      "Migrated Autodesk.com's chatbot from static rules to AI-driven suggestions, and hardened the launch to zero regressions.",
    role: "Full Stack Engineer",
    stack: ["LLM Integration", "React", "Analytics", "Jest"],
    context:
      "Autodesk.com's customer-facing chatbot ran on brittle, rule-based scripts that demanded constant manual content updates and deflected fewer questions than it should. I migrated it to AI-driven response suggestions, instrumented the analytics to prove it worked, and hardened the rollout so it shipped without regressions.",
    approach: [
      "Replaced static decision trees with AI-driven response suggestions.",
      "Instrumented deflection-rate and engagement analytics to measure real impact and guide iteration.",
      "Lifted test coverage from 65% to 90% ahead of the cross-product rollout, shipping with zero critical regressions.",
    ],
    metrics: [
      { value: "AI-driven", label: "response suggestions" },
      { value: "65 → 90%", label: "test coverage" },
      { value: "0", label: "critical regressions" },
    ],
    comparison: {
      before:
        "Static rule-based inputs requiring constant manual upkeep, with a rollout riding on 65% coverage and crossed fingers.",
      after:
        "AI-driven suggestions steered by analytics, shipped on 90% coverage with zero critical regressions.",
    },
  },
  {
    id: "link-money-fees",
    index: "03",
    title: "Getting the money exactly right",
    company: "Carnera",
    client: "Link Money",
    discipline: "Fintech",
    tags: ["Java", "Kotlin", "Spring Boot"],
    blurb:
      "Payment fee-calculation engine handling multiple fee structures and regulatory requirements.",
    role: "Backend Engineer",
    stack: ["Java", "Kotlin", "Spring Boot"],
    context:
      "Fintech leaves no room for rounding errors. I engineered the fee-calculation features powering Link Money's payment platform, accurate across a matrix of fee structures and regulatory constraints.",
    approach: [
      "Modelled layered fee structures with precise arithmetic.",
      "Encoded the regulatory requirements into the calculation path.",
      "Kept processing accurate across every fee structure.",
    ],
    metrics: [
      { value: "Multi", label: "fee structures" },
      { value: "Regulatory", label: "compliance built-in" },
    ],
  },
  {
    id: "wordpress-to-nextjs",
    index: "04",
    title: "A marketing site that loads before you blink",
    company: "Carnera",
    client: "BoardEffect",
    discipline: "Web Performance & CMS",
    tags: ["Next.js", "Sanity", "Performance"],
    blurb:
      "Re-platformed a WordPress site to Next.js + Sanity — ~40% faster, editor-friendly.",
    role: "Full Stack Engineer",
    stack: ["Next.js", "Sanity CMS", "TypeScript"],
    context:
      "A client's WordPress marketing site was slow and locked content behind developers. I migrated it to Next.js and Sanity CMS, cutting load times sharply while handing editorial control back to non-technical editors.",
    approach: [
      "Re-platformed onto Next.js for modern rendering and performance.",
      "Modelled content in Sanity so editors publish independently.",
      "Cut page-load time by roughly 40% on the new stack.",
    ],
    metrics: [
      { value: "~40%", label: "faster page loads" },
      { value: "Self-serve", label: "content editing" },
    ],
    comparison: {
      before: "Slow WordPress stack with content gated behind engineers.",
      after: "Fast Next.js + Sanity site editors manage on their own.",
    },
  },
  {
    id: "harkins-form-builder",
    index: "05",
    title: "Forms without engineers",
    company: "Carnera",
    client: "Harkins Builders",
    discipline: "Platform & DX",
    tags: ["React", "Config-driven", "No-code"],
    blurb:
      "A configurable, versioned form builder that let non-technical staff own 50+ templates.",
    role: "Frontend Engineer",
    stack: ["React", "React Final Form", "TypeScript"],
    context:
      "Every new form at Harkins Builders meant an engineering ticket. I built a configurable, versioned form builder so non-technical staff could create and evolve templates themselves — removing engineering from the critical path entirely.",
    approach: [
      "Designed a config-driven schema with versioning so templates evolve safely without breaking historical submissions.",
      "Built an authoring experience non-technical staff could use unaided.",
      "Shipped validation, conditional logic, and reusable field libraries.",
    ],
    metrics: [
      { value: "50+", label: "templates self-served" },
      { value: "0", label: "eng tickets per form" },
    ],
    comparison: {
      before: "Every form change blocked on engineering availability.",
      after: "Non-technical staff author and version 50+ templates independently.",
    },
  },
  {
    id: "outlook-task-addin",
    index: "06",
    title: "Tasks, without leaving the inbox",
    company: "Carnera",
    client: "Tessaract",
    discipline: "Developer Productivity",
    tags: ["Outlook Add-in", "REST", "JSON-RPC"],
    blurb:
      "An Outlook add-in that brought task management into the email client, cutting context-switching by 60%.",
    role: "Full Stack Engineer",
    stack: ["TypeScript", "REST APIs", "JSON-RPC", "Outlook Add-in"],
    context:
      "Knowledge workers were bouncing between Outlook and a separate task tool all day, and every switch cost focus. I built a Microsoft Outlook add-in that surfaces task management directly inside the email client, so the work happens where the conversation already lives.",
    approach: [
      "Integrated with the task backend over REST and JSON-RPC.",
      "Embedded the task UI natively in Outlook via the Office add-in surface.",
      "Kept state in sync so actions in the add-in and the core app never diverge.",
    ],
    metrics: [
      { value: "-60%", label: "user context-switching" },
      { value: "In-client", label: "task management" },
    ],
    comparison: {
      before:
        "Constant tab-hopping between Outlook and a separate task manager, bleeding focus on every switch.",
      after:
        "Tasks created and managed inside Outlook itself — the context never has to change.",
    },
  },
  {
    id: "firstcry-influencer-platform",
    index: "07",
    title: "Where 500 creators meet brands",
    company: "FirstCry",
    client: "FirstCry",
    discipline: "Platform & Growth",
    tags: ["Platform", "Workflows", "Full Stack"],
    blurb:
      "An influencer collaboration platform powering brand partnerships with 500+ creators.",
    role: "Software Developer",
    stack: ["React", "Node.js"],
    context:
      "FirstCry wanted to scale brand partnerships beyond what manual coordination could handle. I architected and built an influencer collaboration platform that streamlined the whole campaign lifecycle.",
    approach: [
      "Built end-to-end workflows for onboarding, campaigns and collaboration.",
      "Modelled brand–creator relationships and campaign state cleanly.",
      "Streamlined coordination so the team could scale partnerships, not headcount.",
    ],
    metrics: [
      { value: "500+", label: "creators onboarded" },
      { value: "End-to-end", label: "campaign workflows" },
    ],
  },
  {
    id: "firstcry-redis-cache",
    index: "08",
    title: "A third off every request",
    company: "FirstCry",
    client: "FirstCry",
    discipline: "Performance Engineering",
    tags: ["Redis", "Caching", "Scale"],
    blurb:
      "A Redis caching layer that cut API response times by 33% for millions of monthly users.",
    role: "Software Developer",
    stack: ["Redis", "Node.js", "REST APIs"],
    context:
      "At FirstCry's scale, every millisecond of API latency multiplied across millions of monthly users. I introduced a Redis caching layer in front of a remote database to take the repeated reads off the hot path.",
    approach: [
      "Added a Redis cache integrated with the remote database for hot reads.",
      "Designed invalidation so cached data stays correct under writes.",
      "Tuned what to cache by traffic profile to maximise hit rate.",
    ],
    metrics: [
      { value: "-33%", label: "API response time" },
      { value: "Millions", label: "monthly users served" },
    ],
    comparison: {
      before:
        "Every request hitting the remote database, with latency users could feel at peak.",
      after:
        "A Redis layer absorbing hot reads — 33% faster responses and smoother page loads.",
    },
  },
  {
    id: "zero-downtime-migration",
    index: "09",
    title: "A million records, migrated live",
    company: "West Agile Labs",
    client: "Cypress Lawn",
    discipline: "Data Architecture",
    tags: ["Migration", "Data", "Zero-downtime"],
    blurb:
      "Moved 1M+ records from a legacy schema to a new architecture with zero downtime.",
    role: "Software Developer",
    stack: ["PostgreSQL", "Node.js"],
    context:
      "A production system had outgrown its legacy schema, but it couldn't go offline to fix it. I architected and executed a zero-downtime migration of over a million records onto a new data architecture without interrupting service.",
    approach: [
      "Designed the target data architecture and a migration path that kept the system live.",
      "Migrated 1M+ records while the system stayed live.",
      "Verified integrity end-to-end so nothing was lost or corrupted in transit.",
    ],
    metrics: [
      { value: "1M+", label: "records migrated" },
      { value: "Zero", label: "downtime" },
    ],
    comparison: {
      before: "A production system constrained by a legacy schema it had outgrown.",
      after:
        "A new data architecture, migrated live with 1M+ records intact and zero downtime.",
    },
  },
  {
    id: "valuesadvisors-geospatial",
    index: "10",
    title: "The right advisor, within radius",
    company: "West Agile Labs",
    client: "Values Advisor",
    discipline: "Geospatial Full Stack",
    tags: ["PostgreSQL", "Geospatial", "Google Maps"],
    blurb:
      "Launched a platform from scratch with geospatial advisor search within a configurable radius.",
    role: "Engineer — architecture to launch",
    stack: ["PostgreSQL", "Earthdistance", "Google Maps API", "React"],
    context:
      "ValuesAdvisors needed to help people discover advisors near them — from a blank page. I architected and launched the web platform end to end, with location-aware search at its core.",
    approach: [
      "Implemented proximity search with PostgreSQL's Earth Distance extension.",
      "Integrated the Google Maps API for discovery within a configurable radius.",
      "Took the platform from architecture through to production launch.",
    ],
    metrics: [
      { value: "0 → 1", label: "built and launched" },
      { value: "Radius", label: "geospatial search" },
    ],
  },
  {
    id: "dearly-social-wellness",
    index: "11",
    title: "A wellness community, infinitely threaded",
    company: "West Agile Labs",
    client: "Dearly",
    discipline: "Social Platform",
    tags: ["React", "Node.js", "Self-referential DB", "Non-blocking UI"],
    blurb:
      "A social + wellness Q&A platform where posts, questions and comments nest without limit — with instant, non-blocking likes and replies.",
    role: "Full Stack Engineer",
    stack: ["React", "Node.js", "PostgreSQL"],
    context:
      "Dearly blends a social feed with a questions-and-answers portal centred on personal wellness — people share, ask, and reply in conversations that can branch without limit. The hard parts were modelling that unbounded depth and making every interaction feel instant.",
    approach: [
      "Modelled infinitely nested articles, questions and comments with self-referential database tables, so threads branch to any depth.",
      "Made likes and comments fire through background API calls, keeping the UI non-blocking and instantly responsive.",
      "Built the experience end to end in React and Node.",
    ],
    metrics: [
      { value: "Nested", label: "threads to any depth" },
      { value: "Non-blocking", label: "likes & comments" },
    ],
    comparison: {
      before:
        "Flat comment models and a UI that stalled while every like or reply waited on the server.",
      after:
        "Self-referential tables let conversations nest endlessly; background calls keep likes and comments instant.",
    },
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Frontend", items: ["TypeScript", "JavaScript", "React", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "Java", "Kotlin", "Spring Boot", "GraphQL"] },
  { label: "AI", items: ["LLM Integration", "MCP", "Agentic AI", "Orchestration"] },
  { label: "Data", items: ["MSSQL", "PostgreSQL", "MongoDB"] },
  { label: "Test", items: ["Playwright", "Jest", "Cypress"] },
  { label: "Infra", items: ["AWS Lambda", "S3", "EC2", "Docker", "GitHub Actions", "Jenkins"] },
];

export const about = {
  lead:
    "I'm a full-stack engineer who gravitates toward the load-bearing problems — the auth layer, the fee engine, the SDK everyone depends on but no one wants to own.",
  philosophy: [
    "The best infrastructure is invisible. If thousands of engineers build on your SDK without ever thinking about it, you've done the job right.",
    "I care about the seams — supply-chain risk, the refresh race nobody noticed, the 25% of test coverage that turns a launch into a non-event.",
    "Lately that instinct points at AI: MCP servers, agentic tooling, and LLM-driven systems that make the invisible legible.",
  ],
} as const;

export type Recognition = { title: string; detail: string };

export const recognition: Recognition[] = [
  { title: "Employee of the Year", detail: "2023" },
  { title: "Pillar of Excellence", detail: "2024" },
  { title: "Open Source", detail: "Contributions to VSCode & Uber Baseweb" },
];

export const experience = [
  {
    company: "Carnera",
    location: "Pune",
    role: "Senior Software Developer",
    period: "May 2022 — Present",
  },
  {
    company: "FirstCry",
    location: "Pune",
    role: "Software Developer",
    period: "Oct 2020 — Apr 2022",
  },
  {
    company: "West Agile Labs",
    location: "Hyderabad",
    role: "Software Developer",
    period: "Jan 2018 — Oct 2020",
  },
];

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
