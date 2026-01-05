"use client";

import React, { useEffect, useState } from 'react';
import { useWhiteboardStore } from '@/entities/whiteboard/model/whiteboardStore';
import { parseMdxToGraph } from '../lib/parser';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { clsx } from 'clsx';

export function MdxEditor() {
    const { mdxSource, setMdxSource, setNodes, setEdges, isEditorOpen, toggleEditor, setCursorIndex } = useWhiteboardStore();
    const [localSource, setLocalSource] = useState(mdxSource);

    // Initial parsing or when mdxSource changes externally
    useEffect(() => {
        const { nodes, edges } = parseMdxToGraph(localSource);
        setNodes(nodes);
        setEdges(edges);
    }, [localSource, setNodes, setEdges]);

    // Sync local state when global store changes (e.g. from Toolbar)
    useEffect(() => {
        if (mdxSource !== localSource) {
            setLocalSource(mdxSource);
        }
    }, [mdxSource]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setLocalSource(value);
        setMdxSource(value);
    };

    const handleCursorUpdate = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        setCursorIndex(e.currentTarget.selectionStart);
    };

    return (
        <div className={clsx(
            "relative h-full transition-all duration-300 ease-in-out bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl group overflow-hidden border border-slate-200 dark:border-stone-800 shadow-2xl rounded-2xl",
            isEditorOpen ? "w-[450px]" : "w-0 border-0 pointer-events-none"
        )}>
            <div className={clsx(
                "h-full w-[450px] flex flex-col transition-opacity duration-200",
                !isEditorOpen && "opacity-0"
            )}>
                <div className="p-4 border-b border-slate-200 dark:border-stone-800 flex justify-between items-center bg-stone-50/50 dark:bg-stone-950/50">
                    <h2 className="text-xs font-bold text-slate-500 dark:text-stone-400 uppercase tracking-widest font-mono">MDX Source</h2>
                    <div className="flex gap-2">
                        <button className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-stone-800 text-stone-500 transition-colors">
                            <Maximize2 size={14} />
                        </button>
                    </div>
                </div>

                <textarea
                    className="flex-1 w-full p-6 font-mono text-sm bg-transparent outline-none resize-none text-slate-700 dark:text-stone-300 leading-relaxed placeholder:text-stone-600/30"
                    value={localSource}
                    onChange={handleChange}
                    onSelect={handleCursorUpdate}
                    onClick={handleCursorUpdate}
                    onKeyUp={handleCursorUpdate}
                    placeholder={`---
title: Untitled
date: ${new Date().toISOString().split('T')[0]}
tags: []
---

# Start writing MDX...
`}
                />
            </div>

            {/* Toggle Button - Repositioned slightly */}
            <button
                onClick={toggleEditor}
                className={clsx(
                    "absolute top-6 right-0 translate-x-1/2 z-50 w-8 h-8 rounded-full bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 shadow-md flex items-center justify-center text-slate-500 dark:text-stone-400 hover:text-blue-500 transition-all",
                    !isEditorOpen && "translate-x-12 opacity-0 pointer-events-none" // Hide toggle when closed, we'll need an external trigger or different logic if we want to re-open
                )}
            >
                {isEditorOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
        </div>
    );
}
