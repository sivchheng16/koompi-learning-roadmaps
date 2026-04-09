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

  useEffect(() => {
    const handleScroll = () => {
      if (sentinelRef.current) {
        const rect = sentinelRef.current.getBoundingClientRect();
        // If the sentinel (original position) top is above the viewport top, sticky bottom
        setIsStickyBottom(rect.top < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
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
    <div className="min-h-screen pt-24 pb-20">
      {/* Page Header */}
      <section className="px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-6 flex items-center gap-3">
                <Star className="w-3 h-3 fill-primary" /> Selected Work
              </p>
              <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight uppercase leading-[0.9]">
                Projects.
              </h1>
              <p className="text-muted-foreground mt-8 max-w-lg text-lg font-serif italic leading-relaxed">
                A selection of digital projects showcasing my work in web development, mobile apps, and UI/UX design. Each project built with clean code and thoughtful design.
              </p>
            </motion.div>
            <div className="flex flex-col gap-6 text-muted-foreground shrink-0 border-l border-border/20 pl-8">
              <div className="flex items-center gap-4">
                <Layout className="w-4 h-4 text-primary" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Frontend & Backend</span>
              </div>
              <div className="flex items-center gap-4">
                <Compass className="w-4 h-4 text-primary" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Mobile & Cross-Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar Sentinel & Wrapper */}
      <div ref={sentinelRef} className="h-0" />
      <div className={cn("relative transition-all duration-2500", isStickyBottom ? "h-[105px]" : "h-auto")}>
        <section
          className={cn(
            "px-8 py-8 border-y border-border/20 z-40 transition-all duration-2500 ease-in-out",
            isStickyBottom
              ? "fixed bottom-0 left-0 w-full bg-background/10 backdrop-blur-xl border-t shadow-[0_-10px_40px_rgba(0,0,0,0.1)] translate-y-0"
              : "relative translate-y-0 bg-transparent border-none"
          )}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex flex-wrap gap-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-sans text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 ${selectedCategory === cat
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="SEARCH PROJECTS..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 h-10 bg-transparent border-none border-b border-border/40 rounded-none font-sans text-[10px] uppercase tracking-widest focus-visible:ring-0 focus-visible:border-primary transition-all pb-1"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* All Projects */}
        <section>
          <div className="flex items-center justify-between mb-16">
            <h2 className="font-serif text-2xl font-medium tracking-tight">
              {selectedCategory === 'All' ? 'All Projects' : selectedCategory}{' '}
              <span className="text-muted-foreground/40 font-serif text-sm ml-2">({filteredProjects.length})</span>
            </h2>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-32 flex flex-col items-center justify-center text-center gap-6">
              <div className="w-20 h-20 border border-border/20 flex items-center justify-center">
                <SearchX className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">No results found</h3>
                <p className="text-muted-foreground font-serif italic">
                  No projects matching <strong>"{searchQuery}"</strong>
                  {selectedCategory !== 'All' && <> in <strong>{selectedCategory}</strong></>} were found.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-none font-sans text-[10px] font-bold tracking-widest uppercase h-12 px-8 mt-4"
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isFavorite={favorites.includes(project.id)}
                  onToggleFavorite={toggleFavorite}
                  onViewDetails={setViewingProject}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
