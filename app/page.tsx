"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoginSignUp from "./login/_component/LoginSignUp";
import { getUserInfo } from "./utils/action";
import Dashboard from "./dashboard/_component/ControlPanel";
import LeftSide from "./_component/LeftSide";
import Settings from "./_component/Settings";
import LLMs from "./_component/LLMsModal";
import { LLMsList, LocalLLmKey } from "./_component/constant";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedLLM, setSelectedLLM] = useState('');

  // get user info
  const getInfo = async () => {
    const user = await getUserInfo()
    setUser(user)
    setIsLoading(false)
  }

  // check local llm
  const checkLocalLLM = async () => {
    const llm = localStorage.getItem(LocalLLmKey)
    if (llm) {
      setSelectedLLM(llm)
    }
  }


  useEffect(() => {
    getInfo();
    checkLocalLLM();

    // Add event listener to handle clicks outside the settings popup
    const handleClickOutside = (e: MouseEvent) => {
      const settingsElement = document.getElementById('settings-popup');
      if (isSettingsOpen && settingsElement && !settingsElement.contains(e.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  return (
    <div className="flex flex-col h-screen w-screen max-h-screen max-w-screen bg-background overflow-hidden">
      <main className="flex-grow overflow-hidden">
        
        {!isLoading && !user && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center w-full p-4">
              <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
                  <LoginSignUp />
              </div>
              <div className="w-full md:w-3/4 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-4 text-center">Welcome Back</h1>
                <p className="text-xl mb-8 text-center">Explore the Power of Various Language Models (LLMs)</p>
                <Image
                    src="/images/ai.jpg"
                    alt="Login/Signup illustration"
                    width={300}
                    height={200}
                    className="mb-6"
                />
              </div>
            </div>
          </>
        )}
        { !isLoading && user && (
          <>
            <div className="flex flex-col md:flex-row w-full h-full">

              {/* left side */}
              <div className="w-full md:w-64 bg-[#202123] p-4 md:h-full">
                <LeftSide selectedLLM={selectedLLM} />
              </div>

              {/* right side */}
              <div className="flex-1 bg-[#343541] p-4 md:h-full overflow-hidden">

                {/* avatar and select llm */}
                <div className="flex justify-between items-center w-full p-4 relative">

                  {/* select llm */}
                  {selectedLLM && (
                    <div className="z-50">
                      <Select onValueChange={(value: LLMsList) => {
                        setSelectedLLM(value);
                        localStorage.setItem(LocalLLmKey, value);
                      }} value={selectedLLM || ''}>
                        <SelectTrigger className="w-[180px] bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
                          <SelectValue placeholder="Select LLM" />
                        </SelectTrigger>  
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Language Models</SelectLabel>
                            {Object.values(LLMsList).map((llm) => (
                              <SelectItem key={llm} value={llm}>
                                {llm}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {/* avatar */}
                  <div className="z-50 absolute top-4 right-4">
                    <button 
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                      className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {user?.user_metadata?.avatar_url ? (
                        <Image
                          src={user.user_metadata.avatar_url}
                          alt="U"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <span className="text-xl font-bold text-gray-600">
                          {user?.email?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </button>
                    {isSettingsOpen && (
                      <div className="absolute right-0 mt-2">
                        <Settings />
                      </div>
                    )}
                  </div>
                </div>

                {/* LLMs and Dashboard */}
                <div className="mt-16 px-4 h-[calc(100%-6rem)] overflow-auto">
                  {!selectedLLM && <LLMs checkLocalLLM={checkLocalLLM} />}
                  {selectedLLM && <Dashboard />}
                </div>
              </div>
             
            </div>
          </>
        )}

        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="spinner"></div>
          </div>
        )}
        
      </main>
    </div>
  );
}