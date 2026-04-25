import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module02ComponentsProps() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
          Module 02 — React Fundamentals
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Components &amp; Props
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A React app is a tree of components — small, focused functions that each
          own a piece of the UI. Props are how a parent passes data down to a child,
          making components reusable. Instead of writing a card five times, you write
          it once and pass different data each time.
        </p>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Defining a component</h2>
        <p className="text-muted-foreground leading-relaxed">
          Any JavaScript function that returns JSX is a component. Name it with a
          capital letter so React knows it's a component and not a plain HTML tag.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`function Welcome() {
  return <h2>Welcome to KOOMPI Academy!</h2>;
}

function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
      <Welcome />
    </div>
  );
}`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Passing props</h2>
        <p className="text-muted-foreground leading-relaxed">
          Props look like HTML attributes. The child receives them as a single
          object — you can use the whole object or destructure the values you need.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// Parent passes data
<Greeting name="Sokha" />

// Child receives it via props
function Greeting(props) {
  return <p>Hello, {props.name}!</p>;
}

// Or destructure — cleaner and preferred
function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Props rules</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Props flow one way: parent → child. A child never modifies props directly.",
            "Any JS value is a valid prop: string, number, boolean, array, object, function.",
            "Wrap string props in quotes; wrap JS expressions in curly braces.",
            "The special children prop holds whatever is placed between component tags.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-blue-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-foreground pt-4">Composing components</h2>
        <p className="text-muted-foreground leading-relaxed">
          Real apps build big UIs from small pieces. A <code className="font-mono bg-stone-100 px-1 rounded">UserCard</code> can
          be made up of <code className="font-mono bg-stone-100 px-1 rounded">Avatar</code> and{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">UserInfo</code>, each knowing only about their own job.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`function Avatar({ name }) {
  return (
    <div style={{
      width: 48, height: 48, borderRadius: "50%",
      background: "#2563eb", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: "bold"
    }}>
      {name[0]}
    </div>
  );
}

function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}

function App() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Rithy" />
      <Greeting name="Rithy" />
    </div>
  );
}`}
        </pre>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Live example — try editing it</h2>
        <p className="text-sm text-muted-foreground">
          A <code className="font-mono bg-stone-100 px-1 rounded">Greeting</code> component renders three times with different names.
          Try adding a fourth call with your own name.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `function Greeting({ name }) {
  return (
    <p style={{ fontFamily: "system-ui", fontSize: 18, color: "#1e293b" }}>
      Hello, <strong>{name}</strong>!
    </p>
  );
}

function App() {
  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontFamily: "system-ui", marginBottom: 12 }}>Greetings</h2>
      <Greeting name="Sokha" />
      <Greeting name="Dara" />
      <Greeting name="Bopha" />
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
          Build a <code className="font-mono bg-stone-100 px-1 rounded">Badge</code> component that accepts a{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">label</code> prop and renders it in a coloured pill.
          Use it three times in App with different labels.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `function Badge({ label }) {
  return (
    <span style={{
      display: "inline-block",
      background: "#2563eb",
      color: "#fff",
      borderRadius: 20,
      padding: "4px 12px",
      fontSize: 13,
      marginRight: 8
    }}>
      {label}
    </span>
  );
}

function App() {
  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      <h2>Skills</h2>
      <Badge label="HTML" />
      <Badge label="CSS" />
      <Badge label="React" />
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
          Define a <code className="font-mono bg-stone-100 px-1 rounded">Greeting</code> component that accepts a{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">name</code> prop and renders{" "}
          <em>"Hello, [name]!"</em>. Then define <code className="font-mono bg-stone-100 px-1 rounded">App</code> and render{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">&lt;Greeting name="Rithy" /&gt;</code> (or any name) inside it.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `// 1. Define a Greeting component that uses a name prop
// 2. Render it inside App with name="Rithy"

function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}

function App() {
  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      {/* Use <Greeting name="Rithy" /> here */}
    </div>
  );
}`,
          }}
          challenge={{
            prompt:
              "Define a Greeting component with a name prop and render <Greeting name=\"Rithy\" /> inside App.",
            check(_html, _css, js) {
              if (!js.includes("function Greeting") && !js.includes("const Greeting"))
                return { passed: false, message: "Define a component named Greeting." };
              if (!js.includes("props") && !js.includes("name"))
                return { passed: false, message: "Use the name prop inside Greeting." };
              if (!js.includes("<Greeting"))
                return { passed: false, message: "Render <Greeting ... /> inside App." };
              return { passed: true, message: "Props in action — Greeting renders with any name you pass!" };
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
