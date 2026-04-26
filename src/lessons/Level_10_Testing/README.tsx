import React from "react";

export default function TestingREADME() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ───────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Untested code is not finished code — it is a liability you have not paid off yet.
          This track teaches you how to write tests that actually protect you, and how to
          make testing a natural part of shipping software.
        </p>
      </section>

      {/* ── What this track covers ─────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What this track covers</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Four modules take you from testing philosophy all the way to automated end-to-end
          tests running in CI. Each module is self-contained but builds on the previous one.
        </p>
        <ul className="space-y-3 text-base text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-primary font-mono shrink-0 mt-0.5">01</span>
            <span><strong className="text-foreground">Philosophy</strong> — the testing pyramid, TDD, what to test and what not to.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-mono shrink-0 mt-0.5">02</span>
            <span><strong className="text-foreground">Unit Testing</strong> — Vitest setup, matchers, mocking, async tests, snapshots.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-mono shrink-0 mt-0.5">03</span>
            <span><strong className="text-foreground">Integration Testing</strong> — testing Express APIs with supertest, real vs mocked databases.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-mono shrink-0 mt-0.5">04</span>
            <span><strong className="text-foreground">E2E Testing</strong> — Playwright setup, locators, Page Object Model, CI headless runs.</span>
          </li>
        </ul>
      </section>

      {/* ── Prerequisites ──────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Prerequisites</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          You should be comfortable writing JavaScript functions and using Node.js from the
          terminal. Familiarity with async/await and basic Express routing will help for
          Modules 03 and 04, but is not required for the first two.
        </p>
      </section>

      {/* ── Testing pyramid ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The testing pyramid</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Not all tests are equal. The pyramid is a mental model for balancing speed, cost,
          and confidence across three layers.
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-border px-6 py-4 flex gap-5 items-start">
            <span className="text-2xl font-mono text-muted-foreground shrink-0">E2E</span>
            <div>
              <p className="text-sm font-semibold text-foreground">End-to-end — few, slow, expensive</p>
              <p className="text-sm text-muted-foreground mt-1">Drive a real browser through your critical paths. High confidence, but minutes per run. Use sparingly.</p>
            </div>
          </div>
          <div className="rounded-xl border border-border px-6 py-4 flex gap-5 items-start">
            <span className="text-2xl font-mono text-muted-foreground shrink-0">INT</span>
            <div>
              <p className="text-sm font-semibold text-foreground">Integration — medium quantity, medium speed</p>
              <p className="text-sm text-muted-foreground mt-1">Test multiple modules together. Catch contract mismatches between layers. Seconds per run.</p>
            </div>
          </div>
          <div className="rounded-xl border border-border px-6 py-4 flex gap-5 items-start">
            <span className="text-2xl font-mono text-muted-foreground shrink-0">UNIT</span>
            <div>
              <p className="text-sm font-semibold text-foreground">Unit — many, fast, cheap</p>
              <p className="text-sm text-muted-foreground mt-1">Test one function in isolation. Milliseconds per run. The foundation of a healthy test suite.</p>
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}
