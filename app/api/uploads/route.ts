import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, bucket, path, filename, mime_type, size, public: is_public } = body;

    if (!bucket || !path || !filename) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const payload: any = { bucket, path, filename, mime_type, size, public: !!is_public };
    if (user_id) payload.user_id = user_id;

    const { data, error } = await supabaseAdmin.from('uploaded_files').insert([payload]).select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data![0]);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
