"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { SwissSectionContainer } from './SwissSectionContainer';

/** "YYYY.MM — YYYY.MM" 형식에서 근무 기간을 계산 */
function calcDuration(period: string): string {
    const match = period.match(/(\d{4})\.(\d{2})\s*—\s*(\d{4})\.(\d{2})/);
    if (!match) return '';
    const [, sy, sm, ey, em] = match.map(Number);
    let months = (ey - sy) * 12 + (em - sm);
    if (months < 0) months = 0;
    const years = Math.floor(months / 12);
    const remaining = months % 12;
    if (years > 0 && remaining > 0) return `${years}년 ${remaining}개월`;
    if (years > 0) return `${years}년`;
    return `${remaining}개월`;
}

const resumeData = {
    profile: {
        name: "최범휘",
        role: "게임 서버 개발자",
        summary: "Golang·C++ 기반 게임 서버를 설계하고, 런칭부터 글로벌 라이브 운영까지 전 사이클을 주도한 3년차 게임 서버 개발자입니다. 게임 서버에서 실시간 처리, 동시성 제어, 무중단 마이그레이션 같은 문제를 풀며 개발의 즐거움을 알게 되었고, 앞으로는 백엔드 전반으로 영역을 넓혀 다양한 도메인에서 성장해 나가고 싶습니다.",
        keywords: ["#꼼꼼함", "#안정지향", "#책임감", "#빈틈없는_대비", "#빠른_학습_및_적응"],
        contact: {
            email: "bum4496@naver.com",
            github: "https://github.com/ev3rlit",
            blog: "https://ev3rlit.github.io/"
        }
    },
    careers: [
        {
            company: '넥써쓰/원유니버스',
            role: '게임 서버 개발자',
            period: '2023.04 — 2025.10',
            projects: [
                {
                    name: '삼국블레이드 키우기',
                    desc: '글로벌 20개국 서비스 방치형 액션 RPG',
                    details: [
                        {
                            group: '게임 서버 설계 및 API 개발',
                            items: [
                                'C++ 서버 개발 경험을 기반으로 Go·MongoDB를 학습하여 6개월 만에 상용 서비스 런칭',
                                'Golang 기반 게임 서버 아키텍처 설계를 주도하여 런칭부터 21개월 무중단 라이브 운영 달성',
                                '트랜잭션+롤백 미들웨어를 설계하여 모든 API에서 데이터 무결성 100% 보장 체계 구축',
                                '커스텀 에러 핸들링 시스템 도입으로 라이브 장애 발생률 90% 감소',
                                'CQRS + Event Sourcing 아키텍처로 연합 금광 컨텐츠 설계·출시, 분산락 기반 동시성 제어 및 데이터 동기화 최적화',
                                '인메모리 캐시 레이어 및 쿼리 최적화로 API 응답 속도 50ms → 5ms 개선',
                                '관리자 페이지 REST API 설계 및 개발',
                            ]
                        },
                        {
                            group: '인프라 운영 및 데이터 마이그레이션',
                            items: [
                                '퍼블리셔 계약 해지 후 AWS → NCP 전체 인프라·데이터 무중단 이관을 2개월 내 완수',
                                '라이브 서비스 중 결제 데이터 10만 건 무중단 마이그레이션 설계 및 실행',
                                'AWS Kinesis 기반 실시간 로그 파이프라인 구축으로 운영 모니터링 체계 확립',
                            ]
                        }
                    ]
                }
            ]
        },
        {
            company: '액션스퀘어',
            role: '게임 서버 개발자 (신입)',
            period: '2022.05 — 2023.04',
            projects: [
                {
                    name: '블레이드 X',
                    desc: '모바일 액션 RPG · C++14 서버',
                    details: [
                        {
                            group: '게임 서버 API 설계 및 개발',
                            items: [
                                '아이템·인벤토리 시스템 스키마 설계 및 API 개발',
                                '범용 보상 지급 시스템 설계 및 개발',
                                '인게임 재화 상점 및 앱 내 실결제 상점 구현',
                                '중복 로그인 사용자 경험 개선: 서버 간 중계를 통한 유저 선택 방식으로 전환',
                            ]
                        },
                        {
                            group: '서버 분석 및 운영 기반 구축',
                            items: [
                                '기존 서버 코어(인증/게임/월드/길드/채팅 5종) 분석 및 구조 문서화',
                                '게임 유저 행동 로그 스키마 설계 및 개발',
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    techStack: [
        { category: '언어', items: 'Golang, C++14' },
        { category: '데이터베이스', items: 'MongoDB, MySQL, Redis' },
        { category: '인프라', items: 'AWS, Naver Cloud Platform, Jenkins' },
        { category: '프레임워크/라이브러리', items: 'Boost.Asio, AWS Kinesis' },
        { category: '도구', items: 'Git, Jira, Confluence' }
    ],
    awards: [
        {
            title: '2020 한국정보기술학회 대학생 논문경진대회',
            award: '동상 (딥러닝 이용 지폐 진위 판별)',
            year: '2020'
        },
        {
            title: '제31회 한글 및 한국어 정보처리 학술대회',
            award: '논문 게시 (문자메시지 분류 애플리케이션 Lettr)',
            year: '2019'
        }
    ],
    education: [
        {
            school: '금오공과대학교',
            major: '컴퓨터소프트웨어공학과',
            period: '2016.03 — 2022.02',
            desc: '학점: 4.06 / 4.5'
        }
    ]
};

export const SwissResumeSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors duration-500 group">
            <SwissSectionContainer>

                {/* Section Header */}
                <div className={cn(
                    "flex items-baseline gap-3 border-b border-stone-200 dark:border-stone-800 pb-4 mb-8 transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    <span className="label-text accent-indigo text-xl">(02)</span>
                    <h2 className="text-xl font-bold text-stone-900 dark:text-white uppercase tracking-widest">
                        이력서
                    </h2>
                </div>

                {/* Profile Bar — 12-column grid aligned with main layout */}
                <div className={cn(
                    "grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-16 pb-8 mb-10 border-b border-stone-100 dark:border-stone-900 transition-all duration-700 delay-100",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    {/* LEFT: Profile Image + Info (8 cols) */}
                    <div className="col-span-12 lg:col-span-8 flex gap-6">
                        {/* Profile Image */}
                        <div className="w-28 md:w-36 lg:w-40 flex-shrink-0 self-stretch overflow-hidden shadow-lg shadow-stone-900/20 dark:shadow-black/40">
                            <img src="/images/portfolio/profile.jpg" alt="프로필 사진" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
                                    {resumeData.profile.name}
                                </h3>
                                <span className="text-lg font-bold text-stone-600 dark:text-stone-300">
                                    {resumeData.profile.role}
                                </span>
                            </div>
                            <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed break-keep">
                                {resumeData.profile.summary}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {resumeData.profile.keywords.map((kw) => (
                                    <span key={kw} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 tracking-wide">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Contact (3 cols, col-start-10 — aligned with sidebar) */}
                    <div className="col-span-12 lg:col-span-3 lg:col-start-10 flex flex-col gap-3">
                        <div>
                            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1 uppercase tracking-wider">Email</h4>
                            <a href={`mailto:${resumeData.profile.contact.email}`}
                                className="font-mono text-base text-stone-800 dark:text-stone-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border-b border-stone-100 dark:border-stone-900 pb-2 block">
                                {resumeData.profile.contact.email}
                            </a>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1 uppercase tracking-wider">GitHub</h4>
                            <a href={resumeData.profile.contact.github}
                                target="_blank" rel="noopener noreferrer"
                                className="font-mono text-base text-stone-800 dark:text-stone-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border-b border-stone-100 dark:border-stone-900 pb-2 block break-all">
                                {resumeData.profile.contact.github}
                            </a>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1 uppercase tracking-wider">Blog</h4>
                            <a href={resumeData.profile.contact.blog}
                                target="_blank" rel="noopener noreferrer"
                                className="font-mono text-base text-stone-800 dark:text-stone-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border-b border-stone-100 dark:border-stone-900 pb-2 block break-all">
                                {resumeData.profile.contact.blog}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Grid: Career (left) + Sidebar (right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-16">

                    {/* LEFT: Career History (8 cols) */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-16">

                        {/* Career Section */}
                        <section className={cn(
                            "transition-all duration-1000 delay-200",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <div className="flex items-center gap-4 mb-10">
                                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                                    업무 경력
                                </h3>
                                <span className="h-px bg-stone-200 dark:bg-stone-800 w-12"></span>
                            </div>

                            <div className="space-y-16">
                                {resumeData.careers.map((career) => (
                                    <div key={career.company}>
                                        {/* Company Header */}
                                        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                            <h4 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
                                                {career.company}
                                            </h4>
                                            <span className="font-mono text-sm font-bold text-stone-400 mt-1 md:mt-0">
                                                {career.period}
                                                <span className="ml-2 text-indigo-500 dark:text-indigo-400">
                                                    ({calcDuration(career.period)})
                                                </span>
                                            </span>
                                        </div>
                                        <p className="text-lg font-bold text-stone-600 dark:text-stone-300 mb-6">
                                            {career.role}
                                        </p>

                                        {/* Projects */}
                                        <div className="space-y-10 pl-4 border-l-2 border-stone-200 dark:border-stone-800">
                                            {career.projects.map((project) => (
                                                <div key={project.name}>
                                                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-3">
                                                        <h5 className="text-lg font-bold text-stone-900 dark:text-white">
                                                            {project.name}
                                                        </h5>
                                                        <span className="text-base text-stone-500 dark:text-stone-400">
                                                            — {project.desc}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-6">
                                                        {project.details.map((detail) => (
                                                            <div key={detail.group}>
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <span className="w-1.5 h-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full flex-shrink-0"></span>
                                                                    <h6 className="text-base font-bold text-stone-800 dark:text-stone-200 tracking-tight">
                                                                        {detail.group}
                                                                    </h6>
                                                                </div>
                                                                <ul className="space-y-2 ml-4">
                                                                    {detail.items.map((item) => (
                                                                        <li key={item} className="flex items-start gap-3 text-base text-stone-600 dark:text-stone-400 leading-relaxed hover:text-stone-900 dark:hover:text-stone-200 transition-colors duration-200">
                                                                            <span className="mt-2.5 w-1 h-1 bg-stone-300 dark:bg-stone-600 rounded-full flex-shrink-0"></span>
                                                                            <span>{item}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education Section */}
                        <section className={cn(
                            "transition-all duration-1000 delay-300",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                                    학력
                                </h3>
                                <span className="h-px bg-stone-200 dark:bg-stone-800 w-8"></span>
                            </div>
                            <div className="space-y-4">
                                {resumeData.education.map((edu) => (
                                    <div key={edu.school} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 pl-4 border-l-2 border-stone-200 dark:border-stone-800">
                                        <h4 className="text-lg font-bold text-stone-900 dark:text-white">{edu.school}</h4>
                                        <p className="text-base text-stone-600 dark:text-stone-400">{edu.major}</p>
                                        <p className="text-sm text-stone-400">{edu.desc}</p>
                                        <span className="flex-grow md:text-right font-mono text-sm font-bold text-stone-300">{edu.period}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT: Sidebar (3 cols, offset 1 for gap) */}
                    <div className="col-span-12 lg:col-span-3 lg:col-start-10 flex flex-col gap-12">

                        {/* Tech Stack */}
                        <div className={cn(
                            "transition-all duration-1000 delay-500",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">
                                기술 스택
                            </h3>
                            <div className="space-y-8">
                                {resumeData.techStack.map((stack) => (
                                    <div key={stack.category}>
                                        <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">
                                            {stack.category}
                                        </h4>
                                        <p className="text-base font-medium text-stone-800 dark:text-stone-300 leading-relaxed border-b border-stone-100 dark:border-stone-900 pb-2">
                                            {stack.items}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Awards */}
                        <section className={cn(
                            "transition-all duration-1000 delay-600",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}>
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest">
                                    수상 내역
                                </h3>
                                <span className="w-full h-px bg-stone-200 dark:bg-stone-800 flex-grow"></span>
                            </div>
                            <div className="space-y-6">
                                {resumeData.awards.map((award) => (
                                    <div key={award.title}>
                                        <div className="font-mono text-xs font-bold text-stone-300 mb-1">{award.year}</div>
                                        <h4 className="text-base font-bold text-stone-900 dark:text-white leading-tight">{award.title}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">{award.award}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Footer */}
                        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-300 font-mono">
                            <p>© 2026 최범휘. All rights reserved.</p>
                        </div>
                    </div>

                </div>

            </SwissSectionContainer>
        </section>
    );
};
