import React from "react";

export default function Module04Monitoring() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Don't wait for users to tell you something broke. By the time someone files a
          support ticket, the bug has been affecting people for an hour. Monitoring means
          you know before they do.
        </p>
      </section>

      {/* ── 2. Structured logging ──────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Structured logging</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">console.log('user logged in')</code> is not
          a log — it's a string you can't search, filter, or alert on. Structured logs are
          JSON objects that machines can parse.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`npm install pino pino-pretty`}</pre>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// src/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  ...(process.env.NODE_ENV === 'development'
    ? { transport: { target: 'pino-pretty' } }  // human-readable in dev
    : {}),  // JSON in production — parsed by log aggregators
});

// usage
logger.info({ userId: 42, action: 'login' }, 'User logged in');
logger.error({ err, requestId }, 'Failed to process payment');`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every log line should carry context: what happened, who triggered it, and any
          relevant IDs. A log without context is just noise.
        </p>
      </section>

      {/* ── 3. Log levels ──────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Log levels</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Log levels let you control verbosity without changing code. In production, set
          the level to <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">info</code>. In development,
          set it to <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">debug</code>.
        </p>
        <div className="space-y-2">
          {[
            { level: "error", description: "Something broke that needs immediate attention. Always log." },
            { level: "warn", description: "Something unexpected but recoverable. Log in all environments." },
            { level: "info", description: "Normal operational events: server started, user logged in, job completed." },
            { level: "debug", description: "Detailed diagnostic info. Log in dev only — too noisy for production." },
          ].map(({ level, description }) => (
            <div key={level} className="flex gap-4 items-start rounded-xl border border-border px-5 py-3">
              <code className="text-sm text-primary font-mono shrink-0 w-12">{level}</code>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Sentry ──────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Error tracking with Sentry</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Sentry catches unhandled exceptions and sends them to a dashboard with the full
          stack trace, the request context, and the user who experienced it. Free tier is
          enough for most small apps.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`npm install @sentry/node`}</pre>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// src/instrument.ts — import this FIRST in your entry point
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,  // capture 10% of transactions for performance
});`}</pre>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// capture exceptions manually when you catch them
try {
  await processPayment(order);
} catch (err) {
  Sentry.captureException(err);
  // still handle the error for the user
  return res.status(500).json({ error: 'Payment failed' });
}`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Upload source maps so Sentry can show original TypeScript line numbers instead
          of compiled JavaScript. The Sentry Vite and webpack plugins do this automatically
          on each build.
        </p>
      </section>

      {/* ── 5. Uptime monitoring ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Uptime monitoring</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          An uptime monitor sends an HTTP request to your app every minute and alerts you
          if it doesn't get a 200 back. Setup takes two minutes and it's often free.
        </p>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span><strong className="text-foreground">UptimeRobot</strong> — free tier, 50 monitors, 5-minute intervals</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span><strong className="text-foreground">Better Uptime</strong> — cleaner UI, incident management, free tier available</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span><strong className="text-foreground">Fly.io / Render built-in</strong> — if you deploy there, health checks are already configured</span></li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          Point the monitor at your <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">/health</code> endpoint,
          not your homepage. The homepage may serve a cached response even when the
          database is down.
        </p>
      </section>

      {/* ── 6. Health check endpoint ───────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Health check endpoint</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A health check endpoint lets load balancers, uptime monitors, and orchestrators
          ask "is this service alive?" without knowing anything about your app's domain.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');  // verify the database is reachable
    res.json({
      status: 'ok',
      version: process.env.npm_package_version,
      uptime: process.uptime(),
    });
  } catch (err) {
    res.status(503).json({ status: 'error', error: 'Database unreachable' });
  }
});`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Return <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">200</code> when healthy,{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">503</code> when not. Include the app version
          so you can see which deploy is running without SSH-ing into the server.
        </p>
      </section>

      {/* ── 7. Metrics ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Metrics: what to measure</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Three metrics tell you almost everything about your app's health in production:
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Response time (p50, p95, p99)</p>
            <p className="text-sm text-muted-foreground mt-1">The median is how fast things are for most users. p95 and p99 show how bad it gets for the unlucky ones. Watch p95 — it captures real user pain.</p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Error rate</p>
            <p className="text-sm text-muted-foreground mt-1">Percentage of requests returning 5xx. Baseline it when everything is healthy; alert when it spikes above that baseline.</p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Throughput (requests per second)</p>
            <p className="text-sm text-muted-foreground mt-1">Normal traffic has a pattern. An unexpected drop in throughput often means users can't reach your app — even if the health check still passes.</p>
          </div>
        </div>
      </section>

      {/* ── 8. Alerting ────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Alerting: when to wake someone up</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Not every error needs a 3 AM page. Alert fatigue is real — if every minor issue
          creates noise, people start ignoring alerts.
        </p>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span><strong className="text-foreground">Wake someone up:</strong> app is down, error rate above 5%, payment processing failing</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span><strong className="text-foreground">Slack notification:</strong> error rate elevated but under threshold, unusual traffic spike</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span><strong className="text-foreground">Log and move on:</strong> a single 404, a bot probing endpoints, a slow request under the P95 threshold</span></li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          Start with just uptime alerts and Sentry for errors. Add more alerting only when
          you've been burned by something that those two didn't catch.
        </p>
      </section>

    </article>
  );
}
