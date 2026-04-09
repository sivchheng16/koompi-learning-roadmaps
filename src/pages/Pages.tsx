import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Portfolio, User, Layout, ArrowRight, Layers, Terminal, Cpu, Zap, Globe, Compass, Square } from 'lucide-react';

const directory = [
  {
    title: 'Main Pages',
    links: [
      { name: '01 Home', path: '/', icon: Home, desc: 'Start here — an overview of the studio and what we do.' },
      { name: '02 Portfolio', path: '/portfolio', icon: Portfolio, desc: 'Browse all of our residential and commercial design projects.' },
      { name: '03 About Us', path: '/author', icon: User, desc: 'Our story, our values, and the team behind the work.' },
    ],
  },
  {
    title: 'Our Services',
    links: [
      { name: 'Architecture', path: '/#services', icon: Globe, desc: 'Floor plans, structural decisions, and space layout.' },
      { name: 'Interior Design', path: '/#services', icon: Layers, desc: 'Materials, color, lighting, and the feel of each room.' },
      { name: 'Custom Furniture', path: '/#services', icon: Compass, desc: 'Furniture designed and built to fit your specific space.' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { name: 'Send a Message', path: '/author#contact', icon: MessageCircle, desc: 'Tell us about your project and we will get back to you.' },
      { name: 'Follow Our Work', path: '/author#social', icon: Instagram, desc: 'See behind-the-scenes updates on Instagram and more.' },
    ],
  },
];

import { MessageCircle, Instagram } from 'lucide-react';

export default function Pages() {
  return (
    <div className="min-h-screen pt-24 pb-32">
      <section className="px-8 py-20 border-b border-border/20">
        <div className="max-w-7xl mx-auto">
          <p className="font-sans text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-6">Site Map</p>
          <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight uppercase leading-[0.9]">
            SIVCHHENG
            <br />
            <span className="text-muted-foreground/20">&</span> Co.
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {directory.map((section) => (
            <div key={section.title} className="space-y-12">
              <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-muted-foreground/40 uppercase pb-6 border-b border-border/10">
                {section.title}
              </p>
              <div className="space-y-12">
                {section.links.map(link => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="group flex flex-col items-start gap-4 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-8 h-8 border border-border/20 flex items-center justify-center shrink-0 text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all duration-700">
                        <link.icon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="font-serif text-2xl group-hover:text-primary transition-colors duration-500 flex-1">
                        {link.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/20 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700" />
                    </div>
                    <p className="text-sm text-muted-foreground font-serif italic leading-relaxed pl-12">
                      {link.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Accent */}
      <div className="max-w-7xl mx-auto px-8 mt-32">
        <div className="aspect-[21/9] bg-muted/10 grayscale border border-border/10 overflow-hidden relative group">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Studio Atmosphere"
            className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-1000 scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-sans text-[10px] font-bold tracking-[0.5em] text-foreground uppercase border border-foreground/20 px-8 py-4 backdrop-blur-md">Atmosphere</span>
          </div>
        </div>
      </div>
    </div>
  );
}
