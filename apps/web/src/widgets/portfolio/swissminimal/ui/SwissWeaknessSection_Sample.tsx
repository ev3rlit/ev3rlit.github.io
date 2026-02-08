"use client";

import {
	SwissWeaknessSection,
	type WeaknessItem,
} from "./SwissWeaknessSection";

const sampleItems: WeaknessItem[] = [
	{
		id: "rest-api",
		weakness: "REST API 경험 부족",
		relevanceTag: "중간",
		background:
			"Serverless 환경에서도 API Gateway + Lambda 조합으로 RESTful 엔드포인트를 설계합니다. 게임 서버에서는 WebSocket RPC를 사용했기 때문에 REST API 직접 구현 경험은 부족하지만, API 설계의 본질적 역량은 보유하고 있습니다.",
		transferableSkills: [
			"WebSocket 미들웨어 레이어 직접 설계 → Lambda 미들웨어 패턴(middy)과 동일 개념",
			"핸들러 라우팅 시스템 → API Gateway 라우팅과 유사한 구조",
			"에러 핸들링 체계화 → API Gateway 에러 응답 매핑과 동일 원리",
		],
		responseStrategy:
			"NestJS 학습 진행 중이며, Serverless Framework + API Gateway 구성으로 확장 학습 계획. 미들웨어/라우팅 설계 경험이 직접 전환 가능.",
	},
	{
		id: "orm-sql",
		weakness: "ORM/SQL 최적화 경험 부족",
		relevanceTag: "낮음(강점)",
		background:
			"Serverless 백엔드에서는 DynamoDB(NoSQL)가 주력 DB입니다. 게임 서버에서 MongoDB(NoSQL)를 실전 운영한 경험이 DynamoDB로 직접 전환 가능합니다.",
		transferableSkills: [
			"MongoDB 도큐먼트 모델링 → DynamoDB 파티션/소트 키 설계와 동일 사고방식",
			"MongoDB 인덱싱 전략 → DynamoDB GSI/LSI 설계로 자연스럽게 전환",
			"Write-behind 캐싱 → DynamoDB DAX 또는 ElastiCache 전략과 동일 패턴",
			"10만 건 데이터 무중단 이관 → DynamoDB Streams 기반 마이그레이션 경험 전환 가능",
		],
		responseStrategy:
			"MongoDB 실전 운영 경험이 DynamoDB로 직접 이전 가능. NoSQL 사고방식, 인덱싱 전략, 캐싱 패턴 모두 동일 계열.",
	},
	{
		id: "container-k8s",
		weakness: "컨테이너/K8s 경험 부족",
		relevanceTag: "낮음(강점)",
		background:
			"Serverless 아키텍처에서는 컨테이너/K8s 대신 AWS Lambda, SAM CLI, CloudFormation 등을 사용합니다. 인프라 마이그레이션 경험이 IaC(Infrastructure as Code) 역량으로 전환 가능합니다.",
		transferableSkills: [
			"AWS → Naver Cloud 전체 인프라 마이그레이션 → IaC 도구(SAM/CDK) 학습에 유리",
			"Jenkins CI/CD → GitHub Actions + SAM Deploy 파이프라인으로 전환 가능",
			"서버 배포 프로세스 전체 이해 → Serverless 배포 파이프라인 설계 가능",
		],
		responseStrategy:
			"Serverless 포지션에서는 K8s보다 SAM CLI, CloudFormation, CDK가 핵심. 인프라 마이그레이션 경험이 IaC 학습의 기반.",
	},
	{
		id: "web-framework",
		weakness: "웹 프레임워크 경험 부족",
		relevanceTag: "높음",
		background:
			"Serverless에서는 전통적 웹 프레임워크 대신 Lambda 핸들러 + EventBridge/SQS 이벤트 기반 아키텍처를 사용합니다. 게임 서버에서 직접 설계한 이벤트 드리븐 패턴이 직접 전환 가능합니다.",
		transferableSkills: [
			"CQRS + Event Sourcing → EventBridge 이벤트 기반 아키텍처와 동일 패턴",
			"WebSocket 미들웨어 설계 → Lambda Middleware(middy) 패턴과 동일 구조",
			"Redis 분산 락 → SQS FIFO 큐 순서 보장과 유사한 동시성 제어",
		],
		responseStrategy:
			"게임 서버에서 직접 구현한 이벤트 드리븐 + 미들웨어 + 분산 시스템 경험이 Serverless 아키텍처의 핵심 역량으로 직접 전환 가능. Lambda + EventBridge + SQS 학습으로 확장.",
	},
];

export const SwissWeaknessSection_Sample = () => {
	return (
		<SwissWeaknessSection
			sectionLabel="(P3.02)"
			title="약점 & 대응 계획"
			subtitle="Serverless Backend 포지션 맞춤 분석"
			quote="게임 서버의 이벤트 드리븐 경험이 Serverless의 핵심 역량으로 전환됩니다"
			targetCompany="Sample Company"
			targetRole="Serverless Backend Engineer"
			items={sampleItems}
			closingMessage={{
				title: "왜 게임 서버 개발자가 Serverless에 적합한가",
				content:
					"Serverless 아키텍처의 핵심은 이벤트 드리븐, 비동기 처리, 상태 관리입니다. 게임 서버에서 이미 이 패턴들을 실전 규모로 설계·운영한 경험이 있습니다.",
				proofPoints: [
					"CQRS + Event Sourcing 실전 적용 → EventBridge 이벤트 기반 아키텍처 직접 전환 가능",
					"Redis 분산 락 + 동시성 제어 → SQS/Step Functions 워크플로우 설계 경험 전환",
					"MongoDB NoSQL 실전 운영 → DynamoDB 테이블 설계 및 쿼리 최적화 가능",
					"Go 6개월 출시 → 어떤 기술 스택이든 실전 수준으로 빠르게 습득하는 학습력 증명",
				],
			}}
		/>
	);
};
