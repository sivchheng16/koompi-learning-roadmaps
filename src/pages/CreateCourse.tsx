import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { courseApi } from "../lib/courseApi";
import { ContentRenderer } from "../components/ContentRenderer";
import { useAuth } from "../context/AuthContext";
import type { OutlineModule, Block } from "../types/course";
import { cn } from "@/lib/utils";
import { Loader2, RefreshCw, ChevronRight, Globe, Lock } from "lucide-react";

type Step = "details" | "generating" | "review";

interface GeneratedModule extends OutlineModule {
  blocks: Block[];
  generating: boolean;
  done: boolean;
}

export default function CreateCourse() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [numModules, setNumModules] = useState(5);

  const [step, setStep] = useState<Step>("details");
  const [outline, setOutline] = useState<OutlineModule[]>([]);
  const [modules, setModules] = useState<GeneratedModule[]>([]);
  const [generatingOutline, setGeneratingOutline] = useState(false);
  const [outlineReady, setOutlineReady] = useState(false);

  const [isPublic, setIsPublic] = useState(false);
  const [saving, setSaving] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  useEffect(() => {
    if (!user) return;
    courseApi.getCredits().then(c => setCredits(c.credits_remaining)).catch(() => {});
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-sm">Sign in to create courses.</p>
        <button onClick={login} className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
          Sign In
        </button>
      </div>
    );
  }

  if (user && credits !== null && credits < 10) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-muted-foreground text-sm">You don't have enough credits to create a course.</p>
        <Link to="/my-courses" className="text-sm font-sans text-primary hover:underline">
          Request more credits →
        </Link>
      </div>
    );
  }

  const generateOutline = async () => {
    if (!title.trim() || !description.trim()) return;
    setGeneratingOutline(true);
    setOutlineReady(false);
    setModules([]);
    try {
      const { modules: outlineMods } = await courseApi.generateOutline({
        title: title.trim(),
        description: description.trim(),
        level,
        num_modules: numModules,
      });
      setOutline(outlineMods);
      setOutlineReady(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "insufficient_credits") {
        alert("You don't have enough credits. Request more from My Courses.");
      } else {
        alert("Generation failed. Please try again.");
      }
    } finally {
      setGeneratingOutline(false);
    }
  };

  const expandModules = async () => {
    const controller = new AbortController();
    abortRef.current = controller;

    const initialMods: GeneratedModule[] = outline.map(o => ({
      ...o,
      blocks: [],
      generating: true,
      done: false,
    }));
    setModules(initialMods);
    setStep("generating");

    for (let i = 0; i < outline.length; i++) {
      if (controller.signal.aborted) break;
      const mod = outline[i];
      try {
        const { blocks } = await courseApi.generateModule({
          course_title: title,
          course_level: level,
          module_title: mod.title,
          module_description: mod.description,
        });
        if (controller.signal.aborted) break;
        setModules(prev =>
          prev.map((m, idx) => idx === i ? { ...m, blocks, generating: false, done: true } : m)
        );
      } catch {
        setModules(prev =>
          prev.map((m, idx) => idx === i ? { ...m, blocks: [], generating: false, done: true } : m)
        );
      }
    }

    if (!controller.signal.aborted) {
      setStep("review");
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    setStep("details");
    setModules([]);
    setOutlineReady(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { course } = await courseApi.saveCourse({
        title: title.trim(),
        description: description.trim(),
        level,
        is_public: isPublic,
        modules: modules.map(m => ({
          title: m.title,
          duration: m.duration,
          blocks: m.blocks,
        })),
      });
      navigate(`/c/${course.slug}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "insufficient_credits") {
        alert("Not enough credits to save. Request more from My Courses.");
      } else {
        alert("Failed to save. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const doneCount = modules.filter(m => m.done).length;
  const total = modules.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">

        <div className="mb-10">
          <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-2">
            AI Course Creator
          </p>
          {credits !== null && (
            <p className="text-xs text-muted-foreground font-sans mt-1">
              {credits} credits remaining · {Math.floor(credits / 10)} {Math.floor(credits / 10) === 1 ? "course" : "courses"} left
            </p>
          )}
          <h1 className="text-4xl font-serif font-normal text-foreground tracking-tight">
            {step === "details" && "Design your course."}
            {step === "generating" && "Building your course…"}
            {step === "review" && "Review your course."}
          </h1>
        </div>

        <AnimatePresence mode="wait">

          {/* Step 1: Details */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Course title</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Introduction to Python"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">What will students learn?</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the course goals, topics to cover, and any specific focus areas…"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm resize-none h-28 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Level</label>
                <div className="flex gap-3">
                  {(["beginner", "intermediate", "advanced"] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      className={cn(
                        "flex-1 py-2.5 rounded-xl border text-sm font-sans capitalize transition-colors",
                        level === l
                          ? "border-primary bg-primary/5 text-primary font-medium"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Modules: <span className="text-primary font-semibold">{numModules}</span>
                </label>
                <input
                  type="range"
                  min={3}
                  max={8}
                  value={numModules}
                  onChange={e => setNumModules(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>3</span><span>8</span>
                </div>
              </div>

              {outlineReady && outline.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-border bg-muted/30 p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-foreground">Course outline</p>
                    <button
                      onClick={generateOutline}
                      disabled={generatingOutline}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RefreshCw size={12} className={generatingOutline ? "animate-spin" : ""} />
                      Regenerate
                    </button>
                  </div>
                  <ol className="space-y-2">
                    {outline.map((mod, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-muted-foreground/50 font-mono w-5 shrink-0 pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span className="font-medium text-foreground">{mod.title}</span>
                          <span className="text-muted-foreground"> — {mod.description}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}

              <div className="flex gap-3 pt-2">
                {!outlineReady ? (
                  <button
                    onClick={generateOutline}
                    disabled={generatingOutline || !title.trim() || !description.trim()}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
                  >
                    {generatingOutline && <Loader2 size={14} className="animate-spin" />}
                    {generatingOutline ? "Generating outline…" : "Generate outline"}
                  </button>
                ) : (
                  <button
                    onClick={expandModules}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Build full course <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Generating */}
          {step === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm text-muted-foreground">
                  {doneCount < total
                    ? `Generating module ${doneCount + 1} of ${total}…`
                    : "Finalising…"}
                </p>
              </div>
              {modules.map((mod, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm transition-colors",
                    mod.done
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : mod.generating
                      ? "border-primary/30 bg-primary/5 text-foreground"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {mod.generating ? (
                    <Loader2 size={14} className="animate-spin text-primary shrink-0" />
                  ) : mod.done ? (
                    <span className="text-emerald-600 shrink-0">✓</span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-border shrink-0" />
                  )}
                  <span className="font-medium">{mod.title}</span>
                </div>
              ))}
              <button
                onClick={handleCancel}
                className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel generation
              </button>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-sans">
                ⚠️ AI-generated content — review carefully before publishing. May contain errors.
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Visibility</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isPublic ? "Anyone with the link can view" : "Only you can view"}
                  </p>
                </div>
                <button
                  onClick={() => setIsPublic(p => !p)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                    isPublic
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {isPublic ? <Globe size={14} /> : <Lock size={14} />}
                  {isPublic ? "Public" : "Private"}
                </button>
              </div>

              {modules.map((mod, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-mono text-muted-foreground/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-bold text-foreground">{mod.title}</h2>
                    {mod.duration && <span className="text-xs text-muted-foreground">{mod.duration}</span>}
                  </div>
                  {mod.blocks.length > 0 ? (
                    <ContentRenderer blocks={mod.blocks} />
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Generation failed for this module.</p>
                  )}
                  {i < modules.length - 1 && <hr className="border-border mt-8" />}
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {saving ? "Saving…" : "Save course (10 credits)"}
                </button>
                <button
                  onClick={() => { setStep("details"); setOutlineReady(false); }}
                  className="px-5 py-3 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Start over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
