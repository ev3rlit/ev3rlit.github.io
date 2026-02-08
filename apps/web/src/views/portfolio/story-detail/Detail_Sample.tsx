import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';
import { Server, Database } from 'lucide-react';

export const Detail_Sample = () => {
    return (
        <SwissProjectDetail
            projectInfo={{
                number: "001",
                title: "대규모 게임 서버\n클라우드 마이그레이션",
                description: "계약 만료로 인한 긴급 이관 상황에서 AWS에서 Naver Cloud로 3개월 만에 무중단 데이터 마이그레이션을 성공적으로 수행했습니다.",
                role: "Lead Backend Engineer",
                period: "2024.01 — 2024.03 (3개월)",
                links: {
                    github: "#",
                    demo: "#"
                }
            }}
            overview={{
                intro: "이 프로젝트는 퍼블리셔와의 계약 종료로 인해 기존 운영 중이던 게임 서비스를 새로운 인프라 환경으로 긴급하게 이관해야 했던 미션 크리티컬한 프로젝트였습니다.",
                goals: "데이터 유실 0건, 다운타임 최소화(4시간 이내), 그리고 이관 후 성능 최적화를 통한 비용 절감을 목표로 했습니다.",
                strategy: "기존 AWS 인프라를 Naver Cloud Platform(NCP)으로 1:1 매핑하여 리스크를 줄이고, 데이터 동기화를 위해 CDC(Change Data Capture) 패턴을 도입했습니다."
            }}
            keywords={[
                {
                    category: "Backend",
                    items: ["Golang", "Microservices", "gRPC"]
                },
                {
                    category: "Database",
                    items: ["MongoDB", "Redis", "MySQL"]
                },
                {
                    category: "DevOps",
                    items: ["Docker", "Kubernetes", "Naver Cloud"]
                },
                {
                    category: "Tools",
                    items: ["Terraform", "Ansible", "Grafana"]
                }
            ]}
            architecture={
                <div className="aspect-[16/9] w-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center border border-dashed border-stone-300 dark:border-stone-700">
                    <div className="text-center p-8">
                        <Server className="w-16 h-16 mx-auto mb-4 text-stone-400" />
                        <h3 className="text-lg font-bold text-stone-500">System Architecture Diagram</h3>
                        <p className="text-sm text-stone-400 mt-2">AWS to NCP Migration Flow (Wireframe)</p>
                        <div className="flex gap-4 mt-8 justify-center opacity-50">
                            <div className="w-24 h-24 border-2 border-stone-400 rounded flex flex-col items-center justify-center">
                                <span className="text-xs font-bold">AWS</span>
                                <Database className="w-6 h-6 mt-2" />
                            </div>
                            <div className="flex items-center text-stone-400 font-bold">--- CDC/Sync ---&gt;</div>
                            <div className="w-24 h-24 border-2 border-stone-400 rounded flex flex-col items-center justify-center">
                                <span className="text-xs font-bold">NCP</span>
                                <Database className="w-6 h-6 mt-2" />
                            </div>
                        </div>
                    </div>
                </div>
            }
            mainTasks={[
                {
                    title: "인프라스트럭처 구축 (IaC)",
                    description: "Terraform을 활용하여 Naver Cloud Platform 상에 VPC, Subnet, ACL 등 네트워크 환경과 Kubernetes 클러스터를 코드로 정의하여 2주 만에 구축했습니다."
                },
                {
                    title: "양방향 데이터 동기화",
                    description: "이관 중 게임 서비스를 중단하지 않기 위해, AWS와 NCP 간의 실시간 데이터 동기화 파이프라인을 구축하여 유저가 어느 서버에 접속하든 최신 데이터를 볼 수 있게 했습니다."
                },
                {
                    title: "블루/그린 배포 전략",
                    description: "신규 환경(Green)에서 충분한 QA를 진행한 후, DNS 스위칭을 통해 트래픽을 일시에 전환하는 전략으로 다운타임을 30분 이내로 줄였습니다."
                }
            ]}
            challenges={[
                {
                    problem: "네트워크 레이턴시: 클라우드 간 VPN 연결 시 간헐적인 패킷 손실 발생",
                    solution: "전용회선(Direct Connect) 도입 및 애플리케이션 레벨에서의 재시도(Retry) 로직과 멱등성 보장 설계를 통해 데이터 정합성을 확보했습니다."
                },
                {
                    problem: "데이터 스키마 불일치: 구버전과 신버전 DB 스키마 차이로 인한 마이그레이션 실패",
                    solution: "마이그레이션 미들웨어를 개발하여 실시간으로 데이터를 변환(Transform)하고 검증(Validate)하는 단계를 추가하여 해결했습니다."
                }
            ]}
        />
    );
};
