"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSidebarStore } from "@/features/layout/model/useSidebarStore";

interface StoryDetailLayoutProps {
    children: React.ReactNode;
    projectId: string;
    storyNumber: string;
}

export const StoryDetailLayout = ({ children, projectId, storyNumber }: StoryDetailLayoutProps) => {
    const { setPortfolioMode, setSidebarOpen } = useSidebarStore();

    useEffect(() => {
        setPortfolioMode(true);
        setSidebarOpen(false);

        return () => {
            setPortfolioMode(false);
            setSidebarOpen(true);
        };
    }, [setPortfolioMode, setSidebarOpen]);

    return (
        <div className="h-[100dvh] w-full bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30 flex flex-col overflow-hidden">
            {/* Header / Nav */}
            <header className="flex-none bg-white/80 dark:bg-stone-950/80 backdrop-blur-md z-50 border-b border-stone-200 dark:border-stone-800">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href="/portfolio/swissminimal"
                        className="group flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-indigo-600 dark:text-stone-400 dark:hover:text-indigo-400 transition-colors"
                    >
                        <span className="transform transition-transform group-hover:-translate-x-1">←</span>
                        Back to Portfolio
                    </Link>
                    <div className="text-xs font-mono text-stone-400">
                        {projectId.toUpperCase()} / {storyNumber}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pt-16 pb-24 px-6 no-scrollbar">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};
