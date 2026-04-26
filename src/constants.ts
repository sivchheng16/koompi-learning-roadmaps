export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  thumbnail: string;
  category: "Residential" | "Commercial" | "Retail" | "Bespoke";
  tags: string[];
  year: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  iframeUrl: string;
  appImageUrl: string;
  thumbnail: string;
  category: string;
  cover: string;
}

export const PROJECTS: Project[] = [
  {
    id: "elysian-residence",
    title: "Elysian Residence",
    description:
      "A calm city home built around raw concrete walls and large windows that flood every room with natural light.",
    details:
      "Located in central Phnom Penh, this three-bedroom residence uses exposed concrete and warm timber accents to create a quiet retreat from the city. The client wanted a home that felt open but private, and every room was planned to balance those two needs.",
    thumbnail: "/elysian.png",
    category: "Residential",
    tags: ["Minimalism", "Concrete", "Urban"],
    year: "2024",
  },
  {
    id: "obsidian-lounge",
    title: "Obsidian Lounge",
    description:
      "A commercial lounge designed around dark materials and focused lighting to create an intimate, dramatic atmosphere.",
    details:
      "The client wanted a space that felt different from typical bars and lounges — quieter, more refined. We used deep charcoal stone, dark velvet seating, and a ceiling of directional pendant lights to create distinct pockets of warmth throughout the room.",
    thumbnail: "/obsidian.png",
    category: "Commercial",
    tags: ["Atmospheric", "Luxury", "Retail"],
    year: "2023",
  },
  {
    id: "ivory-atelier",
    title: "Ivory Atelier",
    description:
      "A bright, multi-level studio space designed for a fashion label that needed room to create, meet, and display.",
    details:
      "The brief called for a flexible workspace that could shift between showroom, workshop, and meeting space without feeling cluttered. We used a mezzanine layout, clean white plaster walls, and modular rails to keep the space adaptable and easy to rearrange.",
    thumbnail: "/ivory.png",
    category: "Commercial",
    tags: ["Bright", "Modular", "Studio"],
    year: "2023",
  },
  {
    id: "verdant-villa",
    title: "Verdant Villa",
    description:
      "A tropical villa that opens fully to the surrounding garden, using local stone and bamboo throughout.",
    details:
      "Built on a hillside outside of Siem Reap, this home was designed to stay cool naturally and feel connected to the outdoors. Local volcanic stone forms the base structure, while bamboo screens filter the light and provide privacy without closing the space off.",
    thumbnail: "/verdant.png",
    category: "Residential",
    tags: ["Tropical", "Sustainable", "Architecture"],
    year: "2024",
  },
];

export const GAMES: Game[] = [
  {
    id: "TypingCode",
    title: "Typing Code",
    description:
      "The classic typing code game. Type the code correctly to keep the game going!",
    iframeUrl: "https://typing-code-game.vercel.app",
    appImageUrl:
      "https://drive.google.com/file/d/1l1rA29APscP38-PhAwd84miuwOQCI2-K/view?usp=sharing",
    cover: "/game-cover/inside-game/inside-typing-code.png",
    thumbnail: "/game-cover/typing-code.png",
    category: "typing",
  },
  {
    id: "TypingMath",
    title: "Typing Math",
    description:
      "The classic typing math game. Thinking fast and typing the number correctly to keep the game going!",
    iframeUrl: "https://typing-math-game.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1crkVv9NvpqEmCwA10r-k2Bwr6ouEcj_-/view?usp=sharing",
    cover: "/game-cover/inside-game/inside-typing-math.png",
    thumbnail: "/game-cover/typing-math.png",
    category: "typing",
  },
  {
    id: "dragon-drop",
    title: "Dragon Drop",
    description:
      "A fun and addictive game where you control a dragon to catch falling objects. Test your reflexes and see how long you can survive!",
    iframeUrl: "https://dragon-drop-iota.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1DHNe44e70h0XjSHZemLClLWw0A2l88uh/view?usp=sharing",
    cover: "/game-cover/inside-game/inside-dragon-drop.png",
    thumbnail: "/game-cover/dragon-drop.png",
    category: "mouse",
  },
  {
    id: "RobotBrainiac",
    title: "Robot Brainiac",
    description:
      "An action-packed puzzle game where you guide a brilliant robot through challenging brain-teasing challenges. Solve puzzles, navigate obstacles, and push your strategy skills to the limit!",
    iframeUrl: "https://robot-brainiac.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1fnc-RCf242B9dC5a516VlFERCZ_HVJzi/view?usp=sharing",
    cover: "/game-cover/inside-game/inside-robot-brainiac.png",
    thumbnail: "/game-cover/robot-brainiac.png",
    category: "Action",
  },
  {
    id: "MasterMouse",
    title: "Master Mouse",
    description:
      "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    iframeUrl: "https://master-mouse-v1-1-0.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1lwv8tyf_UsuwLATV6OxoJW1Tewy9GLEg/view?usp=drive_link",
    cover: "/game-cover/inside-game/inside-master-mouse.png",
    thumbnail: "/game-cover/master-mouse.png",
    category: "mouse",
  },
  {
    id: "LinkNumber",
    title: "Link Number",
    description: "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    iframeUrl: "https://link-number.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/162FfIfjRK249uDLKwHkaBS-JfbwFXwZI/view?usp=sharing",
    thumbnail: "/game-cover/link-number.png",
    cover: "/game-cover/inside-game/inside-link-number.png",
    category: "puzzle",
  },
];

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  iconName: string;
  logo: string;
  gradient: string;
  textgradient: string;
  level: string;
  lessons: Lesson[];
}

export const TOPICS: Topic[] = [
  // ── 00 Foundation ──────────────────────────────────────────────────────────
  {
    id: "computer-foundation",
    title: "Foundation",
    description: "Start here. Set up your environment, understand how computers and the web work, and master the command line — the tools every developer uses every day.",
    iconName: "Monitor",
    logo: "/program-logo/linux.png",
    gradient: "from-slate-500/20 to-slate-200/5",
    textgradient: "bg-gradient-to-br from-slate-400 to-slate-700 bg-clip-text text-transparent inline-block",
    level: "Beginner",
    lessons: [
      { id: "computer-foundation-readme", title: "Introduction", description: "Track overview, learning path, and what you will build.", duration: "10 mins" },
      { id: "computer-foundation-module01whatissoftware", title: "What is Software?", description: "How programs work, what developers actually do, and the mental model you need before writing a single line.", duration: "30 mins" },
      { id: "computer-foundation-module02devsetup", title: "Dev Environment Setup", description: "Install VS Code, Node.js, Git, and the extensions that make you 10× faster.", duration: "45 mins" },
      { id: "computer-foundation-module03howebworks", title: "How the Web Works", description: "HTTP, DNS, browsers, clients, servers — what happens between typing a URL and seeing a page.", duration: "40 mins" },
      { id: "computer-foundation-module04linuxterminal", title: "The Terminal", description: "Navigate your file system, run commands, and feel at home in the command line.", duration: "45 mins" },
      { id: "computer-foundation-module05filemanagement", title: "File Management", description: "Organise projects, manage paths, and work with files the way professionals do.", duration: "35 mins" },
    ],
  },

  // ── 01 Git & GitHub ────────────────────────────────────────────────────────
  {
    id: "git",
    title: "Git & GitHub",
    description: "Version control from day one. Learn to track changes, collaborate via pull requests, and never lose work again.",
    iconName: "GitBranch",
    logo: "/program-logo/git.png",
    gradient: "from-orange-400/20 to-orange-100/5",
    textgradient: "bg-gradient-to-br from-orange-400 to-red-500 bg-clip-text text-transparent inline-block",
    level: "Beginner",
    lessons: [
      { id: "git-readme", title: "Introduction", description: "Why version control matters and what Git gives you.", duration: "10 mins" },
      { id: "git-module01introductiongit", title: "Introduction to Git", description: "What version control is, how Git thinks about history, and your first repository.", duration: "30 mins" },
      { id: "git-module02basiccommands", title: "Daily Git Workflow", description: "init, add, commit, status, log — the commands you will type every single day.", duration: "45 mins" },
      { id: "git-module03githubremotes", title: "GitHub & Remotes", description: "Push, pull, clone — synchronise your work with the cloud and share it with the world.", duration: "50 mins" },
      { id: "git-module04collaboration", title: "Branches & Pull Requests", description: "Branch, merge, open PRs, and resolve conflicts like a team player.", duration: "1 hr" },
      { id: "git-module05advancedgit", title: "Advanced Git", description: "Rebase, stash, cherry-pick, bisect, and the commands that save you when things go wrong.", duration: "1 hr" },
      { id: "git-module06gitworkflows", title: "Git Workflows", description: "Trunk-based development, Git Flow, conventional commits, and PR best practices used in real teams.", duration: "45 mins" },
    ],
  },

  // ── 02 HTML ────────────────────────────────────────────────────────────────
  {
    id: "html",
    title: "HTML",
    description: "Every website starts here. Learn to structure content semantically, build forms, embed media, and write HTML that search engines and screen readers love.",
    iconName: "LayoutTemplate",
    logo: "/program-logo/html.png",
    gradient: "from-orange-500/20 to-orange-200/5",
    textgradient: "bg-gradient-to-br from-orange-500 to-red-500 bg-clip-text text-transparent inline-block",
    level: "Beginner",
    lessons: [
      { id: "html-readme", title: "Introduction", description: "Course overview, learning objectives, and resources.", duration: "10 mins" },
      { id: "html-module01gettingstarted", title: "Getting Started", description: "Write your first HTML document and understand how tags, elements, and attributes work.", duration: "30 mins" },
      { id: "html-module02documentstructure", title: "Document Structure", description: "DOCTYPE, head, body, and the semantic elements that give your page meaning.", duration: "40 mins" },
      { id: "html-module03textandlists", title: "Text & Lists", description: "Headings, paragraphs, emphasis, ordered and unordered lists.", duration: "35 mins" },
      { id: "html-module04linksnavigation", title: "Links & Navigation", description: "Hyperlinks, anchor navigation, relative vs absolute paths, and multi-page sites.", duration: "40 mins" },
      { id: "html-module05imagesmedia", title: "Images & Media", description: "Embed images, video, audio, and write alt text that actually helps users.", duration: "45 mins" },
      { id: "html-module06tablesforms", title: "Tables & Forms", description: "Build data tables and fully accessible input forms with labels and validation attributes.", duration: "1 hr" },
      { id: "html-module08accessibilityseo", title: "Accessibility & SEO", description: "ARIA roles, semantic HTML, meta tags, Open Graph — write code that works for everyone and ranks.", duration: "50 mins" },
      { id: "html-module07projectbiopage", title: "Project — Bio Page", description: "Build a complete, semantic, accessible personal bio page from scratch.", duration: "1.5 hrs" },
    ],
  },

  // ── 03 CSS ─────────────────────────────────────────────────────────────────
  {
    id: "css",
    title: "CSS",
    description: "Make things look great. Master the cascade, Flexbox, Grid, responsive design, animations, and the modern CSS features used in production today.",
    iconName: "Paintbrush",
    logo: "/program-logo/css.png",
    gradient: "from-blue-500/20 to-blue-200/5",
    textgradient: "bg-gradient-to-br from-blue-400 to-blue-700 bg-clip-text text-transparent inline-block",
    level: "Beginner",
    lessons: [
      { id: "css-readme", title: "Introduction", description: "Course overview, objectives, and supplemental resources.", duration: "10 mins" },
      { id: "css-module01introductioncss", title: "Introduction to CSS", description: "Selectors, properties, values, specificity basics, and how to link stylesheets.", duration: "35 mins" },
      { id: "css-module02selectorsspecificity", title: "Selectors & Specificity", description: "Class, ID, attribute, pseudo-class selectors and the full cascade rules.", duration: "45 mins" },
      { id: "css-module03colorstypography", title: "Colors & Typography", description: "Color systems, custom properties for themes, Google Fonts, and type scales.", duration: "40 mins" },
      { id: "css-module04boxmodel", title: "The Box Model", description: "Margin, padding, border, box-sizing — how every element takes up space.", duration: "40 mins" },
      { id: "css-module05layoutpositioning", title: "Layout & Positioning", description: "Static, relative, absolute, fixed, and sticky positioning with real use cases.", duration: "50 mins" },
      { id: "css-module06flexboxresponsive", title: "Flexbox & Responsive", description: "Flex containers, wrapping, alignment, media queries, and mobile-first design.", duration: "1 hr" },
      { id: "css-module08cssgrid", title: "CSS Grid", description: "Two-dimensional layouts with grid-template, grid-area, auto-fit, and minmax.", duration: "1 hr" },
      { id: "css-module09variables", title: "CSS Variables & Animations", description: "Custom properties for theming, transitions, keyframe animations, and the transform system.", duration: "50 mins" },
      { id: "css-module07projectportfolio", title: "Project — Portfolio", description: "Build a fully responsive, animated portfolio page using Grid, Flexbox, and custom properties.", duration: "2 hrs" },
    ],
  },

  // ── 04 JavaScript ──────────────────────────────────────────────────────────
  {
    id: "javascript",
    title: "JavaScript",
    description: "The language of the web. Learn to program from scratch — variables, functions, arrays, objects, DOM manipulation — and make anything interactive.",
    iconName: "Code2",
    logo: "/program-logo/javascript.png",
    gradient: "from-yellow-400/20 to-yellow-100/5",
    textgradient: "bg-gradient-to-br from-yellow-300 to-amber-300 bg-clip-text text-transparent inline-block",
    level: "Intermediate",
    lessons: [
      { id: "javascript-readme", title: "Introduction", description: "Course overview, objectives, and supplemental resources.", duration: "10 mins" },
      { id: "javascript-module01introduction", title: "Introduction to JS", description: "What JavaScript is, how browsers execute it, and your first interactive script.", duration: "30 mins" },
      { id: "javascript-module02variablesdatatypes", title: "Variables & Data Types", description: "let, const, strings, numbers, booleans, null, undefined, arrays, and objects.", duration: "50 mins" },
      { id: "javascript-module03operatorsconditions", title: "Operators & Conditions", description: "Arithmetic, comparison, logical operators, if/else, ternary, and switch.", duration: "45 mins" },
      { id: "javascript-module04functions", title: "Functions", description: "Declarations, expressions, arrow functions, default params, closures, and scope.", duration: "1 hr" },
      { id: "javascript-module05arraysloops", title: "Arrays & Loops", description: "for, while, forEach, map, filter, reduce — work with collections of data.", duration: "1 hr" },
      { id: "javascript-module06dommanipulation", title: "DOM Manipulation", description: "Query elements, handle events, update the page dynamically without a framework.", duration: "1.5 hrs" },
      { id: "javascript-module08modulesnpm", title: "Modules & npm", description: "import/export, CommonJS vs ESM, npm packages, package.json, and the node_modules mental model.", duration: "50 mins" },
      { id: "javascript-module07projectquiz", title: "Project — Quiz App", description: "Build a fully interactive, scored quiz app using vanilla JS — no frameworks.", duration: "2 hrs" },
    ],
  },

  // ── 05 JS Advanced ─────────────────────────────────────────────────────────
  {
    id: "javascript-advanced",
    title: "JS Advanced",
    description: "Level up. Master async programming, the full ES6+ syntax, OOP, error handling, and write JavaScript the way senior engineers do.",
    iconName: "Zap",
    logo: "/program-logo/javascript.png",
    gradient: "from-amber-400/20 to-amber-100/5",
    textgradient: "bg-gradient-to-br from-yellow-400 to-amber-500 bg-clip-text text-transparent inline-block",
    level: "Intermediate",
    lessons: [
      { id: "javascript-advanced-readme", title: "Introduction", description: "Course overview, objectives, and supplemental resources.", duration: "10 mins" },
      { id: "javascript-advanced-module01es6features", title: "ES6+ Features", description: "Destructuring, spread, rest, template literals, optional chaining, nullish coalescing.", duration: "1 hr" },
      { id: "javascript-advanced-module02asyncjavascript", title: "Async JavaScript", description: "The event loop, callbacks, Promises, async/await, and parallel execution with Promise.all.", duration: "1.5 hrs" },
      { id: "javascript-advanced-module03workingapis", title: "Working with APIs", description: "Fetch API, REST principles, JSON, headers, error handling, and real-world data patterns.", duration: "1 hr" },
      { id: "javascript-advanced-module04errorhandling", title: "Error Handling", description: "try/catch/finally, custom error classes, error boundaries, and defensive programming.", duration: "45 mins" },
      { id: "javascript-advanced-module06classesoop", title: "Classes & OOP", description: "ES6 classes, constructors, inheritance, encapsulation, and when to use object-oriented design.", duration: "1 hr" },
      { id: "javascript-advanced-module07testingbasics", title: "Testing Basics", description: "Why tests matter, writing your first unit tests with Vitest, and the red-green-refactor cycle.", duration: "1 hr" },
      { id: "javascript-advanced-module05projectweather", title: "Project — Weather App", description: "Build a live weather app using a public API, async/await, and clean error handling.", duration: "2 hrs" },
    ],
  },

  // ── 06 TypeScript ──────────────────────────────────────────────────────────
  {
    id: "typescript",
    title: "TypeScript",
    description: "JavaScript with superpowers. Add types, catch bugs before runtime, write self-documenting code, and work confidently in large codebases.",
    iconName: "ShieldCheck",
    logo: "/program-logo/javascript.png",
    gradient: "from-blue-600/20 to-blue-300/5",
    textgradient: "bg-gradient-to-br from-blue-500 to-blue-800 bg-clip-text text-transparent inline-block",
    level: "Intermediate",
    lessons: [
      { id: "typescript-readme", title: "Introduction", description: "Why TypeScript exists and what it changes about how you write JavaScript.", duration: "10 mins" },
      { id: "typescript-module01introduction", title: "TypeScript Basics", description: "Type annotations, inference, primitive types, arrays, tuples, and the any escape hatch.", duration: "50 mins" },
      { id: "typescript-module02typesinterfaces", title: "Types & Interfaces", description: "type aliases, interfaces, optional properties, readonly, union and intersection types.", duration: "1 hr" },
      { id: "typescript-module03functionclasses", title: "Functions & Classes", description: "Typed functions, overloads, typed classes, access modifiers, and abstract classes.", duration: "1 hr" },
      { id: "typescript-module04genericsadvanced", title: "Generics & Advanced Types", description: "Generic functions and classes, constraints, utility types (Partial, Pick, Omit, Record), and mapped types.", duration: "1.5 hrs" },
      { id: "typescript-module05project", title: "Project — Typed API Client", description: "Build a fully typed REST API client with error handling, generics, and zero any.", duration: "2 hrs" },
    ],
  },

  // ── 07 React ───────────────────────────────────────────────────────────────
  {
    id: "react",
    title: "React",
    description: "The industry-standard UI library. Build component trees, manage state, fetch data, handle routing, and test your interfaces with confidence.",
    iconName: "AppWindow",
    logo: "/program-logo/react.png",
    gradient: "from-cyan-500/20 to-cyan-200/5",
    textgradient: "bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent inline-block",
    level: "Advanced",
    lessons: [
      { id: "react-readme", title: "Introduction", description: "Course overview, objectives, and supplemental resources.", duration: "10 mins" },
      { id: "react-module01introduction", title: "Introduction to React", description: "What React is, why components, JSX syntax, and how the virtual DOM works.", duration: "40 mins" },
      { id: "react-module02componentsprops", title: "Components & Props", description: "Functional components, prop types, children, composition, and lifting state.", duration: "50 mins" },
      { id: "react-module03stateevents", title: "State & Events", description: "useState, event handling, controlled inputs, and derived state.", duration: "1 hr" },
      { id: "react-module04hooks", title: "React Hooks", description: "useEffect, useRef, useContext, useReducer, and writing your own custom hooks.", duration: "1.5 hrs" },
      { id: "react-module05reactrouter", title: "React Router", description: "Client-side routing, nested routes, dynamic params, loaders, and protected routes.", duration: "1 hr" },
      { id: "react-module07statemanagement", title: "State Management", description: "Context API patterns, useReducer for complex state, and a practical introduction to Zustand.", duration: "1 hr" },
      { id: "react-module08testingreact", title: "Testing React", description: "React Testing Library, querying by role, firing events, and mocking API calls.", duration: "1 hr" },
      { id: "react-module06projecttaskmanager", title: "Project — Task Manager", description: "Build a full CRUD task manager with filtering, persistence, and tests.", duration: "2.5 hrs" },
    ],
  },

  // ── 08 Next.js ─────────────────────────────────────────────────────────────
  {
    id: "nextjs",
    title: "Next.js",
    description: "The React framework for production. App Router, Server Components, data fetching, route handlers, auth, Tailwind CSS, and deployment to Vercel.",
    iconName: "Server",
    logo: "/program-logo/nextjs.png",
    gradient: "from-slate-400/20 to-slate-200/5",
    textgradient: "bg-gradient-to-br from-gray-900 to-gray-300 bg-clip-text text-transparent inline-block",
    level: "Advanced",
    lessons: [
      { id: "nextjs-readme", title: "Introduction", description: "What Next.js adds on top of React and when to reach for it.", duration: "10 mins" },
      { id: "nextjs-module01approuter", title: "App Router Fundamentals", description: "The app/ directory, layouts, pages, loading.tsx, error.tsx — the mental model shift from Pages Router.", duration: "1 hr" },
      { id: "nextjs-module02routing", title: "Routing & Layouts", description: "Nested layouts, route groups, parallel and intercepted routes, and link prefetching.", duration: "1 hr" },
      { id: "nextjs-module03servercomponents", title: "Server & Client Components", description: "When to use each, the 'use client' boundary, passing data from server to client, and avoiding common mistakes.", duration: "1.5 hrs" },
      { id: "nextjs-module04datafetching", title: "Data Fetching & Caching", description: "fetch with cache options, revalidation strategies, server actions, and streaming with Suspense.", duration: "1.5 hrs" },
      { id: "nextjs-module05routehandlers", title: "Route Handlers & APIs", description: "Replace express endpoints: GET/POST handlers, middleware, cookies, and consuming your API from client components.", duration: "1 hr" },
      { id: "nextjs-module06tailwindcss", title: "Tailwind CSS", description: "Utility-first CSS, configuration, dark mode, component patterns, and production optimisation.", duration: "1 hr" },
      { id: "nextjs-module07auth", title: "Authentication", description: "NextAuth.js v5, OAuth providers, session handling, protecting routes with middleware, and role-based access.", duration: "1.5 hrs" },
      { id: "nextjs-module08deployment", title: "Deployment & CI/CD", description: "Deploy to Vercel, environment variables, preview deployments, and GitHub Actions for automated checks.", duration: "1 hr" },
    ],
  },

  // ── 09 Backend Engineering ─────────────────────────────────────────────────
  {
    id: "backend",
    title: "Backend",
    description: "Build the server side. Design REST APIs, handle auth, connect databases, manage files, and understand what happens between the request and the response.",
    iconName: "Server",
    logo: "/program-logo/coding.png",
    gradient: "from-violet-500/20 to-violet-200/5",
    textgradient: "bg-gradient-to-br from-violet-400 to-purple-700 bg-clip-text text-transparent inline-block",
    level: "Advanced",
    lessons: [
      { id: "backend-readme", title: "Introduction", description: "What backend engineers actually build and the responsibilities they own.", duration: "10 mins" },
      { id: "backend-module01whatisbackend", title: "How Backends Work", description: "Request-response cycle, HTTP methods, status codes, headers, and the anatomy of an API.", duration: "40 mins" },
      { id: "backend-module02nodejsexpress", title: "Node.js & Express", description: "Build your first HTTP server, handle routes, parse JSON bodies, and serve responses.", duration: "1.5 hrs" },
      { id: "backend-module03restdesign", title: "REST API Design", description: "Resources, verbs, status codes, versioning, pagination, and the conventions professionals follow.", duration: "1 hr" },
      { id: "backend-module04authjwt", title: "Authentication & JWT", description: "Passwords, hashing, JWT access tokens, refresh tokens, and securing API endpoints.", duration: "1.5 hrs" },
      { id: "backend-module05middleware", title: "Middleware & Validation", description: "Express middleware pipeline, input validation with Zod, rate limiting, and CORS.", duration: "1 hr" },
      { id: "backend-module06projectapi", title: "Project — REST API", description: "Build a fully authenticated, validated REST API with users, posts, and token refresh.", duration: "3 hrs" },
    ],
  },

  // ── 10 Databases ───────────────────────────────────────────────────────────
  {
    id: "databases",
    title: "Databases",
    description: "Store things properly. Learn relational vs document databases, write SQL, design schemas, use Supabase in production, and think about data at scale.",
    iconName: "Database",
    logo: "/program-logo/coding.png",
    gradient: "from-emerald-500/20 to-emerald-200/5",
    textgradient: "bg-gradient-to-br from-emerald-400 to-green-700 bg-clip-text text-transparent inline-block",
    level: "Advanced",
    lessons: [
      { id: "databases-readme", title: "Introduction", description: "Relational vs document, when to use each, and the mental model for data modelling.", duration: "10 mins" },
      { id: "databases-module01fundamentals", title: "Database Fundamentals", description: "Tables, rows, columns, primary keys, foreign keys, and what ACID actually means.", duration: "45 mins" },
      { id: "databases-module02sqlfundamentals", title: "SQL Fundamentals", description: "SELECT, INSERT, UPDATE, DELETE, WHERE, JOIN, GROUP BY — write queries that actually work.", duration: "1.5 hrs" },
      { id: "databases-module03supabase", title: "Supabase & PostgreSQL", description: "Set up Supabase, use the JS client, understand Row Level Security, and query from your app.", duration: "1 hr" },
      { id: "databases-module04schemadesign", title: "Schema Design", description: "Normalisation, relationships, indexing, and designing schemas that grow without pain.", duration: "1 hr" },
      { id: "databases-module05projectschema", title: "Project — Design & Build", description: "Design the schema for a real app, write the migrations, seed data, and query it end-to-end.", duration: "2 hrs" },
    ],
  },

  // ── 11 Testing & Quality ───────────────────────────────────────────────────
  {
    id: "testing",
    title: "Testing",
    description: "Untested code is a liability. Learn unit, integration, and end-to-end testing so you can ship with confidence and never break things twice.",
    iconName: "FlaskConical",
    logo: "/program-logo/coding.png",
    gradient: "from-pink-500/20 to-pink-200/5",
    textgradient: "bg-gradient-to-br from-pink-400 to-rose-600 bg-clip-text text-transparent inline-block",
    level: "Advanced",
    lessons: [
      { id: "testing-readme", title: "Introduction", description: "Why tests are an investment, not overhead — and how they change the way you write code.", duration: "10 mins" },
      { id: "testing-module01philosophy", title: "Testing Philosophy", description: "The testing pyramid, what to test, what not to test, and the difference between coverage and confidence.", duration: "30 mins" },
      { id: "testing-module02unittest", title: "Unit Testing with Vitest", description: "Test pure functions, mock dependencies, write good assertions, and run tests in watch mode.", duration: "1.5 hrs" },
      { id: "testing-module03integration", title: "Integration Testing", description: "Test multiple units together, test API handlers, and use a real database in tests.", duration: "1.5 hrs" },
      { id: "testing-module04e2e", title: "End-to-End with Playwright", description: "Browser automation, page object model, testing user flows, and running E2E in CI.", duration: "1.5 hrs" },
    ],
  },

  // ── 12 Shipping & Ops ──────────────────────────────────────────────────────
  {
    id: "shipping",
    title: "Shipping & Ops",
    description: "Get it to users. Containerise with Docker, automate deployments with GitHub Actions, manage secrets, monitor production, and keep things running.",
    iconName: "Rocket",
    logo: "/program-logo/linux.png",
    gradient: "from-sky-500/20 to-sky-200/5",
    textgradient: "bg-gradient-to-br from-sky-400 to-cyan-600 bg-clip-text text-transparent inline-block",
    level: "Advanced",
    lessons: [
      { id: "shipping-readme", title: "Introduction", description: "The gap between 'works on my machine' and 'runs in production' — and how to close it.", duration: "10 mins" },
      { id: "shipping-module01docker", title: "Docker", description: "Images, containers, Dockerfile, docker-compose, and why containers solve the environment problem.", duration: "1.5 hrs" },
      { id: "shipping-module02cicd", title: "CI/CD with GitHub Actions", description: "Automate tests, builds, and deploys on every push — the pipeline every professional team runs.", duration: "1.5 hrs" },
      { id: "shipping-module03envvars", title: "Secrets & Environment", description: "Environment variables, .env files, secrets in CI, and never committing credentials again.", duration: "45 mins" },
      { id: "shipping-module04monitoring", title: "Monitoring & Logs", description: "Structured logging, error tracking with Sentry, uptime monitoring, and knowing before users do.", duration: "1 hr" },
    ],
  },

  // ── 13 The Craft ───────────────────────────────────────────────────────────
  {
    id: "craft",
    title: "The Craft",
    description: "What separates good engineers from great ones. Debugging systematically, reading code, writing PRs, working with AI, and thinking like a senior.",
    iconName: "Wrench",
    logo: "/program-logo/coding.png",
    gradient: "from-stone-500/20 to-stone-200/5",
    textgradient: "bg-gradient-to-br from-stone-400 to-stone-700 bg-clip-text text-transparent inline-block",
    level: "Advanced",
    lessons: [
      { id: "craft-readme", title: "Introduction", description: "The skills that don't show up in job listings but determine everything about your career.", duration: "10 mins" },
      { id: "craft-module01debugging", title: "Debugging Systematically", description: "Read error messages, use the debugger, isolate bugs, and never guess when you can measure.", duration: "1 hr" },
      { id: "craft-module02readingcode", title: "Reading Code", description: "How to navigate an unfamiliar codebase, trace execution, and understand code you didn't write.", duration: "45 mins" },
      { id: "craft-module03prsreviews", title: "PRs & Code Review", description: "Write PRs that get merged, give reviews that improve code, and make the process smooth for everyone.", duration: "45 mins" },
      { id: "craft-module04aiastool", title: "AI as a Tool", description: "Use AI to accelerate — not replace — your thinking. Prompting, verification, and where AI fails.", duration: "45 mins" },
    ],
  },
];

export const categories = [
  {
    name: "All Team",
    moments: [
      // { title: "Rithy THOUL", role: "Promoter && Connection", description: "CEO of KOOMPI", image: "../public/team/rithy-thul.png" },
      // { title: "Brilliant PHAL", role: "OS Lead", description: "OS Lead", image: "../public/team/brilliant.jpg" },
      // { title: "Vuthy SAN", role: "Developer", description: "Web Apps Dev Lead", image: "../public/team/vuthy.jpg" },
      // { title: "Raksme VEN", role: "Bussiness ", description: "Finance & Vendor Relation", image: "../public/team/raksme.jpg" },
      // { title: "Sukunthy CHAN", role: "Bussiness ", description: "Finance & Vendor Relation", image: "../public/team/sukunthy.png" },
      // { title: "Sela THOL", role: "Bussiness", description: "Media and Communicaiton Manager", image: "../public/team/sela.jpg" },
      // { title: "Theara THEN", role: "Developer & Bussiness", description: "Developer & Social Marketing & Sales", image: "../public/team/theara.jpg" },
      // { title: "Thith THIN", role: "Developer", description: "Fulll Stack Developer", image: "../public/team/thith.jpg" },
      // { title: "Hangsea HONG", role: "DevOps", description: "OS Developer", image: "../public/team/hangsea.jpg" },
      // { title: "Sokunsamnang SAM AN", role: "Developer", description: "Network Devs & Mobile Application ", image: "../public/team/samnang.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
    ]
  },
  {
    name: "Developers",
    moments: [
      { title: "Sivchheng Kheang", role: "Technical Lead", description: "Architecting the technical core and high-performance visions.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
      { title: "Long Sei", role: "DevOps Engineer", description: "Optimizing cloud orchestration and system deployment cycles.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
    ]
  },
  {
    name: "Designers",
    moments: [
      { title: "Dara Som", role: "UI/UX Engineer", description: "Refining visual optics and interactive design protocols.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
    ]
  },
  {
    name: "Apprentice",
    moments: [
      { title: "Sivchheng Kheang", role: "Apprentice", description: "Developer & Learning Full Stack Developer", image: "/team/sivchheng.jpg" },
      { title: "Keochheang THON", role: "Apprentice", description: "Designer", image: "/team/keochheang.jpg" },
      { title: "Narith CHOM", role: "Apprentice", description: "Developer", image: "/team/narith.jpg" },
      { title: "Sisuykong Sao ", role: "Apprentice", description: "Developer", image: "/team/sisuykong.jpg" },
    ]
  }
];