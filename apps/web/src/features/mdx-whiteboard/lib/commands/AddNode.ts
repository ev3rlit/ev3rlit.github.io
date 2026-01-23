import { Node, Edge } from 'reactflow';
import { Command, CommandContext } from './Command';

export type NodeType = 'section' | 'list' | 'code' | 'table' | 'blockquote' | 'component';

/**
 * 노드 추가 커맨드
 */
export class AddNode extends Command {
    private parentId: string;
    private nodeType: NodeType;
    private initialLabel: string;
    private createdNodeId: string | null = null;
    private createdEdgeId: string | null = null;

    constructor(
        context: CommandContext,
        parentId: string,
        nodeType: NodeType = 'list',
        initialLabel: string = 'New Node'
    ) {
        super(context, 'AddNode');
        this.parentId = parentId;
        this.nodeType = nodeType;
        this.initialLabel = initialLabel;
    }

    execute(): boolean {
        const nodes = this.context.getNodes();
        const edges = this.context.getEdges();

        // 부모 노드 확인
        const parentNode = nodes.find(n => n.id === this.parentId);
        if (!parentNode) {
            return false;
        }

        // 고유 ID 생성
        const timestamp = Date.now();
        this.createdNodeId = `${this.nodeType}-${timestamp}`;
        this.createdEdgeId = `e-${this.parentId}-${this.createdNodeId}`;

        // 새 노드 생성
        const newNode: Node = {
            id: this.createdNodeId,
            type: this.nodeType,
            position: { x: 0, y: 0 }, // 레이아웃에서 재계산됨
            data: {
                label: this.initialLabel,
                depth: (parentNode.data?.depth || 0) + 1,
            }
        };

        // 새 엣지 생성
        const newEdge: Edge = {
            id: this.createdEdgeId,
            source: this.parentId,
            target: this.createdNodeId,
            type: 'smoothstep',
            style: { stroke: '#94a3b8' }
        };

        this.context.setNodes([...nodes, newNode]);
        this.context.setEdges([...edges, newEdge]);
        this.refresh();

        return true;
    }

    undo(): void {
        if (!this.createdNodeId || !this.createdEdgeId) return;

        const nodes = this.context.getNodes();
        const edges = this.context.getEdges();

        // 생성된 노드와 엣지 제거
        const filteredNodes = nodes.filter(n => n.id !== this.createdNodeId);
        const filteredEdges = edges.filter(e => e.id !== this.createdEdgeId);

        this.context.setNodes(filteredNodes);
        this.context.setEdges(filteredEdges);
        this.refresh();
    }

    /**
     * 생성된 노드 ID 반환 (편집 모드 진입 등에 사용)
     */
    getCreatedNodeId(): string | null {
        return this.createdNodeId;
    }
}
