import { describe, it, expect } from 'vitest';
import { BitapSearch } from './BitapSearch';
import { FuzzySearchEngine } from './FuzzySearchEngine';
import { Post } from '@/entities/post/model/types';

// Mock Data
const MOCK_POSTS: Post[] = [
    {
        slug: 'learning-react',
        meta: { title: 'Learning React', date: '2025-01-01', tags: ['React', 'Frontend'] },
        content: ''
    },
    {
        slug: 'javascript-basics',
        meta: { title: 'JavaScript Basics', date: '2025-01-02', tags: ['JavaScript', 'Programming'] },
        content: ''
    },
    {
        slug: 'advanced-nextjs',
        meta: { title: 'Advanced Next.js', date: '2025-01-03', tags: ['Next.js', 'React'] },
        content: ''
    }
];

describe('BitapSearch Algorithm', () => {
    const bitap = new BitapSearch();

    it('should match exact strings', () => {
        expect(bitap.match('apple', 'apple', 0)).toBe(true);
        expect(bitap.match('banana', 'apple', 0)).toBe(false);
    });

    it('should match with distance (typo tolerance)', () => {
        // "aple" vs "apple" (deletion, distance 1)
        expect(bitap.match('apple', 'aple', 1)).toBe(true);
        // "appple" vs "apple" (insertion, distance 1)
        expect(bitap.match('apple', 'appple', 1)).toBe(true);
        // "bpple" vs "apple" (substitution, distance 1)
        expect(bitap.match('apple', 'bpple', 1)).toBe(true);
    });

    it('should fail if distance exceeded', () => {
        // "apple" vs "kpple" -> dist 1. if threshold 0 -> Fail
        expect(bitap.match('apple', 'kpple', 0)).toBe(false);
    });

    it('should handle Korean (Hangul) typos', () => {
        // "안녕하세" vs "안녕하세요" (Missing last char)
        expect(bitap.match('안녕하세요', '안녕하세', 1)).toBe(true);
        // "안뇽하세요" vs "안녕하세요" (Substitution)
        expect(bitap.match('안녕하세요', '안뇽하세요', 1)).toBe(true);
        // "안녕함세요" vs "안녕하세요" (Insertion)
        expect(bitap.match('안녕하세요', '안녕함세요', 1)).toBe(true);

        // Too far: "안녕히가세요" vs "안녕하세요" (Multiple chars diff)
        // 안 녕 하 세 요
        // 안 녕 히 가 세 요
        // "히가" inserted or "하" replaced by "히가" -> Distance >= 2
        // Let's assume strict check for distance 1 fails
        expect(bitap.match('안녕하세요', '안녕히가세요', 1)).toBe(false);
    });
});

describe('FuzzySearchEngine', () => {
    const engine = new FuzzySearchEngine(MOCK_POSTS);

    it('should return exact match posts', () => {
        const results = engine.search('React');
        expect(results.length).toBeGreaterThanOrEqual(1);
        expect(results[0].meta.title).toContain('React');
    });

    it('should return posts with fuzzy match (typo)', () => {
        // "raect" -> "React"
        const results = engine.search('raect');
        expect(results.length).toBeGreaterThanOrEqual(1);
        expect(results[0].meta.title).toContain('React');
    });

    it('should return posts matching tags', () => {
        const results = engine.search('Frontend');
        expect(results.length).toBe(1);
        expect(results[0].slug).toBe('learning-react');
    });

    it('should suggest keywords', () => {
        // "jav" -> "JavaScript"
        const suggestions = engine.getSuggestions('jav');
        expect(suggestions).toContain('JavaScript');

        // "pro" -> "Programming"
        const suggestions2 = engine.getSuggestions('pro');
        expect(suggestions2).toContain('Programming');
    });

    it('should suggest fuzzy keywords', () => {
        // "javascrpt" (missing i) -> "JavaScript"
        const suggestions = engine.getSuggestions('javascrpt');
        expect(suggestions).toContain('JavaScript');
    });
});
