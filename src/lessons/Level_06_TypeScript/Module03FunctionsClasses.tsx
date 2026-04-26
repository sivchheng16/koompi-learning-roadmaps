import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const CHALLENGE_STARTER = `// Write a sum function that accepts an array of numbers
// and returns their total as a number.

// Your code here:

// Test it (uncomment to check):
// console.log(sum([1, 2, 3]));       // 6
// console.log(sum([10, -5, 2.5]));   // 7.5
`;

const challenge = {
  prompt:
    "Write a `sum` function that takes `numbers: number[]` and returns `number`. It should add all elements in the array.",
  check(_html: string, _css: string, js: string) {
    const hasNumberArray = /number\s*\[\s*\]/.test(js) || /Array\s*<\s*number\s*>/.test(js);
    if (!hasNumberArray) {
      return {
        passed: false,
        message: "Declare the parameter as `number[]` (or `Array<number>`).",
      };
    }
    const hasFunction = /function\s+sum\s*\(/.test(js) || /const\s+sum\s*=/.test(js) || /let\s+sum\s*=/.test(js);
    if (!hasFunction) {
      return { passed: false, message: "Define a function called `sum`." };
    }
    try {
      // Strip TypeScript annotations for eval
      const stripped = js
        .replace(/:\s*number\s*\[\]/g, "")
        .replace(/:\s*Array<number>/g, "")
        .replace(/:\s*number/g, "")
        .replace(/:\s*void/g, "");
      // eslint-disable-next-line no-new-func
      const fn = new Function(stripped + "\nreturn sum;")();
      if (typeof fn !== "function") {
        return { passed: false, message: "`sum` must be a function." };
      }
      if (fn([1, 2, 3]) !== 6) {
        return { passed: false, message: `sum([1,2,3]) returned ${fn([1,2,3])}, expected 6.` };
      }
      if (fn([]) !== 0) {
        return { passed: false, message: `sum([]) returned ${fn([])}, expected 0 for an empty array.` };
      }
      return { passed: true, message: "Challenge complete! Your typed sum function works correctly." };
    } catch {
      return { passed: false, message: "Could not run your code — check for syntax errors." };
    }
  },
};

export default function Module03FunctionsClasses() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ───────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Typed functions mean you cannot pass a string to a function expecting a number —
          the editor screams before you even run it. That single guarantee
          eliminates a whole class of bugs that would otherwise surface
          only in production.
        </p>
      </section>

      {/* ── 2. Typed parameters & return types ───────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Typed parameters and return types</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Annotate each parameter and the return value. TypeScript verifies that
          every call site matches:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`function add(a: number, b: number): number {
  return a + b;
}

add(2, 3);       // ✓  returns 5
add("2", 3);     // ✗  Error: Argument of type 'string' is not assignable to parameter of type 'number'`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The return type annotation after the <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">)</code> is
          optional — TypeScript can usually infer it — but being explicit makes your
          intent clear and catches accidental early returns.
        </p>
      </section>

      {/* ── 3. Optional & default params ─────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Optional and default parameters</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Add <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">?</code> to make a parameter
          optional. Provide a default value with <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">= value</code>:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// Optional: title may be omitted
function greet(name: string, title?: string): string {
  return title ? \`Hello, \${title} \${name}!\` : \`Hello, \${name}!\`;
}

greet("Alice");            // "Hello, Alice!"
greet("Alice", "Dr.");     // "Hello, Dr. Alice!"

// Default: exp defaults to 2 if not provided
function power(base: number, exp: number = 2): number {
  return Math.pow(base, exp);
}

power(4);      // 16  (4²)
power(2, 10);  // 1024`}
        </pre>
      </section>

      {/* ── 4. void return type ──────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">void — functions that return nothing</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          When a function exists only for its side effect and returns nothing,
          annotate the return type as <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">void</code>:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`function log(message: string): void {
  console.log(\`[LOG] \${message}\`);
  // no return statement
}

log("Server started");   // prints: [LOG] Server started`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          If you accidentally add a <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">return someValue</code> to
          a <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">void</code> function,
          TypeScript flags it immediately.
        </p>
      </section>

      {/* ── 5. Function types ────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Function types</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Functions are values — you can assign them to variables and pass them
          around. Use a <strong className="text-foreground">function type</strong> to
          describe what a callback must look like:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// Describe the shape of a callback
type Handler = (event: Event) => void;
type Transformer = (input: string) => string;
type Predicate<T> = (value: T) => boolean;

function runHandler(handler: Handler, event: Event): void {
  handler(event);
}

// Arrow function satisfying the Transformer type
const toUpperCase: Transformer = (s) => s.toUpperCase();`}
        </pre>
      </section>

      {/* ── 6. Typed classes ─────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Typed classes</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          TypeScript classes can be fully typed — properties, method parameters,
          and return values. Here is a generic{" "}
          <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">Stack</code> that
          works with any element type:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}

const numbers = new Stack<number>();
numbers.push(1);
numbers.push(2);
numbers.pop();   // 2

const words = new Stack<string>();
words.push("hello");
words.push(42);  // ✗ Error: '42' is not assignable to type 'string'`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;T&gt;</code> is a
          <strong className="text-foreground"> type parameter</strong> — a placeholder
          that TypeScript fills in when you create an instance. Each instance gets
          its own concrete type.
        </p>
      </section>

      {/* ── 7. Access modifiers ──────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Access modifiers</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          TypeScript adds access control on class members:
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-border">
                <th className="px-5 py-3 text-left font-mono font-semibold text-foreground">Modifier</th>
                <th className="px-5 py-3 text-left font-sans text-muted-foreground font-normal">Accessible from</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-mono text-foreground">public</td>
                <td className="px-5 py-3 text-muted-foreground">Anywhere (default if omitted)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-foreground">private</td>
                <td className="px-5 py-3 text-muted-foreground">Inside this class only</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-foreground">protected</td>
                <td className="px-5 py-3 text-muted-foreground">This class and subclasses</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-foreground">readonly</td>
                <td className="px-5 py-3 text-muted-foreground">Readable anywhere, assignable only in constructor</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`class BankAccount {
  private balance: number = 0;
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("acc-001");
account.deposit(500);
console.log(account.getBalance());  // 500
console.log(account.balance);       // ✗ Error: 'balance' is private`}
        </pre>
      </section>

      {/* ── 8. Constructor shorthand ─────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Constructor parameter shorthand</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Declaring a parameter with an access modifier in the constructor
          automatically creates and assigns the property — no boilerplate needed:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// Without shorthand (verbose)
class PersonA {
  private name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// With shorthand (identical result, half the lines)
class PersonB {
  constructor(private name: string, public age: number) {}
}

const p = new PersonB("Chenda", 22);
console.log(p.age);   // 22
console.log(p.name);  // ✗ Error: 'name' is private`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The shorthand is idiomatic TypeScript. You will see it everywhere in
          React component classes and Angular services.
        </p>
      </section>

      {/* ── 9. Challenge ─────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Write a <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">sum</code> function
            that takes <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">numbers: number[]</code> and
            returns <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">number</code>.
            The checker strips type annotations and runs your logic, so write real TypeScript syntax.
          </p>
        </div>
        <CodePlayground
          mode="js"
          starter={{ html: "", css: "", js: CHALLENGE_STARTER }}
          height="300px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 10. Gate ─────────────────────────────────────────── */}
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
