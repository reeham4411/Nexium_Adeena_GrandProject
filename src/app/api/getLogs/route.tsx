import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  try {
    // console.log(
    //   "🔍 API Route: getLogs called - Reading from Supabase ai_recommendations table"
    // );

    if (!userId) {
      return NextResponse.json(
        { error: "Missing id parameter in query string" },
        { status: 400 }
      );
    }

    console.log("🆔 Filtering logs for user ID:", userId);

    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    console.log("✅ Using service role client to bypass RLS");

    // First, let's check if the table exists and what data is in it
    // const { data: allData } = await supabase
    //   .from("ai_recommendations")
    //   .select("*")
    //   .limit(10);

    // console.log("🔍 ALL data from ai_recommendations table:", allData);
    // console.log("🔍 Any errors fetching sample data:", allError);
    // console.log("🔍 Total records in table:", allData?.length || 0);

    // Check what user IDs exist in the table
    // const userIds = allData?.map((record) => record.user_id) || [];
    // console.log("🔍 User IDs in table:", [...new Set(userIds)]);
    // console.log("🔍 Looking for user ID:", userId);

    // // Also check what columns exist in the table
    // if (allData && allData.length > 0) {
    //   console.log("📋 Table columns:", Object.keys(allData[0]));
    // }

    // Query the ai_recommendations table filtered by user_id
    const { data: aiRecommendations, error } = await supabase
      .from("ai_recommendations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Supabase query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch data from Supabase", details: error.message },
        { status: 500 }
      );
    }

    console.log(
      `📝 Found ${
        aiRecommendations?.length || 0
      } AI recommendation entries for user ${userId}`
    );

    // Log sample entry to see the structure
    // if (aiRecommendations && aiRecommendations.length > 0) {
    //   console.log(
    //     "📋 Sample ai_recommendations entry:",
    //     JSON.stringify(aiRecommendations[0], null, 2)
    //   );
    // }

    // Transform the data to match the expected Log interface
    const transformedLogs = (aiRecommendations || []).map((rec) => ({
      // Map mood_keywords to mood field
      mood: rec.mood_keywords || "No mood description available",

      // Map recommendations field
      recommendation:
        rec.recommendations ||
        rec.recommendation ||
        "No recommendation available",

      // Map created_at to date field
      date: rec.created_at || new Date().toISOString(),

      // Optional fields
      moodRating: undefined, // Not available in current schema
      userId: rec.user_id,

      // Keep original ID for debugging
      originalId: rec.id,
    }));

    // console.log(`📋 Transformed ${transformedLogs.length} log entries`);

    // Filter out entries with no meaningful content
    const filteredLogs = transformedLogs.filter(
      (log) =>
        log.mood !== "No mood description available" ||
        log.recommendation !== "No recommendation available"
    );

    // console.log(`✅ Returning ${filteredLogs.length} valid log entries`);

    // Log first entry for debugging
    // if (filteredLogs.length > 0) {
    //   console.log(
    //     "📋 Sample transformed entry:",
    //     JSON.stringify(filteredLogs[0], null, 2)
    //   );
    // }

    return NextResponse.json(filteredLogs);
  } catch (error) {
    console.error(
      "❌ Error reading from Supabase ai_recommendations table:",
      error
    );
    return NextResponse.json(
      {
        error: "Failed to fetch logs from Supabase",
        details:
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error),
      },
      { status: 500 }
    );
  }
}
