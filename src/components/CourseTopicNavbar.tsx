import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { TOPICS } from "../constants";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "./ui/button";
import { LessonSidebar } from "./LessonSidebar";

export const CourseTopicNavbar = () => {
  const { topicId, moduleId } = useParams<{ topicId: string; moduleId: string }>();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topic = TOPICS.find((t) => t.id === topicId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeLessonId = moduleId
    ? (topic?.lessons.find((l) => l.id === moduleId)?.id ?? topic?.lessons[0]?.id ?? null)
    : (topic?.lessons[0]?.id ?? null);

  const handleLessonSelect = (_id: string) => {
    // Navigation to /document/:topicId/:moduleId is handled inside LessonSidebar
    setIsSidebarOpen(false);
  };


  // useEffect(() => {
  //   const activeLink = document.querySelector(`a[href="/document/${topicId}"]`);
  //   if (activeLink) {
  //     activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  //   }
  // }, [topicId]);
  const scrollRef = useRef(null);

  // const scrollLeft = () => {
  //   scrollRef.current.scrollBy({
  //     left: -300,
  //     behavior: "smooth",
  //   });
  // };

  // const scrollRight = () => {
  //   scrollRef.current({
  //     left: 300,
  //     behavior: "smooth",
  //   });
  // };


  return (
    <div className="w-full border-b border-white/5 bg-foreground/5 backdrop-blur-xl relative z-30">
      <div className="overflow-x-auto items-start px-8 w-full ">
        <div className="flex items-center  overflow-x-auto no-scrollbar" data-lenis-prevent>
          {/* Mobile Sidebar Trigger */}
          <div className="lg:hidden top-50 z-40 h-[72px] flex items-center mr-5">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 glass-panel h-10 w-10 rounded-xl">
                  <Menu size={25} />
                </Button>

              </SheetTrigger>
              <SheetContent side="left" className="absolute top-[4.5rem] bg-background border-r border-white/5 p-0 w-80">
                {/* <SheetHeader className="p-6 border-b border-white/5">
                  <SheetTitle className="text-left font-sans italic">Module Navigator</SheetTitle>
                </SheetHeader> */}
                <div className="pl-4 pr-1  text-foreground overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar" data-lenis-prevent>
                  <LessonSidebar
                    lessons={topic?.lessons || []}
                    activeLessonId={activeLessonId}
                    onLessonSelect={(id) => {
                      handleLessonSelect(id);
                      setIsSidebarOpen(false);
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {TOPICS.map((topic) => {
            if (!topic) return null;
            const isActive = topic.id === topicId;
            return (
              <div>

                <Link
                  key={topic.id}
                  to={`/document/${topic.id}`}
                  className="relative group shrink-0 overflow-hidden "
                >
                  <div
                    ref={scrollRef}
                    className={cn(
                      "flex items-center rounded-md md:rounded-xl px-2 py-1 md:px-4 md:py-2 transition-all duration-300",
                      isActive ? "bg-white/5 gap-3 border border-white/10 shadow-lg shadow-black/20" : "hover:bg-white/5"
                    )}>
                    {/* <div className="relative w-6 h-6 rounded-lg overflow-hidden glass-panel p-1">
                    <div className={cn("absolute inset-0 opacity-20", isActive ? `bg-gradient-to-tr ${topic.gradient}` : "bg-muted")} />
                    <img src={topic.logo} alt={topic.title} className="relative z-10 w-full h-full object-contain" />
                    </div> */}
                    <span className={cn(
                      "text-[11px] md:text-[12px] lg:text-[14px] font-mono font-bold uppercase tracking-widest transition-colors whitespace-nowrap shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
                    )}>
                      {topic.title}
                    </span>
                  </div>
                  {
                    isActive && (
                      <motion.div
                        layoutId="activeTopic"
                        className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)]"
                      />
                    )
                  }
                </Link>
                {/* Right Button */}
                <button
                  // onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2"
                >
                  <ArrowRight />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div >
  );
};
