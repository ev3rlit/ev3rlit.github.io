import { Command } from './Command';

/**
 * Command 히스토리 관리 클래스
 * Undo/Redo 스택을 관리하고 명령 실행을 추적
 */
export class History {
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];
    private maxSize: number;

    constructor(maxSize: number = 50) {
        this.maxSize = maxSize;
    }

    /**
     * 명령 실행 및 히스토리에 추가
     */
    execute(command: Command): boolean {
        const success = command.execute();

        if (success) {
            this.undoStack.push(command);
            this.redoStack = []; // redo 스택 초기화

            // 최대 크기 제한
            if (this.undoStack.length > this.maxSize) {
                this.undoStack.shift();
            }
        }

        return success;
    }

    /**
     * 마지막 명령 취소
     */
    undo(): boolean {
        const command = this.undoStack.pop();
        if (!command) return false;

        command.undo();
        this.redoStack.push(command);
        return true;
    }

    /**
     * 취소한 명령 재실행
     */
    redo(): boolean {
        const command = this.redoStack.pop();
        if (!command) return false;

        command.redo();
        this.undoStack.push(command);
        return true;
    }

    /**
     * Undo 가능 여부
     */
    canUndo(): boolean {
        return this.undoStack.length > 0;
    }

    /**
     * Redo 가능 여부
     */
    canRedo(): boolean {
        return this.redoStack.length > 0;
    }

    /**
     * 히스토리 초기화
     */
    clear(): void {
        this.undoStack = [];
        this.redoStack = [];
    }

    /**
     * Undo 스택 크기
     */
    get undoCount(): number {
        return this.undoStack.length;
    }

    /**
     * Redo 스택 크기
     */
    get redoCount(): number {
        return this.redoStack.length;
    }

    /**
     * 마지막 명령 이름 (디버깅용)
     */
    getLastCommandName(): string | null {
        const lastCommand = this.undoStack[this.undoStack.length - 1];
        return lastCommand ? lastCommand.name : null;
    }
}
