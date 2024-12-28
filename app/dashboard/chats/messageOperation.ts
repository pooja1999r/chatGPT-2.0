import { LLMsList } from "@/app/_component/constant";
import { getLocalLLM } from "@/app/_component/service";
import { addChat, addMessage, updateChatName } from "@/app/db/action";
import { generateUUID } from "@/app/db/uuidGenerate";
import { getUserInfo } from "@/app/utils/action";

const enum SenderType {
    USER = 'user',
    BOT = 'bot',
}

const epochTime = () => new Date().toISOString();

const getChatParams = (chatId: string, userEmail: string | undefined, chatName?: string) => {
    return {
        created_at: epochTime(),
        updated_at: epochTime(),
        chat_id: chatId,
        user_id: userEmail,
        status: true,
        chat_name: chatName || '',
    }
}

export const storeUserChat = (inputValue: string, chatId: string, messageId: string) =>{
    getUserInfo().then((user) => {

        // store the chat
        const chatParams = getChatParams(chatId, user?.email);
        addChat(chatParams);

        // store the question
        const messageParams = getMessageParams(chatId, inputValue, SenderType.USER, messageId);
        addMessage(messageParams);
    })  
}

const getMessageParams = (chatId: string, inputValue: string, senderType: SenderType, messageId: string) => {

    return {
        chat_id: chatId,
        message_id: messageId,
        message_text: inputValue,
        sender_type: senderType,
        sender_id: getLocalLLM() || LLMsList.GPT3,
        message_type: 'text',
        timestamp: epochTime(),
        // user_id: getUserInfo()?.email,
    }
}

export const chatWithAI = async (value: string, chatId: string, messageId: string) => {
    const data = await fetch('/AIController', {
        method: 'POST',
        body: JSON.stringify({ question: value }),
    })
    const res = await data.json();

    // update the chat name
    updateChatName(chatId, res.name);

    // store the response
    const messageParams = getMessageParams(chatId, res.answer, SenderType.BOT, messageId);
    addMessage(messageParams)


    return res;
}