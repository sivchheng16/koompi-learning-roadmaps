import React from "react";

export default function BackendREADME() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ─────────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          The frontend is what users see. The backend is what makes it real — persisting data,
          enforcing rules, sending emails, and keeping secrets the browser should never hold.
        </p>
      </section>

      {/* ── What backend engineers build ─────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What backend engineers build</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A backend is the part of a system that lives on a server — invisible to the user but
          responsible for almost everything that matters. Backend engineers design and build:
        </p>
        <ul className="space-y-3 text-base text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-foreground font-semibold shrink-0">APIs</span>
            <span>Structured endpoints that the frontend (and other services) call to read or write data.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground font-semibold shrink-0">Auth</span>
            <span>Registration, login, password hashing, token issuance, and access control.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground font-semibold shrink-0">Databases</span>
            <span>Schemas, queries, migrations, and the logic that turns raw rows into domain objects.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground font-semibold shrink-0">Queues &amp; jobs</span>
            <span>Background work — sending emails, processing uploads, scheduling tasks — that should not block a web request.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground font-semibold shrink-0">Integrations</span>
            <span>Webhooks, payment providers, third-party APIs, and the glue that ties systems together.</span>
          </li>
        </ul>
      </section>

      {/* ── What this track covers ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What this track covers</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          This track takes you from "I know JavaScript" to "I can build and ship a secure REST API."
          You will learn the concepts that every backend engineer uses daily, then apply them in a
          real project.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-border">
                <th className="text-left px-5 py-3 font-semibold text-foreground">Module</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">Topic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["01", "How Backends Work — HTTP, REST, JSON, and the request lifecycle"],
                ["02", "Node.js + Express — running JavaScript on the server"],
                ["03", "REST API Design — resources, verbs, status codes, response shapes"],
                ["04", "Auth + JWT — password hashing, token signing, refresh tokens"],
                ["05", "Middleware — validation, CORS, rate limiting, logging"],
                ["06", "Project — a complete API with users, posts, and auth"],
              ].map(([num, title]) => (
                <tr key={num} className="text-muted-foreground">
                  <td className="px-5 py-3 font-mono text-foreground">{num}</td>
                  <td className="px-5 py-3">{title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Prerequisites ────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Prerequisites</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Before starting this track you should be comfortable with:
        </p>
        <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
          <li><strong className="text-foreground">JavaScript Advanced</strong> — async/await, Promises, ES6 modules, array methods</li>
          <li><strong className="text-foreground">Git &amp; GitHub</strong> — committing, branching, pushing to a remote</li>
          <li><strong className="text-foreground">Terminal basics</strong> — navigating directories, running commands, reading error output</li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          You do not need to know databases yet — that is covered in the next track. You also do
          not need to know React; backend work is completely independent of any frontend framework.
        </p>
      </section>

      {/* ── What you will build ──────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">What you will build</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          By the end of this track you will have a working REST API that:
        </p>
        <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
          <li>Accepts user registration and login with hashed passwords</li>
          <li>Issues JWT access tokens and validates them on protected routes</li>
          <li>Lets authenticated users create, read, update, and delete posts</li>
          <li>Returns consistent JSON responses and correct HTTP status codes</li>
          <li>Can be tested end-to-end with <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">curl</code> commands</li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          This API is a foundation you can connect to any frontend — React, Next.js, a mobile app,
          or anything else that speaks HTTP.
        </p>
      </section>

    </article>
  );
}
