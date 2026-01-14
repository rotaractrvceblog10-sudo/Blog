'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface ViewCounterProps {
    slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        // Determine if we should count this view? 
        // For simple MVP we just POST immediately.

        fetch('/api/views', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug }),
        })
            .then(res => res.json())
            .then(data => {
                setViews(data.views);
            })
            .catch(err => console.error('Failed to increment views', err));
    }, [slug]);

    if (views === null) return null; // Or a loading skeleton

    return (
        <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {views.toLocaleString()}
        </span>
    );
}
