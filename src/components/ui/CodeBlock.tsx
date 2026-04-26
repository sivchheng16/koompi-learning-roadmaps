import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  className?: string;
  children?: React.ReactNode;
}

export const CodeBlock = ({ language = "javascript", className, children }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const code = typeof children === "string" ? children : String(children ?? "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className={cn("my-8 rounded-xl overflow-hidden group shadow-lg", className)} style={{ background: "#1e1e1e", border: "1px solid #3e3e42" }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-2.5" style={{ background: "#252526", borderBottom: "1px solid #3e3e42" }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F56" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#27C93F" }} />
          </div>
          <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: "#858585" }}>
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-[10px] uppercase tracking-widest transition-all active:scale-95 hover:bg-white/10"
          style={{ color: "#858585" }}
        >
          {copied ? (
            <>
              <Check size={12} style={{ color: "#4ec9b0" }} />
              <span style={{ color: "#4ec9b0" }}>Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <div className="relative group/code">
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            fontSize: "0.875rem",
            lineHeight: "1.7",
            background: "transparent",
            fontFamily: "var(--font-mono, JetBrains Mono, monospace)",
          }}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "#495162",
            textAlign: "right",
            userSelect: "none",
          }}
          showLineNumbers={code.split("\n").length > 3}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
