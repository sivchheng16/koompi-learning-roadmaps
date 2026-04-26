import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_IDENTITY = `// Generic identity function — works for any type
function identity<T>(value: T): T {
  return value;
}

// TypeScript infers T from the argument
const s = identity("hello");   // type: string
const n = identity(42);        // type: number
const b = identity(true);      // type: boolean

// You can also be explicit
const explicit = identity<string[]>(["a", "b", "c"]);

console.log(s, n, b, explicit);`;

const EXPLORE_CONSTRAINTS = `// Without constraints — TypeScript doesn't know T has .length
// function badLength<T>(item: T): number { return item.length; } // Error!

// Constrain T to things that have a length property
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log(getLength("hello"));        // 5
console.log(getLength([1, 2, 3]));      // 3
console.log(getLength({ length: 99 })); // 99
// getLength(42); // Error: number has no .length`;

const EXPLORE_INTERFACES = `// Generic interface — data shape depends on T
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

// The same wrapper, different data types
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Sokha" },
  status: 200,
  message: "ok",
};

const listResponse: ApiResponse<string[]> = {
  data: ["HTML", "CSS", "TypeScript"],
  status: 200,
  message: "ok",
};

console.log(userResponse.data.name);   // TypeScript knows .name is string
console.log(listResponse.data.length); // TypeScript knows .length exists`;

const EXPLORE_UTILITY = `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial — every property becomes optional
type UserUpdate = Partial<User>;
const patch: UserUpdate = { name: "Dara" }; // no error — others optional

// Required — every property is required (reverses Partial)
type StrictUser = Required<User>;

// Pick — keep only certain properties
type PublicUser = Pick<User, "id" | "name">;
const pub: PublicUser = { id: 1, name: "Sokha" };

// Omit — exclude certain properties
type SafeUser = Omit<User, "password">;
const safe: SafeUser = { id: 1, name: "Sokha", email: "s@k.com" };

// Record — build a key-value map type
type ScoreMap = Record<string, number>;
const scores: ScoreMap = { html: 90, css: 85, ts: 95 };

// Readonly — prevents mutation
type FrozenUser = Readonly<User>;

console.log(pub, safe, scores);`;

const CHALLENGE_STARTER = `// Challenge: write a generic first() function.
//
// It should:
//   - Accept an array of any type T  (items: T[])
//   - Return the first element, or undefined if the array is empty
//   - Use generic syntax: function first<T>(...)
//
// Examples after you write it:
//   first([10, 20, 30])    → 10
//   first(["a", "b"])      → "a"
//   first([])              → undefined

`;

const challenge = {
  prompt:
    "Write a generic `first<T>` function that takes `items: T[]` and returns `T | undefined`.",
  check(_html: string, _css: string, js: string) {
    const hasGeneric = /function\s+first\s*<\s*T\s*>/.test(js);
    if (!hasGeneric)
      return {
        passed: false,
        message:
          "Define the function with generic syntax: `function first<T>(items: T[])`.",
      };
    const hasReturn = /return/.test(js);
    if (!hasReturn)
      return {
        passed: false,
        message: "Your function needs a return statement.",
      };
    return {
      passed: true,
      message: "Generic function written correctly — the type parameter travels with the data!",
    };
  },
};

export default function Module04GenericsAdvanced() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Header ──────────────────────────────────────────── */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/60">
          Track 06 · TypeScript
        </p>
        <h1 className="text-4xl font-serif text-foreground">Generics &amp; Advanced Types</h1>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Write one function that works for strings, numbers, and anything else — without losing
          type information along the way.
        </p>
      </section>

      {/* ── 1. Generic functions ────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Generic functions</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A <strong className="text-foreground">type parameter</strong> (written{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;T&gt;</code>) is a
          placeholder that TypeScript fills in from the argument you actually pass. Unlike{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">any</code>, the type is
          tracked — if you pass a string, you get a string back.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            identity.ts
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`function identity<T>(value: T): T {
  return value;
}

identity<string>("hello"); // return type: string
identity(42);              // TypeScript infers T as number
identity([1, 2, 3]);       // T inferred as number[]`}</pre>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          TypeScript can usually <strong className="text-foreground">infer</strong> the type
          parameter from the argument, so you rarely need to write{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">identity&lt;string&gt;(...)</code>{" "}
          explicitly. Explicit type arguments are useful when the compiler cannot infer — for example,
          when calling a function with no arguments.
        </p>

        <CodePlayground mode="js" starter={{ js: EXPLORE_IDENTITY }} height="280px" />
      </section>

      {/* ── 2. Generic constraints ──────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Generic constraints</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          By default{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">T</code> can be anything,
          which means TypeScript will not let you access any properties on it. Use{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">extends</code> to narrow
          what types are allowed.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            getLength.ts
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("hello");         // 5  — strings have .length
getLength([1, 2, 3]);       // 3  — arrays have .length
getLength({ length: 99 });  // 99 — plain objects work too
getLength(42);              // Error: number has no .length`}</pre>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          The constraint{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">{"T extends { length: number }"}</code>{" "}
          does not lock you into a specific type — it just guarantees that whatever type you pass has
          a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">length</code> property.
          Strings, arrays, typed arrays, and custom objects all satisfy it.
        </p>

        <CodePlayground mode="js" starter={{ js: EXPLORE_CONSTRAINTS }} height="240px" />
      </section>

      {/* ── 3. Generic interfaces ───────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Generic interfaces</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Interfaces can also carry type parameters. This is how you describe a shape where the
          payload type varies — for example, every API response has a status and message, but the
          actual data is different each time.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            api.ts
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Reuse the same wrapper for any data shape
type UserResponse = ApiResponse<User>;        // data is User
type PostListResponse = ApiResponse<Post[]>;  // data is Post[]
type StringResponse = ApiResponse<string>;    // data is string`}</pre>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_INTERFACES }} height="320px" />
      </section>

      {/* ── 4. Utility types ────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Utility types — built-in generics</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          TypeScript ships with a library of generic types that transform existing interfaces.
          You will use these constantly in real projects.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "Partial<T>", desc: "All properties become optional" },
            { name: "Required<T>", desc: "All properties become required" },
            { name: "Pick<T, K>", desc: "Keep only properties K from T" },
            { name: "Omit<T, K>", desc: "Remove properties K from T" },
            { name: "Record<K, V>", desc: "Build a key-value map type" },
            { name: "Readonly<T>", desc: "Prevent any mutation of T" },
          ].map(({ name, desc }) => (
            <div key={name} className="rounded-xl border border-border px-4 py-3 flex gap-3 items-start">
              <code className="text-xs font-mono text-primary shrink-0 mt-0.5">{name}</code>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            utility-types.ts
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserUpdate  = Partial<User>;                  // all optional
type PublicUser  = Pick<User, "id" | "name">;      // only id & name
type SafeUser    = Omit<User, "password">;          // no password
type ScoreMap    = Record<string, number>;          // { [key: string]: number }
type FrozenUser  = Readonly<User>;                  // immutable`}</pre>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_UTILITY }} height="320px" />
      </section>

      {/* ── 5. Mapped types ─────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Mapped types (brief)</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The utility types above are all implemented using a feature called{" "}
          <strong className="text-foreground">mapped types</strong> — you can write your own. The
          syntax iterates over the keys of{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">T</code> and produces a new
          type.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            mapped.ts
          </div>
          <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// Reimplementing Partial from scratch
type Optional<T> = { [K in keyof T]?: T[K] }

// Reimplementing Readonly from scratch
type Immutable<T> = { readonly [K in keyof T]: T[K] }

// Make all values nullable
type Nullable<T> = { [K in keyof T]: T[K] | null }`}</pre>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          You do not need to write mapped types often — the built-in utility types cover most cases.
          Recognising the{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">{"[K in keyof T]"}</code>{" "}
          pattern helps you read TypeScript library code and error messages.
        </p>
      </section>

      {/* ── 6. When to use generics ─────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">When to reach for generics</h2>
        <ul className="space-y-3">
          {[
            {
              signal: "You would otherwise write the same function twice",
              example: "getFirstString / getFirstNumber → first<T>",
            },
            {
              signal: "You are tempted to use any to avoid a type error",
              example: "any erases the type; a type parameter preserves it",
            },
            {
              signal: "A wrapper shape is the same but the payload varies",
              example: "ApiResponse<User>, ApiResponse<Post[]>",
            },
            {
              signal: "You need to transform every property of a type the same way",
              example: "Partial<T>, Readonly<T>, your own mapped type",
            },
          ].map(({ signal, example }) => (
            <li key={signal} className="rounded-xl border border-border px-5 py-4 space-y-1">
              <p className="text-sm font-semibold text-foreground">{signal}</p>
              <p className="text-xs font-mono text-muted-foreground">{example}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Challenge ───────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
        <p className="text-base text-muted-foreground">
          Write a generic{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">first&lt;T&gt;</code>{" "}
          function that takes an array of any type and returns the first element, or{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">undefined</code> if the
          array is empty. The checker looks for generic syntax{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">{"<T>"}</code> in your
          source.
        </p>
        <CodePlayground
          mode="js"
          starter={{ js: CHALLENGE_STARTER }}
          height="260px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── Gate ────────────────────────────────────────────── */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-green-800">Challenge passed</p>
              <p className="text-sm text-green-700 mt-0.5">
                Click <strong>Complete &amp; Next</strong> below to move on to the project lesson.
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
