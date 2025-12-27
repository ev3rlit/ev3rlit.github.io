"use client";

import React from 'react';
import { Square, Circle, Type, MousePointer2, Plus, ArrowUpRight } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { usePlaygroundStore } from '@/features/playground-canvas/model/usePlaygroundStore';

export function PlaygroundToolbar() {
    const addNode = usePlaygroundStore(s => s.addNode);

    return (
        <Card
            className="flex flex-col gap-3 p-2.5 w-14 border border-slate-200/50 bg-white/95 backdrop-blur-md items-center"
            radius="full"
            padding="none"
            shadow="lg"
        >
            <Button size="icon" intent="ghost" title="Select" className="text-slate-400 hover:text-slate-900 active:scale-90">
                <MousePointer2 size={18} />
            </Button>

            <div className="h-px w-6 bg-slate-100/80" />

            <Button size="icon" intent="ghost" title="Rectangle" onClick={() => addNode('Rectangle')} className="text-blue-500 hover:bg-blue-50 active:scale-90">
                <Square size={20} />
            </Button>

            <Button size="icon" intent="ghost" title="Circle" onClick={() => addNode('Circle')} className="text-orange-500 hover:bg-orange-50 active:scale-90">
                <Circle size={20} />
            </Button>

            <Button size="icon" intent="ghost" title="Text" onClick={() => addNode('Text')} className="text-purple-500 hover:bg-purple-50 active:scale-90">
                <Type size={20} />
            </Button>

            <div className="h-px w-6 bg-slate-100/80" />

            <Button size="icon" intent="ghost" title="Sticky Note" onClick={() => addNode('Sticky')} className="text-yellow-500 hover:bg-yellow-50 active:scale-90">
                <Plus size={22} className="text-yellow-600" />
            </Button>
        </Card>
    );
}
