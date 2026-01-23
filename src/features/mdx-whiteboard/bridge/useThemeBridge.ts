import { useTheme } from 'next-themes';
import { ThemeInterface } from './types';

/**
 * Bridge hook for theme management.
 * Currently wraps next-themes, but allows future abstraction for VSCode.
 */
export function useThemeBridge(): ThemeInterface {
    const { resolvedTheme, setTheme } = useTheme();
    
    // Ensure we always return a valid theme string, defaulting to light if undefined
    const safeTheme = (resolvedTheme === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
    
    return {
        resolvedTheme: safeTheme,
        setTheme
    };
}
