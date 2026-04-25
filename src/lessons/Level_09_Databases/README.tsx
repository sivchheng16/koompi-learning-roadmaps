import React from "react";

export default function DatabasesREADME() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ─────────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Every app you have ever used — social media, banking, your favourite game — is
          keeping score somewhere. That somewhere is a database. This track teaches you
          how databases work, how to query them, and how to design one that will not
          embarrass you six months from now.
        </p>
      </section>

      {/* ── What is a database ───────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What you are about to learn</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          When a program closes, everything in RAM disappears. Databases are the layer
          that keeps information alive between sessions, between servers, and between
          users. A well-designed database is invisible — it just works. A poorly designed
          one becomes the most expensive mistake in a codebase.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          This track starts with the concepts that apply everywhere, moves through SQL
          (the 50-year-old language that still dominates), then gets practical with
          Supabase — a hosted PostgreSQL platform you can use from a React app in
          minutes. It closes with a real project: designing and building the schema for
          a blog platform from scratch.
        </p>
      </section>

      {/* ── Track overview ───────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">What this track covers</h2>
        <ul className="space-y-4">
          {[
            ["Module 1 — Fundamentals", "Relational vs document vs key-value. ACID guarantees. Primary keys, foreign keys, indexes. When to choose what."],
            ["Module 2 — SQL Fundamentals", "SELECT, INSERT, UPDATE, DELETE. JOINs. GROUP BY. Subqueries. CREATE TABLE. The mistakes that will bite you in production."],
            ["Module 3 — Supabase", "PostgreSQL in the cloud with an auto-generated API. The JS client. Row Level Security — the feature you cannot skip."],
            ["Module 4 — Schema Design", "Normalisation. 1-to-many and many-to-many relationships. Indexes. Timestamps. Soft deletes. Schema smells to avoid."],
            ["Module 5 — Project", "Design and build a blog platform database end-to-end: requirements, entities, SQL, Supabase setup, RLS policies, and queries."],
          ].map(([title, desc]) => (
            <li key={title} className="flex gap-4">
              <span className="text-primary font-mono text-sm shrink-0 pt-0.5">→</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── What you will build ──────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">What you will build</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          By the end of this track you will have a complete PostgreSQL schema for a
          blog platform — users, posts, tags, and a many-to-many join table — deployed
          on Supabase with Row Level Security policies in place. Every query you will
          ever need for the frontend will already be written.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          More importantly, you will understand <em>why</em> every decision was made.
          That understanding is what separates engineers who copy schema from Stack
          Overflow from engineers who design schema that lasts.
        </p>
      </section>

    </article>
  );
}
