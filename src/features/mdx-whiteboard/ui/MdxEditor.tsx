"use client";

import React, { useEffect } from 'react';
import { useWhiteboardStore } from '@/entities/whiteboard/model/whiteboardStore';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { clsx } from 'clsx';
import { parseMdxToGraph } from '../lib/parser';
import { MonacoEditor } from './MonacoEditor';

export function MdxEditor() {
    const { mdxSource, setMdxSource, isEditorOpen, toggleEditor, setNodes, setEdges } = useWhiteboardStore();

    // Parse MDX to graph when mdxSource changes
    useEffect(() => {
        const result = parseMdxToGraph(mdxSource);
        if (result) {
            setNodes(result.nodes);
            setEdges(result.edges);
        }
    }, [mdxSource, setNodes, setEdges]);

    return (
        <div className={clsx(
            "relative h-full transition-all duration-300 ease-in-out bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl group overflow-hidden border border-slate-200 dark:border-stone-800 shadow-2xl rounded-2xl flex flex-col",
            isEditorOpen ? "w-[500px]" : "w-0 border-0 pointer-events-none"
        )}>
            {/* Header */}
            <div className={clsx(
                "flex-none p-4 border-b border-slate-200 dark:border-stone-800 flex justify-between items-center bg-stone-50/50 dark:bg-stone-950/50 transition-opacity duration-200",
                !isEditorOpen && "opacity-0"
            )}>
                <h2 className="text-xs font-bold text-slate-500 dark:text-stone-400 uppercase tracking-widest font-mono">MDX Editor</h2>
                <div className="flex gap-2">
                    <button className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-stone-800 text-stone-500 transition-colors">
                        <Maximize2 size={14} />
                    </button>
                </div>
            </div>

            {/* Editor Content */}
            <div className={clsx(
                "flex-1 overflow-hidden",
                !isEditorOpen && "opacity-0"
            )}>
                <MonacoEditor
                    value={mdxSource}
                    onChange={setMdxSource}
                    className="h-full"
                />
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleEditor}
                className={clsx(
                    "absolute top-6 right-0 translate-x-1/2 z-50 w-8 h-8 rounded-full bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 shadow-md flex items-center justify-center text-slate-500 dark:text-stone-400 hover:text-blue-500 transition-all",
                    !isEditorOpen && "translate-x-12 opacity-0 pointer-events-none"
                )}
            >
                {isEditorOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
        </div >
    );
}
