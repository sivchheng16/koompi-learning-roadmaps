import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

const CORRECT = "layout.tsx wraps all child pages and persists across navigations; page.tsx renders the route content";

export default function Module01AppRouter() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          React gives you components. Next.js gives you a whole framework — routing, rendering,
          data fetching, deployment — decided for you, so you can focus on building instead of
          configuring.
        </p>
      </section>

      {/* ── 2. Why Next.js ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Why Next.js?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A plain React app renders entirely in the browser. That means the user downloads your
          JavaScript, runs it, and only then sees content — bad for SEO and slow on low-end devices.
          Next.js solves this with <strong className="text-foreground">server-side rendering</strong>:
          pages are pre-rendered on the server and sent as HTML, so search engines can index them and
          users see content faster.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Feature</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">What it means for you</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["File-based routing", "Create a folder + page.tsx — that's your route. No router config."],
                ["Server components", "Fetch data on the server. Zero JS shipped to browser for that component."],
                ["Built-in API routes", "Write backend handlers in the same repo. No separate Express server."],
                ["next/image", "Images are auto-resized, lazy-loaded, and served as WebP."],
                ["next/font", "Google Fonts loaded at build time — no layout shift, no extra network request."],
              ].map(([feat, desc]) => (
                <tr key={feat} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-medium text-foreground">{feat}</td>
                  <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 3. The app/ mental model ───────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">The app/ directory mental model</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The entire routing system lives inside <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">app/</code>.
          The folder structure is the URL structure — no router configuration, no route arrays to
          maintain. Each folder segment becomes a URL segment.
        </p>
        <div className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm overflow-hidden">
          <div className="px-5 py-2 bg-stone-800 text-stone-400 text-xs border-b border-stone-700">
            app/ folder → URL mapping
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`app/
├── page.tsx              →  /
├── about/
│   └── page.tsx          →  /about
├── blog/
│   ├── page.tsx          →  /blog
│   └── [slug]/
│       └── page.tsx      →  /blog/any-post-slug
└── layout.tsx            →  wraps everything`}</pre>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Next.js recognises several <strong className="text-foreground">special filenames</strong>
          {" "}inside any folder. You don't need to register them anywhere — their name is their contract:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">File</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["page.tsx", "Renders the UI for this URL — required to create a route"],
                ["layout.tsx", "Wraps page.tsx and all child routes; persists across navigations"],
                ["loading.tsx", "Shown automatically while page data loads (React Suspense)"],
                ["error.tsx", "Shown automatically when an unhandled error is thrown"],
                ["not-found.tsx", "Custom 404 for this route segment"],
                ["route.ts", "API endpoint — returns a Response, no JSX"],
              ].map(([file, role]) => (
                <tr key={file} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{file}</td>
                  <td className="px-4 py-3 text-muted-foreground">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4. Create Next.js project ──────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">Creating a Next.js project</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          One command scaffolds the whole project. The flags below lock in the choices this track
          uses — App Router, TypeScript, and Tailwind CSS:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`npx create-next-app@latest my-app \\
  --typescript \\
  --tailwind \\
  --app

cd my-app
npm run dev      # http://localhost:3000`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The CLI will ask a few questions (ESLint, src/ directory, import alias). For this track,
          accept the defaults. The{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">--app</code> flag
          is the key one — it uses the App Router instead of the legacy Pages Router.
        </p>
      </section>

      {/* ── 5. Project structure ───────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">Project structure</h2>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`my-app/
├── app/
│   ├── layout.tsx      ← root layout (html, body tags live here)
│   ├── page.tsx        ← home route (/)
│   ├── globals.css
│   └── about/
│       └── page.tsx    ← /about
├── public/             ← static files (images, fonts, robots.txt)
├── next.config.js      ← Next.js configuration
└── package.json`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Notice there is no <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">src/routes.ts</code>,
          no <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">react-router</code>,
          no manual route array. The file system is the router.
        </p>
      </section>

      {/* ── 6. page.tsx vs layout.tsx ──────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">page.tsx vs layout.tsx</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These two files are the most important to understand. They serve different roles and
          interact on every render:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">
              app/layout.tsx — root layout
            </div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>My Nav</nav>
        {children}
        <footer>My Footer</footer>
      </body>
    </html>
  );
}`}</pre>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">
              app/page.tsx — home route
            </div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`export default function HomePage() {
  return (
    <main>
      <h1>Welcome</h1>
      <p>This is the home page.</p>
    </main>
  );
}

// This renders INSIDE layout.tsx
// where {children} appears.`}</pre>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The layout renders once and <strong className="text-foreground">stays mounted</strong> as
          you navigate between pages. The page component swaps out. This is why your navigation bar
          (in the layout) doesn't flash on every route change.
        </p>
      </section>

      {/* ── 7. The shift from Pages Router ─────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">The shift from Pages Router</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you have read older Next.js tutorials, you may have seen{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">_app.tsx</code>,{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">getStaticProps</code>,
          or <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">getServerSideProps</code>.
          These belong to the legacy Pages Router and are no longer the recommended approach.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Pages Router (legacy)</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">App Router (current)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["pages/_app.tsx for shared layout", "app/layout.tsx — cleaner, nestable"],
                ["getStaticProps / getServerSideProps", "async Server Components fetch directly"],
                ["pages/api/ for API routes", "app/api/.../route.ts — same power, cleaner structure"],
                ["Client rendering by default", "Server rendering by default"],
              ].map(([old, next]) => (
                <tr key={old} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 text-muted-foreground line-through decoration-stone-300">{old}</td>
                  <td className="px-4 py-3 text-foreground">{next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Knowledge Check ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground">
          What is the difference between{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">layout.tsx</code>{" "}
          and{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">page.tsx</code>{" "}
          in the App Router?
        </p>
        <div className="flex flex-col gap-3">
          {[
            "layout.tsx is only for styling; page.tsx contains the data fetching logic",
            CORRECT,
            "They are interchangeable — Next.js picks one based on file size",
            "page.tsx wraps layout.tsx and provides the HTML shell",
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
          <p className="text-sm text-red-600">
            Not quite — think about which one stays mounted when you navigate and which one swaps out.
          </p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700">
            Correct! The layout wraps child pages and stays mounted across navigations — that is why
            your nav bar doesn't flash. The page renders the content specific to that route.
          </p>
        )}
      </section>

      {/* ── Gate ───────────────────────────────────────────── */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-green-800">Challenge passed</p>
              <p className="text-sm text-green-700 mt-0.5">
                Click <strong>Complete &amp; Next</strong> below to continue.
              </p>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5 rounded-2xl bg-stone-50 border border-border">
            <p className="text-sm font-sans text-muted-foreground">
              Answer the knowledge check above to unlock the next lesson.
            </p>
          </div>
        )}
      </section>

    </article>
  );
}
