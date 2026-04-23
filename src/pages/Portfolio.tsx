import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, SearchX, Compass, Layout, Home as HomeIcon, Star } from 'lucide-react';
import { PROJECTS, Project } from '../constants';
import { ProjectCard } from '../components/ProjectComponents';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';

const CATEGORIES = ['All', 'Web Development', 'Mobile', 'UI/UX Design'];

export default function Portfolio({
  favorites,
  toggleFavorite,
  setViewingProject,
}: {
  favorites: string[];
  recentlyPlayed: string[];
  toggleFavorite: (id: string, e: React.MouseEvent) => void;
  setViewingProject: (project: Project) => void;
  handleDownload: (project: Project) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isStickyBottom, setIsStickyBottom] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { requireAuth } = useRequireAuth();
  
  const protectedToggleFavorite = requireAuth(toggleFavorite);

  useEffect(() => {
    const handleScroll = () => {
      if (sentinelRef.current) {
        const rect = sentinelRef.current.getBoundingClientRect();
        setIsStickyBottom(rect.top < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 relative overflow-hidden mb-48">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      {/* Page Header */}
      <section className="px-8 mb-40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <Star className="w-4 h-4 text-primary animate-pulse" />
                <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
                  System Features
                </p>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-sans font-medium tracking-tighter uppercase leading-[0.85] text-gradient mb-12">
                Features. <br />
                <span className="opacity-50 italic font-light lowercase font-sans text-4xl sm:text-5xl md:text-8xl">os & apps.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-sans leading-relaxed max-w-lg italic opacity-80 border-l-2 border-primary/20 pl-8">
                "A curated archive of KOOMPI OS official applications and core system features developed for our users."
              </p>
            </motion.div>

            <div className="flex flex-col gap-8 text-muted-foreground shrink-0 glass-panel p-10 rounded-3xl">
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 glass-panel rounded-xl flex items-center justify-center text-primary">
                  <Layout size={18} />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Full-Stack Modules</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 glass-panel rounded-xl flex items-center justify-center text-secondary">
                  <Compass size={18} />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Native Frameworks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar Sentinel & Wrapper */}
      <div ref={sentinelRef} className="h-0" />
      <div className={cn("relative transition-all duration-1000", isStickyBottom ? "h-[100px]" : "h-auto")}>
        <section
          className={cn(
            "px-6 md:px-8 py-6 md:py-8 z-40 transition-all duration-700 ease-in-out",
            isStickyBottom
              ? "fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[94%] md:w-[90%] max-w-6xl glass-panel rounded-3xl md:rounded-[32px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] translate-y-0"
              : "relative translate-y-0 bg-transparent"
          )}
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 glass-panel p-1.5 rounded-full w-full lg:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-4 md:px-6 py-2 md:py-2.5 rounded-full transition-all duration-300 flex-1 sm:flex-none ${selectedCategory === cat
                    ? 'bg-primary text-background shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <Input
                placeholder="SEARCH ARCHIVE..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-14 h-12 glass-panel bg-white/5 border-none rounded-2xl font-mono text-[10px] font-bold tracking-widest uppercase focus-visible:ring-1 focus-visible:ring-primary/50 transition-all"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20 relative z-10">
        {/* All Projects */}
        <section>
          <div className="flex items-center justify-between mb-24">
            <div className="flex items-center gap-6">
              <h2 className="font-sans text-3xl font-medium tracking-tight">
                {selectedCategory === 'All' ? 'Full Archive' : selectedCategory}
              </h2>
              <span className="glass-panel px-4 py-1.5 rounded-full text-primary font-mono text-[10px] font-bold">
                {filteredProjects.length} NO.
              </span>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 flex flex-col items-center justify-center text-center glass-panel rounded-[40px]"
            >
              <SearchX size={64} className="text-primary/20 mb-8" />
              <h3 className="font-sans text-3xl mb-4">No systems found</h3>
              <p className="text-muted-foreground font-sans italic text-lg opacity-60">
                The query <strong className="text-primary">"{searchQuery}"</strong> returned zero results.
              </p>
              <Button
                variant="outline"
                className="mt-12 h-14 px-10 rounded-full glass-panel font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-background transition-all"
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              >
                Reset Archive Query
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-32">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isFavorite={favorites.includes(project.id)}
                  onToggleFavorite={protectedToggleFavorite}
                  onViewDetails={setViewingProject}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Page End Branding */}
      {/* <div className="container mx-auto px-6 mt-48 pt-20 border-t border-white/5 flex flex-col items-center">
        <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center text-primary mb-8">
           <Layout size={20} />
        </div>
        <div className="font-mono text-primary text-[10px] font-bold tracking-[1em] uppercase opacity-40">
          SIVCHHENG KHEANG // 2026
        </div> 
      </div> */}
    </div>
  );
}
