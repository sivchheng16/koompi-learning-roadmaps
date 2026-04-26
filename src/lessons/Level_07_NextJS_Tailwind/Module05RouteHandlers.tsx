import React from "react";

export default function Module05RouteHandlers() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Route Handlers</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Next.js can be your entire backend — no separate Express server needed. Route Handlers let you write HTTP endpoints that live inside your Next.js project and deploy alongside your UI.
        </p>
      </section>

      {/* Where route handlers live */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Where Route Handlers Live</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A file named <code className="bg-stone-100 px-1 rounded text-xs font-mono">route.ts</code> inside the <code className="bg-stone-100 px-1 rounded text-xs font-mono">app/api/</code> directory creates an API endpoint. Export named functions matching HTTP method names — <code className="bg-stone-100 px-1 rounded text-xs font-mono">GET</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">POST</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">PUT</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">DELETE</code>, etc.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">File tree → API URL</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`app/
└── api/
    ├── posts/
    │   ├── route.ts          →  GET / POST  /api/posts
    │   └── [id]/
    │       └── route.ts      →  GET / PUT / DELETE  /api/posts/42
    └── users/
        └── route.ts          →  GET / POST  /api/users`}</pre>
        </div>
      </section>

      {/* Basic GET */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Basic GET Handler</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Export an <code className="bg-stone-100 px-1 rounded text-xs font-mono">async function GET()</code> and return a <code className="bg-stone-100 px-1 rounded text-xs font-mono">NextResponse</code>. Visit the URL in a browser — it returns JSON directly.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await db.getPosts();
  return NextResponse.json(posts);
}`}</pre>
      </section>

      {/* POST with body parsing */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">POST with Body Parsing</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The first argument is a standard Web API <code className="bg-stone-100 px-1 rounded text-xs font-mono">Request</code>. Call <code className="bg-stone-100 px-1 rounded text-xs font-mono">request.json()</code> to parse the JSON body. Return a <code className="bg-stone-100 px-1 rounded text-xs font-mono">201</code> status code to signal that a resource was created.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`export async function POST(request: Request) {
  const body = await request.json();
  const post = await db.createPost(body);
  return NextResponse.json(post, { status: 201 });
}`}</pre>
      </section>

      {/* Dynamic routes */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Dynamic Route Segments</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Dynamic segments work the same as page routes. The second argument provides a <code className="bg-stone-100 px-1 rounded text-xs font-mono">params</code> object containing the URL values. The file lives at <code className="bg-stone-100 px-1 rounded text-xs font-mono">app/api/posts/[id]/route.ts</code>.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const post = await db.getPost(params.id);
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await db.deletePost(params.id);
  return NextResponse.json({ success: true });
}`}</pre>
      </section>

      {/* Headers and cookies */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Headers and Cookies</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Read request headers with <code className="bg-stone-100 px-1 rounded text-xs font-mono">request.headers.get()</code>. For cookies, import Next.js's <code className="bg-stone-100 px-1 rounded text-xs font-mono">cookies()</code> helper from <code className="bg-stone-100 px-1 rounded text-xs font-mono">next/headers</code> — it reads the incoming cookie jar on the server.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Read an Authorization header
  const token = request.headers.get('authorization');

  // Read a cookie
  const cookieStore = cookies();
  const session = cookieStore.get('session')?.value;

  if (!token && !session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}`}</pre>
      </section>

      {/* Middleware vs Route Handler */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Middleware vs Route Handler</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Both run on the server, but at different points in the request lifecycle.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Middleware</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Route Handler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Runs before every matched request", "Runs when the specific endpoint is called"],
                ["Use for auth checks, redirects, rewrites", "Use for reading/writing data"],
                ["Cannot return a body — only rewrite or respond early", "Returns the full API response"],
                ["Lives in middleware.ts at the project root", "Lives in app/api/**/route.ts"],
              ].map(([mw, rh]) => (
                <tr key={mw} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 text-muted-foreground">{mw}</td>
                  <td className="px-4 py-3 text-muted-foreground">{rh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Route Handlers vs Server Actions */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Route Handlers vs Server Actions</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Both run server-side code — the choice comes down to who is calling your endpoint.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Use Route Handlers when…</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Use Server Actions when…</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Building a REST API consumed by a mobile app", "Handling a form submission from your own UI"],
                ["A third-party service sends a webhook", "A button click triggers a database mutation"],
                ["You need full control over HTTP headers and status codes", "You want the simplest possible server-side mutation"],
              ].map(([rh, sa]) => (
                <tr key={rh} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 text-muted-foreground">{rh}</td>
                  <td className="px-4 py-3 text-muted-foreground">{sa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-800">
          Rule of thumb: if an external client (mobile app, another service, curl) needs to call it, use a Route Handler. If only your own UI calls it, a Server Action is simpler.
        </div>
      </section>

    </article>
  );
}
