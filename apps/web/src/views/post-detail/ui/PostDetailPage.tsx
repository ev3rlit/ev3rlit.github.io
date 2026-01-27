import Link from 'next/link';
import { Post } from '@/entities/post/model/types';
import { MdxContent } from '@/features/mdx-viewer/ui/MdxContent';
import { FullscreenMindmapPage } from '@/features/mdx-viewer/ui/FullscreenMindmapPage';
import { ViewModeWrapper } from '@/features/mdx-viewer/ui/ViewModeWrapper';
import { CommentsWidget } from '@/features/comments/ui/CommentsWidget';
import { Button } from '@/shared/ui/Button';
import { ViewModeSync } from './ViewModeSync';

// TOC Features
import { TocInitializer } from '@/features/toc/ui/TocInitializer';
import { TableOfContents } from '@/features/toc/ui/TableOfContents';

interface PostDetailPageProps {
    post: Post;
    nextPost?: Post | null;
    prevPost?: Post | null;
}

export function PostDetailPage({ post, nextPost, prevPost }: PostDetailPageProps) {
    // Get default view mode from frontmatter
    const defaultView = post.meta.defaultView as string | undefined;

    return (
        <>
            {/* Sync frontmatter defaultView to app-level Context */}
            <ViewModeSync defaultView={defaultView} />

            {/* Mindmap Mode: Fullscreen Canvas (like WhiteboardPage) */}
            <ViewModeWrapper mode="mindmap">
                <FullscreenMindmapPage
                    source={post.content}
                    title={post.meta.title}
                />
            </ViewModeWrapper>

            {/* Document Mode: Traditional Article Layout */}
            <ViewModeWrapper mode="document">
                {/* Initialize TOC Logic (Headings Extraction & Scroll Spy) & Mobile Drawer */}
                <TocInitializer />

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
                    <div className="mb-8">
                        <Link href="/">
                            <Button intent="ghost" size="sm" className="-ml-3 text-stone-500 hover:text-indigo-600 transition-colors">
                                ← Back to Home
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-col lg:flex-row relative items-start justify-center">
                        {/* Main Content Column */}
                        <div className="flex-1 w-full min-w-0 max-w-4xl mx-auto">
                            <article className="relative overflow-hidden rounded-[2.5rem] bg-white/95 dark:bg-stone-900/95 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] ring-1 ring-slate-200/60 dark:ring-white/10 backdrop-blur-md md:p-16 lg:p-20">
                                <header className="mb-12 border-b border-slate-100 dark:border-stone-800 pb-12 text-center">
                                    <div className="mb-6 flex justify-center gap-2">
                                        {post.meta.tags?.map(tag => (
                                            <span key={tag} className="rounded-full bg-slate-100 dark:bg-stone-800 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-stone-400">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900 dark:text-stone-100 sm:text-5xl lg:text-6xl">
                                        {post.meta.title}
                                    </h1>
                                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-stone-500">
                                        <time dateTime={String(post.meta.date)}>{String(post.meta.date)}</time>
                                    </div>
                                </header>

                                <MdxContent source={post.content} />

                                <footer className="mt-20 border-t border-slate-100 dark:border-stone-800 pt-12">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        {/* Newer Post (Left) */}
                                        {nextPost ? (
                                            <Link href={`/blog/${nextPost.slug}`} className="group block text-left">
                                                <div className="rounded-2xl border border-slate-100 dark:border-stone-800 bg-slate-50/50 dark:bg-stone-800/30 p-6 transition-all hover:bg-slate-100 dark:hover:bg-stone-800 hover:shadow-md">
                                                    <div className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-500/60 dark:text-indigo-400/60 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                                                        ← Newer Post
                                                    </div>
                                                    <div className="line-clamp-2 text-lg font-bold text-slate-700 dark:text-stone-200 group-hover:text-slate-900 dark:group-hover:text-stone-100">
                                                        {nextPost.meta.title}
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div className="hidden sm:block" aria-hidden="true" />
                                        )}

                                        {/* Older Post (Right) */}
                                        {prevPost ? (
                                            <Link href={`/blog/${prevPost.slug}`} className="group block text-right">
                                                <div className="rounded-2xl border border-slate-100 dark:border-stone-800 bg-slate-50/50 dark:bg-stone-800/30 p-6 transition-all hover:bg-slate-100 dark:hover:bg-stone-800 hover:shadow-md">
                                                    <div className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-500/60 dark:text-indigo-400/60 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                                                        Older Post →
                                                    </div>
                                                    <div className="line-clamp-2 text-lg font-bold text-slate-700 dark:text-stone-200 group-hover:text-slate-900 dark:group-hover:text-stone-100">
                                                        {prevPost.meta.title}
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div className="hidden sm:block" aria-hidden="true" />
                                        )}
                                    </div>
                                </footer>
                            </article>

                            <div className="mt-12">
                                <CommentsWidget />
                            </div>
                        </div>

                        {/* Desktop Table of Contents (Fixed Right Sidebar) */}
                        {/* Position fixed to ensure it stays on the right screen edge regardless of content width */}
                        <div className="hidden 2xl:block w-72 fixed right-8 top-32 z-10">
                            <TableOfContents />
                        </div>
                    </div>
                </div>
            </ViewModeWrapper>
        </>
    );
}
