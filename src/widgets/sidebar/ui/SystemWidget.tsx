"use client";

import { Card } from "@/shared/ui/Card";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import { ThemeToggle } from "@/features/theme-toggle/ui/ThemeToggle";

export function SystemWidget() {
    const { isSidebarOpen, toggleSidebar } = useSidebarStore();

    return (
        <Card className="flex items-center justify-between px-6 py-4" radius="lg">
            <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">System</span>
                <ThemeToggle />
            </div>

            {/* Sidebar Toggle */}
            <Button size="icon" intent="ghost" onClick={toggleSidebar} title="Toggle Sidebar">
                <ChevronLeft size={18} />
            </Button>
        </Card>
    );
}
