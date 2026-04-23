import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Clock, Menu, ChevronRight, ChevronLeft } from "lucide-react";
import { TOPICS } from "../constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Footer from "../components/Footer";
import { CourseTopicNavbar } from "../components/CourseTopicNavbar";
import { LessonSidebar } from "../components/LessonSidebar";
import { lessonRegistry } from "../lessons/lessonRegistry";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function TopicDetails() {
  const { topicId, moduleId } = useParams<{ topicId: string; moduleId: string }>();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topic = TOPICS.find((t) => t.id === topicId);

  // Determine active lesson: from URL param, or default to first lesson
  const activeLessonId = moduleId
    ? (topic?.lessons.find((l) => l.id === moduleId)?.id ?? topic?.lessons[0]?.id ?? null)
    : (topic?.lessons[0]?.id ?? null);

  // Auto-redirect to first module if no moduleId in URL
  useEffect(() => {
    if (topic && !moduleId && topic.lessons.length > 0) {
      navigate(`/document/${topicId}/${topic.lessons[0].id}`, { replace: true });
    }
  }, [topicId, moduleId, topic, navigate]);

  // Reset scroll on topic or lesson change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [topicId, moduleId]);

  if (!topic) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-32 px-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-sans mb-6">System Error: Topic Not Found</h2>
        <Button asChild variant="outline" className="h-14 px-10 rounded-full glass-panel font-mono text-[10px] font-bold tracking-widest uppercase">
          <Link to="/">Reboot to Home</Link>
        </Button>
      </div>
    );
  }
  if (!topic.lessons) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-32 px-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-sans mb-6">System Error: Lesson Not Found</h2>
        <Button asChild variant="outline" className="h-14 px-10 rounded-full glass-panel font-mono text-[10px] font-bold tracking-widest uppercase">
          <Link to="/">Reboot to Home</Link>
        </Button>
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
    // Navigation to /document/:topicId/:moduleId is handled inside LessonSidebar
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground relative ">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[5%] left-[10%] w-[50vw] h-[50vw] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[0%] w-[40vw] h-[40vw] bg-secondary/3 blur-[150px] rounded-full" />
      </div>

      {/* Main Section Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Section: Topic Switcher Navbar */}
        <CourseTopicNavbar />

        {/* Sidebar + Content */}
        <div className="flex-1 flex overflow-hidden" >

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-[360px]  border-r-4 border-white/5 overflow-y-auto custom-scrollbar  pl-8 pr-2 bg-background/10  scroll-smooth" data-lenis-prevent>
            <LessonSidebar
              lessons={topic.lessons}
              activeLessonId={activeLessonId}
              onLessonSelect={handleLessonSelect}
            />
          </div>


          {/* Main Scrollable Content Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 w-full overflow-y-auto custom-scrollbar relative scroll-smooth bg-muted-foreground/5"
            data-lenis-prevent
          >
            <div className="w-full">
              {/* Navigation & Header */}
              {/* <div className="mb-16">
                <Link
                  to="/"
                  className="group inline-flex items-center gap-4 font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-12 hover:gap-6 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return Home</span>
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  key={topic.id}
                  className="flex flex-col md:flex-row gap-12 items-start md:items-center justify-between"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
                    <div className="relative w-28 h-28 glass-panel p-2 rounded-3xl overflow-hidden group shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-tr ${topic.gradient} opacity-20`} />
                      <img
                        src={topic.logo}
                        alt={topic.title}
                        className="relative z-10 w-full h-full object-cover rounded-2xl  transition-all duration-1000"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 border",
                          topic.level === "Beginner" ? "border-green-500/20 text-green-500 bg-green-500/5" :
                            topic.level === "Intermediate" ? "border-amber-500/20 text-amber-500 bg-amber-500/5" :
                              "border-primary/20 text-primary bg-primary/5"
                        )}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {topic.level} System
                        </span>
                        <span className="text-[9px] font-mono font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">
                          Module: {topic.id}
                        </span>
                      </div>
                      <h1 className={`text-5xl md:text-7xl font-sans font-medium tracking-tighter leading-[0.8] mb-2 uppercase ${topic.textgradient} `}>
                        {topic.title}
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 text-right glass-panel p-6 rounded-2xl border-white/5 shrink-0">
                    <div className="text-base font-sans italic text-muted-foreground">
                      {topic.lessons.length} Modules in Queue
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                      <Clock className="w-4 h-4" />
                      {topic.lessons.length * 45} MINS RUNTIME
                    </div>
                  </div>
                </motion.div>
              </div> */}



              {/* Active Lesson Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLessonId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-20"
                >
                  {/* <div className="flex items-center gap-6 mb-12">
                    <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
                      Active Module
                    </h2>
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest">
                      {topic.lessons.findIndex((l) => l.id === activeLessonId) + 1} / {topic.lessons.length}
                    </span>
                  </div> */}

                  {/* Render real lesson component from registry, or fallback card */}
                  {ActiveLessonComponent ? (
                    <div className=" overflow-hidden px-8">
                      <React.Suspense fallback={
                        <div className="h-64 flex flex-col items-center justify-center gap-4 glass-panel rounded-[40px]">
                          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                          <p className="font-mono text-[10px] font-bold tracking-widest text-primary uppercase animate-pulse">Initializing Module...</p>
                        </div>
                      }>
                        <ActiveLessonComponent />
                      </React.Suspense>
                    </div>
                  ) : (
                    <div className="glass-panel p-10 md:p-14 rounded-[40px] relative overflow-hidden group">
                      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-tr ${topic.gradient} opacity-5 blur-[100px] pointer-events-none group-hover:opacity-10 transition-opacity duration-1000`} />
                      <div className="flex flex-col gap-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <div className="flex items-center gap-4">
                            <span className="text-4xl font-mono font-bold text-primary/10">
                              {topic.lessons.findIndex((l) => l.id === activeLessonId) + 1 < 10 ? '0' : ''}
                              {topic.lessons.findIndex((l) => l.id === activeLessonId) + 1}
                            </span>
                            <ChevronRight className="text-primary/20" size={24} />
                          </div>
                          <h3 className="text-4xl md:text-5xl font-sans font-medium tracking-tight italic">
                            {activeLesson?.title}
                          </h3>
                        </div>
                        <p className="text-xl md:text-2xl text-muted-foreground font-sans italic leading-relaxed max-w-2xl">
                          {activeLesson?.description}
                        </p>
                        <div className="flex items-center gap-3 px-6 py-3 glass-panel rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-primary border-primary/20 w-fit">
                          <Clock size={16} className="text-primary/40" />
                          {activeLesson?.duration}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Description Section */}
                  <motion.div
                    className="my-20 w-full border-l-2 border-primary/20 pl-12"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    key={`${topic.id}-desc`}
                  >
                    <p className="text-xl md:text-2xl font-sans leading-relaxed text-muted-foreground italic opacity-80">
                      {topic.description}
                    </p>
                  </motion.div>


                </motion.div>
              </AnimatePresence>

              {/* Upcoming Modules Grid */}
              {/* <div className="mb-20">
                <div className="flex items-center gap-6 mb-12">
                  <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-muted-foreground/40 uppercase">
                    Upcoming Syllabus
                  </h2>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topic.lessons.filter((l) => l.id !== activeLessonId).map((lesson) => (
                    <motion.div
                      key={lesson.id}
                      className="glass-panel p-8 rounded-[32px] hover:border-white/20 transition-all cursor-pointer group"
                      onClick={() => navigate(`/document/${topicId}/${lesson.id}`)}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground/20 group-hover:text-primary/40 transition-colors">
                          MODULE_{(topic.lessons.findIndex((l) => l.id === lesson.id) + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary/40">
                          <Clock size={12} />
                          {lesson.duration}
                        </div>
                      </div>
                      <h4 className="text-xl font-sans font-medium mb-3 group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h4>
                      <p className="text-sm text-muted-foreground italic line-clamp-2">
                        {lesson.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div> */}

            </div>
            {/* Pagination Buttons */}
            <div className="relative z-10 flex items-between gap-6 mt-12 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 w-full items-center justify-between px-8">
              {prevLesson ? (
                <Link
                  to={`/document/${topicId}/${prevLesson.id}`}
                  className="group flex flex-col items-start  py-4 px-6 glass-panel rounded-xl border-white/5 hover:border-primary/20 transition-all hover:bg-white/5 text-right "
                >
                  <span className="font-mono text-md font-semibold text-foreground group-hover:text-primary transition-colors uppercase tracking-[0.3em] flex items-center gap-1">
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </span>

                </Link>
              ) : (
                // <div className="flex-1 hidden sm:block" />
                <Link
                  to={`/`}
                  className="group flex flex-col items-start  py-4 px-6 glass-panel rounded-xl border-white/5 hover:border-primary/20 transition-all hover:bg-white/5 text-right "
                >
                  <span className="font-mono text-md font-semibold text-foreground group-hover:text-primary transition-colors uppercase tracking-[0.3em] flex items-center gap-1">
                    <ChevronLeft className="w-5 h-5" />
                    Home
                  </span>

                </Link>
              )}

              {nextLesson ? (
                <Link
                  to={`/document/${topicId}/${nextLesson.id}`}
                  className=" group  flex flex-col items-end  py-4 px-6 glass-panel rounded-xl border-white/5 hover:border-primary/20 transition-all hover:bg-white/5 text-right "
                >
                  <span className="font-mono text-md font-semibold text-foreground group-hover:text-primary transition-colors uppercase tracking-[0.3em] flex items-center gap-1">
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </span>

                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
