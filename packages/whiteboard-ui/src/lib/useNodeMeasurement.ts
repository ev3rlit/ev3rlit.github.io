import { useLayoutEffect, useRef } from 'react';
import { useWhiteboardStore } from '@/model/whiteboardStore';

/**
 * Hook to measure the real DOM size of a node and report it to the store.
 * Used for the Real-DOM Layout Engine.
 * 
 * @param id The Node ID from ReactFlow props
 */
export const useNodeMeasurement = (id: string) => {
    const measureRef = useRef<HTMLDivElement>(null);
    const updateNodeSize = useWhiteboardStore((state) => state.updateNodeSize);

    useLayoutEffect(() => {
        const el = measureRef.current;
        if (!el) return;

        // Initial measure
        const measure = () => {
            // Use offset properties for border-box size including padding/border
            const { offsetWidth, offsetHeight } = el;
            updateNodeSize(id, offsetWidth, offsetHeight);
        };

        // Measure immediately
        measure();

        // Observe changes
        const observer = new ResizeObserver((entries) => {
            // Processing in the next frame to avoid "ResizeObserver loop limit exceeded"
            window.requestAnimationFrame(() => {
                for (const entry of entries) {
                    if (entry.target === el) {
                        measure();
                    }
                }
            });
        });

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [id, updateNodeSize]);

    return { measureRef };
};
