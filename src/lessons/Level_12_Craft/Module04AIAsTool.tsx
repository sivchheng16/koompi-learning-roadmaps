import React from "react";

export default function Module04AIAsTool() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          AI doesn't replace engineers. It makes the good ones dramatically more productive
          and makes the bad ones confidently wrong.
          Which one you become depends entirely on how you use it.
        </p>
      </section>

      {/* What AI is good at */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">What AI is actually good at</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Use AI without reservation for these:
        </p>
        <div className="space-y-3 text-sm text-muted-foreground">
          {[
            ["Boilerplate", "Generating repetitive code you have written a hundred times — CRUD operations, form validation schemas, test setup, Docker configurations. AI gets these right because they follow predictable patterns."],
            ["First drafts", "A starting point for a function, a component, an API route. You describe what you want, it writes something plausible, you edit it into what you actually need. This is faster than starting from a blank file."],
            ["Explaining code", "Paste a block of unfamiliar code and ask what it does. AI is excellent at this — it can trace the logic, identify the pattern, explain the algorithm. Useful when reading an unfamiliar library or codebase."],
            ["Test cases", "Give it a function and ask for edge cases to test. It will think of things you did not — empty arrays, null inputs, negative numbers, very long strings."],
            ["Syntax search", "How do I do X in Y language? What's the regex for Z? How do you configure this in webpack? These questions have known answers and AI has seen them thousands of times."],
          ].map(([key, val]) => (
            <div key={key} className="flex gap-3 items-start">
              <span className="font-semibold text-foreground shrink-0 w-32">{key}</span>
              <p className="leading-relaxed">{val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What AI gets wrong */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">What AI gets wrong</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          This is the part most developers learn the hard way. AI is confidently wrong in
          specific, predictable ways. Knowing the failure modes is how you avoid them.
        </p>
        <div className="space-y-3 text-sm text-muted-foreground">
          {[
            ["Your business logic", "AI knows nothing about your application's specific rules. It doesn't know that a user with a free plan cannot create more than 3 projects, or that these two states are mutually exclusive. If you describe it poorly, it will generate code that ignores the constraint entirely."],
            ["Recent APIs", "AI has a training cutoff. The Next.js App Router, React 19 APIs, the latest Tailwind v4 changes — if it was added or changed after the cutoff, the AI may generate code using the old API. Always verify against the actual documentation."],
            ["Subtle bugs", "AI-generated code passes the happy path but often misses edge cases. Off-by-one in pagination. Incorrect handling of null. Race conditions in async logic. The code looks right, compiles, and fails in production."],
            ["Security", "AI will write SQL queries, auth logic, and input handling without warning you about injection vulnerabilities, timing attacks, or missing validation. It is not malicious — it is just generating the average of what it has seen, and the average is not hardened."],
          ].map(([key, val]) => (
            <div key={key} className="flex gap-3 items-start">
              <span className="font-semibold text-foreground shrink-0 w-32">{key}</span>
              <p className="leading-relaxed">{val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The verification rule */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">The verification rule</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Never ship code you don't understand.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          If AI wrote it, you still have to read it, understand it, test it, and own it.
          "The AI wrote this" is not an explanation you can give when the code causes an
          incident at 3am. You are the engineer of record. The code that goes out under
          your name is your responsibility.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          This is not an argument against using AI. It is an argument for maintaining
          your own understanding. Read the generated code line by line. Ask yourself if
          you could have written this. If something looks wrong or unclear, investigate
          before shipping.
        </p>
      </section>

      {/* Prompting for code */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Prompting for code</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The quality of output is directly proportional to the quality of your prompt.
          Vague prompts produce vague code.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// Vague — produces generic code that probably doesn't fit
"Write a function to fetch users"

// Better — gives it the constraints it needs
"Write a TypeScript function using fetch() that:
- Takes userId: string as a parameter
- Calls GET /api/users/:id
- Returns Promise<User | null> (null on 404)
- Throws on other error status codes
- Follow this existing pattern:
  [paste a similar function from your codebase]"`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Showing an existing pattern from your codebase is the most powerful move.
          The AI will match your naming conventions, your error handling style, your
          TypeScript patterns. Without it, you get generic code that requires heavy editing.
        </p>
      </section>

      {/* AI for debugging */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Using AI for debugging</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          AI is a useful debugging assistant if you give it the right information.
          Paste the error message plus the relevant code. Describe what you expected to
          happen and what actually happened. Describe what you have already tried.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// Less useful
"My code is broken"

// Actually useful
"I'm getting this error:
  TypeError: Cannot read properties of undefined (reading 'map')
  at UserList (UserList.tsx:14)

Here's the component:
[paste the component]

I expected users to be an array from the API.
I already checked: the API returns 200 and the response body
contains the array. The fetch runs. But users is undefined
when the component renders."}`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          That prompt gives AI everything it needs to identify the cause — likely a missing
          loading state or a state initialization issue.
        </p>
      </section>

      {/* AI for learning */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Using AI for learning</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          This is one of the most underused applications. AI is a tireless explainer that
          adjusts to your level and never makes you feel dumb for asking.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="leading-relaxed font-mono bg-stone-50 border border-border rounded-lg px-4 py-2">
            "Explain what a closure is in simple terms, with a short example"
          </p>
          <p className="leading-relaxed font-mono bg-stone-50 border border-border rounded-lg px-4 py-2">
            "Show me a simpler way to write this — [paste your code]"
          </p>
          <p className="leading-relaxed font-mono bg-stone-50 border border-border rounded-lg px-4 py-2">
            "What are the tradeoffs between using useReducer vs useState for this case?"
          </p>
          <p className="leading-relaxed font-mono bg-stone-50 border border-border rounded-lg px-4 py-2">
            "I understand this code line by line but I don't understand the bigger pattern it's using. What is this pattern called?"
          </p>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          Use AI to fill gaps in your understanding, not to bypass the need for understanding.
        </p>
      </section>

      {/* Dependency trap */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">The dependency trap</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Here is the test: can you debug the code AI wrote for you?
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          If the answer is no — if you can only write code with AI assistance and would be
          stuck without it — you have a problem. Not because AI is going away, but because
          debugging, code review, and extending features all require understanding what the
          code is doing. If you skipped learning that, you cannot do those things.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Use AI to go faster. Do not use it as a substitute for the hard work of
          understanding. The developers who will be most valuable in an AI-augmented world
          are the ones who deeply understand their systems and use AI to amplify that
          understanding — not the ones who use AI to avoid developing understanding in
          the first place.
        </p>
      </section>

      {/* Current tools */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Current tools (2024–2025)</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The landscape changes fast. This is what exists now and what each is best at:
        </p>
        <div className="space-y-3 text-sm text-muted-foreground">
          {[
            ["GitHub Copilot", "Inline autocomplete in your editor. Best for completing lines and small blocks as you type. Integrated directly into VS Code, JetBrains."],
            ["Cursor", "An editor built around AI. Agent mode can make multi-file edits, run commands, and iterate on failures. Best for larger refactors where you want the AI to drive."],
            ["Claude Code", "Terminal-based coding agent. Reads your codebase, makes file edits, runs tests, commits. Best for longer autonomous tasks."],
            ["ChatGPT / Claude.ai", "Web interfaces for open-ended questions, explanations, and code review. Best when you want a conversation, not just a code completion."],
          ].map(([tool, desc]) => (
            <div key={tool} className="flex gap-3 items-start">
              <span className="font-semibold text-foreground shrink-0 w-32">{tool}</span>
              <p className="leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Senior posture */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">The senior engineer posture</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Think of AI as a very smart junior developer who has read every piece of code on
          the internet but has never shipped a production system. They are fast, they are
          knowledgeable about patterns, they write plausible-looking code — but they need
          direction, they miss business context, and they need their work reviewed.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          You are the senior. You provide the direction, the context, and the final review.
          You decide what goes out. That is not going to change — because the responsibility
          for what ships belongs to the engineer, not the tool.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Used that way — as a fast, tireless assistant who needs supervision — AI is one
          of the most powerful tools you will ever have. Used as a replacement for
          thinking, it is how you ship subtle bugs to production with complete confidence.
        </p>
      </section>

    </article>
  );
}
