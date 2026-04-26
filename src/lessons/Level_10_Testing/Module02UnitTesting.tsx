import React from "react";

export default function Module02UnitTesting() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Unit tests are the fastest feedback loop in software. Write a function, write a
          test, run it in milliseconds, move on. No browser, no server, no database — just
          your code and whether it does what you said it would.
        </p>
      </section>

      {/* ── 2. Vitest setup ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Vitest setup and config</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Vitest is a Vite-native test runner. If your project already uses Vite, add it
          in seconds. If not, it works standalone too.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`npm install -D vitest`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Create <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">vitest.config.ts</code> at the project root.
          Setting <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">globals: true</code> means you don't
          need to import <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">describe</code> and{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">expect</code> in every file.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Add a script to <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">package.json</code>:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm test</code> runs in watch mode (re-runs on file save).{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm run test:run</code> runs once and exits — use this in CI.
        </p>
      </section>

      {/* ── 3. describe / it / expect ──────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">describe, it, expect</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">describe</code> groups related tests.{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">it</code> (alias for{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">test</code>) defines a single test.{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">beforeEach</code> and{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">afterEach</code> run setup and teardown
          around every test in the block.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`describe('formatPrice', () => {
  it('formats a number with two decimal places', () => {
    expect(formatPrice(10)).toBe('$10.00');
  });

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('throws on negative input', () => {
    expect(() => formatPrice(-5)).toThrow('Price cannot be negative');
  });
});`}</pre>
      </section>

      {/* ── 4. Matchers ────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Common matchers</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Vitest ships with all Jest matchers. The ones you'll use 90% of the time:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`expect(result).toBe(42)              // strict equality (===)
expect(obj).toEqual({ a: 1 })        // deep equality
expect(obj).toStrictEqual({ a: 1 })  // deep + checks undefined fields
expect(fn).toThrow('message')        // function throws
expect(fn).toHaveBeenCalledWith(arg) // mock was called with arg
expect(arr).toContain('item')        // array includes value
expect(str).toMatch(/pattern/)       // regex match
expect(value).toBeNull()
expect(value).toBeTruthy()
expect(value).toBeGreaterThan(5)`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">toEqual</code> for objects and arrays.
          Use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">toBe</code> for primitives. Mixing them
          up is a common source of test bugs.
        </p>
      </section>

      {/* ── 5. Mocking ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Mocking with vi.mock, vi.fn, vi.spyOn</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Mocking replaces a dependency so your test controls what it returns and can verify
          how it was called.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import { sendEmail } from './emailService';
import { registerUser } from './userService';

// Replace the entire module
vi.mock('./emailService');

test('sends welcome email after registration', async () => {
  const mockSend = vi.fn().mockResolvedValue({ id: 'msg_123' });
  sendEmail.mockImplementation(mockSend);

  await registerUser({ email: 'a@b.com', name: 'Alice' });

  expect(mockSend).toHaveBeenCalledWith({
    to: 'a@b.com',
    subject: 'Welcome to the app',
  });
});`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">vi.spyOn</code> to wrap a real implementation
          rather than replace it:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import * as db from './db';

test('calls db.save with the right data', () => {
  const spy = vi.spyOn(db, 'save').mockResolvedValue({ id: 1 });

  // ...call code that uses db.save...

  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockRestore(); // always restore spies in afterEach
});`}</pre>
      </section>

      {/* ── 6. Pure functions with edge cases ──────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Testing pure functions thoroughly</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Pure functions — same input always produces same output — are the easiest to test.
          Cover the happy path, then think through edge cases systematically.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`describe('slugify', () => {
  it('lowercases the string', () => {
    expect(slugify('Hello')).toBe('hello');
  });
  it('replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });
  it('collapses multiple spaces', () => {
    expect(slugify('a   b')).toBe('a-b');
  });
  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });
  it('handles leading/trailing spaces', () => {
    expect(slugify('  hello  ')).toBe('hello');
  });
});`}</pre>
      </section>

      {/* ── 7. Async tests ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Testing async functions</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Mark the test function <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">async</code> and
          await your calls. Vitest waits for the promise to settle before checking assertions.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`test('fetches user by id', async () => {
  const user = await getUser(42);
  expect(user.name).toBe('Alice');
});

// Test a promise that should resolve
test('resolves with the correct data', async () => {
  await expect(fetchData()).resolves.toEqual({ status: 'ok' });
});

// Test a promise that should reject
test('rejects when user is not found', async () => {
  await expect(getUser(9999)).rejects.toThrow('User not found');
});`}</pre>
      </section>

      {/* ── 8. Snapshot testing ────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Snapshot testing</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A snapshot test serializes the output of a function on the first run and saves it
          to a file. On subsequent runs it compares the output to the saved snapshot and
          fails if anything changed.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`test('renders the error message', () => {
  const output = renderError({ code: 404, message: 'Not found' });
  expect(output).toMatchSnapshot();
});

// To update snapshots after intentional changes:
// npx vitest run --update-snapshots`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Snapshots help when the output is large and you want to detect accidental changes.
          They hurt when they're updated reflexively without checking what changed — at that
          point they document bugs instead of preventing them.
        </p>
      </section>

    </article>
  );
}
