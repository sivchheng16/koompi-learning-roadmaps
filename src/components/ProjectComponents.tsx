import React, { useState } from "react";
import { motion } from "motion/react";
import { Maximize2, Heart, ArrowRight, Square } from "lucide-react";
import { Project } from "../constants";
import { Separator } from "@/components/ui/separator";

export function SafeImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-muted/10 ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse" />
      )}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${isLoading ? "opacity-0 scale-110" : "opacity-100 scale-100"} group-hover:grayscale-0 group-hover:scale-105`}
          referrerPolicy="no-referrer"
        />
      )}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/10">
          <Square className="w-8 h-8 text-muted-foreground/20" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground/30 mt-4">
            Visual Pending
          </span>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
}: {
  project: Project;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onViewDetails: (project: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      <div className="relative aspect-[16/11] overflow-hidden border border-border/10">
        <SafeImage
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
          <div className="w-16 h-16 border border-foreground/20 flex items-center justify-center group-hover:border-foreground/60 transition-colors duration-700">
            <Maximize2 className="w-5 h-5 text-foreground" />
          </div>
        </div>

        {/* Categories / Tags */}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-background/80 backdrop-blur-md px-4 py-1.5 font-sans text-[9px] font-bold uppercase tracking-[0.2em] border border-border/20">
            {project.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(project.id, e);
          }}
          className={`absolute top-6 right-6 w-10 h-10 border border-border/20 flex items-center justify-center transition-all duration-500 hover:border-foreground ${
            isFavorite
              ? "bg-primary border-primary text-background"
              : "bg-background/60 text-foreground/40 hover:text-foreground"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-background" : ""}`} />
        </button>
      </div>

      <div className="mt-8 flex justify-between items-start gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-serif text-muted-foreground/30 text-lg italic">
              0{index + 1}
            </span>
            <Separator className="w-12 bg-border/20" />
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
              {project.year}
            </span>
          </div>
          <h3 className="text-3xl font-serif font-medium tracking-tight mb-4 group-hover:text-primary transition-colors duration-500">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm font-serif italic line-clamp-2 max-w-sm leading-relaxed mb-8">
            {project.description}
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(project);
              }}
              className="flex items-center gap-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] transition-all group-hover:gap-6"
            >
              View Composition <ArrowRight className="w-3 h-3 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
