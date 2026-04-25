export default function Module05AdvancedGit() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/60">
          Track 05 · Git &amp; GitHub
        </p>
        <h1 className="text-4xl font-serif text-foreground">Advanced Git</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          These are the commands that save you when things go wrong — and make your history
          look intentional. Once you know basic commits, branches, and merges, these tools
          give you surgical control over what happened, when, and on which branch.
        </p>
      </section>

      {/* git stash */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git stash — Save Work Without Committing</h2>
        <p className="text-base text-muted-foreground">
          Stash shelves your uncommitted changes so you can switch branches with a clean
          working tree. Nothing is committed — the changes sit in a temporary stack and
          can be restored any time.
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          When to use: you're mid-task on a feature and need to jump to another branch
          to review or hotfix something.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# Stash all uncommitted changes (tracked files)
git stash

# Include untracked files too
git stash -u

# List all stashes
git stash list
# Outputs:
# stash@{0}: WIP on feature/login: 3f2a1b9 Add form HTML
# stash@{1}: WIP on main: 7c4d8e2 Fix typo in README

# Restore the most recent stash (and remove it from the stack)
git stash pop

# Restore a specific stash without removing it
git stash apply stash@{1}

# Drop a stash you no longer need
git stash drop stash@{0}`}</pre>
      </section>

      {/* git rebase */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git rebase — Replay Commits on a New Base</h2>
        <p className="text-base text-muted-foreground">
          Rebase moves your commits to start from the tip of another branch instead of
          where they originally diverged. The result is a linear history with no merge
          commits — cleaner to read, easier to bisect.
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          When to use: before opening a PR, to bring your feature branch up to date with{" "}
          <code className="font-mono">main</code> without a noisy merge commit.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# On your feature branch — rebase onto main
git checkout feature/login
git rebase main

# Before:
# main:          A──B──C
#                    \\
# feature/login:      D──E

# After rebase:
# main:          A──B──C
#                         \\
# feature/login:           D'──E'  ← commits replayed on top of C

# If there are conflicts during rebase, Git pauses.
# Fix the conflict, then:
git add <resolved-file>
git rebase --continue

# Changed your mind? Abort and go back to where you started:
git rebase --abort`}</pre>

        <h3 className="text-lg font-serif text-foreground">Interactive Rebase</h3>
        <p className="text-base text-muted-foreground">
          Interactive rebase lets you rewrite, reorder, squash, or drop commits before
          they're shared. It's the standard way to clean up a messy local history.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# Rewrite the last 3 commits interactively
git rebase -i HEAD~3

# Git opens an editor listing the commits:
# pick 3f2a1b9 Add login form HTML
# pick 7c4d8e2 Fix typo
# pick 9a1c3f0 Add form validation

# Change "pick" to one of:
#   pick    — keep commit as-is
#   reword  — keep commit, edit its message
#   squash  — meld into the previous commit
#   fixup   — like squash, discard this commit's message
#   drop    — remove the commit entirely`}</pre>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800 leading-relaxed">
          <strong>Warning:</strong> rebase rewrites commit history (new SHA hashes). Never
          rebase a branch that has already been pushed and shared with others — it forces
          everyone else to reconcile diverged history. Only rebase local or unshared branches.
        </div>
      </section>

      {/* git cherry-pick */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git cherry-pick — Apply One Specific Commit</h2>
        <p className="text-base text-muted-foreground">
          Cherry-pick copies a single commit from any branch and applies it to the current
          branch. Only that commit is brought over — not the entire branch.
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          When to use: a critical bug fix landed on a feature branch and you need it on{" "}
          <code className="font-mono">main</code> right now, without merging the whole feature.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# Find the commit hash you want
git log feature/payments --oneline
# abc1234 Fix null pointer in checkout
# def5678 WIP: refactor cart logic   ← don't want this one

# Switch to the branch you want to apply the fix to
git checkout main

# Cherry-pick just that one commit
git cherry-pick abc1234

# Cherry-pick a range of commits (from older to newer, inclusive)
git cherry-pick abc1234^..def5678

# If there's a conflict, resolve it then:
git add <resolved-file>
git cherry-pick --continue

# Or abort:
git cherry-pick --abort`}</pre>
      </section>

      {/* git bisect */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git bisect — Binary Search for a Bug</h2>
        <p className="text-base text-muted-foreground">
          Bisect performs an automated binary search through your commit history to find
          the exact commit that introduced a regression. Git checks out the midpoint commit
          each round; you tell it good or bad; Git narrows down until it pinpoints the culprit.
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          When to use: the app is broken today but worked two weeks ago, and you have no
          idea which of the 200 commits between then and now caused it.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# Start a bisect session
git bisect start

# Mark the current commit as bad (the bug exists here)
git bisect bad

# Mark a known-good commit (e.g. a tag or old SHA)
git bisect good v1.0

# Git checks out the midpoint. Test your app, then tell Git:
git bisect good   # bug is NOT present here
# or
git bisect bad    # bug IS present here

# Repeat until Git says:
# abc1234 is the first bad commit
# <commit details>

# End the session and return to your original HEAD
git bisect reset`}</pre>
      </section>

      {/* git reflog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git reflog — Your Safety Net</h2>
        <p className="text-base text-muted-foreground">
          Reflog records every position HEAD has ever been at — even after resets, rebases,
          or deleted branches. If you've ever thought "I just lost my work", reflog is how
          you get it back.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# Show the full HEAD history
git reflog
# Outputs:
# 9a1c3f0 HEAD@{0}: rebase finished: returning to refs/heads/feature/login
# 3f2a1b9 HEAD@{1}: checkout: moving from main to feature/login
# 7c4d8e2 HEAD@{2}: commit: Fix typo in README
# abc1234 HEAD@{3}: commit: Add contact form

# Restore HEAD to a previous position (e.g. before a bad rebase)
git checkout HEAD@{2}

# Or create a new branch from that point to recover lost work
git checkout -b recovered-work HEAD@{2}`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Reflog entries expire after 90 days by default, so act quickly when recovering.
          It only exists locally — it is not pushed to GitHub.
        </p>
      </section>

      {/* Quick reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Quick Reference</h2>
        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Command</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">What it does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {[
                ["git stash", "Shelf uncommitted changes"],
                ["git stash pop", "Restore most recent stash"],
                ["git rebase main", "Replay current branch on top of main"],
                ["git rebase -i HEAD~N", "Interactively rewrite last N commits"],
                ["git cherry-pick <sha>", "Apply one commit to current branch"],
                ["git bisect start/good/bad", "Binary search for a regression"],
                ["git reflog", "See full HEAD history — recover lost work"],
              ].map(([cmd, desc]) => (
                <tr key={cmd}>
                  <td className="px-4 py-2 font-mono text-foreground whitespace-nowrap">{cmd}</td>
                  <td className="px-4 py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key rule callout */}
      <section>
        <div className="rounded-2xl border border-border bg-stone-50 px-6 py-5 space-y-1">
          <p className="text-sm font-semibold text-foreground">The one rule to remember</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <code className="font-mono">git rebase</code> rewrites history — new SHA hashes,
            new timeline. It's safe and powerful on local or unshared branches. On a branch
            others have already pulled, it creates a split timeline that requires a force-push
            and manual reconciliation for every collaborator. When in doubt, merge instead.
          </p>
        </div>
      </section>

    </article>
  );
}
