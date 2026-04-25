import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Quote, Layers, Sun, Palette, ArrowRight,
  Instagram, Linkedin, MessageCircle, Mail, Loader2, CheckCircle2,
  ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const philosophyItems = [
  {
    title: "Clean Code",
    icon: Layers,
    detail:
      "Well-structured, maintainable code that's built for scalability and readability. Quality matters.",
  },
  {
    title: "User-Centered Design",
    icon: Sun,
    detail:
      "Every feature is designed with the end user in mind. Simplicity and functionality go hand in hand.",
  },
  {
    title: "Continuous Growth",
    icon: Palette,
    detail:
      "Always learning, always improving. Technology evolves, and so do I — staying current with industry best practices.",
  },
];

const ethos = [
  { title: 'Honest Materials', desc: 'We use stone, timber, and metal in their natural form — no decor that pretends to be something it is not.' },
  { title: 'Quiet Spaces', desc: 'Good design does not shout. We work to remove what is unnecessary so the space can breathe.' },
  { title: 'Light as a Material', desc: 'We plan every room around how sunlight moves through it from morning to evening.' },
];

export default function About() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      setStatus('error');
      setErrorMessage('Services are temporarily unavailable.');
      return;
    }
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setErrorMessage('Communication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 relative overflow-hidden ">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[30vw] h-[30vw] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="px-6 md:px-8 mb-20 md:mb-32 relative z-10 section-connector">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-primary" />
              <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
                System Overview
              </p>
            </div>
            <h1 className="text-5xl md:text-8xl font-sans font-medium tracking-tighter leading-[0.95] md:leading-[0.85] mb-8 md:mb-12 uppercase text-gradient">
              KOOMPI Academy <br />
              <span className="opacity-50 italic font-light lowercase font-sans text-3xl md:text-5xl lg:text-7xl">designing the future of education.</span>
            </h1>

            <div className="glass-panel p-8 md:p-16 rounded-[32px] md:rounded-[48px] max-w-4xl border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Quote size={80} className="text-primary" />
              </div>
              <p className="text-xl md:text-4xl text-foreground font-sans leading-relaxed italic relative z-10">
                "Merging technical precision with creative instinct to build digital environments that define the future."
              </p>
              <div className="mt-8 md:mt-12 flex items-center gap-6">
                <div className="h-px w-12 bg-primary/30" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-primary">System Philosophy_v2.0</span>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Bottom Connective Bloom (Transition to Story) */}
        <div className="absolute -bottom-48 left-[20%] w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Founder Story */}
      <section className="px-6 md:px-8 mb-20 md:mb-32 relative section-connector">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="aspect-[4/5] bg-muted/10 overflow-hidden glass-panel p-4 rounded-[48px] border-white/5 relative z-10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
                alt="KOOMPI Academy Architecture"
                className="w-full h-full object-cover rounded-[36px] grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
              />
              {/* Technical Overlay */}
              <div className="absolute bottom-10 left-10 right-10 p-6 glass-panel rounded-2xl border-white/10 backdrop-blur-3xl">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="font-mono text-[8px] font-bold text-primary uppercase tracking-widest">System Build</p>
                    <p className="font-mono text-[10px] font-bold text-white/50 tracking-widest">KOOMPI_OS_v2.0</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <ShieldCheck size={14} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 glass-panel rounded-2xl text-primary">
              <Quote size={28} strokeWidth={1.5} />
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-sans font-medium leading-[0.95] md:leading-[0.9] tracking-tighter">
                Architecting <span className="text-primary italic">Seamless</span> <br /> Digital Systems.
              </h2>
              <p className="text-xl text-muted-foreground font-sans leading-relaxed italic border-l-2 border-primary/20 pl-10 opacity-80">
                KOOMPI is a Cambodian-designed operating system and laptop project. We specialize in creating a high-performance, open-source ecosystem that empowers students and professionals to build their own future.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm font-sans max-w-xl opacity-60">
                Our journey started with a vision to make computing accessible and powerful. Today, KOOMPI Academy serves as a core platform for thousands, providing the tools for coding, design, and system administration in a beautiful, optimized environment.
              </p>
            </div>

            <div className="flex items-center gap-8 pt-6">
              <div className="h-px flex-1 bg-white/10" />
              <div className="flex flex-col items-end">
                <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                  Phnom Penh, KH
                </h4>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-2">
                  Established 2018
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Bottom Connective Bloom (Transition to Philosophy) */}
        <div className="absolute -bottom-48 right-[10%] w-[60vw] h-[60vw] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 section-connector relative overflow-hidden">
        {/* Top Connective Bloom */}
        <div className="absolute -top-48 right-[10%] w-[60vw] h-[60vw] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-6">Execution Strategy</p>
            <h2 className="text-4xl md:text-6xl font-sans font-medium">Core Axioms.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {philosophyItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="glass-panel p-8 md:p-12 rounded-[32px] md:rounded-[48px] border-white/5 hover:border-primary/40 transition-all duration-700 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                  <item.icon size={100} className="text-primary" />
                </div>

                <div className="w-16 h-16 glass-panel rounded-2xl flex items-center justify-center text-primary mb-12 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(var(--primary),0.2)] transition-all duration-700">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-sans font-medium mb-6 italic">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed italic font-sans opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Bottom Connective Bloom (Transition to Final Statement) */}
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Final Statement */}
      <section className="py-28 px-8 section-connector text-center relative overflow-hidden">
        <div className="flex items-center justify-center max-w-5xl mx-auto" >

          {/* Top Connective Bloom */}
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel py-20 px-8 md:py-32 md:px-20 rounded-[48px] md:rounded-[80px] border-white/5 relative overflow-hidden shadow-[0_64px_128px_-16px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full" />

            <p className="font-mono text-[10px] font-bold tracking-[0.5em] text-primary uppercase mb-16">
              Module Mission_v2
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tighter mb-20 leading-[0.9] text-gradient">
              We build digital environments that are <span className="italic">clean</span>, <span className="italic">functional</span>, and <span className="italic">high-performance</span>.
            </h2>

            <Button
              size="lg"
              onClick={() => navigate("/services")}
              className="h-20 px-16 rounded-full bg-primary text-background font-mono text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-primary shadow-2xl shadow-primary/20 transition-all duration-500"
            >
              Execute Exploration <ArrowRight className="ml-4 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

      </section>
    </div>
  );
}
