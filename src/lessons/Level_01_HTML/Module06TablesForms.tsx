import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_HTML = `<form>
  <label for="name">Your name:</label>
  <input type="text" id="name" placeholder="e.g. Sokha">

  <label for="email">Email:</label>
  <input type="email" id="email" placeholder="you@example.com">

  <label for="topic">Topic:</label>
  <select id="topic">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
  </select>

  <label for="message">Message:</label>
  <textarea id="message" rows="4"></textarea>

  <button type="submit">Send</button>
</form>`;

const CHALLENGE_STARTER = `<!-- Build a contact form here -->
<!-- It needs: a text input with a label, an email input with a label,
     and a submit button. -->
`;

const challenge = {
  prompt:
    "Build a contact form with: a <label> + <input type=\"text\">, a <label> + <input type=\"email\">, and a <button type=\"submit\">.",
  check(htmlCode: string, _css: string, _js: string) {
    const doc = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><body>${htmlCode}</body></html>`,
      "text/html"
    );

    const textInput = doc.querySelector('input[type="text"]');
    if (!textInput)
      return { passed: false, message: 'Add an <input type="text"> for the visitor\'s name.' };

    const emailInput = doc.querySelector('input[type="email"]');
    if (!emailInput)
      return { passed: false, message: 'Add an <input type="email"> for the visitor\'s email.' };

    const labels = doc.querySelectorAll("label");
    if (labels.length < 2)
      return {
        passed: false,
        message: `Found ${labels.length} <label> element(s) — you need at least 2, one for each input.`,
      };

    const submitBtn = doc.querySelector('button[type="submit"]');
    if (!submitBtn)
      return { passed: false, message: 'Add a <button type="submit"> so the form can be submitted.' };

    return { passed: true, message: "Challenge complete! Your contact form has all the required fields." };
  },
};

export default function Module06TablesForms() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Tables and forms are how the web organises data and talks back to people.
          Every signup page, checkout screen, and spreadsheet you have ever used online is built from exactly what you are about to learn.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Two tools, two jobs</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Tables</strong> display data that naturally lives in rows and columns — think schedules,
          price lists, or comparison grids. A table is built from three nested elements:{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;table&gt;</code> wraps everything,{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;tr&gt;</code> is a row, and each cell inside
          a row is either a header (<code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;th&gt;</code>) or
          data (<code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;td&gt;</code>).
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Forms</strong> collect input from a visitor and send it somewhere.
          The key elements are{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;form&gt;</code> (the container),{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;label&gt;</code> (the description),{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;input&gt;</code> (where the user types),
          and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;button type="submit"&gt;</code> (to send it).
          Always pair every input with a label — it helps screen readers and makes the form easier to click.
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">A table and a form, annotated</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Below is a minimal table followed by a simple form. Read the inline comments — they explain every tag.
        </p>

        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            table example
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`<table>             ← the outer wrapper
  <tr>              ← first row (header row)
    <th>Name</th>   ← <th> = header cell, bold + centred
    <th>Score</th>
  </tr>
  <tr>              ← second row (data row)
    <td>Sokha</td>  ← <td> = regular data cell
    <td>95</td>
  </tr>
  <tr>
    <td>Dara</td>
    <td>88</td>
  </tr>
</table>`}
          </pre>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            form example
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`<form action="/submit" method="POST">

  <label for="name">Full name:</label>       ← label describes the input
  <input type="text" id="name" name="name">  ← id links label → input

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">  ← type="email" validates format

  <label for="msg">Message:</label>
  <textarea id="msg" name="msg" rows="4"></textarea>  ← multi-line text

  <label for="track">Track:</label>
  <select id="track" name="track">          ← dropdown
    <option value="html">HTML</option>
    <option value="css">CSS</option>
  </select>

  <button type="submit">Send</button>        ← submits the form

</form>`}
          </pre>
        </div>

        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">type="text"</span> plain text input</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">type="email"</span> input that validates an email address</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">type="password"</span> input that hides characters</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">textarea</span> multi-line text field (has a closing tag)</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">select + option</span> dropdown menu</li>
        </ul>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A complete form is loaded below. Edit it freely — try adding a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;input type="checkbox"&gt;</code>,
            change the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">select</code> options,
            or wrap the inputs in a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;table&gt;</code> to see how layout changes.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_HTML }}
          height="340px"
        />
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Build a contact form from scratch. It must contain:
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;label&gt;</code> and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;input type="text"&gt;</code> (for a name)</li>
            <li>A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;label&gt;</code> and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;input type="email"&gt;</code></li>
            <li>A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;button type="submit"&gt;</code></li>
          </ul>
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
