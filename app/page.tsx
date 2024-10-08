"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoginSignUp from "./login/_component/LoginSignUp";
import { getUserInfo } from "./utils/action";
import Dashboard from "./dashboard/_component/ControlPanel";
import LeftSide from "./_component/LeftSide";
import Settings from "./_component/Settings";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const getInfo = async () => {
    const user = await getUserInfo()
    setUser(user)
    setIsLoading(false)
  }

  useEffect(() => {
    getInfo()
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
              <div className="w-64 bg-[#202123] p-4 h-screen">
                <LeftSide />
              </div>
              <div className="flex-1 bg-[#343541] p-4 h-screen">
                <Dashboard />
              </div>
              <div className="fixed top-4 right-4 z-50">
                <button 
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {user?.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="User avatar"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <span className="text-xl font-bold text-gray-600">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </button>
                {isSettingsOpen && <Settings />}
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
