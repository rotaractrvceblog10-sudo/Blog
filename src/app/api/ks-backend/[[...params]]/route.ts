import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ status: 'API_IS_REACHABLE', timestamp: new Date().toISOString() });
}

export const dynamic = 'force-dynamic';
