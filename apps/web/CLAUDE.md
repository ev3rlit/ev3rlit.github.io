# Portfolio Feature Guide

> 이 문서는 포트폴리오 피처의 구조와 패턴을 정리한 AI 어시스턴트용 프로젝트 가이드입니다.

## 1. 프로젝트 개요

- **프레임워크**: Next.js 14 App Router (`"use client"` 기반 CSR 중심)
- **아키텍처**: FSD (Feature-Sliced Design) — App → Views → Widgets → Features → Entities → Shared
- **사이트 구성**: 블로그 + 포트폴리오 통합 사이트
- **스타일링**: Tailwind CSS v4 + dark mode (stone 팔레트)
- **상태관리**: Zustand (`useSidebarStore`)
- **콘텐츠**: MDX (gray-matter) + 하드코딩된 React 컴포넌트

## 2. FSD 레이어별 포트폴리오 구조

| Layer | 경로 | 역할 | 주요 파일 수 |
|-------|------|------|-------------|
| **App** | `src/app/portfolio/` | 라우트 (4개 페이지) | 4 |
| **Views** | `src/views/portfolio/` | 페이지 조합 + 스토리 디테일 | ~15 |
| **Widgets** | `src/widgets/portfolio/` | 재사용 섹션 컴포넌트 | ~30 |
| **Features** | `src/features/portfolio/` | Problem/Solution 유틸 컴포넌트 | 1 |
| **Entities** | `src/entities/post/` | Post 타입 + API 함수 | 2 |
| **Shared** | `src/shared/` | `config/site.ts`, `lib/cn.ts` 등 | 5+ |

## 3. 라우트 구조

```
/portfolio              → SwissMinimalPage (메인, 14개 섹션 풀페이지)
/portfolio/features     → SwissFeatureIndex (스토리 목록 테이블)
/portfolio/story/[id]   → Detail_* 컴포넌트 (11개 스토리, SSG)
/portfolio/contact      → SwissContactSection (연락처)
```

- **SSG**: `story/[id]/page.tsx`에서 `generateStaticParams()`로 storyMap 키 기반 정적 생성
- **라우트 파일 위치**: `src/app/portfolio/{route}/page.tsx`

## 4. 핵심 디자인 시스템: Swiss Minimal

### 두 가지 레이아웃

| 레이아웃 | 진입점 | 상태 |
|---------|--------|------|
| Legacy (PortfolioPage) | `src/views/portfolio/ui/PortfolioPage.tsx` | 비활성 |
| **Swiss Minimal** | `src/views/portfolio/swissminimal/ui/SwissMinimalPage.tsx` | **현재 활성** |

### SwissMinimalPage 섹션 구성 (14개)

```
1.  SwissNavigation           — 상단 네비게이션
2.  SwissHeroSection           — 커버 (#hero)
3.  SwissAboutSection          — 자기소개 (#about)
4.  SwissResumeSection         — 이력서 (#resume)
5.  SwissProjectIntro_SamgukBlade — 프로젝트 소개: 삼국블레이드 (#project-samguk)
6.  SwissFeatureSummary_ServiceTransfer  — S.01 앱 서비스 이관
7.  SwissFeatureSummary_Payment          — S.02 결제 마이그레이션
8.  SwissFeatureSummary_ErrorSystem      — S.03 에러 핸들링
9.  SwissFeatureSummary_TrackingContainer — S.04 유저 데이터 동기화
10. SwissFeatureSummary_LogPipeline      — S.05 로그 파이프라인
11. SwissFeatureSummary_GuildMineCqrs    — S.06 연합금광 CQRS
12. SwissProjectIntro_BladeX   — 프로젝트 소개: BladeX (#project-bladex)
13. SwissGrowthCurveSection    — 성장 곡선 (#growth-curve)
14. SwissWeaknessSection_Generic — 약점 & 계획 (#weakness-plan)
15. SwissContactSection        — 연락처 (#contact)
```

### SwissSectionContainer

모든 섹션의 일관된 레이아웃 래퍼. 반응형 패딩, min-height, 컨테이너 크기 등을 통일.

## 5. 스토리 아키텍처

### 3단계 콘텐츠 계층

```
Projects (MDX index.mdx)
  └── Experiences (MDX *.mdx)
        └── Story Details (React 컴포넌트)
```

1. **Projects**: `content/portfolio/{project}/index.mdx` — 프로젝트 개요
2. **Experiences**: `content/portfolio/{project}/{experience}.mdx` — 경험 상세 (MDX)
3. **Story Details**: `src/views/portfolio/story-detail/Detail_*.tsx` — React 컴포넌트

### featureData.ts (스토리 매니페스트)

- **위치**: `src/widgets/portfolio/swissminimal/ui/featureData.ts`
- **10개 스토리** 등록 (title, description, storyId)
- `getFeatureNumber(storyId)`: 배열 순서 기반 번호 조회 (e.g., "001", "002")

### storyMap (라우트 매핑)

- **위치**: `src/app/portfolio/story/[id]/page.tsx`
- **11개 엔트리**: storyId → Detail_* 컴포넌트 매핑
- `generateStaticParams()`로 SSG 지원

### SwissProjectDetail (7-Step 내러티브)

**위치**: `src/widgets/portfolio/swissminimal/ui/SwissProjectDetail.tsx`

Props 인터페이스:
```typescript
interface SwissProjectDetailProps {
  projectInfo: {
    number: string;       // e.g., "004"
    title: string;
    description: string;
    role: string;
    period: string;
    links: { github?: string; demo?: string; };
  };
  overview: {
    intro: string;        // 대형 도입부
    goals: string;        // 도전/목표
    strategy: string;     // 기술 접근법
  };
  keywords: Array<{ category: string; items: string[]; }>;
  screenshots?: Array<{ src: string; alt: string; caption?: string; }>;
  architecture?: React.ReactNode;
  architectureDescription?: string | Array<string | ImageBlock>;
  mainTasks: Array<{ title: string; description: string; }>;
  challenges: Array<{ problem: string; solution: string; }>;
}
```

**렌더링 순서**: Header → Overview → Screenshots(선택) → Keywords → Architecture(선택) → Main Tasks → Challenges → Footer

## 6. 데이터 흐름

### 콘텐츠 소스

```
content/portfolio/{project}/index.mdx      — 프로젝트 메타 (frontmatter: title, date, order)
content/portfolio/{project}/{experience}.mdx — 경험 상세 (frontmatter 기반)
```

### API 함수 (`src/entities/post/api/get-posts.ts`)

| 함수 | 용도 |
|------|------|
| `getPortfolioProjects()` | 전체 프로젝트 목록 (order 정렬) |
| `getProjectBySlug(slug)` | 단일 프로젝트 조회 |
| `getExperiencesByProject(slug)` | 프로젝트별 경험 목록 |
| `getExperienceDetail(project, experience)` | 단일 경험 상세 |
| `getExperienceWithNeighbors(project, experience)` | 이웃 경험 포함 (슬라이드 네비) |

### Post 타입 (`src/entities/post/model/types.ts`)

```typescript
interface PostMeta {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
  [key: string]: any;  // order, 기타 커스텀 필드 허용
}

interface Post {
  slug: string;
  meta: PostMeta;
  content: string;     // MDX 원문
  readingTime?: string;
}
```

### 스토리 디테일 데이터

- **정적 하드코딩**: Detail_* 컴포넌트 내부에 직접 데이터 정의
- DB 쿼리 없음 — 빌드 타임 SSG 최적화

## 7. 새 기능 추가 시 규칙

### 새 스토리 추가 절차

1. **featureData.ts 등록**: `features` 배열에 `{ title, description, storyId }` 추가
2. **Detail 컴포넌트 생성**: `src/views/portfolio/story-detail/Detail_{Name}.tsx`
   - `SwissProjectDetail` 위젯을 래핑하여 7-Step 내러티브 데이터 전달
3. **storyMap 등록**: `src/app/portfolio/story/[id]/page.tsx`에 import + 매핑 추가
4. **Summary 컴포넌트 생성**: `src/widgets/portfolio/stories/SwissFeatureSummary_{Name}.tsx`
   - barrel export (`stories/index.ts`)에 추가
5. **SwissMinimalPage 배치**: 원하는 위치에 `<SwissFeatureSummary_{Name} sectionNumber="S.0N" storyNumber="0N" />` 추가

### 네이밍 규칙

- **Swiss Minimal 계열**: `Swiss` 접두사 필수 (e.g., `SwissFeatureSummary_*`, `SwissProjectDetail`)
- **스토리 디테일**: `Detail_` 접두사 (e.g., `Detail_ServiceTransfer`)
- **storyId**: kebab-case (e.g., `service-transfer`, `guild-mine-cqrs`)

### 스타일 규칙

- **Tailwind CSS v4** + `dark:` 유틸리티 필수
- **컬러 팔레트**: light=slate/white, dark=stone-950 배경 + stone-* 텍스트
- **`cn()` 유틸**: `src/shared/lib/cn.ts` — `clsx` + `tailwind-merge` 조합
- **반응형**: mobile-first, `md:`, `lg:` 브레이크포인트 활용

### 상태관리

- **`useSidebarStore`** (`src/features/layout/model/useSidebarStore.ts`): Zustand 스토어
  - 포트폴리오 페이지 진입 시 `setPortfolioMode(true)`, `setSidebarOpen(false)`
  - 페이지 이탈 시 cleanup에서 복원

### 데이터 원칙

- **정적 데이터 우선**: DB 쿼리 없음, SSG 최적화
- **MDX frontmatter**: `gray-matter`로 파싱
- **스토리 디테일**: React 컴포넌트 내부에 하드코딩

## 8. 주요 패턴

### 스크롤 & 네비게이션

- **키보드 네비게이션**: Arrow Up/Down, PageUp/PageDown, Home/End
- **스크롤 동작**: `scroll-smooth`, `no-scrollbar` 클래스
- **앵커 네비게이션**: `#hero`, `#about`, `#resume` 등 id 기반

### 컴포넌트 패턴

- **Compound Components**: `ProblemSolution` → `Problem`, `Solution`, `Result` (features/portfolio)
- **Barrel Exports**: 각 디렉토리별 `index.ts`로 re-export
- **동적 섹션 넘버링**: `SwissProjectDetail` 내부에서 선택적 섹션(screenshots, architecture) 유무에 따라 자동 번호 조정

### 렌더링

- **SimpleMarkdown**: `SwissProjectDetail` 내부의 커스텀 마크다운 프로세서 (코드 블록, 테이블, 리스트 지원)
- **ImageLightbox**: 스크린샷 클릭 시 확대 보기
- **IntersectionObserver**: 스크롤 기반 애니메이션 트리거

## 9. 디렉토리 맵 (빠른 참조)

```
apps/web/
├── src/
│   ├── app/portfolio/
│   │   ├── page.tsx                          ← 메인 라우트
│   │   ├── features/page.tsx                 ← 스토리 목록
│   │   ├── contact/page.tsx                  ← 연락처
│   │   └── story/[id]/page.tsx               ← 스토리 디테일 (storyMap + SSG)
│   │
│   ├── views/portfolio/
│   │   ├── swissminimal/ui/SwissMinimalPage.tsx  ← 메인 페이지 조합
│   │   └── story-detail/Detail_*.tsx             ← 11개 스토리 디테일
│   │
│   ├── widgets/portfolio/
│   │   ├── swissminimal/ui/                      ← Swiss Minimal 위젯 (~20개)
│   │   │   ├── SwissProjectDetail.tsx            ← 7-Step 내러티브 렌더러
│   │   │   ├── SwissSectionContainer.tsx         ← 섹션 래퍼
│   │   │   ├── SwissFeatureIndex.tsx             ← 스토리 목록 테이블
│   │   │   └── featureData.ts                    ← 스토리 매니페스트
│   │   └── stories/                              ← FeatureSummary 컴포넌트 (7개)
│   │
│   ├── features/
│   │   ├── portfolio/ui/PortfolioComponents.tsx  ← Problem/Solution/Result/TechDetail/Lesson
│   │   └── layout/model/useSidebarStore.ts       ← Zustand 사이드바 스토어
│   │
│   ├── entities/post/
│   │   ├── model/types.ts                        ← Post, PostMeta 타입
│   │   └── api/get-posts.ts                      ← 포트폴리오 API 함수
│   │
│   └── shared/
│       ├── config/site.ts                        ← 사이트 설정
│       └── lib/cn.ts                             ← clsx + tailwind-merge
│
└── content/portfolio/{project}/{experience}.mdx  ← MDX 콘텐츠
```
