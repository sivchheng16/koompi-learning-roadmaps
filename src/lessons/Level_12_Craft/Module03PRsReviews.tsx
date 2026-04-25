import React from "react";

export default function Module03PRsReviews() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          A pull request is a conversation, not a code dump.
          You are not uploading files to a server. You are proposing a change to a shared
          codebase and asking your teammates to review it.
          How you do that matters as much as the code itself.
        </p>
      </section>

      {/* Writing good PRs: size */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Keep them small</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          There is an informal rule that teams discover for themselves: PRs under 400 lines
          get reviewed carefully. PRs over 800 lines get rubber-stamped. This is not
          laziness — it is cognitive reality. A reviewer can hold 400 lines of context in
          their head. They cannot hold 1,200.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          If your change is large, split it. Ship the refactoring as one PR, the new
          feature as a second, the tests as part of the feature PR. Each should be
          reviewable in under 30 minutes.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Small PRs also merge faster, which means shorter-lived branches, fewer merge
          conflicts, and faster feedback on whether your approach is right.
        </p>
      </section>

      {/* One logical change */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">One PR per logical change</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Do not mix refactoring with features. Do not mix a bug fix with an unrelated
          cleanup. When you mix concerns in a PR, reviewers have to figure out which diff
          is the feature and which is the cleanup — that friction leads to missed bugs.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          It also makes git history useless. Six months from now, when you need to
          understand why this change was made,{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">git log</code> will tell you nothing
          if each commit is "misc fixes and also add feature and also format a bunch of stuff."
        </p>
      </section>

      {/* Write a description */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Write a real description</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The code shows <em>what</em> changed. The description explains <em>why</em>.
          A good PR description contains:
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          {[
            ["What changed", "One or two sentences summarizing the change at the feature level."],
            ["Why", "The motivation — the bug, the requirement, the performance issue."],
            ["How to test", "The exact steps a reviewer can follow to verify it works."],
            ["Tradeoffs", "What you chose not to do and why. What tech debt you knowingly incurred."],
            ["Screenshots", "For UI changes — always. Before and after. Do not make reviewers check out your branch to see what it looks like."],
          ].map(([key, val]) => (
            <div key={key} className="flex gap-3 items-start">
              <span className="font-semibold text-foreground shrink-0 w-28">{key}</span>
              <p className="leading-relaxed">{val}</p>
            </div>
          ))}
        </div>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`## What
Add optimistic updates to the lesson progress indicator.

## Why
Previously, clicking "Complete" would show a spinner for ~800ms
before marking the lesson done. With optimistic updates, the UI
responds instantly and rolls back if the API call fails.

## How to test
1. Open any lesson
2. Click "Complete & Next"
3. The progress indicator should update immediately
4. Disable your network and repeat — should roll back with a toast

## Tradeoffs
We are now managing two sources of truth (local + server) for
progress state. This is a known tradeoff for speed.
Closes #142`}</pre>
      </section>

      {/* Link and annotate */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Link the issue. Annotate the complex parts.</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Always link the issue or ticket the PR addresses. "Closes #142" or "Fixes #88"
          lets GitHub auto-close the issue on merge and keeps the project board accurate.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          For complex logic — a non-obvious algorithm, a workaround for a browser bug, a
          tricky async sequence — leave a comment directly on the line in the PR. You are
          not explaining bad code, you are saving the reviewer the 10 minutes it would
          take them to figure it out themselves. That is considerate engineering.
        </p>
      </section>

      {/* Giving reviews */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Giving good reviews</h2>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Review the code, not the person</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "This function is doing too much" is about the code. "You wrote a function that does
              too much" is about the author. They feel different to the receiver, and the second one
              puts them on the defensive. Keep it about the artifact.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Be specific</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "This could be cleaner" is not a review comment. "This could use{" "}
              <code className="text-sm bg-stone-100 px-1 rounded">Array.reduce()</code> instead of the manual
              loop — it would be half the lines and easier to follow" is.
              Tell them exactly what to change and why. If you have a code suggestion, write it out.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Distinguish blocking from non-blocking</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Not every comment means "do not merge until this is fixed." Use{" "}
              <strong className="text-foreground">nit:</strong> for minor suggestions that you genuinely
              do not care about. Use <strong className="text-foreground">blocking:</strong> (or no prefix)
              for things that must change. The author should never have to guess which is which.
            </p>
            <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed mt-2">{`// Blocking — must fix before merge
This will throw if data is undefined on first render.
Add a loading guard: if (!data) return null;

// Non-blocking suggestion
nit: could use optional chaining here for brevity — user?.profile?.name`}</pre>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Approve when it's good enough</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Perfect is the enemy of shipped. If the code is correct, safe, and readable —
              approve it. Leave your nits as suggestions, not blockers. Done is better than
              perfect. A PR that sits for a week waiting for a 3% improvement is not better
              engineering, it is just slower.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Ask questions when you don't understand</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "Why does this need to run before the effect?" might be a bug you found,
              or might be you missing context. Ask the question. If it turns out you were
              missing context, you learned something. If it turns out to be a bug, you
              caught it. Either outcome is good.
            </p>
          </div>
        </div>
      </section>

      {/* Being reviewed */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Being reviewed</h2>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Your code is not you</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is the most important thing to internalize. A comment on your PR is not
              a comment on your intelligence or your worth as a developer. It is a comment
              on a specific implementation of a specific function at a specific point in
              time, written under specific time constraints with specific information.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              The best developers get review comments on every PR. Not because their code
              is bad — because they are working on hard problems with other sharp people
              who catch things. Review is not punishment. It is collaboration.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Respond to every comment</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When you address a comment, say so. "Done." "Fixed in latest commit." "Changed
              to use reduce — good call." This tells the reviewer they can re-read that thread
              without re-reading the diff.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              When you disagree, say that too: "I considered reduce but went with the loop
              because it's easier to step through in the debugger — happy to change if you
              feel strongly." That is a conversation, not a stonewalling. Sometimes the
              reviewer will say "fair, keep it." Sometimes they will convince you. Both
              outcomes are fine.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-1">The goal is better code, not winning</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              There is no argument to win in a code review. The shared goal is to ship code
              that works, that other people can maintain, and that does not create problems
              six months from now. When you frame it that way — you and the reviewer on the
              same side, against the bug or the bad abstraction — the whole conversation
              changes.
            </p>
          </div>
        </div>
      </section>

    </article>
  );
}
