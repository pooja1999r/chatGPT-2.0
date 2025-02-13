"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserInfo } from "./utils/serverAction";

export default function Home() {
  const router = useRouter()

  const getUser = async() =>{
    const user = await getUserInfo()
    if(!user) {
      router.push('/login')
      return
    }
    router.push('/dashboard')
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className="container">
      <main className="flex-1 w-full">
      </main>
    </div>
  );
}