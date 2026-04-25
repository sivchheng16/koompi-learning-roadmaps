import React from "react";

export default function Module03RESTDesign() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ───────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Good API design is a contract. Break it and you break every client — every mobile app,
          every frontend, every integration — simultaneously.
          This module is about making contracts that hold.
        </p>
      </section>

      {/* ── 2. Resources, not actions ─────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Resources, not actions</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The most common REST mistake is encoding actions into the URL.
          URLs should identify <em>things</em> (resources). HTTP verbs express what to do with them.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-border">
                <th className="text-left px-5 py-3 font-semibold text-red-600">Avoid</th>
                <th className="text-left px-5 py-3 font-semibold text-green-700">Prefer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono text-muted-foreground">
              {[
                ["GET /getUsers", "GET /users"],
                ["GET /getUserById?id=1", "GET /users/1"],
                ["POST /createPost", "POST /posts"],
                ["POST /deletePost?id=5", "DELETE /posts/5"],
                ["GET /getUserPosts?userId=3", "GET /users/3/posts"],
              ].map(([bad, good]) => (
                <tr key={bad}>
                  <td className="px-5 py-3 text-red-500">{bad}</td>
                  <td className="px-5 py-3 text-green-600">{good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          Use lowercase, plural nouns. Nest sub-resources under their parent when the relationship
          is strong (<code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">/users/3/posts</code>),
          but keep nesting shallow — two levels is usually the limit before it becomes unreadable.
        </p>
      </section>

      {/* ── 3. HTTP verbs as actions ──────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">HTTP verbs as actions</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Each verb carries a precise semantic meaning. Using the right one makes your API predictable
          and allows HTTP infrastructure (caches, proxies) to work correctly.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-border">
                <th className="text-left px-5 py-3 font-semibold text-foreground">Verb</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">Meaning</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">Body?</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">Idempotent?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {[
                ["GET", "Read a resource or collection", "No", "Yes"],
                ["POST", "Create a new resource", "Yes", "No"],
                ["PUT", "Replace a resource entirely", "Yes", "Yes"],
                ["PATCH", "Partial update", "Yes", "No"],
                ["DELETE", "Remove a resource", "No", "Yes"],
              ].map(([verb, meaning, body, idem]) => (
                <tr key={verb}>
                  <td className="px-5 py-3 font-mono text-foreground font-semibold">{verb}</td>
                  <td className="px-5 py-3">{meaning}</td>
                  <td className="px-5 py-3">{body}</td>
                  <td className="px-5 py-3">{idem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Idempotent</strong> means calling the same request twice
          produces the same result as calling it once. GET, PUT, and DELETE are idempotent; POST is not —
          calling POST twice creates two resources.
        </p>
      </section>

      {/* ── 4. Status codes ───────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Status codes</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Returning the right status code is not just politeness — it is part of the contract.
          Clients make decisions based on status codes without reading the body.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-border">
                <th className="text-left px-5 py-3 font-semibold text-foreground">Code</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">When to use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {[
                ["200", "OK", "Successful GET, PATCH, or PUT"],
                ["201", "Created", "Resource created via POST"],
                ["204", "No Content", "Successful DELETE (no body)"],
                ["400", "Bad Request", "Malformed request syntax"],
                ["401", "Unauthorized", "Missing or invalid auth token"],
                ["403", "Forbidden", "Token valid but not allowed"],
                ["404", "Not Found", "Resource does not exist"],
                ["422", "Unprocessable Entity", "Validation failed (well-formed but wrong)"],
                ["500", "Internal Server Error", "Unexpected server failure"],
              ].map(([code, name, when]) => (
                <tr key={code}>
                  <td className="px-5 py-3 font-mono text-foreground font-semibold">{code}</td>
                  <td className="px-5 py-3 font-semibold text-foreground">{name}</td>
                  <td className="px-5 py-3">{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          A common mistake is returning <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">200</code> with
          an <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&#123; error: "..." &#125;</code> body.
          This breaks clients that branch on status codes and confuses monitoring tools.
        </p>
      </section>

      {/* ── 5. Consistent response shapes ────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Consistent response shapes</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Pick a shape and stick to it everywhere. A simple convention that works well:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// Success
{ "data": { "id": 1, "title": "Hello" } }

// Success with a list
{ "data": [...], "pagination": { "total": 42, "page": 1, "limit": 20 } }

// Error
{ "error": "Email is already in use" }

// Validation error
{ "error": "Validation failed", "fields": { "email": "Invalid format" } }`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">data</code> wrapper leaves room to
          add metadata (pagination, rate limit info) later without breaking existing clients.
        </p>
      </section>

      {/* ── 6. Pagination ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Pagination</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Never return an unbounded list. Two common strategies:
        </p>
        <ul className="space-y-4 text-base text-muted-foreground">
          <li>
            <strong className="text-foreground">Offset pagination</strong>
            {" "}— simple, familiar, built into SQL.
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">?page=2&amp;limit=20</code> skips
            the first 20 rows. Works well for small datasets; becomes inconsistent if rows are inserted
            between pages.
          </li>
          <li>
            <strong className="text-foreground">Cursor pagination</strong>
            {" "}— stable and performant at scale.
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">?cursor=abc123</code> points to
            the last item seen; the server returns items after that cursor. No skipped or duplicated rows
            regardless of concurrent writes.
          </li>
        </ul>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// Offset
GET /posts?page=2&limit=20
{ "data": [...], "pagination": { "total": 150, "page": 2, "limit": 20 } }

// Cursor
GET /posts?cursor=cjld2cjxh0000qzrmn831i7rn&limit=20
{ "data": [...], "nextCursor": "cjld2cyuq0000t3rmniod1foy" }`}</pre>
      </section>

      {/* ── 7. Versioning ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Versioning</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          APIs change. Versioning lets you evolve the API without breaking existing clients.
          The simplest approach is a version prefix in the URL:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`/api/v1/users
/api/v1/posts
/api/v2/users   ← breaking changes go here; v1 stays alive`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Start with <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">/api/v1</code> from day one —
          retrofitting versioning is painful. Keep old versions running until clients have migrated.
        </p>
      </section>

      {/* ── 8. Authentication header ──────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Authentication header</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The standard way to send a token is the
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">Authorization</code> header
          with the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">Bearer</code> scheme.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`GET /api/v1/posts HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQyfQ.abc`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          On the server, extract it with:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`const token = req.headers.authorization?.replace('Bearer ', '');`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Never put tokens in the URL (<code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">?token=...</code>)
          — URLs end up in server logs, browser history, and referrer headers.
        </p>
      </section>

    </article>
  );
}
