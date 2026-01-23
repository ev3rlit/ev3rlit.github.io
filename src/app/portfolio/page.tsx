import Link from "next/link";
import { getPortfolioProjects } from "@/entities/post/api/get-posts";

export const metadata = {
    title: "Portfolio",
    description: "프로젝트 포트폴리오",
};

export default async function PortfolioPage() {
    const projects = await getPortfolioProjects();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 pt-16 max-w-5xl mx-auto px-6">
            <header className="mb-16 border-b border-slate-100 dark:border-stone-800 pb-12">
                <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-stone-100 sm:text-6xl lg:text-7xl mb-6">
                    Portfolio<span className="text-indigo-500">.</span>
                </h1>
                <p className="text-xl font-medium text-slate-400 dark:text-stone-500 leading-relaxed max-w-2xl">
                    문제를 정의하고, 해결하고, 결과를 측정한 프로젝트들
                </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
                {projects.map((project, index) => (
                    <Link
                        key={project.slug}
                        href={`/portfolio/${project.slug}`}
                        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-stone-900 p-8 shadow-lg ring-1 ring-slate-200/60 dark:ring-white/10 transition-all duration-300 hover:shadow-xl hover:ring-indigo-500/30 hover:-translate-y-1"
                    >
                        {/* Order badge */}
                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center">
                            <span className="text-lg font-black text-indigo-500">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </div>

                        {/* Period */}
                        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500/80 mb-4">
                            {project.meta.period}
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-black text-slate-900 dark:text-stone-100 mb-2 group-hover:text-indigo-500 transition-colors">
                            {project.meta.title}
                        </h2>

                        {/* Company & Role */}
                        <p className="text-sm font-semibold text-slate-500 dark:text-stone-400 mb-4">
                            {project.meta.company} · {project.meta.role}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed mb-6">
                            {project.meta.description}
                        </p>

                        {/* Experiences preview */}
                        {project.meta.experiences && project.meta.experiences.length > 0 && (
                            <div className="space-y-2 mb-6">
                                {project.meta.experiences.slice(0, 3).map((exp: { slug: string; title: string; summary: string }) => (
                                    <div key={exp.slug} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                        <span className="text-xs font-medium text-slate-600 dark:text-stone-400">
                                            {exp.title}
                                        </span>
                                    </div>
                                ))}
                                {project.meta.experiences.length > 3 && (
                                    <span className="text-xs text-slate-400 dark:text-stone-500 pl-3.5">
                                        +{project.meta.experiences.length - 3} more
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Tech Stack */}
                        {project.meta.stack && (
                            <div className="flex flex-wrap gap-1.5">
                                {project.meta.stack.slice(0, 5).map((tech: string) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-stone-800 text-[11px] font-semibold text-slate-500 dark:text-stone-400"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Arrow indicator */}
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Back to About */}
            <div className="mt-16 text-center">
                <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 dark:text-stone-500 hover:text-indigo-500 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    About 페이지로 돌아가기
                </Link>
            </div>
        </div>
    );
}
