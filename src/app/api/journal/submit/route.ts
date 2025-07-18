import { NextRequest, NextResponse } from 'next/server';
import { authGuard } from '../../utils/auth-guard';
import { connectToMongo } from '../../utils/mongo';
import { journalEntrySchema } from '../../types';

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
    const validatedData = journalEntrySchema.parse({
      ...body,
      userId: session.user.id,
    });

    const { db } = await connectToMongo();
    const journalEntry = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('journal_entries').insertOne(journalEntry);
    
    // Trigger n8n webhook for AI analysis
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            journalEntryId: result.insertedId,
            content: validatedData.content,
            userId: session.user.id,
          }),
        });
      } catch (webhookError) {
        console.error('Failed to trigger n8n webhook:', webhookError);
      }
    }

    return NextResponse.json({
      message: 'Journal entry saved successfully',
      entryId: result.insertedId,
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