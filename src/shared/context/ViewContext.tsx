"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

// ============================================
// Types
// ============================================

export type ViewMode = 'document' | 'mindmap';

interface ViewContextValue {
    viewMode: ViewMode;
    toggleViewMode: () => void;
    setViewMode: (mode: ViewMode) => void;
}

interface ViewProviderProps {
    children: React.ReactNode;
    defaultMode?: ViewMode;
}

// ============================================
// Context
// ============================================

const ViewContext = createContext<ViewContextValue | null>(null);

// ============================================
// Provider
// ============================================

export function ViewProvider({
    children,
    defaultMode = 'document'
}: ViewProviderProps) {
    const [viewMode, setViewModeState] = useState<ViewMode>(defaultMode);

    const toggleViewMode = useCallback(() => {
        setViewModeState(prev => prev === 'document' ? 'mindmap' : 'document');
    }, []);

    const setViewMode = useCallback((mode: ViewMode) => {
        setViewModeState(mode);
    }, []);

    return (
        <ViewContext.Provider value={{ viewMode, toggleViewMode, setViewMode }}>
            {children}
        </ViewContext.Provider>
    );
}

// ============================================
// Hook
// ============================================

export function useViewMode(): ViewContextValue {
    const context = useContext(ViewContext);

    if (!context) {
        throw new Error('useViewMode must be used within a ViewProvider');
    }

    return context;
}

// ============================================
// Utility: Safe hook for optional context
// ============================================

export function useViewModeOptional(): ViewContextValue {
    const context = useContext(ViewContext);

    // Fallback for when used outside provider (defaults to document mode)
    if (!context) {
        return {
            viewMode: 'document',
            toggleViewMode: () => { },
            setViewMode: () => { },
        };
    }

    return context;
}
