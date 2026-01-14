'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SearchBar } from '@/components/SearchBar';

interface Post {
    slug: string;
    entry: {
        title: string;
        coverImage: string | null;
        excerpt: string;
        date: string | null;
        category: string;
        author: string;
    };
    readingTime: string;
}

interface BlogPageClientProps {
    posts: Post[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = useMemo(() => {
        if (!searchQuery) return posts;
        const query = searchQuery.toLowerCase();
        return posts.filter((post) =>
            post.entry.title.toLowerCase().includes(query) ||
            post.entry.excerpt.toLowerCase().includes(query) ||
            post.entry.author.toLowerCase().includes(query)
        );
    }, [posts, searchQuery]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <Breadcrumbs />
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Our <span className="text-[#c42964]">Blog</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        Stories, poems, and updates from the Rotaract Club of RVCE.
                    </p>
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-premium hover-lift"
                        >
                            <Link href={`/blog/${post.slug}`} className="relative h-48 overflow-hidden">
                                {post.entry.coverImage ? (
                                    <Image
                                        src={post.entry.coverImage}
                                        alt={post.entry.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-muted">
                                        <span className="text-muted-foreground">No Image</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                    {post.entry.category}
                                </div>
                            </Link>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{post.entry.date}</span>
                                    <span>•</span>
                                    <span>{post.readingTime}</span>
                                </div>
                                <Link href={`/blog/${post.slug}`}>
                                    <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                        {post.entry.title}
                                    </h3>
                                </Link>
                                <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
                                    {post.entry.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">
                                        {post.entry.author[0]}
                                    </div>
                                    {post.entry.author}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No posts found matching your search.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
