"use client";

import {
	SwissWeaknessSection,
	type WeaknessItem,
} from "@/widgets/portfolio/swissminimal/ui/SwissWeaknessSection";

const defaultItems: WeaknessItem[] = [
	{
		id: "rest-api",
		weakness: "REST API 경험 부족",
		background:
			"게임 서버에서는 WebSocket 기반 실시간 RPC로 통신합니다. HTTP 기반 REST API와는 근본적으로 다른 통신 패턴이기 때문에, REST API를 직접 구현한 경험이 부족합니다.",
		transferableSkills: [
			"WebSocket 미들웨어 레이어 직접 설계 → NestJS Middleware/Guard/Interceptor와 동일 개념",
			"핸들러 라우팅 시스템 구축 → NestJS Controller 라우팅과 유사한 구조",
			"에러 핸들링 체계화 → NestJS Exception Filter와 동일 원리",
		],
		responseStrategy:
			"NestJS로 REST API 학습 진행 중. 미들웨어/라우팅/에러 핸들링을 직접 설계한 경험이 NestJS의 Module·Controller·Service 패턴으로 자연스럽게 전환 가능.",
	},
	{
		id: "orm-sql",
		weakness: "ORM/SQL 최적화 경험 부족",
		background:
			"BladeX에서는 MySQL + Stored Procedure, 삼국에서는 MongoDB 드라이버를 직접 사용했습니다. TypeORM, Prisma 등 Node.js ORM을 직접 사용한 경험은 없습니다.",
		transferableSkills: [
			"MongoDB 인덱싱 전략 → 쿼리 패턴 분석 기반 성능 최적화 경험",
			"Write-behind 캐싱 설계 → 응답 시간 50ms → 5ms (10배 개선)",
			"대규모 데이터 마이그레이션 → 10만 건 무중단 이관, 배치 병렬 처리",
		],
		responseStrategy:
			"TypeORM/Prisma 학습 진행 중. MongoDB 도큐먼트 모델링과 쿼리 최적화 경험이 관계형 DB 설계와 ORM 활용으로 전환 가능.",
	},
	{
		id: "aws-services",
		weakness: "AWS 관리형 서비스 심화 경험 부족",
		background:
			"AWS 인프라를 실제 운영했지만, Elastic Beanstalk, CDK, CodePipeline 등 관리형 배포·IaC 서비스를 직접 사용한 경험은 부족합니다.",
		transferableSkills: [
			"AWS → NCP 전체 인프라 마이그레이션 주도 (서비스 중단 0) → 클라우드 아키텍처 전환 경험",
			"Jenkins CI/CD 파이프라인 구축 → CodePipeline과 동일한 빌드·배포 자동화 개념",
			"AWS Kinesis 기반 로그 파이프라인 구축 → AWS 서비스 연동 경험",
		],
		responseStrategy:
			"AWS CDK로 인프라 코드화 학습 진행 중. 기존 Jenkins CI/CD 경험이 CodePipeline으로 자연스럽게 전환 가능.",
	},
	{
		id: "web-framework",
		weakness: "Node.js/NestJS 경험 부족",
		background:
			"게임 서버에서는 NestJS 같은 웹 프레임워크 대신 WebSocket 기반 자체 서버 프레임워크를 구축하여 사용했습니다. 다만, 직접 설계한 구조가 NestJS의 핵심 개념과 동일합니다.",
		transferableSkills: [
			"미들웨어 레이어 직접 설계 → NestJS Middleware/Guard/Interceptor와 동일 개념",
			"핸들러 라우팅 시스템 → NestJS Controller 라우팅과 동일 패턴",
			"에러 핸들링 체인 → NestJS Exception Filter와 동일 역할",
			"CQRS + Event Sourcing 실전 적용 → NestJS CQRS 모듈과 동일 아키텍처",
		],
		responseStrategy:
			"NestJS 핵심 개념(Module, Controller, Service, DI) 학습 진행 중. 이미 설계·구현한 개념들이므로 프레임워크 전환이 아닌 표현 방식의 차이.",
	},
];

export const SwissWeaknessSection_BackendGameduo = () => {
	return (
		<SwissWeaknessSection
			subtitle="Node.js / NestJS 백엔드 포지션 맞춤 분석"
			quote="게임 서버에서 직접 설계한 미들웨어·라우팅·에러 핸들링이 NestJS의 핵심 개념과 동일합니다"
			targetRole="Node.js / NestJS 백엔드 개발자"
			items={defaultItems}
			closingMessage={{
				title: "약점을 보완하는 이미 증명된 학습력",
				content:
					"게임 서버에서 쌓은 설계 역량은 NestJS 백엔드에 직접 적용 가능합니다. 부족한 영역은 이미 증명된 학습 패턴으로 빠르게 보완할 수 있습니다.",
				proofPoints: [
					"Go·MongoDB를 처음 접하고 6개월 만에 상용 서비스 출시 — 새로운 기술 스택 빠르게 습득 가능",
					"RDBMS → NoSQL 패러다임 전환 — TypeORM/Prisma도 빠르게 적응 가능",
					"서버 설계 경험 없이 시작 → CQRS + Event Sourcing까지 — 자기주도 아키텍처 학습 역량",
				],
			}}
		/>
	);
};
