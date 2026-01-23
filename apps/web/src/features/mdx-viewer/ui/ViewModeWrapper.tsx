"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const isVisible = viewMode === mode;

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    key={mode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
