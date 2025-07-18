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

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '30');
    const days = parseInt(searchParams.get('days') || '30');

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const { data, error } = await supabase
      .from('mood_logs')
      .select('*')
      .eq('userId', session.user.id)
      .gte('createdAt', fromDate.toISOString())
      .order('createdAt', { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      history: data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}