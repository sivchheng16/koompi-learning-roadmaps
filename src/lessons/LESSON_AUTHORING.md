# Lesson Authoring Guide

Every lesson follows the same six-part structure. This document is the spec.

---

## The Six-Part Structure

### 1. Hook (2 sentences, max)

Why this matters *right now* in the real world. Not motivational fluff. Not "by the end of this lesson you will…". A concrete, honest statement that earns the student's attention.

**Good:**
> Every website you've ever visited started as plain text with angle brackets. That text is HTML, and in the next few minutes you'll write your first working webpage.

**Bad:**
> In this module we will cover the fundamentals of HTML markup language and its role in web development.

---

### 2. Concept (one idea only)

The minimum explanation needed to understand the example. If you find yourself writing two distinct ideas, split the lesson.

- 3–5 minutes to read
- No jargon without immediate explanation
- Use concrete analogies (HTML = skeleton, CSS = clothes)
- Cambodia-first examples where possible (local domain names, KHR amounts, Khmer characters)

---

### 3. Example (walked-through)

A realistic piece of code with short inline annotations. Not a toy. Not contrived. The kind of thing a junior dev would actually write.

Use the annotated `<pre>` block pattern:
```tsx
<pre className="px-6 py-5 text-sm font-mono leading-relaxed ...">
{`<h1>Hello</h1>    ← this is the annotation
<p>Text here</p>  ← another annotation`}
</pre>
```

---

### 4. Try it — `<CodePlayground mode="exploration">`

No challenge. No pass/fail. Just starter code the student can modify freely.

**Purpose:** build intuition before the stakes appear. Let them break things.

```tsx
<CodePlayground
  mode="html"
  starter={{ html: `<h1>Edit me</h1>` }}
  height="280px"
/>
```

---

### 5. Challenge — `<CodePlayground challenge={...}>`

One specific task with a `check` function that gives immediate feedback.

```tsx
<CodePlayground
  mode="html"
  starter={{ html: `<!-- start here -->` }}
  height="300px"
  challenge={{
    prompt: "Add an <h2> that says 'About Me' and a <p> below it.",
    check(html, css, js) {
      const doc = new DOMParser().parseFromString(
        `<!DOCTYPE html><html><body>${html}</body></html>`,
        "text/html"
      );
      const h2 = doc.querySelector("h2");
      if (!h2) return { passed: false, message: "No <h2> found yet." };
      if (!h2.textContent?.toLowerCase().includes("about me"))
        return { passed: false, message: `<h2> says "${h2.textContent}" — should say "About Me".` };
      const p = doc.querySelector("p");
      if (!p?.textContent?.trim())
        return { passed: false, message: "Add a <p> below your heading." };
      return { passed: true, message: "Challenge complete!" };
    },
  }}
  onChallengePassed={() => setChallengePassed(true)}
/>
```

**Check function rules:**
- Parse HTML using `DOMParser` — do not try to regex-match tags
- Return a `{ passed: boolean, message: string }` object
- Failure messages tell the student *what is missing*, not just "wrong"
- Test your check against: the correct solution, an empty editor, a common mistake

---

### 6. Gate

Show a `challengePassed` state variable from `useState(false)`. Set it via `onChallengePassed`.

```tsx
const [challengePassed, setChallengePassed] = useState(false);

// ...

{challengePassed ? (
  <div className="... bg-green-50 border-green-200">
    <CheckCircle2 ... />
    <p>Challenge passed — click <strong>Complete &amp; Next</strong> to continue.</p>
  </div>
) : (
  <div className="... bg-stone-50">
    <p>Complete the challenge above to unlock the next lesson.</p>
  </div>
)}
```

The "Complete & Next" button in the lesson viewer is always visible. The gate is a visual signal, not a hard block (Phase 3 adds the hard block).

---

## `<CodePlayground>` API

```tsx
<CodePlayground
  mode="html" | "css" | "js" | "web"
  starter={{ html?: string, css?: string, js?: string }}
  height="360px"
  challenge={ChallengeSpec}        // optional — omit for exploration
  onChallengePassed={() => void}   // called once when check() returns passed: true
  className={string}               // optional wrapper class
/>
```

### `mode`

| Value | Editor tabs | Use for |
|-------|------------|---------|
| `"html"` | HTML only | HTML lessons |
| `"css"` | CSS only | CSS lessons |
| `"js"` | JS only | JavaScript lessons |
| `"web"` | HTML + CSS + JS | combined exercises |

### Display modes (automatic)

- **Exploration** — no `challenge` prop. Preview toggle in toolbar.
- **Challenge** — `challenge` prop present. Preview always visible. Result bar below.
- **Fullscreen** — expand icon in toolbar. Works in both modes.

---

## Check Function Patterns

### DOM presence
```ts
const doc = parseHtml(html);
const el = doc.querySelector("nav");
if (!el) return { passed: false, message: "Add a <nav> element." };
```

### Text content
```ts
if (!el.textContent?.toLowerCase().includes("expected text"))
  return { passed: false, message: "Your element should contain 'expected text'." };
```

### Child count
```ts
const links = doc.querySelectorAll("nav a");
if (links.length < 3)
  return { passed: false, message: `Found ${links.length} link(s) — need 3.` };
```

### Attribute check
```ts
const img = doc.querySelector("img");
if (!img?.getAttribute("alt"))
  return { passed: false, message: "Add an alt attribute to your <img>." };
```

### CSS (structural only — computed styles not available in DOMParser)
```ts
// Check that the student *wrote* a rule, not that it computed correctly
if (!css.includes("display") || !css.includes("flex"))
  return { passed: false, message: "Use display: flex in your CSS." };
```

### JavaScript output
```ts
// Capture console.log via sandbox messaging — advanced, see Phase 3 spec
```

---

## Tone Guidelines

- Write like a mentor sitting next to the student, not a textbook
- Use "you" and "your"
- Short sentences. One idea per sentence.
- Avoid: "It is important to note that…", "In conclusion…", "As we can see…"
- Contractions are fine: "you'll", "that's", "here's"
- If you wouldn't say it out loud to a student, cut it

---

## Cambodia-First Examples

Prefer local context over generic Western examples:

| Generic | Cambodia-first |
|---------|----------------|
| `price: $9.99` | `price: 45,000 ៛` |
| `company: "Acme Corp"` | `company: "Smart Axiata"` |
| `href="https://example.com"` | `href="https://koompi.com"` |
| `<p>Hello from New York</p>` | `<p>Hello from Phnom Penh</p>` |
| `lang="en"` | `lang="km"` where Khmer content is shown |
