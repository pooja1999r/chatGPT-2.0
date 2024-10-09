'use client'
import SignUp from "./_component/LoginSignUp";
import Image from "next/image";



export default function Login() {

  return <>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-1/2 p-8">
          <SignUp />
        </div>
        <div className="w-1/2 p-8 bg-gray-100 h-screen flex items-center justify-center text-black">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl mb-8">Explore the Power of Various Language Models (LLMs)</p>
            <img src="/app/public/images/claude.jpeg" alt="AI Illustration" width="300" height="200" />
            <p className="text-lg">Unlock the potential of AI-powered language processing</p>
          </div>
        </div>
      </div>
  </>
}