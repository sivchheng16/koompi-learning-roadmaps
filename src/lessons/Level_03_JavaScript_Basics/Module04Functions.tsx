import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module04Functions() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase">
          Module 04 — JavaScript Basics
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Functions
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Imagine you need to calculate a tuk-tuk fare ten different places in your
          app. You don't paste the same math ten times — you write it once inside a
          function and call it whenever you need it. Functions are reusable blocks
          of code with a name.
        </p>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Function declaration</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`function greet(name) {
  return "Hello, " + name + "!";
}

const message = greet("Sokha");
document.write(message); // Hello, Sokha!`}
        </pre>
        <p className="text-muted-foreground text-sm">
          The function is <em>declared</em> once and <em>called</em> as many times as you need.
          The <code className="font-mono bg-stone-100 px-1 rounded">return</code> keyword sends
          a value back to whoever called the function.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Arrow functions</h2>
        <p className="text-muted-foreground leading-relaxed">
          Modern JavaScript uses arrow functions — shorter syntax, same idea:
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// Classic function
function add(a, b) {
  return a + b;
}

// Arrow function — same thing, less typing
const add = (a, b) => {
  return a + b;
};

// One-liner arrow — implicit return
const addShort = (a, b) => a + b;

document.write(addShort(3, 4)); // 7`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Parameters vs arguments</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-border bg-stone-50 px-4 py-3">
            <p className="font-semibold text-foreground mb-1">Parameter</p>
            <p className="text-muted-foreground">The variable name inside the function definition.</p>
            <pre className="font-mono text-xs mt-2 text-amber-800">{"function greet(name) { ... }"}</pre>
            <p className="text-xs text-muted-foreground mt-1"><code className="font-mono">name</code> is the parameter</p>
          </div>
          <div className="rounded-xl border border-border bg-stone-50 px-4 py-3">
            <p className="font-semibold text-foreground mb-1">Argument</p>
            <p className="text-muted-foreground">The actual value you pass when calling the function.</p>
            <pre className="font-mono text-xs mt-2 text-amber-800">{'greet("Dara")'}</pre>
            <p className="text-xs text-muted-foreground mt-1"><code className="font-mono">"Dara"</code> is the argument</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">Default parameters</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const greet = (name = "friend") => \`Hello, \${name}!\`;

document.write(greet("Bopha")); // Hello, Bopha!
document.write("<br>");
document.write(greet());        // Hello, friend!`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Scope — where variables live</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const city = "Phnom Penh"; // global — visible everywhere

function showCity() {
  const district = "Chamkarmon"; // local — only inside here
  document.write(city + ", " + district);
}

showCity();
// document.write(district); // Error — district is local to the function`}
        </pre>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Live example — fare calculator function</h2>
        <p className="text-sm text-muted-foreground">
          The function takes a distance, applies the rate, and returns the fare.
          Call it multiple times with different arguments.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `const calcFare = (distanceKm, ratePerKm = 2000) => {
  return distanceKm * ratePerKm;
};

document.write("3 km: " + calcFare(3) + " ៛<br>");
document.write("7 km: " + calcFare(7) + " ៛<br>");
document.write("15 km (premium 3500/km): " + calcFare(15, 3500) + " ៛");`,
          }}
        />
      </section>

      {/* Try it */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Try it yourself</h2>
        <p className="text-sm text-muted-foreground">
          Write an arrow function called <code className="font-mono bg-stone-100 px-1 rounded">square</code> that takes
          a number and returns its square. Then call it a few times and write the
          results to the page.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `// Write your arrow function here
const square = (n) => {
  // return n squared
};

document.write(square(4) + "<br>"); // should be 16
document.write(square(7));          // should be 49`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          Write an arrow function called <code className="font-mono bg-stone-100 px-1 rounded">greet</code> that accepts
          a <code className="font-mono bg-stone-100 px-1 rounded">name</code> parameter and{" "}
          <strong>returns</strong> a greeting string. Then call it and write the
          result to the page.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `// Write an arrow function called greet
// It should take a name parameter
// and return a greeting string

// Then call it:
// document.write(greet("Sokha"));
`,
          }}
          challenge={{
            prompt:
              "Write an arrow function called greet that takes a name parameter and returns a greeting string.",
            check(_html, _css, js) {
              const hasGreetDeclared =
                js.includes("const greet") ||
                js.includes("let greet") ||
                js.includes("function greet");
              if (!hasGreetDeclared)
                return {
                  passed: false,
                  message: "Name your function greet — use const greet = ... or function greet(...).",
                };
              const hasArrow = js.includes("=>");
              const hasFunction = js.includes("function");
              if (!hasArrow && !hasFunction)
                return {
                  passed: false,
                  message: "Use an arrow function (=>) or a function declaration.",
                };
              if (!js.includes("return"))
                return {
                  passed: false,
                  message: "Your function should return a greeting string.",
                };
              return {
                passed: true,
                message: "Challenge complete! You wrote and called a function.",
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
