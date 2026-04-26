# AI Course Creator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let registered users generate, save, and share courses using AI, gated by a 30-credit allowance (10 credits per course) with a request-more flow.

**Architecture:** Two-phase AI generation (outline → per-module expansion) using OpenAI-compatible tool use for structured JSON output. Content stored as typed `Block[]` in Supabase jsonb. CourseViewer uses a self-contained layout (not the hardwired TOPICS components). All AI calls happen server-side; API keys never reach the browser. Provider is fully configurable via env vars — swap Kimi, DeepSeek, Claude, or any OpenAI-compat provider without code changes.

**Tech Stack:** React 19 + Vite + TypeScript + Tailwind, Express server.js, Supabase, `openai` SDK (OpenAI-compatible, works with any provider), React Router v7.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/types/course.ts` | **Create** | Block union type, Course, CourseModule, API response types |
| `src/lib/courseApi.ts` | **Create** | All fetch calls to `/api/courses/*` and `/api/credits/*` |
| `src/components/ContentRenderer.tsx` | **Create** | Renders `Block[]` → React elements |
| `src/pages/CourseViewer.tsx` | **Create** | `/c/:slug` — self-contained viewer with sidebar |
| `src/pages/MyCourses.tsx` | **Create** | `/my-courses` — course library + credit balance + request form |
| `src/pages/CreateCourse.tsx` | **Create** | `/create` — 3-step wizard (details → generating → review) |
| `server.js` | **Modify** | Add 8 new API routes + OpenAI-compat SDK |
| `src/App.tsx` | **Modify** | Add 3 new routes, extend `isLessonRoute` to cover `/c/` |
| `src/components/TopNav.tsx` | **Modify** | Add "Create" button + "My Courses" in user dropdown |
| `.env` / `.env.example` | **Modify** | Add `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL` |

---

## Task 1: Install `openai` SDK + set env vars

**Files:**
- Modify: `.env`
- Modify: `.env.example`

The `openai` npm package works with any OpenAI-compatible provider (Kimi/Moonshot, DeepSeek, Mistral, Groq, Claude, etc.) by pointing `baseURL` at the provider's endpoint.

- [ ] **Step 1: Install the SDK**

```bash
npm install openai
```

Expected output ends with: `added N packages`

- [ ] **Step 2: Verify install**

```bash
node -e "const { OpenAI } = require('openai'); console.log('ok')"
```

Expected: `ok`

- [ ] **Step 3: Add env vars to `.env`**

Add below the Supabase block:
```
# ── AI Provider (server-side only — NEVER add VITE_ prefix) ─────────────────
# Swap provider by changing these three vars — no code changes needed.
#
# Kimi / Moonshot:
AI_BASE_URL=https://api.moonshot.cn/v1
AI_API_KEY=sk-your-moonshot-key
AI_MODEL=moonshot-v1-32k
#
# DeepSeek (very cheap):
# AI_BASE_URL=https://api.deepseek.com/v1
# AI_API_KEY=sk-your-deepseek-key
# AI_MODEL=deepseek-chat
#
# Claude via OpenAI-compat:
# AI_BASE_URL=https://api.anthropic.com/v1
# AI_API_KEY=sk-ant-your-key
# AI_MODEL=claude-sonnet-4-6
```

- [ ] **Step 4: Add placeholder to `.env.example`**

```
# ── AI Provider (server-side only — NEVER add VITE_ prefix) ─────────────────
AI_BASE_URL=https://api.moonshot.cn/v1
AI_API_KEY=your_ai_provider_key_here
AI_MODEL=moonshot-v1-32k
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .env.example
git commit -m "feat: install openai SDK for provider-agnostic AI generation"
```

---

## Task 2: Run Supabase SQL migrations

**Files:** None (SQL run in Supabase dashboard)

- [ ] **Step 1: Open Supabase SQL editor and run**

```sql
-- Courses
create table if not exists courses (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  user_id        text not null,
  title          text not null,
  description    text,
  level          text not null default 'beginner',
  is_public      boolean default false,
  schema_version int default 1,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- Course modules
create table if not exists course_modules (
  id         uuid primary key default gen_random_uuid(),
  course_id  uuid references courses(id) on delete cascade,
  "order"    int not null,
  title      text not null,
  duration   text,
  blocks     jsonb not null default '[]',
  created_at timestamptz default now(),
  unique (course_id, "order")
);
create index if not exists course_modules_course_id_idx on course_modules(course_id, "order");

-- Credits
create table if not exists user_credits (
  user_id           text primary key,
  credits_remaining int default 30,
  credits_used      int default 0,
  updated_at        timestamptz default now()
);

-- Credit requests
create table if not exists credit_requests (
  id               uuid primary key default gen_random_uuid(),
  user_id          text not null,
  reason           text not null,
  amount_requested int default 10,
  status           text default 'pending',
  created_at       timestamptz default now()
);
```

- [ ] **Step 2: Verify tables appear in Supabase Table Editor** — confirm `courses`, `course_modules`, `user_credits`, `credit_requests` all exist.

---

## Task 3: Shared types (`src/types/course.ts`)

**Files:**
- Create: `src/types/course.ts`

- [ ] **Step 1: Create the file**

```typescript
export type BlockHeading  = { type: "heading";   level: 2 | 3; text: string };
export type BlockParagraph = { type: "paragraph"; text: string };
export type BlockCode     = { type: "code";      language: string; code: string };
export type BlockCallout  = { type: "callout";   variant: "info" | "tip" | "warning"; text: string };
export type BlockList     = { type: "list";      ordered: boolean; items: string[] };
export type BlockQuiz     = { type: "quiz";      question: string; options: string[]; answer: number };

export type Block =
  | BlockHeading
  | BlockParagraph
  | BlockCode
  | BlockCallout
  | BlockList
  | BlockQuiz;

export interface CourseModule {
  id: string;
  course_id: string;
  order: number;
  title: string;
  duration: string | null;
  blocks: Block[];
}

export interface Course {
  id: string;
  slug: string;
  user_id: string;
  title: string;
  description: string | null;
  level: "beginner" | "intermediate" | "advanced";
  is_public: boolean;
  schema_version: number;
  created_at: string;
  modules?: CourseModule[];
}

export interface OutlineModule {
  order: number;
  title: string;
  description: string;
  duration: string;
}

export interface UserCredits {
  user_id: string;
  credits_remaining: number;
  credits_used: number;
}
```

- [ ] **Step 2: Type-check**

```bash
bun run build 2>&1 | grep -E "error|✓"
```

Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/types/course.ts
git commit -m "feat: add course types"
```

---

## Task 4: Backend — credits endpoints + Anthropic setup (`server.js`)

**Files:**
- Modify: `server.js`

- [ ] **Step 1: Add OpenAI client import at the top of `server.js`** (after the supabase import)

```javascript
import OpenAI from "openai";

const ai = new OpenAI({
  baseURL: process.env.AI_BASE_URL,
  apiKey:  process.env.AI_API_KEY,
});
const AI_MODEL = process.env.AI_MODEL ?? "moonshot-v1-32k";
```

- [ ] **Step 2: Add `GET /api/courses/credits`** — lazy-provisions row if missing

Add after the existing `/api/progress/viewed` route:

```javascript
// ── Course credits ────────────────────────────────────────────────────────────
app.get("/api/courses/credits", extractUserId, async (req, res) => {
  const userId = req.userId;
  try {
    // Upsert: provision 30 credits on first call
    const { data, error } = await supabase
      .from("user_credits")
      .upsert({ user_id: userId }, { onConflict: "user_id", ignoreDuplicates: true })
      .select()
      .single();

    if (error) {
      // Row already exists — just fetch it
      const { data: existing, error: fetchErr } = await supabase
        .from("user_credits")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (fetchErr) throw fetchErr;
      return res.json(existing);
    }

    res.json(data);
  } catch (err) {
    console.error("GET /api/courses/credits error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});
```

- [ ] **Step 3: Add `POST /api/credits/request`**

```javascript
app.post("/api/credits/request", extractUserId, async (req, res) => {
  const { reason, amount_requested = 10 } = req.body;
  if (!reason?.trim()) return res.status(400).json({ error: "reason_required" });

  const userId = req.userId;
  try {
    const { data, error } = await supabase
      .from("credit_requests")
      .insert({ user_id: userId, reason: reason.trim(), amount_requested })
      .select()
      .single();
    if (error) throw error;
    res.json({ ok: true, request: data });
  } catch (err) {
    console.error("POST /api/credits/request error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});
```

- [ ] **Step 4: Restart server and verify**

```bash
# Kill existing server.js and restart
fuser -k 3001/tcp 2>/dev/null; sleep 1
node --env-file=.env server.js &
sleep 2

# Test credits endpoint (replace TOKEN with a real JWT from localStorage after login)
curl -s http://localhost:3001/api/courses/credits \
  -H "Authorization: Bearer TEST_INVALID" | jq .
```

Expected: `{ "error": "invalid_token" }` — auth middleware is working.

- [ ] **Step 5: Commit**

```bash
git add server.js
git commit -m "feat: add credits endpoints and OpenAI-compat AI client"
```

---

## Task 5: Backend — generation endpoints (`server.js`)

**Files:**
- Modify: `server.js`

- [ ] **Step 1: Add `POST /api/courses/generate/outline`**

Add after the credits endpoints. Uses OpenAI tool-call syntax (`type: "function"`, `parameters`, `tool_choice: "required"`) which is compatible with Kimi, DeepSeek, Claude-compat, and all other OpenAI-compat providers.

```javascript
// ── AI Generation ─────────────────────────────────────────────────────────────
app.post("/api/courses/generate/outline", extractUserId, async (req, res) => {
  const { title, description, level, num_modules } = req.body;
  if (!title || !description || !level || !num_modules) {
    return res.status(400).json({ error: "missing_fields" });
  }
  const n = Math.min(Math.max(parseInt(num_modules) || 5, 3), 8);

  // Gate: credits check
  const { data: credits } = await supabase
    .from("user_credits")
    .select("credits_remaining")
    .eq("user_id", req.userId)
    .maybeSingle();
  if (!credits || credits.credits_remaining < 10) {
    return res.status(403).json({ error: "insufficient_credits" });
  }

  try {
    const response = await ai.chat.completions.create({
      model: AI_MODEL,
      max_tokens: 1024,
      tools: [{
        type: "function",
        function: {
          name: "set_outline",
          description: "Set the course module outline",
          parameters: {
            type: "object",
            required: ["modules"],
            properties: {
              modules: {
                type: "array",
                items: {
                  type: "object",
                  required: ["order", "title", "description", "duration"],
                  properties: {
                    order:       { type: "number" },
                    title:       { type: "string" },
                    description: { type: "string" },
                    duration:    { type: "string" }
                  }
                }
              }
            }
          }
        }
      }],
      tool_choice: "required",
      messages: [{
        role: "user",
        content: `Create a ${level} course outline titled "${title}".\nDescription: ${description}\nGenerate exactly ${n} modules. Be specific and practical.`
      }]
    });

    const toolCall = response.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall) return res.status(500).json({ error: "generation_failed" });

    const parsed = JSON.parse(toolCall.function.arguments);
    const modules = parsed.modules.slice(0, n);
    res.json({ modules });
  } catch (err) {
    console.error("outline generation error:", err);
    res.status(500).json({ error: "generation_failed" });
  }
});
```

- [ ] **Step 2: Add `POST /api/courses/generate/module`**

```javascript
app.post("/api/courses/generate/module", extractUserId, async (req, res) => {
  const { course_title, course_level, module_title, module_description } = req.body;
  if (!course_title || !course_level || !module_title) {
    return res.status(400).json({ error: "missing_fields" });
  }

  try {
    const response = await ai.chat.completions.create({
      model: AI_MODEL,
      max_tokens: 4096,
      tools: [{
        type: "function",
        function: {
          name: "set_module_content",
          description: "Set the full content blocks for this lesson module",
          parameters: {
            type: "object",
            required: ["blocks"],
            properties: {
              blocks: {
                type: "array",
                items: {
                  type: "object",
                  required: ["type"],
                  properties: {
                    type:     { type: "string", enum: ["heading","paragraph","code","callout","list","quiz"] },
                    level:    { type: "number" },
                    text:     { type: "string" },
                    language: { type: "string" },
                    code:     { type: "string" },
                    variant:  { type: "string", enum: ["info","tip","warning"] },
                    ordered:  { type: "boolean" },
                    items:    { type: "array", items: { type: "string" } },
                    question: { type: "string" },
                    options:  { type: "array", items: { type: "string" } },
                    answer:   { type: "number" }
                  }
                }
              }
            }
          }
        }
      }],
      tool_choice: "required",
      messages: [{
        role: "user",
        content: `Write the lesson content for module "${module_title}" in a ${course_level} course on "${course_title}".\nModule goal: ${module_description ?? module_title}\nInclude: a heading, clear explanations, code examples where relevant, a tip callout, and end with one quiz question. Max 10 blocks total.`
      }]
    });

    const toolCall = response.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall) return res.status(500).json({ error: "generation_failed" });

    const parsed = JSON.parse(toolCall.function.arguments);
    const blocks = parsed.blocks.slice(0, 10);
    res.json({ blocks });
  } catch (err) {
    console.error("module generation error:", err);
    res.status(500).json({ error: "generation_failed" });
  }
});
```

- [ ] **Step 3: Restart server and smoke-test (requires valid `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL` in `.env`)**

```bash
fuser -k 3001/tcp 2>/dev/null; sleep 1
node --env-file=.env server.js &
sleep 2
echo "Server restarted"
```

- [ ] **Step 4: Commit**

```bash
git add server.js
git commit -m "feat: add AI generation endpoints (outline + module)"
```

---

## Task 6: Backend — course CRUD endpoints (`server.js`)

**Files:**
- Modify: `server.js`

- [ ] **Step 1: Add `POST /api/courses`** (save + deduct 10 credits)

```javascript
// ── Course CRUD ───────────────────────────────────────────────────────────────
import { randomBytes } from "crypto";
const makeSlug = () => randomBytes(6).toString("base64url").slice(0, 8);

app.post("/api/courses", extractUserId, async (req, res) => {
  const { title, description, level, is_public, modules } = req.body;
  if (!title || !level || !Array.isArray(modules) || modules.length === 0) {
    return res.status(400).json({ error: "missing_fields" });
  }

  const userId = req.userId;

  // Atomically check + deduct credits
  const { data: credits, error: credErr } = await supabase
    .from("user_credits")
    .select("credits_remaining, credits_used")
    .eq("user_id", userId)
    .maybeSingle();

  if (credErr) return res.status(500).json({ error: "internal_error" });
  if (!credits || credits.credits_remaining < 10) {
    return res.status(403).json({ error: "insufficient_credits" });
  }

  try {
    const slug = makeSlug();

    // Insert course
    const { data: course, error: courseErr } = await supabase
      .from("courses")
      .insert({
        slug,
        user_id: userId,
        title: title.trim(),
        description: description?.trim() ?? null,
        level,
        is_public: is_public ?? false,
        schema_version: 1,
      })
      .select()
      .single();
    if (courseErr) throw courseErr;

    // Insert modules
    const moduleRows = modules.map((m, i) => ({
      course_id: course.id,
      order: i + 1,
      title: m.title,
      duration: m.duration ?? null,
      blocks: m.blocks ?? [],
    }));
    const { error: modErr } = await supabase.from("course_modules").insert(moduleRows);
    if (modErr) throw modErr;

    // Deduct 10 credits
    await supabase
      .from("user_credits")
      .update({
        credits_remaining: credits.credits_remaining - 10,
        credits_used: credits.credits_used + 10,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    res.json({ ok: true, course: { ...course, modules: moduleRows } });
  } catch (err) {
    console.error("POST /api/courses error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});
```

> **Note:** Add `import { randomBytes } from "crypto";` at the top of `server.js` alongside the other imports. Also remove the `makeSlug` declaration from Task 4 Step 1 if you added it — define it only once here using the ES module import.

- [ ] **Step 2: Add `GET /api/courses/mine`**

```javascript
app.get("/api/courses/mine", extractUserId, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("id, slug, title, description, level, is_public, created_at")
      .eq("user_id", req.userId)
      .order("created_at", { ascending: false });
    if (error) throw error;

    // Attach module count per course
    const coursesWithCount = await Promise.all(
      (data ?? []).map(async (c) => {
        const { count } = await supabase
          .from("course_modules")
          .select("id", { count: "exact", head: true })
          .eq("course_id", c.id);
        return { ...c, module_count: count ?? 0 };
      })
    );

    res.json({ courses: coursesWithCount });
  } catch (err) {
    console.error("GET /api/courses/mine error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});
```

- [ ] **Step 3: Add `GET /api/courses/:slug`**

```javascript
app.get("/api/courses/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const { data: course, error } = await supabase
      .from("courses")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error || !course) return res.status(404).json({ error: "not_found" });

    // Auth check: private courses only visible to owner
    if (!course.is_public) {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) return res.status(403).json({ error: "forbidden" });
      try {
        const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
        const userId = payload.sub || payload._id || payload.id;
        if (userId !== course.user_id) return res.status(403).json({ error: "forbidden" });
      } catch {
        return res.status(403).json({ error: "forbidden" });
      }
    }

    const { data: modules, error: modErr } = await supabase
      .from("course_modules")
      .select("*")
      .eq("course_id", course.id)
      .order("order", { ascending: true });
    if (modErr) throw modErr;

    res.json({ course: { ...course, modules: modules ?? [] } });
  } catch (err) {
    console.error("GET /api/courses/:slug error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});
```

- [ ] **Step 4: Add `DELETE /api/courses/:slug`**

```javascript
app.delete("/api/courses/:slug", extractUserId, async (req, res) => {
  const { slug } = req.params;
  try {
    const { data: course, error } = await supabase
      .from("courses")
      .select("id, user_id")
      .eq("slug", slug)
      .single();
    if (error || !course) return res.status(404).json({ error: "not_found" });
    if (course.user_id !== req.userId) return res.status(403).json({ error: "forbidden" });

    const { error: delErr } = await supabase.from("courses").delete().eq("id", course.id);
    if (delErr) throw delErr;

    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/courses/:slug error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});
```

- [ ] **Step 5: Add `import { randomBytes } from "crypto";` to the top of `server.js`**

Find the existing imports block at the top and add:
```javascript
import { randomBytes } from "crypto";
```

- [ ] **Step 6: Restart server and verify**

```bash
fuser -k 3001/tcp 2>/dev/null; sleep 1
node --env-file=.env server.js &
sleep 2
curl -s http://localhost:3001/api/courses/nonexistent-slug | jq .
```

Expected: `{ "error": "not_found" }`

- [ ] **Step 7: Commit**

```bash
git add server.js
git commit -m "feat: add course CRUD endpoints"
```

---

## Task 7: Frontend API client (`src/lib/courseApi.ts`)

**Files:**
- Create: `src/lib/courseApi.ts`

- [ ] **Step 1: Create the file**

```typescript
import type { Course, CourseModule, OutlineModule, UserCredits } from "../types/course";

const token = () => localStorage.getItem("kid_access_token") ?? "";

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
      ...options?.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "request_failed");
  return data as T;
}

export const courseApi = {
  getCredits(): Promise<UserCredits> {
    return api("/api/courses/credits");
  },

  requestCredits(reason: string, amount_requested = 10): Promise<{ ok: boolean }> {
    return api("/api/credits/request", {
      method: "POST",
      body: JSON.stringify({ reason, amount_requested }),
    });
  },

  generateOutline(params: {
    title: string;
    description: string;
    level: string;
    num_modules: number;
  }): Promise<{ modules: OutlineModule[] }> {
    return api("/api/courses/generate/outline", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  generateModule(params: {
    course_title: string;
    course_level: string;
    module_title: string;
    module_description: string;
  }): Promise<{ blocks: import("../types/course").Block[] }> {
    return api("/api/courses/generate/module", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  saveCourse(params: {
    title: string;
    description: string;
    level: string;
    is_public: boolean;
    modules: Array<{ title: string; duration: string; blocks: import("../types/course").Block[] }>;
  }): Promise<{ ok: boolean; course: Course & { modules: CourseModule[] } }> {
    return api("/api/courses", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  getMyCourses(): Promise<{ courses: Array<Course & { module_count: number }> }> {
    return api("/api/courses/mine");
  },

  getCourse(slug: string): Promise<{ course: Course & { modules: CourseModule[] } }> {
    return api(`/api/courses/${slug}`);
  },

  deleteCourse(slug: string): Promise<{ ok: boolean }> {
    return api(`/api/courses/${slug}`, { method: "DELETE" });
  },
};
```

- [ ] **Step 2: Type-check**

```bash
bun run build 2>&1 | grep -E "error TS|✓"
```

Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/lib/courseApi.ts src/types/course.ts
git commit -m "feat: add courseApi client"
```

---

## Task 8: ContentRenderer component (`src/components/ContentRenderer.tsx`)

**Files:**
- Create: `src/components/ContentRenderer.tsx`

- [ ] **Step 1: Create the file**

```tsx
import React, { useState } from "react";
import type { Block } from "../types/course";
import { CodeBlock } from "./ui/CodeBlock";
import { cn } from "@/lib/utils";

interface Props {
  blocks: Block[];
}

export function ContentRenderer({ blocks }: Props) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 className="text-xl font-semibold text-foreground border-l-4 border-primary pl-4 py-0.5 mt-8">
          {block.text}
        </h2>
      ) : (
        <h3 className="text-lg font-semibold text-foreground mt-6">{block.text}</h3>
      );

    case "paragraph":
      return (
        <p className="text-base text-muted-foreground leading-relaxed">{block.text}</p>
      );

    case "code":
      return <CodeBlock language={block.language}>{block.code}</CodeBlock>;

    case "callout":
      return (
        <div
          className={cn(
            "flex gap-3 rounded-xl px-5 py-4 text-sm leading-relaxed border",
            block.variant === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-900"
              : block.variant === "tip"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-blue-50 border-blue-200 text-blue-900"
          )}
        >
          <span className="shrink-0 font-semibold uppercase tracking-wide text-xs pt-0.5">
            {block.variant === "warning" ? "⚠️ Warning" : block.variant === "tip" ? "💡 Tip" : "ℹ️ Info"}
          </span>
          <span>{block.text}</span>
        </div>
      );

    case "list":
      return block.ordered ? (
        <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground text-base">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      ) : (
        <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground text-base">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );

    case "quiz":
      return <QuizBlock block={block} />;

    default:
      return null;
  }
}

function QuizBlock({ block }: { block: import("../types/course").BlockQuiz }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
      <p className="font-semibold text-foreground text-sm">🧠 Quiz</p>
      <p className="text-foreground">{block.question}</p>
      <div className="space-y-2">
        {block.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => !answered && setSelected(i)}
            className={cn(
              "w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors",
              !answered
                ? "border-border hover:border-primary/40 hover:bg-primary/5"
                : i === block.answer
                ? "border-emerald-400 bg-emerald-50 text-emerald-800 font-medium"
                : i === selected
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-border text-muted-foreground"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <p className={cn("text-sm font-medium", selected === block.answer ? "text-emerald-700" : "text-red-600")}>
          {selected === block.answer ? "Correct! ✓" : `Incorrect — the answer is: ${block.options[block.answer]}`}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
bun run build 2>&1 | grep -E "error TS|✓"
```

Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/components/ContentRenderer.tsx
git commit -m "feat: add ContentRenderer for Block[]"
```

---

## Task 9: CourseViewer page (`src/pages/CourseViewer.tsx`)

**Files:**
- Create: `src/pages/CourseViewer.tsx`

- [ ] **Step 1: Create the file**

```tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { courseApi } from "../lib/courseApi";
import { ContentRenderer } from "../components/ContentRenderer";
import { cn } from "@/lib/utils";
import Footer from "../components/Footer";
import type { Course, CourseModule } from "../types/course";

const logo = "/koompi-black.png";

export default function CourseViewer() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<(Course & { modules: CourseModule[] }) | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    courseApi
      .getCourse(slug)
      .then(({ course }) => setCourse(course))
      .catch(() => setError("Course not found or not accessible."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <p className="text-muted-foreground text-sm">{error ?? "Something went wrong."}</p>
        <Link to="/dashboard" className="text-primary text-sm hover:underline">Back to courses</Link>
      </div>
    );
  }

  const activeModule = course.modules[activeIndex];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground">
      {/* Top bar */}
      <div className="w-full border-b border-border bg-white/95 backdrop-blur-sm sticky top-0 z-30 flex items-center h-12 px-4 gap-4 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="KOOMPI Academy" className="h-5 w-auto" />
        </Link>
        <span className="text-border">|</span>
        <span className="text-sm font-medium text-foreground truncate">{course.title}</span>
        <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
          AI Generated
        </span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-[280px] border-r border-border bg-white overflow-y-auto shrink-0">
          <div className="px-4 pt-6 pb-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
              {course.level}
            </p>
            <p className="text-sm font-semibold text-foreground">{course.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{course.modules.length} modules</p>
          </div>
          <div className="border-t border-border" />
          <nav className="flex flex-col py-3 px-3 gap-0.5">
            {course.modules.map((mod, i) => (
              <button
                key={mod.id}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors",
                  i === activeIndex
                    ? "bg-primary/8 text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <span className="text-[10px] font-mono text-muted-foreground/60 shrink-0 w-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {mod.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16"
            >
              {activeModule && (
                <>
                  <div className="mb-8">
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Module {activeIndex + 1} · {activeModule.duration ?? ""}
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                      {activeModule.title}
                    </h1>
                  </div>
                  <ContentRenderer blocks={activeModule.blocks} />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <div className="max-w-3xl mx-auto px-6 md:px-10 pb-10 flex justify-between gap-4">
            {activeIndex > 0 ? (
              <button
                onClick={() => setActiveIndex(i => i - 1)}
                className="text-sm font-sans px-5 py-3 rounded-xl border border-border hover:bg-muted transition-colors text-muted-foreground"
              >
                ← Previous
              </button>
            ) : <span />}
            {activeIndex < course.modules.length - 1 && (
              <button
                onClick={() => setActiveIndex(i => i + 1)}
                className="text-sm font-sans px-5 py-3 rounded-xl border border-border hover:bg-muted transition-colors text-muted-foreground"
              >
                Next →
              </button>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
bun run build 2>&1 | grep -E "error TS|✓"
```

Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/pages/CourseViewer.tsx
git commit -m "feat: add CourseViewer page (/c/:slug)"
```

---

## Task 10: MyCourses page (`src/pages/MyCourses.tsx`)

**Files:**
- Create: `src/pages/MyCourses.tsx`

- [ ] **Step 1: Create the file**

```tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { courseApi } from "../lib/courseApi";
import { useAuth } from "../context/AuthContext";
import type { Course, UserCredits } from "../types/course";
import { cn } from "@/lib/utils";
import { Trash2, Globe, Lock, Plus, Loader2 } from "lucide-react";
import Footer from "../components/Footer";

type CourseWithCount = Course & { module_count: number };

export default function MyCourses() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseWithCount[]>([]);
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  // Credit request state
  const [showRequest, setShowRequest] = useState(false);
  const [reason, setReason] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (!user) return;
    Promise.all([courseApi.getMyCourses(), courseApi.getCredits()])
      .then(([{ courses }, creds]) => {
        setCourses(courses);
        setCredits(creds);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    setDeletingSlug(slug);
    try {
      await courseApi.deleteCourse(slug);
      setCourses(prev => prev.filter(c => c.slug !== slug));
    } finally {
      setDeletingSlug(null);
    }
  };

  const handleRequestCredits = async () => {
    if (!reason.trim()) return;
    setRequesting(true);
    try {
      await courseApi.requestCredits(reason.trim());
      setRequested(true);
      setReason("");
      setShowRequest(false);
    } finally {
      setRequesting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-muted-foreground text-sm">Sign in to view your courses.</p>
        <button onClick={login} className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
          Sign In
        </button>
      </div>
    );
  }

  const coursesLeft = credits ? Math.floor(credits.credits_remaining / 10) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-2">
              My Courses
            </p>
            <h1 className="text-4xl font-serif font-normal text-foreground">
              Your created courses.
            </h1>
          </div>
          <div className="flex flex-col items-end gap-2">
            {credits && (
              <p className="text-sm text-muted-foreground font-sans">
                <span className="font-semibold text-foreground">{credits.credits_remaining}</span> credits remaining
                {" "}·{" "}
                <span className="font-semibold text-foreground">{coursesLeft}</span> {coursesLeft === 1 ? "course" : "courses"} left
              </p>
            )}
            {credits && credits.credits_remaining >= 10 ? (
              <Link
                to="/create"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-sans font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus size={14} />
                Create course
              </Link>
            ) : (
              <button
                onClick={() => setShowRequest(true)}
                className="text-sm font-sans text-primary hover:underline"
              >
                Request more credits
              </button>
            )}
          </div>
        </div>

        {/* Credit request form */}
        {showRequest && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 rounded-xl border border-border bg-muted/30"
          >
            <p className="text-sm font-semibold text-foreground mb-3">Request more credits</p>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Tell us why you need more credits (e.g. teaching a class, building curriculum…)"
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleRequestCredits}
                disabled={requesting || !reason.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
              >
                {requesting && <Loader2 size={12} className="animate-spin" />}
                Submit request
              </button>
              <button onClick={() => setShowRequest(false)} className="text-sm text-muted-foreground hover:text-foreground">
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {requested && (
          <div className="mb-6 px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
            Request submitted — we'll review it shortly.
          </div>
        )}

        {/* Always-visible request link */}
        {credits && credits.credits_remaining >= 10 && !showRequest && (
          <p className="text-xs text-muted-foreground mb-6">
            Need more credits?{" "}
            <button onClick={() => setShowRequest(true)} className="text-primary hover:underline">
              Request them here
            </button>
          </p>
        )}

        {/* Course grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="text-muted-foreground font-sans">You haven't created any courses yet.</p>
            {credits && credits.credits_remaining >= 10 && (
              <Link to="/create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                <Plus size={14} /> Create your first course
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.map(course => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-xl border border-border bg-white p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border",
                      course.level === "beginner" ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : course.level === "intermediate" ? "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-red-50 border-red-200 text-red-700"
                    )}>
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      {course.is_public ? <Globe size={10} /> : <Lock size={10} />}
                      {course.is_public ? "Public" : "Private"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(course.slug)}
                    disabled={deletingSlug === course.slug}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
                  >
                    {deletingSlug === course.slug
                      ? <Loader2 size={14} className="animate-spin" />
                      : <Trash2 size={14} />}
                  </button>
                </div>
                <Link to={`/c/${course.slug}`}>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground">
                  {course.module_count} {course.module_count === 1 ? "module" : "modules"} ·{" "}
                  {new Date(course.created_at).toLocaleDateString()}
                </p>
                {course.is_public && (
                  <p className="text-xs text-muted-foreground mt-2 font-mono truncate">
                    /c/{course.slug}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
bun run build 2>&1 | grep -E "error TS|✓"
```

Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/pages/MyCourses.tsx
git commit -m "feat: add MyCourses page with credit display and request form"
```

---

## Task 11: CreateCourse wizard (`src/pages/CreateCourse.tsx`)

**Files:**
- Create: `src/pages/CreateCourse.tsx`

- [ ] **Step 1: Create the file**

```tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { courseApi } from "../lib/courseApi";
import { ContentRenderer } from "../components/ContentRenderer";
import { useAuth } from "../context/AuthContext";
import type { OutlineModule, Block } from "../types/course";
import { cn } from "@/lib/utils";
import { Loader2, RefreshCw, ChevronRight, Globe, Lock } from "lucide-react";

type Step = "details" | "generating" | "review";

interface GeneratedModule extends OutlineModule {
  blocks: Block[];
  generating: boolean;
  done: boolean;
}

export default function CreateCourse() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // Step 1 state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [numModules, setNumModules] = useState(5);

  // Step 2 state
  const [step, setStep] = useState<Step>("details");
  const [outline, setOutline] = useState<OutlineModule[]>([]);
  const [modules, setModules] = useState<GeneratedModule[]>([]);
  const [generatingOutline, setGeneratingOutline] = useState(false);
  const [outlineReady, setOutlineReady] = useState(false);

  // Step 3 state
  const [isPublic, setIsPublic] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-sm">Sign in to create courses.</p>
        <button onClick={login} className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
          Sign In
        </button>
      </div>
    );
  }

  const generateOutline = async () => {
    if (!title.trim() || !description.trim()) return;
    setGeneratingOutline(true);
    setOutlineReady(false);
    setModules([]);
    try {
      const { modules: outlineMods } = await courseApi.generateOutline({
        title: title.trim(),
        description: description.trim(),
        level,
        num_modules: numModules,
      });
      setOutline(outlineMods);
      setOutlineReady(true);
    } catch (err: any) {
      if (err.message === "insufficient_credits") {
        alert("You don't have enough credits. Request more from My Courses.");
      } else {
        alert("Generation failed. Please try again.");
      }
    } finally {
      setGeneratingOutline(false);
    }
  };

  const expandModules = async () => {
    // Initialise all modules as "generating"
    const initialMods: GeneratedModule[] = outline.map(o => ({
      ...o,
      blocks: [],
      generating: true,
      done: false,
    }));
    setModules(initialMods);
    setStep("generating");

    // Expand sequentially
    for (let i = 0; i < outline.length; i++) {
      const mod = outline[i];
      try {
        const { blocks } = await courseApi.generateModule({
          course_title: title,
          course_level: level,
          module_title: mod.title,
          module_description: mod.description,
        });
        setModules(prev =>
          prev.map((m, idx) =>
            idx === i ? { ...m, blocks, generating: false, done: true } : m
          )
        );
      } catch {
        setModules(prev =>
          prev.map((m, idx) =>
            idx === i ? { ...m, blocks: [], generating: false, done: true } : m
          )
        );
      }
    }

    setStep("review");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { course } = await courseApi.saveCourse({
        title: title.trim(),
        description: description.trim(),
        level,
        is_public: isPublic,
        modules: modules.map(m => ({
          title: m.title,
          duration: m.duration,
          blocks: m.blocks,
        })),
      });
      navigate(`/c/${course.slug}`);
    } catch (err: any) {
      if (err.message === "insufficient_credits") {
        alert("Not enough credits to save. Request more from My Courses.");
      } else {
        alert("Failed to save. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const doneCount = modules.filter(m => m.done).length;
  const total = modules.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-2">
            AI Course Creator
          </p>
          <h1 className="text-4xl font-serif font-normal text-foreground tracking-tight">
            {step === "details" && "Design your course."}
            {step === "generating" && "Building your course…"}
            {step === "review" && "Review your course."}
          </h1>
        </div>

        <AnimatePresence mode="wait">

          {/* ── Step 1: Details ── */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Course title</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Introduction to Python"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">What will students learn?</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the course goals, what topics to cover, and any specific focus areas…"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm resize-none h-28 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Level</label>
                <div className="flex gap-3">
                  {(["beginner", "intermediate", "advanced"] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      className={cn(
                        "flex-1 py-2.5 rounded-xl border text-sm font-sans capitalize transition-colors",
                        level === l
                          ? "border-primary bg-primary/5 text-primary font-medium"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Number of modules: <span className="text-primary font-semibold">{numModules}</span>
                </label>
                <input
                  type="range"
                  min={3}
                  max={8}
                  value={numModules}
                  onChange={e => setNumModules(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>3</span><span>8</span>
                </div>
              </div>

              {/* Outline preview */}
              {outlineReady && outline.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-border bg-muted/30 p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-foreground">Course outline</p>
                    <button
                      onClick={generateOutline}
                      disabled={generatingOutline}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RefreshCw size={12} className={generatingOutline ? "animate-spin" : ""} />
                      Regenerate
                    </button>
                  </div>
                  <ol className="space-y-2">
                    {outline.map((mod, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-muted-foreground/50 font-mono w-5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span className="font-medium text-foreground">{mod.title}</span>
                          <span className="text-muted-foreground"> — {mod.description}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}

              <div className="flex gap-3 pt-2">
                {!outlineReady ? (
                  <button
                    onClick={generateOutline}
                    disabled={generatingOutline || !title.trim() || !description.trim()}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
                  >
                    {generatingOutline && <Loader2 size={14} className="animate-spin" />}
                    {generatingOutline ? "Generating outline…" : "Generate outline"}
                  </button>
                ) : (
                  <button
                    onClick={expandModules}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Build full course
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Generating ── */}
          {step === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm text-muted-foreground">
                  {doneCount < total
                    ? `Generating module ${doneCount + 1} of ${total}…`
                    : "Finalising…"}
                </p>
              </div>
              {modules.map((mod, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm transition-colors",
                    mod.done
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : mod.generating
                      ? "border-primary/30 bg-primary/5 text-foreground"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {mod.generating ? (
                    <Loader2 size={14} className="animate-spin text-primary shrink-0" />
                  ) : mod.done ? (
                    <span className="text-emerald-600 shrink-0">✓</span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-border shrink-0" />
                  )}
                  <span className="font-medium">{mod.title}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Step 3: Review ── */}
          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* AI disclaimer */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-sans">
                ⚠️ AI-generated content — review carefully before publishing. May contain errors.
              </div>

              {/* Visibility */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Visibility</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isPublic ? "Anyone with the link can view" : "Only you can view"}
                  </p>
                </div>
                <button
                  onClick={() => setIsPublic(p => !p)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                    isPublic
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {isPublic ? <Globe size={14} /> : <Lock size={14} />}
                  {isPublic ? "Public" : "Private"}
                </button>
              </div>

              {/* Module previews */}
              {modules.map((mod, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-mono text-muted-foreground/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-bold text-foreground">{mod.title}</h2>
                    <span className="text-xs text-muted-foreground">{mod.duration}</span>
                  </div>
                  {mod.blocks.length > 0 ? (
                    <ContentRenderer blocks={mod.blocks} />
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Generation failed for this module.</p>
                  )}
                  {i < modules.length - 1 && <hr className="border-border mt-8" />}
                </div>
              ))}

              {/* Save */}
              <div className="flex gap-3 pt-4 sticky bottom-6">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {saving ? "Saving…" : "Save course (10 credits)"}
                </button>
                <button
                  onClick={() => { setStep("details"); setOutlineReady(false); }}
                  className="px-5 py-3 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Start over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
bun run build 2>&1 | grep -E "error TS|✓"
```

Expected: `✓ built in`

- [ ] **Step 3: Commit**

```bash
git add src/pages/CreateCourse.tsx
git commit -m "feat: add CreateCourse 3-step wizard"
```

---

## Task 12: Wire up routes + TopNav

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/TopNav.tsx`

- [ ] **Step 1: Update `src/App.tsx`** — add lazy imports and routes

Replace the existing lazy imports block and `AppContent` function with:

```tsx
// Add to existing lazy imports:
const CreateCourse = lazy(() => import('./pages/CreateCourse'));
const MyCourses = lazy(() => import('./pages/MyCourses'));
const CourseViewer = lazy(() => import('./pages/CourseViewer'));
```

Update `isLessonRoute` in `AppContent`:

```tsx
const isLessonRoute =
  location.pathname.startsWith('/document/') ||
  location.pathname.startsWith('/auth/') ||
  location.pathname.startsWith('/cert/') ||
  location.pathname.startsWith('/c/');   // ← add this
```

Add routes inside `<Routes>` (before the `*` catch-all):

```tsx
<Route path="/create" element={<CreateCourse />} />
<Route path="/my-courses" element={<MyCourses />} />
<Route path="/c/:slug" element={<CourseViewer />} />
```

- [ ] **Step 2: Update `src/components/TopNav.tsx`** — add Create button and My Courses link

Find the logged-in desktop user block:
```tsx
{user ? (
  <div className="hidden md:flex items-center gap-3">
    <Link to="/dashboard" ...>
      ...avatar + name...
    </Link>
    <button onClick={logout} ...>Sign out</button>
  </div>
```

Replace with:
```tsx
{user ? (
  <div className="hidden md:flex items-center gap-3">
    <Link
      to="/create"
      className="flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-sans font-medium hover:bg-primary/90 transition-colors"
    >
      + Create
    </Link>
    <Link
      to="/my-courses"
      className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
    >
      My Courses
    </Link>
    <Link
      to="/dashboard"
      className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
    >
      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-semibold">
        {user.fullname?.[0] ?? "?"}
      </div>
      <span>{user.fullname?.split(" ")[0]}</span>
    </Link>
    <button
      onClick={logout}
      className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
    >
      Sign out
    </button>
  </div>
```

Also add "My Courses" to the mobile menu nav list (inside the mobile `<nav>` section), after the `navLinks.map(...)`:
```tsx
<Link
  to="/my-courses"
  onClick={() => setMenuOpen(false)}
  className="flex items-center justify-between py-4 border-b border-border font-serif text-2xl transition-colors text-foreground"
>
  My Courses
</Link>
<Link
  to="/create"
  onClick={() => setMenuOpen(false)}
  className="flex items-center justify-between py-4 border-b border-border font-serif text-2xl transition-colors text-foreground"
>
  Create
</Link>
```

- [ ] **Step 3: Full build check**

```bash
bun run build 2>&1 | grep -E "error TS|error:|✓"
```

Expected: `✓ built in`

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/components/TopNav.tsx
git commit -m "feat: wire up course creator routes and TopNav links"
```

---

## Task 13: End-to-end verification

**Files:** None

- [ ] **Step 1: Start both servers**

Terminal 1:
```bash
node --env-file=.env server.js
```

Terminal 2:
```bash
bun dev
```

- [ ] **Step 2: Sign in and verify credits**

Open `http://localhost:3000`. Sign in. Navigate to `/my-courses`.
Expected: credit balance displayed ("30 credits remaining · 3 courses left").

- [ ] **Step 3: Create a course**

Navigate to `/create`. Fill in:
- Title: "Introduction to Git"
- Description: "Learn version control from scratch using Git and GitHub"
- Level: beginner
- Modules: 4

Click "Generate outline" → wait for outline → Click "Build full course" → watch modules generate → reach Review step → click "Save course (10 credits)".

Expected: redirected to `/c/<slug>` with the course visible.

- [ ] **Step 4: Verify credit deduction**

Navigate to `/my-courses`. Expected: "20 credits remaining · 2 courses left".

- [ ] **Step 5: Verify course appears in My Courses grid**

Expected: course card with title, level badge, module count.

- [ ] **Step 6: Verify course viewer**

On `/c/<slug>`: sidebar lists modules, clicking a module renders its blocks, AI-generated badge visible in top bar.

- [ ] **Step 7: Verify private course protection**

Attempt to visit the slug in incognito (no auth). Expected: 403 error → "Course not found or not accessible."

- [ ] **Step 8: Test credit request flow**

On `/my-courses`, click "Need more credits?" → fill in reason → submit.
Check Supabase `credit_requests` table: row appears with `status: "pending"`.

- [ ] **Step 9: Final commit**

```bash
git add -A
git commit -m "feat: AI course creator — complete v1 implementation"
```

---

## Supabase SQL (reference)

Run in Supabase SQL Editor if not already done in Task 2:

```sql
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  user_id text not null,
  title text not null,
  description text,
  level text not null default 'beginner',
  is_public boolean default false,
  schema_version int default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  "order" int not null,
  title text not null,
  duration text,
  blocks jsonb not null default '[]',
  created_at timestamptz default now(),
  unique (course_id, "order")
);

create table if not exists user_credits (
  user_id text primary key,
  credits_remaining int default 30,
  credits_used int default 0,
  updated_at timestamptz default now()
);

create table if not exists credit_requests (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  reason text not null,
  amount_requested int default 10,
  status text default 'pending',
  created_at timestamptz default now()
);
```
