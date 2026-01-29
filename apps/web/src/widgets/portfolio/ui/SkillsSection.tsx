
import { PortfolioSection } from "./PortfolioSection";

export const SkillsSection = () => {
    return (
        <PortfolioSection className="justify-center items-center">
            {/* Removed theme="black" */}
            <div className="max-w-5xl w-full flex flex-col gap-16">
                <div>
                    <h2 className="text-6xl md:text-8xl font-black text-black mb-12 tracking-tighter leading-[0.9]">
                        COLLABORATION<br />
                        <span className="text-indigo-600">STYLE.</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="p-8 border-l-4 border-black bg-gray-50">
                            <h3 className="text-xl font-bold text-black mb-4 uppercase">Constructive<br />Feedback</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">문제 지적을 넘어 '현상(Side Effect)'과 '대안'을 제시하는 건설적 피드백을 지향합니다.</p>
                        </div>
                        <div className="p-8 border-l-4 border-black bg-gray-50">
                            <h3 className="text-xl font-bold text-black mb-4 uppercase">Visual<br />Communication</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">복잡한 로직은 말보다 마인드맵이나 다이어그램으로 그려서 명확하게 공유합니다.</p>
                        </div>
                        <div className="p-8 border-l-4 border-black bg-gray-50">
                            <h3 className="text-xl font-bold text-black mb-4 uppercase">Documentation<br />First</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">구두 논의 후 반드시 텍스트로 요약하여 문맥을 공유하고 히스토리를 남깁니다.</p>
                        </div>
                    </div>
                </div>

                <div className="border-t-4 border-black pt-12 flex justify-between items-end">
                    <div>
                        <p className="text-black font-bold uppercase tracking-widest text-sm mb-4">Contact Candidate</p>
                        <a href="mailto:bum4496@naver.com" className="text-4xl md:text-6xl font-black text-black hover:text-indigo-600 transition-colors tracking-tight block mb-2">
                            bum4496@naver.com
                        </a>
                        <a href="https://github.com/ev3rlit" target="_blank" rel="noreferrer" className="text-2xl font-bold text-gray-400 hover:text-black transition-colors">
                            github.com/ev3rlit
                        </a>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-[10rem] leading-none font-black text-gray-100 -mb-12 -mr-12">BH</div>
                    </div>
                </div>
            </div>
        </PortfolioSection>
    );
};
