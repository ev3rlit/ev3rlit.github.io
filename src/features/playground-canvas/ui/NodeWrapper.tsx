import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position, useStore } from 'reactflow';
import { usePlaygroundStore } from '../model/usePlaygroundStore';

interface NodeWrapperProps {
    children: React.ReactNode;
    selected: boolean;
    isHovered: boolean;
    data: any;
    id: string;
}

export const NodeWrapper = ({ children, selected, isHovered, data, id }: NodeWrapperProps) => {
    const updateNodeData = usePlaygroundStore(s => s.updateNodeData);
    const editingNodeId = usePlaygroundStore(s => s.editingNodeId);
    const setEditingNodeId = usePlaygroundStore(s => s.setEditingNodeId);

    // React Flow store to detect if a connection is being dragged
    const isConnecting = useStore(useCallback((s) => !!s.connectionNodeId, []));

    const isEditing = editingNodeId === id;
    const [localLabel, setLocalLabel] = useState(data.label);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleDoubleClick = (e: React.MouseEvent) => {
        if (isEditing) return;
        e.stopPropagation();
        setEditingNodeId(id);
    };

    const handleBlur = () => {
        setEditingNodeId(null);
        if (localLabel !== data.label) {
            updateNodeData(id, { label: localLabel });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleBlur();
        }
    };

    const onRotateStart = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (!nodeRef.current) return;

        const rect = nodeRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        const initialRotation = data.rotation || 0;

        const onRotateMove = (event: MouseEvent) => {
            const currentAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
            const deltaAngle = currentAngle - startAngle;
            let rotation = (initialRotation + deltaAngle) % 360;
            updateNodeData(id, { rotation });
        };

        const onRotateEnd = () => {
            window.removeEventListener('mousemove', onRotateMove);
            window.removeEventListener('mouseup', onRotateEnd);
        };

        window.addEventListener('mousemove', onRotateMove);
        window.addEventListener('mouseup', onRotateEnd);
    }, [id, data.rotation, updateNodeData]);

    const showHandles = selected || isHovered;
    const isCircle = data.shape === 'Circle';
    const borderRadiusClass = isCircle ? 'rounded-full' : 'rounded-sm';

    return (
        <div
            ref={nodeRef}
            className={`group relative w-full h-full flex flex-col ${borderRadiusClass}`}
            onDoubleClick={handleDoubleClick}
            style={{
                transform: `rotate(${data.rotation || 0}deg)`,
                transformOrigin: 'center center'
            }}
        >
            {/* Rotation Handle */}
            {selected && (
                <div className="nodrag absolute left-1/2 -top-6 -translate-x-1/2 z-[100] cursor-grab active:cursor-grabbing p-1">
                    <div
                        className="w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white dark:border-stone-900 shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/40 hover:scale-125 transition-transform"
                        onMouseDown={onRotateStart}
                    />
                </div>
            )}

            {/* Seamless Target Handle - Allows connecting to the whole node body */}
            {/* MERGED: Visual feedback is applied directly to the Handle to guarantee connection reliability */}
            <Handle
                type="target"
                position={Position.Top}
                id="node-body"
                isConnectableStart={false}
                isValidConnection={() => true}
                className={`!absolute !inset-0 !w-full !h-full !border-none !z-[50] !transform-none transition-colors
                    ${isConnecting ? '!pointer-events-auto' : '!pointer-events-none'}
                    ${isConnecting && isHovered
                        ? '!bg-indigo-500/5 !border-2 !border-dashed !border-indigo-500/50'
                        : '!bg-transparent'
                    }
                `}
                style={{ borderRadius: 'inherit' }}
            />

            {/* Corner Source Handles Only */}
            <div className={`transition-opacity duration-200 ${showHandles ? 'opacity-100' : 'opacity-0'}`}>
                {/* Top Source */}
                <Handle
                    type="source"
                    position={Position.Top}
                    id="top-source"
                    style={{ top: '-5px', left: '50%', transform: 'translateX(-50%)' }}
                    className="!w-2.5 !h-2.5 !bg-indigo-500 !border-2 !border-white dark:!border-stone-900 !rounded-full !shadow-md !z-[12] hover:!scale-150 transition-transform"
                />

                {/* Left Source */}
                <Handle
                    type="source"
                    position={Position.Left}
                    id="left-source"
                    style={{ left: '-5px', top: '50%', transform: 'translateY(-50%)' }}
                    className="!w-2.5 !h-2.5 !bg-indigo-500 !border-2 !border-white dark:!border-stone-900 !rounded-full !shadow-md !z-[12] hover:!scale-150 transition-transform"
                />

                {/* Bottom Source */}
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="bottom-source"
                    style={{ bottom: '-5px', left: '50%', transform: 'translateX(-50%)' }}
                    className="!w-2.5 !h-2.5 !bg-indigo-500 !border-2 !border-white dark:!border-stone-900 !rounded-full !shadow-md !z-[12] hover:!scale-150 transition-transform"
                />

                {/* Right Source */}
                <Handle
                    type="source"
                    position={Position.Right}
                    id="right-source"
                    style={{ right: '-5px', top: '50%', transform: 'translateY(-50%)' }}
                    className="!w-2.5 !h-2.5 !bg-indigo-500 !border-2 !border-white dark:!border-stone-900 !rounded-full !shadow-md !z-[12] hover:!scale-150 transition-transform"
                />
            </div>

            {/* Node Content Container */}
            <div className="nodegroup-content relative z-[1] flex-1 w-full h-full flex flex-col min-h-0">
                {children}
            </div>


            {/* Inline Editor Overlay - Transparent background, inherits shape */}
            {isEditing && (
                <div className={`absolute inset-0 flex items-center justify-center bg-white/95 dark:bg-stone-900/95 backdrop-blur-md z-[120] p-4 ${borderRadiusClass}`}>
                    <textarea
                        ref={inputRef}
                        value={localLabel}
                        onChange={(e) => setLocalLabel(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="w-full h-full bg-transparent text-center border-none outline-none font-bold text-slate-800 dark:text-stone-200 resize-none overflow-hidden flex items-center justify-center placeholder:text-slate-300 dark:placeholder:text-stone-600"
                    />
                </div>
            )}
        </div>
    );
};
