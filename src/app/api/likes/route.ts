import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { slug, intent } = body;

        if (!slug) {
            return new NextResponse('Slug is required', { status: 400 });
        }

        let newCount;
        if (intent === 'unlike') {
            newCount = await redis.decr(`likes:${slug}`);
            // Prevent negative likes just in case
            if (newCount < 0) {
                await redis.set(`likes:${slug}`, 0);
                newCount = 0;
            }
        } else {
            newCount = await redis.incr(`likes:${slug}`);
        }

        return NextResponse.json({ likes: newCount });
    } catch (error) {
        console.error('Error in /api/likes POST:', error);
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

        const likes = await redis.get<number>(`likes:${slug}`);

        return NextResponse.json({ likes: likes ?? 0 });
    } catch (error) {
        console.error('Error in /api/likes GET:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
