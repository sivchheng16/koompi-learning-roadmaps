import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_HTML = `<h1>Welcome to KOOMPI Academy</h1>
<p>HTML is the skeleton of every webpage.</p>
<p>Try changing this text or adding new tags below.</p>`;

const CHALLENGE_STARTER = `<!-- Write your HTML here -->
<h1>My Page</h1>
`;

function parseHtml(raw: string): Document {
  return new DOMParser().parseFromString(raw, "text/html");
}

function buildDoc(body: string): string {
  return `<!DOCTYPE html><html><body>${body}</body></html>`;
}

const challenge = {
  prompt:
    'Add an <h2> element with the text "About Me" and a <p> element below it with at least one sentence about yourself.',
  check(htmlCode: string, _css: string, _js: string) {
    const doc = parseHtml(buildDoc(htmlCode));
    const h2 = doc.querySelector("h2");
    const p = doc.querySelector("p");
    if (!h2) return { passed: false, message: "No <h2> found yet. Add one with the text \"About Me\"." };
    if (!h2.textContent?.toLowerCase().includes("about me"))
      return { passed: false, message: `Your <h2> says "${h2.textContent}" — it should say "About Me".` };
    if (!p || !p.textContent?.trim())
      return { passed: false, message: "Add a <p> element with some text after your <h2>." };
    return { passed: true, message: "Challenge complete! Your HTML is structurally correct." };
  },
};

export default function Module01GettingStarted() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Every website you have ever visited — from Google to your favourite news site — started as plain text with angle brackets around it.
          That text is HTML, and in the next few minutes you will write your first working webpage.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What HTML actually is</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          HTML stands for <strong className="text-foreground">HyperText Markup Language</strong>. It describes the
          <em> structure</em> of a webpage — what is a heading, what is a paragraph, what is an image. Browsers read it
          and decide how to display each piece.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The unit of HTML is a <strong className="text-foreground">tag</strong>: a keyword inside angle brackets.
          Most tags come in pairs — an opening tag and a closing tag with a forward slash.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 font-mono text-sm text-foreground leading-loose">
          <span className="text-[#c2622d]">&lt;p&gt;</span>
          This is a paragraph.
          <span className="text-[#c2622d]">&lt;/p&gt;</span>
          <br />
          <span className="text-[#c2622d]">&lt;h1&gt;</span>
          This is the biggest heading.
          <span className="text-[#c2622d]">&lt;/h1&gt;</span>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          HTML is not a programming language — there is no logic, no calculations, no decisions. It is pure description.
          That is why it is the right place to start.
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">A complete page, annotated</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every HTML page shares the same skeleton. Here is the minimum:
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            index.html
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`<!DOCTYPE html>          ← tells the browser: "this is HTML5"
<html lang="en">         ← root element, lang sets the language
  <head>                 ← invisible metadata
    <meta charset="UTF-8">
    <title>My Page</title>  ← appears in the browser tab
  </head>
  <body>                 ← everything visible goes here
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
  </body>
</html>`}
          </pre>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">h1–h6</span> headings, h1 is the largest</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">p</span> paragraph of text</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">head</span> invisible to the user, metadata only</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">body</span> everything the user sees lives here</li>
        </ul>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            The editor below is live — edit the HTML and the preview updates instantly. Change the text, add another{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;p&gt;</code>, try{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;h2&gt;</code> or{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;strong&gt;</code>.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_HTML }}
          height="280px"
        />
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            The playground below starts empty. Write the HTML to pass the check — the preview and the result bar
            update as you type.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: CHALLENGE_STARTER }}
          height="300px"
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
