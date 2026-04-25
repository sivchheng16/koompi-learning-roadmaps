import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_HTML = `<h1>Cambodia Through My Lens</h1>

<!-- Basic image with src and alt -->
<img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Angkor_Wat%2C_Angkor%2C_Cambodia.jpg/1280px-Angkor_Wat%2C_Angkor%2C_Cambodia.jpg"
  alt="Angkor Wat temple at sunrise, reflected in the moat"
  width="640"
  height="427"
>

<!-- figure + figcaption adds a visible caption -->
<figure>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Phnom_Penh_City_Hall_2.jpg/1280px-Phnom_Penh_City_Hall_2.jpg"
    alt="Phnom Penh City Hall with palm trees in front"
    width="640"
    height="427"
  >
  <figcaption>Phnom Penh City Hall — Cambodia's capital city.</figcaption>
</figure>

<!-- Linking an image -->
<a href="https://koompi.com">
  <img
    src="https://koompi.com/logo.png"
    alt="KOOMPI — visit our website"
    width="120"
    height="40"
  >
</a>`;

const CHALLENGE_STARTER = `<!-- Add an image to this page.
     It needs a src attribute AND a non-empty alt attribute. -->
<h1>My Photo</h1>
`;

function parseDoc(body: string): Document {
  return new DOMParser().parseFromString(
    `<!DOCTYPE html><html><body>${body}</body></html>`,
    "text/html"
  );
}

const challenge = {
  prompt:
    "Add an <img> element that has both a src attribute and a non-empty alt attribute describing what the image shows.",
  check(htmlCode: string, _css: string, _js: string) {
    const doc = parseDoc(htmlCode);
    const img = doc.querySelector("img");
    if (!img)
      return {
        passed: false,
        message: "No <img> element found yet. Add one with src and alt attributes.",
      };
    const src = img.getAttribute("src");
    if (!src || src.trim() === "")
      return {
        passed: false,
        message: "Your <img> is missing a src attribute. Add src=\"...\" with an image URL or filename.",
      };
    const alt = img.getAttribute("alt");
    if (alt === null)
      return {
        passed: false,
        message: "Your <img> is missing an alt attribute. Add alt=\"description of the image\".",
      };
    if (alt.trim() === "")
      return {
        passed: false,
        message: "Your alt attribute is empty. Write a short description of what the image shows.",
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

export default function Module05ImagesMedia() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          A page of text alone rarely holds attention — images are what make a webpage feel real.
          But an image that only sighted users can experience is an image that excludes people,
          and that is a bug worth fixing from day one.
        </p>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The img element</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Images are added with{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;img&gt;</code> — a{" "}
          <strong className="text-foreground">void element</strong>, meaning it has no closing tag and no
          content between tags. Everything it needs lives in its attributes.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Two attributes are mandatory every time. <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">src</code>{" "}
          is the path or URL of the image file. <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code>{" "}
          is a short text description of what the image shows — it is read aloud by screen readers and
          displayed when the image fails to load. Skipping <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code>{" "}
          is one of the most common accessibility mistakes on the web.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Adding <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">width</code> and{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">height</code> attributes (in pixels,
          without the "px" unit) lets the browser reserve the right amount of space before the image
          downloads. Without them, the page jumps as images load — a jarring experience for users on
          slow connections. Wrap an image in{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;figure&gt;</code> with a{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;figcaption&gt;</code> when
          you want a visible caption.
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Images, annotated</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Four common patterns you will use on almost every project:
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-2.5 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            index.html
          </div>
          <pre className="px-6 py-5 text-sm font-mono leading-relaxed text-foreground overflow-x-auto bg-[#fafaf9]">
{`<!-- 1. Basic image — src and alt are always required -->
<img src="images/koompi-e13.jpg" alt="KOOMPI E13 laptop open on a desk">

<!-- 2. With dimensions — reserves space, prevents layout shift -->
<img
  src="images/team-phnom-penh.jpg"
  alt="Four KOOMPI team members in the Phnom Penh office"
  width="800"
  height="533"
>

<!-- 3. External image — full URL for images hosted elsewhere -->
<img
  src="https://koompi.com/images/hero.jpg"
  alt="KOOMPI Academy students working on laptops"
  width="1200"
  height="600"
>

<!-- 4. figure + figcaption — image with a visible caption -->
<figure>
  <img
    src="images/angkor-wat.jpg"
    alt="Angkor Wat reflected in the north pool at sunrise"
    width="960"
    height="640"
  >
  <figcaption>Angkor Wat, Siem Reap — a UNESCO World Heritage Site.</figcaption>
</figure>

<!-- 5. Decorative image — alt="" tells screen readers to skip it -->
<img src="images/divider.png" alt="">`}
          </pre>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">src</code>
            path to the image file — relative or absolute URL
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">alt</code>
            describes the image for screen readers and broken-image fallback
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">width / height</code>
            pixel dimensions — prevents page jumping while images load
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">&lt;figure&gt;</code>
            semantic container pairing an image with its caption
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">alt=""</code>
            empty alt for purely decorative images — screen readers skip them
          </li>
        </ul>

        <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-900 leading-relaxed">
          <strong>A note on video and audio:</strong> HTML also has{" "}
          <code className="bg-amber-100 px-1 py-0.5 rounded text-xs font-mono">&lt;video src="clip.mp4" controls&gt;&lt;/video&gt;</code>{" "}
          and{" "}
          <code className="bg-amber-100 px-1 py-0.5 rounded text-xs font-mono">&lt;audio src="song.mp3" controls&gt;&lt;/audio&gt;</code>.
          The <code className="bg-amber-100 px-1 py-0.5 rounded text-xs font-mono">controls</code> attribute adds the browser's built-in
          play/pause bar. You will explore these more in a later module.
        </div>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            The editor has real images already loaded. Try changing the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code> text, adjusting the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">width</code>, or swapping the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">src</code> for any public image URL.
            Notice how the preview updates instantly.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_HTML }}
          height="360px"
        />
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            The check looks for an <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;img&gt;</code>{" "}
            tag that has both a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">src</code> and a
            non-empty <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code>. Use any image URL
            — or the path to a local file if you have one.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: CHALLENGE_STARTER }}
          height="300px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 6. Gate ────────────────────────────────────────── */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-green-800">Challenge passed</p>
              <p className="text-sm text-green-700 mt-0.5">
                Click <strong>Complete &amp; Next</strong> below to continue.
              </p>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5 rounded-2xl bg-stone-50 border border-border">
            <p className="text-sm font-sans text-muted-foreground">
              Complete the challenge above to unlock the next lesson.
            </p>
          </div>
        )}
      </section>

    </article>
  );
}
