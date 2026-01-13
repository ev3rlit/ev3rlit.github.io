# Project Context: FSD MDX Blog

## Project Overview
This is a **Next.js** application built with **TypeScript** and **Tailwind CSS**, designed as a personal blog and portfolio. It follows the **Feature-Sliced Design (FSD)** architectural methodology to organize code into cohesive, maintainable layers. Content is managed via **MDX** files, supporting rich, interactive content components.

## Tech Stack
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Class Variance Authority (CVA), `clsx`, `tailwind-merge`
*   **Animation:** Framer Motion
*   **State Management:** Zustand
*   **Content:** MDX (next-mdx-remote, @mdxeditor/editor)
*   **Diagrams:** React Flow
*   **Database/Storage:** @electric-sql/pglite (local PG), file-system based content

## Project Structure (Feature-Sliced Design)
The project is organized into layers, from most generic to most specific:

*   **`src/app/`**: App Router entry points (`layout.tsx`, `page.tsx`), providers, and global styles. Connects FSD layers to Next.js routing.
*   **`src/widgets/`**: Compositional units that combine features and entities (e.g., `Sidebar`, `WhiteboardLayout`).
*   **`src/features/`**: User interactions that bring business value (e.g., `theme-toggle`, `search-menu`, `mdx-viewer`).
*   **`src/entities/`**: Business entities and domain logic (e.g., `post` model & API, `whiteboard` store).
*   **`src/shared/`**: Reusable infrastructure code (UI kit, config, libs).
    *   `config/`: Site configuration (`site.ts`).
    *   `lib/`: Utilities (`cn.ts`).
    *   `ui/`: Atomic UI components (`Button`, `Card`).
*   **`src/views/`**: Page-level components that compose widgets and features (e.g., `HomePage`, `PostDetailPage`).
*   **`content/`**: Markdown/MDX files for blog posts and static pages.

## Key Commands
*   **Development Server:** `npm run dev` (Starts at http://localhost:3000)
*   **Build Production:** `npm run build`
*   **Start Production:** `npm run start`
*   **Linting:** `npm run lint`

## Development Conventions

### Styling
*   Use **Tailwind CSS** for all styling.
*   Use the `cn()` utility (combining `clsx` and `tailwind-merge`) for conditional class application.
*   Follow the **CVA** pattern for complex component variants.

### State Management
*   Use **Zustand** for global client-side state (e.g., `useSidebarStore`, `useWhiteboardStore`).
*   Keep server state management simple (React Server Components data fetching).

### Component Architecture
*   **Atomic Design**: Place basic UI components in `src/shared/ui`.
*   **Composition**: Assemble pages in `src/views` using Widgets (`src/widgets`) and Features (`src/features`).
*   **Separation of Concerns**: Keep business logic in `entities` and interaction logic in `features`.

### Content Creation
*   Blog posts are located in `content/YYYY/MM/`.
*   Files must be `.mdx` format.
*   Frontmatter is required:
    ```yaml
    ---
    title: "Post Title"
    description: "Short description"
    date: "YYYY-MM-DD"
    tags: ["tag1", "tag2"]
    ---
    ```
*   Use the `<CareerTimeline>` and `<Experience>` components in `about.mdx` for resume-like content.

## Configuration
*   **Site Config:** `src/shared/config/site.ts` (imports from `config.json`).
*   **Theme:** Managed via `next-themes` and `src/app/providers/ThemeProvider.tsx`.
