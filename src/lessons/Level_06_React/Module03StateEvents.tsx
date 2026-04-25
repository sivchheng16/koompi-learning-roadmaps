import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module03StateEvents() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
          Module 03 — React Fundamentals
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          State &amp; Events
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Props make components configurable. <strong>State</strong> makes them interactive.
          When state changes, React automatically re-renders the component with the new data —
          you never touch the DOM directly. Combine state with event handlers and you have
          everything you need to build buttons, counters, forms, and toggles.
        </p>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">useState — the basics</h2>
        <p className="text-muted-foreground leading-relaxed">
          <code className="font-mono bg-stone-100 px-1 rounded">useState</code> is a Hook that
          adds state to a function component. It returns a pair: the current value and a setter
          function. Call the setter, React re-renders, the new value appears.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const [count, setCount] = React.useState(0);
//     ↑              ↑              ↑
//  current value   setter      initial value`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Handling events</h2>
        <p className="text-muted-foreground leading-relaxed">
          React events use camelCase attributes and receive a function reference — not a string.
          The function is called whenever the user interacts with the element.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-6 font-semibold text-foreground">Event</th>
                <th className="text-left py-2 font-semibold text-foreground">When it fires</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["onClick", "user clicks an element"],
                ["onChange", "input value changes"],
                ["onSubmit", "form is submitted"],
                ["onKeyDown", "a key is pressed"],
                ["onFocus / onBlur", "element gains / loses focus"],
              ].map(([ev, desc]) => (
                <tr key={ev} className="border-b border-border/50">
                  <td className="py-2 pr-6 font-mono">{ev}</td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">Updating state correctly</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Never mutate state directly — always call the setter.",
            "When the new value depends on the old one, use the functional form: setCount(prev => prev + 1).",
            "For objects, spread the existing state and overwrite only the changed key.",
            "For arrays, use spread, filter, or map — never push or splice on the state array.",
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
        <h2 className="text-xl font-semibold text-foreground">Live example — a toggle</h2>
        <p className="text-sm text-muted-foreground">
          Click the button and watch the text change. The component re-renders each time
          state updates. Try adding a third state value or changing the messages.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `function Toggle() {
  const [isOn, setIsOn] = React.useState(false);

  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      <p style={{ fontSize: 20 }}>
        Light is: <strong>{isOn ? "ON 💡" : "OFF 🌑"}</strong>
      </p>
      <button
        onClick={() => setIsOn(!isOn)}
        style={{
          marginTop: 12, padding: "10px 24px",
          background: isOn ? "#2563eb" : "#e2e8f0",
          color: isOn ? "#fff" : "#1e293b",
          border: "none", borderRadius: 8,
          cursor: "pointer", fontSize: 15
        }}
      >
        Turn {isOn ? "OFF" : "ON"}
      </button>
    </div>
  );
}

function App() {
  return <Toggle />;
}`,
          }}
        />
      </section>

      {/* Try it */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Try it yourself</h2>
        <p className="text-sm text-muted-foreground">
          Extend the counter below to also have a <strong>Reset</strong> button that sets the
          count back to 0. Hint: <code className="font-mono bg-stone-100 px-1 rounded">setCount(0)</code>.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      <h2 style={{ fontSize: 48, margin: "0 0 16px" }}>{count}</h2>
      <button
        onClick={() => setCount(count - 1)}
        style={{ padding: "10px 20px", marginRight: 8, fontSize: 20,
          background: "#e2e8f0", border: "none", borderRadius: 8, cursor: "pointer" }}
      >
        −
      </button>
      <button
        onClick={() => setCount(count + 1)}
        style={{ padding: "10px 20px", fontSize: 20,
          background: "#2563eb", color: "#fff",
          border: "none", borderRadius: 8, cursor: "pointer" }}
      >
        +
      </button>
      {/* Add a Reset button here */}
    </div>
  );
}

function App() {
  return <Counter />;
}`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          Build a counter with a <strong>+</strong> button and a <strong>−</strong> button using{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">useState</code>. Both buttons must
          call an <code className="font-mono bg-stone-100 px-1 rounded">onClick</code> handler that
          updates the count.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `// Build a counter with + and - buttons.
// Use React.useState to track the count.

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      <h2>{count}</h2>
      {/* Add your + and - buttons */}
    </div>
  );
}`,
          }}
          challenge={{
            prompt:
              "Use useState, add onClick handlers on + and - buttons that update the count.",
            check(_html, _css, js) {
              if (!js.includes("useState") && !js.includes("React.useState"))
                return { passed: false, message: "Use React.useState (or import useState)." };
              if (!js.includes("onClick"))
                return { passed: false, message: "Add onClick handlers to your buttons." };
              if (!js.toLowerCase().includes("setcount") &&
                  !js.match(/set[A-Z]\w+\(/))
                return { passed: false, message: "Call your state setter inside the onClick handlers." };
              return { passed: true, message: "State and events working together — that's interactive React!" };
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
