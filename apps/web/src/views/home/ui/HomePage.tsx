"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/cn';
import { Send, Terminal } from 'lucide-react';
import { SITE_CONFIG } from '@/shared/config/site';

const POST_IT_PALETTE = [
    // ... (rest of the code remains the same as viewed)
    {
        bg: 'bg-[#FEF3C7] dark:bg-amber-950/40',
        text: 'text-[#92400E] dark:text-amber-200/80',
        border: 'border-[#FDE68A] dark:border-amber-900/40'
    }, // Canary
    {
        bg: 'bg-[#E0F2FE] dark:bg-sky-950/40',
        text: 'text-[#075985] dark:text-sky-200/80',
        border: 'border-[#BAE6FD] dark:border-sky-900/40'
    }, // Sky
    {
        bg: 'bg-[#FCE7F3] dark:bg-pink-950/40',
        text: 'text-[#9D174D] dark:text-pink-200/80',
        border: 'border-[#FBCFE8] dark:border-pink-900/40'
    }, // Pink
    {
        bg: 'bg-[#DCFCE7] dark:bg-emerald-950/40',
        text: 'text-[#166534] dark:text-emerald-200/80',
        border: 'border-[#BBF7D0] dark:border-emerald-900/40'
    }, // Mint
];

function getOrganicRotation(slug: string) {
    // Deterministic hash to stay within -1 to 1 degree
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
        hash = slug.charCodeAt(i) + ((hash << 5) - hash);
    }
    // More granular distribution between -1.0 and 1.0
    const val = ((Math.abs(hash) % 201) / 100) - 1;
    return val;
}

function SearchWidget({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = React.useState("");

    const handleChange = (val: string) => {
        setQuery(val);
        onSearch(val);
    };

    return (
        <motion.div
            className="pointer-events-auto relative z-20 w-full max-w-2xl overflow-hidden rounded-[2.2rem] bg-white/70 dark:bg-stone-900/70 p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ring-1 ring-slate-200/50 dark:ring-stone-800/50 backdrop-blur-2xl"
        >
            <div className="relative flex items-center rounded-[1.8rem] bg-slate-50/50 dark:bg-stone-800/30 p-1.5 transition-all focus-within:bg-white dark:focus-within:bg-stone-800 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/30 shadow-inner">
                <div className="flex h-11 w-11 items-center justify-center text-slate-300 dark:text-stone-600">
                    <Terminal size={20} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Search posts by keyword or #tag..."
                    className="flex-1 bg-transparent px-2 text-base font-bold text-slate-700 dark:text-stone-200 outline-none caret-indigo-500 placeholder:text-slate-300 dark:placeholder:text-stone-600 placeholder:font-normal"
                />
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 dark:bg-indigo-600 text-white shadow-lg mr-1">
                    <Send size={18} />
                </div>
            </div>
        </motion.div>
    );
}

export default function HomePage({ posts }: { posts: any[] }) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const displayPosts = React.useMemo(() => {
        if (!searchQuery.trim()) return posts.slice(0, 13); // Show 13 to account for hero + 4x3 grid

        const lowerQuery = searchQuery.toLowerCase().replace('#', '');
        return posts.filter(post =>
            post.meta.title.toLowerCase().includes(lowerQuery) ||
            post.meta.description?.toLowerCase().includes(lowerQuery) ||
            post.slug.toLowerCase().includes(lowerQuery) ||
            post.meta.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
        );
    }, [posts, searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="relative min-h-screen pt-12">
            <header className="space-y-4 pt-12 mb-12">
                <h1 className="text-6xl font-black tracking-tight text-slate-800 dark:text-stone-100">
                    {SITE_CONFIG.title.split('.')[0]}<span className="text-indigo-500">.</span>{SITE_CONFIG.title.split('.')[1]}
                </h1>
                <p className="max-w-xl text-xl font-medium text-slate-500 dark:text-stone-400">
                    {SITE_CONFIG.description}
                </p>

                <div className="pt-8">
                    <SearchWidget onSearch={handleSearch} />
                    <div className="mt-4 px-2 flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-stone-500 uppercase tracking-widest">
                        <Terminal size={10} />
                        <span>Showing {displayPosts.length} results from blog.db</span>
                    </div>
                </div>
            </header>

            <section className="relative z-10 grid grid-cols-1 gap-12 pb-32 pt-8 sm:grid-cols-2 lg:grid-cols-3">
                {displayPosts.map((post, idx) => {
                    const isHero = idx === 0 && !searchQuery;
                    const palette = POST_IT_PALETTE[idx % POST_IT_PALETTE.length];
                    const rotation = getOrganicRotation(post.slug);

                    return (
                        <div
                            key={post.slug}
                            className={cn(
                                "flex justify-center",
                                isHero && "lg:col-span-2"
                            )}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                className={cn(
                                    "group block w-full pointer-events-auto",
                                    isHero ? "max-w-none aspect-[1.6/1]" : "max-w-[320px] aspect-square"
                                )}
                            >
                                <motion.div
                                    layout
                                    whileHover={{ y: -5, rotate: 0, zIndex: 10 }}
                                    initial={{ rotate: rotation }}
                                    animate={{ rotate: rotation }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={cn(
                                        "relative h-full w-full p-8 shadow-xl transition-all hover:shadow-2xl flex flex-col border-t-4",
                                        palette.bg,
                                        palette.text,
                                        palette.border
                                    )}
                                >
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 block">
                                                {String(post.meta.date)}
                                            </span>
                                            {post.meta.draft && (
                                                <span className="px-1.5 py-0.5 rounded bg-red-500 text-white text-[9px] font-black uppercase tracking-tighter shadow-sm animate-pulse">
                                                    Draft
                                                </span>
                                            )}
                                        </div>

                                        <h2 className={cn(
                                            "font-bold leading-[1.2] group-hover:underline overflow-hidden text-ellipsis mb-4",
                                            isHero ? "text-4xl md:text-5xl lg:text-5xl line-clamp-4" : "text-xl line-clamp-4"
                                        )}>
                                            {post.meta.title}
                                        </h2>

                                        <div className="mt-auto flex flex-wrap gap-2 opacity-80">
                                            {((isHero ? post.meta.tags : post.meta.tags?.slice(0, 3)) || []).map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-wider">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
