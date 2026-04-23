import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png"
import {
  Instagram,
  Facebook,
  MessageCircle,
  Github,
  Command,
  ArrowUpRight
} from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 px-8 border-t border-white/5 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-10 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform duration-500">
                {/* <Command size={24} /> */}
                <img src={logo} alt="logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-sans text-3xl font-medium tracking-[0.2em] text-foreground">
                KOOMPI OS
              </span>
            </Link>
            <p className="text-xl text-muted-foreground font-sans leading-relaxed italic opacity-80 max-w-sm">
              "Developing high-performance software systems for the future of education and innovation."
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {[
                { icon: Github, href: "https://github.com/koompi" },
                { icon: MessageCircle, href: "https://t.me/koompi" },
                { icon: Instagram, href: "https://instagram.com/koompi_os" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Systems Map</h3>
            <div className="space-y-4">
              {[
                { name: "System Home", path: "/" },
                { name: "About KOOMPI", path: "/about" },
                { name: "Modules", path: "/services" },
                { name: "Features", path: "/portfolio" },
                { name: "The Vault", path: "/vault" }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-sans italic text-lg"
                >
                  {link.name}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </Link>
              ))}
            </div>
          </div>

          {/* Studio Info */}
          <div className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Studio Location</h3>
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-white/5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-foreground font-bold mb-2">Phnom Penh, KH</p>
                <p className="text-sm text-muted-foreground leading-relaxed italic font-sans">
                  KOOMPI HQ, No. 34-36<br />
                  St. 200, Phsar Thmei II
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full h-14 rounded-full glass-panel border-white/10 font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-background transition-all"
              >
                Inquiry Terminal
              </Button>
            </div>
          </div>
        </div>

        {/* Legal & Credits */}
        <div className="py-5 border-t border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              © {currentYear} KOOMPI OS
            </p>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
              Official Software Department
            </p>
          </div>
          <p className="font-sans italic text-sm text-muted-foreground/40">
            Powered by KOOMPI
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
