import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const CHALLENGE_STARTER = `// Define a Product type or interface below.
// It must have: name (string), price (number), description? (optional string)

// Your code here:

// Test it:
// const item = { name: "Laptop", price: 999 };
// console.log(item.name, item.price);
`;

const challenge = {
  prompt:
    "Define a `type Product` or `interface Product` with `name: string`, `price: number`, and optional `description?: string`.",
  check(_html: string, _css: string, js: string) {
    const hasTypeProduct = /type\s+Product\s*=/.test(js);
    const hasInterfaceProduct = /interface\s+Product\s*\{/.test(js);
    if (!hasTypeProduct && !hasInterfaceProduct) {
      return {
        passed: false,
        message: "Define `type Product = { ... }` or `interface Product { ... }` first.",
      };
    }
    const hasName = /name\s*[?]?\s*:/.test(js);
    const hasPrice = /price\s*[?]?\s*:/.test(js);
    if (!hasName) {
      return { passed: false, message: "Your Product is missing a `name` property." };
    }
    if (!hasPrice) {
      return { passed: false, message: "Your Product is missing a `price` property." };
    }
    return { passed: true, message: "Challenge complete! Your Product shape is well-typed." };
  },
};

export default function Module02TypesInterfaces() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ───────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Inline object types get messy fast. Once you have a user object in five
          different files, keeping those shapes in sync by hand is a bug waiting
          to happen. <code className="font-mono text-base bg-stone-100 px-1.5 py-0.5 rounded">type</code> and{" "}
          <code className="font-mono text-base bg-stone-100 px-1.5 py-0.5 rounded">interface</code> give your shapes names — define once, reuse everywhere.
        </p>
      </section>

      {/* ── 2. type aliases ──────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Type aliases</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A <strong className="text-foreground">type alias</strong> gives any type a name.
          You use the <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">type</code> keyword,
          followed by the name, an equals sign, and the shape:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`type User = {
  name: string;
  age: number;
  email?: string;   // optional — may be undefined
};

const alice: User = { name: "Alice", age: 28 };
const bob: User   = { name: "Bob",   age: 32, email: "bob@example.com" };`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Now every variable declared as <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">User</code> must
          match that shape. Miss a required field or add an unknown one, and TypeScript
          tells you before the code runs.
        </p>
      </section>

      {/* ── 3. interface ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">interface</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">interface</code> describes
          an object shape and can be <em>extended</em> — another interface can inherit
          all its properties and add more:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`interface User {
  name: string;
  age: number;
  email?: string;
}

interface Admin extends User {
  role: "admin" | "superadmin";
  permissions: string[];
}

const superuser: Admin = {
  name: "Dara",
  age: 30,
  role: "superadmin",
  permissions: ["read", "write", "delete"],
};`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">Admin</code> automatically
          includes <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">name</code>,{" "}
          <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">age</code>, and{" "}
          <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">email?</code> from{" "}
          <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">User</code>.
          Extension avoids repeating fields.
        </p>
      </section>

      {/* ── 4. readonly ──────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">readonly properties</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Mark a property <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">readonly</code> and
          TypeScript prevents any reassignment after the object is created:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`interface Post {
  readonly id: string;
  title: string;
  body: string;
}

const post: Post = { id: "abc123", title: "Hello", body: "World" };

post.title = "Updated title";  // ✓ allowed
post.id    = "xyz999";         // ✗ Error: Cannot assign to 'id' — it is read-only`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          This is useful for IDs, creation timestamps, and anything that should
          never change once set.
        </p>
      </section>

      {/* ── 5. Union types ───────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Union types</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A union type says a value can be <em>one of several</em> allowed types.
          Literal unions are especially powerful for status fields and direction values:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`type Status = "active" | "inactive" | "pending";

let userStatus: Status = "active";
userStatus = "pending";   // ✓ ok
userStatus = "banned";    // ✗ Error: '"banned"' is not assignable to type 'Status'

// Unions work with non-string types too:
type ID = string | number;

function printId(id: ID) {
  console.log("ID:", id);
}

printId(101);          // ✓
printId("abc-42");     // ✓
printId(true);         // ✗ Error`}
        </pre>
      </section>

      {/* ── 6. Intersection types ────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Intersection types</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Where unions mean "either / or", intersections mean "all of the above".
          Use <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">&amp;</code> to combine
          two shapes into one:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`type Person = { name: string; age: number };
type Employee = { company: string; salary: number };

type Staff = Person & Employee;

const dev: Staff = {
  name: "Sokha",
  age: 25,
  company: "KOOMPI",
  salary: 1200,
};`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">Staff</code> requires
          every field from both <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">Person</code> and{" "}
          <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">Employee</code>.
          Leave any out, and you get a compile error.
        </p>
      </section>

      {/* ── 7. type vs interface ─────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">type vs interface — which to use</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Both work for object shapes. The practical guidance:
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono font-semibold text-foreground">interface</div>
            <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono font-semibold text-foreground">type</div>
            <div className="px-5 py-4 text-sm text-muted-foreground space-y-2">
              <p>Preferred for public API shapes — libraries, component props, class contracts.</p>
              <p>Can be extended with <code className="font-mono text-xs bg-stone-100 px-1 rounded">extends</code>.</p>
              <p>Can be merged across declarations (declaration merging).</p>
            </div>
            <div className="px-5 py-4 text-sm text-muted-foreground space-y-2">
              <p>Better for unions, intersections, mapped types, and conditional types.</p>
              <p>Can alias primitives: <code className="font-mono text-xs bg-stone-100 px-1 rounded">type ID = string</code>.</p>
              <p>More expressive for complex computed shapes.</p>
            </div>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          When in doubt: use <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">interface</code> for
          object shapes you might extend, and{" "}
          <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">type</code> for everything else.
        </p>
      </section>

      {/* ── 8. Literal types ─────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Literal types</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A <strong className="text-foreground">literal type</strong> constrains a variable to
          an exact value. TypeScript narrows the type to that specific string, number,
          or boolean:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`const direction: "left" | "right" | "up" | "down" = "left";

type Theme = "light" | "dark" | "system";
let currentTheme: Theme = "dark";

// TypeScript checks assignments at compile time:
currentTheme = "light";   // ✓
currentTheme = "pink";    // ✗ Error: '"pink"' is not assignable to type 'Theme'`}
        </pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Literal types eliminate entire categories of runtime bugs — a mistyped
          string like <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">"Dark"</code> (capital D)
          becomes a compile error instead of a silent wrong value.
        </p>
      </section>

      {/* ── 9. Challenge ─────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Define a <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">Product</code> type
            or interface with <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">name: string</code>,{" "}
            <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">price: number</code>, and optional{" "}
            <code className="font-mono text-sm bg-stone-100 px-1.5 py-0.5 rounded">description?: string</code>.
            The checker reads your source code, so TypeScript syntax is expected.
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
