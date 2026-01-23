import { Command, CommandContext } from './Command';

/**
 * 노드 텍스트 변경 커맨드
 */
export class ChangeNodeText extends Command {
    private nodeId: string;
    private oldText: string;
    private newText: string;

    constructor(
        context: CommandContext,
        nodeId: string,
        oldText: string,
        newText: string
    ) {
        super(context, 'ChangeNodeText');
        this.nodeId = nodeId;
        this.oldText = oldText;
        this.newText = newText;
    }

    execute(): boolean {
        // 텍스트가 같으면 실행하지 않음
        if (this.oldText === this.newText) {
            return false;
        }

        const nodes = this.context.getNodes();
        const updatedNodes = nodes.map(node => {
            if (node.id === this.nodeId) {
                return {
                    ...node,
                    data: { ...node.data, label: this.newText }
                };
            }
            return node;
        });

        this.context.setNodes(updatedNodes);
        this.refresh();
        return true;
    }

    undo(): void {
        const nodes = this.context.getNodes();
        const updatedNodes = nodes.map(node => {
            if (node.id === this.nodeId) {
                return {
                    ...node,
                    data: { ...node.data, label: this.oldText }
                };
            }
            return node;
        });

        this.context.setNodes(updatedNodes);
        this.refresh();
    }
}
