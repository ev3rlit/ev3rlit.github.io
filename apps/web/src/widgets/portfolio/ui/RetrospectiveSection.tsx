
import { PortfolioSection } from "./PortfolioSection";

interface RetrospectiveProps {
    sectionNumber: string;
    title: string;
    subTitle: string;
    evolution: { title: string, items: string[] };
    techDebt: { title: string, items: string[] };
    lessons: { title: string, items: string[] };
    quote: string;
}

const RetroColumn = ({ title, subTitle, items, isDark = false }: { title: string, subTitle: string, items: string[], isDark?: boolean }) => (
    <div className={`flex flex-col h-full border border-black ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className={`p-6 border-b border-black ${isDark ? 'border-white/20' : ''}`}>
            <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${isDark ? 'text-gray-400' : 'text-indigo-600'}`}>{subTitle}</span>
            <h3 className="text-2xl font-black uppercase tracking-tight">{title}</h3>
        </div>
        <ul className="p-6 space-y-6 flex-1">
            {items.map((item, i) => (
                <li key={i} className="flex gap-4 text-sm md:text-base leading-relaxed font-medium">
                    <span className={`font-mono font-bold shrink-0 ${isDark ? 'text-indigo-400' : 'text-black'}`}>
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: item }} className={isDark ? 'text-gray-300' : 'text-gray-700'} />
                </li>
            ))}
        </ul>
    </div>
);

export const RetrospectiveSection = ({
    sectionNumber,
    title,
    subTitle,
    evolution,
    techDebt,
    lessons,
    quote
}: RetrospectiveProps) => {
    return (
        <PortfolioSection>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="gap-6 mb-12 border-b-4 border-black pb-8 flex justify-between items-end">
                    <div>
                        <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2 block">{sectionNumber}</span>
                        <h2 className="text-5xl md:text-6xl font-black text-black tracking-tighter uppercase leading-none">{title}</h2>
                    </div>
                    <p className="text-xl text-black font-bold uppercase hidden md:block">{subTitle}</p>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-r border-black flex-1 min-h-0">
                    <div className="border-l border-b border-black md:border-b-0 h-full">
                        <RetroColumn
                            title={evolution.title}
                            subTitle="Success Points"
                            items={evolution.items}
                        />
                    </div>
                    <div className="border-l border-b border-black md:border-b-0 h-full">
                        <RetroColumn
                            title={techDebt.title}
                            subTitle="Critical Issues"
                            items={techDebt.items}
                        />
                    </div>
                    <div className="border-l border-b border-black md:border-b-0 h-full">
                        {/* Highlight Column */}
                        <RetroColumn
                            title={lessons.title}
                            subTitle="Key Learning"
                            items={lessons.items}
                            isDark={true}
                        />
                    </div>
                </div>

                {/* Quote Footer - Sans Serif! */}
                <div className="py-8 mt-auto border-t-2 border-black">
                    <p className="text-2xl md:text-3xl font-bold tracking-tight text-center text-black">
                        "<span className="text-indigo-600">{quote}</span>"
                    </p>
                </div>
            </div>
        </PortfolioSection>
    );
};
