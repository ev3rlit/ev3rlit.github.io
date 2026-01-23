"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, FileText } from 'lucide-react';
import { useSearchStore } from '../model/useSearchStore';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import Link from 'next/link';
import { cn } from '@/shared/lib/cn';
import { Post } from '@/entities/post/model/types';

interface SearchMenuProps {
    posts: Post[];
}

export function SearchMenu({ posts = [] }: SearchMenuProps) {
    const { isOpen, close, searchQuery, setSearchQuery } = useSearchStore();

    // Get top tags with frequency
    const topTags = useMemo(() => {
        const tagCount: Record<string, number> = {};
        posts.forEach(post => {
            post.meta?.tags?.forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        });
        return Object.entries(tagCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([tag]) => tag);
    }, [posts]);

    // Filter tags based on search query
    const suggestedTags = useMemo(() => {
        const query = searchQuery.toLowerCase().replace('#', '');
        if (!query.trim()) return topTags;
        return topTags.filter(tag => tag.toLowerCase().includes(query));
    }, [searchQuery, topTags]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        if (!searchQuery.trim()) return posts.slice(0, 5); // Show recent 5 initially
        const lowerQuery = searchQuery.toLowerCase().replace('#', ''); // Remove # if user typed it
        return posts.filter(post =>
            post.meta?.title?.toLowerCase().includes(lowerQuery) ||
            post.meta?.description?.toLowerCase().includes(lowerQuery) ||
            post.slug?.toLowerCase().includes(lowerQuery) ||
            post.meta?.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
        ).slice(0, 10);
    }, [posts, searchQuery]);

    // Format date helper
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:w-80 md:h-[600px] w-full h-[60vh]" // Responsive dimensions
        >
            <Card
                className="flex flex-col h-full overflow-hidden bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-white/20 dark:border-stone-800/20 shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
                radius="lg"
                padding="none"
            >
                {/* Header */}
                <div className="flex items-center justify-between bg-stone-50/50 dark:bg-stone-800/50 px-4 py-2 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-stone-500">Search</span>
                    <button
                        onClick={close}
                        className="rounded-md p-1 hover:bg-stone-200/50 dark:hover:bg-stone-700/50 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Search Input */}
                <div className="p-4 border-b border-stone-100 dark:border-stone-800">
                    <div className="relative flex items-center">
                        <Search className="absolute left-3 text-stone-400 dark:text-stone-500 pointer-events-none" size={18} />
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-xl bg-stone-100/50 dark:bg-stone-800/50 border-none focus:bg-white dark:focus:bg-stone-800 focus:ring-2 focus:ring-indigo-500/20 text-stone-700 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm transition-all shadow-inner"
                        />
                    </div>
                    {/* Tag Badges */}
                    {suggestedTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {suggestedTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSearchQuery(`#${tag}`)}
                                    className={cn(
                                        "text-xs px-2 py-1 rounded-full border transition-all",
                                        searchQuery.toLowerCase().replace('#', '') === tag.toLowerCase()
                                            ? "bg-indigo-500 text-white border-indigo-500"
                                            : "bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800"
                                    )}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto p-2 [scrollbar-width:thin] [scrollbar-color:theme(colors.stone.200)_transparent] dark:[scrollbar-color:theme(colors.stone.800)_transparent]">
                    {filteredPosts.length > 0 ? (
                        <div className="flex flex-col gap-1">
                            {/* Section Title */}
                            <div className="px-2 py-1.5 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                                {searchQuery ? 'Results' : 'Recent Posts'}
                            </div>

                            {filteredPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col gap-1 rounded-lg p-3 hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-stone-200 dark:active:bg-stone-700 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-stone-700 dark:text-stone-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                                            {post.meta.title}
                                        </span>
                                        <span className="text-[10px] text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded group-hover:bg-white dark:group-hover:bg-stone-700">
                                            {formatDate(post.meta.date)}
                                        </span>
                                    </div>
                                    {post.meta.description && (
                                        <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 group-hover:text-stone-600 dark:group-hover:text-stone-300">
                                            {post.meta.description}
                                        </p>
                                    )}
                                    {post.meta.tags && post.meta.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {post.meta.tags.map(tag => (
                                                <span key={tag} className={cn(
                                                    "text-[10px] px-1.5 py-0.5 rounded-full border border-stone-200 dark:border-stone-700",
                                                    tag.toLowerCase().includes(searchQuery.toLowerCase().replace('#', '')) && searchQuery.length > 1
                                                        ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
                                                        : "bg-stone-50 dark:bg-stone-900 text-stone-400 dark:text-stone-500"
                                                )}>
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-stone-400 gap-2">
                            <FileText size={32} className="opacity-20" />
                            <p className="text-sm">No results found</p>
                        </div>
                    )}
                </div>
            </Card>
        </motion.div>
    )
}
