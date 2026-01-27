import { BitapSearch } from './BitapSearch';
import { Post } from '@/entities/post/model/types';

export class FuzzySearchEngine {
    private posts: Post[];
    private bitap: BitapSearch;

    constructor(posts: Post[]) {
        this.posts = posts;
        this.bitap = new BitapSearch();
    }

    search(query: string): Post[] {
        if (!query.trim()) return [];

        const normalizedQuery = query.toLowerCase().trim();
        const results: { post: Post; score: number }[] = [];

        for (const post of this.posts) {
            let matches = false;
            let score = 0;

            // 1. Check Title (High weight)
            const title = post.meta.title.toLowerCase();
            if (this.bitap.match(title, normalizedQuery, 2)) {
                matches = true;
                score += 10;
                // Boost for exact/contains
                if (title.includes(normalizedQuery)) score += 10;
            }

            // 2. Check Tags (Medium weight)
            if (post.meta.tags) {
                for (const tag of post.meta.tags) {
                    const normalizedTag = tag.toLowerCase();
                    if (this.bitap.match(normalizedTag, normalizedQuery, 2)) {
                        matches = true;
                        score += 5;
                        if (normalizedTag.includes(normalizedQuery)) score += 5;
                    }
                }
            }

            if (matches) {
                results.push({ post, score });
            }
        }

        return results.sort((a, b) => b.score - a.score).map(r => r.post);
    }

    getSuggestions(query: string): string[] {
        if (!query.trim()) return [];
        const normalizedQuery = query.toLowerCase().trim();
        const tokens = new Set<string>();

        // Collect candidate tokens from titles and tags
        for (const post of this.posts) {
            // Titles
            post.meta.title.split(/\s+/).forEach(word => {
                const cleanWord = word.replace(/[^a-z0-9가-힣]/gi, ''); // alphanumeric + korean
                if (cleanWord.length > 2) tokens.add(cleanWord);
            });
            // Tags
            post.meta.tags?.forEach(tag => tokens.add(tag));
        }

        // Filter tokens using Bitap
        const suggestions: string[] = [];
        for (const token of Array.from(tokens)) {
            // Use distance 1 for short tokens to avoid noise
            const dist = token.length < 5 ? 1 : 2;
            if (this.bitap.match(token.toLowerCase(), normalizedQuery, dist)) {
                suggestions.push(token);
            }
        }

        // Sort by length/relevance? For now just return as is (maybe sort by length matching)
        return suggestions.slice(0, 10); // Limit to 10
    }
}
