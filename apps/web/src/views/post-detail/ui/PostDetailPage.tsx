import Link from 'next/link';
import { Post } from '@/entities/post/model/types';
import { MdxContent } from '@/features/mdx-viewer/ui/MdxContent';
import { FullscreenMindmapPage } from '@/features/mdx-viewer/ui/FullscreenMindmapPage';
import { ViewModeWrapper } from '@/features/mdx-viewer/ui/ViewModeWrapper';
import { CommentsWidget } from '@/features/comments/ui/CommentsWidget';
import { ViewModeSync } from './ViewModeSync';

interface PostDetailPageProps {
    post: Post;
    nextPost?: Post | null;
    prevPost?: Post | null;
}

function formatDate(date: string) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date.replaceAll('-', '.');
    }

    return date;
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
                <article className="pb-20">
                    <header className="mb-14 border-b border-stone-200 pb-12 pt-16 dark:border-stone-800">
                        {post.meta.tags && post.meta.tags.length > 0 && (
                            <div className="mb-5 flex flex-wrap gap-2">
                                {post.meta.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-indigo-50 px-[10px] py-[3px] text-[11px] font-bold uppercase tracking-[0.06em] text-indigo-500 dark:bg-indigo-950 dark:text-indigo-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 className="mb-5 text-[clamp(1.75rem,4vw,2.6rem)] font-black leading-[1.15] tracking-[-0.035em] text-stone-950 dark:text-stone-50">
                            {post.meta.title}
                        </h1>

                        {post.meta.description && (
                            <p className="mb-7 text-[17px] leading-[1.7] text-stone-600 dark:text-stone-400">
                                {post.meta.description}
                            </p>
                        )}

                        <div className="flex items-center gap-4">
                            <time
                                dateTime={String(post.meta.date)}
                                className="text-[13px] tabular-nums text-stone-400 dark:text-stone-500"
                            >
                                {formatDate(String(post.meta.date))}
                            </time>
                        </div>
                    </header>

                    <MdxContent source={post.content} />

                    <footer className="border-t border-stone-200 pb-20 pt-12 dark:border-stone-800">
                        <p className="mb-7 text-[11px] font-bold uppercase tracking-[0.12em] text-stone-400 dark:text-stone-500">
                            More posts
                        </p>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {prevPost ? (
                                <Link
                                    href={`/blog/${prevPost.slug}`}
                                    className="block border-t border-stone-200 py-5 text-left text-inherit no-underline transition-opacity hover:opacity-[0.55] dark:border-stone-800"
                                >
                                    <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400 dark:text-stone-500">
                                        <span aria-hidden="true">←</span>
                                        <span>Previous</span>
                                    </div>
                                    <div className="text-sm font-bold leading-[1.4] text-stone-950 dark:text-stone-50">
                                        {prevPost.meta.title}
                                    </div>
                                </Link>
                            ) : (
                                <div className="hidden sm:block" aria-hidden="true" />
                            )}

                            {nextPost ? (
                                <Link
                                    href={`/blog/${nextPost.slug}`}
                                    className="block border-t border-stone-200 py-5 text-right text-inherit no-underline transition-opacity hover:opacity-[0.55] dark:border-stone-800"
                                >
                                    <div className="mb-2 flex items-center justify-end gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400 dark:text-stone-500">
                                        <span>Next</span>
                                        <span aria-hidden="true">→</span>
                                    </div>
                                    <div className="text-sm font-bold leading-[1.4] text-stone-950 dark:text-stone-50">
                                        {nextPost.meta.title}
                                    </div>
                                </Link>
                            ) : (
                                <div className="hidden sm:block" aria-hidden="true" />
                            )}
                        </div>
                    </footer>
                </article>

                <CommentsWidget />
            </ViewModeWrapper>
        </>
    );
}
