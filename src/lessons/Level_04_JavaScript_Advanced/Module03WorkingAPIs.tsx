import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_FETCH = `// Basic GET with .then
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(user => console.log(user.name, user.email))
  .catch(err => console.error("Error:", err));`;

const EXPLORE_ASYNC_FETCH = `// Same thing with async/await — much cleaner
async function getPost(id) {
  try {
    const response = await fetch(
      \`https://jsonplaceholder.typicode.com/posts/\${id}\`
    );

    // Always check the status before parsing
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }

    const post = await response.json();
    console.log("Title:", post.title);
    console.log("Body:", post.body);
    return post;
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

getPost(3);`;

const EXPLORE_JSON = `// JSON.parse — string → object
const raw = '{"name":"Sokha","score":95}';
const obj = JSON.parse(raw);
console.log(obj.name, obj.score);

// JSON.stringify — object → string
const data = { city: "Phnom Penh", country: "Cambodia" };
const json = JSON.stringify(data);
console.log(json);

// Pretty-print with indentation
console.log(JSON.stringify(data, null, 2));`;

const CHALLENGE_STARTER = `// Fetch the todo at https://jsonplaceholder.typicode.com/todos/1
// using async/await, then log the result to the console.

async function getTodo() {
  // your code here
}

getTodo();
`;

const challenge = {
  prompt:
    "Fetch `https://jsonplaceholder.typicode.com/todos/1` using async/await and log the result. Your code must contain `fetch(` and `await`.",
  check(_html: string, _css: string, js: string) {
    if (!/\bfetch\s*\(/.test(js))
      return { passed: false, message: "Call `fetch(url)` to make the HTTP request." };
    if (!/\bawait\b/.test(js))
      return { passed: false, message: "Use `await` before `fetch(...)` to wait for the response." };
    return { passed: true, message: "You just consumed a real REST API — that's how every app talks to a server!" };
  },
};

export default function Module03WorkingAPIs() {
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
        <h1 className="text-4xl font-serif text-foreground">Working with APIs</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          APIs are how web apps talk to servers. You will learn the browser's built-in{" "}
          <code className="font-mono text-sm">fetch</code> function, how JSON data flows, and
          the conventions of REST — the design style behind almost every modern web API.
        </p>
      </section>

      {/* What is an API */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">What is an API?</h2>
        <p className="text-base text-muted-foreground">
          An <strong>API</strong> (Application Programming Interface) is a contract between two
          programs. A web API exposes data and actions over HTTP so a browser (or any client)
          can read, create, update, and delete resources without knowing anything about the
          server's internals.
        </p>
        <p className="text-base text-muted-foreground">
          Think of a restaurant: you (the client) give an order to the waiter (the API). The
          waiter goes to the kitchen (the server) and brings back your food (the response). You
          never see how the kitchen works.
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ["Weather API", "Get temperature, forecasts"],
            ["Maps API", "Geocoding, directions"],
            ["Payment API", "Charge a card securely"],
            ["Your own API", "Serve your app's data"],
          ].map(([name, desc]) => (
            <div key={name} className="rounded-xl border border-border px-4 py-3">
              <p className="font-semibold text-foreground">{name}</p>
              <p className="text-muted-foreground mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HTTP basics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">HTTP Basics</h2>
        <p className="text-base text-muted-foreground">
          Every API call is an HTTP request. The <em>method</em> tells the server what action to
          take; the <em>status code</em> in the response tells you whether it worked.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Common HTTP methods
          </div>
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Method</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Action</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {[
                ["GET", "Read data", "GET /users — list users"],
                ["POST", "Create data", "POST /users — create a user"],
                ["PUT", "Replace data", "PUT /users/1 — update whole user"],
                ["PATCH", "Partial update", "PATCH /users/1 — update one field"],
                ["DELETE", "Remove data", "DELETE /users/1"],
              ].map(([m, a, e]) => (
                <tr key={m}>
                  <td className="px-4 py-2 font-mono font-semibold text-foreground">{m}</td>
                  <td className="px-4 py-2">{a}</td>
                  <td className="px-4 py-2">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Status codes to know
          </div>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border text-muted-foreground">
              {[
                ["200", "OK — request succeeded"],
                ["201", "Created — new resource made"],
                ["400", "Bad Request — client sent invalid data"],
                ["401", "Unauthorized — must log in"],
                ["403", "Forbidden — logged in but no permission"],
                ["404", "Not Found — resource doesn't exist"],
                ["500", "Server Error — something broke on the server"],
              ].map(([code, msg]) => (
                <tr key={code}>
                  <td className="px-4 py-2 font-mono font-semibold text-foreground w-20">{code}</td>
                  <td className="px-4 py-2">{msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fetch API */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">The Fetch API</h2>
        <p className="text-base text-muted-foreground">
          <code className="font-mono text-sm">fetch(url)</code> is built into every modern
          browser. It returns a Promise that resolves to a <code className="font-mono text-sm">Response</code>{" "}
          object. You must call <code className="font-mono text-sm">.json()</code> on the response to
          parse the body — that's a second async step.
        </p>

        <CodePlayground mode="js" starter={{ js: EXPLORE_FETCH }} height="180px" />

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            The safe async/await pattern
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`async function fetchData(url) {
  const response = await fetch(url);

  // fetch() only rejects on network failure — not on 404/500.
  // Always check response.ok yourself.
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }

  return response.json();
}`}</pre>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_ASYNC_FETCH }} height="300px" />
      </section>

      {/* JSON */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">JSON</h2>
        <p className="text-base text-muted-foreground">
          JSON (JavaScript Object Notation) is the universal data format for web APIs. It looks
          like a JavaScript object literal but it is always a <em>string</em> when sent over the
          network. Two functions bridge the two forms.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            JSON.parse and JSON.stringify
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`// Network sends a string → parse into a JS object
const obj = JSON.parse('{"name":"Sokha","age":22}');
console.log(obj.name); // "Sokha"

// Sending data → convert to string first
const body = JSON.stringify({ name: "Dara", age: 25 });
// '{"name":"Dara","age":25}'

// Readable output for debugging
console.log(JSON.stringify(obj, null, 2));`}</pre>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_JSON }} height="200px" />
      </section>

      {/* POST, PUT, DELETE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Sending Data</h2>
        <p className="text-base text-muted-foreground">
          For POST, PUT, and PATCH requests you pass an options object to{" "}
          <code className="font-mono text-sm">fetch</code> with the method, headers, and a JSON-encoded body.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            POST — create a resource
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`async function createPost(data) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json();
}

const newPost = await createPost({ title: "Hello", body: "World", userId: 1 });
console.log(newPost); // includes id assigned by server`}</pre>
        </div>
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
        <p className="text-base text-muted-foreground">
          Fetch the todo at{" "}
          <code className="font-mono text-sm">https://jsonplaceholder.typicode.com/todos/1</code>{" "}
          using async/await. Log the full result so you can see the JSON in the console.
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
