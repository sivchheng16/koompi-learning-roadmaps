import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_STARTER = {
  html: `<div class="card">
  <h2>KOOMPI Academy</h2>
  <p>Hover over the button below.</p>
  <button class="btn">Get Started</button>
</div>`,
  css: `:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --spacing-md: 16px;
  --radius: 8px;
}

body {
  font-family: sans-serif;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  padding: 40px;
}

.card {
  background: white;
  padding: 32px;
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  max-width: 320px;
}

h2 { color: var(--primary); margin-bottom: var(--spacing-md); }
p  { color: #555; margin-bottom: var(--spacing-md); }

.btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: var(--radius);
  cursor: pointer;
  /* Try changing 200ms to 500ms and see the difference */
  transition: background-color 200ms ease, transform 150ms ease;
}

.btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}`,
};

const CHALLENGE_STARTER = {
  html: `<button class="btn">Hover me</button>`,
  css: `/* Challenge: use a CSS variable for color and add a hover transition.
   Hint: declare --btn-color on :root, use it on .btn,
   then add a transition for background-color. */

body {
  display: flex;
  justify-content: center;
  padding: 60px;
  font-family: sans-serif;
}

.btn {
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
`,
};

const challenge = {
  prompt:
    "Declare a CSS custom property (starting with --) for the button colour and add a transition property to .btn.",
  check(_html: string, css: string, _js: string) {
    const hasVar = /--[\w-]+\s*:/.test(css);
    const hasTransition = /transition\s*:/.test(css);
    if (!hasVar)
      return {
        passed: false,
        message:
          "Declare at least one CSS variable using -- notation, e.g. --btn-color: #6366f1; inside :root { }.",
      };
    if (!hasTransition)
      return {
        passed: false,
        message:
          "Good — now add a transition property to .btn, e.g. transition: background-color 200ms ease;",
      };
    return {
      passed: true,
      message: "Challenge complete! Your button uses a variable and transitions smoothly.",
    };
  },
};

export default function Module09CSSVariablesAnimations() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Changing one colour everywhere shouldn't mean hunting through 47 places in your CSS.
          Variables and animations fix that — and make your interfaces feel alive.
        </p>
      </section>

      {/* ── 2. CSS Variables ───────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Part 1 — CSS Custom Properties</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          CSS custom properties (also called <strong className="text-foreground">variables</strong>) let you
          name a value once and reuse it everywhere. Declare them on{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">:root</code> so they're available
          across the whole page:
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            styles.css
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`:root {
  --primary: #6366f1;       /* indigo brand colour */
  --spacing-md: 16px;       /* reusable spacing unit */
}

button {
  background: var(--primary);          /* use it */
  padding: var(--spacing-md);
  color: var(--accent, white);         /* fallback if --accent is unset */
}`}
          </pre>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">--name</span>
            always two dashes — that's how the browser tells variables apart from regular properties
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">var(--name, fallback)</span>
            the second argument is used if the variable isn't defined
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">cascade &amp; inherit</span>
            variables follow the cascade — override on a specific element to scope them to a component
          </li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          Light/dark theming in ~10 lines: redefine the same variable names inside a{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">[data-theme="dark"]</code> selector
          and every component updates automatically — no JavaScript needed.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            theme switching
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`:root {
  --bg: #ffffff;
  --text: #111111;
}

[data-theme="dark"] {
  --bg: #0f0f0f;
  --text: #f5f5f5;
}

body {
  background: var(--bg);
  color: var(--text);
}`}
          </pre>
        </div>
      </section>

      {/* ── 3. Transitions ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Part 2 — Transitions</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A transition tells the browser to animate between two states smoothly instead of snapping.
          The shorthand is:{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            transition: property duration timing-function
          </code>
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            transitions
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`.btn {
  background: var(--primary);
  transition: background-color 200ms ease;   /* smooth colour swap */
}

.btn:hover {
  background: var(--primary-hover);
}`}
          </pre>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">ease</span>
            starts fast, ends slow — feels natural, good default for most interactions
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">ease-in-out</span>
            slow start, fast middle, slow end — great for modals or elements entering the screen
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">linear</span>
            constant speed — suits looping spinners; feels mechanical for one-off interactions
          </li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          Avoid transitioning <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">width</code> or{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">height</code> — they force the
          browser to recalculate layout on every frame, causing jank. Use{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">transform</code> instead.
        </p>
      </section>

      {/* ── 4. Transforms ──────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Part 3 — Transforms</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Transforms move, scale, or rotate elements without touching the layout — the browser hands
          them to the GPU, so they're smooth even on complex pages.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            transform examples
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`.card:hover {
  transform: translateY(-4px);   /* lift effect — card rises 4px */
}

.logo:hover {
  transform: scale(1.05);        /* grow 5% on hover */
}

.icon {
  transform: rotate(45deg);      /* spin 45° */
}

/* stack multiple transforms in one declaration */
.btn:hover {
  transform: translateY(-2px) scale(1.02);
}`}
          </pre>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          Always pair transforms with a{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">transition</code> — without it the
          change is instant and loses its effect.
        </p>
      </section>

      {/* ── 5. Keyframe Animations ─────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Part 4 — Keyframe Animations</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Transitions only work between two states triggered by interaction. For animations that play
          automatically — a fade-in on load, a pulsing badge — use{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">@keyframes</code>.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            keyframes
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation-name: fadeIn;
  animation-duration: 400ms;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;   /* stay at the final state */

  /* shorthand: name duration timing fill */
  animation: fadeIn 400ms ease-out forwards;
}`}
          </pre>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">from / to</span>
            simple two-step animation — you can also use percentages: 0%, 50%, 100%
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">fill-mode: forwards</span>
            without this the element snaps back to its original state when the animation ends
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">iteration-count: infinite</span>
            loops forever — useful for spinners and loading indicators
          </li>
        </ul>
      </section>

      {/* ── 6. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A card with a variable-driven button is preloaded. Try changing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">--primary</code> in{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">:root</code> — both the heading
            and button update at once. Then adjust the transition duration on{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.btn</code> and hover to feel
            the difference.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={EXPLORE_STARTER}
          height="420px"
        />
      </section>

      {/* ── 7. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            The starter gives you a plain button. Declare a CSS variable for its background colour
            and add a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">transition</code> so the
            colour change on hover animates smoothly. Both must be present to pass.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={CHALLENGE_STARTER}
          height="340px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 8. Gate ────────────────────────────────────────── */}
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
