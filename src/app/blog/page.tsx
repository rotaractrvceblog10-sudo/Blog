import { reader } from '@/lib/keystatic';
import { BlogPageClient } from './BlogPageClient';
import { calculateReadingTime } from '@/lib/readingTime';

export default async function BlogPage() {
    const posts = await reader.collections.posts.all();

    // Transform posts to remove the content function (not serializable)
    const serializedPosts = await Promise.all(posts.map(async (post) => {
        const content = await post.entry.content();
        const readingTime = calculateReadingTime(JSON.stringify(content));
        return {
            slug: post.slug,
            entry: {
                title: post.entry.title,
                coverImage: post.entry.coverImage,
                excerpt: post.entry.excerpt,
                date: post.entry.date,
                category: post.entry.category,
                author: post.entry.author,
            },
            readingTime,
        };
    }));

    return <BlogPageClient posts={serializedPosts} />;
}
