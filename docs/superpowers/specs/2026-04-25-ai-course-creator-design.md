# AI Course Creator — Design Spec
**Date:** 2026-04-25  
**Status:** Approved  
**Schema version:** 1

---

## Overview

Registered users (students and teachers) can generate their own courses using AI. Each user receives 3 free course credits. Additional credits can be requested (admin-approved) or purchased (v2). Courses are rendered using a typed block schema — no MDX, no Markdown.

---

## 1. Content Schema

All module content is stored as an array of typed blocks (jsonb in Supabase). Schema is versioned so v2 blocks can coexist with v1 without breaking existing courses.

```ts
type Block =
  | { type: "heading";   level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code";      language: string; code: string }
  | { type: "callout";   variant: "info" | "tip" | "warning"; text: string }
  | { type: "list";      ordered: boolean; items: string[] }
  | { type: "quiz";      question: string; options: string[]; answer: number }
```

**Excluded from v1:** tables (Claude unreliable), images (sourcing problem), CodePlayground (doesn't fit JSON schema cleanly).

Each course stores `schema_version: 1`. Future migrations target rows where `schema_version < N`.

---

## 2. AI Generation — Two-Phase

### Phase 1 — Outline (~3s)
Claude returns N module titles + 1-line descriptions. User reviews and can regenerate before committing to full expansion. Uses Claude tool use with a strict JSON schema.

### Phase 2 — Expand (~5–10s per module)
Modules are expanded sequentially. Each module is a separate Claude call using tool use — Claude is forced to return `Block[]` matching the schema. Progress shown as "Generating module 2 of 5…".

**Hard limits enforced server-side:**
- Max 8 modules per course
- Max 10 blocks per module
- Credits checked before Phase 1 begins
- Credits deducted only on **save** (not on generation — abandon is free)

**API key:** `ANTHROPIC_API_KEY` — server-side only, never VITE-prefixed.

---

## 3. Credit System

### Rules
- Every registered user starts with **30 credits** (enough for 3 courses at 10 credits each)
- **1 course costs 10 credits** on save
- Generation (Phase 1 + 2) is gated — blocked before Claude is called if credits < 10
- Server returns `{ error: "insufficient_credits" }` as a hard gate

### Getting more credits
- **Request credits** — user submits a reason; admin approves by updating `user_credits` in Supabase dashboard
- No payment / buying in v1 — request flow only

### Credit UX
- Wizard header shows "20 credits remaining (2 courses left)"
- If credits < 10: Create button replaced with "Request more credits" prompt
- `/my-courses` shows credit balance + "Request credits" link always visible
- Request form: textarea for reason + submit → creates a `credit_requests` row with status `pending`
- User sees "Request submitted — we'll review it shortly" confirmation

---

## 4. Database Schema

```sql
-- Courses
create table courses (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,        -- nanoid e.g. "Xy9aB3kL"
  user_id       text not null,
  title         text not null,
  description   text,
  level         text not null default 'beginner', -- beginner | intermediate | advanced
  is_public     boolean default false,       -- false=private, true=anyone with link
  schema_version int default 1,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Course modules
create table course_modules (
  id        uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  "order"   int not null,
  title     text not null,
  duration  text,
  blocks    jsonb not null default '[]',
  created_at timestamptz default now(),
  unique (course_id, "order")
);

-- Credits
create table user_credits (
  user_id           text primary key,
  credits_remaining int default 30,  -- 30 free = 3 courses at 10 credits each
  credits_used      int default 0,
  updated_at        timestamptz default now()
);

create table credit_requests (
  id               uuid primary key default gen_random_uuid(),
  user_id          text not null,
  reason           text not null,
  amount_requested int default 10,   -- default = 1 more course
  status           text default 'pending',  -- pending | approved | rejected
  created_at       timestamptz default now()
);

-- Credit requests
create table credit_requests (
  id               uuid primary key default gen_random_uuid(),
  user_id          text not null,
  reason           text not null,
  amount_requested int default 5,
  status           text default 'pending',  -- pending | approved | rejected
  created_at       timestamptz default now()
);
```

---

## 5. API Endpoints (server.js additions)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/courses/credits` | required | Get current user's credit balance |
| POST | `/api/courses/generate/outline` | required | Phase 1: generate outline (no credit cost) |
| POST | `/api/courses/generate/module` | required | Phase 2: expand one module (no credit cost) |
| POST | `/api/courses` | required | Save course (costs 1 credit) |
| GET | `/api/courses/mine` | required | List current user's courses |
| GET | `/api/courses/:slug` | optional | View course (public or own) |
| DELETE | `/api/courses/:slug` | required | Delete own course |
| POST | `/api/credits/request` | required | Submit a credit request |
| POST | `/api/credits/request` | required | Submit credit request |

---

## 6. Routes & UI

### New routes (App.tsx)
- `/create` — AI course creation wizard (auth-gated)
- `/my-courses` — creator's course library (auth-gated)
- `/c/:slug` — course viewer (public or own)

**Separate from `/document/` namespace** — different rendering path, different mental model.

### Creation Wizard — 3 steps

**Step 1: Details**
- Course title
- What this course teaches (free text, becomes the AI prompt)
- Level: beginner / intermediate / advanced
- Number of modules: 3–8 (slider)
- Credit balance shown in corner

**Step 2: Generating**
- Phase 1: outline streams in (~3s) — user sees module titles appear
- "Looks good / Regenerate outline" choice
- On approval: Phase 2 expands each module sequentially with progress bar
- Can cancel mid-generation (no credit charged)

**Step 3: Review & Publish**
- Full course preview using `ContentRenderer`
- Title editable inline
- Public/private toggle
- "AI-generated content — may contain errors" badge (always visible, non-dismissible)
- Save button (costs 1 credit) + Cancel (free)

### Course Viewer (`/c/:slug`)
- Reuses existing `CourseTopicNavbar` + `LessonSidebar` layout
- `ContentRenderer` maps each block type to React elements (mirrors existing lesson styling)
- "AI-generated" badge below course title
- No progress tracking in v1

### TopNav changes
- Logged-in: "Create" button added to right side (primary style)
- User dropdown: "My Courses" link added above "Sign out"

### My Courses (`/my-courses`)
- Grid of course cards: title, level, module count, visibility badge, created date
- Delete button (with confirmation)
- "Create new" button (shows credit balance, disabled if 0)
- Credit request form accessible via "Need more credits?" link

---

## 7. Scope Boundaries (v1)

**In scope:**
- Generation, saving, viewing, deleting
- Public/private visibility (no discovery page — link sharing only)
- Credit gate with request flow

**Explicitly out of scope for v1:**
- Editing individual blocks after generation (regenerate-only)
- Public course browse/discovery page
- Moderation or reporting
- Progress tracking on user-created courses
- CodePlayground / interactive blocks
- Quiz gating (quizzes rendered but don't gate next module)
- Real payment / Stripe integration (placeholder UI only)
- Admin UI for credit approval (done via Supabase dashboard)

---

## 8. New Files

```
src/
  pages/
    CreateCourse.tsx        -- 3-step wizard
    MyCourses.tsx           -- course library
    CourseViewer.tsx        -- /c/:slug viewer
  components/
    ContentRenderer.tsx     -- Block[] → React elements
    CreditBadge.tsx         -- credits remaining indicator
  lib/
    courseApi.ts            -- API client for all course endpoints
    nanoid.ts               -- slug generation (client-side preview only)
```

Server additions in `server.js` (all new routes listed in Section 5).
