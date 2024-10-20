import { LastChatKey, LocalLLmKey } from "./constant"

export const getLocalLLM = () => localStorage.getItem(LocalLLmKey) || ""

export const setLocalLLM = (llm: string) => localStorage.setItem(LocalLLmKey, llm);

export const getLastChat = () =>  localStorage.getItem(LastChatKey) || ""


export const setLastChat = (chatId: string) =>  localStorage.setItem(LastChatKey, chatId);