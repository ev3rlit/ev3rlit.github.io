"use client";

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';

interface ImageLightboxProps {
    src: string;
    alt: string;
    className?: string;
}

export const ImageLightbox = ({ src, alt, className }: ImageLightboxProps) => {
    const [open, setOpen] = useState(false);
    const [scale, setScale] = useState(1);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const dragRef = useRef<{ dragging: boolean; startX: number; startY: number; originX: number; originY: number }>({
        dragging: false, startX: 0, startY: 0, originX: 0, originY: 0
    });

    const reset = useCallback(() => { setScale(1); setPos({ x: 0, y: 0 }); }, []);
    const handleClose = useCallback(() => { setOpen(false); reset(); }, [reset]);

    const clampScale = (v: number) => Math.min(Math.max(v, 0.5), 5);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
            if (e.key === '+' || e.key === '=') setScale(s => clampScale(s + 0.25));
            if (e.key === '-') setScale(s => clampScale(s - 0.25));
            if (e.key === '0') reset();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open, handleClose, reset]);

    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.stopPropagation();
        setScale(s => clampScale(s + (e.deltaY < 0 ? 0.25 : -0.25)));
    }, []);

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        if (scale <= 1) return;
        e.stopPropagation();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, originX: pos.x, originY: pos.y };
    }, [scale, pos]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragRef.current.dragging) return;
        e.stopPropagation();
        const { startX, startY, originX, originY } = dragRef.current;
        setPos({ x: originX + (e.clientX - startX), y: originY + (e.clientY - startY) });
    }, []);

    const handlePointerUp = useCallback(() => {
        dragRef.current.dragging = false;
    }, []);

    const handleDoubleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (scale > 1) { reset(); } else { setScale(2.5); }
    }, [scale, reset]);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) handleClose();
    }, [handleClose]);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={cn(
                    "group relative w-full max-h-[360px] overflow-hidden cursor-zoom-in bg-stone-100 dark:bg-stone-900 flex items-center justify-center",
                    className
                )}
            >
                <img src={src} alt={alt} className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white bg-black/60 px-3 py-1.5 text-xs font-mono tracking-wider">
                        확대 보기
                    </span>
                </div>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    {/* Controls */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-black/60 rounded-full px-2 py-1">
                        <button type="button" onClick={() => setScale(s => clampScale(s - 0.25))}
                            className="text-white/70 hover:text-white w-8 h-8 flex items-center justify-center text-lg font-mono transition-colors">−</button>
                        <button type="button" onClick={reset}
                            className="text-white/70 hover:text-white px-2 h-8 flex items-center justify-center text-xs font-mono tracking-wider transition-colors min-w-[48px]">
                            {Math.round(scale * 100)}%
                        </button>
                        <button type="button" onClick={() => setScale(s => clampScale(s + 0.25))}
                            className="text-white/70 hover:text-white w-8 h-8 flex items-center justify-center text-lg font-mono transition-colors">+</button>
                        <div className="w-px h-4 bg-white/20 mx-1" />
                        <button type="button" onClick={handleClose}
                            className="text-white/70 hover:text-white w-8 h-8 flex items-center justify-center text-xs font-mono transition-colors">✕</button>
                    </div>

                    {/* Hint */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-white/40 text-[10px] font-mono tracking-wider">
                        스크롤: 확대/축소 · 더블클릭: 확대 토글 · 드래그: 이동 · ESC: 닫기
                    </div>

                    {/* Image */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-[90vw] max-h-[90vh] object-contain select-none"
                            style={{
                                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                                transition: dragRef.current.dragging ? 'none' : 'transform 0.15s ease-out',
                                cursor: scale > 1 ? 'grab' : 'zoom-in',
                            }}
                            draggable={false}
                            onWheel={handleWheel}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onDoubleClick={handleDoubleClick}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
