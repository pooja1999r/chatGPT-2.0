import { useState } from "react";
import { LLMsList, LocalLLmKey } from "./constant";

export default function LLMsModal({checkLocalLLM}: {checkLocalLLM: () => void}) {
    const [selectedLLM, setSelectedLLM] = useState('');

    const handleLLMClick = (llm: LLMsList) => {
        localStorage.setItem(LocalLLmKey, llm);
        setSelectedLLM(llm);
        checkLocalLLM();
    }


    return (
        <div className="grid grid-cols-3 gap-4">
            {Object.values(LLMsList).map((llm: LLMsList, index: number) => (
                <button
                    key={index}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-8 px-4 rounded shadow"
                    onClick={() => handleLLMClick(llm)}
                >
                    {llm}
                </button>
            ))}
        </div>
    )
}