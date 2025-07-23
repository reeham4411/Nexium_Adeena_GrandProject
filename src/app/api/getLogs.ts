import { NextApiRequest, NextApiResponse } from 'next';
import { Db, Document } from 'mongodb';

interface MoodLog extends Document {
    _id: string;
    mood: string;
    date: Date;
    [key: string]: unknown;
}

interface ConnectToDatabaseResult {
    db: Db;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MoodLog[]>
): Promise<void> {
    const { connectToDatabase }: { connectToDatabase: () => Promise<ConnectToDatabaseResult> } = await import('../lib/mongodb');
    const { db } = await connectToDatabase();
    const logs: MoodLog[] = await db.collection<MoodLog>('mood_logs').find().sort({ date: -1 }).toArray();
    res.status(200).json(logs);
}
