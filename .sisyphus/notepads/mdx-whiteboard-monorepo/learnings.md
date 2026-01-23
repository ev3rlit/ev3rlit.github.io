## 2026-01-23T14:11:00Z - Task 6: Extract React Components (packages/whiteboard-ui)

### What Was Done
1. Created `packages/whiteboard-ui` package structure
2. Moved all UI components from `apps/web/src/features/mdx-whiteboard/ui/` to package
3. Moved `whiteboardStore` from `apps/web/src/entities/whiteboard/model/` to `packages/whiteboard-ui/src/model/`
4. Copied shared UI components (Card, Button) and utilities (cn, motion config) to package
5. Updated all imports to use workspace references (`@repo/mdx-logic`, `@repo/whiteboard-bridge`)
6. Fixed all type errors and dependencies

### Dependencies Added
- `@repo/mdx-logic` and `@repo/whiteboard-bridge` as workspace deps
- `reactflow`, `zustand`, `lucide-react`, `framer-motion`, `recharts`, `katex`, `react-katex`
- `gray-matter`, `unified`, `remark-parse`, `remark-gfm`, `remark-mdx` for MDX parsing
- `class-variance-authority` for UI variants
- `clsx`, `tailwind-merge` for styling

### Challenges Encountered
1. **Circular Dependencies**: Had to move `whiteboardStore` from `entities` to `whiteboard-ui` package
2. **Shared UI Components**: Needed to copy (not move) shared UI components since they're used elsewhere
3. **Platform-Specific Imports**: Had to comment out feature-specific component imports (SqlPlayground, CodeComparison, StatCard) as they belong to other features
4. **TSConfig**: Had to write complete tsconfig instead of extending from @repo/tsconfig due to missing react-library.json

### Learnings
- **Strategy A (Move Fast)** worked: Accepted coupling with `reactflow` and `zustand` in packages for speed
- External component dependencies should be injected, not hardcoded
- Shared UI should probably be its own package in a real monorepo

### Files Modified
- Created: `packages/whiteboard-ui/` (entire package)
- Deleted: `apps/web/src/features/mdx-whiteboard/ui/` (moved)
- Deleted: `apps/web/src/entities/whiteboard/model/whiteboardStore.ts` (moved)
