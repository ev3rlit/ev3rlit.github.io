"use client";

import React from 'react';
import { useViewModeOptional, ViewMode } from '@/shared/context/ViewContext';

// ============================================
// Types
// ============================================

type CaseCondition = ViewMode | 'beginner' | 'advanced';

interface SwitchProps {
    children: React.ReactNode;
}

interface CaseProps {
    when: CaseCondition;
    children: React.ReactNode;
}

interface DefaultProps {
    children: React.ReactNode;
}

// ============================================
// Switch Component
// ============================================

/**
 * Switch - 조건부 연산자 컴포넌트
 * 
 * 뷰 모드나 기타 조건에 따라 다른 콘텐츠를 표시합니다.
 * 
 * @example
 * ```mdx
 * <Switch>
 *   <Case when="document">
 *     상세한 설명 텍스트...
 *   </Case>
 *   <Case when="mindmap">
 *     핵심 키워드만
 *   </Case>
 *   <Default>
 *     기본 콘텐츠
 *   </Default>
 * </Switch>
 * ```
 */
export function Switch({ children }: SwitchProps) {
    const { viewMode } = useViewModeOptional();

    const childArray = React.Children.toArray(children);

    // 1. 현재 viewMode와 일치하는 Case 찾기
    const matchingCase = childArray.find((child) => {
        if (!React.isValidElement(child)) return false;
        const childType = child.type as any;
        if (childType?.displayName !== 'Case') return false;
        return child.props.when === viewMode;
    });

    if (matchingCase && React.isValidElement(matchingCase)) {
        return <>{matchingCase.props.children}</>;
    }

    // 2. 일치하는 Case가 없으면 Default 찾기
    const defaultCase = childArray.find((child) => {
        if (!React.isValidElement(child)) return false;
        const childType = child.type as any;
        return childType?.displayName === 'Default';
    });

    if (defaultCase && React.isValidElement(defaultCase)) {
        return <>{defaultCase.props.children}</>;
    }

    // 3. 아무것도 없으면 null
    return null;
}

Switch.displayName = 'Switch';

// ============================================
// Case Component
// ============================================

/**
 * Case - Switch 내부에서 조건부 콘텐츠를 정의
 */
export function Case({ children }: CaseProps) {
    // Case는 직접 렌더링되지 않음 - Switch에서 처리
    return <>{children}</>;
}

Case.displayName = 'Case';

// ============================================
// Default Component
// ============================================

/**
 * Default - Switch에서 일치하는 Case가 없을 때 표시
 */
export function Default({ children }: DefaultProps) {
    // Default는 직접 렌더링되지 않음 - Switch에서 처리
    return <>{children}</>;
}

Default.displayName = 'Default';
