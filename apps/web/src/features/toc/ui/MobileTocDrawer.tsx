"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTocStore } from '../model/useTocStore';
import { cn } from '@/shared/lib/cn';
import { createPortal } from 'react-dom';
import { Card } from '@/shared/ui/Card';

export function MobileTocDrawer() {
    const { headings, activeId, isMobileOpen, setMobileOpen } = useTocStore();
    const [mounted, setMounted] = React.useState(false);
    const tocRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setMounted(true);
        // Do NOT prevent body scroll for popover style
        return () => { document.body.style.overflow = ''; }
    }, []);

    // Handle Click Outside (without blocking overlay)
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!isMobileOpen) return;

            // If click is inside the component, do nothing
            if (tocRef.current && tocRef.current.contains(event.target as Node)) {
                return;
            }

            setMobileOpen(false);
        };

        // Use 'mousedown' to be faster than click
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isMobileOpen, setMobileOpen]);

    if (!mounted) return null;
    if (headings.length === 0) return null;

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return createPortal(
        <AnimatePresence>
            {isMobileOpen && (
                <>
                    {/* Floating Popover - No Backdrop */}
                    <motion.div
                        ref={tocRef}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-4 z-[70] w-64 max-h-[50vh] flex flex-col pointer-events-auto"
                    >
                        <Card
                            className="pointer-events-auto bg-gradient-to-br from-white/95 to-white/80 dark:from-stone-900/95 dark:to-stone-900/80 backdrop-blur-xl border border-white/40 dark:border-stone-800/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col h-full overflow-hidden ring-1 ring-white/40 dark:ring-white/5 inset-ring"
                            radius="lg"
                            padding="none"
                            shadow="none"
                        >
                            <nav className="relative flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-800">
                                {/* Vertical Line */}
                                <div className="absolute left-4 top-4 bottom-4 w-px bg-stone-200 dark:bg-stone-800" />

                                <ul className="flex flex-col gap-2.5">
                                    {headings.map((heading) => {
                                        const isActive = activeId === heading.id;
                                        return (
                                            <li key={heading.id} className="relative pl-4">
                                                {/* Active Indicator Line */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="toc-indicator-mobile"
                                                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-indigo-500 dark:bg-indigo-400 rounded-full"
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                )}

                                                <a
                                                    href={`#${heading.id}`}
                                                    onClick={(e) => handleLinkClick(e, heading.id)}
                                                    className={cn(
                                                        "block text-sm transition-colors duration-200 line-clamp-2",
                                                        // Indentation based on level
                                                        heading.level === 3 ? "ml-4 text-xs" : "",
                                                        isActive
                                                            ? "text-indigo-600 dark:text-indigo-300 font-bold"
                                                            : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                                                    )}
                                                >
                                                    {heading.text}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </Card>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
