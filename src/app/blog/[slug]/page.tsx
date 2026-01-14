import Link from "next/link";
import Image from "next/image";
import { reader } from "@/lib/keystatic";
import { DocumentRenderer } from '@keystatic/core/renderer';
import { notFound } from "next/navigation";
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { calculateReadingTime } from '@/lib/readingTime';
import { LikeButton } from '@/components/LikeButton';
import { ViewCounter } from '@/components/ViewCounter';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await reader.collections.posts.read(slug);

    if (!post) {
        notFound();
    }

    const content = await post.content();
    const readingTime = calculateReadingTime(JSON.stringify(content));

    return (
        <div className="min-h-screen bg-background">
            <ScrollProgress />
            <Navbar />

            <main className="container mx-auto max-w-3xl px-4 py-12">
                <Breadcrumbs />
                <Link href="/blog" className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
                    ← Back to Blog
                </Link>

                <article>
                    <div className="mb-8">
                        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{readingTime}</span>
                            <span>•</span>
                            <ViewCounter slug={slug} />
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
                        <div className="flex items-center gap-3 border-b pb-8">
                            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold">
                                {post.author[0]}
                            </div>
                            <div>
                                <p className="text-sm font-medium">{post.author}</p>
                            </div>
                        </div>
                    </div>

                    {post.coverImage && (
                        <div className="relative mb-10 h-[400px] w-full overflow-hidden rounded-xl">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                        <DocumentRenderer document={content} />
                    </div>

                    <div className="mt-12 flex justify-center">
                        <LikeButton slug={slug} />
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
