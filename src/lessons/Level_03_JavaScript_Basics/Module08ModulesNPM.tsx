import React from "react";

export default function Module08ModulesNPM() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold tracking-wide uppercase">
          Module 08 — Modules &amp; npm
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Modules &amp; npm
        </h1>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Imagine a single JavaScript file with 5,000 lines. Nobody wants to work in that.
          Modules let you split code into focused files that import from each other — and npm
          gives you access to two million ready-made packages so you never have to write
          everything from scratch.
        </p>
      </section>

      {/* ── 2. Why Modules? ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Why modules exist</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Before modules, every JavaScript file shared the same global scope. Drop two
          libraries on a page and they could overwrite each other's variables. Functions named
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">utils</code> or
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">helper</code>
          collided constantly. There was no clean way to reuse code across projects.
        </p>
        <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-5 space-y-2">
          <p className="text-sm font-semibold text-red-800">Problems without modules</p>
          <ul className="space-y-1 text-sm text-red-700 list-disc list-inside">
            <li>Global scope pollution — any file can overwrite any variable</li>
            <li>No organisation — all code lives in one place</li>
            <li>No reuse — copy-pasting code between projects</li>
            <li>Load order matters — files must be included in exactly the right sequence</li>
          </ul>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          Modules solve all of this. Each file gets its own scope. You explicitly choose what
          to expose and what to keep private.
        </p>
      </section>

      {/* ── 3. ES Modules — Named exports ──────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">ES Modules: named exports</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Modern JavaScript uses <strong className="text-foreground">ES Modules</strong> (ESM).
          You mark things you want to share with the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">export</code> keyword.
          A file can export as many named things as you like.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            math.js
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const PI = 3.14159;

// This is private — no export keyword
function helper() { return 42; }`}
          </pre>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          To use these in another file, import them by name inside curly braces:
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            main.js
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`import { add, subtract, PI } from './math.js';

console.log(add(2, 3));      // 5
console.log(subtract(10, 4)); // 6
console.log(PI);              // 3.14159`}
          </pre>
        </div>
      </section>

      {/* ── 4. Default exports ─────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Default exports</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A file can also have one <strong className="text-foreground">default export</strong> — the main thing that
          file provides. React components are almost always default exports.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            App.js
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`// Exporting a default
export default function App() {
  return '<h1>Hello</h1>';
}

// Importing a default — no curly braces, any name works
import App from './App.js';
import MyApp from './App.js'; // same thing, different local name`}
          </pre>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          You can mix both styles in one file: one default export and as many named exports as you need.
        </p>
      </section>

      {/* ── 5. Barrel files ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Barrel files (re-exports)</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          As a project grows you might have dozens of utility files. A <strong className="text-foreground">barrel file</strong> — usually
          named <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">index.js</code> — re-exports everything
          from one place so importers only need a single path.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            utils/index.js
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`export { add, subtract } from './math.js';
export { formatDate, formatCurrency } from './format.js';
export { fetchUser } from './api.js';`}
          </pre>
        </div>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`// Consumers import from one tidy place
import { add, formatDate, fetchUser } from './utils';`}
        </pre>
      </section>

      {/* ── 6. ESM rules ───────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The rules of ESM</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          ES Modules are <strong className="text-foreground">static</strong>. The browser (or Node) figures out all
          imports before any code runs. This means:
        </p>
        <ul className="space-y-3 text-sm text-muted-foreground list-none">
          <li className="flex gap-3">
            <span className="text-red-500 font-mono shrink-0">✗</span>
            <span>You cannot put an <code className="bg-stone-100 px-1 rounded">import</code> inside an <code className="bg-stone-100 px-1 rounded">if</code> statement or a function</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-500 font-mono shrink-0">✗</span>
            <span>Import paths must be string literals, not variables</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-600 font-mono shrink-0">✓</span>
            <span>The static structure lets bundlers (Vite, webpack) remove unused code — called <em>tree-shaking</em></span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-600 font-mono shrink-0">✓</span>
            <span>For truly dynamic imports, use <code className="bg-stone-100 px-1 rounded">await import('./module.js')</code> — this is the intentional escape hatch</span>
          </li>
        </ul>
      </section>

      {/* ── 7. npm ─────────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">npm: the world's package registry</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">npm</strong> (Node Package Manager) hosts over two million open-source packages.
          Need date formatting? Validation? A full React framework? Someone already wrote it.
          You install it, import it, done.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every npm project has a <strong className="text-foreground">package.json</strong> — the manifest that describes
          the project and lists its dependencies:
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            package.json
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "vitest": "^1.0.0"
  }
}`}
          </pre>
        </div>
      </section>

      {/* ── 8. Installing packages ─────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Installing packages</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm install</code> downloads a package into
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">node_modules/</code> and adds it to
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">dependencies</code> in your package.json.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`# Install a production dependency
npm install lodash

# Install a dev-only dependency (test runner, build tool, linter)
npm install --save-dev vitest

# Install everything listed in package.json (after cloning a repo)
npm install`}
        </pre>
        <div className="rounded-xl border border-border px-6 py-5 space-y-3 bg-stone-50">
          <p className="text-sm font-semibold text-foreground">dependencies vs devDependencies</p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">dependencies</strong> ship with your app (lodash, react, axios).
            <strong className="text-foreground ml-1">devDependencies</strong> are only used during development —
            test runners, type checkers, linters. They don't end up in the code your users download.
          </p>
        </div>
      </section>

      {/* ── 9. Scripts ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">npm scripts</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">scripts</code> field in package.json lets you
          define shortcuts for long commands. <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm run dev</code> runs
          whatever <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">dev</code> is set to.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`npm run dev      # starts the development server
npm run build    # compiles for production
npm run test     # runs the test suite
npm run lint     # checks code style`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          You'll run these dozens of times a day. Most projects document which scripts exist in their README.
        </p>
      </section>

      {/* ── 10. node_modules ───────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">node_modules — never commit it</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          When you install packages, npm creates a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">node_modules/</code> folder
          that can easily contain hundreds of megabytes. You <strong className="text-foreground">never commit this to git</strong>.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">
{`# .gitignore
node_modules/`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Anyone who clones your repo runs <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm install</code> and npm
          recreates the folder exactly — because package.json (and the lockfile <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">package-lock.json</code>) describe every dependency precisely.
        </p>
      </section>

      {/* ── 11. CommonJS vs ESM ────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">CommonJS vs ESM</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          You'll encounter two module systems in the wild. <strong className="text-foreground">CommonJS</strong> (CJS) is
          the older Node.js format. <strong className="text-foreground">ES Modules</strong> (ESM) is the modern standard
          used by browsers and modern Node.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-100 border-b border-border text-xs font-mono text-muted-foreground">
              CommonJS (older)
            </div>
            <pre className="rounded-b-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-5 py-4 overflow-x-auto">
{`const fs = require('fs');
const _ = require('lodash');

module.exports = { myFn };`}
            </pre>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-100 border-b border-border text-xs font-mono text-muted-foreground">
              ESM (modern)
            </div>
            <pre className="rounded-b-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-5 py-4 overflow-x-auto">
{`import fs from 'fs';
import _ from 'lodash';

export { myFn };`}
            </pre>
          </div>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-6 py-4">
          <p className="text-sm text-blue-800">
            <strong>In 2024, use ESM.</strong> It's the standard in browsers, modern Node, Vite, and all major frameworks.
            You'll still see CommonJS in older codebases and some Node.js tooling — now you know what it is.
          </p>
        </div>
      </section>

      {/* ── 12. Summary ────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">What you learned</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">→</span> Modules give each file its own scope and let files import from each other</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">→</span> Named exports use <code className="bg-stone-100 px-1 rounded">export const x</code>, imported with <code className="bg-stone-100 px-1 rounded">{"{ x }"}</code></li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">→</span> Default exports use <code className="bg-stone-100 px-1 rounded">export default</code>, imported without curly braces</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">→</span> ESM imports are static — resolved before code runs, enabling tree-shaking</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">→</span> npm is the package registry; <code className="bg-stone-100 px-1 rounded">package.json</code> is the project manifest</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">→</span> <code className="bg-stone-100 px-1 rounded">npm install pkg</code> for runtime deps, <code className="bg-stone-100 px-1 rounded">--save-dev</code> for dev-only tools</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">→</span> Never commit <code className="bg-stone-100 px-1 rounded">node_modules/</code> — <code className="bg-stone-100 px-1 rounded">npm install</code> recreates it</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">→</span> CommonJS uses <code className="bg-stone-100 px-1 rounded">require()</code> — you'll see it in older code, use ESM for new projects</li>
        </ul>
      </section>

    </article>
  );
}
