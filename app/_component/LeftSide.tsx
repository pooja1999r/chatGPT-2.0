import { useEffect, useState } from "react"
import { LastChatKey, LeftSideItems, LLMsList } from "./constant"
import { useRouter } from "next/navigation"
import { getChats } from "../db/action"
import { getLastChat } from "./service"



export default function LeftSide({selectedLLM}: {selectedLLM?: string}) {
    const [selectedItem, setSelectedItem] = useState(LeftSideItems.GPTs)
    const [chats, setChats] = useState<any[] | null>([])
    const router = useRouter()

    const handleNavItem = (item: LeftSideItems) => {
        setSelectedItem(item)
        if(item === LeftSideItems.ADD_CHAT) {
            const lastChatId = getLastChat();
            const path = lastChatId ? `/dashboard/chats/${lastChatId}` : '/dashboard/chats';
            router.push(path)
        } else {
            router.push('/dashboard/gpts')
        }
    }

    const getDBChats = async () => {
        const data = await getChats()
        setChats(data);
    }

    const handleChat = (chat_id: string) => {
        router.push(`/dashboard/chats/${chat_id}`)
    }

    useEffect(() => {
        getDBChats();
    }, []); // Run only once on component mount

    useEffect(() => {
        if (selectedLLM) {
            handleNavItem(LeftSideItems.ADD_CHAT);
        } else {
            handleNavItem(LeftSideItems.GPTs);
        }
    }, [selectedLLM]); // Run when selectedLLM changes

    return (
        <div className="text-white">
            <h1 className="text-2xl font-bold mb-4">LeftSide</h1>
            <nav>
                <ul className="space-y-2">
                    <li className={`rounded-md transition-colors duration-200 ${selectedItem === LeftSideItems.GPTs ? "bg-gray-700" : "hover:bg-gray-700"}`}>
                        <span className="block px-4 py-2 cursor-pointer" onClick={() => handleNavItem(LeftSideItems.GPTs)}>{LeftSideItems.GPTs}</span>
                    </li>
                    <li className={`rounded-md transition-colors duration-200 ${selectedItem === LeftSideItems.ADD_CHAT ? "bg-gray-700" : "hover:bg-gray-700"}`}>
                        <span className="block px-4 py-2 cursor-pointer" onClick={() => handleNavItem(LeftSideItems.ADD_CHAT)}>{LeftSideItems.ADD_CHAT}</span>
                    </li>
                </ul>
                <h2 className="text-xl font-semibold mt-4 mb-2">Language Models</h2>
                <ul className="space-y-2">
                    {chats && chats.map((chat) => (
                        <li key={chat.chat_id} className="rounded-md transition-colors duration-200 hover:bg-gray-700">
                            <span 
                                className="flex items-center px-4 py-2 cursor-pointer"
                                onClick={() => handleChat(chat.chat_id)}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                {chat.chat_name}
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
