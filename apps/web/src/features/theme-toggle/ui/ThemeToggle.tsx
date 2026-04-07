'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <span className="block h-11 w-11" aria-hidden="true" />;
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex h-11 w-11 items-center justify-center text-stone-500 transition-colors hover:text-indigo-500 focus-visible:outline-none focus-visible:text-indigo-500 dark:text-stone-400 dark:hover:text-indigo-400 dark:focus-visible:text-indigo-400"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
        </button>
    );
}
