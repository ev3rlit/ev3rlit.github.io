"use client";

import {
	SwissWeaknessSection,
	type WeaknessItem,
} from "@/widgets/portfolio/swissminimal/ui/SwissWeaknessSection";

const gameServerItems: WeaknessItem[] = [
	{
		id: "large-scale-concurrency",
		weakness: "대규모 동시접속 경험 부족",
		background:
			"현재까지 운영한 게임 서버는 중소 규모의 동시접속을 처리했습니다. 수만~수십만 CCU 수준의 대규모 동시접속 환경에서의 서버 설계 및 운영 경험은 아직 부족합니다.",
		transferableSkills: [
			"WebSocket 기반 실시간 통신 서버 직접 설계 및 운영 경험",
			"CQRS + Event Sourcing으로 클라이언트 데이터 동기화 최적화",
			"Write-behind 캐싱 → API 응답 시간 10배 개선 (50ms → 5ms)",
			"인메모리 트랜잭션 시스템 구현 → 동시성 제어 경험",
		],
		responseStrategy:
			"실시간 통신, 동시성 제어, 캐싱 전략 등 핵심 역량은 이미 보유. 대규모 트래픽은 부하 테스트 설계와 수평 확장 전략 학습으로 보완 가능.",
	},
	{
		id: "unreal-dedicated",
		weakness: "언리얼 엔진 데디케이티드 서버 경험 부족",
		background:
			"게임 서버 개발 경험은 Go 기반 커스텀 서버에 집중되어 있습니다. 언리얼 엔진 데디케이티드 서버(C++) 환경에서의 실무 경험은 아직 없습니다.",
		transferableSkills: [
			"C++ 기반 게임 서버(BladeX) 개발 경험 → 언어 전환 장벽 낮음",
			"WebSocket RPC 기반 마이크로서비스 아키텍처 직접 설계",
			"핸들러 라우팅, 미들웨어, 에러 핸들링 체계 구축 경험",
		],
		responseStrategy:
			"C++ 실무 경험과 서버 아키텍처 설계 역량이 언리얼 데디케이티드 서버 학습의 기반. Go 6개월 출시와 동일한 학습 패턴으로 빠르게 적응 가능.",
	},
	{
		id: "network-optimization",
		weakness: "네트워크 최적화 심화 경험 부족",
		background:
			"현재까지 네트워크 레이어의 저수준 최적화(패킷 압축, 대역폭 제어, 지연 보상 등)를 직접 다룬 경험은 제한적입니다.",
		transferableSkills: [
			"WebSocket 프로토콜 기반 실시간 서버 직접 구현 경험",
			"gRPC 인터셉터 참고 → WebSocket 미들웨어 레이어 설계",
			"Event Sourcing으로 데이터 동기화 최적화 → 네트워크 트래픽 절감 효과",
		],
		responseStrategy:
			"실시간 통신 프로토콜 설계 경험을 기반으로, 패킷 최적화·지연 보상·대역폭 관리 등 네트워크 심화 영역을 체계적으로 학습 계획 수립.",
	},
	{
		id: "distributed-system",
		weakness: "분산 시스템 설계 심화 경험 부족",
		background:
			"마이크로서비스 아키텍처를 직접 설계했지만, 글로벌 서버 분산 배치, 샤딩, 서버 간 상태 동기화 등 대규모 분산 시스템 경험은 아직 부족합니다.",
		transferableSkills: [
			"WebSocket RPC 기반 마이크로서비스 아키텍처 직접 설계 및 운영",
			"AWS → Naver Cloud 전체 인프라 마이그레이션 주도 (서비스 중단 0)",
			"결제 데이터 10만 건 무중단 이관 → 데이터 정합성 보장 경험",
			"CQRS 패턴 적용 → 읽기/쓰기 분리 설계 경험",
		],
		responseStrategy:
			"마이크로서비스 설계와 인프라 마이그레이션 경험이 분산 시스템 학습의 기반. 서비스 디스커버리, 합의 알고리즘, 샤딩 전략을 체계적으로 학습 중.",
	},
];

export const SwissWeaknessSection_GameServer = () => {
	return (
		<SwissWeaknessSection
			subtitle="게임 서버 개발 포지션 맞춤 분석"
			quote="게임 서버에서 쌓은 실시간 통신·동시성 제어·아키텍처 설계 역량을 기반으로 더 깊이 성장하겠습니다"
			targetRole="게임 서버 개발자"
			items={gameServerItems}
			closingMessage={{
				title: "약점을 보완하는 이미 증명된 학습력",
				content:
					"게임 서버의 핵심 역량(실시간 통신, 동시성 제어, 아키텍처 설계)은 이미 보유하고 있습니다. 부족한 영역은 이미 증명된 학습 패턴으로 빠르게 보완할 수 있습니다.",
				proofPoints: [
					"Go·MongoDB를 처음 접하고 6개월 만에 상용 서비스 출시 — 새로운 기술 스택 빠르게 습득 가능",
					"C++ → Go 패러다임 전환 — 언어·환경 전환에 유연하게 대응",
					"서버 설계 경험 없이 시작 → CQRS + Event Sourcing까지 — 자기주도 아키텍처 학습 역량",
				],
			}}
		/>
	);
};
