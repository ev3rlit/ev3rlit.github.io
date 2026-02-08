'use client';

import { SwissDetailLayout } from '@/views/portfolio/detail/layout/SwissDetailLayout';
import { CodeBlock } from '@/features/mdx-viewer/ui/CodeBlock';

interface StoryDetail_ErrorHandlingProps {
    onBack?: () => void;
}

export const StoryDetail_ErrorHandling = ({ onBack }: StoryDetail_ErrorHandlingProps) => {
    return (
        <SwissDetailLayout
            title="구조화된 에러 핸들링 시스템 구축"
            category="Infrastructure"
            date="2024.03"
            tags={['Golang', 'Architecture', 'Error Handling']}
            onBack={onBack}
            isEmbedded={!!onBack}
        >
            <div className="flex flex-col items-center w-full max-w-3xl mx-auto pb-32 pt-12">

                {/* 1. 배경 (Situation) */}
                <section className="w-full mb-20 text-center md:text-left">
                    <h2 className="heading-md mb-6 text-stone-500">1. 배경 (Background)</h2>
                    <p className="body-text text-lg text-stone-800 leading-relaxed mb-6">
                        이전 프로젝트에서는 별도의 에러 핸들링 체계 없이, Enum으로 정의된 에러 코드를 함수 반환형으로 사용하는 것이 전부였습니다.
                    </p>
                    <div className="space-y-4 text-stone-700 leading-relaxed bg-stone-50 p-8 border border-stone-200">
                        <p>
                            문제 발생 시 에러 코드 외에는 발생 위치나 당시 상황을 확인할 방법이 없었고,
                            별도의 로그를 심어서 재현을 기다려야 하는 수동적인 방식이었습니다.
                        </p>
                        <p>
                            이로 인해 중요한 에러 컨텍스트 정보를 놓치거나,
                            문제 해결이 지연되는 상황이 반복되었습니다.
                        </p>
                    </div>
                </section>

                {/* 2. 의사결정 (Decision) */}
                <section className="w-full mb-20 text-center md:text-left">
                    <h2 className="heading-md mb-6 text-stone-500">2. 의사결정 (Decision)</h2>
                    <p className="body-text text-lg text-stone-800 leading-relaxed mb-8">
                        이전 프로젝트의 에러 핸들링의 문제점을 경험하고, '삼국블레이드 키우기' 프로젝트 초기 단계부터 에러 핸들링을 설계했습니다.
                        golang의 기본 에러 처리도 충분히 훌륭하지만, 기본 라이브러리는 에러 메시지를 텍스트 기반으로 처리하는 것은 부족하다고 판단했습니다.
                    </p>

                    <h3 className="font-bold text-xl mb-4">요구사항</h3>
                    <ul className="list-disc list-inside mb-8 space-y-2 text-stone-700">
                        <li>어떤 요청으로 에러가 발생했는지</li>
                        <li>에러의 원인은 무엇인지</li>
                        <li>어디서 발생했는지</li>
                        <li>당시 상황에 대한 구조화된 정보</li>
                    </ul>

                    <h3 className="font-bold text-xl mb-4">오픈소스 Fork 결정</h3>
                    <p className="body-text text-stone-700 leading-relaxed mb-6">
                        여러 라이브러리를 탐색하던 중 위의 조건에 부합하는 `oops` 패키지를 발견했으나,
                        에러 코드가 정수형이 아닌 문자열로 되어 있어 클라이언트(Unreal Engine)와의 에러 코드 통신 규약에 맞지 않았습니다.
                        <br /><br />
                        따라서 이를 <strong>Fork</strong>하여 우리 프로젝트에 적합하도록 개선하는 작업을 진행했습니다.
                    </p>
                </section>

                {/* 3. 구현 내용 (Implementation) */}
                <section className="w-full mb-20 text-center md:text-left">
                    <h2 className="heading-md mb-6 text-stone-500">3. 수정한 내역 (Implementation)</h2>

                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-lg mb-2">1. 정수형 에러 코드 도입</h4>
                            <p className="text-stone-700 mb-4">
                                문자열 대신 Integer 기반의 에러 코드를 사용하여 클라이언트 프로토콜과의 호환성을 확보했습니다.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-2">2. 에러 코드 반환 함수 수정</h4>
                            <p className="text-stone-700 mb-4">
                                oops 패키지의 에러 코드 반환 함수는 원인이 되는 에러를 재귀적으로 찾아 코드를 반환합니다.
                                하지만 비즈니스 로직을 처리하다보면 에러를 전파하기전에 특정 에러코드로 변환하여 감싸야하는 경우가 발생합니다.
                                (예: DB 에러를 Permission 에러로 변환하여 반환)

                                에러 전파(Wrap())시 원인 에러의 코드를 반환하는게 아니라, 현재 레이어에서 재정의한 에러 코드를 반환하도록 수정했습니다.
                            </p>
                            <CodeBlock className="language-go">
                                {`
func 
                                `}
                            </CodeBlock>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-2">3. Public 에러 추가 (보안)</h4>
                            <p className="text-stone-700 mb-4">
                                서버에서 발생한 에러의 Context 정보를 클라이언트에 그대로 노출할 수 없으므로 에러 코드와 메시지를 제공하는
                                Public 에러 타입을 추가했습니다.
                                `err.Public()` 호출 시 보안에 민감한 콜스택이나 내부 경로를 제외하고,
                                오직 <strong>에러 코드와 메시지</strong>만 반환합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. 사용 예시 (Usage) */}
                <section className="w-full mb-20 text-center md:text-left">
                    <h2 className="heading-md mb-6 text-stone-500">4. 사용 예시 (Usage)</h2>
                    <p className="text-stone-600 mb-4 text-sm font-mono">shop_service.go / PurchaseProduct 함수</p>
                    <CodeBlock className="language-go">
                        {`func (s *ShopService) PurchaseProduct(ctx context.Context, pid int, qty int) error {
    // 1. Context 주입 (당시 상황 기록)
    eb := nope.With("productId", pid).With("quantity", qty)

    if qty <= 0 {
        return eb.CodeError(ue.PurchaseQuantityNegative)
    }

    if err := s.repo.Find(pid); err != nil {
        // 2. 에러 래핑 (스택 트레이스 자동 수집)
        // 하위 에러가 발생해도, 상위에서 정의한 문맥이 함께 보존됨
        return eb.Wrap(err) 
    }
    
    return nil
}`}
                    </CodeBlock>
                </section>

                {/* 5. 성과 (Impact) */}
                <section className="w-full mb-20 text-center md:text-left">
                    <h2 className="heading-md mb-6 text-stone-500">5. 성과 (Impact)</h2>
                    <ul className="list-disc list-inside space-y-4 text-stone-800 text-lg leading-relaxed">
                        <li>
                            <strong>팀 온보딩 완료:</strong> 라이브러리 도입 후 팀원들에게 온보딩 과정을 진행하여,
                            "이전 방식 vs 개선된 방식"을 명확히 설명하고 정착시켰습니다.
                        </li>
                        <li>
                            <strong>디버깅 효율 극대화:</strong> 에러 발생 시 서버 로그에서
                            <strong>[Context + 에러코드 + 메시지 + 스택 트레이스]</strong>를 한 번에 확인할 수 있게 되어,
                            문제 원인 파악 속도가 비약적으로 상승했습니다.
                        </li>
                    </ul>
                </section>

            </div>
        </SwissDetailLayout>
    );
};
