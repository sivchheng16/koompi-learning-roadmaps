import React from "react";

export default function Module02SQLFundamentals() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ─────────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          SQL was standardised in 1986. It runs inside PostgreSQL, MySQL, SQLite,
          Supabase, BigQuery, and dozens of others. Learn it once and you can talk to
          almost any database on the planet.
        </p>
      </section>

      {/* ── SELECT ───────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">SELECT — reading data</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The most common operation. Read specific columns, filter rows, sort the result,
          and limit how many rows come back.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`SELECT name, email
FROM   users
WHERE  active = true
ORDER  BY name
LIMIT  10;`}
        </pre>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><code className="text-foreground font-mono">WHERE</code> — filters rows before they are returned</li>
          <li><code className="text-foreground font-mono">ORDER BY</code> — sorts ascending by default; append <code className="text-foreground font-mono">DESC</code> for descending</li>
          <li><code className="text-foreground font-mono">LIMIT</code> — caps the result set; always use it on large tables</li>
        </ul>
      </section>

      {/* ── INSERT ───────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">INSERT — creating rows</h2>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`INSERT INTO users (name, email, active)
VALUES ('Alice', 'alice@example.com', true);

-- Insert multiple rows at once
INSERT INTO users (name, email, active)
VALUES
  ('Bob',   'bob@example.com',   true),
  ('Carol', 'carol@example.com', false);`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Columns with defaults (like <code className="text-foreground font-mono">created_at DEFAULT NOW()</code>)
          do not need to be listed — the database fills them in.
        </p>
      </section>

      {/* ── UPDATE ───────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">UPDATE — modifying rows</h2>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`UPDATE users
SET    last_login = NOW(),
       login_count = login_count + 1
WHERE  id = 42;`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The <code className="text-foreground font-mono">WHERE</code> clause is critical.
          An UPDATE without WHERE updates <em>every row in the table</em>. Always double-check
          it before running.
        </p>
      </section>

      {/* ── DELETE ───────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">DELETE — removing rows</h2>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`DELETE FROM users
WHERE  id = 42;

-- Always WHERE. This deletes every row:
-- DELETE FROM users;  ← do not do this`}
        </pre>
      </section>

      {/* ── JOINs ────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">JOINs — the most important concept</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Data lives in separate tables. JOINs combine them. This is the central idea
          of relational databases.
        </p>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">INNER JOIN — only rows that match in both tables</p>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`SELECT users.name, posts.title
FROM   posts
INNER  JOIN users ON users.id = posts.user_id;
-- Users with no posts do NOT appear`}
          </pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">LEFT JOIN — all rows from the left table, matching rows from the right (or NULL)</p>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`SELECT users.name, posts.title
FROM   users
LEFT   JOIN posts ON posts.user_id = users.id;
-- Users with no posts appear with posts.title = NULL`}
          </pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Real-world example: posts with author name and post count</p>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`SELECT
  users.name      AS author,
  posts.title,
  posts.created_at
FROM   posts
INNER  JOIN users ON users.id = posts.user_id
WHERE  users.active = true
ORDER  BY posts.created_at DESC
LIMIT  20;`}
          </pre>
        </div>
      </section>

      {/* ── GROUP BY + aggregates ────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">GROUP BY and aggregates</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Aggregate functions collapse many rows into one value per group.
          Common ones: <code className="text-foreground font-mono">COUNT</code>,{" "}
          <code className="text-foreground font-mono">SUM</code>,{" "}
          <code className="text-foreground font-mono">AVG</code>,{" "}
          <code className="text-foreground font-mono">MAX</code>,{" "}
          <code className="text-foreground font-mono">MIN</code>.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`-- How many posts per user?
SELECT   user_id, COUNT(*) AS post_count
FROM     posts
GROUP BY user_id
ORDER BY post_count DESC;

-- Only users with more than 5 posts (HAVING filters groups)
SELECT   user_id, COUNT(*) AS post_count
FROM     posts
GROUP BY user_id
HAVING   COUNT(*) > 5;`}
        </pre>
      </section>

      {/* ── Subqueries ───────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Subqueries</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A SELECT inside another SELECT. Useful when a JOIN would be awkward or when
          you want to filter based on the result of another query.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`-- All posts by active users
SELECT *
FROM   posts
WHERE  user_id IN (
  SELECT id
  FROM   users
  WHERE  active = true
);`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          A JOIN often performs better than an <code className="text-foreground font-mono">IN</code> subquery
          on large tables, but the subquery form is easier to read when you are first
          writing it. Optimise later if needed.
        </p>
      </section>

      {/* ── CREATE TABLE ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">CREATE TABLE — defining structure</h2>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`CREATE TABLE users (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL UNIQUE,
  active     BOOLEAN     NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      TEXT        NOT NULL,
  body       TEXT        NOT NULL DEFAULT '',
  published  BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}
        </pre>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><code className="text-foreground font-mono">TEXT</code> — variable-length string, no arbitrary limit needed in PostgreSQL</li>
          <li><code className="text-foreground font-mono">BOOLEAN</code> — true / false</li>
          <li><code className="text-foreground font-mono">TIMESTAMPTZ</code> — timestamp with time zone (always prefer over TIMESTAMP)</li>
          <li><code className="text-foreground font-mono">UUID</code> — universally unique identifier; good for distributed systems</li>
          <li><code className="text-foreground font-mono">ON DELETE CASCADE</code> — when a user is deleted, their posts are deleted too</li>
        </ul>
      </section>

      {/* ── Common mistakes ──────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Common mistakes</h2>
        <div className="space-y-4">
          {[
            [
              "SELECT * in production",
              "Fetches every column even if you only need two. Wastes bandwidth, breaks when columns are added. Name the columns you need.",
            ],
            [
              "DELETE or UPDATE without WHERE",
              "Deletes or updates every row in the table. Always include a WHERE clause. Test it with a SELECT first.",
            ],
            [
              "N+1 queries",
              "Loading 50 posts then making 50 separate queries to load each author. One query with a JOIN retrieves the same data in one round trip.",
            ],
            [
              "No index on foreign keys",
              "Every JOIN and WHERE on user_id will do a full table scan without an index. PostgreSQL does not auto-index foreign keys — you must create the index yourself.",
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
