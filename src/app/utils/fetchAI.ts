export async function fetchAIRecommendation(mood: string) {
  try {
    const response = await fetch("/api/get-recommendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch AI recommendation");
    }

    const data = await response.json();
    return data.recommendation ?? "No recommendation found.";
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    return "Something went wrong while fetching the recommendation.";
  }
}
