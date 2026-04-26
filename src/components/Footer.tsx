import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-sans">
        <span>© {new Date().getFullYear()} KOOMPI Academy</span>
        <span>Built for the next generation of builders.</span>
      </div>
    </footer>
  );
}
