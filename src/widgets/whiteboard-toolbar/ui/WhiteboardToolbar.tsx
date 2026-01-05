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
import { Sidebar } from '@/shared/ui/sidebar/Sidebar';

export function WhiteboardToolbar() {
    const reactFlowInstance = useWhiteboardStore(s => s.reactFlowInstance);
    // Zoom tools
    const zoomIn = () => reactFlowInstance?.zoomIn();
    const zoomOut = () => reactFlowInstance?.zoomOut();
    const fitView = () => reactFlowInstance?.fitView();

    const { isComponentPickerOpen, setComponentPickerOpen } = useWhiteboardStore();

    return (
        <>
            <Sidebar.Item
                icon={<ZoomIn size={18} />}
                title="Zoom In"
                onClick={() => zoomIn()}
            />
            <Sidebar.Item
                icon={<ZoomOut size={18} />}
                title="Zoom Out"
                onClick={() => zoomOut()}
            />
            <Sidebar.Item
                icon={<Maximize size={18} />}
                title="Fit View"
                onClick={() => fitView()}
            />

            <Sidebar.Divider />

            <Sidebar.Item
                icon={<Layout size={18} />}
                title="Add Component"
                active={isComponentPickerOpen}
                intent={isComponentPickerOpen ? "primary" : "ghost"}
                onClick={() => setComponentPickerOpen(!isComponentPickerOpen)}
            />

            <Sidebar.Divider />

            <Sidebar.Item
                icon={<Settings size={18} className="text-stone-400" />}
                title="Settings"
            />
        </>
    );
}
