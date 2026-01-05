"use client";

import React from 'react';
import {
    Type,
    List,
    Database,
    Activity,
    Settings,
    ZoomIn,
    ZoomOut,
    Maximize,
    Layout,
} from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { useWhiteboardStore } from '@/entities/whiteboard/model/whiteboardStore';
import { motion, AnimatePresence } from 'framer-motion';

export function WhiteboardToolbar() {
    const reactFlowInstance = useWhiteboardStore(s => s.reactFlowInstance);
    // Zoom tools
    const zoomIn = () => reactFlowInstance?.zoomIn();
    const zoomOut = () => reactFlowInstance?.zoomOut();
    const fitView = () => reactFlowInstance?.fitView();

    return (
        <div className="flex flex-col gap-2 p-1 items-center">
            {/* View Tools */}
            <div className="flex flex-col gap-1 w-full items-center pb-2 border-b border-stone-100 dark:border-stone-800/50">
                <Button size="icon" intent="ghost" onClick={() => zoomIn()} title="Zoom In">
                    <ZoomIn size={18} />
                </Button>
                <Button size="icon" intent="ghost" onClick={() => zoomOut()} title="Zoom Out">
                    <ZoomOut size={18} />
                </Button>
                <Button size="icon" intent="ghost" onClick={() => fitView()} title="Fit View">
                    <Maximize size={18} />
                </Button>
            </div>

            {/* Component Picker */}
            <div className="flex flex-col gap-1 w-full items-center py-2 h-[200px] justify-start relative">
                <ComponentPicker />
            </div>

            {/* Bottom Tools */}
            <div className="w-full flex flex-col items-center pt-2 border-t border-stone-100 dark:border-stone-800/50">
                <Button size="icon" intent="ghost" title="Settings">
                    <Settings size={18} className="text-stone-400" />
                </Button>
            </div>
        </div>
    );
}

function ComponentPicker() {
    const { isComponentPickerOpen, setComponentPickerOpen } = useWhiteboardStore();

    return (
        <div className="relative">
            <Button
                size="icon"
                intent={isComponentPickerOpen ? "primary" : "ghost"}
                onClick={() => setComponentPickerOpen(!isComponentPickerOpen)}
                title="Add Component"
                className={isComponentPickerOpen ? "text-white bg-indigo-500" : "text-indigo-500 hover:text-indigo-600"}
            >
                <div className="flex items-center justify-center">
                    <Layout size={20} />
                </div>
            </Button>
        </div>
    );
}
