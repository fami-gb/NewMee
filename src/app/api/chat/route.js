import { GoogleGenerativeAI } from "@google/generative-ai";

// .env.localからAPIキーを取得
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: { message: 'Message is required.' } }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `あなたはフレンドリーなファッションアドバイザーです。
ユーザーの悩みに対して、ギャルっぽく、ポジティブで、親しみやすいアドバイスをしてください。
MarkDown形式は使用しないでください。改行する際は<br>を使用してください。` }],
        },
        {
          role: "model",
          parts: [{ text: "OK！任せて！どんなことでも聞いてね〜💖" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ reply: text }), { status: 200 });

  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return new Response(JSON.stringify({ error: { message: 'Internal Server Error' } }), { status: 500 });
  }
}
