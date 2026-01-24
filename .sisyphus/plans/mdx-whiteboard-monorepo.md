# Plan: MDX Whiteboard Monorepo Migration

## Context

### Original Request
Migrate the existing `mdx-whiteboard` feature to a new Turborepo-based Monorepo to support both a SaaS Web App (Next.js) and a VSCode Extension (Native).

### Metis Review (Summary)
Metis identified critical gaps in dependency management and circular references that must be resolved before extraction.

**Key Findings:**
1. **Circular Dependency**: `whiteboardStore` (entity) <-> `mdx-whiteboard` (feature).
2. **Platform Coupling**: `next-themes` and `@monaco-editor/react` prevent VSCode usage.
3. **FSD Violations**: `mdx-viewer` reaches into `mdx-whiteboard` internals.

---

## Work Objectives

### Core Objective
Extract `src/features/mdx-whiteboard` into a reusable package structure within a new Turborepo monorepo, enabling multi-platform consumption.

### Concrete Deliverables
1. **Monorepo**: Turborepo + pnpm workspace.
2. **Packages**:
   - `packages/mdx-logic`: Pure TS (Parser/Layout).
   - `packages/whiteboard-ui`: React components (Nodes/Edges).
   - `packages/whiteboard-bridge`: Adapters for Platform specifics (Theme/Editor).
3. **Apps**:
   - `apps/web`: Next.js SaaS (Synced).
   - `apps/vscode-ext`: Native Extension skeleton.
4. **Shared Config**: TypeScript, ESLint, Tailwind configs.

### Definition of Done
- [ ] Monorepo builds successfully (`pnpm build`).
- [ ] Tests pass in all packages.
- [ ] Web app renders whiteboard correctly (parity with current).
- [ ] VSCode extension loads whiteboard webview.

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES (Vitest).
- **User wants tests**: YES (Preserve existing tests).
- **Strategy**: 
  - **Unit Tests**: Migrate existing tests to respective packages.
  - **Integration**: Manual verification of Web and VSCode apps.

### Manual Verification
1. **Web App**:
   - Verify MDX -> Node conversion.
   - Verify Node -> MDX conversion.
   - Check Guest Mode persistence (LocalStorage).
   - Check Cloud Sync (if credentials provided).

2. **VSCode Extension**:
   - Verify Webview loads.
   - Verify Text -> Graph one-way sync.
   - Verify Graph -> Text one-way sync.

---

## Task Flow

```
Prep (Current Repo) -> Monorepo Setup -> Logic Extraction -> UI Extraction -> App Integration -> Extension Setup
```

---

## TODOs

### Phase 1: Preparation (In Current Repo)

- [x] 1. Analyze and map all internal dependencies (Circular Dependency Check)
  **Why**: `whiteboardStore` and `mdx-viewer` have circular deps with `mdx-whiteboard`.
  **Action**: Use `lsp_find_references` to map all import paths.
  **Output**: Dependency graph document.

- [x] 2. Create Abstraction Interfaces
  **Why**: Decouple `next-themes` and `@monaco-editor/react`.
  **Action**: 
  - Define `ThemeAdapter` interface.
  - Define `EditorAdapter` interface.
  **Ref**: `src/features/mdx-whiteboard/ui/WhiteboardCanvas.tsx`

### Phase 2: Monorepo Foundation

- [x] 3. Initialize Turborepo Structure
  **Action**:
  - `pnpm init`
  - Configure `pnpm-workspace.yaml`.
  - Install `turbo`.
  - Setup `packages/config` (TS/ESLint/Tailwind).

### Phase 3: Core Extraction (packages/mdx-logic)

- [x] 4. Extract Pure Logic (`parser.ts`, `layoutEngine.ts`)
  **Why**: These must be platform-agnostic.
  **Constraint**: **STRATEGY A (Move Fast)** - Copy `reactflow` types if needed, or install `reactflow` as peer dependency.
  **Action**:
  - Move `lib/parser.ts`, `lib/layoutEngine.ts`, `lib/flextree.ts`.
  - Move related tests.
  - **CRITICAL**: Do NOT refactor parser logic. Copy as-is.

- [x] 5. Extract Adapters (`whiteboard-bridge`)
  **Action**:
  - Implement `ReactFlowAdapter` (if sticking with ReactFlow types).
  - Implement `ThemeBridge`.

### Phase 4: UI Extraction (packages/whiteboard-ui)

- [x] 6. Extract React Components
  **Action**:
  - Move `ui/nodes/*`, `ui/edges/*`.
  - Move `ui/WhiteboardCanvas.tsx`.
  - Update imports to use `mdx-logic`.

### Phase 5: Web App Migration (apps/web)

- [x] 7. Setup Next.js App
  **Action**:
  - Create `apps/web`.
  - Install dependencies (`mdx-logic`, `whiteboard-ui`).
  - Implement `ThemeAdapter` (using `next-themes`).
  - Implement `EditorAdapter` (using `@monaco-editor/react`).

- [x] 7.5 Cleanup Legacy Code
  **Action**:
  - Remove `apps/web/src/features/mdx-whiteboard`.
  - Remove `apps/web/src/entities/whiteboard`.
  - Verify no import errors remain.

- [x] 8. Implement Sync Layer
  **Action**:
  - Setup basic Supabase/Neon client.
  - Implement `useSync` hook.

---

## Success Criteria
- [x] All 3 packages (`mdx-logic`, `whiteboard-ui`, `whiteboard-bridge`) build independent of Next.js.
- [x] Web App functions identically to current implementation.
