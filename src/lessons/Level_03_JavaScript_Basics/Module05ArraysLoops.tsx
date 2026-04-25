import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module05ArraysLoops() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase">
          Module 05 — JavaScript Basics
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Arrays &amp; Loops
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A market in Phnom Penh sells hundreds of items. You don't store each price
          in a separate variable — you put them in a list. That list is an array.
          And to do something with every item, you use a loop.
        </p>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Creating arrays</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// Array literal — the most common way
const foods = ["banh mi", "lok lak", "amok", "kuy teav"];

// Access by index (starts at 0)
document.write(foods[0]); // "banh mi"
document.write(foods[2]); // "amok"

// Length
document.write(foods.length); // 4

// Last item
document.write(foods[foods.length - 1]); // "kuy teav"`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Modifying arrays</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const items = ["rice", "fish"];

items.push("mango");      // add to end  → ["rice","fish","mango"]
items.pop();              // remove last → ["rice","fish"]
items.unshift("bread");   // add to front→ ["bread","rice","fish"]
items.shift();            // remove first→ ["rice","fish"]`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">The for loop</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const prices = [1000, 2500, 4000, 8000];

for (let i = 0; i < prices.length; i++) {
  document.write(prices[i] + " ៛<br>");
}
// 1000 ៛
// 2500 ៛
// 4000 ៛
// 8000 ៛`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">forEach — cleaner iteration</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const cities = ["Phnom Penh", "Siem Reap", "Battambang"];

cities.forEach((city) => {
  document.write(\`<p>\${city}</p>\`);
});`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">map — transform every item</h2>
        <p className="text-muted-foreground leading-relaxed">
          <code className="font-mono bg-stone-100 px-1 rounded">.map()</code> creates a <em>new</em> array by running
          a function on every item. The original is unchanged.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const pricesKHR = [4000, 8000, 12000];

// Convert to USD (rate: 4100 KHR per USD)
const pricesUSD = pricesKHR.map((khr) => (khr / 4100).toFixed(2));

document.write(pricesUSD.join(", ")); // "0.98, 1.95, 2.93"`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">filter — keep only what matches</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const scores = [45, 78, 62, 90, 55, 88];

const passing = scores.filter((s) => s >= 60);
document.write(passing.join(", ")); // 78, 62, 90, 88`}
        </pre>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Live example — market menu with map</h2>
        <p className="text-sm text-muted-foreground">
          Watch how <code className="font-mono bg-stone-100 px-1 rounded">.map()</code> turns a plain array into
          formatted HTML.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `const menu = [
  { name: "Nom banh chok", price: 2000 },
  { name: "Banh mi", price: 1500 },
  { name: "Lok lak", price: 8000 },
  { name: "Amok trey", price: 10000 },
];

const rows = menu.map(
  (item) => \`<p><strong>\${item.name}</strong> — \${item.price} ៛</p>\`
);

document.write(rows.join(""));`,
          }}
        />
      </section>

      {/* Try it */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Try it yourself</h2>
        <p className="text-sm text-muted-foreground">
          Create an array of at least 4 province names. Use{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">forEach</code> to write each one to the page as a
          list item.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `const provinces = ["Phnom Penh", "Siem Reap", "Battambang", "Kampot"];

document.write("<ul>");
provinces.forEach((province) => {
  document.write("<li>" + province + "</li>");
});
document.write("</ul>");`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          Create an array with at least 3 numbers. Use{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">.map()</code> to transform each number (multiply,
          add, or format it), and store the result in a new variable.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `// Create an array with at least 3 numbers
const numbers = [10, 25, 40];

// Use .map() to transform them — store in a new variable
const doubled = numbers.map((n) => n * 2);

document.write(doubled.join(", "));`,
          }}
          challenge={{
            prompt:
              "Create an array with at least 3 items, use .map() to transform each one, and store the result in a new variable.",
            check(_html, _css, js) {
              if (!js.includes("["))
                return { passed: false, message: "Create an array using [ ]." };
              if (!js.includes(".map("))
                return { passed: false, message: "Use .map() to transform the array." };
              const constCount = (js.match(/\bconst\b/g) ?? []).length;
              const letCount = (js.match(/\blet\b/g) ?? []).length;
              if (constCount + letCount < 2)
                return {
                  passed: false,
                  message:
                    "Store the mapped result in a new variable — you need at least two variable declarations.",
                };
              return {
                passed: true,
                message: "Challenge complete! You transformed an array with .map().",
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
