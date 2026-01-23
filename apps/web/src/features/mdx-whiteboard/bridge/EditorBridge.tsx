import { MonacoEditor } from '../ui/MonacoEditor';
import { EditorProps } from './types';

/**
 * Bridge component for the Editor.
 * Currently re-exports the MonacoEditor implementation.
 * In the future, this can dynamically load different editors based on platform.
 */
export function EditorBridge(props: EditorProps) {
    return <MonacoEditor {...props} />;
}
