"use client";

import React from 'react';
import { MdxEditor } from '@/features/mdx-whiteboard/ui/MdxEditor';
import { WhiteboardCanvas } from '@/features/mdx-whiteboard/ui/WhiteboardCanvas';
import { PropertyEditor } from '@/features/mdx-whiteboard/ui/PropertyEditor';
import { useSidebarStore } from '@/features/layout/model/useSidebarStore';
import { useWhiteboardStore } from '@/entities/whiteboard/model/whiteboardStore';
import { useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export function WhiteboardPage() {
    const isEditorOpen = useWhiteboardStore(state => state.isEditorOpen);
    const setWhiteboardMode = useSidebarStore(state => state.setWhiteboardMode);

    useEffect(() => {
        setWhiteboardMode(true);
        return () => setWhiteboardMode(false);
    }, [setWhiteboardMode]);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-stone-50 dark:bg-[#0a0a0a]">
            <ReactFlowProvider>
                {/* Fullscreen Canvas (Z-Index 0) */}
                <div className="absolute inset-0 z-0">
                    <WhiteboardCanvas />
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

            {/* Focus Hint */}
            {!isEditorOpen && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-stone-800 pointer-events-none animate-in fade-in slide-in-from-bottom-2">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-stone-500 uppercase tracking-widest">Focus Mode Active</span>
                </div>
            )}
        </div>
    );
}
