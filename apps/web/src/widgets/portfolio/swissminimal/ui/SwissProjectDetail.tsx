"use client";

import type React from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUp, Github, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import { SwissNavigation } from './SwissNavigation';
import { ImageLightbox } from '@/shared/ui/ImageLightbox';
import { useSidebarStore } from '@/features/layout/model/useSidebarStore';

const SimpleMarkdown = ({ content }: { content: string }) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Code block
        if (line.startsWith('```')) {
            const lang = line.slice(3).trim();
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            i++; // skip closing ```
            const code = codeLines.join('\n');
            elements.push(
                <div key={`code-${elements.length}`} className="my-4">
                    {lang && <div className="text-sm uppercase tracking-widest text-stone-400 mb-1 font-mono">{lang}</div>}
                    <Highlight theme={themes.oneDark} code={code} language={lang || 'text'}>
                        {({ style, tokens, getLineProps, getTokenProps }) => (
                            <pre className="p-4 overflow-x-auto text-base leading-relaxed border border-stone-700" style={{ ...style, margin: 0 }}>
                                <code>
                                    {tokens.map((line, i) => (
                                        <div key={i} {...getLineProps({ line })}>
                                            {line.map((token, key) => (
                                                <span key={key} {...getTokenProps({ token })} />
                                            ))}
                                        </div>
                                    ))}
                                </code>
                            </pre>
                        )}
                    </Highlight>
                </div>
            );
            continue;
        }

        // H2
        if (line.startsWith('## ')) {
            elements.push(<h3 key={`h2-${elements.length}`} className="text-3xl font-bold text-stone-900 dark:text-white mt-8 mb-3">{line.slice(3)}</h3>);
            i++;
            continue;
        }

        // H3
        if (line.startsWith('### ')) {
            elements.push(<h4 key={`h3-${elements.length}`} className="text-xl font-bold text-stone-900 dark:text-white mt-6 mb-2">{line.slice(4)}</h4>);
            i++;
            continue;
        }

        // Table
        if (line.startsWith('|') && line.endsWith('|')) {
            const tableRows: string[][] = [];
            while (i < lines.length && lines[i].startsWith('|') && lines[i].endsWith('|')) {
                const row = lines[i].split('|').slice(1, -1).map(cell => cell.trim());
                // Skip separator rows (e.g. | --- | --- |)
                if (!row.every(cell => /^-+$/.test(cell) || /^:?-+:?$/.test(cell))) {
                    tableRows.push(row);
                }
                i++;
            }
            if (tableRows.length > 0) {
                const [header, ...body] = tableRows;
                elements.push(
                    <div key={`table-${elements.length}`} className="my-4 overflow-x-auto">
                        <table className="w-full text-lg border-collapse">
                            <thead>
                                <tr className="border-b-2 border-stone-300 dark:border-stone-600">
                                    {header.map((cell, idx) => (
                                        <th key={idx} className="text-left py-2 px-3 font-bold text-stone-900 dark:text-white">{cell}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {body.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="border-b border-stone-200 dark:border-stone-700">
                                        {row.map((cell, cellIdx) => (
                                            <td key={cellIdx} className="py-2 px-3 text-stone-600 dark:text-stone-400">
                                                <InlineMarkdown text={cell} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            }
            continue;
        }

        // Ordered list
        if (/^\d+\.\s/.test(line)) {
            const listItems: string[] = [];
            while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
                listItems.push(lines[i].replace(/^\d+\.\s/, ''));
                i++;
            }
            elements.push(
                <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-1 my-3 text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                    {listItems.map((item, idx) => (
                        <li key={idx} className="break-keep">
                            <InlineMarkdown text={item} />
                        </li>
                    ))}
                </ol>
            );
            continue;
        }

        // Empty line
        if (line.trim() === '') {
            i++;
            continue;
        }

        // Paragraph
        elements.push(
            <p key={`p-${elements.length}`} className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed my-2 break-keep">
                <InlineMarkdown text={line} />
            </p>
        );
        i++;
    }

    return <div className="max-w-3xl">{elements}</div>;
};

const InlineMarkdown = ({ text }: { text: string }) => {
    // Split by **bold** and `code` patterns
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
        <>
            {parts.map((part, idx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={idx} className="font-bold text-stone-900 dark:text-white">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('`') && part.endsWith('`')) {
                    return <code key={idx} className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-base font-mono border border-stone-200 dark:border-stone-700">{part.slice(1, -1)}</code>;
                }
                return <span key={idx}>{part}</span>;
            })}
        </>
    );
};

interface SwissProjectDetailProps {
    projectInfo: {
        number: string; // e.g., "004"
        title: string;
        description: string;
        role: string;
        period: string;
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
    screenshots?: {
        src: string;
        alt: string;
        caption?: string;
    }[];
    architecture?: React.ReactNode; // Flexible: Image or Component
    architectureDescription?: string | (string | { src: string; alt: string; caption?: string })[]; // Markdown blocks + inline images
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
    screenshots,
    architecture,
    architectureDescription,
    mainTasks,
    challenges,
}: SwissProjectDetailProps) => {
    const { setPortfolioMode, setSidebarOpen } = useSidebarStore();
    const pathname = usePathname();
    // /portfolio/gameserver/story/xxx → /portfolio/gameserver
    // /portfolio/story/xxx → /portfolio
    const storyIndex = pathname.indexOf('/story/');
    const basePath = storyIndex !== -1 ? pathname.slice(0, storyIndex) : '/portfolio';

    // 동적 섹션 번호 계산
    const sectionNumbers = (() => {
        let n = 1;
        const nums = {
            overview: String(n++).padStart(2, '0'),
            screenshots: '',
            keywords: '',
            architecture: '',
            mainTasks: '',
            challenges: '',
        };
        if (screenshots && screenshots.length > 0) {
            nums.screenshots = String(n++).padStart(2, '0');
        }
        nums.keywords = String(n++).padStart(2, '0');
        if (architecture) {
            nums.architecture = String(n++).padStart(2, '0');
        }
        nums.mainTasks = String(n++).padStart(2, '0');
        nums.challenges = String(n++).padStart(2, '0');
        return nums;
    })();

    useEffect(() => {
        setPortfolioMode(true);
        setSidebarOpen(false);
        return () => {
            setPortfolioMode(false);
            setSidebarOpen(true);
        };
    }, [setPortfolioMode, setSidebarOpen]);

    return (
        <div className="h-full w-full overflow-y-auto bg-white dark:bg-stone-950 text-stone-900 dark:text-white font-sans selection:bg-stone-900 selection:text-white dark:selection:bg-white dark:selection:text-stone-900">

            <SwissNavigation basePath={basePath} />

            <main className="w-full flex-grow pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">

                    {/* Back to List */}
                    <Link
                        href="/portfolio/features"
                        className="inline-flex items-center gap-2 text-lg font-medium text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>목록으로</span>
                    </Link>

                    {/* Header */}
                    <header className="pt-0 pb-16 border-b border-stone-900 dark:border-white">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-12">
                            <div className="lg:col-span-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-2 py-1 border border-stone-900 dark:border-white text-xs font-mono font-bold uppercase tracking-wider">
                                        Feature #{projectInfo.number}
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
                                <h2 className="text-base font-bold uppercase tracking-widest text-stone-400 sticky top-8">{sectionNumbers.overview} / 개요</h2>
                            </div>
                            <div className="md:col-span-9 py-16 pl-0 md:pl-12">
                                <div className="max-w-3xl">
                                    <p className="text-2xl md:text-3xl leading-tight font-medium text-stone-900 dark:text-white mb-8 break-keep whitespace-pre-line">
                                        {overview.intro}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                                        <div>
                                            <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-stone-900 dark:border-white pb-2 inline-block text-stone-900 dark:text-white">목표</h3>
                                            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed break-keep whitespace-pre-line">
                                                {overview.goals}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-stone-900 dark:border-white pb-2 inline-block text-stone-900 dark:text-white">전략</h3>
                                            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed break-keep whitespace-pre-line">
                                                {overview.strategy}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Screenshots */}
                    {screenshots && screenshots.length > 0 && (
                        <section className="border-b border-stone-200 dark:border-stone-800">
                            <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="md:col-span-3 py-16 border-r border-stone-200 dark:border-stone-800 pr-8">
                                    <h2 className="text-base font-bold uppercase tracking-widest text-stone-400 sticky top-8">{sectionNumbers.screenshots} / 화면</h2>
                                </div>
                                <div className="md:col-span-9 py-16 pl-0 md:pl-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {screenshots.map((screenshot, idx) => (
                                            <figure key={idx}>
                                                <div className="relative w-full border border-stone-200 dark:border-stone-700 overflow-hidden">
                                                    <ImageLightbox src={screenshot.src} alt={screenshot.alt} />
                                                </div>
                                                {screenshot.caption && (
                                                    <figcaption className="mt-3 text-sm font-mono text-stone-500 dark:text-stone-400">
                                                        {screenshot.caption}
                                                    </figcaption>
                                                )}
                                            </figure>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Keywords (Tech Stack + Others) */}
                    <section className="border-b border-stone-200 dark:border-stone-800">
                        <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="md:col-span-3 py-16 border-r border-stone-200 dark:border-stone-800 pr-8">
                                <h2 className="text-base font-bold uppercase tracking-widest text-stone-400 sticky top-8">{sectionNumbers.keywords} / 키워드 & 기술</h2>
                            </div>
                            <div className="md:col-span-9 py-16 pl-0 md:pl-12">
                                <div className="max-w-3xl space-y-6">
                                    {keywords.map((group) => (
                                        <div key={group.category} className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                                            <span className="text-base font-bold uppercase tracking-widest text-stone-400 w-24 shrink-0 font-mono">{group.category}</span>
                                            <span className="w-px h-4 bg-stone-200 dark:bg-stone-700 shrink-0" />
                                            {group.items.map((item) => (
                                                <span
                                                    key={`${group.category}-${item}`}
                                                    className="px-3 py-1 text-lg font-medium border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white hover:border-stone-900 dark:hover:border-white hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 transition-colors cursor-default"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 03 Architecture */}
                    {architecture && (
                        <section className="border-b border-stone-200 dark:border-stone-800">
                            <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="md:col-span-3 py-16 border-r border-stone-200 dark:border-stone-800 pr-8">
                                    <h2 className="text-base font-bold uppercase tracking-widest text-stone-400 sticky top-8">{sectionNumbers.architecture} / 아키텍처</h2>
                                </div>
                                <div className="md:col-span-9 py-16 pl-0 md:pl-12">
                                    <div className="relative w-full border border-stone-900 dark:border-white p-2">
                                        {architecture}
                                    </div>
                                    {architectureDescription && (
                                        <div className="mt-12">
                                            {typeof architectureDescription === 'string' ? (
                                                <SimpleMarkdown content={architectureDescription} />
                                            ) : (
                                                architectureDescription.map((block, idx) =>
                                                    typeof block === 'string' ? (
                                                        <SimpleMarkdown key={idx} content={block} />
                                                    ) : (
                                                        <figure key={idx} className="my-8">
                                                            <div className="relative w-full border border-stone-200 dark:border-stone-700 overflow-hidden">
                                                                <ImageLightbox src={block.src} alt={block.alt} />
                                                            </div>
                                                            {block.caption && (
                                                                <figcaption className="mt-3 text-sm font-mono text-stone-500 dark:text-stone-400">
                                                                    {block.caption}
                                                                </figcaption>
                                                            )}
                                                        </figure>
                                                    )
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 04 Main Tasks */}
                    <section className="border-b border-stone-200 dark:border-stone-800">
                        <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="md:col-span-3 py-16 border-r border-stone-200 dark:border-stone-800 pr-8">
                                <h2 className="text-base font-bold uppercase tracking-widest text-stone-400 sticky top-8">{sectionNumbers.mainTasks} / 주요 작업</h2>
                            </div>
                            <div className="md:col-span-9">
                                <div className="flex flex-col">
                                    {mainTasks.map((task) => (
                                        <div key={task.title} className="group flex flex-col md:flex-row md:items-baseline justify-between py-10 px-0 md:pl-12 border-b border-stone-100 dark:border-stone-900 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors last:border-0">
                                            <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 md:mb-0 w-1/3">{task.title}</h3>
                                            <p className="text-lg text-stone-600 dark:text-stone-400 w-full md:w-2/3 font-mono break-keep leading-relaxed">{task.description}</p>
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
                                <h2 className="text-base font-bold uppercase tracking-widest text-stone-400 sticky top-8">{sectionNumbers.challenges} / 문제 해결</h2>
                            </div>
                            <div className="md:col-span-9 py-16 pl-0 md:pl-12">
                                <div className="space-y-12">
                                    {challenges.map((challenge) => (
                                        <div key={challenge.problem} className="grid grid-cols-1 md:grid-cols-2 border border-stone-900 dark:border-white">
                                            <div className="p-8 border-b md:border-b-0 md:border-r border-stone-900 dark:border-white bg-stone-50 dark:bg-stone-900">
                                                <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-400">
                                                    <AlertTriangle className="w-4 h-4" />
                                                    <span className="text-base font-bold uppercase tracking-wider">문제 상황</span>
                                                </div>
                                                <h4 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">{challenge.problem.split(':')[0]}</h4>
                                                <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed break-keep">
                                                     {challenge.problem.split(':').slice(1).join(':') || challenge.problem}
                                                </p>
                                            </div>
                                            <div className="p-8">
                                                <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span className="text-base font-bold uppercase tracking-wider">해결 방안</span>
                                                </div>
                                                <h4 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">{challenge.solution.split(':')[0]}</h4>
                                                <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed break-keep">
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
                            <p className="text-xs font-mono text-stone-400 mb-2 uppercase tracking-widest">Swiss Minimal Portfolio</p>
                            <p className="text-sm font-bold text-stone-900 dark:text-white">© 2026 최범휘. All rights reserved.</p>
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
