"use client";

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { cn } from '@/shared/lib/cn';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check, Terminal } from 'lucide-react';

export const CodeNode = memo(({ data, selected }: NodeProps) => {
    const codeData = data.codeData as { lang: string; value: string } | undefined;
    const code = codeData?.value || '';
    const language = codeData?.lang || 'text';
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code', err);
        }
    };

    return (
        <div className={cn(
            "rounded-xl overflow-hidden bg-[#1e1e1e] border border-stone-800 shadow-xl min-w-[300px] transition-shadow duration-200",
            selected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-stone-950 shadow-blue-500/20"
        )}>
            <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 !bg-stone-500" />
            <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-stone-500" />

            {/* Default MacOS-like Window Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-stone-800">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
                    <Terminal size={10} strokeWidth={2} />
                    <span className="uppercase">{language}</span>
                </div>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[10px] text-stone-400 hover:text-stone-100 transition-colors p-1 rounded hover:bg-stone-700"
                    title="Copy code"
                >
                    {copied ? (
                        <>
                            <Check size={12} className="text-green-400" />
                            <span className="text-green-400">Copied</span>
                        </>
                    ) : (
                        <Copy size={12} />
                    )}
                </button>
            </div>

            {/* Code Content */}
            <div className="relative group">
                <Highlight
                    theme={themes.vsDark}
                    code={code.length > 300 ? code.slice(0, 300) + '\n// ...' : code}
                    language={language as any}
                >
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                        <pre
                            className="text-xs font-mono overflow-x-auto max-w-[400px] max-h-[300px] overflow-y-auto p-4 custom-scrollbar"
                            style={{ ...style, background: 'transparent', margin: 0 }}
                        >
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })}>
                                    <span className="inline-block w-6 select-none text-stone-600 text-right mr-4 text-[10px]">{i + 1}</span>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>

            <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 !bg-stone-500" />
            <Handle type="target" position={Position.Right} id="right" className="w-2 h-2 !bg-stone-500" />
        </div>
    );
});

CodeNode.displayName = 'CodeNode';
