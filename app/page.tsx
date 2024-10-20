"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')
  }, [])

  return (
    <div className="flex flex-col h-screen w-screen bg-background">
      <main className="flex-1 w-full">
      </main>
    </div>
  );
}