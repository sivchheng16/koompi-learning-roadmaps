import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_STARTER = {
  html: `<h1>Angkor Wat</h1>
<p>One of the most famous temples in the world,
   located in Siem Reap, Cambodia.</p>
<p>Visit it and bring a camera.</p>`,
  css: `/* Try changing these values and watch the preview */
body {
  font-family: Georgia, serif;
  background-color: #fdf6ec;
  padding: 24px;
}

h1 {
  color: #c2622d;
  font-size: 2rem;
}

p {
  color: #555;
  line-height: 1.7;
}`,
};

const CHALLENGE_STARTER = {
  html: `<h1>My First Styled Page</h1>
<body>Welcome to CSS!</body>`,
  css: `/* Write CSS rules here.
   Set color on h1 and background-color on body. */
`,
};

const challenge = {
  prompt:
    "Write a CSS rule that sets `color` on `h1`, and another that sets `background-color` on `body`.",
  check(_html: string, css: string, _js: string) {
    const hasColor = /h1\s*\{[^}]*color\s*:/i.test(css);
    const hasBg =
      /body\s*\{[^}]*background-color\s*:/i.test(css) ||
      /body\s*\{[^}]*background\s*:/i.test(css);
    if (!hasColor)
      return {
        passed: false,
        message: "Add a CSS rule for h1 that sets the color property.",
      };
    if (!hasBg)
      return {
        passed: false,
        message:
          "Good — now add a rule for body that sets background-color.",
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

export default function Module01IntroductionCSS() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          HTML builds the walls — CSS paints them, hangs the pictures, and
          decides where the light comes from. Without it, every website looks
          like a government form from 1997.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">One rule, three parts</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          CSS stands for <strong className="text-foreground">Cascading Style Sheets</strong>.
          Every CSS instruction follows a single pattern: pick a{" "}
          <strong className="text-foreground">selector</strong> (what to style), then list{" "}
          <strong className="text-foreground">property: value</strong> pairs inside curly braces.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 font-mono text-sm text-foreground leading-loose">
          <span className="text-[#c2622d]">selector</span>
          {" {\n"}
          {"  "}
          <span className="text-blue-600">property</span>
          {": "}
          <span className="text-green-700">value</span>
          {";\n}"}
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          The selector targets an HTML element. The property names what to
          change (color, size, spacing). The value says how to change it.
          That is the entire mental model — everything else is just more
          properties to learn.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          There are three ways to attach CSS to a page: inline{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">style=""</code> attributes
          (quick tests only), a{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;style&gt;</code> block
          in the{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;head&gt;</code>, and an
          external{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.css</code> file linked with{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;link&gt;</code>. In real
          projects you almost always use the external file — the browser can
          cache it and you reuse the same styles across every page.
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Annotated example</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Read through both files once. Notice how the HTML stays clean while
          all appearance decisions live in CSS.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            index.html
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`<link rel="stylesheet" href="styles.css">   ← links the CSS file

<h1>Phnom Penh Street Food</h1>
<p>The best banh mi you will ever eat.</p>`}
          </pre>
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            styles.css
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`/* selector { property: value; } */

body {
  background-color: #fdf6ec;   /* warm off-white */
  padding: 24px;
}

h1 {
  color: #c2622d;              /* deep orange — warm, strong */
  font-size: 2rem;
}

p {
  color: #555;                 /* dark grey — readable without being harsh */
  line-height: 1.7;            /* breathing room between lines */
}`}
          </pre>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">body</span>
            targets the whole page — a good place for font and background defaults
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">/* … */</span>
            CSS comments are ignored by the browser — use them freely
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">;</span>
            every declaration ends with a semicolon — missing one breaks the rule
          </li>
        </ul>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A styled page about Angkor Wat is preloaded. Change the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">color</code> on{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">h1</code>, swap{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">background-color</code>,
            or add a new rule for{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">p</code>. Watch
            the preview update instantly.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={EXPLORE_STARTER}
          height="400px"
        />
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Write two CSS rules from scratch: one that sets{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">color</code> on{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">h1</code>, and one
            that sets{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">background-color</code>{" "}
            on{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">body</code>. Any
            valid color values work.
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

      {/* ── 6. Gate ────────────────────────────────────────── */}
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
