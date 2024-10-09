import { useState } from "react";
import { signup, login, signInWithGoogle } from "../action";
import { Action } from "./constant";
import { Spinner } from "@/app/_component/Spinner";

export default function SignUp() {
    const [action, setAction] = useState(Action.LOGIN);
    const [isLoading, setIsLoading] = useState(false);
    
    return <>
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">{action === Action.SIGNUP ? 'Sign Up' : 'Login'}</h1>
            <form>
                <input id="email" name="email" type="email" required  placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black"  />
                <input id="password" name="password" type="password" required  placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black" />

                {/* sign up or login */}
                <button formAction={action === Action.SIGNUP ? signup : login} onClick={() => setIsLoading(true)}
                    className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out mb-4 flex items-center justify-center">
                    {isLoading && <Spinner />}
                    {action === Action.SIGNUP ? 'Sign up' : 'Login'}
                </button>

                <div className="mt-4 text-center flex items-center justify-center"> 
                    <p>
                    {action === Action.LOGIN ? "Don't have an account?" : "Already have an account?"}
                    </p>
                    <button 
                    className="text-blue-500 ml-2 hover:underline"
                    onClick={() => setAction(action === Action.SIGNUP ? Action.LOGIN : Action.SIGNUP)}
                    >
                    {action === Action.SIGNUP ? "Login" : "Sign Up"}
                    </button>
                </div>
            </form>
            <div className="flex items-center my-4 w-full mx-auto">
                <div className="flex-grow border-t border-white"></div>
                <span className="px-3 text-gray-500 bg-transparent">or</span>
                <div className="flex-grow border-t border-white"></div>
            </div>

            {/* sign in with google */}
            <form className="w-full">
                <button formAction={signInWithGoogle}
                    className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
                    Sign in with Google
                </button>
            </form>      
        </div>
    </>
}

 