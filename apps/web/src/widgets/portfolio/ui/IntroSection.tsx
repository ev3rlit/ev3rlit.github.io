
import { PortfolioSection } from "./PortfolioSection";

const ValueItem = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
    <div className="flex flex-col gap-3 group">
        <span className="text-xs font-mono text-gray-300 font-bold group-hover:text-indigo-600 transition-colors uppercase tracking-widest">{number}</span>
        <h4 className="text-lg font-black uppercase text-black">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed font-medium break-keep">{desc}</p>
    </div>
);

const KeywordCard = ({ number, title, sub, desc }: { number: string, title: string, sub: string, desc: string }) => (
    <div className="bg-gray-50 p-8 border-l-4 border-indigo-600 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-default">
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-black text-black uppercase">{title}</h3>
            <span className="font-mono text-gray-200 text-2xl font-bold group-hover:text-indigo-100 transition-colors">{number}</span>
        </div>
        <p className="text-indigo-600 font-bold mb-4 text-sm uppercase tracking-wide">{sub}</p>
        <p className="text-gray-700 text-sm leading-relaxed break-keep font-medium">{desc}</p>
    </div>
);

export const IntroSection = () => {
    return (
        <PortfolioSection>
            <div className="flex justify-between items-end border-b-4 border-black pb-6 mb-12">
                <h2 className="text-5xl font-black text-black tracking-tighter">INTRODUCTION<br />& APPEAL</h2>
                <span className="text-2xl font-bold text-gray-300">02</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left Col: Introduction */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-10 leading-[1.1] text-black">
                            서비스의 <span className="text-indigo-600 underline decoration-4 underline-offset-4 decoration-indigo-200">안정성</span>을<br />
                            최우선으로 생각하는<br />
                            서버 개발자입니다.
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed font-medium border-l-2 border-gray-200 pl-6 mb-12">
                            단순히 기능이 동작하는 것을 넘어, 장애가 발생하지 않는 구조를 설계하는 데 집중합니다.
                            동료들이 <strong className="text-black">"범들갑"</strong>이라고 부를 정도로 꼼꼼하게 예외 상황을 대비하며,
                            이 "호들갑"이 결국 꼼꼼한 Risk Assessment가 되어 시스템의 안정성을 지키는 무기가 됩니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                        <ValueItem number="VALUE 01" title="Data Integrity" desc="보여지는 결과(UI)와 실제 처리(DB)는 반드시 일치해야 한다." />
                        <ValueItem number="VALUE 02" title="Traceability" desc="추적 불가능한 에러는 죄악이다." />
                        <ValueItem number="VALUE 03" title="Efficiency" desc="개발자의 1시간은 운영팀의 100시간을 아껴야 한다." />
                    </div>
                </div>

                {/* Right Col: Appeal Points */}
                <div className="lg:col-span-7 flex flex-col justify-center gap-6">
                    <KeywordCard
                        number="01"
                        title="Risk Assessment"
                        sub="동료들이 '범들갑'이라 부르는 꼼꼼함"
                        desc="발생 가능한 모든 엣지 케이스를 사전에 시뮬레이션하고 방어 코드를 작성합니다. 불안함이 곧 시스템의 안정성이 된다고 믿습니다."
                    />
                    <KeywordCard
                        number="02"
                        title="Structuring"
                        sub="복잡한 로직을 한 장의 지도로"
                        desc="대학 시절부터 키워온 마인드맵 사고방식으로, 복잡한 비즈니스 로직과 아키텍처를 시각화하여 팀원 모두가 이해할 수 있는 '명확한 설계도'로 변환합니다."
                    />
                    <KeywordCard
                        number="03"
                        title="Ownership"
                        sub="내 코드 밖에도 해결책은 있다"
                        desc="클라이언트 이슈, 퍼블리셔 장애 등 내 코드의 범위를 벗어난 문제라도 방관하지 않습니다. 서비스 정상화를 최우선으로, 우회로를 찾고 해결책을 제시합니다."
                    />
                </div>
            </div>
        </PortfolioSection>
    );
};
