"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/shared/lib/cn';
import { SwissSectionContainer } from './SwissSectionContainer';

interface SwissFeatureSummaryProps {
    sectionNumber: string;
    storyNumber: string;
    keyword: string;
    title: string;
    subtitle: string;

    // 7-Step Structure
    step01_intro: string;
    step02_background: string | string[];
    step03_problem: string | string[];
    step03_solution: string;
    step04_action: string;
    step05_result: string | string[];
    step06_performance: string;
    step07_capability: string;
    storyId: string;
    kpiList?: { label: string; value: string }[];
}

const SwissKPI = ({ label, value }: { label: string; value: string }) => (
    <div>
        <span className="block text-4xl md:text-5xl font-bold tracking-tighter text-stone-900 dark:text-white">
            {value}
        </span>
        <span className="mt-2 block text-xs text-stone-500 uppercase font-mono tracking-widest border-t border-stone-200 dark:border-stone-800 pt-2">
            {label}
        </span>
    </div>
);

export const SwissFeatureSummary = ({
    sectionNumber,
    storyNumber,
    keyword,
    title,
    step01_intro,
    step02_background,
    step03_problem,
    step03_solution,
    step04_action,
    step05_result,
    step06_performance,
    step07_capability,
    storyId,
    kpiList,
}: SwissFeatureSummaryProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    // /portfolio/backend-gameduo → /portfolio/backend-gameduo, /portfolio/gameserver → /portfolio/gameserver, /portfolio → /portfolio
    const portfolioMatch = pathname.match(/^(\/portfolio\/[^/]+)/);
    const basePath = portfolioMatch ? portfolioMatch[1] : '/portfolio';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="snap-section bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors duration-500 group">
            <SwissSectionContainer className="flex flex-col h-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-8 h-full">
                    {/* Left Column - Sticky Info */}
                    <div className="lg:col-span-5 flex flex-col h-full lg:sticky lg:top-40 lg:self-start justify-center">
                        <div className="mb-4">
                            <div className={cn(
                                "flex items-center gap-4 mb-4 transition-all duration-700",
                                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                            )}>
                                <span className="text-xs font-mono font-bold uppercase tracking-wider bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-2 py-1">
                                    스토리 {storyNumber}
                                </span>
                                <span className="h-px bg-stone-900 dark:bg-white flex-grow"></span>
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                                    ({sectionNumber})
                                </span>
                            </div>

                            <h2 className={cn(
                                "heading-xl mb-4 group-hover:translate-x-2 transition-all duration-300 text-stone-900 dark:text-white",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}>
                                {title}
                            </h2>

                            <div className={cn(
                                "flex flex-wrap gap-2 text-sm font-mono text-stone-600 dark:text-stone-400 mb-12 transition-all duration-700 delay-100",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}>
                                <span className="text-indigo-700 dark:text-indigo-400 font-bold">{keyword}</span>
                            </div>

                            <div className="space-y-14">
                                <div className={cn(
                                    "transition-all duration-700 delay-200",
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                )}>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-700 pb-1">
                                        01 프로젝트 개요
                                    </h3>
                                    <p className="heading-lg font-bold leading-tight text-stone-900 dark:text-white">
                                        {step01_intro}
                                    </p>
                                </div>

                                <div className={cn(
                                    "transition-all duration-700 delay-300",
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                )}>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-700 pb-1">
                                        02 배경 및 문제점
                                    </h3>
                                    <div className="space-y-3">
                                        {Array.isArray(step02_background) ? (
                                            <ul className="list-disc list-outside pl-4 space-y-1.5">
                                                {step02_background.map((item, i) => (
                                                    <li key={i} className="body-text text-stone-700 dark:text-stone-300 leading-relaxed font-medium">{item}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="body-text text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-medium">
                                                {step02_background}
                                            </p>
                                        )}
                                        {Array.isArray(step03_problem) ? (
                                            <ul className="list-disc list-outside pl-4 space-y-1.5">
                                                {step03_problem.map((item, i) => (
                                                    <li key={i} className="body-text text-stone-700 dark:text-stone-300 leading-relaxed font-medium">{item}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="body-text text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-medium">
                                                {step03_problem}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Link Placeholder */}
                        <div className={cn(
                            "mt-auto hidden lg:block pt-4 border-t border-stone-200 dark:border-stone-800 transition-all duration-700 delay-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                             <Link href={`${basePath}/story/${storyId}`} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-stone-900 dark:hover:border-white pb-1 transition-all cursor-pointer text-stone-500 hover:text-stone-900 dark:hover:text-white">
                                상세 스토리 보기 <span className="text-lg">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-7 flex flex-col h-full justify-between border-t lg:border-t-0 border-stone-200 dark:border-stone-800 lg:border-l lg:pl-16 pb-2">
                        
                        {/* Solution & Action */}
                        <div className={cn(
                            "py-10 lg:pt-0 border-b border-stone-200 dark:border-stone-800 transition-all duration-700 delay-400",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-400 mb-4">
                                03 해결책 및 04 액션
                            </h3>
                            <p className="heading-lg font-normal text-stone-900 dark:text-white leading-tight tracking-tight mb-4">
                                {step03_solution}
                            </p>
                            <div className="body-text text-stone-700 dark:text-stone-300 leading-relaxed">
                                <p>{step04_action}</p>
                            </div>
                        </div>

                        {/* Quantitative Performance */}
                        <div className={cn(
                            "py-10 border-b border-stone-200 dark:border-stone-800 transition-all duration-700 delay-500",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-5">
                                {kpiList && kpiList.length > 0 ? "05 정량적 성과" : "05 정성적 평가"}
                            </h3>
                            {kpiList && kpiList.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {kpiList.map((kpi, idx) => (
                                        <SwissKPI key={`${kpi.label}-${idx}`} value={kpi.value} label={kpi.label} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 bg-stone-100 dark:bg-stone-900 border-l-4 border-stone-400 dark:border-stone-600">
                                    <p className="heading-md font-medium leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-line">
                                        {step06_performance}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Detailed Performance */}
                        <div className={cn(
                            "py-10 border-b border-stone-200 dark:border-stone-800 transition-all duration-700 delay-600",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-5">
                                06 상세 성과
                            </h3>
                            <div className="p-3 bg-stone-100 dark:bg-stone-900 border border-transparent hover:border-stone-300 dark:hover:border-stone-700 transition-colors">
                                {Array.isArray(step05_result) ? (
                                    <ul className="list-disc list-outside pl-4 space-y-1.5">
                                        {step05_result.map((item, i) => (
                                            <li key={i} className="body-text text-stone-800 dark:text-stone-200 leading-relaxed font-medium">{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="body-text text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line font-medium">
                                        {step05_result}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Contribution */}
                        <div className={cn(
                            "py-10 lg:pb-0 transition-all duration-700 delay-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-400 mb-4">
                                07 입사 시 기여점
                            </h3>
                            <div className="border-l-4 border-stone-900 dark:border-white pl-4 py-2 bg-stone-50 dark:bg-stone-900">
                                <p className="heading-md text-stone-900 dark:text-white font-semibold leading-relaxed">
                                    "{step07_capability}"
                                </p>
                            </div>
                        </div>

                        {/* Mobile Link */}
                         <div className={cn(
                            "mt-12 lg:hidden transition-all duration-700 delay-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <Link href={`${basePath}/story/${storyId}`} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-stone-900 dark:border-white pb-1">
                                상세 스토리 보기 <span className="text-lg">→</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </SwissSectionContainer>
        </section>
    );
};
