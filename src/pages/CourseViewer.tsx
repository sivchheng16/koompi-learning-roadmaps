import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { courseApi } from "../lib/courseApi";
import { ContentRenderer } from "../components/ContentRenderer";
import { cn } from "@/lib/utils";
import Footer from "../components/Footer";
import type { Course, CourseModule } from "../types/course";

const logo = "/koompi-black.png";

export default function CourseViewer() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<(Course & { modules: CourseModule[] }) | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    courseApi
      .getCourse(slug)
      .then(({ course }) => setCourse(course))
      .catch(() => setError("Course not found or not accessible."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <p className="text-muted-foreground text-sm">{error ?? "Something went wrong."}</p>
        <Link to="/dashboard" className="text-primary text-sm hover:underline">Back to courses</Link>
      </div>
    );
  }

  const activeModule = course.modules[activeIndex];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground">
      {/* Top bar */}
      <div className="w-full border-b border-border bg-white/95 backdrop-blur-sm sticky top-0 z-30 flex items-center h-12 px-4 gap-4 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="KOOMPI Academy" className="h-5 w-auto" />
        </Link>
        <span className="text-border">|</span>
        <span className="text-sm font-medium text-foreground truncate">{course.title}</span>
        <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
          AI Generated
        </span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-[280px] border-r border-border bg-white overflow-y-auto shrink-0">
          <div className="px-4 pt-6 pb-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
              {course.level}
            </p>
            <p className="text-sm font-semibold text-foreground">{course.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{course.modules.length} modules</p>
          </div>
          <div className="border-t border-border" />
          <nav className="flex flex-col py-3 px-3 gap-0.5">
            {course.modules.map((mod, i) => (
              <button
                key={mod.id}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors",
                  i === activeIndex
                    ? "bg-primary/10 text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <span className="text-[10px] font-mono text-muted-foreground/60 shrink-0 w-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {mod.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16"
            >
              {activeModule && (
                <>
                  <div className="mb-8">
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Module {activeIndex + 1}{activeModule.duration ? ` · ${activeModule.duration}` : ""}
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                      {activeModule.title}
                    </h1>
                  </div>
                  <ContentRenderer blocks={activeModule.blocks} />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <div className="max-w-3xl mx-auto px-6 md:px-10 pb-10 flex justify-between gap-4">
            {activeIndex > 0 ? (
              <button
                onClick={() => setActiveIndex(i => i - 1)}
                className="text-sm font-sans px-5 py-3 rounded-xl border border-border hover:bg-muted transition-colors text-muted-foreground"
              >
                ← Previous
              </button>
            ) : <span />}
            {activeIndex < course.modules.length - 1 && (
              <button
                onClick={() => setActiveIndex(i => i + 1)}
                className="text-sm font-sans px-5 py-3 rounded-xl border border-border hover:bg-muted transition-colors text-muted-foreground"
              >
                Next →
              </button>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
