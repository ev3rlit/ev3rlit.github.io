import { Node, Edge } from 'reactflow';
import { Command, CommandContext } from './Command';

/**
 * 노드 삭제 커맨드
 * 노드와 그 하위 노드들을 모두 삭제
 */
export class RemoveNode extends Command {
    private nodeId: string;
    private removedNodes: Node[] = [];
    private removedEdges: Edge[] = [];

    constructor(context: CommandContext, nodeId: string) {
        super(context, 'RemoveNode');
        this.nodeId = nodeId;
    }

    execute(): boolean {
        const nodes = this.context.getNodes();
        const edges = this.context.getEdges();

        // 삭제할 노드 찾기
        const nodeToRemove = nodes.find(n => n.id === this.nodeId);
        if (!nodeToRemove) {
            return false;
        }

        // root 노드는 삭제 불가
        if (nodeToRemove.type === 'root') {
            return false;
        }

        // 삭제할 노드와 모든 하위 노드 ID 수집
        const nodeIdsToRemove = this.collectDescendants(this.nodeId, edges);
        nodeIdsToRemove.add(this.nodeId);

        // 삭제될 노드들 저장 (undo용)
        this.removedNodes = nodes.filter(n => nodeIdsToRemove.has(n.id));

        // 삭제될 엣지들 저장 (undo용)
        this.removedEdges = edges.filter(e =>
            nodeIdsToRemove.has(e.source) || nodeIdsToRemove.has(e.target)
        );

        // 노드와 엣지 필터링
        const remainingNodes = nodes.filter(n => !nodeIdsToRemove.has(n.id));
        const remainingEdges = edges.filter(e =>
            !nodeIdsToRemove.has(e.source) && !nodeIdsToRemove.has(e.target)
        );

        this.context.setNodes(remainingNodes);
        this.context.setEdges(remainingEdges);
        this.refresh();

        return true;
    }

    undo(): void {
        if (this.removedNodes.length === 0) return;

        const nodes = this.context.getNodes();
        const edges = this.context.getEdges();

        // 삭제된 노드와 엣지 복원
        this.context.setNodes([...nodes, ...this.removedNodes]);
        this.context.setEdges([...edges, ...this.removedEdges]);
        this.refresh();
    }

    /**
     * 주어진 노드의 모든 하위 노드 ID를 수집
     */
    private collectDescendants(nodeId: string, edges: Edge[]): Set<string> {
        const descendants = new Set<string>();
        const stack = [nodeId];

        while (stack.length > 0) {
            const currentId = stack.pop()!;
            const childEdges = edges.filter(e => e.source === currentId);

            childEdges.forEach(edge => {
                if (!descendants.has(edge.target)) {
                    descendants.add(edge.target);
                    stack.push(edge.target);
                }
            });
        }

        return descendants;
    }
}
