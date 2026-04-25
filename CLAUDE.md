# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # start dev server (Vite)
bun run build  # type-check + production build
bun run lint   # TypeScript type-check only (no ESLint)
bun preview    # preview production build locally
```

No test suite exists in this project.

## Environment

Copy `.env.example` to `.env` and fill in values. Required vars:

- `VITE_API_URL` — backend REST API base URL (defaults to `http://localhost:5000`)
- `VITE_FIREBASE_*` — Firebase config (optional; app degrades gracefully if absent)

## Architecture

**Stack:** React 19 + Vite + TypeScript + Tailwind CSS + React Router v7. No SSR — pure SPA served via Nginx (see `Dockerfile`).

**Routing** (`src/App.tsx`):
- `/` `/home` → Home
- `/portfolio` → Portfolio (projects grid + ProjectModal)
- `/about` `/services` → static pages
- `/vault` → GamePortal (iframe-embedded games)
- `/document/:topicId` → auto-redirects to first lesson
- `/document/:topicId/:moduleId` → TopicDetails (lesson viewer)

**Layout:** `TopNav` is a sticky top bar (64px) shown on all marketing routes. Lesson viewer (`/document/*`) hides TopNav — instead `CourseTopicNavbar` (sticky topic switcher) + desktop `LessonSidebar` (300px left panel) handle navigation. `LayoutContext` tracks `isMobileSidebarOpen` (used by `CourseTopicNavbar` mobile button).

**Lesson system** (`src/lessons/`):
- Lesson content lives in `src/lessons/Level_NN_*/` as React components (`.tsx`)
- `src/lessons/lessonRegistry.ts` maps kebab-case lesson IDs to lazy-loaded components
- `src/constants.ts` → `TOPICS` array defines the curriculum: topics → lessons (id, title, duration)
- The ID convention: `{topic-id}-{moduleFilenameWithoutExt}` lowercased (e.g. `html-module01gettingstarted`)
- **To add a lesson:** create the component file, add it to `lessonRegistry.ts`, add an entry to the `lessons` array in `TOPICS`

**Auth** (`src/context/AuthContext.tsx` + `src/lib/kidAuth.ts`):
- **KID OAuth** (KOOMPI ID) — sovereign OAuth 2.0 at `oauth.koompi.org`, PKCE flow, no client secret in browser
- SDK: `@koompi/oauth` → `KoompiAuth` class. `login()` redirects to KID; `/auth/callback` exchanges code for tokens
- User shape from KID: `{ _id, fullname, email, wallet_address }` — note `fullname` not `firstName/lastName`
- Tokens stored in `localStorage`: `kid_access_token`, `kid_refresh_token`, `kid_user`
- Env vars: `VITE_KID_CLIENT_ID`, `VITE_KID_REDIRECT_URI` — register app at `dash.koompi.org`
- Browsing is fully open (no auth required). Progress saving prompts sign-in non-intrusively.

**Progress** (`src/lib/progressApi.ts` + `src/context/ProgressContext.tsx`):
- localStorage-backed, shape: `{ completed: Record<lessonId, LessonProgress>, lastViewed: LastViewed | null }`
- `markComplete(lessonId, topicId)` called by "Complete & Next" button in `TopicDetails`
- `setLastViewed(lessonId, topicId)` called on lesson mount
- `ProgressProvider` wraps the whole app; `useProgress()` hook used by Dashboard + LessonSidebar + TopicDetails

**Static data** (`src/constants.ts`): `PROJECTS`, `GAMES`, `TOPICS`, `categories` — all hardcoded, no CMS.

**UI primitives:** Radix UI + shadcn/ui pattern (`src/components/ui/`). Animations via `motion/react` (Framer Motion v12). Smooth scroll via `lenis`.

**Path alias:** `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.json`).
