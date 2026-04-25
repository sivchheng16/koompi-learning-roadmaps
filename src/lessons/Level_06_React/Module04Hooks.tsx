import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module04Hooks() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
          Module 04 — React Fundamentals
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Hooks — useEffect &amp; useRef
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          <code className="font-mono bg-stone-100 px-1 rounded">useState</code> lets you remember values.{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">useEffect</code> lets you do things that
          happen outside of rendering — fetch data from an API, start a timer, or subscribe to an
          event. Together they cover almost every real-world React pattern you'll encounter.
        </p>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">What is a side effect?</h2>
        <p className="text-muted-foreground leading-relaxed">
          A <em>side effect</em> is anything a component does besides returning JSX. Examples:
          fetching data, updating the document title, setting up a timer, reading localStorage.
          These cannot go inside the render return — they belong in{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">useEffect</code>.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">useEffect — three patterns</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// 1. Run after every render
React.useEffect(() => {
  console.log("I run after every render");
});

// 2. Run once on mount (empty dependency array)
React.useEffect(() => {
  console.log("I run once when the component appears");
}, []);

// 3. Run when a value changes
React.useEffect(() => {
  console.log("userId changed:", userId);
}, [userId]);`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Cleanup</h2>
        <p className="text-muted-foreground leading-relaxed">
          If your effect sets up something continuous (a timer, a subscription, an event listener),
          return a cleanup function. React calls it before the component unmounts or before the
          effect runs again.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`React.useEffect(() => {
  const id = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);

  return () => clearInterval(id); // cleanup
}, []);`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">useRef — a mutable box</h2>
        <p className="text-muted-foreground leading-relaxed">
          <code className="font-mono bg-stone-100 px-1 rounded">useRef</code> gives you a
          persistent box (<code className="font-mono bg-stone-100 px-1 rounded">.current</code>) that
          doesn't trigger a re-render when you change it. The most common use: getting a direct
          reference to a DOM element.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const inputRef = React.useRef(null);

<input ref={inputRef} type="text" />
<button onClick={() => inputRef.current.focus()}>
  Focus the input
</button>`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Rules of Hooks</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Call hooks at the top level of a function component — never inside if, loops, or nested functions.",
            "Only call hooks inside React components or custom hooks (functions starting with 'use').",
            "The order of hook calls must be the same on every render — React relies on call order to track state.",
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
        <h2 className="text-xl font-semibold text-foreground">Live example — fetch on mount</h2>
        <p className="text-sm text-muted-foreground">
          This component fetches a random joke from a public API as soon as it mounts.
          The empty dependency array <code className="font-mono bg-stone-100 px-1 rounded">[]</code> means the effect runs once.
          Try changing the URL to another free API endpoint.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `function JokeFetcher() {
  const [joke, setJoke] = React.useState("Loading...");

  React.useEffect(() => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then(res => res.json())
      .then(data => setJoke(data.setup + " — " + data.punchline))
      .catch(() => setJoke("Could not load joke."));
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      <h2 style={{ marginBottom: 12 }}>Random Joke</h2>
      <p style={{ fontSize: 16, color: "#334155" }}>{joke}</p>
    </div>
  );
}

function App() {
  return <JokeFetcher />;
}`,
          }}
        />
      </section>

      {/* Try it */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Try it yourself</h2>
        <p className="text-sm text-muted-foreground">
          The starter below has a timer that counts seconds. Add a <strong>Stop</strong> button
          that clears the interval. Hint: store the interval id in a{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">useRef</code> so the button can access it.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `function Timer() {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      <h2 style={{ fontSize: 56, margin: 0 }}>{seconds}s</h2>
      <p style={{ color: "#64748b", marginTop: 8 }}>Elapsed</p>
      {/* Add a Stop button */}
    </div>
  );
}

function App() {
  return <Timer />;
}`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="font-mono bg-stone-100 px-1 rounded">useEffect</code> to fetch from{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">https://jsonplaceholder.typicode.com/users/1</code> on
          mount and display the user's <strong>name</strong> on the page. You'll also need{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">useState</code> to store the result.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `// Fetch the user's name from the API on mount and show it.
// Endpoint: https://jsonplaceholder.typicode.com/users/1

function App() {
  const [name, setName] = React.useState("Loading...");

  React.useEffect(() => {
    // fetch here
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: "24px" }}>
      <h2>User: {name}</h2>
    </div>
  );
}`,
          }}
          challenge={{
            prompt:
              "Fetch https://jsonplaceholder.typicode.com/users/1 on mount and display the user's name.",
            check(_html, _css, js) {
              if (!js.includes("useEffect") && !js.includes("React.useEffect"))
                return { passed: false, message: "Use React.useEffect to run the fetch on mount." };
              if (!js.includes("fetch("))
                return { passed: false, message: "Call fetch() inside useEffect." };
              if (!js.includes("useState") && !js.includes("React.useState"))
                return { passed: false, message: "Use React.useState to store the fetched name." };
              return { passed: true, message: "useEffect + fetch — the most common async pattern in React!" };
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
