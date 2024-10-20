'use client'

import {  getChats, getMessages } from "@/app/db/action"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export default function ChatFile() {
    const [chats, setChats] = useState<any[] | null>(null)
    const [response, setResponse] = useState<any[] | null>(null)


    const getDBChats = async () => {
        const data = await getChats()
        console.log(data)
        setChats(data)
    }

    useEffect(() => {

      getDBChats();
    
      const element = document.getElementById('ai-chat')
      if (element) {
        element.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            // chatWithAI()
          }
        })
      }
    }, [])
    return (
        <div className="h-full overflow-hidden">
            <div className="h-full flex flex-col">
                <div className="flex-grow overflow-y-auto mb-4">
                    {chats && chats.length > 0 ? (
                        chats.map((chat) => (
                            <div key={chat.chat_id} className="mb-4 p-3 bg-gray-800 rounded-lg">
                                <h2 className="text-lg font-semibold text-white">{chat.chat_name}</h2>
                                <p className="text-gray-300">{chat.last_message || 'No messages yet'}</p>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-white text-2xl mb-8 typewriter font-bold">Welcome Back, Let&apos;s Chat</p>
                        </div>
                    )}
                    {response && response.length > 0 && (
                        <div className="space-y-2">
                            {response.map((res, index) => (
                                <div key={index} className="p-3 bg-gray-700 rounded-lg">
                                    <p className="text-white">{res.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mt-auto">
                    <Input 
                        id='ai-chat'
                        type="text" 
                        className="w-full p-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell me your query"
                    />
                </div>
            </div>
        </div>
    )
}