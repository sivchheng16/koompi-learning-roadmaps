import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_STARTER = {
  html: `<div class="page">

  <!-- Sticky header that stays at the top while scrolling -->
  <header class="site-header">
    KOOMPI Academy — sticky header
  </header>

  <!-- Normal flow content -->
  <main class="content">
    <p>This paragraph is in the normal document flow.</p>

    <!-- Relative container for the badge -->
    <div class="card">
      <p>Angkor Wat card</p>
      <!-- Absolutely positioned relative to .card -->
      <span class="badge">Popular</span>
    </div>

    <p>Scroll down to see the fixed button stay in place.</p>
    <p style="margin-top:200px">More content here…</p>
  </main>

  <!-- Fixed: stays in the corner no matter how far you scroll -->
  <button class="back-to-top">↑ Top</button>

</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 0; background: #f5f0e8; }

.site-header {
  position: sticky;    /* sticks to top once you scroll past it */
  top: 0;
  background: #c2622d;
  color: white;
  padding: 12px 24px;
  z-index: 10;
}

.content {
  padding: 24px;
}

.card {
  position: relative;  /* makes this the reference for absolute children */
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #d4c8b4;
}

.badge {
  position: absolute;  /* positioned relative to .card */
  top: 12px;
  right: 12px;
  background: #c2622d;
  color: white;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
}

.back-to-top {
  position: fixed;     /* stays in the viewport — ignores scrolling */
  bottom: 24px;
  right: 24px;
  background: #c2622d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  font-size: 1rem;
}`,
};

const CHALLENGE_STARTER = {
  html: `<div class="container">
  <p>Normal paragraph</p>
  <div class="overlay">I am positioned!</div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: sans-serif; padding: 40px; }

.container {
  background: #fdf6ec;
  padding: 40px;
  border: 1px solid #d4c8b4;
  border-radius: 8px;
}

/* Give .overlay an absolute or fixed position
   and set top or bottom */
.overlay {
  background: #c2622d;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;

}`,
};

const challenge = {
  prompt:
    "Write a CSS rule with `position: absolute` or `position: fixed` that also sets `top`, `bottom`, `left`, or `right`.",
  check(_html: string, css: string, _js: string) {
    const hasPosition =
      /position\s*:\s*(absolute|fixed)/i.test(css);
    const hasOffset =
      /\b(top|bottom|left|right)\s*:/i.test(css);
    if (!hasPosition)
      return {
        passed: false,
        message:
          "Set `position: absolute` or `position: fixed` on an element.",
      };
    if (!hasOffset)
      return {
        passed: false,
        message:
          "Good — now add `top`, `bottom`, `left`, or `right` to place it.",
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

export default function Module05LayoutPositioning() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Normal document flow stacks elements top to bottom. Positioning
          lets you break out of that flow — place a badge in a card corner,
          pin a header to the top, or anchor a button in the viewport forever.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Five position values</h2>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">static</span>
            <span className="text-muted-foreground ml-3">
              default — element flows normally, ignores{" "}
              <code>top/left/right/bottom</code>
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">relative</span>
            <span className="text-muted-foreground ml-3">
              stays in flow but nudges from its original spot;
              also creates a reference point for{" "}
              <code>absolute</code> children
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">absolute</span>
            <span className="text-muted-foreground ml-3">
              removed from flow, positioned relative to the nearest
              non-static ancestor
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">fixed</span>
            <span className="text-muted-foreground ml-3">
              removed from flow, positioned relative to the
              viewport — scrolling doesn't move it
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">sticky</span>
            <span className="text-muted-foreground ml-3">
              behaves like{" "}
              <code>relative</code> until you scroll past a threshold,
              then acts like <code>fixed</code>
            </span>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          Once you set{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            position
          </code>{" "}
          to anything except{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            static
          </code>
          , you can use{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            top
          </code>
          ,{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            right
          </code>
          ,{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            bottom
          </code>
          ,{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            left
          </code>{" "}
          to place it. Use{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            z-index
          </code>{" "}
          to control which element appears on top when they overlap — higher
          number wins.
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Annotated example</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Three position values on one page: sticky header, absolute badge,
          fixed button.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            styles.css
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`/* Sticky — sticks to the top when you scroll */
.site-header {
  position: sticky;
  top: 0;           /* sticks when it reaches 0px from viewport top */
  z-index: 100;
}

/* Relative — reference for the badge below */
.card {
  position: relative;
}

/* Absolute — corner of .card, not the page */
.badge {
  position: absolute;
  top: 12px;        /* 12px from .card's top edge */
  right: 12px;      /* 12px from .card's right edge */
}

/* Fixed — same spot in the viewport, always */
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
}`}
          </pre>
        </div>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A live demo shows all four position types. Scroll the preview to
            see sticky and fixed in action. Try changing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .badge
            </code>{" "}
            from{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              absolute
            </code>{" "}
            to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              fixed
            </code>{" "}
            and see how its reference point changes.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={EXPLORE_STARTER}
          height="460px"
        />
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Give{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .overlay
            </code>{" "}
            either{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              position: absolute
            </code>{" "}
            or{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              position: fixed
            </code>
            , and set at least one of{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              top
            </code>
            ,{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              bottom
            </code>
            ,{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              left
            </code>
            , or{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              right
            </code>
            .
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={CHALLENGE_STARTER}
          height="360px"
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
