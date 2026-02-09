"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { SwissSectionContainer } from './SwissSectionContainer';

// Icons
const Mail = ({ className }: { className?: string }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const ArrowUpRight = ({ className }: { className?: string }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
);
const Phone = ({ className }: { className?: string }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const Github = ({ className }: { className?: string }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

export const SwissContactSection = () => {
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
        <section ref={sectionRef} className="snap-section bg-white dark:bg-stone-950">
            <SwissSectionContainer className="grid grid-cols-12 gap-6 items-center h-full">
                {/* Section Label */}
                <div className="col-span-12 md:col-span-2">
                    <div
                        className={cn(
                            "transition-all duration-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="label-text accent-indigo">(END)</span>
                        <span className="label-text text-stone-500 ml-2">연락처</span>
                    </div>
                </div>

                {/* Closing Message */}
                <div className="col-span-12 md:col-span-5 mt-8 md:mt-0">
                    <h2
                        className={cn(
                            "heading-xl text-stone-900 dark:text-white mb-6 transition-all duration-700 delay-100",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        함께 만들고,<br />
                        <span className="accent-indigo">함께 성장하고 싶습니다.</span>
                    </h2>

                    <p
                        className={cn(
                            "text-base text-stone-500 dark:text-stone-400 leading-relaxed break-keep transition-all duration-700 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        포트폴리오를 끝까지 읽어주셔서 감사합니다.<br />
                        편하게 연락 주시면 빠르게 답변드리겠습니다.
                    </p>
                </div>

                {/* Contact */}
                <div className="col-span-12 md:col-span-5 mt-8 md:mt-0 md:pl-8">
                    <div
                        className={cn(
                            "transition-all duration-700 delay-300",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-500 mb-6">연락처 정보</div>

                        {/* Phone */}
                        <a
                            href="tel:010-4344-4496"
                            className="group flex items-center gap-4 mb-6 p-4 border border-stone-200 dark:border-stone-700 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 transition-colors"
                        >
                            <Phone className="w-6 h-6" />
                            <div className="flex-1">
                                <div className="label-text text-stone-400 group-hover:text-stone-400 mb-1">연락처</div>
                                <div className="heading-md text-sm">010-4344-4496</div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:bum4496@naver.com"
                            className="group flex items-center gap-4 mb-6 p-4 border border-stone-200 dark:border-stone-700 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 transition-colors"
                        >
                            <Mail className="w-6 h-6" />
                            <div className="flex-1">
                                <div className="label-text text-stone-400 group-hover:text-stone-400 mb-1">이메일</div>
                                <div className="heading-md text-sm">bum4496@naver.com</div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/ev3rlit"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-4 p-4 border border-stone-200 dark:border-stone-700 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 transition-colors"
                        >
                            <Github className="w-6 h-6" />
                            <div className="flex-1">
                                <div className="label-text text-stone-400 group-hover:text-stone-400 mb-1">깃허브</div>
                                <div className="heading-md text-sm">github.com/ev3rlit</div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>
                    </div>
                </div>
            </SwissSectionContainer>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 py-6 border-t border-stone-200 dark:border-stone-800">
                <div className="swiss-grid">
                    <div className="col-span-12 flex justify-between items-center">
                        <span className="label-text text-stone-400">
                            © 2026 최범휘. All rights reserved.
                        </span>
                        <span className="label-text text-stone-400 hidden md:block">
                            스위스 스타일로 디자인됨
                        </span>
                    </div>
                </div>
            </div>

            {/* Corner Decoration */}
            <div className="absolute top-8 right-8 w-4 h-4 bg-indigo-600 dark:bg-indigo-500"></div>
        </section>
    );
};
