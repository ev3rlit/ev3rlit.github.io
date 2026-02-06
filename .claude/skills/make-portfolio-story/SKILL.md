---
name: make-portfolio-story
description: 포트폴리오 스토리 상세 페이지를 자동 생성하는 스킬. 컨텍스트 문서(마크다운 초안) 경로를 입력받아 컴포넌트 생성, 라우트 등록, Feature Index 등록까지 3단계를 자동 수행한다. '스토리 추가', '포트폴리오 스토리', '스토리 페이지 만들기', 'add story detail' 등의 요청에 트리거된다.
---

# Make Portfolio Story

## Purpose

포트폴리오 스토리 상세 페이지를 추가할 때 반복되는 3단계 작업(컴포넌트 생성 → 라우트 등록 → Feature Index 등록)을 자동화한다. 컨텍스트 문서(마크다운 초안) 하나만 지정하면 전체 과정이 수행된다.

## When to Use This Skill

- 새로운 포트폴리오 스토리 상세 페이지를 추가할 때
- `make-portfolio-story`, `스토리 추가`, `포트폴리오 스토리`, `스토리 페이지 만들기`, `add story detail` 키워드가 포함된 요청

## Instructions

### 워크플로우 (8단계)

---

#### Step 1: 입력 수집

AskUserQuestion으로 다음 정보를 확인한다.

| 항목 | 설명 | 예시 |
|------|------|------|
| `contextDocPath` | 컨텍스트 문서(마크다운 초안) 경로 | `docs/portfolio_drafts/08_service_transfer.md` |
| `storyId` | URL에 사용할 kebab-case ID | `service-transfer` |
| `featureTitle` | Feature Index에 표시할 제목 | `앱 서비스 이관 (Self-Publishing Migration)` |

사용자가 이미 일부 정보를 제공한 경우, 나머지만 질문한다.

---

#### Step 2: 현재 상태 파악 — 다음 번호 자동 산출

아래 두 파일을 Read하여 현재 상태를 파악한다.

**파일 1: `apps/web/src/app/portfolio/story/[id]/page.tsx`**
- `storyMap` 객체의 마지막 항목을 확인하여, 이미 등록된 storyId가 아닌지 검증
- 현재 등록된 컴포넌트 수를 파악

**파일 2: `apps/web/src/widgets/portfolio/swissminimal/ui/SwissFeatureIndex.tsx`**
- `features` 배열의 마지막 항목의 `id` (예: `"F.07"`)를 확인
- 다음 Feature 번호를 산출 (예: `"F.08"`)

**파일 3: `apps/web/src/views/portfolio/story-detail/Detail_Stories.tsx`**
- `projectInfo.number`의 최대값을 확인 (예: `"008"`)
- Detail_Stories.tsx 내부에 번들된 컴포넌트들 외에 개별 파일(Detail_*.tsx)의 number도 함께 확인하여 전체 최대값을 산출

이렇게 산출한 다음 번호들:
- `projectNumber`: 3자리 zero-padded (예: `"010"`)
- `featureId`: `F.XX` 형식 (예: `"F.08"`)

---

#### Step 3: 컨텍스트 분석

`contextDocPath`의 마크다운 문서를 Read하고, 아래 `SwissProjectDetailProps` 인터페이스에 맞게 매핑한다.

```typescript
interface SwissProjectDetailProps {
    projectInfo: {
        number: string;      // "010" — Step 2에서 산출
        title: string;       // 줄바꿈(\n) 포함 가능
        description: string; // 1-2문장 요약
        role: string;
        period: string;
        status: string;
        links: { github?: string; demo?: string };
    };
    overview: {
        intro: string;
        goals: string;
        strategy: string;
    };
    keywords: { category: string; items: string[] }[];
    architecture?: React.ReactNode; // Step 4에서 별도 처리
    mainTasks: { title: string; description: string }[];
    challenges: { problem: string; solution: string }[];
}
```

**challenges 콜론 규칙 (중요)**

`SwissProjectDetail.tsx`의 렌더링 로직(246-259행)에서 `problem`/`solution` 문자열을 `:` 기준으로 분리하여 제목(h4)과 본문(p)을 렌더링한다:

```tsx
<h4>{challenge.problem.split(':')[0]}</h4>
<p>{challenge.problem.split(':').slice(1).join(':') || challenge.problem}</p>
```

따라서 반드시 아래 형식을 따른다:
```
problem: "짧은 제목: 콜론 뒤에 상세 설명을 작성"
solution: "짧은 해결 제목: 콜론 뒤에 해결 과정을 작성"
```

예시:
```typescript
{
    problem: "Apple 'Pending State' 함정: QA에서 정상 동작으로 오판했으나, 이관 완료 시점에 신규 Team ID 기반 sub가 발급되며 기존 유저 계정이 유실되는 초대형 장애 발생",
    solution: "Multi-Auth 아키텍처 활용: Transfer API의 transfer_sub로 신/구 계정을 매핑하고, 신규 sub를 기존 계정에 '추가 연동'하는 방식으로 12시간 내 전체 유저 복구 완료"
}
```

---

#### Step 4: 컴포넌트 생성

**파일 경로**: `apps/web/src/views/portfolio/story-detail/Detail_{PascalName}.tsx`

- `PascalName`: storyId를 PascalCase로 변환 (예: `service-transfer` → `ServiceTransfer`)
- **개별 파일로 생성** (Detail_Stories.tsx 번들에 추가하지 않음)

**아키텍처 다이어그램 처리**:
- 컨텍스트 문서에 Mermaid/ASCII 다이어그램이 있으면 → Tailwind CSS JSX 컴포넌트로 변환하여 파일 상단에 선언
- 없으면 → `PlaceholderArch` 컴포넌트를 파일 상단에 선언하여 사용

**생성 템플릿**:

```tsx
import React from 'react';
import { SwissProjectDetail } from '@/widgets/portfolio/swissminimal/ui/SwissProjectDetail';
// architecture에 PlaceholderArch가 필요한 경우
import { Server } from 'lucide-react';

// 아키텍처 다이어그램 (또는 PlaceholderArch)
const ArchitectureDiagram = () => (
    // ... 컨텍스트에 따라 생성
);

// PlaceholderArch 폴백 (아키텍처 정보가 없을 때)
// const PlaceholderArch = () => (
//     <div className="aspect-[16/9] w-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center border border-dashed border-stone-300 dark:border-stone-700">
//         <div className="text-center p-8">
//             <Server className="w-16 h-16 mx-auto mb-4 text-stone-400" />
//             <h3 className="text-lg font-bold text-stone-500">Architecture Diagram</h3>
//             <p className="text-sm text-stone-400 mt-2">Wireframe Placeholder</p>
//         </div>
//     </div>
// );

export const Detail_{PascalName} = () => (
    <SwissProjectDetail
        projectInfo={{
            number: "{projectNumber}",
            title: "{title}",
            description: "{description}",
            role: "{role}",
            period: "{period}",
            status: "{status}",
            links: {}
        }}
        overview={{
            intro: "{intro}",
            goals: "{goals}",
            strategy: "{strategy}"
        }}
        keywords={[
            { category: "{cat1}", items: ["{item1}", "{item2}"] },
            // ...
        ]}
        architecture={<ArchitectureDiagram />}
        mainTasks={[
            { title: "{taskTitle}", description: "{taskDesc}" },
            // ...
        ]}
        challenges={[
            { problem: "{제목}: {상세 설명}", solution: "{해결 제목}: {해결 과정}" },
            // ...
        ]}
    />
);
```

**참고할 실제 파일**: `apps/web/src/views/portfolio/story-detail/Detail_ServiceTransfer.tsx`

---

#### Step 5: 라우트 등록

**파일**: `apps/web/src/app/portfolio/story/[id]/page.tsx`

Edit으로 두 곳을 수정한다:

1. **import 추가**: 기존 import 블록 아래에 새 컴포넌트의 import를 추가
   ```typescript
   import { Detail_{PascalName} } from '@/views/portfolio/story-detail/Detail_{PascalName}';
   ```

2. **storyMap 항목 추가**: storyMap 객체의 마지막 항목 뒤에 추가
   ```typescript
   '{storyId}': Detail_{PascalName}
   ```

---

#### Step 6: Feature Index 등록

**파일**: `apps/web/src/widgets/portfolio/swissminimal/ui/SwissFeatureIndex.tsx`

Edit으로 `features` 배열의 마지막 항목 뒤에 새 항목을 추가한다:

```typescript
{
    id: "{featureId}",
    title: "{featureTitle}",
    description: "{featureDescription}",
    storyId: "{storyId}"
}
```

- `featureId`: Step 2에서 산출한 `F.XX`
- `featureTitle`: Step 1에서 수집한 Feature 제목
- `featureDescription`: 컨텍스트 문서에서 추출한 1문장 요약
- `storyId`: Step 1에서 수집한 storyId

---

#### Step 7: 리뷰 요청

수행 결과를 사용자에게 보고하고 체크리스트를 제시한다:

```
## 생성 완료

### 생성된/수정된 파일
- [새로 생성] `apps/web/src/views/portfolio/story-detail/Detail_{PascalName}.tsx`
- [수정] `apps/web/src/app/portfolio/story/[id]/page.tsx` — import + storyMap 추가
- [수정] `apps/web/src/widgets/portfolio/swissminimal/ui/SwissFeatureIndex.tsx` — F.XX 항목 추가

### 체크리스트
- [ ] projectInfo.number가 기존 번호와 중복되지 않는지 확인
- [ ] challenges의 problem/solution이 "제목: 설명" 콜론 형식을 따르는지 확인
- [ ] storyId가 기존 storyMap과 중복되지 않는지 확인
- [ ] Feature Index의 id (F.XX)가 순차적인지 확인
- [ ] 아키텍처 다이어그램이 적절한지 확인 (PlaceholderArch인 경우 추후 교체 필요)

빌드 검증을 실행할까요?
```

---

#### Step 8: 빌드 확인 (선택)

사용자가 빌드 확인을 요청한 경우에만 실행한다:

```bash
cd apps/web && npx tsc --noEmit 2>&1 | head -30
```

타입 에러가 발생하면 원인을 분석하고 수정을 제안한다.

---

### 번호 산출 로직 상세

storyMap과 features 배열에서 현재 최대 번호를 파악하는 방법:

1. **projectNumber**: Detail_Stories.tsx와 개별 Detail_*.tsx 파일들의 `projectInfo.number` 값 중 최대값 + 1, 3자리 zero-padded
2. **featureId**: SwissFeatureIndex.tsx의 `features` 배열에서 마지막 항목의 `id`에서 숫자 부분 + 1, `F.XX` 형식 (2자리 zero-padded)

### 중복 검증

Step 2에서 반드시 확인:
- `storyId`가 이미 storyMap에 존재하면 → 사용자에게 경고하고 다른 ID를 요청
- `featureId`가 이미 features 배열에 존재하면 → 다음 번호로 자동 증가

## Tools

- **Read**: 컨텍스트 문서, page.tsx, SwissFeatureIndex.tsx, Detail_Stories.tsx 읽기
- **Write**: Detail_{PascalName}.tsx 파일 생성
- **Edit**: page.tsx, SwissFeatureIndex.tsx 수정
- **AskUserQuestion**: 입력 수집, 리뷰 확인
- **Bash**: 빌드 검증 (선택)
- **Glob**: 기존 Detail_*.tsx 파일 탐색

## Examples

### Example 1: 기본 사용

**User**: "서비스 이관 스토리 페이지를 만들어줘. 초안은 `docs/portfolio_drafts/08_service_transfer.md`에 있어."

**Assistant**:
1. storyId와 featureTitle을 확인하기 위해 AskUserQuestion 실행
2. page.tsx, SwissFeatureIndex.tsx를 읽어 다음 번호 산출
3. 초안 문서를 분석하여 Props 매핑
4. `Detail_ServiceTransfer.tsx` 생성
5. page.tsx에 import + storyMap 등록
6. SwissFeatureIndex.tsx에 F.XX 항목 추가
7. 체크리스트와 함께 리뷰 요청

### Example 2: 정보가 충분한 경우

**User**: "`docs/portfolio_drafts/09_guild_mine.md` 초안으로 스토리 추가해줘. storyId는 `guild-mine`, 제목은 '길드 & 광산 시스템 (Guild & Mine System)'으로."

**Assistant**:
모든 정보가 제공되었으므로 AskUserQuestion 없이 바로 Step 2부터 진행한다.

### Example 3: 빌드 검증 포함

**User**: "스토리 페이지 만들고 빌드도 확인해줘."

**Assistant**:
Step 1-7 수행 후, Step 8에서 `npx tsc --noEmit`으로 타입 에러 검증까지 실행한다.

## Notes

- **개별 파일 원칙**: 항상 `Detail_{PascalName}.tsx`로 개별 파일을 생성한다. `Detail_Stories.tsx`에 추가하지 않는다.
- **콜론 규칙 필수**: challenges의 problem/solution은 반드시 "제목: 설명" 형식을 따라야 한다. 이것은 `SwissProjectDetail.tsx:246-259`의 렌더링 로직에 의존한다.
- **한국어 우선**: 포트폴리오 컨텐츠는 한국어로 작성한다.
- **아키텍처 다이어그램 스타일**: Tailwind JSX로 변환 시 Swiss minimalist 스타일(stone 계열 색상, mono 폰트, 미니멀 라인)을 따른다. `Detail_ServiceTransfer.tsx`의 `InfraArchitecture` 컴포넌트를 참고한다.
- **break-keep 클래스**: 한국어 텍스트가 포함된 `<p>` 태그에는 `break-keep` 클래스를 사용한다.
