import React, { useState } from "react";
import type { Block, BlockQuiz } from "../types/course";
import { CodeBlock } from "./ui/CodeBlock";
import { cn } from "@/lib/utils";

interface Props {
  blocks: Block[];
}

export function ContentRenderer({ blocks }: Props) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 className="text-xl font-semibold text-foreground border-l-4 border-primary pl-4 py-0.5 mt-8">
          {block.text}
        </h2>
      ) : (
        <h3 className="text-lg font-semibold text-foreground mt-6">{block.text}</h3>
      );

    case "paragraph":
      return (
        <p className="text-base text-muted-foreground leading-relaxed">{block.text}</p>
      );

    case "code":
      return <CodeBlock language={block.language}>{block.code}</CodeBlock>;

    case "callout":
      return (
        <div
          className={cn(
            "flex gap-3 rounded-xl px-5 py-4 text-sm leading-relaxed border",
            block.variant === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-900"
              : block.variant === "tip"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-blue-50 border-blue-200 text-blue-900"
          )}
        >
          <span className="shrink-0 font-semibold uppercase tracking-wide text-xs pt-0.5">
            {block.variant === "warning" ? "⚠️ Warning" : block.variant === "tip" ? "💡 Tip" : "ℹ️ Info"}
          </span>
          <span>{block.text}</span>
        </div>
      );

    case "list":
      return block.ordered ? (
        <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground text-base">
          {(block.items ?? []).map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      ) : (
        <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground text-base">
          {(block.items ?? []).map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );

    case "quiz":
      return <QuizBlock block={block} />;

    default:
      return null;
  }
}

function QuizBlock({ block }: { block: BlockQuiz }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
      <p className="font-semibold text-foreground text-sm">🧠 Quiz</p>
      <p className="text-foreground">{block.question}</p>
      <div className="space-y-2">
        {(block.options ?? []).map((opt, i) => (
          <button
            key={i}
            onClick={() => !answered && setSelected(i)}
            className={cn(
              "w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors",
              !answered
                ? "border-border hover:border-primary/40 hover:bg-primary/5"
                : i === block.answer
                ? "border-emerald-400 bg-emerald-50 text-emerald-800 font-medium"
                : i === selected
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-border text-muted-foreground"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <p className={cn("text-sm font-medium", selected === block.answer ? "text-emerald-700" : "text-red-600")}>
          {selected === block.answer ? "Correct! ✓" : `Incorrect — the answer is: ${block.options?.[block.answer] ?? ""}`}
        </p>
      )}
    </div>
  );
}
