import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

export default function Module05Deployment() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);
  const CORRECT = "next build";

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Deploying Next.js</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Deploying a Next.js app means running <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">next build</code> to compile your project for production, then serving it with either a managed platform (Vercel, Railway) or your own Docker container.
        </p>
      </section>

      {/* Build first */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Step 1 — Build Locally First</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Always run a production build locally before deploying. It catches TypeScript errors, missing environment variables, and bundle-size surprises that the dev server hides.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
          <div className="px-5 py-4 space-y-1 leading-relaxed">
            <div><span className="text-green-400">$</span> npm run build</div>
            <div className="text-stone-400">  ▲ Next.js 14.x</div>
            <div className="text-stone-400">  Creating an optimized production build ...</div>
            <div className="text-stone-400">  ✓ Compiled successfully</div>
            <div className="mt-2"><span className="text-green-400">$</span> npm start</div>
            <div className="text-stone-400">  ▲ Next.js 14.x</div>
            <div className="text-stone-400">  - Local: http://localhost:3000</div>
          </div>
        </div>
        <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
          Fix every build error before deploying. A red build on Vercel still deploys the last successful version — confusing if you expect to see new code.
        </div>
      </section>

      {/* Vercel */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Deploy to Vercel</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Vercel is built by the same team as Next.js. It detects your framework automatically, runs the build, and deploys to a global edge network. The free Hobby tier is enough for personal projects.
        </p>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Via GitHub (recommended)</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
            <div className="px-5 py-4 space-y-1 leading-relaxed">
              <div><span className="text-green-400">$</span> git init</div>
              <div><span className="text-green-400">$</span> git add .</div>
              <div><span className="text-green-400">$</span> git commit -m "initial commit"</div>
              <div><span className="text-green-400">$</span> git remote add origin https://github.com/you/my-app.git</div>
              <div><span className="text-green-400">$</span> git push -u origin main</div>
            </div>
          </div>
          <ol className="list-decimal pl-6 space-y-1.5 text-sm text-muted-foreground">
            <li>Go to <span className="font-medium text-foreground">vercel.com</span> and sign up with GitHub</li>
            <li>Click <span className="font-medium text-foreground">Add New → Project</span></li>
            <li>Import your repository</li>
            <li>Leave all settings as-is and click <span className="font-medium text-foreground">Deploy</span></li>
          </ol>
          <p className="text-sm text-muted-foreground">
            After setup, every push to <code className="bg-stone-100 px-1 rounded text-xs font-mono">main</code> triggers a production deploy automatically. Every other branch gets a preview URL.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Via CLI</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
            <div className="px-5 py-4 space-y-1 leading-relaxed">
              <div><span className="text-green-400">$</span> npm i -g vercel</div>
              <div><span className="text-green-400">$</span> vercel login</div>
              <div><span className="text-green-400">$</span> vercel          <span className="text-stone-500"># preview deploy</span></div>
              <div><span className="text-green-400">$</span> vercel --prod   <span className="text-stone-500"># production deploy</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Env vars */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Environment Variables</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Never hardcode secrets. Store them in <code className="bg-stone-100 px-1 rounded text-xs font-mono">.env.local</code> locally (git-ignored) and set them in the Vercel dashboard for production.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">.env.local  ← never commit this file</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`DATABASE_URL=postgresql://localhost/myapp
API_SECRET_KEY=super-secret-value
NEXT_PUBLIC_API_URL=https://api.myapp.com`}</pre>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Prefix</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Accessible in</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-stone-50/50">
                <td className="px-4 py-3 font-mono text-xs text-foreground">NEXT_PUBLIC_</td>
                <td className="px-4 py-3 text-muted-foreground">Browser + Server</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">NEXT_PUBLIC_API_URL</td>
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="px-4 py-3 font-mono text-xs text-foreground">(no prefix)</td>
                <td className="px-4 py-3 text-muted-foreground">Server only — safe for secrets</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">DATABASE_URL</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Using env vars in code</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`// Server Component or API route — server-only var
const db = process.env.DATABASE_URL;

// Client Component — must have NEXT_PUBLIC_ prefix
const apiUrl = process.env.NEXT_PUBLIC_API_URL;`}</pre>
        </div>

        <p className="text-sm text-muted-foreground">
          In Vercel: Project → Settings → Environment Variables. Add each variable and choose which environments (Production / Preview / Development) should receive it.
        </p>
      </section>

      {/* Docker */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Docker Option</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For self-hosted deployments on a VPS or Kubernetes cluster, Next.js supports a standalone output mode. Enable it in <code className="bg-stone-100 px-1 rounded text-xs font-mono">next.config.js</code> and use this Dockerfile:
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">next.config.js</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // produces a self-contained build
};
module.exports = nextConfig;`}</pre>
        </div>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Dockerfile</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]`}</pre>
        </div>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
          <div className="px-5 py-4 space-y-1 leading-relaxed">
            <div><span className="text-green-400">$</span> docker build -t my-nextjs-app .</div>
            <div><span className="text-green-400">$</span> docker run -p 3000:3000 my-nextjs-app</div>
          </div>
        </div>
      </section>

      {/* Knowledge check */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground">
          Which command builds a Next.js app for production?
        </p>
        <div className="flex flex-col gap-3">
          {[
            "npm run dev",
            "next build",
            "next export",
            "npm run start",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setSelected(opt);
                if (opt === CORRECT) notifyChallengePassed(moduleId ?? "");
              }}
              className={cn(
                "text-left px-5 py-3.5 rounded-xl border text-sm font-sans transition-all",
                selected === opt
                  ? opt === CORRECT
                    ? "border-green-400 bg-green-50 text-green-800"
                    : "border-red-300 bg-red-50 text-red-800"
                  : "border-border hover:border-primary/40 hover:bg-primary/5 text-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        {selected && selected !== CORRECT && (
          <p className="text-sm text-red-600">Not quite — <code className="bg-stone-100 px-1 rounded text-xs font-mono">dev</code> starts the dev server, <code className="bg-stone-100 px-1 rounded text-xs font-mono">start</code> serves an already-built app, and <code className="bg-stone-100 px-1 rounded text-xs font-mono">export</code> is a legacy flag.</p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700">Correct! <code className="bg-stone-100 px-1 rounded text-xs font-mono">next build</code> compiles and optimizes your app for production. <code className="bg-stone-100 px-1 rounded text-xs font-mono">next start</code> then serves the output.</p>
        )}
      </section>

      {/* Gate */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-green-800">Challenge passed</p>
              <p className="text-sm text-green-700 mt-0.5">Click <strong>Complete &amp; Next</strong> below to continue.</p>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5 rounded-2xl bg-stone-50 border border-border">
            <p className="text-sm font-sans text-muted-foreground">Complete the challenge above to unlock the next lesson.</p>
          </div>
        )}
      </section>

    </article>
  );
}
