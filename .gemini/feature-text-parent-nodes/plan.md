# Feature Plan: Paragraph-List Adjacency (Text-as-Parent)

## 1. 개요 (Overview)
*   **목표**: 화이트보드 파서(`parser.ts`)를 수정하여, **일반 텍스트(Paragraph) 바로 다음에 리스트(List)가 올 경우**, 텍스트를 리스트의 **부모 노드**로 처리한다.
*   **목적**: "개념 설명(텍스트) -> 세부 사항(리스트)"으로 이어지는 학습 필기 패턴을 마인드맵 계층 구조에 그대로 반영하기 위함.
*   **기존 동작**: 텍스트와 리스트는 동일한 헤더(Section) 아래의 **형제(Sibling)** 관계로 평평하게 배치됨.
*   **변경 동작**: 텍스트가 리스트의 부모가 되어, 깊이(Depth)가 한 단계 더 들어가는 **계층(Nested)** 구조 형성.

## 2. 변경 대상 파일
*   `src/features/mdx-whiteboard/lib/parser.ts`

## 3. 구현 상세 로직 (Logic Specification)

현재 `visit` 함수는 AST를 순회하며 `stack` (헤더 계층)을 관리합니다. 여기에 **"직전 문단 추적"** 로직을 추가합니다.

### 상태 관리 변수 추가
순회 과정에서 다음 상태를 추적해야 합니다.
```typescript
let lastParagraphId: string | null = null; // 가장 최근에 방문한 문단 ID
```

### 순회 규칙 (Visitor Rules)

1.  **Heading (헤더) 만났을 때**:
    *   섹션이 바뀌므로 `lastParagraphId = null`로 초기화. (이전 섹션의 문단이 다음 섹션의 리스트에 영향을 주면 안 됨)
    *   기존 스택 로직 유지.

2.  **Paragraph (문단) 만났을 때**:
    *   노드 생성 후, `lastParagraphId = currentNodeId`로 기록.
    *   부모 결정: 현재 스택의 최상위 헤더(Section).

3.  **List (리스트) 만났을 때**:
    *   **부모 결정 로직 변경**:
        *   IF `lastParagraphId` is NOT NULL:
            *   **Parent = lastParagraphId** (문단을 부모로 연결)
            *   Edge 생성: `Paragraph` -> `List`
        *   ELSE:
            *   **Parent = Current Stack Top** (기존대로 헤더에 연결)
            *   Edge 생성: `Section` -> `List`
    *   *주의*: 리스트를 만난 후 `lastParagraphId`를 초기화할지 유지할지 결정해야 함.
        *   보통 문단 하나에 리스트 하나가 세트이므로, 리스트 처리 후에는 `lastParagraphId = null`로 초기화하는 것이 안전함. (다음 리스트가 또 나오면 그건 문단 설명 없는 독자적인 리스트일 확률이 높음, 혹은 이전 리스트의 형제임)

4.  **Component (컴포넌트) 만났을 때**:
    *   문단 설명 뒤에 컴포넌트가 오는 경우도 부모로 묶을 것인가?
    *   *결정*: 이번 목표는 "List"에 집중하므로 일단 제외하거나, 동일한 로직을 적용할 수 있음. (일단 List에만 집중 권장)
    *   `lastParagraphId` 초기화 여부 고려.

## 4. 예상되는 구조 변화

**Input MDX:**
```markdown
# Section 1
여기는 설명입니다. (Paragraph)
- 세부사항 A
- 세부사항 B
```

**AS-IS Graph:**
```
Section 1 -> 설명
Section 1 -> 세부사항 A
Section 1 -> 세부사항 B
(A와 B는 List Item으로, 보통 파서에서 뭉쳐서 처리하거나 개별 처리함. 현재 파서는 List 전체를 하나로 보는지 Item을 보는지 확인 필요)
```

**TO-BE Graph:**
```
Section 1 -> 설명
             |-> 세부사항 A
             |-> 세부사항 B
```

## 5. 작업 순서 (Task List)

1.  [ ] **`parser.ts` 분석**: 현재 리스트(ListItem vs List) 처리 방식 확인.
    *   *Check*: 현재 `listItem`을 순회하는지 `list`를 순회하는지 확인. `src/features/mdx-whiteboard/lib/parser.ts`를 보면 `listItem`을 처리하고 있음.
2.  [ ] **로직 구현**: `lastParagraphId` 추적 및 Edge 연결 로직 수정.
3.  [ ] **테스트**:
    *   "문단 + 리스트" 조합 작성.
    *   "문단 + 문단 + 리스트" 조합 작성 (두 번째 문단에 붙는지 확인).
    *   "헤더 + 리스트" (문단 없는 경우) 정상 동작 확인.

## 6. 리스크 및 고려사항
*   **Dagre Layout**: 노드 깊이가 깊어지면(`Section -> Paragraph -> List`), `Dagre` 레이아웃이 가로로 길어질 수 있음. 자동 레이아웃이 잘 동작하는지 확인 필요.
*   **ListItem 처리**: 현재 파서가 `listItem` 단위로 노드를 생성한다면, 문단 하나의 자식으로 여러 개의 `listItem` 노드가 주렁주렁 달리는 형태가 됨. 이는 의도한 바와 일치함.
