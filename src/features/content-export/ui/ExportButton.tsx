"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Image, FileType } from 'lucide-react';
import { Sidebar } from '@/shared/ui/sidebar/Sidebar';
import { useViewModeOptional } from '@/shared/context/ViewContext';
import { exportToHtml, exportToPng, exportToPdf } from '../lib/exporters';

// ============================================
// Types
// ============================================

interface ExportFormat {
    id: 'html' | 'png' | 'pdf';
    label: string;
    icon: React.ReactNode;
}

const EXPORT_FORMATS: ExportFormat[] = [
    { id: 'html', label: 'HTML', icon: <FileText size={14} /> },
    { id: 'png', label: 'PNG', icon: <Image size={14} /> },
    { id: 'pdf', label: 'PDF', icon: <FileType size={14} /> },
];

// ============================================
// Content Selector
// ============================================

/**
 * 현재 viewMode에 따른 콘텐츠 요소 선택
 */
function getContentElement(viewMode: 'document' | 'mindmap'): HTMLElement | null {
    if (viewMode === 'mindmap') {
        // Mindmap: React Flow 캔버스 영역
        return document.querySelector('.react-flow') as HTMLElement;
    } else {
        // Document: article 요소
        return document.querySelector('article') as HTMLElement;
    }
}

// ============================================
// Export Button Component
// ============================================

export function ExportButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { viewMode } = useViewModeOptional();

    // 외부 클릭 시 메뉴 닫기
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Export 실행
    const handleExport = async (format: ExportFormat['id']) => {
        const element = getContentElement(viewMode);
        if (!element) {
            console.error('Content element not found');
            return;
        }

        setIsExporting(true);
        setIsOpen(false);

        try {
            const filename = `export-${Date.now()}`;

            switch (format) {
                case 'html':
                    await exportToHtml(element, filename);
                    break;
                case 'png':
                    await exportToPng(element, filename);
                    break;
                case 'pdf':
                    await exportToPdf(element, filename);
                    break;
            }
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div ref={menuRef} className="relative">
            <Sidebar.Item
                icon={<Download size={18} className={isExporting ? 'animate-pulse' : ''} />}
                title={isExporting ? 'Exporting...' : 'Export'}
                onClick={() => !isExporting && setIsOpen(!isOpen)}
            />

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute left-full top-0 ml-2 z-50 min-w-[120px] rounded-lg border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-lg overflow-hidden">
                    {EXPORT_FORMATS.map((format) => (
                        <button
                            key={format.id}
                            onClick={() => handleExport(format.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-stone-200 hover:bg-slate-100 dark:hover:bg-stone-700 transition-colors"
                        >
                            {format.icon}
                            <span>{format.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
