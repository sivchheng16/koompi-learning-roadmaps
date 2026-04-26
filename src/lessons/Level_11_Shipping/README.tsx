import React from "react";

export default function ShippingREADME() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ───────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          The gap between "works on my machine" and "works in production" is where projects
          go to die. This track closes that gap — containers, automated deploys, secret
          management, and monitoring that tells you when something breaks before your users do.
        </p>
      </section>

      {/* ── What this track covers ─────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What this track covers</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Four modules take you from writing a Dockerfile to watching your production app
          in real time. Each module is a skill you can apply immediately.
        </p>
        <ul className="space-y-3 text-base text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-primary font-mono shrink-0 mt-0.5">01</span>
            <span><strong className="text-foreground">Docker</strong> — containers, images, Dockerfile, docker-compose, multi-stage builds.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-mono shrink-0 mt-0.5">02</span>
            <span><strong className="text-foreground">CI/CD</strong> — GitHub Actions, automated testing, deploy pipelines, branch protection.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-mono shrink-0 mt-0.5">03</span>
            <span><strong className="text-foreground">Environment & Secrets</strong> — .env files, validation at startup, production secret storage, leak prevention.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-mono shrink-0 mt-0.5">04</span>
            <span><strong className="text-foreground">Monitoring</strong> — structured logging, error tracking with Sentry, uptime checks, alerting.</span>
          </li>
        </ul>
      </section>

      {/* ── What you'll be able to do ──────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What you'll be able to do</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm text-muted-foreground">
              Package any Node.js app into a Docker container that runs identically on your laptop,
              a colleague's machine, and a cloud server.
            </p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm text-muted-foreground">
              Set up a pipeline where every push runs tests automatically, and every merge
              to main deploys to production without manual steps.
            </p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm text-muted-foreground">
              Store secrets safely — never in code, never in git — and validate them at
              startup so a missing variable fails loudly instead of silently.
            </p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm text-muted-foreground">
              Know when your app is down, when errors spike, and what was happening in the
              logs right before something went wrong.
            </p>
          </div>
        </div>
      </section>

    </article>
  );
}
