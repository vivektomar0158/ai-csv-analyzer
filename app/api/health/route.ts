import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';
import { getErrorMessage } from '@/lib/errors';

export const runtime = 'nodejs';

export async function GET() {
    const status: {
        backend: boolean;
        database: boolean;
        ai: boolean;
        databaseError?: string;
        aiError?: string;
    } = {
        backend: true,
        database: false,
        ai: false,
    };

    try {
        // Check DB
        console.log('Health check: Checking Database...');
        const prisma = getPrisma();
        await prisma.$queryRaw`SELECT 1`;
        status.database = true;
        console.log('Health check: Database OK');
    } catch (error: unknown) {
        const msg = getErrorMessage(error);
        status.databaseError = msg;
        console.error('Health check: Database failed:', msg);
    }

    try {
        // Check AI connection
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            status.aiError = 'OPENROUTER_API_KEY is not set';
            console.error('Health check: OPENROUTER_API_KEY is not set');
            return NextResponse.json(status);
        }

        console.log('Health check: Checking AI API...');
        const aiRes = await fetch('https://openrouter.ai/api/v1/models', {
            headers: { Authorization: `Bearer ${apiKey}` },
        });

        if (aiRes.ok) {
            status.ai = true;
            console.log('Health check: AI API OK');
        } else {
            status.aiError = `OpenRouter returned HTTP ${aiRes.status}`;
            console.error('Health check: AI API failed with status', aiRes.status);
        }
    } catch (error: unknown) {
        const msg = getErrorMessage(error);
        status.aiError = msg;
        console.error('Health check: AI API failed:', msg);
    }

    return NextResponse.json(status);
}
