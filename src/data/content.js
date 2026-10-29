export const profile = {
  name: "Shahzad Saleem",
  role: "Language-Agnostic Software Engineer",
  years: "5+",
  shipped: "25+",
  tagline:
    "A language-agnostic software engineer building B2C and B2B marketplaces and full-stack web and mobile products, from database design to polished interfaces.",
  email: "mirzashahzadsaleem021@gmail.com",
  phone: "+92 335 9202400",
  location: "Karachi, Pakistan",
  github: "https://github.com/MirzaShahzadSaleem",
  linkedin: "https://www.linkedin.com/in/shahzad-saleem-41b943208/",
  resume: "/Shahzad-Saleem-Resume.pdf",
  summary: [
    "Shahzad is a language-agnostic software engineer with 5+ years of experience shipping full-stack web and mobile products. He picks the language and framework that fit the problem; day to day that's mostly TypeScript, JavaScript and SQL across React, Next.js, Node.js and Nest.js.",
    "Right now he's building B2C and B2B marketplaces end to end at The Exact Solutions. Before that he shipped 25+ live, production-ready projects in fintech, healthcare, education, IoT and real estate with teams in Pakistan, Poland, the US and Australia.",
    "He cares about performance, clean backend architecture and maintainable code, and he's comfortable owning a feature from schema to UI in agile, cross-functional teams.",
  ],
};

export const experience = [
  {
    role: "Software Engineer",
    company: "The Exact Solutions",
    place: "Poland",
    period: "Jun 2025 — Present",
    points: [
      "Build and scale two marketplaces end to end: a multi-vendor B2C platform and a B2B wholesale platform.",
      "B2C: payments and escrow, Buy Box algorithm, settlement engine, order management and trust & safety.",
      "B2B: contract pricing engine, RFQ and negotiation, trade credit and invoicing, procurement approvals and ERP integrations.",
      "Integrate payment gateways with webhooks, idempotent transactions and ledger reconciliation.",
      "Implement authentication, authorization and role-based access control (RBAC) across multi-tenant accounts.",
      "Own backend architecture, data flow and API performance; enforce best coding practices across the stack.",
    ],
    stack: ["React", "Next.js", "Node.js", "MySQL", "Stripe", "REST APIs", "RBAC"],
  },
  {
    role: "Software Engineer",
    company: "The Finit Systems",
    place: "New York",
    period: "Dec 2024 — Jun 2025",
    points: [
      "Led full-stack development across backend services, database design and frontend.",
      "Built scalable, high-performance web applications with React, Next.js, Node.js and MySQL.",
      "Designed relational schemas and REST APIs with performance and maintainability in mind.",
      "Upheld code quality, scalability and maintainability in a collaborative team.",
    ],
    stack: ["React", "Next.js", "Node.js", "MySQL"],
  },
  {
    role: "Software Engineer",
    company: "Geeks of Kolachi",
    place: "Karachi",
    period: "Sep 2022 — Dec 2024",
    points: [
      "Developed scalable web and mobile apps with React, React Native, Next.js, Node.js, Express and MySQL.",
      "Delivered products for international clients across fintech, healthcare, education, IoT and real estate.",
      "Integrated payments, real-time chat, multi-language support and third-party APIs, including OpenAI.",
      "Applied JavaScript and TypeScript across full-stack projects, ran client demos and delivered performance optimisations.",
    ],
    stack: ["React", "React Native", "Next.js", "Express", "MySQL", "TypeScript"],
  },
  {
    role: "Software Engineer Intern",
    company: "Trukkr.pk",
    place: "",
    period: "Mar 2022",
    points: ["Assisted in software development and testing, collaborating with engineers to resolve issues."],
    stack: [],
  },
  {
    role: "Software Engineer Trainee",
    company: "Jeddah Tech",
    place: "",
    period: "Jun 2021",
    points: ["Foundational training in software development, coding practices and team collaboration."],
    stack: [],
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    group: "Frameworks & libraries",
    items: ["React", "Next.js", "Node.js", "Express", "Nest.js", "React Native", "Redux", "Tailwind CSS", "Material UI"],
  },
  {
    group: "Databases",
    items: ["MySQL", "MongoDB"],
  },
  {
    group: "Tools & platforms",
    items: ["Git", "GitHub", "AWS", "Firebase", "Stripe"],
  },
  {
    group: "Domains",
    items: ["B2C marketplaces", "B2B marketplaces", "Fintech", "Healthcare", "Education", "IoT"],
  },
  {
    group: "Ways of working",
    items: ["Agile", "Scrum"],
  },
];

export const marketplaces = {
  summary:
    "Both run on the core modules he works on (payments, pricing, orders and access control), shaped for two very different kinds of buyer.",
  items: [
    {
      title: "B2C Marketplace",
      type: "Marketplace",
      current: true,
      audience: "Shoppers and independent sellers",
      description:
        "A multi-vendor marketplace where many sellers compete on the same products and shoppers buy from several sellers in one checkout.",
      modules: [
        { name: "Payments & escrow", detail: "Built escrow holding funds until delivery, with auto-release, refunds and chargebacks." },
        { name: "Buy Box algorithm", detail: "Developed offer ranking that picks the winning seller by price, rating, fulfilment speed and stock." },
        { name: "Settlement engine", detail: "Built split payments, commission rules and scheduled seller payouts on a double-entry ledger." },
        { name: "Order management", detail: "Built multi-seller order splitting, a fulfilment state machine, returns and refunds." },
        { name: "Search & discovery", detail: "Implemented faceted search and relevance ranking across a growing multi-seller catalog." },
        { name: "Trust & safety", detail: "Built fraud and risk checks, dispute resolution and seller performance scoring." },
      ],
      stack: ["Next.js", "React", "Node.js", "MySQL", "Stripe", "REST APIs"],
    },
    {
      title: "B2B Marketplace",
      type: "Marketplace",
      current: true,
      audience: "Business buyers and wholesale suppliers",
      description:
        "A wholesale marketplace connecting business buyers with suppliers, built around negotiated prices, trade credit and approval workflows.",
      modules: [
        { name: "Contract pricing engine", detail: "Built customer-specific price lists, tiered volume breaks and negotiated contract rates." },
        { name: "RFQ & negotiation", detail: "Built multi-round buyer–supplier quoting that converts accepted quotes into orders." },
        { name: "Trade credit & invoicing", detail: "Implemented credit limits, Net 30/60 terms, purchase orders and automated invoicing." },
        { name: "Procurement approvals", detail: "Built multi-level approval workflows, budgets and spend controls per company account." },
        { name: "Multi-tenant accounts", detail: "Designed company hierarchies with granular RBAC for buyers, approvers and suppliers." },
        { name: "ERP & integrations", detail: "Built catalog, inventory and order sync with supplier systems over REST APIs and webhooks." },
      ],
      stack: ["React", "Next.js", "Node.js", "MySQL", "RBAC", "Webhooks"],
    },
  ],
  shared: [
    "Payment gateway integrations with webhooks, idempotent transactions and ledger reconciliation",
    "Event-driven order and payment workflows with background jobs and notifications",
    "Backend architecture, data modelling and API performance in Node.js and MySQL",
  ],
};

export const projects = [
  ...marketplaces.items,
  {
    title: "IoT Data Platform",
    type: "Web application",
    description:
      "Collects data from IoT devices for real-time insights and analytics, with an integrated digital wallet for secure transactions. Built the Node.js backend and a server-rendered Next.js frontend.",
    stack: ["Next.js", "Node.js", "SSR"],
  },
  {
    title: "Immigration Portal",
    type: "Web application",
    description:
      "Helps people relocate internationally with resources, tools and personalised guidance. Feature development, Stripe payments, multi-language support and an admin portal for transaction visibility.",
    stack: ["React", "Context API", "Node.js", "MySQL", "Stripe", "Material UI"],
  },
  {
    title: "Transporter Portal",
    type: "Web & mobile",
    description:
      "An Australian product for managing EV fleets. Built fintech features in React Native and maintained the web portal for transaction visibility.",
    stack: ["React Native", "Redux", "React Navigation", "React", "Emotion"],
  },
  {
    title: "Advanced Educational Platform",
    type: "Web application",
    description:
      "Tools for students and researchers. Led the front-end, and built authentication, real-time chat and citation features on top of integrated APIs.",
    stack: ["React", "REST APIs", "Real-time chat"],
  },
  {
    title: "Advanced Assessment Platform",
    type: "Web application",
    description:
      "A structured quiz platform for measuring skills, with an interactive landing page, secure authentication, profiles and detailed result feedback.",
    stack: ["Next.js", "Nest.js"],
  },
  {
    title: "Healthcare Assessment App",
    type: "Mobile application",
    description:
      "Patient assessment app with OpenAI-powered responses, built to be responsive and accessible across devices.",
    stack: ["React Native", "OpenAI"],
  },
  {
    title: "Real Estate Website",
    type: "Website",
    description: "A high-performance, fully responsive landing site.",
    stack: ["Next.js", "Tailwind CSS"],
  },
];

export const cv = {
  summary:
    "Software Engineer with 5+ years of experience designing, building and scaling full-stack web and mobile products. Currently building a multi-vendor B2C marketplace and a B2B wholesale marketplace end to end at The Exact Solutions, owning core modules such as payments and escrow, the Buy Box algorithm, settlements, contract pricing and RFQ workflows. Chooses languages and frameworks by the problem, with deep hands-on experience in TypeScript, JavaScript, SQL, React, Next.js, Node.js, Nest.js and React Native. Has delivered 25+ live, production-ready projects across e-commerce, fintech, healthcare, education, IoT and real estate for teams in Pakistan, Poland, the US and Australia.",
  expertise: [
    "B2C & B2B marketplaces",
    "Payments, escrow & settlements",
    "Pricing & Buy Box algorithms",
    "Full-stack architecture",
    "REST APIs & integrations",
    "Database design & optimisation",
    "Authentication & RBAC",
    "Performance optimisation",
    "Web & mobile (React Native)",
  ],
};

export const education = [
  { title: "Bachelor's in Computer Science", place: "DHA Suffa University", period: "2019 — 2022" },
  { title: "Intermediate", place: "Govt Degree Science College, Johar", period: "2020 — 2022" },
];

export const certifications = [
  "Advanced React — Meta",
  "Build a Server Rendered Website with Next.js",
  "React JS along with Modern JavaScript",
  "JavaScript Algorithms and Data Structures",
  "Front End Development Libraries",
  "Certified Adobe Illustrator Designer",
];
