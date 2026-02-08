'use client';

import { Post } from '@/entities/post/model/types';
import { SwissNavigation } from '@/widgets/portfolio/swissminimal';
import { motion } from 'framer-motion';

interface SwissDetailPageProps {
    post: Post;
    children: React.ReactNode;
}

export const SwissDetailPage = ({ post, children }: SwissDetailPageProps) => {
    return (
        <div className="relative min-h-screen w-full bg-white text-black selection:bg-orange-500 selection:text-white">
            <SwissNavigation />

            <main className="mx-auto max-w-4xl px-6 pt-32 pb-20">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 border-b border-black/10 pb-12"
                >
                    <div className="mb-4 flex items-center gap-4 text-sm font-medium text-stone-500">
                        <span className="font-mono">{post.meta.date}</span>
                        {post.meta.tags && post.meta.tags.map(tag => (
                            <span key={tag} className="rounded-full bg-stone-100 px-3 py-1 text-xs uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                        {post.meta.title}
                    </h1>
                    {post.meta.description && (
                        <p className="mt-6 text-xl text-stone-600 font-light leading-relaxed">
                            {post.meta.description}
                        </p>
                    )}
                </motion.header>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-stone prose-xl max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight
                        prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-black prose-h2:pl-4
                        prose-p:leading-relaxed prose-p:text-stone-700
                        prose-strong:font-bold prose-strong:text-black
                        prose-ul:list-disc prose-ul:ml-6
                        prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-pink-600
                        prose-pre:bg-stone-900 prose-pre:rounded-lg prose-pre:p-4
                        prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-stone-100"
                >
                    {children}
                </motion.div>

                <div className="mt-20 pt-10 border-t border-black/10 flex justify-between">
                    <a href="/portfolio" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-orange-600 transition-colors">
                        ← Back to Portfolio
                    </a>
                </div>
            </main>
        </div>
    );
};
