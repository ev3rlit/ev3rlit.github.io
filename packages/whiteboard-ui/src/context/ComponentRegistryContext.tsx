"use client";

import React, { createContext, useContext, ReactNode } from 'react';

/**
 * ComponentRegistry maps component names to React component types.
 * Used to dynamically render custom components in the whiteboard.
 */
export type ComponentRegistry = Record<string, React.ComponentType<any>>;

interface ComponentRegistryContextType {
    registry: ComponentRegistry;
}

const ComponentRegistryContext = createContext<ComponentRegistryContextType | undefined>(undefined);

interface ComponentRegistryProviderProps {
    children: ReactNode;
    components?: ComponentRegistry;
}

/**
 * Provider component that makes the component registry available to all child nodes.
 */
export function ComponentRegistryProvider({
    children,
    components = {},
}: ComponentRegistryProviderProps) {
    return (
        <ComponentRegistryContext.Provider value={{ registry: components }}>
            {children}
        </ComponentRegistryContext.Provider>
    );
}

/**
 * Hook to access the component registry from any child component.
 * Returns the registry of available components.
 */
export function useComponentRegistry(): ComponentRegistry {
    const context = useContext(ComponentRegistryContext);
    if (!context) {
        // Return empty registry if provider is not found (graceful fallback)
        return {};
    }
    return context.registry;
}
