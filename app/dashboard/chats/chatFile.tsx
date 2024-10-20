'use client'

import { Input } from "@/components/ui/input"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { chatWithAI, storeUserChat } from "./messageOperation"
import { generateUUID } from "@/app/db/uuidGenerate"
import { setLastChat } from "@/app/_component/service"

export default function ChatFile() {
    const [response, setResponse] = useState<any[] | null>(null)
    const [questions, setQuestions] = useState<string | null>(null)
    const params = useParams();
    const router = useRouter()

    const handleKeyDown = useCallback(async (e: KeyboardEvent) => {
        const element = e.target as HTMLInputElement;
        if (e.key === 'Enter' && element.id === 'ai-chat') {
            const inputValue = element.value;
            element.value = '';
            const chatId = generateUUID();

            // set the question 
            setQuestions(inputValue);

            // chat with AI
           chatWithAI(inputValue, chatId).then((res) => {
            setResponse(res as any);
           });

            // store the chat and the message
            storeUserChat(inputValue, chatId);

            // set the last chat
            setLastChat(chatId);

            router.push(`/dashboard/chats/${chatId}`)
        }
    }, [chatWithAI])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown])

    if(params.id) {
        router.push(`/dashboard/chats/${params.id}`)
    }

    return (
        <div className="h-full overflow-hidden flex flex-col justify-center items-center">
            {!questions && (
                <h1 className="text-white text-3xl font-bold mb-8 text-center">Chat with AI</h1>
            )}
            {questions && (
                <div className="w-full max-w-2xl mb-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                        <p className="text-white">{questions}</p>
                    </div>
                </div>
            )}
            {response && (
                <div className="w-full max-w-2xl mb-4">
                    <div className="bg-gray-600 rounded-lg p-4">
                        <p className="text-white">{response}</p>
                    </div>
                </div>
            )}
            
            <div className="w-full max-w-2xl flex">
                <Input 
                    id='ai-chat'
                    type="text"  
                    className="flex-grow p-4 rounded-l-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Message ChatGPT"
                />
                <button 
                    className="bg-gray-600 text-white px-4 rounded-r-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    // onClick={() => {
                    //     const input = document.getElementById('ai-chat') as HTMLInputElement;
                    //     if (input.value) {
                    //         setQuestions(input.value);
                    //         chatWithAI(input.value, chatId);
                    //         input.value = '';
                    //     }
                    // }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
