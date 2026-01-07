"use client";

import { useEffect } from 'react';
import { useViewMode, ViewMode } from '@/shared/context/ViewContext';

interface ViewModeSetterProps {
    defaultView?: string;
}

/**
 * Client component that syncs frontmatter defaultView to app-level Context
 * This runs on the client side after hydration
 */
export function ViewModeSetter({ defaultView }: ViewModeSetterProps) {
    const { setViewMode } = useViewMode();

    useEffect(() => {
        if (defaultView === 'mindmap' || defaultView === 'document') {
            setViewMode(defaultView as ViewMode);
        }
    }, [defaultView, setViewMode]);

    return null;
}
