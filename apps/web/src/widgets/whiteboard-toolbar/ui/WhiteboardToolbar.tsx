"use client";

import React, { useRef } from 'react';
import {
    Settings,
    ZoomIn,
    ZoomOut,
    Maximize,
    Layout,
    FolderOpen,
    Save,
} from 'lucide-react';
import { useWhiteboardStore } from '@repo/whiteboard-ui';
import { Sidebar } from '@/shared/ui/sidebar/Sidebar';

export function WhiteboardToolbar() {
    const reactFlowInstance = useWhiteboardStore(s => s.reactFlowInstance);
    const {
        isComponentPickerOpen,
        setComponentPickerOpen,
        mdxSource,
        setMdxSource,
        fileHandle,
        setFileHandle,
    } = useWhiteboardStore();

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Zoom tools
    const zoomIn = () => reactFlowInstance?.zoomIn();
    const zoomOut = () => reactFlowInstance?.zoomOut();
    const fitView = () => reactFlowInstance?.fitView();

    const handleOpenFile = async () => {
        if ('showOpenFilePicker' in window) {
            try {
                const [handle] = await (window as any).showOpenFilePicker({
                    types: [{
                        description: 'MDX/Markdown Files',
                        accept: { 'text/markdown': ['.md', '.mdx'] }
                    }],
                    multiple: false
                });

                const file = await handle.getFile();
                const content = await file.text();

                setMdxSource(content);
                setFileHandle(handle);
                return;
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    console.error("File System Access API failed, falling back to input", err);
                } else {
                    return;
                }
            }
        }

        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const content = ev.target?.result as string;
            if (content) {
                setMdxSource(content);
                setFileHandle(null);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const handleSaveFile = async () => {
        if (fileHandle) {
            try {
                const writable = await fileHandle.createWritable();
                await writable.write(mdxSource);
                await writable.close();
                alert("Saved successfully!");
                return;
            } catch (err) {
                console.error("Failed to save to handle", err);
            }
        }

        if ('showSaveFilePicker' in window) {
            try {
                const titleMatch = mdxSource.match(/^title:\s*(.*)$/m);
                const title = titleMatch ? titleMatch[1].trim().replace(/['"]/g, '') : 'whiteboard';
                const suggestedName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mdx`;

                const handle = await (window as any).showSaveFilePicker({
                    suggestedName,
                    types: [{
                        description: 'MDX File',
                        accept: { 'text/markdown': ['.mdx', '.md'] }
                    }]
                });

                const writable = await handle.createWritable();
                await writable.write(mdxSource);
                await writable.close();

                setFileHandle(handle);
                alert("Saved successfully!");
                return;
            } catch (err: any) {
                if (err.name === 'AbortError') return;
            }
        }

        const blob = new Blob([mdxSource], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const titleMatch = mdxSource.match(/^title:\s*(.*)$/m);
        const title = titleMatch ? titleMatch[1].trim().replace(/['"]/g, '') : 'whiteboard';
        const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mdx`;

        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".md,.mdx,.txt"
            />
            <Sidebar.Item
                icon={<FolderOpen size={18} />}
                title="Open File"
                onClick={handleOpenFile}
            />
            <Sidebar.Item
                icon={<Save size={18} />}
                title={fileHandle ? "Save" : "Save As..."}
                onClick={handleSaveFile}
            />
            {process.env.NODE_ENV === 'development' && (
                <Sidebar.Item
                    icon={<Settings size={18} className="text-red-400" />}
                    title="Dev Save (API)"
                    onClick={async () => {
                        const titleMatch = mdxSource.match(/^title:\s*(.*)$/m);
                        const title = titleMatch ? titleMatch[1].trim().replace(/['"]/g, '') : 'whiteboard';
                        const dateMatch = mdxSource.match(/^date:\s*(.*)$/m);

                        let defaultPath = `content/`;
                        if (dateMatch) {
                            // Try to parse YYYY-MM
                            const date = new Date(dateMatch[1].trim());
                            if (!isNaN(date.getTime())) {
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                defaultPath = `content/${year}/${month}/`;
                            }
                        }

                        const filename = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.mdx`;
                        const fullPath = prompt("Enter file path (relative to project root):", defaultPath + filename);

                        if (fullPath) {
                            try {
                                const res = await fetch('/api/dev/save-file', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ filename: fullPath, content: mdxSource })
                                });
                                if (res.ok) {
                                    alert('Saved to project!');
                                } else {
                                    const err = await res.json();
                                    alert('Failed: ' + err.error);
                                }
                            } catch (e) {
                                alert('Error saving file');
                            }
                        }
                    }}
                />
            )}

            <Sidebar.Divider />

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