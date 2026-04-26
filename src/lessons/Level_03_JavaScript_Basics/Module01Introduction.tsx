import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module01Introduction() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase">
          Module 01 — JavaScript Basics
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Introduction to JavaScript
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          HTML gives a page its bones, CSS gives it a face, and JavaScript gives
          it a brain. Every interactive feature you've ever used on the web —
          a live search box, a chat bubble, a button that does something —
          is powered by JavaScript. In this lesson you'll write your very first
          JavaScript and see results right in the browser.
        </p>
        <div className="grid grid-cols-3 gap-4 pt-2">
          {[
            { label: "HTML", desc: "Structure — What's here" },
            { label: "CSS", desc: "Style — How it looks" },
            { label: "JavaScript", desc: "Behaviour — What it does" },
          ].map(({ label, desc }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-stone-50 px-4 py-3 text-center"
            >
              <p className="font-mono font-bold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">What can JavaScript do?</h2>
        <p className="text-muted-foreground leading-relaxed">
          JavaScript runs directly inside the browser — no install needed. Here are
          the most common things you'll build:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Respond to button clicks and keyboard input",
            "Update page content without reloading (e.g. live score)",
            "Validate forms before submitting (did the user fill everything?)",
            "Call a server to load new data (e.g. weather, news feed)",
            "Save preferences in the browser (e.g. dark mode toggle)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-amber-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-foreground pt-4">Adding JS to a page</h2>
        <p className="text-muted-foreground leading-relaxed">
          The most common way is to put a <code className="font-mono bg-stone-100 px-1 rounded">&lt;script&gt;</code> tag
          at the bottom of <code className="font-mono bg-stone-100 px-1 rounded">&lt;body&gt;</code>. The browser runs
          whatever JS is inside it when the page loads.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`<!DOCTYPE html>
<html>
  <body>
    <h1>Hello, Cambodia!</h1>

    <script>
      // JS goes here — runs after the page loads
      document.body.innerHTML += "<p>JS is working!</p>";
    </script>
  </body>
</html>`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Two ways to output something</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-foreground">Method</th>
                <th className="text-left py-2 pr-4 font-semibold text-foreground">What it does</th>
                <th className="text-left py-2 font-semibold text-foreground">Use it for</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono">document.write()</td>
                <td className="py-2 pr-4">Writes HTML into the page</td>
                <td className="py-2">Quick demos (avoid in real apps)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono">element.innerHTML</td>
                <td className="py-2 pr-4">Sets the content of any element</td>
                <td className="py-2">Most real-world usage</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">alert()</td>
                <td className="py-2 pr-4">Shows a popup dialog</td>
                <td className="py-2">Debugging, quick messages</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Live example — try editing it</h2>
        <p className="text-sm text-muted-foreground">
          This playground runs real HTML and JavaScript. The preview updates as you
          type. Change the message or add another line.
        </p>
        <CodePlayground
          mode="web"
          starter={{
            html: `<h2 id="greeting">Hello from HTML</h2>
<p id="sub">JavaScript hasn't run yet...</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 24px; }
h2 { color: #333; }
#sub { color: #777; font-size: 0.9rem; }`,
            js: `// JS runs after HTML is ready
document.getElementById("greeting").textContent = "Hello, Cambodia! 🇰🇭";
document.getElementById("sub").textContent = "JavaScript is running!";`,
          }}
        />
      </section>

      {/* Try it */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Try it yourself</h2>
        <p className="text-sm text-muted-foreground">
          Experiment below. Add a <code className="font-mono bg-stone-100 px-1 rounded">&lt;script&gt;</code> tag
          in the HTML panel that writes something to the page using{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">document.write()</code> or sets{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">document.body.innerHTML</code>.
        </p>
        <CodePlayground
          mode="web"
          starter={{
            html: `<!-- Write your page content here -->
<h1>My first JavaScript page</h1>
<p>Edit me, then add a script tag below!</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 24px; }`,
            js: `// Your JS here — try: document.write("<p>It works!</p>")`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          In the JS panel, write code that uses <code className="font-mono bg-stone-100 px-1 rounded">document.</code> to
          put your name onto the page. You can use{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">document.write("Hello Dara!")</code> or{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">document.body.innerHTML = "..."</code> — your choice.
        </p>
        <CodePlayground
          mode="web"
          starter={{
            html: `<h2>My page</h2>
<p>Add JavaScript to write your name here!</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 24px; }`,
            js: `// Write your name onto the page using document
`,
          }}
          challenge={{
            prompt:
              "Use document.write() or set document.body.innerHTML to put your name on the page.",
            check(_html, _css, js) {
              if (!js.includes("document."))
                return {
                  passed: false,
                  message:
                    "Your JS must reference document. — try document.write(\"Your name\")",
                };
              return { passed: true, message: "Challenge complete! You just used JavaScript to control the DOM." };
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
