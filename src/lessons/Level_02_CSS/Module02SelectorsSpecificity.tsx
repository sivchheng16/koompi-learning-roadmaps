import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_STARTER = {
  html: `<h1>Cambodian Dishes</h1>

<p class="featured">Amok — steamed fish curry in banana leaf</p>
<p>Nom banh chok — rice noodles with fish gravy</p>
<p class="featured">Lok lak — wok-tossed beef with lime dipping sauce</p>

<div id="note">
  <p>All dishes are served with jasmine rice.</p>
</div>`,
  css: `/* Element selector — targets ALL <p> tags */
p {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
}

/* Class selector — targets elements with class="featured" */
.featured {
  color: #c2622d;
  font-weight: 600;
}

/* ID selector — targets the single element with id="note" */
#note {
  background-color: #fdf6ec;
  border-left: 4px solid #c2622d;
  padding: 12px 16px;
  margin-top: 16px;
}

/* Pseudo-class — styles on mouse hover */
p:hover {
  background-color: #f5f0e8;
}`,
};

const CHALLENGE_STARTER = {
  html: `<h1>Phnom Penh</h1>
<p class="intro">Capital of Cambodia since 1434.</p>
<p>Population: around 2.5 million.</p>`,
  css: `/* Write your CSS rules here.
   1. A .class rule that sets color on .intro
   2. A p rule that sets font-size */
`,
};

const challenge = {
  prompt:
    "Write a rule using a `.class` selector that sets `color`, and a rule for `p` that sets `font-size`.",
  check(_html: string, css: string, _js: string) {
    const hasClass = /\.[a-zA-Z][\w-]*\s*\{[^}]*color\s*:/i.test(css);
    const hasFontSize = /p\s*\{[^}]*font-size\s*:/i.test(css);
    if (!hasClass)
      return {
        passed: false,
        message:
          "Add a class selector (starts with `.`) that sets the `color` property.",
      };
    if (!hasFontSize)
      return {
        passed: false,
        message: "Good class rule! Now add a `p { font-size: ...; }` rule.",
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

export default function Module02SelectorsSpecificity() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          A CSS selector is a targeting system. The more specific you are,
          the more control you have — but when two rules fight over the same
          element, the browser has a referee: specificity.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Three kinds of selector</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The three selectors you will use on every project:
        </p>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border">
          <div className="px-6 py-4 font-mono text-sm">
            <span className="text-[#c2622d]">p</span>{" "}
            <span className="text-muted-foreground">
              — element selector. Styles <em>every</em>{" "}
              <code>&lt;p&gt;</code> on the page.
            </span>
          </div>
          <div className="px-6 py-4 font-mono text-sm">
            <span className="text-[#c2622d]">.featured</span>{" "}
            <span className="text-muted-foreground">
              — class selector. Styles any element with{" "}
              <code>class="featured"</code>. Reusable on multiple elements.
            </span>
          </div>
          <div className="px-6 py-4 font-mono text-sm">
            <span className="text-[#c2622d]">#header</span>{" "}
            <span className="text-muted-foreground">
              — ID selector. Styles exactly one element. Use sparingly.
            </span>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Specificity</strong> is the
          score the browser assigns each rule.{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            #id = 100
          </code>
          ,{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            .class = 10
          </code>
          ,{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            element = 1
          </code>
          . The highest score wins. If scores tie, the rule written last
          wins.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Pseudo-classes</strong> match
          an element in a particular state.{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            :hover
          </code>{" "}
          activates when the mouse is over the element.{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            :first-child
          </code>{" "}
          targets the first sibling. Write them as{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            selector:state {"{ … }"}
          </code>
          .
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Annotated example</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Four selector types, each doing a different job.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            styles.css
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`/* Element — all paragraphs get a base style (score: 1) */
p {
  font-size: 1rem;
  color: #444;
}

/* Class — only .highlight elements (score: 10) */
.highlight {
  background-color: #fdf6ec;
  font-weight: 600;
}

/* ID — exactly one element (score: 100) */
#hero {
  font-size: 2rem;
  color: #c2622d;
}

/* Pseudo-class — hover state (score: 10) */
a:hover {
  color: #c2622d;
  text-decoration: underline;
}

/* If both p and .highlight target the same element,
   .highlight wins (10 > 1).                         */`}
          </pre>
        </div>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A Cambodian food menu uses all three selector types. Hover over
            the paragraphs to see the pseudo-class fire. Try adding a second
            class rule that increases{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              font-size
            </code>{" "}
            on{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .featured
            </code>
            , or override{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              #note
            </code>
            's border color.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={EXPLORE_STARTER}
          height="440px"
        />
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Write two rules: one using a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .class
            </code>{" "}
            selector that sets{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              color
            </code>
            , and one for{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              p
            </code>{" "}
            that sets{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              font-size
            </code>
            . The class name is your choice — just make sure the HTML element
            uses it.
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
