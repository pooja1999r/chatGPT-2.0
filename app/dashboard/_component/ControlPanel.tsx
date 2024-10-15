'use client'

import Posts, { getAllPerviousChats } from "@/app/db/action"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export default function Dashboard() {
    const [chats, setChats] = useState<any[]>([])

    useEffect(() => {
        // getAllPerviousChats().then((data) => {
        //     setChats(data)
        // })
      const data = Posts()
      console.log(data)
    }, [])
    return (
        <div className="h-full overflow-hidden">
            <div className="h-full">
                {chats.length > 0 ? (
                    <div className="h-full overflow-y-auto">
                        {chats.map((chat) => (
                            <div key={chat.id} className="mb-4">
                                <h2 className="text-lg font-semibold">{chat.title}</h2>
                                <p>{chat.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-white text-2xl mb-8 typewriter font-bold">Welcome Back, Let&apos;s Chat</p>
                        <Input 
                            type="text" 
                            className="w-1/2 p-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-start"
                            placeholder="Tell me your query"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}