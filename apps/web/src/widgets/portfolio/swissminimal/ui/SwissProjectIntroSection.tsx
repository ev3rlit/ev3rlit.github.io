"use client";

import { useEffect, useRef, useState } from "react";
import { SwissSectionContainer } from "./SwissSectionContainer";
import { SwissScreenshotGallery } from "./SwissScreenshotGallery";
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
	contribution: string[];
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
	techStack?: string[];
	architecturePatterns?: string[];
	modules?: ProjectModule[];
	screenshots?: Screenshot[];
	storeLinks?: {
		playStore?: string;
		appStore?: string;
	};
}

const isEnhancedMode = (props: SwissProjectIntroSectionProps) =>
	!!(props.enhancedMetrics || props.modules);

export const SwissProjectIntroSection = (
	props: SwissProjectIntroSectionProps,
) => {
	const {
		sectionNumber,
		projectName,
		period,
		projectRole,
		genre,
		description,
		contribution,
		metrics,
		onDetailClick,
		enhancedMetrics,
		techStack,
		modules,
		screenshots,
		storeLinks,
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
						({sectionNumber}) 프로젝트
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
				<div className="max-w-[1600px] mx-auto py-12">
					<SwissScreenshotGallery
						screenshots={screenshots}
						containerHeight="420px"
					/>
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

						</div>

						<div className="space-y-12">
							{/* Basic Info (Role & Period only) */}
							<div
								className={cn(
									"transition-all duration-700 delay-100",
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
								</div>
							</div>

							{/* Store Links */}
							{storeLinks && (
								<div
									className={cn(
										"transition-all duration-700 delay-150",
										deepDiveVisible
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8",
									)}
								>
									<h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-700 pb-2">
										스토어 (Store)
									</h3>
									<div className="flex gap-3">
										<StoreIcon type="playStore" href={storeLinks.playStore} />
										<StoreIcon type="appStore" href={storeLinks.appStore} />
									</div>
								</div>
							)}

							{/* My Role / Contribution */}
							{contribution && (
								<div
									className={cn(
										"transition-all duration-700 delay-200",
										deepDiveVisible
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8",
									)}
								>
									<h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 border-b border-stone-200 dark:border-stone-700 pb-2">
										주요 기여
									</h3>
									<ul className="space-y-2">
										{contribution.map((item) => (
											<li
												key={item}
												className="flex items-start gap-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300 break-keep"
											>
												<span className="mt-1.5 w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full shrink-0" />
												{item}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>

					{/* RIGHT COLUMN */}
					<div className="lg:col-span-7 flex flex-col border-t lg:border-t-0 border-stone-200 dark:border-stone-700 lg:border-l lg:pl-16">
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

const StoreIcon = ({ type, href }: { type: "playStore" | "appStore"; href?: string }) => {
	const disabled = !href;
	const Tag = disabled ? "span" : "a";
	const linkProps = disabled ? {} : { href, target: "_blank", rel: "noopener noreferrer" };

	return (
		<Tag
			{...linkProps}
			className={cn(
				"flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200",
				disabled
					? "border-stone-200 dark:border-stone-700 text-stone-300 dark:text-stone-600 cursor-not-allowed line-through decoration-stone-300 dark:decoration-stone-600"
					: "border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-900 dark:hover:text-white",
			)}
		>
			{type === "playStore" ? (
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<title>Google Play</title>
					<path d="M3.61 1.814a1.5 1.5 0 0 0-.61 1.186v18a1.5 1.5 0 0 0 .61 1.186l.39.234L14.5 12 4 1.58l-.39.234Z" fill={disabled ? "currentColor" : "#4285F4"} opacity={disabled ? 0.3 : 1} />
					<path d="M18.5 8.5 14.5 12l4 3.5 4.5-2.625a1.5 1.5 0 0 0 0-2.75L18.5 8.5Z" fill={disabled ? "currentColor" : "#FBBC04"} opacity={disabled ? 0.3 : 1} />
					<path d="M4 22.42 14.5 12l4 3.5-11 6.42a1.5 1.5 0 0 1-.89.28 1.5 1.5 0 0 1-.61-.13l-2-.15Z" fill={disabled ? "currentColor" : "#34A853"} opacity={disabled ? 0.3 : 1} />
					<path d="M4 1.58 14.5 12l-4-3.5L18.5 8.5l-2-.15a1.5 1.5 0 0 0-.61-.13 1.5 1.5 0 0 0-.89.28L4 1.58Z" fill={disabled ? "currentColor" : "#EA4335"} opacity={disabled ? 0.3 : 1} />
				</svg>
			) : (
				<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" opacity={disabled ? 0.3 : 1}>
					<title>App Store</title>
					<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11Z" />
				</svg>
			)}
			<span>{type === "playStore" ? "Google Play" : "App Store"}</span>
			{disabled && (
				<span className="text-[10px] uppercase tracking-wider opacity-50">종료</span>
			)}
		</Tag>
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
	storeLinks,
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

					{storeLinks && (
						<div
							className={cn(
								"flex gap-3 mb-6 transition-all duration-700 delay-250",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							<StoreIcon type="playStore" href={storeLinks.playStore} />
							<StoreIcon type="appStore" href={storeLinks.appStore} />
						</div>
					)}

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
						<ul className="space-y-2 mb-8">
							{contribution.map((item) => (
								<li
									key={item}
									className="flex items-start gap-2 body-text text-stone-600 dark:text-stone-300"
								>
									<span className="mt-1.5 w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full shrink-0" />
									{item}
								</li>
							))}
						</ul>

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
