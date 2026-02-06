import type React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUp, Github, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';

interface SwissProjectDetailProps {
    projectInfo: {
        number: string; // e.g., "004"
        title: string;
        description: string;
        role: string;
        period: string;
        status: string; // e.g. "배포 완료 / 운영 중"
        links: {
            github?: string;
            demo?: string;
        };
    };
    overview: {
        intro: string; // Main large intro text
        goals: string;
        strategy: string;
    };
    keywords: {
        category: string;
        items: string[];
    }[];
    architecture?: React.ReactNode; // Flexible: Image or Component
    mainTasks: {
        title: string;
        description: string;
    }[];
    challenges: {
        problem: string;
        solution: string;
    }[];
}

export const SwissProjectDetail = ({
    projectInfo,
    overview,
    keywords,
    architecture,
    mainTasks,
    challenges
}: SwissProjectDetailProps) => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-white text-stone-900 font-sans selection:bg-stone-900 selection:text-white dark:bg-stone-950 dark:text-white dark:selection:bg-white dark:selection:text-stone-900 border-t-8 border-stone-900 dark:border-white">
            
            {/* Navigation */}
            <nav className="w-full px-6 py-8 md:px-12 border-b border-stone-200 dark:border-stone-800">
                <div className="max-w-7xl mx-auto flex items-baseline justify-between">
                    <Link href="/" className="group flex items-center gap-3 text-base font-bold tracking-tight uppercase hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <span className="w-3 h-3 bg-stone-900 dark:bg-white group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-colors duration-300"></span>
                        J.Doe / Portfolio
                    </Link>
                    <Link href="/" className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>목록으로</span>
                    </Link>
                </div>
            </nav>

            <main className="flex-grow w-full px-6 md:px-12 pb-24">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <header className="pt-24 pb-16 border-b border-stone-900 dark:border-white">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-12">
                            <div className="lg:col-span-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-2 py-1 border border-stone-900 dark:border-white text-xs font-mono font-bold uppercase tracking-wider">
                                        Project #{projectInfo.number}
                                    </span>
                                    <span className="w-12 h-px bg-stone-900 dark:bg-white"></span>
                                </div>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-stone-900 dark:text-white mb-8 break-keep whitespace-pre-line">
                                    {projectInfo.title}
                                </h1>
                                <p className="text-xl md:text-2xl font-normal text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed mt-8 pl-4 border-l-4 border-indigo-600 dark:border-indigo-400 break-keep">
                                    {projectInfo.description}
                                </p>
                            </div>
                            
                            <div className="lg:col-span-4 flex flex-col justify-end">
                                <div className="border-t border-stone-900 dark:border-white pt-6">
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-3 items-baseline">
                                            <span className="col-span-1 text-xs uppercase tracking-widest text-stone-500 font-bold">역할</span>
                                            <span className="col-span-2 font-mono text-sm border-b border-stone-200 dark:border-stone-800 pb-1">{projectInfo.role}</span>
                                        </div>
                                        <div className="grid grid-cols-3 items-baseline">
                                            <span className="col-span-1 text-xs uppercase tracking-widest text-stone-500 font-bold">기간</span>
                                            <span className="col-span-2 font-mono text-sm border-b border-stone-200 dark:border-stone-800 pb-1">{projectInfo.period}</span>
                                        </div>
                                        <div className="grid grid-cols-3 items-baseline">
                                            <span className="col-span-1 text-xs uppercase tracking-widest text-stone-500 font-bold">상태</span>
                                            <span className="col-span-2 flex items-center gap-2 font-mono text-sm border-b border-stone-200 dark:border-stone-800 pb-1">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                                </span>
                                                {projectInfo.status}
                                            </span>
                                        </div>
                                        
                                        <div className="pt-8 flex gap-0">
                                            {projectInfo.links.github && (
                                                <a href={projectInfo.links.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 h-12 px-4 font-bold text-sm hover:bg-indigo-600 dark:hover:bg-indigo-200 transition-colors border border-stone-900 dark:border-white">
                                                    <Github className="w-4 h-4" />
                                                    GitHub
                                                </a>
                                            )}
                                            {projectInfo.links.demo && (
                                                <a href={projectInfo.links.demo} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-stone-950 text-stone-900 dark:text-white h-12 px-4 font-bold text-sm hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors border-y border-r border-stone-900 dark:border-white border-l dark:border-l-stone-900">
                                                    <ExternalLink className="w-4 h-4" />
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* 01 Overview */}
                    <section className="border-b border-stone-200 dark:border-stone-800">
                        <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="md:col-span-3 py-16 border-r border-stone-200 dark:border-stone-800 pr-8">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 sticky top-8">01 / 개요</h2>
                            </div>
                            <div className="md:col-span-9 py-16 pl-0 md:pl-12">
                                <div className="max-w-3xl">
                                    <p className="text-2xl md:text-3xl leading-tight font-medium text-stone-900 dark:text-white mb-8 break-keep whitespace-pre-line">
                                        {overview.intro}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-stone-900 dark:border-white pb-2 inline-block text-stone-900 dark:text-white">목표</h3>
                                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed break-keep whitespace-pre-line">
                                                {overview.goals}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-stone-900 dark:border-white pb-2 inline-block text-stone-900 dark:text-white">전략</h3>
                                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed break-keep whitespace-pre-line">
                                                {overview.strategy}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* 02 Keywords (Tech Stack + Others) */}
                    <section className="border-b border-stone-200 dark:border-stone-800">
                        <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="md:col-span-3 py-16 border-r border-stone-200 dark:border-stone-800 pr-8">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 sticky top-8">02 / 키워드 & 기술</h2>
                            </div>
                            <div className="md:col-span-9">
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-l border-stone-200 dark:border-stone-800">
                                    {keywords.flatMap((group) =>
                                        group.items.map((item) => (
                                            <div key={`${group.category}-${item}`} className="aspect-square flex flex-col justify-between p-6 border-r border-b border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors group">
                                                <div className="text-stone-300 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                                                    {/* Default Icon based on Category could act here if needed, keeping it simple text or simple visual indicator */}
                                                    <span className="text-xl font-bold opacity-30">#</span>
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-sm text-stone-900 dark:text-white">{item}</span>
                                                    <span className="text-xs text-stone-500 font-mono mt-1 block">{group.category}</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 03 Architecture */}
                    {architecture && (
                        <section className="border-b border-stone-200 dark:border-stone-800">
                            <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="md:col-span-3 py-16 border-r border-stone-200 dark:border-stone-800 pr-8">
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 sticky top-8">03 / 아키텍처</h2>
                                </div>
                                <div className="md:col-span-9 py-16 pl-0 md:pl-12">
                                    <div className="relative w-full border border-stone-900 dark:border-white p-2">
                                        {architecture}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 04 Main Tasks */}
                    <section className="border-b border-stone-200 dark:border-stone-800">
                        <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="md:col-span-3 py-16 border-r border-stone-200 dark:border-stone-800 pr-8">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 sticky top-8">04 / 주요 작업</h2>
                            </div>
                            <div className="md:col-span-9">
                                <div className="flex flex-col">
                                    {mainTasks.map((task) => (
                                        <div key={task.title} className="group flex flex-col md:flex-row md:items-baseline justify-between py-10 px-0 md:pl-12 border-b border-stone-100 dark:border-stone-900 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors last:border-0">
                                            <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 md:mb-0 w-1/3">{task.title}</h3>
                                            <p className="text-sm text-stone-600 dark:text-stone-400 w-full md:w-2/3 font-mono break-keep leading-relaxed">{task.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 05 Challenges & Solutions */}
                    <section>
                         <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="md:col-span-3 py-16 border-r border-stone-200 dark:border-stone-800 pr-8">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 sticky top-8">05 / 문제 해결</h2>
                            </div>
                            <div className="md:col-span-9 py-16 pl-0 md:pl-12">
                                <div className="space-y-12">
                                    {challenges.map((challenge) => (
                                        <div key={challenge.problem} className="grid grid-cols-1 md:grid-cols-2 border border-stone-900 dark:border-white">
                                            <div className="p-8 border-b md:border-b-0 md:border-r border-stone-900 dark:border-white bg-stone-50 dark:bg-stone-900">
                                                <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-400">
                                                    <AlertTriangle className="w-4 h-4" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">문제 상황</span>
                                                </div>
                                                <h4 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">{challenge.problem.split(':')[0]}</h4>
                                                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed break-keep">
                                                     {challenge.problem.split(':').slice(1).join(':') || challenge.problem}
                                                </p>
                                            </div>
                                            <div className="p-8">
                                                <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">해결 방안</span>
                                                </div>
                                                <h4 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">{challenge.solution.split(':')[0]}</h4>
                                                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed break-keep">
                                                    {challenge.solution.split(':').slice(1).join(':') || challenge.solution}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="pt-24 pb-12 flex justify-between items-end border-t border-stone-900 dark:border-white mt-16">
                        <div>
                            <p className="text-xs font-mono text-stone-400 mb-2 uppercase tracking-widest">Minimalist Portfolio V2</p>
                            <p className="text-sm font-bold text-stone-900 dark:text-white">© 2024 J. Doe Portfolio</p>
                        </div>
                        <button 
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group flex items-center gap-2 text-sm font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            맨 위로
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </footer>

                </div>
            </main>
        </div>
    );
};
