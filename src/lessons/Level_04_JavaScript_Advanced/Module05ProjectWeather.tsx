import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

// Open-Meteo — free, no API key, Phnom Penh coords
const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=11.56&longitude=104.92&current_weather=true";

const STARTER_HTML = `<div id="app" style="font-family:system-ui,sans-serif;max-width:480px;margin:40px auto;padding:0 20px">
  <h1 style="font-size:1.6rem;margin-bottom:16px">Weather</h1>

  <div style="display:flex;gap:8px;margin-bottom:20px">
    <input id="lat"  type="number" step="any" placeholder="Latitude"  value="11.56"  style="flex:1;padding:8px 12px;border:1px solid #ddd;border-radius:8px">
    <input id="lon"  type="number" step="any" placeholder="Longitude" value="104.92" style="flex:1;padding:8px 12px;border:1px solid #ddd;border-radius:8px">
    <button id="btn" style="padding:8px 16px;background:#2563eb;color:#fff;border:none;border-radius:8px;cursor:pointer">Go</button>
  </div>

  <div id="result" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;min-height:80px">
    Press Go to fetch weather for Phnom Penh.
  </div>
</div>`;

const STARTER_JS = `document.getElementById("btn").addEventListener("click", fetchWeather);

async function fetchWeather() {
  const lat = document.getElementById("lat").value;
  const lon = document.getElementById("lon").value;
  const result = document.getElementById("result");

  result.textContent = "Loading...";

  try {
    const url =
      \`https://api.open-meteo.com/v1/forecast\` +
      \`?latitude=\${lat}&longitude=\${lon}&current_weather=true\`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    const data = await response.json();

    const w = data.current_weather;
    result.innerHTML = \`
      <p style="font-size:2.5rem;font-weight:700;margin:0">\${w.temperature}°C</p>
      <p style="color:#64748b;margin:4px 0 0">Wind speed: \${w.windspeed} km/h</p>
      <p style="color:#64748b;margin:4px 0 0">Coordinates: \${lat}, \${lon}</p>
    \`;
  } catch (err) {
    result.innerHTML = \`<p style="color:#dc2626">Error: \${err.message}</p>\`;
  }
}`;

const challenge = {
  prompt:
    "Your page must have a `<div>` and your JS must call `fetch(` to load weather data from the Open-Meteo API.",
  check(html: string, _css: string, js: string) {
    if (!/<div/i.test(html))
      return { passed: false, message: "Add a <div> to your HTML to display the weather result." };
    if (!/\bfetch\s*\(/.test(js))
      return { passed: false, message: "Call `fetch(url)` in your JavaScript to load weather data." };
    return { passed: true, message: "Weather app working — you just built a real API-powered page!" };
  },
};

export default function Module05ProjectWeather() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/60">
          Track 04 · JavaScript Advanced · Capstone
        </p>
        <h1 className="text-4xl font-serif text-foreground">Project: Weather App</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Put everything together — async/await, fetch, error handling, and DOM manipulation —
          to build a working weather display that calls a real API with no API key required.
        </p>
      </section>

      {/* What you will build */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">What You Will Build</h2>
        <p className="text-base text-muted-foreground">
          A small web page with latitude/longitude inputs. When the user clicks Go, you fetch
          current weather from the{" "}
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-foreground"
          >
            Open-Meteo API
          </a>{" "}
          — completely free, no sign-up needed — and display the temperature and wind speed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            ["fetch()", "Call the Open-Meteo REST endpoint"],
            ["async/await", "Handle the two async steps cleanly"],
            ["try/catch", "Show a friendly error if the network fails"],
            ["DOM", "Update the result div without a page reload"],
          ].map(([skill, desc]) => (
            <div key={skill} className="rounded-xl border border-border px-4 py-3">
              <p className="font-mono font-semibold text-foreground">{skill}</p>
              <p className="text-muted-foreground mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The API */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">The Open-Meteo API</h2>
        <p className="text-base text-muted-foreground">
          Open-Meteo is a free, open-source weather API. The endpoint below returns current
          weather for any latitude/longitude — no API key, no account.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Phnom Penh — try it in your browser
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`${API_URL}`}</pre>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Response shape
          </div>
          <pre className="px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">{`{
  "latitude": 11.5625,
  "longitude": 104.9375,
  "current_weather": {
    "temperature": 31.2,       // °C
    "windspeed": 14.7,         // km/h
    "winddirection": 180,
    "weathercode": 3,
    "time": "2025-04-24T12:00"
  }
}`}</pre>
        </div>
      </section>

      {/* Build steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Build Steps</h2>

        <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
          <li>Add a <code className="font-mono">div#result</code> to display the fetched data.</li>
          <li>Listen for a button click that reads lat/lon from inputs.</li>
          <li>Build the URL with the coordinates and call <code className="font-mono">fetch(url)</code>.</li>
          <li>Check <code className="font-mono">response.ok</code>, then parse with <code className="font-mono">.json()</code>.</li>
          <li>Write the temperature and wind speed into the result div.</li>
          <li>Wrap everything in <code className="font-mono">try/catch</code> and show an error message if it fails.</li>
        </ol>
      </section>

      {/* Playground */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Try it / Build it</h2>
        <p className="text-base text-muted-foreground">
          A working starter is provided below. Click <strong>Go</strong> in the preview to see
          Phnom Penh's live weather. Then extend the code — add a loading state, show the
          weather code, or style the card.
        </p>
        <CodePlayground
          mode="web"
          starter={{ html: STARTER_HTML, js: STARTER_JS }}
          height="460px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* Extensions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Take It Further</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>Add a loading spinner while the request is in-flight.</li>
          <li>Map the <code className="font-mono">weathercode</code> integer to a description (e.g. 0 = Clear sky).</li>
          <li>Add city presets (Siem Reap, Battambang, Sihanoukville).</li>
          <li>Request hourly forecast (<code className="font-mono">&amp;hourly=temperature_2m</code>) and draw a simple chart.</li>
          <li>Persist the last-used coordinates in <code className="font-mono">localStorage</code>.</li>
        </ul>
      </section>

      {/* Gate */}
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
