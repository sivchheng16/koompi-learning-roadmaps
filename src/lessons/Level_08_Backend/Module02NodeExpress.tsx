import React from "react";

export default function Module02NodeExpress() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ───────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Node.js lets JavaScript run outside the browser — on your server.
          The same language you used to animate a button can now read a database, send an email,
          and serve a thousand requests per second.
        </p>
      </section>

      {/* ── 2. Node.js basics ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Node.js basics</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Node.js is a JavaScript runtime built on Chrome's V8 engine. You run a file with
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">node index.js</code> and it executes
          top to bottom, just like a browser running a script — except there is no DOM, no
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">window</code>, and no user interaction.
          Instead you get <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">process</code>,
          the file system, and a networking stack.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// Read environment variables
const port = process.env.PORT ?? 3000;
const secret = process.env.JWT_SECRET;

// Node runs this file directly — no browser needed
console.log(\`Starting on port \${port}\`);`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Node supports two module systems. <strong className="text-foreground">CommonJS</strong> (the original)
          uses <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">require()</code> and
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">module.exports</code>.
          <strong className="text-foreground"> ESM</strong> (the modern standard) uses
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">import</code> /
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">export</code> — the same syntax
          you use in the browser. New projects should use ESM; set
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">"type": "module"</code> in
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">package.json</code>.
        </p>
      </section>

      {/* ── 3. Express ────────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Express — the minimal web framework</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Express is a thin layer on top of Node's built-in HTTP module. It handles routing,
          middleware, and request parsing — and stays out of your way for everything else.
        </p>
        <pre className="rounded-xl bg-[#1e1e2e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import express from 'express';

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Define a route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello!' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Install it with <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm install express</code>.
          That is the entire setup. No config files, no generators required.
        </p>
      </section>

      {/* ── 4. req and res ────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">req and res</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every route handler receives two objects. <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">req</code> (request)
          describes what the client sent. <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">res</code> (response)
          is what you use to reply.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">req — incoming data</div>
            <ul className="p-4 space-y-2 text-sm text-muted-foreground font-mono">
              <li>req.method</li>
              <li>req.url</li>
              <li>req.headers</li>
              <li>req.params</li>
              <li>req.query</li>
              <li>req.body</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">res — outgoing reply</div>
            <ul className="p-4 space-y-2 text-sm text-muted-foreground font-mono">
              <li>res.status(201)</li>
              <li>res.json(&#123; ... &#125;)</li>
              <li>res.send('text')</li>
              <li>res.set('Header', 'value')</li>
              <li>res.redirect('/new-url')</li>
              <li>res.end()</li>
            </ul>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          You can chain <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">res.status()</code> before
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">res.json()</code>:
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">res.status(404).json(&#123; error: 'Not found' &#125;)</code>.
        </p>
      </section>

      {/* ── 5. Route parameters ───────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Route parameters</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A colon in the route path declares a <strong className="text-foreground">named segment</strong>.
          Express captures the actual value and puts it in
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">req.params</code>.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`app.get('/users/:id', (req, res) => {
  const userId = req.params.id;   // "42" (always a string)
  res.json({ userId });
});

// GET /users/42  →  { "userId": "42" }`}</pre>
      </section>

      {/* ── 6. Query strings ──────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Query strings</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Query parameters come after the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">?</code> in
          the URL and live in <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">req.query</code>.
          They are ideal for optional filters, search terms, and pagination.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`app.get('/search', (req, res) => {
  const { q, page = '1' } = req.query;
  res.json({ query: q, page: Number(page) });
});

// GET /search?q=hello&page=2  →  { "query": "hello", "page": 2 }`}</pre>
      </section>

      {/* ── 7. Request body ───────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Request body</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          POST and PATCH requests carry data in the body.
          The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">express.json()</code> middleware
          parses it automatically and puts the result in
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">req.body</code>.
          Without it, <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">req.body</code> is undefined.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`app.use(express.json());   // must be before your routes

app.post('/posts', (req, res) => {
  const { title, body } = req.body;
  // title and body are now JavaScript values
  res.status(201).json({ title, body });
});`}</pre>
      </section>

      {/* ── 8. Error handling ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Error handling</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Express error handlers are distinguished by having <strong>four arguments</strong>:
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">(err, req, res, next)</code>.
          Register them after all your routes. When any route calls
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">next(err)</code> or throws
          (inside an async wrapper), Express forwards the error here.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// Catch async errors — call next(err) from route handlers
app.get('/posts/:id', async (req, res, next) => {
  try {
    const post = await getPost(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json({ data: post });
  } catch (err) {
    next(err);   // hand off to the error handler below
  }
});

// Error handler — must have exactly 4 params
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});`}</pre>
      </section>

      {/* ── 9. Project structure ──────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Project structure</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A flat <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">index.js</code> works for
          experiments, but a real API needs organisation. The convention that scales well:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`src/
├── index.js          ← app entry point (listen here)
├── app.js            ← express setup, middleware registration
├── routes/
│   ├── auth.js       ← POST /auth/login, /auth/register
│   └── posts.js      ← CRUD for /posts
├── controllers/
│   ├── auth.js       ← handler functions for auth routes
│   └── posts.js      ← handler functions for post routes
└── middleware/
    ├── requireAuth.js ← JWT verification
    └── validate.js    ← Zod input validation`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          Routes declare the URL and method, then delegate to a controller function.
          Controllers contain the business logic. Middleware functions are reusable steps
          that run before (or after) your controllers.
        </p>
      </section>

    </article>
  );
}
