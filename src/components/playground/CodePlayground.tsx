import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Play, Maximize2, Minimize2 } from "lucide-react";

export interface ChallengeResult {
  passed: boolean;
  message: string;
}

export interface ChallengeSpec {
  prompt: string;
  check: (html: string, css: string, js: string) => ChallengeResult;
}

export interface CodePlaygroundProps {
  mode?: "html" | "css" | "js" | "web" | "react";
  starter?: { html?: string; css?: string; js?: string };
  height?: string;
  challenge?: ChallengeSpec;
  onChallengePassed?: () => void;
  className?: string;
}

type ActiveTab = "html" | "css" | "js" | "preview";

const LIGHT_THEME = EditorView.theme({
  "&": {
    fontSize: "13px",
    fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
    backgroundColor: "#fafaf9",
    borderRadius: "0",
    height: "100%",
  },
  ".cm-content": { padding: "12px 0", caretColor: "#c2622d" },
  ".cm-gutters": { backgroundColor: "#f5f5f4", border: "none", color: "#a8a29e" },
  ".cm-activeLineGutter": { backgroundColor: "#ede9e0" },
  ".cm-activeLine": { backgroundColor: "#ede9e040" },
  ".cm-selectionBackground, ::selection": { backgroundColor: "#c2622d22 !important" },
  ".cm-focused .cm-selectionBackground": { backgroundColor: "#c2622d22 !important" },
  ".cm-cursor": { borderLeftColor: "#c2622d" },
  ".cm-scroller": { overflow: "auto" },
});

function buildPreviewDoc(htmlContent: string, cssContent: string, jsContent: string, mode?: string): string {
  if (mode === "react") {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: system-ui, sans-serif; padding: 16px; margin: 0; }
  ${cssContent}
</style>
</head>
<body>
<div id="root"></div>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
try {
  ${jsContent}
  // Auto-mount if App component is defined
  if (typeof App !== 'undefined') {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(App));
  }
} catch(e) {
  document.getElementById('root').innerHTML = '<pre style="color:red;font-size:12px">' + e.message + '</pre>';
}
</script>
</body>
</html>`;
  }
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: system-ui, sans-serif; padding: 16px; margin: 0; }
  ${cssContent}
</style>
</head>
<body>
${htmlContent}
<script>
try { ${jsContent} } catch(e) { console.error(e); }
</script>
</body>
</html>`;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function CodeEditor({
  value,
  onChange,
  language,
  height,
}: {
  value: string;
  onChange: (v: string) => void;
  language: "html" | "css" | "js";
  height: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const langExtension = language === "html" ? html() : language === "css" ? css() : javascript();

  useEffect(() => {
    if (!containerRef.current) return;
    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          langExtension,
          LIGHT_THEME,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) onChange(update.state.doc.toString());
          }),
          EditorView.lineWrapping,
        ],
      }),
      parent: containerRef.current,
    });
    viewRef.current = view;
    return () => view.destroy();
  }, []);

  // Sync external value changes without losing cursor position
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({ changes: { from: 0, to: current.length, insert: value } });
    }
  }, [value]);

  return <div ref={containerRef} style={{ height }} className="overflow-auto" />;
}

export function CodePlayground({
  mode = "html",
  starter = {},
  height = "360px",
  challenge,
  onChallengePassed,
  className,
}: CodePlaygroundProps) {
  const isMultiFile = mode === "web";
  const isReact = mode === "react";
  const [htmlCode, setHtmlCode] = useState(starter.html ?? "");
  const [cssCode, setCssCode] = useState(starter.css ?? "");
  const [jsCode, setJsCode] = useState(starter.js ?? "");
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    mode === "html" ? "html" : mode === "css" ? "css" : (mode === "js" || mode === "react") ? "js" : "html"
  );
  const [showPreview, setShowPreview] = useState(true);
  const [challengeResult, setChallengeResult] = useState<ChallengeResult | null>(null);
  const [expanded, setExpanded] = useState(false);

  const debouncedHtml = useDebounce(htmlCode, 300);
  const debouncedCss = useDebounce(cssCode, 300);
  const debouncedJs = useDebounce(jsCode, 300);

  const previewDoc = buildPreviewDoc(debouncedHtml, debouncedCss, debouncedJs, mode);

  const runChallenge = useCallback(() => {
    if (!challenge) return;
    const result = challenge.check(htmlCode, cssCode, jsCode);
    setChallengeResult(result);
    if (result.passed) onChallengePassed?.();
  }, [challenge, htmlCode, cssCode, jsCode, onChallengePassed]);

  // Auto-run challenge check on code change
  useEffect(() => {
    if (!challenge) return;
    const id = setTimeout(() => runChallenge(), 600);
    return () => clearTimeout(id);
  }, [debouncedHtml, debouncedCss, debouncedJs]);

  const editorHeight = expanded ? "60vh" : height;

  const tabs: { id: ActiveTab; label: string }[] = isMultiFile
    ? [
        { id: "html", label: "HTML" },
        { id: "css", label: "CSS" },
        { id: "js", label: "JS" },
        { id: "preview", label: "Preview" },
      ]
    : isReact
    ? [
        { id: "js", label: "JSX" },
        { id: "preview", label: "Preview" },
      ]
    : [
        { id: mode as ActiveTab, label: mode.toUpperCase() },
        { id: "preview", label: "Preview" },
      ];

  return (
    <div className={cn("rounded-2xl border border-border overflow-hidden bg-white", expanded && "fixed inset-4 z-50 shadow-2xl", className)}>
      {/* Challenge prompt */}
      {challenge && (
        <div className="px-5 py-3 border-b border-border bg-amber-50/60 flex items-start gap-3">
          <span className="text-xs font-sans font-semibold text-amber-700 shrink-0 mt-0.5">Challenge</span>
          <p className="text-sm font-sans text-amber-900 leading-relaxed flex-1">{challenge.prompt}</p>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center border-b border-border bg-stone-50">
        {/* Tabs */}
        <div className="flex items-center flex-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2.5 text-xs font-mono font-medium transition-colors shrink-0",
                activeTab === tab.id
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 px-2 shrink-0">
          {!challenge && (
            <button
              onClick={() => setShowPreview((p) => !p)}
              className="px-3 py-1.5 text-xs font-sans rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
            >
              <Play size={12} />
              {showPreview ? "Hide" : "Preview"}
            </button>
          )}
          <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Editor / Preview area */}
      <div className={cn("flex", expanded ? "h-[calc(100%-7rem)]" : "")} style={{ height: expanded ? undefined : editorHeight }}>
        {/* Editor panel */}
        {activeTab !== "preview" && (
          <div className={cn("flex-1 overflow-hidden border-r border-border", !challenge && !showPreview && "border-r-0")}>
            {(activeTab === "html" || mode === "html") && activeTab === "html" && (
              <CodeEditor value={htmlCode} onChange={setHtmlCode} language="html" height="100%" />
            )}
            {activeTab === "css" && (
              <CodeEditor value={cssCode} onChange={setCssCode} language="css" height="100%" />
            )}
            {activeTab === "js" && (
              <CodeEditor value={jsCode} onChange={setJsCode} language="js" height="100%" />
            )}
          </div>
        )}

        {/* Preview panel — always shown in challenge mode, toggle in exploration */}
        {(challenge || showPreview || activeTab === "preview") && (
          <div className={cn("flex-1 overflow-hidden bg-white", activeTab === "preview" && "w-full")}>
            <iframe
              key={previewDoc.length > 0 ? "loaded" : "empty"}
              srcDoc={previewDoc}
              sandbox="allow-scripts"
              className="w-full h-full border-0"
              title="Preview"
            />
          </div>
        )}
      </div>

      {/* Challenge result bar */}
      {challenge && challengeResult && (
        <div
          className={cn(
            "px-5 py-3 flex items-center gap-3 text-sm font-sans border-t border-border",
            challengeResult.passed
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          )}
        >
          {challengeResult.passed ? (
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
          ) : (
            <XCircle size={16} className="text-red-500 shrink-0" />
          )}
          <span>{challengeResult.message}</span>
        </div>
      )}
    </div>
  );
}
