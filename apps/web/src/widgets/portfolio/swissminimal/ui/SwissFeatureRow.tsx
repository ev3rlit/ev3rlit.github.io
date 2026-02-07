import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SwissFeatureRowProps {
    id: string; // e.g. "F.01"
    title: string;
    description: string;
    storyId: string;
}

export const SwissFeatureRow = ({ id, title, description, storyId }: SwissFeatureRowProps) => {
    return (
        <article className="group relative border-t border-stone-900 dark:border-white py-8 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-8 items-baseline">
                {/* ID Column */}
                <div className="md:col-span-1">
                    <span className="font-mono text-sm font-bold text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                        {id}
                    </span>
                </div>

                {/* Title Column */}
                <div className="md:col-span-4">
                    <h3 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white font-sans group-hover:translate-x-1 transition-transform duration-300">
                        {title}
                    </h3>
                </div>

                {/* Description Column */}
                <div className="md:col-span-5">
                    <p className="text-black dark:text-white font-light leading-relaxed break-keep">
                        {description}
                    </p>
                </div>

                {/* Action Column */}
                <div className="md:col-span-2 flex md:justify-end mt-2 md:mt-0">
                    <Link
                        href={`/portfolio/story/${storyId}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        View Details 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </article>
    );
};
