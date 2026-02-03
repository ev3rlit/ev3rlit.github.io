import { cn } from "@/shared/lib/cn";
import { ReactNode } from "react";

interface MacWindowProps {
    title?: string;
    headerRight?: ReactNode;
    children: ReactNode;
    className?: string; // Content area class override
    containerClassName?: string; // Outer container class override
}

export function MacWindow({ title, headerRight, children, className, containerClassName }: MacWindowProps) {
    return (
        <div className={cn("my-8 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-lg bg-white dark:bg-stone-950", containerClassName)}>
            {/* Window Header */}
            <div className="px-4 py-3 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 relative">
                {/* Left: Traffic Lights */}
                <div className="flex gap-1.5 z-10 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20" />
                </div>

                {/* Center: Title */}
                {title && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-xs font-medium text-stone-500 dark:text-stone-400 truncate px-16">
                            {title}
                        </span>
                    </div>
                )}

                {/* Right: Custom Actions (e.g. Copy Button) */}
                <div className="z-10 flex items-center shrink-0 min-w-[36px] justify-end">
                    {headerRight}
                </div>
            </div>

            {/* Window Content */}
            <div className={cn("relative", className)}>
                {children}
            </div>
        </div>
    );
}
