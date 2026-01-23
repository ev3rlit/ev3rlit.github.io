import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Only allow in development
const isDev = process.env.NODE_ENV === 'development';

const CONTENT_PATH = path.join(process.cwd(), 'content');

function getLatestMtime(dirPath: string): number {
    let maxMtime = 0;

    if (!fs.existsSync(dirPath)) return 0;

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const nestedMtime = getLatestMtime(fullPath);
            if (nestedMtime > maxMtime) maxMtime = nestedMtime;
        } else {
            if (stat.mtimeMs > maxMtime) maxMtime = stat.mtimeMs;
        }
    }

    return maxMtime;
}

export async function GET() {
    if (!isDev) {
        return NextResponse.json({ mtime: 0 });
    }

    try {
        const mtime = getLatestMtime(CONTENT_PATH);
        return NextResponse.json({ mtime });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to watch content' }, { status: 500 });
    }
}
