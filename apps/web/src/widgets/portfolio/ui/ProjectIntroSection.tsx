
import { PortfolioSection } from "./PortfolioSection";

interface ProjectIntroProps {
    sectionNumber: string;
    projectName: string;
    subTitle: string;
    period: string;
    role: string;
    genre: string;
    engine: string;
    metrics?: { label: string, value: string }[];
    description: string;
    contributionSummary: string;
}

export const ProjectIntroSection = ({
    sectionNumber,
    projectName,
    subTitle,
    period,
    role,
    genre,
    engine,
    metrics,
    description,
    contributionSummary,
}: ProjectIntroProps) => {
    return (
        <PortfolioSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full items-center">

                {/* Visual / Title Area */}
                <div className="flex flex-col justify-between h-full py-8">
                    <div>
                        <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">{sectionNumber} Project Overview</span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black leading-[0.9] mb-4">
                            {projectName}
                        </h1>
                        <p className="text-3xl text-gray-400 font-black tracking-tight uppercase">{subTitle}</p>
                    </div>

                    <div className="bg-gray-100 p-8 border-l-8 border-black">
                        {/* Placeholder for Big Impact Visual or Screenshot */}
                        <div className="aspect-video w-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-bold mb-4">
                            PROJECT SCREENSHOT
                        </div>
                        <div className="flex gap-4 font-mono text-sm text-gray-500">
                            <span>[{genre}]</span>
                            <span>/</span>
                            <span>[{engine}]</span>
                        </div>
                    </div>
                </div>

                {/* Info Area */}
                <div className="flex flex-col justify-center gap-12 border-l border-gray-100 pl-16">
                    {metrics && (
                        <div className="grid grid-cols-3 gap-8">
                            {metrics.map((m, idx) => (
                                <div key={idx}>
                                    <div className="text-4xl font-black text-indigo-600 mb-2">{m.value}</div>
                                    <div className="text-xs text-gray-900 font-bold uppercase tracking-widest">{m.label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div>
                        <h4 className="font-bold uppercase text-gray-400 text-xs tracking-widest mb-4">Summary</h4>
                        <p className="text-xl text-gray-800 leading-relaxed font-medium">
                            {description}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase text-gray-400 text-xs tracking-widest mb-4">My Contribution</h4>
                        <p className="text-lg text-black font-bold leading-relaxed border-l-4 border-indigo-500 pl-4 py-1">
                            {contributionSummary}
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex gap-8 text-sm font-mono text-gray-500">
                        <div>
                            <span className="block font-bold text-black uppercase mb-1">Period</span>
                            {period}
                        </div>
                        <div>
                            <span className="block font-bold text-black uppercase mb-1">Role</span>
                            {role}
                        </div>
                    </div>
                </div>
            </div>
        </PortfolioSection>
    );
};
