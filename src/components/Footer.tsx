import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Square,
  Instagram,
  Facebook,
  MessageCircle,
  Github,
  Target,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-border/10 bg-gradient-to-t from-background/50 to-transparent">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 border-2 border-primary flex items-center justify-center transition-transform duration-700 group-hover:rotate-45">
                <Square className="w-4 h-4 fill-primary" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-foreground">
                SIVCHHENG
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crafting exceptional interior design experiences that blend
              functionality, aesthetics, and personal style. Transforming spaces
              into homes.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Explore
            </h3>
            <div className="space-y-2">
              {[
                { name: "Portfolio", path: "/portfolio" },
                { name: "Services", path: "/services" },
                { name: "About", path: "/about" },
                { name: "Vault", path: "/vault" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h3>
            <div className="flex gap-6">
              {[
                {
                  label: "Instagram",
                  href: "https://instagram.com/chhe_ng16 ",
                  icon: Instagram,
                  target: "_blank",
                },
                {
                  label: "Facebook",
                  href: "https://facebook.com/chhengcoke",
                  icon: Facebook,
                  target: "_blank",
                },
                {
                  label: "Telegram",
                  href: "https://t.me/sivchhengkheang",
                  icon: MessageCircle,
                  target: "_blank",
                },
                {
                  label: "Github",
                  href: "https://github.com/sivchheng16",
                  icon: Github,
                  target: "_blank",
                },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-4 h-4 text-primary" />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.p
            className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-500"
            whileHover={{ letterSpacing: "0.05em" }}
          >
            © 2025 SIVCHHENG KHEANG — As a member apprentice in KOOMPI company,
            Phnom Penh Cambodia
          </motion.p>
          <p className="text-xs text-muted-foreground/40">
            Crafted with passion and precision
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
