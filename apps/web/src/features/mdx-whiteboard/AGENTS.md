# FEATURE: MDX WHITEBOARD

**Domain:** MDX Parsing & Visual Layout
**Complexity:** High (Technical Debt Hotspot)

## OVERVIEW
Core engine that converts MDX content into a 2D node-based whiteboard visualization.
Handles parsing, tree construction, layout calculation (FlexTree), and rendering.

## STRUCTURE
```
src/features/mdx-whiteboard/
├── lib/
│   ├── parser.ts          # ⚠️ THE MONOLITH (500+ lines). MDX -> Graph.
│   ├── layoutEngine.ts    # Geometric positioning.
│   ├── flextree.ts        # Tree layout algorithm.
│   └── commands/          # Editor actions.
├── ui/
│   ├── nodes/             # Custom ReactFlow nodes.
│   └── edges/             # Custom ReactFlow edges.
└── model/                 # Zustand stores / Types.
```

## KEY COMPONENTS

### 1. The Parser (`parser.ts`)
- **Input**: Raw MDX string.
- **Output**: Graph data structure (Nodes + Edges).
- **Issue**: God-function `traverse()` handles all Markdown AST nodes.
- **Constraint**: ANY change requires full regression testing (see `parser.test.ts`).

### 2. Layout Engine (`layoutEngine.ts`)
- Calculates `x,y` coordinates.
- **Logic**: Geometric overlap detection, tree balancing.
- **Tests**: Visual overlap checks in `layoutEngine.test.ts`.

## CONVENTIONS
- **Testing**: EXTENSIVE unit tests required for any parser/layout change.
- **Coords**: Origin (0,0) is top-left.
- **Nodes**: Must support bi-directional text (English/Korean).

## ANTI-PATTERNS
- **DO NOT** add more logic to `traverse()` in `parser.ts`. **REFACTOR** into visitors instead.
- **DO NOT** hardcode node sizes. Use `measureNode` utility.

## REFACTORING PLAN (Ongoing)
1. Split `parser.ts` into node-specific handlers.
2. Extract AST traversal logic.
3. Improve type safety for AST nodes.
