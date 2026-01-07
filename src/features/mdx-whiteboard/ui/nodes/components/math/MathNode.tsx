"use client";

import { type JsxComponentDescriptor } from '@mdxeditor/editor';
import { InlineCodeEditor } from '@/features/mdx-whiteboard/ui/editors/InlineCodeEditor';
import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseComponentNode } from '../../base/BaseComponentNode';
import { Sigma } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export const MathNode = memo(({ data, selected }: NodeProps) => {
    const formula = data.props?.formula || 'E = mc^2';

    return (
        <BaseComponentNode
            selected={selected}
            title="Equation"
            icon={Sigma}
            headerColor="text-violet-500"
            className="min-w-[200px]"
        >
            <div className="py-2 px-1 text-center overflow-x-auto">
                <BlockMath math={formula} />
            </div>
        </BaseComponentNode>
    );
});

MathNode.displayName = 'MathNode';

export const mathDescriptor: JsxComponentDescriptor = {
    name: 'Math',
    kind: 'flow',
    props: [{ name: 'formula', type: 'string' }],
    hasChildren: false,
    Editor: InlineCodeEditor
};
