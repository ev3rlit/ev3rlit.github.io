# Draft: MDX Whiteboard Monorepo Migration

## Requirements (Confirmed)
- **Source**: Extract `src/features/mdx-whiteboard` from current repo.
- **Target**: New Monorepo (Frontend + Backend).
- **Architecture**:
  - **Frontend**: Web (Next.js on Vercel) - Guest/Offline + Cloud Sync.
  - **Extension**: VSCode Native Integration (Bi-directional sync: Text <-> Graph).
  - **Backend**: Serverless (Vercel Functions) + Database (for Sync).
- **Core Feature**: MDX to Whiteboard visualization.
- **Migration Strategy**: **Strategy A** (Move fast, then refactor).

## Technical Decisions (Confirmed)
- **Monorepo Tool**: Turborepo + pnpm.
- **Database**: PostgreSQL (via Supabase or Neon - TBD) for Sync.
- **Structure**:
  - `packages/mdx-logic`: Pure TS Parser/Layout (Crucial for VSCode/Web sharing).
  - `packages/whiteboard-ui`: ReactFlow components (Shared Webview/Web).
  - `apps/web`: Next.js (Vercel).
  - `apps/vscode-ext`: VSCode Extension (Webview based).
  - `apps/api`: Next.js API Routes (Serverless).

## Scope Boundaries
- **INCLUDE**: 
  - Extraction of current feature.
  - Setup of Monorepo boilerplate.
  - Basic Offline/Guest mode in Web.
  - "Native" style VSCode integration (Text updates Graph).
- **EXCLUDE**:
  - Real-time multi-user collaboration (WebSocket) for now - focus on Sync.
  - Complex refactoring of `parser.ts` *during* migration (will be done after).
