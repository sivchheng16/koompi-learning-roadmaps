# KOOMPI Academy — Curriculum Overview

Zero to employed. Every track builds on the previous one. Students pick their destination; the platform finds the path.

Cambodia-first examples throughout: prices in KHR, variable names in real Khmer contexts, deployment targets accessible without a US credit card.

---

## Track Catalog

### Foundation Tracks (prerequisite for everything)

#### TRACK-00: Computer Fundamentals
**ID:** `foundation-computing`
**Prerequisites:** none
**Lessons:** 6 | **Est. time:** 4 hours

- How computers work (CPU, RAM, storage — no jargon)
- Files, folders, and the file system
- The terminal: why it exists, how to navigate
- Installing software from the command line
- Text editors vs IDEs
- Capstone: set up a working development environment from scratch

#### TRACK-01: Linux & the Terminal
**ID:** `foundation-linux`
**Prerequisites:** `foundation-computing`
**Lessons:** 8 | **Est. time:** 6 hours

- Shell basics: `ls`, `cd`, `mkdir`, `cp`, `mv`, `rm`
- File permissions and ownership
- Pipes, redirection, and filters (`grep`, `awk`, `sed`)
- Environment variables and `.bashrc` / `.zshrc`
- Process management (`ps`, `kill`, `htop`)
- SSH: connecting to remote servers
- Package managers: `apt`, `pacman`, `brew`
- Capstone: write a shell script that automates a real daily task

#### TRACK-02: Git & Version Control
**ID:** `foundation-git`
**Prerequisites:** `foundation-linux`
**Lessons:** 7 | **Est. time:** 5 hours

- What version control solves and why Git won
- Init, add, commit, status, log
- Branching and merging
- Remote repositories and GitHub/Gitea
- Pull requests and code review workflow
- Resolving merge conflicts
- Capstone: contribute a real fix to an open-source repo (or KOOMPI's own repos)

---

### Web Track (most students start here)

#### TRACK-10: HTML
**ID:** `web-html`
**Prerequisites:** `foundation-computing` (terminal not required)
**Lessons:** 8 | **Est. time:** 5 hours

1. What is HTML and how browsers read it
2. Document structure: `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`
3. Text: headings, paragraphs, lists, emphasis
4. Links and navigation
5. Images and media
6. Forms and user input
7. Semantic HTML: `<main>`, `<nav>`, `<article>`, `<aside>`
8. Accessibility basics: alt text, labels, ARIA roles
- Capstone: build a personal profile page for a fictional Cambodian student

#### TRACK-11: CSS
**ID:** `web-css`
**Prerequisites:** `web-html`
**Lessons:** 10 | **Est. time:** 7 hours

1. How CSS works: selectors, specificity, cascade
2. The box model
3. Typography: fonts, sizes, line height
4. Color: hex, rgb, hsl, opacity
5. Flexbox layout
6. CSS Grid layout
7. Responsive design and media queries
8. CSS custom properties (variables)
9. Transitions and animations
10. CSS architecture: BEM, utility classes, component styles
- Capstone: build a responsive landing page for a fictional Phnom Penh business

#### TRACK-12: JavaScript Fundamentals
**ID:** `web-js-basics`
**Prerequisites:** `web-html`, `web-css`
**Lessons:** 10 | **Est. time:** 8 hours

1. What JavaScript does and how the browser runs it
2. Variables, types, and operators
3. Functions and scope
4. Arrays and objects
5. Control flow: if/else, loops
6. The DOM: selecting and modifying elements
7. Events: click, input, submit
8. Fetch API and async/await
9. Error handling
10. Browser storage: localStorage and sessionStorage
- Capstone: build an interactive budget tracker in KHR with localStorage persistence

#### TRACK-13: JavaScript Advanced
**ID:** `web-js-advanced`
**Prerequisites:** `web-js-basics`
**Lessons:** 8 | **Est. time:** 7 hours

1. Closures and lexical scope
2. Prototypes and the `this` keyword
3. ES modules: import/export
4. Promises and the event loop (deep)
5. Array methods: map, filter, reduce, flatMap
6. Destructuring, spread, rest
7. Error boundaries and robust async patterns
8. Performance: debounce, throttle, lazy loading
- Capstone: refactor the budget tracker to use modules and advanced data patterns

#### TRACK-14: React
**ID:** `web-react`
**Prerequisites:** `web-js-advanced`
**Lessons:** 10 | **Est. time:** 9 hours

1. Why React: the component model
2. JSX and the virtual DOM
3. Props and component composition
4. State with `useState`
5. Side effects with `useEffect`
6. Lists, keys, and conditional rendering
7. Forms in React: controlled components
8. Context API for shared state
9. Custom hooks
10. React Router: multi-page SPA
- Capstone: rebuild the budget tracker as a full React SPA with routing

#### TRACK-15: Next.js
**ID:** `web-nextjs`
**Prerequisites:** `web-react`
**Lessons:** 9 | **Est. time:** 8 hours

1. Next.js vs plain React: what you get
2. App Router and file-based routing
3. Server Components vs Client Components
4. Data fetching: `fetch`, `cache`, `revalidate`
5. API routes and server actions
6. Dynamic routes and params
7. Static generation vs server-side rendering
8. Authentication patterns
9. Deployment: Vercel, Docker, VPS
- Capstone: build a full-stack news aggregator with a public API and a Next.js frontend

---

### Backend Track

#### TRACK-20: Node.js & APIs
**ID:** `backend-node`
**Prerequisites:** `web-js-advanced`, `foundation-git`
**Lessons:** 9 | **Est. time:** 8 hours

1. Node.js runtime: event loop, modules, npm
2. Express: routing, middleware, error handling
3. REST API design: resources, verbs, status codes
4. JSON request/response patterns
5. Environment variables and configuration
6. File I/O and streams
7. Authentication: JWT and session cookies
8. Rate limiting and security headers
9. Testing APIs: Jest + supertest
- Capstone: build a REST API for a community event board (events, attendees, RSVP)

#### TRACK-21: Databases
**ID:** `backend-databases`
**Prerequisites:** `backend-node`
**Lessons:** 8 | **Est. time:** 7 hours

1. Relational vs document databases — when to use which
2. SQL basics: SELECT, INSERT, UPDATE, DELETE
3. Joins, aggregations, indexes
4. PostgreSQL in practice: setup, psql, schema design
5. MongoDB in practice: documents, collections, queries
6. ORM/ODM: Prisma (SQL) and Mongoose (Mongo)
7. Migrations and schema evolution
8. Database security: parameterized queries, least-privilege users
- Capstone: add persistent storage to the event board API with Postgres + Prisma

---

### DevOps & Infrastructure Track

#### TRACK-30: Docker & Containers
**ID:** `devops-docker`
**Prerequisites:** `foundation-linux`, `backend-node`
**Lessons:** 7 | **Est. time:** 6 hours

1. Why containers: the "works on my machine" problem
2. Images, containers, and the Docker lifecycle
3. Writing a `Dockerfile`
4. Docker Compose for multi-service apps
5. Volumes and networking
6. Container registries: Docker Hub, GHCR
7. Docker in CI/CD pipelines
- Capstone: containerize the event board API + Postgres with Docker Compose

#### TRACK-31: CI/CD & Deployment
**ID:** `devops-cicd`
**Prerequisites:** `devops-docker`, `foundation-git`
**Lessons:** 6 | **Est. time:** 5 hours

1. What CI/CD solves
2. GitHub Actions: workflows, triggers, jobs
3. Automated testing in CI
4. Building and pushing Docker images in CI
5. Deploying to a VPS (DigitalOcean / Vultr / local server)
6. Secrets management in CI
- Capstone: set up a full CI/CD pipeline for the event board — test → build → deploy on every push to main

---

### Python Track

#### TRACK-40: Python Fundamentals
**ID:** `python-basics`
**Prerequisites:** `foundation-computing`
**Lessons:** 9 | **Est. time:** 7 hours

1. Python vs other languages — where it shines
2. Variables, types, operators
3. Functions and scope
4. Lists, dicts, tuples, sets
5. Control flow and loops
6. File I/O
7. Modules and packages: pip, venv
8. Error handling: try/except
9. List comprehensions and generators
- Capstone: write a script that fetches exchange rates (KHR ↔ USD) and logs a daily summary

#### TRACK-41: Python for Web (FastAPI)
**ID:** `python-web`
**Prerequisites:** `python-basics`, `backend-databases`
**Lessons:** 7 | **Est. time:** 6 hours

1. FastAPI overview and async Python
2. Path parameters, query params, request body
3. Pydantic for validation
4. SQLAlchemy ORM with Postgres
5. Auth: OAuth2 + JWT in FastAPI
6. Background tasks and scheduled jobs
7. Deployment with Uvicorn + Docker
- Capstone: build a FastAPI backend for a simple e-commerce catalog (products, categories, search)

#### TRACK-42: Data & Automation
**ID:** `python-data`
**Prerequisites:** `python-basics`
**Lessons:** 7 | **Est. time:** 6 hours

1. pandas: DataFrames, reading CSV/Excel
2. Data cleaning: missing values, type coercion
3. Aggregation: groupby, pivot tables
4. matplotlib and seaborn: basic charts
5. Web scraping with requests + BeautifulSoup
6. Automating repetitive tasks: files, emails, spreadsheets
7. Intro to Jupyter notebooks
- Capstone: scrape publicly available job listings in Cambodia, clean the data, and produce a chart of top in-demand skills

---

### Mobile Track

#### TRACK-50: React Native
**ID:** `mobile-rn`
**Prerequisites:** `web-react`
**Lessons:** 8 | **Est. time:** 8 hours

1. React Native vs React: what changes
2. Core components: View, Text, Image, ScrollView
3. Styling: StyleSheet vs NativeWind
4. Navigation: React Navigation stack + tabs
5. State management in mobile apps
6. Camera, location, and device APIs
7. Forms and keyboard handling
8. Publishing: Expo EAS build + app store submission
- Capstone: build a Khmer vocabulary flashcard app with offline storage and daily reminders

---

### Computer Science Foundations

#### TRACK-60: Algorithms & Data Structures
**ID:** `cs-algorithms`
**Prerequisites:** `web-js-basics` or `python-basics`
**Lessons:** 10 | **Est. time:** 10 hours

1. Big-O notation: measuring what matters
2. Arrays and linked lists
3. Stacks and queues
4. Hash maps
5. Trees and binary search trees
6. Graphs: BFS and DFS
7. Sorting: bubble, merge, quick
8. Searching: binary search
9. Recursion and dynamic programming intro
10. Problem-solving patterns: sliding window, two pointers
- Capstone: solve 5 real interview problems (LeetCode-style) with explained solutions

#### TRACK-61: Systems & Networking
**ID:** `cs-systems`
**Prerequisites:** `foundation-linux`
**Lessons:** 8 | **Est. time:** 7 hours

1. How the internet works: packets, routers, DNS
2. HTTP/HTTPS in depth: headers, status codes, caching
3. TCP vs UDP
4. TLS and certificate basics
5. Processes, threads, and concurrency
6. Memory: stack vs heap, garbage collection
7. File systems and I/O
8. Security basics: OWASP top 10 for developers
- Capstone: trace a full HTTP request from browser to server and back, annotated at every layer

---

## Recommended Paths by Goal

| Goal | Path |
|------|------|
| Get a frontend job | TRACK-00 → 10 → 11 → 12 → 13 → 14 → 02 |
| Get a full-stack job | Above + TRACK-15 → 20 → 21 |
| Backend / API developer | TRACK-00 → 01 → 02 → 12 → 13 → 20 → 21 → 30 → 31 |
| DevOps / sysadmin | TRACK-00 → 01 → 02 → 20 → 30 → 31 → 61 |
| Python developer | TRACK-00 → 40 → 41 or 42 → 02 |
| Mobile developer | Full frontend path → TRACK-50 |
| Competitive programming | TRACK-00 → 12 or 40 → 60 |
| "I have no idea" | TRACK-00 → 10 → 11 → 12 (reassess after) |

---

## Track IDs (for AI roadmap generation)

```
foundation-computing  foundation-linux  foundation-git
web-html  web-css  web-js-basics  web-js-advanced  web-react  web-nextjs
backend-node  backend-databases
devops-docker  devops-cicd
python-basics  python-web  python-data
mobile-rn
cs-algorithms  cs-systems
```

---

## Authoring Notes

- Each track maps to a directory under `src/lessons/` — e.g., `web-html/` contains 8 lesson components
- Lesson IDs follow the pattern `{track-id}-{zero-padded-number}` — e.g., `web-html-01`, `web-html-02`
- Tracks not yet built are listed here for roadmap generation (AI can reference them as "coming soon")
- Cambodia-first examples: use KHR amounts, `.kh` domains, local context wherever possible
- All lesson content should be translatable to Khmer — avoid idioms that don't translate

---

## Tracks Not Yet Authored (planned)

- `blockchain-basics` — Web3, smart contracts, KID/ERC1155 internals
- `ai-engineering` — Prompt engineering, Claude API, LLM application patterns
- `linux-sysadmin` — Advanced Linux: systemd, networking config, security hardening
- `koompi-hardware` — KOOMPI laptop specifics, peripheral integration (requires hardware access)
