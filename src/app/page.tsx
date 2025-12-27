import { getPostList } from '@/entities/post/api/get-posts';
import HomePage from '@/views/home/ui/HomePage';

export default async function Page() {
    const posts = await getPostList();
    return <HomePage posts={posts} />;
}
