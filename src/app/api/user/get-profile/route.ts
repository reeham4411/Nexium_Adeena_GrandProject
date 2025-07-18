import { NextRequest, NextResponse } from 'next/server';
import { authGuard } from '../../utils/auth-guard';
import { supabase } from '../../utils/supabase';

export async function GET(request: NextRequest) {
  try {
    const session = await authGuard();
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    // Also get user settings
    const { data: settings } = await supabase
      .from('settings')
      .select('*')
      .eq('userId', session.user.id)
      .single();

    return NextResponse.json({
      profile: data,
      settings: settings || null,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}