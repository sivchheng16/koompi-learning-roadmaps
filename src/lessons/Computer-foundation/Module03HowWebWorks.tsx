import React from "react";

export default function Module03HowWebWorks() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ─────────────────────────────────────────── */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">How the Web Works</h1>
        <p className="mt-3 text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          You type "google.com" and 0.3 seconds later a full page appears. No magic — just a precise sequence of steps your computer and Google's servers perform together every single time.
        </p>
      </section>

      {/* ── 2. Internet vs Web ──────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">The Internet vs The Web</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          People use these words interchangeably, but they are two different things.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-stone-50 p-5 space-y-2">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">The Internet</p>
            <p className="text-sm font-semibold text-foreground">The infrastructure — the roads</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A global network of physical cables, routers, and satellites that connect billions of devices. It carries all kinds of traffic — email, video calls, gaming, and yes, the web.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-stone-50 p-5 space-y-2">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">The Web</p>
            <p className="text-sm font-semibold text-foreground">One service on it — the cars</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A collection of documents (webpages) linked together and accessed via a browser using a protocol called HTTP. The web runs on the internet, but the internet existed before the web.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. IP Addresses & DNS ───────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">IP Addresses &amp; DNS</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every device on the internet has a unique numerical address called an <strong className="text-foreground">IP address</strong> — like a home address for your computer. For example, one of Google's servers sits at <code className="text-xs bg-stone-100 px-1.5 py-0.5 rounded">142.250.80.46</code>.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Nobody memorises IP addresses. Instead, we use human-friendly names like <strong className="text-foreground">google.com</strong>. The <strong className="text-foreground">Domain Name System (DNS)</strong> is the phone book that translates one to the other. When you type a domain, your computer asks a DNS server: "What IP address does this name belong to?" — and gets the answer back in milliseconds.
        </p>
        <div className="rounded-xl border border-border bg-stone-50 px-6 py-5 font-mono text-sm space-y-1">
          <div className="text-muted-foreground">google.com  <span className="text-foreground">→</span>  <span className="text-primary">142.250.80.46</span></div>
          <div className="text-muted-foreground">github.com  <span className="text-foreground">→</span>  <span className="text-primary">140.82.121.4</span></div>
          <div className="text-muted-foreground">koompi.org  <span className="text-foreground">→</span>  <span className="text-primary">104.21.x.x</span></div>
        </div>
      </section>

      {/* ── 4. HTTP & HTTPS ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">HTTP &amp; HTTPS</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">HTTP</strong> (HyperText Transfer Protocol) is the language browsers and servers use to talk to each other. The browser sends a <em>request</em>; the server sends a <em>response</em>. That's the entire conversation, every time.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">HTTPS</strong> is the same protocol with encryption added (the S stands for Secure). The data travelling between your browser and the server is scrambled so no one in the middle can read it. Always prefer sites that start with <code className="text-xs bg-stone-100 px-1.5 py-0.5 rounded">https://</code>.
        </p>
      </section>

      {/* ── 5. Request-Response Cycle ───────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">The Request-Response Cycle</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every page load follows the same sequence. Here is what happens the moment you press Enter:
        </p>
        <div className="rounded-xl border border-border bg-stone-50 p-6 space-y-3 font-mono text-sm">
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <span className="text-foreground font-semibold">Browser</span>
              <span className="text-muted-foreground"> sends a GET request for </span>
              <span className="text-primary">google.com</span>
            </div>
          </div>
          <div className="ml-3 pl-3 border-l-2 border-border text-muted-foreground text-xs py-0.5">↓</div>
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <span className="text-foreground font-semibold">DNS</span>
              <span className="text-muted-foreground"> resolves </span>
              <span className="text-primary">google.com</span>
              <span className="text-muted-foreground"> → </span>
              <span className="text-primary">142.250.80.46</span>
            </div>
          </div>
          <div className="ml-3 pl-3 border-l-2 border-border text-muted-foreground text-xs py-0.5">↓</div>
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <span className="text-foreground font-semibold">Server</span>
              <span className="text-muted-foreground"> at that IP receives the request</span>
            </div>
          </div>
          <div className="ml-3 pl-3 border-l-2 border-border text-muted-foreground text-xs py-0.5">↓</div>
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">4</span>
            <div>
              <span className="text-foreground font-semibold">Server</span>
              <span className="text-muted-foreground"> sends back HTML, CSS, and JS files</span>
            </div>
          </div>
          <div className="ml-3 pl-3 border-l-2 border-border text-muted-foreground text-xs py-0.5">↓</div>
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">5</span>
            <div>
              <span className="text-foreground font-semibold">Browser</span>
              <span className="text-muted-foreground"> reads the files and renders the page you see</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The whole cycle — all five steps — typically completes in under one second.
        </p>
      </section>

      {/* ── 6. Clients & Servers ────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Clients &amp; Servers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-stone-50 p-5 space-y-2">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Client</p>
            <p className="text-sm font-semibold text-foreground">Your browser (Chrome, Firefox…)</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Makes requests and displays responses. It is the device or program asking for information.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-stone-50 p-5 space-y-2">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Server</p>
            <p className="text-sm font-semibold text-foreground">A computer running 24/7</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Listens for incoming requests and sends back the right files. A server is just a computer — yours could be one too.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. HTTP Methods ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">HTTP Methods</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every HTTP request includes a <em>method</em> that tells the server what the client wants to do.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-mono font-medium text-foreground">Method</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Meaning</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["GET", "Read — fetch a resource", "Load a webpage"],
                ["POST", "Create — send new data", "Submit a sign-up form"],
                ["PUT", "Update — replace existing data", "Edit your profile"],
                ["DELETE", "Remove — delete a resource", "Delete a post"],
              ].map(([method, meaning, example]) => (
                <tr key={method} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-primary font-semibold">{method}</td>
                  <td className="px-4 py-3 text-muted-foreground">{meaning}</td>
                  <td className="px-4 py-3 text-muted-foreground">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 8. Status Codes ─────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">HTTP Status Codes</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every response comes with a three-digit number that summarises what happened.
        </p>
        <div className="space-y-3">
          {[
            { code: "200", label: "OK", desc: "Everything worked. Here is your content.", color: "text-green-700 bg-green-50 border-green-200" },
            { code: "301", label: "Moved Permanently", desc: "This URL has moved — the browser follows the new address automatically.", color: "text-blue-700 bg-blue-50 border-blue-200" },
            { code: "404", label: "Not Found", desc: "The server got the request but the page doesn't exist.", color: "text-orange-700 bg-orange-50 border-orange-200" },
            { code: "500", label: "Internal Server Error", desc: "Something broke on the server's side — not your fault.", color: "text-red-700 bg-red-50 border-red-200" },
          ].map(({ code, label, desc, color }) => (
            <div key={code} className={`flex items-start gap-4 rounded-xl border px-5 py-4 ${color}`}>
              <span className="shrink-0 font-mono text-lg font-bold">{code}</span>
              <div>
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-sm mt-0.5 opacity-80">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Summary ──────────────────────────────────────── */}
      <section className="rounded-2xl border border-border bg-stone-50 px-6 py-6 space-y-3">
        <h2 className="text-base font-semibold text-foreground">What you now know</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary shrink-0">→</span> The internet is the physical network; the web is a service that runs on it.</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">→</span> Every device has an IP address; DNS translates human-readable names into those addresses.</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">→</span> Browsers (clients) send HTTP requests; servers respond with files; HTTPS encrypts the conversation.</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">→</span> The four HTTP methods — GET, POST, PUT, DELETE — map to read, create, update, and remove.</li>
          <li className="flex gap-2"><span className="text-primary shrink-0">→</span> Status codes tell you whether the request succeeded (200), the page moved (301), was missing (404), or the server failed (500).</li>
        </ul>
      </section>

    </article>
  );
}
