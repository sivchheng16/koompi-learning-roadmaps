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

export default function GamePortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>(GAMES);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

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

  const handlePlay = (game: Game) => {
    setActiveGame(game);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setActiveGame(null);
    document.body.style.overflow = "auto";
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background  text-foreground pt-32 pb-20 selection:bg-primary/30">
      {/* Background Ambience — Matching Home.tsx */}
      {/* <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] right-[15%] w-[35vw] h-[35vw] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[45vw] h-[45vw] bg-primary/5 blur-[150px] rounded-full" /> */}
      {/* Subtle grid lines */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div> */}

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-[1px] bg-primary/40" />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
              Digital Games Archive
            </span>
            <span className="w-12 h-[1px] bg-primary/40" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-serif font-light tracking-tighter text-foreground mb-8 uppercase"
          >
            THE <span className="italic text-primary">VAULT.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-muted-foreground font-serif italic text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A collection of classic browser games and digital experiments,
            playable right here in your browser.
          </motion.p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-y border-border/20 py-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-foreground font-sans text-[9px] font-bold uppercase tracking-widest">
              <Grid3X3 className="w-3 h-3" />
              <span>Card View</span>
            </div>
            <div className="flex items-center gap-3 text-foreground font-sans text-[9px] font-bold uppercase tracking-widest">
              <Archive className="w-3 h-3" />
              <span>Play in Browser</span>
            </div>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30" />
            <input
              type="text"
              placeholder="SEARCH THE ARCHIVE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border/40 py-3 pl-12 pr-6 rounded-none font-sans text-[10px] font-bold uppercase tracking-widest text-foreground focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>
        </div>

        {/* Isometric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
            className="text-center py-40"
          >
            <Cpu className="w-12 h-12 text-muted-foreground/20 mx-auto mb-6 animate-pulse" />
            <p className="text-muted-foreground font-serif italic text-xl">
              No games match that search. Try a different keyword.
            </p>
          </motion.div>
        )}
      </div>

      {/* Subtle Footer Logo */}
      <div className="container mx-auto px-6 mt-40 pt-20 border-t border-border/20 flex flex-col items-center">
        <Sparkles className="w-6 h-6 text-primary mb-8" />
        <div className="font-serif text-muted-foreground text-sm tracking-[0.5em] uppercase">
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
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col"
          >
            {/* Overlay Header */}
            <div className="h-15 border-b border-white/10 px-8 flex items-center justify-between bg-black/50 py-1">
              <div className="flex items-center gap-6">
                <Terminal className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary">
                    Active Session: {activeGame.id}
                  </div>
                  <div className="font-serif text-lg text-white">
                    {activeGame.title}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={() => handleDownload(activeGame.appImageUrl)}
                  className="flex gap-2 text-[10px] font-sans font-bold uppercase tracking-widest bg-primary text-background hover:bg-primary/90"
                >
                  <Download className="w-4 h-4" />
                  Download .appImage
                </Button>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Frame Container */}
            <div className="flex-1 relative bg-black flex items-center justify-center">
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
              </div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="w-full h-full max-w-6xl aspect-video bg-[#000] border border-white/10 rounded-lg overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.1)]"
              >
                <iframe
                  src={activeGame.iframeUrl}
                  className="w-full h-full border-none"
                  title={activeGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </div>

            {/* Overlay Footer */}
            <div className="h-10 border-t border-white/5 px-8 flex items-center justify-between bg-black/30">
              <div className="flex items-center gap-6 text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-white/40">
                <div className="flex items-center gap-2">
                  <Monitor className="w-3 h-3" />
                  <span>Best at full screen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Running in browser</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-sans font-bold uppercase tracking-widest text-white/60">
                <div className="flex items-center gap-2">
                  <Download className="w-3 h-3" />
                  <span>Download .appImage for offline play</span>
                </div>
                <span className="text-white/20">•</span>
                <span>Press ESC to exit</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
