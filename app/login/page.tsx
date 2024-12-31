'use client'
import SignUp from "./_component/LoginSignUp";
import '../_component/CssFiles/loginSignup.scss';



export default function Login() {
  return <>
      <div className="login-container">
        <div className="login-container-left">
          <SignUp />
        </div>
        <div className="login-container-right">
          <h1 className="title1">AI-Employee</h1>
          <b>Your Intelligent Workplace Companion</b>
        </div>
      </div>
  </>
}