"use client";

import { Highlight, themes, type PrismTheme } from "prism-react-renderer";
import { cn } from "@/shared/lib/cn";

interface CodeBlockProps {
    children: string;
    className?: string;
}

const languageAliases: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    sh: "bash",
    shell: "bash",
    zsh: "bash",
    yml: "yaml",
    conf: "ini",
    config: "ini",
    terminal: "bash",
    plaintext: "text",
};

const languageLabels: Record<string, string> = {
    typescript: "TypeScript",
    javascript: "JavaScript",
    tsx: "TSX",
    jsx: "JSX",
    go: "Go",
    python: "Python",
    rust: "Rust",
    json: "JSON",
    yaml: "YAML",
    bash: "Terminal",
    css: "CSS",
    html: "HTML",
    sql: "SQL",
    mermaid: "Mermaid",
    ini: "Config",
    text: "Plain Text",
};

const darkCodeTheme: PrismTheme = {
    ...themes.nightOwl,
    plain: {
        color: "#d6deeb",
        backgroundColor: "#111827",
    },
    styles: [
        ...(themes.nightOwl.styles ?? []),
        { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#6b7280", fontStyle: "italic" } },
        { types: ["punctuation", "operator"], style: { color: "#9ca3af" } },
        { types: ["keyword", "atrule", "boolean"], style: { color: "#c084fc" } },
        { types: ["string", "char", "inserted"], style: { color: "#86efac" } },
        { types: ["number", "constant"], style: { color: "#fca5a5" } },
        { types: ["function", "method"], style: { color: "#fde68a" } },
        { types: ["property", "parameter", "variable"], style: { color: "#93c5fd" } },
        { types: ["tag", "selector", "important"], style: { color: "#f9a8d4" } },
    ],
};

export function CodeBlock({ children, className }: CodeBlockProps) {
    // Extract language from className (e.g., "language-typescript" -> "typescript")
    const rawLanguage = className?.replace(/language-/, "").toLowerCase() || "text";
    const language = languageAliases[rawLanguage] || rawLanguage;

    // Preserve intentional indentation while dropping a single trailing newline from fenced blocks.
    const code = children?.replace(/\n$/, "") || "";

    const displayLanguage = languageLabels[language] || language.toUpperCase();

    return (
        <div className="my-8 overflow-hidden rounded-[10px] bg-stone-950 px-7 py-6">
            <span className="mb-3.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-stone-400">
                {displayLanguage}
            </span>
            <Highlight
                theme={darkCodeTheme}
                code={code}
                language={language}
            >
                {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={cn(
                            highlightClassName,
                            "m-0 overflow-x-auto p-0 text-[13px] leading-[1.8]"
                        )}
                        style={{
                            ...style,
                            backgroundColor: "transparent",
                        }}
                    >
                        <code>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })}>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </div>
                            ))}
                        </code>
                    </pre>
                )}
            </Highlight>
        </div>
    );
}
