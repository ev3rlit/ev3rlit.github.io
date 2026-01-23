
import { clsx } from 'clsx';
import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    className?: string;
}

export function StatCard({ label, value, className }: StatCardProps) {
    return (
        <div className={clsx("p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm", className)}>
            <div className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">{label}</div>
            <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{value}</div>
        </div>
    );
}
