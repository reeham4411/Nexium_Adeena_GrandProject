import { NextRequest, NextResponse } from 'next/server';
import { authGuard } from '../../utils/auth-guard';
import { supabase } from '../../utils/supabase';
import { insertMoodLogSchema } from '../../types';

export async function POST(request: NextRequest) {
  try {
    const session = await authGuard();
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = insertMoodLogSchema.parse({
      ...body,
      userId: session.user.id,
    });

    const { data, error } = await supabase
      .from('mood_logs')
      .insert([validatedData])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Mood logged successfully',
      moodLog: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}