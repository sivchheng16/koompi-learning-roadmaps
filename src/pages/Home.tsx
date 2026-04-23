import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Code2,
  Users,
  Briefcase,
  Zap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Paintbrush,
  Layout,
  LayoutTemplate,
  AppWindow,
  Compass,
  Home as HomeIcon,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GAMES, TOPICS } from "../constants";
import video from "../assets/video/about-me.mp4";
import Footer from "../components/Footer";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const services = [
  {
    name: "Frontend Development",
    icon: Layout,
    detail:
      "Building clean, responsive, and intuitive user interfaces with modern frameworks.",
  },
  {
    name: "Backend Development",
    icon: Code2,
    detail:
      "Creating robust server-side solutions and scalable API architectures.",
  },
  {
    name: "Mobile & Cross-Platform",
    icon: Compass,
    detail:
      "Developing seamless experiences across iOS, Android, and web platforms.",
  },
  {
    name: "UI/UX Design",
    icon: Paintbrush,
    detail:
      "Crafting user-centered designs that balance aesthetics with functionality.",
  },
];

const topicIconMap: Record<string, React.FC<any>> = {
  LayoutTemplate,
  Paintbrush,
  Code2,
  AppWindow,
};

export default function Home() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { requireAuth } = useRequireAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-4 md:p-6 overflow-hidden section-connector">
        {/* Background Mesh Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-primary/20 blur-[120px] rounded-full"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] bg-secondary/10 blur-[150px] rounded-full"
          />
        </div>

        {/* Floating 3D Icons (Animated backgrounds) */}
        <div className="absolute inset-0 z-[1] pointer-events-none perspective-1000">
          {/* Coding Icon */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotateY: [0, 45, 0],
              rotateX: [0, 15, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[15%] w-32 h-32 flex items-center justify-center text-primary/40 blur-[2px]"
          >
            <Code2 size={120} strokeWidth={1} />
          </motion.div>

          {/* Gaming Icon */}
          <motion.div
            animate={{
              y: [0, 40, 0],
              rotateY: [0, -30, 0],
              rotateZ: [0, 10, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[25%] left-[25%] w-40 h-40 flex items-center justify-center text-secondary/30 blur-[4px]"
          >
            <Users size={160} strokeWidth={0.5} />
          </motion.div>

          {/* Service Icon */}
          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, -50, 0],
              rotateY: [0, 25, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[30%] right-[20%] w-36 h-36 flex items-center justify-center text-primary/30 blur-[3px]"
          >
            <Zap size={140} strokeWidth={0.5} />
          </motion.div>
        </div>

        {/* Central Frosted Glass Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 w-full max-w-4xl p-12 md:p-20 glass-panel rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] flex flex-col items-center text-center overflow-hidden"
        >
          {/* Internal Refraction Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/5 blur-[100px] rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-8 h-[1px] bg-primary/50" />
            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary font-bold">
              KOOMPI learing roadmap
            </p>
            <span className="w-8 h-[1px] bg-primary/50" />
          </motion.div>

          <h1 className="text-[11vw] md:text-[8vw] lg:text-[6vw] font-sans font-medium leading-[0.85] tracking-tighter mb-12 text-gradient flex flex-wrap justify-center overflow-hidden whitespace-nowrap">
            {"KOOMPI".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
          </h1>

          <p className="text-lg md:text-xl font-sans max-w-2xl leading-relaxed text-foreground/70 mb-16 italic">
            "Empowering the next generation of Linux users and developers. KOOMPI OS provides a seamless gateway to mastering technology through interactive modules and core system insights."
          </p>

          <div className="flex flex-wrap justify-center gap-8">
              <Button
                onClick={requireAuth(() => navigate("/#documents"))}
                className="h-14 md:h-16 px-10 md:px-12 rounded-full bg-primary text-background font-mono text-[11px] font-bold tracking-widest uppercase hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/20"
              >
                System Modules
              </Button>
            <Button
              onClick={requireAuth(() => navigate("/about"))}
              variant="outline"
              className="h-14 md:h-16 px-10 md:px-12 rounded-full border-white/10 hover:bg-white/5 font-mono text-[11px] font-bold tracking-widest uppercase backdrop-blur-sm transition-all duration-300"
            >
              Start Learning
            </Button>
          </div>
        </motion.div>

        {/* Bottom Connective Bloom (Transition to Learning) */}
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Learning & Topics Section */}
      <section id="documents" className="py-35 px-8 section-connector bg-background relative overflow-hidden">
        {/* Top Connective Bloom */}
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)`,
            backgroundSize: `24px 24px`
          }}
        />

        {/* Large Decorative Blooms */}
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

        <div className=" py-10 max-w-7xl mx-auto relative z-10" id="documents">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative group">
              <div className="flex items-center gap-4 mb-8">
                <p className="font-sans text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
                  Library & Learning Course
                </p>
                <div className="h-[1px] w-12 bg-primary/20 group-hover:w-20 transition-all duration-700" />
              </div>
              <h2 className="text-6xl md:text-8xl font-sans font-medium tracking-tighter leading-[0.85]">
                Programming <br className="hidden md:block" />
                {/* <span className="text-muted-foreground/20">&</span> */}
                <span className="italic font-light text-muted-foreground group-hover:text-primary transition-colors duration-700">Languages</span>
              </h2>
            </div>
            <p className="text-primary text-lg font-sans max-w-sm">
              Explore the core foundations of modern computing and software development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TOPICS.map((topic, idx) => {
              const lessonCount = topic.lessons.length;

              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div
                    onClick={requireAuth(() => navigate(`/document/${topic.id}`))}
                    className="block h-full cursor-pointer group"
                  >
                    <div className="glass-panel h-full p-8 flex flex-col justify-between group-hover:border-primary/40 group-hover:-translate-y-2 lg:group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden shadow-2xl space-y-6 rounded-[32px]">
                      {/* Dynamic unique gradient based on topic - enhanced hover */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${topic.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`} />

                      <div className="relative w-20 h-20 glass-panel rounded-2xl flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-tr ${topic.gradient} opacity-20`} />
                        <img src={topic.logo} alt={topic.title} className="relative z-10 w-full h-full object-contain  transition-all duration-700" />
                      </div>

                      <div className="z-10 flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`${topic.level === "Beginner" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                            topic.level === "Intermediate" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                              "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
                            } px-3 py-1 rounded-full text-[8px] font-bold font-mono uppercase tracking-[0.2em] flex items-center gap-1.5 border`}>
                            <span className={`${topic.level === "Beginner" ? "bg-green-500" :
                              topic.level === "Intermediate" ? "bg-amber-500" :
                                "bg-cyan-500"
                              } w-1 h-1 rounded-full shadow-[0_0_8px_currentColor]`} />
                            {topic.level}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-muted-foreground/30 uppercase tracking-widest whitespace-nowrap">
                            {lessonCount} Lessons
                          </span>
                        </div>

                        <h3 className="text-3xl font-sans font-medium tracking-tight mb-3 group-hover:text-primary transition-colors duration-500 italic">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-muted-foreground/60 leading-relaxed line-clamp-2 italic font-sans">
                          {topic.description}
                        </p>
                      </div>

                      <div className="z-10 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-3 group-hover:gap-6 transition-all duration-300">
                          INIT_SYSTEM <ArrowRight className="w-3 h-3 transition-transform" />
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/20 italic">
                          <Clock className="w-3 h-3 text-primary/20" />
                          {lessonCount * 45}M_EST
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Connective Bloom (Transition to Games) */}
        <div className="absolute -bottom-48 right-0 w-[50vw] h-[50vw] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />
      </section >

      {/* Games Highlight — List style */}
      < section
        id="projects"
        className="py-32 px-8 section-connector bg-muted/5 relative overflow-hidden"
      >
        {/* Top Connective Bloom */}
        < div className="absolute -top-48 right-0 w-[50vw] h-[50vw] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Central Connective Bloom (Transition to Vision) */}
        < div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <div>
              <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-6">
                Additional Games Archive
              </p>
              <h2 className="text-6xl font-sans font-medium tracking-tight hover:text-primary transition-colors duration-500 cursor-pointer">
                The Vault Game Portfolio.
              </h2>
            </div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
              <Button
                variant="link"
                asChild
                className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-primary p-0 h-auto"
              >
                <Link to="/vault">
                  Explore All Games <ArrowRight className="ml-2 w-3 h-3" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="space-y-0">
            {GAMES.map((game, index) => (
              <motion.div
                key={game.id}
                layout
                className="border-t border-border/20 group hover:border-primary/40 hover:bg-muted/5 transition-all duration-500"
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === game.id ? null : game.id,
                    )
                  }
                  className={`w-full text-left py-6 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_200px_auto] gap-8 items-center`}
                >

                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 border border-border/20 overflow-hidden shrink-0 ">
                      <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-sans font-medium tracking-tight group-hover:text-primary transition-colors duration-500">
                        {game.title}
                      </h3>
                      <p className="text-xs font-sans tracking-[0.1em] text-muted-foreground uppercase mt-2">
                        {game.category}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-wrap gap-2 justify-end">
                    <motion.span
                      className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground/60 border border-border/40 px-3 py-1 group-hover:border-primary group-hover:text-primary transition-all duration-500 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                    >
                      {game.category}
                    </motion.span>
                  </div>
                  <motion.div
                    className="w-10 h-10 border border-border/40 flex items-center justify-center transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-background"
                    animate={{
                      rotate: expandedProject === game.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedProject === game.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedProject === game.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-16  grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-center">
                        <div className="space-y-8">
                          <p className="text-xl text-muted-foreground font-sans leading-relaxed italic">
                            {game.description}
                          </p>
                          <Button
                            asChild
                            variant="outline"
                            className="rounded-none font-sans text-[10px] font-bold tracking-[0.2em] uppercase h-12 px-8"
                          >
                            <Link to="/vault">
                              Play Game <ExternalLink className="ml-3 w-3 h-3" />
                            </Link>
                          </Button>
                        </div>
                        <motion.div
                          className="aspect-[16/9] overflow-hidden border border-border/20"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={game.cover}
                            alt={game.title}
                            className="w-full h-full object-cover transition-all duration-1000 scale-105 hover:scale-0.005"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div className="border-t border-border/20" />
          </div>
        </div>
      </section >

      {/* Vision — asymmetric layout */}
      < section id="about" className="py-32 px-8 section-connector relative overflow-hidden" >
        {/* Top Connective Bloom */}
        < div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Side Connective Bloom (Transition to Services) */}
        < div className="absolute -bottom-48 -right-24 w-[40vw] h-[40vw] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-24 items-start">
          <motion.div
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-6">
              Approach
            </p>
            <h2 className="text-5xl font-sans font-medium tracking-tight leading-[1.1]">
              Clean Code,
              <br />
              Understanding flow it work.
            </h2>
          </motion.div>
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <p className="text-2xl text-muted-foreground font-sans leading-relaxed max-w-2xl hover:text-foreground transition-colors duration-500">
              KOOMPI OS is built on the principles of open-source freedom and
              educational empowerment. Our platform is designed to provide users
              with the tools they need to explore, build, and innovate within
              the Linux ecosystem.
            </p>
            <div className="pt-4 pb-8">
              <Button
                asChild
                variant="link"
                className="p-0 h-auto font-sans text-xs font-bold tracking-widest uppercase text-primary hover:text-foreground transition-colors group"
              >
                <Link to="/about" className="flex items-center gap-2">
                  View Full Story{" "}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                className="space-y-6 p-10 glass-panel rounded-[32px] border-white/5 hover:border-primary/30 transition-all duration-500 group"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-primary group-hover:text-primary transition-colors duration-500">
                  System Materials
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic font-sans opacity-70 group-hover:opacity-100 transition-colors duration-500">
                  We use quality code, robust architectures, and refined aesthetics that feel premium and look better over time.
                </p>
              </motion.div>
              <motion.div
                className="space-y-6 p-10 glass-panel rounded-[32px] border-white/5 hover:border-primary/30 transition-all duration-500 group"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-primary group-hover:text-primary transition-colors duration-500">
                  Light & Optics
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic font-sans opacity-70 group-hover:opacity-100 transition-colors duration-500">
                  We design interfaces around light and depth — how it reflects, refracts, and moves through digital layers.
                </p>
              </motion.div>
            </div>
            <Separator className="bg-border/20" />
            <motion.div
              className="flex items-center gap-8 py-8 px-10 glass-panel rounded-[32px] border-white/5 group cursor-pointer"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl bg-muted overflow-hidden glass-panel p-2 group-hover:border-primary/50 transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://picsum.photos/seed/sivechheng/400/400"
                  alt="Lead Designer"
                  className="w-full h-full object-cover grayscale transition-all duration-700 rounded-xl"
                />
              </motion.div>
              <div>
                <h4 className="font-sans text-xl italic group-hover:text-primary transition-colors duration-500">
                  KOOMPI Core Team
                </h4>
                <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-primary font-bold mt-2">
                  System Architecture • Open Source
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section >

      {/* Games Highlight — List style */}
      {/* <section
        id="projects"
        className="py-32 px-8 border-t border-border/20 bg-muted/5 section-connector"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <div>
              <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-6">
                Digital Games Archive
              </p>
              <h2 className="text-6xl font-sans font-medium tracking-tight hover:text-primary transition-colors duration-500 cursor-pointer">
                The Vault.
              </h2>
            </div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
              <Button
                variant="link"
                asChild
                className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-primary p-0 h-auto"
              >
                <Link to="/vault">
                  Explore All Games <ArrowRight className="ml-2 w-3 h-3" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="space-y-0">
            {GAMES.map((game, index) => (
              <motion.div
                key={game.id}
                layout
                className="border-t border-border/20 group"
              >
                <button
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === game.id ? null : game.id,
                    )
                  }
                  className="w-full text-left py-12 grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_200px_auto] gap-8 items-center"
                >
                  <span className="font-sans text-muted-foreground/30 text-2xl">
                    0{index + 1}
                  </span>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 border border-border/20 overflow-hidden shrink-0">
                      <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-sans font-medium tracking-tight group-hover:text-primary transition-colors duration-500">
                        {game.title}
                      </h3>
                      <p className="text-xs font-sans tracking-[0.1em] text-muted-foreground uppercase mt-2">
                        {game.category}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-wrap gap-2 justify-end">
                    <motion.span
                      className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground/60 border border-border/40 px-3 py-1 group-hover:border-primary group-hover:text-primary transition-all duration-500 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                    >
                      {game.category}
                    </motion.span>
                  </div>
                  <motion.div
                    className="w-10 h-10 border border-border/40 flex items-center justify-center transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-background"
                    animate={{
                      rotate: expandedProject === game.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedProject === game.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedProject === game.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-16 pl-[100px] grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-16">
                        <div className="space-y-8">
                          <p className="text-xl text-muted-foreground font-sans leading-relaxed italic">
                            {game.description}
                          </p>
                          <Button
                            asChild
                            variant="outline"
                            className="rounded-none font-sans text-[10px] font-bold tracking-[0.2em] uppercase h-12 px-8"
                          >
                            <Link to="/vault">
                              Play Game <ExternalLink className="ml-3 w-3 h-3" />
                            </Link>
                          </Button>
                        </div>
                        <motion.div
                          className="aspect-[16/10] overflow-hidden border border-border/20"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={game.thumbnail}
                            alt={game.title}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div className="border-t border-border/20" />
          </div>
        </div>
      </section> */}

      {/* Services — minimalist cards */}
      <section className="py-32 px-8 section-connector bg-background relative overflow-hidden">
        {/* Top Connective Bloom */}
        <div className="absolute -top-32 -right-24 w-[40vw] h-[40vw] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Shared Bottom Bloom (Transition to Contact) */}
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              className="max-w-md"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-6">
                What We Do
              </p>
              <h2 className="text-5xl font-sans font-medium tracking-tight leading-tight mb-8">
                Full Service,
                <br />
                Start to Finish.
              </h2>
              <p className="text-muted-foreground font-sans italic text-lg mb-12">
                "From the first floor plan to the last cushion — we handle every
                step of the design process."
              </p>
              <div className="flex flex-col gap-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    asChild
                    variant="ghost"
                    className="p-0 h-auto font-sans text-[10px] font-bold tracking-[0.2em] uppercase hover:text-primary transition-colors"
                  >
                    <Link to="/services">Explore All Services →</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-sans text-[10px] font-bold tracking-[0.2em] uppercase hover:text-primary transition-colors"
                  >
                    Work with us →
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              {services.map((service, idx) => (
                <motion.div
                  key={service.name}
                  className="bg-background/40 backdrop-blur-xl p-12 flex flex-col justify-between hover:bg-white/5 transition-all duration-500 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <motion.div
                    className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all duration-700 mb-16 shadow-lg shadow-black/20"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <service.icon className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-sans text-2xl mb-4 italic group-hover:text-primary transition-colors duration-500">
                      {service.name}
                    </h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed italic opacity-60 group-hover:opacity-100 transition-all duration-500">
                      {service.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA — atmospheric */}
      <section className="py-40 px-8 section-connector relative overflow-hidden text-center">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[150px] -z-10 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <p className="font-sans text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-10">
            Get in Touch
          </p>
          <h2 className="text-6xl md:text-8xl font-sans font-medium tracking-tighter mb-16 px-4 hover:text-primary transition-colors duration-500 cursor-pointer">
            Have a project
            <br />
            in mind?
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button asChild className="h-20 px-16 rounded-full bg-primary text-background hover:bg-primary shadow-2xl shadow-primary/20 transition-all duration-500 font-mono text-[11px] font-bold tracking-[0.4em] uppercase">
                <Link to="/services#contact">
                  Initialize Project Brief
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                asChild
                className="h-20 px-16 rounded-full glass-panel border-white/10 text-foreground font-mono text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-white/5 transition-all duration-500"
              >
                <Link to="/services">
                  System Studio Locale
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Social / Info Footer Minimal */}
      <Footer />
    </div >
  );
}
