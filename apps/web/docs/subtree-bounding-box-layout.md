# 서브트리 바운딩 박스 기반 레이아웃 알고리즘

## 개요

마인드맵에서 노드가 겹치지 않도록 배치하는 핵심 알고리즘입니다. 각 서브트리의 전체 높이를 먼저 계산한 후, 해당 공간만큼 확보하여 노드를 배치합니다.

## 문제점: 기존 방식의 한계

기존 Dagre 기반 레이아웃의 문제:
- 자식 노드 수만 고려하고 손자 노드는 무시
- 깊은 서브트리가 있으면 노드 겹침 발생
- 동적 노드 크기 변화에 대응 어려움

```
문제 상황 예시:
    A ─── B ─── C
      │       │
      │       └── D
      │           │
      │           └── E (여러 자식)
      │
      └── F (B와 겹침!)
```

## 해결 방법: 서브트리 바운딩 박스

### 핵심 원리

1. **Bottom-Up 계산**: 리프 노드부터 루트까지 서브트리 높이 계산
2. **공간 확보**: 각 노드는 자신의 서브트리 전체 높이만큼 공간 확보
3. **Top-Down 배치**: 루트부터 확보된 공간 내에서 자식 노드 배치

### 데이터 구조

```typescript
interface LayoutNode {
  id: string;
  width: number;
  height: number;
  children: string[];  // 자식 노드 ID 배열
}

interface SubtreeInfo {
  height: number;      // 서브트리 전체 높이
  width: number;       // 서브트리 전체 너비
}

// 상수 정의
const NODE_GAP = 20;           // 노드 간 세로 간격
const LEVEL_GAP = 150;         // 레벨 간 가로 간격
```

## 알고리즘 구현

### 1단계: 트리 구조 구축

```typescript
const buildTree = (
  nodes: Node[],
  edges: Edge[]
): Map<string, string[]> => {
  const childrenMap = new Map<string, string[]>();

  // 모든 노드 초기화
  nodes.forEach(node => {
    childrenMap.set(node.id, []);
  });

  // 엣지를 기반으로 부모-자식 관계 설정
  edges.forEach(edge => {
    const children = childrenMap.get(edge.source) || [];
    children.push(edge.target);
    childrenMap.set(edge.source, children);
  });

  return childrenMap;
};
```

### 2단계: 서브트리 높이 계산 (Bottom-Up)

```typescript
const calculateSubtreeHeight = (
  nodeId: string,
  nodeMap: Map<string, LayoutNode>,
  childrenMap: Map<string, string[]>,
  cache: Map<string, number>
): number => {
  // 캐시 확인 (메모이제이션)
  if (cache.has(nodeId)) {
    return cache.get(nodeId)!;
  }

  const node = nodeMap.get(nodeId);
  if (!node) return 0;

  const children = childrenMap.get(nodeId) || [];

  // 리프 노드: 자신의 높이만 반환
  if (children.length === 0) {
    cache.set(nodeId, node.height);
    return node.height;
  }

  // 모든 자식 서브트리 높이의 합 계산
  let childrenTotalHeight = 0;
  children.forEach((childId, index) => {
    childrenTotalHeight += calculateSubtreeHeight(
      childId,
      nodeMap,
      childrenMap,
      cache
    );

    // 자식 간 간격 추가 (마지막 자식 제외)
    if (index < children.length - 1) {
      childrenTotalHeight += NODE_GAP;
    }
  });

  // 서브트리 높이 = max(자신의 높이, 자식들의 총 높이)
  const subtreeHeight = Math.max(node.height, childrenTotalHeight);
  cache.set(nodeId, subtreeHeight);

  return subtreeHeight;
};
```

### 3단계: 노드 배치 (Top-Down)

```typescript
const positionSubtree = (
  nodeId: string,
  x: number,                    // 현재 노드의 x 좌표
  yStart: number,               // 할당된 공간의 시작 y
  yEnd: number,                 // 할당된 공간의 끝 y
  nodeMap: Map<string, LayoutNode>,
  childrenMap: Map<string, string[]>,
  heightCache: Map<string, number>,
  positions: Map<string, { x: number; y: number }>
): void => {
  const node = nodeMap.get(nodeId);
  if (!node) return;

  // 현재 노드는 할당된 공간의 중앙에 배치
  const centerY = (yStart + yEnd) / 2;
  positions.set(nodeId, {
    x: x,
    y: centerY - node.height / 2
  });

  const children = childrenMap.get(nodeId) || [];
  if (children.length === 0) return;

  // 자식 노드들의 x 좌표 (한 레벨 오른쪽)
  const childX = x + node.width + LEVEL_GAP;

  // 자식들에게 공간 분배
  let currentY = yStart;

  children.forEach(childId => {
    const childSubtreeHeight = heightCache.get(childId) || 0;

    // 이 자식에게 할당할 공간
    const childYStart = currentY;
    const childYEnd = currentY + childSubtreeHeight;

    // 재귀적으로 자식 서브트리 배치
    positionSubtree(
      childId,
      childX,
      childYStart,
      childYEnd,
      nodeMap,
      childrenMap,
      heightCache,
      positions
    );

    // 다음 자식을 위한 y 위치 업데이트
    currentY = childYEnd + NODE_GAP;
  });
};
```

### 4단계: 전체 레이아웃 실행

```typescript
const calculateLayout = (
  nodes: Node[],
  edges: Edge[],
  rootId: string
): Map<string, { x: number; y: number }> => {
  // 노드 맵 생성
  const nodeMap = new Map<string, LayoutNode>();
  nodes.forEach(node => {
    nodeMap.set(node.id, {
      id: node.id,
      width: node.measured?.width || 200,
      height: node.measured?.height || 50,
      children: []
    });
  });

  // 트리 구조 구축
  const childrenMap = buildTree(nodes, edges);

  // 서브트리 높이 계산
  const heightCache = new Map<string, number>();
  const totalHeight = calculateSubtreeHeight(
    rootId,
    nodeMap,
    childrenMap,
    heightCache
  );

  // 노드 배치
  const positions = new Map<string, { x: number; y: number }>();
  positionSubtree(
    rootId,
    0,                    // 루트 x 좌표
    0,                    // 공간 시작 y
    totalHeight,          // 공간 끝 y
    nodeMap,
    childrenMap,
    heightCache,
    positions
  );

  return positions;
};
```

## 시각적 설명

### 서브트리 높이 계산 과정

```
          ┌─────────────────────────────────────────┐
          │              루트 (A)                   │
          │         서브트리 높이: 250              │
          ├─────────────────────────────────────────┤
          │                                         │
    ┌─────┴─────┐                           ┌───────┴───────┐
    │   B       │                           │      C        │
    │ 높이: 150 │                           │   높이: 80    │
    ├───────────┤                           ├───────────────┤
    │           │                           │               │
  ┌─┴─┐     ┌───┴───┐                    ┌──┴──┐         ┌──┴──┐
  │ D │     │   E   │                    │  F  │         │  G  │
  │50 │     │ 80    │                    │ 30  │         │ 30  │
  └───┘     ├───────┤                    └─────┘         └─────┘
            │       │
          ┌─┴─┐   ┌─┴─┐
          │ H │   │ I │
          │30 │   │30 │
          └───┘   └───┘

계산 순서 (Bottom-Up):
1. D: 50, H: 30, I: 30
2. E: max(자신 높이, H+gap+I) = max(40, 30+20+30) = 80
3. B: max(자신 높이, D+gap+E) = max(40, 50+20+80) = 150
4. F: 30, G: 30
5. C: max(자신 높이, F+gap+G) = max(40, 30+20+30) = 80
6. A: max(자신 높이, B+gap+C) = max(50, 150+20+80) = 250
```

### 공간 할당 및 배치 과정

```
Y 좌표    공간 할당
  0  ┬────────────────────────────────┐
     │                                │
     │    B 서브트리 공간 (0~150)     │
     │         B는 중앙(75)에 배치    │
 150 ├────────────────────────────────┤
     │         gap (20px)             │
 170 ├────────────────────────────────┤
     │                                │
     │    C 서브트리 공간 (170~250)   │
     │         C는 중앙(210)에 배치   │
 250 └────────────────────────────────┘

A는 전체 공간(0~250)의 중앙인 125에 배치
```

## ReactFlow 통합 코드

```typescript
// ReactFlow의 useNodesState와 통합
import { useCallback } from 'react';
import { Node, Edge, useNodesState, useEdgesState } from '@xyflow/react';

export const useSubtreeLayout = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const applyLayout = useCallback(() => {
    if (nodes.length === 0) return;

    // 루트 노드 찾기 (들어오는 엣지가 없는 노드)
    const targetIds = new Set(edges.map(e => e.target));
    const rootNode = nodes.find(n => !targetIds.has(n.id));

    if (!rootNode) return;

    // 레이아웃 계산
    const positions = calculateLayout(nodes, edges, rootNode.id);

    // 노드 위치 업데이트
    setNodes(prevNodes =>
      prevNodes.map(node => {
        const pos = positions.get(node.id);
        if (pos) {
          return {
            ...node,
            position: { x: pos.x, y: pos.y }
          };
        }
        return node;
      })
    );
  }, [nodes, edges, setNodes]);

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    applyLayout
  };
};
```

## 성능 최적화

### 메모이제이션

```typescript
// 서브트리 높이 캐시 - 구조가 변경되지 않으면 재계산 불필요
const subtreeHeightCache = new Map<string, number>();

// 노드 크기 변경 시에만 해당 경로 무효화
const invalidateCache = (nodeId: string, parentMap: Map<string, string>) => {
  let current = nodeId;
  while (current) {
    subtreeHeightCache.delete(current);
    current = parentMap.get(current)!;
  }
};
```

### 증분 업데이트

```typescript
// 전체 재계산 대신 변경된 서브트리만 업데이트
const updateSubtreeOnly = (
  changedNodeId: string,
  nodeMap: Map<string, LayoutNode>,
  childrenMap: Map<string, string[]>
) => {
  // 변경된 노드의 루트 찾기
  const affectedRoot = findAffectedRoot(changedNodeId);

  // 해당 서브트리만 재계산
  const newHeight = calculateSubtreeHeight(
    affectedRoot,
    nodeMap,
    childrenMap,
    new Map()
  );

  // 필요한 경우에만 전체 레이아웃 재계산
  if (heightChanged(affectedRoot, newHeight)) {
    recalculateLayout();
  }
};
```

## Dagre와의 비교

| 항목 | Dagre | 서브트리 바운딩 박스 |
|------|-------|---------------------|
| 복잡도 | O(V + E) | O(V + E) |
| 겹침 방지 | 제한적 | 완벽 |
| 마인드맵 최적화 | 범용 | 특화 |
| 커스터마이징 | 어려움 | 용이 |
| 애니메이션 | 지원 어려움 | 용이 |

## 확장: 좌우 밸런싱

마인드맵 스타일(좌우 분산)을 위한 확장:

```typescript
const balanceLeftRight = (
  rootId: string,
  children: string[],
  heightCache: Map<string, number>
): { left: string[], right: string[] } => {
  // 자식들을 서브트리 높이로 정렬 (큰 것부터)
  const sorted = [...children].sort((a, b) =>
    (heightCache.get(b) || 0) - (heightCache.get(a) || 0)
  );

  const left: string[] = [];
  const right: string[] = [];
  let leftHeight = 0;
  let rightHeight = 0;

  // Greedy 할당: 현재 높이가 낮은 쪽에 배치
  sorted.forEach(childId => {
    const h = heightCache.get(childId) || 0;

    if (leftHeight <= rightHeight) {
      left.push(childId);
      leftHeight += h + NODE_GAP;
    } else {
      right.push(childId);
      rightHeight += h + NODE_GAP;
    }
  });

  return { left, right };
};
```

## 결론

서브트리 바운딩 박스 알고리즘은:
1. **정확한 공간 계산**: 모든 자손 노드를 고려
2. **겹침 완벽 방지**: 각 서브트리에 필요한 공간을 정확히 확보
3. **유연한 확장**: 좌우 밸런싱, 접기/펼치기 등 쉽게 확장 가능
4. **예측 가능한 결과**: 동일 입력에 항상 동일 출력

이 알고리즘을 기반으로 마인드맵 레이아웃을 구현하면, 노드 겹침 문제 없이 깔끔한 시각화가 가능합니다.
