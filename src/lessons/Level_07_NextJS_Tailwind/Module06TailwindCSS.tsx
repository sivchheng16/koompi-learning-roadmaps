import React from "react";

export default function Module06TailwindCSS() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tailwind CSS</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Stop writing CSS files. Tailwind gives you every style you need as a class name — applied directly in your JSX, co-located with the markup they affect.
        </p>
      </section>

      {/* Utility-first philosophy */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Utility-First Philosophy</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Traditional CSS requires you to invent a class name, write a rule in a separate file, and then keep both in sync. Utility-first flips this: each class does one thing, and you compose them directly in HTML. No naming decisions, no specificity battles, no dead CSS accumulating over time.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Traditional CSS</div>
            <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`.card {
  padding: 1rem;
  border-radius: 0.75rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

<div class="card">…</div>`}</pre>
          </div>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Tailwind</div>
            <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`<div className="p-4 rounded-xl
  bg-white shadow-sm">
  …
</div>`}</pre>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Setup</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tailwind is included when you use <code className="bg-stone-100 px-1 rounded text-xs font-mono">create-next-app</code> and select "Yes" for Tailwind. For an existing project, install it manually:
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}</pre>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The config file at <code className="bg-stone-100 px-1 rounded text-xs font-mono">tailwind.config.ts</code> tells Tailwind which files to scan for class names so unused styles are purged from the production bundle.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;`}</pre>
      </section>

      {/* Core classes */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Core Classes</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Category</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Spacing", "p-4  px-6  py-2  m-2  mx-auto  gap-3  space-y-4"],
                ["Sizing", "w-full  w-64  h-screen  max-w-lg  min-h-0"],
                ["Colours", "bg-blue-500  text-white  border-gray-200  text-slate-700"],
                ["Typography", "text-xl  text-sm  font-bold  font-medium  leading-relaxed  tracking-tight"],
                ["Borders", "border  border-2  rounded  rounded-xl  rounded-full"],
                ["Flexbox", "flex  flex-col  items-center  justify-between  flex-1  gap-4"],
                ["Grid", "grid  grid-cols-2  grid-cols-3  col-span-2"],
              ].map(([cat, examples]) => (
                <tr key={cat} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-medium text-foreground">{cat}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Responsive */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Responsive Design</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tailwind is mobile-first. An unprefixed class applies at all screen sizes. Add a breakpoint prefix to override at that width and above: <code className="bg-stone-100 px-1 rounded text-xs font-mono">sm:</code> (640px), <code className="bg-stone-100 px-1 rounded text-xs font-mono">md:</code> (768px), <code className="bg-stone-100 px-1 rounded text-xs font-mono">lg:</code> (1024px), <code className="bg-stone-100 px-1 rounded text-xs font-mono">xl:</code> (1280px).
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
  Hello
</h1>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* cards */}
</div>`}</pre>
      </section>

      {/* State variants */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">State Variants</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Prefix any utility with a state to apply it conditionally — no extra CSS required.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`<button
  className="
    bg-blue-500 text-white px-4 py-2 rounded-lg
    hover:bg-blue-600
    focus:outline-none focus:ring-2 focus:ring-blue-400
    disabled:opacity-50 disabled:cursor-not-allowed
    dark:bg-blue-700 dark:hover:bg-blue-800
  "
>
  Submit
</button>`}</pre>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Variant</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">When it applies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["hover:", "Mouse is over the element"],
                ["focus:", "Element has keyboard focus"],
                ["active:", "Element is being clicked"],
                ["disabled:", "Element has the disabled attribute"],
                ["dark:", "OS or document is in dark mode"],
                ["group-hover:", "A parent with class group is hovered"],
              ].map(([v, desc]) => (
                <tr key={v} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{v}</td>
                  <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Arbitrary values */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Arbitrary Values</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When a design calls for an exact pixel value or a colour outside the default palette, use square-bracket notation. This is an escape hatch — reach for it for one-off values, not as a substitute for the design system.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`<div className="w-[347px] h-[200px] bg-[#6366f1] mt-[13px]">
  Custom dimensions and colour
</div>

<p className="text-[15px] leading-[1.7]">
  Fine-tuned typography
</p>`}</pre>
      </section>

      {/* Component extraction */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Component Extraction</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When you find yourself copying the same six classes across multiple files, extract a React component — not a CSS class. Components carry logic, props, and state in ways a CSS class cannot.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`// Instead of repeating this everywhere:
<button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm">

// Extract a component:
function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm"
    >
      {children}
    </button>
  );
}`}</pre>
      </section>

      {/* cn() utility */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Conditional Classes with cn()</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Combining classes conditionally with template literals gets messy fast. The <code className="bg-stone-100 px-1 rounded text-xs font-mono">cn()</code> helper — built from <code className="bg-stone-100 px-1 rounded text-xs font-mono">clsx</code> and <code className="bg-stone-100 px-1 rounded text-xs font-mono">tailwind-merge</code> — handles merging and deduplication cleanly.
        </p>
        <pre className="rounded-xl bg-[#1e1e1e] text-[#cdd6f4] font-mono text-sm px-6 py-4 overflow-x-auto leading-relaxed">{`import { cn } from '@/lib/utils';

function Badge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        'px-2 py-1 rounded text-xs font-medium',
        active ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-600'
      )}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}`}</pre>
      </section>

      {/* Tailwind vs alternatives */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Tailwind vs Other Approaches</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Approach</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Tailwind wins</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Consider alternatives</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["CSS Modules", "No class-name collisions, good DX", "When you need true global CSS or complex animations"],
                ["CSS-in-JS (styled-components)", "Zero runtime overhead, smaller bundle", "When you need dynamic styles based on complex JS state at runtime"],
                ["Plain CSS", "Enforced design constraints, no dead code", "When the team already knows CSS deeply and consistency isn't a concern"],
              ].map(([approach, win, alt]) => (
                <tr key={approach} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-medium text-foreground">{approach}</td>
                  <td className="px-4 py-3 text-muted-foreground">{win}</td>
                  <td className="px-4 py-3 text-muted-foreground">{alt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </article>
  );
}
