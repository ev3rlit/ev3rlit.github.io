"use client";

import React from 'react';

// ============================================
// Head Component (Promotion Slot)
// ============================================

interface HeadProps {
    children: React.ReactNode;
}

/**
 * Head - 승격 슬롯 컴포넌트
 * 
 * Branch 내부에서 어떤 콘텐츠가 시각적 중심 노드(부모 노드)가 될지 명시합니다.
 * 이 컴포넌트 자체는 특별한 UI를 가지지 않고 Fragment처럼 동작하지만,
 * 부모 Branch가 이를 감지하여 Node Box로 배치합니다.
 * 
 * @example
 * ```mdx
 * <Branch>
 *   <Head>
 *     ```javascript
 *     const x = 1;
 *     ```
 *   </Head>
 *   - 이 코드는 변수 x를 선언합니다
 *   - 값은 1입니다
 * </Branch>
 * ```
 */
export function Head({ children }: HeadProps) {
    // Fragment처럼 투명하게 렌더링
    return <>{children}</>;
}

// Type marker for detection by parent Branch component
Head.displayName = 'Head';
(Head as any).__isHeadComponent = true;
