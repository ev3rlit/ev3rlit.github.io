"use client";

import { useEffect } from "react";
import { useSidebarStore } from "@/features/layout/model/useSidebarStore";
import { SwissContactSection } from "@/widgets/portfolio/swissminimal/ui/SwissContactSection";
import { SwissNavigation } from "@/widgets/portfolio/swissminimal/ui/SwissNavigation";

export default function ContactPage() {
    const { setPortfolioMode, setSidebarOpen } = useSidebarStore();

    useEffect(() => {
        setPortfolioMode(true);
        setSidebarOpen(false);

        return () => {
            setPortfolioMode(false);
            setSidebarOpen(true);
        };
    }, [setPortfolioMode, setSidebarOpen]);

    return (
        <div className="relative h-full w-full overflow-hidden bg-white dark:bg-stone-950">
            <SwissNavigation />
            <main className="h-full w-full overflow-y-scroll scroll-smooth no-scrollbar absolute inset-0 z-10">
                <SwissContactSection />
            </main>
        </div>
    );
}
