"use client";

import {
	SwissWeaknessSection,
	type WeaknessItem,
} from "@/widgets/portfolio/swissminimal/ui/SwissWeaknessSection";

const backendExemItems: WeaknessItem[] = [
	{
		id: "kafka-streaming",
		weakness: "Kafka/스트리밍 처리 직접 경험 부족",
		background:
			"AWS Kinesis 기반 로그 파이프라인을 구축하여 일일 1,000만 건의 데이터를 처리했지만, Kafka를 직접 운영한 경험은 없습니다.",
		transferableSkills: [
			"AWS Kinesis 기반 로그 파이프라인 구축 → 스트리밍 처리의 핵심 개념(Producer-Consumer, 파티셔닝, 배치 전송) 경험",
			"일일 1,000만 건, 분당 7,000건 로그 안정 처리 → 대용량 스트리밍 데이터 처리 경험",
			"묶음 전송 + 자동 폐기 로직 설계 → 메시지 큐 기반 시스템의 신뢰성 보장 패턴 이해",
		],
		responseStrategy:
			"Kinesis와 Kafka는 스트리밍 처리의 핵심 개념(Producer-Consumer, 파티션, 오프셋)이 동일. 대용량 로그 파이프라인 실전 경험이 Kafka 환경으로 빠르게 전환 가능한 기반.",
	},
	{
		id: "clickhouse",
		weakness: "ClickHouse/분석용 DB 경험 부족",
		background:
			"BladeX에서는 MySQL + Stored Procedure, 삼국에서는 MongoDB를 사용했습니다. 컬럼형 분석용 DB(ClickHouse 등)를 직접 사용한 경험은 없습니다.",
		transferableSkills: [
			"MongoDB 인덱싱 전략 → 쿼리 패턴 분석 기반 성능 최적화 경험",
			"Write-behind 캐싱 설계 → 응답 시간 50ms → 5ms (10배 개선)",
			"대규모 데이터 마이그레이션 → 10만 건 무중단 이관, 배치 병렬 처리",
		],
		responseStrategy:
			"MySQL(RDBMS) → MongoDB(NoSQL) 패러다임 전환을 6개월 만에 습득한 학습 패턴. 데이터 모델링과 쿼리 최적화의 핵심 원리는 DB 종류와 무관하게 동일.",
	},
	{
		id: "rest-api",
		weakness: "REST API 경험 부족",
		background:
			"게임 서버에서는 WebSocket 기반 실시간 RPC로 통신합니다. HTTP 기반 REST API를 직접 구현한 경험은 부족하지만, 비동기/메시지 기반 시스템(CQRS + Event Sourcing)은 실전에서 적용했습니다.",
		transferableSkills: [
			"CQRS + Event Sourcing 실전 적용 → 비동기/메시지 기반 시스템 설계 경험 (공고 자격요건 충족)",
			"WebSocket 미들웨어 레이어 직접 설계 → HTTP 미들웨어와 동일 개념",
			"핸들러 라우팅 시스템 구축 → REST 라우팅과 유사한 구조",
		],
		responseStrategy:
			"엑셈 공고의 자격요건은 'REST API 또는 비동기/메시지 기반 시스템'. CQRS + Event Sourcing으로 비동기 시스템을 실전 적용한 경험이 직접 매칭.",
	},
	{
		id: "container-k8s",
		weakness: "Docker/K8s 운영 경험 부족",
		background:
			"사내에 자체 배포 시스템이 있었기 때문에 Docker나 Kubernetes를 직접 사용할 기회가 없었습니다.",
		transferableSkills: [
			"AWS → Naver Cloud 전체 인프라 마이그레이션 주도 (서비스 중단 0)",
			"Jenkins CI/CD 파이프라인 구축 → 다른 CI/CD 도구로 전환 가능",
			"빌드 → 배포 → 모니터링의 전체 흐름 이해",
		],
		responseStrategy:
			"Docker 컨테이너화 학습 진행 중. 인프라 마이그레이션과 CI/CD 파이프라인 구축 경험이 컨테이너 기반 배포 환경 이해의 기반.",
	},
];

export const SwissWeaknessSection_BackendExem = () => {
	return (
		<SwissWeaknessSection
			subtitle="엑셈 CORE팀 Golang 포지션 맞춤 분석"
			quote="Go 기반 고성능 서버 설계와 데이터 파이프라인 구축 경험이 CORE팀의 핵심 역량과 직결됩니다"
			targetRole="Golang 백엔드 개발자"
			items={backendExemItems}
			closingMessage={{
				title: "약점을 보완하는 이미 증명된 학습력",
				content:
					"Go 기반 고성능 서버 설계와 데이터 파이프라인 구축 경험은 CORE팀의 핵심 업무와 직결됩니다. 부족한 영역은 이미 증명된 학습 패턴으로 빠르게 보완할 수 있습니다.",
				proofPoints: [
					"Go·MongoDB를 처음 접하고 6개월 만에 상용 서비스 출시 — Kafka/ClickHouse도 동일 패턴으로 습득 가능",
					"MySQL → MongoDB 패러다임 전환 — ClickHouse 컬럼형 DB도 빠르게 적응 가능",
					"AWS Kinesis 로그 파이프라인 구축 — Kafka 스트리밍 처리로 자연스러운 확장",
				],
			}}
		/>
	);
};
