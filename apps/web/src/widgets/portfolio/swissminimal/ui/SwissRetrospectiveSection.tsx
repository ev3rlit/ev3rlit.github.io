"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';

interface ListItem {
    title: string;
    items: string[];
}

interface SwissRetrospectiveSectionProps {
    sectionLabel: string;
    title: string;
    subtitle: string;
    quote: string;
    evolution: ListItem;
    techDebt: ListItem;
    lesson?: ListItem;
}

export const SwissRetrospectiveSection = ({
    sectionLabel,
    title,
    subtitle,
    quote,
    evolution,
    techDebt,
    lesson
}: SwissRetrospectiveSectionProps) => {
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
        <section ref={sectionRef} className="snap-section bg-stone-900 text-white dark:bg-stone-950">
            <div className="swiss-grid items-center h-full">
                {/* Section Label */}
                <div className="col-span-12 md:col-span-2">
                    <div
                        className={cn(
                            "transition-all duration-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="label-text accent-indigo">{sectionLabel}</span>
                        <span className="label-text text-stone-500 ml-2">회고</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-span-12 md:col-span-10 mt-8 md:mt-0">
                    <h2
                        className={cn(
                            "heading-lg mb-2 transition-all duration-700 delay-100",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        {title}
                    </h2>
                    <p
                        className={cn(
                            "body-text text-stone-400 mb-8 transition-all duration-700 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        {subtitle}
                    </p>

                    {/* Quote */}
                    <blockquote
                        className={cn(
                            "border-l-4 border-indigo-600 dark:border-indigo-400 pl-4 mb-10 transition-all duration-700 delay-300",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <p className="heading-md text-sm italic text-stone-300">"{quote}"</p>
                    </blockquote>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Evolution */}
                        <div
                            className={cn(
                                "transition-all duration-700 delay-400",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            <div className="label-text accent-indigo mb-4">{evolution.title}</div>
                            <ul className="space-y-3">
                                {evolution.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-indigo-500 mt-2 flex-shrink-0"></span>
                                        <span className="body-text text-stone-300 text-sm" dangerouslySetInnerHTML={{ __html: item }}></span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tech Debt */}
                        <div
                            className={cn(
                                "transition-all duration-700 delay-500",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            <div className="label-text text-yellow-500 mb-4">{techDebt.title}</div>
                            <ul className="space-y-3">
                                {techDebt.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-yellow-500 mt-2 flex-shrink-0"></span>
                                        <span className="body-text text-stone-400 text-sm" dangerouslySetInnerHTML={{ __html: item }}></span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Lesson */}
                        {lesson && (
                            <div
                                className={cn(
                                    "transition-all duration-700 delay-600",
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                )}
                            >
                                <div className="label-text text-stone-500 mb-4">{lesson.title}</div>
                                <ul className="space-y-3">
                                    {lesson.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 bg-stone-500 mt-2 flex-shrink-0"></span>
                                            <span className="body-text text-stone-400 text-sm" dangerouslySetInnerHTML={{ __html: item }}></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Corner Decoration */}
            <div className="absolute top-8 right-8 w-4 h-4 bg-indigo-600 dark:bg-indigo-500"></div>
        </section>
    );
};
