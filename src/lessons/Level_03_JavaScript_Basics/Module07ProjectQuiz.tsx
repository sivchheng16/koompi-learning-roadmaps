import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

export default function Module07ProjectQuiz() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase">
          Module 07 — Capstone Project
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Project: Multiple-Choice Quiz App
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          You've learned variables, conditions, functions, arrays, and DOM
          manipulation. Now you'll combine all of them into one working app — a
          multiple-choice quiz. This is the kind of project you can put in your
          portfolio and show to anyone.
        </p>

        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm font-semibold text-amber-800 mb-2">What you'll build</p>
          <ul className="space-y-1 text-sm text-amber-900">
            {[
              "At least 2 questions shown on the page",
              "A Submit button to check answers",
              "Score counter logic in JavaScript",
              "Final score displayed on the page",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-amber-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Concept */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">How a quiz app works</h2>
        <p className="text-muted-foreground leading-relaxed">
          The logic is simpler than it looks. You store your questions in an array
          of objects. When the user clicks Submit, you loop through the answers,
          count correct ones, and display the result.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`// 1. Data — array of question objects
const questions = [
  {
    question: "What is the capital of Cambodia?",
    options: ["Siem Reap", "Phnom Penh", "Battambang"],
    answer: "Phnom Penh",
  },
  {
    question: "Which currency does Cambodia use?",
    options: ["Baht", "Riel", "Dong"],
    answer: "Riel",
  },
];

// 2. State
let score = 0;

// 3. On submit — check each answer
document.querySelector("#submit").addEventListener("click", () => {
  score = 0;
  questions.forEach((q, i) => {
    const selected = document.querySelector(\`[name="q\${i}"]:checked\`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });
  document.querySelector("#result").textContent =
    \`You scored \${score} / \${questions.length}\`;
});`}
        </pre>

        <h2 className="text-xl font-semibold text-foreground pt-4">Rendering questions from data</h2>
        <p className="text-muted-foreground leading-relaxed">
          Instead of hardcoding HTML for every question, use{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">.map()</code> to generate it from the array.
          Adding a new question is then just one line in the data.
        </p>
        <pre className="bg-stone-100 rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto leading-relaxed">
{`const quizHTML = questions.map((q, i) => {
  const optionsHTML = q.options.map((opt) =>
    \`<label>
      <input type="radio" name="q\${i}" value="\${opt}"> \${opt}
    </label>\`
  ).join("");

  return \`<div class="question">
    <p><strong>\${i + 1}. \${q.question}</strong></p>
    \${optionsHTML}
  </div>\`;
}).join("");

document.querySelector("#quiz").innerHTML = quizHTML;`}
        </pre>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Live example — full working quiz</h2>
        <p className="text-sm text-muted-foreground">
          This is a complete quiz. Read through every line — you know all the
          concepts involved. Then try changing the questions or adding a fourth one.
        </p>
        <CodePlayground
          mode="web"
          height="480px"
          starter={{
            html: `<div id="quiz"></div>
<button id="submit">Submit Answers</button>
<p id="result"></p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 24px; max-width: 500px; }
.question { border: 1px solid #e5e7eb; border-radius: 10px;
  padding: 16px; margin-bottom: 16px; background: #fafaf9; }
.question p { margin: 0 0 10px; }
label { display: block; margin: 6px 0; font-size: 14px; cursor: pointer; }
input[type=radio] { margin-right: 8px; }
#submit { padding: 10px 24px; background: #f59e0b; border: none;
  border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
#submit:hover { background: #d97706; }
#result { margin-top: 16px; font-size: 18px; font-weight: 700; color: #1d4ed8; }`,
            js: `const questions = [
  {
    question: "What is the capital of Cambodia?",
    options: ["Siem Reap", "Phnom Penh", "Battambang"],
    answer: "Phnom Penh",
  },
  {
    question: "Which river runs through Phnom Penh?",
    options: ["Mekong", "Amazon", "Nile"],
    answer: "Mekong",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    answer: "HyperText Markup Language",
  },
];

const quizHTML = questions.map((q, i) => {
  const optionsHTML = q.options
    .map(
      (opt) =>
        \`<label><input type="radio" name="q\${i}" value="\${opt}"> \${opt}</label>\`
    )
    .join("");
  return \`<div class="question"><p><strong>\${i + 1}. \${q.question}</strong></p>\${optionsHTML}</div>\`;
}).join("");

document.querySelector("#quiz").innerHTML = quizHTML;

document.querySelector("#submit").addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    const selected = document.querySelector(\`[name="q\${i}"]:checked\`);
    if (selected && selected.value === q.answer) score++;
  });
  document.querySelector("#result").innerHTML =
    \`You scored <strong>\${score}</strong> out of \${questions.length}. \${
      score === questions.length ? "Perfect! 🎉" : "Keep practising!"
    }\`;
});`,
          }}
        />
      </section>

      {/* Try it */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Customise it</h2>
        <p className="text-sm text-muted-foreground">
          Fork the example above and make it your own. Ideas: change the questions
          to Cambodia history, add a 4th question, change colours, or show which
          answers were wrong after submit.
        </p>
        <CodePlayground
          mode="web"
          height="480px"
          starter={{
            html: `<h2>My Quiz</h2>
<div id="quiz"></div>
<button id="submit">Check Score</button>
<p id="result"></p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 24px; max-width: 500px; }
h2 { margin-bottom: 20px; }
.question { border: 1px solid #e5e7eb; border-radius: 10px;
  padding: 16px; margin-bottom: 16px; }
.question p { margin: 0 0 10px; font-weight: 600; }
label { display: block; margin: 6px 0; font-size: 14px; cursor: pointer; }
input[type=radio] { margin-right: 8px; }
#submit { padding: 10px 24px; background: #3b82f6; color: white;
  border: none; border-radius: 8px; cursor: pointer; font-size: 14px; }
#result { margin-top: 16px; font-size: 16px; font-weight: 700; }`,
            js: `// Replace these questions with your own!
const questions = [
  {
    question: "What year did Cambodia gain independence?",
    options: ["1953", "1960", "1975"],
    answer: "1953",
  },
  {
    question: "What is the currency of Cambodia?",
    options: ["Baht", "Dong", "Riel"],
    answer: "Riel",
  },
];

const quizHTML = questions.map((q, i) => {
  const optsHTML = q.options
    .map((opt) => \`<label><input type="radio" name="q\${i}" value="\${opt}"> \${opt}</label>\`)
    .join("");
  return \`<div class="question"><p>\${i + 1}. \${q.question}</p>\${optsHTML}</div>\`;
}).join("");
document.querySelector("#quiz").innerHTML = quizHTML;

document.querySelector("#submit").addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    const picked = document.querySelector(\`[name="q\${i}"]:checked\`);
    if (picked && picked.value === q.answer) score++;
  });
  document.querySelector("#result").textContent =
    \`Score: \${score} / \${questions.length}\`;
});`,
          }}
        />
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          Build a quiz app with at least 2 questions, a Submit button, a{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">score</code> variable in JavaScript, and
          a final score displayed using{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">innerHTML</code> or{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">textContent</code>.
        </p>
        <CodePlayground
          mode="web"
          height="520px"
          starter={{
            html: `<!-- Build your quiz here -->
<div id="quiz"></div>
<button id="submit">Submit</button>
<p id="result"></p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 24px; max-width: 500px; }
.question { border: 1px solid #e5e7eb; border-radius: 10px;
  padding: 16px; margin-bottom: 16px; }
.question p { margin: 0 0 8px; font-weight: 600; }
label { display: block; margin: 5px 0; cursor: pointer; }
input[type=radio] { margin-right: 6px; }
#submit { padding: 10px 24px; background: #10b981; color: white;
  border: none; border-radius: 8px; cursor: pointer; }
#result { margin-top: 16px; font-size: 16px; font-weight: 700; color: #059669; }`,
            js: `const questions = [
  {
    question: "Add your first question here",
    options: ["Option A", "Option B", "Option C"],
    answer: "Option A",
  },
  {
    question: "Add your second question here",
    options: ["Option A", "Option B", "Option C"],
    answer: "Option B",
  },
];

let score = 0;

const html = questions.map((q, i) => {
  const opts = q.options
    .map((o) => \`<label><input type="radio" name="q\${i}" value="\${o}"> \${o}</label>\`)
    .join("");
  return \`<div class="question"><p>\${i + 1}. \${q.question}</p>\${opts}</div>\`;
}).join("");
document.querySelector("#quiz").innerHTML = html;

document.querySelector("#submit").addEventListener("click", () => {
  score = 0;
  questions.forEach((q, i) => {
    const sel = document.querySelector(\`[name="q\${i}"]:checked\`);
    if (sel && sel.value === q.answer) score++;
  });
  document.querySelector("#result").textContent =
    \`Your score: \${score} / \${questions.length}\`;
});`,
          }}
          challenge={{
            prompt:
              "Build a quiz with at least 2 questions, a Submit button, a score variable, and display the final score.",
            check(html, _css, js) {
              if (!html.includes("<button"))
                return { passed: false, message: "Add a <button> element for submitting." };
              if (!js.includes("score"))
                return {
                  passed: false,
                  message: "Declare a score variable in your JavaScript.",
                };
              if (!js.includes("innerHTML") && !js.includes("textContent"))
                return {
                  passed: false,
                  message:
                    "Display the score using innerHTML or textContent on a DOM element.",
                };
              return {
                passed: true,
                message:
                  "Challenge complete! You built a JavaScript quiz app — your first real project.",
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

      {/* Wrap up */}
      <section className="space-y-3 border-t border-border pt-10">
        <h2 className="text-xl font-semibold text-foreground">You completed JavaScript Basics</h2>
        <p className="text-muted-foreground leading-relaxed">
          In this track you learned variables, data types, conditions, functions,
          arrays, DOM manipulation, and you shipped a real app. The next track —
          JavaScript Advanced — covers ES6+, async/await, and working with real
          APIs. You're ready.
        </p>
      </section>
    </article>
  );
}
