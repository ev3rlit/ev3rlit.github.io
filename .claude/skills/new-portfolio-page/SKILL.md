---
name: new-portfolio-page
description: 새로운 포트폴리오 페이지 변형을 자동 생성하는 스킬. 기존 SwissMinimalPage를 기반으로 특정 포지션/회사용 맞춤 포트폴리오 페이지를 만든다. 라우트, 섹션 컴포넌트, barrel export까지 한 번에 생성. 'new-portfolio-page', '포트폴리오 페이지 만들기', '새 포트폴리오', '맞춤 포트폴리오' 등의 요청에 트리거된다.
---

# New Portfolio Page

## Purpose

기존 `SwissMinimalPage`(백엔드 개발자 포트폴리오)를 기반으로 **특정 포지션/회사에 맞춘 포트폴리오 페이지 변형**을 자동 생성한다. 라우트 경로, 섹션 컴포넌트, 페이지 뷰, barrel export를 한 번에 만들어 즉시 접속 가능한 상태로 완성한다.

## When to Use This Skill

- 특정 포지션용 맞춤 포트폴리오 페이지를 새로 만들 때 (예: 게임 서버, 인프라, 프론트엔드)
- 특정 회사 공고에 맞춘 포트폴리오 페이지를 만들 때
- `new-portfolio-page`, `포트폴리오 페이지 만들기`, `새 포트폴리오`, `맞춤 포트폴리오` 키워드가 포함된 요청

## Architecture Overview

포트폴리오 페이지는 **basePath 패턴**으로 구성된다. 모든 네비게이션, 스토리 링크, 하위 라우트가 `basePath`를 기반으로 동적 생성되므로 새 변형을 추가할 때 기존 컴포넌트를 수정할 필요가 없다.

```
/portfolio              → SwissMinimalPage (기본, 백엔드)
/portfolio/gameserver   → SwissMinimalGameServerPage (게임 서버)
/portfolio/{slug}       → SwissMinimal{Name}Page (새 변형)
  ├── /contact          → 연락처 페이지
  ├── /features         → 기능들 페이지
  └── /story/[id]       → 스토리 디테일 페이지
```

### 섹션별 분리 전략

| # | 섹션 | 분리 방식 | 이유 |
|---|------|----------|------|
| 1 | HeroSection | **파일 복사** → `_Name` 접미사 | 메인 카피, tags, key impact 카드가 완전히 다름 |
| 2 | AboutSection | **props 전달** | 기존 컴포넌트가 이미 props를 받음 (role, motivation 등) |
| 3 | ResumeSection | **props 전달** | summary prop으로 자기소개 문장만 변경 |
| 4 | GrowthCurveSection | **파일 복사** → `_Name` 접미사 | 4단계 데이터, appealPoints가 포지션별로 다름 |
| 5 | WeaknessSection | **파일 복사** → `_Name` 접미사 | 약점 항목, closingMessage가 완전히 다름 |
| 6 | 나머지 (Project, Stories, Contact) | **그대로 재사용** | 프로젝트 경험과 기술 스토리는 동일 |

## Instructions

### 워크플로우 (7단계)

---

#### Step 1: 입력 수집

AskUserQuestion으로 다음 정보를 확인한다.

| 항목 | 설명 | 예시 |
|------|------|------|
| `slug` | URL 경로 (kebab-case) | `gameserver`, `infra`, `naver` |
| `name` | 컴포넌트 접미사 (PascalCase) | `GameServer`, `Infra`, `Naver` |
| `role` | 표시할 직책명 | `게임 서버 개발자`, `인프라 엔지니어` |

사용자가 이미 일부 정보를 제공한 경우, 나머지만 질문한다.

> **콘텐츠 전략**: "구조 먼저, 콘텐츠 나중에"
> 이번 생성에서는 기존 텍스트를 복사한 상태로 컴포넌트 구조만 완성한다.
> 최소한의 변경만 적용: role 변경, 명백한 방향성 텍스트 등.
> 실제 콘텐츠(Hero 카피, 약점 항목, 성장곡선 4단계 등)는 추후 대화하면서 다듬는다.

---

#### Step 2: 현재 상태 파악

아래 파일들을 Read하여 기존 구조를 파악한다.

**필수 읽기 파일:**

| 파일 | 목적 |
|------|------|
| `apps/web/src/widgets/portfolio/swissminimal/ui/SwissHeroSection.tsx` | Hero 섹션 복사 원본 |
| `apps/web/src/widgets/portfolio/swissminimal/ui/SwissGrowthCurveSection.tsx` | GrowthCurve 복사 원본 |
| `apps/web/src/widgets/portfolio/swissminimal/ui/SwissWeaknessSection_Generic.tsx` | Weakness 패턴 참고 |
| `apps/web/src/views/portfolio/swissminimal/ui/SwissMinimalPage.tsx` | 페이지 구조 참고 |
| `apps/web/src/widgets/portfolio/swissminimal/index.ts` | barrel export 현황 |
| `apps/web/src/views/portfolio/swissminimal/index.ts` | views barrel export 현황 |

---

#### Step 3: 섹션 컴포넌트 생성 (3개 파일)

**3-1. SwissHeroSection_{Name}.tsx**

**경로**: `apps/web/src/widgets/portfolio/swissminimal/ui/SwissHeroSection_{Name}.tsx`

`SwissHeroSection.tsx`를 복사한 후 다음을 변경:
- 컴포넌트명: `SwissHeroSection_{Name}`
- role 텍스트: `"백엔드 개발자"` → `"{role}"`
- tags 배열: 포지션에 맞는 키워드로 조정
- 메인 헤딩: 최소한 role 부분만 변경 (나머지는 추후 다듬기)
- Key Impact 카드 3개: 기존 유지 (추후 다듬기)

**3-2. SwissGrowthCurveSection_{Name}.tsx**

**경로**: `apps/web/src/widgets/portfolio/swissminimal/ui/SwissGrowthCurveSection_{Name}.tsx`

`SwissGrowthCurveSection.tsx`를 복사한 후 다음을 변경:
- 컴포넌트명: `SwissGrowthCurveSection_{Name}`
- `phases[3]` (4단계, "2025 — 현재"): title과 highlights를 포지션 방향에 맞게 조정
- `appealPoints[3]` (4번째 "자기 인식"): 포지션 맥락으로 조정

**3-3. SwissWeaknessSection_{Name}.tsx**

**경로**: `apps/web/src/widgets/portfolio/swissminimal/ui/SwissWeaknessSection_{Name}.tsx`

`SwissWeaknessSection_Generic.tsx` 패턴을 따라 새 데이터로 `SwissWeaknessSection`을 래핑:
- 컴포넌트명: `SwissWeaknessSection_{Name}`
- `subtitle`: `"{role} 포지션 맞춤 분석"`
- `targetRole`: `"{role}"`
- `quote`: 포지션 맥락의 인용문
- `items[]`: 포지션 관점의 약점/성장 계획
- `closingMessage`: 포지션 심화 의지

---

#### Step 4: 페이지 뷰 생성

**경로**: `apps/web/src/views/portfolio/swissminimal/ui/SwissMinimal{Name}Page.tsx`

`SwissMinimalPage.tsx`를 복사한 후 다음을 변경:
- 컴포넌트명: `SwissMinimal{Name}Page`
- import: `SwissHeroSection` → `SwissHeroSection_{Name}` 등 3개 교체
- `<SwissNavigation basePath="/portfolio/{slug}" />` — basePath 전달
- `<SwissAboutSection role="{role}" motivation={{...}} />` — props 전달
- `<SwissResumeSection summary="..." />` — 포지션 방향 자기소개 전달
- `<SwissGrowthCurveSection_{Name} />` — import 교체
- `<SwissWeaknessSection_{Name} />` — import 교체
- 미사용 import 제거 (SwissRetrospectiveSection 등)

---

#### Step 5: 라우트 생성 (4개 파일)

모든 라우트 파일은 `apps/web/src/app/portfolio/{slug}/` 하위에 생성한다.

**5-1. page.tsx** (메인 라우트)

```tsx
import { SwissMinimal{Name}Page } from "@/views/portfolio/swissminimal";

export default function {Name}Page() {
    return <SwissMinimal{Name}Page />;
}
```

**5-2. contact/page.tsx**

```tsx
"use client";

import { useEffect } from "react";
import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import { SwissContactSection } from "@/widgets/portfolio/swissminimal/ui/SwissContactSection";
import { SwissNavigation } from "@/widgets/portfolio/swissminimal/ui/SwissNavigation";

export default function {Name}ContactPage() {
    const { setPortfolioMode, setSidebarOpen } = useSidebarStore();

    useEffect(() => {
        setPortfolioMode(true);
        setSidebarOpen(false);
        return () => {
            setPortfolioMode(false);
            setSidebarOpen(true);
        };
    }, [setPortfolioMode, setSidebarOpen]);

    return (
        <div className="relative h-full w-full overflow-hidden bg-white dark:bg-stone-950">
            <SwissNavigation basePath="/portfolio/{slug}" />
            <main className="h-full w-full overflow-y-scroll scroll-smooth no-scrollbar absolute inset-0 z-10">
                <SwissContactSection />
            </main>
        </div>
    );
}
```

**5-3. features/page.tsx**

```tsx
import { SwissFeatureIndex } from '@/widgets/portfolio/swissminimal/ui/SwissFeatureIndex';

export default function {Name}FeatureIndexPage() {
    return <SwissFeatureIndex basePath="/portfolio/{slug}" />;
}
```

**5-4. story/[id]/page.tsx**

기존 `/portfolio/story/[id]/page.tsx`와 동일한 `storyMap`을 사용하되, 함수명만 변경:
- `export default function {Name}StoryDetailPage`
- `generateStaticParams`도 동일하게 포함

---

#### Step 6: Barrel Export 등록

**6-1. widgets barrel** — `apps/web/src/widgets/portfolio/swissminimal/index.ts`

3개 export 추가:
```typescript
export { SwissHeroSection_{Name} } from './ui/SwissHeroSection_{Name}';
export { SwissGrowthCurveSection_{Name} } from './ui/SwissGrowthCurveSection_{Name}';
export { SwissWeaknessSection_{Name} } from './ui/SwissWeaknessSection_{Name}';
```

**6-2. views barrel** — `apps/web/src/views/portfolio/swissminimal/index.ts`

1개 export 추가:
```typescript
export { SwissMinimal{Name}Page } from './ui/SwissMinimal{Name}Page';
```

---

#### Step 7: 리뷰 및 검증

수행 결과를 사용자에게 보고하고 체크리스트를 제시한다:

```
## 생성 완료

### 생성된 파일 (8개)
- [신규] widgets/.../SwissHeroSection_{Name}.tsx
- [신규] widgets/.../SwissGrowthCurveSection_{Name}.tsx
- [신규] widgets/.../SwissWeaknessSection_{Name}.tsx
- [신규] views/.../SwissMinimal{Name}Page.tsx
- [신규] app/portfolio/{slug}/page.tsx
- [신규] app/portfolio/{slug}/contact/page.tsx
- [신규] app/portfolio/{slug}/features/page.tsx
- [신규] app/portfolio/{slug}/story/[id]/page.tsx

### 수정된 파일 (2개)
- [수정] widgets/.../index.ts — 3개 export 추가
- [수정] views/.../index.ts — 1개 export 추가

### 체크리스트
- [ ] `/portfolio/{slug}` 접속 시 페이지 정상 렌더링
- [ ] 네비게이션 홈/소개/프로젝트/연락처 → 모두 `/portfolio/{slug}` 내부 동작
- [ ] 제안하기 → `/portfolio/{slug}/contact` 이동
- [ ] 기능들 → `/portfolio/{slug}/features` 이동
- [ ] 스토리 상세 → `/portfolio/{slug}/story/{id}` 이동
- [ ] role 텍스트가 올바르게 표시되는지 확인

빌드 검증을 실행할까요?
```

선택적으로 빌드 검증:
```bash
cd apps/web && rm -rf .next && npx next build
```

> **주의**: Next.js 14 빌드 시 `.next` 캐시 문제로 `/_document` 오류가 간헐적으로 발생할 수 있다. `rm -rf .next` 후 재시도하면 해결된다. 최대 2회 재시도.

---

### basePath 자동 연동 구조

다음 컴포넌트들은 이미 basePath를 지원하므로 별도 수정이 필요 없다:

| 컴포넌트 | basePath 방식 |
|---------|--------------|
| `SwissNavigation` | `basePath` prop (기본값 `/portfolio`) |
| `SwissFeatureIndex` | `basePath` prop → Navigation, FeatureRow에 전달 |
| `SwissFeatureRow` | `basePath` prop → 스토리 링크에 반영 |
| `SwissProjectDetail` | `usePathname()`으로 `/story/` 이전 경로 자동 추출 |
| `SwissStorySection` | `usePathname()`으로 `/gameserver` 포함 여부 판별 |

> **SwissStorySection 주의**: 현재 `pathname.includes('/gameserver')` 하드코딩으로 basePath를 판별한다. 새 slug가 추가되면 이 로직을 범용화해야 할 수 있다. 필요 시 `usePathname()`에서 첫 번째 `/portfolio/xxx` 세그먼트를 추출하는 방식으로 개선한다.

## Tools

- **Read**: 원본 섹션 컴포넌트, 페이지, index.ts 읽기
- **Write**: 섹션 컴포넌트, 페이지 뷰, 라우트 파일 생성
- **Edit**: barrel export index.ts 수정
- **AskUserQuestion**: 입력 수집 (slug, name, role)
- **Bash**: 디렉토리 생성, 빌드 검증
- **Glob**: 기존 파일 탐색

## Examples

### Example 1: 게임 서버 포지션

**User**: "게임 서버 개발자용 포트폴리오 페이지를 만들어줘."

**Assistant**:
1. slug: `gameserver`, name: `GameServer`, role: `게임 서버 개발자` 확인
2. 원본 파일 읽기
3. 섹션 컴포넌트 3개 생성 (Hero, GrowthCurve, Weakness)
4. SwissMinimalGameServerPage.tsx 생성
5. 라우트 4개 생성 (page, contact, features, story)
6. barrel export 등록
7. 체크리스트 제시

### Example 2: 특정 회사 공고용

**User**: "네이버 백엔드 공고에 맞춘 포트폴리오를 만들고 싶어."

**Assistant**:
1. slug: `naver`, name: `Naver`, role: `백엔드 개발자` 확인
2. 원본 파일 읽기
3. 섹션 컴포넌트 3개 생성 — Hero 카피에 네이버 맥락 반영 가능
4. SwissMinimalNaverPage.tsx 생성
5. 라우트 4개 생성
6. barrel export 등록
7. 콘텐츠는 추후 다듬기

### Example 3: 최소 정보로 요청

**User**: "/new-portfolio-page infra"

**Assistant**:
1. slug: `infra` 확인, name과 role을 AskUserQuestion으로 수집
2. 이후 동일 워크플로우

## Notes

- **구조 먼저, 콘텐츠 나중에**: 첫 생성 시에는 최소한의 데이터 변경만 적용 (role 등). 실제 콘텐츠는 대화를 통해 다듬는다.
- **basePath 패턴 준수**: 새 페이지의 모든 네비게이션, 링크가 `/portfolio/{slug}` 기반으로 동작해야 한다.
- **기존 파일 수정 최소화**: 새 변형 추가 시 수정하는 기존 파일은 barrel export 2개뿐이다.
- **SwissStorySection basePath**: 현재 `pathname.includes('/gameserver')` 하드코딩이다. 3개 이상의 변형이 추가되면 범용 로직으로 리팩토링이 필요하다.
- **빌드 캐시 주의**: Next.js 14에서 `.next` 캐시 문제가 간헐적으로 발생한다. `rm -rf .next` 후 재빌드로 해결.
