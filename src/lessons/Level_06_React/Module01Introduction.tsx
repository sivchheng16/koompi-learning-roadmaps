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
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
          Module 01 — React Fundamentals
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Introduction to React
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          React is the JavaScript library that powers Facebook, Instagram, Netflix,
          Airbnb, and Notion. Instead of manually updating the DOM one piece at a
          time, you describe what the UI should look like — React figures out the
          minimum set of changes needed. In this lesson you'll understand why React
          exists and write your first component.
        </p>
        <div className="grid grid-cols-3 gap-4 pt-2">
          {[
            { label: "Components", desc: "Reusable pieces of UI" },
            { label: "Declarative", desc: "Describe what, not how" },
            { label: "Virtual DOM", desc: "Only updates what changed" },
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
        <h2 className="text-xl font-semibold text-foreground">JSX — HTML inside JavaScript</h2>
        <p className="text-muted-foreground leading-relaxed">
          React uses <strong>JSX</strong> — a syntax that looks like HTML but lives inside a
          JavaScript function. The browser never sees JSX directly; a tool called Babel
          compiles it to regular <code className="font-mono bg-stone-100 px-1 rounded">React.createElement()</code> calls.
          A few JSX rules differ from HTML:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-6 font-semibold text-foreground">HTML</th>
                <th className="text-left py-2 font-semibold text-foreground">JSX equivalent</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-6 font-mono">class="container"</td>
                <td className="py-2 font-mono">className="container"</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-6 font-mono">&lt;br&gt;</td>
                <td className="py-2 font-mono">&lt;br /&gt; (must self-close)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-6 font-mono">onclick="fn()"</td>
                <td className="py-2 font-mono">onClick={"{fn}"}</td>
              </tr>
              <tr>
                <td className="py-2 pr-6 font-mono">for="email"</td>
                <td className="py-2 font-mono">htmlFor="email"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">Your first component</h2>
        <p className="text-muted-foreground leading-relaxed">
          A React component is just a JavaScript function that returns JSX. The name must
          start with a capital letter. React auto-mounts an <code className="font-mono bg-stone-100 px-1 rounded">App</code> component
          at the root of the page — so every app starts there.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`function App() {
  return (
    <div>
      <h1>Hello, Cambodia! 🇰🇭</h1>
      <p>Built with React.</p>
    </div>
  );
}`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">The Virtual DOM</h2>
        <p className="text-muted-foreground leading-relaxed">
          When state changes, React doesn't re-draw the whole page. It computes a
          diff between the old Virtual DOM (a lightweight copy) and the new one,
          then applies only the minimal changes to the real DOM. That's why React
          apps feel fast even with complex UIs.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "State changes → React re-renders the component in memory",
            "React diffs the previous and next Virtual DOM trees",
            "Only the changed nodes are updated in the real browser DOM",
            "Result: fewer repaints, smoother user experience",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-blue-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Live example — try editing it</h2>
        <p className="text-sm text-muted-foreground">
          The playground runs React 18 in the browser. The preview updates as you type.
          Try changing the text inside the tags.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `function App() {
  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      <h1 style={{ color: "#2563eb" }}>Hello from React!</h1>
      <p style={{ color: "#555" }}>
        I am a component. Edit me in the JS panel.
      </p>
      <ul>
        <li>Components are reusable</li>
        <li>JSX looks like HTML</li>
        <li>className instead of class</li>
      </ul>
    </div>
  );
}`,
          }}
        />
      </section>

      {/* Try it */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Try it yourself</h2>
        <p className="text-sm text-muted-foreground">
          Modify the starter below. Add a second paragraph with your name inside it.
          Remember: one root element wrapping everything, <code className="font-mono bg-stone-100 px-1 rounded">className</code> not <code className="font-mono bg-stone-100 px-1 rounded">class</code>.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `function App() {
  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      <h1>My React Page</h1>
      {/* Add a <p> with your name below */}
    </div>
  );
}`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          Write an <code className="font-mono bg-stone-100 px-1 rounded">App</code> component that returns a{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">&lt;div&gt;</code> containing both an{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">&lt;h1&gt;</code> (your page title) and a{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">&lt;p&gt;</code> (a short description). Both elements
          must be present inside a single root element.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `// Define your App component here.
// It must return a <div> with an <h1> and a <p> inside.
function App() {
  return (
    <div>
      {/* your content */}
    </div>
  );
}`,
          }}
          challenge={{
            prompt:
              "Return a <div> containing an <h1> and a <p> from your App component.",
            check(_html, _css, js) {
              if (!js.includes("function App") && !js.includes("const App"))
                return { passed: false, message: "Define a component named App." };
              if (!js.includes("<h1"))
                return { passed: false, message: "Add an <h1> element inside App." };
              if (!js.includes("<p"))
                return { passed: false, message: "Add a <p> element inside App." };
              return { passed: true, message: "Nice work — your first React component is complete!" };
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
