import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta } from '../model/types';
import { SITE_CONFIG } from '@/shared/config/site';

// Recursive function to get all files
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                arrayOfFiles.push(path.join(dirPath, '/', file));
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

        return {
            slug,
            meta: data as PostMeta,
            content,
        };
    });

    const isProd = process.env.NODE_ENV === 'production';

    // Filter out drafts in production
    const filteredPosts = isProd
        ? posts.filter(post => !post.meta.draft)
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

// Portfolio API functions (3-level structure: projects → experiences → detail)

// Get all portfolio projects (reads index.mdx from each project folder)
export async function getPortfolioProjects(): Promise<Post[]> {
    const PORTFOLIO_PATH = path.join(process.cwd(), 'content', 'portfolio');
    if (!fs.existsSync(PORTFOLIO_PATH)) return [];

    const dirs = fs.readdirSync(PORTFOLIO_PATH).filter((item) => {
        const itemPath = path.join(PORTFOLIO_PATH, item);
        return fs.statSync(itemPath).isDirectory();
    });

    const projects = dirs.map((dirName) => {
        const indexPath = path.join(PORTFOLIO_PATH, dirName, 'index.mdx');
        if (!fs.existsSync(indexPath)) return null;

        const source = fs.readFileSync(indexPath, 'utf8');
        const { data, content } = matter(source);

        return {
            slug: dirName,
            meta: data as PostMeta,
            content,
        };
    }).filter((p): p is Post => p !== null);

    return projects.sort((a, b) => {
        const orderA = a.meta.order ?? 999;
        const orderB = b.meta.order ?? 999;
        return orderA - orderB;
    });
}

// Get single project by slug
export async function getProjectBySlug(projectSlug: string): Promise<Post | null> {
    const PORTFOLIO_PATH = path.join(process.cwd(), 'content', 'portfolio');
    const indexPath = path.join(PORTFOLIO_PATH, projectSlug, 'index.mdx');

    if (!fs.existsSync(indexPath)) return null;

    const source = fs.readFileSync(indexPath, 'utf8');
    const { data, content } = matter(source);

    return {
        slug: projectSlug,
        meta: data as PostMeta,
        content,
    };
}

// Get experiences for a project (all mdx files except index.mdx)
export async function getExperiencesByProject(projectSlug: string): Promise<Post[]> {
    const PROJECT_PATH = path.join(process.cwd(), 'content', 'portfolio', projectSlug);
    if (!fs.existsSync(PROJECT_PATH)) return [];

    const files = fs.readdirSync(PROJECT_PATH).filter(
        (file) => (file.endsWith('.md') || file.endsWith('.mdx')) && file !== 'index.mdx'
    );

    const experiences = files.map((fileName) => {
        const filePath = path.join(PROJECT_PATH, fileName);
        const source = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(source);

        return {
            slug: fileName.replace(/\.mdx?$/, ''),
            meta: data as PostMeta,
            content,
        };
    });

    return experiences.sort((a, b) => {
        const orderA = a.meta.order ?? 999;
        const orderB = b.meta.order ?? 999;
        return orderA - orderB;
    });
}

// Get single experience detail
export async function getExperienceDetail(
    projectSlug: string,
    experienceSlug: string
): Promise<Post | null> {
    const filePath = path.join(
        process.cwd(),
        'content',
        'portfolio',
        projectSlug,
        `${experienceSlug}.mdx`
    );

    if (!fs.existsSync(filePath)) return null;

    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    return {
        slug: experienceSlug,
        meta: data as PostMeta,
        content,
    };
}

// Get experience with neighbors for slide navigation
export async function getExperienceWithNeighbors(projectSlug: string, experienceSlug: string) {
    const experiences = await getExperiencesByProject(projectSlug);
    const index = experiences.findIndex((e) => e.slug === experienceSlug);

    if (index === -1) return null;

    const experience = experiences[index];
    const prevExperience = index > 0
        ? experiences[index - 1]
        : experiences[experiences.length - 1];
    const nextExperience = index < experiences.length - 1
        ? experiences[index + 1]
        : experiences[0];

    return { experience, prevExperience, nextExperience, total: experiences.length, current: index + 1 };
}
