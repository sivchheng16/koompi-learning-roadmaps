import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "lead" | "muted" | "code";
  className?: string;
  children?: React.ReactNode;
}

export const Typography = ({ variant = "p", className, children }: TypographyProps) => {
  const base = "mb-6 leading-[1.8] text-pretty";

  const styles: Record<NonNullable<TypographyProps["variant"]>, string> = {
    h1:    "text-3xl font-bold tracking-tight text-foreground mb-4",
    h2:    "text-3xl md:text-4xl font-semibold tracking-tight text-foreground mt-16 mb-6 border-l-4 border-primary pl-6 py-1",
    h3:    "text-2xl md:text-3xl font-semibold text-foreground/90 mt-10 mb-4",
    h4:    "text-xl font-semibold text-foreground/80 mt-8 mb-3",
    h5:    "text-lg font-semibold text-foreground/70 mt-6 mb-2",
    h6:    "text-sm font-bold text-primary/60 mt-6 mb-2 uppercase tracking-[0.2em]",
    p:     "text-lg text-muted-foreground/90 font-light",
    lead:  "text-2xl text-muted-foreground font-light leading-relaxed mb-8",
    muted: "text-sm text-muted-foreground/50 italic",
    code:  "font-mono text-[0.9em] bg-white/5 text-primary/80 px-2 py-0.5 rounded-md border border-white/5",
  };

  const cls = cn(base, styles[variant], className);

  if (variant === "h1") return <h1 className={cls}>{children}</h1>;
  if (variant === "h2") return <h2 className={cls}>{children}</h2>;
  if (variant === "h3") return <h3 className={cls}>{children}</h3>;
  if (variant === "h4") return <h4 className={cls}>{children}</h4>;
  if (variant === "h5") return <h5 className={cls}>{children}</h5>;
  if (variant === "h6") return <h6 className={cls}>{children}</h6>;
  return <p className={cls}>{children}</p>;
};
