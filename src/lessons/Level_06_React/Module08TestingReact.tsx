import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function Module08TestingReact() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
          Module 08 — React Fundamentals
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Testing React Components
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          If your unit tests pass but users can't click the button, your tests are testing
          the wrong thing. The most valuable React tests simulate what a real user does —
          they find an element on screen and interact with it, just like a person would.
        </p>
      </section>

      {/* Philosophy */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">React Testing Library philosophy</h2>
        <p className="text-muted-foreground leading-relaxed">
          <a
            href="https://testing-library.com/docs/react-testing-library/intro/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline underline-offset-2"
          >
            React Testing Library
          </a>{" "}
          (RTL) is built on one guiding principle:
        </p>
        <blockquote className="border-l-4 border-blue-400 pl-5 text-muted-foreground italic">
          "The more your tests resemble the way your software is used, the more confidence they give you."
        </blockquote>
        <p className="text-muted-foreground leading-relaxed">
          That means you should never query a DOM node by its CSS class or test whether an
          internal state variable changed. Instead, query elements the way a screen reader or
          user would — by their visible text, label, or ARIA role — and interact with them
          by clicking, typing, and submitting.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Don't test implementation details — test what the user sees and can do.",
            "Avoid querySelector('.my-class') — use semantic queries like getByRole.",
            "A refactor that doesn't change behavior should not break tests.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-blue-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Setup</h2>
        <p className="text-muted-foreground leading-relaxed">
          Install RTL and the user-event library. Vitest (bundled with Vite) handles test
          running; Jest works too.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`npm install --save-dev @testing-library/react @testing-library/user-event`}
        </pre>
        <p className="text-sm text-muted-foreground">
          If you're using Vitest, also add{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">@testing-library/jest-dom</code>{" "}
          for matchers like{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">toBeInTheDocument()</code>, and
          import it in your Vitest setup file:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// vitest.setup.ts
import '@testing-library/jest-dom';`}
        </pre>
      </section>

      {/* Queries */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Queries — how to find elements</h2>
        <p className="text-muted-foreground leading-relaxed">
          RTL exposes a <code className="font-mono bg-stone-100 px-1 rounded">screen</code> object
          with query functions. Use them in priority order:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-6 font-semibold text-foreground">Query</th>
                <th className="text-left py-2 font-semibold text-foreground">When to use</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["getByRole", "Best choice — finds by ARIA role (button, heading, textbox…)"],
                ["getByLabelText", "Form inputs with associated <label>"],
                ["getByText", "Non-interactive elements with visible text content"],
                ["getByPlaceholderText", "Inputs when no label exists (less ideal)"],
                ["getByTestId", "Last resort only — requires data-testid attribute in prod code"],
              ].map(([query, desc]) => (
                <tr key={query} className="border-b border-border/50">
                  <td className="py-2 pr-6 font-mono text-xs">{query}</td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          <code className="font-mono bg-stone-100 px-1 rounded">getByRole</code> is preferred
          because it forces you to write accessible HTML — if a button has no accessible name,
          your test fails and so does your accessibility.
        </p>
      </section>

      {/* First test */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Your first component test</h2>
        <p className="text-muted-foreground leading-relaxed">
          Render the component, find what the user would see, assert it's there.
          Three lines of logic — render, query, expect.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(
    screen.getByRole('button', { name: /click me/i })
  ).toBeInTheDocument();
});`}
        </pre>
        <p className="text-sm text-muted-foreground">
          The <code className="font-mono bg-stone-100 px-1 rounded">/click me/i</code> is a
          case-insensitive regex — it matches "Click me", "CLICK ME", or "click me". Prefer
          regex over exact strings so minor copy changes don't break tests.
        </p>
      </section>

      {/* Firing events */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Firing events with userEvent</h2>
        <p className="text-muted-foreground leading-relaxed">
          <code className="font-mono bg-stone-100 px-1 rounded">userEvent</code> simulates real
          browser interactions — focus, hover, keyboard events — not just DOM events.
          Always use it over the lower-level{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">fireEvent</code>.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('increments counter on click', async () => {
  render(<Counter />);

  await userEvent.click(
    screen.getByRole('button', { name: /increment/i })
  );

  expect(screen.getByText('1')).toBeInTheDocument();
});`}
        </pre>
        <p className="text-sm text-muted-foreground">
          Note the <code className="font-mono bg-stone-100 px-1 rounded">async/await</code> —
          userEvent v14+ is fully async because real browser interactions are asynchronous.
          Always await it.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Testing a form</h2>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`test('submits the form with the typed value', async () => {
  render(<SearchForm />);

  await userEvent.type(
    screen.getByLabelText(/search/i),
    'React hooks'
  );
  await userEvent.click(
    screen.getByRole('button', { name: /search/i })
  );

  expect(screen.getByText(/results for: react hooks/i))
    .toBeInTheDocument();
});`}
        </pre>
      </section>

      {/* Mocking API calls */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Mocking API calls</h2>
        <p className="text-muted-foreground leading-relaxed">
          Components that fetch data need their API calls mocked in tests — you don't want
          real network requests in a unit test. With Vitest, use{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">vi.mock</code> to replace the
          fetch or a specific module.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import UserProfile from './UserProfile';

// Mock the global fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ name: 'Dara Sok' }),
  })
) as unknown as typeof fetch;

test('displays fetched user name', async () => {
  render(<UserProfile userId="1" />);

  // findBy* waits for the element to appear (async)
  expect(await screen.findByText('Dara Sok')).toBeInTheDocument();
});`}
        </pre>
        <p className="text-sm text-muted-foreground">
          For larger projects,{" "}
          <a
            href="https://mswjs.io/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline underline-offset-2"
          >
            Mock Service Worker (MSW)
          </a>{" "}
          is the recommended approach — it intercepts at the network level so your component
          code never changes.
        </p>
      </section>

      {/* Async testing */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Async testing — waitFor and findBy</h2>
        <p className="text-muted-foreground leading-relaxed">
          When content appears after a state update or async operation, you need to wait for it.
          RTL gives you two tools:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">
{`// findBy* = getBy* + automatic waiting (preferred for single elements)
const heading = await screen.findByRole('heading', { name: /welcome/i });

// waitFor = run assertions repeatedly until they pass or timeout
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});`}
        </pre>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "findBy* is shorthand for waitFor + getBy* — use it when you're waiting for one element.",
            "waitFor is flexible — wrap any assertion inside it when timing is unpredictable.",
            "Default timeout is 1000ms; pass { timeout: 3000 } as a second argument if needed.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-blue-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What not to test */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">What not to test</h2>
        <p className="text-muted-foreground leading-relaxed">
          Knowing what to skip is just as important as knowing what to write.
          Over-testing implementation details creates fragile tests that break on every refactor
          — even when nothing user-facing changed.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-6 font-semibold text-foreground">Skip this</th>
                <th className="text-left py-2 font-semibold text-foreground">Reason</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["CSS classes / inline styles", "Visual appearance belongs in visual tests (Storybook, Chromatic)"],
                ["Component internal state variables", "Users don't see state — test what state produces on screen"],
                ["Prop types / TypeScript types", "TypeScript already catches these at compile time"],
                ["Third-party library internals", "Trust that React Router, Zustand, etc. have their own tests"],
                ["Every single edge case exhaustively", "Focus on the critical happy path and the most likely failures"],
              ].map(([skip, reason]) => (
                <tr key={skip} className="border-b border-border/50">
                  <td className="py-2 pr-6">{skip}</td>
                  <td className="py-2">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-4 px-6 py-5 rounded-2xl bg-stone-50 border border-border">
        <h2 className="text-base font-semibold text-foreground">Key takeaways</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Use getByRole first — it rewards accessible HTML and mirrors how users navigate.",
            "Use userEvent over fireEvent — it's closer to real browser behavior.",
            "Use findBy* or waitFor for anything that appears asynchronously.",
            "Mock at the boundary (fetch / module) not inside the component.",
            "A test that only breaks when user-visible behavior changes is a good test.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
