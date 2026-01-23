"use client";

import React from 'react';
import { useViewModeOptional } from '@/shared/context/ViewContext';
import { cn } from '@/shared/lib/cn';
import { Head } from './Head';

// ============================================
// Types
// ============================================

interface BranchProps {
    label?: string;
    children: React.ReactNode;
    className?: string;
}

// ============================================
// Utility: Detect Head component in children
// ============================================

function findHeadChild(children: React.ReactNode): {
    headContent: React.ReactNode | null;
    restChildren: React.ReactNode[];
} {
    const childArray = React.Children.toArray(children);

    const headChild = childArray.find(
        (child) =>
            React.isValidElement(child) &&
            ((child.type as any)?.__isHeadComponent === true ||
                (child.type as any)?.displayName === 'Head')
    );

    if (headChild && React.isValidElement(headChild)) {
        return {
            headContent: headChild.props.children,
            restChildren: childArray.filter(child => child !== headChild),
        };
    }

    return {
        headContent: null,
        restChildren: childArray,
    };
}

// ============================================
// Branch Component
// ============================================

/**
 * Branch - 확장 연산자 컴포넌트
 * 
 * 부모 개념에서 하위 개념으로 뻗어 나가는 분기점을 표현합니다.
 * Document 모드에서는 시맨틱 HTML, Mindmap 모드에서는 트리 노드로 렌더링됩니다.
 * 
 * @example
 * ```mdx
 * <Branch>
 *   <Head>Controller Layer</Head>
 *   - HTTP 요청 처리
 *   - 라우팅 관리
 * </Branch>
 * ```
 */
export function Branch({ label, children, className }: BranchProps) {
    const { viewMode } = useViewModeOptional();

    // 1. Head 감지 및 콘텐츠 분리
    const { headContent, restChildren } = findHeadChild(children);
    const nodeContent = headContent ?? label ?? 'Untitled';

    // 2. Document Mode: 시맨틱 HTML
    if (viewMode === 'document') {
        return (
            <section className={cn("branch branch--document my-4", className)}>
                {/* Node as heading */}
                <div className="branch__header mb-2 font-semibold text-lg text-foreground">
                    {nodeContent}
                </div>

                {/* Children as content */}
                {restChildren.length > 0 && (
                    <div className="branch__content pl-4 border-l-2 border-muted">
                        {restChildren}
                    </div>
                )}
            </section>
        );
    }

    // 3. Mindmap Mode: Flexbox 트리 구조
    return (
        <div className={cn("branch branch--mindmap flex flex-row items-start gap-8", className)}>
            {/* Node Box */}
            <div className={cn(
                "branch__node relative",
                "px-4 py-2 rounded-lg",
                "bg-white dark:bg-stone-900",
                "border-2 border-slate-200 dark:border-stone-700",
                "shadow-sm hover:shadow-md transition-shadow",
                "min-w-[120px] max-w-[400px]"
            )}>
                {/* Edge connector line (left) */}
                <div className="branch__edge-in absolute left-0 top-1/2 -translate-x-full w-6 h-0.5 bg-slate-300 dark:bg-stone-600" />

                <div className="branch__node-content text-sm text-foreground">
                    {nodeContent}
                </div>
            </div>

            {/* Children Tree Container */}
            {restChildren.length > 0 && (
                <div className="branch__children relative flex flex-col gap-3">
                    {/* Vertical connector line */}
                    <div className="absolute left-0 top-0 bottom-0 -translate-x-3 w-0.5 bg-slate-300 dark:bg-stone-600" />

                    {restChildren.map((child, index) => (
                        <div key={index} className="branch__child relative pl-4">
                            {/* Horizontal connector to child */}
                            <div className="absolute left-0 top-1/2 -translate-x-3 w-3 h-0.5 bg-slate-300 dark:bg-stone-600" />
                            {child}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Branch.displayName = 'Branch';
