import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

export default function Module04APIRoutes() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);
  const CORRECT = "app/api/route-name/route.ts";

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">API Routes</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Next.js lets you write backend HTTP endpoints inside your project using Route Handlers. No separate Express server needed — your frontend and backend live in one codebase and deploy together.
        </p>
      </section>

      {/* Where routes live */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Where Route Handlers Live</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A file named <code className="bg-stone-100 px-1 rounded text-xs font-mono">route.ts</code> inside the <code className="bg-stone-100 px-1 rounded text-xs font-mono">app/</code> directory creates an API endpoint at that URL path. It must export named functions for each HTTP method.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">File tree → API URL</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`app/
└── api/
    ├── hello/
    │   └── route.ts      →  GET  /api/hello
    ├── products/
    │   ├── route.ts      →  GET/POST  /api/products
    │   └── [id]/
    │       └── route.ts  →  GET/PUT/DELETE  /api/products/42
    └── auth/
        └── login/
            └── route.ts  →  POST  /api/auth/login`}</pre>
        </div>
      </section>

      {/* Basic GET */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">A Simple GET Handler</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Export an <code className="bg-stone-100 px-1 rounded text-xs font-mono">async function GET()</code>. Use <code className="bg-stone-100 px-1 rounded text-xs font-mono">NextResponse.json()</code> to return JSON. Test it in the browser at the matching URL.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">app/api/hello/route.ts</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from the server!',
    timestamp: new Date().toISOString(),
  });
}

// Visit http://localhost:3000/api/hello to see the JSON`}</pre>
        </div>
      </section>

      {/* CRUD example */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">GET + POST in One File</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Export one function per HTTP method in the same <code className="bg-stone-100 px-1 rounded text-xs font-mono">route.ts</code>. Next.js dispatches by method name automatically.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">app/api/products/route.ts</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`import { NextRequest, NextResponse } from 'next/server';

// In-memory store (use a real DB in production)
let products = [
  { id: 1, name: 'KOOMPI E13', price: 299 },
  { id: 2, name: 'Wireless Mouse', price: 25 },
];

// GET /api/products
export async function GET() {
  return NextResponse.json(products);
}

// POST /api/products
export async function POST(request: NextRequest) {
  const body = await request.json();
  const newProduct = {
    id: products.length + 1,
    name: body.name,
    price: body.price,
  };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}`}</pre>
        </div>
      </section>

      {/* Dynamic route handler */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Dynamic Route Handlers</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Dynamic segments work exactly like page routes. The second argument to the handler provides <code className="bg-stone-100 px-1 rounded text-xs font-mono">params</code> with the URL values.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">app/api/products/[id]/route.ts</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`import { NextRequest, NextResponse } from 'next/server';

// GET /api/products/42
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = products.find(p => p.id === Number(params.id));
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

// DELETE /api/products/42
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = products.findIndex(p => p.id === Number(params.id));
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  products.splice(index, 1);
  return NextResponse.json({ success: true });
}`}</pre>
        </div>
      </section>

      {/* Request data */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Reading Request Data</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="bg-stone-100 px-1 rounded text-xs font-mono">NextRequest</code> extends the standard Web API Request with Next.js helpers for cookies and URL search params.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`export async function POST(request: NextRequest) {
  // JSON body
  const body = await request.json();

  // URL query params — e.g. /api/search?q=laptop
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // Request headers
  const auth = request.headers.get('authorization');

  // Cookies
  const token = request.cookies.get('session')?.value;

  return NextResponse.json({ body, query, auth, token });
}`}</pre>
        </div>
      </section>

      {/* API Routes vs Server Actions */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">API Routes vs Server Actions</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Use API Routes when…</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Use Server Actions when…</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Building a public REST API consumed by mobile apps", "Handling form submissions within your own app"],
                ["A third-party service needs to call your endpoint (webhook)", "Mutating data triggered by a button click"],
                ["You need fine-grained control over request/response headers", "You want the simplest possible form handling with no API boilerplate"],
              ].map(([api, sa]) => (
                <tr key={api} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 text-muted-foreground">{api}</td>
                  <td className="px-4 py-3 text-muted-foreground">{sa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Knowledge check */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground">
          Where does a GET route handler live in Next.js App Router?
        </p>
        <div className="flex flex-col gap-3">
          {[
            "pages/api/route-name.ts",
            "app/api/route-name/route.ts",
            "src/handlers/route-name.ts",
            "app/route-name/handler.ts",
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
          <p className="text-sm text-red-600">Not quite — the Pages Router used <code className="bg-stone-100 px-1 rounded text-xs font-mono">pages/api/</code>, but the App Router requires a special filename inside the folder.</p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700">Correct! In the App Router, route handlers must be in a file named exactly <code className="bg-stone-100 px-1 rounded text-xs font-mono">route.ts</code> (or <code className="bg-stone-100 px-1 rounded text-xs font-mono">route.js</code>) inside the <code className="bg-stone-100 px-1 rounded text-xs font-mono">app/</code> directory.</p>
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
