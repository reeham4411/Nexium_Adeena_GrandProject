import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mood } = body;

    const response = await fetch("https://reeham.app.n8n.cloud/webhook/ai_recommendation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood }),
    });

    if (!response.ok) {
         const errText = await response.text();
         console.error("n8n responded with error:", errText);
      return NextResponse.json({ error: "Failed to fetch from n8n" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
     console.error("API Route Error:", error); 
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}