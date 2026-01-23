import { useCallback } from 'react';
import { useStore, getBezierPath, EdgeProps, BaseEdge, Node } from 'reactflow';
import { SimpleFloatingEdge } from '../lib/utils';

export function FloatingEdge({ id, source, target, markerEnd, style }: EdgeProps) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) {
        return null;
    }

    const params = SimpleFloatingEdge({
        source: sourceNode as Node,
        target: targetNode as Node,
    });

    if (!params) return null;

    const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = params;

    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
    );
}
