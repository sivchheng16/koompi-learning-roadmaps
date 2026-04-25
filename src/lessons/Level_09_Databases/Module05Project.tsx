import React from "react";

export default function Module05Project() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ─────────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Reading about databases is useful. Designing one from scratch, under real
          constraints, is what actually builds the skill. In this project you will
          take a blog platform from requirements all the way to running queries on
          Supabase.
        </p>
      </section>

      {/* ── Requirements ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Step 1 — Requirements</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Before touching SQL, write down what the platform needs to do:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Users can create an account and log in.",
            "Logged-in users can write and publish posts.",
            "Posts have a title, body, and publication status (draft / published).",
            "Posts can be tagged with one or more tags.",
            "Anyone can read published posts.",
            "Only the author can edit or delete their own posts.",
            "The homepage shows published posts ordered by newest first.",
          ].map((req, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary font-mono shrink-0">{i + 1}.</span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Entity list ──────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Step 2 — Entities and relationships</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Read the requirements and underline the nouns — those become your tables.
          Then describe how they relate.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-border">
                <th className="text-left px-5 py-3 text-foreground font-semibold">Entity</th>
                <th className="text-left px-5 py-3 text-foreground font-semibold">Relates to</th>
                <th className="text-left px-5 py-3 text-foreground font-semibold">Relationship</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["users", "posts", "One user → many posts"],
                ["posts", "users", "One post → one author"],
                ["posts", "tags", "Many posts ↔ many tags (join table)"],
                ["tags", "posts", "One tag → many posts"],
              ].map(([e, r, rel]) => (
                <tr key={`${e}-${r}`}>
                  <td className="px-5 py-3 text-foreground font-mono">{e}</td>
                  <td className="px-5 py-3 text-foreground font-mono">{r}</td>
                  <td className="px-5 py-3 text-muted-foreground">{rel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── CREATE TABLE SQL ─────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Step 3 — CREATE TABLE SQL</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Paste this into the Supabase SQL editor and run it. The order matters —
          referenced tables must exist before the referencing table.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`-- 1. Users (Supabase Auth handles auth.users; extend with a profile table)
CREATE TABLE public.profiles (
  id         UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username   TEXT        NOT NULL UNIQUE,
  bio        TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tags
CREATE TABLE public.tags (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Posts
CREATE TABLE public.posts (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title       TEXT        NOT NULL,
  body        TEXT        NOT NULL DEFAULT '',
  published   BOOLEAN     NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  deleted_at  TIMESTAMPTZ,                    -- soft delete
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Join table
CREATE TABLE public.post_tags (
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id  UUID NOT NULL REFERENCES public.tags(id)  ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);`}
        </pre>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`-- Indexes
CREATE INDEX posts_user_id_idx     ON public.posts(user_id);
CREATE INDEX posts_created_at_idx  ON public.posts(created_at DESC);
CREATE INDEX post_tags_tag_id_idx  ON public.post_tags(tag_id);

-- Auto-update updated_at trigger (reuse for both tables)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();`}
        </pre>
      </section>

      {/* ── RLS policies ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Step 4 — Row Level Security policies</h2>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`-- Enable RLS on all public tables
ALTER TABLE public.profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- profiles: anyone can read, only the owner can update
CREATE POLICY "profiles: public read"
  ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles: owner update"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- posts: anyone can read published, not-deleted posts
CREATE POLICY "posts: public read"
  ON public.posts FOR SELECT
  USING (published = true AND deleted_at IS NULL);

-- posts: owner can read their own drafts and deleted posts
CREATE POLICY "posts: owner read all"
  ON public.posts FOR SELECT
  USING (auth.uid() = user_id);

-- posts: owner can insert / update / delete their own posts
CREATE POLICY "posts: owner insert"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "posts: owner update"
  ON public.posts FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "posts: owner delete"
  ON public.posts FOR DELETE
  USING (auth.uid() = user_id);

-- tags: anyone can read, only authenticated users can insert
CREATE POLICY "tags: public read"
  ON public.tags FOR SELECT USING (true);
CREATE POLICY "tags: auth insert"
  ON public.tags FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- post_tags: follow the post's permissions
CREATE POLICY "post_tags: public read"
  ON public.post_tags FOR SELECT USING (true);
CREATE POLICY "post_tags: owner insert"
  ON public.post_tags FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM public.posts WHERE id = post_id)
  );`}
        </pre>
      </section>

      {/* ── Query examples ───────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Step 5 — Query examples</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          With the schema in place, these are the queries the frontend will use most.
        </p>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Homepage: published posts with author and tags</p>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`const { data: posts } = await supabase
  .from('posts')
  .select(\`
    id, title, body, published_at, created_at,
    profiles(username, bio),
    post_tags(tags(name))
  \`)
  .eq('published', true)
  .is('deleted_at', null)
  .order('created_at', { ascending: false })
  .limit(20);`}
          </pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Author dashboard: own posts including drafts</p>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`const { data: myPosts } = await supabase
  .from('posts')
  .select('id, title, published, created_at, updated_at')
  .eq('user_id', user.id)
  .is('deleted_at', null)
  .order('updated_at', { ascending: false });`}
          </pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Publish a post</p>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`const { error } = await supabase
  .from('posts')
  .update({ published: true, published_at: new Date().toISOString() })
  .eq('id', postId)
  .eq('user_id', user.id); // RLS double-checks this`}
          </pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Soft delete a post</p>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`const { error } = await supabase
  .from('posts')
  .update({ deleted_at: new Date().toISOString() })
  .eq('id', postId)
  .eq('user_id', user.id);`}
          </pre>
        </div>
      </section>

      {/* ── Stretch challenges ───────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Stretch challenges</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The core schema works. These extensions will test your understanding of
          the concepts from this track.
        </p>
        <div className="space-y-4">
          {[
            [
              "Comments",
              "Add a comments table. A comment belongs to a post and a user. Users can only edit or delete their own comments. Posts and comments should cascade-delete together.",
            ],
            [
              "Reactions",
              "Add a post_reactions table with a type column (like, heart, etc). A user can only add one reaction of each type per post — enforce this with a unique constraint on (post_id, user_id, type).",
            ],
            [
              "Drafts",
              "Add a scheduled_at column to posts. Write a query that returns all posts where scheduled_at <= NOW() and published = false — these are posts ready to go live. In production you would run this on a cron job.",
            ],
            [
              "Full-text search",
              "PostgreSQL has built-in full-text search. Add a tsvector column to posts, index it with GIN, and write a query using to_tsquery to search post titles and bodies.",
            ],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-xl border border-border px-5 py-4 space-y-1">
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">What you just built</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          You went from a plain-English requirement list to a production-ready PostgreSQL
          schema: normalised tables, foreign keys, indexes, soft deletes, timestamps,
          Row Level Security, and a set of queries the frontend can use directly.
          The same process — requirements, entities, SQL, RLS, queries — applies to
          every feature you will ever build.
        </p>
      </section>

    </article>
  );
}
