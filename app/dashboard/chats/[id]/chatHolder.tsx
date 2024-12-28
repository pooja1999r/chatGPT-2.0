'use client'
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { chatWithAI, storeUserChat } from "../messageOperation";
import { setLastChat } from "@/app/_component/service";
import { getMessagesByChatId } from '@/app/db/action';
import { generateUUID } from '@/app/db/uuidGenerate';

export default function ChatHolder() {
    const [messages, setMessages] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const handleSendMessage = useCallback(async () => {
        if (inputValue.trim()) {
            // Add user message
            setMessages(prev => [...prev, { type: 'user', content: inputValue }]);

            // Clear input
            setInputValue('');
            const messageId = generateUUID();

            // Chat with AI
            const response = await chatWithAI(inputValue, params.id as string, messageId);
            
            // Add AI response
            setMessages(prev => [...prev, { type: 'ai', content: response as string }]);

            // Store the chat and message
            await storeUserChat(inputValue, params.id as string, messageId);

            // Set the last chat
            setLastChat(params.id as string);
        }
    }, [inputValue, params.id]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    }, [handleSendMessage]);

    const getMessages = useCallback(() => {
        getMessagesByChatId(params.id as string).then((messages) => {
            setMessages(messages!)
            setIsLoading(false)
        })
    }, [params.id])

    useEffect(() => {
        setIsLoading(true)
        getMessages()
    }, [params.id, getMessages])

    return (
        <div className="h-full flex flex-col bg-[#343541] p-6 m-20 mt-0">
            <div className="flex-grow overflow-y-auto mb-4 ">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-white text-3xl mb-8 typewriter font-bold">Welcome Back, Let's Chat</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-start space-x-4 ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.sender_type === 'user' ? (
                                    <>
                                        <div className={`p-4 rounded-lg bg-gray-700 max-w-[75%] shadow-md`}>
                                            <p className="text-white text-sm">{message.message_text}</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                            </svg>
                                        </div>
                                        <div className={`p-4 rounded-lg bg-gray-600 max-w-[75%] shadow-md`}>
                                            <p className="text-white text-sm">{message.message_text}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <div className="flex shadow-lg rounded-lg overflow-hidden">
                    <Input 
                        id='ai-chat'
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow p-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-none placeholder-gray-400"
                        placeholder="Message ChatGPT..."
                    />
                    <button 
                        className="bg-blue-600 text-white px-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out flex items-center justify-center"
                        onClick={handleSendMessage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 transform rotate-90">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
