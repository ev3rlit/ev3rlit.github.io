"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebarStore } from '@/features/layout/model/useSidebarStore';
import { cn } from '@/shared/lib/cn';
import { layoutTransition } from '@/shared/config/motion';
import { Post } from '@/entities/post/model/types';
import { ChevronRight } from 'lucide-react';

interface WhiteboardLayoutProps {
    sidebarContent: React.ReactNode;
    children: React.ReactNode;
    posts: Post[];
}

export function WhiteboardLayout({ sidebarContent, children, posts }: WhiteboardLayoutProps) {
    const { isSidebarOpen, toggleSidebar, isPlaygroundMode, isWhiteboardMode } = useSidebarStore();
    const isFullscreenMode = isPlaygroundMode || isWhiteboardMode;

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-slate-50 dark:bg-stone-950">
            {/* Grid Pattern Background */}
            {!isFullscreenMode && (
                <div className="absolute inset-0 z-0 bg-dot bg-dot-pattern dark:bg-dot-pattern-dark pointer-events-none opacity-80" />
            )}
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-indigo-50/20 via-transparent to-pink-50/20 dark:from-indigo-900/10 dark:to-pink-900/10 opacity-70 pointer-events-none" />

            {/* ZONE A: Floating Toolbar (FigJam Style) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={layoutTransition}
                        className={cn(
                            "fixed z-50 flex pointer-events-none",
                            // Mobile: Bottom horizontal bar
                            "bottom-6 left-0 right-0 flex-row justify-center items-end",
                            // Desktop: Left vertical bar, top-aligned (reset mobile overrides)
                            "md:bottom-auto md:right-auto md:left-6 md:top-0 md:bottom-0 md:flex-col md:justify-start md:items-start md:pt-12"
                        )}
                    >
                        <div className={cn(
                            "flex pointer-events-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                            // Desktop wrapper
                            "md:flex-col md:gap-4 md:py-8 md:overflow-y-auto md:max-h-screen",
                            // Mobile wrapper
                            "flex-row gap-4 px-4 overflow-x-auto max-w-full"
                        )}>
                            {sidebarContent}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Restore Tab (if sidebar closed) */}
            <AnimatePresence>
                {!isSidebarOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={toggleSidebar}
                        className={cn(
                            "fixed z-50 flex items-center justify-center bg-white dark:bg-stone-900 shadow-md border border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors",
                            // Mobile: Floating button bottom-left
                            "bottom-6 left-4 h-12 w-12 rounded-full",
                            // Desktop: Left tab (reset mobile overrides)
                            "md:bottom-auto md:left-0 md:top-1/2 md:h-24 md:w-6 md:-translate-y-1/2 md:rounded-none md:rounded-r-xl md:border-l-0"
                        )}
                    >
                        <ChevronRight size={16} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ZONE B: Transparent Workspace */}
            <motion.main
                layout
                transition={layoutTransition}
                className={cn(
                    "relative h-full w-full overflow-hidden",
                    !isFullscreenMode && "pt-12 pb-24 md:pb-12 md:pl-24 overflow-y-auto"
                )}
            >
                <div className={cn(
                    "h-full w-full",
                    !isFullscreenMode && "mx-auto max-w-5xl px-4 md:px-8"
                )}>
                    {children}
                </div>
            </motion.main>
        </div>
    );
}
