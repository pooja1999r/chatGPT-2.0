import { useState } from "react";
import { LLMsDescription, LLMsList } from "./constant";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setLocalLLM } from "./service";

export default function LLMsModal({setSelectedLLM}: {setSelectedLLM?: (llm: string) => void}) {
    const [selectLLM, setSelectLLM] = useState('');

    const handleLLMClick = (llm: LLMsList) => {
        setSelectLLM(llm);
        setSelectedLLM && setSelectedLLM(llm);
        setLocalLLM(llm);
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