import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

const OPTIONS = ["git stage .", "git add .", "git commit -a", "git push ."];
const CORRECT = "git add .";

export default function Module02BasicCommands() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/60">
          Track 05 · Git &amp; GitHub
        </p>
        <h1 className="text-4xl font-serif text-foreground">Basic Git Commands</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Six commands cover 90% of daily Git work:{" "}
          <code className="font-mono text-sm">add</code>,{" "}
          <code className="font-mono text-sm">commit</code>,{" "}
          <code className="font-mono text-sm">status</code>,{" "}
          <code className="font-mono text-sm">log</code>,{" "}
          <code className="font-mono text-sm">diff</code>, and undoing changes.
          This module drills them all with annotated terminal examples.
        </p>
      </section>

      {/* git add */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git add — Staging Changes</h2>
        <p className="text-base text-muted-foreground">
          Staging is the step between editing files and saving a commit. It lets you
          deliberately choose which changes belong in the next snapshot.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# Stage a single file
git add index.html

# Stage a folder
git add css/

# Stage everything in the working directory
git add .

# Stage parts of a file interactively (advanced)
git add -p index.html

# Unstage a file (keep your edits, just un-queue it)
git restore --staged index.html`}</pre>
        </div>
      </section>

      {/* git commit */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git commit — Saving a Snapshot</h2>
        <p className="text-base text-muted-foreground">
          A commit permanently saves everything in the staging area into the repository history
          with a message, timestamp, and author.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# Basic commit
git commit -m "Add hero section to homepage"

# Stage all tracked files and commit in one step
git commit -am "Fix typo in about page"

# Amend the last commit (before pushing)
git commit --amend -m "Better message for the last commit"`}</pre>
        </div>
      </section>

      {/* git status */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git status — What's Going On?</h2>
        <p className="text-base text-muted-foreground">
          Run <code className="font-mono text-sm">git status</code> constantly. It shows you
          which files are modified, staged, or untracked so you always know what Git sees.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Example output
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   about.html          ← staged ✓

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   index.html          ← changed, not staged

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        contact.html                    ← Git doesn't know about this yet`}</pre>
        </div>
      </section>

      {/* git log */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git log — Viewing History</h2>
        <p className="text-base text-muted-foreground">
          The log shows every commit in reverse chronological order. Each entry has a SHA-1
          hash (the unique ID), author, date, and message.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# Full log
git log

# Compact — one line per commit (great for overview)
git log --oneline

# Show only the last 5 commits
git log -5

# Log with a graph of branches
git log --oneline --graph --all

# Search commits by message
git log --grep="fix"

# Commits that changed a specific file
git log -- index.html`}</pre>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            git log --oneline output
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`a3f91bc Fix mobile nav overlap
7d2e4a1 Add contact form with validation
c1089ff Update hero section colours
3b55abc Add about page
e7812d0 Initial commit`}</pre>
        </div>
      </section>

      {/* git diff */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git diff — Seeing Changes</h2>
        <p className="text-base text-muted-foreground">
          <code className="font-mono text-sm">git diff</code> shows exactly what lines changed
          but haven't been staged yet. Lines starting with <code className="font-mono text-sm">+</code> were
          added; lines starting with <code className="font-mono text-sm">-</code> were removed.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# Unstaged changes (working dir vs last commit)
git diff

# Staged changes (what will go into the next commit)
git diff --staged

# Compare two commits
git diff a3f91bc 7d2e4a1

# Diff a specific file
git diff index.html`}</pre>
        </div>
      </section>

      {/* Undoing */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Undoing Changes</h2>
        <p className="text-base text-muted-foreground">
          Git gives you several ways to go back, depending on how far you went.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Common undo operations
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# Discard edits to a file (restore to last commit)
git restore index.html

# Unstage a file (keep edits, just remove from staging)
git restore --staged index.html

# Create a new commit that reverses a past commit (safe — history preserved)
git revert a3f91bc

# Move HEAD back N commits, keep working dir intact
git reset HEAD~1          # soft: un-commits but keeps staged files
git reset --mixed HEAD~1  # default: un-commits and unstages

# DESTRUCTIVE — discards commits AND working dir changes
# Only use locally before pushing
git reset --hard HEAD~1`}</pre>
        </div>

        <div className="rounded-2xl border border-border px-5 py-4">
          <p className="text-sm font-semibold text-foreground mb-1">Safe rule of thumb</p>
          <p className="text-sm text-muted-foreground">
            If the commits have already been pushed to a shared branch, use{" "}
            <code className="font-mono">git revert</code>. It adds a new commit that undoes the
            change, so history stays intact for your team.
          </p>
        </div>
      </section>

      {/* Cheat sheet */}
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
                ["git add .", "Stage all changes"],
                ["git add <file>", "Stage one file"],
                ["git commit -m \"msg\"", "Save a snapshot"],
                ["git status", "See current state"],
                ["git log --oneline", "Compact commit history"],
                ["git diff", "See unstaged changes"],
                ["git diff --staged", "See staged changes"],
                ["git restore <file>", "Discard unstaged edits"],
                ["git revert <sha>", "Undo a commit safely"],
              ].map(([cmd, desc]) => (
                <tr key={cmd}>
                  <td className="px-4 py-2 font-mono text-foreground">{cmd}</td>
                  <td className="px-4 py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Knowledge check */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Knowledge Check</h2>
        <p className="text-base text-muted-foreground">
          Which command stages <em>all</em> changed files in the current directory?
        </p>
        <div className="flex flex-col gap-2">
          {OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => {
                setSelected(opt);
                if (opt === CORRECT) notifyChallengePassed(moduleId ?? "");
              }}
              className={cn(
                "text-left px-5 py-3.5 rounded-xl border text-sm font-sans transition-all",
                selected === opt
                  ? opt === CORRECT
                    ? "border-green-400 bg-green-50 text-green-800"
                    : "border-red-300 bg-red-50 text-red-800"
                  : "border-border hover:border-primary/40 hover:bg-primary/5 text-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        {selected && selected !== CORRECT && (
          <p className="text-sm text-muted-foreground">Not quite — try another option.</p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700 font-medium">
            Correct! <code className="font-mono">git add .</code> stages every modified and
            untracked file in the current directory and its subdirectories.
          </p>
        )}
      </section>

      {/* Gate */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-green-800">Challenge passed</p>
              <p className="text-sm text-green-700 mt-0.5">
                Click <strong>Complete &amp; Next</strong> below to continue.
              </p>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5 rounded-2xl bg-stone-50 border border-border">
            <p className="text-sm font-sans text-muted-foreground">
              Complete the challenge above to unlock the next lesson.
            </p>
          </div>
        )}
      </section>

    </article>
  );
}
