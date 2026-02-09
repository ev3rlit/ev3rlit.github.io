# Views Layer — Portfolio

> 페이지 단위 조합 컴포넌트. Widgets를 조합하여 완전한 페이지를 구성한다.

## 디렉토리 구조

```
views/portfolio/
├── ui/
│   └── PortfolioPage.tsx              ← Legacy 포트폴리오 (비활성)
├── swissminimal/
│   ├── index.ts                       ← barrel export (SwissMinimalPage)
│   └── ui/
│       └── SwissMinimalPage.tsx        ← 현재 활성 메인 페이지
├── detail/
│   ├── ui/
│   │   └── SwissDetailPage.tsx        ← MDX 콘텐츠 상세 페이지
│   └── layout/
│       └── SwissDetailLayout.tsx      ← Swiss 스타일 상세 레이아웃
├── story-detail/
│   ├── index.ts                       ← barrel export (StoryDetailLayout)
│   ├── ui/
│   │   └── StoryDetailLayout.tsx      ← 스토리 디테일 레이아웃
│   ├── Detail_Sample.tsx
│   ├── Detail_ServiceTransfer.tsx
│   ├── Detail_PaymentMigration.tsx
│   ├── Detail_RevenueApi.tsx
│   ├── Detail_LogPipeline.tsx
│   ├── Detail_AppleTransfer.tsx
│   ├── Detail_GuildMineCqrs.tsx
│   ├── Detail_GuildMineConcurrency.tsx
│   ├── Detail_ErrorHandling.tsx
│   ├── Detail_WebsocketMiddleware.tsx
│   ├── Detail_TrackingContainer.tsx
│   └── Detail_Stories.tsx             ← 스토리 라우터/인덱스
└── projects/
    └── StoryDetail_ErrorHandling.tsx   ← (Legacy) SwissDetailLayout 사용
```

## 핵심 컴포넌트

### SwissMinimalPage (현재 활성)
- **위치**: `swissminimal/ui/SwissMinimalPage.tsx`
- **역할**: 14개 섹션을 풀페이지로 조합
- **`"use client"`**: 키보드 네비게이션 + 사이드바 상태 관리
- **섹션 구성**: Hero → About → Resume → ProjectIntro(삼국) → 6개 FeatureSummary → ProjectIntro(BladeX) → GrowthCurve → Weakness → Contact
- **키보드**: ArrowUp/Down, PageUp/Down, Home/End 지원
- **사이드바**: 마운트 시 포트폴리오 모드 진입, 언마운트 시 복원

### Detail_* 컴포넌트 (11개 스토리)
- **위치**: `story-detail/Detail_*.tsx`
- **패턴**: `SwissProjectDetail` 위젯을 래핑하여 7-Step 내러티브 데이터 전달
- **데이터**: 각 컴포넌트 내부에 정적 하드코딩 (DB 없음)
- **구성**: projectInfo + overview + keywords + screenshots(선택) + architecture(선택) + mainTasks + challenges

### PortfolioPage (Legacy, 비활성)
- **위치**: `ui/PortfolioPage.tsx`
- **특징**: `snap-y snap-mandatory` 스크롤, Story_* 컴포넌트 사용
- **상태**: 현재 라우트에서 사용하지 않음 (SwissMinimalPage로 대체됨)

### SwissDetailLayout
- **위치**: `detail/layout/SwissDetailLayout.tsx`
- **Props**: title, subtitle, category, date, tags, isEmbedded, onBack
- **특징**: framer-motion 애니메이션, 12-column swiss-grid 레이아웃
- **용도**: MDX 기반 상세 페이지에서 사용

### StoryDetailLayout
- **위치**: `story-detail/ui/StoryDetailLayout.tsx`
- **Props**: children, projectId, storyNumber
- **특징**: 헤더(Back 링크 + 프로젝트/스토리 번호) + 본문 영역

## 새 스토리 추가 시

1. `story-detail/Detail_{Name}.tsx` 생성
2. `SwissProjectDetail` 위젯 import 후 데이터 props 전달
3. `app/portfolio/story/[id]/page.tsx`의 storyMap에 등록

### Detail 컴포넌트 템플릿

```tsx
import { SwissProjectDetail } from "@/widgets/portfolio/swissminimal/ui/SwissProjectDetail";

export const Detail_{Name} = () => {
    return (
        <SwissProjectDetail
            projectInfo={{ number: "0XX", title: "...", description: "...", role: "...", period: "...", links: {} }}
            overview={{ intro: "...", goals: "...", strategy: "..." }}
            keywords={[{ category: "Language", items: ["Go"] }]}
            mainTasks={[{ title: "...", description: "..." }]}
            challenges={[{ problem: "...", solution: "..." }]}
        />
    );
};
```

## 의존 관계

```
views/portfolio/
  ├── widgets/portfolio/swissminimal  (SwissProjectDetail, SwissNavigation, 섹션 컴포넌트)
  ├── widgets/portfolio/stories       (SwissFeatureSummary_* 컴포넌트)
  ├── features/layout                 (useSidebarStore)
  └── entities/post                   (Post 타입 — SwissDetailPage에서 사용)
```
