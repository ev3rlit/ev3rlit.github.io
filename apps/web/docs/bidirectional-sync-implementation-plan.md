# 양방향 동기화 구현 계획

## 개요

MDX 화이트보드 프로젝트에 양방향 동기화 기능을 구현하기 위한 계획서입니다.
obsidian-enhancing-mindmap의 설계 패턴을 참고하여 구현합니다.

---

## 1. 현재 상태

### 구현된 기능
- MDX → 노드 변환 (`parseMdxToGraph()`)
- 서브트리 바운딩 박스 레이아웃 (`applySubtreeLayout()`)
- 좌우 밸런싱

### 미구현 기능
- 노드 → MDX 변환 (역방향 동기화)
- Command 패턴 (Undo/Redo)
- 노드 편집 UI
- 노드 드래그 시 MDX 반영

---

## 2. 구현할 파일 구조

```
src/features/mdx-whiteboard/lib/
├── parser.ts              # (기존) MDX → 노드
├── nodesToMdx.ts          # (신규) 노드 → MDX
├── subtreeLayout.ts       # (기존) 레이아웃
└── commands/
    ├── Command.ts         # Command 베이스 클래스
    ├── History.ts         # Undo/Redo 히스토리
    ├── ChangeNodeText.ts  # 텍스트 변경 커맨드
    ├── MoveNode.ts        # 노드 이동 커맨드
    ├── AddNode.ts         # 노드 추가 커맨드
    └── RemoveNode.ts      # 노드 삭제 커맨드
```

---

## 3. nodesToMdx.ts 구현

### 핵심 로직

```typescript
import { Node, Edge } from 'reactflow';

interface TreeNode {
    id: string;
    type: string;
    data: any;
    children: TreeNode[];
    depth: number;
}

// 노드 타입별 변환 규칙
const NODE_TYPE_CONFIG = {
    root: { format: 'frontmatter' },
    section: { format: 'header' },      // ## 헤더
    list: { format: 'bullet' },         // - 불릿
    code: { format: 'codeblock' },      // ```코드```
    table: { format: 'table' },         // | 테이블 |
    blockquote: { format: 'quote' },    // > 인용
    component: { format: 'mdx' },       // <Component />
};

export const nodesToMdx = (
    nodes: Node[],
    edges: Edge[],
    frontmatter?: Record<string, any>
): string => {
    // 1. 트리 구조 구축
    const tree = buildTree(nodes, edges);

    // 2. Frontmatter 생성
    let mdx = generateFrontmatter(frontmatter);

    // 3. DFS로 순회하며 MDX 생성
    traverseDF(tree.root, (node, depth) => {
        mdx += convertNodeToMdx(node, depth);
    });

    return mdx;
};

// 트리 구조 구축
const buildTree = (nodes: Node[], edges: Edge[]): { root: TreeNode } => {
    const nodeMap = new Map<string, TreeNode>();
    const childrenMap = new Map<string, string[]>();

    // 노드 맵 생성
    nodes.forEach(node => {
        nodeMap.set(node.id, {
            id: node.id,
            type: node.type || 'default',
            data: node.data,
            children: [],
            depth: 0
        });
    });

    // 부모-자식 관계 구축
    edges.forEach(edge => {
        const children = childrenMap.get(edge.source) || [];
        children.push(edge.target);
        childrenMap.set(edge.source, children);
    });

    // 자식 노드 연결 및 depth 계산
    const setChildren = (nodeId: string, depth: number) => {
        const node = nodeMap.get(nodeId);
        if (!node) return;

        node.depth = depth;
        const childIds = childrenMap.get(nodeId) || [];

        childIds.forEach(childId => {
            const child = nodeMap.get(childId);
            if (child) {
                node.children.push(child);
                setChildren(childId, depth + 1);
            }
        });
    };

    // 루트 노드 찾기
    const rootNode = nodes.find(n => n.type === 'root');
    if (rootNode) {
        setChildren(rootNode.id, 0);
    }

    return { root: nodeMap.get(rootNode?.id || '') as TreeNode };
};

// DFS 순회
const traverseDF = (
    node: TreeNode,
    callback: (node: TreeNode, depth: number) => void,
    depth: number = 0
) => {
    if (!node) return;

    callback(node, depth);

    node.children.forEach(child => {
        traverseDF(child, callback, depth + 1);
    });
};

// 노드를 MDX로 변환
const convertNodeToMdx = (node: TreeNode, depth: number): string => {
    const { type, data } = node;
    const label = data?.label || '';

    switch (type) {
        case 'root':
            return ''; // frontmatter에서 처리

        case 'section':
            // 헤더: ## 텍스트
            const headerLevel = Math.min(depth + 1, 6);
            return '\n' + '#'.repeat(headerLevel) + ' ' + label + '\n\n';

        case 'list':
            // 불릿: - 텍스트 (들여쓰기)
            const indent = '\t'.repeat(Math.max(0, depth - 1));
            return indent + '- ' + label + '\n';

        case 'code':
            // 코드 블록
            const { lang, value } = data?.codeData || {};
            return '\n```' + (lang || '') + '\n' + value + '\n```\n\n';

        case 'table':
            // 테이블
            return generateTable(data?.tableData) + '\n';

        case 'blockquote':
            // 인용
            return '\n> ' + label + '\n\n';

        case 'component':
        case 'chart':
        case 'math':
        case 'stats':
            // MDX 컴포넌트
            return generateMdxComponent(label, data?.props) + '\n';

        default:
            // 일반 텍스트
            if (label) {
                const indent = '\t'.repeat(Math.max(0, depth - 1));
                return indent + '- ' + label + '\n';
            }
            return '';
    }
};

// Frontmatter 생성
const generateFrontmatter = (frontmatter?: Record<string, any>): string => {
    if (!frontmatter || Object.keys(frontmatter).length === 0) {
        return '';
    }

    let yaml = '---\n';
    Object.entries(frontmatter).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            yaml += `${key}: [${value.join(', ')}]\n`;
        } else {
            yaml += `${key}: ${value}\n`;
        }
    });
    yaml += '---\n\n';

    return yaml;
};

// 테이블 생성
const generateTable = (tableData?: { headers: string[]; rows: string[][] }): string => {
    if (!tableData) return '';

    const { headers, rows } = tableData;
    let table = '\n| ' + headers.join(' | ') + ' |\n';
    table += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
    rows.forEach(row => {
        table += '| ' + row.join(' | ') + ' |\n';
    });

    return table;
};

// MDX 컴포넌트 생성
const generateMdxComponent = (name: string, props?: Record<string, any>): string => {
    if (!props || Object.keys(props).length === 0) {
        return `<${name} />`;
    }

    const propsStr = Object.entries(props)
        .map(([key, value]) => {
            if (typeof value === 'string') {
                return `${key}="${value}"`;
            }
            return `${key}={${JSON.stringify(value)}}`;
        })
        .join(' ');

    return `<${name} ${propsStr} />`;
};
```

---

## 4. Command 패턴 구현

### Command.ts

```typescript
import { Node, Edge } from 'reactflow';

export interface CommandContext {
    nodes: Node[];
    edges: Edge[];
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    syncToMdx: () => void;
}

export abstract class Command {
    protected context: CommandContext;

    constructor(context: CommandContext) {
        this.context = context;
    }

    abstract execute(): void;
    abstract undo(): void;

    redo(): void {
        this.execute();
    }
}
```

### History.ts

```typescript
import { Command } from './Command';

export class History {
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];
    private maxSize: number = 50;

    execute(command: Command): void {
        command.execute();
        this.undoStack.push(command);
        this.redoStack = []; // redo 스택 초기화

        // 최대 크기 제한
        if (this.undoStack.length > this.maxSize) {
            this.undoStack.shift();
        }
    }

    undo(): boolean {
        const command = this.undoStack.pop();
        if (!command) return false;

        command.undo();
        this.redoStack.push(command);
        return true;
    }

    redo(): boolean {
        const command = this.redoStack.pop();
        if (!command) return false;

        command.redo();
        this.undoStack.push(command);
        return true;
    }

    canUndo(): boolean {
        return this.undoStack.length > 0;
    }

    canRedo(): boolean {
        return this.redoStack.length > 0;
    }

    clear(): void {
        this.undoStack = [];
        this.redoStack = [];
    }
}
```

### ChangeNodeText.ts

```typescript
import { Command, CommandContext } from './Command';

export class ChangeNodeText extends Command {
    private nodeId: string;
    private oldText: string;
    private newText: string;

    constructor(
        context: CommandContext,
        nodeId: string,
        oldText: string,
        newText: string
    ) {
        super(context);
        this.nodeId = nodeId;
        this.oldText = oldText;
        this.newText = newText;
    }

    execute(): void {
        const nodes = this.context.nodes.map(node => {
            if (node.id === this.nodeId) {
                return {
                    ...node,
                    data: { ...node.data, label: this.newText }
                };
            }
            return node;
        });

        this.context.setNodes(nodes);
        this.context.syncToMdx();
    }

    undo(): void {
        const nodes = this.context.nodes.map(node => {
            if (node.id === this.nodeId) {
                return {
                    ...node,
                    data: { ...node.data, label: this.oldText }
                };
            }
            return node;
        });

        this.context.setNodes(nodes);
        this.context.syncToMdx();
    }
}
```

### MoveNode.ts

```typescript
import { Command, CommandContext } from './Command';
import { Node, Edge } from 'reactflow';

export class MoveNode extends Command {
    private nodeId: string;
    private oldParentId: string;
    private newParentId: string;
    private oldIndex: number;
    private newIndex: number;

    constructor(
        context: CommandContext,
        nodeId: string,
        oldParentId: string,
        newParentId: string,
        oldIndex: number,
        newIndex: number
    ) {
        super(context);
        this.nodeId = nodeId;
        this.oldParentId = oldParentId;
        this.newParentId = newParentId;
        this.oldIndex = oldIndex;
        this.newIndex = newIndex;
    }

    execute(): void {
        // 엣지 업데이트
        const edges = this.context.edges.map(edge => {
            if (edge.target === this.nodeId) {
                return { ...edge, source: this.newParentId };
            }
            return edge;
        });

        this.context.setEdges(edges);
        this.context.syncToMdx();
    }

    undo(): void {
        const edges = this.context.edges.map(edge => {
            if (edge.target === this.nodeId) {
                return { ...edge, source: this.oldParentId };
            }
            return edge;
        });

        this.context.setEdges(edges);
        this.context.syncToMdx();
    }
}
```

---

## 5. whiteboardStore 수정

```typescript
import { create } from 'zustand';
import { Node, Edge } from 'reactflow';
import { History } from '@/features/mdx-whiteboard/lib/commands/History';
import { Command } from '@/features/mdx-whiteboard/lib/commands/Command';
import { nodesToMdx } from '@/features/mdx-whiteboard/lib/nodesToMdx';

interface WhiteboardState {
    // 기존 상태...
    mdxSource: string;
    nodes: Node[];
    edges: Edge[];

    // 새로운 상태
    history: History;
    frontmatter: Record<string, any>;

    // 기존 액션...
    setMdxSource: (source: string) => void;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;

    // 새로운 액션
    executeCommand: (command: Command) => void;
    undo: () => void;
    redo: () => void;
    syncToMdx: () => void;
    canUndo: () => boolean;
    canRedo: () => boolean;
}

export const useWhiteboardStore = create<WhiteboardState>((set, get) => ({
    // ... 기존 상태 ...

    history: new History(),
    frontmatter: {},

    executeCommand: (command: Command) => {
        get().history.execute(command);
    },

    undo: () => {
        const success = get().history.undo();
        if (success) {
            get().syncToMdx();
        }
    },

    redo: () => {
        const success = get().history.redo();
        if (success) {
            get().syncToMdx();
        }
    },

    syncToMdx: () => {
        const { nodes, edges, frontmatter } = get();
        const mdx = nodesToMdx(nodes, edges, frontmatter);
        set({ mdxSource: mdx });
    },

    canUndo: () => get().history.canUndo(),
    canRedo: () => get().history.canRedo(),
}));
```

---

## 6. 동기화 트리거 포인트

| 작업 | UI 이벤트 | Command | 트리거 |
|------|----------|---------|--------|
| 노드 텍스트 편집 | 더블클릭 → 편집 → blur | ChangeNodeText | onBlur |
| 노드 드래그 이동 | 드래그 앤 드롭 | MoveNode | onNodeDragStop |
| 노드 추가 | 컨텍스트 메뉴 / 단축키 | AddNode | onClick |
| 노드 삭제 | Delete 키 / 컨텍스트 메뉴 | RemoveNode | onKeyDown |
| Undo | Ctrl+Z | - | onKeyDown |
| Redo | Ctrl+Shift+Z | - | onKeyDown |

---

## 7. 구현 순서

### Phase 1: 기본 동기화
1. `nodesToMdx.ts` 구현
2. `whiteboardStore`에 `syncToMdx` 추가
3. 기본 동기화 테스트

### Phase 2: Command 패턴
4. `Command.ts`, `History.ts` 구현
5. `ChangeNodeText` 커맨드 구현
6. 노드 텍스트 편집 UI 추가

### Phase 3: 노드 조작
7. `MoveNode` 커맨드 구현
8. `AddNode`, `RemoveNode` 커맨드 구현
9. 컨텍스트 메뉴 UI 추가

### Phase 4: Undo/Redo
10. 키보드 단축키 연결 (Ctrl+Z, Ctrl+Shift+Z)
11. Undo/Redo 버튼 UI 추가

---

## 8. 수정할 기존 파일

| 파일 | 수정 내용 |
|------|----------|
| `whiteboardStore.ts` | History, Command 통합, syncToMdx 추가 |
| `WhiteboardCanvas.tsx` | 이벤트 핸들러 연결, 키보드 단축키 |
| `SectionNode.tsx` | 편집 모드 추가 |
| `ListNode.tsx` | 편집 모드 추가 |
| 기타 노드 컴포넌트들 | 편집 모드 추가 |
