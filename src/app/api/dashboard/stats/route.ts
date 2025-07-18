import { NextRequest, NextResponse } from 'next/server';
import { authGuard } from '../../utils/auth-guard';
import { supabase } from '../../utils/supabase';
import { connectToMongo } from '../../utils/mongo';

export async function GET(request: NextRequest) {
  try {
    const session = await authGuard();
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { db } = await connectToMongo();
    
    // Get journal entries stats
    const totalJournalEntries = await db
      .collection('journal_entries')
      .countDocuments({ userId: session.user.id });

    const recentEntries = await db
      .collection('journal_entries')
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Get last entry date for streak calculation
    const lastEntry = await db
      .collection('journal_entries')
      .findOne(
        { userId: session.user.id },
        { sort: { createdAt: -1 } }
      );

    // Calculate current streak (simplified - daily entries)
    let currentStreak = 0;
    if (lastEntry) {
      const today = new Date();
      const lastEntryDate = new Date(lastEntry.createdAt);
      const daysDiff = Math.floor((today.getTime() - lastEntryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 1) {
        // Count consecutive days with entries
        let checkDate = new Date(lastEntryDate);
        while (checkDate) {
          const dayStart = new Date(checkDate);
          dayStart.setHours(0, 0, 0, 0);
          const dayEnd = new Date(checkDate);
          dayEnd.setHours(23, 59, 59, 999);
          
          const entriesForDay = await db
            .collection('journal_entries')
            .countDocuments({
              userId: session.user.id,
              createdAt: {
                $gte: dayStart,
                $lte: dayEnd,
              },
            });
          
          if (entriesForDay > 0) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
          
          // Limit streak calculation to prevent infinite loop
          if (currentStreak > 30) break;
        }
      }
    }

    // Get mood logs stats
    const { data: moodLogs } = await supabase
      .from('mood_logs')
      .select('*')
      .eq('userId', session.user.id)
      .order('createdAt', { ascending: false })
      .limit(30);

    const totalMoodLogs = moodLogs?.length || 0;
    const averageMood = moodLogs?.length 
      ? moodLogs.reduce((sum, log) => sum + log.mood, 0) / moodLogs.length
      : 0;

    const recentMoods = moodLogs?.slice(0, 5) || [];

    // Get AI recommendations
    const { data: recommendations } = await supabase
      .from('ai_recommendations')
      .select('*')
      .eq('userId', session.user.id)
      .eq('isRead', false)
      .order('createdAt', { ascending: false })
      .limit(3);

    return NextResponse.json({
      stats: {
        totalJournalEntries,
        currentStreak,
        averageMood: Math.round(averageMood * 10) / 10,
        totalMoodLogs,
        lastEntryDate: lastEntry?.createdAt || null,
      },
      recentEntries: recentEntries.slice(0, 3),
      recentMoods,
      aiRecommendations: recommendations || [],
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}