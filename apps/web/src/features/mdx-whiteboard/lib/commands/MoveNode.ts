import { Command, CommandContext } from './Command';

export type MoveType = 'top' | 'bottom' | 'child';

/**
 * 노드 이동 커맨드
 * 노드를 다른 부모 아래로 이동하거나 형제 노드 사이에서 순서 변경
 */
export class MoveNode extends Command {
    private nodeId: string;
    private oldParentId: string;
    private newParentId: string;
    private oldIndex: number;
    private newIndex: number;
    private moveType: MoveType;

    constructor(
        context: CommandContext,
        nodeId: string,
        oldParentId: string,
        newParentId: string,
        oldIndex: number,
        newIndex: number,
        moveType: MoveType = 'child'
    ) {
        super(context, 'MoveNode');
        this.nodeId = nodeId;
        this.oldParentId = oldParentId;
        this.newParentId = newParentId;
        this.oldIndex = oldIndex;
        this.newIndex = newIndex;
        this.moveType = moveType;
    }

    execute(): boolean {
        // 같은 위치로 이동하면 실행하지 않음
        if (this.oldParentId === this.newParentId && this.oldIndex === this.newIndex) {
            return false;
        }

        const edges = this.context.getEdges();

        // 기존 엣지를 새 부모로 업데이트
        const updatedEdges = edges.map(edge => {
            if (edge.target === this.nodeId) {
                return {
                    ...edge,
                    source: this.newParentId,
                    id: `e-${this.newParentId}-${this.nodeId}`
                };
            }
            return edge;
        });

        this.context.setEdges(updatedEdges);
        this.refresh();
        return true;
    }

    undo(): void {
        const edges = this.context.getEdges();

        // 원래 부모로 되돌림
        const updatedEdges = edges.map(edge => {
            if (edge.target === this.nodeId) {
                return {
                    ...edge,
                    source: this.oldParentId,
                    id: `e-${this.oldParentId}-${this.nodeId}`
                };
            }
            return edge;
        });

        this.context.setEdges(updatedEdges);
        this.refresh();
    }
}
