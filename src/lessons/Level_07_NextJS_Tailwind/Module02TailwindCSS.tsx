import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

export default function Module02TailwindCSS() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [challengePassed, setChallengePassed] = useState(false);

  function handleChallengePassed() {
    setChallengePassed(true);
    notifyChallengePassed(moduleId ?? "");
  }

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tailwind CSS</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Tailwind is a utility-first CSS framework. Instead of writing separate CSS files, you compose styles directly in your HTML using small, single-purpose class names.
        </p>
      </section>

      {/* Why Tailwind */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Why Utility-First?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">Traditional CSS</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`/* styles.css */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
  padding: 24px;
}

/* HTML */
<div class="card">Hello</div>`}</pre>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">Tailwind CSS</div>
            <pre className="px-4 py-4 text-xs font-mono leading-relaxed text-foreground overflow-x-auto bg-white">{`{/* No CSS file needed */}

<div className="
  bg-white
  rounded-lg
  shadow-md
  p-6
">
  Hello
</div>`}</pre>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Benefit</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Speed", "Style without leaving your JSX — no file switching"],
                ["Consistency", "Pre-defined spacing/color scale keeps designs uniform"],
                ["No dead CSS", "Only classes you use end up in the production bundle"],
                ["Responsive built-in", "Breakpoint prefixes like md: and lg: everywhere"],
                ["Dark mode ready", "dark: prefix works with the system theme"],
              ].map(([benefit, why]) => (
                <tr key={benefit} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-medium text-foreground">{benefit}</td>
                  <td className="px-4 py-3 text-muted-foreground">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Core categories */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Essential Class Categories</h2>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Spacing — p-, m-</h3>
          <p className="text-sm text-muted-foreground">
            The scale runs 1 = 4px, 2 = 8px, 4 = 16px, 6 = 24px, 8 = 32px. Prefix with axis: <code className="bg-stone-100 px-1 rounded text-xs font-mono">px-</code> (horizontal), <code className="bg-stone-100 px-1 rounded text-xs font-mono">py-</code> (vertical), <code className="bg-stone-100 px-1 rounded text-xs font-mono">pt-</code>/<code className="bg-stone-100 px-1 rounded text-xs font-mono">pb-</code>/<code className="bg-stone-100 px-1 rounded text-xs font-mono">pl-</code>/<code className="bg-stone-100 px-1 rounded text-xs font-mono">pr-</code>.
          </p>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`<div class="p-6">        /* 24px all sides */
<div class="px-4 py-2">  /* 16px left/right, 8px top/bottom */
<div class="mt-8 mb-4">  /* 32px top margin, 16px bottom */
<div class="mx-auto">    /* center horizontally */`}</pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Layout — flex, grid</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`/* Flexbox */
<div class="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

/* Grid — responsive columns */
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>`}</pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Typography — text-, font-</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`<h1 class="text-3xl font-bold text-gray-900">Heading</h1>
<p  class="text-sm text-gray-600 leading-relaxed">Body text</p>
<span class="text-xs font-mono text-blue-600 uppercase tracking-wide">
  Badge
</span>`}</pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Colors — bg-, text-, border-</h3>
          <p className="text-sm text-muted-foreground">
            Each color has shades 50–950. Use the shade after the color name: <code className="bg-stone-100 px-1 rounded text-xs font-mono">bg-blue-500</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">text-red-700</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">border-green-300</code>.
          </p>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`<button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
  Primary
</button>
<button class="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition">
  Outline
</button>`}</pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Borders and Rounded — border, rounded-</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`rounded-sm   /* 2px */
rounded      /* 4px */
rounded-md   /* 6px */
rounded-lg   /* 8px */
rounded-xl   /* 12px */
rounded-2xl  /* 16px */
rounded-full /* 9999px — circle or pill */`}</pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Responsive breakpoints</h3>
          <p className="text-sm text-muted-foreground">
            Tailwind is mobile-first. Unprefixed classes apply to all sizes. A prefix applies from that breakpoint up.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Prefix</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Min-width</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["(none)", "all sizes", "text-sm — always small"],
                  ["sm:", "640px", "sm:text-base — base on ≥640px"],
                  ["md:", "768px", "md:grid-cols-2 — 2 cols on ≥768px"],
                  ["lg:", "1024px", "lg:grid-cols-4 — 4 cols on ≥1024px"],
                  ["xl:", "1280px", "xl:max-w-6xl"],
                ].map(([prefix, min, ex]) => (
                  <tr key={prefix} className="hover:bg-stone-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{prefix}</td>
                    <td className="px-4 py-3 text-muted-foreground">{min}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Try it */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Try It — Build a Card</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The playground below loads Tailwind from CDN. Edit the HTML and use Tailwind classes to style a card. Your card must use <code className="bg-stone-100 px-1 rounded text-xs font-mono">p-</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">rounded-</code>, <code className="bg-stone-100 px-1 rounded text-xs font-mono">bg-</code>, and <code className="bg-stone-100 px-1 rounded text-xs font-mono">text-</code> classes to unlock the next lesson.
        </p>
        <CodePlayground
          mode="web"
          height="340px"
          starter={{
            html: `<script src="https://cdn.tailwindcss.com"></script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center p-8">

  <!-- Style this card using Tailwind classes -->
  <div class="">
    <h2 class="">KOOMPI E13</h2>
    <p class="">Lightweight laptop for students and developers.</p>
    <span class="">$299</span>
  </div>

</div>`,
          }}
          challenge={{
            prompt: "Style the card using at least p-, rounded-, bg-, and text- classes.",
            check: (html) => {
              const hasP = /\bp-\d/.test(html) || /\bpx-\d/.test(html) || /\bpy-\d/.test(html);
              const hasRounded = /\brounded/.test(html);
              const hasBg = /\bbg-/.test(html);
              const hasText = /\btext-/.test(html);
              const allFour = hasP && hasRounded && hasBg && hasText;
              return {
                passed: allFour,
                message: allFour
                  ? "Card styled with all four required class types."
                  : `Missing: ${[!hasP && "p-*", !hasRounded && "rounded-*", !hasBg && "bg-*", !hasText && "text-*"].filter(Boolean).join(", ")}`,
              };
            },
          }}
          onChallengePassed={handleChallengePassed}
        />
      </section>

      {/* Gate */}
      <section>
        {unlocked || challengePassed ? (
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
