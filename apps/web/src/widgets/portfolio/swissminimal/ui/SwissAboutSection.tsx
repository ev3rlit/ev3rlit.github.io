"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';

const appealPoints = [
    {
        keyword: 'Risk Assessment',
        title: '선제적 방어',
        description: "동료들이 '범들갑'이라 부르는 꼼꼼함. 발생 가능한 모든 엣지 케이스를 사전에 시뮬레이션하고 방어 코드를 작성합니다."
    },
    {
        keyword: 'Structuring',
        title: '명쾌한 구조화',
        description: "복잡한 비즈니스 로직과 아키텍처를 시각화하여 팀원 모두가 이해할 수 있는 '명확한 설계도'로 변환합니다."
    },
    {
        keyword: 'Ownership',
        title: '경계 없는 해결',
        description: "클라이언트 이슈, 퍼블리셔 장애 등 내 코드의 범위를 벗어난 문제라도 방관하지 않습니다."
    }
];

const values = [
    { label: 'Data Integrity', desc: '보여지는 결과와 실제 처리는 반드시 일치해야 한다' },
    { label: 'Traceability', desc: '추적 불가능한 에러는 죄악이다' },
    { label: 'Efficiency', desc: '개발자의 1시간은 운영팀의 100시간을 아껴야 한다' }
];

export const SwissAboutSection = () => {
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
            <div className="swiss-grid items-center h-full">
                {/* Section Label */}
                <div className="col-span-12 md:col-span-2">
                    <div
                        className={cn(
                            "transition-all duration-700",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="label-text accent-indigo">(01)</span>
                        <span className="label-text text-stone-500 ml-2">소개</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-span-12 md:col-span-5 mt-8 md:mt-0">
                    <h2
                        className={cn(
                            "heading-xl text-stone-900 dark:text-white mb-6 transition-all duration-700 delay-100",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        서비스의 <span className="accent-indigo">안정성</span>을<br />
                        최우선으로 생각하는<br />
                        서버 개발자
                    </h2>

                    <div
                        className={cn(
                            "transition-all duration-700 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <p className="body-text text-stone-600 dark:text-stone-300 max-w-lg">
                            단순히 기능이 동작하는 것을 넘어, 장애가 발생하지 않는 구조를 설계하는 데 집중합니다.
                            이 "호들갑"이 결국 꼼꼼한 Risk Assessment가 되어 시스템의 안정성을 지키는 무기가 됩니다.
                        </p>
                    </div>

                    {/* Values */}
                    <div
                        className={cn(
                            "mt-8 space-y-3 transition-all duration-700 delay-300",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <div className="label-text text-stone-500 mb-3">가치관 (Values)</div>
                        {values.map((v, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 flex-shrink-0"></span>
                                <span className="body-text">
                                    <strong className="text-stone-900 dark:text-white">{v.label}:</strong>{' '}
                                    <span className="text-stone-500">{v.desc}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Appeal Points */}
                <div className="col-span-12 md:col-span-5 mt-8 md:mt-0 md:pl-8">
                    <div className="label-text text-stone-500 mb-6">3가지 핵심 키워드</div>
                    <div className="space-y-6">
                        {appealPoints.map((point, index) => (
                            <div
                                key={point.keyword}
                                className={cn(
                                    "border-l-2 border-indigo-600 dark:border-indigo-400 pl-4 transition-all duration-700",
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                )}
                                style={{ transitionDelay: `${400 + index * 100}ms` }}
                            >
                                <div className="label-text accent-indigo mb-1">0{index + 1} | {point.keyword}</div>
                                <div className="heading-md text-sm mb-2">{point.title}</div>
                                <p className="body-text text-stone-500 text-sm">{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200 dark:bg-stone-800"></div>
        </section>
    );
};
