import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
        return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    // Always create backend streaming url directly using the service key since bucket is private
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    try {
        // Create a signed URL valid for 1 hour (3600 seconds)
        const { data, error } = await supabase.storage
            .from('products')
            .createSignedUrl(path, 3600);

        if (error) {
            console.error('Storage error:', error);
            return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
        }

        return NextResponse.json({ url: data.signedUrl });
    } catch (err) {
        console.error('API Storage error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
