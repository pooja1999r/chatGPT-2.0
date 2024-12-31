import { useState } from "react";
import { signup, login, signInWithGoogle } from "../action";
import { Action } from "./constant";
import { Spinner } from "../../_component/Spinner";

export default function SignUp() {
    const [action, setAction] = useState(Action.LOGIN);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGoogleAuth, setIsLoadingGoogleAuth] = useState(false);
    const [formInputData, setFormInoutData] = useState({
        email: '',
        password: '',
        error: ''
    })

    const handleAction = () =>{
        if(!formInputData.email || !formInputData.password || isLoading){
            return; 
        }
        setIsLoading(true);
        const act = action === Action.SIGNUP ? signup : login
        const formData = new FormData();

        formData.set('email', formInputData.email);
        formData.set('password', formInputData.password);
        act(formData).then((data) => {
            setIsLoading(false);
            data?.error && setFormInoutData({...formInputData, error: data.error ?? 'Invalid credentials. Please try again.' })
        });
    }

    const onFormInputChange = (e: any) =>{
        const {name, value} = e.target;
        
        setFormInoutData(
            {...formInputData, 
            [name]: value, error: ''}   
        )
    }

    return <>
        <div className="signup-container">
            <h1 className="title2">{action === Action.SIGNUP ? 'Create your account' : 'Welcome back'}</h1>
            <form>
                {formInputData.error && <p>{formInputData.error}</p>}
               
                <input 
                    id="email" 
                    type="email" 
                    name="email"
                    required  
                    placeholder="Email" 
                    onChange={onFormInputChange}
                />
        
                <input 
                    id="password" 
                    type="password" 
                    name="password"
                    required  
                    placeholder="Password"
                    onChange={onFormInputChange}
                />
                <button style={{ marginTop: '10px'}}
                    formAction={handleAction}
                    onClick={handleAction}
                    className="primary-button"
                >
                    {isLoading && <Spinner />}
                    {action === Action.SIGNUP ? 'Sign up' : 'Login'}
                </button>
            </form>
            <div className="flex-center-column" style={{ marginTop: '10px'}} > 
                <span>
                    {action === Action.LOGIN ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button 
                    style={{
                        marginLeft: '5px'
                    }}
                    type="button"
                    className="text-link"
                    onClick={() => setAction(action === Action.SIGNUP ? Action.LOGIN : Action.SIGNUP)}
                >
                    {action === Action.SIGNUP ? " Login" : " Sign Up"}
                </button>
            </div>
            <div className="horizontal-line-container">
                <div className="horizontal-line"></div>
                <span style={{padding: '0px 10px', color: 'rgb(69, 69, 69)'}}>or</span>
                <div className="horizontal-line"></div>
            </div>
            <form className="w-full">
                <button 
                    formAction={signInWithGoogle} 
                    onClick={() => setIsLoadingGoogleAuth(true)}
                    className="primary-button">
                    {isLoadingGoogleAuth && <Spinner />}
                    Sign in with Google
                </button>
            </form>
        </div>
    </>
}

 