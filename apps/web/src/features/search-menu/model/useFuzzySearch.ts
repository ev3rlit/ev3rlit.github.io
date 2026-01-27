import { useMemo } from 'react';
import { Post } from '@/entities/post/model/types';
import { FuzzySearchEngine } from '../lib/FuzzySearchEngine';

export function useFuzzySearch(posts: Post[], query: string) {
    // Initialize engine once (or when posts change)
    const engine = useMemo(() => new FuzzySearchEngine(posts), [posts]);

    // Memoize results to avoid re-calculation on every render if query stays same
    const results = useMemo(() => {
        if (!query) return [];
        return engine.search(query);
    }, [engine, query]);

    // Memoize suggestions
    const suggestions = useMemo(() => {
        if (!query) return [];
        return engine.getSuggestions(query);
    }, [engine, query]);

    return {
        results,
        suggestions
    };
}
