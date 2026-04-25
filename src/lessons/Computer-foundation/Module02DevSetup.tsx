import React from "react";

export default function Module02DevSetup() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Header ─────────────────────────────────────────────── */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dev Environment Setup</h1>
        <p className="mt-3 text-muted-foreground text-base leading-relaxed">
          A carpenter wouldn't use a butter knife to cut wood. The right tools don't just make the job easier —
          they make it possible. Before you write a single line of code, let's get your machine ready.
        </p>
      </section>

      {/* ── 1. VS Code ─────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">1. Install VS Code</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Visual Studio Code</strong> is the most popular code editor in the
          world — used by beginners and senior engineers at Google alike. It's free, fast, and has an
          enormous extension ecosystem. Download it from{" "}
          <a
            href="https://code.visualstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            code.visualstudio.com
          </a>
          .
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Go to <span className="font-mono text-foreground">code.visualstudio.com</span> and click <strong className="text-foreground">Download</strong>.</li>
          <li>Choose your OS (Windows / macOS / Linux) and run the installer.</li>
          <li>Launch VS Code — you should see the Welcome tab.</li>
        </ol>
      </section>

      {/* ── 2. Node.js ─────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">2. Install Node.js</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Node.js</strong> is a JavaScript runtime — it lets you run
          JavaScript outside the browser, on your own machine. Every modern web tool (React, Vite, npm) requires it.
          Download the <strong className="text-foreground">LTS</strong> (Long-Term Support) version from{" "}
          <a
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            nodejs.org
          </a>
          .
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Go to <span className="font-mono text-foreground">nodejs.org</span> and download the <strong className="text-foreground">LTS</strong> installer.</li>
          <li>Run the installer and accept all defaults.</li>
          <li>Open a terminal and verify:</li>
        </ol>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`node --version
# v22.x.x  (any v18+ is fine)

npm --version
# 10.x.x`}
        </pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If both commands print version numbers, Node.js is installed correctly.{" "}
          <strong className="text-foreground">npm</strong> (Node Package Manager) comes bundled with Node — you'll
          use it to install libraries throughout this course.
        </p>
      </section>

      {/* ── 3. Git ─────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">3. Install Git</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Git</strong> is a version control system — it tracks every change you
          make to your code, lets you undo mistakes, and makes collaboration with other developers possible.
          Download it from{" "}
          <a
            href="https://git-scm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            git-scm.com
          </a>
          .
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Go to <span className="font-mono text-foreground">git-scm.com</span> and click <strong className="text-foreground">Download</strong>.</li>
          <li>Run the installer (Windows: keep all defaults; macOS: install via Xcode tools if prompted).</li>
          <li>Verify in your terminal:</li>
        </ol>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`git --version
# git version 2.x.x`}
        </pre>
      </section>

      {/* ── 4. VS Code Extensions ──────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">4. Essential VS Code Extensions</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Extensions turn VS Code from a plain editor into a full development environment. Open the Extensions
          panel with <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border border-border text-xs font-mono text-foreground">Ctrl+Shift+X</kbd>{" "}
          (or <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border border-border text-xs font-mono text-foreground">Cmd+Shift+X</kbd> on Mac)
          and install these five:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Extension</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">What it does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Prettier – Code formatter", "Auto-formats your code on save so it always looks clean"],
                ["ESLint", "Highlights code mistakes and bad patterns as you type"],
                ["GitLens", "Shows who changed what and when, inline in the editor"],
                ["Error Lens", "Displays error messages directly on the problem line"],
                ["Auto Rename Tag", "Renames closing HTML tags automatically when you edit the opening one"],
              ].map(([ext, desc]) => (
                <tr key={ext} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground whitespace-nowrap">{ext}</td>
                  <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Configure VS Code ───────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">5. Configure VS Code</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Open your user settings JSON with{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border border-border text-xs font-mono text-foreground">Ctrl+Shift+P</kbd>{" "}
          → <span className="font-mono text-foreground">Open User Settings (JSON)</span> and paste these lines inside
          the curly braces:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`"editor.formatOnSave": true,
"editor.tabSize": 2,
"editor.fontSize": 14,
"editor.defaultFormatter": "esbenp.prettier-vscode"`}
        </pre>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li><strong className="text-foreground">formatOnSave</strong> — Prettier runs every time you hit save. No manual formatting.</li>
          <li><strong className="text-foreground">tabSize: 2</strong> — Industry standard for web code. Two spaces per indent level.</li>
          <li><strong className="text-foreground">fontSize: 14</strong> — Comfortable reading size. Adjust to taste.</li>
        </ul>
      </section>

      {/* ── 6. Terminal in VS Code ─────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">6. The Integrated Terminal</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          VS Code has a built-in terminal — you'll live here. Open it with{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border border-border text-xs font-mono text-foreground">Ctrl+`</kbd>{" "}
          (the backtick key, top-left of most keyboards). It opens directly in your project folder, so you never
          have to navigate there separately.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Get used to keeping this terminal open. Installing packages, running your app, committing code — it all
          happens here. The keyboard shortcut alone will save you hours.
        </p>
      </section>

      {/* ── 7. Final Check ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">7. Final Check — All Systems Go</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Open VS Code, press{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border border-border text-xs font-mono text-foreground">Ctrl+`</kbd>{" "}
          to open the terminal, and run these three commands. Each one should print a version number — not an
          error.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`node --version
npm --version
git --version`}
        </pre>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-2">
          <p className="text-sm font-semibold text-foreground">If a command says "not found":</p>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li><span className="font-mono text-foreground">node</span> — re-run the Node.js installer, then restart VS Code.</li>
            <li><span className="font-mono text-foreground">git</span> — re-run the Git installer, then restart VS Code.</li>
            <li>On Windows, restarting the terminal (not just the tab) often fixes PATH issues.</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All three printing versions? Your development environment is ready. In the next module you'll start
          using the terminal for real — navigating files, running scripts, and understanding the Linux filesystem.
        </p>
      </section>

    </article>
  );
}
