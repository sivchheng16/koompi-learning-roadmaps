import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GAMES, Game } from "../constants";
import { AntigravityCard } from "../components/AntigravityCard";
import {
  Search,
  Grid3X3,
  Archive,
  Cpu,
  Sparkles,
  X,
  Terminal,
  Monitor,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRequireAuth } from "../hooks/useRequireAuth";

export default function GamePortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>(GAMES);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const { requireAuth } = useRequireAuth();

  useEffect(() => {
    setFilteredGames(
      GAMES.filter(
        (game) =>
          game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.category.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeGame) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGame]);

  const handlePlay = requireAuth((game: Game) => {
    setActiveGame(game);
    document.body.style.overflow = "hidden";
  });

  const handleClose = () => {
    setActiveGame(null);
    document.body.style.overflow = "auto";
  };

  const handleDownload = requireAuth((url: string) => {
    window.open(url, "_blank");
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-12 md:pb-20 relative overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] right-[10%] w-[50vw] h-[50vw] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[0%] left-[0%] w-[40vw] h-[40vw] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="w-12 h-[1px] bg-primary/40" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
              Games Archive
            </span>
            <span className="w-12 h-[1px] bg-primary/40" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-sans font-medium tracking-tighter text-foreground mb-8 md:mb-12 uppercase text-gradient"
          >
            THE <span className="italic font-bold">VAULT.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground font-sans italic max-w-2xl mx-auto leading-relaxed border-l-2 border-primary/20 pl-6 md:pl-8 inline-block text-left"
          >
            "A collection of games I've created. There are games that give you extra skills and computer thinking as well as give you a fun game to play."
          </motion.p>
        </div>

        {/* Controls - Premium Glass Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="glass-panel p-6 md:p-8 rounded-[32px] mb-12 md:mb-20 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8"
        >
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 text-primary font-mono text-[10px] font-bold uppercase tracking-widest">
              <Grid3X3 className="w-4 h-4" />
              <span>Grid Mode</span>
            </div>
            <div className="flex items-center gap-3 text-foreground/40 font-mono text-[10px] font-bold uppercase tracking-widest hover:text-foreground transition-colors cursor-pointer">
              <Archive className="w-4 h-4" />
              <span>Full Archive</span>
            </div>
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            <input
              type="text"
              placeholder="Search Games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-panel bg-white/5 border-white/5 py-4 pl-14 pr-8 rounded-2xl font-mono text-[10px] font-bold uppercase tracking-widest text-foreground focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Isometric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, idx) => (
              <AntigravityCard
                key={game.id}
                game={game}
                index={idx}
                onPlay={handlePlay}
                onDownload={handleDownload}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 glass-panel rounded-[40px]"
          >
            <Cpu size={64} className="text-primary/20 mx-auto mb-8 animate-pulse" />
            <p className="text-muted-foreground font-sans italic text-2xl">
              Terminal error: No systems found matching your query.
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="container mx-auto px-6 mt-20 md:mt-48 pt-20 border-t border-white/5 flex flex-col items-center">
        <Sparkles className="w-6 h-6 text-primary mb-8 animate-pulse" />
        <div className="font-mono text-primary text-[10px] font-bold tracking-[1em] uppercase opacity-40">
          SIVCHHENG KHEANG
        </div>
      </div>

      {/* Game Overlay */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-[60px] flex flex-col"
          >
            {/* Overlay Header */}
            <div className="h-20 glass-panel border-b border-white/5 px-10 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 glass-panel rounded-xl flex items-center justify-center text-primary">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-primary mb-1">
                    System Active // {activeGame.id}
                  </div>
                  <div className="font-sans text-2xl text-white font-medium">
                    {activeGame.title}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Button
                  onClick={() => handleDownload(activeGame.appImageUrl)}
                  className="h-12 px-8 rounded-full bg-primary text-background font-mono text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                  <Download className="w-4 h-4 mr-3" />
                  Download AppImage
                </Button>
                <button
                  onClick={handleClose}
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Frame Container */}
            <div className="flex-1 relative flex items-center justify-center">
              {/* Internal Refraction Glows */}
              <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[150px] pointer-events-none" />

              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                className="w-full h-full max-w-6xl glass-panel p-2 rounded-[40px] overflow-hidden shadow-[0_64px_128px_-16px_rgba(0,0,0,0.8)] relative"
              >
                <iframe
                  src={activeGame.iframeUrl}
                  className="w-full h-full border-none rounded-[32px]"
                  title={activeGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </div>

            {/* Overlay Footer */}
            <div className="h-16 glass-panel border-t border-white/5 px-10 flex items-center justify-between">
              <div className="flex items-center gap-8 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">
                <div className="flex items-center gap-3">
                  <Monitor className="w-4 h-4" />
                  <span>Optimal Resolution Mode</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-secondary">Uptime Verified</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[10px] font-mono font-bold uppercase tracking-widest text-white/60 italic font-sans">
                <span>Press ESC to terminate session</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
