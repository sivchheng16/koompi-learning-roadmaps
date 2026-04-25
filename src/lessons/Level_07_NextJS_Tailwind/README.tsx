import React from "react";

export default function README() {
  const modules = [
    { num: "01", title: "App Router", desc: "Folder-based routing, page.tsx, layout.tsx, special files" },
    { num: "02", title: "Routing Deep-Dive", desc: "Dynamic routes, nested layouts, Link, middleware" },
    { num: "03", title: "Tailwind CSS", desc: "Utility-first styling, responsive design, dark mode" },
    { num: "04", title: "Data Fetching", desc: "Server components, fetch, cache, loading & error states" },
    { num: "05", title: "API Routes", desc: "route.ts handlers, request/response, full-stack patterns" },
    { num: "06", title: "Auth & Sessions", desc: "NextAuth.js, protected routes, middleware guards" },
    { num: "07", title: "Deployment", desc: "Vercel, environment variables, preview deployments" },
    { num: "08", title: "Project", desc: "Full-stack app: auth, data, API, deployment end-to-end" },
  ];

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ───────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          React teaches you how to build components. Next.js teaches you how to ship a product —
          routing, server rendering, API endpoints, and deployment wired together by convention,
          not configuration.
        </p>
      </section>

      {/* ── What Next.js adds ──────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What Next.js adds on top of React</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          React is a UI library — it renders components. Everything else (routing, data fetching,
          deployment) is left to you. Next.js makes those decisions once so you never have to.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Problem</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Next.js solution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Setting up a router", "File-based routing — folders are URLs"],
                ["SEO on a React app", "Server-side rendering (SSR) built in"],
                ["Writing a backend", "API routes live right inside the project"],
                ["Slow image loads", "next/image — auto resize, lazy load, WebP"],
                ["Flash of unstyled fonts", "next/font — zero layout shift"],
                ["Configuring Webpack", "Zero config — sensible defaults ship out of the box"],
              ].map(([prob, sol]) => (
                <tr key={prob} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 text-muted-foreground">{prob}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{sol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── App Router note ────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">This track uses the App Router</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Next.js 13 introduced the <strong className="text-foreground">App Router</strong> — a new
          way to build Next.js apps using React Server Components and a simpler{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono">app/</code> directory.
          The older <strong className="text-foreground">Pages Router</strong> (
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono">pages/</code>,{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono">_app.tsx</code>,{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono">getStaticProps</code>) still works
          but is no longer the recommended approach. Everything in this track assumes App Router.
        </p>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm text-amber-800">
            <strong>Prerequisites:</strong> you should be comfortable with React components, props,
            and hooks (<code className="bg-amber-100 px-1 rounded font-mono text-xs">useState</code>,{" "}
            <code className="bg-amber-100 px-1 rounded font-mono text-xs">useEffect</code>), and
            you should know basic TypeScript — interfaces, types, generics.
          </p>
        </div>
      </section>

      {/* ── What you'll build ──────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">What you will build</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          By the end of this track you will have a deployed, full-stack web app with user
          authentication, a database-backed API, server-rendered pages, and a Tailwind UI — the
          kind of project you can show in a portfolio or use as a starting point for a real product.
        </p>
      </section>

      {/* ── Track overview ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Track overview — 8 lessons</h2>
        <div className="flex flex-col gap-3">
          {modules.map(({ num, title, desc }) => (
            <div
              key={num}
              className="flex gap-4 items-start px-5 py-4 rounded-xl border border-border hover:bg-stone-50/60 transition-colors"
            >
              <span className="font-mono text-xs text-muted-foreground bg-stone-100 px-2 py-1 rounded shrink-0 mt-0.5">
                {num}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </article>
  );
}
