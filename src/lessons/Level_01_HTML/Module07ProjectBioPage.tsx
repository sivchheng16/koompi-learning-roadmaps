import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const STARTER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Bio Page</title>
</head>
<body>
  <header>
    <h1>Your Name Here</h1>
  </header>
  <main>
    <p>Write something about yourself...</p>
  </main>
  <footer>
    <p>Made with HTML</p>
  </footer>
</body>
</html>`;

const challenge = {
  prompt: "Build a complete bio page that meets all five structural requirements listed above.",
  check(htmlCode: string, _css: string, _js: string) {
    const doc = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><body>${htmlCode}</body></html>`,
      "text/html"
    );

    // 1. <header> with an <h1>
    const header = doc.querySelector("header");
    if (!header)
      return { passed: false, message: "Missing <header> element. Wrap your page title in a <header>." };

    const h1InHeader = header.querySelector("h1");
    if (!h1InHeader)
      return { passed: false, message: "Your <header> needs an <h1> with your name inside it." };

    if (!h1InHeader.textContent?.trim())
      return { passed: false, message: "Your <h1> is empty — put your name in it." };

    // 2. <main>
    const main = doc.querySelector("main");
    if (!main)
      return { passed: false, message: "Missing <main> element. Wrap your main content in <main>." };

    // 3. <img> with non-empty alt
    const img = doc.querySelector("img");
    if (!img)
      return { passed: false, message: "Add at least one <img> element (a profile photo or any image)." };

    const alt = img.getAttribute("alt");
    if (!alt || !alt.trim())
      return { passed: false, message: "Your <img> needs a non-empty alt attribute describing the image." };

    // 4. <ul> or <ol> with at least 2 <li> items
    const list = doc.querySelector("ul, ol");
    if (!list)
      return { passed: false, message: "Add a list (<ul> or <ol>) — use it for your skills, hobbies, or goals." };

    const items = list.querySelectorAll("li");
    if (items.length < 2)
      return {
        passed: false,
        message: `Your list only has ${items.length} item(s). Add at least 2 <li> elements.`,
      };

    // 5. <footer>
    const footer = doc.querySelector("footer");
    if (!footer)
      return { passed: false, message: "Missing <footer> element. Add a <footer> at the bottom of your page." };

    return { passed: true, message: "All five requirements met — your bio page is complete!" };
  },
};

export default function Module07ProjectBioPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          This is your first real webpage — not a tutorial exercise, but a page that represents you.
          Every skill you have built across the HTML track comes together here.
        </p>
      </section>

      {/* ── 2. Requirements ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What your bio page must include</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The challenge checker will verify all five requirements below. Everything else — the content, the wording,
          any extra sections — is up to you.
        </p>
        <ol className="space-y-4 text-base text-muted-foreground leading-relaxed list-decimal list-inside">
          <li>
            A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;header&gt;</code> containing an{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;h1&gt;</code> with your name
          </li>
          <li>
            A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;main&gt;</code> section wrapping your main content
          </li>
          <li>
            At least one <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;img&gt;</code> with a
            non-empty <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code> attribute
          </li>
          <li>
            A list — <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;ul&gt;</code> or{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;ol&gt;</code> — with at least two{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;li&gt;</code> items (skills, hobbies, goals — your choice)
          </li>
          <li>
            A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;footer&gt;</code>
          </li>
        </ol>

        <div className="rounded-xl bg-stone-50 border border-border px-6 py-4 space-y-2">
          <p className="text-sm font-semibold text-foreground">Ideas for your page</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>About section — where you are from, what you are learning, why you chose technology</li>
            <li>Skills list — HTML, Linux terminal, typing, anything honest</li>
            <li>Goals list — short-term and long-term</li>
            <li>A favourite quote as a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;blockquote&gt;</code></li>
            <li>A contact section with an <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">href="mailto:..."</code> link</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Starter code / Try it ───────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Start here</h2>
          <p className="text-base text-muted-foreground mt-1">
            A skeleton is loaded below. Expand it into your bio page — replace the placeholder text, add real sections,
            and fulfil all five requirements. The preview updates as you type.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: STARTER_HTML }}
          height="420px"
        />
      </section>

      {/* ── 4. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Paste your finished page into the playground below (or write it fresh here). When all five requirements
            are satisfied the checker will pass you.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: STARTER_HTML }}
          height="420px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 5. Gate ────────────────────────────────────────── */}
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
