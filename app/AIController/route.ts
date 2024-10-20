// src/app/chat/route.ts

import OpenAI from "openai";

// Assign API key to variable
const apiKey = process.env.OPEN_AI_SECRET_KEY;
// Initialise OpenAI API
const openai = new OpenAI({ apiKey: apiKey });

export async function POST(req: Request) {
    try {
        const body = await req.text();
        
        const { question } = JSON.parse(body);

        if (!question) {
            return new Response(JSON.stringify({ error: 'No question provided' }), { status: 400 });
        }
        // First, generate a chat name
        const chatNameResponse = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant. Generate a short, catchy name for this chat based on the user's question.",
                },
                {
                    role: "user",
                    content: `Generate a chat name for this question: ${question}`,
                },
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 20,
        });

        const chatName = chatNameResponse.choices[0].message.content?.trim();

        // Then, generate the answer to the user's question
        const answerResponse = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant who supports Liverpool FC",
                },
                {
                    role: "user",
                    content: question,
                },
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 300,
        });

        const answer = answerResponse.choices[0].message.content?.trim();

        const response = {
            name: chatName,
            id: answerResponse.id,
            answer: answer,
            sender_id: answerResponse.choices[0].message.role,
            model: answerResponse.model,
        };

        return new Response(JSON.stringify(response));
    } catch (error) {
        console.error('Error in POST:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
