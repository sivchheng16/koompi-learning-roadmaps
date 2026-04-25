import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_TRY = `// try / catch / finally
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

try {
  console.log(divide(10, 2));  // 5
  console.log(divide(10, 0));  // throws
} catch (err) {
  console.error("Caught:", err.message);
} finally {
  console.log("This always runs");
}`;

const EXPLORE_CUSTOM = `// Custom error class
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateAge(age) {
  if (typeof age !== "number") throw new TypeError("Age must be a number");
  if (age < 0) throw new ValidationError("Age cannot be negative", "age");
  if (age > 150) throw new ValidationError("Age is unreasonably large", "age");
  return age;
}

try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(\`Field "\${err.field}": \${err.message}\`);
  } else {
    throw err; // re-throw unknown errors
  }
}`;

const EXPLORE_ASYNC_ERROR = `// Async error handling
async function loadUser(id) {
  try {
    const res = await fetch(
      \`https://jsonplaceholder.typicode.com/users/\${id}\`
    );
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("loadUser failed:", err.message);
    return null; // fallback value
  }
}

loadUser(1).then(u => console.log(u?.name ?? "Not found"));
loadUser(9999).then(u => console.log(u?.name ?? "Not found"));`;

const CHALLENGE_STARTER = `// Write a function "checkPositive(n)" that:
//   • Throws a new Error("Must be positive") if n is negative.
//   • Returns n if it is non-negative.
// Then call it twice inside a try/catch:
//   • Once with a positive number (should succeed).
//   • Once with a negative number (should be caught).

function checkPositive(n) {
  // your code
}

try {
  // your calls here
} catch (err) {
  console.error("Caught:", err.message);
}
`;

const challenge = {
  prompt:
    "Write a function that `throw`s an Error for negative numbers, then call it inside `try` / `catch`.",
  check(_html: string, _css: string, js: string) {
    if (!/\bthrow\b/.test(js))
      return { passed: false, message: "Use `throw new Error(...)` to raise the error." };
    if (!/\btry\b/.test(js))
      return { passed: false, message: "Wrap the call in a `try` block." };
    if (!/\bcatch\b/.test(js))
      return { passed: false, message: "Add a `catch` block to handle the error." };
    return { passed: true, message: "Solid error handling — your code now fails safely!" };
  },
};

export default function Module04ErrorHandling() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/60">
          Track 04 · JavaScript Advanced
        </p>
        <h1 className="text-4xl font-serif text-foreground">Error Handling</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Things go wrong. Networks fail, users type invalid input, third-party APIs return
          unexpected shapes. Robust code anticipates these situations and fails gracefully
          rather than crashing silently. This lesson covers try/catch/finally, the Error object,
          custom error classes, and async error patterns.
        </p>
      </section>

      {/* Types of errors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Types of Errors</h2>

        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Type</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">When it happens</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Can catch?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {[
                ["SyntaxError", "Invalid code — won't even parse", "No — fix the code"],
                ["ReferenceError", "Variable doesn't exist", "Yes"],
                ["TypeError", "Wrong type: null.foo, 5()", "Yes"],
                ["RangeError", "Number out of valid range", "Yes"],
                ["Network Error", "fetch() can't reach server", "Yes"],
                ["Logic Error", "Code runs but gives wrong answer", "No — fix the logic"],
              ].map(([t, w, c]) => (
                <tr key={t}>
                  <td className="px-4 py-2 font-mono text-foreground">{t}</td>
                  <td className="px-4 py-2">{w}</td>
                  <td className="px-4 py-2">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* try/catch/finally */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">try / catch / finally</h2>
        <p className="text-base text-muted-foreground">
          Wrap risky code in a <code className="font-mono text-sm">try</code> block. If anything
          inside it throws, control jumps immediately to <code className="font-mono text-sm">catch</code>.
          The <code className="font-mono text-sm">finally</code> block runs regardless — perfect
          for cleanup like hiding a loading spinner.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Structure
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`try {
  // code that might throw
  const data = JSON.parse(rawInput);
  process(data);
} catch (err) {
  // err.name    — e.g. "SyntaxError"
  // err.message — human-readable description
  // err.stack   — call stack at the point of throw
  console.error(err.name + ":", err.message);
} finally {
  hideSpinner(); // always runs
}`}</pre>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_TRY }} height="260px" />
      </section>

      {/* Throwing errors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Throwing Errors</h2>
        <p className="text-base text-muted-foreground">
          Use <code className="font-mono text-sm">throw</code> to signal a problem intentionally.
          Always throw an <code className="font-mono text-sm">Error</code> object (or a subclass) — never a
          plain string — so callers get a stack trace.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Throw and re-throw
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`// Throw from a validation function
function requireEmail(email) {
  if (!email.includes("@")) {
    throw new TypeError("Invalid email address");
  }
}

// Re-throw errors you can't handle
try {
  processData();
} catch (err) {
  if (err.name === "NetworkError") {
    showOfflineBanner();
  } else {
    throw err; // let the caller deal with unexpected errors
  }
}`}</pre>
        </div>
      </section>

      {/* Custom errors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Custom Error Classes</h2>
        <p className="text-base text-muted-foreground">
          Extend the built-in <code className="font-mono text-sm">Error</code> class to create
          domain-specific errors that carry extra fields. Callers can then use{" "}
          <code className="font-mono text-sm">instanceof</code> to handle each type differently.
        </p>

        <CodePlayground mode="js" starter={{ js: EXPLORE_CUSTOM }} height="320px" />
      </section>

      {/* Async error handling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Async Error Handling</h2>
        <p className="text-base text-muted-foreground">
          Async functions throw errors the same way sync functions do — just use{" "}
          <code className="font-mono text-sm">try/catch</code> around your <code className="font-mono text-sm">await</code> calls.
          Remember: <code className="font-mono text-sm">fetch()</code> only rejects on network failure,
          not on HTTP 4xx/5xx — check <code className="font-mono text-sm">response.ok</code> yourself.
        </p>

        <CodePlayground mode="js" starter={{ js: EXPLORE_ASYNC_ERROR }} height="280px" />

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Defensive programming pattern
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`// Safe wrapper — always returns something useful
async function safeGet(url, fallback = null) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("safeGet:", err.message);
    return fallback;
  }
}

const users = await safeGet("/api/users", []); // empty array if it fails`}</pre>
        </div>
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
        <p className="text-base text-muted-foreground">
          Write a function <code className="font-mono text-sm">checkPositive(n)</code> that throws a
          new <code className="font-mono text-sm">Error</code> if <code className="font-mono text-sm">n</code> is
          negative. Call it twice inside a <code className="font-mono text-sm">try/catch</code> — once
          with a positive number and once with a negative one — and log the caught error message.
        </p>
        <CodePlayground
          mode="js"
          starter={{ js: CHALLENGE_STARTER }}
          height="260px"
          challenge={challenge}
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
