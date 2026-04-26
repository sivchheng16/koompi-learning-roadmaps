import React from "react";

export default function Module03EnvSecrets() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Leaked API keys cost people thousands of dollars. A single accidental git push
          with an AWS key in the code has triggered bills in the tens of thousands — bots
          scrape GitHub for credentials within seconds of a push. This is not theoretical.
        </p>
      </section>

      {/* ── 2. What environment variables are ─────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What environment variables are</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Environment variables are runtime configuration — values that change between
          environments (development, staging, production) and must never be baked into
          your code or your Docker image.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The rule is simple: if the value would be different in production than on your
          laptop, it's an environment variable. If it's secret, it's especially not in code.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// Bad — secret in code, will be committed
const db = new Client({ password: 'hunter2' });

// Good — read from environment at runtime
const db = new Client({ password: process.env.DB_PASSWORD });`}</pre>
      </section>

      {/* ── 3. .env files ──────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">.env and .env.example</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.env</code> file holds your local secrets.
          It is <strong className="text-foreground">never committed</strong> — add it to{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.gitignore</code> immediately.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# .env — local only, NEVER commit
DATABASE_URL=postgres://localhost:5432/myapp_dev
JWT_SECRET=dev-secret-change-in-production
STRIPE_SECRET_KEY=sk_test_abc123`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Commit a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.env.example</code> instead — same
          keys, placeholder values. New developers copy it and fill in their own values.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# .env.example — committed to git
DATABASE_URL=postgres://localhost:5432/myapp_dev
JWT_SECRET=replace-me-with-a-random-32-char-string
STRIPE_SECRET_KEY=sk_test_your_key_here`}</pre>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# .gitignore
.env
.env.local
.env.*.local`}</pre>
      </section>

      {/* ── 4. Validation with Zod ─────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Validation at startup with Zod</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A missing or malformed environment variable should crash the app at startup with
          a clear error — not silently fail at 2 AM when a request tries to use it.
          Zod makes validation a one-liner per variable.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// src/config.ts
import { z } from 'zod';

const env = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET:   z.string().min(32),
  PORT:         z.coerce.number().default(3000),
  NODE_ENV:     z.enum(['development', 'test', 'production'])
                  .default('development'),
}).parse(process.env);

export default env;`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          If any variable is missing or invalid, <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">parse</code> throws
          immediately with a detailed error listing exactly which variables failed and why.
          Import <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">config.ts</code> at the top of your
          entry point so it runs before anything else.
        </p>
      </section>

      {/* ── 5. Secrets in production ───────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Where to put secrets in production</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every deployment platform has a way to set environment variables without touching
          your code or your Docker image.
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Vercel</p>
            <p className="text-sm text-muted-foreground mt-1">Project → Settings → Environment Variables. Set per environment (preview, production). Injected at build time and runtime.</p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">GitHub Secrets</p>
            <p className="text-sm text-muted-foreground mt-1">For CI/CD pipelines. Repository → Settings → Secrets. Referenced as <code className="text-xs bg-stone-100 px-1 py-0.5 rounded">{"${{ secrets.NAME }}"}</code> in workflows.</p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">AWS Secrets Manager / Parameter Store</p>
            <p className="text-sm text-muted-foreground mt-1">For cloud-native apps. Fetch at runtime rather than injecting at deploy. Supports automatic rotation.</p>
          </div>
        </div>
      </section>

      {/* ── 6. NEXT_PUBLIC_ ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">NEXT_PUBLIC_ — only for truly public config</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          In Next.js, variables prefixed <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">NEXT_PUBLIC_</code> are
          inlined into the browser bundle at build time. <strong className="text-foreground">Anyone can read them</strong> — they
          are baked into your JavaScript and served to every user.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Only use this prefix for values that are genuinely public: your public Stripe
          key, your analytics site ID, your app's public URL. Never use it for secrets.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# OK — public key, designed to be in the browser
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_abc123

# Never — this goes to the browser if you add NEXT_PUBLIC_
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_live_abc123  ← DO NOT DO THIS`}</pre>
      </section>

      {/* ── 7. Detecting leaks ─────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Detecting leaks before they hit GitHub</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Two tools can catch secrets before or after they reach git.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# gitleaks — scans for secrets in your commit history
brew install gitleaks
gitleaks detect --source .

# install as a pre-commit hook so it blocks commits with secrets
gitleaks protect --staged`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">GitGuardian</strong> connects to your GitHub account and monitors every
          push in real time — free for open-source. It will email you within minutes of a
          secret being pushed, even if you immediately delete the commit.
        </p>
      </section>

      {/* ── 8. Rotating secrets ────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Rotating secrets</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Rotate a secret when: it may have been exposed, when an employee with access
          leaves, or on a regular schedule (annually for low-risk, monthly for high-risk).
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The rotation process: generate a new secret, update it in your secret store,
          deploy (the app picks up the new value), verify the app works, then revoke the
          old secret. Never revoke before deploying — that creates downtime.
        </p>
      </section>

    </article>
  );
}
