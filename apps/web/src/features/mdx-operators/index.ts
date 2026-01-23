// MDX Operators - Polymorphic Functional Components
// for dual-mode (Document ↔ Mindmap) rendering

// Context
export { ViewProvider, useViewMode, useViewModeOptional } from '@/shared/context/ViewContext';
export type { ViewMode } from '@/shared/context/ViewContext';

// Operator Components
export { Head } from './ui/Head';
export { Branch } from './ui/Branch';
export { Compose } from './ui/Compose';
export { Switch, Case, Default } from './ui/Switch';
export { Map } from './ui/Map';
