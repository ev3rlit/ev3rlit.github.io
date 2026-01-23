import { create } from 'zustand';
import {
    Connection,
    Edge,
    Node,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    NodeChange,
    EdgeChange
} from 'reactflow';

interface PlaygroundState {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addNode: (type: string) => void;
    updateNodeData: (id: string, data: any) => void;
    editingNodeId: string | null;
    setEditingNodeId: (id: string | null) => void;
}

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    editingNodeId: null,
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
        const isSeamless = !connection.targetHandle || connection.targetHandle.includes('node-body');
        const edge = {
            ...connection,
            id: `e-${connection.source}-${connection.target}-${Math.random().toString(36).substr(2, 5)}`,
            type: isSeamless ? 'floating' : 'default',
            animated: true,
            style: { strokeWidth: 2 },
        };

        set({
            edges: addEdge(edge, get().edges),
        });
    },
    addNode: (type: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        let newNode: Node;

        if (type === 'Text') {
            newNode = {
                id,
                type: 'text',
                data: { label: 'TEXT', rotation: 0 },
                position: { x: 400, y: 300 },
                width: 120,
                height: 48,
                style: { width: 120, height: 48 },
            };
        } else if (type === 'Sticky') {
            newNode = {
                id,
                type: 'sticky',
                data: { label: '', rotation: 0 },
                position: { x: 400, y: 300 },
                width: 200,
                height: 200,
                style: { width: 200, height: 200 },
            };
        } else {
            newNode = {
                id,
                type: 'shape',
                data: { label: '', shape: type, rotation: 0 },
                position: { x: 400, y: 300 },
                width: 150,
                height: 100,
                style: { width: 150, height: 100 },
            };
        }

        set({
            nodes: [...get().nodes, newNode],
            editingNodeId: null, // Don't enter edit mode automatically
        });
    },
    updateNodeData: (id: string, data: any) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === id) {
                    return { ...node, data: { ...node.data, ...data } };
                }
                return node;
            }),
        });
    },
    setEditingNodeId: (id: string | null) => {
        set({ editingNodeId: id });
    },
}));
