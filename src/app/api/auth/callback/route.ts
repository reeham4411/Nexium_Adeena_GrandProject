import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../utils/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type');

    if (!token_hash || !type) {
      return NextResponse.json(
        { message: 'Missing token or type' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    });

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    // Create profile if it doesn't exist
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!profile && !profileError) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          email: data.user.email!,
          firstName: data.user.user_metadata?.first_name || null,
          lastName: data.user.user_metadata?.last_name || null,
          avatar: data.user.user_metadata?.avatar_url || null,
        });
      }
    }

    return NextResponse.json({
      message: 'Authentication successful',
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}