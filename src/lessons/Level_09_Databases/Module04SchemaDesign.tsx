import React from "react";

export default function Module04SchemaDesign() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ─────────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          A bad schema is technical debt that compounds. The wrong column type, a missing
          index, or a repeated piece of data will create bugs and slow queries for the
          entire life of the project. Design it right once and it becomes invisible.
        </p>
      </section>

      {/* ── Normalisation ────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Normalisation — store each fact once</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The core principle of relational design: every piece of information should
          live in exactly one place. When the same data is duplicated, it gets out of
          sync — one copy is updated and the other is not.
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-red-800">Bad — author name repeated in every post</p>
            <pre className="font-mono text-xs text-red-700 leading-relaxed overflow-x-auto">
{`posts: id | title           | author_name | author_email
      ----+-----------------+-------------+-----------------
       1  | My first post   | Alice       | alice@example.com
       2  | Another post    | Alice       | alice@example.com`}
            </pre>
            <p className="text-xs text-red-700">Change Alice's email → you must update every post row.</p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-green-800">Good — author data lives once in users</p>
            <pre className="font-mono text-xs text-green-700 leading-relaxed overflow-x-auto">
{`users: id | name  | email
      ----+-------+-----------------
       1  | Alice | alice@example.com

posts: id | user_id | title
      ----+---------+---------------
       1  |    1    | My first post
       2  |    1    | Another post`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── 1-to-many ────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">One-to-many relationships</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A user has many posts. A post belongs to one user. The foreign key goes on
          the "many" side — <code className="text-foreground font-mono">posts.user_id</code> references
          <code className="text-foreground font-mono"> users.id</code>.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`CREATE TABLE posts (
  id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title   TEXT NOT NULL
);

-- Index the foreign key or every JOIN will scan the table
CREATE INDEX posts_user_id_idx ON posts(user_id);`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="text-foreground font-mono">ON DELETE CASCADE</code> means: when a
          user is deleted, all their posts are automatically deleted too. Other options
          are <code className="text-foreground font-mono">ON DELETE SET NULL</code> (keep the
          post, clear the author) and <code className="text-foreground font-mono">ON DELETE RESTRICT</code>{" "}
          (block deletion if any posts exist).
        </p>
      </section>

      {/* ── Many-to-many ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Many-to-many relationships</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A post can have many tags. A tag can belong to many posts. There is no single
          foreign key that can model this — you need a <strong className="text-foreground">join table</strong>.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`CREATE TABLE tags (
  id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE post_tags (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id  UUID NOT NULL REFERENCES tags(id)  ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)  -- composite PK prevents duplicates
);

-- Query: all tags for a post
SELECT tags.name
FROM   post_tags
JOIN   tags ON tags.id = post_tags.tag_id
WHERE  post_tags.post_id = $1;`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The composite primary key on <code className="text-foreground font-mono">(post_id, tag_id)</code>{" "}
          prevents the same tag from being added to the same post twice.
        </p>
      </section>

      {/* ── Primary keys ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Choosing primary keys: UUID vs serial</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-border">
                <th className="text-left px-5 py-3 text-foreground font-semibold"></th>
                <th className="text-left px-5 py-3 text-foreground font-semibold">UUID</th>
                <th className="text-left px-5 py-3 text-foreground font-semibold">Serial integer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Globally unique", "Yes — safe to generate in the browser or across services", "No — only unique within one database"],
                ["Information leakage", "None — IDs are not guessable", "/users/1 reveals your first user exists"],
                ["Size", "16 bytes", "4–8 bytes"],
                ["Default in Supabase", "gen_random_uuid()", "GENERATED ALWAYS AS IDENTITY"],
                ["Best for", "Public APIs, distributed systems, auth", "Internal joins, simple schemas, analytics"],
              ].map(([aspect, uuid, serial]) => (
                <tr key={aspect}>
                  <td className="px-5 py-3 text-foreground font-medium">{aspect}</td>
                  <td className="px-5 py-3 text-muted-foreground">{uuid}</td>
                  <td className="px-5 py-3 text-muted-foreground">{serial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          When in doubt, use UUID. The security benefits outweigh the size cost on
          any table that users will ever interact with.
        </p>
      </section>

      {/* ── Indexes ──────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Indexes</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          An index is a separate data structure that maps column values to row locations.
          Reads on indexed columns go from O(n) to O(log n). The trade-off: each index
          slows down writes slightly and uses storage.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`-- Index every foreign key (PostgreSQL does NOT do this automatically)
CREATE INDEX posts_user_id_idx ON posts(user_id);

-- Index columns you filter on frequently
CREATE INDEX users_email_idx    ON users(email);
CREATE UNIQUE INDEX users_username_idx ON users(username);

-- Index timestamps you order by
CREATE INDEX posts_created_at_idx ON posts(created_at DESC);`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          A rule of thumb: index foreign keys, email, username, and any timestamp
          column that appears in an <code className="text-foreground font-mono">ORDER BY</code>.
          Do not blindly index every column — on write-heavy tables the overhead adds up.
        </p>
      </section>

      {/* ── Timestamps ───────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Timestamps on everything</h2>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`CREATE TABLE posts (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  -- ... other columns ...
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on every UPDATE via a trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          You will always want to know when something was created and last changed.
          Add these columns to every table, even if you cannot think of a use for them
          today.
        </p>
      </section>

      {/* ── Soft delete ──────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Soft delete</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Instead of <code className="text-foreground font-mono">DELETE FROM posts WHERE id = $1</code>,
          set a <code className="text-foreground font-mono">deleted_at</code> timestamp.
          The row stays in the database — you can undo deletions, audit history, and
          avoid orphaned foreign keys.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`-- Add to table
ALTER TABLE posts ADD COLUMN deleted_at TIMESTAMPTZ;

-- Soft delete a post
UPDATE posts SET deleted_at = NOW() WHERE id = $1;

-- All active queries must filter deleted rows
SELECT * FROM posts WHERE deleted_at IS NULL;

-- Restore
UPDATE posts SET deleted_at = NULL WHERE id = $1;`}
        </pre>
      </section>

      {/* ── Schema smells ────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Schema smells to avoid</h2>
        <div className="space-y-4">
          {[
            [
              "Storing lists in a text column",
              'tags TEXT DEFAULT \'\' storing "react,databases,sql". You cannot query individual tags, index them, or enforce referential integrity. Use a join table.',
            ],
            [
              "Overloading a column with different types",
              'A "value" column that sometimes holds a price (number), sometimes a name (text), sometimes a date. One column, one type.',
            ],
            [
              "No index on foreign keys",
              "PostgreSQL does not auto-create indexes for foreign keys. Every JOIN on an un-indexed foreign key does a sequential scan.",
            ],
            [
              "Missing NOT NULL",
              "Nullable columns should be a deliberate choice. If a column must always have a value, add NOT NULL so the database enforces it.",
            ],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-xl border border-border px-5 py-4 space-y-1">
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </article>
  );
}
