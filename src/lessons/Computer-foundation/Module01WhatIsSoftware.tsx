import React from "react";

export default function Module01WhatIsSoftware() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Right now your phone is running a weather app, a messaging app, a bank app, and a dozen
          things running silently in the background. None of that is magic. Every single one of
          those things is software — and software is just a set of instructions someone wrote down.
          You are about to learn how to write them.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What software actually is</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A computer is hardware — the physical chips, screen, keyboard, and wires. Hardware can
          do nothing on its own. It needs <strong className="text-foreground">instructions</strong>.
          Software is those instructions: a precise list of steps the hardware follows, millions
          of times per second.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Think of a recipe. A recipe is not food — it is a set of written steps that, when
          followed, produce food. A program is exactly the same thing: a set of written steps
          that, when followed by a computer, produce a result — a sent message, a calculated
          bank balance, a rendered video frame.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
          <p className="text-sm font-semibold text-foreground">Hardware vs Software — the one-line version</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-mono text-foreground shrink-0">Hardware</span>
              <span>the physical machine — CPU, RAM, screen. You can touch it.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-foreground shrink-0">Software</span>
              <span>the instructions that tell the hardware what to do. You can only read it.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── 3. The layers ──────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The four layers every computer has</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Software is not one flat thing. It lives in layers, each one built on top of the one below it.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            from bottom to top
          </div>
          <div className="divide-y divide-border">
            {[
              { layer: "Machine code", desc: "Raw 1s and 0s the CPU understands directly. No human writes this by hand." },
              { layer: "Operating System", desc: "Linux, macOS, Windows. Manages the hardware so that apps don't have to." },
              { layer: "Applications", desc: "The programs you use — a browser, a text editor, a game." },
              { layer: "Websites / Web apps", desc: "Applications that run inside the browser, delivered over the internet." },
            ].map(({ layer, desc }) => (
              <div key={layer} className="flex gap-4 px-6 py-4 bg-[#fafaf9]">
                <span className="font-mono text-sm text-foreground shrink-0 w-40">{layer}</span>
                <span className="text-sm text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          As a web developer you will mostly work at the top two layers — applications and websites.
          The operating system handles the rest for you.
        </p>
      </section>

      {/* ── 4. What developers do ──────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What developers actually do</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          CPUs only understand machine code, but writing machine code is painfully slow and error-prone.
          So humans invented <strong className="text-foreground">programming languages</strong> —
          text that looks a bit like English, which a tool called a compiler or interpreter
          translates into machine code automatically.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          A developer's job is to write those human-readable instructions clearly enough that
          the translation succeeds and the computer does the right thing. That is the whole job.
          Everything else — frameworks, tools, cloud services — is scaffolding built around that
          core act.
        </p>
      </section>

      {/* ── 5. Two kinds of software ───────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The two kinds of software</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every piece of software you will ever build falls into one of two categories:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-2">
            <p className="font-semibold text-foreground text-sm">Application software</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              What users see and interact with. A banking app, a social feed, a checkout page.
              If a human touches it, it is an application.
            </p>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-2">
            <p className="font-semibold text-foreground text-sm">System software</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The engine underneath. Operating systems, databases, web servers. Users never see
              it, but nothing works without it.
            </p>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          This curriculum focuses on application software — specifically web applications,
          which run in the browser and talk to a server.
        </p>
      </section>

      {/* ── 6. Frontend / Backend / Full-stack ─────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Three roles you will hear about constantly</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Web software has two sides. Think of a restaurant: there is the dining room the customer
          sees, and the kitchen where the food is made.
        </p>
        <div className="space-y-3">
          <div className="flex gap-4 items-start">
            <span className="font-mono text-sm text-foreground shrink-0 w-28">Frontend</span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The dining room. HTML, CSS, and JavaScript running in the browser — everything
              a user sees, clicks, and reads.
            </p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-mono text-sm text-foreground shrink-0 w-28">Backend</span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The kitchen. Code running on a server — storing data in a database, enforcing
              business rules, sending emails, handling payments.
            </p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-mono text-sm text-foreground shrink-0 w-28">Full-stack</span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A developer who can work on both sides. This curriculum will get you there.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Key Takeaways ───────────────────────────────── */}
      <section>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-2">
          <p className="font-semibold text-foreground text-sm">What you will be able to build</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            By the end of this curriculum you will be a full-stack web developer. You will be
            able to design and build the pages users see (frontend), write the server logic
            that stores and processes data (backend), and deploy it so anyone in the world
            can use it. You will go from reading software to writing it — from the outside to
            the inside of every app you have ever used.
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground pt-1">
            <li className="flex gap-2"><span className="text-foreground">—</span> Structure pages with HTML</li>
            <li className="flex gap-2"><span className="text-foreground">—</span> Style them with CSS</li>
            <li className="flex gap-2"><span className="text-foreground">—</span> Add behaviour with JavaScript</li>
            <li className="flex gap-2"><span className="text-foreground">—</span> Build server APIs and databases</li>
            <li className="flex gap-2"><span className="text-foreground">—</span> Ship it all with Docker and Linux</li>
          </ul>
        </div>
      </section>

    </article>
  );
}
