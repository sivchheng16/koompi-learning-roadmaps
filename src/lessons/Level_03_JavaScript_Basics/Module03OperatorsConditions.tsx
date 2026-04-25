import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module03OperatorsConditions() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase">
          Module 03 — JavaScript Basics
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Operators &amp; Conditions
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Real apps make decisions. "Is the user logged in? Show the dashboard,
          otherwise show the login page." Conditions are how JavaScript chooses one
          path over another. Operators are the tools you use to describe those
          decisions.
        </p>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Arithmetic operators</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`let price = 10000; // KHR
let qty   = 3;

document.write(price * qty);       // 30000  — multiply
document.write(price + 500);       // 10500  — add
document.write(price - 1000);      // 9000   — subtract
document.write(price / 4000);      // 2.5    — divide (USD)
document.write(10 % 3);            // 1      — remainder (modulo)`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Comparison operators</h2>
        <p className="text-muted-foreground leading-relaxed">
          These always return <code className="font-mono bg-stone-100 px-1 rounded">true</code> or{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">false</code>.
          Always prefer <code className="font-mono bg-stone-100 px-1 rounded">===</code> (strict) over{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">==</code> (loose).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-foreground font-mono">Operator</th>
                <th className="text-left py-2 pr-4 font-semibold text-foreground">Meaning</th>
                <th className="text-left py-2 font-semibold text-foreground">Example</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["===", "Strictly equal", "5 === 5  → true"],
                ["!==", "Not equal", "5 !== 3  → true"],
                [">", "Greater than", "10 > 5  → true"],
                ["<", "Less than", "3 < 8  → true"],
                [">=", "Greater or equal", "5 >= 5  → true"],
                ["<=", "Less or equal", "4 <= 10  → true"],
              ].map(([op, meaning, example]) => (
                <tr key={op} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-mono">{op}</td>
                  <td className="py-2 pr-4">{meaning}</td>
                  <td className="py-2 font-mono text-xs">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">Logical operators</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const age = 20;
const hasTicket = true;

// && (AND) — both must be true
if (age >= 18 && hasTicket) {
  document.write("Welcome to the event!");
}

// || (OR) — at least one must be true
const isAdmin = false;
const isMentor = true;
if (isAdmin || isMentor) {
  document.write("Access granted.");
}

// ! (NOT) — flips the boolean
const isLoggedIn = false;
if (!isLoggedIn) {
  document.write("Please sign in.");
}`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">if / else</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const score = 75;

if (score >= 80) {
  document.write("Excellent!");
} else if (score >= 60) {
  document.write("Pass — keep going!");
} else {
  document.write("Study harder — you can do this.");
}`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Ternary — one-line if/else</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const hour = 14;
const greeting = hour < 12 ? "Good morning" : "Good afternoon";
document.write(greeting); // Good afternoon`}
        </pre>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Live example — tuk-tuk fare calculator</h2>
        <p className="text-sm text-muted-foreground">
          Change the distance and see the fare logic branch differently.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `const distanceKm = 8;
const baseRate = 2000; // KHR per km

const fare = distanceKm * baseRate;

let message;
if (distanceKm > 10) {
  message = \`Long trip! Fare: \${fare} ៛ (discount possible)\`;
} else if (distanceKm > 5) {
  message = \`Medium trip. Fare: \${fare} ៛\`;
} else {
  message = \`Short hop. Fare: \${fare} ៛\`;
}

document.write(message);`,
          }}
        />
      </section>

      {/* Try it */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Try it yourself</h2>
        <p className="text-sm text-muted-foreground">
          Write an if/else that checks whether a temperature is hot (&gt; 35°C),
          comfortable (20–35°C), or cool (&lt; 20°C) and writes a message.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `const temp = 32; // change this value

// Add your if/else here
`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          Declare a number variable. Write an{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">if</code> /{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">else</code> that checks whether the number is
          greater than 10 and writes different messages for each case.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `const number = 15;

// Write your if/else here
// If number > 10 → write one message
// Otherwise → write a different message
`,
          }}
          challenge={{
            prompt:
              "Write an if/else that checks if a number is greater than 10 and writes different messages for each branch.",
            check(_html, _css, js) {
              if (!js.includes("if"))
                return { passed: false, message: "You need an if statement." };
              if (!js.includes("else"))
                return { passed: false, message: "Add an else branch for when the condition is false." };
              return {
                passed: true,
                message: "Challenge complete! Your code makes its first real decision.",
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
