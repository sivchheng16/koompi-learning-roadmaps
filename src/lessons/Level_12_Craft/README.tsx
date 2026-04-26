import React from "react";

export default function CraftREADME() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Every job listing you have ever read asks for React, TypeScript, Node, Git.
          None of them mention the skills that actually determine how far you go.
        </p>
      </section>

      {/* What this track is */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What "The Craft" means</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Technical skills get you hired. Craft skills determine how fast you grow, how
          much people want to work with you, and whether you become someone that teams
          rely on or someone that teams route around.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Craft is the difference between a developer who can write code and a developer
          who can <em>solve problems</em>. Between someone who ships features and someone
          who ships features that <em>work</em>. Between someone who writes a PR and
          someone who writes a PR that gets <em>merged without drama</em>.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          These skills are learnable. They are not personality traits. They are habits
          you build deliberately — and this track is where you start.
        </p>
      </section>

      {/* What you'll learn */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What you will learn</h2>
        <div className="space-y-4">
          {[
            {
              num: "01",
              title: "Debugging",
              desc: "A systematic method for finding bugs — not luck, not guessing. The scientific method applied to code.",
            },
            {
              num: "02",
              title: "Reading Code",
              desc: "You will read ten times more code than you write. Get fast at understanding unfamiliar codebases.",
            },
            {
              num: "03",
              title: "Pull Requests & Reviews",
              desc: "A PR is a conversation. How to write them, review them, and receive feedback without your ego getting in the way.",
            },
            {
              num: "04",
              title: "AI as a Tool",
              desc: "AI makes good developers dramatically more productive and bad developers confidently wrong. Learn which one you want to be.",
            },
          ].map(({ num, title, desc }) => (
            <div key={num} className="flex gap-5 items-start">
              <span className="text-xs font-mono font-semibold text-primary/50 mt-1 shrink-0 w-6">{num}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Prerequisites</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          You should have completed all prior tracks — HTML, CSS, JavaScript, React, TypeScript,
          Git, Next.js, backend, databases, testing, and shipping. This track assumes you can
          write code. It teaches you to write it <em>well</em>.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          There are no playgrounds here. No automated challenge gates.
          The only way to develop craft is to practice it on real work.
        </p>
      </section>

      {/* Closer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">A note on this track</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          These lessons are written the way a senior developer would actually talk to you —
          directly and without fluff. Some of it will make you uncomfortable. Good.
          That discomfort is the gap between where you are and where you want to be.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Read each lesson. Then go do the thing. There is no substitute.
        </p>
      </section>

    </article>
  );
}
