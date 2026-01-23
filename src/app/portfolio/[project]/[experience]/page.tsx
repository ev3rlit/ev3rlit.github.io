import { notFound } from "next/navigation";
import Link from "next/link";
import {
    getPortfolioProjects,
    getExperiencesByProject,
    getExperienceWithNeighbors,
    getProjectBySlug,
} from "@/entities/post/api/get-posts";
import { MdxContent } from "@/features/mdx-viewer/ui/MdxContent";

interface PageProps {
    params: Promise<{ project: string; experience: string }>;
}

export async function generateStaticParams() {
    const projects = await getPortfolioProjects();
    const params: { project: string; experience: string }[] = [];

    for (const project of projects) {
        const experiences = await getExperiencesByProject(project.slug);
        for (const exp of experiences) {
            params.push({
                project: project.slug,
                experience: exp.slug,
            });
        }
    }

    return params;
}

export async function generateMetadata({ params }: PageProps) {
    const { project: projectSlug, experience: expSlug } = await params;
    const data = await getExperienceWithNeighbors(projectSlug, expSlug);
    if (!data) return { title: "Not Found" };

    return {
        title: `${data.experience.meta.title} | Portfolio`,
        description: data.experience.meta.description,
    };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
    const { project: projectSlug, experience: expSlug } = await params;
    const data = await getExperienceWithNeighbors(projectSlug, expSlug);
    const project = await getProjectBySlug(projectSlug);

    if (!data || !project) {
        return notFound();
    }

    const { experience, prevExperience, nextExperience, total, current } = data;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 pt-16 max-w-4xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 dark:text-stone-500 mb-8 flex-wrap">
                <Link href="/portfolio" className="hover:text-indigo-500 transition-colors">
                    Portfolio
                </Link>
                <span>/</span>
                <Link href={`/portfolio/${projectSlug}`} className="hover:text-indigo-500 transition-colors">
                    {project.meta.title}
                </Link>
                <span>/</span>
                <span className="text-slate-600 dark:text-stone-300">{experience.meta.title}</span>
            </nav>

            {/* Page indicator */}
            <div className="flex items-center justify-between mb-8">
                <div className="text-xs font-bold text-slate-400 dark:text-stone-500">
                    {current} / {total}
                </div>
                <div className="flex items-center gap-2">
                    {Array.from({ length: total }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                i === current - 1
                                    ? 'bg-indigo-500'
                                    : 'bg-slate-200 dark:bg-stone-700'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Header */}
            <header className="mb-12 border-b border-slate-100 dark:border-stone-800 pb-10">
                <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-stone-100 sm:text-4xl mb-4">
                    {experience.meta.title}
                </h1>

                <p className="text-lg text-slate-600 dark:text-stone-400 leading-relaxed mb-6">
                    {experience.meta.description}
                </p>

                {/* Tags */}
                {experience.meta.tags && (
                    <div className="flex flex-wrap gap-2">
                        {experience.meta.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Content Box */}
            <article className="relative overflow-hidden rounded-[2.5rem] bg-white/95 dark:bg-stone-900/95 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] ring-1 ring-slate-200/60 dark:ring-white/10 backdrop-blur-md md:p-12 lg:p-16">
                <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-h2:text-2xl prose-h3:text-xl prose-a:text-indigo-500 prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-pre:bg-slate-900 dark:prose-pre:bg-stone-950">
                    <MdxContent source={experience.content} />
                </div>
            </article>

            {/* Slide Navigation */}
            <nav className="mt-16 pt-8 border-t border-slate-100 dark:border-stone-800">
                <div className="grid grid-cols-2 gap-4">
                    {/* Previous */}
                    <Link
                        href={`/portfolio/${projectSlug}/${prevExperience.slug}`}
                        className="group p-6 rounded-2xl bg-slate-50 dark:bg-stone-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                    >
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-stone-500 group-hover:text-indigo-500 mb-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </div>
                        <div className="font-bold text-slate-700 dark:text-stone-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {prevExperience.meta.title}
                        </div>
                    </Link>

                    {/* Next */}
                    <Link
                        href={`/portfolio/${projectSlug}/${nextExperience.slug}`}
                        className="group p-6 rounded-2xl bg-slate-50 dark:bg-stone-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors text-right"
                    >
                        <div className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-stone-500 group-hover:text-indigo-500 mb-2">
                            Next
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="font-bold text-slate-700 dark:text-stone-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {nextExperience.meta.title}
                        </div>
                    </Link>
                </div>

                {/* Keyboard hint */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400 dark:text-stone-600">
                        Use <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-stone-800 font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-stone-800 font-mono text-[10px]">→</kbd> to navigate
                    </p>
                </div>
            </nav>

            {/* Back to Project */}
            <div className="mt-8 text-center">
                <Link
                    href={`/portfolio/${projectSlug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 dark:text-stone-500 hover:text-indigo-500 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {project.meta.title} 프로젝트로 돌아가기
                </Link>
            </div>
        </div>
    );
}
