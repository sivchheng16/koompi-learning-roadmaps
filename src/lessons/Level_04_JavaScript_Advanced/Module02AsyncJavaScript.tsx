import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_SYNC = `// Synchronous — runs line by line
console.log("First");
console.log("Second");
console.log("Third");
// Output: First, Second, Third (in order)`;

const EXPLORE_PROMISES = `// Creating a Promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// .then / .catch chain
delay(500)
  .then(() => {
    console.log("500ms passed");
    return "next value";
  })
  .then(val => console.log("Chained:", val))
  .catch(err => console.error("Error:", err))
  .finally(() => console.log("Always runs"));`;

const EXPLORE_ASYNC = `// async / await — reads like synchronous code
function fakeRequest(value) {
  return new Promise(resolve =>
    setTimeout(() => resolve(value), 300)
  );
}

async function loadData() {
  console.log("Fetching...");
  const result = await fakeRequest("Hello from server!");
  console.log("Got:", result);

  // Error handling
  try {
    const data = await fakeRequest("more data");
    console.log("Also got:", data);
  } catch (err) {
    console.error("Failed:", err);
  }
}

loadData();`;

const CHALLENGE_STARTER = `// Write an async function called "wait" that:
//  1. Uses "new Promise(resolve => setTimeout(resolve, 1000))" to pause for 1 second
//  2. Logs "Done!" after the wait
// Then call wait() to run it.

async function wait() {
  // your code here
}

wait();
`;

const challenge = {
  prompt:
    "Write an async function that uses `new Promise(resolve => setTimeout(resolve, 1000))` to wait 1 second. Your code must contain `async`, `await`, and `new Promise`.",
  check(_html: string, _css: string, js: string) {
    if (!/\basync\b/.test(js))
      return { passed: false, message: "Your function needs the `async` keyword." };
    if (!/\bawait\b/.test(js))
      return { passed: false, message: "Use `await` to pause until the Promise resolves." };
    if (!/new\s+Promise/.test(js))
      return { passed: false, message: "Create the delay with `new Promise(resolve => setTimeout(resolve, 1000))`." };
    return { passed: true, message: "Async/await mastered — you just wrote non-blocking code!" };
  },
};

export default function Module02AsyncJavaScript() {
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
        <h1 className="text-4xl font-serif text-foreground">Asynchronous JavaScript</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Almost everything that makes a web app interesting — fetching data, waiting for a user,
          reading a file — is asynchronous. This lesson walks you through the event loop,
          Promises, and the <code className="font-mono text-sm">async/await</code> syntax that makes
          async code as readable as synchronous code.
        </p>
      </section>

      {/* The Event Loop */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Why Async Exists</h2>
        <p className="text-base text-muted-foreground">
          JavaScript runs on a single thread. Without async, any slow operation — a network
          request, a timer, a large computation — would freeze the entire page. The <em>event
          loop</em> lets JavaScript hand slow work to the browser or Node.js, continue running
          other code, then come back when the slow work is done.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Sync vs async execution
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`console.log("A");

setTimeout(() => {
  console.log("B — after 0 ms");
}, 0);

console.log("C");

// Output: A, C, B
// Even with 0 ms, setTimeout is async — B runs after the current call stack clears.`}</pre>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_SYNC }} height="160px" />
      </section>

      {/* Callbacks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Callbacks (Brief)</h2>
        <p className="text-base text-muted-foreground">
          The original async pattern: pass a function to be called later. Simple for single
          operations, but deeply nested callbacks become unreadable — the so-called
          "callback hell."
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Callback hell — why we moved on
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`getUser(id, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      getLikes(comments[0].id, (likes) => {
        // Four levels deep — and this is still simple!
        console.log(likes);
      });
    });
  });
});

// Promises and async/await solve this.`}</pre>
        </div>
      </section>

      {/* Promises */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Promises</h2>
        <p className="text-base text-muted-foreground">
          A Promise is an object that represents a value which may arrive now, later, or never.
          It has three states: <em>pending</em>, <em>fulfilled</em>, or <em>rejected</em>.
          Once settled it never changes state.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Creating and consuming a Promise
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`// Create
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "Sokha" });
      else reject(new Error("Invalid ID"));
    }, 1000);
  });
}

// Consume — .then / .catch chain
fetchUser(1)
  .then(user => {
    console.log(user);         // { id: 1, name: "Sokha" }
    return user.name;          // passes to next .then
  })
  .then(name => console.log("Name:", name))
  .catch(err => console.error("Oops:", err.message))
  .finally(() => console.log("Request finished"));

// Run multiple in parallel
Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)])
  .then(([u1, u2, u3]) => console.log(u1, u2, u3));`}</pre>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_PROMISES }} height="280px" />
      </section>

      {/* Async/await */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">async / await</h2>
        <p className="text-base text-muted-foreground">
          The <code className="font-mono text-sm">async</code> keyword makes a function return a
          Promise. Inside it, <code className="font-mono text-sm">await</code> pauses execution
          until the awaited Promise settles — without blocking the main thread.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            The modern pattern
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`// Promise chain version
function loadData() {
  return fetchUser(1)
    .then(user => fetchPosts(user.id))
    .then(posts => console.log(posts));
}

// async/await version — same logic, easier to read
async function loadData() {
  const user  = await fetchUser(1);
  const posts = await fetchPosts(user.id);
  console.log(posts);
}

// Error handling with try/catch
async function safeLoad(id) {
  try {
    const user = await fetchUser(id);
    return user;
  } catch (err) {
    console.error("Failed:", err.message);
    throw err; // re-throw if the caller needs to know
  }
}

// Sequential vs parallel
async function sequential() {
  const a = await fetch("/one");   // waits
  const b = await fetch("/two");   // then waits again → slower
}

async function parallel() {
  const [a, b] = await Promise.all([fetch("/one"), fetch("/two")]); // both at once
}`}</pre>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_ASYNC }} height="300px" />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
        <p className="text-base text-muted-foreground">
          Write an async function called <code className="font-mono text-sm">wait</code> that
          creates a real 1-second delay using{" "}
          <code className="font-mono text-sm">{"new Promise(resolve => setTimeout(resolve, 1000))"}</code>,
          awaits it, then logs <code className="font-mono text-sm">"Done!"</code>.
        </p>
        <CodePlayground
          mode="js"
          starter={{ js: CHALLENGE_STARTER }}
          height="220px"
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
