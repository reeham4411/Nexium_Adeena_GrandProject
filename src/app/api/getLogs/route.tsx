import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";

export async function GET() {
  try {
    console.log(
      "🔍 API Route: getLogs called - Reading from n8n managed collections"
    );

    const { db } = await connectToDatabase();
    console.log("✅ Database connected successfully");

    // Get data from your n8n managed collections
    const moodLogsCollection = db.collection("mood_logs");
    const aiAnalysisCollection = db.collection("ai_analysis_log");

    console.log(
      "📊 Reading from n8n managed collections: mood_logs and ai_analysis_log"
    );

    // Get mood ratings (sorted by date, most recent first)
    const moodLogs = await moodLogsCollection
      .find({})
      .sort({ date: -1, timestamp: -1, _id: -1 })
      .toArray();
    console.log(`📝 Found ${moodLogs.length} mood rating entries`);

    // Get AI analysis logs (sorted by timestamp, most recent first)
    const aiLogs = await aiAnalysisCollection
      .find({})
      .sort({ timestamp: -1, date: -1, _id: -1 })
      .toArray();
    console.log(`🤖 Found ${aiLogs.length} AI analysis entries`);

    // Log sample entries to see the structure
    if (moodLogs.length > 0) {
      console.log(
        "📋 Sample mood_logs entry:",
        JSON.stringify(moodLogs[0], null, 2)
      );
    }
    if (aiLogs.length > 0) {
      console.log(
        "📋 Sample ai_analysis_log entry:",
        JSON.stringify(aiLogs[0], null, 2)
      );
    }

    // Combine the data - try multiple strategies to match entries
    const combinedLogs = aiLogs.map((aiLog, index) => {
      // Strategy 1: Try to match by user email and timestamp proximity
      let matchingMoodLog = moodLogs.find((moodLog) => {
        if (
          aiLog.user_email &&
          moodLog.user_email &&
          aiLog.user_email === moodLog.user_email
        ) {
          const aiTime = new Date(aiLog.timestamp || aiLog.date || 0);
          const moodTime = new Date(moodLog.date || moodLog.timestamp || 0);
          const timeDiff = Math.abs(aiTime.getTime() - moodTime.getTime());
          return timeDiff < 10 * 60 * 1000; // Within 10 minutes
        }
        return false;
      });

      // Strategy 2: If no match by email+time, try just by index (if they're in same order)
      if (!matchingMoodLog && moodLogs[index]) {
        matchingMoodLog = moodLogs[index];
      }

      // Strategy 3: If still no match, try the closest timestamp
      if (!matchingMoodLog) {
        const aiTime = new Date(aiLog.timestamp || aiLog.date || 0);
        matchingMoodLog = moodLogs.reduce((closest, current) => {
          const currentTime = new Date(current.date || current.timestamp || 0);
          const closestTime = new Date(
            closest?.date || closest?.timestamp || 0
          );

          const currentDiff = Math.abs(
            aiTime.getTime() - currentTime.getTime()
          );
          const closestDiff = Math.abs(
            aiTime.getTime() - closestTime.getTime()
          );

          return currentDiff < closestDiff ? current : closest;
        }, moodLogs[0]);
      }

      return {
        // Mood description - try different field names
        mood:
          aiLog.journal ||
          aiLog.note ||
          aiLog.mood ||
          aiLog.description ||
          "No mood description available",

        // AI recommendation - try different field names
        recommendation:
          aiLog.ai_response ||
          aiLog.response ||
          aiLog.recommendation ||
          aiLog.analysis ||
          "No recommendation available",

        // Date/timestamp - try different field names
        date:
          aiLog.timestamp ||
          aiLog.date ||
          aiLog.created_at ||
          new Date().toISOString(),

        // Mood rating - try different field names
        moodRating:
          matchingMoodLog?.mood_rating ||
          matchingMoodLog?.rating ||
          matchingMoodLog?.score ||
          0,

        // User info
        userEmail: aiLog.user_email || matchingMoodLog?.user_email || "unknown",

        // Keep original IDs for debugging
        aiLogId: aiLog._id,
        moodLogId: matchingMoodLog?._id,
      };
    });

    console.log(`📋 Combined ${combinedLogs.length} log entries`);

    // Filter out entries with no meaningful content
    const filteredLogs = combinedLogs.filter(
      (log) =>
        log.mood !== "No mood description available" ||
        log.recommendation !== "No recommendation available"
    );

    console.log(`✅ Returning ${filteredLogs.length} valid log entries`);

    // Log first entry for debugging
    if (filteredLogs.length > 0) {
      console.log(
        "📋 Sample combined entry:",
        JSON.stringify(filteredLogs[0], null, 2)
      );
    }

    return NextResponse.json(filteredLogs);
  } catch (error) {
    console.error("❌ Error reading from n8n collections:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch logs from n8n collections",
        details:
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error),
      },
      { status: 500 }
    );
  }
}
