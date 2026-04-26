import React, { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Clock, ChevronRight, ChevronLeft, ShieldAlert, BookOpen, X, Menu } from "lucide-react";
import { TOPICS } from "../constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Footer from "../components/Footer";
import { CourseTopicNavbar } from "../components/CourseTopicNavbar";
import { LessonSidebar } from "../components/LessonSidebar";
import { lessonRegistry } from "../lessons/lessonRegistry";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import { useLayout } from "../context/LayoutContext";
import { CHALLENGE_LESSON_IDS } from "../lessons/challengeLessons";

export default function TopicDetails() {
  const { topicId, moduleId } = useParams<{ topicId: string; moduleId: string }>();
  const navigate = useNavigate();
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useLayout();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [completing, setCompleting] = React.useState(false);
  const topic = TOPICS.find((t) => t.id === topicId);
  const { markComplete, setLastViewed, isComplete, isLessonUnlocked, progress } = useProgress();
  const { user, login } = useAuth();

  // Validate lesson/moduleId
  const moduleIdInvalid = moduleId && topic && !topic.lessons.some(l => l.id === moduleId);

  // Determine active lesson: from URL param, or default to first lesson
  const activeLessonId = moduleId
    ? (topic?.lessons.find((l) => l.id === moduleId)?.id ?? topic?.lessons[0]?.id ?? null)
    : (topic?.lessons[0]?.id ?? null);

  // Auto-redirect to first module if no moduleId in URL and topic valid
  useEffect(() => {
    if (topic && !moduleId && topic.lessons.length > 0) {
      navigate(`/document/${topicId}/${topic.lessons[0].id}`, { replace: true });
    }
  }, [topicId, moduleId, topic, navigate]);

  // Reset scroll after exit animation starts
  useEffect(() => {
    const t = setTimeout(() => {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }, 120);
    return () => clearTimeout(t);
  }, [topicId, moduleId]);

  // Track last viewed lesson
  useEffect(() => {
    if (activeLessonId && topicId) {
      setLastViewed(activeLessonId, topicId);
    }
  }, [activeLessonId, topicId]);

  if (!topic || moduleIdInvalid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg text-center space-y-8"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-destructive/8 border border-destructive/20 flex items-center justify-center text-destructive">
              <ShieldAlert size={28} />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-sans font-medium text-destructive uppercase tracking-widest">
              {!topic ? "Topic not found" : "Lesson not found"}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-normal text-foreground">
              {!topic ? "This topic doesn't exist." : "This lesson doesn't exist."}
            </h1>
            <p className="text-muted-foreground font-sans leading-relaxed max-w-sm mx-auto">
              {!topic
                ? "The topic you're looking for isn't in our curriculum. Head back home to explore what's available."
                : "This lesson ID isn't part of the current topic. Return to a valid lesson."}
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <Button asChild className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/">Back to Home</Link>
            </Button>
            {moduleIdInvalid && (
              <Button
                variant="outline"
                className="rounded-full px-6 border-border hover:bg-muted"
                onClick={() => navigate(`/document/${topicId}`)}
              >
                First Lesson
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }


  const activeLesson = topic.lessons.find((l) => l.id === activeLessonId) || topic.lessons[0];
  const ActiveLessonComponent = activeLessonId ? lessonRegistry[activeLessonId] : null;

  // Navigation Logic
  const currentIndex = topic.lessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = currentIndex > 0 ? topic.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < topic.lessons.length - 1 ? topic.lessons[currentIndex + 1] : null;

  const handleLessonSelect = (_id: string) => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 w-64 bg-white border-r border-border z-50 lg:hidden overflow-y-auto flex flex-col"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
                <span className="text-xs font-sans font-medium text-muted-foreground">{topic.title}</span>
                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
                  <X size={15} />
                </button>
              </div>
              <div className="flex-1 px-2 py-3">
                <LessonSidebar
                  lessons={topic.lessons}
                  activeLessonId={activeLessonId}
                  completedLessonIds={Object.keys(progress.completed)}
                  onLessonSelect={handleLessonSelect}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Left: topic nav */}
      <CourseTopicNavbar />

      {/* Right side: title bar + content + TOC */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Title bar — spans full width of center+right */}
        <div className="flex items-center justify-between px-8 h-12 bg-white border-b border-border shrink-0">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-1.5 -ml-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors mr-2"
          >
            <Menu size={16} />
          </button>

          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="text-sm font-sans font-medium text-foreground truncate">
              {activeLesson?.title}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 ml-4">
            {activeLesson?.duration && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs font-sans text-muted-foreground/50">
                <Clock size={12} />
                {activeLesson.duration}
              </span>
            )}
            <span className="font-mono text-xs text-muted-foreground/40">
              {String(currentIndex + 1).padStart(2, "0")} / {String(topic.lessons.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content row */}
        <div className="flex-1 flex overflow-hidden">

        {/* Center: scrollable lesson content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto bg-[#fafafa]"
          style={{ scrollbarWidth: "none" }}
          data-lenis-prevent
        >
        {/* Lesson content */}
        <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-6 md:px-10 lg:px-14 pt-10 pb-8">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeLessonId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
            >
              {ActiveLessonComponent ? (
                <React.Suspense fallback={
                  <div className="h-64 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-border border-t-foreground rounded-full animate-spin" />
                  </div>
                }>
                  <ActiveLessonComponent />
                </React.Suspense>
              ) : (
                <div className="space-y-3">
                  <h1 className="text-4xl font-serif font-normal text-foreground tracking-tight leading-tight">
                    {activeLesson?.title}
                  </h1>
                  <p className="text-base text-muted-foreground leading-[1.75]">
                    {activeLesson?.description}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Sign-in nudge */}
          {!user && (
            <div className="mt-10 flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl bg-black/4 border border-black/8">
              <div className="flex items-center gap-2.5">
                <BookOpen size={14} className="text-foreground/50 shrink-0" />
                <p className="text-sm font-sans text-foreground/70">Sign in to save your progress.</p>
              </div>
              <button onClick={login} className="text-sm font-sans font-medium text-foreground hover:text-foreground/70 transition-colors shrink-0">
                Sign in →
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-14 space-y-3">
            {/* Primary action — full width */}
            {nextLesson ? (
              <motion.button
                onClick={() => {
                  if (completing) return;
                  setCompleting(true);
                  if (activeLessonId && topicId) markComplete(activeLessonId, topicId);
                  setTimeout(() => {
                    navigate(`/document/${topicId}/${nextLesson.id}`);
                    setCompleting(false);
                  }, 80);
                }}
                disabled={completing || (!!activeLessonId && CHALLENGE_LESSON_IDS.has(activeLessonId) && !isLessonUnlocked(activeLessonId))}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-sans font-semibold transition-colors",
                  activeLessonId && CHALLENGE_LESSON_IDS.has(activeLessonId) && !isLessonUnlocked(activeLessonId)
                    ? "bg-black/5 text-foreground/30 cursor-not-allowed"
                    : completing
                    ? "bg-foreground/80 text-background"
                    : "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80"
                )}
              >
                {completing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-background/40 border-t-background rounded-full animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    {isComplete(activeLessonId ?? "") ? "Next lesson" : "Complete & continue"}
                    <ChevronRight size={15} />
                  </>
                )}
              </motion.button>
            ) : (
              <motion.button
                onClick={() => { if (activeLessonId && topicId) markComplete(activeLessonId, topicId); }}
                disabled={!!activeLessonId && CHALLENGE_LESSON_IDS.has(activeLessonId) && !isLessonUnlocked(activeLessonId)}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-sans font-semibold transition-colors",
                  activeLessonId && CHALLENGE_LESSON_IDS.has(activeLessonId) && !isLessonUnlocked(activeLessonId)
                    ? "bg-black/5 text-foreground/30 cursor-not-allowed"
                    : "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80"
                )}
              >
                Mark complete ✓
              </motion.button>
            )}

            {/* Previous — secondary */}
            <div className="flex justify-center">
              {prevLesson ? (
                <Link
                  to={`/document/${topicId}/${prevLesson.id}`}
                  className="flex items-center gap-1.5 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft size={14} /> Previous lesson
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft size={14} /> Back to dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="mt-12 pb-8">
            <Footer />
          </div>
        </div>
        </div>

        {/* Right: TOC — sticky, no scrollbar */}
        <div className="hidden xl:flex flex-col w-52 shrink-0 overflow-y-auto" style={{ scrollbarWidth: "none" }} data-lenis-prevent>
          <div className="pt-5 pb-6 px-3">
            <p className="px-2 mb-2 text-[10px] font-sans font-semibold text-muted-foreground/40 uppercase tracking-widest">
              {topic.lessons.length} lessons
            </p>
            <LessonSidebar
              lessons={topic.lessons}
              activeLessonId={activeLessonId}
              completedLessonIds={Object.keys(progress.completed)}
              onLessonSelect={handleLessonSelect}
            />
          </div>
        </div>

        </div>{/* end content row */}
      </div>{/* end right side */}

    </div>
  );
}
