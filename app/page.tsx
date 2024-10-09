"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoginSignUp from "./login/_component/LoginSignUp";
import { getUserInfo } from "./utils/action";
import Dashboard from "./dashboard/_component/ControlPanel";
import LeftSide from "./_component/LeftSide";
import Settings from "./_component/Settings";
import LLMs from "./_component/LLMs";


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
    const llm = localStorage.getItem('llm')
    if (llm) {
      setSelectedLLM(llm)
    }
  }

  useEffect(() => {
    getInfo();
    checkLocalLLM();
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        
        {!isLoading && !user && (
          <>
            <div className="flex justify-between items-center w-full">
              <div className="w-1/4 flex justify-center">
                  <LoginSignUp />
              </div>
              <div className="w-3/4 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
                <p className="text-xl mb-8">Explore the Power of Various Language Models (LLMs)</p>
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
            <div className="flex w-full h-full">

              {/* left side */}
              <div className="w-64 bg-[#202123] p-4 h-screen">
                <LeftSide />
              </div>

              {/* right side */}
              <div className="flex-1 bg-[#343541] p-4 h-screen">

                {/* avatar and select llm */}
                <div className="flex justify-between items-center w-full p-4 relative">

                  {/* select llm */}
                  {selectedLLM && (
                    <div className="z-50">
                      <select
                        className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          setSelectedLLM(e.target.value);
                          localStorage.setItem('llm', e.target.value);
                        }}
                        value={selectedLLM || ''}
                      >
                        <option value="">Select LLM</option>
                        {['GPT-3', 'GPT-4', 'BERT', 'T5', 'RoBERTa', 'XLNet'].map((llm) => (
                          <option key={llm} value={llm}>
                            {llm}
                          </option>
                        ))}
                      </select>
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
                <div className="mt-16 px-4">
                  {!selectedLLM && <LLMs />}
                  {selectedLLM && <Dashboard />}
                </div>
              </div>
             
            </div>
          </>
        )}

        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="spinner"></div>
          </div>
        )}
        
      </main>
      <footer className="mt-8 text-sm text-gray-500">
        © 2024 Our App. All rights reserved.
      </footer>
    </div>
  );
}
