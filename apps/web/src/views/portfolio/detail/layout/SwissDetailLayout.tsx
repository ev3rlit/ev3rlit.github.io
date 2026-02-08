'use client';

import { useEffect } from 'react';
import { useSidebarStore } from '@/features/layout/model/useSidebarStore';
import { SwissNavigation } from '@/widgets/portfolio/swissminimal';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SwissDetailLayoutProps {
    title: string;
    subtitle?: string;
    category: string;
    date: string;
    tags?: string[];
    children: React.ReactNode;
    isEmbedded?: boolean;
    onBack?: () => void;
}

export const SwissDetailLayout = ({
    title,
    subtitle,
    category,
    date,
    tags,
    children,
    isEmbedded = false,
    onBack
}: SwissDetailLayoutProps) => {
    const { setSidebarOpen } = useSidebarStore();

    useEffect(() => {
        // Only modify sidebar if it's the full page view
        if (!isEmbedded) {
            setSidebarOpen(false);
        }

        return () => {
            if (!isEmbedded) {
                setSidebarOpen(true);
            }
        };
    }, [setSidebarOpen, isEmbedded]);

    return (
        <div className={isEmbedded ? "w-full h-full" : "fixed inset-0 z-[100] w-full h-full bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-indigo-500 selection:text-white overflow-y-auto overflow-x-hidden"}>
            <SwissNavigation />

            {/* Progress/Scroll Indicator could go here */}

            <main className="w-full pt-32 pb-32 max-w-7xl mx-auto px-6 md:px-12">
                <div className="swiss-grid">
                    {/* HEADER SECTION */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-12 mb-24 border-b border-stone-200 dark:border-stone-800 pb-16"
                    >
                        {/* Meta Top */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex gap-4 items-center">
                                <span className="label-text accent-indigo">{category}</span>
                                <span className="w-px h-3 bg-stone-300 dark:bg-stone-700"></span>
                                <span className="label-text text-stone-500">{date}</span>
                            </div>

                            {tags && (
                                <div className="flex gap-2">
                                    {tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-900 text-[10px] font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="heading-xl mb-6 max-w-5xl">
                            {title}
                        </h1>

                        {subtitle && (
                            <p className="body-text text-xl text-stone-500 max-w-3xl">
                                {subtitle}
                            </p>
                        )}
                    </motion.header>

                    {/* CONTENT SECTION */}
                    <div className="col-span-12">
                        {children}
                    </div>

                    {/* FOOTER NAV */}
                    <div className="col-span-12 mt-32 pt-16 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center">
                        {onBack ? (
                            <button
                                type="button"
                                onClick={onBack}
                                className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                <span className="w-8 h-px bg-stone-300 group-hover:bg-indigo-600 transition-colors"></span>
                                Back to List
                            </button>
                        ) : (
                            <Link
                                href="/portfolio"
                                className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                <span className="w-8 h-px bg-stone-300 group-hover:bg-indigo-600 transition-colors"></span>
                                Back to Portfolio
                            </Link>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
