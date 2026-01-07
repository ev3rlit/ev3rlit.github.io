"use client";

import React from 'react';
import { useViewModeOptional } from '@/shared/context/ViewContext';
import { cn } from '@/shared/lib/cn';

// ============================================
// Types
// ============================================

interface MapProps<T> {
    data: T[];
    children: (item: T, index: number) => React.ReactNode;
    className?: string;
    /** Mindmap 모드에서의 배치 방향 */
    direction?: 'horizontal' | 'vertical';
}

// ============================================
// Map Component
// ============================================

/**
 * Map - 반복 연산자 컴포넌트
 * 
 * 배열 데이터를 반복하여 노드를 생성합니다.
 * Document 모드에서는 리스트, Mindmap 모드에서는 노드 그리드로 렌더링됩니다.
 * 
 * @example
 * ```mdx
 * <Map data={['JPA', 'MyBatis', 'JDBC']}>
 *   {(orm) => <Branch label={orm}>...</Branch>}
 * </Map>
 * ```
 */
export function Map<T>({
    data,
    children,
    className,
    direction = 'vertical'
}: MapProps<T>) {
    const { viewMode } = useViewModeOptional();

    if (!data || data.length === 0) {
        return null;
    }

    // Document Mode: 리스트 형태
    if (viewMode === 'document') {
        return (
            <div className={cn("map map--document space-y-2", className)}>
                {data.map((item, index) => (
                    <div key={index} className="map__item">
                        {children(item, index)}
                    </div>
                ))}
            </div>
        );
    }

    // Mindmap Mode: Flex/Grid 레이아웃
    return (
        <div className={cn(
            "map map--mindmap flex gap-4",
            direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
            className
        )}>
            {data.map((item, index) => (
                <div key={index} className="map__item">
                    {children(item, index)}
                </div>
            ))}
        </div>
    );
}

Map.displayName = 'Map';
