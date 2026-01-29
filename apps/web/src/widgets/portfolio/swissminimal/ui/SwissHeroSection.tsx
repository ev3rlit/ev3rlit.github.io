"use client";

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/shared/lib/cn';

export const SwissHeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section ref={sectionRef} className="snap-section bg-white dark:bg-stone-950">
            <div className="swiss-grid items-center h-full">
                {/* Left Column - Main Title */}
                <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
                    <div
                        className={cn(
                            "transition-all duration-1000",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="label-text text-stone-500 mb-4 block">
                            서버 개발자
                        </span>
                    </div>

                    <h1
                        className={cn(
                            "heading-massive text-stone-900 dark:text-white transition-all duration-1000 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        호들갑으로
                    </h1>
                    <h1
                        className={cn(
                            "heading-massive text-stone-900 dark:text-white transition-all duration-1000 delay-300",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        완벽을 기하는
                    </h1>

                    <div
                        className={cn(
                            "mt-8 max-w-xl transition-all duration-1000 delay-500",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <p className="body-text text-stone-600 dark:text-stone-400">
                            아직 일어나지 않은 문제까지 미리 대비하는 꼼꼼함으로, 시스템의 안정성을 책임집니다.
                        </p>
                    </div>

                    {/* Keywords */}
                    <div
                        className={cn(
                            "mt-8 flex flex-wrap gap-3 transition-all duration-1000 delay-600",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        {['#Server_Developer', '#Risk_Management', '#System_Stability', '#Golang'].map((tag) => (
                            <span
                                key={tag}
                                className="label-text px-3 py-1 border border-stone-300 dark:border-stone-700 text-stone-500"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right Column - Name & Info */}
                <div className="col-span-12 md:col-span-4 flex flex-col justify-center items-start md:items-end mt-8 md:mt-0">
                    <div
                        className={cn(
                            "transition-all duration-1000 delay-400",
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                        )}
                    >
                        <span className="heading-xl accent-indigo">범들갑</span>
                    </div>

                    <div
                        className={cn(
                            "mt-8 text-right transition-all duration-1000 delay-600",
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                        )}
                    >
                        <div className="label-text text-stone-500 mb-2">이름</div>
                        <div className="heading-md">최범휘 (BeomHwi Choi)</div>
                    </div>

                    <div
                        className={cn(
                            "mt-6 text-right transition-all duration-1000 delay-700",
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                        )}
                    >
                        <div className="label-text text-stone-500 mb-2">주력 분야</div>
                        <div className="heading-md">Backend / Server</div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <span className="label-text text-stone-400">스크롤</span>
                <div className="scroll-line bg-stone-900 dark:bg-white"></div>
            </div>

            {/* Corner Decoration */}
            <div className="absolute top-8 right-8 w-4 h-4 bg-stone-900 dark:bg-white"></div>
            <div className="absolute bottom-8 left-8 w-4 h-4 bg-indigo-600 dark:bg-indigo-400"></div>
        </section>
    );
};
