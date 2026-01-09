import { Node, Edge } from 'reactflow';

/**
 * Command 실행에 필요한 컨텍스트
 */
export interface CommandContext {
    getNodes: () => Node[];
    getEdges: () => Edge[];
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    syncToMdx: () => void;
    applyLayout: () => void;
}

/**
 * Command 패턴의 추상 베이스 클래스
 * 모든 노드 조작 명령은 이 클래스를 상속받아 구현
 */
export abstract class Command {
    protected context: CommandContext;
    public readonly name: string;

    constructor(context: CommandContext, name: string) {
        this.context = context;
        this.name = name;
    }

    /**
     * 명령 실행
     * @returns 실행 성공 여부
     */
    abstract execute(): boolean;

    /**
     * 명령 취소 (Undo)
     */
    abstract undo(): void;

    /**
     * 명령 재실행 (Redo)
     * 기본적으로 execute()를 다시 호출
     */
    redo(): void {
        this.execute();
    }

    /**
     * 명령 실행 후 동기화 처리
     * - 레이아웃 재계산
     * - MDX 동기화
     */
    protected refresh(): void {
        this.context.applyLayout();
        this.context.syncToMdx();
    }
}
