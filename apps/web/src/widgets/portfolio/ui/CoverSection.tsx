
import { PortfolioSection } from "./PortfolioSection";

export const CoverSection = () => {
    return (
        <PortfolioSection className="flex flex-col justify-between">
            {/* Top Empty Space / Grid Line is handled by wrapper */}

            <div className="flex-1 flex flex-col justify-center">
                <span className="text-indigo-600 font-bold text-lg tracking-widest mb-4 uppercase">
                    Server Developer Portfolio
                </span>

                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] text-black mb-12">
                    RISK<br />
                    ASSESSMENT<br />
                    <span className="opacity-30">ARCHITECT.</span>
                </h1>

                <div className="grid grid-cols-12 gap-4 mt-8">
                    <div className="col-span-12 md:col-span-8 lg:col-span-6">
                        <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800 border-l-4 border-indigo-600 pl-6 break-keep">
                            "동료들이 <span className="font-bold text-black">'범들갑'</span>이라 부르는 꼼꼼함으로,<br />
                            아직 일어나지 않은 문제까지 대비하여<br />
                            시스템의 <span className="text-indigo-600 font-bold">절대적 안정성</span>을 책임집니다."
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end border-b-2 border-black pb-4 mt-8">
                <div className="flex flex-col">
                    <span className="font-bold text-sm text-gray-400 uppercase">Candidate</span>
                    <span className="text-2xl font-bold">Choi BeomHwi</span>
                </div>
                <div className="flex space-x-6 text-sm font-bold tracking-tight uppercase">
                    <span>#System_Stability</span>
                    <span>#Golang</span>
                    <span>#Risk_Management</span>
                </div>
            </div>
        </PortfolioSection>
    );
};
