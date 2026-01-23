# Monorepo Architecture Plan

멀티 플랫폼 (VSCode Extension, Obsidian Plugin, Web) 지원을 위한 아키텍처 설계

## 개요

```
┌─────────────────────────────────────────────────────────────┐
│                    Platform Adapters                        │
├──────────────┬──────────────┬──────────────┬───────────────┤
│   VSCode     │   Obsidian   │     Web      │   Electron    │
│  Extension   │   Plugin     │   (Next.js)  │     App       │
├──────────────┴──────────────┴──────────────┴───────────────┤
│                                                             │
│                  @homveloper/mindmap-core                   │
│                     (npm package)                           │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │   Parser    │ │  Commands   │ │   Layout Engine     │   │
│  │ mdxToNodes  │ │  History    │ │   subtreeLayout     │   │
│  │ nodesToMdx  │ │  Undo/Redo  │ │   positioning       │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │ Data Types  │ │    Tree     │ │   Event Emitter     │   │
│  │ Node, Edge  │ │  Operations │ │   (상태 변경 알림)    │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Core vs Platform 분리 기준

| Core (공유) | Platform (개별) |
|-------------|-----------------|
| Node/Edge 데이터 타입 | UI 렌더링 (React, Obsidian View, Webview) |
| MDX ↔ Node 변환 | 파일 시스템 접근 |
| Command 패턴, History | 에디터 통합 |
| Layout 알고리즘 | 키보드 단축키 바인딩 |
| Tree 조작 로직 | 플랫폼 설정/저장 |

## 레포지토리 구조

### 옵션 1: Monorepo (권장)

```
mindmap-workspace/
├── packages/
│   ├── core/                    # @homveloper/mindmap-core
│   │   ├── src/
│   │   │   ├── parser/          # mdxToNodes, nodesToMdx
│   │   │   ├── commands/        # Command, History
│   │   │   ├── layout/          # subtreeLayout
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── react-renderer/          # @homveloper/mindmap-react
│   │   ├── src/
│   │   │   ├── nodes/           # SectionNode, ListNode...
│   │   │   ├── Canvas.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── vscode-extension/        # VSCode Marketplace
│   │   ├── src/
│   │   │   ├── extension.ts
│   │   │   └── MindmapEditor.ts
│   │   ├── webview/
│   │   └── package.json
│   │
│   ├── obsidian-plugin/         # Obsidian Community Plugins
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   └── MindmapView.ts
│   │   ├── manifest.json
│   │   └── package.json
│   │
│   └── blog/                    # Next.js 블로그
│       ├── src/
│       └── package.json
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

### 옵션 2: 별도 레포지토리

```
mindmap-core/           → npm publish
mindmap-vscode/         → npm i @homveloper/mindmap-core
mindmap-obsidian/       → npm i @homveloper/mindmap-core
```

## Core 패키지 인터페이스 설계

```typescript
// @homveloper/mindmap-core

export interface MindmapData {
  nodes: MindmapNode[];
  edges: MindmapEdge[];
  frontmatter?: Record<string, any>;
}

export interface MindmapNode {
  id: string;
  type: string;
  data: {
    label: string;
    depth: number;
    [key: string]: any;
  };
  position: { x: number; y: number };
  width?: number;
  height?: number;
}

export interface MindmapEdge {
  id: string;
  source: string;
  target: string;
}

// 플랫폼 독립적인 인터페이스
export interface MindmapCore {
  // 파싱/직렬화
  parse(mdx: string): MindmapData;
  serialize(data: MindmapData): string;

  // 상태 관리 (React 의존성 제거)
  createStore(initial?: MindmapData): MindmapStore;

  // 명령 실행
  execute(store: MindmapStore, command: Command): boolean;
  undo(store: MindmapStore): boolean;
  redo(store: MindmapStore): boolean;

  // 레이아웃
  calculateLayout(data: MindmapData, options?: LayoutOptions): MindmapData;
}

// 플랫폼 어댑터 인터페이스
export interface PlatformAdapter {
  readFile(path: string): Promise<string>;
  writeFile(path: string, content: string): Promise<void>;
  onFileChange(callback: (path: string) => void): Disposable;
  showNotification(message: string): void;
}
```

## VSCode Extension 구조

```typescript
// vscode-mindmap/src/extension.ts
import { MindmapCore, createStore } from '@homveloper/mindmap-core';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'mindmap.editor',
      new MindmapEditorProvider(context)
    )
  );
}

class MindmapEditorProvider implements vscode.CustomTextEditorProvider {
  async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel
  ) {
    // Core 라이브러리 사용
    const data = MindmapCore.parse(document.getText());
    const store = MindmapCore.createStore(data);

    // Webview에 React 앱 로드
    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

    // 양방향 동기화
    webviewPanel.webview.onDidReceiveMessage(msg => {
      if (msg.type === 'update') {
        const mdx = MindmapCore.serialize(msg.data);
        // VSCode 문서 업데이트
      }
    });
  }
}
```

## 마이그레이션 단계

### Phase 1: Core 추출
- ReactFlow 의존성 제거 (순수 데이터 구조로)
- Zustand → 순수 JS 상태 관리
- 테스트 작성

### Phase 2: npm 패키지화
- 빌드 설정 (tsup/rollup)
- 타입 정의 (.d.ts)
- npm publish

### Phase 3: 플랫폼 어댑터
- Web: 현재 코드를 어댑터로 래핑
- VSCode: Custom Editor + Webview
- Obsidian: ItemView + 기존 분석 활용

## 핵심 고려사항

1. **ReactFlow 의존성**: Core에서 제거, 좌표/크기만 계산 → 각 플랫폼에서 렌더링

2. **상태 관리**: Zustand는 React 종속 → Core는 순수 JS 객체 + EventEmitter 패턴

3. **번들 크기**: Core는 가볍게 유지 (tree-shaking 지원)

## 참고 프로젝트

| 프로젝트 | 구조 |
|----------|------|
| **Excalidraw** | Core + React + VSCode Extension |
| **Prettier** | Core + CLI + 에디터 플러그인들 |
| **ESLint** | Core + CLI + VSCode/WebStorm 등 |
| **Markmap** | Core + CLI + VSCode + 브라우저 |

## turbo.json 설정

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

## 개발 명령어

```bash
# 전체 빌드
pnpm build

# Core 수정 → 모든 패키지에 자동 반영
pnpm --filter @homveloper/mindmap-core dev

# 블로그만 개발
pnpm --filter blog dev

# VSCode Extension 개발
pnpm --filter vscode-extension dev

# 특정 패키지와 의존성 함께 빌드
pnpm --filter blog... build
```
