"use client";

import {
	SwissWeaknessSection,
	type WeaknessItem,
} from "./SwissWeaknessSection";

const defaultItems: WeaknessItem[] = [
	{
		id: "rest-api",
		weakness: "REST API 경험 부족",
		background:
			"게임 서버에서는 WebSocket 기반 실시간 RPC로 통신합니다. HTTP 기반 REST API와는 근본적으로 다른 통신 패턴이기 때문에, REST API를 직접 구현한 경험이 부족합니다.",
		transferableSkills: [
			"WebSocket 미들웨어 레이어 직접 설계 → Express/NestJS 미들웨어와 동일 개념",
			"핸들러 라우팅 시스템 구축 → REST 라우팅과 유사한 구조",
			"에러 핸들링 체계화 → HTTP 상태 코드 + 에러 응답 체계와 동일 원리",
		],
		responseStrategy:
			"NestJS로 REST API 학습 진행 중. 미들웨어/라우팅 설계 경험을 기반으로 RESTful 원칙 적용으로 전환 예정.",
	},
	{
		id: "orm-sql",
		weakness: "ORM/SQL 최적화 경험 부족",
		background:
			"BladeX에서는 MySQL + Stored Procedure, 삼국에서는 MongoDB 드라이버를 직접 사용했습니다. ORM(TypeORM, Prisma 등)을 직접 사용한 경험은 없습니다.",
		transferableSkills: [
			"MongoDB 인덱싱 전략 → 쿼리 패턴 분석 기반 성능 최적화 경험",
			"Write-behind 캐싱 설계 → 응답 시간 50ms → 5ms (10배 개선)",
			"대규모 데이터 마이그레이션 → 10만 건 무중단 이관, 배치 병렬 처리",
		],
		responseStrategy:
			"Go 6개월 출시와 동일한 학습 패턴으로 실전 중심 습득 가능. MongoDB 쿼리 경험이 SQL/ORM으로 자연스럽게 전환 가능.",
	},
	{
		id: "container-k8s",
		weakness: "컨테이너/K8s 경험 부족",
		background:
			"사내에 자체 배포 시스템이 있었기 때문에 Docker나 Kubernetes를 직접 사용할 기회가 없었습니다.",
		transferableSkills: [
			"AWS → Naver Cloud 전체 인프라 마이그레이션 주도 (서비스 중단 0)",
			"Jenkins CI/CD 파이프라인 구축 → GitHub Actions로 전환 가능",
			"빌드 → 배포 → 모니터링의 전체 흐름 이해",
		],
		responseStrategy:
			"Docker로 개인 프로젝트 컨테이너화 → Docker Compose 멀티 서비스 환경 → K8s 기본 개념 순서로 학습 계획 수립.",
	},
	{
		id: "web-framework",
		weakness: "웹 프레임워크 경험 부족",
		background:
			"게임 서버에서는 Express, NestJS 같은 웹 프레임워크 대신 WebSocket 기반 자체 서버 프레임워크를 구축하여 사용했습니다.",
		transferableSkills: [
			"미들웨어 레이어 직접 설계 → NestJS 미들웨어/Guard/Interceptor와 동일 개념",
			"핸들러 라우팅 시스템 → Express/NestJS 컨트롤러 라우팅과 동일 패턴",
			"에러 핸들링 체인 → NestJS Exception Filter와 동일 역할",
		],
		responseStrategy:
			"NestJS 핵심 개념(Module, Controller, Service, DI) 학습 진행 중. 이미 설계·구현한 개념들이므로 빠르게 적응 가능.",
	},
];

export const SwissWeaknessSection_Default = () => {
	return (
		<SwissWeaknessSection
			items={defaultItems}
			closingMessage={{
				title: "약점을 보완하는 이미 증명된 학습력",
				content:
					"게임 서버에서 쌓은 설계 역량은 도메인을 넘어 웹 백엔드에도 직접 적용 가능합니다. 부족한 영역은 이미 증명된 학습 패턴으로 빠르게 보완할 수 있습니다.",
				proofPoints: [
					"Go, MongoDB를 처음 접하고 6개월 만에 상용 서비스 출시 — 새로운 기술 스택 빠르게 습득 가능",
					"RDBMS → NoSQL 패러다임 전환 — 다른 DB/ORM도 빠르게 적응 가능",
					"서버 설계 경험 없이 시작 → CQRS + Event Sourcing까지 — 자기주도 아키텍처 학습 역량",
				],
			}}
		/>
	);
};
