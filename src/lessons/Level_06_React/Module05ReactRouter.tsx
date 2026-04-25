import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  {
    question: "Which React Router hook reads URL parameters like /user/:id?",
    options: ["useNavigate", "useLocation", "useParams", "useRoute"],
    correct: 2,
    explanation:
      "useParams() returns an object of key/value pairs for the dynamic segments in the URL — e.g. { id: '42' } for /user/42.",
  },
  {
    question: "Which component should you use instead of <a href> to navigate between routes?",
    options: ["<a>", "<NavItem>", "<Anchor>", "<Link>"],
    correct: 3,
    explanation:
      "<Link to='/path'> prevents a full page reload by handling navigation in JavaScript. A plain <a> would reload the whole app.",
  },
  {
    question: "What hook lets you navigate programmatically — e.g. after a form submits?",
    options: ["useNavigate", "useHistory", "useRedirect", "usePush"],
    correct: 0,
    explanation:
      "useNavigate() returns a function. Call navigate('/dashboard') to go to a route from any event handler.",
  },
  {
    question: "What does the <Outlet /> component render inside a nested route layout?",
    options: [
      "A loading spinner",
      "The matched child route's element",
      "The parent route's element",
      "An error boundary",
    ],
    correct: 1,
    explanation:
      "<Outlet /> is a placeholder inside a layout component. React Router replaces it with whichever child route currently matches the URL.",
  },
];

export default function Module05ReactRouter() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  const [selected, setSelected] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [revealed, setRevealed] = useState<boolean[]>(
    Array(QUESTIONS.length).fill(false)
  );

  const allCorrect = QUESTIONS.every(
    (q, i) => selected[i] === q.correct
  );

  function pick(qi: number, oi: number) {
    if (revealed[qi]) return;
    const next = [...selected];
    next[qi] = oi;
    setSelected(next);
    const rev = [...revealed];
    rev[qi] = true;
    setRevealed(rev);
    if (next.every((s, i) => s === QUESTIONS[i].correct)) {
      notifyChallengePassed(moduleId ?? "");
    }
  }

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
          Module 05 — React Fundamentals
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          React Router
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A single-page app (SPA) only ever loads one HTML file. React Router takes
          over the browser's URL bar and swaps components in and out without a page
          reload — giving you fast, smooth navigation that feels like a native app.
        </p>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Setting up routes</h2>
        <p className="text-muted-foreground leading-relaxed">
          Wrap your app in <code className="font-mono bg-stone-100 px-1 rounded">BrowserRouter</code>,
          then declare each URL → component mapping with{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">Route</code> elements inside a{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">Routes</code> block.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// main.jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// App.jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/"        element={<Home />} />
      <Route path="/about"   element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*"        element={<NotFound />} />
    </Routes>
  );
}`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Navigating between pages</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// Link — declarative navigation (replaces <a href>)
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>

// NavLink — like Link but adds an "active" class when the route matches
import { NavLink } from 'react-router-dom';

<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'nav-active' : ''}
>
  About
</NavLink>

// useNavigate — programmatic navigation inside event handlers
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
    navigate('/dashboard');   // redirect after success
  };
}`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Dynamic routes &amp; useParams</h2>
        <p className="text-muted-foreground leading-relaxed">
          A colon in a route path (<code className="font-mono bg-stone-100 px-1 rounded">:id</code>) creates a dynamic
          segment. The component can read it with{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">useParams()</code>.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// Route definition
<Route path="/users/:userId" element={<UserProfile />} />

// Inside UserProfile
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  // fetch /api/users/userId ...
  return <h1>User {userId}</h1>;
}`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Nested routes with Outlet</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// Layout.jsx — shared shell for nested routes
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main>
        <Outlet />  {/* child route renders here */}
      </main>
    </div>
  );
}

// App.jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
  </Route>
</Routes>`}
        </pre>
      </section>

      {/* Knowledge Check */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Knowledge check</h2>
          <p className="text-sm text-muted-foreground">
            React Router runs in a full build environment so it can't run in the inline
            playground. Answer all four questions correctly to unlock the next lesson.
          </p>
        </div>

        {QUESTIONS.map((q, qi) => {
          const answered = revealed[qi];
          const isCorrect = selected[qi] === q.correct;
          return (
            <div key={qi} className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                {qi + 1}. {q.question}
              </p>
              <div className="grid gap-2">
                {q.options.map((opt, oi) => {
                  const chosen = selected[qi] === oi;
                  const correct = oi === q.correct;
                  return (
                    <button
                      key={oi}
                      onClick={() => pick(qi, oi)}
                      disabled={answered}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors",
                        !answered && "hover:border-blue-400 hover:bg-blue-50 border-border bg-stone-50 cursor-pointer",
                        answered && correct && "border-green-400 bg-green-50 text-green-800",
                        answered && chosen && !correct && "border-red-400 bg-red-50 text-red-800",
                        answered && !chosen && !correct && "border-border bg-stone-50 text-muted-foreground",
                        !answered && "border-border bg-stone-50"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <p
                  className={cn(
                    "text-xs px-4 py-2 rounded-lg",
                    isCorrect
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  )}
                >
                  {isCorrect ? "Correct! " : "Not quite. "}
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}

        {allCorrect && (
          <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
            <p className="text-sm text-green-800 font-semibold">
              All correct — knowledge check complete!
            </p>
          </div>
        )}
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
