import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_SEMANTIC = `<!-- Semantic landmarks tell screen readers what each region is -->
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</header>

<main>
  <article>
    <h1>Learning Accessibility</h1>
    <p>Semantic HTML makes your site usable for everyone.</p>

    <!-- Descriptive alt text for content images -->
    <img src="https://placehold.co/400x200" alt="A student reading on a laptop" />

    <!-- Empty alt for decorative images -->
    <img src="https://placehold.co/40x40" alt="" />
  </article>

  <aside>
    <h2>Related Topics</h2>
    <p>Forms, ARIA, and SEO metadata</p>
  </aside>
</main>

<footer>
  <p>&copy; 2025 KOOMPI Academy</p>
</footer>`;

const EXPLORE_SEO = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Learn HTML – KOOMPI Academy</title>
  <meta name="description"
    content="Free beginner HTML lessons from KOOMPI Academy. Start coding today." />

  <!-- Open Graph — controls how links look on social media -->
  <meta property="og:title" content="Learn HTML – KOOMPI Academy" />
  <meta property="og:description" content="Free beginner HTML lessons." />
  <meta property="og:image" content="https://placehold.co/1200x630" />
</head>
<body>
  <h1>Learn HTML from Scratch</h1>
  <p>One clear h1 that matches the page intent.</p>
</body>
</html>`;

const CHALLENGE_STARTER = `<!-- Challenge: build an accessible page header with navigation.
     Requirements:
       1. A <nav> element inside <header>
       2. At least 2 <a> links inside the nav
       3. A <main> element after the header
       4. Any <img> must have an alt attribute
-->
`;

function parseHtml(raw: string): Document {
  return new DOMParser().parseFromString(raw, "text/html");
}

function buildDoc(body: string): string {
  return `<!DOCTYPE html><html><body>${body}</body></html>`;
}

const challenge = {
  prompt:
    "Write a <header> containing a <nav> with at least 2 links, followed by a <main> element. If you include any images, give them alt attributes.",
  check(htmlCode: string, _css: string, _js: string) {
    const doc = parseHtml(buildDoc(htmlCode));

    const nav = doc.querySelector("nav");
    if (!nav) return { passed: false, message: "No <nav> element found. Add one inside a <header>." };

    const links = nav.querySelectorAll("a");
    if (links.length < 2)
      return {
        passed: false,
        message: `Your <nav> has ${links.length} link(s) — add at least 2 <a> elements.`,
      };

    const main = doc.querySelector("main");
    if (!main) return { passed: false, message: "No <main> element found. Add one after the header." };

    const images = doc.querySelectorAll("img");
    for (const img of Array.from(images)) {
      if (!img.hasAttribute("alt")) {
        return {
          passed: false,
          message: `Found an <img> without an alt attribute. Add alt="" for decorative images or a description for content images.`,
        };
      }
    }

    return { passed: true, message: "Challenge complete! Your page structure is accessible and correct." };
  },
};

export default function Module08AccessibilitySEO() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          1 in 6 people worldwide lives with a disability. If your site is inaccessible, you have already
          excluded them before they read a single word — and Google will rank you lower for it too.
          The good news: the fix starts with the HTML you write right now.
        </p>
      </section>

      {/* ── 2. Semantic HTML ───────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Semantic HTML is the foundation</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Screen readers — the software blind users rely on — announce landmarks like "navigation region" or
          "main content". Those announcements come from the tags you choose.{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;div&gt;</code> conveys nothing.
          These tags convey meaning:
        </p>
        <div className="rounded-xl bg-stone-50 border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-stone-100">
                <th className="text-left px-5 py-2.5 font-mono text-foreground font-semibold">Tag</th>
                <th className="text-left px-5 py-2.5 font-sans text-muted-foreground font-medium">What it means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["<nav>", "Site navigation links"],
                ["<main>", "Primary content of the page (one per page)"],
                ["<article>", "Self-contained content (blog post, card)"],
                ["<aside>", "Supplementary content (sidebar, callout)"],
                ["<footer>", "Footer of a page or section"],
                ["<header>", "Introductory content for a page or section"],
              ].map(([tag, desc]) => (
                <tr key={tag} className="hover:bg-stone-50/60">
                  <td className="px-5 py-2.5 font-mono text-[#c2622d] text-sm">{tag}</td>
                  <td className="px-5 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 3. Alt text + labels ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Alt text and form labels</h2>
        <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
          <p>
            Every <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;img&gt;</code> needs an{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code> attribute.
            For images that carry information, write a short description. For purely decorative images, use{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt=""</code> — an empty value tells
            screen readers to skip it.
          </p>
          <p>
            Form inputs must always have a matching{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;label&gt;</code>. Connect them
            with the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">for</code> / {" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">id</code> pair. Placeholder text
            disappears when the user types — it is not a substitute for a label.
          </p>
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            alt text + label examples
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`<!-- Content image — describe what it shows -->
<img src="chart.png" alt="Bar chart showing monthly sales" />

<!-- Decorative image — screen reader skips this -->
<img src="divider.svg" alt="" />

<!-- Correctly labelled input -->
<label for="email">Email address</label>
<input type="email" id="email" name="email" />`}
          </pre>
        </div>
      </section>

      {/* ── 4. ARIA ────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">ARIA — when HTML semantics aren't enough</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          ARIA attributes bolt extra meaning onto elements that HTML alone cannot express. The golden rule:
          reach for semantic HTML first. Use ARIA only when no native element fits.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            common ARIA attributes
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`<!-- aria-label names an element that has no visible label -->
<button aria-label="Close dialog">X</button>

<!-- aria-describedby links to helper text -->
<input id="pw" aria-describedby="pw-hint" type="password" />
<p id="pw-hint">Must be at least 8 characters.</p>

<!-- role overrides the implicit role of a generic element -->
<div role="alert">Your session is about to expire.</div>`}
          </pre>
        </div>
      </section>

      {/* ── 5. Heading hierarchy ───────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Heading hierarchy</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          One <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;h1&gt;</code> per page. Never
          skip levels — going from <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">h1</code> straight
          to <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">h3</code> confuses screen reader users
          who navigate by heading. Think of headings as a document outline, not a font-size selector.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-xs font-semibold text-red-600 mb-2 uppercase tracking-wide">Wrong</p>
            <pre className="text-sm font-mono text-red-800 leading-relaxed">{`<h1>Page title</h1>
<h3>Skipped h2!</h3>
<h5>Deep, no context</h5>`}</pre>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4">
            <p className="text-xs font-semibold text-green-600 mb-2 uppercase tracking-wide">Correct</p>
            <pre className="text-sm font-mono text-green-800 leading-relaxed">{`<h1>Page title</h1>
<h2>Section heading</h2>
<h3>Subsection</h3>`}</pre>
          </div>
        </div>
      </section>

      {/* ── 6. SEO essentials ──────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">SEO essentials</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Search engines read the same HTML as screen readers. Accessible markup and good SEO are the same work.
        </p>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3 leading-relaxed">
            <code className="text-primary font-mono shrink-0 mt-0.5">&lt;title&gt;</code>
            Unique per page, 50–60 characters. Appears in the browser tab and as the blue link in search results.
          </li>
          <li className="flex gap-3 leading-relaxed">
            <code className="text-primary font-mono shrink-0 mt-0.5">meta description</code>
            150–160 chars. Google shows this under the title. Write it to earn the click.
          </li>
          <li className="flex gap-3 leading-relaxed">
            <code className="text-primary font-mono shrink-0 mt-0.5">og:title / og:image</code>
            Open Graph tags control how your page looks when shared on Facebook, Telegram, Discord, etc.
          </li>
          <li className="flex gap-3 leading-relaxed">
            <code className="text-primary font-mono shrink-0 mt-0.5">&lt;h1&gt;</code>
            One per page. It should match the page intent and your target keyword naturally — no stuffing.
          </li>
        </ul>
      </section>

      {/* ── 7. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it — semantic structure</h2>
          <p className="text-base text-muted-foreground mt-1">
            Edit the HTML below. Notice how semantic elements replace meaningless{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;div&gt;</code> wrappers.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_SEMANTIC }}
          height="340px"
        />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it — SEO metadata</h2>
          <p className="text-base text-muted-foreground mt-1">
            The preview won't look exciting — metadata lives in{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;head&gt;</code> and is invisible
            to users. But search engines and social platforms read it on every request.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_SEO }}
          height="300px"
        />
      </section>

      {/* ── 8. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Build an accessible page header from scratch. The checker verifies structure — not visual style —
            so focus on the right elements.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: CHALLENGE_STARTER }}
          height="320px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 9. Gate ────────────────────────────────────────── */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-green-800">Challenge passed</p>
              <p className="text-sm text-green-700 mt-0.5">
                Click <strong>Complete &amp; Next</strong> below to move on to the next lesson.
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
