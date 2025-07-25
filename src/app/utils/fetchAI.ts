import { supabase } from "../lib/supabase"; // Adjust path as needed

export async function fetchAIRecommendation(mood: string, mood_rating: number) {
  try {
    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    // Call your API route (which then calls n8n webhook)
    const response = await fetch("/api/get-recommendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood: mood,
        user_id: user.id,    // ✅ Real user UUID from Supabase Auth
        email: user.email,
        mood_rating: mood_rating, // Pass mood rating to the backend  
      }),
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch AI recommendation");
    }

    const data = await response.json();
    return data.recommendation ?? "No recommendation found.";

  } catch (error) {
    console.error("Error fetching recommendation:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as Error).message === "string" &&
      (error as Error).message === "User not authenticated"
    ) {
      return "Please log in to get recommendations.";
    }

    return "Something went wrong while fetching the recommendation.";
  }
}
