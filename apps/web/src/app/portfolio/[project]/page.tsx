import { notFound } from "next/navigation";
import Link from "next/link";
import { getPortfolioProjects, getProjectBySlug } from "@/entities/post/api/get-posts";
import { MdxContent } from "@/features/mdx-viewer/ui/MdxContent";

interface PageProps {
    params: Promise<{ project: string }>;
}

export async function generateStaticParams() {
    const projects = await getPortfolioProjects();
    return projects.map((project) => ({
        project: project.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { project: projectSlug } = await params;
    const project = await getProjectBySlug(projectSlug);
    if (!project) return { title: "Not Found" };

    return {
        title: project.meta.title,
        description: project.meta.description,
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { project: projectSlug } = await params;
    const project = await getProjectBySlug(projectSlug);

    if (!project) {
        return notFound();
    }

    const experiences = project.meta.experiences || [];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 pt-16 max-w-4xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 dark:text-stone-500 mb-8">
                <Link href="/portfolio" className="hover:text-indigo-500 transition-colors">
                    Portfolio
                </Link>
                <span>/</span>
                <span className="text-slate-600 dark:text-stone-300">{project.meta.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-12 border-b border-slate-100 dark:border-stone-800 pb-10">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500/80 mb-4">
                    {project.meta.period}
                </div>

                <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-stone-100 sm:text-5xl mb-4">
                    {project.meta.title}
                </h1>

                <p className="text-lg font-medium text-slate-500 dark:text-stone-400 mb-6">
                    {project.meta.company} · {project.meta.role}
                </p>

                <p className="text-slate-600 dark:text-stone-400 leading-relaxed mb-6">
                    {project.meta.description}
                </p>

                {/* Tech Stack */}
                {project.meta.stack && (
                    <div className="flex flex-wrap gap-2">
                        {project.meta.stack.map((tech: string) => (
                            <span
                                key={tech}
                                className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Content Box */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white/95 dark:bg-stone-900/95 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] ring-1 ring-slate-200/60 dark:ring-white/10 backdrop-blur-md md:p-12 lg:p-16">
                {/* Experiences List */}
                {experiences.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-stone-500 mb-6">
                            주요 업무 경험
                        </h2>
                        <div className="grid gap-4">
                            {experiences.map((exp: { slug: string; title: string; summary: string; tags?: string[] }, index: number) => (
                                <Link
                                    key={exp.slug}
                                    href={`/portfolio/${projectSlug}/${exp.slug}`}
                                    className="group flex items-start gap-4 p-5 rounded-xl bg-slate-50 dark:bg-stone-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors ring-1 ring-slate-200/60 dark:ring-white/5 hover:ring-indigo-300 dark:hover:ring-indigo-500/30"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center">
                                        <span className="text-sm font-black text-indigo-500">{index + 1}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-800 dark:text-stone-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                                            {exp.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-stone-400 mb-2">
                                            {exp.summary}
                                        </p>
                                        {exp.tags && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {exp.tags.map((tag: string) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200/50 dark:bg-stone-700/50 text-slate-500 dark:text-stone-400"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <svg className="w-5 h-5 text-slate-300 dark:text-stone-600 group-hover:text-indigo-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Project Description */}
                <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-h2:text-2xl prose-h3:text-xl prose-a:text-indigo-500">
                    <MdxContent source={project.content} />
                </article>
            </div>

            {/* Back to Portfolio */}
            <div className="mt-16 pt-8 border-t border-slate-100 dark:border-stone-800">
                <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 dark:text-stone-500 hover:text-indigo-500 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    모든 프로젝트 보기
                </Link>
            </div>
        </div>
    );
}
