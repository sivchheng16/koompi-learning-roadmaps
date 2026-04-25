import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TOPICS } from "../constants";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "koompi_quiz_done";

export function useQuizDone() {
  return !!localStorage.getItem(STORAGE_KEY);
}

type Step = 0 | 1 | 2;

const questions = [
  {
    id: "experience",
    text: "Have you written code before?",
    options: [
      { label: "Never", value: "never" },
      { label: "A little", value: "some" },
      { label: "Regularly", value: "regular" },
    ],
  },
  {
    id: "goal",
    text: "What do you want to build?",
    options: [
      { label: "Websites & web apps", value: "web" },
      { label: "Mobile apps", value: "mobile" },
      { label: "I'm not sure yet", value: "unsure" },
    ],
  },
  {
    id: "time",
    text: "How much time can you commit per week?",
    options: [
      { label: "Less than 3 hours", value: "low" },
      { label: "3–10 hours", value: "mid" },
      { label: "10+ hours", value: "high" },
    ],
  },
] as const;

function recommend(answers: Record<string, string>): { topicId: string; lessonId: string; label: string } {
  const { experience } = answers;
  if (experience === "never") {
    const topic = TOPICS.find(t => t.id === "html")!;
    return { topicId: topic.id, lessonId: topic.lessons[0].id, label: "Start with HTML — no experience needed" };
  }
  if (experience === "some") {
    const topic = TOPICS.find(t => t.id === "html")!;
    return { topicId: topic.id, lessonId: topic.lessons[1].id, label: "Jump into HTML from the beginning" };
  }
  // regular
  const topic = TOPICS.find(t => t.id === "javascript")!;
  return { topicId: topic.id, lessonId: topic.lessons[0].id, label: "Start with JavaScript fundamentals" };
}

interface Props {
  onDismiss: () => void;
}

export function OnboardingQuiz({ onDismiss }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const question = questions[step];
  const isLast = step === 2;

  function choose(value: string) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (isLast) {
      setDone(true);
    } else {
      setStep((s) => (s + 1) as Step);
    }
  }

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    onDismiss();
  }

  function go() {
    const rec = recommend(answers);
    localStorage.setItem(STORAGE_KEY, "1");
    navigate(`/document/${rec.topicId}/${rec.lessonId}`);
  }

  return (
    <div className="relative bg-white border border-border rounded-2xl p-8 md:p-10 max-w-2xl mx-auto shadow-sm">
      <button
        onClick={dismiss}
        className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <X size={16} />
      </button>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {/* Progress dots */}
            <div className="flex gap-1.5 mb-8">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i <= step ? "bg-primary w-6" : "bg-border w-3"
                  )}
                />
              ))}
            </div>

            <p className="text-xs font-sans font-medium text-muted-foreground mb-3 uppercase tracking-widest">
              Question {step + 1} of 3
            </p>
            <h3 className="text-2xl font-serif text-foreground mb-6">{question.text}</h3>

            <div className="flex flex-col gap-2">
              {question.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => choose(opt.value)}
                  className="text-left px-5 py-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-sans text-foreground group flex items-center justify-between"
                >
                  {opt.label}
                  <ArrowRight size={14} className="text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest">Your path</p>
              <h3 className="text-2xl font-serif text-foreground">{recommend(answers).label}</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={go}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-sans font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center"
              >
                Start learning <ArrowRight size={14} />
              </button>
              <button
                onClick={dismiss}
                className="px-8 py-3 rounded-full border border-border text-sm font-sans text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                Browse all courses
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
