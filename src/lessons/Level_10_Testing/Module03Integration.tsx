import React from "react";

export default function Module03Integration() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Unit tests pass. The app doesn't work. You've tested every function in isolation
          and missed the fact that the route handler passes the wrong field name to the
          database query. Integration tests catch what unit tests miss.
        </p>
      </section>

      {/* ── 2. What integration tests check ───────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What integration tests check</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          An integration test exercises multiple modules working together — usually a whole
          request/response cycle: the HTTP layer, the business logic, and the database
          query. You're testing that the pieces connect correctly.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Common targets: API route handlers, database repositories, authentication
          middleware, and any code that coordinates between two or more external systems.
        </p>
      </section>

      {/* ── 3. supertest ───────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Testing Express APIs with supertest</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">supertest</strong> lets you send HTTP requests to your Express app in tests without
          starting a real server. It handles the server lifecycle for you.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`npm install -D supertest @types/supertest`}</pre>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import request from 'supertest';
import { app } from '../src/app'; // your Express app, not app.listen()

test('POST /users creates a user', async () => {
  const res = await request(app)
    .post('/users')
    .send({ name: 'Alice', email: 'a@b.com' });

  expect(res.status).toBe(201);
  expect(res.body.name).toBe('Alice');
  expect(res.body.id).toBeDefined();
});

test('GET /users/:id returns 404 for unknown user', async () => {
  const res = await request(app).get('/users/999999');
  expect(res.status).toBe(404);
  expect(res.body.error).toBe('User not found');
});`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The key is exporting your app without calling{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">app.listen()</code>. Keep the listen call
          in a separate entry point so tests can import the app directly.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// src/app.ts — exported for tests
export const app = express();
app.use('/users', usersRouter);

// src/server.ts — entry point, not imported in tests
import { app } from './app';
app.listen(3000);`}</pre>
      </section>

      {/* ── 4. Real vs mocked database ─────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Real database vs mocked database — tradeoffs</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Real database (recommended)</p>
            <p className="text-sm text-muted-foreground mt-1">
              Tests run against an actual database instance (usually in Docker). You get
              real SQL behavior, constraint enforcement, and migrations. Slower to set up
              but catches real bugs. This is what integration tests are for.
            </p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Mocked database</p>
            <p className="text-sm text-muted-foreground mt-1">
              You replace the database client with a mock. Faster and simpler, but you're
              testing your code's interaction with a mock — not with the real database.
              A missing index or a constraint violation will never surface.
            </p>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          For unit tests, mock the database. For integration tests, use a real one. The
          distinction matters: integration tests that mock the database are just slower
          unit tests.
        </p>
      </section>

      {/* ── 5. Test database setup ─────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Test database setup: seed, clean, repeat</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Use a separate database for tests — never run tests against your development or
          production database. Set the connection string via an environment variable.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# .env.test
DATABASE_URL=postgres://localhost:5432/myapp_test`}</pre>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// vitest.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    env: loadEnv('test', process.cwd(), ''),
  },
});`}</pre>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// tests/setup.ts
import { db } from '../src/db';

beforeEach(async () => {
  // seed baseline data
  await db.query(\`
    INSERT INTO users (id, name, email)
    VALUES (1, 'Seed User', 'seed@test.com')
    ON CONFLICT DO NOTHING
  \`);
});

afterEach(async () => {
  // wipe tables so each test starts fresh
  await db.query('TRUNCATE users, posts CASCADE');
});

afterAll(async () => {
  await db.end();
});`}</pre>
      </section>

      {/* ── 6. Testing auth flows ──────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Testing auth flows within the API</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Auth flows — login, token validation, protected routes — are high-value integration
          test targets. Test the full cycle: register, log in, use the token, call a
          protected endpoint, verify the response.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`describe('auth flow', () => {
  it('issues a token on successful login', async () => {
    // seed a user first
    await db.query(
      "INSERT INTO users (email, password_hash) VALUES ('a@b.com', $1)",
      [await bcrypt.hash('secret', 10)]
    );

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'a@b.com', password: 'secret' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('rejects requests to protected routes without a token', async () => {
    const res = await request(app).get('/me');
    expect(res.status).toBe(401);
  });

  it('allows access with a valid token', async () => {
    const token = await loginAndGetToken('a@b.com', 'secret');

    const res = await request(app)
      .get('/me')
      .set('Authorization', \`Bearer \${token}\`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe('a@b.com');
  });
});`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Extract helper functions like <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">loginAndGetToken</code> into
          a shared test utilities file. Tests should read like specs, not setup scripts.
        </p>
      </section>

    </article>
  );
}
