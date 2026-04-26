import React from "react";

export default function Module04E2E() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          An E2E test is the only test that proves a real user can actually do the thing.
          Not that the function returns the right value — that a person can open a browser,
          log in, buy a product, and receive a confirmation. Everything else is inference.
        </p>
      </section>

      {/* ── 2. Playwright setup ────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Playwright setup</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Playwright is the most capable E2E framework available. It drives real Chromium,
          Firefox, and WebKit browsers — and it has first-class TypeScript support.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`npm init playwright@latest
# choose TypeScript, add a GitHub Actions workflow, install browsers`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The init command creates <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">playwright.config.ts</code>,
          an example test, and a GitHub Actions workflow. Set the{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">baseURL</code> to your dev server so you
          can use relative paths in tests.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// playwright.config.ts
export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});`}</pre>
      </section>

      {/* ── 3. Writing a test ──────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Writing a test</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Each test receives a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">page</code> object that
          represents an open browser tab. You navigate, interact, and assert all through this object.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name=email]', 'user@example.com');
  await page.fill('[name=password]', 'password');
  await page.click('button[type=submit]');
  await expect(page).toHaveURL('/dashboard');
});`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Playwright automatically waits for elements to appear before interacting. You
          rarely need explicit sleeps — they're a sign that you're fighting the framework.
        </p>
      </section>

      {/* ── 4. Locators ────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Locators: finding elements the right way</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Playwright's preferred locators match how users perceive the page — by role, label,
          and visible text. Avoid CSS selectors that break when you rename a class.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// preferred — resilient to markup changes
page.getByRole('button', { name: 'Sign in' })
page.getByLabel('Email address')
page.getByText('Welcome back')
page.getByTestId('submit-button')  // data-testid attribute

// acceptable — when semantic locators aren't available
page.locator('input[name=email]')

// avoid — fragile
page.locator('.btn-primary.mt-4 > span')`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Add <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">data-testid</code> attributes to elements
          that are hard to target semantically. It's a small cost for a resilient test.
        </p>
      </section>

      {/* ── 5. Page Object Model ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Page Object Model</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          When you have five tests that all log in, you don't want the login selectors
          duplicated in five places. The Page Object Model encapsulates all the selectors
          and actions for a page in a class.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// tests/pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[name=email]', email);
    await this.page.fill('[name=password]', password);
    await this.page.click('button[type=submit]');
  }
}

// tests/login.spec.ts
test('logs in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password');
  await expect(page).toHaveURL('/dashboard');
});`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          When a selector changes, you update one class — not every test file that uses the login flow.
        </p>
      </section>

      {/* ── 6. Running in CI ───────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Running in CI — headless mode and GitHub Actions</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Playwright runs headless by default in CI. The init command creates a ready-to-use
          GitHub Actions workflow — here's the key part:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Upload the Playwright report as an artifact on failure. It includes screenshots
          and traces that show exactly what the browser saw when the test broke.
        </p>
      </section>

      {/* ── 7. Visual regression ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Visual regression testing</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Playwright can take screenshots and compare them pixel-by-pixel against a saved
          baseline. This catches unintended visual changes — a button that shifted, a color
          that changed, a layout that broke on mobile.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`test('homepage looks correct', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});

// To update baselines after intentional design changes:
// npx playwright test --update-snapshots`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Visual tests are noisy — minor rendering differences across OS and font versions
          cause false failures. Use a threshold to ignore tiny differences, and only
          screenshot the most stable, important views.
        </p>
      </section>

      {/* ── 8. When to use E2E ─────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">When E2E is too slow — use it for critical paths only</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          E2E tests are slow, flaky, and expensive to maintain. Don't try to cover every
          feature. Cover the paths that must never break:
        </p>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span>Sign up / log in / log out</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span>Checkout / payment flow</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span>The core action users do every day</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span>Any flow that involves money or irreversible actions</span></li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          Everything else can be covered by unit and integration tests. A suite of ten
          focused E2E tests that runs in three minutes is worth more than fifty broad tests
          that take forty minutes and fail randomly.
        </p>
      </section>

    </article>
  );
}
