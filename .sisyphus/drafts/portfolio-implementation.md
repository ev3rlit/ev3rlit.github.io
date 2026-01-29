# Draft: Portfolio Page Implementation

## Requirements (Confirmed)
- **Core Concept**: 16:9 Slide layout (Web) / A4 Portrait (Print).
- **Design Style**: Swiss Style (Bold Typography, Grid, Minimalist, B&W + 1 Point Color).
- **Architecture**: Modular "Atomic Story Components" (e.g., `<Story_Stability />`).
- **Composition**: Static Files Strategy (User selected). Hardcoded page files for different versions.
- **Tech Stack**: Next.js 14, Tailwind CSS, Framer Motion.
- **Routing**: Replace existing `apps/web/src/app/portfolio`.

## Content Structure (from User)
1. Cover
2. Intro & Appeal
3. Resume (Executive Summary)
4. Project Intro (Samguk Blade Idle)
5. Story 01 (Stability)
6. Story 02 (Efficiency)
7. Story 03 (Ownership)
8. Story 04 (Data Engineering)
9. Retrospective (Samguk)
10. Project Intro (Blade X)
11. Story 05 (Documentation)
12. Story 06 (Growth/Pseudo-code)
13. Retrospective (Blade X)
14. Skills & Contact

## Technical Decisions
- **FSD Structure**:
  - `apps/web/src/features/portfolio/ui/`: Reusable logic-heavy components (if any).
  - `apps/web/src/widgets/portfolio/ui/`: Atomic Story Components (e.g., `StoryStability`, `StoryEfficiency`).
  - `apps/web/src/app/portfolio/[slug]/page.tsx`: Dynamic route catch-all OR static routes as requested.
  - **Decision**: Since user chose "Static Files", we will likely use specific routes like `app/portfolio/backend-focused/page.tsx` or `app/portfolio/full/page.tsx`. But standardizing on `app/portfolio/page.tsx` as the main one first.

- **Route Structure Change (MANDATORY)**:
  - Current `apps/web/src/app/layout.tsx` enforces `WhiteboardLayout` (sidebar).
  - **Action**: Refactor `src/app` into Route Groups:
    - `src/app/(main)`: Contains existing `layout.tsx` with `WhiteboardLayout`.
    - `src/app/(standalone)`: New clean layout for `/portfolio`.
    - Move `/portfolio` into `src/app/(standalone)/portfolio`.

- **Print Strategy**:
  - CSS `@media print` with `page-break-after: always`.
  - Tailwind classes: `print:block print:h-auto print:aspect-auto`.
  - Hide navigation/interactive elements in print mode.

## Research Findings
- **Layout**: `RootLayout` forces `WhiteboardLayout` globally. Must refactor to Route Groups to isolate Portfolio.
- **Test Infra**: Vitest is configured (`vitest.config.ts` exists).
- **Existing Content**: `apps/web/src/app/portfolio` currently contains `[project]/[experience]`. We will **delete** or **archive** this structure and replace it with the new flat slide-based structure.
- **Base UI**: `Button`, `Card` exist in `shared/ui`.

## Test Strategy Decision
- **Infrastructure exists**: YES (Vitest).
- **User wants tests**: NO (Manual Only).
- **QA approach**: Manual verification of UI + Print Preview checks are critical.

## Open Questions
- **None**. All critical info gathered.
