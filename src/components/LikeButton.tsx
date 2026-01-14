'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
    slug: string;
}

export function LikeButton({ slug }: LikeButtonProps) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storageKey = `blog-post-liked-${slug}`;
        const isLiked = localStorage.getItem(storageKey) === 'true';
        setLiked(isLiked);

        // Fetch global likes count
        fetch(`/api/likes?slug=${slug}`)
            .then(res => res.json())
            .then(data => {
                setLikes(data.likes);
            })
            .catch(err => console.error('Failed to fetch likes', err));
    }, [slug]);

    const handleLike = async () => {
        const storageKey = `blog-post-liked-${slug}`;
        const newLikedState = !liked;
        const intent = newLikedState ? 'like' : 'unlike';

        // Optimistic update
        setLiked(newLikedState);
        setLikes(prev => newLikedState ? prev + 1 : prev - 1);

        if (newLikedState) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 1000);
        }

        localStorage.setItem(storageKey, String(newLikedState));

        try {
            await fetch('/api/likes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, intent }),
            });
        } catch (error) {
            console.error('Failed to update likes', error);
            // Revert if failed (optional)
            setLiked(!newLikedState);
            setLikes(prev => newLikedState ? prev - 1 : prev + 1);
        }
    };

    if (!mounted) return null;

    return (
        <button
            onClick={handleLike}
            disabled={liked}
            className={cn(
                "group flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 transition-colors",
                !liked && "hover:bg-accent/50",
                liked && "cursor-default border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10"
            )}
            aria-label="Like this post"
        >
            <div className="relative">
                <Heart
                    className={cn(
                        "h-5 w-5 transition-all duration-300",
                        liked ? "fill-red-500 text-red-500 scale-110" : "text-muted-foreground group-hover:text-red-500/70"
                    )}
                />
                {isAnimating && (
                    <span className="absolute inset-0 block rounded-full ring-2 ring-500 animate-ping opacity-75"></span>
                )}
            </div>
            <span className={cn(
                "text-sm font-medium transition-colors",
                liked ? "text-red-500" : "text-muted-foreground"
            )}>
                {likes} Likes
            </span>
        </button>
    );
}
