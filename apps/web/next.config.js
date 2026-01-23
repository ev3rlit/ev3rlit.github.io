/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: isProd ? 'export' : undefined,
    images: {
        unoptimized: true,
    },
    transpilePackages: ['@repo/whiteboard-ui', '@repo/whiteboard-bridge', '@repo/mdx-logic'],
};

module.exports = nextConfig;
