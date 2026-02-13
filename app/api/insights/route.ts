import { NextRequest, NextResponse } from 'next/server';
import { generateInsights } from '@/lib/openrouter';
import { getPrisma } from '@/lib/db';
import { getErrorMessage } from '@/lib/errors';

export const runtime = 'nodejs';

interface InsightsRequestBody {
    csvData?: string;
    filename?: string;
}

export async function POST(req: NextRequest) {
    console.log('POST /api/insights started at:', new Date().toISOString());
    try {
        const { csvData, filename }: InsightsRequestBody = await req.json();

        if (!csvData || typeof csvData !== 'string') {
            return NextResponse.json({ error: 'CSV data is required' }, { status: 400 });
        }

        const insights = await generateInsights(csvData);

        // Save to database (best-effort: insights should still be returned even if DB is down)
        let reportId: number | null = null;
        let warning: string | undefined;

        try {
            const prisma = getPrisma();
            const report = await prisma.report.create({
                data: {
                    filename: filename || 'unknown.csv',
                    insights: insights,
                },
            });
            reportId = report.id;
        } catch (error: unknown) {
            warning = `Report was not saved: ${getErrorMessage(error)}`;
            console.error('Report save failed:', error);
        }

        return NextResponse.json({ insights, reportId, warning });
    } catch (error: unknown) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: getErrorMessage(error) || 'Failed to generate insights' },
            { status: 500 }
        );
    }
}
