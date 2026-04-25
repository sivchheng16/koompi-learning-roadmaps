import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_STARTER = {
  html: `<div class="card">
  <div class="card-header">
    <img
      class="avatar"
      src="https://i.pravatar.cc/80?img=47"
      alt="Sokha's photo"
    />
    <div>
      <h2 class="name">Sokha Dara</h2>
      <p class="title">Frontend Developer · Phnom Penh</p>
    </div>
  </div>

  <p class="bio">
    Passionate about building fast, beautiful interfaces.
    Currently learning React at KOOMPI Academy.
  </p>

  <div class="tags">
    <span class="tag">HTML</span>
    <span class="tag">CSS</span>
    <span class="tag">JavaScript</span>
    <span class="tag">React</span>
  </div>

  <a class="cta" href="#">View Portfolio →</a>
</div>`,
  css: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', sans-serif;
  background-color: #f5f0e8;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

/* ── Card shell ── */
.card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 420px;
  width: 100%;
  border: 1px solid #e7e0d6;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

/* ── Header row: avatar + name ── */
.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #c2622d;
}

.name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
}

.title {
  font-size: 0.875rem;
  color: #888;
  margin-top: 2px;
}

/* ── Bio ── */
.bio {
  font-size: 0.95rem;
  line-height: 1.65;
  color: #555;
  margin-bottom: 20px;
}

/* ── Skill tags ── */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.tag {
  background: #fdf6ec;
  border: 1px solid #e0d4c0;
  color: #c2622d;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 999px;
}

/* ── CTA button with hover ── */
.cta {
  display: block;
  text-align: center;
  background-color: #c2622d;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
}

.cta:hover {
  background-color: #a34f22;
}

/* ── Responsive: tighter on phones ── */
@media (max-width: 480px) {
  .card {
    padding: 20px;
  }

  .card-header {
    flex-direction: column;
    text-align: center;
  }
}`,
};

const CHALLENGE_STARTER = {
  html: `<div class="card">
  <h2 class="name">Your Name</h2>
  <p class="role">Web Developer</p>

  <div class="skills">
    <span class="skill">HTML</span>
    <span class="skill">CSS</span>
  </div>

  <a class="btn" href="#">Contact Me</a>
</div>`,
  css: `/* Build a portfolio card using all CSS skills.
   Requirements:
   1. font-family set on body or .card
   2. display: flex somewhere
   3. a :hover rule on any element
   4. @media query
   5. background-color or background set
*/

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  padding: 40px;
}

.card {

}`,
};

const challenge = {
  prompt:
    "Style a portfolio card using: font-family, display:flex, a :hover rule, a @media query, and background-color or background.",
  check(_html: string, css: string, _js: string) {
    const hasFont = /font-family\s*:/i.test(css);
    const hasFlex = /display\s*:\s*flex/i.test(css);
    const hasHover = /:hover\s*\{/i.test(css);
    const hasMedia = /@media/i.test(css);
    const hasBg =
      /background-color\s*:/i.test(css) ||
      /background\s*:/i.test(css);

    if (!hasFont)
      return {
        passed: false,
        message: "Set `font-family` on body or .card.",
      };
    if (!hasFlex)
      return {
        passed: false,
        message: "Add `display: flex` somewhere — try the skills row.",
      };
    if (!hasHover)
      return {
        passed: false,
        message:
          "Add a `:hover` rule — try `.btn:hover { background-color: ... }`.",
      };
    if (!hasMedia)
      return {
        passed: false,
        message: "Add a `@media` query for responsive behavior.",
      };
    if (!hasBg)
      return {
        passed: false,
        message:
          "Add `background-color` or `background` to at least one element.",
      };
    return { passed: true, message: "Portfolio card complete! Great work." };
  },
};

export default function Module07ProjectPortfolio() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Six lessons of CSS. One card to prove you absorbed them. A
          portfolio card is also one of the most reusable components you
          will ever build — you will put your own name in it.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What the card must include</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          This capstone brings together every technique from this track.
          Your finished card must demonstrate:
        </p>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">font-family</span>
            <span className="text-muted-foreground ml-3">
              a custom or web-safe font applied to the card or body
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">display: flex</span>
            <span className="text-muted-foreground ml-3">
              a flex container somewhere — header row, skills list, or full
              card layout
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">:hover</span>
            <span className="text-muted-foreground ml-3">
              at least one hover effect — a button color change is perfect
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">@media</span>
            <span className="text-muted-foreground ml-3">
              a responsive breakpoint that adjusts layout on small screens
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">background-color</span>
            <span className="text-muted-foreground ml-3">
              colors on the card, header, button, or tags
            </span>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          There is no single right answer. The reference below is one
          approach — a complete portfolio card you can study before
          building your own in the challenge.
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Reference card — fully annotated</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A complete working card using everything from this track. Read the
          comments — they map each rule back to the lesson that introduced it.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            styles.css (annotated)
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`/* ── Module 03: Google Font + typography ── */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;   /* Module 03 */
  background-color: #f5f0e8;          /* Module 03 */
}

/* ── Module 04: Box model ── */
.card {
  padding: 32px;                      /* inner space */
  border: 1px solid #e7e0d6;          /* visible edge */
  border-radius: 16px;
  margin: 0 auto;
  max-width: 420px;
}

/* ── Module 06: Flexbox ── */
.card-header {
  display: flex;                      /* Module 06 */
  align-items: center;
  gap: 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* ── Module 02: Pseudo-class :hover ── */
.cta:hover {
  background-color: #a34f22;          /* hover effect */
}

/* ── Module 06: Media query ── */
@media (max-width: 480px) {
  .card-header {
    flex-direction: column;           /* stack on phones */
  }
}`}
          </pre>
        </div>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            The full reference card is live below — including the Google
            Font, hover effect, and responsive breakpoint. Resize the preview
            to trigger the mobile layout. Try changing the color palette,
            adding a new tag, or swapping the font.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={EXPLORE_STARTER}
          height="520px"
        />
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge — build your own card</h2>
          <p className="text-base text-muted-foreground mt-1">
            Start from the skeleton below. Replace the placeholder name and
            role with your own. The checker verifies five requirements:{" "}
            <strong className="text-foreground">font-family</strong>,{" "}
            <strong className="text-foreground">display: flex</strong>,{" "}
            <strong className="text-foreground">:hover</strong>,{" "}
            <strong className="text-foreground">@media</strong>, and{" "}
            <strong className="text-foreground">background-color</strong>.
            Everything else is your design decision.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={CHALLENGE_STARTER}
          height="500px"
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
