import React from "react";

export default function Module03Supabase() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ─────────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Supabase gives you a full PostgreSQL database, an auto-generated REST API,
          authentication, realtime subscriptions, and file storage — without running
          a single server. You can go from zero to a working backend in ten minutes.
        </p>
      </section>

      {/* ── What Supabase is ─────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">What Supabase actually is</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Supabase is not a proprietary database. It is a hosted PostgreSQL instance
          with a set of open-source tools layered on top:
        </p>
        <ul className="space-y-3">
          {[
            ["PostgreSQL", "A real, full-featured relational database. Everything from Module 2 works here."],
            ["Auto-generated API", "Every table gets a REST endpoint automatically. The JS client talks to this API under the hood."],
            ["Auth", "User sign-up, login, OAuth (Google, GitHub). Auth state is available in Row Level Security policies."],
            ["Realtime", "Subscribe to database changes over a WebSocket — live feeds, collaborative editing, notifications."],
            ["Storage", "Object storage for files and images, with the same RLS model as the database."],
          ].map(([term, desc]) => (
            <li key={term} className="flex gap-4">
              <span className="text-primary font-mono text-sm shrink-0 pt-0.5 w-28">{term}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Setup ────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Setup</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-none">
          {[
            "Create a free project at supabase.com — choose a region close to your users.",
            "In Settings → API, copy your Project URL and your anon / public key.",
            "Install the JS client in your project:",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary font-mono shrink-0 font-semibold">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`npm install @supabase/supabase-js`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Create a single client instance and export it for use across your app:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);`}
        </pre>
      </section>

      {/* ── Querying ─────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Querying with the JS client</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The client methods map almost directly to SQL concepts.
          Every call returns <code className="text-foreground font-mono">{"{ data, error }"}</code> —
          always check <code className="text-foreground font-mono">error</code> before using <code className="text-foreground font-mono">data</code>.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// SELECT — fetch posts for a user, newest first
const { data, error } = await supabase
  .from('posts')
  .select('id, title, created_at')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(20);

if (error) throw error;
console.log(data); // Post[]

// SELECT with a JOIN (Supabase foreign key syntax)
const { data: posts } = await supabase
  .from('posts')
  .select('title, users(name, email)')
  .eq('published', true);`}
        </pre>

        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// INSERT — create a new post
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'Hello world', user_id: userId })
  .select()   // return the created row
  .single();  // unwrap the array to a single object

// UPDATE — publish a post
const { error } = await supabase
  .from('posts')
  .update({ published: true })
  .eq('id', postId)
  .eq('user_id', userId); // safety: only the owner can update

// DELETE — remove a post
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId);`}
        </pre>
      </section>

      {/* ── RLS ──────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Row Level Security — the feature you cannot skip</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          By default, any request to your Supabase API with the anon key can read{" "}
          <em>every row in every table</em>. Row Level Security (RLS) changes that:
          you write policies that describe what each user is allowed to see or do,
          and the database enforces them automatically.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Enable RLS on a table, then write policies in the Supabase dashboard
          (Table Editor → RLS) or via the SQL editor:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`-- Enable RLS on posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- Users can only read their own drafts
CREATE POLICY "read own drafts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert rows where user_id matches their own ID
CREATE POLICY "insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own posts
CREATE POLICY "update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="text-foreground font-mono">auth.uid()</code> is a Supabase function
          that returns the ID of the currently authenticated user. If the user is not
          logged in, it returns NULL — so the policy denies the row automatically.
        </p>
      </section>

      {/* ── Key distinction ──────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Anon key vs service role key</h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-border px-5 py-4 space-y-1">
            <p className="text-sm font-semibold text-foreground">Anon key (safe for the browser)</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is what you put in your frontend app. Requests made with it go through
              RLS policies. A user can only see what their policies allow. Safe to expose.
            </p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 space-y-1">
            <p className="text-sm font-semibold text-red-800">Service role key (server only — never expose)</p>
            <p className="text-sm text-red-700 leading-relaxed">
              This key bypasses RLS entirely — it can read and write everything in the
              database. It belongs in a server-side environment variable only. Never put
              it in a browser app, a frontend repo, or a public commit.
            </p>
          </div>
        </div>
      </section>

      {/* ── SQL editor ───────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">The SQL editor</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Supabase has a full SQL editor in the dashboard (under SQL Editor in the
          left sidebar). Use it to:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary shrink-0">→</span> Run migrations (CREATE TABLE, ALTER TABLE, CREATE INDEX)</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">→</span> Inspect data during development</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">→</span> Write and test complex queries before putting them in code</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">→</span> Create RLS policies and functions</li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          Saved queries in the SQL editor act as lightweight migration history.
          For serious projects, use proper migration files (Supabase CLI or a migration
          tool) so your schema changes are tracked in version control.
        </p>
      </section>

    </article>
  );
}
