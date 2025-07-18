import { NextRequest, NextResponse } from 'next/server';
import { authGuard } from '../../utils/auth-guard';
import { connectToMongo } from '../../utils/mongo';
import { supabase } from '../../utils/supabase';
import { aiAnalysisSchema } from '../../types';

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
    const validatedData = aiAnalysisSchema.parse({
      ...body,
      userId: session.user.id,
    });

    const { db } = await connectToMongo();
    const analysis = {
      ...validatedData,
      createdAt: new Date(),
    };

    const result = await db.collection('ai_analysis_log').insertOne(analysis);

    // Create AI recommendations based on analysis
    if (validatedData.sentiment === 'negative' && validatedData.confidence > 70) {
      await supabase.from('ai_recommendations').insert({
        userId: session.user.id,
        type: 'mood_support',
        title: 'Consider reaching out for support',
        description: 'Your recent journal entries suggest you might benefit from talking to someone you trust or a mental health professional.',
        confidence: validatedData.confidence,
      });
    }

    if (validatedData.keywords.includes('anxiety') || validatedData.keywords.includes('stress')) {
      await supabase.from('ai_recommendations').insert({
        userId: session.user.id,
        type: 'coping_strategy',
        title: 'Try relaxation techniques',
        description: 'Based on your journal entries, you might find breathing exercises or meditation helpful for managing stress.',
        confidence: validatedData.confidence,
      });
    }

    return NextResponse.json({
      message: 'AI analysis saved successfully',
      analysisId: result.insertedId,
      analysis,
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
    const journalEntryId = searchParams.get('journalEntryId');

    if (!journalEntryId) {
      return NextResponse.json(
        { message: 'Journal entry ID is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToMongo();
    const analysis = await db
      .collection('ai_analysis_log')
      .findOne({ 
        journalEntryId,
        userId: session.user.id 
      });

    if (!analysis) {
      return NextResponse.json(
        { message: 'Analysis not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      analysis,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}