import { Position, Node, XYPosition } from 'reactflow';

// Returns the center of a node
function getNodeCenter(node: Node): XYPosition {
    return {
        x: node.position.x + (node.width ?? 0) / 2,
        y: node.position.y + (node.height ?? 0) / 2,
    };
}

// Returns the intercept point of a line between two nodes and the node's perimeter
export function getEdgeParams(source: Node, target: Node) {
    const sourceCenter = getNodeCenter(source);
    const targetCenter = getNodeCenter(target);

    const sx = source.position.x;
    const sy = source.position.y;
    const sw = source.width ?? 0;
    const sh = source.height ?? 0;

    const tx = target.position.x;
    const ty = target.position.y;
    const tw = target.width ?? 0;
    const th = target.height ?? 0;

    const sourceIntersection = getIntersectionPoint(sourceCenter, targetCenter, sx, sy, sw, sh);
    const targetIntersection = getIntersectionPoint(targetCenter, sourceCenter, tx, ty, tw, th);

    return {
        sx: sourceIntersection.x,
        sy: sourceIntersection.y,
        tx: targetIntersection.x,
        ty: targetIntersection.y,
        sourcePos: sourceIntersection.pos,
        targetPos: targetIntersection.pos,
    };
}

function getIntersectionPoint(
    center: XYPosition,
    otherCenter: XYPosition,
    x: number,
    y: number,
    w: number,
    h: number
): XYPosition & { pos: Position } {
    const dx = otherCenter.x - center.x;
    const dy = otherCenter.y - center.y;

    if (Math.abs(dx) * h > Math.abs(dy) * w) {
        // Intersects left or right side
        if (dx > 0) {
            return { x: x + w, y: center.y + (w * dy) / (2 * dx), pos: Position.Right };
        }
        return { x: x, y: center.y - (w * dy) / (2 * dx), pos: Position.Left };
    } else {
        // Intersects top or bottom side
        if (dy > 0) {
            return { x: center.x + (h * dx) / (2 * dy), y: y + h, pos: Position.Bottom };
        }
        return { x: center.x - (h * dx) / (2 * dy), y: y, pos: Position.Top };
    }
}

export function SimpleFloatingEdge({ source, target }: { source: Node, target: Node }) {
    if (!source || !target) return null;

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(source, target);

    return {
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
    };
}
