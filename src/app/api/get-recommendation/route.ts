import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mood, user_id, email,mood_rating } = body;

    // Call your n8n webhook from the backend
    const n8nResponse = await fetch('https://reeham.app.n8n.cloud/webhook/ai_recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        email: email,
        mood: mood,
        mood_rating: mood_rating, // Pass mood rating to n8n
        note: mood,
        date: new Date().toISOString()
      }),
    });

    if (!n8nResponse.ok) {
      throw new Error('Failed to get recommendation from n8n');
    }

    const result = await n8nResponse.json();
    
    return NextResponse.json({ 
      recommendation: result[0]?.recommendation || "No recommendation found." 
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendation' },
      { status: 500 }
    );
  }
}