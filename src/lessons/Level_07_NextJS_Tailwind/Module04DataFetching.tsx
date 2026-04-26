import React from "react";

export default function Module04DataFetching() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Data Fetching in the App Router</h1>
        <p className="mt-3 text-muted-foreground text-base">
          No more <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">getStaticProps</code>. No more <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">getServerSideProps</code>. Just <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">async/await</code> in your component — the simplest data fetching model React has ever had.
        </p>
      </section>

      {/* Fetching in Server Components */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Fetching in Server Components</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Because Server Components run on the server, you can mark them <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">async</code> and <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">await</code> data directly inside the function body. The HTML Next.js sends to the browser already contains the fetched data — no loading spinner needed.
        </p>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-[#2a2a2a] text-[#6c7086] text-xs">app/posts/page.tsx</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`export default async function PostsPage() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return (
    <ul className="space-y-2 p-8">
      {posts.map((p: { id: number; title: string }) => (
        <li key={p.id} className="text-lg">{p.title}</li>
      ))}
    </ul>
  );
}`}</pre>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Compare this to the old Pages Router, where you needed a separate <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">getServerSideProps</code> export and the data arrived as <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">props</code>. The App Router collapses the fetch and the render into a single function.
        </p>
      </section>

      {/* Cache options */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Cache options — controlling when data refreshes</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Next.js extends the native <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">fetch</code> API with a cache option that maps directly to the three rendering strategies from the Pages Router — now expressed per-request rather than per-page.
        </p>

        <div className="space-y-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">
              <code className="font-mono">force-cache</code> — cache forever (like getStaticProps)
            </div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`const res = await fetch('https://api.example.com/data', {
  cache: 'force-cache', // cached until next deployment
});`}</pre>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">
              <code className="font-mono">no-store</code> — always fresh (like getServerSideProps)
            </div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`const res = await fetch('https://api.example.com/data', {
  cache: 'no-store', // bypasses cache — fresh data on every request
});`}</pre>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">
              <code className="font-mono">next.revalidate</code> — refresh every N seconds (ISR)
            </div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }, // serve cached data, refresh in background after 60s
});`}</pre>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Option</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Behaviour</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["force-cache", "Cached at build time — never re-fetched", "Docs, marketing pages"],
                ["no-store", "Fresh fetch on every request", "Dashboards, feeds, real-time data"],
                ["next: { revalidate: N }", "Serve cache, refresh in background after N seconds", "Blogs, product listings"],
              ].map(([opt, behaviour, use]) => (
                <tr key={opt} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{opt}</td>
                  <td className="px-4 py-3 text-muted-foreground">{behaviour}</td>
                  <td className="px-4 py-3 text-muted-foreground">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Server Actions */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Server Actions — mutations from the client</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Server Actions are async functions that run on the server but can be called from Client Components — including directly from HTML forms. You mark them with <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">'use server'</code> at the top of the function (or the file). No API route needed.
        </p>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-[#2a2a2a] text-[#6c7086] text-xs">app/posts/actions.ts — Server Action</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;

  await db.insert({ title }); // runs on server — can use DB directly

  revalidatePath('/posts'); // tell Next.js to re-fetch /posts
}`}</pre>
        </div>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-[#2a2a2a] text-[#6c7086] text-xs">app/posts/NewPostForm.tsx — Client Component calling the action</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`'use client';

import { createPost } from './actions';

export default function NewPostForm() {
  return (
    // form action= wires directly to the Server Action
    <form action={createPost} className="flex gap-2">
      <input name="title" className="border rounded px-3 py-2 flex-1" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add post
      </button>
    </form>
  );
}`}</pre>
        </div>
        <div className="px-5 py-4 rounded-xl border border-blue-200 bg-blue-50">
          <p className="text-sm font-semibold text-blue-800">Why Server Actions matter</p>
          <p className="text-xs text-blue-700 mt-1 leading-relaxed">
            Before Server Actions, every mutation required an API route, a fetch call, and manual cache invalidation. Now you write a single function, place it in a <code className="bg-blue-100 px-1 rounded text-xs font-mono">'use server'</code> file, and call it directly from a form or button. Next.js handles the network request automatically.
          </p>
        </div>
      </section>

      {/* Streaming with Suspense */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Streaming with Suspense</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When a page has multiple data requirements with different latencies, you don't have to wait for the slowest one before sending anything to the browser. Wrap slower components in <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">Suspense</code> and Next.js streams the shell immediately, filling in each section as its data arrives.
        </p>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-[#2a2a2a] text-[#6c7086] text-xs">app/dashboard/page.tsx — streaming partial UI</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import { Suspense } from 'react';
import RecentPosts from './RecentPosts';    // slow — hits external API
import UserStats from './UserStats';        // fast — in-memory cache
import PostsSkeleton from './PostsSkeleton';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      {/* Renders immediately */}
      <UserStats />

      {/* Streams in when RecentPosts resolves */}
      <Suspense fallback={<PostsSkeleton />}>
        <RecentPosts />
      </Suspense>
    </div>
  );
}`}</pre>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">RecentPosts</code> is an async Server Component. While it's fetching, the browser displays <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">PostsSkeleton</code>. When the data is ready the server streams the rendered HTML and React swaps the skeleton out — no client-side fetch required.
        </p>
      </section>

      {/* loading.tsx */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">loading.tsx — automatic Suspense for the whole route</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Creating a <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">loading.tsx</code> file in a route segment is a shortcut: Next.js automatically wraps <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">page.tsx</code> in a <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">Suspense</code> boundary and shows your loading component while the page's async data resolves.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">app/posts/loading.tsx</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`export default function Loading() {
  return (
    <div className="space-y-4 p-8">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="h-10 rounded-lg bg-stone-200 animate-pulse"
        />
      ))}
    </div>
  );
}`}</pre>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">File structure</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-muted-foreground overflow-x-auto bg-white">{`app/posts/
├── page.tsx        ← async page (fetches data)
├── loading.tsx     ← shown while page.tsx resolves
└── error.tsx       ← shown if page.tsx throws

Next.js automatically wraps page.tsx
in <Suspense fallback={<Loading />}>`}</pre>
          </div>
        </div>
      </section>

      {/* Parallel data fetching */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Parallel data fetching</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Sequential <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">await</code> calls are a common performance trap. Each one blocks the next, so total time is the sum of all latencies. If the requests are independent, start them all at once with <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">Promise.all</code>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-200 overflow-hidden">
            <div className="px-4 py-2 bg-red-50 border-b border-red-200 text-xs font-medium text-red-700">Sequential — 300ms + 200ms = 500ms</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`// ❌ Each await blocks the next
const user = await getUser(id);      // 300ms
const posts = await getPosts(id);    // 200ms
// Total: 500ms`}</pre>
          </div>
          <div className="rounded-xl border border-green-200 overflow-hidden">
            <div className="px-4 py-2 bg-green-50 border-b border-green-200 text-xs font-medium text-green-700">Parallel — max(300ms, 200ms) = 300ms</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`// ✅ Both requests start at the same time
const [user, posts] = await Promise.all([
  getUser(id),    // 300ms
  getPosts(id),   // 200ms
]);
// Total: 300ms`}</pre>
          </div>
        </div>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-[#2a2a2a] text-[#6c7086] text-xs">app/profile/[id]/page.tsx — parallel fetch</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`export default async function ProfilePage({ params }: { params: { id: string } }) {
  const [user, posts, followers] = await Promise.all([
    fetch(\`/api/users/\${params.id}\`).then(r => r.json()),
    fetch(\`/api/posts?userId=\${params.id}\`).then(r => r.json()),
    fetch(\`/api/followers/\${params.id}\`).then(r => r.json()),
  ]);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{followers.length} followers · {posts.length} posts</p>
    </div>
  );
}`}</pre>
        </div>
      </section>

      {/* Error handling */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Error handling</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Two complementary patterns cover most error cases: <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">try/catch</code> inside a Server Component for graceful partial failures, and <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">error.tsx</code> for route-level errors that should replace the whole page.
        </p>

        <div className="space-y-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">try/catch in a Server Component — graceful degradation</div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`export default async function PostsPage() {
  try {
    const res = await fetch('https://api.example.com/posts');
    if (!res.ok) throw new Error(\`API error \${res.status}\`);
    const posts = await res.json();
    return <PostList posts={posts} />;
  } catch (err) {
    // Render inline error instead of crashing the whole page
    return <p className="text-red-500">Could not load posts. Try again later.</p>;
  }
}`}</pre>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">error.tsx — route-level error boundary</div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`'use client'; // error files must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; // retries rendering the segment
}) {
  return (
    <div className="text-center py-20">
      <p className="text-red-600 font-medium">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}`}</pre>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Pattern</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">When to use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["try/catch in page.tsx", "Partial failure — show fallback content without replacing the whole route"],
                ["error.tsx", "Fatal error — replace the route segment with a recovery UI"],
                ["notFound() from next/navigation", "Resource does not exist — renders not-found.tsx"],
              ].map(([pattern, when]) => (
                <tr key={pattern} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{pattern}</td>
                  <td className="px-4 py-3 text-muted-foreground">{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Summary</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Concept</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Key point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["async page()", "Mark any Server Component async and await data directly — no getServerSideProps."],
                ["force-cache", "Cache forever — equivalent to the old getStaticProps."],
                ["no-store", "Fresh on every request — equivalent to the old getServerSideProps."],
                ["next: { revalidate: N }", "Serve cached data, refresh in background after N seconds (ISR)."],
                ["Server Actions", "'use server' function — run mutations on the server, call from forms or buttons."],
                ["Suspense streaming", "Wrap slow components in <Suspense> to stream partial UI while data loads."],
                ["loading.tsx", "Auto-wraps page.tsx in Suspense — shows your skeleton while the page fetches."],
                ["Promise.all", "Fetch independent data sources in parallel to avoid sequential latency."],
                ["error.tsx", "Route-level error boundary — must be a Client Component, receives reset()."],
              ].map(([concept, point]) => (
                <tr key={concept} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground font-semibold">{concept}</td>
                  <td className="px-4 py-3 text-muted-foreground">{point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </article>
  );
}
