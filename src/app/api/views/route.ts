import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const slug = body.slug;

        if (!slug) {
            return new NextResponse('Slug is required', { status: 400 });
        }

        // Increment views
        // Often we might want to deduplicate by IP, but for simplest MVP we just incr
        const newCount = await redis.incr(`views:${slug}`);

        return NextResponse.json({ views: newCount });
    } catch (error) {
        console.error('Error in /api/views POST:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return new NextResponse('Slug is required', { status: 400 });
        }

        const views = await redis.get<number>(`views:${slug}`);

        return NextResponse.json({ views: views ?? 0 });
    } catch (error) {
        console.error('Error in /api/views GET:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
