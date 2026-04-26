import React from "react";
import { BookOpen, CheckCircle2, Code2, Layers, Zap } from "lucide-react";

const LESSONS = [
  { num: "01", title: "Introduction to TypeScript", desc: "Types, inference, union types, and compiling" },
  { num: "02", title: "Functions & Interfaces", desc: "Typed functions, optional params, interface shapes" },
  { num: "03", title: "Generics", desc: "Write reusable code that stays type-safe" },
  { num: "04", title: "Classes & Access Modifiers", desc: "OOP patterns with TypeScript's class system" },
  { num: "05", title: "Building a Typed API Client", desc: "Final project: fetch real data with full type safety" },
];

export default function TypeScriptREADME() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ─────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          JavaScript lets you ship fast. TypeScript lets you ship fast{" "}
          <em>and</em> sleep well — because the compiler catches your mistakes
          before users do.
        </p>
      </section>

      {/* ── 2. What is TypeScript ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What TypeScript is</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          TypeScript is JavaScript with <strong className="text-foreground">type annotations</strong> added on
          top. You write <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.ts</code> files, and
          the TypeScript compiler (<code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">tsc</code>)
          erases the types and outputs plain{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.js</code> that any browser or Node
          process can run. The types exist only for you and your editor — they
          disappear at runtime.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Because TypeScript is a <strong className="text-foreground">superset</strong> of JavaScript, every
          valid JavaScript file is already a valid TypeScript file. You can
          adopt it incrementally — rename one file, fix the errors it surfaces,
          move on.
        </p>
      </section>

      {/* ── 3. Why it matters ───────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Why it matters</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: <Zap size={18} className="text-amber-500" />,
              title: "Catch bugs before runtime",
              body: "Typos in property names, wrong argument types, missing return values — all flagged instantly, not after a user reports a crash.",
            },
            {
              icon: <Code2 size={18} className="text-sky-500" />,
              title: "IDE autocomplete",
              body: "Your editor knows exactly what properties and methods are available. Tab-completion becomes reliable documentation.",
            },
            {
              icon: <BookOpen size={18} className="text-violet-500" />,
              title: "Self-documenting code",
              body: "A function signature like greet(name: string): string tells you everything you need to call it — no need to read the body.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border px-5 py-4 space-y-2">
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm font-semibold text-foreground">{title}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Prerequisites ────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Prerequisites</h2>
        <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-amber-50 border border-amber-200">
          <Layers size={20} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">JavaScript Advanced required</p>
            <p className="text-sm text-amber-700 mt-0.5">
              This track assumes you are comfortable with ES6+ syntax, async/await, closures, and
              array methods. Complete the <strong>JavaScript Advanced</strong> track before
              starting here.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Track overview ───────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">What you will build</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Over five lessons you will progressively type a real-world{" "}
          <strong className="text-foreground">API client</strong> — the kind of module that sits at the
          heart of every frontend application. By the end it will be fully typed, free of{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">any</code>, and ready to
          drop into a production codebase.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground uppercase tracking-wide">
            Track — 5 lessons
          </div>
          <ul className="divide-y divide-border">
            {LESSONS.map(({ num, title, desc }) => (
              <li key={num} className="flex items-start gap-4 px-5 py-4">
                <span className="text-xs font-mono text-muted-foreground mt-0.5 shrink-0 w-5">{num}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                </div>
                <CheckCircle2 size={16} className="text-stone-300 ml-auto mt-0.5 shrink-0" />
              </li>
            ))}
          </ul>
        </div>
      </section>

    </article>
  );
}
