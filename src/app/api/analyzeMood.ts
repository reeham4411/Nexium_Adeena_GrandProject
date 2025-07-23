import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Db } from 'mongodb';

interface MoodRequestBody {
  mood: string;
}

interface AIResponse {
  recommendation: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  // Get Supabase user
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { mood }: MoodRequestBody = req.body;
  const user_id = user.id;

  // Send mood + user_id to n8n
  const aiRes: Response = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood, user_id }),
  });

  const { recommendation }: AIResponse = await aiRes.json();

  // Optional: save to MongoDB
  const { connectToDatabase } = await import('../lib/mongodb');
  const { db }: { db: Db } = await connectToDatabase();
  await db.collection('mood_logs').insertOne({
    mood,
    recommendation,
    user_id,
    date: new Date(),
  });

  res.status(200).json({ recommendation });
}
