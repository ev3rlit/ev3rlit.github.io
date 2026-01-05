import { create } from 'zustand';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    ReactFlowInstance
} from 'reactflow';

interface WhiteboardState {
    mdxSource: string;
    nodes: Node[];
    edges: Edge[];
    isEditorOpen: boolean;
    editingNodeId: string | null;

    // Actions
    setMdxSource: (source: string) => void;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    toggleEditor: () => void;
    setEditingNodeId: (id: string | null) => void;
    appendMdx: (content: string) => void;
    reactFlowInstance: ReactFlowInstance | null;
    setReactFlowInstance: (instance: ReactFlowInstance | null) => void;

    cursorIndex: number;
    setCursorIndex: (index: number) => void;
    insertContent: (content: string) => void;
    isComponentPickerOpen: boolean;
    setComponentPickerOpen: (open: boolean) => void;
}

export const useWhiteboardStore = create<WhiteboardState>((set, get) => ({
    mdxSource: `---
title: Untitled
date: ${(() => {
            const d = new Date();
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        })()}
tags: []
---`,
    nodes: [],
    edges: [],
    isEditorOpen: true,
    editingNodeId: null,

    setMdxSource: (source) => set({ mdxSource: source }),
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    toggleEditor: () => set((state) => ({ isEditorOpen: !state.isEditorOpen })),
    setEditingNodeId: (id) => set({ editingNodeId: id }),
    appendMdx: (content) => set((state) => ({
        mdxSource: state.mdxSource + (state.mdxSource ? '\n\n' : '') + content
    })),
    reactFlowInstance: null,
    setReactFlowInstance: (instance) => set({ reactFlowInstance: instance }),

    cursorIndex: 0,
    setCursorIndex: (index) => set({ cursorIndex: index }),

    insertContent: (content) => set((state) => {
        const source = state.mdxSource;
        const index = (state.cursorIndex >= 0 && state.cursorIndex <= source.length)
            ? state.cursorIndex
            : source.length;

        const before = source.substring(0, index);
        const after = source.substring(index);
        const newSource = before + content + after;

        return {
            mdxSource: newSource,
            cursorIndex: index + content.length
        };
    }),
    isComponentPickerOpen: false,
    setComponentPickerOpen: (open) => set({ isComponentPickerOpen: open }),
}));
