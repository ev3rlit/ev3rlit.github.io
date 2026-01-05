"use client";

import React from 'react';
import { Square, Circle, Type, MousePointer2, Plus, ArrowUpRight } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { usePlaygroundStore } from '@/features/playground-canvas/model/usePlaygroundStore';
import { Sidebar } from '@/shared/ui/sidebar/Sidebar';

export function PlaygroundToolbar() {
    const addNode = usePlaygroundStore(s => s.addNode);

    return (
        <>
            <Sidebar.Item
                icon={<MousePointer2 size={18} />}
                title="Select"
                className="text-slate-400 hover:text-slate-900"
            />

            <Sidebar.Divider />

            <Sidebar.Item
                icon={<Square size={20} />}
                title="Rectangle"
                onClick={() => addNode('Rectangle')}
                className="text-blue-500 hover:bg-blue-50"
            />
            <Sidebar.Item
                icon={<Circle size={20} />}
                title="Circle"
                onClick={() => addNode('Circle')}
                className="text-orange-500 hover:bg-orange-50"
            />
            <Sidebar.Item
                icon={<Type size={20} />}
                title="Text"
                onClick={() => addNode('Text')}
                className="text-purple-500 hover:bg-purple-50"
            />

            <Sidebar.Divider />

            <Sidebar.Item
                icon={<Plus size={22} className="text-yellow-600" />}
                title="Sticky Note"
                onClick={() => addNode('Sticky')}
                className="text-yellow-500 hover:bg-yellow-50"
            />
        </>
    );
}
