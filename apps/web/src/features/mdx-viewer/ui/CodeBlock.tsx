"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { cn } from "@/shared/lib/cn";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    children: string;
    className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
    const { resolvedTheme } = useTheme();
    const [copied, setCopied] = useState(false);

    // Extract language from className (e.g., "language-typescript" -> "typescript")
    const language = className?.replace(/language-/, "") || "text";

    // Remove trailing newline if present
    const code = children?.trim() || "";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Language display name mapping
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
        bash: "Bash",
        shell: "Shell",
        css: "CSS",
        html: "HTML",
        sql: "SQL",
        text: "Plain Text",
    };

    const displayLanguage = languageLabels[language] || language.toUpperCase();

    return (
        <div className="my-6 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm">
            {/* Header with language label and copy button */}
            <div className="flex items-center justify-between px-4 py-2 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                    {displayLanguage}
                </span>
                <button
                    onClick={handleCopy}
                    className={cn(
                        "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all",
                        copied
                            ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950"
                            : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800"
                    )}
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                        </>
                    )}
                </button>
            </div>

            {/* Code content */}
            <Highlight
                theme={resolvedTheme === "dark" ? themes.oneDark : themes.oneLight}
                code={code}
                language={language}
            >
                {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={cn(
                            highlightClassName,
                            "overflow-x-auto text-sm leading-relaxed",
                            "p-4 m-0"
                        )}
                        style={style}
                    >
                        <code>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })}>
                                    <span className="inline-block w-8 text-right mr-4 text-stone-400 dark:text-stone-600 select-none text-xs">
                                        {i + 1}
                                    </span>
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
