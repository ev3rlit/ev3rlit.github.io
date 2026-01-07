"use client";

import React from 'react';
import { useViewMode } from '@/shared/context/ViewContext';
import { MdxContent } from './MdxContent';
import { MindmapViewer } from './MindmapViewer';

// ============================================
// Types
// ============================================

interface MdxContentSwitcherProps {
    source: string;
}

// ============================================
// MdxContentSwitcher Component
// ============================================

/**
 * MdxContentSwitcher - Renders MDX content based on current view mode
 * 
 * - Document Mode: Traditional prose rendering via MdxContent
 * - Mindmap Mode: React Flow canvas via MindmapViewer
 * 
 * @param source - Raw MDX content string
 */
export function MdxContentSwitcher({ source }: MdxContentSwitcherProps) {
    const { viewMode } = useViewMode();

    if (viewMode === 'mindmap') {
        return <MindmapViewer source={source} readOnly />;
    }

    return <MdxContent source={source} />;
}
