"use client";

import React, { useState } from 'react';
import { useViewModeOptional } from '@/shared/context/ViewContext';
import { cn } from '@/shared/lib/cn';
import { ChevronDown, ChevronRight } from 'lucide-react';

// ============================================
// Types
// ============================================

type ComposeVariant = 'default' | 'info' | 'warning' | 'code' | 'success';

interface ComposeProps {
    title?: string;
    variant?: ComposeVariant;
    collapsible?: boolean;
    defaultOpen?: boolean;
    children: React.ReactNode;
    className?: string;
}

// ============================================
// Variant Styles
// ============================================

const variantStyles: Record<ComposeVariant, { container: string; header: string }> = {
    default: {
        container: 'bg-slate-50 dark:bg-stone-800 border-slate-200 dark:border-stone-700',
        header: 'text-slate-700 dark:text-stone-300',
    },
    info: {
        container: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
        header: 'text-blue-700 dark:text-blue-300',
    },
    warning: {
        container: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
        header: 'text-amber-700 dark:text-amber-300',
    },
    code: {
        container: 'bg-stone-900 dark:bg-stone-950 border-stone-700',
        header: 'text-stone-300',
    },
    success: {
        container: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
        header: 'text-emerald-700 dark:text-emerald-300',
    },
};

// ============================================
// Compose Component
// ============================================

/**
 * Compose - 합성 연산자 컴포넌트
 * 
 * 관련된 요소들(코드, 설명, 결과 등)을 하나의 논리적 카드로 묶습니다.
 * Document 모드에서는 Callout 박스, Mindmap 모드에서는 단일 노드 카드로 렌더링됩니다.
 * 
 * @example
 * ```mdx
 * <Compose title="주의사항" variant="warning" collapsible>
 *   이 API는 deprecated 되었습니다.
 * </Compose>
 * ```
 */
export function Compose({
    title,
    variant = 'default',
    collapsible = false,
    defaultOpen = true,
    children,
    className
}: ComposeProps) {
    const { viewMode } = useViewModeOptional();
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const styles = variantStyles[variant];

    // Common header component
    const Header = title ? (
        <div
            className={cn(
                "compose__header flex items-center gap-2 font-medium text-sm",
                styles.header,
                collapsible && "cursor-pointer select-none"
            )}
            onClick={collapsible ? () => setIsOpen(prev => !prev) : undefined}
        >
            {collapsible && (
                isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            )}
            <span>{title}</span>
        </div>
    ) : null;

    // Document Mode: Callout/Blockquote 스타일
    if (viewMode === 'document') {
        return (
            <div className={cn(
                "compose compose--document",
                "my-3 rounded-lg border-l-4 p-4",
                styles.container,
                className
            )}>
                {Header}

                {(!collapsible || isOpen) && (
                    <div className={cn(
                        "compose__content text-sm",
                        title && "mt-2"
                    )}>
                        {children}
                    </div>
                )}
            </div>
        );
    }

    // Mindmap Mode: Node Card
    return (
        <div className={cn(
            "compose compose--mindmap",
            "rounded-lg border-2 overflow-hidden",
            "min-w-[150px] max-w-sm",
            "shadow-sm hover:shadow-md transition-shadow",
            styles.container,
            className
        )}>
            {Header && (
                <div className={cn(
                    "compose__header-bar px-3 py-2 border-b",
                    styles.container
                )}>
                    {Header}
                </div>
            )}

            {(!collapsible || isOpen) && (
                <div className="compose__content p-3 text-sm max-h-[200px] overflow-auto">
                    {children}
                </div>
            )}
        </div>
    );
}

Compose.displayName = 'Compose';
