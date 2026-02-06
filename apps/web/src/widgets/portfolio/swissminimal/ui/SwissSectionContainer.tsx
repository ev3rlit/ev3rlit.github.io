import { cn } from '@/shared/lib/cn';
import type { ReactNode } from 'react';

interface SwissSectionContainerProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export const SwissSectionContainer = ({ children, className, id }: SwissSectionContainerProps) => {
    return (
        <div id={id} className={cn("max-w-[1600px] mx-auto px-4 md:px-8 pt-24 pb-6 md:pt-32 md:pb-10", className)}>
            {children}
        </div>
    );
};
