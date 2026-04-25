import React from "react";

export default function Module01Fundamentals() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ─────────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Every variable in your program lives in RAM. The moment the process stops,
          it is gone. Databases exist for one reason: to remember things permanently,
          no matter how many times the server restarts or how many users are writing
          at the same time.
        </p>
      </section>

      {/* ── Database vs file ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Database vs a plain file</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          You could store data in a JSON file. Many small scripts do. But files fall
          apart the moment things get serious:
        </p>
        <ul className="space-y-3">
          {[
            ["Structure", "A file is a blob of bytes. A database enforces a schema — every row in a table has the same columns, the same types."],
            ["Querying", "Finding a user by email in a 1 million-row JSON file means reading all of it. A database index makes that lookup instant."],
            ["Concurrent access", "Two processes writing to the same file at the same time corrupt it. Databases serialize writes and handle locking automatically."],
            ["Transactions", "If step 2 of a 3-step operation fails, a database rolls back to a safe state. A file does not."],
          ].map(([term, desc]) => (
            <li key={term} className="flex gap-4">
              <span className="text-primary font-mono text-sm shrink-0 pt-0.5 w-28">{term}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Relational databases ─────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Relational databases</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Examples: <strong className="text-foreground">PostgreSQL</strong>, MySQL, SQLite.
          Data lives in tables — rows and columns, like a spreadsheet. Tables are linked
          by foreign keys. You query them with SQL.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`-- users table
id  | name    | email
----+---------+------------------
 1  | Alice   | alice@example.com
 2  | Bob     | bob@example.com

-- posts table — user_id is a foreign key to users.id
id  | user_id | title
----+---------+---------------------
 1  |    1    | My first post
 2  |    1    | Another post
 3  |    2    | Bob writes too`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Use relational when:</strong> your data has
          clear structure, relationships between entities matter, and you need consistency
          guarantees (money, inventory, anything where partial writes are dangerous).
        </p>
      </section>

      {/* ── Document databases ───────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Document databases</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Examples: <strong className="text-foreground">MongoDB</strong>, Firestore.
          Data is stored as JSON-like documents inside collections. There is no fixed
          schema — each document can have different fields.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// Firestore "posts" collection — document
{
  "id": "abc123",
  "title": "My first post",
  "author": { "name": "Alice", "email": "alice@example.com" },
  "tags": ["react", "databases"],
  "published": true
}`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Use document when:</strong> your schema
          changes often during development, data is naturally hierarchical, and you are
          doing mostly reads rather than complex cross-collection joins.
        </p>
      </section>

      {/* ── Key-value stores ─────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Key-value stores</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Examples: <strong className="text-foreground">Redis</strong>, DynamoDB.
          The simplest model: store a value under a key, retrieve it by key.
          Reads and writes are measured in microseconds.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`SET session:user:42  '{"userId":42,"role":"admin"}'  EX 3600
GET session:user:42
-- returns the JSON string, or nil if expired`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Use key-value when:</strong> you need
          caching, user sessions, rate limiting, real-time leaderboards, or any
          read-heavy workload where the lookup key is always known upfront.
        </p>
      </section>

      {/* ── ACID ─────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">ACID: the four guarantees</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Relational databases promise ACID. These guarantees are why banks do not lose
          your money when a server crashes mid-transfer.
        </p>
        <div className="space-y-4">
          {[
            ["Atomicity", "A transaction is all or nothing. If you transfer $100 from Alice to Bob, both the debit and the credit happen — or neither does."],
            ["Consistency", "Every transaction moves the database from one valid state to another. A constraint violation (e.g., a negative balance if that is not allowed) aborts the whole transaction."],
            ["Isolation", "Concurrent transactions do not see each other's in-progress changes. Reads are always of committed data."],
            ["Durability", "Once a transaction commits, it survives crashes. The database writes to disk before confirming success."],
          ].map(([letter, desc]) => (
            <div key={letter} className="flex gap-4 rounded-xl border border-border px-5 py-4">
              <span className="text-primary font-mono font-bold text-sm shrink-0 pt-0.5 w-24">{letter}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Keys and indexes ─────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Primary keys, foreign keys, indexes</h2>
        <ul className="space-y-4">
          {[
            ["Primary key", "Uniquely identifies every row. Every table must have one. Usually an auto-incrementing integer or a UUID. The database enforces uniqueness automatically."],
            ["Foreign key", "A column whose value must match a primary key in another table. Enforces referential integrity — you cannot have a post that references a user who does not exist."],
            ["Index", "A separate data structure (usually a B-tree) that maps column values to row locations, so the database can find rows without scanning every row. Essential on columns you filter or sort by."],
          ].map(([term, desc]) => (
            <li key={term} className="flex gap-4">
              <span className="text-primary font-mono text-sm shrink-0 pt-0.5 w-28">{term}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Decision table ───────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">When to choose what</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-border">
                <th className="text-left px-5 py-3 text-foreground font-semibold">Need</th>
                <th className="text-left px-5 py-3 text-foreground font-semibold">Reach for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Structured data, relations, consistency", "PostgreSQL / MySQL"],
                ["Flexible schema, hierarchical docs, fast iteration", "MongoDB / Firestore"],
                ["Caching, sessions, real-time counters", "Redis"],
                ["Everything in one hosted platform", "Supabase (PostgreSQL)"],
                ["Embedded / local-only app", "SQLite"],
              ].map(([need, choice]) => (
                <tr key={need}>
                  <td className="px-5 py-3 text-muted-foreground">{need}</td>
                  <td className="px-5 py-3 text-foreground font-mono">{choice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </article>
  );
}
