import React from "react";

export default function Module06GitWorkflows() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Header ─────────────────────────────────────────── */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/60">
          Track 05 · Git &amp; GitHub
        </p>
        <h1 className="text-4xl font-serif text-foreground">Git Workflows</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          How real teams organise their branches — and why it matters more than the commands.
        </p>
      </section>

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Knowing <code className="text-lg font-mono">git commit</code> and{" "}
          <code className="text-lg font-mono">git push</code> is table stakes.
          How a team organises its branches is what separates teams that ship confidently every day
          from teams that dread every merge.
        </p>
      </section>

      {/* ── 2. Trunk-Based Development ─────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Trunk-Based Development</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Everyone commits directly to <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">main</code> (the "trunk"),
          or works in very short-lived feature branches that merge back within two days.
          There is no long-lived <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">develop</code> branch.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 font-mono text-sm leading-loose text-foreground">
          <div className="text-muted-foreground mb-1"># Short-lived branch — lives ≤ 2 days</div>
          <div>git checkout -b fix/login-typo</div>
          <div>git commit -m "fix: correct login button label"</div>
          <div>git push origin fix/login-typo</div>
          <div className="mt-2 text-muted-foreground"># Open PR → review → merge same day</div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          Incomplete features ship behind <strong className="text-foreground">feature flags</strong> so the code is always
          in production but not yet visible to users. This keeps the branch graph simple and integration pain near zero.
        </p>
        <div className="rounded-xl border border-border px-5 py-4 text-sm text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground">Used by</p>
          <p>Google, Meta, Netflix — any org that ships continuously at scale.</p>
          <p className="mt-2 font-semibold text-foreground">Works best when</p>
          <p>You have fast CI, a mature test suite, and feature-flag infrastructure in place.</p>
        </div>
      </section>

      {/* ── 3. Git Flow ────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Git Flow</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Git Flow adds structure for projects that ship discrete, versioned releases — think mobile apps or open-source libraries.
          It defines five branch types with strict rules about which branch merges into which.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 font-mono text-sm leading-loose text-foreground overflow-x-auto">
          <div><span className="text-primary">main</span>        ← production-ready tags only (v1.0, v2.0 …)</div>
          <div><span className="text-primary">develop</span>     ← integration branch, always runnable</div>
          <div><span className="text-primary">feature/*</span>   ← branches off develop, merges back to develop</div>
          <div><span className="text-primary">release/*</span>   ← branches off develop, merges to main + develop</div>
          <div><span className="text-primary">hotfix/*</span>    ← branches off main, merges to main + develop</div>
        </div>
        <div className="rounded-xl border border-border px-5 py-4 text-sm text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground">Trade-off</p>
          <p>
            More structure means less ambiguity, but longer-lived branches mean bigger merges and slower feedback.
            It suits mobile apps (App Store releases) and libraries (semver), not web services that deploy hourly.
          </p>
        </div>
      </section>

      {/* ── 4. Feature Branch Workflow ─────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Feature Branch Workflow</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          One branch per feature or bug fix, opened as a PR against <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">main</code>.
          No <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">develop</code> branch. No release branches.
          This is the most common workflow for small and medium teams.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 font-mono text-sm leading-loose text-foreground">
          <div>git checkout -b feat/user-avatar</div>
          <div className="text-muted-foreground"># … work, commit, push …</div>
          <div>git push origin feat/user-avatar</div>
          <div className="text-muted-foreground"># Open PR → code review → squash-merge to main → delete branch</div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          Branches stay short (days, not weeks). PRs are reviewed by at least one other engineer.
          Main is always deployable. Simple enough to explain in five minutes; powerful enough for most teams.
        </p>
      </section>

      {/* ── 5. Conventional Commits ────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Conventional Commits</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A lightweight convention for commit message prefixes. Every commit starts with a type,
          an optional scope, and a short description.
        </p>
        <div className="rounded-xl border border-border overflow-hidden text-sm">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border font-mono text-muted-foreground text-xs">
            format: &lt;type&gt;(&lt;scope&gt;): &lt;description&gt;
          </div>
          <div className="divide-y divide-border">
            {[
              { type: "feat", desc: "a new feature visible to the user" },
              { type: "fix", desc: "a bug fix" },
              { type: "chore", desc: "tooling, deps, CI — not user-facing" },
              { type: "docs", desc: "documentation only" },
              { type: "refactor", desc: "restructuring without behaviour change" },
              { type: "test", desc: "adding or updating tests" },
              { type: "perf", desc: "performance improvement" },
            ].map(({ type, desc }) => (
              <div key={type} className="flex gap-4 px-5 py-3">
                <code className="shrink-0 text-primary font-mono w-24">{type}:</code>
                <span className="text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">Examples in practice:</p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 font-mono text-sm leading-loose text-foreground">
          <div>feat(auth): add Google OAuth login</div>
          <div>fix(cart): prevent double-submit on slow connections</div>
          <div>chore(deps): upgrade vite to 5.4</div>
          <div>docs(api): document pagination parameters</div>
          <div>refactor(sidebar): extract NavItem component</div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          Why bother? Tools like <strong className="text-foreground">semantic-release</strong> and{" "}
          <strong className="text-foreground">conventional-changelog</strong> read these prefixes to generate
          changelogs and bump version numbers automatically. Even without tooling, anyone can scan the log
          and instantly know what kind of change each commit contains.
        </p>
      </section>

      {/* ── 6. Writing Good PRs ────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Writing good pull requests</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A PR is a communication tool as much as a code delivery mechanism.
          Reviewers can only review what you explain.
        </p>
        <ul className="space-y-4 text-base text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-primary font-semibold shrink-0">Small</span>
            <span>
              Aim for fewer than 400 lines changed. Small PRs get reviewed faster, get better feedback,
              and are easier to revert if something goes wrong.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-semibold shrink-0">Title</span>
            <span>
              Say what it does, not what you did. <em>"Add dark-mode toggle to settings page"</em> beats{" "}
              <em>"fix stuff"</em> or <em>"WIP"</em>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-semibold shrink-0">Body</span>
            <span>
              Explain <strong className="text-foreground">why</strong> you made the change, what the
              key decisions were, and how a reviewer can test it locally. Link the issue or ticket.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-semibold shrink-0">Context</span>
            <span>
              Screenshots or screen recordings for UI changes. Before/after numbers for performance changes.
              A reviewer should never have to ask "what does this look like?"
            </span>
          </li>
        </ul>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 text-sm text-foreground leading-relaxed">
          <p className="font-semibold mb-3">PR body template</p>
          <pre className="font-mono text-muted-foreground whitespace-pre-wrap text-xs leading-loose">{`## Why
Closes #312. The settings page had no dark-mode option; users
had to rely on the OS system preference.

## What changed
- Added <ThemeToggle> component (src/components/ThemeToggle.tsx)
- Wired it to ThemeContext, which already existed
- Persists choice to localStorage

## How to test
1. Open /settings
2. Toggle the switch — page should switch theme immediately
3. Refresh — preference should persist`}</pre>
        </div>
      </section>

      {/* ── 7. Code Review Etiquette ───────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Code review etiquette</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Code review is a conversation, not a judgement. Both sides have responsibilities.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border px-5 py-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">As reviewer</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-none">
              <li className="flex gap-2"><span className="text-primary shrink-0">→</span>Be specific. Quote the line, state the concern.</li>
              <li className="flex gap-2"><span className="text-primary shrink-0">→</span>Suggest, don't demand. <em>"Consider X because Y"</em> not <em>"Change this."</em></li>
              <li className="flex gap-2"><span className="text-primary shrink-0">→</span>Distinguish blockers from nitpicks — label them.</li>
              <li className="flex gap-2"><span className="text-primary shrink-0">→</span>Approve when it's good enough, not when it matches how you'd write it.</li>
              <li className="flex gap-2"><span className="text-primary shrink-0">→</span>Respond within one working day so PRs don't stall.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border px-5 py-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">As author</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-none">
              <li className="flex gap-2"><span className="text-primary shrink-0">→</span>Reply to every comment — even just "done" or "won't fix + reason".</li>
              <li className="flex gap-2"><span className="text-primary shrink-0">→</span>Don't take feedback personally; it's about the code, not you.</li>
              <li className="flex gap-2"><span className="text-primary shrink-0">→</span>If a comment is unclear, ask — don't guess.</li>
              <li className="flex gap-2"><span className="text-primary shrink-0">→</span>Re-request review after addressing feedback.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 8. Which Workflow to Choose ────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Which workflow should you use?</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          There is no universally correct answer — it depends on team size, release cadence, and infrastructure maturity.
        </p>
        <div className="rounded-xl border border-border overflow-hidden text-sm">
          <div className="grid grid-cols-3 bg-stone-50 border-b border-border font-semibold text-foreground">
            <div className="px-4 py-3">Situation</div>
            <div className="px-4 py-3 border-l border-border">Workflow</div>
            <div className="px-4 py-3 border-l border-border">Why</div>
          </div>
          {[
            {
              situation: "Solo or small team (≤ 5), shipping a web app",
              workflow: "Feature Branch",
              why: "Low overhead, clear review loop, easy to learn",
            },
            {
              situation: "Versioned mobile app or OSS library",
              workflow: "Git Flow",
              why: "Release branches and hotfix paths map to App Store release cycles",
            },
            {
              situation: "Large team, deploy many times a day",
              workflow: "Trunk-Based",
              why: "Eliminates merge debt; requires strong CI + feature flags",
            },
          ].map(({ situation, workflow, why }) => (
            <div key={workflow} className="grid grid-cols-3 border-t border-border divide-x divide-border text-muted-foreground">
              <div className="px-4 py-3">{situation}</div>
              <div className="px-4 py-3 font-semibold text-foreground">{workflow}</div>
              <div className="px-4 py-3">{why}</div>
            </div>
          ))}
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          Start with Feature Branch Workflow. Once your team outgrows it — PRs taking too long, merge conflicts everywhere,
          deploys feel risky — that is the signal to evaluate Trunk-Based Development.
          Git Flow is rarely the right choice for a new project today.
        </p>
      </section>

      {/* ── 9. Summary ─────────────────────────────────────── */}
      <section className="rounded-2xl bg-stone-50 border border-border px-6 py-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Key takeaways</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary shrink-0">·</span>Trunk-Based keeps the branch graph simple but demands feature flags and fast CI.</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">·</span>Git Flow adds release structure at the cost of longer-lived branches and heavier merges.</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">·</span>Feature Branch Workflow is the right default for most teams.</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">·</span>Conventional Commits make history readable and enable automated changelogs.</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">·</span>Small PRs + clear descriptions + respectful review culture = fast, safe shipping.</li>
        </ul>
      </section>

    </article>
  );
}
