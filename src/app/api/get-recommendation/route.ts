import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mood, user_id, email, mood_rating } = body;

    // console.log('🔍 === n8n REQUEST DEBUG ===');
    // console.log('📧 Email:', email);
    // console.log('🆔 User ID:', user_id);
    // console.log('😊 Mood:', mood);
    // console.log('⭐ Mood Rating:', mood_rating);
    // console.log('📅 Date:', new Date().toISOString());

    const n8nPayload = {
      user_id: user_id,
      email: email,
      mood: mood,
      mood_rating: mood_rating,
      note: mood,
      date: new Date().toISOString()
    };

    // console.log('🚀 Sending to n8n webhook:', JSON.stringify(n8nPayload, null, 2));

    // Call your n8n webhook from the backend
    const n8nResponse = await fetch('https://reeham.app.n8n.cloud/webhook-test/ai_recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(n8nPayload),
    });

    // console.log('📡 n8n Response Status:', n8nResponse.status);
    // console.log('📡 n8n Response OK:', n8nResponse.ok);

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('❌ n8n Error Response:', errorText);
      throw new Error('Failed to get recommendation from n8n');
    }

    const result = await n8nResponse.json();
    console.log('✅ n8n Result:', JSON.stringify(result, null, 2));

    return NextResponse.json({
      recommendation: result[0]?.recommendation || "No recommendation found."
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendation' },
      { status: 500 }
    );
  }
}