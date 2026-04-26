import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

const OPTIONS = [
  "git branch -b <branch-name>",
  "git new branch <branch-name>",
  "git checkout -b <branch-name>",
  "git switch --create <branch-name>",
];
const CORRECT = "git checkout -b <branch-name>";

export default function Module04Collaboration() {
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
        <h1 className="text-4xl font-serif text-foreground">Branching &amp; Collaboration</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Branches let multiple people work on different features simultaneously without
          interfering with each other. Pull requests turn that work into a structured review
          process before anything reaches the main codebase.
        </p>
      </section>

      {/* What is a branch */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">What is a Branch?</h2>
        <p className="text-base text-muted-foreground">
          A branch is an independent line of development. Think of it as a parallel universe
          copy of your code where you can experiment, build a feature, or fix a bug — without
          touching the working <code className="font-mono text-sm">main</code> branch.
          When the work is done you <em>merge</em> it back.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Branch timeline
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`main:    A──B──C──────────────M   ← M = merge commit
                  \\          /
feature/navbar:   D──E──F──G      ← safe to experiment here`}</pre>
        </div>
      </section>

      {/* Creating branches */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Creating &amp; Switching Branches</h2>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# List all branches (* = current)
git branch

# Create a new branch (stays on current branch)
git branch feature/navbar

# Switch to an existing branch
git checkout feature/navbar

# Create AND switch in one command (most common)
git checkout -b feature/navbar

# Modern equivalent (Git 2.23+)
git switch -c feature/navbar

# Push the new branch to GitHub
git push -u origin feature/navbar

# Delete a branch after merging
git branch -d feature/navbar`}</pre>
        </div>
      </section>

      {/* Merging */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Merging Branches</h2>
        <p className="text-base text-muted-foreground">
          Merging combines the commit history of two branches. Switch to the target branch
          first (usually <code className="font-mono text-sm">main</code>), then run{" "}
          <code className="font-mono text-sm">git merge</code>.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# Switch to the branch you want to merge INTO
git checkout main

# Merge the feature branch
git merge feature/navbar

# Fast-forward merge (no merge commit if history is linear)
git merge --ff-only feature/navbar

# Always create a merge commit even if fast-forward is possible
git merge --no-ff feature/navbar -m "Merge feature/navbar"`}</pre>
        </div>
      </section>

      {/* Pull requests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Pull Requests</h2>
        <p className="text-base text-muted-foreground">
          A Pull Request (PR) is GitHub's way to propose merging one branch into another.
          It's the standard collaboration workflow: push your branch, open a PR, get reviewed,
          then merge.
        </p>

        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Create and work on a feature branch locally.</li>
          <li>Push the branch to GitHub: <code className="font-mono">git push -u origin feature/navbar</code></li>
          <li>On GitHub, click <strong>Compare &amp; pull request</strong>.</li>
          <li>Add a title and description explaining what changed and why.</li>
          <li>Request reviews from teammates.</li>
          <li>Address feedback with new commits on the same branch.</li>
          <li>Once approved, click <strong>Merge pull request</strong>.</li>
          <li>Delete the feature branch (GitHub offers a button).</li>
        </ol>
      </section>

      {/* Merge conflicts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Merge Conflicts</h2>
        <p className="text-base text-muted-foreground">
          A conflict happens when two branches changed the same lines differently. Git marks
          the conflict in the file and asks you to resolve it manually.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Conflict markers in a file
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`<<<<<<< HEAD                          ← your current branch
<h1>Welcome to KOOMPI</h1>
=======                               ← separator
<h1>Hello from KOOMPI Academy</h1>
>>>>>>> feature/new-hero              ← incoming branch`}</pre>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Resolving a conflict
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# 1. Open the conflicted file and delete the markers.
#    Keep the version you want (or write a new version combining both).

# 2. Stage the resolved file
git add index.html

# 3. Complete the merge
git commit -m "Merge feature/new-hero — use combined heading"

# Tip: use git status to see all conflicted files
git status`}</pre>
        </div>
      </section>

      {/* Team workflow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Team Workflow</h2>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Feature branch workflow — complete cycle
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# Get the latest main
git checkout main
git pull

# Branch off for your feature
git checkout -b feature/contact-form

# Build the feature, commit often
git add .
git commit -m "Add contact form HTML"
git add .
git commit -m "Add form validation"

# Push and open a PR
git push -u origin feature/contact-form
# → Go to GitHub → open Pull Request

# After PR is merged, clean up
git checkout main
git pull                              # get the merge
git branch -d feature/contact-form   # delete local branch`}</pre>
        </div>
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
                ["git branch", "List branches"],
                ["git checkout -b <name>", "Create + switch to branch"],
                ["git checkout <name>", "Switch to existing branch"],
                ["git merge <name>", "Merge branch into current"],
                ["git branch -d <name>", "Delete merged branch"],
                ["git push -u origin <name>", "Push branch to GitHub"],
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
          Which command creates a new branch <em>and</em> switches to it in one step?
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
            Correct! <code className="font-mono">git checkout -b &lt;branch-name&gt;</code> creates
            the branch and immediately switches to it. The modern equivalent is{" "}
            <code className="font-mono">git switch -c &lt;branch-name&gt;</code>.
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
