"use client";

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { SwissSectionContainer } from './SwissSectionContainer';

// --- Types ---

interface AboutCard {
    headline: string;
    desc: string;
}

interface SwissAboutSectionProps {
    sectionNumber?: string;
    headline?: ReactNode;
    name?: string;
    role?: string;

    philosophy?: string;

    cards?: AboutCard[];

    motivation?: {
        title?: string;
        content: ReactNode;
    };
}

// --- Default Data ---

const defaultCards: AboutCard[] = [
    {
        headline: '구조로 팀을 움직인다',
        desc: '혼자 잘하는 코드보다 팀 전체가 생산적으로 일할 수 있는 구조를 먼저 고민합니다. 동료가 핵심 업무에만 집중할 수 있는 환경을 만드는 것이 제 역할입니다.',
    },
    {
        headline: '경계 없는 오너십',
        desc: '"내 담당이 아닌데요"라는 말 대신 서비스 정상화를 최우선으로 둡니다. 다른 직군에서 발생한 긴급 장애도, 제가 해결할 수 있는 방법이 있다면 먼저 나서서 해결합니다.',
    },
    {
        headline: '실패를 성장으로 바꾸는 습관',
        desc: '첫 프로젝트의 실패를 끝까지 복기하며 "왜 안 됐는지"를 파고들었고, 그 교훈을 다음 프로젝트의 성공 기반으로 삼았습니다. 실패를 빠르게 인식하고, 원인을 학습하고, 반드시 개선하는 반복이 저를 성장시킵니다.',
    },
];

// --- Component ---

export const SwissAboutSection = ({
    sectionNumber = "소개",
    headline = "실패를 끝까지 파고들어 성장으로 만드는 개발자",
    name = "최범휘",
    role = "백엔드 개발자",

    philosophy = "복잡한 구조보다 단순하고 명확한 설계를 지향합니다. 좋은 아키텍처는 혼자 잘 짜는 코드가 아니라, 팀 전체가 생산적으로 일할 수 있게 만드는 구조라고 믿습니다.",

    cards = defaultCards,

    motivation,
}: SwissAboutSectionProps) => {
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
        <section ref={sectionRef} className="snap-section bg-white dark:bg-stone-950 overflow-hidden">
            <SwissSectionContainer className="flex flex-col justify-center h-full">

                {/* ── Row 1: Headline ── */}
                <div className={cn(
                    "flex justify-between items-end border-b border-stone-200 dark:border-stone-800 pb-5 mb-6 transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    <div>
                        <h2 className="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase text-sm mb-3">
                            {sectionNumber}
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-black text-stone-900 dark:text-white tracking-tight break-keep">
                            {headline}
                        </h3>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="font-bold text-stone-900 dark:text-white uppercase">{name}</p>
                        <p className="text-sm text-stone-500 dark:text-stone-400 font-mono">{role}</p>
                    </div>
                </div>

                {/* ── Row 2: Philosophy ── */}
                <div className={cn(
                    "border-b border-stone-100 dark:border-stone-800 pb-5 mb-6 transition-all duration-700 delay-100",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    <span className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase mb-2 block">
                        개발 철학
                    </span>
                    <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed font-medium break-keep">
                        {philosophy}
                    </p>
                </div>

                {/* ── Row 3: About Cards (3-col grid) ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                    {cards.map((card, idx) => (
                        <div
                            key={card.headline}
                            className={cn(
                                "border border-stone-200 dark:border-stone-700 p-5 flex flex-col transition-all duration-700",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}
                            style={{ transitionDelay: `${200 + idx * 120}ms` }}
                        >
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono mb-3">
                                0{idx + 1}
                            </span>
                            <h4 className="text-base font-black text-stone-900 dark:text-white tracking-tight mb-3 break-keep">
                                {card.headline}
                            </h4>
                            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed break-keep">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ── Row 4: 지원 동기 ── */}
                <div className={cn(
                    "bg-stone-900 dark:bg-stone-800 text-white p-6 transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                    style={{ transitionDelay: '600ms' }}
                >
                    {motivation ? (
                        <>
                            <span className="text-lg font-bold text-indigo-400 uppercase mb-2 block">
                                {motivation.title || "지원 동기"}
                            </span>
                            <div className="text-base text-white leading-relaxed break-keep">
                                {motivation.content}
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="text-sm font-bold text-white/50 uppercase mb-2 block">
                                지원 동기
                            </span>
                            <p className="text-base text-white/80 leading-relaxed break-keep">
                                좋은 개발자는 혼자 잘하는 것이 아니라, 팀 전체가 더 나은 코드를 더 빠르게 작성할 수 있게 만드는 사람이라고 믿습니다.
                                그동안 쌓아온 안정적인 서비스 운영 경험과 팀 생산성을 높이는 설계 역량을 바탕으로, 함께 성장할 수 있는 팀에서 실질적인 가치를 만들고 싶습니다.
                            </p>
                        </>
                    )}
                </div>

            </SwissSectionContainer>
        </section>
    );
};
