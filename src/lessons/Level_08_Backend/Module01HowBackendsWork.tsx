import React from "react";

export default function Module01HowBackendsWork() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ───────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          The frontend shows it. The backend remembers it.
          Every tweet, post, and message that survives a page refresh does so because a server
          somewhere wrote it to a database and gave it back when asked.
        </p>
      </section>

      {/* ── 2. Client-server model ────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The client-server model</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every web application is split between two distinct roles.
          The <strong className="text-foreground">client</strong> (browser, mobile app, CLI) is responsible for
          displaying information and collecting user input. It has no memory between sessions and cannot be trusted
          to enforce rules — the user can modify it at will.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The <strong className="text-foreground">server</strong> owns the data and enforces the rules. It decides
          who is allowed to do what, persists changes, and returns authoritative responses. Unlike the client, the
          server code runs in an environment you control.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 text-sm text-muted-foreground font-mono space-y-1">
          <p>Client  →  "Give me the posts for user 42"</p>
          <p>Server  →  checks auth, queries database, returns JSON</p>
          <p>Client  →  renders the result</p>
        </div>
      </section>

      {/* ── 3. HTTP request anatomy ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">HTTP request anatomy</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every conversation between client and server happens over HTTP. A request has four parts:
        </p>
        <ul className="space-y-3 text-base text-muted-foreground">
          <li><strong className="text-foreground">Method</strong> — the action: GET, POST, PUT, PATCH, DELETE</li>
          <li><strong className="text-foreground">URL</strong> — what resource to act on: <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">/api/posts/17</code></li>
          <li><strong className="text-foreground">Headers</strong> — metadata: <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">Content-Type</code>, <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">Authorization</code></li>
          <li><strong className="text-foreground">Body</strong> — optional data payload (POST/PUT/PATCH only)</li>
        </ul>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`POST /api/posts HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGci...

{
  "title": "My first post",
  "body": "Hello, backend!"
}`}</pre>
      </section>

      {/* ── 4. Response anatomy ───────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Response anatomy</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The server replies with a status code, headers, and usually a body.
          The <strong className="text-foreground">status code</strong> is a three-digit number that tells
          the client whether the request succeeded and, if not, why.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`HTTP/1.1 201 Created
Content-Type: application/json

{
  "data": {
    "id": 42,
    "title": "My first post",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}`}</pre>
      </section>

      {/* ── 5. REST ───────────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">REST — resources as URLs, verbs as actions</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          REST (Representational State Transfer) is the dominant style for web APIs. The core idea is simple:
          every <em>thing</em> in your system is a <strong className="text-foreground">resource</strong> with
          its own URL, and you use HTTP verbs to express what you want to do to it.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-border">
                <th className="text-left px-5 py-3 font-semibold text-foreground">Method + URL</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground font-mono">
              {[
                ["GET    /posts", "list all posts"],
                ["GET    /posts/42", "get post #42"],
                ["POST   /posts", "create a new post"],
                ["PATCH  /posts/42", "update post #42"],
                ["DELETE /posts/42", "delete post #42"],
              ].map(([endpoint, desc]) => (
                <tr key={endpoint}>
                  <td className="px-5 py-3 text-[#cdd6f4] bg-[#1e1e1e]">{endpoint}</td>
                  <td className="px-5 py-3 font-sans">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 6. Stateless servers ──────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Stateless servers</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          HTTP is <strong className="text-foreground">stateless</strong>: the server does not remember previous
          requests. Every request must carry all the information the server needs to handle it — the URL,
          the body, and crucially the auth token. There is no session memory between requests.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          This might seem limiting, but it is actually a superpower: stateless servers are easy to scale
          horizontally. Any server in a cluster can handle any request because none of them hold
          request-specific state.
        </p>
      </section>

      {/* ── 7. JSON ───────────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">JSON — the universal data format</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          JSON (JavaScript Object Notation) is the standard format for sending data between client and server.
          It maps directly to JavaScript objects and arrays, supports strings, numbers, booleans, null, objects,
          and arrays — and nothing else. No functions, no dates (use ISO 8601 strings), no undefined.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`{
  "id": 42,
  "title": "Hello backend",
  "published": true,
  "tags": ["node", "api"],
  "author": {
    "id": 7,
    "name": "Rithy"
  }
}`}</pre>
      </section>

      {/* ── 8. Login flow ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What happens when you log in</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Authentication over HTTP follows a predictable pattern. Understanding it end-to-end makes every
          auth-related bug easier to trace.
        </p>
        <ol className="space-y-3 text-base text-muted-foreground list-decimal list-inside">
          <li>Client sends <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">POST /auth/login</code> with email + password in the body.</li>
          <li>Server looks up the user by email, then checks the submitted password against the stored hash.</li>
          <li>If valid, server signs a <strong className="text-foreground">token</strong> (usually a JWT) containing the user's ID and returns it.</li>
          <li>Client stores the token (in memory or a cookie) and attaches it to every subsequent request: <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">Authorization: Bearer &lt;token&gt;</code>.</li>
          <li>On protected routes, server verifies the token before proceeding. If the token is missing or invalid, it returns <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">401 Unauthorized</code>.</li>
        </ol>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// 1. Login
POST /auth/login
{ "email": "rithy@example.com", "password": "secret" }

// 2. Server responds with a token
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }

// 3. Client attaches token to future requests
GET /posts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Notice that the server never stores the token — it just verifies it. This is what makes the
          system stateless and scalable.
        </p>
      </section>

    </article>
  );
}
