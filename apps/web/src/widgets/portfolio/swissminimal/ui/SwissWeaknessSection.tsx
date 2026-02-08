"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { SwissSectionContainer } from "./SwissSectionContainer";

// --- Types ---

export interface WeaknessItem {
	id: string;
	weakness: string;
	background: string;
	transferableSkills: string[];
	responseStrategy: string;
	relevanceTag?: string;
	relevanceColor?: string;
}

export interface SwissWeaknessSectionProps {
	sectionLabel?: string;
	title?: string;
	subtitle?: string;
	quote?: string;
	items: WeaknessItem[];
	closingMessage?: {
		title: string;
		content: string;
		proofPoints?: string[];
	};
	targetCompany?: string;
	targetRole?: string;
}

// --- Relevance Badge Color Map ---

const relevanceColorMap: Record<string, string> = {
	높음: "bg-red-500/20 text-red-400 border-red-500/30",
	중간: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
	"낮음(강점)": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

// --- Component ---

export const SwissWeaknessSection = ({
	sectionLabel = "(P3.02)",
	title = "솔직한 약점 & 대응 계획",
	subtitle = "자기 인식 + 성장 의지",
	quote = "부족한 점을 인식하고, 이미 증명된 학습력으로 보완하겠습니다",
	items,
	closingMessage,
	targetCompany,
	targetRole,
}: SwissWeaknessSectionProps) => {
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
					{/* Left Column - Sticky Header */}
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
								약점 분석
							</span>
							<span className="h-px bg-stone-300 dark:bg-stone-600 flex-grow" />
							<span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
								{sectionLabel}
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
							{title}
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
							{subtitle}
						</p>

						{/* Target Info (if provided) */}
						{(targetCompany || targetRole) && (
							<div
								className={cn(
									"mb-6 p-3 border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 transition-all duration-700 delay-200",
									isVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 block mb-1">
									맞춤 분석 대상
								</span>
								{targetCompany && (
									<span className="text-sm font-bold text-stone-900 dark:text-white block">
										{targetCompany}
									</span>
								)}
								{targetRole && (
									<span className="text-xs text-stone-500 dark:text-stone-400">
										{targetRole}
									</span>
								)}
							</div>
						)}

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
								"{quote}"
							</p>
						</blockquote>
					</div>

					{/* Right Column - Weakness Cards */}
					<div className="lg:col-span-8 lg:border-l lg:border-stone-200 dark:lg:border-stone-700 lg:pl-10 border-t lg:border-t-0 border-stone-200 dark:border-stone-700 pt-6 lg:pt-0">
						<div className="space-y-6">
							{items.map((item, idx) => (
								<div
									key={item.id}
									className={cn(
										"border border-stone-200 dark:border-stone-700 p-5 transition-all duration-700 hover:border-stone-400 dark:hover:border-stone-500",
										isVisible
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8",
									)}
									style={{
										transitionDelay: `${400 + idx * 100}ms`,
									}}
								>
									{/* Card Header */}
									<div className="flex items-center justify-between mb-3">
										<div className="flex items-center gap-3">
											<span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
												0{idx + 1}
											</span>
											<span className="text-base font-bold text-stone-900 dark:text-white">
												{item.weakness}
											</span>
										</div>
										{item.relevanceTag && (
											<span
												className={cn(
													"text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border",
													item.relevanceColor ||
														relevanceColorMap[item.relevanceTag] ||
														"bg-stone-100 text-stone-500 border-stone-300 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-600",
												)}
											>
												관련도: {item.relevanceTag}
											</span>
										)}
									</div>

									{/* Background */}
									<div className="mb-3">
										<span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 block mb-1">
											배경
										</span>
										<p className="body-text text-stone-600 dark:text-stone-300 text-sm break-keep">
											{item.background}
										</p>
									</div>

									{/* Transferable Skills */}
									<div className="mb-3">
										<span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 block mb-1">
											보유 역량
										</span>
										<div className="space-y-1">
											{item.transferableSkills.map(
												(skill) => (
													<div
														key={skill}
														className="flex items-start gap-2"
													>
														<span className="w-1 h-1 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
														<span className="body-text text-stone-600 dark:text-stone-300 text-sm break-keep">
															{skill}
														</span>
													</div>
												),
											)}
										</div>
									</div>

									{/* Response Strategy */}
									<div className="bg-stone-50 dark:bg-stone-800/50 p-3 border-l-2 border-indigo-500">
										<span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 block mb-1">
											대응 전략
										</span>
										<p className="body-text text-stone-700 dark:text-stone-300 text-sm break-keep">
											{item.responseStrategy}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Closing Message Block */}
						{closingMessage && (
							<div
								className={cn(
									"mt-8 bg-stone-900 dark:bg-stone-800 text-white p-6 transition-all duration-700",
									isVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
								style={{
									transitionDelay: `${400 + items.length * 100 + 100}ms`,
								}}
							>
								<span className="text-xs font-bold text-white/50 uppercase mb-2 block">
									{closingMessage.title}
								</span>
								<p className="text-sm text-white/80 leading-relaxed mb-3 break-keep">
									{closingMessage.content}
								</p>
								{closingMessage.proofPoints &&
									closingMessage.proofPoints.length > 0 && (
										<div className="space-y-1.5 border-t border-stone-700 pt-3">
											{closingMessage.proofPoints.map(
												(point) => (
													<div
														key={point}
														className="flex items-start gap-2"
													>
														<span className="w-1 h-1 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
														<span className="text-sm text-white/70 break-keep">
															{point}
														</span>
													</div>
												),
											)}
										</div>
									)}
							</div>
						)}
					</div>
				</div>
			</SwissSectionContainer>
		</section>
	);
};
