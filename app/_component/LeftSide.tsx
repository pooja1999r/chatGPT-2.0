import { useEffect, useState } from "react"
import { LeftSideItems, LLMsList } from "./constant"



export default function LeftSide({selectedLLM}: {selectedLLM: string}) {
    const [selectedItem, setSelectedItem] = useState(LeftSideItems.GPTs)

    const handleGPTs = () => {
        setSelectedItem(LeftSideItems.GPTs)
    }

    const handleChats = () => {
        setSelectedItem(LeftSideItems.ADD_CHAT)
    }

    useEffect(() => {
        // Initialize with "Home" selected
        if(selectedLLM) {
            setSelectedItem(LeftSideItems.ADD_CHAT)
        } else {
            setSelectedItem(LeftSideItems.GPTs)
        }
    }, [selectedLLM])

    return (
        <div className="text-white">
            <h1 className="text-2xl font-bold mb-4">LeftSide</h1>
            <nav>
                <ul className="space-y-2">
                    <li className={`rounded-md transition-colors duration-200 ${selectedItem === LeftSideItems.GPTs ? "bg-gray-700" : "hover:bg-gray-700"}`}>
                        <span className="block px-4 py-2 cursor-pointer" onClick={() => setSelectedItem(LeftSideItems.GPTs)}>{LeftSideItems.GPTs}</span>
                    </li>
                    <li className={`rounded-md transition-colors duration-200 ${selectedItem === LeftSideItems.ADD_CHAT ? "bg-gray-700" : "hover:bg-gray-700"}`}>
                        <span className="block px-4 py-2 cursor-pointer" onClick={() => setSelectedItem(LeftSideItems.ADD_CHAT)}>{LeftSideItems.ADD_CHAT}</span>
                    </li>
                </ul>
                <h2 className="text-xl font-semibold mt-4 mb-2">Language Models</h2>
                <ul className="space-y-2">
                    {Object.values(LLMsList).map((llm) => (
                        <li key={llm} className="rounded-md transition-colors duration-200 hover:bg-gray-700">
                            <span className="block px-4 py-2">{llm}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
