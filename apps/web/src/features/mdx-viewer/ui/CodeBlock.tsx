"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { cn } from "@/shared/lib/cn";
import { Check, Copy } from "lucide-react";
import { MacWindow } from "@/shared/ui/MacWindow";

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

    // Copy Button Component
    const CopyButton = (
        <button
            onClick={handleCopy}
            className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all",
                copied
                    ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800"
            )}
            title="Copy code"
        >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
    );

    return (
        <MacWindow
            title={displayLanguage}
            headerRight={CopyButton}
            containerClassName="my-6 shadow-sm"
        >
            <Highlight
                theme={resolvedTheme === "dark" ? themes.dracula : themes.github}
                code={code}
                language={language}
            >
                {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={cn(
                            highlightClassName,
                            "overflow-x-auto text-sm leading-relaxed",
                            "p-4 m-0 bg-transparent!"
                        )}
                        style={{
                            ...style,
                            backgroundColor: 'transparent', // Let parent container handle bg
                        }}
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
        </MacWindow>
    );
}
