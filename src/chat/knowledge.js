import { profile, experience, projects } from "../data/content";

// Everything the assistant knows beyond the core topics, written from Shahzad's résumé.
// Order matters: the first matching non-topic entry wins; matching topics are combined (up to two).
// `follow` lists QUESTIONS keys from answers.js.

const current = experience[0];
const usedIn = (...tech) => projects.filter((p) => tech.some((t) => p.stack.includes(t))).map((p) => p.title);

const say = (q, a, extra = {}) => ({ q, a, ...extra });
const topic = (q, a, extra = {}) => ({ q, a, topic: true, ...extra });

export const KNOWLEDGE = [
  // Clearly off-topic: handled by the fallback, which still leads back to him.
  say(/weather|\bnews\b|sports?|football|cricket|world cup|politic|elections?|stock market|recipes?|movies?|\bsongs?\b|lottery|horoscope|capital of|\bdate today\b|what time is it/, null, { offTopic: true }),
  // About this assistant and the site
  say(
    /are you (an? )?(ai|bot|robot|human|real|person|chat ?gpt|gpt|llm)|who are you|what are you|is this (an? )?(ai|bot)|who am i (talking|speaking|chatting) (to|with)/,
    `I'm Shahzad's portfolio assistant: a lightweight, scripted chat he built in React, with every answer written from his résumé. There's no large language model behind me, so I won't make things up about him.`,
    { follow: ["about", "now", "projects"] }
  ),
  say(
    /(who|how) (built|made|designed|created|developed) (this|the|your) (site|website|portfolio|chat|page)|how (was|is) (this|the) (site|website|portfolio|chat) (built|made)|(tech|stack|technology) (behind|of|used (for|in)) (this|the) (site|website|portfolio|chat)|source code/,
    `Shahzad built this site himself: React 18 with a hand-written chat engine, Firestore for messages, EmailJS for notifications, deployed on Netlify. Even his résumé PDF is generated from the same data file, so the site and the CV never drift apart.`,
    { kind: "chips", data: ["React 18", "Custom chat engine", "Firebase Firestore", "EmailJS", "Netlify"], follow: ["projects", "skills", "contact"] }
  ),
  say(
    /how old|\bage\b|married|\bwife\b|religio|\bkids\b|children|girlfriend|boyfriend|family/,
    `That's personal, so I'll leave it to Shahzad. What I can tell you about is his work: ${profile.years} years building full-stack products, currently B2C and B2B marketplaces at ${current.company}.`,
    { follow: ["about", "now", "contact"] }
  ),

  // Practical hiring questions
  say(
    /\brates?\b|salary|hourly|how much (does|would|will|do) (he|you|it) (charge|cost)|\bcharges?\b|compensation|expected (pay|salary|ctc)|\bctc\b|pay (him|range)/,
    `Rates depend on the scope and type of engagement, so Shahzad discusses them directly. Share a few details about the role or project and he'll come back with a clear number.`,
    { kind: "contact", follow: ["about", "resume", "projects"] }
  ),
  say(
    /availab|open to (work|opportunit|offers|new)|looking for (a )?(new )?(job|work|role|opportunit)|start date|when can he (start|join)|notice period|is he (hiring|looking)|job hunting/,
    `Yes, he's open to opportunities. He's currently a ${current.role} at ${current.company}; for start dates and notice period, send him a message and he'll reply personally.`,
    { kind: "contact", follow: ["about", "now", "resume"] }
  ),
  say(
    /freelanc|\bcontract(or|ing)? (work|role|basis|position|job|project)|on (a )?contract|part.?time|full.?time|consult(ing|ant)?|side projects?|\bgigs?\b|\bupwork\b|\bfiverr\b/,
    `He's open to full-time roles, and to contract or freelance work that fits, especially marketplaces, payments and full-stack product builds. Tell him about the project and he'll get back to you.`,
    { kind: "contact", follow: ["projects", "now", "resume"] }
  ),
  say(
    /remote|relocat|on.?site|\bonsite\b|hybrid|\bvisa\b|move (to|abroad)|work from (home|office)|in.?office/,
    `Remote is how he's worked for years: from ${profile.location} with teams in Poland, New York and Australia. For on-site, hybrid or relocation, ask him directly, he's open to the right opportunity.`,
    { follow: ["now", "experience", "contact"] }
  ),
  say(
    /time ?zone|\bpkt\b|\butc\b|\bgmt\b|working hours|overlap/,
    `He's on Pakistan Standard Time (UTC+5), which overlaps comfortably with Europe and the Middle East and with US mornings. He's used to it: his teams have been in Poland, New York and Australia.`,
    { follow: ["experience", "contact"] }
  ),
  say(
    /where (is|does) he (live|based|from|located|work from)|where is he (based|from|located)|\blocation\b|based (in|out of)|which (country|city)|\blives?\b|where are you/,
    `He's based in ${profile.location} and works remotely with international teams. His current role is with ${current.company} in ${current.place}.`,
    { follow: ["now", "experience", "contact"] }
  ),
  say(
    /english|languages? (does )?he speak|speak english|spoken languages?/,
    `He works in English every day, with teams and clients in Poland, the US and Australia.`,
    { follow: ["experience", "contact"] }
  ),
  say(
    /\bphone\b(?! apps?)|whats ?app|call him|telephone|mobile number|his number|contact number/,
    `His phone number is on his résumé, but the quickest way to reach him is a message here or an email to ${profile.email}.`,
    { kind: "contact", follow: ["resume", "about"] }
  ),
  say(
    /interview|schedule|meeting|book (a )?(call|chat)|set up a call|talk to (him|shahzad)|speak (to|with) (him|shahzad)/,
    `He'd be glad to talk. Leave a message with a few times that suit you, or email him directly, and he'll set it up.`,
    { kind: "contact", follow: ["resume", "about"] }
  ),

  // Marketplace modules
  topic(
    /escrow/,
    `Escrow means the marketplace holds the buyer's money until the order is delivered, then releases it to the seller. Shahzad built exactly this for the B2C marketplace at ${current.company}: funds held until delivery, with auto-release, refunds and chargebacks.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /buy ?box/,
    `The Buy Box is the default "Add to cart" offer when several sellers list the same product (Amazon made it famous). Shahzad developed the Buy Box algorithm for the B2C marketplace, ranking offers by price, seller rating, fulfilment speed and stock.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /settlement|ledger|payouts?|commissions?|double.?entry|reconcil|split payments?/,
    `He built the B2C marketplace's settlement engine: split payments, commission rules and scheduled seller payouts on a double-entry ledger, with reconciliation against the payment gateway.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /\brfq\b|request for (a )?quote|quot(e|es|ation|ations|ing)\b|negotiat/,
    `For the B2B marketplace he built the RFQ and negotiation module: multi-round quoting between buyers and suppliers, where an accepted quote turns straight into an order.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /contract pricing|price lists?|tiered pricing|volume (pricing|breaks|discounts?)|pricing engine|dynamic pricing|\bpricing\b/,
    `He built the B2B marketplace's contract pricing engine: customer-specific price lists, tiered volume breaks and negotiated contract rates. On the B2C side, pricing feeds his Buy Box algorithm.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /trade credit|credit (limits?|terms)|net ?(30|60)|invoic|purchase orders?/,
    `On the B2B marketplace he implemented trade credit and invoicing: credit limits, Net 30/60 terms, purchase orders and automated invoices, the way companies actually pay.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /procurement|approvals?|spend controls?|budgets?/,
    `He built procurement approvals for the B2B marketplace: multi-level approval workflows, budgets and spend controls per company account.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /order management|\boms\b|fulfil+ment|\breturns?\b|refunds?|\borders\b|\bordering\b/,
    `He designed the B2C marketplace's order management: one cart split across multiple sellers, a fulfilment state machine, returns and refunds.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /\bsearch|discovery|ranking|relevance|faceted|filters?\b/,
    `He implemented search and discovery for the B2C marketplace, with faceted search and relevance ranking across a growing multi-seller catalog.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /fraud|trust (and|&) safety|\bsafety\b|\bdisputes?\b|\brisk\b|chargebacks?/,
    `He built trust and safety for the B2C marketplace: fraud and risk checks, dispute resolution and seller performance scoring.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /multi.?tenant|tenants?|company accounts?|organi[sz]ations? accounts?/,
    `He designed the B2B marketplace's multi-tenant accounts: company hierarchies with granular RBAC for buyers, approvers and suppliers.`,
    { follow: ["now", "projects", "contact"] }
  ),
  topic(
    /\berp\b|integrations?|webhooks?|\bsap\b|\bsync(ing|hroni[sz]ation)?\b/,
    `He builds integrations as first-class features: catalog, inventory and order sync between the B2B marketplace and supplier systems over REST APIs and webhooks, plus payment gateway webhooks with idempotent processing.`,
    { follow: ["now", "projects", "contact"] }
  ),

  // Technologies he has used
  topic(
    /react native|\bexpo\b|mobile|\bios\b|android|app store|play store|phone apps?/,
    `He builds mobile apps with React Native: fintech features for the Transporter Portal (Redux, React Navigation) and the Healthcare Assessment App with OpenAI responses, plus client apps at Geeks of Kolachi.`,
    { kind: "chips", data: usedIn("React Native"), follow: ["projects", "skills"] }
  ),
  topic(
    /\breact(\.?js)?\b(?! native)/,
    `React is his main front-end tool, backed by Meta's Advanced React certification. Among his portfolio highlights it powers ${usedIn("React").length} products, including both marketplaces, the Immigration Portal and the Advanced Educational Platform.`,
    { kind: "chips", data: usedIn("React"), follow: ["projects", "skills"] }
  ),
  topic(
    /next\.?js|nextjs|\bssr\b|server.?side render|server rendered|\bseo\b/,
    `Next.js is his choice for fast, SEO-friendly products: server-rendered marketplace pages, the IoT Data Platform front-end, the Assessment Platform and the Real Estate site. He's certified in building server-rendered sites with Next.js.`,
    { kind: "chips", data: usedIn("Next.js"), follow: ["projects", "skills"] }
  ),
  topic(
    /\bnode(\.?js)?\b/,
    `Node.js powers most of his backends: the marketplaces' payments, escrow and settlement services at ${current.company}, the IoT Data Platform backend and the Immigration Portal APIs.`,
    { kind: "chips", data: usedIn("Node.js"), follow: ["projects", "skills"] }
  ),
  topic(
    /\bexpress(\.?js)?\b/,
    `He built REST APIs with Express at Geeks of Kolachi, and moves between Express and Nest.js depending on how much structure a backend needs.`,
    { follow: ["projects", "skills"] }
  ),
  topic(
    /\bnest(\.?js)?\b|nestjs/,
    `He built the Advanced Assessment Platform on Nest.js with a Next.js front-end. He reaches for Nest.js on larger backends, where modules and typed contracts keep things maintainable.`,
    { follow: ["projects", "skills"] }
  ),
  topic(
    /typescript|\bts\b/,
    `TypeScript is his default for anything that will grow: typed APIs and models shared between front-end and back-end. He's used it across full-stack projects since Geeks of Kolachi.`,
    { follow: ["skills", "projects"] }
  ),
  topic(
    /javascript|(?<![.\w])js\b|ecmascript|\bes6\b/,
    `JavaScript is where he started, with certifications in JavaScript Algorithms and Data Structures and modern JavaScript. Today he mostly writes it as TypeScript.`,
    { follow: ["skills", "education"] }
  ),
  topic(
    /mysql|\bsql\b|relational|database|schema|data ?model|\bdb\b|queries|indexing/,
    `Database design is one of his strengths. MySQL is his main database: ledgers, orders and pricing for the marketplaces, the Immigration Portal and client systems at The Finit Systems, designed with performance in mind.`,
    { follow: ["skills", "now"] }
  ),
  topic(
    /mongo(db)?|nosql/,
    `He's worked with MongoDB as well as MySQL, and chooses by the data: relational for money and orders, documents where the shape is flexible.`,
    { follow: ["skills"] }
  ),
  topic(
    /redux|context api|state management|zustand/,
    `He used Redux on the Transporter Portal (React Native) and the Context API on the Immigration Portal, picking the lightest state tool that does the job.`,
    { follow: ["projects", "skills"] }
  ),
  topic(
    /tailwind|material.?ui|\bmui\b|\bcss\b|styled.?components|emotion|\bhtml\b/,
    `He's comfortable across styling approaches: Tailwind CSS on the Real Estate site, Material UI and Emotion on the Transporter and Immigration admin portals, and plain HTML and CSS.`,
    { follow: ["projects", "skills"] }
  ),
  topic(
    /stripe|payments?|payment gateway|checkout|digital wallet|wallet|transactions?/,
    `Payments are one of his specialities: escrow and seller settlements in the B2C marketplace, trade credit in the B2B marketplace, Stripe on the Immigration Portal, a digital wallet in the IoT Data Platform and fintech features in the Transporter Portal.`,
    { kind: "chips", data: ["Escrow", "Settlements", "Trade credit", "Stripe", "Digital wallet"], follow: ["now", "projects"] }
  ),
  topic(
    /firebase|firestore/,
    `He's used Firebase on client projects, and this very site stores your messages in Firestore.`,
    { follow: ["skills", "contact"] }
  ),
  topic(
    /\baws\b|amazon web services|\bcloud\b|\bs3\b|\bec2\b|lambda|deploy(ment|ing|s)?|hosting/,
    `AWS is part of his toolkit for hosting and deploying apps, alongside Firebase and Netlify, which is where this site runs.`,
    { follow: ["skills"] }
  ),
  topic(
    /\bgit\b|github|version control|\brepos?\b|pull requests?/,
    `Git and GitHub are part of every team he's worked in: branches, pull requests and reviews. You can find him at ${profile.github.replace("https://", "")}.`,
    { follow: ["projects", "contact"] }
  ),
  topic(
    /openai|chat ?gpt|\bgpt\b|\bllms?\b|\bai\b|artificial intelligence|machine learning|\bml\b|generative/,
    `He's built AI into products: the Healthcare Assessment App uses OpenAI to respond to patients. He's comfortable wiring LLM APIs into real features.`,
    { follow: ["projects", "skills"] }
  ),
  topic(
    /\bapis?\b|\brest(ful)?\b|endpoints?/,
    `API design is core to his work: REST APIs for the marketplaces, the Immigration Portal and the Educational Platform, with a focus on clean contracts, efficient data flow and fast responses.`,
    { follow: ["now", "skills"] }
  ),
  topic(
    /auth(entication|orization)?\b|login|sign.?in|\brbac\b|role.?based|permissions?|access control|\bjwt\b|oauth|security|secure/,
    `He implements authentication, authorization and role-based access control (RBAC) at ${current.company}, across buyers, sellers, suppliers and admins in multi-tenant accounts. He also built secure auth for the Educational and Assessment platforms.`,
    { follow: ["now", "projects"] }
  ),
  topic(
    /real.?time|websockets?|socket\.?io|live chat|chat feature/,
    `He built real-time chat on the Advanced Educational Platform, and real-time data collection and analytics from devices on the IoT Data Platform.`,
    { follow: ["projects"] }
  ),
  topic(
    /multi.?lang|\bi18n\b|internationali[sz]|translation|locali[sz]ation|\brtl\b/,
    `He shipped multi-language support on the Immigration Portal, for people moving between countries.`,
    { follow: ["projects"] }
  ),
  topic(
    /performance|optimi[sz]|\bspeed\b|\bslow\b|core web vitals|lighthouse|caching|\bcache\b/,
    `Performance is a recurring theme: he improves application performance at ${current.company}, delivered optimisations for clients at Geeks of Kolachi, and uses server-rendered Next.js pages for speed and SEO.`,
    { follow: ["now", "experience"] }
  ),
  topic(
    /architect|system design|scal(e|able|ability|ing)\b|microservices?|event.?driven|design patterns?|distributed|monolith|background jobs?/,
    `He owns backend architecture, data flow and API performance at ${current.company}, where the marketplaces run event-driven order and payment workflows with background jobs and notifications. He designs for scale and maintainability from the schema up.`,
    { follow: ["now", "skills"] }
  ),
  topic(
    /\btesting\b|\b(write|writes|writing|wrote) tests?|unit tests?|\bjest\b|cypress|playwright|\btdd\b|\bqa\b|test coverage/,
    `Quality has been part of his work from the start, when he assisted with testing at Trukkr.pk; today he enforces best coding practices and reviews across the stack. For his exact testing setup, ask him directly.`,
    { follow: ["experience", "contact"] }
  ),
  topic(
    /clean code|code quality|best practices?|code reviews?|maintainab|readab|solid principles/,
    `Clean, modular, maintainable code runs through every role on his résumé, and at ${current.company} he enforces best coding practices across the stack.`,
    { follow: ["experience", "now"] }
  ),
  topic(
    /front.?end|\bui\b|user interface/,
    `On the front-end he works in React and Next.js with Tailwind, Material UI or Emotion. He led front-end development on the Advanced Educational Platform.`,
    { follow: ["projects", "skills"] }
  ),
  topic(
    /back.?end|\bservers?\b/,
    `On the back-end he works in Node.js with Express or Nest.js on MySQL or MongoDB, and owns backend architecture for the marketplaces at ${current.company}.`,
    { follow: ["now", "skills"] }
  ),
  topic(
    /full.?stack|end.?to.?end/,
    `Full-stack is his comfort zone: he owns features from the database schema and APIs through to the UI, which is how he builds the marketplaces at ${current.company}.`,
    { follow: ["now", "projects"] }
  ),

  // Domains
  topic(
    /fintech|finance|financial|banking|\bmoney\b/,
    `Fintech runs through his work: escrow, settlements and trade credit in the marketplaces, a digital wallet on the IoT Data Platform, Stripe on the Immigration Portal and fintech features in the Transporter Portal.`,
    { follow: ["now", "projects"] }
  ),
  topic(
    /medical|patients?|hospital|clinic|health/,
    `In healthcare he built a patient assessment app in React Native with OpenAI-powered responses, designed to be responsive and accessible on any device.`,
    { follow: ["projects"] }
  ),
  topic(
    /edtech|e.?learning|students?|researchers?|citations?|quiz/,
    `In education he led the front-end of a platform for students and researchers (real-time chat, citations, authentication) and built a skills assessment platform with Next.js and Nest.js.`,
    { follow: ["projects"] }
  ),
  topic(
    /\bev\b|electric vehicles?|fleet|logistics|transport/,
    `For an Australian EV fleet product, the Transporter Portal, he built fintech features in React Native and maintained the web portal for transaction visibility.`,
    { follow: ["projects"] }
  ),
  topic(
    /devices?|sensors?|internet of things/,
    `On the IoT Data Platform he collected data from devices for real-time insights and analytics, with a Node.js backend, a server-rendered Next.js front-end and an integrated digital wallet.`,
    { follow: ["projects"] }
  ),

  // Career, strengths and working style
  say(
    /how many (projects|products|apps|websites|clients)|number of projects|projects (has he|did he) (done|built|shipped|delivered)|in production|live (projects|apps)|production(.?ready| (apps|projects|systems|code))/,
    `He's shipped ${profile.shipped} live, production-ready projects over ${profile.years} years. The portfolio shows ${projects.length} highlights, from his two current marketplaces to fintech, healthcare, education, IoT and real estate products.`,
    { kind: "projects", follow: ["now", "experience", "contact"] }
  ),
  say(
    /how many years|years of (experience|exp)|how long (has he|have you|he has)|since when|career (path|timeline|journey|history)|\bjourney\b|started (coding|programming|his career)/,
    `He started as a trainee at Jeddah Tech in June 2021 and interned at Trukkr.pk. He then spent over two years at Geeks of Kolachi and moved to The Finit Systems (New York). Since June 2025 he's been building marketplaces at ${current.company}. That's ${profile.years} years in all.`,
    { kind: "jobs", follow: ["now", "projects", "resume"] }
  ),
  say(
    /senior|junior|mid.?level|seniority|what level|how experienced/,
    `With ${profile.years} years, he works at the level of owning core modules end to end: payments and escrow, the Buy Box algorithm, settlements and contract pricing. He has led full-stack development at The Finit Systems and front-end development on the Advanced Educational Platform.`,
    { follow: ["now", "experience", "resume"] }
  ),
  say(
    /\blead(er|ership|s|ing)?\b|mentor|manag(e|er|ing) (a )?team|team lead|tech lead|ownership/,
    `He has led full-stack development at The Finit Systems and the front-end on the Advanced Educational Platform, and today owns core marketplace modules end to end. He's comfortable running client demos and setting code-quality standards.`,
    { follow: ["experience", "now"] }
  ),
  say(
    /communicat|team ?work|team player|collaborat|soft skills?|\bclients?\b|stakeholders?|work with (others|people|teams)/,
    `He's worked in cross-functional teams across four countries and ran client demos at Geeks of Kolachi. He's at ease working with product, design and QA, and with explaining technical trade-offs to non-engineers.`,
    { follow: ["experience", "about"] }
  ),
  say(
    /agile|scrum|sprints?|\bjira\b|kanban|stand.?ups?|retros?|methodolog/,
    `Agile and Scrum are his default way of working: sprints, stand-ups and reviews with product, design and QA, on every team from Geeks of Kolachi to ${current.company}.`,
    { follow: ["experience"] }
  ),
  say(
    /agnostic|learn(s|ing)? (new|fast|quick)|pick(s)? up|new (language|tech|stack|framework)|adapt|other languages?|any language|(which|what) languages?|programming languages?/,
    `He's language-agnostic: data modelling, API design and clean architecture carry across languages, so he picks the tool that fits the problem. Day to day that's TypeScript, JavaScript and SQL. He has moved between React and React Native, Express and Nest.js, and MySQL and MongoDB as projects needed.`,
    { kind: "chips", data: ["TypeScript", "JavaScript", "SQL", "Language-agnostic"], follow: ["skills", "projects"] }
  ),
  say(
    /goals?\b|future|ambition|long.?term|five years|next (step|role|move)|looking for in|career plans?|aspir|dream (job|role)|what does he want/,
    `His path points one way: building platforms with hard backend problems, like marketplaces, payments and pricing at scale, in a team that cares about product quality. Growing into technical leadership is the natural next step.`,
    { follow: ["now", "contact"] }
  ),
  say(
    /weakness|weak (points?|spots?)|bad at|struggle|improve (on|at)|areas? (of|for) improvement/,
    `That's a great interview question, and one Shahzad would rather answer himself. What the résumé shows is steady growth: from trainee in 2021 to owning payments, escrow and pricing modules in 2025.`,
    { follow: ["experience", "contact"] }
  ),
  say(
    /why (should|would) (we|i|anyone|someone|you) hire|trust(worthy)? (him|shahzad)|can i trust|reliable|dependable|what makes him|stand out|\bunique\b|strengths?|strong (points?|suit)|best at|good at|sell me|\bpitch\b|convince me|is he (good|any good)/,
    `Three reasons. He's language-agnostic, so he picks the right tool instead of forcing a favourite. He owns hard modules end to end: escrow, the Buy Box algorithm, settlements and contract pricing. And he's shipped ${profile.shipped} live, production-ready projects across e-commerce, fintech, healthcare, education, IoT and real estate with teams in four countries.`,
    { kind: "chips", data: [`${profile.years} years`, "Language-agnostic", "B2C + B2B marketplaces", "Payments & escrow", `${profile.shipped} live projects`], follow: ["now", "projects", "contact"] }
  ),
  say(
    /\bdesign(er|s|ing)?\b|figma|illustrator|\bux\b|look and feel/,
    `He's a certified Adobe Illustrator designer, and it shows in his eye for clean, responsive interfaces. On every product he cares about user experience as much as the code behind it.`,
    { follow: ["projects", "education"] }
  ),
  say(
    /hobb|free time|outside (of )?work|for fun|weekends?|interests?\b|fun fact/,
    `His résumé is all work, but here's a fun fact: he's a certified Adobe Illustrator designer as well as an engineer. For the rest, ask him, he's friendly.`,
    { follow: ["about", "contact"] }
  ),

  // Small talk
  say(
    /\b(thanks|thank you|thx|cheers|appreciate)\b/,
    `You're welcome! If Shahzad sounds like a fit, he'd love to hear from you.`,
    { follow: ["contact", "resume", "projects"] }
  ),
  say(
    /\b(bye|goodbye|see you|that'?s all|good night)\b/,
    `Thanks for stopping by! Before you go, his résumé is one tap away, and he reads every message.`,
    { follow: ["resume", "contact"] }
  ),
  say(
    /how are you|how'?s it going|what'?s up|\bsup\b/,
    `Doing great, thanks for asking! I'm best at one thing: talking about Shahzad. Want the 30-second version?`,
    { follow: ["about", "now", "projects"] }
  ),
  say(
    /joke|funny|make me laugh/,
    `Why did the developer go broke? He used up all his cache. 😄 Shahzad's jokes are better in person, and his code is cleaner than mine.`,
    { follow: ["about", "projects"] }
  ),
  say(
    /\b(nice|great|cool|awesome|love|beautiful|amazing|impressive|well done)\b/,
    `Thank you! Shahzad will be glad to hear it. He cares about polished, fast interfaces, and this chat is a small example.`,
    { follow: ["projects", "contact"] }
  ),
];

// Popular tools that aren't on his résumé: answer honestly, then point to the closest experience.
export const OTHER_TECH = [
  [/\bpython\b|django|flask|fastapi/, "Python", "His backends are Node.js today, and the same API design, data modelling and testing habits transfer to Python quickly."],
  [/\bjava\b(?!script)|spring( boot)?|kotlin/, "Java or Kotlin", "His closest experience is Nest.js, which shares Spring's structured, typed, dependency-injected style."],
  [/\bgolang\b|\bgo (lang|language)\b/, "Go", "He writes typed, service-oriented backends in Node.js and TypeScript, and the concepts carry straight over."],
  [/c#|\.net\b|dotnet/, ".NET or C#", "Nest.js and TypeScript give him a very similar typed, modular backend style."],
  [/\bphp\b|laravel|wordpress/, "PHP", "He covers the same ground with Express and Nest.js: routing, ORMs, auth and REST APIs."],
  [/\bruby\b|rails/, "Ruby on Rails", "He covers the same ground with Express and Nest.js, on the same relational databases."],
  [/\brust\b|c\+\+|\bcpp\b/, "Rust or C++", "His systems work is in Node.js and TypeScript, but he's quick to learn a new language when a project calls for it."],
  [/\bvue\b|angular|svelte/, "Vue, Angular or Svelte", "React and Next.js are his front-end core, and component thinking, state management and SSR carry straight over."],
  [/flutter|\bdart\b|swift/, "Flutter or native iOS", "He builds mobile apps in React Native, so the mobile patterns (navigation, state, offline, app stores) are familiar."],
  [/graphql|apollo/, "GraphQL", "He designs REST APIs and webhooks today; GraphQL is the same contract-first thinking with a different shape."],
  [/docker|kubernetes|\bk8s\b|terraform|devops|ci ?\/? ?cd|github actions|jenkins/, "That DevOps tooling", "He deploys on AWS, Firebase and Netlify, and runs background jobs and webhooks in production."],
  [/postgres|sqlite|oracle|sql server|mariadb/, "That database", "MySQL is his main relational database, and SQL, schema design and indexing transfer directly."],
  [/redis|kafka|rabbitmq|elasticsearch|\bbullmq\b|message queues?/, "That tool", "His marketplaces already run event-driven workflows with background jobs, so the patterns are familiar."],
  [/azure|\bgcp\b|google cloud|vercel|heroku|digital ?ocean/, "That platform", "He deploys on AWS, Firebase and Netlify, and cloud concepts carry across providers."],
  [/solidity|web3|blockchain|crypto|smart contracts?/, "Web3", "His closest work is in payments: escrow, ledgers and digital wallets, where correctness matters just as much."],
  [/shopify|magento|woocommerce|salesforce/, "That platform", "He builds custom marketplaces end to end rather than on top of off-the-shelf platforms, which means he understands the commerce logic underneath."],
];

// Shown when a question is outside everything above, so the answer still leads back to him.
export const HIGHLIGHTS = [
  `he built a Buy Box algorithm and an escrow payment flow for a multi-vendor marketplace.`,
  `he's language-agnostic, with ${profile.years} years of shipping full-stack web and mobile products.`,
  `he's shipped ${profile.shipped} live, production-ready projects across e-commerce, fintech, healthcare, education, IoT and real estate.`,
  `he's worked with teams in Pakistan, Poland, the US and Australia.`,
  `right now he's building both a B2C and a B2B marketplace at ${current.company}.`,
];
