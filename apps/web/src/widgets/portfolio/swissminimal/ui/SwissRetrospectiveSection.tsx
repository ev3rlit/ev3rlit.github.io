"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { SwissSectionContainer } from "./SwissSectionContainer";

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
	lesson,
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
			className="snap-section bg-stone-900 text-white dark:bg-stone-950"
		>
			<SwissSectionContainer>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-8 h-full">
					{/* Left Column - Sticky Info */}
					<div className="lg:col-span-5 flex flex-col h-full lg:sticky lg:top-40 lg:self-start justify-center">
						{/* Context Tag Bar */}
						<div
							className={cn(
								"flex items-center gap-4 mb-6 transition-all duration-700",
								isVisible
									? "opacity-100 translate-x-0"
									: "opacity-0 -translate-x-4",
							)}
						>
							<span className="text-xs font-mono font-bold uppercase tracking-wider bg-white text-stone-900 px-2 py-1">
								회고
							</span>
							<span className="h-px bg-stone-600 flex-grow" />
							<span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
								{sectionLabel}
							</span>
						</div>

						{/* Title */}
						<h2
							className={cn(
								"heading-xl mb-6 text-white transition-all duration-700 delay-100",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							{title}
						</h2>

						{/* Subtitle Block */}
						<div
							className={cn(
								"transition-all duration-700 delay-200",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							<h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 border-b border-stone-700 pb-1">
								개요
							</h3>
							<p className="body-text text-stone-300 leading-relaxed">
								{subtitle}
							</p>
						</div>
					</div>

					{/* Right Column - Content */}
					<div className="lg:col-span-7 flex flex-col h-full justify-between lg:border-l lg:border-stone-700 lg:pl-16 border-t lg:border-t-0 border-stone-700">
						{/* Quote Block */}
						<blockquote
							className={cn(
								"border-l-4 border-indigo-600 dark:border-indigo-400 pl-4 py-4 border-b border-stone-700 transition-all duration-700 delay-300",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							<p className="heading-md text-sm italic text-stone-300">
								"{quote}"
							</p>
						</blockquote>

						{/* Evolution */}
						<div
							className={cn(
								"py-5 border-b border-stone-700 transition-all duration-700 delay-[400ms]",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							<div className="flex items-center gap-2 mb-4">
								<span className="w-2 h-2 bg-indigo-500 rounded-full" />
								<span className="label-text accent-indigo">
									{evolution.title}
								</span>
							</div>
							<div className="space-y-0">
								{evolution.items.map((item) => (
									<div
										key={item}
										className="relative pl-8 border-l-2 border-stone-700 hover:border-indigo-500 transition-colors duration-300 py-2"
									>
										<span className="absolute -left-[5px] top-2.5 w-2 h-2 bg-stone-900 border-2 border-indigo-500 rounded-full" />
										<span
											className="body-text text-stone-300 text-sm"
											// biome-ignore lint/security/noDangerouslySetInnerHtml: statically defined content
											dangerouslySetInnerHTML={{ __html: item }}
										/>
									</div>
								))}
							</div>
						</div>

						{/* Tech Debt */}
						<div
							className={cn(
								"py-5 border-b border-stone-700 transition-all duration-700 delay-500",
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8",
							)}
						>
							<div className="flex items-center gap-2 mb-4">
								<span className="w-2 h-2 bg-yellow-500 rounded-full" />
								<span className="label-text text-yellow-500">
									{techDebt.title}
								</span>
							</div>
							<div className="space-y-0">
								{techDebt.items.map((item) => (
									<div
										key={item}
										className="relative pl-8 border-l-2 border-stone-700 hover:border-yellow-500 transition-colors duration-300 py-2"
									>
										<span className="absolute -left-[5px] top-2.5 w-2 h-2 bg-stone-900 border-2 border-yellow-500 rounded-full" />
										<span
											className="body-text text-stone-300 text-sm"
											// biome-ignore lint/security/noDangerouslySetInnerHtml: statically defined content
											dangerouslySetInnerHTML={{ __html: item }}
										/>
									</div>
								))}
							</div>
						</div>

						{/* Lesson (optional) */}
						{lesson && (
							<div
								className={cn(
									"py-5 transition-all duration-700 delay-[600ms]",
									isVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8",
								)}
							>
								<div className="flex items-center gap-2 mb-4">
									<span className="w-2 h-2 bg-stone-500 rounded-full" />
									<span className="label-text text-stone-500">
										{lesson.title}
									</span>
								</div>
								<div className="space-y-0">
									{lesson.items.map((item) => (
										<div
											key={item}
											className="relative pl-8 border-l-2 border-stone-700 hover:border-stone-500 transition-colors duration-300 py-2"
										>
											<span className="absolute -left-[5px] top-2.5 w-2 h-2 bg-stone-900 border-2 border-stone-500 rounded-full" />
											<span
												className="body-text text-stone-300 text-sm"
												// biome-ignore lint/security/noDangerouslySetInnerHtml: statically defined content
												dangerouslySetInnerHTML={{ __html: item }}
											/>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</SwissSectionContainer>
			{/* Corner Decoration */}
			<div className="absolute top-8 right-8 w-4 h-4 bg-indigo-600 dark:bg-indigo-500" />
		</section>
	);
};
