import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_CLASS = `class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  speak() {
    return \`\${this.name} says \${this.sound}\`;
  }
}

const dog = new Animal("Rex", "Woof");
const cat = new Animal("Luna", "Meow");

console.log(dog.speak());
console.log(cat.speak());
console.log(dog instanceof Animal); // true`;

const EXPLORE_INHERITANCE = `class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  speak() {
    return \`\${this.name} says \${this.sound}\`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof"); // must call super before using this
  }
  fetch(item) {
    return \`\${this.name} fetches the \${item}!\`;
  }
}

const rex = new Dog("Rex");
console.log(rex.speak());    // inherited from Animal
console.log(rex.fetch("ball"));`;

const EXPLORE_PRIVATE = `class BankAccount {
  #balance = 0; // private — cannot be read from outside

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) return "Insufficient funds";
    this.#balance -= amount;
    return \`Withdrew \${amount}\`;
  }

  get balance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(500);
console.log(account.balance);    // 500
console.log(account.withdraw(200));
console.log(account.balance);    // 300

// account.#balance would throw a SyntaxError`;

const EXPLORE_STATIC = `class MathHelper {
  static PI = 3.14159;

  static add(a, b) { return a + b; }
  static multiply(a, b) { return a * b; }
  static circleArea(r) { return MathHelper.PI * r * r; }
}

// No new keyword needed — call directly on the class
console.log(MathHelper.add(3, 7));
console.log(MathHelper.circleArea(5).toFixed(2));

class IdFactory {
  static #nextId = 1;
  static generate() { return IdFactory.#nextId++; }
}

console.log(IdFactory.generate()); // 1
console.log(IdFactory.generate()); // 2`;

const CHALLENGE_STARTER = `// Create a Rectangle class.
// It should accept width and height in the constructor,
// and have an area() method that returns width * height.

// Your code here:


// Test it — do not change these lines:
const r = new Rectangle(4, 6);
console.log(r.area()); // should print 24
`;

const challenge = {
  prompt:
    "Create a `Rectangle` class with `width` and `height` constructor parameters and an `area()` method that returns `width * height`.",
  check(_html: string, _css: string, js: string) {
    const hasClass = /class\s+Rectangle/.test(js);
    if (!hasClass)
      return { passed: false, message: "Define a class called `Rectangle`." };

    const hasConstructor = /constructor\s*\(/.test(js);
    if (!hasConstructor)
      return { passed: false, message: "Add a `constructor(width, height)` to your class." };

    const hasArea = /area\s*\(\s*\)/.test(js);
    if (!hasArea)
      return { passed: false, message: "Add an `area()` method to your Rectangle class." };

    const hasMultiply = /width\s*\*\s*height|height\s*\*\s*width|this\.width\s*\*\s*this\.height/.test(js);
    if (!hasMultiply)
      return { passed: false, message: "Your `area()` method should return `this.width * this.height`." };

    return { passed: true, message: "Rectangle class looks great — constructor and area() are both correct!" };
  },
};

export default function Module06ClassesOOP() {
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
        <h1 className="text-4xl font-serif text-foreground">Classes &amp; OOP</h1>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Objects hold data and behaviour together. A class is a blueprint — define the shape once,
          stamp out as many instances as you need.
        </p>
      </section>

      {/* Object literals recap */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">You already know object literals</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A plain object bundles related values and functions under one name. You have been writing
          these since the fundamentals track.
        </p>
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Object literal
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`const user = {
  name: "Alice",
  greet() {
    return \`Hi, I'm \${this.name}\`;
  },
};

console.log(user.greet()); // "Hi, I'm Alice"`}</pre>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          Object literals work well for one-off values. But when you need to create <em>many</em>{" "}
          objects with the same shape — ten users, a hundred products — copy-pasting the same
          structure is error-prone. That is where classes come in.
        </p>
      </section>

      {/* Class syntax */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">The class blueprint</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A class defines the constructor (runs once when you call <code className="font-mono text-sm">new</code>)
          and the methods shared by every instance.
        </p>
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Basic class
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`class Animal {
  constructor(name, sound) {   // runs on new Animal(...)
    this.name = name;          // instance properties
    this.sound = sound;
  }

  speak() {                    // shared method
    return \`\${this.name} says \${this.sound}\`;
  }
}

const dog = new Animal("Rex", "Woof");
const cat = new Animal("Luna", "Meow");

dog.speak(); // "Rex says Woof"
cat.speak(); // "Luna says Meow"`}</pre>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">constructor</span>
            called automatically when you use <code className="font-mono">new</code>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">this</span>
            refers to the specific instance being created or called on
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">new Animal()</span>
            allocates memory, runs the constructor, returns the instance
          </li>
        </ul>
        <CodePlayground mode="js" starter={{ js: EXPLORE_CLASS }} height="280px" />
      </section>

      {/* Inheritance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Inheritance with <code className="font-mono">extends</code></h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A subclass inherits every method from its parent and can add or override its own.
          Call <code className="font-mono text-sm">super()</code> first in the constructor to
          initialise the parent's properties — JavaScript enforces this.
        </p>
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            extends + super
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`class Dog extends Animal {
  constructor(name) {
    super(name, "Woof"); // sets this.name and this.sound via Animal
  }

  fetch(item) {
    return \`\${this.name} fetches the \${item}!\`;
  }
}

const rex = new Dog("Rex");
rex.speak();        // inherited → "Rex says Woof"
rex.fetch("ball");  // own method → "Rex fetches the ball!"`}</pre>
        </div>
        <CodePlayground mode="js" starter={{ js: EXPLORE_INHERITANCE }} height="300px" />
      </section>

      {/* Private fields */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Private fields with <code className="font-mono">#</code></h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Prefix a field name with <code className="font-mono text-sm">#</code> and it becomes
          truly private — readable and writable only from inside the class body. Any access from
          outside throws a <code className="font-mono text-sm">SyntaxError</code> at parse time.
        </p>
        <CodePlayground mode="js" starter={{ js: EXPLORE_PRIVATE }} height="300px" />
        <p className="text-sm text-muted-foreground">
          Use a <strong className="text-foreground">getter</strong> (
          <code className="font-mono text-sm">get balance()</code>) to expose a read-only view of
          private data without allowing direct mutation.
        </p>
      </section>

      {/* Static methods */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Static methods &amp; properties</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A <code className="font-mono text-sm">static</code> member belongs to the class itself,
          not to any instance. Call it directly on the class name — no <code className="font-mono text-sm">new</code> needed.
          Common uses: utility functions, factories, shared counters.
        </p>
        <CodePlayground mode="js" starter={{ js: EXPLORE_STATIC }} height="300px" />
      </section>

      {/* The this problem */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">The <code className="font-mono">this</code> problem in callbacks</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Inside a regular method, <code className="font-mono text-sm">this</code> is the instance.
          But the moment you pass that method as a callback, <code className="font-mono text-sm">this</code>{" "}
          can become <code className="font-mono text-sm">undefined</code> (or the wrong object).
        </p>
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Lost this — and the fix
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`class Timer {
  constructor(label) {
    this.label = label;
  }

  // ✗ Regular method — this is lost when passed as callback
  startBroken() {
    setTimeout(function () {
      console.log(this.label); // undefined or error
    }, 100);
  }

  // ✓ Arrow function captures this from the enclosing scope
  startFixed() {
    setTimeout(() => {
      console.log(this.label); // works correctly
    }, 100);
  }
}

new Timer("Pomodoro").startFixed(); // "Pomodoro"`}</pre>
        </div>
        <p className="text-sm text-muted-foreground">
          Arrow functions do not have their own <code className="font-mono text-sm">this</code> — they inherit it
          from where they are defined, which is why they solve this problem cleanly inside class methods.
        </p>
      </section>

      {/* When to use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">When to use classes</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">Reach for a class when…</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>You need many instances with the same shape</li>
              <li>Shared methods save repetition</li>
              <li>You want encapsulation (private state)</li>
              <li>You model a real-world hierarchy (Animal → Dog)</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">Prefer plain objects + functions when…</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>You only need one instance</li>
              <li>The data is simple and stateless</li>
              <li>You are writing in a functional style</li>
              <li>React hooks already manage the lifecycle</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Classes are not always the answer. In modern React codebases, for example,
          components are functions — classes have largely been replaced by hooks. Know when each tool fits.
        </p>
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Create a <code className="font-mono text-sm">Rectangle</code> class. The constructor takes{" "}
            <code className="font-mono text-sm">width</code> and{" "}
            <code className="font-mono text-sm">height</code>. Add an{" "}
            <code className="font-mono text-sm">area()</code> method that returns their product.
          </p>
        </div>
        <CodePlayground
          mode="js"
          starter={{ js: CHALLENGE_STARTER }}
          height="280px"
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
