export async function fetchAIRecommendation(mood: string) {
  const res = await fetch('/api/analyzeMood', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood })
  });
  const data = await res.json();
  return data.recommendation;
}
