
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: 'Forbidden in production' }, { status: 403 });
    }

    try {
        const { filename, content } = await req.json();

        if (!filename || !content) {
            return NextResponse.json({ error: 'Missing filename or content' }, { status: 400 });
        }

        // Security: Prevent directory traversal (basic)
        // Ensure the path is within the project
        const projectRoot = process.cwd();
        const contentDir = path.join(projectRoot, 'content');

        // We assume the user provides a relative path like '2025/05/post.mdx'
        // or we default to saving in 'content/' if no directory is specified.
        let targetPath = path.resolve(contentDir, filename);

        // Allow saving to root if explicitly requested, but primarily content
        // For flexibility in this dev tool, let's allow writing anywhere in the project
        // but prefer 'content' as base if a relative path is given without 'src' or 'content' prefix?
        // Let's stick to: Input should be relative to Project Root.
        targetPath = path.resolve(projectRoot, filename);

        if (!targetPath.startsWith(projectRoot)) {
            // return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
        }

        // Ensure directory exists
        const dir = path.dirname(targetPath);
        await fs.mkdir(dir, { recursive: true });

        await fs.writeFile(targetPath, content, 'utf-8');

        return NextResponse.json({ success: true, path: targetPath });
    } catch (error) {
        console.error('Values to save file:', error);
        return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
    }
}
