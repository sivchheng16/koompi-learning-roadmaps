import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

export default function Module04FileManagement() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);
  const CORRECT = "cp report.txt backup/";

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">File Management</h1>
        <p className="mt-3 text-muted-foreground text-base">
          Good file management is a professional habit. In this lesson you will learn to copy, move, rename, and search files from the terminal — plus how to read and set file permissions.
        </p>
      </section>

      {/* cp */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Copying Files — <code className="text-base font-mono bg-stone-100 px-1.5 py-0.5 rounded">cp</code></h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="bg-stone-100 px-1 rounded text-xs font-mono">cp source destination</code> — the original file stays, and a copy is created at the destination.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
          <div className="px-5 py-4 space-y-1 leading-relaxed">
            <div><span className="text-green-400">$</span> cp report.txt backup/        <span className="text-stone-500"># copy file into folder</span></div>
            <div><span className="text-green-400">$</span> cp report.txt report-v2.txt  <span className="text-stone-500"># copy and rename</span></div>
            <div><span className="text-green-400">$</span> cp -r src/ src-backup/       <span className="text-stone-500"># copy a folder (-r = recursive)</span></div>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground font-mono text-xs">Flag</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["-r", "Copy directories recursively (required for folders)"],
                ["-i", "Ask before overwriting an existing file"],
                ["-v", "Verbose — print each file as it is copied"],
              ].map(([flag, effect]) => (
                <tr key={flag} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{flag}</td>
                  <td className="px-4 py-3 text-muted-foreground">{effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* mv */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Moving and Renaming — <code className="text-base font-mono bg-stone-100 px-1.5 py-0.5 rounded">mv</code></h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="bg-stone-100 px-1 rounded text-xs font-mono">mv</code> moves a file to a new location, or renames it if the destination is in the same directory. Unlike <code className="bg-stone-100 px-1 rounded text-xs font-mono">cp</code>, the original disappears.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
          <div className="px-5 py-4 space-y-1 leading-relaxed">
            <div><span className="text-green-400">$</span> mv draft.txt final.txt          <span className="text-stone-500"># rename in same folder</span></div>
            <div><span className="text-green-400">$</span> mv final.txt Documents/          <span className="text-stone-500"># move to Documents</span></div>
            <div><span className="text-green-400">$</span> mv old-name/ new-name/           <span className="text-stone-500"># rename a folder</span></div>
            <div><span className="text-green-400">$</span> mv *.log logs/                   <span className="text-stone-500"># move all .log files into logs/</span></div>
          </div>
        </div>
      </section>

      {/* rm -r */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Deleting Folders — <code className="text-base font-mono bg-stone-100 px-1.5 py-0.5 rounded">rm -r</code></h2>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
          <div className="px-5 py-4 space-y-1 leading-relaxed">
            <div><span className="text-green-400">$</span> rm file.txt              <span className="text-stone-500"># delete one file</span></div>
            <div><span className="text-green-400">$</span> rm -r old-project/       <span className="text-stone-500"># delete entire folder</span></div>
            <div><span className="text-green-400">$</span> rm -ri old-project/      <span className="text-stone-500"># -i prompts before each delete</span></div>
          </div>
        </div>
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          <strong>No undo.</strong> Files deleted with <code className="bg-red-100 px-1 rounded text-xs font-mono">rm</code> bypass the Recycle Bin and are gone permanently. Use <code className="bg-red-100 px-1 rounded text-xs font-mono">-i</code> when in doubt.
        </div>
      </section>

      {/* find */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Finding Files — <code className="text-base font-mono bg-stone-100 px-1.5 py-0.5 rounded">find</code></h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="bg-stone-100 px-1 rounded text-xs font-mono">find</code> searches the file system starting from a directory you specify. It supports powerful filters.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
          <div className="px-5 py-4 space-y-1 leading-relaxed">
            <div><span className="text-green-400">$</span> find . -name "*.html"         <span className="text-stone-500"># all .html files from here down</span></div>
            <div><span className="text-green-400">$</span> find ~/projects -name "*.js"  <span className="text-stone-500"># all .js files in projects/</span></div>
            <div><span className="text-green-400">$</span> find . -type d                <span className="text-stone-500"># list only directories</span></div>
            <div><span className="text-green-400">$</span> find . -name "index.html"</div>
            <div className="text-stone-400">./koompi-site/index.html</div>
            <div className="text-stone-400">./portfolio/index.html</div>
          </div>
        </div>
      </section>

      {/* grep */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Searching Inside Files — <code className="text-base font-mono bg-stone-100 px-1.5 py-0.5 rounded">grep</code></h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="bg-stone-100 px-1 rounded text-xs font-mono">grep</code> searches for text patterns inside files. It prints every matching line with the filename.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
          <div className="px-5 py-4 space-y-1 leading-relaxed">
            <div><span className="text-green-400">$</span> grep "TODO" main.js              <span className="text-stone-500"># find TODOs in one file</span></div>
            <div><span className="text-green-400">$</span> grep -r "console.log" src/       <span className="text-stone-500"># search recursively</span></div>
            <div><span className="text-green-400">$</span> grep -n "function" app.js        <span className="text-stone-500"># show line numbers</span></div>
            <div><span className="text-green-400">$</span> grep -i "error" server.log       <span className="text-stone-500"># case-insensitive</span></div>
            <div className="mt-2 text-stone-400">server.log:42: ERROR: Connection refused</div>
            <div className="text-stone-400">server.log:87: error: timeout after 30s</div>
          </div>
        </div>
      </section>

      {/* Permissions */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">File Permissions</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every file has three permission groups: <strong>owner</strong>, <strong>group</strong>, and <strong>others</strong>. Each group can have read (r), write (w), and execute (x) permissions.
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Reading ls -la output</div>
          <div className="px-5 py-4 space-y-2 leading-relaxed">
            <div><span className="text-green-400">$</span> ls -la</div>
            <div className="text-stone-400">-rwxr-xr-- 1 student student 4096 Apr 24 09:00 deploy.sh</div>
            <div className="mt-3 text-stone-300 text-xs space-y-1">
              <div><span className="text-yellow-400">-</span>  — file type (- = file, d = directory, l = symlink)</div>
              <div><span className="text-yellow-400">rwx</span> — owner: read + write + execute</div>
              <div><span className="text-yellow-400">r-x</span> — group: read + execute (no write)</div>
              <div><span className="text-yellow-400">r--</span> — others: read only</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground"><code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">chmod</code> — Change Permissions</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
            <div className="px-5 py-4 space-y-1 leading-relaxed">
              <div><span className="text-green-400">$</span> chmod +x deploy.sh     <span className="text-stone-500"># make executable</span></div>
              <div><span className="text-green-400">$</span> chmod 644 index.html   <span className="text-stone-500"># owner rw, group r, others r</span></div>
              <div><span className="text-green-400">$</span> chmod 755 script.sh    <span className="text-stone-500"># owner rwx, group rx, others rx</span></div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Mode</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Permissions</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Common use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["644", "rw-r--r--", "Regular files (HTML, CSS, images)"],
                  ["755", "rwxr-xr-x", "Executable scripts, directories"],
                  ["600", "rw-------", "Private config files (SSH keys)"],
                  ["700", "rwx------", "Private scripts"],
                ].map(([mode, perms, use]) => (
                  <tr key={mode} className="hover:bg-stone-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{mode}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{perms}</td>
                    <td className="px-4 py-3 text-muted-foreground">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Text editors */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Editing Files in the Terminal</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When you are on a remote server without a graphical editor, you need a terminal-based text editor. The two most common are <strong>nano</strong> (beginner-friendly) and <strong>vim</strong> (powerful, steep learning curve).
        </p>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">nano — Simple and Beginner-Friendly</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
            <div className="px-5 py-4 space-y-1 leading-relaxed">
              <div><span className="text-green-400">$</span> nano index.html   <span className="text-stone-500"># open a file in nano</span></div>
              <div className="text-stone-400 text-xs mt-3">Key shortcuts shown at the bottom of nano:</div>
              <div className="text-stone-400 text-xs">^O = save (Ctrl+O)   ^X = exit (Ctrl+X)   ^W = search (Ctrl+W)</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">vim — Essential Survival Commands</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal</div>
            <div className="px-5 py-4 space-y-1 leading-relaxed">
              <div><span className="text-green-400">$</span> vim index.html</div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-foreground font-mono text-xs">Key</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["i", "Enter INSERT mode (start typing)"],
                  ["Esc", "Return to NORMAL mode"],
                  [":w", "Save (write)"],
                  [":q", "Quit"],
                  [":wq", "Save and quit"],
                  [":q!", "Quit without saving"],
                ].map(([key, action]) => (
                  <tr key={key} className="hover:bg-stone-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{key}</td>
                    <td className="px-4 py-3 text-muted-foreground">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Practical workflow */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">A Practical Workflow</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Here is a common sequence when starting a new project:
        </p>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">Terminal — setting up a project from scratch</div>
          <div className="px-5 py-4 space-y-1 leading-relaxed">
            <div><span className="text-green-400">$</span> cd ~/projects</div>
            <div><span className="text-green-400">$</span> mkdir koompi-site</div>
            <div><span className="text-green-400">$</span> cd koompi-site</div>
            <div><span className="text-green-400">$</span> mkdir css js images</div>
            <div><span className="text-green-400">$</span> touch index.html css/style.css js/main.js</div>
            <div><span className="text-green-400">$</span> ls -la</div>
            <div className="text-stone-400">total 16</div>
            <div className="text-stone-400">drwxr-xr-x 5 student student 4096 Apr 24 09:15 .</div>
            <div className="text-stone-400">drwxr-xr-x 8 student student 4096 Apr 24 09:15 ..</div>
            <div className="text-stone-400">drwxr-xr-x 2 student student 4096 Apr 24 09:15 <span className="text-blue-400">css</span></div>
            <div className="text-stone-400">drwxr-xr-x 2 student student 4096 Apr 24 09:15 <span className="text-blue-400">images</span></div>
            <div className="text-stone-400">-rw-r--r-- 1 student student    0 Apr 24 09:15 index.html</div>
            <div className="text-stone-400">drwxr-xr-x 2 student student 4096 Apr 24 09:15 <span className="text-blue-400">js</span></div>
            <div className="mt-2"><span className="text-green-400">$</span> nano index.html   <span className="text-stone-500"># start editing</span></div>
          </div>
        </div>
      </section>

      {/* Knowledge check */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground">
          Which command copies a file named <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">report.txt</code> into the <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">backup/</code> folder?
        </p>
        <div className="flex flex-col gap-3">
          {[
            "mv report.txt backup/",
            "cp report.txt backup/",
            "cp backup/ report.txt",
            "copy report.txt backup/",
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
              <code className="font-mono text-xs">{opt}</code>
            </button>
          ))}
        </div>
        {selected && selected !== CORRECT && (
          <p className="text-sm text-red-600">
            {selected === "mv report.txt backup/"
              ? "mv would work but it moves the file, removing the original. cp keeps both copies."
              : selected === "cp backup/ report.txt"
              ? "The order is cp SOURCE DESTINATION — source comes first."
              : "copy is not a standard Linux command. Use cp."}
          </p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700">Correct! <code className="bg-stone-100 px-1 rounded text-xs font-mono">cp source destination</code> — the original file stays intact and a copy appears in <code className="bg-stone-100 px-1 rounded text-xs font-mono">backup/</code>.</p>
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
