import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

export default function Module03DataFetching() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);
  const CORRECT = "Fetches fresh data on every request (disables caching)";

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Data Fetching in Next.js</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Next.js Server Components can fetch data with plain <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">async/await</code> — no <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">useEffect</code>, no loading state boilerplate. The fetch happens on the server before the HTML is sent to the browser.
        </p>
      </section>

      {/* Basic fetch */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Fetching in a Server Component</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Because Server Components run on the server, you can mark the component <code className="bg-stone-100 px-1 rounded text-xs font-mono">async</code> and <code className="bg-stone-100 px-1 rounded text-xs font-mono">await</code> the data directly. The HTML delivered to the browser already contains the fetched content.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">app/products/page.tsx</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts(); // runs on server

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {products.map((p: { id: number; title: string; price: number }) => (
        <div key={p.id} className="rounded-xl border p-4">
          <h2 className="font-semibold">{p.title}</h2>
          <p className="text-blue-600 font-bold">\${p.price}</p>
        </div>
      ))}
    </div>
  );
}`}</pre>
        </div>
      </section>

      {/* Rendering strategies */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Caching Strategies</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The fetch cache option controls when Next.js re-fetches data. Three common patterns:
        </p>

        <div className="space-y-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">Static (SSG) — default, fastest</div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`// No cache option = cached forever (until next build)
const res = await fetch('https://api.example.com/data');`}</pre>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">Dynamic (SSR) — fresh every request</div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`const res = await fetch('https://api.example.com/data', {
  cache: 'no-store', // never cache — always fetch fresh
});`}</pre>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-foreground">Incremental (ISR) — revalidate every N seconds</div>
            <pre className="px-4 py-3 text-xs font-mono text-muted-foreground bg-white overflow-x-auto">{`const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }, // serve cache, refresh in background every 60s
});`}</pre>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Strategy</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Cache option</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["SSG (static)", "default", "Docs, marketing pages — data rarely changes"],
                ["ISR", "next: { revalidate: N }", "Blogs, products — update hourly or daily"],
                ["SSR (dynamic)", "cache: 'no-store'", "Dashboards, feeds — must be real-time"],
              ].map(([strategy, opt, use]) => (
                <tr key={strategy} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-medium text-foreground">{strategy}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{opt}</td>
                  <td className="px-4 py-3 text-muted-foreground">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Loading and error */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Loading and Error States</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Next.js uses special files alongside your <code className="bg-stone-100 px-1 rounded text-xs font-mono">page.tsx</code> to handle loading and errors automatically. They wrap the route segment and activate while the async page resolves.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">app/products/loading.tsx</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {[1, 2, 3].map(i => (
        <div key={i}
          className="h-48 rounded-xl bg-stone-200 animate-pulse"
        />
      ))}
    </div>
  );
}`}</pre>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">app/products/error.tsx</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`'use client'; // error files must be client

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-center py-20">
      <p className="text-red-600">{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`}</pre>
          </div>
        </div>
      </section>

      {/* Dynamic routes with data */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Dynamic Routes + Data</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A folder named <code className="bg-stone-100 px-1 rounded text-xs font-mono">[id]</code> creates a dynamic segment. The <code className="bg-stone-100 px-1 rounded text-xs font-mono">params</code> prop receives the actual value from the URL.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">app/products/[id]/page.tsx</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`import { notFound } from 'next/navigation';

async function getProduct(id: string) {
  const res = await fetch(\`https://fakestoreapi.com/products/\${id}\`);
  if (!res.ok) notFound(); // renders not-found.tsx
  return res.json();
}

// Pre-generate pages for all known IDs at build time
export async function generateStaticParams() {
  const products = await fetch('https://fakestoreapi.com/products')
    .then(r => r.json());
  return products.map((p: { id: number }) => ({ id: String(p.id) }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-3xl font-bold text-blue-600 mt-4">\${product.price}</p>
    </div>
  );
}`}</pre>
        </div>
      </section>

      {/* Knowledge check */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground">
          In Next.js Server Components, what does <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">{"{ cache: 'no-store' }"}</code> in a fetch call do?
        </p>
        <div className="flex flex-col gap-3">
          {[
            "Caches the response permanently until the next build",
            "Fetches fresh data on every request (disables caching)",
            "Stores the data in localStorage",
            "Revalidates the cache every 60 seconds",
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
          <p className="text-sm text-red-600">Not quite — think about what "no-store" tells the HTTP cache to do.</p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700">Correct! <code className="bg-stone-100 px-1 rounded text-xs font-mono">cache: 'no-store'</code> bypasses the cache entirely, so Next.js fetches fresh data on every incoming request — equivalent to traditional SSR.</p>
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
