import React from "react";
import { Link, useParams } from "react-router-dom";
import { TOPICS } from "../constants";
import { cn } from "@/lib/utils";

const logo = "/koompi-black.png";

export const CourseTopicNavbar = () => {
  const { topicId } = useParams<{ topicId: string }>();

  return (
    <aside className="hidden lg:flex flex-col w-52 shrink-0 border-r border-border bg-white h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Logo */}
      <Link
        to="/dashboard"
        className="flex items-center gap-2.5 px-4 py-[14px] border-b border-border hover:bg-muted/50 transition-colors shrink-0"
      >
        <img src={logo} alt="KOOMPI" className="h-5 w-auto opacity-80" />
        <span className="font-sans font-semibold text-xs text-foreground/60 tracking-widest">ACADEMY</span>
      </Link>

      {/* Topic list */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        <p className="px-2 pb-2 pt-1 text-[10px] font-sans font-semibold text-muted-foreground/40 uppercase tracking-widest">
          Curriculum
        </p>
        {TOPICS.map((topic) => {
          const isActive = topic.id === topicId;
          return (
            <Link
              key={topic.id}
              to={`/document/${topic.id}`}
              className={cn(
                "relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-sans transition-all duration-150",
                isActive
                  ? "text-foreground bg-black/5 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/4"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-foreground rounded-r-full" />
              )}
              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                {topic.logo && <img src={topic.logo} alt="" className="w-full h-full object-contain" />}
              </div>
              <span className="truncate">{topic.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back link */}
      <div className="border-t border-border px-2 py-3">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-sans text-muted-foreground/50 hover:text-foreground hover:bg-black/4 transition-colors"
        >
          ← Dashboard
        </Link>
      </div>
    </aside>
  );
};
