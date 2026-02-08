"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/cn";

interface SwissScreenshotGalleryProps {
	screenshots: { src: string; alt: string; caption?: string }[];
	containerHeight?: string;
	className?: string;
}

/** Hook: 이미지 로드 후 가로/세로 비율을 반환 */
const useImageAspect = (src: string) => {
	const [aspect, setAspect] = useState<number | null>(null);
	useEffect(() => {
		const img = new Image();
		img.onload = () => setAspect(img.naturalWidth / img.naturalHeight);
		img.src = src;
	}, [src]);
	return aspect;
};

const GalleryItem = ({
	shot,
	idx,
	baseHeight,
	onItemClick,
}: {
	shot: { src: string; alt: string; caption?: string };
	idx: number;
	baseHeight: number;
	onItemClick: (idx: number) => void;
}) => {
	const aspect = useImageAspect(shot.src);
	const width = aspect ? Math.round(baseHeight * aspect) : baseHeight;

	return (
		<div
			className="flex-shrink-0 flex flex-col"
			style={{ width }}
		>
			<button
				type="button"
				onClick={() => onItemClick(idx)}
				className="group flex-1 relative border border-stone-200 dark:border-stone-800 overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-zoom-in"
			>
				<img
					src={shot.src}
					alt={shot.alt}
					className="absolute inset-0 w-full h-full object-contain"
					draggable={false}
				/>
				<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
					<span className="opacity-0 group-hover:opacity-100 transition-opacity text-white bg-black/60 px-3 py-1.5 text-xs font-mono tracking-wider">
						확대 보기
					</span>
				</div>
			</button>
			{shot.caption && (
				<p className="label-text text-stone-500 dark:text-stone-400 mt-2 text-center truncate">
					{shot.caption}
				</p>
			)}
		</div>
	);
};

/* ─── Gallery Lightbox (internal) ─── */
const GalleryLightbox = ({
	screenshots,
	index,
	onClose,
	onPrev,
	onNext,
}: {
	screenshots: { src: string; alt: string }[];
	index: number;
	onClose: () => void;
	onPrev: () => void;
	onNext: () => void;
}) => {
	const [scale, setScale] = useState(1);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const dragRef = useRef({
		dragging: false,
		startX: 0,
		startY: 0,
		originX: 0,
		originY: 0,
	});

	const clampScale = (v: number) => Math.min(Math.max(v, 0.5), 5);
	const reset = useCallback(() => {
		setScale(1);
		setPos({ x: 0, y: 0 });
	}, []);

	// Reset zoom/pan when navigating
	useEffect(() => {
		reset();
	}, [index, reset]);

	// Keyboard
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				onPrev();
			}
			if (e.key === "ArrowRight") {
				e.preventDefault();
				onNext();
			}
			if (e.key === "+" || e.key === "=")
				setScale((s) => clampScale(s + 0.25));
			if (e.key === "-") setScale((s) => clampScale(s - 0.25));
			if (e.key === "0") reset();
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [onClose, onPrev, onNext, reset]);

	const handleWheel = useCallback((e: React.WheelEvent) => {
		e.stopPropagation();
		setScale((s) => clampScale(s + (e.deltaY < 0 ? 0.25 : -0.25)));
	}, []);

	// Drag works at any zoom level
	const handlePointerDown = useCallback(
		(e: React.PointerEvent) => {
			e.stopPropagation();
			(e.target as HTMLElement).setPointerCapture(e.pointerId);
			dragRef.current = {
				dragging: true,
				startX: e.clientX,
				startY: e.clientY,
				originX: pos.x,
				originY: pos.y,
			};
		},
		[pos],
	);

	const handlePointerMove = useCallback((e: React.PointerEvent) => {
		if (!dragRef.current.dragging) return;
		e.stopPropagation();
		const { startX, startY, originX, originY } = dragRef.current;
		setPos({
			x: originX + (e.clientX - startX),
			y: originY + (e.clientY - startY),
		});
	}, []);

	const handlePointerUp = useCallback(() => {
		dragRef.current.dragging = false;
	}, []);

	const handleDoubleClick = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			if (scale > 1) reset();
			else setScale(2.5);
		},
		[scale, reset],
	);

	const shot = screenshots[index];

	return (
		<div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex flex-col">
			{/* ── Top toolbar ── */}
			<div className="shrink-0 flex items-center justify-between px-4 h-12 bg-black/60 backdrop-blur-md">
				{/* Left: counter */}
				<span className="text-stone-300 text-sm font-mono tracking-wider">
					{index + 1} / {screenshots.length}
				</span>

				{/* Center: zoom controls */}
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => setScale((s) => clampScale(s - 0.25))}
						className="text-stone-300 hover:text-white hover:bg-stone-700 w-8 h-8 flex items-center justify-center text-lg font-mono rounded transition-colors"
					>
						−
					</button>
					<button
						type="button"
						onClick={reset}
						className="text-stone-300 hover:text-white hover:bg-stone-700 px-2 h-8 flex items-center justify-center text-xs font-mono tracking-wider rounded transition-colors min-w-[52px]"
					>
						{Math.round(scale * 100)}%
					</button>
					<button
						type="button"
						onClick={() => setScale((s) => clampScale(s + 0.25))}
						className="text-stone-300 hover:text-white hover:bg-stone-700 w-8 h-8 flex items-center justify-center text-lg font-mono rounded transition-colors"
					>
						+
					</button>
				</div>

				{/* Right: close */}
				<button
					type="button"
					onClick={onClose}
					className="text-stone-300 hover:text-white hover:bg-stone-700 w-8 h-8 flex items-center justify-center rounded transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
				</button>
			</div>

			{/* ── Image area ── */}
			<div className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden">
				{/* Prev button */}
				<button
					type="button"
					onClick={onPrev}
					className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-stone-800 hover:bg-stone-600 text-white rounded-full border border-stone-600 transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
				</button>

				{/* Next button */}
				<button
					type="button"
					onClick={onNext}
					className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-stone-800 hover:bg-stone-600 text-white rounded-full border border-stone-600 transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
				</button>

				{/* Image */}
				<img
					src={shot.src}
					alt={shot.alt}
					className="max-w-[75vw] max-h-[calc(100vh-7rem)] object-contain select-none"
					style={{
						transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
						transition: dragRef.current.dragging
							? "none"
							: "transform 0.15s ease-out",
						cursor: dragRef.current.dragging ? "grabbing" : "grab",
					}}
					draggable={false}
					onWheel={handleWheel}
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
					onDoubleClick={handleDoubleClick}
				/>
			</div>

			{/* ── Bottom hint ── */}
			<div className="shrink-0 h-8 flex items-center justify-center bg-black/60 backdrop-blur-md text-white/40 text-[11px] font-mono tracking-wider">
				←/→ 이전/다음 · 스크롤 확대/축소 · 더블클릭 확대 토글 · 드래그 이동 · ESC 닫기
			</div>
		</div>
	);
};

/* ─── Main Gallery ─── */
export const SwissScreenshotGallery = ({
	screenshots,
	containerHeight = "420px",
	className,
}: SwissScreenshotGalleryProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	// --- Drag-to-scroll ---
	const dragState = useRef({
		active: false,
		startX: 0,
		scrollStart: 0,
		moved: false,
	});
	const DRAG_THRESHOLD = 5;

	const handlePointerDown = useCallback((e: React.PointerEvent) => {
		const el = containerRef.current;
		if (!el) return;
		dragState.current = {
			active: true,
			startX: e.clientX,
			scrollStart: el.scrollLeft,
			moved: false,
		};
		el.style.cursor = "grabbing";
		el.style.userSelect = "none";
	}, []);

	const handlePointerMove = useCallback((e: React.PointerEvent) => {
		if (!dragState.current.active) return;
		const dx = e.clientX - dragState.current.startX;
		if (Math.abs(dx) > DRAG_THRESHOLD) {
			dragState.current.moved = true;
		}
		const el = containerRef.current;
		if (el) el.scrollLeft = dragState.current.scrollStart - dx;
	}, []);

	const handlePointerUp = useCallback(() => {
		dragState.current.active = false;
		const el = containerRef.current;
		if (el) {
			el.style.cursor = "";
			el.style.userSelect = "";
		}
	}, []);

	// Vertical wheel → horizontal scroll
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const onWheel = (e: WheelEvent) => {
			if (e.deltaY === 0) return;
			e.preventDefault();
			el.scrollLeft += e.deltaY;
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, []);

	// Lightbox navigation
	const handlePrev = useCallback(() => {
		setLightboxIndex((i) =>
			i === null ? null : (i - 1 + screenshots.length) % screenshots.length,
		);
	}, [screenshots.length]);

	const handleNext = useCallback(() => {
		setLightboxIndex((i) =>
			i === null ? null : (i + 1) % screenshots.length,
		);
	}, [screenshots.length]);

	const handleItemClick = useCallback((idx: number) => {
		if (dragState.current.moved) return;
		setLightboxIndex(idx);
	}, []);

	return (
		<div className={cn("relative", className)}>
			{/* Horizontal scrollable container */}
			<div
				ref={containerRef}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerLeave={handlePointerUp}
				className="overflow-x-auto scrollbar-hide cursor-grab"
				style={{ height: containerHeight }}
			>
				<div className="inline-flex min-w-full justify-center gap-4 h-full px-8">
					{screenshots.map((shot, idx) => (
						<GalleryItem
							key={`${shot.src}-${idx}`}
							shot={shot}
							idx={idx}
							baseHeight={parseInt(containerHeight ?? "420", 10) - 40}
							onItemClick={handleItemClick}
						/>
					))}
				</div>
			</div>

			{/* Left fade */}
			<div className="pointer-events-none absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-stone-50 dark:from-stone-900 to-transparent z-10" />

			{/* Right fade */}
			<div className="pointer-events-none absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-stone-50 dark:from-stone-900 to-transparent z-10" />

			{/* Lightbox overlay — portal to body to escape ancestor transforms */}
			{lightboxIndex !== null &&
				createPortal(
					<GalleryLightbox
						screenshots={screenshots}
						index={lightboxIndex}
						onClose={() => setLightboxIndex(null)}
						onPrev={handlePrev}
						onNext={handleNext}
					/>,
					document.body,
				)}
		</div>
	);
};
