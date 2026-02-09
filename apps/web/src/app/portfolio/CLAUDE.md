# App Layer — Portfolio Routes

> Next.js App Router 기반 포트폴리오 라우트 정의 레이어.

## 라우트 구조

```
/portfolio              → page.tsx        (SwissMinimalPage)
/portfolio/features     → features/page.tsx (SwissFeatureIndex)
/portfolio/story/[id]   → story/[id]/page.tsx (Detail_* 동적 라우트)
/portfolio/contact      → contact/page.tsx  (SwissContactSection)
```

## 파일별 역할

### `page.tsx` (메인)
- **렌더링**: `SwissMinimalPage` (from `@/views/portfolio/swissminimal`)
- **메타데이터**: `Metadata` export (`title: "Portfolio | 최범휘"`)
- **서버 컴포넌트**: metadata export 때문에 서버 컴포넌트로 유지

### `features/page.tsx` (스토리 목록)
- **렌더링**: `SwissFeatureIndex` (from `@/widgets/portfolio/swissminimal`)
- **서버 컴포넌트**: 단순 위젯 래핑

### `story/[id]/page.tsx` (스토리 디테일)
- **storyMap**: storyId → `Detail_*` 컴포넌트 매핑 (11개)
- **SSG**: `generateStaticParams()`로 storyMap 키 기반 정적 생성
- **404**: storyMap에 없는 id는 `notFound()` 호출
- **현재 등록된 스토리**:
  - `sample`, `service-transfer`, `payment-migration`, `revenue-api`
  - `log-pipeline`, `apple-transfer`, `guild-mine-cqrs`, `guild-mine-concurrency`
  - `error-handling`, `websocket-middleware`, `tracking-container`

### `contact/page.tsx` (연락처)
- **`"use client"`**: 사이드바 상태 관리 필요
- **렌더링**: `SwissNavigation` + `SwissContactSection`
- **사이드바**: `useSidebarStore`로 포트폴리오 모드 진입/해제

## 새 라우트 추가 시 규칙

1. **포트폴리오 모드**: 모든 포트폴리오 페이지는 마운트 시 `setPortfolioMode(true)`, `setSidebarOpen(false)` 호출
2. **cleanup**: `useEffect` return에서 반드시 `setPortfolioMode(false)`, `setSidebarOpen(true)` 복원
3. **레이아웃 래퍼**: `bg-white dark:bg-stone-950` 배경 + `overflow-hidden` + `scroll-smooth no-scrollbar`
4. **새 스토리 추가**: storyMap에 import + 매핑 추가 → `generateStaticParams()` 자동 반영

## 의존 관계

```
app/portfolio/
  ├── views/portfolio/swissminimal  (SwissMinimalPage)
  ├── views/portfolio/story-detail  (Detail_* 컴포넌트)
  ├── widgets/portfolio/swissminimal (SwissFeatureIndex, SwissNavigation, SwissContactSection)
  └── features/layout              (useSidebarStore)
```
