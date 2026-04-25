# KOOMPI Academy — Implementation Plan

From "learning platform" to "self-directed CS university." This document is the execution path. Phases are sequential but each ends at a shippable checkpoint — you can stop after any phase and have delivered value.

---

## Guiding Principles

1. **The critical path is the lesson experience.** Everything else (roadmap, certificates, cohorts) is decoration on a textbook until lessons become interactive.
2. **Mastery over completion.** "Next" should unlock when the student demonstrated understanding, not when they scrolled past content.
3. **KID is the unfair advantage.** Verifiable on-chain credentials are the one thing no other platform can replicate. Use them.
4. **Self-directed = maximum autonomy inside a clear structure.** Students pick pace and schedule. The curriculum is opinionated.
5. **Content is the hard problem, not code.** The playground takes a week. Rewriting 52 lessons to the new pattern takes months.

---

## Current State (what exists today)

- React 19 + Vite + TypeScript SPA, served by Node `server.js` in production
- Design system: DM Serif Display + DM Sans, warm cream + terracotta
- 8 courses (Foundation → Web Dev path), ~52 lessons as React components in `src/lessons/`
- TopNav + `/dashboard` + lesson viewer + KID OAuth (with `server.js` proxy for client_secret)
- localStorage progress tracking (`src/lib/progressApi.ts`)
- No interactive exercises, no assessment, no credentials, no cohorts

---

## Phase 0 — Foundation Fixes

**Goal:** fix what's broken or unusable before adding anything new. Ship this week.

- [ ] **Rotate KID `client_secret`** at dash.koompi.org (exposed in conversation)
- [ ] **Lesson heading clipping** — `src/pages/TopicDetails.tsx` content area needs top padding; "Introduction: HTML Fundamentals" is hidden under the course nav
- [ ] **Sidebar highlight bug** — `src/components/LessonSidebar.tsx` shows lesson 03 "Document Structure" highlighted when lesson 01 is active. `completedSet` logic needs audit
- [ ] **Mobile lesson viewer** — unusable on phones. Options:
  - LessonSidebar becomes a slide-in drawer triggered by the mobile button in CourseTopicNavbar (already wired, just needs the drawer UI)
  - Content area gets proper mobile padding
  - Course nav horizontally scrollable (already is, confirm works)
- [ ] **Strip cyberpunk residue** — any lingering `font-mono tracking-[0.4em] uppercase` triples in lesson content or UI chrome
- [ ] **Remove unused `src/lib/api.ts`** — the old backend is gone, this file is dead code

**Out of scope:** new features. Just fix.

**Shippable outcome:** the existing experience works correctly on all devices.

---

## Phase 1 — Code Playground + One Transformed Lesson

**Goal:** prove the pattern. Make one lesson feel like what the whole platform should be.

### 1.1 Build `<CodePlayground>` component

**Location:** `src/components/playground/CodePlayground.tsx`

**Stack:**
- `@codemirror/state`, `@codemirror/view`, `@codemirror/lang-html`, `@codemirror/lang-css`, `@codemirror/lang-javascript` (`npm i codemirror @codemirror/...`)
- Sandboxed `<iframe sandbox="allow-scripts">` for preview
- Re-render on debounced keystroke (300ms)

**API:**
```tsx
<CodePlayground
  mode="html" | "css" | "js" | "web"  // web = all three combined
  starter={{ html: "...", css: "...", js: "..." }}
  height="400px"
  challenge={{
    prompt: "Add a <nav> element with three links",
    check: (html, css, js) => { /* returns { passed: boolean, message: string } */ }
  }}
/>
```

**Three display modes:**
1. **Exploration** — no challenge, just "try it yourself"
2. **Challenge** — has a prompt and check, shows pass/fail badge
3. **Split** — editor + preview side by side; on mobile, tabbed

**Check function examples:**
- HTML: parse the output DOM, assert `querySelector` matches
- CSS: render in iframe, measure computed styles
- JS: capture `console.log` output, match expected values

### 1.2 Rebuild `html-module01gettingstarted` to the new pattern

**Structure every lesson should follow:**

1. **Hook** — 2 sentences. Why this matters in the real world. Not academic, not motivational fluff.
2. **Concept** — minimal explanation. One idea per lesson. 3-5 minutes to read.
3. **Example** — walked-through example with short annotations
4. **Try it** — `<CodePlayground mode="exploration">` with starter code. Student modifies freely.
5. **Challenge** — `<CodePlayground mode="challenge">` with specific task and pass/fail check
6. **Gate** — "Complete & Next" only unlocks when challenge passes

### 1.3 Document the pattern

Create `src/lessons/LESSON_AUTHORING.md` with:
- The 6-part structure above
- `<CodePlayground>` API reference
- Example challenge `check` functions
- Tone guidelines ("write like a mentor, not a textbook")

**Out of scope for Phase 1:**
- Rebuilding other lessons (Phase 2)
- Assessment tracking in database (Phase 3 — for now, challenge pass is in-memory only)
- Python, Rust, SQL playgrounds (web-stack only)

**Shippable outcome:** one lesson that feels dramatically different from every other lesson. Use it as the pitch.

---

## Phase 2 — Content Restructure

**Goal:** apply the Phase 1 pattern to every existing lesson.

This is **mostly content work, not code work.** The playground and pattern exist. Now each lesson gets rewritten.

### Priority order (critical path for beginners)

1. **HTML track** (8 lessons) — most students start here
2. **CSS track** (8 lessons)
3. **JavaScript basics** (8 lessons)
4. **JavaScript advanced** (6 lessons)
5. **Git track** (5 lessons) — challenges need a simulated Git environment or sandbox
6. **React track** (7 lessons) — needs WebContainer or sandpack for full React preview
7. **Next.js track** (7 lessons)
8. **Foundation** (3 lessons) — terminal challenges need xterm.js integration (separate sub-project)

### Per-lesson checklist

- [ ] Hook rewritten in 2 sentences
- [ ] Concept content reduced to minimum viable explanation
- [ ] At least one `<CodePlayground mode="exploration">` embedded
- [ ] At least one `<CodePlayground mode="challenge">` with working check
- [ ] Challenge check function tested (passes expected solution, fails common wrong answers)

### Open decisions

- **Who authors content?** In-house team? Community contributions? This is the bottleneck.
- **Lesson review process?** Who proofreads the rewrites?
- **Khmer translation?** Toggle in UI, or separate track? Affects lesson file architecture.

**Out of scope:** video content, instructor-led cohorts, synchronous classes.

**Shippable outcome:** every HTML + CSS + JS lesson is interactive. Student can complete the web track without leaving the platform.

---

## Phase 3 — Assessment Gates & Verified Progress

**Goal:** progression requires demonstrated competency, not page views.

### 3.1 Update the progress layer

**File:** `src/lib/progressApi.ts`

New shape:
```ts
interface LessonProgress {
  lessonId: string;
  topicId: string;
  completedAt: string;
  challengePassed: boolean;  // was the gate passed, or did they manually mark done?
  attempts?: number;          // how many tries
}
```

`markComplete` only sets `challengePassed: true` when the gate component confirms pass.

### 3.2 `<AssessmentGate>` wrapper

Wraps the "Complete & Next" button. Disabled until the lesson's embedded challenge reports pass. Shows attempts, hints unlock after 3 failed attempts, solution reveals after 5 (configurable).

### 3.3 Track-level mastery assessment

Each track ends with a **capstone project**, not a quiz. The capstone spec lives in the final "lesson" of the track:

- Problem statement
- Required features (checklist)
- Automated checks (structural — does the HTML have these elements, does the JS expose these functions)
- Submission: paste a GitHub URL + deployed URL

Capstone pass is recorded in progress. Track completion = all lessons passed + capstone submitted + capstone auto-checks passed.

### 3.4 Backend progress API (when KID needs verifiable completion)

Currently progress is localStorage. For Phase 5 (credentials) we need server-side truth. Options:

- **A.** Extend `server.js` with MongoDB (the option discussed earlier — recommended)
- **B.** Store progress signed by KID wallet as an on-chain attestation
- **C.** Use a simple KV store (Cloudflare D1, Redis) — cheaper than Mongo if that's all you need

Recommend **A** — same deploy target as the current server, known shape.

**Shippable outcome:** students can't skip forward. Completion means something.

---

## Phase 4 — Onboarding + Visual Roadmap

**Goal:** new visitors know where to start within 30 seconds.

### 4.1 Landing onboarding quiz

Replace the current hero CTAs with a 3-question inline quiz for first-time visitors:

1. Have you written code before? (Never / A little / Regularly)
2. What's your goal? (Build websites / Understand Linux / Mobile apps / Not sure)
3. How much time per week? (<3h / 3-10h / 10h+)

Output: "Start here →" link to recommended first lesson + estimated time to complete their chosen track.

Saves answer in localStorage so the quiz doesn't re-appear.

### 4.2 Visual roadmap at `/roadmap`

Replaces the flat course grid on `/services` (rename route to `/roadmap`).

- Dependency graph: Foundation → HTML → CSS → JavaScript → (React ← JS Advanced) → Next.js
- Progress overlaid (completed nodes filled, unlocked nodes bright, locked nodes gray with "requires X")
- Click node → go to course

**Library:** React Flow — cheaper to implement, good UX out of the box.

### 4.3 Dashboard improvements for authenticated users

Current dashboard shows stats + continue learning + course list. Add:

- **Streak counter** (days with at least one lesson interaction — humane, with 2 grace days per week)
- **Weekly goal** ("Finish 3 lessons this week" — configurable)
- **Cohort preview** (see "5 students at similar points" — teases Phase 6)

**Shippable outcome:** a new student goes from landing to first lesson in under 60 seconds with a clear sense of where they're heading.

---

## Phase 5 — KID Credentials (The Differentiator)

**Goal:** track completion mints a verifiable on-chain certificate.

### 5.1 Certificate minting flow

Per the KID spec (`dash.koompi.org/llms.txt`):
- Minting uses `POST https://oauth.koompi.org/v2/erc1155/mint`
- Requires `X-API-Key` (not user bearer token) — **server-only, never in frontend**
- Body: `{ to_address, token_id, amount }`

Add to `server.js`:

```
POST /api/certificate/issue
  Body: { userId, trackId }
  Server: verifies track is complete (via Phase 3 backend progress API),
          calls KID mint with user's wallet_address,
          returns token_id + verification URL
```

### 5.2 Certificate metadata schema

Each track has a reserved `token_id` range:
- Foundation: 1
- HTML track: 2
- CSS track: 3
- JavaScript track: 4
- JS Advanced track: 5
- Git track: 6
- React track: 7
- Next.js track: 8

Metadata (stored off-chain, linked from token) includes:
- Track name
- Issued date
- Lessons completed list with timestamps
- Capstone project URL
- Peer review signatures (Phase 6)

### 5.3 Public verification page

`/cert/:tokenId` — anyone (including employers) can visit, see the holder's KID name, the track, the issued date, the capstone, verification link to on-chain record.

### 5.4 Open questions (NEEDS KID TEAM INPUT before starting Phase 5)

- **Who pays the gas?** KOOMPI treasury? Student pays in KOOMPI tokens? Subsidized first N mints?
- **ERC1155 `amount` field** — should this always be 1, or allow multi-edition certs?
- **Is there an existing token_id registry** across KOOMPI properties, or does Academy get its own range?
- **Revocation** — can certs be revoked if cheating is later detected? Burn endpoint exists in the spec.

**Shippable outcome:** completing a track produces a credential an employer can verify in 10 seconds. No other platform in Cambodia (or globally) offers this.

---

## Phase 6 — Portfolio & Community

**Goal:** the KOOMPI Academy profile page is the student's resume.

### 6.1 Public profile at `/u/:kidId`

- Student's display name + avatar (from KID)
- All credentials earned (with verification links)
- All submitted projects (capstone URLs, screenshots, deployed links)
- Activity stream (last N completed lessons)
- Public by default, toggle-able per user

### 6.2 Peer review for capstones

- When a student submits a capstone, it enters a review queue
- Another student who has completed the same track is assigned to review
- Reviewer fills a rubric (mostly auto-filled from the lesson's spec)
- Reviewer is rewarded (KOOMPI tokens via KID wallet) for completing review
- Once review is approved, the certificate mints

### 6.3 Cohorts

- Students who sign up in the same month are auto-assigned a cohort
- Cohort has a shared feed (simple feed, not a chat) — weekly "what did you build"
- Cohort view on dashboard: "Your cohort (October 2026) — 14 students, 3 ahead of you, 5 behind"

### 6.4 Mentor program

- Students who earn a track certificate become eligible mentors
- Mentors answer questions, review capstones, earn tokens
- Opt-in, not required

**Out of scope:** synchronous classes, live chat, video meetings, employer hiring portal.

**Shippable outcome:** KOOMPI Academy is a self-sustaining community. Graduates help new students. Portfolios evidence real skill.

---

## Tracks That Don't Exist Yet

When Web Track is done and the pattern is proven, add:

- **Linux/DevOps Track** — Foundation already covers basics. Add: shell scripting, networking, Docker, CI/CD, system administration. Needs browser-based terminal emulator (xterm.js + a backend shell sandbox, or WebAssembly Linux like WebVM).
- **Mobile Track** — React Native, native publishing, deployment. Leverages Web Track's React foundation.

These are content projects, not platform projects. Plan them after Phase 5 when the pattern is stable.

---

## Phase 7 — AI Course Co-Creation

**Goal:** students (and instructors) generate personalized learning paths from a prompt, like roadmap.sh's AI feature — but with KOOMPI's curriculum as the foundation.

**Do not start Phase 7 before Phase 1 ships.** The AI generates paths through existing lessons. If lessons aren't interactive, the feature is useless.

### 7.1 Roadmap generation flow

User enters a natural-language goal:

> "I want to build a SaaS product in 6 months. I know Python basics."

The system outputs:
- A named learning path ("Full-Stack SaaS Builder")
- An ordered list of lessons/tracks drawn from KOOMPI's curriculum
- Estimated time per track, total timeline
- A gap analysis ("You'll need to learn JavaScript — here's the path")

### 7.2 Architecture

**Frontend:** `/generate` page — single text input, "Build my roadmap" CTA. Output renders as an interactive node graph (React Flow, same component as Phase 4 roadmap) with "Start" button on the first unlocked node.

**Backend:** `POST /api/roadmap/generate`

```
Body: { goal: string, priorKnowledge: string[] }
Response: { name, description, tracks: TrackRef[], estimatedWeeks }
```

Server calls Claude API (claude-sonnet-4-6 by default, claude-opus-4-7 for complex goals):

```js
const prompt = buildPrompt(goal, priorKnowledge, CURRICULUM_CATALOG);
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  system: SYSTEM_PROMPT,  // curriculum catalog injected here
  messages: [{ role: "user", content: prompt }]
});
```

Response is JSON-structured output: an ordered list of `track_id` references from the canonical curriculum catalog (`curriculum/OVERVIEW.md`).

**System prompt includes:**
- Full curriculum catalog (track IDs, descriptions, prerequisites)
- Output schema (strict JSON)
- Guardrails: only reference tracks that exist; don't hallucinate lessons

### 7.3 Saving generated roadmaps

- Anonymous: stored in localStorage as `generated_roadmap`
- Authenticated: `POST /api/roadmap/save` stores in user profile (Phase 3 backend)
- Each saved roadmap is a named list of `track_id` references + user's `goal` string
- Dashboard shows saved roadmaps with progress overlay

### 7.4 Sharing generated roadmaps

Each saved roadmap gets a short URL: `/r/:slug`

- Public by default
- Anyone can fork it ("Use this roadmap") — creates their own copy
- Over time, popular roadmaps surface to a community gallery at `/roadmaps`

### 7.5 Instructor mode

Instructors (KID-authenticated users with `role: instructor`) can:
- Generate a roadmap, then edit it manually (drag nodes, add/remove tracks)
- Publish it as an "official" roadmap with their name attached
- Future: assign a roadmap to a cohort (Phase 6 integration)

### 7.6 Implementation notes

- Claude API key goes in `server.js` env — never in frontend
- Rate-limit generation: 3 per hour for anonymous, 20/day for authenticated
- Cache identical `(goal, priorKnowledge)` pairs for 24h to reduce API spend
- Start with `claude-haiku-4-5` for cost, upgrade to `claude-sonnet-4-6` if quality is insufficient

### Open decisions

- **Cost model:** who pays for Claude API calls? Free for all, or authenticated only?
- **Content gap:** if the goal requires a track that doesn't exist yet, show it as "Coming soon" node or omit it?
- **Curriculum freshness:** how often is the catalog injected into the system prompt updated as new tracks ship?

**Shippable outcome:** a student enters "I want to get a job as a frontend developer" and gets a personalized, clickable roadmap that leads them into the platform's real lessons in under 60 seconds.

---

## What Is NOT in This Plan (deliberately)

- **Monetization / pricing** — learn first, charge later. Free tracks, paid certs is the model but it's a business decision, not a product decision.
- **Employer partnership pipeline** — build the product first, employers follow talent.
- **Video content** — text + interactive exercises beats videos for self-paced learning. Videos are expensive and often skipped.
- **Khmer translation** — strategic lever, but if you commit to it, it belongs in Phase 2 alongside content rewrite (not retrofitted later). Decision required before Phase 2 starts.
- **KOOMPI hardware integration** — lessons that run against the actual KOOMPI laptop hardware (terminal, peripherals). Unique to KOOMPI. Deferred — needs hardware expertise and is a separate project.

---

## Critical Decisions Blocking Progress

Before Phase 2 starts:
1. Content authoring team — who writes the lesson rewrites?
2. Khmer translation — in or out for v1?

Before Phase 5 starts:
3. Gas payment model for KID certificate mints
4. ERC1155 `token_id` range assignment for Academy
5. Backend progress store — MongoDB extension of server.js, or something else?

Before Phase 6 starts:
6. Peer review rubric — who designs it? Who moderates disputes?
7. Cohort size — 15? 50? Bigger feels less like a community, smaller is harder to sustain.

---

## Immediate Next Action

**Before anything else:** rotate the KID `client_secret` at dash.koompi.org — the current one was exposed. Takes 2 minutes.

Then:
1. **Phase 0** — foundation fixes. Under a day.
2. **Phase 1.1** — build `<CodePlayground>`. Under a week.
3. **Phase 1.2** — rebuild one lesson to the new pattern. Another day.

Do not start Phase 2 until Phase 1 has shipped and you've felt the difference in one real lesson. The proof-of-concept changes the rest of the plan.
