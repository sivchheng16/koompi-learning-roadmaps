import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

// ── Challenge ────────────────────────────────────────────────────────────────

const CHALLENGE_STARTER = `// Write a function called greet that takes a name parameter
// and returns the string "Hello, " + name.
// Include a : string type annotation on the parameter and return type.
//
// Example:  greet("Alice")  →  "Hello, Alice"

function greet(/* your code here */) {

}

// Test it
console.log(greet("World"));
`;

const challenge = {
  prompt:
    'Write a function greet(name: string): string that returns "Hello, " + name. Include the : string annotation on both the parameter and the return type.',
  check(_html: string, _css: string, js: string) {
    // Check for string annotation on the parameter
    if (!/name\s*:\s*string/.test(js))
      return {
        passed: false,
        message: 'Add a : string type annotation to the name parameter — greet(name: string).',
      };

    // Check for return type annotation
    if (!/\)\s*:\s*string/.test(js))
      return {
        passed: false,
        message: 'Add a : string return type annotation — greet(name: string): string { ... }.',
      };

    // Check for a return statement with string concatenation or template literal
    if (!/return\s+["'`]Hello,\s*["'`]\s*\+|return\s+`Hello,/.test(js))
      return {
        passed: false,
        message: 'Your function should return "Hello, " + name (or a template literal equivalent).',
      };

    // Actually run the function to verify output
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(`${js}\nreturn greet("Alice");`);
      const result = fn();
      if (result !== "Hello, Alice")
        return {
          passed: false,
          message: `greet("Alice") returned "${result}" — expected "Hello, Alice".`,
        };
    } catch (e) {
      return { passed: false, message: `Runtime error: ${(e as Error).message}` };
    }

    return { passed: true, message: 'Challenge complete! Your typed greet function works perfectly.' };
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Module01Introduction() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ─────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          You have seen it before:{" "}
          <span className="font-mono text-[#c2622d]">TypeError: Cannot read properties of undefined</span>.
          The app crashes in production, users are angry, and you spend an hour
          tracing back to a typo you made three files away. TypeScript catches
          that before you run a single line.
        </p>
      </section>

      {/* ── 2. Superset ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">TypeScript is a superset of JavaScript</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every valid JavaScript file is already a valid TypeScript file. You
          add types on top — and the TypeScript compiler (
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">tsc</code>) strips them out,
          producing plain JavaScript that browsers and Node can run. The types
          exist only for you and your editor.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
              greet.ts — what you write
            </div>
            <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`function greet(name: string): string {
  return "Hello, " + name;
}`}
            </pre>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
              greet.js — what tsc produces
            </div>
            <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`function greet(name) {
  return "Hello, " + name;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── 3. Type annotations ─────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Type annotations</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A type annotation is a colon followed by the type name, written right
          after the variable or parameter. The three primitive types cover most
          of what you will write day-to-day.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`const name: string  = "Alice";
const age:  number  = 25;
const active: boolean = true;`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          If you try to assign the wrong type — say,{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">const age: number = "twenty-five"</code>{" "}
          — TypeScript errors immediately, before you ever run anything.
        </p>
      </section>

      {/* ── 4. Type inference ───────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Type inference — TypeScript is smart</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          You do not have to annotate everything. When the value is obvious,
          TypeScript infers the type automatically.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// TypeScript knows name is a string — you don't need to say so.
const name = "Alice";   // inferred: string
const score = 42;       // inferred: number
const done = false;     // inferred: boolean`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Use explicit annotations where the type is not obvious from the value
          — function parameters and return types are the most important places.
          Everywhere else, let inference do the work.
        </p>
      </section>

      {/* ── 5. The any type ─────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">The <code className="font-mono text-[#c2622d]">any</code> type — and why to avoid it</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">any</code> is an escape hatch that
          turns off type checking for a variable. It exists to ease migration
          from plain JavaScript, but using it freely defeats the purpose of
          TypeScript entirely.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// ✗ avoid — you lose all protection
let value: any = "hello";
value = 42;         // no error
value.toUpperCase(); // no error, but crashes at runtime!

// ✓ prefer a union type instead (covered next)
let value: string | number = "hello";`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Treat <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">any</code> like a fire
          extinguisher: it is there for emergencies, but if you use it daily
          something has gone wrong.
        </p>
      </section>

      {/* ── 6. Array types ──────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Array types</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Two syntaxes, same meaning — pick one and stick with it (
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">string[]</code> is the most
          common in practice):
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`const names: string[]        = ["Alice", "Bob", "Carol"];
const scores: Array<number>  = [98, 87, 76];

// TypeScript prevents mixing types
names.push(42);  // ✗ error: Argument of type 'number'
                 //          is not assignable to 'string'`}
        </pre>
      </section>

      {/* ── 7. Object types ─────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Object types</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          You can describe an object's shape inline. Each property gets its own
          type, separated by semicolons.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`const user: { name: string; age: number } = {
  name: "Alice",
  age: 25,
};

user.name = "Bob";  // ✓ fine
user.age  = "old";  // ✗ error: string is not assignable to number`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Inline object types work for one-offs. When the same shape is reused,
          you will use an <strong className="text-foreground">interface</strong> instead — that is the
          next lesson.
        </p>
      </section>

      {/* ── 8. Union types ──────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Union types</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Sometimes a value can be one of several types. The pipe character{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">|</code> creates a union.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`const id: string | number = "abc123";  // could also be 42
let status: "loading" | "success" | "error" = "loading";

status = "success";  // ✓
status = "oops";     // ✗ error: not one of the allowed strings`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          String literal unions (the second example) are especially useful for
          state machines — TypeScript will tell you immediately if you mistype a
          state name.
        </p>
      </section>

      {/* ── 9. Compiling ────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Compiling TypeScript</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          On the command line you run{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">tsc file.ts</code>, which
          produces <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">file.js</code> alongside it.
          In Vite, Next.js, and most modern toolchains, compilation happens
          automatically — you never invoke{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">tsc</code> by hand.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`# compile a single file
tsc greet.ts          # outputs greet.js

# type-check your whole project without emitting files
tsc --noEmit

# watch mode — recompiles on every save
tsc --watch`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The challenge playground below runs JavaScript, so TypeScript
          annotations are written as comments to keep them valid. In a real{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.ts</code> file the
          annotations go directly in the code.
        </p>
      </section>

      {/* ── 10. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Write a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">greet</code> function
            with TypeScript-style annotations included in the JS source.
            The checker looks for{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">name: string</code> on the
            parameter and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">): string</code>{" "}
            on the return type — exactly as you would write it in a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.ts</code> file.
          </p>
        </div>
        <CodePlayground
          mode="js"
          starter={{ html: "", css: "", js: CHALLENGE_STARTER }}
          height="320px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 11. Gate ────────────────────────────────────────── */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-green-800">Challenge passed</p>
              <p className="text-sm text-green-700 mt-0.5">
                Click <strong>Complete &amp; Next</strong> below to move on to the next lesson.
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
