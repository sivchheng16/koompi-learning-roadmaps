import React from "react";

export default function Module08Deployment() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Deployment</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Your app works locally. Now make it work for everyone. This lesson covers deploying to Vercel, understanding build output, CI with GitHub Actions, and other hosting options.
        </p>
      </section>

      {/* Vercel */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Deploying to Vercel</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Vercel is the easiest path — it is built by the same team as Next.js and understands the framework natively. Import your GitHub repository and every push to <code className="bg-stone-100 px-1 rounded text-xs font-mono">main</code> triggers a production deploy automatically.
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
          <li>Push your project to a GitHub repository.</li>
          <li>Go to <span className="font-medium text-foreground">vercel.com</span> and sign in with GitHub.</li>
          <li>Click <span className="font-medium text-foreground">Add New → Project</span> and import your repo.</li>
          <li>Leave all settings as-is (Vercel auto-detects Next.js) and click <span className="font-medium text-foreground">Deploy</span>.</li>
        </ol>
        <div className="px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-800">
          The free Hobby plan is enough for personal projects and side projects. It includes a generous CDN, automatic HTTPS, and unlimited preview deployments.
        </div>
      </section>

      {/* Environment variables */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Environment Variables</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Add secrets in your Vercel project: <span className="font-medium text-foreground">Project → Settings → Environment Variables</span>. Choose which environments (Production, Preview, Development) each variable applies to.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# .env.local  (local dev — git-ignored)
DATABASE_URL=postgresql://localhost/myapp
AUTH_SECRET=dev-secret

# Variables without NEXT_PUBLIC_ are server-only
# Variables with NEXT_PUBLIC_ are bundled into the browser
NEXT_PUBLIC_API_URL=https://api.myapp.com`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Never commit <code className="bg-stone-100 px-1 rounded text-xs font-mono">.env.local</code> to git. Check that <code className="bg-stone-100 px-1 rounded text-xs font-mono">.gitignore</code> includes it — <code className="bg-stone-100 px-1 rounded text-xs font-mono">create-next-app</code> adds it by default.
        </p>
      </section>

      {/* Preview deployments */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Preview Deployments</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every pull request on Vercel gets its own unique URL — a full deploy of that branch. Share it with designers or stakeholders for review before merging. You are reviewing the code in production conditions, with real environment variables (from the Preview environment), not mocked data.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Preview URL pattern</div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`my-app-git-feat-new-nav-username.vercel.app`}</pre>
        </div>
      </section>

      {/* Build output */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Understanding Build Output</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Run <code className="bg-stone-100 px-1 rounded text-xs font-mono">next build</code> locally before deploying. The output table shows each route, its size, and its render strategy.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`Route (app)                     Size     First Load JS
┌ ○ /                           5.2 kB        92 kB
├ ○ /about                      1.1 kB        88 kB
├ ƒ /dashboard                  3.4 kB        90 kB
├ ● /blog/[slug]                2.8 kB        89 kB
└ ○ /api/posts                  0 B           0 B

○  Static   ● SSG with params   ƒ  Dynamic`}</pre>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Symbol</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["○ (Static)", "Pre-rendered at build time — fastest possible response"],
                ["● (SSG)", "Pre-rendered at build time for each param (generateStaticParams)"],
                ["ƒ (Dynamic)", "Rendered on each request — needed for user-specific content"],
              ].map(([sym, desc]) => (
                <tr key={sym} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{sym}</td>
                  <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* next.config.ts */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">next.config.ts Essentials</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The two most common production settings are <code className="bg-stone-100 px-1 rounded text-xs font-mono">images.remotePatterns</code> (allow external image domains through the <code className="bg-stone-100 px-1 rounded text-xs font-mono">{"<Image>"}</code> component) and enabling server actions.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['my-proxy.my-domain.com'],
    },
  },
};

export default nextConfig;`}</pre>
      </section>

      {/* GitHub Actions CI */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">CI with GitHub Actions</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Run your test suite and build check on every push before Vercel deploys. If the build fails here, the deploy never happens.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# .github/workflows/ci.yml
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --run
      - run: npm run build`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Vercel integrates with GitHub: if the GitHub Actions check fails, the pull request shows a red status and the Vercel deploy is blocked from merging until it passes.
        </p>
      </section>

      {/* Other hosting */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Other Hosting Options</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Vercel is the default, but not the only option. Use alternatives when you need more control, lower cost at scale, or your company policy requires self-hosting.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Platform</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Vercel", "Default — easiest setup, best Next.js integration"],
                ["Railway", "Simple Git-push deploys with database add-ons in one click"],
                ["Render", "Free tier with persistent disks, good for hobby projects"],
                ["Docker + VPS", "Full control — any cloud provider, any configuration"],
                ["AWS / GCP / Azure", "Enterprise scale, existing cloud accounts"],
              ].map(([platform, desc]) => (
                <tr key={platform} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-medium text-foreground">{platform}</td>
                  <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For Docker, enable standalone output in <code className="bg-stone-100 px-1 rounded text-xs font-mono">next.config.ts</code> with <code className="bg-stone-100 px-1 rounded text-xs font-mono">output: 'standalone'</code> — it produces a self-contained build that does not need <code className="bg-stone-100 px-1 rounded text-xs font-mono">node_modules</code> in the container.
        </p>
      </section>

      {/* Pre-launch checklist */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Pre-Launch Checklist</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Before going public, run through these quickly:
        </p>
        <ul className="space-y-3 text-sm text-muted-foreground">
          {[
            ["Lighthouse score", "Run in Chrome DevTools → Lighthouse. Aim for 90+ on Performance and Accessibility."],
            ["Image optimisation", "Use next/image for all images. Check the build output for any that slipped through."],
            ["Bundle analysis", "Install @next/bundle-analyzer, run ANALYZE=true npm run build, and look for unexpectedly large dependencies."],
            ["Environment variables", "Confirm all required vars are set in the Vercel dashboard for the Production environment."],
            ["Error monitoring", "Add Sentry or similar — you won't know about production errors unless you instrument them."],
            ["Custom domain", "Add your domain in Vercel Project → Domains. Vercel provisions HTTPS automatically."],
          ].map(([item, desc]) => (
            <li key={item} className="flex gap-3">
              <span className="text-foreground font-medium shrink-0">{item}</span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </section>

    </article>
  );
}
