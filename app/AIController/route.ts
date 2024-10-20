// src/app/chat/route.ts

import OpenAI from "openai";

// Assign API key to variable
const apiKey = process.env.OPEN_AI_SECRET_KEY;
// Initialise OpenAI API
const openai = new OpenAI({ apiKey: apiKey });

export async function POST(req: Request) {
    try {
        const body = await req.text();
        console.log('Received body:', body);
        
        const { question } = JSON.parse(body);
        console.log('Parsed question:', question);

        if (!question) {
            return new Response(JSON.stringify({ error: 'No question provided' }), { status: 400 });
        }

        const response = await openai.chat.completions.create({
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

        return new Response(JSON.stringify(response));
    } catch (error) {
        console.error('Error in POST:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
