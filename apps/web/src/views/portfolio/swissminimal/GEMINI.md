# GEMINI.md - Swiss Minimal Portfolio Design System

## 1. Design Philosophy
**"Objective, Clear, Timeless"**
This directory implements the **Swiss Style (International Typographic Style)**.
-   **Objective**: Present information without emotional decoration.
-   **Clarity**: Usability and readability are paramount.
-   **Grid**: Use a strict mathematical grid for alignment.
-   **Typography**: San-serif fonts (Inter/Helvetica) are the primary visual element.

## 2. Layout Strategy
### Desktop (Web)
-   **Aspect Ratio**: **16:9 Slide Layout**.
-   **Viewport**: Each section must fit within a single viewport (`100vh`) whenever possible.
-   **Scrolling**: Snap-scrolling (`snap-y snap-mandatory`) to mimic a presentation slide deck.

### Print (PDF Export)
-   **Media Query**: `@media print`
-   **Format**: **A4 Portrait**.
-   **Behavior**:
    -   Layouts reshuffle from horizontal slides to vertical document flow.
    -   `page-break-after: always` used between major sections.
    -   Navigation and interactive elements are hidden.

## 3. Typography & Visuals
### Font
-   **Family**: `Inter` (or system sans-serif fallback).
-   **Weights**:
    -   **Bold (700)**: Headlines, Key metrics.
    -   **Regular (400)**: Body text.
    -   **Light (300)**: Captions, Meta-data.

### Colors
-   **Palette**: Strict Monochrome (Black/White/Gray).
-   **Accent**: Single accent color (e.g., Red or Deep Blue) used *sparingly* for emphasis only.

### Elements
-   **Dividers**: Thin, crisp lines (`1px solid`).
-   **Spacing**: Generous whitespace. "White space is an active element."

## 4. UX Patterns
### "The 7-Step Story"
All project stories follow a predictable `7-Step` structure to reduce cognitive load:
1.  **Intro**: One-line summary.
2.  **Background**: Context.
3.  **Problem**: The conflict.
4.  **Solution**: The resolution strategy.
5.  **Action**: Implementation details.
6.  **Result**: Quantifiable outcome.
7.  **Capability**: What this proves about the candidate.

### Navigation
-   **Numbered Steps**: `01`, `02` visible indices to guide the eye.
-   **Scan-ability**: Keywords and Summaries must be prominent.
