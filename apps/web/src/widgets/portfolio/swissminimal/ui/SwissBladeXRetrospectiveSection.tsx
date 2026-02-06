"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { SwissSectionContainer } from './SwissSectionContainer';

const lessons = [
    {
        learned: '에러 추적 체계의 중요성',
        action: '삼국블레이드에서 Error as Value 패턴 1순위로 설계'
    },
    {
        learned: '트랜잭션/롤백 필수',
        action: '삼국블레이드에서 트랜잭션 + 롤백 미들웨어 기본 탑재'
    },
    {
        learned: '주석-먼저 코딩 습관',
        action: 'Pseudo-code First 습관 고안, 지금까지 유지 중'
    },
    {
        learned: '문서화의 가치',
        action: '이후 프로젝트에서 아키텍처 문서화 선행 습관화'
    }
];

export const SwissBladeXRetrospectiveSection = () => {
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
            <SwissSectionContainer className="grid grid-cols-12 gap-6 items-center h-full">
                {/* Section Label */}
                <div className="col-span-12 md:col-span-2">
                    <div
                        className={cn(
                            "transition-all duration-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="label-text accent-indigo">(R.02)</span>
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
                        BladeX에서의 배움
                    </h2>
                    <p
                        className={cn(
                            "body-text text-stone-400 mb-8 transition-all duration-700 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        성공보다 더 값진 실패의 기록 — 그리고 그것이 만든 방법론
                    </p>

                    {/* Quote */}
                    <blockquote
                        className={cn(
                            "border-l-4 border-indigo-600 dark:border-indigo-400 pl-4 mb-10 transition-all duration-700 delay-300",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <p className="heading-md text-sm italic text-stone-300">
                            "BladeX는 실패한 프로젝트지만, 내 개발 철학의 기반을 만든 가장 값진 경험입니다."
                        </p>
                    </blockquote>

                    {/* Lessons Table */}
                    <div
                        className={cn(
                            "transition-all duration-700 delay-400",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lessons.map((l, i) => (
                                <div
                                    key={l.learned}
                                    className="p-4 border border-stone-700 bg-stone-800/50 hover:bg-stone-800 transition-colors"
                                >
                                    <div className="label-text text-stone-500 mb-2">배움 {String(i + 1).padStart(2, '0')}</div>
                                    <div className="heading-md text-sm mb-2 accent-indigo">{l.learned}</div>
                                    <p className="body-text text-stone-400 text-sm">{l.action}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SwissSectionContainer>

            {/* Corner Decoration */}
            <div className="absolute top-8 right-8 w-4 h-4 bg-indigo-600 dark:bg-indigo-500"></div>
        </section>
    );
};
