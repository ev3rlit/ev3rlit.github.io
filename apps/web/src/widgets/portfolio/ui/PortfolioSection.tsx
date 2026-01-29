
import { cn } from "@/shared/lib/cn";
import { ReactNode } from "react";

interface PortfolioSectionProps {
    children: ReactNode;
    className?: string;
    theme?: "light" | "dark" | "black"; // Keeping interface for compatibility, but will enforce single theme styling mostly
}

export const PortfolioSection = ({
    children,
    className,
    theme = "light",
}: PortfolioSectionProps) => {
    return (
        // Outer Wrapper: Full screen center alignment with Scroll Snap
        <section className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 bg-gray-100 snap-start print:p-0 print:bg-white print:block print:h-auto print:min-h-0 print:break-inside-avoid">

            {/* Slide Container: 16:9 Aspect Ratio Fixed */}
            <div className={cn(
                "w-full max-w-[1440px] aspect-video bg-white shadow-2xl relative flex flex-col overflow-hidden",
                "print:shadow-none print:w-full print:aspect-auto print:h-full print:border-none",
                className
            )}>
                {/* Top Bold Border (Signature Design) */}
                <div className="absolute top-0 left-0 w-full border-t-4 border-black z-20" />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col p-8 md:p-16 h-full w-full">
                    {children}
                </div>
            </div>

        </section>
    );
};
