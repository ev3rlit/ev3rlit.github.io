import { getAllPostSlugs, getPostWithNeighbors } from '@/entities/post/api/get-posts';
import { PostDetailPage } from '@/views/post-detail/ui/PostDetailPage';
import { notFound } from 'next/navigation';

// Ensure we only generate static paths for known posts
export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const slugs = getAllPostSlugs();
        return slugs.map((slug) => ({
            slug,
        }));
    } catch (error) {
        console.error('[generateStaticParams] Error fetching slugs:', error);
        return [];
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const data = await getPostWithNeighbors(slug);

    if (!data) {
        notFound();
    }

    return <PostDetailPage post={data.post} nextPost={data.nextPost} prevPost={data.prevPost} />;
}
