# Obsidian Enhancing Mindmap 양방향 동기화 분석

## 개요

obsidian-enhancing-mindmap 플러그인에서 마인드맵 노드와 마크다운 텍스트 간의 양방향 동기화가 어떻게 구현되어 있는지 분석한 문서입니다.

---

## 1. 핵심 메커니즘

```
노드 수정 → Command.execute() → refresh() → getMarkdown() → 파일 저장
```

### 동기화 방향

| 방향 | 트리거 | 처리 경로 |
|------|--------|-----------|
| **마크다운 → 노드** | 파일 로드 | `setViewData() → mdToData() → MindMap 생성` |
| **노드 → 마크다운** | 모든 노드 수정 | `Command.execute() → refresh() → getMarkdown()` |

---

## 2. 노드 편집 시 마크다운 업데이트

### 편집 흐름

```
사용자 더블클릭 → appDblclickFn() → node.edit()
    ↓
contentEl.innerText = this.data.text (편집 모드 진입)
contentEl.setAttribute('contentEditable', 'true')
    ↓
사용자가 텍스트 수정
    ↓
cancelEdit() 호출 (ESC 키 또는 포커스 아웃)
    ↓
getText() → 변경된 텍스트 저장
    ↓
changeNodeText 커맨드 실행
    ↓
getMarkdown() → 마크다운 재생성
    ↓
mindMapChange() → 파일 저장
```

### 핵심 코드 (INode.ts 500-529줄)

```typescript
cancelEdit() {
    var text = this.contentEl.innerText.trim() || '';
    if (text.length == 0) {
        text = this._oldText;
    }
    this.data.text = text;

    // 마크다운으로 재렌더링
    MarkdownRenderer.renderMarkdown(text, this.contentEl, ...);

    // 텍스트가 변경된 경우에만 커맨드 실행
    if (text != this._oldText) {
        this.mindmap.execute('changeNodeText', {
            node: this,
            text,
            oldText: this._oldText
        });
    }

    this.contentEl.setAttribute('contentEditable', 'false');
    this.data.isEdit = false;
}
```

---

## 3. 노드 드래그/이동 시 마크다운 반영

### 이동 흐름

```
사용자 드래그 → appDragstart() → 노드 ID 저장
    ↓
appDragover() → 드래그 타입 결정 (top/down/left/right/child)
    ↓
appDrop() → dropNode와 dragNode 비교
    ↓
moveNode() 호출 (mindmap.ts 1918-1960줄)
    ↓
execute('moveNode', {...}) → Cmds.ts의 MoveNode 커맨드
    ↓
노드 트리 구조 변경 (parent/children 업데이트)
    ↓
refresh() → 레이아웃 재계산
    ↓
getMarkdown() → 새로운 구조로 마크다운 생성
    ↓
mindMapChange() → 파일 저장
```

### MoveNode 커맨드 (Cmds.ts 129-223줄)

```typescript
export class MoveNode extends Command {
    execute(): boolean {
        // 1. 노드를 이전 부모에서 제거
        if (this.oldParent) {
            this.index = this.oldParent.removeChild(this.node);
        }

        // 2. 새 부모에 추가
        if (this.data.type.indexOf('child') > -1) {
            // 자식 노드로 이동
            this.parent.addChild(this.node);
        } else {
            // 형제 노드로 이동 (top/down)
            var dropNodeIndex = this.newParent.children.indexOf(this.dropNode);
            if (this.type == 'top' || this.type == 'left') {
                this.newParent.addChild(this.node, dropNodeIndex);
            } else {
                this.newParent.addChild(this.node, dropNodeIndex + 1);
            }
        }

        // 3. 캐시 초기화 및 UI 갱신
        this.node.clearCacheData();
        this.refresh(this.node.mindmap);
        return true;
    }

    undo() {
        // 원래 부모로 되돌림
        this.oldParent.addChild(this.node, this.index);
        this.refresh(this.node.mindmap);
    }
}
```

---

## 4. 노드 추가/삭제 시 마크다운 동기화

### 노드 추가 흐름

```
메뉴 클릭 또는 커맨드 → execute('addChildNode', {parent})
    ↓
Execute.ts에서 AddNode 커맨드 생성
    ↓
new INode(데이터) 생성
    ↓
mindmap.addNode(node, parent) → DOM 추가
    ↓
node.refreshBox() → 크기 계산
    ↓
AddNode.execute() → refresh() 호출
    ↓
mindmap.emit('mindMapChange') → getMarkdown() 트리거
    ↓
마크다운 재생성 및 파일 저장
```

### AddNode 커맨드 (Cmds.ts 24-60줄)

```typescript
export class AddNode extends Command {
    execute(): boolean {
        // 부모에 자식 노드 추가
        this.mind.addNode(this.node, this.parent, this.index);
        this.node.refreshBox();

        // 이벤트 발송 (mindMapChange 포함)
        this.refresh();

        // 자동으로 편집 모드 시작
        setTimeout(() => {
            this.node.select();
            this.node.edit();
        }, 0);
        return true;
    }

    undo() {
        // 노드 제거
        var p = this.node.parent;
        this.index = this.mind.removeNode(this.node);

        setTimeout(() => {
            this.refresh();
            p && p.select();
        }, 0);
    }
}
```

### 노드 삭제 흐름

```
선택된 노드 → 메뉴 또는 커맨드 → execute('deleteNodeAndChild')
    ↓
RemoveNode 커맨드 실행
    ↓
mindmap.removeNode(node) → DOM에서 제거
    ↓
부모의 children 배열에서 제거
    ↓
refresh() 호출
    ↓
getMarkdown() → 노드가 제거된 트리 구조로 마크다운 재생성
    ↓
파일 저장
```

---

## 5. getMarkdown() 함수의 마크다운 변환 메커니즘

### 함수 위치: mindmap.ts 2301-2364줄

```typescript
getMarkdown() {
    var md = '';
    var level = this.setting.headLevel;  // 헤드 레벨 (기본 2)

    // 깊이-우선 탐색 (DFS)으로 트리 순회
    this.traverseDF((n: INode) => {
        var l = n.getLevel() + 1;
        var hPrefix = '', space = '';

        // 1. 헤드 레벨보다 얕은 노드 → 마크다운 헤더 생성
        if (n.getLevel() < level) {
            hPrefix = '\n' + '#'.repeat(l);
            md += hPrefix + ' ' + n.getData().text.trim() + ending + '\n';
        }
        // 2. 헤드 레벨 이상 → 불릿 포인트로 변환
        else {
            // 들여쓰기 생성 (각 깊이마다 탭)
            for (var i = 0; i < n.getLevel() - level; i++) {
                space += '\t';
            }

            var text = n.getData().text.trim();

            // 여러 줄 텍스트 처리
            if (text.split('\n').length > 1) {
                if (text.startsWith('```')) {
                    // 코드 블록 처리
                    md += `${space}-\n`;
                    textArr.forEach((t, i) => {
                        md += `${space}  ${t.trim()}\n`;
                    });
                } else {
                    // 일반 텍스트 처리
                    md += `${space}- ${text}\n`;
                }
            } else {
                // 단일 줄
                md += `${space}- ${text}${ending}\n`;
            }
        }
    }, this.root, true);

    return md.trim();
}
```

### 변환 규칙

| 조건 | 변환 결과 |
|------|----------|
| 레벨 < headLevel | `## 헤더` 형식 (# 개수 = 레벨 + 1) |
| 레벨 >= headLevel | `- 불릿` 형식 (탭으로 들여쓰기) |
| 접힌 노드 | 끝에 ` ^node-id` 추가 |
| 코드 블록 | 들여쓰기 유지하며 각 줄 처리 |

### 변환 예제

```
마인드맵 구조 (headLevel = 2):
Root
├── Child 1
│   ├── Grandchild 1-1
│   └── Grandchild 1-2
└── Child 2

변환 결과:
## Root
- Child 1
	- Grandchild 1-1
	- Grandchild 1-2
- Child 2
```

---

## 6. Command 패턴과 동기화

### Command 베이스 클래스 (Cmds.ts 4-22줄)

```typescript
export abstract class Command {
    name: string;
    mind?: any;

    execute(): boolean { return false; }
    undo() {}
    redo() {
        this.execute();  // redo는 execute 재실행
    }

    // 모든 커맨드 실행 후 이벤트 발송
    refresh(mind?: any) {
        var m = mind || this.mind;
        if (m) {
            m.emit('renderEditNode', {});
            m.emit('mindMapChange', {});  // 마크다운 재생성 트리거
        }
    }
}
```

### Command 클래스 목록

| Command | 역할 | 마크다운 영향 |
|---------|------|-------------|
| **AddNode** | 자식/형제 노드 추가 | 트리 구조 변경 |
| **RemoveNode** | 노드 제거 | 트리에서 노드 제거 |
| **ChangeNodeText** | 노드 텍스트 변경 | 텍스트 내용 변경 |
| **MoveNode** | 노드 이동 (부모/위치 변경) | 트리 순서/깊이 변경 |
| **ExpandNode** | 노드 펼침 | ^id 제거 |
| **CollapseNode** | 노드 접힘 | ^id 추가 |
| **PasteNode** | 노드 복사-붙여넣기 | 새로운 서브트리 추가 |

---

## 7. 전체 데이터 플로우

```
┌─────────────────────────────────────────────────────────────┐
│                    마크다운 파일 (.md)                       │
│  ---                                                        │
│  ## Root                                                    │
│  - Child 1                                                  │
│    - Grandchild 1-1                                         │
│  - Child 2 ^collapsed-id                                    │
│  ---                                                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓ (파일 로드)
            setViewData() - MindMapView.ts
                       │
                       ↓ (마크다운 파싱)
         mdToData() - transformer.transform()
                       │
                       ↓ (노드 트리 생성)
      new MindMap(mindData) - mindmap.ts
                       │
         ┌─────────────┼─────────────┐
         ↓             ↓             ↓
    [Node DOM]   [노드 트리]    [이벤트 리스너]
         │             │             │
         └─────────────┼─────────────┘
                       │
                       ↓ (사용자 상호작용)
         click/dblclick/drag/drop
                       │
         ┌─────────────┼─────────────┐
         ↓             ↓             ↓
      edit()        drag()      other actions
         │             │             │
         └──────┬──────┴──────┬──────┘
                ↓
      cancelEdit()/appDrop()
                ↓
    execute(commandName, data)
                ↓
        History + Command 패턴
                ↓
      Command.execute() 실행
                ↓
     노드 데이터 수정 (text/children/position)
                ↓
      Command.refresh() 호출
                ↓
    emit('mindMapChange')
                ↓
  MindMapView.mindMapChange()
                ↓
  getMarkdown() - 트리 전체 순회
                ↓
  ┌──────────────────────────────────┐
  │ 1. traverseDF()로 DFS 순회       │
  │ 2. getLevel()로 깊이 계산        │
  │ 3. 헤더/불릿 포인트 생성         │
  │ 4. 들여쓰기 추가                 │
  │ 5. 마크다운 문자열 조합          │
  └──────────────────────────────────┘
                ↓
      마크다운 문자열 생성
                ↓
     this.data = yamlString + markdown
                ↓
       requestSave()
                ↓
    Obsidian vault에 저장
```

---

## 8. 핵심 설계 패턴 요약

1. **Command 패턴**: 모든 변경을 Command 객체로 캡슐화
2. **History 관리**: 명령 실행 후 히스토리에 저장 (Undo/Redo 지원)
3. **이벤트 기반**: `emit()` 사용하여 느슨한 결합
4. **자동 저장**: 모든 Command 실행 후 자동으로 `mindMapChange()` 호출
5. **DFS 순회**: 노드 트리를 깊이-우선 탐색으로 마크다운 문자열로 변환
