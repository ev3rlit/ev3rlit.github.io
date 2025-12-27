import { Post } from '@/entities/post/model/types';
import { MdxContent } from '@/features/mdx-viewer/ui/MdxContent';
import { SITE_CONFIG } from '@/shared/config/site';

interface AboutPageProps {
    post: Post;
}

export default function AboutPage({ post }: AboutPageProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 pt-16 max-w-4xl mx-auto px-6">
            <header className="mb-20 border-b border-slate-100 dark:border-stone-800 pb-12">
                <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-stone-100 sm:text-6xl lg:text-7xl mb-6">
                    About<span className="text-indigo-500">.</span>
                </h1>
                <p className="text-xl font-medium text-slate-400 dark:text-stone-500 leading-relaxed max-w-2xl">
                    {SITE_CONFIG.title}를 운영하는 백엔드 개발자 최범휘입니다.
                </p>
            </header>

            <article className="relative overflow-hidden rounded-[2.5rem] bg-white/95 dark:bg-stone-900/95 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] ring-1 ring-slate-200/60 dark:ring-white/10 backdrop-blur-md md:p-16 lg:p-20">
                <MdxContent source={post.content} />
            </article>

            <footer className="mt-32 pt-12 border-t border-slate-50 dark:border-stone-900 text-center">
                <div className="text-[12px] text-stone-300 dark:text-stone-700 font-bold tracking-[0.2em] uppercase">
                    © {new Date().getFullYear()} {SITE_CONFIG.title}
                </div>
            </footer>
        </div>
    );
}
