"use client";

import { useEffect, useRef, useState } from 'react';
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
}

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
    step07_capability
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
        <section ref={sectionRef} className="snap-section bg-white dark:bg-stone-950">
            <div className="swiss-grid items-start h-full py-16 overflow-y-auto">
                {/* Header */}
                <div className="col-span-12 flex justify-between items-start mb-8">
                    <div
                        className={cn(
                            "transition-all duration-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="label-text accent-indigo">({sectionNumber})</span>
                        <span className="label-text text-stone-500 ml-2">스토리 {storyNumber}</span>
                    </div>
                    <div
                        className={cn(
                            "transition-all duration-700 delay-100",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="label-text accent-indigo">{keyword}</span>
                    </div>
                </div>

                {/* Title */}
                <div className="col-span-12 mb-8">
                    <h2
                        className={cn(
                            "heading-lg text-stone-900 dark:text-white mb-2 transition-all duration-700 delay-100",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        {title}
                    </h2>
                    <p
                        className={cn(
                            "body-text text-stone-500 transition-all duration-700 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        {subtitle}
                    </p>
                </div>

                {/* Left Column - Problem & Solution */}
                <div className="col-span-12 md:col-span-6">
                    {/* Step 01 & 02 */}
                    <div
                        className={cn(
                            "mb-6 transition-all duration-700 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-400 mb-2">01 프로젝트 소개</div>
                        <p className="body-text text-stone-600 dark:text-stone-300">{step01_intro}</p>
                    </div>

                    <div
                        className={cn(
                            "mb-6 transition-all duration-700 delay-300",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-400 mb-2">02 배경</div>
                        <p className="body-text text-stone-600 dark:text-stone-300">{step02_background}</p>
                    </div>

                    {/* Step 03 */}
                    <div
                        className={cn(
                            "mb-6 transition-all duration-700 delay-400",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-400 mb-2">03 문제 → 해결</div>
                        <div className="space-y-3 border-l-2 border-indigo-600 dark:border-indigo-400 pl-4">
                            <div>
                                <span className="label-text text-stone-500">문제:</span>
                                <p className="body-text text-stone-600 dark:text-stone-300">{step03_problem}</p>
                            </div>
                            <div>
                                <span className="label-text accent-indigo">해결:</span>
                                <p className="body-text text-stone-600 dark:text-stone-300">{step03_solution}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Action & Result */}
                <div className="col-span-12 md:col-span-6 md:pl-8">
                    {/* Step 04 */}
                    <div
                        className={cn(
                            "mb-6 transition-all duration-700 delay-500",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-400 mb-2">04 나의 액션</div>
                        <p className="body-text text-stone-600 dark:text-stone-300">{step04_action}</p>
                    </div>

                    {/* Step 05 */}
                    <div
                        className={cn(
                            "mb-6 transition-all duration-700 delay-600",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-400 mb-2">05 결과물</div>
                        <p className="body-text text-stone-600 dark:text-stone-300">{step05_result}</p>
                    </div>

                    {/* Step 06 */}
                    <div
                        className={cn(
                            "mb-6 transition-all duration-700 delay-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text accent-indigo mb-2">06 성과</div>
                        <p className="body-text text-stone-900 dark:text-white font-medium">{step06_performance}</p>
                    </div>

                    {/* Step 07 */}
                    <div
                        className={cn(
                            "p-4 bg-stone-50 dark:bg-stone-900 transition-all duration-700 delay-800",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-400 mb-2">07 입사 시 기여점</div>
                        <p className="body-text text-stone-600 dark:text-stone-300">{step07_capability}</p>
                    </div>
                </div>
            </div>

            {/* Decorative */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200 dark:bg-stone-800"></div>
        </section>
    );
};
