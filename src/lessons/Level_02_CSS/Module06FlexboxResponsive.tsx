import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_STARTER = {
  html: `<nav class="navbar">
  <span class="logo">KOOMPI</span>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">Courses</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>

<div class="card-grid">
  <div class="card">Phnom Penh</div>
  <div class="card">Siem Reap</div>
  <div class="card">Sihanoukville</div>
  <div class="card">Kampot</div>
  <div class="card">Battambang</div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f5f0e8; }

/* ── Navbar: logo left, links right ── */
.navbar {
  display: flex;
  justify-content: space-between;  /* logo and links at opposite ends */
  align-items: center;
  background: #c2622d;
  padding: 12px 24px;
  color: white;
}

.logo {
  font-weight: 700;
  font-size: 1.2rem;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

/* ── Card grid: wraps onto new rows ── */
.card-grid {
  display: flex;
  flex-wrap: wrap;            /* cards wrap instead of overflowing */
  gap: 16px;
  padding: 24px;
}

.card {
  flex: 1 1 160px;            /* grow, shrink, min width 160px */
  background: white;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  border: 1px solid #d4c8b4;
}

/* ── Responsive: stack on small screens ── */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    gap: 12px;
  }
}`,
};

const CHALLENGE_STARTER = {
  html: `<div class="container">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: sans-serif; padding: 24px; }

.box {
  background: #c2622d;
  color: white;
  padding: 24px;
  border-radius: 6px;
  font-size: 1.5rem;
  text-align: center;
}

/* Add display: flex and justify-content to .container,
   then add an @media query */
.container {
  gap: 12px;

}

@media (max-width: 768px) {

}`,
};

const challenge = {
  prompt:
    "Use `display: flex` and `justify-content` on a container, and add a `@media` query block.",
  check(_html: string, css: string, _js: string) {
    const hasFlex = /display\s*:\s*flex/i.test(css);
    const hasJustify = /justify-content\s*:/i.test(css);
    const hasMedia = /@media/i.test(css);
    if (!hasFlex)
      return {
        passed: false,
        message: "Add `display: flex` to your container.",
      };
    if (!hasJustify)
      return {
        passed: false,
        message:
          "Good flex container! Now add `justify-content` (try `center` or `space-between`).",
      };
    if (!hasMedia)
      return {
        passed: false,
        message:
          "Almost — add a `@media` query (e.g. `@media (max-width: 768px) { … }`).",
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

export default function Module06FlexboxResponsive() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Before flexbox, centering something vertically in CSS was a
          puzzle professionals complained about for years. With one line —
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">display: flex</code>
          — it just works.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Flexbox and media queries</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Apply{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            display: flex
          </code>{" "}
          to a parent element. Its direct children become{" "}
          <strong className="text-foreground">flex items</strong>. They
          line up in a row by default. Two properties control them:
        </p>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">flex-direction</span>
            <span className="text-muted-foreground ml-3">
              <code>row</code> (default, left→right) or{" "}
              <code>column</code> (top→bottom)
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">justify-content</span>
            <span className="text-muted-foreground ml-3">
              distributes space along the main axis:{" "}
              <code>flex-start</code>, <code>center</code>,{" "}
              <code>flex-end</code>, <code>space-between</code>,{" "}
              <code>space-around</code>
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">align-items</span>
            <span className="text-muted-foreground ml-3">
              aligns items along the cross axis:{" "}
              <code>stretch</code> (default), <code>center</code>,{" "}
              <code>flex-start</code>, <code>flex-end</code>
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">flex-wrap</span>
            <span className="text-muted-foreground ml-3">
              <code>nowrap</code> (default) or <code>wrap</code> — items
              spill onto new rows instead of squishing
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">gap</span>
            <span className="text-muted-foreground ml-3">
              space between flex items — cleaner than margins
            </span>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Media queries</strong> apply
          CSS only when a condition is met — usually the screen width.{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            @media (max-width: 768px) {"{ … }"}
          </code>{" "}
          fires only on screens narrower than 768px. Use this to switch a
          horizontal flex layout to vertical on phones.
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Annotated example</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A navbar that sits horizontal on desktop and stacks vertically on
          mobile.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            styles.css
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`.navbar {
  display: flex;
  justify-content: space-between;  /* logo left, links right */
  align-items: center;             /* vertically centered */
  gap: 16px;
  padding: 12px 24px;
}

.nav-links {
  display: flex;                   /* links also in a row */
  gap: 24px;
  list-style: none;
}

/* Mobile: stack navbar vertically below 600px */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;        /* row → column on small screens */
    align-items: flex-start;
  }
}`}
          </pre>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">space-between</span>
            first item at start, last at end, equal gaps between the rest
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">flex-wrap: wrap</span>
            use on card grids so items wrap to a new row instead of overflowing
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">@media</span>
            write mobile styles inside — they override the defaults above the breakpoint
          </li>
        </ul>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A KOOMPI navbar and a wrapping card grid for Cambodian cities are
            preloaded. Try changing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              justify-content
            </code>{" "}
            to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              center
            </code>
            , resizing the preview window to trigger the media query, or
            removing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              flex-wrap
            </code>{" "}
            and watching the cards overflow.
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
            Add{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              display: flex
            </code>{" "}
            and{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              justify-content
            </code>{" "}
            to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .container
            </code>
            , then write a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              @media
            </code>{" "}
            query block (it can be empty — the checker just needs to see you
            wrote one).
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={CHALLENGE_STARTER}
          height="380px"
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
