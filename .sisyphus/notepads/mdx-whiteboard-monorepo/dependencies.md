# MDX-Whiteboard Dependency Analysis

**Generated:** 2026-01-23
**Scope:** `src/features/mdx-whiteboard`

---

## 1. Incoming Dependencies (Files Importing FROM mdx-whiteboard)

Files outside `mdx-whiteboard` that import from it:

| File | Imports |
|------|---------|
| `src/entities/whiteboard/model/whiteboardStore.ts` | `layoutEngine`, `nodesToMdx`, `commands` |
| `src/views/whiteboard/ui/WhiteboardPage.tsx` | `MdxEditor`, `WhiteboardCanvas`, `PropertyEditor` |
| `src/features/mdx-viewer/ui/MindmapViewer.tsx` | `parseMdxToGraph`, `nodes/*` |
| `src/features/mdx-viewer/ui/FullscreenMindmapPage.tsx` | `parseMdxToGraph`, `nodes/*` |
| `src/widgets/sidebar/ui/index.tsx` | `ComponentPickerMenu` |

### Detailed Import Map

```
src/entities/whiteboard/model/whiteboardStore.ts
├── @/features/mdx-whiteboard/lib/layoutEngine (applyLayout)
├── @/features/mdx-whiteboard/lib/nodesToMdx (nodesToMdx)
└── @/features/mdx-whiteboard/lib/commands (History, Command, CommandContext)

src/views/whiteboard/ui/WhiteboardPage.tsx
├── @/features/mdx-whiteboard/ui/MdxEditor
├── @/features/mdx-whiteboard/ui/WhiteboardCanvas
└── @/features/mdx-whiteboard/ui/PropertyEditor

src/features/mdx-viewer/ui/MindmapViewer.tsx
├── @/features/mdx-whiteboard/lib/parser (parseMdxToGraph)
└── @/features/mdx-whiteboard/ui/nodes (SectionNode, ListNode, ComponentNode, RootNode, TableNode, CodeNode, BlockquoteNode, ChartNode, MathNode, StatsNode)

src/features/mdx-viewer/ui/FullscreenMindmapPage.tsx
├── @/features/mdx-whiteboard/lib/parser (parseMdxToGraph)
└── @/features/mdx-whiteboard/ui/nodes (SectionNode, ListNode, ComponentNode, RootNode, TableNode, CodeNode, BlockquoteNode, ChartNode, MathNode, StatsNode)

src/widgets/sidebar/ui/index.tsx
└── @/features/mdx-whiteboard/ui/ComponentPickerMenu
```

---

## 2. Outgoing Dependencies (mdx-whiteboard Imports FROM Internal Modules)

### 2.1 Imports from `@/entities/whiteboard`

| File | Import |
|------|--------|
| `ui/PropertyEditor.tsx` | `useWhiteboardStore` |
| `ui/MdxEditor.tsx` | `useWhiteboardStore` |
| `ui/ComponentPickerMenu.tsx` | `useWhiteboardStore` |
| `ui/WhiteboardCanvas.tsx` | `useWhiteboardStore` |
| `ui/LayoutManager.tsx` | `useWhiteboardStore` |
| `ui/nodes/ComponentNode.tsx` | `useWhiteboardStore` |
| `lib/useNodeMeasurement.ts` | `useWhiteboardStore` |

**Total: 7 files depend on `@/entities/whiteboard/model/whiteboardStore`**

### 2.2 Imports from `@/shared`

| File | Import |
|------|--------|
| `ui/PropertyEditor.tsx` | `Card`, `Button` |
| `ui/ComponentPickerMenu.tsx` | `Card` |
| `ui/nodes/ListNode.tsx` | `cn` |
| `ui/nodes/RootNode.tsx` | `cn` |
| `ui/nodes/ComponentNode.tsx` | `Card`, `cn` |
| `ui/nodes/LinkNode.tsx` | `cn` |
| `ui/nodes/CodeNode.tsx` | `cn` |
| `ui/nodes/base/BaseComponentNode.tsx` | `cn` |
| `ui/nodes/BlockquoteNode.tsx` | `cn` |
| `ui/nodes/TableNode.tsx` | `cn` |
| `ui/nodes/ImageNode.tsx` | `cn` |
| `ui/nodes/components/stats/StatsNode.tsx` | `cn` |
| `ui/nodes/SectionNode.tsx` | `cn` |

**Shared dependencies:**
- `@/shared/lib/cn` - 11 files
- `@/shared/ui/Card` - 3 files
- `@/shared/ui/Button` - 1 file

### 2.3 Imports from `@/features/mdx-viewer`

| File | Import |
|------|--------|
| `ui/nodes/ComponentNode.tsx` | `CodeComparison`, `StatCard` |

---

## 3. Circular Dependencies Analysis

### 3.1 CRITICAL: `entities/whiteboard` ↔ `features/mdx-whiteboard`

```
┌─────────────────────────────────────────────────────────────────┐
│                    CIRCULAR DEPENDENCY                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  entities/whiteboard/whiteboardStore.ts                         │
│       │                                                         │
│       │ imports                                                 │
│       ▼                                                         │
│  features/mdx-whiteboard/lib/layoutEngine.ts                    │
│  features/mdx-whiteboard/lib/nodesToMdx.ts                      │
│  features/mdx-whiteboard/lib/commands/*                         │
│       │                                                         │
│       │ (mdx-whiteboard UI files import back)                   │
│       ▼                                                         │
│  features/mdx-whiteboard/ui/*.tsx                               │
│       │                                                         │
│       │ imports                                                 │
│       ▼                                                         │
│  entities/whiteboard/whiteboardStore.ts  ← CYCLE!               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Affected files in mdx-whiteboard importing whiteboardStore:**
1. `ui/PropertyEditor.tsx`
2. `ui/MdxEditor.tsx`
3. `ui/ComponentPickerMenu.tsx`
4. `ui/WhiteboardCanvas.tsx`
5. `ui/LayoutManager.tsx`
6. `ui/nodes/ComponentNode.tsx`
7. `lib/useNodeMeasurement.ts`

**FSD Violation:** Features should NOT import from entities that import from them.

### 3.2 CRITICAL: `features/mdx-whiteboard` ↔ `features/mdx-viewer`

```
┌─────────────────────────────────────────────────────────────────┐
│                    CIRCULAR DEPENDENCY                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  features/mdx-viewer/ui/MindmapViewer.tsx                       │
│  features/mdx-viewer/ui/FullscreenMindmapPage.tsx               │
│       │                                                         │
│       │ imports                                                 │
│       ▼                                                         │
│  features/mdx-whiteboard/lib/parser.ts                          │
│  features/mdx-whiteboard/ui/nodes/*                             │
│       │                                                         │
│       │ (ComponentNode imports back)                            │
│       ▼                                                         │
│  features/mdx-whiteboard/ui/nodes/ComponentNode.tsx             │
│       │                                                         │
│       │ imports                                                 │
│       ▼                                                         │
│  features/mdx-viewer/ui/CodeComparison                          │
│  features/mdx-viewer/ui/StatCard                    ← CYCLE!    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**FSD Violation:** Features at the same layer should NOT have bidirectional imports.

---

## 4. Platform-Specific Dependencies

### 4.1 `next-themes` Usage

| File | Usage |
|------|-------|
| `ui/WhiteboardCanvas.tsx` | `useTheme()` for dark mode detection |
| `ui/MonacoEditor.tsx` | `useTheme()` for editor theme |

### 4.2 `@monaco-editor/react` Usage

| File | Usage |
|------|-------|
| `ui/MonacoEditor.tsx` | `Editor`, `OnMount`, `BeforeMount` |

### 4.3 `"use client"` Directive

**19 files require client-side rendering:**

```
lib/renderInlineContent.tsx
ui/PropertyEditor.tsx
ui/MonacoEditor.tsx
ui/ComponentPickerMenu.tsx
ui/MdxEditor.tsx
ui/LayoutManager.tsx
ui/WhiteboardCanvas.tsx
ui/nodes/ImageNode.tsx
ui/nodes/ListNode.tsx
ui/nodes/base/BaseComponentNode.tsx
ui/nodes/components/stats/StatsNode.tsx
ui/nodes/SectionNode.tsx
ui/nodes/ComponentNode.tsx
ui/nodes/components/math/MathNode.tsx
ui/nodes/CodeNode.tsx
ui/nodes/BlockquoteNode.tsx
ui/nodes/components/chart/ChartNode.tsx
ui/nodes/TableNode.tsx
ui/nodes/RootNode.tsx
```

### 4.4 `reactflow` Usage (22 files)

**Library files:**
- `lib/parser.ts` - `Node`, `Edge`
- `lib/layoutEngine.ts` - `Node`, `Edge`, `Position`
- `lib/nodesToMdx.ts` - `Node`, `Edge`
- `lib/measureNode.ts` - `Node`
- `lib/commands/Command.ts` - `Node`, `Edge`
- `lib/commands/AddNode.ts` - `Node`, `Edge`
- `lib/commands/RemoveNode.ts` - `Node`, `Edge`

**UI files:**
- All node components use `Handle`, `Position`, `NodeProps`
- `ui/LayoutManager.tsx` - `Position`

---

## 5. Migration Recommendations

### 5.1 Breaking Circular Dependencies

**Priority 1: Extract Pure Logic**
```
Move to shared package (no React, no store):
├── lib/parser.ts (remove reactflow types, use generic)
├── lib/layoutEngine.ts (abstract Node/Edge types)
├── lib/nodesToMdx.ts (abstract Node/Edge types)
├── lib/commands/* (abstract types)
└── lib/flextree.ts (already pure)
```

**Priority 2: Abstract Store Interface**
```typescript
// Create interface in shared layer
interface WhiteboardStoreInterface {
  nodes: GenericNode[];
  edges: GenericEdge[];
  // ... methods
}

// mdx-whiteboard depends on interface, not implementation
```

**Priority 3: Move Shared Components**
```
Move to shared/ui or separate package:
├── CodeComparison (currently in mdx-viewer)
├── StatCard (currently in mdx-viewer)
└── Node components (if reusable)
```

### 5.2 Platform Abstraction

**For `next-themes`:**
```typescript
// Create theme adapter interface
interface ThemeAdapter {
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: string) => void;
}
```

**For `@monaco-editor/react`:**
- Keep in separate entry point
- Make optional/lazy-loaded

### 5.3 Dependency Graph (Target State)

```
┌─────────────────────────────────────────────────────────────────┐
│                      TARGET ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  @mdx-whiteboard/core (pure, no React)                          │
│  ├── parser.ts                                                  │
│  ├── layoutEngine.ts                                            │
│  ├── nodesToMdx.ts                                              │
│  └── commands/*                                                 │
│       ▲                                                         │
│       │ depends on                                              │
│       │                                                         │
│  @mdx-whiteboard/react (React components)                       │
│  ├── nodes/*                                                    │
│  ├── WhiteboardCanvas.tsx                                       │
│  └── ... (UI components)                                        │
│       ▲                                                         │
│       │ depends on                                              │
│       │                                                         │
│  App layer (views, widgets)                                     │
│  ├── WhiteboardPage                                             │
│  ├── MindmapViewer                                              │
│  └── whiteboardStore (consumes core)                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Summary Statistics

| Metric | Count |
|--------|-------|
| Total files in mdx-whiteboard | 39 |
| Files with "use client" | 19 |
| Files importing reactflow | 22 |
| Files importing whiteboardStore | 7 |
| Files importing @/shared | 13 |
| Circular dependency chains | 2 |
| Platform-specific files | 2 (next-themes), 1 (monaco) |

---

## 7. Action Items for Monorepo Migration

1. **[ ] Extract core parsing logic** - Remove reactflow types from parser.ts
2. **[ ] Create abstract node/edge types** - Generic interfaces for layout engine
3. **[ ] Break whiteboardStore cycle** - Move store to app layer or create interface
4. **[ ] Break mdx-viewer cycle** - Move CodeComparison/StatCard to shared
5. **[ ] Create theme adapter** - Abstract next-themes dependency
6. **[ ] Lazy-load Monaco** - Make editor optional
7. **[ ] Split package** - `@mdx-whiteboard/core` + `@mdx-whiteboard/react`
