"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/shared/lib/cn';

interface SwissStorySectionProps {
    sectionNumber: string;
    storyNumber: string;
    keyword: string;
    title: string;
    subtitle: string;

    // 7-Step Structure
    step01_intro: string;
    step02_background: string;
    step03_problem: string;
    step03_solution: string;
    step04_action: string;
    step05_result: string;
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

export const SwissStorySection = ({
    sectionNumber,
    storyNumber,
    keyword,
    title,
    subtitle,
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
}: SwissStorySectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

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
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-16">
                    {/* Left Column - Sticky Info */}
                    <div className="lg:col-span-5 flex flex-col h-full lg:sticky lg:top-32 lg:self-start">
                        <div className="mb-8">
                            <div className={cn(
                                "flex items-center gap-4 mb-6 transition-all duration-700",
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
                                "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-4 group-hover:translate-x-2 transition-all duration-300 text-stone-900 dark:text-white",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}>
                                {title}
                            </h2>

                            <div className={cn(
                                "flex flex-wrap gap-3 text-sm font-mono text-stone-600 dark:text-stone-400 mb-8 transition-all duration-700 delay-100",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}>
                                <span className="text-indigo-700 dark:text-indigo-400 font-bold">{keyword}</span>
                            </div>

                            <div className="space-y-12">
                                <div className={cn(
                                    "transition-all duration-700 delay-200",
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                )}>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-700 pb-2">
                                        01 프로젝트 개요
                                    </h3>
                                    <p className="text-xl md:text-2xl font-bold leading-relaxed text-stone-900 dark:text-white">
                                        {step01_intro}
                                    </p>
                                </div>

                                <div className={cn(
                                    "transition-all duration-700 delay-300",
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                )}>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-700 pb-2">
                                        02 배경 및 문제점
                                    </h3>
                                    <div className="space-y-4">
                                        <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-medium">
                                            {step02_background}
                                        </p>
                                        <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-medium">
                                            {step03_problem}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Link Placeholder */}
                        <div className={cn(
                            "mt-auto hidden lg:block pt-8 border-t border-stone-200 dark:border-stone-800 transition-all duration-700 delay-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                             <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-stone-900 dark:hover:border-white pb-1 transition-all cursor-pointer text-stone-500 hover:text-stone-900 dark:hover:text-white">
                                상세 스토리 보기 <span className="text-lg">→</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-7 flex flex-col border-t lg:border-t-0 border-stone-200 dark:border-stone-800 lg:border-l lg:pl-16">
                        
                        {/* Solution & Action */}
                        <div className={cn(
                            "py-8 lg:pt-0 border-b border-stone-200 dark:border-stone-800 transition-all duration-700 delay-400",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-400 mb-4">
                                03 해결책 및 04 액션
                            </h3>
                            <p className="text-2xl md:text-3xl font-normal text-stone-900 dark:text-white leading-tight tracking-tight mb-6">
                                {step03_solution}
                            </p>
                            <div className="text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                                <p>{step04_action}</p>
                            </div>
                        </div>

                        {/* Quantitative Performance */}
                        <div className={cn(
                            "py-10 border-b border-stone-200 dark:border-stone-800 transition-all duration-700 delay-500",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-6">
                                05 정량적 성과
                            </h3>
                            {kpiList && kpiList.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {kpiList.map((kpi, idx) => (
                                        <SwissKPI key={`${kpi.label}-${idx}`} value={kpi.value} label={kpi.label} />
                                    ))}
                                </div>
                            ) : (
                                <div className="block text-4xl md:text-5xl font-bold tracking-tighter text-stone-900 dark:text-white">
                                    {step06_performance}
                                </div>
                            )}
                        </div>

                        {/* Detailed Performance */}
                        <div className={cn(
                            "py-10 border-b border-stone-200 dark:border-stone-800 transition-all duration-700 delay-600",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-6">
                                06 상세 성과
                            </h3>
                            <div className="p-4 bg-stone-100 dark:bg-stone-900 border border-transparent hover:border-stone-300 dark:hover:border-stone-700 transition-colors">
                                <p className="text-base text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line font-medium">
                                    {step05_result}
                                </p>
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
                            <div className="border-l-4 border-stone-900 dark:border-white pl-6 py-2 bg-stone-50 dark:bg-stone-900">
                                <p className="text-xl text-stone-900 dark:text-white font-semibold leading-relaxed">
                                    "{step07_capability}"
                                </p>
                            </div>
                        </div>

                        {/* Mobile Link */}
                         <div className={cn(
                            "mt-12 lg:hidden transition-all duration-700 delay-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-stone-900 dark:border-white pb-1">
                                상세 스토리 보기 <span className="text-lg">→</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
