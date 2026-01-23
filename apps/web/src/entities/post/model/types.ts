export interface PostMeta {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
    draft?: boolean;
    [key: string]: any;
}

export interface Post {
    slug: string;
    meta: PostMeta;
    content: string; // MDX content string
    readingTime?: string;
}
