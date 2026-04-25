import React from "react";
import { CheckCircle2, Lightbulb } from "lucide-react";

export default function Module05Project() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Header ──────────────────────────────────────────── */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/60">
          Track 06 · TypeScript · Final Project
        </p>
        <h1 className="text-4xl font-serif text-foreground">Building a Typed API Client</h1>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Every frontend application needs to talk to a server. This project builds the layer that
          does it — fully typed, zero{" "}
          <code className="font-mono text-lg bg-stone-100 px-1.5 py-0.5 rounded">any</code>, and
          ready to drop into a real codebase.
        </p>
      </section>

      {/* ── Step 1: Define the shape ────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Step 1 — Define the data shape</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Before writing a single fetch call, describe what the API returns. An interface forces you
          to think about the data upfront and gives every consumer of this module accurate
          autocomplete.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            types.ts
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// Each field matches exactly what JSONPlaceholder returns.
// Writing this first means TypeScript can catch a misspelled
// property name anywhere in the codebase.
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}`}</pre>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Use the actual field names from the API response — TypeScript will not silently accept a
          wrong name. If the API adds a field later you can add it here and the compiler will tell
          you everywhere it should be used.
        </p>
      </section>

      {/* ── Step 2: Generic fetch wrapper ───────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Step 2 — Generic fetch wrapper</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The native <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">fetch</code> API
          returns{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">Promise&lt;any&gt;</code>{" "}
          — type information is completely lost. A thin generic wrapper fixes this once, for every
          endpoint.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            fetchJSON.ts
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// T is the expected response shape — callers supply it.
// No \`any\` anywhere: the return type is always Promise<T>.
async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);

  // Surface HTTP errors as exceptions rather than silently
  // returning an error body that would fail type-checking anyway.
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

  // res.json() returns Promise<any>.
  // The cast to Promise<T> is intentional and documented —
  // this is the single place where we accept the runtime contract.
  return res.json() as Promise<T>;
}`}</pre>
        </div>

        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0 mt-0.5">Promise&lt;T&gt;</span>
            the return type propagates T to every caller — no cast needed downstream
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0 mt-0.5">!res.ok</span>
            throws early so callers never see a partially-typed error object as data
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0 mt-0.5">as Promise&lt;T&gt;</span>
            one deliberate cast, one place — the rest of the app stays clean
          </li>
        </ul>
      </section>

      {/* ── Step 3: Typed API object ────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Step 3 — Typed API object</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Group all endpoint functions into one{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">api</code> object. Each
          function calls <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">fetchJSON</code>{" "}
          with the correct type argument — the URL lives here, the shape lives here, and the rest of
          the app never needs to know either.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            api.ts
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`const api = {
  // Returns Post[] — TypeScript knows every element is a Post
  getPosts: () =>
    fetchJSON<Post[]>("https://jsonplaceholder.typicode.com/posts"),

  // Returns a single Post — id is typed as number, not string
  getPost: (id: number) =>
    fetchJSON<Post>(\`https://jsonplaceholder.typicode.com/posts/\${id}\`),
};`}</pre>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Because <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">id</code> is typed
          as <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">number</code>, passing a
          string like{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">api.getPost("1")</code>{" "}
          is a compile-time error — caught before the code ever runs.
        </p>
      </section>

      {/* ── Step 4: Consuming the client ────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Step 4 — Use it with full type safety</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Callers get accurate autocomplete and compile-time checking for free. No type annotations
          needed at the call site — TypeScript infers everything from the return types defined in
          Step 3.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            main.ts
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// posts is inferred as Post[] — no annotation needed
const posts = await api.getPosts();
console.log(posts[0].title);   // TS knows .title is string
console.log(posts[0].userId);  // TS knows .userId is number
// posts[0].missing;           // Error: property does not exist

// post is inferred as Post
const post = await api.getPost(1);
console.log(post.body);        // TS knows .body is string`}</pre>
        </div>
      </section>

      {/* ── Complete file ───────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Complete file</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Here is everything together. Notice that the entire module — interface, wrapper, API
          object, and usage — contains no{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">any</code> except the single
          documented cast inside{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">fetchJSON</code>.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            typed-api-client.ts
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// 1. Define the shape of what the API returns
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 2. Generic fetch wrapper — no \`any\` anywhere
async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<T>;
}

// 3. Typed API functions
const api = {
  getPosts: () =>
    fetchJSON<Post[]>("https://jsonplaceholder.typicode.com/posts"),
  getPost: (id: number) =>
    fetchJSON<Post>(\`https://jsonplaceholder.typicode.com/posts/\${id}\`),
};

// 4. Use it — fully typed, editor knows the shape
const posts = await api.getPosts();  // Post[]
console.log(posts[0].title);         // string ✓

const post = await api.getPost(1);   // Post
console.log(post.body);              // string ✓`}</pre>
        </div>
      </section>

      {/* ── What you built ──────────────────────────────────── */}
      <section>
        <div className="rounded-2xl bg-green-50 border border-green-200 px-6 py-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-green-600 shrink-0" />
            <h2 className="text-lg font-semibold font-serif text-green-900">What you built</h2>
          </div>
          <ul className="space-y-2">
            {[
              "An interface that documents the exact shape of the API data",
              "A reusable generic wrapper that converts any fetch call into a typed Promise",
              "An API object that co-locates each URL with its return type",
              "A zero-any codebase — the compiler enforces the contract end to end",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm text-green-800">
                <span className="text-green-500 shrink-0 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Stretch challenges ──────────────────────────────── */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Lightbulb size={18} className="text-amber-500 shrink-0" />
          <h2 className="text-2xl font-serif text-foreground">Stretch challenges</h2>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          These extend the client without changing what already works.
        </p>

        <div className="space-y-4">
          <div className="rounded-xl border border-border px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">1 — Add a typed error class</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Replace the plain{" "}
              <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">Error</code> throw with
              a custom{" "}
              <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">ApiError</code> class
              that carries the HTTP status code as a typed field.{" "}
              <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
                catch (e) &#123; if (e instanceof ApiError) &#125;
              </code>{" "}
              then gives callers a reliable way to handle 404 vs 500.
            </p>
          </div>

          <div className="rounded-xl border border-border px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">2 — Add pagination parameters</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Extend{" "}
              <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">getPosts</code> to
              accept an optional{" "}
              <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
                {"params?: { _page?: number; _limit?: number }"}
              </code>{" "}
              argument and append them as query string parameters. Use{" "}
              <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">URLSearchParams</code>{" "}
              to build the URL — avoid manual string concatenation.
            </p>
          </div>

          <div className="rounded-xl border border-border px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">3 — Add a cache layer</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create a{" "}
              <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
                {"const cache = new Map<string, unknown>()"}
              </code>{" "}
              inside{" "}
              <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">fetchJSON</code>. Before
              fetching, check whether the URL is already in the cache and return the stored result.
              Think about what type the cache value should be — and how to avoid a cast when
              returning it.
            </p>
          </div>
        </div>
      </section>

    </article>
  );
}
