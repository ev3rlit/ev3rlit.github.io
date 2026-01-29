
import { PortfolioSection } from "./PortfolioSection";

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const ResumeBlock = ({ title, children }: SectionProps) => (
    <div className="mb-12">
        <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-8 border-b-2 border-black inline-block pb-2">
            {title}
        </h3>
        <div className="flex flex-col gap-6">
            {children}
        </div>
    </div>
);

const CareerItem = ({ company, role, period, desc, skills }: { company: string, role: string, period: string, desc: string, skills?: string[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 hover:bg-gray-50 p-4 -mx-4 rounded-lg transition-colors group">
        <div className="col-span-3 border-r border-gray-100 pr-4">
            <h4 className="text-xl font-black text-black group-hover:text-indigo-600 transition-colors">{company}</h4>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-wide mt-2">{period}</p>
        </div>
        <div className="col-span-9 pl-4">
            <div className="mb-3">
                <h5 className="font-bold text-gray-900 text-lg">{role}</h5>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm mb-4 font-medium">
                {desc}
            </p>
            {skills && (
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span key={skill} className="text-xs px-2 py-1 bg-white border border-gray-200 rounded font-mono font-bold text-gray-500">
                            {skill}
                        </span>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export const ResumeSection = () => {
    return (
        <PortfolioSection>
            <div className="flex justify-between items-end border-b-4 border-black pb-6 mb-12">
                <h2 className="text-5xl font-black text-black tracking-tighter">EXECUTIVE<br />SUMMARY</h2>
                <span className="text-2xl font-bold text-gray-300">03</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 h-full">
                {/* Left: Profile & Tech Stack */}
                <div className="lg:col-span-4 flex flex-col gap-12 border-r border-gray-100 pr-8">
                    <ResumeBlock title="Profile">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-4xl font-black mb-1">최범휘</h2>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">BeomHwi Choi</p>
                            </div>
                            <div className="text-sm space-y-2 text-gray-600 font-medium">
                                <p>Backend Developer (Server)</p>
                                <p>bum4496@naver.com</p>
                                <p><a href="https://github.com/ev3rlit" className="underline decoration-indigo-500 underline-offset-4 decoration-2">github.com/ev3rlit</a></p>
                            </div>
                        </div>
                        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                            <h5 className="font-bold mb-2 uppercase text-xs text-gray-400 tracking-wider">Education</h5>
                            <p className="font-bold text-gray-900">금오공과대학교</p>
                            <p className="text-sm text-gray-500">컴퓨터소프트웨어공학과</p>
                            <p className="text-xs text-gray-400 mt-1 font-mono">2016.03 - 2022.02</p>
                        </div>
                    </ResumeBlock>

                    <ResumeBlock title="Tech Stack">
                        <div className="space-y-8">
                            <div>
                                <h5 className="font-bold text-sm mb-3">Languages</h5>
                                <div className="flex flex-wrap gap-2">
                                    {["Golang", "C++", "C#"].map(t => (
                                        <span key={t} className="px-3 py-1 bg-black text-white rounded-full text-xs font-bold">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h5 className="font-bold text-sm mb-3">Database</h5>
                                <div className="flex flex-wrap gap-2">
                                    {["MongoDB", "MySQL", "Redis", "AWS DocumentDB"].map(t => (
                                        <span key={t} className="px-3 py-1 bg-white border-2 border-gray-100 rounded-full text-xs font-bold text-gray-600">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h5 className="font-bold text-sm mb-3">Infrastructure</h5>
                                <div className="flex flex-wrap gap-2">
                                    {["AWS (Kinesis, EC2)", "Jenkins", "Naver Cloud"].map(t => (
                                        <span key={t} className="px-3 py-1 bg-white border-2 border-gray-100 rounded-full text-xs font-bold text-gray-600">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ResumeBlock>
                </div>

                {/* Right: Career */}
                <div className="lg:col-span-8 flex flex-col">
                    <ResumeBlock title="Work Experience">
                        <div className="space-y-8">
                            <CareerItem
                                company="NEXUS / ONE UNIVERSE"
                                period="2023.04 - 2025.10"
                                role="Server Architect & Lead"
                                desc="Golang 기반의 삼국블레이드 키우기 서버 아키텍처 설계 및 라이브 운영. Error Handling, Log Pipeline 등 핵심 인프라 구축 주도. 라이브 장애율 대폭 감소."
                                skills={["Golang", "AWS", "MongoDB", "Redis", "Unity"]}
                            />
                            <div className="w-full h-px bg-gray-100" />
                            <CareerItem
                                company="ACTION SQUARE DEV"
                                period="2022.05 - 2023.04"
                                role="Game Server Developer"
                                desc="C++ 기반의 블레이드X 신규 프로젝트 코어 개발. 아이템/인벤토리 로직 설계 및 Legacy 코드 문서화 진행. 초기 시스템 안정화 기여."
                                skills={["C++", "Unreal Engine", "Redis", "MSSQL"]}
                            />
                        </div>
                    </ResumeBlock>
                </div>
            </div>
        </PortfolioSection>
    );
}
