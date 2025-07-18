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
    const limit = parseInt(searchParams.get('limit') || '10');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    let query = supabase
      .from('ai_recommendations')
      .select('*')
      .eq('userId', session.user.id);

    if (unreadOnly) {
      query = query.eq('isRead', false);
    }

    const { data, error } = await query
      .order('createdAt', { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      recommendations: data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await authGuard();
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { recommendationId, isRead } = body;

    if (!recommendationId) {
      return NextResponse.json(
        { message: 'Recommendation ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('ai_recommendations')
      .update({ isRead })
      .eq('id', recommendationId)
      .eq('userId', session.user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Recommendation updated successfully',
      recommendation: data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}