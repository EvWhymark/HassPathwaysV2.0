import { NextResponse, NextRequest } from 'next/server';
import { getPathways } from '@/lib/mongo/test';

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams;

        const year: string = params.get("catalogYear") || "2022-2023";
        const department: string = params.get("department") || "";
        const query: string = params.get("searchString") || "";

        const result = await getPathways(year, department, query);

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