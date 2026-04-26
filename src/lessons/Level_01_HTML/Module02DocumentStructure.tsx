import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_HTML = `<!-- Try editing this full page structure -->
<header>
  <h1>KOOMPI Academy</h1>
  <nav>
    <a href="#">Home</a> |
    <a href="#">Courses</a> |
    <a href="#">About</a>
  </nav>
</header>

<main>
  <section>
    <h2>Welcome</h2>
    <p>This is the main content area. Only one &lt;main&gt; per page.</p>
  </section>

  <aside>
    <p>Sidebar: related links or notes go here.</p>
  </aside>
</main>

<footer>
  <p>&copy; 2025 KOOMPI. All rights reserved.</p>
</footer>`;

const CHALLENGE_STARTER = `<!-- Build the three core sections of a page.
     Add a <header> with an <h1> inside it,
     a <main> with a <p> inside it,
     and a <footer>. -->
`;

function parseHtml(raw: string): Document {
  return new DOMParser().parseFromString(
    `<!DOCTYPE html><html><body>${raw}</body></html>`,
    "text/html"
  );
}

const challenge = {
  prompt:
    "Add a <header> element containing an <h1>, a <main> element containing at least one <p>, and a <footer> element.",
  check(htmlCode: string, _css: string, _js: string) {
    const doc = parseHtml(htmlCode);

    const header = doc.querySelector("header");
    if (!header)
      return { passed: false, message: "No <header> found yet. Add one wrapping your page title." };

    const h1 = header.querySelector("h1");
    if (!h1)
      return { passed: false, message: "Put an <h1> inside your <header> — it should be the page title." };

    if (!h1.textContent?.trim())
      return { passed: false, message: "Your <h1> is empty. Give your page a title." };

    const main = doc.querySelector("main");
    if (!main)
      return { passed: false, message: "<header> looks good! Now add a <main> element for your page content." };

    const p = main.querySelector("p");
    if (!p || !p.textContent?.trim())
      return { passed: false, message: "Add a <p> inside your <main> with some text." };

    const footer = doc.querySelector("footer");
    if (!footer)
      return { passed: false, message: "Almost there — add a <footer> at the bottom of your page." };

    return { passed: true, message: "Challenge complete! Your page has a solid semantic structure." };
  },
};

export default function Module02DocumentStructure() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          A browser does not care how pretty your HTML is — it cares whether it can find the header, the main content,
          and the footer. Structure is the contract between you and the browser.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The skeleton every page shares</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every HTML page starts with a{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">DOCTYPE</code> declaration, then
          a root <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;html&gt;</code> element
          that holds exactly two children:{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;head&gt;</code> (invisible
          metadata) and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;body&gt;</code>{" "}
          (everything the user sees).
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Inside <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;body&gt;</code> you
          use <strong className="text-foreground">semantic elements</strong> — tags whose names describe
          their purpose.{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;header&gt;</code>,{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;main&gt;</code>, and{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;footer&gt;</code> are the
          three sections every page should have. A screen reader, a search engine, and a fellow developer
          all understand them without any extra explanation.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-2 text-sm font-mono text-foreground leading-relaxed">
          <div><span className="text-[#c2622d]">&lt;header&gt;</span> — branding, site title, navigation</div>
          <div className="pl-4"><span className="text-[#c2622d]">&lt;nav&gt;</span> — links to other pages (lives inside header)</div>
          <div><span className="text-[#c2622d]">&lt;main&gt;</span> — the unique content of this page (use only once)</div>
          <div className="pl-4"><span className="text-[#c2622d]">&lt;section&gt;</span> — a thematic group of content</div>
          <div className="pl-4"><span className="text-[#c2622d]">&lt;article&gt;</span> — self-contained piece (a blog post, a card)</div>
          <div className="pl-4"><span className="text-[#c2622d]">&lt;aside&gt;</span> — sidebar, tangentially related content</div>
          <div><span className="text-[#c2622d]">&lt;footer&gt;</span> — copyright, contact links, secondary navigation</div>
        </div>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">A full page, annotated</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Read through this once before you touch any code. Notice where each element lives and why.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            index.html
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`<!DOCTYPE html>              ← always the very first line
<html lang="en">             ← "en" tells screen readers the language
<head>
  <meta charset="UTF-8">    ← supports all characters including Khmer
  <title>My Portfolio</title>  ← text in the browser tab
</head>
<body>

  <header>                  ← top of the page
    <h1>Sokha's Portfolio</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
    </nav>
  </header>

  <main>                    ← one per page — the core content
    <section>
      <h2>Projects</h2>
      <article>
        <h3>Weather App</h3>
        <p>Built with HTML, CSS, and JavaScript.</p>
      </article>
    </section>

    <aside>
      <p>Currently open to work.</p>
    </aside>
  </main>

  <footer>                  ← bottom of the page
    <p>&copy; 2025 Sokha. All rights reserved.</p>
  </footer>

</body>
</html>`}
          </pre>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">DOCTYPE</span>
            without it, the browser enters "quirks mode" and renders inconsistently
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">lang="en"</span>
            screen readers use this to choose the correct voice and pronunciation
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">charset="UTF-8"</span>
            enables every character on Earth — including Khmer script
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">main</span>
            use exactly once — search engines give it the highest content weight
          </li>
        </ul>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A page structure is already here. Experiment: rename the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;h1&gt;</code>, add a second{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;section&gt;</code> inside{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;main&gt;</code>, or remove
            the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;aside&gt;</code> and
            see what changes.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_HTML }}
          height="380px"
        />
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Start from scratch. Build the three sections every page must have: a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;header&gt;</code> with an{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;h1&gt;</code> inside it, a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;main&gt;</code> with at
            least one <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;p&gt;</code>, and
            a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;footer&gt;</code>. The
            check tells you exactly what is still missing as you go.
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
