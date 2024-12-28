"use client";
import { usePathname, useRouter } from "next/navigation"; // Change this import
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { getUserInfo } from "../utils/action";
import { LLMsList} from "../_component/constant";
import LeftSide from "../_component/LeftSide";
import Settings from "../_component/Settings";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import LLMsModal from "../_component/LLMsModal";
import { getLocalLLM, setLocalLLM } from "../_component/service";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const [user, setUser] = useState<any>(null);
    const [selectedLLM, setSelectedLLM] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const router = useRouter(); // This is now correct for Client Components
    const settingsRef = useRef<HTMLDivElement>(null);

    const currentPath = usePathname();

    // get user info
    const getInfo = async () => {
      const user = await getUserInfo()
      if(!user) {
        router.push('/login')
        return
      }
      setUser(user)
      setIsLoading(false)
    }
  
    useEffect(() => {

      // get User logged in
      getInfo();

      // set the selected llm
      setSelectedLLM( getLocalLLM()|| '');

      // close the settings when clicking outside
      const handleClickOutside = (e: MouseEvent) => {
        if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
          setIsSettingsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };

    }, [])
  
  
    return (
      <>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="spinner"></div>
            </div>
          ): user && (
            <>
            <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
  
              {/* left side */}
              <div className="w-full md:w-64 bg-[#202123] p-4 h-full overflow-y-auto">
                <LeftSide selectedLLM={selectedLLM} />
              </div>
  
              {/* right side */}
              <div className="flex-1 bg-[#343541] p-4 h-full overflow-hidden flex flex-col">
  
                {/* avatar and select llm */}
                <div className="flex justify-between items-center w-full p-4">
                  {/* select llm */}
                  <div className="z-50">
                    {selectedLLM && (
                      <Select onValueChange={(value: LLMsList) => {
                        setSelectedLLM(value);
                        setLocalLLM(value);
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
                    )}
                  </div>
                  
                  {/* avatar */}
                  <div className="z-50">
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
                      <div ref={settingsRef} className="absolute right-4 mt-2">
                        <Settings />
                      </div>
                    )}
                  </div>
                </div>
                {/* LLMs and Dashboard */}
                <div className="flex-1 px-4 overflow-y-auto">
                  {(!selectedLLM && currentPath === '/dashboard/gpts') && <LLMsModal setSelectedLLM={setSelectedLLM} />}
                  {currentPath !== '/dashboard/gpts' && children}
                </div>
              </div>
             
            </div>
          </>
          )}
      </>
    );
  }
