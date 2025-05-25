import ChatModel from "@/lib/models/ChatModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/config/connectDB";

export async function POST(req) {
    await connectDB() ; 
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized: No session valid" }, { status: 401 });
  }

  const body = await req.json();
  const userMessage = body.message;

  if (!userMessage || typeof userMessage !== "string") {
    return NextResponse.json({ message: "Message invalid" }, { status: 400 });
  }

  try {
    const DAILY_LIMITE = parseInt(process.env.DAILY_LIMITE, 10);
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const request_day = await ChatModel.countDocuments({
      userId: session.user.id,
      createdAt: { $gte: startOfDay },
    });

    // console.log("Nbre limite ---->", DAILY_LIMITE);
    // console.log("Nbre requette --->", request_day);

    if (request_day >= DAILY_LIMITE) {
      console.log("Limit reached: Chatbot", request_day);
      return NextResponse.json({ error: "Vous avez atteint la limite journalière, revenez demain" }, { status: 429 });
    }

    
   const chat= await ChatModel.create({
      userId: session.user.id,  
      message: userMessage
    });

    // Appel à l'API externe pour obtenir la réponse
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'Referer': 'http://localhost:3000',
        'X-Title': 'KawouBot',
      },
      body: JSON.stringify({
        // model: 'mistralai/mistral-7b-instruct',
        model: 'gpt-3.5-turbo',  
        messages: [
          { role: 'system', content: 'Réponds de manière concise, claire et précise en fonction du message reçu.' },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur API:', errorData);
      return NextResponse.json({ error: 'Erreur API', message: errorData.message, details: errorData }, { status: 500 });
    }

    const data = await response.json();

    if (!data?.choices?.[0]?.message?.content) {
      console.error('Aucune réponse valide reçue:', data);
      return NextResponse.json({ error: 'Aucune réponse reçue de l’API', details: data }, { status: 500 });
    }

    return NextResponse.json({ reply: data.choices[0].message.content }, { status: 200 });

  } catch (error) {
    console.error('Internal error server:', error.message);
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 });
  }
}
