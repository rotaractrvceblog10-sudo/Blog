import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({
    config,
});

// Adding a custom export to verify this file is hit
export const debug = "ACTIVE_V2";

export const dynamic = 'force-dynamic';
