import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';
import { getErrorMessage } from '@/lib/errors';

export const runtime = 'nodejs';

export async function GET() {
    try {
        const prisma = getPrisma();
        const reports = await prisma.report.findMany({
            orderBy: { timestamp: 'desc' },
            take: 5,
        });
        return NextResponse.json(reports);
    } catch (error: unknown) {
        return NextResponse.json(
            { error: getErrorMessage(error) || 'Failed to fetch reports' },
            { status: 500 }
        );
    }
}
