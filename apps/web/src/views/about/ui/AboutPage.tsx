import { Post } from '@/entities/post/model/types';
import { MdxContent } from '@/features/mdx-viewer/ui/MdxContent';
import { SITE_CONFIG } from '@/shared/config/site';

interface AboutPageProps {
    post: Post;
}

export default function AboutPage({ post }: AboutPageProps) {
    return (
        <div className="pb-20 pt-16">
            <header className="mb-14 border-b border-stone-200 pb-12 dark:border-stone-800">
                <h1 className="mb-5 text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-none tracking-[-0.04em] text-stone-950 dark:text-stone-50">
                    About<span className="text-indigo-500">.</span>
                </h1>
                <p className="max-w-[480px] text-base leading-[1.7] text-stone-600 dark:text-stone-400">
                    {SITE_CONFIG.title}를 운영하는 백엔드 개발자 최범휘입니다.
                </p>
            </header>

            <article>
                <MdxContent source={post.content} />
            </article>

            <footer className="mt-20 border-t border-stone-200 pt-12 dark:border-stone-800">
                <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">
                    © {new Date().getFullYear()} {SITE_CONFIG.title}
                </div>
            </footer>
        </div>
    );
}
