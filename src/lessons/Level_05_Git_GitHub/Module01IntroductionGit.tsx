import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

const OPTIONS = ["git start", "git init", "git new", "git create"];
const CORRECT = "git init";

export default function Module01IntroductionGit() {
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
        <h1 className="text-4xl font-serif text-foreground">Introduction to Git</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every professional developer uses version control. Git is the tool that tracks every
          change you make to your code — so you can undo mistakes, experiment safely, and
          collaborate with teammates without overwriting each other's work.
        </p>
      </section>

      {/* What is version control */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">What is Version Control?</h2>
        <p className="text-base text-muted-foreground">
          Version control is a system that records changes to files over time. Think of it as
          an unlimited <em>Undo</em> button combined with a complete history log. You can:
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
          <li>See exactly what changed, when, and who changed it.</li>
          <li>Revert any file — or the whole project — to a previous state.</li>
          <li>Work on a risky experiment on a separate "branch" without touching working code.</li>
          <li>Merge contributions from multiple developers.</li>
        </ul>
      </section>

      {/* Git vs GitHub */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Git vs GitHub</h2>
        <p className="text-base text-muted-foreground">
          These two names are often confused. They are different things.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Git</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">GitHub</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {[
                ["Software installed on your computer", "A website and cloud service"],
                ["Tracks changes locally", "Hosts your repo online"],
                ["Works fully offline", "Requires internet"],
                ["Free, open-source", "Free tier + paid plans"],
                ["Created by Linus Torvalds, 2005", "Owned by Microsoft, 2018+"],
              ].map(([g, gh], i) => (
                <tr key={i}>
                  <td className="px-4 py-2">{g}</td>
                  <td className="px-4 py-2">{gh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground">
          Analogy: Git is a camera that takes snapshots. GitHub is a cloud photo album where
          you upload and share those snapshots.
        </p>
      </section>

      {/* Core concepts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Core Concepts</h2>

        <div className="space-y-3">
          <div className="rounded-2xl border border-border px-5 py-4 space-y-1">
            <p className="font-semibold text-foreground">Repository (repo)</p>
            <p className="text-sm text-muted-foreground">
              A folder where Git tracks all changes. Contains a hidden{" "}
              <code className="font-mono">.git/</code> directory that stores the entire history.
            </p>
          </div>
          <div className="rounded-2xl border border-border px-5 py-4 space-y-1">
            <p className="font-semibold text-foreground">Commit</p>
            <p className="text-sm text-muted-foreground">
              A snapshot of your files at a specific point in time. Each commit has a unique
              ID, a message, and a timestamp. You can always go back to any commit.
            </p>
          </div>
          <div className="rounded-2xl border border-border px-5 py-4 space-y-1">
            <p className="font-semibold text-foreground">Staging area</p>
            <p className="text-sm text-muted-foreground">
              Before committing, you <em>stage</em> files — you choose which changed files to
              include in the next commit. This lets you make multiple small, focused commits
              even if you changed many files at once.
            </p>
          </div>
        </div>
      </section>

      {/* The three-step workflow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">The init / add / commit Cycle</h2>
        <p className="text-base text-muted-foreground">
          Every Git session follows the same rhythm.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# 1. Create a new repository (do this once per project)
git init

# 2. Check what Git sees
git status

# 3. Edit your files, then stage them
git add .              # stage everything
git add index.html     # or stage one file

# 4. Save a snapshot
git commit -m "Add navigation bar"

# 5. Repeat steps 2–4 for every set of changes`}</pre>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            What git status shows
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`On branch main

Changes to be committed:          ← staged (will go into next commit)
  new file:   index.html

Changes not staged for commit:    ← modified but not staged yet
  modified:   style.css

Untracked files:                  ← Git doesn't know about these yet
  script.js`}</pre>
        </div>
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">First-time Setup</h2>
        <p className="text-base text-muted-foreground">
          Before your first commit, tell Git who you are. This information is stored in every
          commit you make.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal — run once on your machine
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`git config --global user.name  "Sokha Chan"
git config --global user.email "sokha@example.com"

# Verify
git config --list

# Check version
git --version

# Install on KOOMPI OS (Arch Linux) if not present
sudo pacman -S git`}</pre>
        </div>
      </section>

      {/* .gitignore */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">.gitignore</h2>
        <p className="text-base text-muted-foreground">
          Some files should never be committed — secrets, generated build outputs, and large
          dependency folders. List them in a <code className="font-mono text-sm">.gitignore</code>{" "}
          file at the root of your repo.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            .gitignore — common entries
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`node_modules/   # can always be reinstalled
dist/           # build output
.env            # secrets — NEVER commit this
.DS_Store       # macOS metadata
*.log           # log files`}</pre>
        </div>
      </section>

      {/* Good commit messages */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Writing Good Commit Messages</h2>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Bad vs good
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# Bad — tells you nothing
git commit -m "fix"
git commit -m "changes"
git commit -m "asdfgh"

# Good — explains what and why
git commit -m "Fix navigation overlap on mobile"
git commit -m "Add contact form with validation"
git commit -m "Remove unused CSS to reduce bundle size"`}</pre>
        </div>

        <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
          <li>Start with an imperative verb: Add, Fix, Update, Remove, Refactor.</li>
          <li>Keep it under 50 characters.</li>
          <li>Describe <em>what</em> changed, not <em>how</em>.</li>
        </ul>
      </section>

      {/* Knowledge check */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Knowledge Check</h2>
        <p className="text-base text-muted-foreground">
          Which command initialises a new Git repository in the current folder?
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
          <p className="text-sm text-muted-foreground">
            Not quite — try another option.
          </p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700 font-medium">
            Correct! <code className="font-mono">git init</code> creates the hidden{" "}
            <code className="font-mono">.git/</code> directory and starts tracking the folder.
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
