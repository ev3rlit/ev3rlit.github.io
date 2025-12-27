import AboutPage from "@/views/about/ui/AboutPage";
import { getPageContent } from "@/entities/post/api/get-posts";
import { notFound } from "next/navigation";

export default async function Page() {
    const post = await getPageContent('about.mdx');

    if (!post) {
        return notFound();
    }

    return <AboutPage post={post} />;
}
