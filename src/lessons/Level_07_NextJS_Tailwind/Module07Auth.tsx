import React from "react";

export default function Module07Auth() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Authentication with Auth.js</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Authentication is the hardest thing to get right. Auth.js (NextAuth v5) handles the hard parts — OAuth flows, session management, CSRF protection — so you can focus on your app.
        </p>
      </section>

      {/* Installing */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Installing Auth.js</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Auth.js v5 is the current major version (still in beta at time of writing, but stable for production use). It ships as <code className="bg-stone-100 px-1 rounded text-xs font-mono">next-auth@beta</code>.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`npm install next-auth@beta`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You also need a secret — a random string used to sign session tokens. Generate one and add it to your environment:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# .env.local
AUTH_SECRET=your-random-secret-here   # openssl rand -base64 32
AUTH_GITHUB_ID=your-github-oauth-app-id
AUTH_GITHUB_SECRET=your-github-oauth-app-secret`}</pre>
      </section>

      {/* Config */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">auth.ts Config</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Create an <code className="bg-stone-100 px-1 rounded text-xs font-mono">auth.ts</code> file at the project root. It exports four named values — <code className="bg-stone-100 px-1 rounded text-xs font-mono">handlers</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">auth</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">signIn</code>, and <code className="bg-stone-100 px-1 rounded text-xs font-mono">signOut</code> — that you use throughout your app.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// auth.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
});`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Providers are pre-built OAuth integrations. Auth.js ships with dozens: GitHub, Google, Discord, Twitter, and more. You can also configure credentials-based (email + password) auth.
        </p>
      </section>

      {/* Route handler */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Route Handler</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Auth.js needs a catch-all route handler to process OAuth callbacks, sign-in/sign-out requests, and session checks. Create this file exactly as shown — the path is significant.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth';

export const { GET, POST } = handlers;`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Auth.js will now handle <code className="bg-stone-100 px-1 rounded text-xs font-mono">/api/auth/signin</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">/api/auth/callback/github</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">/api/auth/signout</code>, and related endpoints automatically.
        </p>
      </section>

      {/* Reading the session */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Reading the Session</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          How you read the session depends on where you are in the component tree.
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Server Components — use <code className="bg-stone-100 px-1 rounded text-xs font-mono">auth()</code></p>
            <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// app/dashboard/page.tsx
import { auth } from '@/auth';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <p>Please sign in.</p>;
  }

  return <p>Welcome, {session.user?.name}!</p>;
}`}</pre>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Client Components — use <code className="bg-stone-100 px-1 rounded text-xs font-mono">useSession()</code></p>
            <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`'use client';
import { useSession } from 'next-auth/react';

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <span>Loading…</span>;
  if (!session) return <a href="/api/auth/signin">Sign in</a>;

  return <span>{session.user?.name}</span>;
}`}</pre>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The session object shape: <code className="bg-stone-100 px-1 rounded text-xs font-mono">{`{ user: { name, email, image }, expires }`}</code>. You can extend it with callbacks (see below).
        </p>
      </section>

      {/* Middleware */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Protecting Routes with Middleware</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The most efficient way to protect pages is middleware — it runs at the edge before the page renders, so unauthenticated users never reach the page component.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// middleware.ts  (project root)
export { auth as middleware } from './auth';

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Auth.js will redirect unauthenticated visitors to the sign-in page. The <code className="bg-stone-100 px-1 rounded text-xs font-mono">matcher</code> controls which routes are protected — unmatched routes are public.
        </p>
      </section>

      {/* Callbacks */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Callbacks</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Callbacks let you customise what ends up in the token and session. This is how you add a user ID, role, or custom field from your database to every session.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// auth.ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user }) {
      // 'user' is only present on sign-in — persist needed fields into the token
      if (user) {
        token.id = user.id;
        token.role = 'member'; // or fetch from your DB
      }
      return token;
    },
    async session({ session, token }) {
      // Expose token fields to the client-side session object
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
  },
});`}</pre>
        <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
          Extend the TypeScript types too — add <code className="bg-amber-100 px-1 rounded text-xs font-mono">declare module 'next-auth'</code> with your extra fields, otherwise TypeScript will complain about <code className="bg-amber-100 px-1 rounded text-xs font-mono">session.user.id</code> not existing.
        </div>
      </section>

      {/* Database sessions */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Database Sessions</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By default Auth.js stores session data in a JWT cookie — no database required. For apps where you need to revoke sessions or store more user data, switch to database sessions using an adapter.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`npm install @auth/prisma-adapter
# or
npm install @auth/supabase-adapter`}</pre>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: { strategy: 'database' },
});`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Auth.js will create and manage <code className="bg-stone-100 px-1 rounded text-xs font-mono">User</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">Account</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">Session</code>, and <code className="bg-stone-100 px-1 rounded text-xs font-mono">VerificationToken</code> tables in your database automatically.
        </p>
      </section>

      {/* Sign in/out buttons */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Sign In / Sign Out Buttons</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In Server Components, call <code className="bg-stone-100 px-1 rounded text-xs font-mono">signIn()</code> and <code className="bg-stone-100 px-1 rounded text-xs font-mono">signOut()</code> directly inside a server action.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import { signIn, signOut, auth } from '@/auth';

export default async function AuthButtons() {
  const session = await auth();

  if (session) {
    return (
      <form action={async () => { 'use server'; await signOut(); }}>
        <button type="submit">Sign out</button>
      </form>
    );
  }

  return (
    <form action={async () => { 'use server'; await signIn('github'); }}>
      <button type="submit">Sign in with GitHub</button>
    </form>
  );
}`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In Client Components, redirect to <code className="bg-stone-100 px-1 rounded text-xs font-mono">/api/auth/signin</code> or call <code className="bg-stone-100 px-1 rounded text-xs font-mono">signIn()</code> / <code className="bg-stone-100 px-1 rounded text-xs font-mono">signOut()</code> from <code className="bg-stone-100 px-1 rounded text-xs font-mono">next-auth/react</code>.
        </p>
      </section>

    </article>
  );
}
