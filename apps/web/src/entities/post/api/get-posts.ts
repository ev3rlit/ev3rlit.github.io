import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta } from '../model/types';
import { SITE_CONFIG } from '@/shared/config/site';

// Recursive function to get all files
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        // Skip 'draft' and 'portfolio' directories at the top level or nested if needed
        // Since we start from 'content', 'draft' and 'portfolio' are likely clear candidates to skip.
        // However, user specifically asked for 'draft' folder and 'portfolio' to be excluded from *this* list (blog posts).
        if (file === 'draft' || file === 'portfolio') return;

        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
        } else {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

export function getAllPostSlugs(): string[] {
    const CONTENT_PATH = path.join(process.cwd(), 'content');
    if (!fs.existsSync(CONTENT_PATH)) return [];

    const files = getAllFiles(CONTENT_PATH);
    return files.map((filePath) => {
        const relativePath = path.relative(CONTENT_PATH, filePath);
        return relativePath.replace(/\.mdx?$/, '').split(path.sep).join('-');
    });
}

export async function getPostList(): Promise<Post[]> {
    const CONTENT_PATH = path.join(process.cwd(), 'content');
    if (!fs.existsSync(CONTENT_PATH)) return [];

    const files = getAllFiles(CONTENT_PATH);

    const posts = files.map((filePath) => {
        const relativePath = path.relative(CONTENT_PATH, filePath);
        // Remove extension
        const pathWithoutExt = relativePath.replace(/\.mdx?$/, '');
        // Split path to parts: [year, month, filename]
        const parts = pathWithoutExt.split(path.sep);

        // Create flattened slug: year-month-filename
        // If user wants to keep hierarchy in URL, we could join with '/', 
        // but flattening is safer for simple slug routing unless we catch-all.
        // Requirement said: "flatten logic... e.g. 2025-05-learning-postgresql"
        const slug = parts.join('-');

        const source = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(source);

        // Filter out posts without frontmatter or title
        if (!data || Object.keys(data).length === 0 || !data.title) {
            return null;
        }

        return {
            slug,
            meta: data as PostMeta,
            content,
        };
    }).filter((post): post is Post => post !== null);

    const isProd = process.env.NODE_ENV === 'production';

    // Filter out drafts in production
    // Default is draft: true, so only show if draft is explicitly false.
    const filteredPosts = isProd
        ? posts.filter(post => post.meta.draft === false)
        : posts;

    // Filter out excluded posts
    const finalPosts = filteredPosts.filter(post => !SITE_CONFIG.exclude.includes(post.slug));

    // Sort by date desc
    return finalPosts.sort((a, b) => {
        const dateA = new Date(a.meta.date);
        const dateB = new Date(b.meta.date);
        return dateB.getTime() - dateA.getTime();
    });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const posts = await getPostList();
    return posts.find((p) => p.slug === slug) || null;
}

export async function getPostWithNeighbors(slug: string) {
    const posts = await getPostList();
    const index = posts.findIndex((p) => p.slug === slug);

    if (index === -1) return null;

    const post = posts[index];
    // "Next" (Newer) is index - 1 (since sorted DESC)
    const nextPost = index > 0 ? posts[index - 1] : null;
    // "Prev" (Older) is index + 1
    const prevPost = index < posts.length - 1 ? posts[index + 1] : null;

    return { post, nextPost, prevPost };
}

export async function getPageContent(fileName: string): Promise<Post | null> {
    const CONTENT_PATH = path.join(process.cwd(), 'content');
    const filePath = path.join(CONTENT_PATH, fileName);
    if (!fs.existsSync(filePath)) return null;

    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    return {
        slug: fileName.replace(/\.mdx?$/, ''),
        meta: data as PostMeta,
        content,
    };
}

