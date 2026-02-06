"use client";

import { useEffect, useRef, useState } from 'react';
import { SwissSectionContainer } from './SwissSectionContainer';

import { cn } from '@/shared/lib/cn';

interface Metric {
    label: string;
    value: string;
}

interface SwissProjectIntroSectionProps {
    sectionNumber: string;
    projectName: string;
    period: string;
    role: string;
    genre: string;
    engine: string;
    metrics?: Metric[];
    description: string;
    contribution: string;
    onDetailClick?: () => void;
}

export const SwissProjectIntroSection = ({
    sectionNumber,
    projectName,
    period,
    role,
    genre,
    engine,
    metrics,
    description,
    contribution,
    onDetailClick
}: SwissProjectIntroSectionProps) => {
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
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="snap-section bg-stone-50 dark:bg-stone-900">
            <SwissSectionContainer className="grid grid-cols-12 gap-6 items-center h-full">
                {/* Section Label */}
                <div className="col-span-12 md:col-span-2">
                    <div
                        className={cn(
                            "transition-all duration-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="label-text accent-indigo">({sectionNumber})</span>
                        <span className="label-text text-stone-500 ml-2">프로젝트</span>
                    </div>
                </div>

                {/* Project Info */}
                <div className="col-span-12 md:col-span-6 mt-8 md:mt-0">
                    <h2
                        className={cn(
                            "heading-xl text-stone-900 dark:text-white mb-4 transition-all duration-700 delay-100",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        {projectName}
                    </h2>

                    <div
                        className={cn(
                            "flex flex-wrap gap-4 mb-6 transition-all duration-700 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div>
                            <div className="label-text text-stone-400 mb-1">기간</div>
                            <div className="body-text">{period}</div>
                        </div>
                        <div>
                            <div className="label-text text-stone-400 mb-1">역할</div>
                            <div className="body-text">{role}</div>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "flex flex-wrap gap-4 mb-8 transition-all duration-700 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div>
                            <div className="label-text text-stone-400 mb-1">장르</div>
                            <div className="body-text">{genre}</div>
                        </div>
                        <div>
                            <div className="label-text text-stone-400 mb-1">엔진</div>
                            <div className="body-text">{engine}</div>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "transition-all duration-700 delay-300",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <p className="body-text text-stone-600 dark:text-stone-300 max-w-lg">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Metrics & Contribution */}
                <div className="col-span-12 md:col-span-4 mt-8 md:mt-0 md:pl-8">
                    {/* Metrics */}
                    {metrics && metrics.length > 0 && (
                        <div
                            className={cn(
                                "mb-10 transition-all duration-700 delay-400",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            <div className="label-text text-stone-500 mb-4">주요 성과</div>
                            <div className="space-y-4">
                                {metrics.map((m) => (
                                    <div key={m.label} className="flex justify-between items-center border-b border-stone-200 dark:border-stone-700 pb-2">
                                        <span className="label-text text-stone-400">{m.label}</span>
                                        <span className="heading-md accent-indigo">{m.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contribution */}
                    <div
                        className={cn(
                            "transition-all duration-700 delay-500",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-500 mb-4">나의 기여</div>
                        <p className="body-text text-stone-600 dark:text-stone-300 mb-8">
                            {contribution}
                        </p>

                        {onDetailClick && (
                            <button
                                type="button"
                                onClick={onDetailClick}
                                className="group flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors rounded-full"
                            >
                                <span className="text-sm font-bold uppercase tracking-wider">기술 상세보기</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                                    <title>상세보기 화살표</title>
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </SwissSectionContainer>

            {/* Decorative Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200 dark:bg-stone-800"></div>
        </section>
    );
};
