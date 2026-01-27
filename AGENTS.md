# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-23
**Context:** Next.js 14 + FSD Architecture

## OVERVIEW
Next.js 14 blog engine with MDX-based whiteboard capabilities. Uses Feature-Sliced Design (FSD) architecture (`app`, `pages`, `widgets`, `features`, `entities`, `shared`).
Core stack: React 18, Tailwind, Vitest, Zustand, ReactFlow (implied by whiteboard), Unified/Remark/Rehype ecosystem.

## STRUCTURE
```
.
├── src/
│   ├── app/           # Next.js App Router
│   ├── features/      # FSD Features (Business logic)
│   │   └── mdx-whiteboard/ # CORE COMPLEXITY: Parser & Layout engine
│   ├── widgets/       # FSD Widgets (Composition)
│   ├── views/         # FSD Pages/Views
│   └── shared/        # FSD Shared (UI, Libs, Config)
├── content/           # MDX Blog Content
├── docs/              # Project Documentation
└── out/               # Static Export Output
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| **MDX Parsing** | `src/features/mdx-whiteboard/lib/parser.ts` | **CRITICAL HOTSPOT**. 570+ lines. |
| **Layout Logic** | `src/features/mdx-whiteboard/lib/layoutEngine.ts` | Node positioning & edge routing. |
| **Whiteboard UI** | `src/features/mdx-whiteboard/ui/` | ReactFlow custom nodes/edges. |
| **Blog Routing** | `src/app/` | Next.js routes. |
| **Test Config** | `vitest.config.ts` | JSDOM environment. |

## CONVENTIONS
- **Architecture**: Feature-Sliced Design (FSD). Strict dependencies: `app -> pages -> widgets -> features -> entities -> shared`.
- **Testing**: Co-located `.test.ts`. BDD style (`describe`, `it`).
- **Styling**: Tailwind CSS + `clsx`/`tailwind-merge`.
- **Visual Design**: Use the `.glass-prism` class for floating panels (TOC, Modals) to ensure consistent depth and lighting effects.
- **State**: Zustand for global state.

## ANTI-PATTERNS (THIS PROJECT)
- **Do not modify `parser.ts` lightly**: High cyclomatic complexity (30/30). Needs refactoring, not patches.
- **No Circular Imports**: FSD forbids upper layers importing lower layers.
- **No Global Styles**: Use Tailwind classes or CSS modules if absolutely necessary.

## COMMANDS
```bash
npm run dev      # Start dev server
npm run build    # Build static export
npm run test     # Run Vitest
npm run lint     # Next.js lint
```

## NOTES
- **parser.ts** is a known technical debt hotspot. It handles 8+ node types in a single `traverse` function.
- Tests heavily use console logs for layout debugging.
