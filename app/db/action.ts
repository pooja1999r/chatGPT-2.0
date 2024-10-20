import { createClient } from '../utils/supabase/client'
const supabase = createClient();

export async function getChats() {
    const { data: chats } = await supabase.from("chats").select();
    return chats
}

export async function getMessages() {
    const { data: messages } = await supabase.from("messages").select();
    return messages
}

export async function postChatGetAIResponse(question: string) {
    const response = await fetch("/AIController", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
    });

    if (!response.ok) {
        console.error('Error:', response.status, response.statusText);
        return;
    }

    return await response.json();
}
