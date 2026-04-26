import React from "react";

export default function Module01Docker() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          "Works on my machine" ends here. Docker packages your app and everything it needs
          — the runtime, the dependencies, the config — into a single portable unit that
          runs identically everywhere.
        </p>
      </section>

      {/* ── 2. What Docker does ────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What Docker does</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Without Docker, deploying an app means making sure the server has the right Node
          version, the right OS libraries, the right environment. Differences cause bugs
          that are almost impossible to reproduce locally.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Docker solves this by packaging your app into a <strong className="text-foreground">container</strong> — a
          lightweight, isolated process that carries its own filesystem. The container runs
          the same way on your laptop, on CI, and on a cloud server.
        </p>
      </section>

      {/* ── 3. Image vs container ──────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Image vs container</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          An <strong className="text-foreground">image</strong> is the blueprint — a read-only snapshot of your app
          and its dependencies. A <strong className="text-foreground">container</strong> is a running instance of that
          image. You build an image once and run it many times.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`image   →   container
(blueprint)   (running instance)

# like a class and an object in OOP
# one image can spawn many containers`}</pre>
      </section>

      {/* ── 4. Dockerfile ──────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Dockerfile for a Node.js app</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">Dockerfile</code> is a recipe — a sequence
          of instructions that build your image layer by layer.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`FROM node:20-alpine

WORKDIR /app

# Copy package files first — Docker caches this layer
# Only re-runs npm ci when package.json changes
COPY package*.json ./
RUN npm ci --production

# Copy source code
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The order matters: copy <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">package.json</code> before
          the rest of your source code so Docker can cache the npm install layer. If you
          change a source file without touching package.json, Docker skips the install step.
        </p>
      </section>

      {/* ── 5. Build and run ───────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Build and run</h2>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# build the image and tag it "myapp"
docker build -t myapp .

# run it — map port 3000 on the host to port 3000 in the container
docker run -p 3000:3000 myapp

# run in detached mode (background)
docker run -d -p 3000:3000 --name myapp myapp

# view running containers
docker ps

# stop and remove
docker stop myapp && docker rm myapp`}</pre>
      </section>

      {/* ── 6. docker-compose ──────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">docker-compose for multi-service apps</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Real apps need more than one service — a Node.js server, a Postgres database, a
          Redis cache. <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">docker-compose.yml</code> defines
          all of them and wires them together.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine

volumes:
  pgdata:`}</pre>
        <pre className="rounded-xl bg-[#1e1e1e] text-green-400 font-mono text-sm px-6 py-4 overflow-x-auto">{`# start all services
docker compose up -d

# view logs
docker compose logs -f app

# stop and remove containers
docker compose down`}</pre>
      </section>

      {/* ── 7. .dockerignore ───────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">.dockerignore — keep images small and safe</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Like <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.gitignore</code>, a{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.dockerignore</code> file tells Docker which
          files to exclude from the build context. Without it, you'd send{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">node_modules</code> and{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.env</code> to the Docker daemon on every build.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# .dockerignore
node_modules
.env
.env.*
dist
.git
*.log
coverage
.DS_Store`}</pre>
      </section>

      {/* ── 8. Multi-stage builds ──────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Multi-stage builds — smaller production images</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A build stage might need TypeScript, test tools, and dev dependencies — none of
          which belong in the production image. Multi-stage builds compile in one stage and
          copy only the output to a clean production stage.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build   # compiles TypeScript to /app/dist

# Stage 2: production — starts clean, copies only compiled output
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]`}</pre>
        <p className="text-base text-muted-foreground leading-relaxed">
          The final image contains no TypeScript compiler, no test framework, no source maps.
          A typical Node.js app shrinks from 800 MB to under 150 MB with this pattern.
        </p>
      </section>

    </article>
  );
}
