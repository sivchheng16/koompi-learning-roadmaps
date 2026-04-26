import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lesson } from "../constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface LessonSidebarProps {
  lessons: Lesson[];
  activeLessonId: string | null;
  completedLessonIds?: string[];
  onLessonSelect: (id: string) => void;
  className?: string;
  dark?: boolean;
}

export const LessonSidebar = ({ lessons, activeLessonId, completedLessonIds = [], onLessonSelect, className, dark = false }: LessonSidebarProps) => {
  const activeRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeLessonId]);

  const handleSelect = (lessonId: string) => {
    onLessonSelect(lessonId);
    if (topicId) navigate(`/document/${topicId}/${lessonId}`);
  };

  const completedSet = new Set(completedLessonIds);

  return (
    <aside className={cn("flex flex-col gap-px", className)}>
      {lessons.map((lesson, idx) => {
        const isActive = activeLessonId === lesson.id;
        const isDone = completedSet.has(lesson.id);

        return (
          <button
            key={lesson.id}
            ref={isActive ? activeRef : null}
            onClick={() => handleSelect(lesson.id)}
            className={cn(
              "relative text-left px-3 py-2.5 rounded-lg transition-all duration-150 group w-full",
              dark
                ? isActive ? "bg-white/10" : "hover:bg-white/6"
                : isActive ? "bg-black/5" : "hover:bg-black/4"
            )}
          >
            {/* Active indicator */}
            {isActive && (
              <span className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-r-full", dark ? "bg-white" : "bg-foreground")} />
            )}

            <div className="flex items-center gap-2.5">
              <span className="w-4 shrink-0 flex justify-center">
                {isDone ? (
                  <Check size={11} className={dark ? "text-white/30" : "text-foreground/40"} strokeWidth={2.5} />
                ) : isActive ? (
                  <span className={cn("w-1.5 h-1.5 rounded-full", dark ? "bg-white" : "bg-foreground")} />
                ) : (
                  <span className={cn("font-mono text-[10px] transition-colors", dark ? "text-white/25 group-hover:text-white/50" : "text-muted-foreground/35 group-hover:text-muted-foreground/60")}>
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                )}
              </span>

              <p className={cn(
                "text-xs font-sans leading-snug transition-colors truncate",
                dark
                  ? isActive ? "text-white font-medium" : isDone ? "text-white/40 group-hover:text-white/70" : "text-white/50 group-hover:text-white/80"
                  : isActive ? "text-foreground font-medium" : isDone ? "text-muted-foreground/60 group-hover:text-foreground" : "text-muted-foreground/70 group-hover:text-foreground"
              )}>
                {lesson.title}
              </p>
            </div>
          </button>
        );
      })}
    </aside>
  );
};
