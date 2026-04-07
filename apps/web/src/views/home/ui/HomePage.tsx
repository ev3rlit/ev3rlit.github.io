"use client";

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { Post } from '@/entities/post/model/types';

function formatDate(date: string) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date.replaceAll('-', '.');
    }

    return date;
}

function SearchWidget({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = React.useState("");

    const handleChange = (val: string) => {
        setQuery(val);
        onSearch(val);
    };

    return (
        <div className="border-b-[1.5px] border-stone-200 transition-colors focus-within:border-indigo-500 dark:border-stone-800 dark:focus-within:border-indigo-400">
            <div className="flex items-center gap-3 py-3">
                <Search className="h-4 w-4 shrink-0 text-stone-400 dark:text-stone-500" />
                <input
                    aria-label="Search posts"
                    type="text"
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Search posts by keyword or #tag..."
                    className="w-full border-none bg-transparent p-0 text-sm text-stone-900 outline-none placeholder:text-stone-400 dark:text-stone-50 dark:placeholder:text-stone-500"
                />
            </div>
        </div>
    );
}

function FeedItem({ post, featured }: { post: Post; featured: boolean }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className={`block border-b border-stone-200 text-inherit no-underline transition-opacity hover:opacity-[0.55] first:border-t dark:border-stone-800 ${featured ? 'py-9' : 'py-7'}`}
        >
            {featured && (
                <span className="mb-3 inline-block bg-indigo-50 px-[10px] py-[3px] text-[11px] font-bold uppercase tracking-[0.06em] text-indigo-500 dark:bg-indigo-950 dark:text-indigo-400">
                    Latest
                </span>
            )}
            <p className={`text-stone-950 dark:text-stone-50 ${featured ? 'mb-2 text-[22px] font-extrabold leading-[1.25] tracking-[-0.025em]' : 'mb-3 text-base font-bold leading-[1.45]'}`}>
                {post.meta.title}
            </p>
            {featured && post.meta.description && (
                <p className="mb-4 text-[14px] leading-[1.65] text-stone-600 dark:text-stone-400">
                    {post.meta.description}
                </p>
            )}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-xs tabular-nums text-stone-400 dark:text-stone-500">
                    {formatDate(String(post.meta.date))}
                </span>
                {post.meta.tags && post.meta.tags.length > 0 && (
                    <>
                        <span className="text-[10px] text-stone-200 dark:text-stone-800">·</span>
                        <div className="flex flex-wrap gap-1.5">
                            {post.meta.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[11px] font-semibold uppercase tracking-[0.04em] text-stone-400 dark:text-stone-500"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Link>
    );
}

export default function HomePage({ posts }: { posts: Post[] }) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const deferredSearchQuery = React.useDeferredValue(searchQuery);

    const displayPosts = React.useMemo(() => {
        if (!deferredSearchQuery.trim()) return posts;

        const lowerQuery = deferredSearchQuery.toLowerCase().replace('#', '');
        return posts.filter(post =>
            post.meta.title.toLowerCase().includes(lowerQuery) ||
            post.meta.description?.toLowerCase().includes(lowerQuery) ||
            post.slug.toLowerCase().includes(lowerQuery) ||
            post.meta.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
        );
    }, [deferredSearchQuery, posts]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const featuredPost = !deferredSearchQuery.trim() ? displayPosts[0] : null;
    const regularPosts = featuredPost ? displayPosts.slice(1) : displayPosts;
    const suggestedTags = Array.from(
        new Set(posts.flatMap((post) => post.meta.tags ?? []))
    ).slice(0, 3);

    return (
        <div className="pb-24">
            <section className="pb-14 pt-[72px] sm:pt-[88px]">
                <h1 className="mb-5 text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-none tracking-[-0.04em] text-stone-950 dark:text-stone-50">
                    log<span className="text-indigo-500">.</span>
                </h1>
                <p className="max-w-[480px] text-base leading-[1.7] text-stone-600 dark:text-stone-400">
                    기록합니다.
                </p>
            </section>

            <section className="mb-14">
                <SearchWidget onSearch={handleSearch} />
                <p className="mt-3 pl-1 text-[11px] text-stone-400 dark:text-stone-500">
                    {displayPosts.length} posts
                    {suggestedTags.length > 0 && ` · try ${suggestedTags.map((tag) => `#${tag}`).join(', ')}`}
                </p>
            </section>

            <div className="mb-8 flex items-center gap-4">
                <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.12em] text-stone-400 dark:text-stone-500">
                    Recent
                </span>
                <span className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
            </div>

            <section className="pb-24">
                {featuredPost && <FeedItem post={featuredPost} featured />}
                {regularPosts.map((post) => (
                    <FeedItem key={post.slug} post={post} featured={false} />
                ))}
            </section>
        </div>
    );
}
