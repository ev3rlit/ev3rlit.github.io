"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { SwissSectionContainer } from "./SwissSectionContainer";

// --- Data ---

interface Phase {
	number: number;
	period: string;
	title: string;
	capability: string;
	color: string;
	dotColor: string;
	borderColor: string;
	highlights: string[];
}

const phases: Phase[] = [
	{
		number: 1,
		period: "2023.04 — 2023.10",
		title: "새로운 패러다임 수용",
		capability: "기술 스택 전환",
		color: "text-indigo-600 dark:text-indigo-400",
		dotColor: "bg-indigo-500 border-indigo-500",
		borderColor: "hover:border-indigo-500",
		highlights: [
			"C++ → Go, MySQL → MongoDB 패러다임 전환",
			"WebSocket RPC 기반 마이크로서비스 아키텍처 직접 설계",
			"핸들러 라우팅 시스템, 인메모리 트랜잭션 시스템 구현",
			"학습과 실무 병행 → 6개월 만에 상용 서비스 출시",
		],
	},
	{
		number: 2,
		period: "2023.10 — 2024",
		title: "실전 경험 축적 & 구조적 사고",
		capability: "설계 개선",
		color: "text-yellow-600 dark:text-yellow-400",
		dotColor: "bg-yellow-500 border-yellow-500",
		borderColor: "hover:border-yellow-500",
		highlights: [
			"라이브 운영 중 인메모리 트랜잭션 버그 대응 → 유닛 테스트 도입",
			"BladeX 기술 부채 분석 → 에러 핸들링 체계화 (스택 트레이스 + 컨텍스트)",
			"gRPC 인터셉터 참고 → WebSocket 미들웨어 레이어 직접 설계",
			"로그 추가 작업 시간 4시간 → 1시간 (4배 개선)",
		],
	},
	{
		number: 3,
		period: "2024 — 2025",
		title: "아키텍처 설계 역량",
		capability: "시스템 설계",
		color: "text-emerald-600 dark:text-emerald-400",
		dotColor: "bg-emerald-500 border-emerald-500",
		borderColor: "hover:border-emerald-500",
		highlights: [
			"CQRS + Event Sourcing → 클라이언트 데이터 동기화 최적화",
			"Write-behind 캐싱 → API 응답 시간 10배 개선 (50ms → 5ms)",
			"AWS → Naver Cloud 전체 인프라 마이그레이션 주도 (서비스 중단 0)",
			"결제 데이터 10만 건 무중단 이관, 정합성 100%",
		],
	},
	{
		number: 4,
		period: "2025 — 현재",
		title: "게임 서버 심화",
		capability: "영역 확장",
		color: "text-stone-500 dark:text-stone-400",
		dotColor: "bg-stone-400 border-stone-400",
		borderColor: "hover:border-stone-400",
		highlights: [
			"남은 기술 부채 명확히 인식 (RPC 배치, 모니터링, 에러 집계, 피처 토글)",
			"대규모 동시접속 처리, 분산 시스템, 언리얼 엔진 데디케이티드 서버 학습",
			"부족한 영역 식별 → 체계적 학습 계획 수립",
		],
	},
];

interface AppealPoint {
	title: string;
	description: string;
}

const appealPoints: AppealPoint[] = [
	{
		title: "검증된 학습력",
		description:
			"Go, MongoDB를 처음 접하고 6개월 만에 상용 서비스 출시",
	},
	{
		title: "구조적 사고",
		description:
			"이전 프로젝트의 기술 부채를 분석하고, 설계 단계부터 개선",
	},
	{
		title: "점진적 고도화",
		description:
			"CRUD → 디자인 패턴 → CQRS → 인프라 마이그레이션으로 자연스러운 역량 확장",
	},
	{
		title: "자기 인식",
		description:
			"부족한 영역을 명확히 인식하고, 게임 서버 도메인에서 더 깊이 파고드는 태도",
	},
];

// --- Component ---

export const SwissGrowthCurveSection_GameServer = () => {
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
			{ threshold: 0.1 },
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="snap-section bg-white dark:bg-stone-950"
		>
			<SwissSectionContainer>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-8 h-full">
					{/* Left Column - Sticky Label/Title/Quote */}
					<div className="lg:col-span-4 flex flex-col justify-center">
						{/* Context Tag Bar */}
						<div
							className={cn(
								"flex items-center gap-4 mb-6 transition-all duration-700",
								isVisible
									? "opacity-100 translate-x-0"
									: "opacity-0 -translate-x-4",
							)}
						>
							<span className="text-xs font-mono font-bold uppercase tracking-wider bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-2 py-1">
								성장 곡선
							</span>
							<span className="h-px bg-stone-300 dark:bg-stone-600 flex-grow" />
							<span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
								(P3.01)
							</span>
						</div>

						{/* Title */}
						<h2
							className={cn(
								"heading-xl mb-4 text-stone-900 dark:text-white transition-all duration-700 delay-100",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							기술적 성장 곡선
						</h2>

						{/* Subtitle */}
						<p
							className={cn(
								"body-text text-stone-500 dark:text-stone-400 mb-6 transition-all duration-700 delay-200",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							빠른 학습력 + 성장 가능성
						</p>

						{/* Quote */}
						<blockquote
							className={cn(
								"border-l-4 border-indigo-600 dark:border-indigo-400 pl-4 py-2 transition-all duration-700 delay-300",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							<p className="heading-md text-sm italic text-stone-600 dark:text-stone-300">
								"처음 접한 기술도 6개월 만에 출시 수준으로
								끌어올리는 학습력"
							</p>
						</blockquote>
					</div>

					{/* Right Column - Phase Timeline */}
					<div className="lg:col-span-8 lg:border-l lg:border-stone-200 dark:lg:border-stone-700 lg:pl-10 border-t lg:border-t-0 border-stone-200 dark:border-stone-700 pt-6 lg:pt-0">
						<div className="space-y-0">
							{phases.map((phase, idx) => (
								<div
									key={phase.number}
									className={cn(
										"relative pl-8 border-l-2 border-stone-200 dark:border-stone-700 pb-8 last:pb-0 transition-all duration-700",
										phase.borderColor,
										isVisible
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8",
									)}
									style={{
										transitionDelay: `${400 + idx * 100}ms`,
									}}
								>
									{/* Timeline Dot */}
									<span
										className={cn(
											"absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 bg-white dark:bg-stone-900",
											phase.dotColor,
										)}
									/>

									{/* Phase Header */}
									<div className="flex flex-wrap items-center gap-3 mb-2">
										<span
											className={cn(
												"text-xs font-mono font-bold uppercase tracking-wider",
												phase.color,
											)}
										>
											Phase {phase.number}
										</span>
										<span className="text-xs font-mono text-stone-500">
											{phase.period}
										</span>
										<span
											className={cn(
												"text-[10px] font-bold uppercase tracking-widest border px-2 py-0.5",
												phase.color,
												"border-current",
											)}
										>
											{phase.capability}
										</span>
									</div>

									{/* Phase Title */}
									<h3 className="text-base font-bold text-stone-900 dark:text-white mb-3">
										{phase.title}
									</h3>

									{/* Highlights */}
									<div className="space-y-1.5">
										{phase.highlights.map((hl) => (
											<div
												key={hl}
												className="flex items-start gap-2"
											>
												<span
													className={cn(
														"w-1 h-1 rounded-full mt-2 flex-shrink-0",
														phase.dotColor.split(" ")[0],
													)}
												/>
												<span className="body-text text-stone-600 dark:text-stone-300 text-sm break-keep">
													{hl}
												</span>
											</div>
										))}
									</div>
								</div>
							))}
						</div>

						{/* Appeal Points - 2×2 Grid */}
						<div
							className={cn(
								"mt-10 transition-all duration-700",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
							style={{ transitionDelay: "900ms" }}
						>
							<h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4 border-b border-stone-200 dark:border-stone-700 pb-2">
								핵심 어필 포인트
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{appealPoints.map((point, i) => (
									<div
										key={point.title}
										className="p-4 border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
									>
										<div className="flex items-baseline gap-2 mb-2">
											<span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
												0{i + 1}
											</span>
											<span className="text-sm font-bold text-stone-900 dark:text-white">
												{point.title}
											</span>
										</div>
										<p className="body-text text-stone-500 dark:text-stone-400 text-sm break-keep">
											{point.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</SwissSectionContainer>

			{/* Corner Decoration */}
			<div className="absolute top-8 right-8 w-4 h-4 bg-indigo-600 dark:bg-indigo-500" />
		</section>
	);
};
