import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_STARTER = {
  html: `<div class="page">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Main Content</main>
  <footer class="footer">Footer</footer>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f5f0e8; padding: 24px; }

.page {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  min-height: 300px;
}

.header  { grid-area: header;  background: #c2622d; color: white; }
.sidebar { grid-area: sidebar; background: #d4c8b4; }
.content { grid-area: content; background: white; }
.footer  { grid-area: footer;  background: #c2622d; color: white; }

.header, .sidebar, .content, .footer {
  border-radius: 6px;
  padding: 16px;
  font-weight: 600;
}`,
};

const CHALLENGE_STARTER = {
  html: `<div class="grid">
  <div class="card">1</div>
  <div class="card">2</div>
  <div class="card">3</div>
  <div class="card">4</div>
  <div class="card">5</div>
  <div class="card">6</div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: sans-serif; padding: 24px; background: #f5f0e8; }

.card {
  background: #c2622d;
  color: white;
  padding: 24px;
  border-radius: 6px;
  font-size: 1.5rem;
  text-align: center;
}

/* Make .grid a 3-column grid that collapses to 1 on small screens */
.grid {
  gap: 16px;

}

@media (max-width: 600px) {

}`,
};

const challenge = {
  prompt:
    "Give `.grid` a `display: grid` and a `grid-template-columns` with 3 columns. Add a `@media` query that sets it to a single column on small screens.",
  check(_html: string, css: string, _js: string) {
    const hasGrid = /display\s*:\s*grid/i.test(css);
    const hasCols = /grid-template-columns\s*:/i.test(css);
    const hasMedia = /@media/i.test(css);
    if (!hasGrid)
      return { passed: false, message: "Add `display: grid` to `.grid`." };
    if (!hasCols)
      return {
        passed: false,
        message:
          "Good — now add `grid-template-columns` (e.g. `repeat(3, 1fr)`).",
      };
    if (!hasMedia)
      return {
        passed: false,
        message:
          "Almost — add a `@media` query to collapse the grid to 1 column on small screens.",
      };
    return { passed: true, message: "Challenge complete! Grid layout works." };
  },
};

export default function Module08CSSGrid() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Flexbox is one-dimensional — it works along a single row or column.
          CSS Grid is two-dimensional: rows <em>and</em> columns at the same
          time. For page layouts, Grid wins.
        </p>
      </section>

      {/* ── 2. Mental model ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The mental model</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Imagine a spreadsheet. You define how many{" "}
          <strong className="text-foreground">columns</strong> and{" "}
          <strong className="text-foreground">rows</strong> the grid has. Child
          elements are placed into the resulting cells — automatically, or
          exactly where you tell them to go.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            styles.css — basic 3-column grid
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* 3 equal columns */
  grid-template-rows: auto;            /* rows size to content */
  gap: 16px;                           /* gutter between cells */
}`}
          </pre>
        </div>
      </section>

      {/* ── 3. Key concepts ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Key concepts</h2>

        {/* fr unit */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">fr</code> unit
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">fr</code>{" "}
            stands for <em>fractional unit</em>. It divides whatever space is
            left after fixed columns are placed.{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              1fr 2fr
            </code>{" "}
            gives the first column one-third of the space and the second
            two-thirds.
          </p>
        </div>

        {/* repeat() */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">repeat()</code>
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Writing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              repeat(3, 1fr)
            </code>{" "}
            is identical to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              1fr 1fr 1fr
            </code>
            . Use it to keep column definitions readable as column counts grow.
          </p>
        </div>

        {/* auto-fit + minmax */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Responsive grids without media queries
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Combine{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              auto-fit
            </code>{" "}
            with{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              minmax()
            </code>{" "}
            and the grid adapts to the viewport with zero media queries:
          </p>
          <div className="rounded-xl border border-border overflow-hidden">
            <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
/* Each column is at least 200px wide. As the viewport
   shrinks, columns drop to a new row automatically. */`}
            </pre>
          </div>
        </div>

        {/* Placing items */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Placing items precisely</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Grid lines are numbered from 1. You can pin a child to specific
            lines with{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-column
            </code>{" "}
            and{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-row
            </code>
            :
          </p>
          <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
            <div className="px-6 py-3">
              <span className="font-mono text-[#c2622d]">grid-column: 1 / 3</span>
              <span className="text-muted-foreground ml-3">
                span from column line 1 to line 3 (fills 2 columns)
              </span>
            </div>
            <div className="px-6 py-3">
              <span className="font-mono text-[#c2622d]">grid-column: span 2</span>
              <span className="text-muted-foreground ml-3">
                shorthand — span 2 columns from wherever the item lands
              </span>
            </div>
            <div className="px-6 py-3">
              <span className="font-mono text-[#c2622d]">grid-row: 1 / 3</span>
              <span className="text-muted-foreground ml-3">
                span 2 rows (useful for a tall sidebar)
              </span>
            </div>
          </div>
        </div>

        {/* grid-template-areas */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Named areas with{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-template-areas
            </code>
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Instead of juggling line numbers, name regions directly in the CSS.
            The ASCII diagram <em>is</em> the layout:
          </p>
          <div className="rounded-xl border border-border overflow-hidden">
            <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  gap: 12px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── 4. Grid vs Flexbox ─────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Grid vs Flexbox</h2>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
          <div className="px-6 py-3 flex gap-3">
            <span className="font-mono text-[#c2622d] shrink-0 w-24">Grid</span>
            <span className="text-muted-foreground">
              2D layouts — page structure, photo galleries, dashboard panels
            </span>
          </div>
          <div className="px-6 py-3 flex gap-3">
            <span className="font-mono text-[#c2622d] shrink-0 w-24">Flexbox</span>
            <span className="text-muted-foreground">
              1D layouts — navbars, button rows, card internals, centering a single item
            </span>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          They work together. A Grid defines the page skeleton; Flexbox
          arranges content <em>inside</em> each cell.
        </p>
      </section>

      {/* ── 5. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A classic page layout built entirely with{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-template-areas
            </code>
            . Try changing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-template-columns
            </code>{" "}
            to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              1fr 2fr
            </code>
            , or swapping the area names to rearrange the layout.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={EXPLORE_STARTER}
          height="420px"
        />
      </section>

      {/* ── 6. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Give{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .grid
            </code>{" "}
            a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              display: grid
            </code>{" "}
            and a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-template-columns
            </code>{" "}
            with 3 columns (try{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              repeat(3, 1fr)
            </code>
            ). Then add a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              @media
            </code>{" "}
            query that collapses it to a single column on small screens.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={CHALLENGE_STARTER}
          height="400px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 7. Gate ────────────────────────────────────────── */}
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
