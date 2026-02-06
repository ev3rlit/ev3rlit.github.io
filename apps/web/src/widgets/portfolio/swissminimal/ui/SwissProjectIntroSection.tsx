"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SwissSectionContainer } from "./SwissSectionContainer";
import { cn } from "@/shared/lib/cn";

interface Metric {
	label: string;
	value: string;
}

interface EnhancedMetric {
	kpi: string;
	value: string;
	context: string;
}

interface ProjectModule {
	title: string;
	description: string;
	tags: string[];
}

interface Screenshot {
	src: string;
	alt: string;
	caption?: string;
}

interface SwissProjectIntroSectionProps {
	sectionNumber: string;
	projectName: string;
	period: string;
	projectRole: string;
	genre: string;
	engine: string;
	description: string;
	contribution: string;
	metrics?: Metric[];
	onDetailClick?: () => void;
	platform?: string;
	servicePeriod?: string;
	teamSize?: string;
	affiliation?: string;
	context?: string;
	challenges?: string[];
	strategy?: string;
	enhancedMetrics?: EnhancedMetric[];
	contributions?: string[];
	techStack?: string[];
	architecturePatterns?: string[];
	modules?: ProjectModule[];
	screenshots?: Screenshot[];
}

const isEnhancedMode = (props: SwissProjectIntroSectionProps) =>
	!!(
		props.challenges ||
		props.strategy ||
		props.enhancedMetrics ||
		props.contributions ||
		props.modules
	);

export const SwissProjectIntroSection = (
	props: SwissProjectIntroSectionProps,
) => {
	const {
		sectionNumber,
		projectName,
		period,
		projectRole,
		genre,
		engine,
		description,
		contribution,
		metrics,
		onDetailClick,
		platform,
		teamSize,
		affiliation,
		context,
		challenges,
		strategy,
		enhancedMetrics,
		contributions,
		techStack,
		architecturePatterns,
		modules,
		screenshots,
	} = props;

	const enhanced = isEnhancedMode(props);

	const heroRef = useRef<HTMLElement>(null);
	const deepDiveRef = useRef<HTMLDivElement>(null);
	const [heroVisible, setHeroVisible] = useState(false);
	const [deepDiveVisible, setDeepDiveVisible] = useState(false);

	useEffect(() => {
		const heroObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setHeroVisible(true);
					heroObserver.disconnect();
				}
			},
			{ threshold: 0.2 },
		);

		const deepDiveObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setDeepDiveVisible(true);
					deepDiveObserver.disconnect();
				}
			},
			{ threshold: 0.1 },
		);

		if (heroRef.current) heroObserver.observe(heroRef.current);
		if (deepDiveRef.current) deepDiveObserver.observe(deepDiveRef.current);

		return () => {
			heroObserver.disconnect();
			deepDiveObserver.disconnect();
		};
	}, []);

	if (!enhanced) {
		return <LegacyLayout {...props} />;
	}

	return (
		<section
			ref={heroRef}
			className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800"
		>
			{/* HERO HEADER */}
			<SwissSectionContainer>
				<div className="flex flex-col gap-2 mb-4">
					<span
						className={cn(
							"label-text accent-indigo transition-all duration-700",
							heroVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8",
						)}
					>
						({sectionNumber}) 케이스 스터디
					</span>
				</div>

				<h1
					className={cn(
						"text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-stone-900 dark:text-white mb-8 break-keep transition-all duration-700 delay-100",
						heroVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8",
					)}
				>
					{projectName}
					<span className="accent-indigo">.</span>
				</h1>

				<p
					className={cn(
						"text-xl md:text-2xl font-light text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed border-l-4 border-stone-900 dark:border-stone-100 pl-6 break-keep transition-all duration-700 delay-200",
						heroVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8",
					)}
				>
					{description}
				</p>
			</SwissSectionContainer>

			{/* SCREENSHOTS SECTION */}
			{screenshots && screenshots.length > 0 && (
				<div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
					<div
						className={cn(
							"grid gap-6 justify-items-center",
							screenshots.length === 1
								? "grid-cols-1 max-w-xs mx-auto"
								: screenshots.length === 2
									? "grid-cols-2 md:grid-cols-2 max-w-lg mx-auto"
									: "grid-cols-3 max-w-3xl mx-auto",
						)}
					>
						{screenshots.map((shot) => (
							<div key={shot.src} className="w-full">
								<div className="aspect-[9/16] relative border border-stone-200 dark:border-stone-800 overflow-hidden bg-stone-100 dark:bg-stone-800">
									<Image
										src={shot.src}
										alt={shot.alt}
										fill
										className="object-contain"
										sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 280px"
									/>
								</div>
								{shot.caption && (
									<p className="label-text text-stone-500 mt-2 text-center">
										{shot.caption}
									</p>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{/* TWO-COLUMN DEEP DIVE */}
			<div
				ref={deepDiveRef}
				className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24"
			>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-16">
					{/* LEFT COLUMN */}
					<div className="lg:col-span-5 flex flex-col">
						<div
							className={cn(
								"transition-all duration-700",
								deepDiveVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							{/* Context Label */}
							<div className="flex items-center gap-4 mb-6">
								<span className="text-xs font-bold uppercase tracking-wider bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-2 py-1">
									Context
								</span>
								<span className="h-px bg-stone-900 dark:bg-stone-100 flex-grow" />
							</div>

							{/* Genre Title */}
							<h2 className="heading-xl text-stone-900 dark:text-white mb-6 break-keep">
								{genre}
							</h2>

							{/* Tech Stack Tags */}
							{techStack && techStack.length > 0 && (
								<div className="flex flex-wrap gap-3 text-sm font-mono text-stone-500 dark:text-stone-400 mb-8">
									{techStack.map((tech, i) => (
										<span key={tech}>
											{tech}
											{i < techStack.length - 1 && (
												<span className="ml-3">·</span>
											)}
										</span>
									))}
								</div>
							)}

							{/* Architecture Patterns */}
							{architecturePatterns && architecturePatterns.length > 0 && (
								<div className="flex flex-wrap gap-2 mb-8">
									{architecturePatterns.map((pattern) => (
										<span
											key={pattern}
											className="bg-stone-200 dark:bg-stone-700 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-stone-600 dark:text-stone-300"
										>
											{pattern}
										</span>
									))}
								</div>
							)}
						</div>

						<div className="space-y-12">
							{/* Introduction / Context */}
							<div
								className={cn(
									"transition-all duration-700 delay-100",
									deepDiveVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-700 pb-2">
									개요 (Introduction)
								</h3>
								<p className="text-lg md:text-xl font-medium leading-relaxed text-stone-900 dark:text-stone-100 break-keep">
									{context || description}
								</p>
							</div>

							{/* Basic Info */}
							<div
								className={cn(
									"transition-all duration-700 delay-200",
									deepDiveVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-700 pb-2">
									기본 정보 (Details)
								</h3>
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<span className="label-text text-stone-400 block mb-1">
											역할
										</span>
										<span className="body-text text-stone-900 dark:text-white">
											{projectRole}
										</span>
									</div>
									<div>
										<span className="label-text text-stone-400 block mb-1">
											기간
										</span>
										<span className="body-text text-stone-900 dark:text-white">
											{period}
										</span>
									</div>
									{teamSize && (
										<div>
											<span className="label-text text-stone-400 block mb-1">
												팀 규모
											</span>
											<span className="body-text text-stone-900 dark:text-white">
												{teamSize}
											</span>
										</div>
									)}
									{platform && (
										<div>
											<span className="label-text text-stone-400 block mb-1">
												플랫폼
											</span>
											<span className="body-text text-stone-900 dark:text-white">
												{platform}
											</span>
										</div>
									)}
									{affiliation && (
										<div>
											<span className="label-text text-stone-400 block mb-1">
												소속
											</span>
											<span className="body-text text-stone-900 dark:text-white">
												{affiliation}
											</span>
										</div>
									)}
									<div>
										<span className="label-text text-stone-400 block mb-1">
											엔진
										</span>
										<span className="body-text text-stone-900 dark:text-white">
											{engine}
										</span>
									</div>
								</div>
							</div>

							{/* Challenges */}
							{challenges && challenges.length > 0 && (
								<div
									className={cn(
										"transition-all duration-700 delay-300",
										deepDiveVisible
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8",
									)}
								>
									<h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-700 pb-2">
										핵심 문제 (Core Problems)
									</h3>
									<ul className="list-disc list-inside text-base text-stone-600 dark:text-stone-300 leading-relaxed space-y-2 marker:text-indigo-600 dark:marker:text-indigo-400 break-keep">
										{challenges.map((c) => (
											<li key={c}>{c}</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>

					{/* RIGHT COLUMN */}
					<div className="lg:col-span-7 flex flex-col border-t lg:border-t-0 border-stone-200 dark:border-stone-700 lg:border-l lg:pl-16">
						{/* Strategy */}
						{strategy && (
							<div
								className={cn(
									"py-8 lg:pt-0 border-b border-stone-200 dark:border-stone-700 transition-all duration-700",
									deepDiveVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<h3 className="text-xs font-bold uppercase tracking-widest accent-indigo mb-4">
									해결 전략 (Strategy)
								</h3>
								<p className="heading-lg text-stone-900 dark:text-white leading-tight tracking-tight mb-6 break-keep">
									{strategy}
								</p>
							</div>
						)}

						{/* KPI - Enhanced Metrics */}
						{enhancedMetrics && enhancedMetrics.length > 0 && (
							<div
								className={cn(
									"py-10 border-b border-stone-900 dark:border-stone-100 transition-all duration-700 delay-100",
									deepDiveVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
									핵심 성과 지표 (KPI)
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
									{enhancedMetrics.map((m) => (
										<div key={m.kpi}>
											<span className="block text-3xl md:text-4xl font-bold tracking-tighter text-stone-900 dark:text-white">
												{m.value}
											</span>
											<span className="mt-2 block text-[10px] text-stone-500 uppercase font-mono tracking-widest border-t border-stone-200 dark:border-stone-700 pt-2">
												{m.kpi}
											</span>
											<span className="block text-[10px] text-stone-400 font-mono mt-1">
												{m.context}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Fallback: Legacy Metrics */}
						{!enhancedMetrics && metrics && metrics.length > 0 && (
							<div
								className={cn(
									"py-10 border-b border-stone-900 dark:border-stone-100 transition-all duration-700 delay-100",
									deepDiveVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
									주요 성과 (Metrics)
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
									{metrics.map((m) => (
										<div key={m.label}>
											<span className="block text-3xl md:text-4xl font-bold tracking-tighter text-stone-900 dark:text-white">
												{m.value}
											</span>
											<span className="mt-2 block text-[10px] text-stone-500 uppercase font-mono tracking-widest border-t border-stone-200 dark:border-stone-700 pt-2">
												{m.label}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Contributions */}
						{contributions && contributions.length > 0 && (
							<div
								className={cn(
									"py-10 border-b border-stone-200 dark:border-stone-700 transition-all duration-700 delay-200",
									deepDiveVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
									주요 기여 (Contributions)
								</h3>
								<ul className="space-y-3">
									{contributions.map((c) => (
										<li
											key={c}
											className="flex items-start gap-3 text-base text-stone-700 dark:text-stone-300 leading-relaxed break-keep"
										>
											<span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-2 shrink-0" />
											{c}
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Legacy Contribution fallback */}
						{!contributions && contribution && (
							<div
								className={cn(
									"py-10 border-b border-stone-200 dark:border-stone-700 transition-all duration-700 delay-200",
									deepDiveVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
									나의 기여 (Contribution)
								</h3>
								<p className="body-text text-stone-600 dark:text-stone-300 break-keep">
									{contribution}
								</p>
							</div>
						)}

						{/* Modules Timeline */}
						{modules && modules.length > 0 && (
							<div
								className={cn(
									"py-10 transition-all duration-700 delay-300",
									deepDiveVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-white mb-8 flex items-center gap-2">
									<span className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400" />
									세부 프로젝트 모듈
								</h3>
								<div className="grid grid-cols-1 gap-5">
									{modules.map((mod) => (
										<div
											key={mod.title}
											className="group/module relative pl-8 border-l-2 border-stone-200 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-100 transition-colors duration-300 py-1"
										>
											<span className="absolute -left-[5px] top-1.5 w-2 h-2 bg-stone-50 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 group-hover/module:border-stone-900 dark:group-hover/module:border-stone-100 group-hover/module:bg-indigo-600 dark:group-hover/module:bg-indigo-400 rounded-full transition-colors duration-300" />
											<h4 className="text-lg font-bold text-stone-900 dark:text-white mb-1">
												{mod.title}
											</h4>
											<p className="text-sm text-stone-600 dark:text-stone-400 mb-2 leading-snug break-keep">
												{mod.description}
											</p>
											{mod.tags.length > 0 && (
												<ul className="flex flex-wrap gap-2">
													{mod.tags.map((tag) => (
														<li
															key={tag}
															className="bg-stone-100 dark:bg-stone-800 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-stone-600 dark:text-stone-400"
														>
															{tag}
														</li>
													))}
												</ul>
											)}
										</div>
									))}
								</div>
							</div>
						)}

						{/* Detail Button */}
						{onDetailClick && (
							<div
								className={cn(
									"py-10 transition-all duration-700 delay-500",
									deepDiveVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<button
									type="button"
									onClick={onDetailClick}
									className="group flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors rounded-full"
								>
									<span className="text-sm font-bold uppercase tracking-wider">
										기술 상세보기
									</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="group-hover:translate-x-1 transition-transform"
										aria-hidden="true"
									>
										<title>상세보기 화살표</title>
										<path d="M5 12h14" />
										<path d="m12 5 7 7-7 7" />
									</svg>
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

/**
 * Legacy layout for backward compatibility (BladeX, etc.)
 * Renders the original snap-section single-screen layout.
 */
const LegacyLayout = ({
	sectionNumber,
	projectName,
	period,
	projectRole,
	genre,
	engine,
	metrics,
	description,
	contribution,
	onDetailClick,
}: SwissProjectIntroSectionProps) => {
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
			{ threshold: 0.2 },
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="snap-section bg-stone-50 dark:bg-stone-900"
		>
			<SwissSectionContainer className="grid grid-cols-12 gap-6 items-center h-full">
				{/* Section Label */}
				<div className="col-span-12 md:col-span-2">
					<div
						className={cn(
							"transition-all duration-700",
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8",
						)}
					>
						<span className="label-text accent-indigo">
							({sectionNumber})
						</span>
						<span className="label-text text-stone-500 ml-2">프로젝트</span>
					</div>
				</div>

				{/* Project Info */}
				<div className="col-span-12 md:col-span-6 mt-8 md:mt-0">
					<h2
						className={cn(
							"heading-xl text-stone-900 dark:text-white mb-4 transition-all duration-700 delay-100",
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8",
						)}
					>
						{projectName}
					</h2>

					<div
						className={cn(
							"flex flex-wrap gap-4 mb-6 transition-all duration-700 delay-200",
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8",
						)}
					>
						<div>
							<div className="label-text text-stone-400 mb-1">기간</div>
							<div className="body-text">{period}</div>
						</div>
						<div>
							<div className="label-text text-stone-400 mb-1">역할</div>
							<div className="body-text">{projectRole}</div>
						</div>
					</div>

					<div
						className={cn(
							"flex flex-wrap gap-4 mb-8 transition-all duration-700 delay-200",
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8",
						)}
					>
						<div>
							<div className="label-text text-stone-400 mb-1">장르</div>
							<div className="body-text">{genre}</div>
						</div>
						<div>
							<div className="label-text text-stone-400 mb-1">엔진</div>
							<div className="body-text">{engine}</div>
						</div>
					</div>

					<div
						className={cn(
							"transition-all duration-700 delay-300",
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8",
						)}
					>
						<p className="body-text text-stone-600 dark:text-stone-300 max-w-lg">
							{description}
						</p>
					</div>
				</div>

				{/* Metrics & Contribution */}
				<div className="col-span-12 md:col-span-4 mt-8 md:mt-0 md:pl-8">
					{metrics && metrics.length > 0 && (
						<div
							className={cn(
								"mb-10 transition-all duration-700 delay-400",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							<div className="label-text text-stone-500 mb-4">주요 성과</div>
							<div className="space-y-4">
								{metrics.map((m) => (
									<div
										key={m.label}
										className="flex justify-between items-center border-b border-stone-200 dark:border-stone-700 pb-2"
									>
										<span className="label-text text-stone-400">
											{m.label}
										</span>
										<span className="heading-md accent-indigo">{m.value}</span>
									</div>
								))}
							</div>
						</div>
					)}

					<div
						className={cn(
							"transition-all duration-700 delay-500",
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8",
						)}
					>
						<div className="label-text text-stone-500 mb-4">나의 기여</div>
						<p className="body-text text-stone-600 dark:text-stone-300 mb-8">
							{contribution}
						</p>

						{onDetailClick && (
							<button
								type="button"
								onClick={onDetailClick}
								className="group flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors rounded-full"
							>
								<span className="text-sm font-bold uppercase tracking-wider">
									기술 상세보기
								</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="group-hover:translate-x-1 transition-transform"
									aria-hidden="true"
								>
									<title>상세보기 화살표</title>
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</button>
						)}
					</div>
				</div>
			</SwissSectionContainer>

			<div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200 dark:bg-stone-800" />
		</section>
	);
};
