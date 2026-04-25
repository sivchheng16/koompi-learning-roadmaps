import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

export default function Module03LinuxTerminal() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);
  const CORRECT = "pwd";

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Linux Terminal Fundamentals</h1>
        <p className="mt-3 text-muted-foreground text-base">
          The terminal is the most powerful tool on your computer. Instead of clicking icons, you type commands — and with commands you can do in seconds what would take minutes with a mouse.
        </p>
      </section>

      {/* What is the terminal */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">What Is the Terminal?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The <strong>terminal</strong> (also called the <strong>shell</strong> or <strong>command line</strong>) is a text interface to your operating system. You type a command, press Enter, and the shell executes it. On KOOMPI Linux the default shell is <strong>bash</strong>.
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">GUI (click)</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Terminal (type)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Double-click a folder to open it", "cd Documents/"],
                ["Right-click → New Folder", "mkdir my-project"],
                ["Drag a file to move it", "mv file.txt Documents/"],
                ["Delete key / Trash", "rm file.txt"],
                ["Limited to menu options", "Full control of the system"],
              ].map(([gui, cli]) => (
                <tr key={gui} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 text-muted-foreground">{gui}</td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{cli}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">The prompt — what you see when you open a terminal</div>
          <div className="px-5 py-4 space-y-3 leading-relaxed">
            <div><span className="text-green-400">student@koompi</span>:<span className="text-blue-400">~</span>$ </div>
            <div className="text-stone-400 text-xs space-y-1">
              <div><span className="text-green-400">student</span> — your username</div>
              <div><span className="text-stone-300">koompi</span> — computer name (hostname)</div>
              <div><span className="text-blue-400">~</span> — current directory (~ means home)</div>
              <div><span className="text-stone-300">$</span> — ready for your command</div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Open a terminal on KOOMPI with <kbd className="bg-stone-100 border border-stone-300 rounded px-1.5 py-0.5 text-xs font-mono">Ctrl</kbd> + <kbd className="bg-stone-100 border border-stone-300 rounded px-1.5 py-0.5 text-xs font-mono">Alt</kbd> + <kbd className="bg-stone-100 border border-stone-300 rounded px-1.5 py-0.5 text-xs font-mono">T</kbd>, or search for "Terminal" in the application menu.
        </p>
      </section>

      {/* File system tree */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">The File System Tree</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Linux organizes everything in a single tree starting at <code className="bg-stone-100 px-1 rounded text-xs font-mono">/</code> (root). Your personal files live in <code className="bg-stone-100 px-1 rounded text-xs font-mono">/home/your-username/</code>, abbreviated as <code className="bg-stone-100 px-1 rounded text-xs font-mono">~</code>.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Linux directory structure</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`/                      ← root — the very top
├── home/              ← all user home folders
│   └── student/       ← your home (~)
│       ├── Documents/
│       ├── Downloads/
│       ├── Desktop/
│       └── projects/  ← where we will put our code
├── etc/               ← system configuration files
├── usr/               ← installed programs
└── var/               ← logs, temporary data`}</pre>
        </div>
      </section>

      {/* Navigation commands */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Navigation Commands</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2"><code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">pwd</code> — Print Working Directory</h3>
            <p className="text-sm text-muted-foreground mb-3">Shows the full path of the folder you are currently inside. Use this whenever you feel lost.</p>
            <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
              <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
              <div className="px-5 py-4 space-y-1 leading-relaxed">
                <div><span className="text-green-400">$</span> pwd</div>
                <div className="text-stone-400">/home/student</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2"><code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">ls</code> — List</h3>
            <p className="text-sm text-muted-foreground mb-3">Lists the files and folders in the current directory.</p>
            <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
              <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
              <div className="px-5 py-4 space-y-1 leading-relaxed">
                <div><span className="text-green-400">$</span> ls</div>
                <div className="text-stone-400">Desktop  Documents  Downloads  Music  projects</div>
                <div className="mt-2"><span className="text-green-400">$</span> ls -la</div>
                <div className="text-stone-400">total 40</div>
                <div className="text-stone-400">drwxr-xr-x  8 student student 4096 Apr 24 09:00 <span className="text-blue-400">.</span></div>
                <div className="text-stone-400">drwxr-xr-x  3 root    root    4096 Apr 20 10:00 <span className="text-blue-400">..</span></div>
                <div className="text-stone-400">-rw-r--r--  1 student student  220 Apr 20 10:00 .bashrc</div>
                <div className="text-stone-400">drwxr-xr-x  2 student student 4096 Apr 23 14:30 <span className="text-blue-400">projects</span></div>
              </div>
            </div>
            <div className="mt-3 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium text-foreground font-mono text-xs">Flag</th>
                    <th className="text-left px-4 py-2 font-medium text-foreground">What it adds</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["ls", "Simple list"],
                    ["ls -l", "Long format: permissions, size, date"],
                    ["ls -a", "Show hidden files (names start with .)"],
                    ["ls -la", "Long format + hidden files"],
                  ].map(([cmd, what]) => (
                    <tr key={cmd} className="hover:bg-stone-50/50">
                      <td className="px-4 py-2 font-mono text-xs text-foreground">{cmd}</td>
                      <td className="px-4 py-2 text-muted-foreground">{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2"><code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">cd</code> — Change Directory</h3>
            <p className="text-sm text-muted-foreground mb-3">Moves you into a different folder.</p>
            <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
              <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
              <div className="px-5 py-4 space-y-1 leading-relaxed">
                <div><span className="text-green-400">$</span> cd Documents         <span className="text-stone-500"># go into Documents</span></div>
                <div><span className="text-green-400">$</span> cd ..                 <span className="text-stone-500"># go up one level</span></div>
                <div><span className="text-green-400">$</span> cd ~                  <span className="text-stone-500"># go to home directory</span></div>
                <div><span className="text-green-400">$</span> cd /                  <span className="text-stone-500"># go to root</span></div>
                <div><span className="text-green-400">$</span> cd ~/projects/myapp   <span className="text-stone-500"># absolute path from home</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creating files and dirs */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Creating Files and Directories</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2"><code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">mkdir</code> — Make Directory</h3>
            <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
              <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
              <div className="px-5 py-4 space-y-1 leading-relaxed">
                <div><span className="text-green-400">$</span> mkdir my-project</div>
                <div><span className="text-green-400">$</span> mkdir -p projects/web/css  <span className="text-stone-500"># -p creates nested folders</span></div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2"><code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">touch</code> — Create an Empty File</h3>
            <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
              <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
              <div className="px-5 py-4 space-y-1 leading-relaxed">
                <div><span className="text-green-400">$</span> touch index.html</div>
                <div><span className="text-green-400">$</span> touch style.css script.js  <span className="text-stone-500"># multiple files at once</span></div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2"><code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">cat</code> — Display File Contents</h3>
            <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
              <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
              <div className="px-5 py-4 space-y-1 leading-relaxed">
                <div><span className="text-green-400">$</span> cat index.html</div>
                <div className="text-stone-400">&lt;!DOCTYPE html&gt;</div>
                <div className="text-stone-400">&lt;html lang="en"&gt; ...</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2"><code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">rm</code> — Remove (Delete)</h3>
            <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
              <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
              <div className="px-5 py-4 space-y-1 leading-relaxed">
                <div><span className="text-green-400">$</span> rm old-file.txt         <span className="text-stone-500"># delete a file</span></div>
                <div><span className="text-green-400">$</span> rm -r old-folder/       <span className="text-stone-500"># delete a folder and all its contents</span></div>
              </div>
            </div>
            <div className="mt-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              <strong>Warning:</strong> <code className="bg-red-100 px-1 rounded text-xs font-mono">rm</code> is permanent. There is no Recycle Bin. Always double-check the path before pressing Enter.
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2"><code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">man</code> — Manual</h3>
            <p className="text-sm text-muted-foreground mb-3">Shows the full documentation for any command. Press <kbd className="bg-stone-100 border border-stone-300 rounded px-1 py-0.5 text-xs font-mono">q</kbd> to exit.</p>
            <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
              <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
              <div className="px-5 py-4 space-y-1 leading-relaxed">
                <div><span className="text-green-400">$</span> man ls    <span className="text-stone-500"># manual page for ls</span></div>
                <div><span className="text-green-400">$</span> man mkdir <span className="text-stone-500"># manual page for mkdir</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speed tips */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Work Faster</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Shortcut</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">What it does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Tab", "Auto-complete file/folder names — use this constantly"],
                ["↑ / ↓ arrows", "Scroll through previous commands"],
                ["Ctrl + C", "Cancel the current running command"],
                ["Ctrl + L", "Clear the screen (same as typing clear)"],
                ["Ctrl + A / E", "Jump to start / end of the current line"],
              ].map(([key, action]) => (
                <tr key={key} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{key}</td>
                  <td className="px-4 py-3 text-muted-foreground">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Tab completion in action</div>
          <div className="px-5 py-4 space-y-1 leading-relaxed">
            <div><span className="text-green-400">$</span> cd Doc<span className="text-yellow-400">[Tab]</span></div>
            <div className="text-stone-400">→ cd Documents/     (auto-completed!)</div>
            <div className="mt-2"><span className="text-green-400">$</span> ls ~/pro<span className="text-yellow-400">[Tab]</span></div>
            <div className="text-stone-400">→ ls ~/projects/</div>
          </div>
        </div>
      </section>

      {/* Quick reference */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Reference</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground font-mono text-xs">Command</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Meaning</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["pwd", "Print current directory", "pwd"],
                ["ls", "List files", "ls -la"],
                ["cd", "Change directory", "cd ~/projects"],
                ["mkdir", "Make directory", "mkdir my-app"],
                ["touch", "Create empty file", "touch index.html"],
                ["cat", "Display file contents", "cat README.md"],
                ["rm", "Remove file", "rm old.txt"],
                ["rm -r", "Remove folder", "rm -r dist/"],
                ["man", "Read manual", "man ls"],
              ].map(([cmd, meaning, ex]) => (
                <tr key={cmd} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{cmd}</td>
                  <td className="px-4 py-3 text-muted-foreground">{meaning}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Knowledge check */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground">
          Which command shows what directory you are currently in?
        </p>
        <div className="flex flex-col gap-3">
          {[
            "ls",
            "pwd",
            "cd",
            "cat",
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
              <code className="font-mono">{opt}</code>
            </button>
          ))}
        </div>
        {selected && selected !== CORRECT && (
          <p className="text-sm text-red-600">Not quite — <code className="bg-stone-100 px-1 rounded text-xs font-mono">ls</code> lists files, <code className="bg-stone-100 px-1 rounded text-xs font-mono">cd</code> changes directories, <code className="bg-stone-100 px-1 rounded text-xs font-mono">cat</code> reads files. Which one <em>prints your location</em>?</p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700">Correct! <code className="bg-stone-100 px-1 rounded text-xs font-mono">pwd</code> stands for <strong>Print Working Directory</strong>. Run it any time you need to know where you are in the file system.</p>
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
