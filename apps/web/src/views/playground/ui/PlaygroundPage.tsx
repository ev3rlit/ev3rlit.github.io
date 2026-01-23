"use client";

import React from 'react';
import { PlaygroundCanvas } from '@/features/playground-canvas/ui/PlaygroundCanvas';
import { Button } from '@/shared/ui/Button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useSidebarStore } from '@/features/layout/model/useSidebarStore';

export default function PlaygroundPage() {
    const setPlaygroundMode = useSidebarStore(s => s.setPlaygroundMode);

    React.useEffect(() => {
        setPlaygroundMode(true);
        return () => setPlaygroundMode(false);
    }, [setPlaygroundMode]);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Back Button - Top Right as per image request */}
            <div className="absolute right-8 top-8 z-20">
                <Link href="/">
                    <Button
                        intent="outline"
                        className="flex items-center gap-2 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md shadow-sm hover:shadow-lg transition-all border-slate-200/60 dark:border-stone-800 px-5 text-slate-600 dark:text-stone-300"
                    >
                        <ChevronLeft size={16} />
                        Back to Blog
                    </Button>
                </Link>
            </div>

            {/* Header info / Badge */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
                <div className="px-5 py-2.5 bg-white/40 dark:bg-stone-900/40 backdrop-blur-md rounded-full shadow-sm border border-slate-200/30 dark:border-white/5">
                    <span className="text-xs font-bold text-slate-500 dark:text-stone-400 uppercase tracking-widest">Interactive Playground</span>
                </div>
            </div>

            {/* Main Canvas - Takes full area under floating UI */}
            <div className="h-full w-full">
                <PlaygroundCanvas />
            </div>
        </div>
    );
}
