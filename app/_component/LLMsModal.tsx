import { useState } from "react";
import { LLMsDescription, LLMsList, LocalLLmKey } from "./constant";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LLMsModal({checkLocalLLM}: {checkLocalLLM?: () => void}) {
    const [selectedLLM, setSelectedLLM] = useState('');

    const handleLLMClick = (llm: LLMsList) => {
        localStorage.setItem(LocalLLmKey, llm);
        setSelectedLLM(llm);
        checkLocalLLM && checkLocalLLM();
    }

    return (
        <div className="grid grid-cols-3 gap-4 m-4 p-4">
            {Object.values(LLMsList).map((llm: LLMsList, index: number) => (
                <Card key={index} className="w-[350px] flex flex-col">
                    <CardHeader>
                        <CardTitle>{LLMsDescription[llm].title}</CardTitle>
                        <CardDescription>{LLMsDescription[llm].heading}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p>{LLMsDescription[llm].content}</p>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <Button onClick={() => handleLLMClick(llm)} className="w-full">
                            {LLMsDescription[llm].footer}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}