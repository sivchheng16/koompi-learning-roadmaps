import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module07StateManagement() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
          Module 07 — React Fundamentals
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          State Management
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          As apps grow, passing state through 5 components just to reach the one that needs it
          becomes painful. You end up with props that middle components don't use, just ferry
          downward. There are better patterns — and choosing the right one for each situation is
          one of the most important skills in React.
        </p>
      </section>

      {/* Prop drilling */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">The problem with prop drilling</h2>
        <p className="text-muted-foreground leading-relaxed">
          Prop drilling happens when a parent passes data down through intermediate components
          that don't need it — they just pass it along. Below,{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">Middle</code> has no use for{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">user</code>, but it must accept
          and re-pass it to reach <code className="font-mono bg-stone-100 px-1 rounded">Profile</code>.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`function App() {
  const user = { name: "Dara" };
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Middle user={user} />; // Layout doesn't use user
}

function Middle({ user }) {
  return <Profile user={user} />; // Middle doesn't use user either
}

function Profile({ user }) {
  return <p>Hello, {user.name}</p>; // finally used here
}`}
        </pre>
        <p className="text-muted-foreground leading-relaxed">
          With 5 levels this becomes unmaintainable. Adding a new field to{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">user</code> means touching every
          file in the chain.
        </p>
      </section>

      {/* useContext */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">useContext — skip the middle</h2>
        <p className="text-muted-foreground leading-relaxed">
          <code className="font-mono bg-stone-100 px-1 rounded">createContext</code> creates a
          channel. A <code className="font-mono bg-stone-100 px-1 rounded">Provider</code> puts
          a value into that channel. Any descendant can read it with{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">useContext</code> — no props
          needed in between.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Layout />
    </ThemeContext.Provider>
  );
}

function Layout() {
  return <Profile />; // no prop needed
}

function Profile() {
  const theme = React.useContext(ThemeContext); // 'dark'
  return <p>Theme: {theme}</p>;
}`}
        </pre>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "createContext(defaultValue) — the default is used when there's no Provider above.",
            "Provider's value prop can be anything: a string, an object, a function.",
            "When the Provider's value changes, every consumer re-renders automatically.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-blue-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* useReducer */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">useReducer — complex local state</h2>
        <p className="text-muted-foreground leading-relaxed">
          When state has multiple related fields or multiple ways to change,{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">useReducer</code> is cleaner
          than several <code className="font-mono bg-stone-100 px-1 rounded">useState</code> calls.
          You describe <em>what happened</em> (an action) and a pure reducer function decides
          the new state.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset':     return { count: 0 };
    default:          return state;
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  );
}`}
        </pre>
        <p className="text-muted-foreground leading-relaxed">
          The reducer is a plain function — easy to test in isolation, no React needed.
          Actions are plain objects, so you can log them, replay them, and reason about
          every state transition.
        </p>
      </section>

      {/* Context + useReducer */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Context + useReducer — global state without a library</h2>
        <p className="text-muted-foreground leading-relaxed">
          Combine the two patterns and you get a lightweight global store. Put{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">state</code> and{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">dispatch</code> into context so
          any component can read state or trigger updates.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const StoreContext = React.createContext(null);

function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Any component can now do:
function AnyChild() {
  const { state, dispatch } = React.useContext(StoreContext);
  return (
    <button onClick={() => dispatch({ type: 'increment' })}>
      Count: {state.count}
    </button>
  );
}`}
        </pre>
        <p className="text-muted-foreground leading-relaxed">
          This pattern works well for small-to-medium apps. For very large apps with
          frequent updates, consider a dedicated library — context re-renders all consumers
          on every change.
        </p>
      </section>

      {/* Zustand */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Zustand — when you outgrow Context</h2>
        <p className="text-muted-foreground leading-relaxed">
          <a
            href="https://zustand-demo.pmnd.rs/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline underline-offset-2"
          >
            Zustand
          </a>{" "}
          is a minimal state library that solves the re-render problem. Components only
          re-render when the specific slice of state they subscribe to changes.
          The API is tiny — you describe a store in one function call.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
}));

function Counter() {
  const count = useStore((s) => s.count);
  const increment = useStore((s) => s.increment);
  return <button onClick={increment}>{count}</button>;
}`}
        </pre>
        <p className="text-sm text-muted-foreground">
          Zustand can't run in the playground (it's an npm package), but the pattern
          is straightforward to add to a real Vite or Next.js project:{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">npm install zustand</code>.
        </p>
      </section>

      {/* When to use what */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">When to use what</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-6 font-semibold text-foreground">Situation</th>
                <th className="text-left py-2 font-semibold text-foreground">Reach for</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["Local, simple state (toggle, input)", "useState"],
                ["Local, complex state (form, multi-step flow)", "useReducer"],
                ["Shared state across many components", "Context + useReducer"],
                ["Large app, performance-sensitive global state", "Zustand / Jotai"],
                ["Server data (fetching, caching, refetching)", "React Query / SWR"],
              ].map(([situation, tool]) => (
                <tr key={situation} className="border-b border-border/50">
                  <td className="py-2 pr-6">{situation}</td>
                  <td className="py-2 font-mono text-xs">{tool}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Try it */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Try it — theme switcher with Context</h2>
        <p className="text-sm text-muted-foreground">
          A light/dark toggle wired through Context. The{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">ThemeContext</code> provides both
          the current theme and the toggle function so any nested component can trigger a switch
          without prop drilling.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `const ThemeContext = React.createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Header() {
  const { theme, toggle } = React.useContext(ThemeContext);
  return (
    <header style={{
      background: theme === 'dark' ? '#1e293b' : '#f1f5f9',
      color: theme === 'dark' ? '#f8fafc' : '#0f172a',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 8,
    }}>
      <span style={{ fontWeight: 600 }}>KOOMPI Academy</span>
      <button
        onClick={toggle}
        style={{
          padding: '6px 14px',
          borderRadius: 6,
          border: 'none',
          background: theme === 'dark' ? '#334155' : '#e2e8f0',
          color: theme === 'dark' ? '#f8fafc' : '#0f172a',
          cursor: 'pointer',
          fontSize: 13,
        }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
}

function Card() {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div style={{
      marginTop: 16,
      padding: '20px 24px',
      borderRadius: 8,
      background: theme === 'dark' ? '#0f172a' : '#ffffff',
      color: theme === 'dark' ? '#cbd5e1' : '#334155',
      border: '1px solid ' + (theme === 'dark' ? '#334155' : '#e2e8f0'),
    }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Hello from a nested component</h2>
      <p style={{ margin: 0, fontSize: 14 }}>
        This card reads the theme from Context — no props passed through Header.
      </p>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div style={{ fontFamily: 'system-ui', padding: 24 }}>
        <Header />
        <Card />
      </div>
    </ThemeProvider>
  );
}`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          Build a counter using{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">useReducer</code> with two
          actions: <code className="font-mono bg-stone-100 px-1 rounded">increment</code> and{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">decrement</code>. The reducer
          must live outside the component. Wire up two buttons that dispatch the actions.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `// Define your reducer here (outside the component)
// It should handle 'increment' and 'decrement' actions

function App() {
  // const [state, dispatch] = React.useReducer(reducer, { count: 0 });

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24, textAlign: 'center' }}>
      <h2 style={{ fontSize: 48, margin: '0 0 16px' }}>0</h2>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button style={{ padding: '8px 20px', fontSize: 18 }}>−</button>
        <button style={{ padding: '8px 20px', fontSize: 18 }}>+</button>
      </div>
    </div>
  );
}`,
          }}
          challenge={{
            prompt:
              "Build a counter with useReducer. Define a reducer outside the component that handles 'increment' and 'decrement' actions, then wire up buttons that dispatch those actions.",
            check(_html, _css, js) {
              if (!js.includes("useReducer") && !js.includes("React.useReducer"))
                return { passed: false, message: "Use React.useReducer to manage the counter state." };
              if (!js.includes("dispatch"))
                return { passed: false, message: "Call dispatch() from your button onClick handlers." };
              if (!js.includes("increment") || !js.includes("decrement"))
                return { passed: false, message: "Handle both 'increment' and 'decrement' action types in the reducer." };
              if (!/function\s+reducer/.test(js) && !/const\s+reducer/.test(js))
                return { passed: false, message: "Define the reducer as a separate function outside the component." };
              return { passed: true, message: "useReducer — predictable state transitions with pure functions!" };
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
