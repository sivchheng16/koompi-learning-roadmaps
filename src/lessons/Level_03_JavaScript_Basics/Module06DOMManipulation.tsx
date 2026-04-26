import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module06DOMManipulation() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase">
          Module 06 — JavaScript Basics
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          DOM Manipulation
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The DOM (Document Object Model) is JavaScript's view of the HTML page —
          a tree of elements you can read and change. This is where JavaScript
          becomes truly visual: click a button, and text changes. Type in a box,
          and the page reacts instantly.
        </p>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Selecting elements</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// By CSS selector — most flexible, returns the first match
const title = document.querySelector("h1");
const btn   = document.querySelector("#submit-btn");
const cards = document.querySelectorAll(".card"); // returns all matches

// By ID — fastest for single elements
const heading = document.getElementById("main-title");`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Reading and writing content</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-foreground font-mono">Property</th>
                <th className="text-left py-2 pr-4 font-semibold text-foreground">What it does</th>
                <th className="text-left py-2 font-semibold text-foreground">Note</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono">.textContent</td>
                <td className="py-2 pr-4">Get/set plain text</td>
                <td className="py-2">Safe — ignores HTML tags</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono">.innerHTML</td>
                <td className="py-2 pr-4">Get/set HTML markup</td>
                <td className="py-2">Renders tags, use with care</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">.value</td>
                <td className="py-2 pr-4">Read input field text</td>
                <td className="py-2">Only for form elements</td>
              </tr>
            </tbody>
          </table>
        </div>

        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const p = document.querySelector("#message");
p.textContent = "Updated by JavaScript!"; // set text`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Event listeners</h2>
        <p className="text-muted-foreground leading-relaxed">
          An event listener watches for something to happen (a click, a keypress,
          a scroll) and runs a function when it does.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const btn = document.querySelector("#my-btn");

btn.addEventListener("click", () => {
  document.querySelector("#output").textContent = "Button clicked!";
});`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Changing styles and classes</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const box = document.querySelector(".card");

// Inline style
box.style.backgroundColor = "#fef9c3"; // yellow highlight

// CSS classes (preferred — keeps JS and CSS separate)
box.classList.add("highlighted");
box.classList.remove("highlighted");
box.classList.toggle("highlighted"); // add if absent, remove if present`}
        </pre>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Live example — like button</h2>
        <p className="text-sm text-muted-foreground">
          Click the heart button and watch the counter update. Study how the event
          listener connects the button to the paragraph.
        </p>
        <CodePlayground
          mode="web"
          starter={{
            html: `<div id="post">
  <p>Photo from Angkor Wat 🏛️</p>
  <p id="count">0 likes</p>
  <button id="like-btn">❤️ Like</button>
</div>`,
            css: `body { font-family: system-ui, sans-serif; padding: 24px; }
#post { border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; max-width: 300px; }
#like-btn { margin-top: 8px; padding: 8px 20px; border: none;
  background: #ef4444; color: white; border-radius: 8px; cursor: pointer; font-size: 14px; }
#like-btn:hover { background: #dc2626; }`,
            js: `let likes = 0;
const btn = document.querySelector("#like-btn");
const count = document.querySelector("#count");

btn.addEventListener("click", () => {
  likes++;
  count.textContent = likes + " like" + (likes === 1 ? "" : "s");
});`,
          }}
        />
      </section>

      {/* Try it */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Try it yourself</h2>
        <p className="text-sm text-muted-foreground">
          Add a second button that resets the counter back to 0. You'll need a
          second <code className="font-mono bg-stone-100 px-1 rounded">addEventListener</code> call.
        </p>
        <CodePlayground
          mode="web"
          starter={{
            html: `<p id="score">Score: 0</p>
<button id="add-btn">+ Add point</button>
<button id="reset-btn">Reset</button>`,
            css: `body { font-family: system-ui, sans-serif; padding: 24px; }
button { margin: 4px; padding: 8px 16px; border: none; border-radius: 8px; cursor: pointer; }
#add-btn { background: #3b82f6; color: white; }
#reset-btn { background: #6b7280; color: white; }`,
            js: `let score = 0;
const display = document.querySelector("#score");

document.querySelector("#add-btn").addEventListener("click", () => {
  score++;
  display.textContent = "Score: " + score;
});

// Add reset button listener here
`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          Your HTML must have a <code className="font-mono bg-stone-100 px-1 rounded">&lt;button&gt;</code> and a{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">&lt;p&gt;</code>. When the button is clicked, the
          paragraph's text should change. Use{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">addEventListener</code>.
        </p>
        <CodePlayground
          mode="web"
          starter={{
            html: `<p id="message">Click the button below</p>
<button id="change-btn">Change text</button>`,
            css: `body { font-family: system-ui, sans-serif; padding: 24px; }
button { padding: 8px 20px; background: #f59e0b; border: none;
  border-radius: 8px; cursor: pointer; font-size: 14px; }`,
            js: `// Select the button and paragraph
// Add a click event listener to the button
// Inside the listener, change the paragraph's textContent
`,
          }}
          challenge={{
            prompt:
              "Add a click event listener to a button that changes the text of a paragraph.",
            check(html, _css, js) {
              if (!html.includes("<button"))
                return { passed: false, message: "Your HTML needs a <button> element." };
              if (!html.includes("<p"))
                return { passed: false, message: "Your HTML needs a <p> element." };
              if (!js.includes("addEventListener"))
                return {
                  passed: false,
                  message:
                    "Use addEventListener to listen for the click event on your button.",
                };
              return {
                passed: true,
                message:
                  "Challenge complete! You wired up your first click event listener.",
              };
            },
          }}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* Gate */}
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
