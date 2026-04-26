import React from "react";

export default function Module03ServerComponents() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Server Components</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Most of the JavaScript you send to users today doesn't need to run in the browser. Server Components change the default — components render on the server and ship zero JavaScript to the client unless you explicitly ask for it.
        </p>
      </section>

      {/* What are Server Components */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Server Components — the new default</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every component inside <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">app/</code> is a Server Component by default. It runs on the server, produces HTML, and that HTML is sent to the browser. No component code, no React runtime, no hydration cost — unless you opt in.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Because they run on the server, Server Components can do things that are impossible in the browser: query a database directly, read files from disk, use secret environment variables, call internal services that never touch the public internet.
        </p>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-[#2a2a2a] text-[#6c7086] text-xs">app/posts/page.tsx — Server Component</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// No 'use client' — this is a Server Component
// Can be async, can use secrets, sends zero JS to browser

import { db } from '@/lib/db';

export default async function PostsPage() {
  // Direct database query — impossible in a browser component
  const posts = await db.query('SELECT id, title FROM posts');

  return (
    <ul className="space-y-2 p-8">
      {posts.map(post => (
        <li key={post.id} className="text-lg">{post.title}</li>
      ))}
    </ul>
  );
}`}</pre>
        </div>
      </section>

      {/* Client Components */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Client Components — opt in with <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono">'use client'</code></h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Adding <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">'use client'</code> as the very first line of a file marks it as a Client Component. It runs in the browser, gets hydrated, and can use all the React features you're used to: <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">useState</code>, <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">useEffect</code>, event handlers, browser APIs.
        </p>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-[#2a2a2a] text-[#6c7086] text-xs">components/Counter.tsx — Client Component</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`'use client'; // ← must be the very first line

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(c => c + 1)}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Clicked {count} times
    </button>
  );
}`}</pre>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Capability</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Server Component</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Client Component</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["async / await", "Yes", "No"],
                ["Query database directly", "Yes", "No"],
                ["Read secret env vars", "Yes", "No"],
                ["useState / useEffect", "No", "Yes"],
                ["onClick / onChange", "No", "Yes"],
                ["localStorage / window", "No", "Yes"],
                ["JavaScript sent to browser", "None", "Yes"],
              ].map(([cap, server, client]) => (
                <tr key={cap} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 text-foreground font-medium">{cap}</td>
                  <td className={`px-4 py-3 font-medium ${server === "Yes" ? "text-green-600" : "text-red-500"}`}>{server}</td>
                  <td className={`px-4 py-3 font-medium ${client === "Yes" ? "text-green-600" : "text-red-500"}`}>{client}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mental model */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">The mental model</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Think of it like classic server-rendered apps — PHP, Rails, Django — but still React. The server renders HTML that is already populated with data. The browser displays it instantly. Client Components layer interactivity on top, exactly where needed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {[
            {
              step: "1. Server",
              color: "border-violet-200 bg-violet-50",
              title: "Renders HTML",
              desc: "Server Components run, fetch data, and produce HTML. Zero JS shipped.",
            },
            {
              step: "2. Browser",
              color: "border-blue-200 bg-blue-50",
              title: "Displays HTML",
              desc: "The user sees content immediately — no blank screen while JS loads.",
            },
            {
              step: "3. Hydration",
              color: "border-emerald-200 bg-emerald-50",
              title: "Adds interactivity",
              desc: "Client Components hydrate and wire up event listeners in the browser.",
            },
          ].map(({ step, color, title, desc }) => (
            <div key={step} className={`rounded-xl border p-4 space-y-1 ${color}`}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{step}</p>
              <p className="font-semibold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* When to use 'use client' */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">When to add <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono">'use client'</code></h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The rule is simple: start without it. Add <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">'use client'</code> only when your component genuinely needs one of these:
        </p>
        <div className="space-y-3">
          {[
            {
              need: "State or effects",
              example: "useState, useReducer, useEffect, useRef",
            },
            {
              need: "Event handlers",
              example: "onClick, onChange, onSubmit, onKeyDown",
            },
            {
              need: "Browser-only APIs",
              example: "localStorage, sessionStorage, window, navigator",
            },
            {
              need: "Third-party client libraries",
              example: "animation libraries, chart libraries that attach to the DOM",
            },
          ].map(({ need, example }) => (
            <div key={need} className="flex gap-3 items-start px-5 py-4 rounded-xl border border-border bg-stone-50">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{need}</p>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">{example}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Everything else — displaying data, rendering lists, laying out pages, building navigation — can and should stay as a Server Component.
        </p>
      </section>

      {/* Composition pattern */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Composition pattern — server wraps client</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Server Components can import and render Client Components. This is the primary composition pattern: the server does the heavy lifting (data fetching, secrets), then passes serialisable data down as props to interactive client leaves.
        </p>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-[#2a2a2a] text-[#6c7086] text-xs">app/posts/page.tsx — server wraps client</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// ServerPage.tsx (Server Component — no 'use client')
import LikeButton from './LikeButton'; // 'use client'

export default async function PostPage({ params }: { params: { id: string } }) {
  // Can query the database here — impossible in a Client Component
  const post = await db.getPosts(params.id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {/* Pass serialisable data as props to the client component */}
      <LikeButton postId={post.id} initialLikes={post.likes} />
    </article>
  );
}`}</pre>
        </div>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-[#2a2a2a] text-[#6c7086] text-xs">components/LikeButton.tsx — Client Component</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`'use client';

import { useState } from 'react';

export default function LikeButton({
  postId,
  initialLikes,
}: {
  postId: string;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <button onClick={() => setLikes(l => l + 1)}>
      {likes} likes
    </button>
  );
}`}</pre>
        </div>
        <div className="px-5 py-4 rounded-xl border border-amber-200 bg-amber-50">
          <p className="text-sm font-semibold text-amber-800">Props must be serialisable</p>
          <p className="text-xs text-amber-700 mt-1 leading-relaxed">
            Server Components pass props across the server/client boundary. Only values that can be serialised to JSON work: strings, numbers, booleans, plain objects, arrays. You cannot pass functions, class instances, or Dates directly.
          </p>
        </div>
      </section>

      {/* The boundary rule */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">The boundary rule — keep <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono">'use client'</code> at the leaves</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Once a file has <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">'use client'</code>, every module it imports is also treated as a Client Component — even if those modules don't explicitly say so. The client boundary propagates downward through the import tree.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-200 overflow-hidden">
            <div className="px-4 py-2 bg-red-50 border-b border-red-200 text-xs font-medium text-red-700">Avoid — 'use client' too high</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`// app/layout.tsx
'use client'; // ❌ now every child is client

// This kills Server Component benefits
// for the entire subtree`}</pre>
          </div>
          <div className="rounded-xl border border-green-200 overflow-hidden">
            <div className="px-4 py-2 bg-green-50 border-b border-green-200 text-xs font-medium text-green-700">Prefer — push to the leaf</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`// app/layout.tsx — no directive, stays server

// Only the interactive button is client:
// components/MobileMenuButton.tsx
'use client'; // ✅ only this small component`}</pre>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The goal is to keep the client boundary as deep (small) as possible. A large server tree with a few client leaves at the bottom is the optimal structure.
        </p>
      </section>

      {/* Common mistakes */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Common mistakes</h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">Mistake 1 — 'use client' on every file</div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`// ❌ This defeats the purpose of the App Router entirely.
// You lose server-side data fetching, bundle size benefits,
// and end up with a standard React SPA inside Next.js.
'use client';
export default function StaticAboutPage() { ... }`}</pre>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">Mistake 2 — importing server-only packages in a client component</div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`'use client';
import { db } from '@/lib/db'; // ❌ db uses Node.js — crashes in browser
import fs from 'fs';           // ❌ fs does not exist in browser

// The build may succeed but the app will throw at runtime.`}</pre>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">Mistake 3 — trying to async/await in a client component</div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`'use client';
// ❌ Client Components cannot be async functions.
export default async function Page() {
  const data = await fetch('/api/posts'); // won't work as intended
  ...
}
// Fix: do the fetch in a Server Component parent and pass data as props.`}</pre>
          </div>
        </div>
      </section>

      {/* server-only package */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Guarding server code — <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono">server-only</code></h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">server-only</code> package is a compile-time guard. Import it at the top of any module that must never run in the browser — database helpers, secret readers, internal API clients. If a Client Component ever imports that module (directly or transitively), the build fails with a clear error message.
        </p>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-[#2a2a2a] text-[#6c7086] text-xs">lib/db.ts — guaranteed server-only</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import 'server-only'; // throws at build time if imported by a Client Component

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // secret — safe here
});

export const db = {
  query: (sql: string) => pool.query(sql),
};`}</pre>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install it with <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">npm install server-only</code>. There is a matching <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">client-only</code> package for the reverse: modules that must never run on the server (anything that touches <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">window</code>, for example).
        </p>
      </section>

      {/* Summary */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Summary</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Concept</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Key point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Server Component", "Default in app/. Runs on server. Zero JS to browser. Can be async."],
                ["Client Component", "'use client' at top. Runs in browser. Required for hooks and events."],
                ["Composition", "Server wraps client, passes serialisable props across the boundary."],
                ["Boundary rule", "Once you go client, all imports are also client. Push the boundary down."],
                ["server-only", "import 'server-only' — build error if a Client Component imports it."],
              ].map(([concept, point]) => (
                <tr key={concept} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground font-semibold">{concept}</td>
                  <td className="px-4 py-3 text-muted-foreground">{point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </article>
  );
}
