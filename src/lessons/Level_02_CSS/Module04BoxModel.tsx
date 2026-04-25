import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_STARTER = {
  html: `<div class="card">
  <h2>Tonle Sap Lake</h2>
  <p>The largest freshwater lake in Southeast Asia.
     It swells to six times its dry-season size
     during the monsoon.</p>
</div>

<div class="card highlight">
  <h2>Cardamom Mountains</h2>
  <p>One of the largest remaining rainforests
     in mainland Southeast Asia.</p>
</div>`,
  css: `* {
  box-sizing: border-box;  /* padding and border don't expand the element */
}

body {
  font-family: sans-serif;
  padding: 24px;
  background-color: #f5f0e8;
}

.card {
  background-color: white;
  padding: 24px;           /* inner breathing room */
  margin-bottom: 16px;     /* space outside the element */
  border: 2px solid #d4c8b4;
  border-radius: 8px;
  width: 400px;
}

.card h2 {
  margin: 0 0 8px 0;
  color: #c2622d;
}

.highlight {
  border-color: #c2622d;
  border-width: 3px;
}`,
};

const CHALLENGE_STARTER = {
  html: `<div class="box">
  <p>Add padding, margin, and a border to .box</p>
</div>`,
  css: `/* Style .box with padding, margin, and border */
.box {
  background-color: #fdf6ec;

}`,
};

const challenge = {
  prompt:
    "Add `padding`, `margin`, and `border` to any element. All three must appear in your CSS.",
  check(_html: string, css: string, _js: string) {
    const hasPadding = /padding\s*:/i.test(css);
    const hasMargin = /margin\s*:/i.test(css);
    const hasBorder = /border\s*:/i.test(css);
    if (!hasPadding)
      return {
        passed: false,
        message: "Add a `padding` property to give the element some inner space.",
      };
    if (!hasMargin)
      return {
        passed: false,
        message: "Good padding! Now add `margin` to push the element away from its neighbours.",
      };
    if (!hasBorder)
      return {
        passed: false,
        message: "Almost — add a `border` to complete the box model (try `border: 2px solid #333`).",
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

export default function Module04BoxModel() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Every element on a page is a rectangle. Understanding how those
          rectangles grow, shrink, and push each other around is the single
          most useful thing you can learn about CSS layout.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Four layers, one box</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Picture an element as four nested rectangles:
        </p>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">content</span>
            <span className="text-muted-foreground ml-3">
              the text or image itself — sized by{" "}
              <code>width</code> and <code>height</code>
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">padding</span>
            <span className="text-muted-foreground ml-3">
              space <em>inside</em> the border — pushes content away from the edge
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">border</span>
            <span className="text-muted-foreground ml-3">
              a line around the padding — set thickness, style, and color
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">margin</span>
            <span className="text-muted-foreground ml-3">
              space <em>outside</em> the border — pushes other elements away
            </span>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          By default, <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">width</code>{" "}
          only sets the content area. Padding and border add to the total size —
          which is confusing. Add{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            box-sizing: border-box
          </code>{" "}
          to every project (via the{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">*</code>{" "}
          selector) to make width mean the full visible size. Almost every
          professional stylesheet does this.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Shorthand properties let you set all four sides at once:{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            padding: 16px 24px
          </code>{" "}
          means 16px top/bottom, 24px left/right. One value sets all four
          sides. Four values go clockwise: top, right, bottom, left.
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Annotated example</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A card component using all four box model layers.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            styles.css
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`/* Reset first — prevents browser defaults from fighting you */
* {
  box-sizing: border-box;
}

.card {
  width: 360px;            /* total visible width (with border-box) */
  background-color: white;

  padding: 24px;           /* 24px on all four inner sides */
  border: 2px solid #d4c8b4;
  border-radius: 8px;      /* rounds the corners */
  margin: 0 auto 24px;     /* 0 top, auto left/right (centers it), 24px bottom */
}

/* Padding shorthand:
   padding: top right bottom left  (clockwise)
   padding: vertical horizontal    (two-value)
   padding: 24px                   (all four equal) */`}
          </pre>
        </div>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            Two cards about Cambodian geography are preloaded. Try increasing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              padding
            </code>{" "}
            to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              40px
            </code>
            , changing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              margin-bottom
            </code>
            , or removing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              box-sizing: border-box
            </code>{" "}
            to see what changes.
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
            Add{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              padding
            </code>
            ,{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              margin
            </code>
            , and{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              border
            </code>{" "}
            to the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .box
            </code>{" "}
            element. All three must be present. Values are your choice.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={CHALLENGE_STARTER}
          height="320px"
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
