import React from "react";

export default function Module02CICD() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Manual deploys are a source of bugs. You forget a step, you skip the tests
          because you're in a hurry, you deploy on a Friday afternoon. Automate everything —
          every push runs tests, every merge deploys. The pipeline is the process.
        </p>
      </section>

      {/* ── 2. CI and CD defined ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">CI and CD defined</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Continuous Integration (CI)</strong> means every push to any branch
          automatically runs your test suite. The goal is fast feedback — you know within
          minutes whether your change broke something.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Continuous Deployment (CD)</strong> means every merge to the main branch
          automatically deploys to production. Combined with CI, it creates a pipeline
          where tested code ships without human intervention.
        </p>
      </section>

      {/* ── 3. GitHub Actions anatomy ──────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">GitHub Actions anatomy</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A GitHub Actions <strong className="text-foreground">workflow</strong> is a YAML file in{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.github/workflows/</code>. It contains:
        </p>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-3"><span className="text-primary font-mono shrink-0">trigger</span><span>when to run — on push, pull_request, schedule, or manually</span></li>
          <li className="flex gap-3"><span className="text-primary font-mono shrink-0">jobs</span><span>parallel units of work, each running on a fresh VM</span></li>
          <li className="flex gap-3"><span className="text-primary font-mono shrink-0">steps</span><span>sequential commands within a job — checkout, install, test, deploy</span></li>
        </ul>
      </section>

      {/* ── 4. A complete CI workflow ──────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">A complete CI workflow for Node.js</h2>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'        # cache node_modules between runs

      - run: npm ci           # clean install, respects package-lock.json

      - run: npm test -- --run   # run tests once, don't watch

      - run: npm run build    # verify it compiles`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">cache: 'npm'</code> option caches
          the npm cache between runs, cutting install time from 30 seconds to 5 seconds on
          a warm cache.
        </p>
      </section>

      {/* ── 5. Secrets ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Using secrets in GitHub Actions</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Never put API keys, deploy tokens, or passwords in your workflow file. Store
          them as <strong className="text-foreground">repository secrets</strong> in GitHub (Settings → Secrets and
          variables → Actions) and reference them with{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">{"${{ secrets.NAME }}"}</code>.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{"- name: Deploy to Fly.io\n  env:\n    FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}\n  run: |\n    curl -L https://fly.io/install.sh | sh\n    flyctl deploy --remote-only"}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          GitHub redacts secret values from logs automatically. You'll see{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">***</code> wherever the value would appear.
        </p>
      </section>

      {/* ── 6. Deploy step ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Deploy step after tests pass</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Add a deploy job that depends on the test job. It only runs when the test job
          succeeds, and only on the main branch.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{"jobs:\n  test:\n    runs-on: ubuntu-latest\n    steps: [...]   # test steps from above\n\n  deploy:\n    needs: test          # wait for test job to pass\n    if: github.ref == 'refs/heads/main'  # only deploy from main\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      # Option A: deploy to Vercel\n      - run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}\n\n      # Option B: push a Docker image and deploy to Fly.io\n      - name: Build and push Docker image\n        run: |\n          docker build -t registry.fly.io/myapp:${{ github.sha }} .\n          docker push registry.fly.io/myapp:${{ github.sha }}\n          flyctl deploy --image registry.fly.io/myapp:${{ github.sha }}"}</pre>
      </section>

      {/* ── 7. Branch protection ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Branch protection: require CI to pass before merging</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Branch protection rules prevent merging a pull request if CI is failing.
          Enable them in GitHub: Settings → Branches → Add rule → require status checks.
        </p>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span>Require the <strong className="text-foreground">test</strong> job to pass before merging</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span>Require at least one approving review on pull requests</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span>Disallow force-pushes to main</span></li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          With branch protection on, the main branch is always in a deployable state. CI
          isn't advisory — it's the gate.
        </p>
      </section>

      {/* ── 8. Status badges ───────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Status badges in README</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Add a badge to your README that shows the current CI status. It's a quick signal
          to anyone visiting the repo: green means the main branch is healthy.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`<!-- in README.md -->
![CI](https://github.com/your-org/your-repo/actions/workflows/ci.yml/badge.svg)

<!-- renders as a live badge: passing | failing -->`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Get the exact URL from Actions → select your workflow → the three-dot menu → "Create status badge".
        </p>
      </section>

    </article>
  );
}
