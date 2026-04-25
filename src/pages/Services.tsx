import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Layout,
  Paintbrush,
  Compass,
  Home as HomeIcon,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "@/components/ContactForm";
import { categories } from "@/constants";

const services = [
  {
    name: "System Architecture",
    icon: Layout,
    description: "Cloud Scalability & Logic Flow",
    detail:
      "We engineer robust backend foundations that scale effortlessly. This includes microservices orchestration, database optimization, and ensuring high-availability systems.",
    features: [
      "Microservices Design",
      "API Orchestration",
      "Database Scalability",
      "Cloud Integration",
    ],
    techStack: ["Node.js", "Docker", "Kubernetes", "AWS"],
  },
  {
    name: "Custom Modules",
    icon: Paintbrush,
    description: "High-Performance Software",
    detail:
      "Every project is uniquely engineered to solve specific technical challenges. From proprietary algorithms to signature interfaces, we build software that drives excellence.",
    features: [
      "Proprietary Algorithms",
      "Modular Frontend Components",
      "Secure Edge Computing",
      "Legacy Code Refactoring",
    ],
    techStack: ["Typescript", "Go", "Rust", "WebAssembly"],
  },
  {
    name: "UI/UX Strategy",
    icon: Compass,
    description: "Visual Identity & User Optics",
    detail:
      "We define the aesthetics and interactions that give a platform its character. Our strategies are data-driven and focused on the psychological resonance of the interface.",
    features: [
      "Interactive Prototyping",
      "Behavioral User Flows",
      "Design Systems (Tech)",
      "High-Fidelity Visuals",
    ],
    techStack: ["Figma", "Tailwind", "Framer", "React"],
  },
  {
    name: "Enterprise Solutions",
    icon: HomeIcon,
    description: "Digital Transformation",
    detail:
      "Modernizing large-scale infrastructures for the next generation of tech. We specialize in enterprise-grade transitions that balance legacy stability with modern speed.",
    features: [
      "Infrastructural Migration",
      "Security Protocols",
      "Scalable Dashboards",
      "Sovereign Tech Stacks",
    ],
    techStack: ["MongoDB", "Redis", "Security", "Cloudflare"],
  },
];

// const categories = [
//   {
//     name: "All Team",
//     moments: [
//       { title: "Sivchheng Kheang", role: "Technical Lead", description: "Architecting the technical core and high-performance visions.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
//       { title: "Long Sei", role: "DevOps Engineer", description: "Optimizing cloud orchestration and system deployment cycles.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
//       { title: "Dara Som", role: "UI/UX Engineer", description: "Refining visual optics and interactive design protocols.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
//       { title: "Leakhena Tep", role: "Fullstack Developer", description: "Bridging complex logic with intuitive system interfaces.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
//     ]
//   },
//   {
//     name: "Developers",
//     moments: [
//       { title: "Sivchheng Kheang", role: "Technical Lead", description: "Architecting the technical core and high-performance visions.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
//       { title: "Long Sei", role: "DevOps Engineer", description: "Optimizing cloud orchestration and system deployment cycles.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
//     ]
//   },
//   {
//     name: "Designers",
//     moments: [
//       { title: "Dara Som", role: "UI/UX Engineer", description: "Refining visual optics and interactive design protocols.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
//     ]
//   }
// ];

const processSteps = [
  {
    title: "Discovery & Audit",
    description:
      "We analyze your technical landscape, system bottlenecks, and the vision for your digital infrastructure.",
  },
  {
    title: "Technical Spiking",
    description:
      "Translating requirements into architectural blueprints, proof-of-concepts, and modular data models.",
  },
  {
    title: "Deep Engineering",
    description:
      "Refining every detail, from technical unit tests to final high-performance system deployments.",
  },
  {
    title: "Scaling & Support",
    description:
      "Coordinating with devops and teams to ensure system longevity and precision at scale.",
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All Team");

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 relative overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[5%] right-[10%] w-[50vw] h-[50vw] bg-primary/5 blur-[120px] rounded-full opacity-40" />
        <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] bg-secondary/5 blur-[150px] rounded-full opacity-40" />
      </div>

      {/* Hero Section */}
      <section className="px-6 md:px-8 relative z-10 text-center">
        <div className="max-w-7xl min-h-[70vh] md:h-[calc(100vh-8rem)] mx-auto flex flex-col items-center justify-center relative py-20 md:py-0">

          {/* Technical Keyword Tokens */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] -left-10 md:-left-20 glass-panel px-4 py-2 md:px-6 md:py-4 rounded-2xl opacity-[0.05] md:opacity-10 flex items-center gap-3 border-white/5"
          >
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary" />
            <span className="font-mono text-[7px] md:text-[9px] font-bold tracking-[0.3em] uppercase text-foreground">Scalable</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[30%] -right-10 md:-right-20 glass-panel px-4 py-2 md:px-6 md:py-4 rounded-2xl opacity-[0.05] md:opacity-10 flex items-center gap-3 border-white/5"
          >
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary" />
            <span className="font-mono text-[7px] md:text-[9px] font-bold tracking-[0.3em] uppercase text-foreground">Modular</span>
          </motion.div>

          <motion.div
            animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[15%] right-5 md:right-20 glass-panel px-3 py-2 md:px-5 md:py-3 rounded-xl opacity-[0.03] md:opacity-5 flex items-center gap-2 border-white/5"
          >
            <span className="font-mono text-[6px] md:text-[8px] font-bold tracking-[0.2em] uppercase text-primary">REST v2.4</span>
          </motion.div>

          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[20%] left-5 md:left-10 glass-panel px-3 py-2 md:px-5 md:py-3 rounded-xl opacity-[0.03] md:opacity-5 flex items-center gap-2 border-white/5"
          >
            <span className="font-mono text-[6px] md:text-[8px] font-bold tracking-[0.2em] uppercase text-secondary">99.9% Uptime</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="w-12 h-px bg-primary/30" />
              <p className="font-mono text-[10px] font-bold tracking-[0.5em] text-primary uppercase">
                Expertise & Systems
              </p>
              <div className="w-12 h-px bg-primary/30" />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-9xl font-sans font-medium tracking-tighter leading-[1.1] md:leading-[0.8] mb-10 md:mb-14 uppercase flex flex-wrap justify-center overflow-hidden">
              {"Modules".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block text-gradient pb-2"
                >
                  {char}
                </motion.span>
              ))}
              <br className="w-full" />
              <div className="flex flex-wrap justify-center w-full gap-x-4">
                <span className="italic font-light lowercase opacity-40">that define</span>
                <div className="flex">
                  {"Performance.".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 1.2 + index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block text-gradient pb-2"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-sans leading-relaxed max-w-2xl mx-auto italic opacity-70">
              "We architect high-performance digital systems that balance technical precision with visceral user experiences."
            </p>
          </motion.div>

          {/* Scroll Discovery Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="font-mono text-[8px] font-bold tracking-[0.4em] text-primary/40 uppercase">Discover Expertise</span>
            <div className="w-px h-16 bg-gradient-to-b from-primary/40 to-transparent relative overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-[30%] bg-primary"
              />
            </div>
          </motion.div>
        </div>

        {/* Transitional Bloom */}
        <div className="absolute -bottom-64 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-primary/5 blur-[180px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* Services Grid */}
      <section className="px-6 md:px-8 py-20 md:py-32 relative z-10 section-connector">
        {/* Top Connective Bloom */}
        <div className="absolute -top-48 right-[10%] w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
          {services.map((service: any, index: number) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="glass-panel group relative rounded-[32px] md:rounded-[48px] border-white/5 hover:border-primary/40 transition-all duration-700 overflow-hidden min-h-[400px] md:min-h-[480px] flex flex-col"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors duration-700" />

              <div className="p-8 md:p-12 flex flex-col h-full relative z-10">
                {/* Header Area */}
                <div className="flex items-start justify-between mb-12">
                  <div className="w-16 h-16 glass-panel rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 shadow-[0_0_30px_rgba(var(--primary),0.1)] transition-all duration-700">
                    <service.icon size={32} strokeWidth={1} />
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-[0.4em] text-primary/40 mb-2">Service Node</span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/20 group-hover:text-primary/40 transition-colors">0{index + 1}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-sans font-medium tracking-tight italic">{service.name}</h2>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">{service.description}</p>

                  <p className="text-muted-foreground font-sans leading-relaxed italic opacity-80 max-w-sm">
                    {service.detail}
                  </p>
                </div>

                {/* Reveal Area (Features & Tech Stack) */}
                <div className="mt-auto pt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg glass-panel text-[8px] font-mono font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary group-hover:border-primary/20 transition-all border border-transparent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-y-4 gap-x-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-700 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0">
                      {service.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-primary/40" />
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center" />
            </motion.div>
          ))}
        </div>
        {/* Bottom Connective Bloom (Transition to Process) */}
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 relative overflow-hidden section-connector">
        {/* Top Connective Bloom */}
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute -inset-20 bg-primary/5 blur-[150px] rounded-full opacity-50" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10 -translate-y-1/2 pointer-events-none hidden lg:block" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-40">
            <p className="font-mono text-[10px] font-bold tracking-[0.5em] text-primary uppercase mb-8">Execution Lifecycle</p>
            <h2 className="text-4xl md:text-8xl font-sans font-medium tracking-tighter">The <span className="italic font-light opacity-40">Journey.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 relative">
            {/* Connecting line for mobile */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/10 lg:hidden" />

            {processSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="relative flex flex-col items-center lg:items-center text-center lg:text-center group"
              >
                {/* Technical Node */}
                <div className="relative mb-12">
                  <div className="w-16 h-16 rounded-full glass-panel border-white/10 flex items-center justify-center relative z-10 group-hover:border-primary/40 transition-colors duration-700 bg-background">
                    <span className="font-mono text-xs font-bold text-primary/40 group-hover:text-primary transition-colors">0{idx + 1}</span>
                  </div>
                  {/* Node Pulse Effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-md scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
                </div>

                <div className="space-y-4 px-4">
                  <h3 className="font-sans text-xl font-medium text-foreground tracking-tight italic">{step.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed italic font-sans opacity-60 group-hover:opacity-100 transition-opacity duration-700 max-w-[200px] mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Vertical Segment for mobile */}
                <div className="absolute left-8 top-16 bottom-0 w-px bg-primary/10 lg:hidden" />
              </motion.div>
            ))}
          </div>
        </div>
        {/* Bottom Connective Bloom (Transition to Partnership) */}
        <div className="absolute -bottom-48 right-0 w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* KOOMPI Partnership */}
      <section className="py-20 md:py-32 px-6 md:px-8 relative bg-white/[0.02] section-connector">
        {/* Top Connective Bloom */}
        <div className="absolute -top-48 right-0 w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-[1px] bg-secondary" />
              <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-secondary uppercase">
                Corporate Synergy
              </p>
            </div>
            <h2 className="text-5xl md:text-6xl font-sans font-medium leading-tight mb-8">
              KOOMPI <span className="text-secondary italic">Ecosystem.</span>
            </h2>
            <p className="text-xl text-muted-foreground font-sans leading-relaxed mb-12 italic opacity-80">
              As a core member of the KOOMPI development team, we leverage sovereign technology and modular architectures to build products that redefine regional standards.
            </p>

            <div className="space-y-6">
              {[
                "Sovereign Tech Integration",
                "Scalable System Architecture",
                "Community-Driven Design"
              ].map((item) => (
                <div key={item} className="flex items-center gap-6 glass-panel py-4 px-8 rounded-2xl max-w-sm">
                  <CheckCircle2 size={18} className="text-secondary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/80 font-bold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="aspect-video glass-panel p-4 rounded-[40px] relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
              alt="Collaboration"
              className="w-full h-full object-cover rounded-[32px] grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
        </div>
        {/* Bottom Connective Bloom (Transition to Team) */}
        <div className="absolute -bottom-48 left-[10%] w-[40vw] h-[40vw] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 relative z-10 section-connector">
        {/* Top Connective Bloom */}
        <div className="absolute -top-48 left-[10%] w-[40vw] h-[40vw] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-6">The Collective</p>
            <h2 className="text-5xl md:text-6xl font-sans font-medium">KOOMPI Team.</h2>
          </div>

          <div className="flex justify-center mb-20">
            <div className="glass-panel p-1.5 rounded-full inline-flex">
              {categories.map((category: any) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-8 py-3 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${activeCategory === category.name
                    ? "bg-primary text-background shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {categories
                .find((cat: any) => cat.name === activeCategory)
                ?.moments.map((moment: any, index: number) => (
                  <motion.div
                    key={moment.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="glass-panel p-4 rounded-[32px] group relative overflow-hidden"
                  >
                    <div className="aspect-square rounded-[24px] overflow-hidden mb-6 relative">
                      <img
                        src={moment.image}
                        alt={moment.title}
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-sans text-lg font-medium mb-1">{moment.title}</h4>
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-primary mb-2 opacity-80">{moment.role}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic opacity-70 group-hover:opacity-100 transition-opacity">
                      {moment.description}
                    </p>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
        {/* Bottom Connective Bloom (Transition to Contact) */}
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      </section>


      <section className="py-20 md:py-28 px-4 md:px-5 relative overflow-hidden bg-background section-connector">
        {/* Subtle Background Ornaments */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 20, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [20, 0, 20],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[10%] -left-[5%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Container Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel border-white/5 p-6 md:p-10 rounded-[32px] md:rounded-[64px] shadow-[0_64px_128px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Visual Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />

            <div className="relative z-10">
              {/* SHARED HEADER */}
              <div className="relative mb-20 flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-6 mb-10"
                >
                  <div className="w-12 h-px bg-primary/40" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-primary">
                    Transmission Node
                  </span>
                  <div className="w-12 h-px bg-primary/40" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 1.2 }}
                  className="text-4xl md:text-8xl font-sans leading-[0.95] md:leading-[0.85] tracking-tight italic"
                >
                  Have a system <br />
                  <span className="opacity-40 font-light">requirement?</span>
                </motion.h2>
              </div>

              {/* NESTED CARDS GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Description Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="glass-panel border-white/5 p-8 md:p-16 flex flex-col justify-between space-y-12 md:space-y-16 rounded-[32px] md:rounded-[48px]"
                >
                  <div className="space-y-12">
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-sans italic opacity-70">
                      Collaborate with the KOOMPI technical department to architect exceptional digital experiences. KOOMPI Academy continues to evolve for the future of regional development.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                      {[
                        { label: "Direct Line", value: "+855 969094960" },
                        { label: "Secure Mail", value: "kheangsivechheng@gmail.com" },
                        { label: "Studio HQ", value: "KOOMPI Hub, Phnom Penh, KH", full: true },
                      ].map((item) => (
                        <div key={item.label} className={`${item.full ? 'sm:col-span-2' : ''} space-y-3`}>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-primary/40">
                            {item.label}
                          </span>
                          <p className="text-md font-sans italic tracking-tight text-foreground/80">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 border-t border-white/5 space-y-6">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-primary/40">
                      Network Identity
                    </span>
                    <div className="flex flex-wrap gap-10">
                      {[{ name: 'LinkedIn', link: '#' }, { name: 'GitHub', link: '#' }, { name: 'Instagram', link: 'https://www.instagram.com/koompi/' }].map((social) => (
                        <a
                          target="_blank"
                          key={social.name}
                          href={social.link}
                          className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-all duration-500 hover:scale-105"
                        >
                          {social.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="glass-panel border-white/5 p-1 shadow-2xl rounded-[32px] md:rounded-[48px]"
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
