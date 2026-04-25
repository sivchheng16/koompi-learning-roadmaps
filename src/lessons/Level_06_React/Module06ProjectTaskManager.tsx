import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module06ProjectTaskManager() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
          Module 06 — Capstone Project
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Project: Task Manager
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          This is your capstone for the React track. You'll build a working task manager
          inside the playground — adding tasks, marking them complete, and deleting them.
          Everything you've learned comes together here: state, events, list rendering, and
          conditional styling.
        </p>
        <div className="grid grid-cols-2 gap-4 pt-2">
          {[
            { label: "useState", desc: "Store tasks array" },
            { label: "Events", desc: "Add, complete, delete" },
            { label: "Array methods", desc: "map, filter" },
            { label: "Conditional style", desc: "Strikethrough done tasks" },
          ].map(({ label, desc }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-stone-50 px-4 py-3"
            >
              <p className="font-mono font-bold text-foreground text-sm">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Design before you build</h2>
        <p className="text-muted-foreground leading-relaxed">
          A task manager needs three pieces of state working together:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "tasks — an array of task objects, each with { id, text, done }.",
            "inputValue — the controlled text input for the new task.",
            "Derived data — the filtered list is computed from tasks on every render, not stored separately.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-blue-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-foreground pt-4">Key operations</h2>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// Add a task
setTasks([...tasks, { id: Date.now(), text: inputValue, done: false }]);

// Toggle complete
setTasks(tasks.map(t =>
  t.id === id ? { ...t, done: !t.done } : t
));

// Delete a task
setTasks(tasks.filter(t => t.id !== id));`}
        </pre>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Live example — study the structure</h2>
        <p className="text-sm text-muted-foreground">
          Read through this working task manager before building your own version.
          Notice how all three operations use different array methods — spread for add, map
          for toggle, filter for delete. Edit it freely.
        </p>
        <CodePlayground
          mode="react"
          starter={{
            js: `function App() {
  const [tasks, setTasks] = React.useState([
    { id: 1, text: "Learn React components", done: true },
    { id: 2, text: "Master useState", done: true },
    { id: 3, text: "Build the task manager", done: false },
  ]);
  const [input, setInput] = React.useState("");

  function addTask() {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  }

  function toggle(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function remove(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const s = {
    wrap: { fontFamily: "system-ui", padding: "24px", maxWidth: 480 },
    row: { display: "flex", gap: 8, marginBottom: 16 },
    input: { flex: 1, padding: "8px 12px", borderRadius: 8,
      border: "1px solid #e2e8f0", fontSize: 14 },
    addBtn: { padding: "8px 16px", background: "#2563eb", color: "#fff",
      border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14 },
    item: (done) => ({
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 12px", borderRadius: 10, marginBottom: 8,
      background: done ? "#f1f5f9" : "#fff",
      border: "1px solid #e2e8f0"
    }),
    text: (done) => ({
      flex: 1, fontSize: 14,
      textDecoration: done ? "line-through" : "none",
      color: done ? "#94a3b8" : "#1e293b"
    }),
    del: { background: "none", border: "none", cursor: "pointer",
      color: "#94a3b8", fontSize: 16 },
  };

  return (
    <div style={s.wrap}>
      <h2 style={{ marginBottom: 16 }}>Task Manager</h2>
      <div style={s.row}>
        <input
          style={s.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
          placeholder="Add a task..."
        />
        <button style={s.addBtn} onClick={addTask}>Add</button>
      </div>
      {tasks.map(t => (
        <div key={t.id} style={s.item(t.done)}>
          <input type="checkbox" checked={t.done}
            onChange={() => toggle(t.id)} />
          <span style={s.text(t.done)}>{t.text}</span>
          <button style={s.del} onClick={() => remove(t.id)}>✕</button>
        </div>
      ))}
      <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>
        {tasks.filter(t => !t.done).length} remaining
      </p>
    </div>
  );
}`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge — build it yourself</h2>
        <p className="text-sm text-muted-foreground">
          Start from the skeleton below and implement the full task manager. Your solution must:
        </p>
        <ul className="space-y-1 text-sm text-muted-foreground mb-2">
          {[
            "Use useState to store the tasks array.",
            "Render tasks with .map().",
            "Include an onClick that marks a task done (strikethrough).",
            "Include an onClick or .filter() that removes a task.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <CodePlayground
          mode="react"
          starter={{
            js: `function App() {
  const [tasks, setTasks] = React.useState([]);
  const [input, setInput] = React.useState("");

  // 1. addTask — push a new { id, text, done: false } into tasks
  function addTask() {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  }

  // 2. toggle(id) — flip the done flag on the matching task
  function toggle(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  // 3. remove(id) — filter out the task with this id
  function remove(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: "24px", maxWidth: 480 }}>
      <h2>My Tasks</h2>

      {/* Input row */}
      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
          placeholder="What needs doing?"
          style={{ flex: 1, padding: "8px 12px", borderRadius: 8,
            border: "1px solid #e2e8f0", fontSize: 14 }}
        />
        <button onClick={addTask}
          style={{ padding: "8px 16px", background: "#2563eb", color: "#fff",
            border: "none", borderRadius: 8, cursor: "pointer" }}>
          Add
        </button>
      </div>

      {/* Task list */}
      {tasks.map(t => (
        <div key={t.id}
          style={{ display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 10, marginBottom: 8,
            border: "1px solid #e2e8f0", background: t.done ? "#f8fafc" : "#fff" }}>
          <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
          <span style={{ flex: 1, fontSize: 14,
            textDecoration: t.done ? "line-through" : "none",
            color: t.done ? "#94a3b8" : "#1e293b" }}>
            {t.text}
          </span>
          <button onClick={() => remove(t.id)}
            style={{ background: "none", border: "none",
              cursor: "pointer", color: "#94a3b8", fontSize: 16 }}>
            ✕
          </button>
        </div>
      ))}

      {tasks.length === 0 && (
        <p style={{ color: "#94a3b8", fontSize: 14 }}>No tasks yet — add one above!</p>
      )}
    </div>
  );
}`,
          }}
          challenge={{
            prompt:
              "Build a task manager: add tasks, mark done, delete tasks using useState, map, onClick, and filter.",
            check(_html, _css, js) {
              if (!js.includes("useState") && !js.includes("React.useState"))
                return { passed: false, message: "Use React.useState to store your tasks." };
              if (!js.includes("map("))
                return { passed: false, message: "Use .map() to render the task list." };
              if (!js.includes("onClick"))
                return { passed: false, message: "Add onClick handlers for your buttons." };
              if (!js.includes("filter(") && !js.includes("splice"))
                return { passed: false, message: "Use .filter() to remove tasks from state." };
              return {
                passed: true,
                message:
                  "React track complete! You built a real app from scratch — components, state, events, and array operations all in one.",
              };
            },
          }}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
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
