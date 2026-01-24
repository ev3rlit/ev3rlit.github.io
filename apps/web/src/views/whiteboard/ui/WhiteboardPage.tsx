"use client";

import React from 'react';
import { MdxEditor, WhiteboardCanvas, PropertyEditor, useWhiteboardStore } from '@repo/whiteboard-ui';
import { useSidebarStore } from '@/features/layout/model/useSidebarStore';
import { useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { SqlPlayground } from '@/features/sql-playground/ui/SqlPlayground';
import { CodeComparison } from '@/features/mdx-viewer/ui/CodeComparison';
import { StatCard } from '@/features/mdx-viewer/ui/StatCard';
import { useSync } from '@/features/sync/model/useSync';

export function WhiteboardPage() {
    const isEditorOpen = useWhiteboardStore(state => state.isEditorOpen);
    const mdxSource = useWhiteboardStore(state => state.mdxSource);
    const setMdxSource = useWhiteboardStore(state => state.setMdxSource);
    const setWhiteboardMode = useSidebarStore(state => state.setWhiteboardMode);

    // Initialize useSync with onChange callback to update store
    const { save, load, status, error, lastSaved } = useSync(
        mdxSource,
        (content) => setMdxSource(content)
    );

    // Load default document on mount
    useEffect(() => {
        load('demo-doc');
    }, [load]);

    // Sync mdxSource changes to save
    useEffect(() => {
        if (mdxSource) {
            save(mdxSource);
        }
    }, [mdxSource, save]);

    useEffect(() => {
        setWhiteboardMode(true);
        return () => setWhiteboardMode(false);
    }, [setWhiteboardMode]);

    const components = {
        SqlPlayground,
        CodeComparison,
        StatCard,
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-stone-50 dark:bg-[#0a0a0a]">
            <ReactFlowProvider>
                {/* Fullscreen Canvas (Z-Index 0) */}
                <div className="absolute inset-0 z-0">
                    <WhiteboardCanvas components={components} />
                </div>
            </ReactFlowProvider>

            {/* Floating Editor (Left, Z-Index 40) - Fixed Position */}
            <div className="absolute left-[100px] top-4 bottom-4 z-40 pointer-events-none flex flex-col justify-center transition-all duration-300">
                <div className="h-full pointer-events-auto">
                    <MdxEditor />
                </div>
            </div>

            {/* Editor Toggle Trigger (Visible when closed) */}
            {!isEditorOpen && (
                <>
                    {/* Desktop: 왼쪽 사이드 버튼 */}
                    <div className="hidden md:block absolute left-[100px] top-6 z-40">
                        <button
                            onClick={() => useWhiteboardStore.getState().toggleEditor()}
                            className="w-10 h-10 rounded-full bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 shadow-lg flex items-center justify-center text-slate-500 dark:text-stone-400 hover:text-indigo-500 transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                    {/* Mobile: 하단 중앙 버튼 */}
                    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
                        <button
                            onClick={() => useWhiteboardStore.getState().toggleEditor()}
                            className="w-12 h-12 rounded-full bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 shadow-lg flex items-center justify-center text-slate-500 dark:text-stone-400 hover:text-indigo-500 transition-all"
                        >
                            <ChevronUp size={20} />
                        </button>
                    </div>
                </>
            )}

            {/* Property Editor Overlay (Right, Z-Index 10) */}
            <PropertyEditor />

            {/* Save Status Indicator */}
            <div className="absolute top-4 right-4 z-30 px-3 py-2 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-stone-800 pointer-events-none">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        status === 'saving' && 'bg-yellow-500 animate-pulse',
                        status === 'success' && 'bg-green-500',
                        status === 'error' && 'bg-red-500',
                        (status === 'idle' || status === 'loading') && 'bg-slate-300 dark:bg-stone-600'
                    )} />
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-stone-400 uppercase tracking-widest">
                        {status === 'saving' && 'Saving...'}
                        {status === 'success' && 'Saved'}
                        {status === 'error' && 'Error'}
                        {(status === 'idle' || status === 'loading') && 'Ready'}
                    </span>
                </div>
            </div>

            {/* Focus Hint */}
            {!isEditorOpen && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-stone-800 pointer-events-none animate-in fade-in slide-in-from-bottom-2">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-stone-500 uppercase tracking-widest">Focus Mode Active</span>
                </div>
            )}
        </div>
    );
}
