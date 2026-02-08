# GEMINI.md - Swiss Minimal Widget Components

## 1. Component Composition
This directory contains the composite widgets that make up the Swiss Minimal Portfolio.

### Structure
-   **Atomic**: Build using `src/shared/ui` atoms, but apply specific Swiss styling here.
-   **Container**: Most widgets should be wrapped in `<SwissSection>` (if available) or a common container that enforces the **Slide Layout**.

## 2. Coding Standards
### Naming
-   Prefix all components with `Swiss` to avoid collision with other portfolio styles (e.g., `SwissHeroSection`, `SwissProjectCard`).

### Props
-   **Standardized**: Use consistent props for recurring patterns.
    -   `sectionNumber`: string (e.g., "01")
    -   `title`: string
    -   `subtitle`: string (optional)

### Styling (Tailwind)
-   **Borders**: `border-black` or `border-stone-200` (Light), `border-white` (Dark).
-   **Backgrounds**: `bg-white` (Light), `bg-stone-950` (Dark).
-   **Glass Effect**: Use with caution. Only for floating elements (Top Nav), never for content backgrounds (unlike Glassmorphism style).
-   **Grid**: Use `grid` and `gap-x` heavily to align text blocks.

## 3. Key Widgets
-   `SwissNavigation`: Fixed top/left navigation.
-   `SwissHeroSection`: Typographic intro.
-   `SwissStorySection`: The 7-step narrative engine.
