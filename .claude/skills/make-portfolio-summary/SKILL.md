---
name: make-portfolio-summary
description: 포트폴리오 메인 페이지의 스토리 요약 컴포넌트(SwissFeatureSummary)를 자동 생성하는 스킬. 컨텍스트 문서 또는 대화 내용을 기반으로 7-Step 내러티브를 작성하고, 컴포넌트 생성·export 등록·페이지 배치까지 수행한다. '요약 추가', '포트폴리오 요약', 'summary 만들기', 'make-portfolio-summary' 등의 요청에 트리거된다.
---

# Make Portfolio Summary

## Purpose

포트폴리오 메인 페이지(`SwissMinimalPage.tsx`)에 표시되는 **스토리 요약 컴포넌트(SwissFeatureSummary)** 를 추가할 때 반복되는 작업(7-Step 내러티브 매핑 → 컴포넌트 생성 → export 등록 → 페이지 배치)을 자동화한다. 기존 `make-portfolio-story`(상세 페이지 생성)의 형제 스킬이다.

## When to Use This Skill

- 새로운 포트폴리오 요약 컴포넌트를 메인 페이지에 추가할 때
- `make-portfolio-summary`, `요약 추가`, `포트폴리오 요약`, `summary 만들기` 키워드가 포함된 요청

## Instructions

### 워크플로우 (6단계)

---

#### Step 1: 입력 수집

AskUserQuestion으로 다음 정보를 확인한다.

| 항목 | 설명 | 예시 |
|------|------|------|
| `componentName` | PascalCase 이름 | `ErrorSystem`, `LogPipeline` |
| `storyId` | 연결할 상세 페이지의 storyId | `error-handling` |
| `contextSource` | 컨텍스트 문서 경로 또는 "대화 기반" | `docs/features/error_handling/error_handling_detail.md` |
| `projectSection` | 삼국블레이드 / 블레이드X 중 배치 위치 | `삼국블레이드` |

사용자가 이미 일부 정보를 제공한 경우, 나머지만 질문한다.

---

#### Step 2: 현재 상태 파악

아래 파일들을 Read하여 현재 상태를 파악한다.

**파일 1: `apps/web/src/views/portfolio/swissminimal/ui/SwissMinimalPage.tsx`**
- 현재 스토리 배치 순서 확인
- 해당 projectSection의 마지막 `sectionNumber`/`storyNumber` 파악
- 새 컴포넌트의 sectionNumber/storyNumber 산출

**파일 2: `apps/web/src/widgets/portfolio/stories/index.ts`**
- 기존 export 목록 확인
- 같은 이름의 컴포넌트가 이미 있는지 중복 검증

---

#### Step 3: 7-Step 내러티브 매핑 + 사용자 검토

컨텍스트를 분석하여 `SwissFeatureSummaryProps`에 매핑한다.

```typescript
interface SwissFeatureSummaryProps {
    sectionNumber: string;   // "S.01" — Step 2에서 산출
    storyNumber: string;     // "01" — Step 2에서 산출
    keyword: string;         // 도메인 키워드 (예: "Stability · Middleware")
    title: string;           // 메인 제목 (줄바꿈 가능, & 사용)
    subtitle: string;        // 부제 (기간, 역할 등)

    // 7-Step Structure
    step01_intro: string;       // 프로젝트 개요
    step02_background: string;  // 배경 및 문제점 (팀 특수성 포함)
    step03_problem: string;     // 구체적 문제
    step03_solution: string;    // 해결책 헤드라인 (1줄 간결)
    step04_action: string;      // 실행한 구체적 액션
    step05_result: string;      // 상세 성과 (팀/운영 임팩트)
    step06_performance: string; // 정성적 평가 (kpiList가 있으면 표시 안 됨)
    step07_capability: string;  // 입사 시 기여점
    storyId: string;            // 상세 페이지 링크
    kpiList?: { label: string; value: string }[]; // 정량 KPI 배열 (선택)
}
```

**작성 가이드라인:**

- **인사담당자 가독성 우선**: 전문 용어를 최소화하고, "무엇을 했고 어떤 효과가 있었는지"에 집중
- **step03_solution은 1줄 헤드라인**: 상세는 step04_action에서 보강
- **배경에 팀 특수성 필수**: 팀 규모, 본인 역할, 왜 이 일이 의미 있었는지
- **측정하지 않은 수치는 넣지 않는다**: "99%" 같은 수치 대신 "무중단" 같은 사실 기반 표현
- **step05_result와 step06_performance 축 분리**: 같은 말 반복 금지. step05는 팀 임팩트, step06은 운영 임팩트처럼 축을 나눈다
- **KPI는 실제 측정값만 사용**: 추정치나 과장된 수치 사용 금지

매핑 결과를 사용자에게 제시하고 검토받는다.

---

#### Step 4: 컴포넌트 파일 생성

**파일**: `apps/web/src/widgets/portfolio/stories/SwissFeatureSummary_{componentName}.tsx`

```tsx
import { SwissFeatureSummary } from "@/widgets/portfolio/swissminimal/ui/SwissStorySection";

export const SwissFeatureSummary_{componentName} = ({
    sectionNumber, storyNumber
}: {
    sectionNumber: string; storyNumber: string
}) => {
    return (
        <SwissFeatureSummary
            sectionNumber={sectionNumber}
            storyNumber={storyNumber}
            keyword="..."
            title="..."
            subtitle="..."
            step01_intro="..."
            step02_background="..."
            step03_problem="..."
            step03_solution="..."
            step04_action="..."
            step05_result="..."
            step06_performance="..."
            kpiList={[
                { label: "...", value: "..." },
            ]}
            step07_capability="..."
            storyId="..."
        />
    );
};
```

**참고할 실제 파일**: `apps/web/src/widgets/portfolio/stories/SwissFeatureSummary_ErrorSystem.tsx`

---

#### Step 5: 등록 (2곳)

**5-1. stories/index.ts** — export 추가:

**파일**: `apps/web/src/widgets/portfolio/stories/index.ts`

```typescript
export { SwissFeatureSummary_{componentName} } from './SwissFeatureSummary_{componentName}';
```

기존 export 목록의 마지막에 추가한다.

**5-2. SwissMinimalPage.tsx** — import 추가 + JSX 배치:

**파일**: `apps/web/src/views/portfolio/swissminimal/ui/SwissMinimalPage.tsx`

Edit으로 두 곳을 수정한다:

1. **import 블록**: `@/widgets/portfolio/stories`의 import 목록에 새 컴포넌트 추가
2. **JSX 배치**: 사용자가 지정한 projectSection 영역에 JSX 추가

배치 위치 참고:
- **삼국블레이드**: `{/* DYNAMIC STORIES (Samguk Blade) */}` 주석 아래, Retrospective 섹션 이전
- **블레이드X**: `{/* DYNAMIC STORIES (BladeX) */}` 주석 아래, Retrospective 섹션 이전

sectionNumber/storyNumber를 기존 순서에 맞게 설정한다. 기존 항목의 번호는 수정하지 않고, 마지막 번호의 다음 번호를 사용한다.

---

#### Step 6: 리뷰 및 검증

수행 결과를 사용자에게 보고하고 체크리스트를 제시한다:

```
## 생성 완료

### 생성된/수정된 파일
- [새로 생성] `apps/web/src/widgets/portfolio/stories/SwissFeatureSummary_{componentName}.tsx`
- [수정] `apps/web/src/widgets/portfolio/stories/index.ts` — export 추가
- [수정] `apps/web/src/views/portfolio/swissminimal/ui/SwissMinimalPage.tsx` — import + JSX 배치

### 체크리스트
- [ ] 전문 용어가 과도하지 않은지 (인사담당자 가독성)
- [ ] step05_result와 step06_performance가 중복되지 않는지
- [ ] KPI 수치가 실제 측정값 기반인지
- [ ] sectionNumber/storyNumber 순서가 맞는지
- [ ] storyId가 실제 상세 페이지와 연결되는지

빌드 검증을 실행할까요?
```

선택적으로 `npx tsc --noEmit`으로 빌드 검증을 실행한다.

---

### 참고 파일

| 파일 | 용도 |
|------|------|
| `apps/web/src/widgets/portfolio/swissminimal/ui/SwissStorySection.tsx` | SwissFeatureSummary 베이스 컴포넌트 (props 인터페이스) |
| `apps/web/src/widgets/portfolio/stories/SwissFeatureSummary_ErrorSystem.tsx` | 가장 최근 작성된 참고 컴포넌트 |
| `apps/web/src/widgets/portfolio/stories/index.ts` | export 등록 위치 |
| `apps/web/src/views/portfolio/swissminimal/ui/SwissMinimalPage.tsx` | JSX 배치 위치 |

## Tools

- **Read**: 컨텍스트 문서, SwissMinimalPage.tsx, stories/index.ts 읽기
- **Write**: SwissFeatureSummary_{componentName}.tsx 파일 생성
- **Edit**: stories/index.ts, SwissMinimalPage.tsx 수정
- **AskUserQuestion**: 입력 수집, 7-Step 매핑 결과 검토
- **Bash**: 빌드 검증 (선택)

## Examples

### Example 1: 기본 사용

**User**: "에러 시스템 요약을 메인 페이지에 추가해줘. 컨텍스트는 `docs/features/error_handling/error_handling_detail.md`에 있어."

**Assistant**:
1. componentName, storyId, projectSection 확인
2. SwissMinimalPage.tsx, stories/index.ts 읽어 현재 상태 파악
3. 컨텍스트 문서 분석하여 7-Step 매핑 → 사용자 검토
4. `SwissFeatureSummary_ErrorSystem.tsx` 생성
5. stories/index.ts에 export 추가
6. SwissMinimalPage.tsx에 import + JSX 배치
7. 체크리스트와 함께 리뷰 요청

### Example 2: 대화 기반 생성

**User**: "방금 얘기한 결제 마이그레이션 내용으로 요약 컴포넌트 만들어줘."

**Assistant**:
대화 내용을 기반으로 7-Step 매핑을 수행하고, 사용자 검토 후 생성한다.

### Example 3: 정보가 충분한 경우

**User**: "LogPipeline 요약 추가해줘. storyId는 `log-pipeline`, 삼국블레이드 섹션에 넣어줘. 컨텍스트는 대화 기반으로."

**Assistant**:
모든 정보가 제공되었으므로 AskUserQuestion 없이 바로 Step 2부터 진행한다.

## Notes

> [!IMPORTANT]
> 아래 원칙들은 **포트폴리오 품질을 결정짓는 핵심 가이드라인**입니다. 반드시 준수하세요.

> [!CAUTION]
> ### 인사담당자 가독성 우선
> 전문 용어 최소화, **"무엇을 했고 어떤 효과가 있었는지"**에 집중하세요.
> 기술 디테일은 상세 페이지에서 다루고, 요약 컴포넌트는 비개발자도 이해할 수 있어야 합니다.

> [!CAUTION]
> ### 측정하지 않은 수치는 넣지 않는다
> "99%" 같은 과장된 수치 대신 **"무중단"** 같은 사실 기반 표현을 사용하세요.
> 실제로 측정/기록한 데이터만 KPI로 표시하세요.

> [!WARNING]
> ### step03_solution은 1줄
> 헤드라인만 쓰고, 상세는 `step04_action`에서 보강하세요.

> [!WARNING]
> ### 배경에 팀 특수성 필수
> 팀 규모, 본인 역할, 왜 이 일이 의미 있었는지를 명시하세요.

> [!WARNING]
> ### step05_result / step06_performance 축 분리
> 같은 말 반복 금지. **팀 임팩트 vs 운영 임팩트**처럼 다른 축에서 서술하세요.

> [!NOTE]
> ### 한국어 우선
> 기존 make-portfolio-story 스킬과 동일 원칙. 포트폴리오 컨텐츠는 한국어로 작성합니다.

> [!NOTE]
> ### 기존 번호 유지
> 새 컴포넌트 추가 시 기존 항목의 `sectionNumber`/`storyNumber`를 수정하지 않고, 마지막 번호의 다음 번호를 사용합니다.
