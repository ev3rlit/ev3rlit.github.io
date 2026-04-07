"use client";

import React from 'react';
import { useViewMode } from '@/shared/context/ViewContext';

// ============================================
// Types
// ============================================

interface ViewModeWrapperProps {
    children: React.ReactNode;
    mode: 'document' | 'mindmap';
}

// ============================================
// ViewModeWrapper Component
// ============================================

/**
 * ViewModeWrapper - Animates children visibility based on current view mode
 * 
 * Uses Framer Motion for smooth fade transitions (opacity only, no scale).
 * 
 * @param children - Content to render
 * @param mode - Which mode this wrapper should be visible in
 */
export function ViewModeWrapper({ children, mode }: ViewModeWrapperProps) {
    const { viewMode } = useViewMode();

    if (viewMode !== mode) {
        return null;
    }

    return <>{children}</>;
}
