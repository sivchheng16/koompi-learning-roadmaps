import React from "react";

export default function Module04AuthJWT() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ───────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Never store plaintext passwords. If your database leaks tomorrow,
          every user's email and original password would be exposed to whoever found it.
          Here is what to do instead — and how to prove identity without sending credentials on every request.
        </p>
      </section>

      {/* ── 2. Password hashing with bcrypt ───────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Password hashing with bcrypt</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A <strong className="text-foreground">hash</strong> is a one-way transformation: easy to compute forward,
          computationally infeasible to reverse. bcrypt is the standard choice for passwords because it is
          intentionally slow (making brute-force attacks expensive) and automatically salts the hash
          (preventing precomputed rainbow-table attacks).
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import bcrypt from 'bcrypt';

// On registration — hash before saving
const hash = await bcrypt.hash(password, 10);
// store hash in database, never the original password

// On login — compare submitted password to stored hash
const match = await bcrypt.compare(submittedPassword, storedHash);
if (!match) return res.status(401).json({ error: 'Invalid credentials' });`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The second argument to <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">bcrypt.hash</code> is the
          <strong className="text-foreground"> cost factor</strong> (also called salt rounds). 10 is a safe default —
          it makes each hash take ~100ms on a modern CPU, negligible for legitimate logins but expensive for
          attackers trying millions of guesses.
        </p>
      </section>

      {/* ── 3. JWT structure ──────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">JWT structure</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A <strong className="text-foreground">JSON Web Token</strong> (JWT) is a compact, self-contained token with
          three base64url-encoded parts separated by dots:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   ← Header
.eyJ1c2VySWQiOjQyLCJpYXQiOjE2MzI3NjQ3MjB9  ← Payload
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← Signature`}</pre>
        <ul className="space-y-3 text-base text-muted-foreground">
          <li>
            <strong className="text-foreground">Header</strong> — algorithm (HS256) and token type.
            Decode it: <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&#123;"alg":"HS256","typ":"JWT"&#125;</code>
          </li>
          <li>
            <strong className="text-foreground">Payload</strong> — the claims (data you put in):
            user ID, expiry time, roles. Decode it:
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">&#123;"userId":42,"iat":1632764720,"exp":1633369520&#125;</code>
          </li>
          <li>
            <strong className="text-foreground">Signature</strong> — HMAC of the header + payload with your secret key.
            This is what makes the token tamper-proof. The payload is readable by anyone, but
            cannot be modified without invalidating the signature.
          </li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          Because the payload is only base64-encoded (not encrypted), never put secrets in a JWT.
          User IDs, roles, and expiry times are fine.
        </p>
      </section>

      {/* ── 4. Signing a token ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Signing a token</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Install <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm install jsonwebtoken</code> then sign a token after a successful login:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;   // long random string — keep it secret

const token = jwt.sign(
  { userId: user.id, email: user.email },  // payload
  SECRET,
  { expiresIn: '7d' }                       // token expires in 7 days
);

res.json({ token });`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The secret must be a long, random string stored in an environment variable —
          never hardcoded in source code.
        </p>
      </section>

      {/* ── 5. Verifying a token ──────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Verifying a token</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">jwt.verify</code> checks the signature
          and expiry simultaneously. It throws if either is invalid, so always wrap it in try/catch.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`try {
  const payload = jwt.verify(token, SECRET);
  // payload.userId, payload.email are now available
} catch (err) {
  // JsonWebTokenError — signature invalid
  // TokenExpiredError — token has expired
  res.status(401).json({ error: 'Invalid or expired token' });
}`}</pre>
      </section>

      {/* ── 6. Auth middleware ────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Auth middleware</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Rather than duplicating token verification in every route, extract it into a middleware function
          and attach the verified payload to <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">req.user</code>:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Use it on any route that needs auth
app.get('/api/v1/me', requireAuth, (req, res) => {
  res.json({ data: { userId: req.user.userId } });
});

app.post('/api/v1/posts', requireAuth, async (req, res) => {
  const post = await createPost({ ...req.body, authorId: req.user.userId });
  res.status(201).json({ data: post });
});`}</pre>
      </section>

      {/* ── 7. Refresh tokens ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Refresh tokens</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Short-lived access tokens (15 minutes to 1 hour) limit the damage when one is stolen — it expires soon
          anyway. But users should not have to log in every hour. The solution is a
          <strong className="text-foreground"> refresh token</strong>: a long-lived (e.g. 30-day) token stored
          securely and used only to issue new access tokens.
        </p>
        <ul className="space-y-2 text-base text-muted-foreground list-disc list-inside">
          <li>Access token: short-lived (15m–1h), sent on every API request</li>
          <li>Refresh token: long-lived (7–30d), sent only to <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">/auth/refresh</code></li>
          <li>When the access token expires, the client calls <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">/auth/refresh</code> with the refresh token to get a new access token</li>
          <li>Revoking a refresh token logs the user out regardless of any live access tokens</li>
        </ul>
      </section>

      {/* ── 8. What NOT to do ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What NOT to do</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The most common JWT mistake is storing the token in
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">localStorage</code>.
          Any JavaScript running on your page — including injected scripts from XSS attacks — can read
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">localStorage</code>.
          A stolen token grants full account access until it expires.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-border">
                <th className="text-left px-5 py-3 font-semibold text-foreground">Storage</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">XSS risk</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">CSRF risk</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="px-5 py-3 font-mono">localStorage</td>
                <td className="px-5 py-3 text-red-500">High</td>
                <td className="px-5 py-3 text-green-600">None</td>
                <td className="px-5 py-3 text-red-500">Avoid for auth tokens</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono">httpOnly cookie</td>
                <td className="px-5 py-3 text-green-600">None</td>
                <td className="px-5 py-3 text-yellow-600">Moderate</td>
                <td className="px-5 py-3 text-green-600">Preferred — mitigate CSRF with SameSite</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono">Memory (variable)</td>
                <td className="px-5 py-3 text-yellow-600">Low</td>
                <td className="px-5 py-3 text-green-600">None</td>
                <td className="px-5 py-3">Good for short-lived access tokens</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          The safest approach for most applications: store the refresh token in an
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">httpOnly; SameSite=Strict</code> cookie
          and keep the short-lived access token only in memory.
        </p>
      </section>

    </article>
  );
}
