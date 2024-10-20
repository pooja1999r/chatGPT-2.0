import { createClient } from '../utils/supabase/client'
const supabase = createClient();

export async function getChats() {
    const { data: chats } = await supabase.from("chats").select();
    return chats
}

export async function addChat(chat: any) {
    const { data: chatData } = await supabase.from("chats").insert(chat);
    return chatData
}

export async function updateChatName(chatId: string, chatName: string) {
    const { data: chatData } = await supabase.from("chats").update({ chat_name: chatName }).eq("chat_id", chatId);
    return chatData
}

export async function getMessagesByChatId(chatId: string) {
    const { data: messages } = await supabase.from("message").select().eq("chat_id", chatId);
    return messages
}

export async function addMessage(message: any) {
    const { data: messageData } = await supabase.from("message").insert(message);
    return messageData
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
