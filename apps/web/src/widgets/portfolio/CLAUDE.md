# Widgets Layer — Portfolio

> 재사용 가능한 섹션 단위 UI 컴포넌트. Views에서 조합되어 페이지를 구성한다.

## 디렉토리 구조

```
widgets/portfolio/
├── swissminimal/                    ← Swiss Minimal 디자인 시스템 위젯
│   ├── index.ts                     ← barrel export (16개)
│   └── ui/
│       ├── SwissProjectDetail.tsx   ← 7-Step 내러티브 렌더러 (핵심)
│       ├── SwissSectionContainer.tsx ← 섹션 래퍼 (max-w, px, py)
│       ├── SwissNavigation.tsx      ← 상단 네비게이션
│       ├── SwissHeroSection.tsx     ← 커버/히어로
│       ├── SwissAboutSection.tsx    ← 자기소개
│       ├── SwissResumeSection.tsx   ← 이력서
│       ├── SwissGrowthCurveSection.tsx ← 성장 곡선
│       ├── SwissContactSection.tsx  ← 연락처
│       ├── SwissProjectIntroSection.tsx ← 프로젝트 소개 (base)
│       ├── SwissProjectIntro_SamgukBlade.tsx ← 삼국블레이드 소개
│       ├── SwissProjectIntro_BladeX.tsx ← BladeX 소개
│       ├── SwissStorySection.tsx    ← FeatureSummary 기반 스토리 섹션
│       ├── SwissFeatureIndex.tsx    ← 스토리 목록 테이블
│       ├── SwissFeatureRow.tsx      ← 목록 행 컴포넌트
│       ├── SwissRetrospectiveSection.tsx ← 회고 섹션
│       ├── SwissScreenshotGallery.tsx ← 스크린샷 갤러리
│       ├── SwissWorksSection.tsx    ← 작업 섹션
│       ├── SwissWeaknessSection.tsx  ← 약점 (base)
│       ├── SwissWeaknessSection_NestJS.tsx
│       ├── SwissWeaknessSection_Generic.tsx
│       ├── SwissWeaknessSection_Sample.tsx
│       └── featureData.ts           ← 스토리 매니페스트 (10개)
├── stories/                         ← 메인 페이지용 FeatureSummary 컴포넌트
│   ├── index.ts                     ← barrel export (7개)
│   ├── SwissFeatureSummary_ServiceTransfer.tsx
│   ├── SwissFeatureSummary_Payment.tsx
│   ├── SwissFeatureSummary_ErrorSystem.tsx
│   ├── SwissFeatureSummary_TrackingContainer.tsx
│   ├── SwissFeatureSummary_LogPipeline.tsx
│   ├── SwissFeatureSummary_GuildMineCqrs.tsx
│   └── SwissFeatureSummary_Websocket.tsx
└── ui/                              ← Legacy 위젯 (비활성)
    ├── PortfolioSection.tsx
    ├── CoverSection.tsx
    ├── IntroSection.tsx
    ├── ResumeSection.tsx
    ├── ProjectIntroSection.tsx
    ├── StorySection.tsx
    ├── SkillsSection.tsx
    ├── RetrospectiveSection.tsx
    ├── BladeXRetrospectiveSection.tsx
    └── stories/
        ├── Story_Stability.tsx
        ├── Story_Efficiency.tsx
        ├── Story_Ownership.tsx
        ├── Story_DataEngineering.tsx
        ├── Story_Documentation.tsx
        └── Story_Growth.tsx
```

## 핵심 컴포넌트

### SwissProjectDetail (7-Step 내러티브 렌더러)

스토리 디테일 페이지의 핵심 위젯. Detail_* 컴포넌트에서 래핑하여 사용.

**Props**:
```typescript
{
  projectInfo: { number, title, description, role, period, links: { github?, demo? } }
  overview:    { intro, goals, strategy }
  keywords:    Array<{ category, items[] }>
  screenshots?: Array<{ src, alt, caption? }>      // 선택
  architecture?: ReactNode                          // 선택
  architectureDescription?: string | Array<...>     // 선택
  mainTasks:   Array<{ title, description }>
  challenges:  Array<{ problem, solution }>
}
```

**렌더링 순서**: Header → 01.Overview → 02.Screenshots(선택) → Keywords → Architecture(선택) → Main Tasks → Challenges → Footer

**특징**:
- 동적 섹션 넘버링 (선택적 섹션 유무에 따라 자동 조정)
- SimpleMarkdown 프로세서 (코드 블록, 테이블, 리스트 지원)
- 12-column 그리드 (3col 라벨 + 9col 콘텐츠)
- ImageLightbox 지원

### SwissSectionContainer (섹션 래퍼)

모든 Swiss Minimal 섹션의 일관된 레이아웃 래퍼.

```tsx
<div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-24 pb-6 md:pt-32 md:pb-10">
```

- Props: `children`, `className?`, `id?`
- `cn()` 유틸로 className 병합

### SwissFeatureSummary (SwissStorySection)

메인 페이지에서 스토리 요약을 표시하는 7-Step 컴포넌트.

**Props** (7-Step):
```
sectionNumber, storyNumber, keyword, title, subtitle,
step01_intro, step02_background,
step03_problem, step03_solution,
step04_action, step05_result, step06_performance,
kpiList: Array<{ label, value }>,
step07_capability, storyId
```

### SwissFeatureIndex (스토리 목록)

`featureData.ts`의 features 배열을 테이블로 렌더링. `SwissFeatureRow`로 각 행 구성.

### featureData.ts (스토리 매니페스트)

```typescript
export const features = [
  { title: "...", description: "...", storyId: "..." },
  // 10개 엔트리
];

export function getFeatureNumber(storyId: string): string {
  // 배열 순서 기반 3자리 번호 (e.g., "001")
}
```

## 새 FeatureSummary 추가 시

1. `stories/SwissFeatureSummary_{Name}.tsx` 생성
   - `SwissFeatureSummary` (from `SwissStorySection`) 래핑
   - 7-Step props 전달
2. `stories/index.ts`에 export 추가
3. `SwissMinimalPage.tsx`에 배치 (`sectionNumber`, `storyNumber` 지정)

### FeatureSummary 템플릿

```tsx
import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_{Name} = ({ sectionNumber, storyNumber }: { sectionNumber: string; storyNumber: string }) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="Category · Subcategory"
            title="제목"
            subtitle="부제목"
            step01_intro="..."
            step02_background="..."
            step03_problem="..."
            step03_solution="..."
            step04_action="..."
            step05_result="..."
            step06_performance="..."
            kpiList={[{ label: "지표", value: "값" }]}
            step07_capability="..."
            storyId="kebab-case-id"
        />
    );
};
```

## 스타일 규칙

- **접두사**: 모든 Swiss Minimal 컴포넌트는 `Swiss` 접두사
- **다크 모드**: `dark:` 유틸리티 필수 (bg-stone-950, text-stone-*)
- **반응형**: mobile-first, `md:`, `lg:` 브레이크포인트
- **컬러**: light=slate/white, dark=stone-950 + indigo 액센트
- **폰트**: sans (본문), mono (코드/번호), serif (강조 인용)

## 의존 관계

```
widgets/portfolio/
  ├── shared/lib/cn.ts              (클래스 병합)
  ├── features/layout/useSidebarStore (포트폴리오 모드)
  └── (자체 완결: 대부분 정적 데이터)
```
