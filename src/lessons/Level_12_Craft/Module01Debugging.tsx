import React from "react";

export default function Module01Debugging() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Debugging is not luck. It is not staring at the screen until something clicks.
          It is a skill with a method — and once you have the method, bugs stop feeling
          like disasters and start feeling like puzzles.
        </p>
      </section>

      {/* Read the error */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Read the error message first</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          This sounds obvious. Most developers do not do it. They see red text, panic,
          and immediately start changing things at random.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Read the entire error. The type, the message, and especially the stack trace.
          The stack trace is a list of function calls that led to the failure, with file
          names and line numbers. The actual bug is almost always one of the top three
          frames — usually the first one that is your code rather than a library.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (UserList.tsx:14:18)    ← your code, line 14
    at renderWithHooks (react-dom.js)
    at commitRoot (react-dom.js)`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          This error tells you everything: <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">users</code> is{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">undefined</code> on line 14 of UserList.tsx.
          You are calling <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.map()</code> on it.
          The fix is not random — it is specific.
        </p>
      </section>

      {/* Reproduce */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Reproduce it reliably</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          If you cannot reproduce the bug consistently, you cannot fix it — you can only
          hope it goes away, which is not engineering, it is prayer.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Narrow the conditions. Ask: does it happen every time, or only sometimes?
          Only on certain inputs? Only after a specific sequence of actions? Only in
          production, not locally? Each answer eliminates a category of causes.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Intermittent bugs are almost always timing issues — race conditions, async
          operations completing in the wrong order, or data that arrives later than you
          assumed. Knowing this narrows the search dramatically.
        </p>
      </section>

      {/* Scientific method */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">The scientific method</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Good debugging follows the same structure as science. Not intuition — method.
        </p>
        <div className="space-y-3">
          {[
            ["Observe", "What exactly is happening? What did you expect?"],
            ["Hypothesize", "Form a specific guess about the cause. Not 'something is wrong' — 'I think users is undefined because the fetch hasn't completed yet'."],
            ["Predict", "If your hypothesis is correct, what else must be true? What should you see in the logs?"],
            ["Test", "Make the smallest change that would confirm or deny your hypothesis."],
            ["Observe again", "Did it behave as predicted? If yes, you found the cause. If no, update the hypothesis."],
          ].map(([step, desc]) => (
            <div key={step} className="flex gap-4 items-start">
              <span className="text-xs font-mono font-semibold text-primary shrink-0 mt-1 w-24">{step}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          The key discipline is testing one hypothesis at a time. When you change three
          things simultaneously and the bug goes away, you learned nothing — and you will
          not be able to reproduce the fix next time.
        </p>
      </section>

      {/* Isolate */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Isolate the problem</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          When you cannot find the bug, make the reproduction smaller. Comment out code.
          Remove data. Strip the component down to its skeleton. At each step, check
          whether the bug is still present.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          If the bug disappears when you remove a block of code, the bug is in that block.
          If it persists with only 3 lines remaining, those 3 lines contain everything
          you need. You have isolated it.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          This process of creating a <strong className="text-foreground">minimal reproduction</strong> is
          also how you prepare to ask for help — more on that below.
        </p>
      </section>

      {/* DevTools */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Browser DevTools</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          DevTools is your most powerful debugging environment. Use it, not just as a
          place to see errors, but as an active investigation tool.
        </p>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3 items-start">
            <span className="font-mono font-semibold text-foreground shrink-0 w-32">Breakpoints</span>
            <p className="leading-relaxed">Click a line number in the Sources tab to pause execution there. The page freezes, and you can inspect every variable in scope.</p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-mono font-semibold text-foreground shrink-0 w-32">Watch expressions</span>
            <p className="leading-relaxed">Add variables to the Watch panel. Their values update as you step through code.</p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-mono font-semibold text-foreground shrink-0 w-32">Call stack</span>
            <p className="leading-relaxed">When paused, the call stack shows the sequence of function calls that led here. Click any frame to inspect that context.</p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-mono font-semibold text-foreground shrink-0 w-32">Network tab</span>
            <p className="leading-relaxed">See every HTTP request, its status code, headers, and response body. When the API call fails, the answer is in here.</p>
          </div>
        </div>
      </section>

      {/* console.log */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">console.log is valid</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          There is a certain developer who sneers at console.log and insists on using the
          debugger for everything. Ignore that developer. Professional engineers with 20
          years of experience use console.log all the time. It is fast, it is portable,
          and it works everywhere.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The technique: log intermediate values at each stage of a transformation. When
          the output is wrong, scan the logs from top to bottom. The first log where
          the value looks wrong is where the bug is.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`async function loadUser(id) {
  console.log("loadUser called with id:", id);

  const res = await fetch(\`/api/users/\${id}\`);
  console.log("response status:", res.status);

  const data = await res.json();
  console.log("raw data from API:", data);

  const user = formatUser(data);
  console.log("formatted user:", user);

  return user;
}`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Log early. Log often. Remove them when you are done.
        </p>
      </section>

      {/* debugger statement */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">The debugger statement</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          If you open DevTools and add <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">debugger;</code>{" "}
          anywhere in your code, execution will pause exactly there — as if you set a
          breakpoint manually. Useful when you cannot easily find the file in Sources, or
          when you want to pause inside a callback or async function.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`function processOrder(order) {
  debugger; // ← execution pauses here in DevTools
  const total = order.items.reduce((sum, item) => sum + item.price, 0);
  return total;
}`}</pre>
      </section>

      {/* Common patterns */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Common bug patterns</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Most bugs are not novel. Once you have seen these patterns, you recognize them
          instantly.
        </p>
        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Off-by-one errors</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You loop from 0 to <code className="bg-stone-100 px-1 rounded">length</code> instead of{" "}
              <code className="bg-stone-100 px-1 rounded">length - 1</code>. Or you use{" "}
              <code className="bg-stone-100 px-1 rounded">&lt;</code> when you meant{" "}
              <code className="bg-stone-100 px-1 rounded">&lt;=</code>. Draw the boundary conditions on paper.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Async ordering issues</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You read state that hasn't loaded yet. A second fetch overwrites a first one's result.
              You called a function before an effect ran. The rule: never assume async operations
              complete in the order you started them.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Stale closures</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In React, a callback captures the value of a variable at the time it was created.
              If the variable changes and the callback does not re-create, it still sees the old
              value. This is the most common React bug. The fix is usually a{" "}
              <code className="bg-stone-100 px-1 rounded">useCallback</code> dependency array or a ref.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Undefined before data loads</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You render a component before its data arrives from the API. The initial render
              sees <code className="bg-stone-100 px-1 rounded">undefined</code>, crashes, and you
              never see the loaded state. Guard with a loading check or optional chaining.
            </p>
          </div>
        </div>
      </section>

      {/* Asking for help */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">When to ask for help</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          After 20–30 minutes of genuine effort. Not 5 minutes of Googling and giving up,
          and not 3 hours of suffering alone to prove you can figure it out.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          When you ask, explain what you tried. "I'm getting this error" is not a question —
          it is a complaint. "I'm getting this error. I checked the network tab and the API
          is returning 200. I logged the response and the data looks correct. But the
          component is still showing undefined. My hypothesis is that the state update is
          not triggering a re-render. What am I missing?" — that is a question.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Half the time, writing that explanation causes you to find the answer yourself
          before you finish writing it. This is called rubber duck debugging, and it works.
        </p>
      </section>

    </article>
  );
}
