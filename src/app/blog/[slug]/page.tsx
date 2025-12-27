import { getPostList, getPostWithNeighbors } from '@/entities/post/api/get-posts';
import { PostDetailPage } from '@/views/post-detail/ui/PostDetailPage';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = await getPostList();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getPostWithNeighbors(params.slug);

    if (!data) {
        notFound();
    }

    return <PostDetailPage post={data.post} nextPost={data.nextPost} prevPost={data.prevPost} />;
}
