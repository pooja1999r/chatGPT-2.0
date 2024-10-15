import { useState } from "react";
import { signup, login, signInWithGoogle } from "../action";
import { Action } from "./constant";
import { Spinner } from "@/app/_component/Spinner";

export default function SignUp() {
    const [action, setAction] = useState(Action.LOGIN);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGoogleAuth, setIsLoadingGoogleAuth] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoading = () =>{
        if(!email || !password){
            setIsLoading(false);
            setError('Please enter your email and password');
            return;
        }
        setIsLoading(true);
    }

    const handleAction = () =>{
        const act = action === Action.SIGNUP ? signup : login
        const formData = new FormData();
        formData.set('email', email);
        formData.set('password', password);
        act(formData).then((data) => {
            console.log(data.error)
            setIsLoading(false);
            setError(data.error ?? 'Invalid credentials. Please try again.');
        });
    }

    return <>
        <div className="flex flex-col items-center justify-center">
            <div className="text-center w-1/2">
                <h1 className="text-2xl font-bold mb-4">Let's {action === Action.SIGNUP ? 'Sign Up' : 'Login'} to Enjoy LLM's</h1>
                <form>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <div className="mb-4">
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            required  
                            placeholder="Email" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            required  
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        formAction={handleAction} 
                        onClick={handleLoading}
                        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out mb-4 flex items-center justify-center"
                    >
                        {isLoading && <Spinner />}
                        {action === Action.SIGNUP ? 'Sign up' : 'Login'}
                    </button>
                </form>
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
                <div className="flex items-center my-4 w-full">
                    <div className="flex-grow border-t border-black"></div>
                    <span className="px-3 text-gray-500 bg-transparent">or</span>
                    <div className="flex-grow border-t border-black"></div>
                </div>
                <form className="w-full">
                    <button 
                        formAction={signInWithGoogle} 
                        onClick={() => setIsLoadingGoogleAuth(true)}
                        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out mb-4 flex items-center justify-center"
                    >
                        {isLoadingGoogleAuth && <Spinner />}
                        Sign in with Google
                    </button>
                </form>
            </div>
        </div>
    </>
}

 