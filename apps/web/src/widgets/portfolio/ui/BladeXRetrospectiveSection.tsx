
import { PortfolioSection } from "./PortfolioSection";

const LessonRow = ({ problem, solution }: { problem: string, solution: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black last:border-0 group">
        <div className="p-8 border-b md:border-b-0 md:border-r border-black bg-white group-hover:bg-gray-50 transition-colors">
            <h4 className="font-bold text-gray-400 mb-3 text-xs uppercase tracking-widest">Pain Point</h4>
            <p className="text-gray-600 font-medium text-lg leading-relaxed">{problem}</p>
        </div>
        <div className="p-8 bg-gray-50/50 group-hover:bg-indigo-50/30 transition-colors">
            <h4 className="font-bold text-indigo-600 mb-3 text-xs uppercase tracking-widest">Methodology Applied</h4>
            <p className="text-black font-black text-xl leading-relaxed">{solution}</p>
        </div>
    </div>
);

export const BladeXRetrospectiveSection = () => {
    return (
        <PortfolioSection>
            <div className="flex flex-col h-full justify-center">
                <div className="mb-12 border-b-4 border-black pb-8">
                    <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2 block">Retrospective</span>
                    <h2 className="text-6xl md:text-7xl font-black text-black tracking-tighter uppercase leading-none mb-4">Lessons from Failure</h2>
                    <p className="text-xl text-black font-bold uppercase border-l-4 border-indigo-600 pl-4">성공보다 더 값진 실패의 기록, 그리고 방법론</p>
                </div>

                <div className="border-2 border-black flex flex-col shadow-xl">
                    <LessonRow
                        problem="에러 발생 시 원인 파악에 하루 이상 소요"
                        solution="Error as Value 패턴 1순위 설계"
                    />
                    <LessonRow
                        problem="시뮬레이션 ≠ 실제 결과로 인한 데이터 오염"
                        solution="트랜잭션 + 롤백 미들웨어 기본 탑재"
                    />
                    <LessonRow
                        problem="복잡한 로직 구현 중 잦은 버그 발생"
                        solution="Pseudo-code First (주석 코딩) 습관화"
                    />
                    <LessonRow
                        problem="레거시 코드 파악에 과도한 시간 소요"
                        solution="아키텍처 문서화 및 가시화(Vis.) 선행"
                    />
                </div>

                <div className="py-12 flex justify-center">
                    <p className="text-2xl md:text-3xl font-bold tracking-tight text-center text-black">
                        "BladeX는 실패했지만, <span className="text-indigo-600 underline underline-offset-4 decoration-4 decoration-indigo-200">내 개발 철학의 기반</span>을 만들었습니다."
                    </p>
                </div>
            </div>
        </PortfolioSection>
    );
};
