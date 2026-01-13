# Whiteboard Feature Context

## Product Vision: The Rapid Learning System
The Whiteboard is not just a diagramming tool; it is a **cognitive augmentation system** designed for **rapid learning and memorization**.
*   **Core Philosophy**: "Typing is faster than drawing, but visuals are better for memory."
*   **The Goal**: To allow users to capture thoughts at the speed of typing (Markdown) while instantly gaining the structural benefits of a Mind Map (Visualization).
*   **Key User Stories**:
    *   "I want to quickly summarize a complex technical article."
    *   "I want to visualize the hierarchy of a new codebase I'm studying."
    *   "I want to test my memory by expanding/collapsing sections."

## Overview
The **Whiteboard** feature (`src/app/whiteboard/**`) is an interactive "MDX to Mind Map" engine. It acts as the bridge between linear text and spatial graphs.

## Architecture

### 1. View Layer
*   **Entry Point**: `src/app/whiteboard/page.tsx`
*   **Main Component**: `src/views/whiteboard/ui/WhiteboardPage.tsx`
    *   Orchestrates the layout.
    *   Renders the `WhiteboardCanvas` (Visual Learning) and `MdxEditor` (Rapid Input).
    *   Manages layout mode via `useSidebarStore`.

### 2. Feature Layer (`src/features/mdx-whiteboard`)
This layer contains the core logic for the whiteboard domain.
*   **`lib/parser.ts`**: The transformation engine.
    *   **Input**: Raw MDX string.
    *   **Process**:
        1.  Parses Frontmatter using `gray-matter`.
        2.  Parses MDX AST using `unified` + `remark-parse` + `remark-mdx`.
        3.  Traverses the AST to identify:
            *   **Headings**: Becomes `section` nodes (branches).
            *   **Components**: Becomes `component` nodes (leaves).
            *   **Lists/Text**: Becomes `list` nodes (leaves).
        4.  Calculates auto-layout using `dagre` (Left/Right split tree layout).
    *   **Output**: React Flow `nodes` and `edges`.
*   **`ui/WhiteboardCanvas.tsx`**: Wrapper around `ReactFlow`. Handles node rendering and event bridging to the store.
*   **`ui/CustomNodes.tsx`**: Defines the visual look of graph nodes (`RootNode`, `SectionNode`, `ComponentNode`, `ListNode`).

### 3. Entity Layer (`src/entities/whiteboard`)
*   **`model/whiteboardStore.ts`**: Global state managed by **Zustand**.
    *   `mdxSource`: The single source of truth (MDX string).
    *   `nodes` / `edges`: Derived state for the graph.
    *   `isEditorOpen`: Toggles the text editor visibility.
    *   `reactFlowInstance`: Reference to the graph instance for zooming/fitting.

### 4. Widgets
*   **`src/widgets/whiteboard-toolbar/`**: Provides zoom controls and component insertion tools via the Sidebar.

## Data Flow
1.  **Record**: User types in `MdxEditor` (calls `setMdxSource`).
2.  **Process**: `useEffect` triggers `parseMdxToGraph`.
3.  **Structure**: `parser.ts` generates a new node/edge layout.
4.  **Visualize**: `whiteboardStore` updates `nodes` and `edges`.
5.  **Learn**: `WhiteboardCanvas` re-renders the React Flow graph for immediate feedback.

## Key Dependencies
*   **React Flow**: Graph visualization and interaction.
*   **Dagre**: Graph layout algorithms (auto-positioning nodes).
*   **Unified / Remark**: MDX parsing and AST traversal.
*   **Zustand**: State management.