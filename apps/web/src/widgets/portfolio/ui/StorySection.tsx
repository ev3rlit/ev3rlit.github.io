
import { ReactNode } from "react";
import { PortfolioSection } from "./PortfolioSection";
import { cn } from "@/shared/lib/cn";

interface StorySectionProps {
    sectionNumber: string;
    title: string;
    subTitle?: string;
    projectPeriod?: string;

    // 7-Step Content Props
    step1_intro: ReactNode;
    step2_overview: ReactNode;
    step3_problem: ReactNode; // Changed from single solution prop to explicit problem/solution
    step3_solution: ReactNode;
    step4_process: ReactNode;
    step5_impact: ReactNode;   // Changed result to specific Impact metric box
    step5_impact_label?: string;
    step6_growth: ReactNode;
    step7_capability: ReactNode;
}

export const StorySection = ({
    sectionNumber,
    title,
    subTitle = "NEXUS / ONE UNIVERSE", // Default if not provided
    projectPeriod = "2023.04 - 2025.10",
    step1_intro,
    step2_overview,
    step3_problem,
    step3_solution,
    step4_process,
    step5_impact,
    step5_impact_label = "IMPACT",
    step6_growth,
    step7_capability,
}: StorySectionProps) => {
    return (
        <PortfolioSection className="bg-white text-gray-900">
            {/* Header */}
            <div className="flex justify-between items-start mb-12 border-b border-gray-200 pb-6 shrink-0">
                <div>
                    <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2">{sectionNumber}</h2>
                    <h3 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight">{title}</h3>
                </div>
                <div className="text-right hidden md:block">
                    <p className="font-bold text-gray-900 uppercase">{subTitle}</p>
                    <p className="text-sm text-gray-500 font-mono">{projectPeriod}</p>
                </div>
            </div>

            {/* Asymmetric Grid Layout (16:9 optimized) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full min-h-0 flex-1">

                {/* LEFT COL (Span 4): Context & Impact */}
                <div className="md:col-span-4 flex flex-col space-y-8 pr-8 md:border-r border-gray-100 h-full">
                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">01 Introduction</span>
                        <div className="text-2xl font-bold leading-tight text-black break-keep">
                            {step1_intro}
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">02 Overview</span>
                        <div className="text-sm text-gray-600 leading-relaxed font-medium break-keep">
                            {step2_overview}
                        </div>
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Impact (05)</span>
                            <div className="text-3xl font-black text-black">
                                {step5_impact}
                            </div>
                            <div className="text-xs text-indigo-600 font-bold mt-1 uppercase">{step5_impact_label}</div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COL (Span 8): Details & Learning */}
                <div className="md:col-span-8 flex flex-col h-full pl-0 md:pl-4">

                    {/* Problem & Solution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">03 Problem</span>
                            <div className="text-sm text-gray-700 leading-relaxed break-keep">
                                {step3_problem}
                            </div>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">03 Solution</span>
                            <div className="text-sm text-gray-700 leading-relaxed break-keep">
                                {step3_solution}
                            </div>
                        </div>
                    </div>

                    {/* Process */}
                    <div className="mb-8 flex-1">
                        <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">04 Process</span>
                        <div className="text-sm text-gray-700 leading-relaxed">
                            {step4_process}
                        </div>
                    </div>

                    {/* Bottom Dark Block (Growth & Capability) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-auto bg-gray-900 text-white p-6 shrink-0">
                        <div>
                            <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">06 Growth</span>
                            <div className="text-sm text-gray-300 leading-relaxed break-keep">
                                {step6_growth}
                            </div>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">07 Capability</span>
                            <div className="text-sm text-gray-300 leading-relaxed break-keep">
                                {step7_capability}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PortfolioSection>
    );
};
