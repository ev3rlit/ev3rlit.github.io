import React from 'react';

export function CareerTimeline({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative mt-12 space-y-12">
            {children}
        </div>
    );
}
