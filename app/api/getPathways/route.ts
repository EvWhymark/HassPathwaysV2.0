import { NextResponse } from 'next/server';
import { getPathways } from '@/lib/mongo/test';

export async function GET() {
    try {
        const result = await getPathways("2020-2021") || "2022-2023";

        if ('error' in result) {
            throw new Error(result.error);
        }

        return NextResponse.json({ status: "ok", files: result.data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
    }
}

export function POST() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}