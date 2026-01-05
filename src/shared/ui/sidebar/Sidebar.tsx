"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

// --- Types ---
type ExpandMode = 'single' | 'multi';
type LayoutMode = 'vertical' | 'horizontal' | 'responsive';

interface SidebarContextType {
    expandMode: ExpandMode;
    layout: LayoutMode;
    expandedGroupIds: string[];
    toggleGroup: (id: string) => void;
}

// --- Context ---
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("Sidebar sub-components must be used within a Sidebar");
    }
    return context;
};

// --- Sidebar (Main Container) ---
interface SidebarProps {
    children: React.ReactNode;
    layout?: LayoutMode;
    expandMode?: ExpandMode;
    className?: string;
    /** defaultExpandedGroups: array of group IDs to be open initially */
    defaultExpandedGroups?: string[];
}

export function Sidebar({
    children,
    layout = 'responsive',
    expandMode = 'multi',
    className,
    defaultExpandedGroups = []
}: SidebarProps) {
    const [expandedGroupIds, setExpandedGroupIds] = useState<string[]>(defaultExpandedGroups);

    const toggleGroup = (id: string) => {
        setExpandedGroupIds(prev => {
            const isExpanded = prev.includes(id);

            if (expandMode === 'single') {
                // Accordion behavior: click to toggle. If opening a new one, close others.
                if (isExpanded) {
                    return prev.filter(groupId => groupId !== id); // Toggle off
                } else {
                    return [id]; // Open this one, close others
                }
            } else {
                // Multi behavior: Independent toggle
                if (isExpanded) {
                    return prev.filter(groupId => groupId !== id);
                } else {
                    return [...prev, id];
                }
            }
        });
    };

    return (
        <SidebarContext.Provider value={{ expandMode, layout, expandedGroupIds, toggleGroup }}>
            <div
                className={clsx(
                    "flex gap-4 relative",
                    {
                        "flex-col": layout === 'vertical',
                        "flex-row": layout === 'horizontal',
                        "flex-row md:flex-col": layout === 'responsive',
                    },
                    className
                )}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    );
}

// --- SidebarGroup ---
interface SidebarGroupProps {
    id: string;
    label?: string; // Header text
    children: React.ReactNode;
    collapsible?: boolean;
    defaultOpen?: boolean; // Only used if not controlled by Sidebar's defaultExpandedGroups
    className?: string;
}

function SidebarGroup({
    id,
    label,
    children,
    collapsible = false,
    defaultOpen = false,
    className
}: SidebarGroupProps) {
    const { expandedGroupIds, toggleGroup, layout } = useSidebarContext();

    // Determine if expanded based on context state
    // If it's collapsible, check context. If not, it's always open (effectively).
    const isExpanded = collapsible ? expandedGroupIds.includes(id) : true;

    // Initialize default state if needed (side-effect during mount is safe for simple logic, but better to handle in parent init.
    // However, `defaultOpen` prop on Group is easier for per-group static config.
    // We will reconcile this by calling toggleGroup on mount if defaultOpen is true and it's not in the list?
    // Actually simplicity: Sidebar's `defaultExpandedGroups` wins. If user wants per-group default, they should use Sidebar's prop.
    // But for convenience, let's say if `defaultOpen` is true, we might want to respect it. 
    // For now, let's replicate the state initialization logic partially or just rely on parent.
    // Let's rely on parent `defaultExpandedGroups` for "Controlled" initial state feel, but for simplicity
    // we just use the props passed. simpler: collapsible logic.

    const handleToggle = () => {
        if (collapsible) {
            toggleGroup(id);
        }
    };

    return (
        <Card
            className={clsx(
                "flex p-2 gap-1", // Simplified - removed overflow-hidden
                // Responsive layout logic
                {
                    "flex-col": layout === 'vertical',
                    "flex-row": layout === 'horizontal',
                    "flex-row md:flex-col": layout === 'responsive', // Items become horizontal on mobile
                },
                className
            )}
            radius="md"
            shadow="lg"
        >
            {/* Header */}
            {(label || collapsible) && (
                <div
                    className={clsx(
                        "flex items-center justify-between px-2 py-1 select-none w-full",
                        collapsible ? "cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md" : ""
                    )}
                    onClick={handleToggle}
                >
                    {label && <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{label}</span>}
                    {collapsible && (
                        <motion.div
                            animate={{ rotate: isExpanded ? 0 : -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown size={14} className="text-stone-400" />
                        </motion.div>
                    )}
                </div>
            )}

            {/* Content Body - simplified, no animation wrapper */}
            {isExpanded && (
                <div
                    className={clsx(
                        "flex gap-1 items-center", // Content items alignment
                        {
                            "flex-col w-full": layout === 'vertical',
                            "flex-row": layout === 'horizontal',
                            "flex-row md:flex-col md:w-full": layout === 'responsive',
                        }
                    )}
                >
                    {children}
                </div>
            )}
        </Card>
    );
}

// --- SidebarItem ---
interface SidebarItemProps {
    icon?: React.ReactNode;
    label?: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
    /** Automatically match pathname to href for active state */
    activeMatch?: 'exact' | 'prefix';
    intent?: 'ghost' | 'primary';
    badge?: React.ReactNode;
    title?: string;
    className?: string;
}

function SidebarItem({
    icon,
    label,
    href,
    onClick,
    active,
    activeMatch,
    intent = 'ghost',
    badge,
    title,
    className
}: SidebarItemProps) {
    const pathname = usePathname();
    const { layout } = useSidebarContext();

    // Resolve active state
    let isActive = active;
    if (activeMatch && href) {
        if (activeMatch === 'exact') {
            isActive = pathname === href;
        } else if (activeMatch === 'prefix') {
            isActive = pathname?.startsWith(href);
        }
    }

    const buttonContent = (
        <div className={clsx("flex items-center gap-2", label ? "w-full justify-between" : "justify-center")}>
            <div className="flex items-center gap-2">
                {icon && <span className={clsx(isActive ? "" : "text-stone-500")}>{icon}</span>}
                {label && <span>{label}</span>}
            </div>
            {badge && (
                <div className="flex items-center justify-center bg-indigo-100 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {badge}
                </div>
            )}
        </div>
    );

    // Common Button Props
    const buttonProps = {
        size: "icon" as const,
        // Logic: 
        // - If label exists: w-full (stretch to sidebar), justify-start
        // - If no label (icon only): w-auto (or rather fixed size from button variant), justify-center
        className: clsx(
            label ? "justify-start" : "justify-center",
            {
                // Only stretch if we have a label. Otherwise, square is better.
                "w-full": label && layout === 'vertical',
                // For responsive: 
                // - Mobile (row): w-auto is good. 
                // - Desktop (col): w-full ONLY if label exists. If icon only, let it be fixed size.
                "w-auto": layout === 'horizontal',
                "w-auto md:w-full": Boolean(label) && layout === 'responsive',
            },
            className
        ),
        intent: isActive ? "primary" : intent,
        onClick: onClick,
        title: title || label // Tooltip fallback
    };

    // If it has label, we probably want a specific button variant or style override.
    // The existing Button component in shared/ui/Button might control padding based on size.
    // Let's use size="default" if label exists, "icon" if not.
    const btnSize = label ? "md" : "icon";

    const content = (
        <Button {...buttonProps} size={btnSize} className={clsx("text-sm font-medium", buttonProps.className)}>
            {buttonContent}
        </Button>
    );

    if (href) {
        return <Link href={href} className="w-full">{content}</Link>;
    }

    return content;
}


// --- SidebarDivider ---
function SidebarDivider({ className }: { className?: string }) {
    const { layout } = useSidebarContext();
    return (
        <div
            className={clsx(
                "bg-stone-100 dark:bg-stone-800/50 flex-shrink-0", // Added flex-shrink-0
                {
                    "h-px w-full my-1": layout === 'vertical',
                    "w-px h-6 mx-1": layout === 'horizontal', // Fixed height for divider in row
                    // Responsive: Width divider on Desktop (col), Vertical divider on Mobile (row)
                    "w-px h-6 mx-1 md:h-px md:w-full md:my-1 md:mx-0": layout === 'responsive'
                },
                className
            )}
        />
    );
}

// --- Attach Subcomponents ---
Sidebar.Group = SidebarGroup;
Sidebar.Item = SidebarItem;
Sidebar.Divider = SidebarDivider;
