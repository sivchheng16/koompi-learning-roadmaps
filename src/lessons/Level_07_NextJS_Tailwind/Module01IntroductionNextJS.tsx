import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

export default function Module01IntroductionNextJS() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);
  const CORRECT = "Makes the component render in the browser and enables React hooks";

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Introduction to Next.js</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Next.js is a React framework that adds server-side rendering, file-based routing, API routes, and automatic optimizations — turning React into a full production-ready stack.
        </p>
      </section>

      {/* What is Next.js */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">What is Next.js?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          React alone is a UI library — it renders components in the browser. Next.js wraps React and gives you routing, data fetching on the server, API endpoints, image optimization, and one-command deployment. It is used in production by Netflix, TikTok, Nike, Notion, and Twitch.
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">React alone</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Next.js adds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Client-side rendering only", "Server-side rendering (SSR)"],
                ["Manual routing setup", "File-based routing"],
                ["No built-in API layer", "API routes built-in"],
                ["Complex deployment", "One-click deploy to Vercel"],
                ["Manual optimization", "Images, fonts, scripts auto-optimized"],
              ].map(([left, right]) => (
                <tr key={left} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 text-muted-foreground">{left}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Project structure */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">App Router Project Structure</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Run <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">npx create-next-app@latest my-app</code> and choose Tailwind + App Router + src/ directory. The folder structure maps directly to your URLs:
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">File tree → URL mapping</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`src/app/
├── layout.tsx          →  wraps every page
├── page.tsx            →  /
├── about/
│   └── page.tsx        →  /about
├── products/
│   ├── page.tsx        →  /products
│   └── [id]/
│       └── page.tsx    →  /products/42
└── api/
    └── hello/
        └── route.ts    →  /api/hello`}</pre>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Special file</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["page.tsx", "UI for the route — required to make a URL"],
                ["layout.tsx", "Shared wrapper — persists across child routes"],
                ["loading.tsx", "Shown while page data is being fetched"],
                ["error.tsx", "Shown when an unhandled error occurs"],
                ["not-found.tsx", "Custom 404 for this segment"],
                ["route.ts", "API endpoint (no JSX, returns Response)"],
              ].map(([file, purpose]) => (
                <tr key={file} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{file}</td>
                  <td className="px-4 py-3 text-muted-foreground">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Server vs Client components */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Server Components vs Client Components</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In the App Router, every component is a <strong>Server Component</strong> by default — it runs on the server, can use <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">async/await</code>, and never sends its own JS to the browser. To use state or event handlers, add <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">'use client'</code> at the top.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">Server Component (default)</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`// No 'use client' needed
async function ProductList() {
  // Can fetch directly — runs on server
  const data = await fetch('/api/products');
  const products = await data.json();

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}`}</pre>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">Client Component</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`'use client'; // ← this line is the switch

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}`}</pre>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Use Server Component when…</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Use Client Component when…</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Fetching data from a database or API", "Using useState or useEffect"],
                ["Accessing environment secrets", "Handling onClick, onChange events"],
                ["Reducing JavaScript sent to browser", "Using browser APIs (localStorage, geolocation)"],
                ["Displaying static or server-rendered content", "Building interactive UI (modals, forms, sliders)"],
              ].map(([server, client]) => (
                <tr key={server} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 text-muted-foreground">{server}</td>
                  <td className="px-4 py-3 text-muted-foreground">{client}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Navigation with Link</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use Next.js <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">Link</code> instead of plain <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">&lt;a&gt;</code>. It prefetches pages in the background so navigation feels instant.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">src/app/layout.tsx</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-6 p-4">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}`}</pre>
        </div>
      </section>

      {/* Knowledge check */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground">
          In Next.js App Router, what does adding <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">'use client'</code> to a component do?
        </p>
        <div className="flex flex-col gap-3">
          {[
            "Runs the component only on the server",
            "Makes the component render in the browser and enables React hooks",
            "Disables TypeScript for that file",
            "Prevents the component from fetching data",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setSelected(opt);
                if (opt === CORRECT) notifyChallengePassed(moduleId ?? "");
              }}
              className={cn(
                "text-left px-5 py-3.5 rounded-xl border text-sm font-sans transition-all",
                selected === opt
                  ? opt === CORRECT
                    ? "border-green-400 bg-green-50 text-green-800"
                    : "border-red-300 bg-red-50 text-red-800"
                  : "border-border hover:border-primary/40 hover:bg-primary/5 text-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        {selected && selected !== CORRECT && (
          <p className="text-sm text-red-600">Not quite — think about which environment the component runs in after you add that directive.</p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700">Correct! <code className="bg-stone-100 px-1 rounded text-xs font-mono">'use client'</code> opts the component into browser rendering, which is required for hooks like <code className="bg-stone-100 px-1 rounded text-xs font-mono">useState</code> and event handlers.</p>
        )}
      </section>

      {/* Gate */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-green-800">Challenge passed</p>
              <p className="text-sm text-green-700 mt-0.5">Click <strong>Complete &amp; Next</strong> below to continue.</p>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5 rounded-2xl bg-stone-50 border border-border">
            <p className="text-sm font-sans text-muted-foreground">Complete the challenge above to unlock the next lesson.</p>
          </div>
        )}
      </section>

    </article>
  );
}
