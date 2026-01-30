import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Supabase Admin Client to bypass RLS for user lookup
// WARNING: This requires SERVICE_ROLE_KEY which should be kept SECRET
// For this demo, we assume you have set SUPABASE_SERVICE_ROLE_KEY in .env.local
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    // Check if user exists in custom 'profiles' table or auth.users
    // Since we can't search auth.users directly securely on client side, we use admin here.
    // Ideally you should have a public 'profiles' table linked to auth.users
    
    // Example: Searching a 'profiles' table
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('username')
      .eq('email', email)
      .single();

    if (error || !data) {
      // For security, don't reveal if email exists or not in production
      // But for this 'Find ID' feature request, we return 404
      return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });
    }

    return NextResponse.json({ username: data.username });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
