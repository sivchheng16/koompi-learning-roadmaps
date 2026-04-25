import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Code2,
  Users,
  Zap,
  ExternalLink,
  Paintbrush,
  Layout,
  Compass,
  AppWindow,
  LayoutTemplate,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { GAMES, TOPICS } from "../constants";
import Footer from "../components/Footer";
import { AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { OnboardingQuiz, useQuizDone } from "../components/OnboardingQuiz";

const services = [
  {
    name: "Frontend Development",
    icon: Layout,
    detail: "Clean, responsive interfaces built with modern frameworks and attention to detail.",
  },
  {
    name: "Backend Development",
    icon: Code2,
    detail: "Robust server-side solutions and scalable API architectures.",
  },
  {
    name: "Mobile & Cross-Platform",
    icon: Compass,
    detail: "Seamless experiences across iOS, Android, and web platforms.",
  },
  {
    name: "UI/UX Design",
    icon: Paintbrush,
    detail: "User-centered designs that balance aesthetics with clear functionality.",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
    viewport: { once: true, amount: 0.1 },
  };
}

export default function Home() {
  const [expandedGame, setExpandedGame] = useState<string | null>(null);
  const [quizDismissed, setQuizDismissed] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const quizDone = useQuizDone();
  const showQuiz = !quizDone && !quizDismissed && !user;

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Welcome-back banner for signed-in users */}
      {user && (
        <div className="bg-white border-b border-border px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm font-sans text-muted-foreground">
            Welcome back, <span className="text-foreground font-medium">{user.fullname.split(" ")[0]}</span>.
          </p>
          <Link
            to="/dashboard"
            className="text-sm font-sans font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            View your dashboard <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 px-8 overflow-hidden">
        {/* Subtle warm gradient behind text */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[70%] bg-gradient-to-b from-amber-50/60 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              KOOMPI Academy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal leading-[1.0] tracking-tight mb-8 text-foreground"
          >
            Learn to build
            <br />
            <span className="text-primary italic">great software.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl font-sans text-muted-foreground max-w-2xl leading-relaxed mb-12"
          >
            Empowering the next generation of Linux users and developers.
            Structured modules, hands-on projects, and core system insights
            — from terminal basics to full-stack applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => {
                const el = document.getElementById("courses");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-sans font-medium text-sm hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Explore Courses
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate("/about")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border bg-white text-foreground font-sans font-medium text-sm hover:bg-muted transition-all duration-200"
            >
              About the Platform
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Onboarding Quiz ────────────────────────────────────── */}
      {showQuiz && (
        <section className="px-8 pb-16 -mt-4">
          <div className="max-w-2xl mx-auto">
            <OnboardingQuiz onDismiss={() => setQuizDismissed(true)} />
          </div>
        </section>
      )}

      {/* ── Course Library ─────────────────────────────────────── */}
      <section id="courses" className="py-20 md:py-28 px-8 section-connector">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="mb-14">
            <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-3">
              Course Library
            </p>
            <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
              <h2 className="text-4xl md:text-5xl font-serif font-normal text-foreground tracking-tight">
                Programming Languages<br />
                <span className="text-muted-foreground italic font-light">&amp; Frameworks</span>
              </h2>
              <p className="text-muted-foreground font-sans max-w-sm text-sm leading-relaxed">
                Explore the core foundations of modern computing and software development.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOPICS.map((topic, idx) => (
              <motion.div
                key={topic.id}
                {...fadeUp(idx * 0.07)}
              >
                <button
                  onClick={() => navigate(`/document/${topic.id}`)}
                  className="w-full text-left group outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl block h-full"
                >
                  <div className="h-full bg-white border border-border rounded-2xl p-6 flex flex-col gap-5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center p-2.5 group-hover:bg-primary/8 transition-colors duration-300">
                      <img
                        src={topic.logo}
                        alt={topic.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2">
                      <span className={`
                        px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium
                        ${topic.level === "Beginner"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : topic.level === "Intermediate"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-sky-50 text-sky-700 border border-sky-200"}
                      `}>
                        {topic.level}
                      </span>
                      <span className="text-[11px] font-sans text-muted-foreground">
                        {topic.lessons.length} lessons
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {topic.title}
                      </h3>
                      <p className="text-sm font-sans text-muted-foreground leading-relaxed line-clamp-2">
                        {topic.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs font-sans font-medium text-primary flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                        Start learning
                        <ArrowRight size={12} />
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-sans text-muted-foreground">
                        <Clock size={11} />
                        {topic.lessons.length * 45}m
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Vault / Games ──────────────────────────────────── */}
      <section className="py-20 md:py-28 px-8 section-connector bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-3">
                Game Archive
              </p>
              <h2
                className="text-4xl md:text-5xl font-serif font-normal text-foreground tracking-tight cursor-pointer hover:text-primary transition-colors duration-300"
                onClick={() => navigate("/vault")}
              >
                The Vault.
              </h2>
            </div>
            <Link
              to="/vault"
              className="inline-flex items-center gap-2 text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              View all games <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div>
            {GAMES.map((game, index) => (
              <motion.div
                key={game.id}
                {...fadeUp(index * 0.06)}
                className="border-t border-border group"
              >
                <button
                  onClick={() => setExpandedGame(expandedGame === game.id ? null : game.id)}
                  className="w-full text-left py-5 flex items-center gap-5 hover:bg-white/60 transition-colors duration-200 px-2 -mx-2 rounded-lg"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-border shrink-0">
                    <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-200">
                      {game.title}
                    </h3>
                    <p className="text-xs font-sans text-muted-foreground uppercase tracking-wide mt-0.5">
                      {game.category}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <span className="px-3 py-1 rounded-full border border-border text-[11px] font-sans text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors duration-200">
                      {game.category}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedGame === game.id ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors duration-200"
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedGame === game.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-2 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-start">
                        <div className="space-y-5">
                          <p className="text-base font-sans text-muted-foreground leading-relaxed">
                            {game.description}
                          </p>
                          <Link
                            to="/vault"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-sans font-medium text-foreground hover:bg-muted hover:border-primary/40 transition-all duration-200"
                          >
                            Play game <ExternalLink size={13} />
                          </Link>
                        </div>
                        <div className="aspect-video rounded-xl overflow-hidden border border-border">
                          <img
                            src={game.cover}
                            alt={game.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ── Vision / Approach ──────────────────────────────────── */}
      <section className="py-20 md:py-28 px-8 section-connector">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">
          <motion.div
            {...fadeUp()}
            className="lg:sticky lg:top-32"
          >
            <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-4">
              Our Approach
            </p>
            <h2 className="text-4xl font-serif font-normal text-foreground leading-tight tracking-tight">
              Clean code,<br />
              clear thinking.
            </h2>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="space-y-10">
            <p className="text-xl md:text-2xl font-sans text-muted-foreground leading-relaxed">
              KOOMPI Academy is built on the principles of open-source freedom and
              educational empowerment. We give you the tools to explore, build,
              and innovate — from the Linux terminal to full-stack applications.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-sans font-medium text-primary hover:gap-3 transition-all duration-200"
            >
              Read the full story <ArrowRight size={14} />
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {[
                {
                  title: "Quality First",
                  body: "We use quality code, robust architecture, and refined design that feels premium and improves over time.",
                },
                {
                  title: "Open Learning",
                  body: "Every module is designed to build on the last — structured paths from beginner to advanced.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="p-6 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300"
                >
                  <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-border hover:border-primary/30 transition-colors duration-300 cursor-pointer group">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-border shrink-0">
                <img
                  src="https://picsum.photos/seed/koompi-team/200/200"
                  alt="KOOMPI Team"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <h4 className="font-serif text-base text-foreground group-hover:text-primary transition-colors duration-300">
                  KOOMPI Core Team
                </h4>
                <p className="text-xs font-sans text-muted-foreground mt-0.5 tracking-wide">
                  System Architecture · Open Source
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-8 section-connector bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            <motion.div {...fadeUp()} className="max-w-sm">
              <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-4">
                What We Do
              </p>
              <h2 className="text-4xl font-serif font-normal text-foreground leading-tight mb-6 tracking-tight">
                Full service,<br />start to finish.
              </h2>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-8">
                From the first concept to deployment — we handle every step of the development process.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to="/services"
                  className="text-sm font-sans font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
                >
                  Explore all services <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, idx) => (
                <motion.div
                  key={service.name}
                  {...fadeUp(idx * 0.08)}
                  className="bg-white p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 mb-6">
                    <service.icon size={18} />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                    {service.detail}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-28 md:py-40 px-8 section-connector text-center">
        <motion.div {...fadeUp()} className="max-w-3xl mx-auto">
          <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-6">
            Get in touch
          </p>
          <h2 className="text-5xl md:text-7xl font-serif font-normal text-foreground tracking-tight mb-10 leading-tight">
            Have a project<br />in mind?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/services#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-sans font-medium text-sm hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Start a conversation
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-white text-foreground font-sans font-medium text-sm hover:bg-muted transition-all duration-200"
            >
              View services
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
