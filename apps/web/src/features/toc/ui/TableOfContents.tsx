"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/lib/cn';
import { useTocStore } from '../model/useTocStore';
import { Card } from '@/shared/ui/Card';

export function TableOfContents() {
    const { headings, activeId } = useTocStore();

    if (headings.length === 0) return null;

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <aside className="transition-all duration-300">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Card
                    className="bg-gradient-to-br from-white/95 to-white/80 dark:from-stone-900/95 dark:to-stone-900/80 backdrop-blur-xl border border-white/40 dark:border-stone-800/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-6 ring-1 ring-white/40 dark:ring-white/5 inset-ring"
                    radius="lg"
                    shadow="none"
                >
                    <nav className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-0 top-2 bottom-2 w-px bg-stone-200 dark:bg-stone-800" />

                        <ul className="flex flex-col gap-2.5">
                            {headings.map((heading) => {
                                const isActive = activeId === heading.id;
                                return (
                                    <li key={heading.id} className="relative pl-4">
                                        {/* Active Indicator Line */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="toc-indicator"
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
        </aside>
    );
}
